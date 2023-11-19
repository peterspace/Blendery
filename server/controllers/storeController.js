const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const { ethers } = require("ethers");

const User = require("../models/User.js");
// const Manager = require('../models/ManagerModel');

const Transaction = require("../models/transactionModel");
const Store = require("../models/store.js");
const StoreRecovery = require("../models/StoreRecovery.js");

const sendEmail = require("../utils/sendEmail");
const otpGenerator = require("otp-generator");

const axios = require("axios");

const {
  parseEther,
  formatEther,
  parseUnits,
  formatUnits,
} = require("@ethersproject/units");

const {
  addBitcoinHDWalletAdmin,
  addEVMHDWalletAdmin,
  addTronHDWalletAdmin,
  montitorBlockchainTransactionInternal,
  checkBlockchain,
  checkOneBlockchainTransaction,
} = require("../controllers/hdWalletController.js");

//====={Montor all blockchain transactions at intervals : default here is every minute}========================
//======{Pooling works and should be used for fetching and updating all current market data per set intervals}=================
const poolRequestForAllBlockchainTransactions = async () => {
  const intervalId = setInterval(() => {
    montitorBlockchainTransactionInternal();
  }, 60000); // check after every minute

  return () => {
    clearInterval(intervalId);
  };
};

// poolRequestForAllBlockchainTransactions()

// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};
// Generate OTP
const generateOrderId = async () => {
  // 8 digits AlphaNumeric OPT
  const newOTP = otpGenerator.generate(8, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: true,
    specialChars: false,
  });

  console.log({ OTP: newOTP });

  return newOTP;
};

const generateOTP = async () => {
  // 6 digits Numeric OPT
  const newOTP = otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  console.log({ OTP: newOTP });

  return newOTP;
};

const generatePin = async () => {
  // 6 digits Numeric OPT
  const newOTP = otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  console.log({ OTP: newOTP });

  return newOTP;
};

const generateAgentId = async () => {
  // 4 digits Numeric OPT

  const newOTP = otpGenerator.generate(4, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  console.log({ OTP: newOTP });

  return newOTP;
};

//====={Create new user if walletAddress does not exist}===================

const getTransactionWallet = async (chain) => {
  let blenderyAddress;

  switch (chain) {
    //MAINNETS
    //Arbitrum
    case "Bitcoin":
      const walletBTC = await addBitcoinHDWalletAdmin();

      if (walletBTC) {
        blenderyAddress = walletBTC?.address;
      }

      break;

    case "Ethereum":
      const walletETH = await addEVMHDWalletAdmin();

      if (walletETH) {
        blenderyAddress = walletETH?.address;
      }

      break;

    case "Tron":
      const walletTRX = await addTronHDWalletAdmin();

      if (walletTRX) {
        blenderyAddress = walletTRX?.address;
      }

      break;

    default:
      console.warn("Please choose a chain!");
      break;
  }

  let response = {
    blenderyAddress,
  };
  console.log(response);
  return response;
};

const createStore = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); // get userId from "protect middleware"
  const { currency, cryptoCurrency, bitcoinAddress, tronAddress } = req.body;
  console.log({ store: "active" });
  if (!user) {
    res.status(400);
    throw new Error("User not found, please login");
  }

  const pin = await generatePin(); // storePin
  const storeId = await generateAgentId(); // StoreId

  // const savedTransaction = await Store.create({
  //   user: user?._id,
  //   currency,
  //   cryptoCurrency,
  //   bitcoinAddress,
  //   tronAddress,
  //   pin, // to withdraw funds
  //   storeId,
  // });

  const savedTransaction = await StoreRecovery.create({
    user: user?._id,
    currency,
    cryptoCurrency,
    bitcoinAddress, // for withdrawals purpose only and should not exposed to clients customers
    tronAddress, // for withdrawals purpose only and should not exposed to clients customers
    pin, // to withdraw funds
    storeId,
  });

  if (savedTransaction) {
    res.status(200).json(savedTransaction);
  }
});

const createTransaction = asyncHandler(async (req, res) => {
  // generate newOrder number
  console.log({ calling: true });

  const {
    // userId,
    fToken,
    tToken,
    fValue,
    service,
    subService, // new to be added to frontend
    percentageProgress,
    youSend,
    youGet,
    serviceFee,
    networkFee,
    processingFee,
    exchangeRate,
    tValue,
    amount,
    provider,
    providerUrl,
    storeId,
  } = req.body;
  // const user = await User.findOne({ email });
  // const store = await Store.findOne({ storeId: storeId }).populate("user"); // get userId from "protect middleware"
  const store = await StoreRecovery.findOne({ storeId }).populate("user"); // get userId from "protect middleware"

  if (!store) {
    res.status(400);
    throw new Error("Store not found, please try again");
  }
  const newOrderId = await generateOrderId();

  console.log({ userData: req.body });
  if (service === "store" && subService === "store") {
    // const blenderyAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'; // test address
    const { blenderyAddress } = await getTransactionWallet(tToken?.chain); // tToken is crypto
    const savedTransaction = await Store.create({
      user: store?.user?._id,
      currency: store?.currency,
      cryptoCurrency: store?.cryptoCurrency,
      storeId,
      fToken,
      tToken,
      fValue,
      service,
      subService, // new to be added to frontend
      percentageProgress,
      chain: tToken?.chain,
      chainId: tToken?.chainId ? tToken?.chainId : "",
      orderNo: newOrderId,
      txId: newOrderId,
      blenderyAddress,
      timeLeft: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours
      youSend,
      youGet,
      serviceFee,
      networkFee,
      exchangeRate,
      tValue,
      amount,
      provider,
    });

    if (savedTransaction) {
      res.status(200).json(savedTransaction);
    }
  }
});
const updateTransactionById = asyncHandler(async (req, res) => {
  const {
    id, // new transaction mongodb id ==> transaction?._id
    service,
    subService,
    status,
    blenderyAddressOut,
    hashOut,
    progress,
  } = req.body;

  const transaction = await Store.findById(id);

  let timeLeft = new Date(transaction?.timeLeft).getTime();
  let currentTime = new Date(Date.now()).getTime();

  let updatedTimeStatus;

  // let updatedTimeLeft;
  //==={Is Active}==================
  if (timeLeft > currentTime) {
    updatedTimeStatus = "Active";
  }
  //==={Is Expired}==================
  if (timeLeft < currentTime) {
    updatedTimeStatus = "Expired";
  }

  const blockchainUrlBitcoinMainnet = "https://blockstream.info/tx";
  const blockchainUrlBitcoinTest = "https://blockstream.info/testnet/tx";
  const blockchainUrlBitcoinEndpoint = blockchainUrlBitcoinTest;
  const blockchainUrlBitcoin = `${blockchainUrlBitcoinEndpoint}/${hashOut}`;

  const tronblockchainUrlMainnet = "https://tronscan.org/#/transaction"; // goerli test net
  const tronblockchainUrlNile = "https://nile.tronscan.org/#/transaction"; // goerli test net
  const tronblockchainUrlEndpoint = tronblockchainUrlNile;
  const blockchainUrlTron = `${tronblockchainUrlEndpoint}/${hashOut}`;

  const blockchainUrlEthereumMainnet = "https://etherscan.io/tx"; // goerli test net
  const blockchainUrlEthereumGoerli = "https://goerli.etherscan.io/tx"; // goerli test net
  const blockchainUrlEthereumEndpoint = blockchainUrlEthereumGoerli;
  const blockchainUrlEthereum = `${blockchainUrlEthereumEndpoint}/${hashOut}`;
  let blockchainUrl = "";
  let chain;

  if (hashOut) {
    if (service === "store" && subService === "store") {
      chain = transaction?.tToken?.chain ? transaction?.tToken?.chain : "";
      if (chain === "Bitcoin") {
        blockchainUrl = blockchainUrlBitcoin;
      }
      if (chain === "Tron") {
        blockchainUrl = blockchainUrlTron;
      }
      if (chain === "Ethereum") {
        blockchainUrl = blockchainUrlEthereum;
      }
      //
    }
  }

  const blockchainUrlOut = blockchainUrl;
  // const percentageProgress = 5;
  // const status = 'Completed';

  let percentageProgress;
  if (status === "Completed") {
    percentageProgress = 5;
  } else {
    percentageProgress = progress;
  }

  //blenderyAddressOut: benderyAddress,

  //blockchainUrl
  if (transaction) {
    // transaction.blenderyAddress =
    //   req.body.blenderyAddress || transaction.blenderyAddress;
    transaction.blenderyAddressOut =
      blenderyAddressOut || transaction.blenderyAddressOut;
    transaction.status = status || transaction.status;
    transaction.hashOut = hashOut || transaction.hashOut;
    transaction.blockchainUrlOut =
      blockchainUrlOut || transaction.blockchainUrlOut;
    transaction.timeStatus = updatedTimeStatus || transaction?.timeStatus;
    transaction.percentageProgress =
      percentageProgress || transaction?.percentageProgress;
  }
  const response = await transaction.save();
  if (response) {
    console.log({ response: response });
    res.status(200).json(response);
  }
});
// user transaction on specific store
const getUserTransactionsByStore = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const { storeId } = req.body;

  const response = await Store.find({
    user: req.user.id,
    storeId: storeId,
  }).populate("user");

  if (response) {
    res.status(200).json(response);
  }
  // res.json(response);
});

const getAllUserTransactionsByStore = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const { storeId } = req.params;

  const response = await Store.find({ user: req.user.id }).populate("user");

  if (response) {
    res.status(200).json(response);
  }
  // res.json(response);
});

// Get all UserTransactions
const getOneUserTransaction = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); //user info
  const { id } = req.params; // transaction id

  const transaction = await Store.findOne({
    user: user._id,
    _id: id,
  }).populate("user");
  // await updateBlockChainTransactionsAutomaticallyInternal(transaction?._id);

  // res.json(
  //   await Transaction.findOne({ user: user._id, _id: id }).populate('message')
  // );

  // res.json(transaction);
  res.status(200).json(transaction);
});

const getTransactionByTxId = asyncHandler(async (req, res) => {
  const { txId } = req.params; // transaction id

  console.log({ txId: txId });

  res.json(await Store.findById(txId).populate("user"));
});

// not required
const getAllTransactionsByUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); // get managers userId from "protect middleware"
  const { userId } = req.params;
  if (user.role === "User") {
    res.json(await Store.find({ user: userId }).populate("user"));
  }
});

const updateTransactionsAutomatically = asyncHandler(async (req, res) => {
  const {
    id, // new transaction mongodb id ==> transaction?._id
    status, // new status ==> // pending, paid, completed, cancel, active, inActive
    percentageProgress,
  } = req.body;

  const transactionDoc = await Store.findById(id);

  let timeLeft = new Date(transactionDoc?.timeLeft).getTime();
  let currentTime = new Date(Date.now()).getTime();

  let updatedTimeStatus;

  // let updatedTimeLeft;
  //==={Is Active}==================
  if (timeLeft > currentTime) {
    updatedTimeStatus = "Active";
  }
  //==={Is Expired}==================
  if (timeLeft < currentTime) {
    updatedTimeStatus = "Expired";
  }
  // also, start transaction monitoring on blockchain from here
  //blockchainMonitoring()
  if (transactionDoc) {
    transactionDoc.status = status || transactionDoc?.status;
    transactionDoc.percentageProgress =
      percentageProgress || transactionDoc?.percentageProgress;
    transactionDoc.timeStatus = updatedTimeStatus || transactionDoc?.timeStatus;
    // transactionDoc.timeLeft = updatedTimeStatus === 'Expired' ? 0 : transactionDoc?.timeLeft; // if updatedTime status has expired, set timeleft to 0
  }
  const response = await transactionDoc.save();
  if (response) {
    res.status(200).json(response);
  }
});
const updateBlockChainTransaction = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const transactionDoc = await Store.findById(id);

  let timeLeft = new Date(transactionDoc?.timeLeft).getTime();
  let currentTime = new Date(Date.now()).getTime();

  let updatedTimeStatus;

  // let updatedTimeLeft;
  //==={Is Active}==================
  if (timeLeft > currentTime) {
    updatedTimeStatus = "Active";
  }
  //==={Is Expired}==================
  if (timeLeft < currentTime) {
    updatedTimeStatus = "Expired";
  }

  if (transactionDoc) {
    transactionDoc.timeStatus = updatedTimeStatus || transactionDoc?.timeStatus;
    // transactionDoc.timeLeft = updatedTimeStatus === 'Expired' ? 0 : transactionDoc?.timeLeft; // if updatedTime status has expired, set timeleft to 0
  }
  const response = await transactionDoc.save();
  console.log(response);
  // if (response) {
  //   res.status(200).json(response);
  // }
});

async function updateBlockChainTransactionsAutomaticallyInternal(id) {
  const transactionDoc = await Transaction.findById(id);

  let timeLeft = new Date(transactionDoc?.timeLeft).getTime();
  let currentTime = new Date(Date.now()).getTime();

  let updatedTimeStatus;

  // let updatedTimeLeft;
  //==={Is Active}==================
  if (timeLeft > currentTime) {
    updatedTimeStatus = "Active";
  }
  //==={Is Expired}==================
  if (timeLeft < currentTime) {
    updatedTimeStatus = "Expired";
  }

  if (transactionDoc) {
    transactionDoc.timeStatus = updatedTimeStatus || transactionDoc?.timeStatus;
    // transactionDoc.timeLeft = updatedTimeStatus === 'Expired' ? 0 : transactionDoc?.timeLeft; // if updatedTime status has expired, set timeleft to 0
  }
  const response = await transactionDoc.save();
  console.log(response);
  // if (response) {
  //   res.status(200).json(response);
  // }
}

//======{order confrimation and email notifications}=======================================
const orderConfirmation = asyncHandler(async (req, res) => {
  // const { email, txId } = req.body;

  const { email, txId, orderType, fromToken, toToken, fromAmount, toAmount } =
    req.body;

  if (!email) throw new Error("Sender not found with this email");
  if (!txId) throw new Error("Order number not found");

  const subject = "Order Confirmation";
  // const telegramGroupLink = `${process.env.FRONTEND_URL}/account`;

  const telegramGroupLink = `${process.env.FRONTEND_URL}/telegram`; // create telegram chatroom with botFather and use link

  //====={Testing}===============
  // const message = `
  // <h2>Hello ${email}</h2>

  // <p>Your request has been receieved and would be processed shortly</p>
  // <p>Please find your order number: ${txId} and click on the link to continue</p>
  // <a href=${telegramGroupLink} clicktracking=off>${telegramGroupLink}</a>
  // <p>Thank you for choosing Govercity</p>

  // <p>Regards...</p>
  // <p>Govercity Team</p>
  // `;

  //====={Production}===============

  const message = `
  <h2>Hello ${email}</h2>

  <p>Your ${orderType} request to exchange ${fromAmount}${fromToken?.symbol} to ${toAmount}${toToken?.symbol} has been receieved and would be processed shortly</p>
  <p>Please find your order number: ${txId} and click on the link below to continue your transaction</p>
  <a href=${telegramGroupLink} clicktracking=off>${telegramGroupLink}</a>
  <p>Thank you for choosing Govercity</p>

  <p>Regards...</p>
  <p>Govercity Team</p>
  `;

  //   const messageExample = `
  // <h2>Hello User</h2>

  // <p>Your Buy Crypto request to exchange 5USD  to 4.9USDT has been receieved and would be processed shortly</p>
  // <p>Please find your order number: 204 and click on the link below to continue your transaction</p>
  // <a href="https://www.telegram.com/goBuy" clicktracking=off>"https://www.telegram.com/goBuy"</a>
  // <p>Thank you for choosing Govercity</p>

  // <p>Regards...</p>
  // <p>Govercity Team</p>
  // `;

  const emailTest = "peter.space.io@gmail.com";

  // const send_to = email; // live production
  const send_to = emailTest; // testing
  const sent_from = process.env.EMAIL_USER;
  //  const sent_from = 'noreply@govercity.com',

  await sendEmail(subject, message, send_to, sent_from);
  res.status(200).json({ success: true, message: "Email sent" });
});

const geTokenPriceData = async (id) => {
  const url = "https://api.coingecko.com/api/v3/";
  const param = `coins/${id}`;
  const response = await axios.get(url + param);
  return response.data;
};

const getTokenAmount = async (token, value) => {
  let amount; // fValue formatted to transaction decimals
  let amountFixed;
  let estimatedGas; // to be completed
  if (token?.chain === "Bitcoin") {
    const satoshiToSend = Number(value) * 1e8; // check || 1e9
    amount = satoshiToSend;
  }

  if (token?.chain === "Ethereum") {
    // amount = ethers.utils.parseUnits(value.toString(), Number(token?.decimals)); // Example: 1 ETH or 1 token (adjust as needed)
    amount = parseUnits(
      value.toString(),
      token?.decimals.toString()
    ).toString(); // Gives fully formatted value and not hex value

    // amountFixed = Number(amount).toFixed(3);
  }

  if (token?.chain === "Tron") {
    // Amount in SUN (TRX)
    // const amount = 1000000; // Example: 1 TRX or 1,000,000 SUN (adjust as needed)
    const amountInSUN = Number(value) * 1e6;

    amount = amountInSUN;
  }

  // amountFixed = Number(amount).toFixed(3);

  const response = {
    amount,
    // estimatedGas,
    estimatedGas: 0.001, // testing
    // amountFixed,
  };

  // console.log({ response: response });
  return response;
};
const getTokenExchangeRate = asyncHandler(async (req, res) => {
  const { fToken, tToken, service, subService } = req.body;

  if (service === "store" && subService === "store") {
    //=================================================================================================
    const toPrice = await geTokenPriceData(tToken?.id);
    const toPriceData = toPrice?.market_data?.current_price;
    //=================================================================================================

    let exchangeRate;
    if (fToken?.symbol === "usd") {
      exchangeRate = Number(toPriceData?.usd);
    }
    if (fToken?.symbol === "gbp") {
      exchangeRate = Number(toPriceData?.gbp);
    }
    if (fToken?.symbol === "eur") {
      exchangeRate = Number(toPriceData?.eur);
    }
    if (fToken?.symbol === "rub") {
      exchangeRate = Number(toPriceData?.rub);
    }
    if (fToken?.symbol === "cad") {
      exchangeRate = Number(toPriceData?.cad);
    }
    if (fToken?.symbol === "aed") {
      exchangeRate = Number(toPriceData?.aed);
    }
    if (fToken?.symbol === "jpy") {
      exchangeRate = Number(toPriceData?.jpy);
    }
    if (fToken?.symbol === "ngn") {
      exchangeRate = Number(toPriceData?.ngn);
    }
    if (fToken?.symbol === "php") {
      exchangeRate = Number(toPriceData?.php);
    }
    if (fToken?.symbol === "chf") {
      exchangeRate = Number(toPriceData?.chf);
    }
    if (fToken?.symbol === "aud") {
      exchangeRate = Number(toPriceData?.aud);
    }

    if (isNaN(exchangeRate)) {
      exchangeRate = 0;
    }

    const response = {
      exchangeRateRaw: exchangeRate,
      exchangeRate: exchangeRate.toFixed(3),
    };

    res.status(200).json(response);
  }
});

const getTransactionRate = asyncHandler(async (req, res) => {
  const { fToken, tToken, exchangeRate, fValue, service, subService } =
    req.body;

  if (service === "store" && subService === "store") {
    //=================================================================================================

    let tValue = Number(fValue) / exchangeRate;

    const serviceFee = (0.25 / 100) * Number(fValue); // 0.25%

    // const networkFees = await getTxFees(txData) // from the blockchain
    const networkFee = (0.25 / 100) * Number(fValue); // should be from the blockchain

    const youSend = Number(fValue);

    const youGet = Number(fValue) - (serviceFee + networkFee);
    const { amount, estimatedGas } = await getTokenAmount(
      tToken,
      tValue.toString()
    );

    let tValueFormatted = Number(tValue).toFixed(4);
    if (isNaN(tValue)) {
      tValue = 0;
    }

    if (isNaN(tValueFormatted)) {
      tValueFormatted = 0;
    }
    const response = {
      youSend,
      youGet,
      serviceFeeRaw: serviceFee,
      serviceFee: serviceFee.toFixed(3),
      networkFeeRew: networkFee,
      networkFee: networkFee.toFixed(3),
      tValue,
      tValueFormatted,
      amount,
      estimatedGas,
    };

    res.status(200).json(response);
  }
});

const getTokenPriceData = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const url = `https://api.coingecko.com/api/v3/coins/${id}`;

  const response = await axios.get(url);
  const updatedResponse = await response.data;
  // return updatedResponse;
  res.status(200).json(updatedResponse);
});

//============================================================================================================================

module.exports = {
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
  getTokenPriceData,
};
