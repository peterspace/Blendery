const asyncHandler = require('express-async-handler');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const express = require('express');
const User = require('../../models/User.js');
const sendEmail = require('../../utils/sendEmail');
const jwt = require('jsonwebtoken');

const router = express.Router();
require('dotenv').config();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

passport.use(
  new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      // if (!user.verifyPassword(password)) { return done(null, false); }
      if (!user.matchPassword(password)) {
        return done(null, false);
      }

      return done(null, user);
    });
  })
);


const loginLocal = asyncHandler(async (req, res) => {
  passport.authenticate('local', { failureRedirect: '/login' }), // relogin again
    // function (req, res) {
    //   res.redirect('/auth/local/success'); // if sucessfull, go to success
    // }
    //====={Check}===========
    res.redirect('/auth/local/success'); // if sucessfull, go to success
});

// router.get('/', passport.authenticate('local', { scope: 'email' }));

const registerLocal = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400);
      throw new Error('Please Enter all the Feilds');
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    const user = await User.create({
      username,
      email,
      password,
    });

    if (user) {
      const activationToken = generateToken(user._id);

      const activationUrl = `http://localhost:5173/activation/${activationToken}`;
      const send_to = email; // live production
      // const send_to = emailTest; // testing
      const sent_from = process.env.EMAIL_USER;
      const subject = 'Activate your account';
      const message = `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`;
      await sendEmail(subject, message, send_to, sent_from);
      res.status(201).json({
        success: true,
        message: `please check your email:- ${user.email} to activate your account!`,
      });

      // res.status(200).json(user);
    } else {
      res.status(400);
      throw new Error('User not found');
    }
  });

// router.get('/user', (req, res) => {
//   res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
// });


//====={create the user session on signin and get the user data from db}=================================

const loginSuccessLocal = asyncHandler(async (req, res) => {
  if (!req.session.passport.user) {
    const message = req.session.passport.message;
    res.status(400).json({ success: false, message });
  }
  const user = await req.session.passport.user;
  res.status(200).json(user);
});


const loginErrorLocal = asyncHandler(async (req, res) => {
  res.send('Error logging in via Email..');
});

const logout = asyncHandler(async (req, res) => {
  req.session.destroy(function (err) {
    console.log('session destroyed.');
  });
  // res.render('auth');
  res.status(200).json({ user: '', isLoggedIn: false });
});

const logout1 = (req, res) => {
  try {
    req.session.destroy(function (err) {
      console.log('session destroyed.');
    });
    res.status(200).json({ user: null, isLoggedIn: false });
    // res.status(200).json({ user: '', isLoggedIn: false });
    // res.status(200).json({ user: {}, isLoggedIn: false });
  } catch (err) {
    res.status(400).send({ message: 'Failed to sign out user' });
  }
};

module.exports = {
  loginLocal,
  registerLocal,
  loginSuccessLocal,
  loginErrorLocal,
  logout
};

