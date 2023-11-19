const asyncHandler = require('express-async-handler');
const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv").config();

const express = require('express');

//===={in use for sessions}=============================
const protectSession = asyncHandler(async (req, res, next) => {
  try {
    const session = req.session;
    // Verify session
    if (!session) {
      res.status(401);
      throw new Error('Not authorized, please login');
    }
    if (session && session.passport) {
      const profile = session.passport.user;

      // const user = await User.findOne({
      //   accountId: profile.id,
      //   provider: 'facebook',
      // });

      const user = await User.findOne({
        accountId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value ? profile.emails[0].value : profile.emails, // gmail || facebbok
      });

      if (!user) {
        res.status(401);
        throw new Error('User not found');
      }
      // ask user to register or change password

      req.user = user;
      next();
    }
  } catch (error) {
    res.status(401);
    throw new Error('Not authorized, please login');
  }
});

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1]; // to get the token // {"Bearer": `${token}`}
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded?.id);
        req.user = user;
        next();
      }
    } catch (error) {
      throw new Error("Not Authorized token expired, Please Login again");
    }
  } else {
    throw new Error(" There is no token attached to header");
  }
});

//jwt protect
const protect = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401);
      throw new Error('Not authenticated!');
    }

    // Verify Token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    // console.log({verified: verified})
    // Get user id from token
    const user = await User.findById(verified.id).select('-password');

    if (!user) {
      res.status(401);
      throw new Error('User not found');
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    throw new Error('Not authorized, please login');
    // throw new Error('Not ready');
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await User.findOne({ email });
  if (adminUser.role !== "Admin") {
    throw new Error("You are not an admin");
  } else {
    next();
  }
});


// module.exports = protect;
module.exports = { protectSession, isAdmin, authMiddleware, protect };
