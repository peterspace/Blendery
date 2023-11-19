const express = require('express');
const router = express.Router();

// const protect = require('../middleware/authMiddleware.js');

const {
  addBitcoinWallet,
  addBitcoinHDWallet,
  addEVMWallet,
  addEVMHDWallet,
  addTronWallet,
  addTronHDWallet,
  addNewWallet,
  walletLogin,
  updateBitcoinWallet,
  updateBitcoinHDWallet,
  updateEVMWallet,
  updateEVMHDWallet,
  updateTronWallet,
  updateTronHDWallet,
  getWallets,
  getAllWalletsById,
  getOneWallet,
  walletRecover,
  walletRecover2,
  getBalance,
  createHDWalletOrder2,
  orderStatusBitcoin,
  orderStatusEvm,
  orderStatusTron,
  sendBitcoinWallet,
  sendEVMWallet,
  sendTronWallet,
} = require('../controllers/hdWalletController.js');

//router.use(verifyJWT)

//==========================={          }===============================================
//==========================={  CREATE  }===============================================
//==========================={          }===============================================

//========{Start: Active}==============================
router.post('/addBitcoinWallet', addBitcoinWallet);
router.post('/addBitcoinHDWallet', addBitcoinHDWallet);
router.post('/addEVMWallet', addEVMWallet);
router.post('/addEVMHDWallet', addEVMHDWallet);
router.post('/addTronWallet', addTronWallet);
router.post('/addTronHDWallet', addTronHDWallet);
router.post('/addNewWallet', addNewWallet);
router.post('/walletLogin', walletLogin);
router.patch('/updateBitcoinWallet', updateBitcoinWallet);
router.patch('/updateBitcoinHDWallet', updateBitcoinHDWallet);
router.patch('/updateEVMWallet', updateEVMWallet);
router.patch('/updateEVMHDWallet', updateEVMHDWallet);
router.patch('/updateTronWallet', updateTronWallet);
router.patch('/updateTronHDWallet', updateTronHDWallet);
router.post('/getWallets', getWallets);
router.post('/getAllWalletsById', getAllWalletsById);
router.post('/getOneWallet', getOneWallet);
router.post('/walletRecover', walletRecover);
router.post('/walletRecover2', walletRecover2);
router.post('/getBalance', getBalance);
router.post('/createHDWalletOrder2', createHDWalletOrder2);
router.post('/orderStatusBitcoin', orderStatusBitcoin);
router.post('/orderStatusEvm', orderStatusEvm);
router.post('/orderStatusTron', orderStatusTron);
router.post('/sendBitcoinWallet', sendBitcoinWallet);
router.post('/sendEVMWallet', sendEVMWallet);
router.post('/sendTronWallet', sendTronWallet);

//==========================={         }===============================================
//==========================={  UPDATE }===============================================
//==========================={         }===============================================

module.exports = router;
