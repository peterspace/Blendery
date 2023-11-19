const express = require("express");
const {
  createStore,
  createTransaction,
  updateTransactionById,
  getUserTransactionsByStore,
  getAllUserTransactionsByStore,
  getOneUserTransaction,
  getTransactionByTxId,
  getAllTransactionsByUser,
  updateTransactionsAutomatically,
  updateBlockChainTransaction,
  getTokenExchangeRate,
  getTransactionRate,
} = require("../controllers/storeController");

const {
  updateOneBlockchainTransactionById,
} = require("../controllers/hdWalletController.js");
//updateOneBlockchainTransactionById

const { protect, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();
router.post("/createStore", protect, createStore);
// router.post("/createStore", createStore);

router.post("/createTransaction", createTransaction);
// router.route('/createTransaction').post(createTransaction);
router.get("/getUserTransactionsByStore", protect, getUserTransactionsByStore);
router.route("/getOneUserTransaction").get(protect, getOneUserTransaction);
router
  .route("/getAllTransactionsByUser")
  .get(protect, getAllTransactionsByUser);
router
  .route("/updateTransactionsAutomatically")
  .patch(updateTransactionsAutomatically);

router
  .route("/getAllUserTransactionsByStore")
  .get(protect, getAllUserTransactionsByStore);
router.route("/getTransactionByTxId/:txId").get(getTransactionByTxId);
router.route("/updateTransactionById").patch(updateTransactionById);


router.route("/getManagerActiveTransactions");
router.post("/getTokenExchangeRate", getTokenExchangeRate);
router.post("/getTransactionRate", getTransactionRate);
router.get("/updateBlockChainTransaction/:id", updateBlockChainTransaction);
router.patch(
  "/updateOneBlockchainTransactionById",
  updateOneBlockchainTransactionById
);

//updateBlockChainTransaction
module.exports = router;
