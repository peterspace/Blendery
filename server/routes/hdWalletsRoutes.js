const express = require('express');
const router = express.Router();

// const protect = require('../middleware/authMiddleware.js');

const {
  addBitcoinHDWallet,
  addEVMHDWallet,
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
  sendBitcoinWallet,
  sendEVMWallet,
  sendTronWallet,
  getTransactionByTxId,
  addNewWalletAdmin,
  updateOneBlockchainTransactionById,
  sendBitcoinWalletAdmin,
  getBitcoinBalanceAdmin,
  updateOnePaidTransactionById,
} = require('../controllers/hdWalletController.js');

//router.use(verifyJWT)

//==========================={          }===============================================
//==========================={  CREATE  }===============================================
//==========================={          }===============================================

//========{Start: Active}==============================
router.post('/addBitcoinHDWallet', addBitcoinHDWallet);
router.post('/addEVMHDWallet', addEVMHDWallet);
router.post('/addTronHDWallet', addTronHDWallet);
router.post('/addNewWallet', addNewWallet);
router.post('/walletLogin', walletLogin);
router.patch('/updateBitcoinWallet', updateBitcoinWallet);
router.patch('/updateBitcoinHDWallet', updateBitcoinHDWallet);
router.patch('/updateEVMWallet', updateEVMWallet);
router.patch('/updateEVMHDWallet', updateEVMHDWallet);
router.patch('/updateTronWallet', updateTronWallet);
router.patch('/updateTronHDWallet', updateTronHDWallet);
router.get('/getWallets/:userId', getWallets);
router.get('/getAllWalletsById/:userId/:userWalletId', getAllWalletsById);
router.get('/getOneWallet/:userId/:userWalletId', getOneWallet);
router.post('/walletRecover', walletRecover);
router.post('/walletRecover2', walletRecover2);
router.get('/getBalance/:address/:userNetwork', getBalance);
router.post('/sendBitcoinWallet', sendBitcoinWallet);
router.post('/sendEVMWallet', sendEVMWallet);
router.post('/sendTronWallet', sendTronWallet);
router.get('/getTransactionByTxId/:txId', getTransactionByTxId);
router.patch(
  '/updateOneBlockchainTransactionById',
  updateOneBlockchainTransactionById
);

router.post('/sendBitcoinWalletAdmin', sendBitcoinWalletAdmin);
router.get('/getBitcoinBalanceAdmin', getBitcoinBalanceAdmin);

//==========================={         }===============================================
//==========================={  ADMIN }===============================================
//==========================={         }===============================================
router.post('/addNewWalletAdmin', addNewWalletAdmin);

router.patch('/updateOnePaidTransactionById', updateOnePaidTransactionById);

module.exports = router;
