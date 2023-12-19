const express = require('express');
const {
  createTransaction,
  getUserTransactions,
  getOneUserTransaction,
  updateUserTransaction,
  updateTransactionsAutomatically,
  getMyManagersTransactionById,
  getMyUserTransactionById,
  getMyTransactions,
  getAllTransactionsByUser,
  getOneManagersTransactionByAdmin,
  getAllManagersTransactionByAdmin,
  getAllTransactions,
  registrationConfirmation,
  transactionConfirmation,
  transactionCompleted,
  getTransactionByTxId,
  updateTransactionById,
  getUserTransactionById,
  getUserInactiveTransactions,
  getUserActiveTransactions,
  getManagerActiveTransactions,
  orderConfirmation,
  orderCompleted,
  getTokenExchangeRate,
  getTransactionRate,
  updateTransactionRatesById,
  //====={transactions by services and subservices}===========================
  getUserExchange,
  getUserDefi,
  getUserBuyCash,
  getUserBuyCard,
  getUserSellCash,
  getUserSellCard,
  getTokenPriceData,
  updateBlockChainTransaction,
  //============{Admin: transactions by services and subservices}============
  getAdminExchange,
  getAdminDefi,
  getAdminBuyCash,
  getAdminBuyCard,
  getAdminSellCash,
  getAdminSellCard,
  //============================{STORE}======================================================
  createStore,
  createTransactionStore,
  updateTransactionByIdStore,
  getUserTransactionsByStore,
  getAllUserTransactionsByStore,
  getOneUserTransactionStore,
  getTransactionByTxIdStore,
  getAllTransactionsByUserStore,
  updateTransactionsAutomaticallyStore,
  updateBlockChainTransactionStore,
  //============================{DEFI}======================================================
  getTokenExchangeRateSwap,
  getTransactionRateSwap,
  getChainRateSwap,
  getChainPrice,
  getSpender,
  getSwapApproval,
  swap,
} = require('../controllers/transactionController');

const {
  updateOneBlockchainTransactionById,
  updateOnePaidTransactionById,
  getMasterWallets,
  getMasterWalletsAdmin,
} = require('../controllers/hdWalletController.js');
//updateOneBlockchainTransactionById

const { protect, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/createTransaction', protect, createTransaction);
// router.route('/createTransaction').post(createTransaction);
router.get('/getUserTransactions', protect, getUserTransactions);
router.route('/getOneUserTransaction').get(protect, getOneUserTransaction);
router
  .route('/getAllTransactionsByUser')
  .get(protect, getAllTransactionsByUser);
router.route('/updateUserTransaction').patch(protect, updateUserTransaction);
router
  .route('/updateTransactionsAutomatically')
  .patch(updateTransactionsAutomatically);

router
  .route('/getMyUserTransactionById/:userId')
  .get(protect, getMyUserTransactionById);
router.route('/getMyTransactions').get(protect, getMyTransactions);
// router.route('/getMyTransactions/:id').get(getMyTransactions);
router
  .route('/getMyUserTransactionById/:managerId')
  .get(protect, getMyManagersTransactionById);
router
  .route('/getOneManagersTransactionByAdmin/:id/:managerId')
  .get(protect, getOneManagersTransactionByAdmin);
router
  .route('/getAllManagersTransactionByAdmin/:managerId')
  .get(protect, getAllManagersTransactionByAdmin);
router.route('/registrationConfirmation').post(registrationConfirmation);
router.route('/transactionConfirmation').post(transactionConfirmation);
router.route('/transactionCompleted').post(transactionCompleted);
router.route('/getTransactionByTxId/:txId').get(getTransactionByTxId);
router.route('/updateTransactionById').patch(updateTransactionById);
router.route('/getUserTransactionById/:id').get(getUserTransactionById);
router
  .route('/getUserInactiveTransactions')
  .get(protect, getUserInactiveTransactions);

router
  .route('/getUserActiveTransactions')
  .get(protect, getUserActiveTransactions);

router
  .route('/getManagerActiveTransactions')
  .get(protect, getManagerActiveTransactions);

router.post('/orderConfirmation', orderConfirmation);
router.post('/orderCompleted', orderCompleted);
router.post('/getTokenExchangeRate', getTokenExchangeRate);
router.post('/getTransactionRate', getTransactionRate);
router.route('/updateTransactionRatesById').patch(updateTransactionRatesById);

//============{transactions by services and subservices}============

router.route('/getUserExchange').get(protect, getUserExchange);
router.route('/getUserDefi').get(protect, getUserDefi);
router.route('/getUserBuyCash').get(protect, getUserBuyCash);
router.route('/getUserBuyCard').get(protect, getUserBuyCard);
router.route('/getUserSellCash').get(protect, getUserSellCash);
router.route('/getUserSellCard').get(protect, getUserSellCard);
router.get('/updateBlockChainTransaction/:id', updateBlockChainTransaction);

router.get('/getTokenPriceData/:id', getTokenPriceData);
//============{Admin: transactions by services and subservices}============
router.route('/getAllTransactions').get(protect, isAdmin, getAllTransactions);
// router.route('/getAllTransactions').get(getAllTransactions);
router.route('/getAdminExchange').get(protect, isAdmin, getAdminExchange);
router.route('/getAdminDefi').get(protect, isAdmin, getAdminDefi);
router.route('/getAdminBuyCash').get(protect, isAdmin, getAdminBuyCash);
router.route('/getAdminBuyCard').get(protect, isAdmin, getAdminBuyCard);
router.route('/getAdminSellCash').get(protect, isAdmin, getAdminSellCash);
router.route('/getAdminSellCard').get(protect, isAdmin, getAdminSellCard);

//==============================={frpm hdWallets}=======================================
router.patch(
  '/updateOneBlockchainTransactionById',
  updateOneBlockchainTransactionById
);
router.patch('/updateOnePaidTransactionById', updateOnePaidTransactionById);
router.get('/getMasterWallets', getMasterWallets);
router
  .route('/getMasterWalletsAdmin')
  .get(protect, isAdmin, getMasterWalletsAdmin); // admin protected route

//============================{STORE}======================================================
router.post('/createStore', protect, createStore);
router.post('/createTransactionStore', createTransactionStore);
router.get('/getUserTransactionsByStore', protect, getUserTransactionsByStore);
router
  .route('/getOneUserTransactionStore')
  .get(protect, getOneUserTransactionStore);
router
  .route('/getAllTransactionsByUserStore')
  .get(protect, getAllTransactionsByUserStore);
router
  .route('/updateTransactionsAutomaticallyStore')
  .patch(updateTransactionsAutomaticallyStore);

router
  .route('/getAllUserTransactionsByStore')
  .get(protect, getAllUserTransactionsByStore);
router.route('/getTransactionByTxIdStore/:txId').get(getTransactionByTxIdStore);
router.route('/updateTransactionByIdStore').patch(updateTransactionByIdStore);
router.get(
  '/updateBlockChainTransactionStore/:id',
  updateBlockChainTransactionStore
);
//============================{DEFI}======================================================
router.post('/getTokenExchangeRateSwap', getTokenExchangeRateSwap);
router.post('/getTransactionRateSwap', getTransactionRateSwap);
router.post('/getChainRateSwap', getChainRateSwap);
router.post('/getChainPrice', getChainPrice);
router.post('/getSpender', getSpender);
router.post('/getSwapApproval', getSwapApproval);
router.post('/swap', swap);

module.exports = router;
