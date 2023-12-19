const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const { ethers } = require("ethers");
const User = require("../models/User.js");
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
  addTransactionWalletBitcoin,
  addTransactionWalletEVM,
  addTransactionWalletTron,
} = require("../controllers/hdWalletController.js");

let fee = process.env.SWAP_FEE;
let dexAddress = process.env.DEX_ADDRESS;
const token = process.env.ONE_INCH_TOKEN;
const version = "v5.2";

/**************************************************************************************************************
 **************************************************************************************************************

                                          User Block
                      
 **************************************************************************************************************
 **************************************************************************************************************
 */

//====={Montor all blockchain transactions at intervals : default here is every minute}========================
//======{Pooling works and should be used for fetching and updating all current market data per set intervals}=================

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


//===={Transaction wallets are not assigned from pre-created wallets}==========
const getTransactionWallet = async (chain) => {
  let blenderyAddress;

  switch (chain) {
    //MAINNETS
    //Arbitrum
    case "Bitcoin":
      const walletBTC = await addTransactionWalletBitcoin();

      if (walletBTC) {
        blenderyAddress = walletBTC?.address;
      }

      break;

    case "Ethereum":
      const walletETH = await addTransactionWalletEVM();

      if (walletETH) {
        blenderyAddress = walletETH?.address;
      }

      break;

    case "Tron":
      const walletTRX = await addTransactionWalletTron();

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

const createTransaction1 = asyncHandler(async (req, res) => {
  // generate newOrder number
  console.log({ calling: true });
  const user = await User.findById(req.user._id); // get userId from "protect middleware"
  if (!user) {
    res.status(400);
    throw new Error("User not found, please login");
  }
  const newOrderId = await generateOrderId();

  const {
    // userId,
    fToken,
    tToken,
    fValue,
    userAddress,
    service,
    subService, // new to be added to frontend
    percentageProgress,
    country,
    city,
    telegram,
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
  } = req.body;

  console.log({ userData: req.body });

  let pin;
  let agentId;

  if (service === "exchange" && subService === "exchange") {
    console.log({ status: true });
    // console.log({ userExists: userExists });

    // const blenderyAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'; // test address
    const { blenderyAddress } = await getTransactionWallet(fToken?.chain); // fToken is crypto and the sending token
    const savedTransaction = await Transaction.create({
      user: user?._id,
      fToken,
      tToken,
      fValue,
      userAddress,
      service,
      subService, // new to be added to frontend
      percentageProgress,
      chain: fToken?.chain ? fToken?.chain : "",
      chainId: fToken?.chainId ? fToken?.chainId : "",
      //======{generated data}=================
      orderNo: newOrderId,
      txId: newOrderId,
      blenderyAddress,
      timeLeft: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours
      youSend,
      youGet,
      serviceFee,
      networkFee,
      // processingFee,// not required
      exchangeRate,
      tValue,
      amount,
    });

    if (savedTransaction) {
      res.status(200).json(savedTransaction);
    }
  }

  if (service === "defi" && subService === "defi") {
    // console.log({ userExists: userExists });

    const savedTransaction = await Transaction.create({
      user: user?._id,
      fToken,
      tToken,
      fValue,
      userAddress,
      service,
      subService, // new to be added to frontend
      percentageProgress,
      chain: fToken?.chain ? fToken?.chain : "",
      chainId: fToken?.chainId ? fToken?.chainId : "",
      //======{generated data}=================
      orderNo: newOrderId,
      txId: newOrderId,
      // blenderyAddress,
      youSend,
      youGet,
      serviceFee,
      networkFee,
      exchangeRate,
      tValue,
      amount,
    });

    if (savedTransaction) {
      res.status(200).json(savedTransaction);
    }
  }

  if (service === "buy" && subService === "buyCash") {
    pin = await generatePin();
    agentId = await generateAgentId();
    // const blenderyAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'; // test address
    const { blenderyAddress } = await getTransactionWallet(tToken?.chain); // tToken is crypto
    const savedTransaction = await Transaction.create({
      user: user?._id,
      fToken,
      tToken,
      fValue,
      userAddress,
      service,
      subService, // new to be added to frontend
      percentageProgress,
      country,
      city,
      telegram,
      chain: tToken?.chain,
      chainId: tToken?.chainId ? tToken?.chainId : "",
      //======{generated data}=================
      location: city, // to find meeting point between dispatcher and user
      orderNo: newOrderId,
      txId: newOrderId,
      // blenderyAddress,
      timeLeft: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours
      dispatcherId: `A${agentId}`, // A2562
      pin,
      youSend,
      youGet,
      serviceFee,
      networkFee,
      exchangeRate,
      tValue,
      amount,
    });

    if (savedTransaction) {
      res.status(200).json(savedTransaction);
    }
  }

  if (service === "buy" && subService === "buyCard") {
    pin = await generatePin();
    agentId = await generateAgentId();
    // const blenderyAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'; // test address
    const { blenderyAddress } = await getTransactionWallet(tToken?.chain); // tToken is crypto

    const savedTransaction = await Transaction.create({
      user: user?._id,
      fToken,
      tToken,
      fValue,
      userAddress,
      service,
      subService, // new to be added to frontend
      percentageProgress,
      country,
      city,
      // telegram, // not required
      chain: fToken?.chain ? fToken?.chain : "",
      chainId: tToken?.chainId ? tToken?.chainId : "",
      //======{generated data}=================
      location: city, // to choose between yandexPay or Stripe
      orderNo: newOrderId,
      txId: newOrderId,
      // blenderyAddress,
      timeLeft: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours
      dispatcherId: `A${agentId}`, // A2562
      pin,
      youSend,
      youGet,
      processingFee,
      exchangeRate,
      tValue,
      amount,
      provider,
      providerUrl,
    });

    if (savedTransaction) {
      res.status(200).json(savedTransaction);
    }
  }

  if (service === "sell" && subService === "sellCash") {
    pin = await generatePin();
    agentId = await generateAgentId();
    // const blenderyAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'; // test address
    const { blenderyAddress } = await getTransactionWallet(fToken?.chain); // fToken is crypto
    const savedTransaction = await Transaction.create({
      user: user?._id,
      fToken,
      tToken,
      fValue,
      userAddress,
      service,
      subService, // new to be added to frontend
      percentageProgress,
      country,
      telegram,
      chain: fToken?.chain ? fToken?.chain : "",
      chainId: fToken?.chainId ? fToken?.chainId : "",
      //======{generated data}=================
      location: city,
      orderNo: newOrderId,
      txId: newOrderId,
      blenderyAddress,
      timeLeft: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours
      dispatcherId: `A${agentId}`, // A2562
      pin,
      youSend,
      youGet,
      serviceFee,
      networkFee,
      exchangeRate,
      tValue,
      amount,
    });

    if (savedTransaction) {
      res.status(200).json(savedTransaction);
    }
  }
  if (service === "sell" && subService === "sellCard") {
    pin = await generatePin();
    agentId = await generateAgentId();
    // const blenderyAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'; // test address
    const { blenderyAddress } = await getTransactionWallet(fToken?.chain); // fToken is crypto
    const savedTransaction = await Transaction.create({
      user: user?._id,
      fToken,
      tToken,
      fValue,
      userAddress,
      service,
      subService, // new to be added to frontend
      percentageProgress,
      country,
      city,
      // telegram, // not required
      chain: fToken?.chain ? fToken?.chain : "",
      chainId: fToken?.chainId ? fToken?.chainId : "",
      //======{generated data}=================
      location: city, // to choose between yandexPay or Stripe
      orderNo: newOrderId,
      txId: newOrderId,
      blenderyAddress,
      timeLeft: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours
      dispatcherId: `A${agentId}`, // A2562
      pin,
      youSend,
      youGet,
      serviceFee,
      networkFee,
      exchangeRate,
      tValue,
      amount,
      provider,
      providerUrl,
    });

    if (savedTransaction) {
      res.status(200).json(savedTransaction);
    }
  }
});

const createTransaction2 = asyncHandler(async (req, res) => {
  // generate newOrder number
  console.log({ calling: true });
  const user = await User.findById(req.user._id); // get userId from "protect middleware"
  if (!user) {
    res.status(400);
    throw new Error("User not found, please login");
  }
  const newOrderId = await generateOrderId();

  const {
    // userId,
    fToken,
    tToken,
    fValue,
    userAddress,
    service,
    subService, // new to be added to frontend
    percentageProgress,
    country,
    city,
    telegram,
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
    fullName,
    bankName,
    cardNumber,
    phone,
  } = req.body;

  console.log({ userData: req.body });

  let pin;
  let agentId;

  if (service === "exchange" && subService === "exchange") {
    console.log({ status: true });
    // console.log({ userExists: userExists });

    // const blenderyAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'; // test address
    const { blenderyAddress } = await getTransactionWallet(fToken?.chain); // fToken is crypto and the sending token
    const savedTransaction = await Transaction.create({
      user: user?._id,
      fToken,
      tToken,
      fValue,
      userAddress,
      service,
      subService, // new to be added to frontend
      percentageProgress,
      chain: fToken?.chain ? fToken?.chain : "",
      chainId: fToken?.chainId ? fToken?.chainId : "",
      //======{generated data}=================
      orderNo: newOrderId,
      txId: newOrderId,
      blenderyAddress,
      timeLeft: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours
      youSend,
      youGet,
      serviceFee,
      networkFee,
      // processingFee,// not required
      exchangeRate,
      tValue,
      amount,
    });
    // console.log()

    if (savedTransaction) {
      res.status(200).json(savedTransaction);
    }
  }

  if (service === "defi" && subService === "defi") {
    // console.log({ userExists: userExists });

    const savedTransaction = await Transaction.create({
      user: user?._id,
      fToken,
      tToken,
      fValue,
      userAddress,
      service,
      subService, // new to be added to frontend
      percentageProgress,
      chain: fToken?.chain ? fToken?.chain : "",
      chainId: fToken?.chainId ? fToken?.chainId : "",
      //======{generated data}=================
      orderNo: newOrderId,
      txId: newOrderId,
      // blenderyAddress,
      youSend,
      youGet,
      serviceFee,
      networkFee,
      exchangeRate,
      tValue,
      amount,
    });

    if (savedTransaction) {
      res.status(200).json(savedTransaction);
    }
  }

  if (service === "buy" && subService === "buyCash") {
    pin = await generatePin();
    agentId = await generateAgentId();
    // const blenderyAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'; // test address
    const { blenderyAddress } = await getTransactionWallet(tToken?.chain); // tToken is crypto
    const savedTransaction = await Transaction.create({
      user: user?._id,
      fToken,
      tToken,
      fValue,
      userAddress,
      service,
      subService, // new to be added to frontend
      percentageProgress,
      country,
      city,
      telegram,
      chain: tToken?.chain,
      chainId: tToken?.chainId ? tToken?.chainId : "",
      //======{generated data}=================
      location: city, // to find meeting point between dispatcher and user
      orderNo: newOrderId,
      txId: newOrderId,
      // blenderyAddress,
      timeLeft: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours
      dispatcherId: `A${agentId}`, // A2562
      pin,
      youSend,
      youGet,
      serviceFee,
      networkFee,
      exchangeRate,
      tValue,
      amount,
    });

    if (savedTransaction) {
      res.status(200).json(savedTransaction);
    }
  }

  if (service === "buy" && subService === "buyCard") {
    pin = await generatePin();
    agentId = await generateAgentId();
    // const blenderyAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'; // test address
    const { blenderyAddress } = await getTransactionWallet(tToken?.chain); // tToken is crypto

    const savedTransaction = await Transaction.create({
      user: user?._id,
      fToken,
      tToken,
      fValue,
      userAddress,
      service,
      subService, // new to be added to frontend
      percentageProgress,
      country,
      city,
      // telegram, // not required
      chain: fToken?.chain ? fToken?.chain : "",
      chainId: tToken?.chainId ? tToken?.chainId : "",
      //======{generated data}=================
      location: city, // to choose between yandexPay or Stripe
      orderNo: newOrderId,
      txId: newOrderId,
      // blenderyAddress,
      timeLeft: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours
      dispatcherId: `A${agentId}`, // A2562
      pin,
      youSend,
      youGet,
      processingFee,
      exchangeRate,
      tValue,
      amount,
      provider,
      providerUrl,
      fullName,
      bankName,
      cardNumber,
      phone,
    });

    if (savedTransaction) {
      res.status(200).json(savedTransaction);
    }
  }

  if (service === "sell" && subService === "sellCash") {
    pin = await generatePin();
    agentId = await generateAgentId();
    // const blenderyAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'; // test address
    const { blenderyAddress } = await getTransactionWallet(fToken?.chain); // fToken is crypto
    const savedTransaction = await Transaction.create({
      user: user?._id,
      fToken,
      tToken,
      fValue,
      userAddress,
      service,
      subService, // new to be added to frontend
      percentageProgress,
      country,
      telegram,
      chain: fToken?.chain ? fToken?.chain : "",
      chainId: fToken?.chainId ? fToken?.chainId : "",
      //======{generated data}=================
      location: city,
      orderNo: newOrderId,
      txId: newOrderId,
      blenderyAddress,
      timeLeft: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours
      dispatcherId: `A${agentId}`, // A2562
      pin,
      youSend,
      youGet,
      serviceFee,
      networkFee,
      exchangeRate,
      tValue,
      amount,
    });

    if (savedTransaction) {
      res.status(200).json(savedTransaction);
    }
  }
  if (service === "sell" && subService === "sellCard") {
    pin = await generatePin();
    agentId = await generateAgentId();
    // const blenderyAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'; // test address
    const { blenderyAddress } = await getTransactionWallet(fToken?.chain); // fToken is crypto
    const savedTransaction = await Transaction.create({
      user: user?._id,
      fToken,
      tToken,
      fValue,
      userAddress,
      service,
      subService, // new to be added to frontend
      percentageProgress,
      country,
      city,
      // telegram, // not required
      chain: fToken?.chain ? fToken?.chain : "",
      chainId: fToken?.chainId ? fToken?.chainId : "",
      //======{generated data}=================
      location: city, // to choose between yandexPay or Stripe
      orderNo: newOrderId,
      txId: newOrderId,
      blenderyAddress,
      timeLeft: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours
      dispatcherId: `A${agentId}`, // A2562
      pin,
      youSend,
      youGet,
      serviceFee,
      networkFee,
      exchangeRate,
      tValue,
      amount,
      provider,
      providerUrl,
      fullName,
      bankName,
      cardNumber,
      phone,
    });

    if (savedTransaction) {
      res.status(200).json(savedTransaction);
    }
  }
});

const createTransaction = asyncHandler(async (req, res) => {
  // generate newOrder number
  console.log({ calling: true });
  const user = await User.findById(req.user._id); // get userId from "protect middleware"
  if (!user) {
    res.status(400);
    throw new Error("User not found, please login");
  }
  const newOrderId = await generateOrderId();

  const {
    // userId,
    fToken,
    tToken,
    fValue,
    userAddress,
    service,
    subService, // new to be added to frontend
    percentageProgress,
    country,
    city,
    telegram,
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
    fullName,
    bankName,
    cardNumber,
    phone,
  } = req.body;

  console.log({ userData: req.body });

  let pin;
  let agentId;

  if (service === "exchange" && subService === "exchange") {
    console.log({ status: true });
    // console.log({ userExists: userExists });

    // const blenderyAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'; // test address
    const { blenderyAddress } = await getTransactionWallet(fToken?.chain); // fToken is crypto and the sending token
    const savedTransaction = await Transaction.create({
      user: user?._id,
      fToken,
      tToken,
      fValue,
      userAddress,
      service,
      subService, // new to be added to frontend
      percentageProgress,
      chain: fToken?.chain ? fToken?.chain : "",
      chainId: fToken?.chainId ? fToken?.chainId : "",
      //======{generated data}=================
      orderNo: newOrderId,
      txId: newOrderId,
      blenderyAddress,
      timeLeft: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours
      youSend,
      youGet,
      serviceFee,
      networkFee,
      // processingFee,// not required
      exchangeRate,
      tValue,
      amount,
    });
    // console.log()

    if (savedTransaction) {
      res.status(200).json(savedTransaction);
    }
  }

  if (service === "defi" && subService === "defi") {
    // console.log({ userExists: userExists });

    const savedTransaction = await Transaction.create({
      user: user?._id,
      fToken,
      tToken,
      fValue,
      userAddress,
      service,
      subService, // new to be added to frontend
      percentageProgress,
      chain: fToken?.chain ? fToken?.chain : "",
      chainId: fToken?.chainId ? fToken?.chainId : "",
      //======{generated data}=================
      orderNo: newOrderId,
      txId: newOrderId,
      // blenderyAddress,
      youSend,
      youGet,
      serviceFee,
      networkFee,
      exchangeRate,
      tValue,
      amount,
    });

    if (savedTransaction) {
      res.status(200).json(savedTransaction);
    }
  }

  if (service === "buy" && subService === "buyCash") {
    pin = await generatePin();
    agentId = await generateAgentId();
    const savedTransaction = await Transaction.create({
      user: user?._id,
      fToken,
      tToken,
      fValue,
      userAddress,
      service,
      subService, // new to be added to frontend
      percentageProgress,
      country,
      city,
      telegram,
      chain: tToken?.chain,
      chainId: tToken?.chainId ? tToken?.chainId : "",
      //======{generated data}=================
      location: city, // to find meeting point between dispatcher and user
      orderNo: newOrderId,
      txId: newOrderId,
      // blenderyAddress,
      timeLeft: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours
      dispatcherId: `A${agentId}`, // A2562
      pin,
      youSend,
      youGet,
      serviceFee,
      networkFee,
      exchangeRate,
      tValue,
      amount,
    });

    if (savedTransaction) {
      res.status(200).json(savedTransaction);
    }
  }

  if (service === "buy" && subService === "buyCard") {
    pin = await generatePin();
    agentId = await generateAgentId();
    const savedTransaction = await Transaction.create({
      user: user?._id,
      fToken,
      tToken,
      fValue,
      userAddress,
      service,
      subService, // new to be added to frontend
      percentageProgress,
      country,
      city,
      // telegram, // not required
      chain: fToken?.chain ? fToken?.chain : "",
      chainId: tToken?.chainId ? tToken?.chainId : "",
      //======{generated data}=================
      location: city, // to choose between yandexPay or Stripe
      orderNo: newOrderId,
      txId: newOrderId,
      // blenderyAddress,
      timeLeft: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours
      dispatcherId: `A${agentId}`, // A2562
      pin,
      youSend,
      youGet,
      processingFee,
      exchangeRate,
      tValue,
      amount,
      provider,
      providerUrl,
      fullName,
      bankName,
      cardNumber,
      phone,
    });

    if (savedTransaction) {
      res.status(200).json(savedTransaction);
    }
  }

  if (service === "sell" && subService === "sellCash") {
    pin = await generatePin();
    agentId = await generateAgentId();
    // const blenderyAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'; // test address
    const { blenderyAddress } = await getTransactionWallet(fToken?.chain); // fToken is crypto
    const savedTransaction = await Transaction.create({
      user: user?._id,
      fToken,
      tToken,
      fValue,
      userAddress,
      service,
      subService, // new to be added to frontend
      percentageProgress,
      country,
      telegram,
      chain: fToken?.chain ? fToken?.chain : "",
      chainId: fToken?.chainId ? fToken?.chainId : "",
      //======{generated data}=================
      location: city,
      orderNo: newOrderId,
      txId: newOrderId,
      blenderyAddress,
      timeLeft: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours
      dispatcherId: `A${agentId}`, // A2562
      pin,
      youSend,
      youGet,
      serviceFee,
      networkFee,
      exchangeRate,
      tValue,
      amount,
    });

    if (savedTransaction) {
      res.status(200).json(savedTransaction);
    }
  }
  if (service === "sell" && subService === "sellCard") {
    pin = await generatePin();
    agentId = await generateAgentId();
    // const blenderyAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'; // test address
    const { blenderyAddress } = await getTransactionWallet(fToken?.chain); // fToken is crypto
    const savedTransaction = await Transaction.create({
      user: user?._id,
      fToken,
      tToken,
      fValue,
      userAddress,
      service,
      subService, // new to be added to frontend
      percentageProgress,
      country,
      city,
      // telegram, // not required
      chain: fToken?.chain ? fToken?.chain : "",
      chainId: fToken?.chainId ? fToken?.chainId : "",
      //======{generated data}=================
      location: city, // to choose between yandexPay or Stripe
      orderNo: newOrderId,
      txId: newOrderId,
      blenderyAddress,
      timeLeft: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours
      dispatcherId: `A${agentId}`, // A2562
      pin,
      youSend,
      youGet,
      serviceFee,
      networkFee,
      exchangeRate,
      tValue,
      amount,
      provider,
      providerUrl,
      fullName,
      bankName,
      cardNumber,
      phone,
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
    dispatcherTelegram,
    dispatcherName,
    progress,
  } = req.body;
  console.log({ buycashDataDBIn: req.body });

  const transaction = await Transaction.findById(id);

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
    if (service === "buy" && subService === "buyCash") {
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

    if (service === "buy" && subService === "buyCard") {
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
    }

    if (service === "exchange" && subService === "exchange") {
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
    transaction.dispatcherTelegram =
      dispatcherTelegram || transaction.dispatcherTelegram;
    transaction.dispatcherName = dispatcherName || transaction.dispatcherName;
    transaction.timeStatus = updatedTimeStatus || transaction?.timeStatus;
    transaction.percentageProgress =
      percentageProgress || transaction?.percentageProgress;
  }
  const response = await transaction.save();
  console.log({ buycashDataDBOut: response });

  if (response) {
    console.log({ response: response });
    res.status(200).json(response);
  }
});

const updateTransactionById2 = asyncHandler(async (req, res) => {
  // const transaction = await Transaction.findById(req.body.id);

  const blockchainUrlBitcoinMainnet =
    "https://www.blockchain.com/explorer/transactions/btc";
  const blockchainUrlBitcoinTest = "";
  const blockchainUrlBitcoinEndpoint = blockchainUrlBitcoinMainnet;
  const blockchainUrlBitcoin = `${blockchainUrlBitcoinEndpoint}/${req.body.hash}`;

  const tronblockchainUrlMainnet = "https://tronscan.org/#/transaction"; // goerli test net
  const tronblockchainUrlNile = "https://nile.tronscan.org/#/transaction"; // goerli test net
  const tronblockchainUrlEndpoint = tronblockchainUrlNile;
  const blockchainUrlTron = `${tronblockchainUrlEndpoint}/${req.body.hash}`;

  const blockchainUrlEthereumMainnet = "https://etherscan.io/tx"; // goerli test net
  const blockchainUrlEthereumGoerli = "https://etherscan.io/tx"; // goerli test net
  const blockchainUrlEthereumEndpoint = blockchainUrlEthereumGoerli;
  const blockchainUrlEthereum = `${blockchainUrlEthereumEndpoint}/${req.body.hash}`;

  let blockchainUrl;

  const service = req.body.service;
  const subService = req.body.subService;

  if (service === "buy" && subService === "buyCash") {
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

  if (service === "buy" && subService === "buyCard") {
    if (chain === "Bitcoin") {
      blockchainUrl = blockchainUrlBitcoin;
    }
    if (chain === "Tron") {
      blockchainUrl = blockchainUrlTron;
    }
    if (chain === "Ethereum") {
      blockchainUrl = blockchainUrlEthereum;
    }
  }

  if (service === "exchange" && subService === "exchange") {
    if (chain === "Bitcoin") {
      blockchainUrl = blockchainUrlBitcoin;
    }
    if (chain === "Tron") {
      blockchainUrl = blockchainUrlTron;
    }
    if (chain === "Ethereum") {
      blockchainUrl = blockchainUrlEthereum;
    }
  }

  //blenderyAddressOut: benderyAddress,

  const transaction = await Transaction.findById(req.body.txId);
  //blockchainUrl
  if (transaction) {
    // transaction.blenderyAddress =
    //   req.body.blenderyAddress || transaction.blenderyAddress;
    transaction.blenderyAddressOut =
      req.body.blenderyAddressOut || transaction.blenderyAddressOut;
    transaction.status = req.body.status || transaction.status;
    transaction.hashOut = req.body.hashOut || transaction.hashOut;
    transaction.blockchainUrlOut =
      blockchainUrlOut || transaction.blockchainUrlOut;
    transaction.dispatcherTelegram =
      req.body.dispatcherTelegram || transaction.dispatcherTelegram;
    transaction.dispatcherName =
      req.body.dispatcherName || transaction.dispatcherName;
  }
  const updatedTransaction = await transaction.save();
  if (updatedTransaction) {
    console.log({ updatedTransaction: updatedTransaction });
    res.json(updatedTransaction);
  }
});

const updateTransactionByIdAdmin = asyncHandler(async (req, res) => {
  const transaction = await Transaction.findById(req.body.id);

  if (transaction) {
    transaction.manager = req.body.managerId || transaction.manager;
    transaction.status = req.body.status || transaction.status;
  }
  const updatedTransaction = await transaction.save();
  if (updatedTransaction) {
    console.log({ updatedTransaction: updatedTransaction });
    res.json(updatedTransaction);
  }
});

// Get all UserTransactions
// const getUserTransactions = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id);
//   // res.json(await Transaction.find({ user: user._id }).populate('room'));
//   // res.json(await Transaction.find({ user: user._id }).populate('message'));
//   res.json(await Transaction.find({ user: req.user.id }).populate('message'));
// });

const getUserTransactions = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  const response = await Transaction.find({ user: req.user.id }).populate(
    "message"
  );
  // console.log({ response: response });

  if (response) {
    res.status(200).json(response);
  }
  // res.json(response);
});

// Get all UserTransactions
const getOneUserTransaction = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); //user info
  const { id } = req.params; // transaction id

  const transaction = await Transaction.findOne({
    user: user._id,
    _id: id,
  }).populate("message");
  // await updateBlockChainTransactionsAutomaticallyInternal(transaction?._id);

  // res.json(
  //   await Transaction.findOne({ user: user._id, _id: id }).populate('message')
  // );

  // res.json(transaction);
  res.status(200).json(transaction);
});

//======={Get Transactions By Services and subServices}========================================

const getUserExchange = asyncHandler(async (req, res) => {
  const userTransactions = await Transaction.find({
    user: req.user.id,
  }).populate("message");
  let response = [];

  userTransactions?.map(async (transaction) => {
    // await updateBlockChainTransactionsAutomaticallyInternal(transaction?._id);
    let service = transaction.service;
    let subService = transaction.subService;
    if (service === "exchange" && subService === "exchange") {
      response.push(transaction);
    }
  });
  res.status(200).json(response);
});
const getUserDefi = asyncHandler(async (req, res) => {
  const userTransactions = await Transaction.find({
    user: req.user.id,
  }).populate("message");
  let response = [];

  userTransactions?.map(async (transaction) => {
    // await updateBlockChainTransactionsAutomaticallyInternal(transaction?._id);
    let service = transaction.service;
    let subService = transaction.subService;
    if (service === "defi" && subService === "defi") {
      response.push(transaction);
    }
  });
  res.status(200).json(response);
});

const getUserBuyCash = asyncHandler(async (req, res) => {
  const userTransactions = await Transaction.find({
    user: req.user.id,
  }).populate("message");
  let response = [];

  userTransactions?.map(async (transaction) => {
    // await updateBlockChainTransactionsAutomaticallyInternal(transaction?._id);
    let service = transaction.service;
    let subService = transaction.subService;
    if (service === "buy" && subService === "buyCash") {
      response.push(transaction);
    }
  });
  res.status(200).json(response);
});

const getUserBuyCard = asyncHandler(async (req, res) => {
  const userTransactions = await Transaction.find({
    user: req.user.id,
  }).populate("message");
  let response = [];

  userTransactions?.map(async (transaction) => {
    // await updateBlockChainTransactionsAutomaticallyInternal(transaction?._id);
    let service = transaction.service;
    let subService = transaction.subService;
    if (service === "buy" && subService === "buyCard") {
      response.push(transaction);
    }
  });
  res.status(200).json(response);
});

const getUserSellCash = asyncHandler(async (req, res) => {
  const userTransactions = await Transaction.find({
    user: req.user.id,
  }).populate("message");
  let response = [];

  userTransactions?.map(async (transaction) => {
    // await updateBlockChainTransactionsAutomaticallyInternal(transaction?._id);
    let service = transaction.service;
    let subService = transaction.subService;
    if (service === "sell" && subService === "sellCash") {
      response.push(transaction);
    }
  });
  res.status(200).json(response);
});

const getUserSellCard = asyncHandler(async (req, res) => {
  const userTransactions = await Transaction.find({
    user: req.user.id,
  }).populate("message");
  let response = [];

  userTransactions?.map(async (transaction) => {
    // await updateBlockChainTransactionsAutomaticallyInternal(transaction?._id);
    let service = transaction.service;
    let subService = transaction.subService;
    if (service === "sell" && subService === "sellCard") {
      response.push(transaction);
    }
  });
  res.status(200).json(response);
});

//======={Admin: Get Transactions By Services and subServices}========================================

const getAdminExchange1 = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); // get userId from "protect middleware"
  const userTransactions = await Transaction.find().populate("message");
  let response = [];

  userTransactions?.map(async (transaction) => {
    // await updateBlockChainTransactionsAutomaticallyInternal(transaction?._id);
    let service = transaction.service;
    let subService = transaction.subService;
    if (service === "exchange" && subService === "exchange") {
      response.push(transaction);
    }
  });
  res.status(200).json(response);
});

const updateTimeLeftAutomatically = asyncHandler(async (id) => {
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

  if (transactionDoc?.status === "Completed") {
    updatedTimeStatus = "Completed";
  }

  //===================================================================================================================================

  if (transactionDoc) {
    transactionDoc.timeStatus = updatedTimeStatus || transactionDoc?.timeStatus;
  }
  const response = await transactionDoc.save();
  // console.log(response);
});
const getAdminExchange = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); // get userId from "protect middleware"
  const userTransactions = await Transaction.find().populate("message");
  let response = [];

  userTransactions?.map(async (transaction) => {
    // await updateBlockChainTransactionsAutomaticallyInternal(transaction?._id);
    let service = transaction.service;
    let subService = transaction.subService;
    if (service === "exchange" && subService === "exchange") {
      updateTimeLeftAutomatically(transaction?._id);
      response.push(transaction);
    }
  });
  res.status(200).json(response);
});
const getAdminDefi = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); // get userId from "protect middleware"
  const userTransactions = await Transaction.find().populate("message");
  let response = [];

  userTransactions?.map(async (transaction) => {
    // await updateBlockChainTransactionsAutomaticallyInternal(transaction?._id);
    let service = transaction.service;
    let subService = transaction.subService;
    if (service === "defi" && subService === "defi") {
      response.push(transaction);
    }
  });
  res.status(200).json(response);
});

const getAdminBuyCash = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); // get userId from "protect middleware"
  const userTransactions = await Transaction.find().populate("message");
  let response = [];

  userTransactions?.map(async (transaction) => {
    // await updateBlockChainTransactionsAutomaticallyInternal(transaction?._id);
    let service = transaction.service;
    let subService = transaction.subService;
    if (service === "buy" && subService === "buyCash") {
      updateTimeLeftAutomatically(transaction?._id);
      response.push(transaction);
    }
  });
  res.status(200).json(response);
});

const getAdminBuyCard = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); // get userId from "protect middleware"
  const userTransactions = await Transaction.find().populate("message");
  let response = [];

  userTransactions?.map(async (transaction) => {
    // await updateBlockChainTransactionsAutomaticallyInternal(transaction?._id);
    let service = transaction.service;
    let subService = transaction.subService;
    if (service === "buy" && subService === "buyCard") {
      updateTimeLeftAutomatically(transaction?._id);

      response.push(transaction);
    }
  });
  res.status(200).json(response);
});

const getAdminSellCash = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); // get userId from "protect middleware"
  const userTransactions = await Transaction.find().populate("message");
  let response = [];

  userTransactions?.map(async (transaction) => {
    // await updateBlockChainTransactionsAutomaticallyInternal(transaction?._id);
    let service = transaction.service;
    let subService = transaction.subService;
    if (service === "sell" && subService === "sellCash") {
      updateTimeLeftAutomatically(transaction?._id);
      response.push(transaction);
    }
  });
  res.status(200).json(response);
});

const getAdminSellCard = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); // get userId from "protect middleware"
  const userTransactions = await Transaction.find().populate("message");
  let response = [];

  userTransactions?.map(async (transaction) => {
    // await updateBlockChainTransactionsAutomaticallyInternal(transaction?._id);
    let service = transaction.service;
    let subService = transaction.subService;
    if (service === "sell" && subService === "sellCard") {
      updateTimeLeftAutomatically(transaction?._id);
      response.push(transaction);
    }
  });
  res.status(200).json(response);
});

//======={Get Transactions By Services and subServices}========================================

// Get all UserTransactions
// const getTransactionByTxId = asyncHandler(async (req, res) => {
//   const { txId } = req.params; // transaction id

//   console.log({ txId: txId });

//   res.json(
//     await Transaction.findOne({ txId: Number(txId) }).populate('message')
//   );
// });

// const getTransactionByTxId = asyncHandler(async (req, res) => {
//   const { txId } = req.params; // transaction id

//   console.log({ txId: txId });

//   res.json(
//     await Transaction.findOne({ orderNo: Number(txId) }).populate('message')
//   );
// });

const getTransactionByTxId = asyncHandler(async (req, res) => {
  const { txId } = req.params; // transaction id

  console.log({ txId: txId });

  res.json(await Transaction.findById(txId).populate("message"));
});

// not required
const getAllTransactionsByUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); // get managers userId from "protect middleware"
  const { userId } = req.params;
  if (user.role === "User") {
    res.json(await Transaction.find({ userId: userId }).populate("user"));
  }
});

/**************************************************************************************************************
 **************************************************************************************************************

                                         Admin Block
                      
 **************************************************************************************************************
 **************************************************************************************************************
 */

/**========================Transaction Status============================
 * pending
 * active
 * completed
 *
 * paid
 * cancel
 */

// update Transactions status

//======={Level: 1 ======> Manager}================================
const updateUserTransaction = asyncHandler(async (req, res) => {
  const manager = await User.findById(req.user._id); // get managers userId from "protect middleware"
  const currentManagerId = manager._id;
  const { id, status } = req.body;

  const transactionDoc = await User.findById(id);

  let updatedTransaction;
  if (
    transactionDoc &&
    manager.role === "Admin" &&
    // currentManagerId === transactionDoc?.manager.toString()){
    currentManagerId === transactionDoc?.manager
  ) {
    transactionDoc.status = status || transactionDoc.status;
    updatedTransaction = await transactionDoc.save();
  } else {
    //===={number of managers that have treated the transaction}=========
    const numberOfManagers = transactionDoc.managersInfo.length;
    //===={next manager count}=========
    let numberOfManager = numberOfManagers + 1;

    transactionDoc.status = status || transactionDoc.status;
    transactionDoc.manager = currentManagerId;
    transactionDoc.managerPrevious = transactionDoc.manager; // previos manager
    transactionDoc.managerChanged = true; // previos manager
    transactionDoc.managersInfo = {
      numberOfManager,
      managerId: currentManagerId,
    };
    updatedTransaction = await transactionDoc.save();
  }

  res.status(200).json({
    _id: updatedTransaction._id,
    user: updatedTransaction?.user,
    country: updatedTransaction?.country,
    city: updatedTransaction?.city,
    state: updatedTransaction?.state,
    orderNo: updatedTransaction?.orderNo,
    email: updatedTransaction?.email,
    walletAddress: updatedTransaction?.walletAddress,
    txId: updatedTransaction?.txId,
    fromSymbol: updatedTransaction?.fromSymbol,
    toSymbol: updatedTransaction?.toSymbol,
    fromValue: updatedTransaction?.fromValue,
    toValue: updatedTransaction?.toValue,
    service: updatedTransaction?.service,
    tXHashId: updatedTransaction?.tXHashId,
    age: updatedTransaction?.age,
    message: updatedTransaction?.message,
    manager: updatedTransaction?.manager,
    managerPrevious: updatedTransaction?.managerPrevious,
    managerChanged: updatedTransaction?.managerChanged,
    managersInfo: updatedTransaction?.managersInfo,
    status: updatedTransaction?.status,
    delivery: updatedTransaction?.delivery,
  });
});

const updateTransactionsAutomatically1 = asyncHandler(async (req, res) => {
  const {
    id, // new transaction mongodb id ==> transaction?._id
    country,
    city,
    state,
    service,
    status, // new status ==> // pending, paid, completed, cancel, active, inActive
    percentageProgress,
  } = req.body;

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
  // also, start transaction monitoring on blockchain from here
  //blockchainMonitoring()
  if (transactionDoc) {
    transactionDoc.country = country || transactionDoc?.country;
    transactionDoc.city = city || transactionDoc?.city;
    transactionDoc.state = state || transactionDoc?.state;
    transactionDoc.service = service || transactionDoc?.service;
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

const updateTransactionsAutomatically = asyncHandler(async (req, res) => {
  const {
    id, // new transaction mongodb id ==> transaction?._id
    country,
    city,
    state,
    service,
    status, // new status ==> // pending, paid, completed, cancel, active, inActive
    percentageProgress,
    youSend,
    youGet,
    serviceFee,
    networkFee,
    processingFee,
    exchangeRate,
    tValue,
    amount,
    directValue,
  } = req.body;

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
  // also, start transaction monitoring on blockchain from here
  //blockchainMonitoring()
  if (transactionDoc) {
    transactionDoc.country = country || transactionDoc?.country;
    transactionDoc.city = city || transactionDoc?.city;
    transactionDoc.state = state || transactionDoc?.state;
    transactionDoc.service = service || transactionDoc?.service;
    transactionDoc.status = status || transactionDoc?.status;
    transactionDoc.percentageProgress =
      percentageProgress || transactionDoc?.percentageProgress;
    transactionDoc.timeStatus = updatedTimeStatus || transactionDoc?.timeStatus;
    // transactionDoc.timeLeft = updatedTimeStatus === 'Expired' ? 0 : transactionDoc?.timeLeft; // if updatedTime status has expired, set timeleft to 0
    transactionDoc.youSend = youSend || transactionDoc.youSend;
    transactionDoc.youGet = youGet || transactionDoc.youGet;
    transactionDoc.serviceFee = serviceFee || transactionDoc.serviceFee;
    transactionDoc.networkFee = networkFee || transactionDoc.networkFee;
    transactionDoc.processingFee =
      processingFee || transactionDoc.processingFee;
    transactionDoc.exchangeRate = exchangeRate || transactionDoc.exchangeRate;
    transactionDoc.tValue = tValue || transactionDoc.tValue;
    transactionDoc.amount = amount || transactionDoc.amount;
    // transaction.directValue = directValue
  }
  const response = await transactionDoc.save();
  if (response) {
    res.status(200).json(response);
  }
});
const updateBlockChainTransaction = asyncHandler(async (req, res) => {
  const { id } = req.params;
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
  // also, start transaction monitoring on blockchain from here
  //blockchainMonitoring
  //=================================================={                         }======================================================
  //=================================================={ UPDATE BLOCKCHAIN BLOCK }======================================================
  //=================================================={                         }======================================================
  // await checkOneBlockchainTransaction(id);

  //===================================================================================================================================

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
  // also, start transaction monitoring on blockchain from here
  //blockchainMonitoring
  //=================================================={                         }======================================================
  //=================================================={ UPDATE BLOCKCHAIN BLOCK }======================================================
  //=================================================={                         }======================================================
  // await checkOneBlockchainTransaction(id);

  //===================================================================================================================================

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

// Get all UserTransactions
const getMyUserTransactionById = asyncHandler(async (req, res) => {
  const manager = await User.findById(req.user._id); // get managers userId from "protect middleware"
  const managerId = manager?._id; // manager's id
  const { id, userId } = req.params;
  if (manager.role === "Admin") {
    res.json(
      await Transaction.find({ manager: managerId, user: userId })
        .populate("user")
        .populate("manager")
        .populate("messages")
        .exec()
    );
  }
});

/**
 * populate : to have access to the related schema and
 * explore the details because both "user and manger
 * are schemas with an array of data that can be expanded"
 *
 */

//Get all transaction by logged in manager
const getMyTransactions = asyncHandler(async (req, res) => {
  const manager = await User.findById(req.user._id); // get managers userId from "protect middleware"
  const managerId = manager?._id; // manager's id

  let response = await Transaction.find({ manager: managerId }).populate(
    "user"
  );
  console.log({ response: response });
  res.json(response);

  // if (manager.role === 'Admin') {
  //   res.json(
  //     await Transaction.find({ manager: managerId })
  //       .populate('user')
  //       .populate('manager')
  //       .populate('messages')
  //       .exec()
  //   );
  // }
});

/**************************************************************************************************************
 **************************************************************************************************************

                                         Supervisor Block
                      
 **************************************************************************************************************
 **************************************************************************************************************
 */

// Get all transaction between your manager and a single user
const getMyManagersTransactionById = asyncHandler(async (req, res) => {
  // const user = await Manager.findById(req.user._id); // protected route
  const supervisor = await User.findById(req.user._id); // get managers userId from "protect middleware"
  const { managerId } = req.params; // user's Id
  if (supervisor.role === "Admin" && supervisor.level > 2) {
    // super admin also has this previledge
    //
    res.json(
      await Transaction.find({ manager: managerId })
        .populate("user")
        .populate("manager")
        .populate("messages")
        .exec()
    );
  }
});

/**************************************************************************************************************
 **************************************************************************************************************

                                          Super Admin Block
                      
 **************************************************************************************************************
 **************************************************************************************************************
 */

// Get all UserTransactions
const getOneManagersTransactionByAdmin = asyncHandler(async (req, res) => {
  // const user = await Manager.findById(req.user._id); // protected route
  const admin = await User.findById(req.user._id); // get managers userId from "protect middleware"
  const { id, managerId } = req.params;
  if (admin.role === "Admin" && admin.level > 2) {
    // supervisors below do not have this previledge
    res.json(
      await Transaction.findOne({ manager: managerId, _id: id })
        .populate("user")
        .populate("manager")
        .populate("messages")
        .exec()
    );
  }
});

const getAllManagersTransactionByAdmin = asyncHandler(async (req, res) => {
  // const user = await Manager.findById(req.user._id); // protected route
  const admin = await User.findById(req.user._id); // get managers userId from "protect middleware"
  const { managerId } = req.params;
  if (admin.role === "Admin" && admin.level > 2) {
    res.json(
      await Transaction.findOne({ manager: managerId })
        .populate("user")
        .populate("manager")
        .populate("messages")
        .exec()
    );
  }
});

// // Get all Transactions general users
// const getAllTransactions = asyncHandler(async (req, res) => {
//   const admin = await User.findById(req.user._id); // get managers userId from "protect middleware"

//   if (admin.role === 'Admin' && admin.level > 2) {
//     res.json(
//       await Transaction.find()
//         .populate('user')
//         .populate('manager')
//         .populate('messages')
//         .exec()
//     );
//   }
// });

// Get all Transactions general users
// const getAllTransactions = asyncHandler(async (req, res) => {
//   const admin = await User.findById(req.user._id); // get managers userId from "protect middleware"

//   console.log({ admin: admin });

//   if (admin.role === 'Admin') {
//     res.json(
//       await Transaction.find()
//         .populate('user')
//         .populate('manager')
//         .populate('messages')
//         .exec()
//     );
//   }
// });

// const getAllTransactions = asyncHandler(async (req, res) => {
//   const admin = await User.findById(req.user._id); // get managers userId from "protect middleware"

//   // console.log({ admin: admin });

//   if (admin.role === 'Admin') {
//     res.json(await Transaction.find().populate('user').exec());
//   }
// });

const getAllTransactions = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); // get userId from "protect middleware"
  const response = await Transaction.find().populate("message");
  if (response) {
    res.status(200).json(response);
  }
});

// const getAllTransactions = asyncHandler(async (req, res) => {
//   console.log({ status: 'active' });
//   const response = await Transaction.find().populate('message');
//   console.log({ tx: response });
//   if (response) {
//     res.status(200).json(response);
//   }
// });

/**************************************************************************************************************
 **************************************************************************************************************

                                          Email System
                      
 **************************************************************************************************************
 **************************************************************************************************************
 */
//==========================={Registration Notifications}=========================
//======{Sent after registration is completed if first time walletAddress in the system}===========================
const registrationConfirmation = asyncHandler(async (req, res) => {
  const { email, walletAddress } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User does not exist");
  }

  // Delete token if it exists in DB

  const userLogin = `${process.env.FRONTEND_URL}/login`;

  // Reset Email
  const message = `
      <h2>Hello ${email}</h2>
      <p>Thank you for choosing Crib.com</p>  
      <p>Your registration was successful.</p>
      <p>Please login to your account by clicking on the link below</p>

      <a href=${userLogin} clicktracking=off>${userLogin}</a>

      <p>Regards...</p>
      <p>Crib Team</p>
    `;
  const subject = "Registration Sucessful";

  const emailTest = "peter.space.io@gmail.com";
  // const send_to = email;
  const send_to = emailTest;
  const sent_from = process.env.EMAIL_USER;

  console.log({ email: email, walletAddress: walletAddress });

  await sendEmail(subject, message, send_to, sent_from);
  res
    .status(200)
    .json({ success: true, message: "your registration was sucessful" });
});

//==========================={Transaction Notifications}=========================

//=============================={Order started notification email on Transaction page}============================================================
const transactionConfirmation = asyncHandler(async (req, res) => {
  const { email, txId } = req.body;

  // const { email, txId, orderType, fromToken, toToken, fromAmount, toAmount } =
  //   req.body;

  if (!email) throw new Error("Sender not found with this email");
  if (!txId) throw new Error("Order number not found");

  const subject = "Order Confirmation";
  // const telegramGroupLink = `${process.env.FRONTEND_URL}/account`;

  const telegramGroupLink = `${process.env.FRONTEND_URL}/telegram`; // create telegram chatroom with botFather and use link

  //====={Testing}===============
  const message = `
  <h2>Hello ${email}</h2>

  <p>Your request has been receieved and would be processed shortly</p>
  <p>Please find your order number: ${txId} and click on the link to continue</p>
  <a href=${telegramGroupLink} clicktracking=off>${telegramGroupLink}</a>
  <p>Thank you for choosing Govercity</p>

  <p>Regards...</p>
  <p>Govercity Team</p>
  `;

  //====={Production}===============

  //   const message = `
  // <h2>Hello ${email}</h2>

  // <p>Your ${orderType} request to exchange ${fromAmount}${fromToken?.symbol} to ${toAmount}${toToken?.symbol} has been receieved and would be processed shortly</p>
  // <p>Please find your order number: ${txId} and click on the link below to continue your transaction</p>
  // <a href=${telegramGroupLink} clicktracking=off>${telegramGroupLink}</a>
  // <p>Thank you for choosing Govercity</p>

  // <p>Regards...</p>
  // <p>Govercity Team</p>
  // `;

  const messageExample = `
<h2>Hello User</h2>

<p>Your Buy Crypto request to exchange 5USD  to 4.9USDT has been receieved and would be processed shortly</p>
<p>Please find your order number: 204 and click on the link below to continue your transaction</p>
<a href="https://www.telegram.com/goBuy" clicktracking=off>"https://www.telegram.com/goBuy"</a>
<p>Thank you for choosing Govercity</p>  

<p>Regards...</p>
<p>Govercity Team</p>
`;

  const emailTest = "peter.space.io@gmail.com";

  // const send_to = email; // live production
  const send_to = emailTest; // testing
  const sent_from = process.env.EMAIL_USER;
  //  const sent_from = 'noreply@govercity.com',

  await sendEmail(subject, message, send_to, sent_from);
  res.status(200).json({ success: true, message: "Email sent" });
});

//=============================={Order Completed notification email on Transaction page}============================================================
const transactionCompleted = asyncHandler(async (req, res) => {
  const { email, txId, orderType, fromSymbol, toSymbol, fromValue, toValue } =
    req.body;

  if (!email) throw new Error("Sender not found with this email");
  if (!txId) throw new Error("Order number not found");

  const subject = "Order Completed";

  //====================================={Example Block}=====================================================

  const messageExample = `
   <h2>Hello User</h2>
 
   <p>Your Buy Crypto request to exchange 5USD  to 4.9USDT has been receieved  with order number: 204 has been completed sucessfully</p>
   <p>Thank you for choosing Govercity</p>
 
   <p>Regards...</p>
   <p>Govercity Team</p>
   `;

  //========================================================================================================

  //====={Production}===============
  const message = `
  <h2>Hello ${email}</h2>

  <p>Your ${orderType} request to exchange ${fromValue}${fromSymbol} to ${toValue}${toSymbol} with order number: ${txId} has been completed sucessfully</p>
  <p>Thank you for choosing Govercity</p>

  <p>Regards...</p>
  <p>Govercity Team</p>
  `;

  const emailTest = "peter.space.io@gmail.com";

  // const send_to = email; // live production
  const send_to = emailTest; // testing
  const sent_from = process.env.EMAIL_USER;
  //  const sent_from = 'noreply@govercity.com',

  await sendEmail(subject, message, send_to, sent_from);
  res.status(200).json({ success: true, message: "Email sent" });
});

// Get all transaction between your manager and a single user
const getUserTransactionById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); // get managers userId from "protect middleware"
  const { id } = req.params; // user's Id
  if (user) {
    const transaction = await Transaction.findOne({ user: user?._id, _id: id })
      .populate("user")
      .populate("manager")
      .populate("messages")
      .exec();

    res.json(transaction);
  }
});

// Get all UserTransactions
const getUserInactiveTransactions = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  // console.log({ userTx: user });

  const response = await Transaction.find({
    user: user._id,
    status: "InActive",
  })
    .populate("user")
    .exec();
  console.log({ responseTx: response });
  res.status(200).json(response);
});



const getUserActiveTransactions = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  // console.log({ userTx: user });

  let transactions = await Transaction.find({ status: "pending" }).populate(
    "message"
  );

  const response = await Transaction.find({
    user: user._id,
  })
    .populate("user")
    .exec();

  response.map(async (t) => {
    if (t.status !== "Pending") {
      transactions.push(t);
    }
  });
  // console.log({ responseTx: response });
  res.status(200).json(transactions);
  // res.json(response);
});

const getManagerActiveTransactions = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  // console.log({ userTx: user });

  let transactions = [];

  const response = await Transaction.find({
    manager: user._id,
  })
    .populate("user")
    .exec();
  response.map(async (t) => {
    if (t.status !== "Pending") {
      transactions.push(t);
    }
  });

  res.status(200).json(transactions);
});

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


  const emailTest = "peter.space.io@gmail.com";

  // const send_to = email; // live production
  const send_to = emailTest; // testing
  const sent_from = process.env.EMAIL_USER;
  //  const sent_from = 'noreply@govercity.com',

  await sendEmail(subject, message, send_to, sent_from);
  res.status(200).json({ success: true, message: "Email sent" });
});

const orderCompleted = asyncHandler(async (req, res) => {
  const { email, txId, orderType, fromSymbol, toSymbol, fromValue, toValue } =
    req.body;

  if (!email) throw new Error("Sender not found with this email");
  if (!txId) throw new Error("Order number not found");

  const subject = "Order Completed";

  //====================================={Example Block}=====================================================

  const messageExample = `
   <h2>Hello User</h2>
 
   <p>Your Buy Crypto request to exchange 5USD  to 4.9USDT has been receieved  with order number: 204 has been completed sucessfully</p>
   <p>Thank you for choosing Govercity</p>
 
   <p>Regards...</p>
   <p>Govercity Team</p>
   `;

  //========================================================================================================

  //====={Production}===============
  const message = `
  <h2>Hello ${email}</h2>

  <p>Your ${orderType} request to exchange ${fromValue}${fromSymbol} to ${toValue}${toSymbol} with order number: ${txId} has been completed sucessfully</p>
  <p>Thank you for choosing Govercity</p>

  <p>Regards...</p>
  <p>Govercity Team</p>
  `;

  const emailTest = "peter.space.io@gmail.com";

  // const send_to = email; // live production
  const send_to = emailTest; // testing
  const sent_from = process.env.EMAIL_USER;
  //  const sent_from = 'noreply@govercity.com',

  await sendEmail(subject, message, send_to, sent_from);
  res.status(200).json({ success: true, message: "Email sent" });
});


//=============================================================================================================
//============={updated transactions rate}=============================================

const geTokenPriceData = async (id) => {
  //==============={Free API}===================================
  // const url = 'https://api.coingecko.com/api/v3/';
  // const param = `coins/${id}`;

  //==============={Demo API}===================================
  // const url = 'https://api.coingecko.com/api/v3/';
  // const param = `coins/${id}?x_cg_demo_api_key=${process.env.COINGEKO_API_KEY}`;
  //==============={Pro API}===================================
  const url = "https://pro-api.coingecko.com/api/v3/";
  const param = `coins/${id}?x_cg_pro_api_key=${process.env.COINGEKO_API_KEY}`;

  try {
    const response = await axios.get(url + param);
    return response.data;
  } catch (error) {
    console.log({ coingekoErrorMsg: error });

    return error;
  }
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

  if (service === "defi" && subService === "defi") {
    //=================================================================================================
    const fromPrice = await geTokenPriceData(fToken?.id);
    const fromPriceData = fromPrice?.market_data?.current_price;
    const toPrice = await geTokenPriceData(tToken?.id);
    const toPriceData = toPrice?.market_data?.current_price;
    //=================================================================================================
    const fUSDPrice = Number(fromPriceData?.usd); // usd price
    const tUSDPrice = Number(toPriceData?.usd); // usd price
    let exchangeRate = 1 * (fUSDPrice / tUSDPrice); //fToken?.symbol/tToken.symbol

    if (isNaN(exchangeRate)) {
      exchangeRate = 0;
    }
    const response = {
      exchangeRateRaw: exchangeRate,
      exchangeRate: exchangeRate.toFixed(3),
    };

    res.status(200).json(response);
  }
  if (service === "buy" && subService === "buyCash") {
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
  if (service === "buy" && subService === "buyCard") {
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
    console.log({ responseExchangeRate: response });
    res.status(200).json(response);
  }
  if (service === "sell" && subService === "sellCash") {
    //=================================================================================================
    const fromPrice = await geTokenPriceData(fToken?.id);
    const fromPriceData = fromPrice?.market_data?.current_price;
    //=================================================================================================

    let exchangeRate;
    if (tToken?.symbol === "usd") {
      exchangeRate = Number(fromPriceData?.usd);
    }
    if (tToken?.symbol === "gbp") {
      exchangeRate = Number(fromPriceData?.gbp);
    }
    if (tToken?.symbol === "eur") {
      exchangeRate = Number(fromPriceData?.eur);
    }
    if (tToken?.symbol === "rub") {
      exchangeRate = Number(fromPriceData?.rub);
    }
    if (tToken?.symbol === "cad") {
      exchangeRate = Number(fromPriceData?.cad);
    }
    if (tToken?.symbol === "aed") {
      exchangeRate = Number(fromPriceData?.aed);
    }
    if (tToken?.symbol === "jpy") {
      exchangeRate = Number(fromPriceData?.jpy);
    }
    if (tToken?.symbol === "ngn") {
      exchangeRate = Number(fromPriceData?.ngn);
    }
    if (tToken?.symbol === "php") {
      exchangeRate = Number(fromPriceData?.php);
    }
    if (tToken?.symbol === "chf") {
      exchangeRate = Number(fromPriceData?.chf);
    }
    if (tToken?.symbol === "aud") {
      exchangeRate = Number(fromPriceData?.aud);
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
  if (service === "sell" && subService === "sellCard") {
    //=================================================================================================
    const fromPrice = await geTokenPriceData(fToken?.id);
    const fromPriceData = fromPrice?.market_data?.current_price;
    //=================================================================================================

    let exchangeRate;
    if (tToken?.symbol === "usd") {
      exchangeRate = Number(fromPriceData?.usd);
    }
    if (tToken?.symbol === "gbp") {
      exchangeRate = Number(fromPriceData?.gbp);
    }
    if (tToken?.symbol === "eur") {
      exchangeRate = Number(fromPriceData?.eur);
    }
    if (tToken?.symbol === "rub") {
      exchangeRate = Number(fromPriceData?.rub);
    }
    if (tToken?.symbol === "cad") {
      exchangeRate = Number(fromPriceData?.cad);
    }
    if (tToken?.symbol === "aed") {
      exchangeRate = Number(fromPriceData?.aed);
    }
    if (tToken?.symbol === "jpy") {
      exchangeRate = Number(fromPriceData?.jpy);
    }
    if (tToken?.symbol === "ngn") {
      exchangeRate = Number(fromPriceData?.ngn);
    }
    if (tToken?.symbol === "php") {
      exchangeRate = Number(fromPriceData?.php);
    }
    if (tToken?.symbol === "chf") {
      exchangeRate = Number(fromPriceData?.chf);
    }
    if (tToken?.symbol === "aud") {
      exchangeRate = Number(fromPriceData?.aud);
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
  if (service === "exchange" && subService === "exchange") {
    //=================================================================================================
    const fromPrice = await geTokenPriceData(fToken?.id);
    const fromPriceData = fromPrice?.market_data?.current_price;
    const toPrice = await geTokenPriceData(tToken?.id);
    const toPriceData = toPrice?.market_data?.current_price;
    //=================================================================================================
    const fUSDPrice = Number(fromPriceData?.usd); // usd price
    const tUSDPrice = Number(toPriceData?.usd); // usd price

    let exchangeRate = 1 * (fUSDPrice / tUSDPrice); //fToken?.symbol/tToken.symbol

    if (isNaN(exchangeRate)) {
      exchangeRate = 0;
    }

    const response = {
      exchangeRateRaw: exchangeRate,
      exchangeRate: exchangeRate.toFixed(3),
    };
    res.status(200).json(response);
  }
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
    console.log({ exchangeRateInCheck: response });
    res.status(200).json(response);
  }
});

const getTransactionRate = asyncHandler(async (req, res) => {
  const { fToken, tToken, exchangeRate, fValue, service, subService } =
    req.body;

  if (service === "defi" && subService === "defi") {
    let directValue = Number(fValue) * exchangeRate;

    const serviceFee = (0.25 / 100) * Number(directValue); // 0.25%

    // const networkFees = await getTxFees(txData) // from the blockchain
    const networkFee = (0.25 / 100) * Number(directValue); // should be from the blockchain

    const youSend = Number(fValue);

    let tValue = Number(directValue) - (serviceFee + networkFee);
    const youGet = tValue;
    const { amount, estimatedGas } = await getTokenAmount(
      fToken,
      tValue.toString()
    );

    let tValueFormatted = Number(tValue).toFixed(4);
    if (isNaN(tValue)) {
      tValue = 0;
    }

    if (isNaN(tValueFormatted)) {
      tValueFormatted = 0;
    }

    if (isNaN(directValue)) {
      directValue = 0;
    }

    const response = {
      youSend,
      youGet,
      serviceFeeRaw: serviceFee,
      serviceFee: serviceFee.toFixed(8),
      networkFeeRew: networkFee,
      networkFee: networkFee.toFixed(8),
      tValue,
      tValueFormatted,
      amount,
      estimatedGas,
      directValue,
      directValueRaw: directValue.toFixed(3),
    };

    res.status(200).json(response);
  }
  if (service === "buy" && subService === "buyCash") {
    //=================================================================================================

    let directValue = Number(fValue) / exchangeRate;

    const serviceFee = (0.25 / 100) * Number(directValue); // 0.25%

    // const networkFees = await getTxFees(txData) // from the blockchain
    const networkFee = (0.25 / 100) * Number(directValue); // should be from the blockchain

    const youSend = Number(fValue);

    let tValue = Number(directValue) - (serviceFee + networkFee);
    const youGet = tValue;
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

    if (isNaN(directValue)) {
      directValue = 0;
    }

    const response = {
      youSend,
      youGet,
      serviceFeeRaw: serviceFee,
      serviceFee: serviceFee.toFixed(8),
      networkFeeRew: networkFee,
      networkFee: networkFee.toFixed(8),
      tValue,
      tValueFormatted,
      amount,
      estimatedGas,
      directValue,
      directValueRaw: directValue.toFixed(3),
    };

    res.status(200).json(response);
  }
  if (service === "buy" && subService === "buyCard") {
    let directValue = Number(fValue) / exchangeRate;

    const serviceFee = (0.25 / 100) * Number(directValue); // 0.25%

    // const networkFees = await getTxFees(txData) // from the blockchain
    const networkFee = (0.25 / 100) * Number(directValue); // should be from the blockchain

    const youSend = Number(fValue);

    let tValue = Number(directValue) - (serviceFee + networkFee);
    const youGet = tValue;
    const { amount, estimatedGas } = await getTokenAmount(
      fToken,
      tValue.toString()
    );

    let tValueFormatted = Number(tValue).toFixed(4);
    if (isNaN(tValue)) {
      tValue = 0;
    }

    if (isNaN(tValueFormatted)) {
      tValueFormatted = 0;
    }

    if (isNaN(directValue)) {
      directValue = 0;
    }
    const response = {
      youSend,
      youGetRaw: youGet,
      youGet: youGet.toFixed(4),
      serviceFeeRaw: serviceFee,
      serviceFee: serviceFee.toFixed(8),
      networkFeeRew: networkFee,
      networkFee: networkFee.toFixed(8),
      processingFeeRaw: serviceFee,
      processingFee: serviceFee.toFixed(8),
      tValue,
      tValueFormatted,
      amount,
      estimatedGas,
      directValue,
      directValueRaw: directValue.toFixed(3),
    };

    res.status(200).json(response);
  }

  //========{use processing fee for selling}====================
  if (service === "sell" && subService === "sellCash") {
    let directValue = Number(fValue) * exchangeRate;

    const serviceFee = (0.25 / 100) * Number(directValue); // 0.25%

    // const networkFees = await getTxFees(txData) // from the blockchain
    const networkFee = (0.25 / 100) * Number(directValue); // should be from the blockchain

    const youSend = Number(fValue);

    let tValue = Number(directValue) - (serviceFee + networkFee);
    const youGet = tValue;

    const { amount, estimatedGas } = await getTokenAmount(fToken, fValue);

    let tValueFormatted = Number(tValue).toFixed(4);
    if (isNaN(tValue)) {
      tValue = 0;
    }

    if (isNaN(tValueFormatted)) {
      tValueFormatted = 0;
    }

    if (isNaN(directValue)) {
      directValue = 0;
    }

    const response = {
      youSend,
      youGet,
      serviceFeeRaw: serviceFee,
      serviceFee: serviceFee.toFixed(8),
      networkFeeRew: networkFee,
      networkFee: networkFee.toFixed(8),
      tValue,
      tValueFormatted,
      amount,
      estimatedGas,
      directValue,
      directValueRaw: directValue.toFixed(3),
    };

    res.status(200).json(response);
  }
  if (service === "sell" && subService === "sellCard") {
    let directValue = Number(fValue) * exchangeRate;

    const serviceFee = (0.25 / 100) * Number(directValue); // 0.25%

    // const networkFees = await getTxFees(txData) // from the blockchain
    const networkFee = (0.25 / 100) * Number(directValue); // should be from the blockchain

    const youSend = Number(fValue);

    let tValue = Number(directValue) - (serviceFee + networkFee);
    const youGet = tValue;

    const { amount, estimatedGas } = await getTokenAmount(fToken, fValue);

    let tValueFormatted = Number(tValue).toFixed(4);
    if (isNaN(tValue)) {
      tValue = 0;
    }

    if (isNaN(tValueFormatted)) {
      tValueFormatted = 0;
    }

    if (isNaN(directValue)) {
      directValue = 0;
    }

    const response = {
      youSend,
      youGet,
      serviceFeeRaw: serviceFee,
      serviceFee: serviceFee.toFixed(8),
      networkFeeRew: networkFee,
      networkFee: networkFee.toFixed(8),
      processingFeeRaw: serviceFee,
      processingFee: serviceFee.toFixed(8),
      tValue,
      tValueFormatted,
      amount,
      estimatedGas,
      directValue,
      directValueRaw: directValue.toFixed(3),
    };

    res.status(200).json(response);
  }
  if (service === "exchange" && subService === "exchange") {
    let directValue = Number(fValue) * exchangeRate;

    const serviceFee = (0.25 / 100) * Number(directValue); // 0.25%

    // const networkFees = await getTxFees(txData) // from the blockchain
    const networkFee = (0.25 / 100) * Number(directValue); // should be from the blockchain

    const youSend = Number(fValue);

    let tValue = Number(directValue) - (serviceFee + networkFee);
    const youGet = tValue;
    const { amount, estimatedGas } = await getTokenAmount(
      fToken,
      tValue.toString()
    );
    // const { amount, estimatedGas } = await getTokenAmount(fToken, fValue);

    let tValueFormatted = Number(tValue).toFixed(4);
    if (isNaN(tValue)) {
      tValue = 0;
    }

    if (isNaN(tValueFormatted)) {
      tValueFormatted = 0;
    }

    if (isNaN(directValue)) {
      directValue = 0;
    }

    const response = {
      youSend,
      youGet,
      serviceFeeRaw: serviceFee,
      serviceFee: serviceFee.toFixed(8),
      networkFeeRew: networkFee,
      networkFee: networkFee.toFixed(8),
      tValue,
      tValueFormatted,
      amount,
      estimatedGas,
      directValue,
      directValueRaw: directValue.toFixed(3),
    };

    res.status(200).json(response);
  }
  if (service === "store" && subService === "store") {
    //=================================================================================================

    let directValue = Number(fValue) * exchangeRate;

    const serviceFee = (0.25 / 100) * Number(directValue); // 0.25%

    // const networkFees = await getTxFees(txData) // from the blockchain
    const networkFee = (0.25 / 100) * Number(directValue); // should be from the blockchain

    const youSend = Number(fValue);

    let tValue = Number(directValue) - (serviceFee + networkFee);
    const youGet = tValue;
    const { amount, estimatedGas } = await getTokenAmount(
      fToken,
      tValue.toString()
    );

    let tValueFormatted = Number(tValue).toFixed(4);
    if (isNaN(tValue)) {
      tValue = 0;
    }

    if (isNaN(tValueFormatted)) {
      tValueFormatted = 0;
    }

    if (isNaN(directValue)) {
      directValue = 0;
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
      directValue,
      directValueRaw: directValue.toFixed(3),
    };

    res.status(200).json(response);
  }
});

const updateTransactionRatesById = asyncHandler(async (req, res) => {
  const {
    id, // new transaction mongodb id ==> transaction?._id
    status,
    percentageProgress,
    fValue,
    youSend,
    youGet,
    serviceFee,
    networkFee,
    processingFee,
    exchangeRate,
    tValue,
    amount,
    directValue,
  } = req.body;

  const transaction = await Transaction.findById(id);

  if (transaction) {
    transaction.status = status || transaction.status;
    percentageProgress = percentageProgress || transaction.percentageProgress;
    transaction.fValue = fValue || transaction.fValue;
    transaction.youSend = youSend || transaction.youSend;
    transaction.youGet = youGet || transaction.youGet;
    transaction.serviceFee = serviceFee || transaction.serviceFee;
    transaction.networkFee = networkFee || transaction.networkFee;
    transaction.processingFee = processingFee || transaction.processingFee;
    transaction.exchangeRate = exchangeRate || transaction.exchangeRate;
    transaction.tValue = tValue || transaction.tValue;
    transaction.amount = amount || transaction.amount;
    // transaction.directValue = directValue || transaction.directValue;
  }
  const response = await transaction.save();

  if (response) {
    console.log({ updatedTransactionRate: response });
    res.status(200).json(response);
  }
});

const getTokenPriceData = asyncHandler(async (req, res) => {
  const { id } = req.params;

  //==============={Free API}===================================
  //   const url = `https://api.coingecko.com/api/v3/coins/${id}`;

  //==============={Demo API}===================================
  // const url = `https://api.coingecko.com/api/v3/coins/${id}?x_cg_demo_api_key=${process.env.COINGEKO_API_KEY}`;

  //==============={Pro API}===================================
  const url = `https://pro-api.coingecko.com/api/v3/coins/${id}?x_cg_pro_api_key=${process.env.COINGEKO_API_KEY}`;
  const response = await axios.get(url);
  const updatedResponse = await response.data;
  // return updatedResponse;
  res.status(200).json(updatedResponse);
});

//==========================={STORE}=================================================================================================
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

const createTransactionStore = asyncHandler(async (req, res) => {
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
    exchangeRate,
    tValue,
    amount,
    provider,
    storeId,
  } = req.body;
  // const user = await User.findOne({ email });
  // const store = await Store.findOne({ storeId: storeId }).populate("user"); // get userId from "protect middleware"
  // const store = await StoreRecovery.findOne({ storeId }).populate("user"); // get userId from "protect middleware"
  // const store = await StoreRecovery.findOne({ storeId }).populate("User"); // get userId from "protect middleware"
  const store = await StoreRecovery.findOne({ storeId }); // get userId from "protect middleware"

  console.log({ store: store });

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

const updateTransactionByIdStore = asyncHandler(async (req, res) => {
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
const getOneUserTransactionStore = asyncHandler(async (req, res) => {
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

const getTransactionByTxIdStore = asyncHandler(async (req, res) => {
  const { txId } = req.params; // transaction id

  console.log({ txId: txId });

  res.json(await Store.findById(txId).populate("user"));
});

// not required
const getAllTransactionsByUserStore = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); // get managers userId from "protect middleware"
  const { userId } = req.params;
  if (user.role === "User") {
    res.json(await Store.find({ user: userId }).populate("user"));
  }
});

const updateTransactionsAutomaticallyStore = asyncHandler(async (req, res) => {
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
const updateBlockChainTransactionStore = asyncHandler(async (req, res) => {
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

/**************************************************************************************************************
 **************************************************************************************************************

                                          Defi Block
                      
 **************************************************************************************************************
 **************************************************************************************************************
 */

const getTokenPriceDataSwap = async (id) => {
  //==============={Free API}===================================
  // const url = 'https://api.coingecko.com/api/v3/';
  // const param = `coins/${id}`;

  //==============={Demo API}===================================
  // const url = 'https://api.coingecko.com/api/v3/';
  // const param = `coins/${id}?x_cg_demo_api_key=${process.env.COINGEKO_API_KEY}`;
  //==============={Pro API}===================================
  const url = "https://pro-api.coingecko.com/api/v3/";
  const param = `coins/${id}?x_cg_pro_api_key=${process.env.COINGEKO_API_KEY}`;

  const response = await axios.get(url + param);
  return response.data;
};

const getChainRateSwap = asyncHandler(async (req, res) => {
  const { chain } = req.body;

  //=================================================================================================
  const chainPriceResponse = await getTokenPriceDataSwap(chain?.idPrice);
  const chainPriceData = chainPriceResponse?.market_data?.current_price;
  //=================================================================================================
  let chainExchangeRate = Number(chainPriceData?.usd); // usd price

  if (isNaN(chainExchangeRate)) {
    chainExchangeRate = 0;
  }
  const response = {
    chainExchangeRateRaw: chainExchangeRate,
    chainExchangeRate: chainExchangeRate.toFixed(3),
  };

  res.status(200).json(response);
});

const getChainPrice = asyncHandler(async (req, res) => {
  const { chainExchangeRate, balance } = req.body;

  let chainPrice = Number(chainExchangeRate) * Number(balance);

  if (isNaN(chainPrice)) {
    chainPrice = 0;
  }
  const response = {
    chainPriceRaw: chainPrice,
    chainPrice: chainPrice.toFixed(3),
  };

  res.status(200).json(response);
});

const getTransactionRateSwap = asyncHandler(async (req, res) => {
  const { exchangeRate, fValue } = req.body;
  let tValue = Number(fValue) * Number(exchangeRate);

  let tValueFormatted = Number(tValue).toFixed(4);
  if (isNaN(tValue)) {
    tValue = 0;
  }

  if (isNaN(tValueFormatted)) {
    tValueFormatted = 0;
  }

  const response = {
    tValue,
    tValueFormatted,
  };
  console.log({ SwapTransactionRate: response });
  res.status(200).json(response);
});

const getPriceOneInch = async (
  chainId,
  fAddress,
  fDecimals,
  tAddress,
  tDecimals,
  fValue
) => {
  let validatedValue;
  if (fAddress != "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
    validatedValue = parseUnits(
      fValue.toString(),
      fDecimals.toString()
    ).toString();
  } else {
    validatedValue = parseEther(fValue.toString()).toString();
  }

  console.log({ validatedValue: validatedValue });

  const url = `https://api.1inch.dev/swap/${version}/${Number(chainId)}/quote`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      src: fAddress, // string
      dst: tAddress, // string
      amount: validatedValue, // string
      fee: Number(fee), // number
    },
  };

  try {
    const response = await axios.get(url, config);
    if (response?.data) {
      console.log({ response: response?.data });
      const { toAmount } = response?.data;

      const toTokenAmount = toAmount;
      console.log({ toTokenAmount: toTokenAmount });

      let toTokenAmountFormatted = "";
      let toTokenAmountFixed;

      if (tAddress != "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
        toTokenAmountFormatted = formatUnits(
          toTokenAmount.toString(),
          tDecimals.toString()
        ).toString();
        toTokenAmountFixed = Number(toTokenAmountFormatted).toFixed(3);
      } else {
        toTokenAmountFormatted = parseEther(
          toTokenAmount.toString()
        ).toString();
        toTokenAmountFixed = Number(toTokenAmountFormatted).toFixed(3);

        // console.log({ toTokenAmountFixed: toTokenAmountFixed });
      }
      const result = {
        validatedValue,
        tValue: toTokenAmount,
        tValueFormatted: toTokenAmountFixed,
        // estimatedGas: estimatedGas,
        // allProtocols: protocols,
      };
      // console.log({ toTokenAmountFormatted: toTokenAmountFormatted });
      console.log({ OneInchRate: result });
      return result;
    }
  } catch (error) {
    const err = error.response.data;
    console.log(err);
    return { status: err.success, message: err.message };
  }
};

const getTokenExchangeRateSwap = asyncHandler(async (req, res) => {
  const { fToken, tToken, chainId } = req.body;
  // console.log({ exchangeRateActive: true });

  const fAddress = fToken?.address; // DAI
  const fDecimals = fToken?.decimals;
  const tAddress = tToken?.address;
  const tDecimals = tToken?.decimals;
  const fValue = "1";
  //======{oneInch Rate}
  const { validatedValue, tValue, tValueFormatted } = await getPriceOneInch(
    chainId,
    fAddress,
    fDecimals,
    tAddress,
    tDecimals,
    fValue
  );

  // console.log({ tValueFormattedResult: tValueFormatted });

  let exchangeRate = Number(tValueFormatted);
  if (isNaN(exchangeRate)) {
    exchangeRate = 0;
  }

  //=================================================================================================
  const fromPrice = await getTokenPriceDataSwap(fToken?.id);
  const fromPriceData = fromPrice?.market_data?.current_price;
  const toPrice = await getTokenPriceDataSwap(tToken?.id);
  const toPriceData = toPrice?.market_data?.current_price;
  //=================================================================================================
  const fUSDPrice = Number(fromPriceData?.usd); // usd price
  const tUSDPrice = Number(toPriceData?.usd); // usd price
  const response = {
    fUSDPrice,
    tUSDPrice,
    exchangeRateRaw: exchangeRate,
    exchangeRate: exchangeRate.toFixed(3),
    // validatedValue,
    // tValue, // unit value
  };
  // console.log({ exchangeRateResult: response });

  res.status(200).json(response);
});
const getSpender = asyncHandler(async (req, res) => {
  const { chainId } = req.body;

  if (!chainId) {
    res.status(400);
    throw new Error("chainId not found");
  }
  const url = `https://api.1inch.dev/swap/${version}/${Number(
    chainId
  )}/approve/spender`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {},
  };

  try {
    const result = await axios.get(url, config);
    if (result?.data) {
      const response = {
        spenderData: result?.data.address,
      };
      console.log(response);
      res.status(200).json(response);
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
    res.status(400).json(message);
  }
});

const getSpenderTest = asyncHandler(async (chainId) => {
  if (!chainId) {
    res.status(400);
    throw new Error("chainId not found");
  }
  const url = `https://api.1inch.dev/swap/${version}/${Number(
    chainId
  )}/approve/spender`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {},
  };

  try {
    const result = await axios.get(url, config);
    if (result?.data) {
      const response = {
        spenderData: result?.data.address,
      };
      console.log(response);
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
});
// getSpenderTest('1')

// check values

const getSwapApproval = asyncHandler(async (req, res) => {
  const { chainId, fToken, fValue } = req.body;

  if (!chainId) {
    res.status(400);
    throw new Error("chainId not found");
  }

  if (!fToken) {
    res.status(400);
    throw new Error("fromToken not found");
  }

  let validatedValue;
  if (fToken?.address != "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
    validatedValue = parseUnits(
      fValue.toString(),
      fToken?.decimals.toString()
    ).toString();
  } else {
    validatedValue = parseEther(fValue.toString()).toString();
  }

  console.log({ validatedValue: validatedValue });

  // const url = `https://api.1inch.dev/swap/${version}/${chainId}/approve/transaction`;
  const url = `https://api.1inch.dev/swap/${version}/${Number(
    chainId
  )}/approve/transaction`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      tokenAddress: fToken?.address, // string
      amount: validatedValue, // string
    },
  };

  try {
    const result = await axios.get(url, config);

    if (result?.data) {
      const response = {
        approveData: result?.data,
      };
      res.status(200).json(response);
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
    res.status(400).json(message);
  }
});
const swap = asyncHandler(async (req, res) => {
  const { chainId, fToken, tToken, walletAddress, slippage, fValue } = req.body;
  console.log("swapping in progress");
  // console.log({ swappDtataIn: req.body });
  if (!chainId) {
    res.status(400);
    throw new Error("chainId not found");
  }

  if (!fToken) {
    res.status(400);
    throw new Error("fromToken not found");
  }

  if (!tToken) {
    res.status(400);
    throw new Error("tToken not found");
  }

  if (!walletAddress) {
    res.status(400);
    throw new Error("walletAddress not found");
  }

  let validatedValue;
  if (fToken.address != "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
    validatedValue = parseUnits(
      fValue.toString(),
      fToken?.decimals.toString()
    ).toString();
  } else {
    validatedValue = parseEther(fValue.toString()).toString();
  }

  console.log({ validatedValue: validatedValue });

  const params = {
    src: fToken.address,
    dst: tToken?.address,
    amount: validatedValue,
    from: walletAddress,
    slippage: Number(slippage),
    fee,
    referrer: dexAddress,
  };

  console.log({ swapParams: params });

  const url = `https://api.1inch.dev/swap/${version}/${Number(chainId)}/swap`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      src: fToken.address, // string
      dst: tToken?.address, // string
      amount: validatedValue,
      from: walletAddress, // string
      slippage: Number(slippage), // number
      fee: Number(fee), // number
      referrer: dexAddress, // string
    },
  };

  console.log({ swapConfig: config });

  try {
    const result = await axios.get(url, config);
    console.log({ swappingDataServerBefore: result?.data });

    if (result?.data) {
      console.log({ swappingDataServer: result?.data });

      // return result?.data;
      const response = {
        swapData: result?.data,
      };
      res.status(200).json(response);
    }
  } catch (error) {
    console.log({ swapError: error });
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
    res.status(400).json(message);
  }
});

//============================================================================================================================

module.exports = {
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
  //============{transactions by services and subservices}============
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
};
