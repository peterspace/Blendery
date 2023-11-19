const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const express = require('express');
const User = require('../../models/User.js');
const sendEmail = require('../../utils/sendEmail');
const asyncHandler = require('express-async-handler');

require('dotenv').config();

const loginGoogleStrategy = passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // callbackURL: process.env.CALLBACK_URL,
      callbackURL: process.env.GOOGLEK_CALLBACK_URL_LOGIN,
    },
    async function (accessToken, refreshToken, profile, cb) {
      // return done(null, userProfile);

      return cb(null, profile);
    }
  )
);

const registerGoogleStrategy = passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLEK_CALLBACK_URL_REGISTER,
    },
    async function (accessToken, refreshToken, profile, cb) {
      // return done(null, userProfile);

      return cb(null, profile);
    }
  )
);

//======================={Login}==========================================================
// request at /auth/google, when user click sign-up with google button transferring
// the request to google server, to show emails screen

const loginGoogle = asyncHandler(async (req, res) => {
  loginGoogleStrategy.authenticate('google', { scope: ['profile', 'email'] });
});

// URL Must be same as 'Authorized redirect URIs' field of OAuth client, i.e: /auth/google/callback
//====={get signing result: success or fail}=================================

const loginCallbackGoogle = asyncHandler(async (req, res) => {
  loginGoogleStrategy.authenticate('google', {
    failureRedirect: '/auth/google/login/error',
  }),
    (req, res) => {
      res.redirect('/auth/google/login/success'); // Successful authentication, redirect success.
    };
});

//====={create the user session on signin and get the user data from db}=================================

const loginSuccessGoogle = asyncHandler(async (req, res) => {
  const profile = req.session.passport.profile;
  const user = await User.findOne({
    accountId: profile.id,
    provider: 'google',
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

const loginErrorGoogle = asyncHandler(async (req, res) => {
  (req, res) => res.send('Error logging in via Google..');
});

//======================={Register}==========================================================

const registerGoogle = asyncHandler(async (req, res) => {
  registerGoogleStrategy.authenticate('google', {
    scope: ['profile', 'email'],
  });
});

const registerCallbackGoogle = asyncHandler(async (req, res) => {
  loginGoogleStrategy.authenticate('google', {
    failureRedirect: '/auth/google/register/error',
  }),
    (req, res) => {
      res.redirect('/auth/google/register/success'); // Successful authentication, redirect success.
    };
});

const registerSuccessGoogle = asyncHandler(async (req, res) => {
  const profile = req.session.passport.profile;
  const user = await User.findOne({
    accountId: profile.id,
    provider: 'google',
  });
  if (!user) {
    console.log('Adding new google user to DB..');
    const user = new User({
      accountId: profile.id,
      name: profile.displayName,
      provider: profile.provider,
      email: profile.emails[0].value, //optional - storing it as extra info
      // photoURL: profile.photos[0].value, //optional
    });
    await user.save();
    res.status(200).json(user);
  } else {
    console.log('google User already exist in DB.., please proceed to login');
    //==={destroy the session nefore redirecting user}========
    req.logout();
    req.session.destroy();
    const message =
      'google User already exist in DB.., please proceed to login';
    res.status(400).json({ success: false, message });
  }
});

const registerErrorGoogle = asyncHandler(async (req, res) => {
  (req, res) => res.send('Error logging in via Google..');
});

module.exports = {
  loginGoogle,
  loginCallbackGoogle,
  loginSuccessGoogle,
  loginErrorGoogle,
  registerGoogle,
  registerCallbackGoogle,
  registerSuccessGoogle,
  registerErrorGoogle,
};
