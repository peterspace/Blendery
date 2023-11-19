const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const express = require('express');
const User = require('../../models/User.js');
const sendEmail = require('../../utils/sendEmail.js');
const jwt = require('jsonwebtoken');

const asyncHandler = require('express-async-handler');

require('dotenv').config();

const loginFacebookStrategy = passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_SECRET_KEY,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL_LOGIN,
      profileFields: ['id', 'displayName', 'photos', 'email'], //optional
    },
    async function (accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
    }
  )
);

const registerFacebookStrategy = passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_SECRET_KEY,
      callbackURL: process.env.CALLBACK_URL_REGISTER,
      profileFields: ['id', 'displayName', 'photos', 'email'], //optional
    },
    async function (accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
    }
  )
);

//======================={Login}==========================================================

//====={attempt user signin through facebook}=================================
const loginFacebook = asyncHandler(async (req, res) => {
  loginFacebookStrategy.authenticate('facebook', { scope: 'email' });
});

//====={get signing result: success or fail}=================================
const loginCallbackFacebook = asyncHandler(async (req, res) => {
  loginFacebookStrategy.authenticate('facebook', {
    failureRedirect: '/auth/facebook/login/error',
  }),
    function (req, res) {
      // Successful authentication, redirect to success screen.
      res.redirect('/auth/facebook/login/success');
    };
});

//====={create the user session on signin and get the user data from db}=================================
const loginSuccessFacebook = asyncHandler(async (req, res) => {
  const profile = req.session.passport.profile;
  const user = await User.findOne({
    accountId: profile.id,
    provider: 'facebook',
  });
  if (!user) {
    console.log('Google User does not exist in DB.., please proceed to signup');
    //==={destroy the session nefore redirecting user}========
    req.logout();
    req.session.destroy();
    const message =
      'Google User does not exist in DB.., please proceed to signup';
    res.status(400).json({ success: false, message });
  } else {
    console.log('google User already exist in DB..');

    res.status(200).json(user);
  }
});

const loginErrorFacebook = asyncHandler(async (req, res) => {
  res.send('Error logging in via Facebook..');
});

//======================={Register}==========================================================

const registerFacebook = asyncHandler(async (req, res) => {
  registerFacebookStrategy.authenticate('facebook', {
    scope: ['profile', 'email'],
  });
});

const registerCallbackFacebook = asyncHandler(async (req, res) => {
  loginFacebookStrategy.authenticate('facebook', {
    failureRedirect: '/auth/facebook/register/error',
  }),
    (req, res) => {
      res.redirect('/auth/facebook/register/success'); // Successful authentication, redirect success.
    };
});

const registerSuccessFacebook = asyncHandler(async (req, res) => {
  const profile = req.session.passport.profile;
  const user = await User.findOne({
    accountId: profile.id,
    provider: 'facebook',
  });
  if (!user) {
    console.log('Adding new facebook user to DB..');
    const user = new User({
      accountId: profile.id,
      name: profile.displayName,
      provider: profile.provider,
      email: profile.email,
    });
    await user.save();
    res.status(200).json(user);
  } else {
    console.log('Facebook User already exist in DB.., please proceed to login');
    //==={destroy the session nefore redirecting user}========
    req.logout();
    req.session.destroy();
    const message =
      'facebook User already exist in DB.., please proceed to login';
    res.status(400).json({ success: false, message });
  }
});


const registerErrorFacebook = asyncHandler(async (req, res) => {
  (req, res) => res.send('Error logging in via facebook..');
});

//======{account activation}=======================================
//====={create the user session on signin and get the user data from db}=================================

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};
// make this general
const activateAccount = asyncHandler(async (req, res) => {
  if (req.session.passport.profile) {
    const profile = req.session.passport.profile;
    const user = await User.findOne({
      accountId: profile.id,
      provider: 'facebook',
    });
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
  }
});

module.exports = {
  loginFacebook,
  loginCallbackFacebook,
  loginSuccessFacebook,
  loginErrorFacebook,
  registerFacebook,
  registerCallbackFacebook,
  registerSuccessFacebook,
  registerErrorFacebook,
};
