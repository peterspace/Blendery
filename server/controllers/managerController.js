const asyncHandler = require('express-async-handler');
const User = require('../models/User.js');
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Token = require('../models/TokenModel');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');
const { uploadImage } = require('../utils/uploadImage');
const validateMongoDbId = require('../utils/validateMongodbId');

//========={new features}===============================

// const Cart = require('../models/cartModel');
// const Coupon = require('../models/couponModel');
const Place = require('../models/placeModel');

// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// Register User
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please fill in all required fields');
  }
  if (password.length < 6) {
    res.status(400);
    throw new Error('Password must be up to 6 characters');
  }

  // Check if user email already exists
  const userExists = await Manager.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('Email has already been registered');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user
  const user = await Manager.create({
    name,
    email,
    password: hashedPassword,
  });

  //   Generate Token
  const token = generateToken(user._id);

  // Send HTTP-only cookie
  res.cookie('token', token, {
    path: '/',
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    sameSite: 'none',
    secure: true,
  });

  if (user) {
    const { _id, photo, role, level, supervisor } = user;
    res.status(201).json({
      _id,
      name,
      email,
      photo,
      role,
      level,
      supervisor,
      token,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// Login User
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate Request
  if (!email || !password) {
    res.status(400);
    throw new Error('Please add email and password');
  }

  // Check if user exists
  const user = await Manager.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error('User not found, please signup');
  }

  // User exists, check if password is correct
  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  //   Generate Token
  const token = generateToken(user._id);

  if (passwordIsCorrect) {
    // Send HTTP-only cookie
    res.cookie('token', token, {
      path: '/',
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 day
      sameSite: 'none',
      secure: true,
    });
  }
  if (user && passwordIsCorrect) {
    const { _id, name, email, photo, role, level, supervisor } = user;
    let response = {
      userId: _id,
      name,
      email,
      photo,
      role,
      level,
      supervisor,
      token,
    };
    res.status(200).json(response);
  } else {
    res.status(400);
    throw new Error('Invalid email or password');
  }
});

// Logout User
const logout = asyncHandler(async (req, res) => {
  res.cookie('token', '', {
    path: '/',
    httpOnly: true,
    expires: new Date(0),
    sameSite: 'none',
    secure: true,
  });
  return res.status(200).json({ message: 'Successfully Logged Out' });
});

// Get User Data
const getUser = asyncHandler(async (req, res) => {
  const user = await Manager.findById(req.user._id);

  if (user) {
    const { _id, name, email, photo, role, level, supervisor } = user;
    res.status(200).json({
      _id,
      name,
      email,
      photo,
      role,
      level,
      supervisor,
    });
  } else {
    res.status(400);
    throw new Error('User Not Found');
  }
});

// Get Login Status
const loginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json(false);
  }
  // Verify Token
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if (verified) {
    return res.json(true);
  }
  return res.json(false);
});

// Update User

// The manager is not permitted to change
//1. role
//2. level
//3. supervisor

const updateUser = asyncHandler(async (req, res) => {
  const user = await Manager.findById(req.user._id);

  if (user) {
    const { name, email, photo, role } = user;
    user.email = email;
    user.name = req.body.name || name;
    user.photo = req.body.photo || photo;
    user.role = req.body.role || role;

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      photo: updatedUser.photo,
      role: updatedUser.role,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const changePassword = asyncHandler(async (req, res) => {
  const user = await Manager.findById(req.user._id);
  const { oldPassword, password } = req.body;

  if (!user) {
    res.status(400);
    throw new Error('User not found, please signup');
  }
  //Validate
  if (!oldPassword || !password) {
    res.status(400);
    throw new Error('Please add old and new password');
  }

  // check if old password matches password in DB
  const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);

  // Save new password
  if (user && passwordIsCorrect) {
    user.password = password;
    await user.save();
    res.status(200).send('Password change successful');
  } else {
    res.status(400);
    throw new Error('Old password is incorrect');
  }
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await Manager.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error('User does not exist');
  }

  // Delete token if it exists in DB
  let token = await Token.findOne({ userId: user._id });
  if (token) {
    await token.deleteOne();
  }

  // Create Reste Token
  let resetToken = crypto.randomBytes(32).toString('hex') + user._id;
  console.log(resetToken);

  // Hash token before saving to DB
  const hashedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Save Token to DB
  await new Token({
    userId: user._id,
    token: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 30 * (60 * 1000), // Thirty minutes
  }).save();

  // Construct Reset Url
  const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

  // Reset Email
  const message = `
      <h2>Hello ${user.name}</h2>
      <p>Please use the url below to reset your password</p>  
      <p>This reset link is valid for only 30minutes.</p>

      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>

      <p>Regards...</p>
      <p>Pinvent Team</p>
    `;
  const subject = 'Password Reset Request';
  const send_to = user.email;
  const sent_from = process.env.EMAIL_USER;

  try {
    await sendEmail(subject, message, send_to, sent_from);
    res.status(200).json({ success: true, message: 'Reset Email Sent' });
  } catch (error) {
    res.status(500);
    throw new Error('Email not sent, please try again');
  }
});

// Reset Password
const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { resetToken } = req.params;

  // Hash token, then compare to Token in DB
  const hashedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // fIND tOKEN in DB
  const userToken = await Token.findOne({
    token: hashedToken,
    expiresAt: { $gt: Date.now() },
  });

  if (!userToken) {
    res.status(404);
    throw new Error('Invalid or Expired Token');
  }

  // Find user
  const user = await Manager.findOne({ _id: userToken.userId });
  user.password = password;
  await user.save();
  res.status(200).json({
    message: 'Password Reset Successful, Please Login',
  });
});

// Get All Admin Data
const getAllAdmins = asyncHandler(async (req, res) => {
  const user = await Manager.findById(req.user._id);
  if (user.role === 'Admin' && user.level > 2) {
    res.json(await Manager.find({ role: 'Admin' }));
  }
});

/**
 * Promote manager to next level
 * Remove Manager
 * Change Managers Supervisor
 */

//The Administrator is permitted to only update user
//1. role
//2. level
//3. supervisor

const updateMyManager = asyncHandler(async (req, res) => {
  const user = await Manager.findById(req.user._id);

  if (user) {
    const { role, level, supervisor } = user;

    user.role = req.body.role || role;
    user.level = req.body.level || level;
    user.supervisor = req.body.supervisor || supervisor;

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      photo: updatedUser.photo,
      role: updatedUser.role,
      level: updatedUser.level,
      supervisor: updatedUser.supervisor,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
// Get All Admin Data
const getAllManagers = asyncHandler(async (req, res) => {
  const user = await Manager.findById(req.user._id);
  if (user.role === 'Admin' && user.level === 5) {
    res.json(await Manager.find({ role: 'Admin', level: 5 }));
  }
});

// Get All Admin Data
const getAllSupervisors = asyncHandler(async (req, res) => {
  const user = await Manager.findById(req.user._id);
  if (user.role === 'Admin' && user.level === 5) {
    res.json(await Manager.find({ role: 'Admin', level: 5 }));
  }
});

// Get All Admin Data
const getAllSeniorManagers = asyncHandler(async (req, res) => {
  const user = await Manager.findById(req.user._id);
  if (user.role === 'Admin' && user.level === 5) {
    res.json(await Manager.find({ role: 'Admin', level: 5 }));
  }
});

// Get All Admin Data
const getAllHeads = asyncHandler(async (req, res) => {
  const user = await Manager.findById(req.user._id);
  if (user.role === 'Admin' && user.level === 5) {
    res.json(await Manager.find({ role: 'Admin', level: 5 }));
  }
});

// Get All Admin Data
const getAllManagement = asyncHandler(async (req, res) => {
  const user = await Manager.findById(req.user._id);
  if (user.role === 'Admin' && user.level === 5) {
    res.json(await Manager.find({ role: 'Admin', level: 5 }));
  }
});

// Register User
const registerAgent = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please fill in all required fields');
  }
  if (password.length < 6) {
    res.status(400);
    throw new Error('Password must be up to 6 characters');
  }

  // Check if user email already exists
  const userExists = await Manager.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('Email has already been registered');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user
  const user = await Manager.create({
    name,
    email,
    password: hashedPassword,
    role: 'Agent',
  });

  //   Generate Token
  const token = generateToken(user._id);

  // Send HTTP-only cookie
  res.cookie('token', token, {
    path: '/',
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    sameSite: 'none',
    secure: true,
  });

  if (user) {
    const { _id, name, email, photo, role } = user;
    res.status(201).json({
      _id,
      name,
      email,
      photo,
      role,
      token,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// Register User
const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please fill in all required fields');
  }
  if (password.length < 6) {
    res.status(400);
    throw new Error('Password must be up to 6 characters');
  }

  // Check if user email already exists
  const userExists = await Manager.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('Email has already been registered');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user
  const user = await Manager.create({
    name,
    email,
    password: hashedPassword,
    role: 'Admin',
  });

  //   Generate Token
  const token = generateToken(user._id);

  // Send HTTP-only cookie
  res.cookie('token', token, {
    path: '/',
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    sameSite: 'none',
    secure: true,
  });

  if (user) {
    const { _id, name, email, photo, role } = user;
    res.status(201).json({
      _id,
      name,
      email,
      photo,
      role,
      token,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

//=============={New Features}================================================

const registrationConfirmation = asyncHandler(async (req, res) => {
  const { email, name } = req.body;
  const user = await Manager.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error('User does not exist');
  }

  // Delete token if it exists in DB

  const userLogin = `${process.env.FRONTEND_URL}/login`;

  // Reset Email
  const message = `
      <h2>Hello ${name}</h2>
      <p>Thank you for choosing Crib.com</p>  
      <p>Your registration was successful.</p>
      <p>Please login to your account by clicking on the link below</p>

      <a href=${userLogin} clicktracking=off>${userLogin}</a>

      <p>Regards...</p>
      <p>Crib Team</p>
    `;
  const subject = 'Registration Sucessful';

  const emailTest = 'peter.space.io@gmail.com';
  // const send_to = email;
  const send_to = emailTest;
  const sent_from = process.env.EMAIL_USER;

  console.log({ email: email, name: name });

  await sendEmail(subject, message, send_to, sent_from);
  res
    .status(200)
    .json({ success: true, message: 'your registration was sucessful' });
});

module.exports = {
  registerUser,
  loginUser,
  logout,
  getUser,
  loginStatus,
  updateUser,
  changePassword,
  forgotPassword,
  resetPassword,
  getAllUsers,
  getAllAdmins,
  registerAgent,
  registerAdmin,
  //======={New}=======================
  updateMyManager,
  getAllManagers,
  getAllSupervisors,
  getAllSeniorManagers,
  getAllHeads,
  getAllManagement,
  registrationConfirmation,
};
