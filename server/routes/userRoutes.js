const express = require('express');
const {
  registerUser,
  registerAdmin,
  login,
  allUsers,
  usersAdmin,
  getUser,
  updateUser,
  getUserById,
  changePassword,
  resetPassword,
  forgotPassword,
  logout,
  loginUser,
  loginByFacebook,
  registerSocial,
  loginSocial,
  authSucessGoogle,
  authErrorGoogle,
  authSucessFacebook,
  authErrorFacebook,
  forgotOtp,
  verifyOtp,
} = require('../controllers/userControllers');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/registerAdmin').post(registerAdmin);
// router.route('/login').post(login); // New
router.post('/login', loginUser);

router.route('/adminUsers').get(usersAdmin);

//============{main focus}===========================
router.route('/').get(protect, allUsers);
router.route('/getUser').get(protect, getUser);
router.route('/updateUser').patch(protect, updateUser);
router.route('/getUserById/:userId').get(getUserById);
router.patch('/changePassword', changePassword);
router.post('/forgotPassword', forgotPassword);
router.put('/resetPassword/:resetToken', resetPassword);
//============{New}===========================
router.post('/registerSocial', registerSocial);
router.post('/loginSocial', loginSocial);
router.get('/authSucessGoogle', authSucessGoogle);
router.get('/authErrorGoogle', authErrorGoogle);
router.get('/authSucessFacebook', authSucessFacebook);
router.get('/authErrorFacebook', authErrorFacebook);
router.get('/loginByFacebook', loginByFacebook);
router.post('/logout', logout);
router.post('/forgotOtp', forgotOtp);
router.post('/verifyOtp', verifyOtp);
// logout

module.exports = router;
