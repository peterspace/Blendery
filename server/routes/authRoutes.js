const express = require('express');
const {
  loginFacebook,
  loginCallbackFacebook,
  loginSuccessFacebook,
  loginErrorFacebook,
  registerFacebook,
  registerCallbackFacebook,
  registerSuccessFacebook,
  registerErrorFacebook,
} = require('../controllers/auth/facebook-auth');

const {
  loginGoogle,
  loginCallbackGoogle,
  loginSuccessGoogle,
  loginErrorGoogle,
  registerGoogle,
  registerCallbackGoogle,
  registerSuccessGoogle,
  registerErrorGoogle,
} = require('../controllers/auth/google-auth');

const {
  loginLocal,
  registerLocal,
  loginSuccessLocal,
  loginErrorLocal,
  logout,
} = require('../controllers/auth/local-auth');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

//================={Facebook}=============================================
router.get('/facebook/login', loginFacebook);
router.get('/facebook/login/callback', loginCallbackFacebook);
router.get('/facebook/login/success', loginSuccessFacebook);
router.get('/facebook/login/error', loginErrorFacebook);
router.get('/facebook/register', registerFacebook);
router.get('/facebook/register/callback', registerCallbackFacebook);
router.get('/facebook/register/success', registerSuccessFacebook);
router.get('/facebook/register/error', registerErrorFacebook);
//================={Google}=============================================
router.get('/google/login', loginGoogle);
router.get('/google/login/callback', loginCallbackGoogle);
router.get('/google/login/success', loginSuccessGoogle);
router.get('/google/login/error', loginErrorGoogle);
router.get('/google/register', registerGoogle);
router.get('/google/register/callback', registerCallbackGoogle);
router.get('/google/register/success', registerSuccessGoogle);
router.get('/google/register/error', registerErrorGoogle);
//================={Local}=============================================
router.post('/local', loginLocal);
router.post('/local/register', registerLocal);
router.get('/local/success', loginSuccessLocal);
router.get('/local/error', loginErrorLocal);
router.post('/logout', logout); // global logout
// logout

module.exports = router;
