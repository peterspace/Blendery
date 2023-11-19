const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const { ethers } = require('ethers');

const User = require('../models/User.js');
// const Manager = require('../models/ManagerModel');

const Transaction = require('../models/transactionModel');
const Store = require('../models/store.js');
const StoreRecovery = require('../models/StoreRecovery.js');
const sendEmail = require('../utils/sendEmail');
const otpGenerator = require('otp-generator');

const axios = require('axios');

const {
  parseEther,
  formatEther,
  parseUnits,
  formatUnits,
} = require('@ethersproject/units');

const {
  addBitcoinHDWalletAdmin,
  addEVMHDWalletAdmin,
  addTronHDWalletAdmin,
  montitorBlockchainTransactionInternal,
  checkBlockchain,
  checkOneBlockchainTransaction,
} = require('../controllers/hdWalletController.js');

//============={HTML MESSAGE TEMPLATES}====================================================
// mongoose return unnecessary data with object so convert it into json
// const { password, ...rest } = Object.assign({}, user.toJSON());
/**************************************************************************************************************
 **************************************************************************************************************

                                          User Block
                      
 **************************************************************************************************************
 **************************************************************************************************************
 */

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
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
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
/**
 * Initially
 * No txId
 * no dedicated managerId
 * status is "Pending"
 *
 */

//test getAmount

const newBTC = {
  _id: '652c68058a1e328256fef032',
  id: 'bitcoin',
  symbol: 'btc',
  name: 'Bitcoin',
  image:
    'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
  current_price: 28464,
  market_cap: '556277822255',
  market_cap_rank: '1',
  fully_diluted_valuation: '598508496249',
  total_volume: '12387633223',
  high_24h: '28564',
  low_24h: '28188',
  price_change_24h: '150.42',
  price_change_percentage_24h: '0.53127',
  market_cap_change_24h: '2995519371',
  market_cap_change_percentage_24h: '0.54141',
  circulating_supply: '19518243',
  total_supply: '21000000',
  max_supply: '21000000',
  ath: '69045',
  ath_change_percentage: '-58.73882',
  ath_date: '2021-11-10T14:24:11.849Z',
  atl: '67.81',
  atl_change_percentage: '41913.13777',
  atl_date: '2013-07-06T00:00:00.000Z',
  roi: null,
  last_updated: '2023-10-19T14:04:02.303Z',
  updatedAt: '2023-10-19T14:20:05.661Z',
  chain: 'Bitcoin',
  // chain:'Tron'
};

const newETH = {
  _id: '652c68058a1e328256fef036',
  id: 'tether',
  symbol: 'usdt',
  name: 'Tether',
  image:
    'https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661',
  current_price: 1,
  market_cap: '83834650426',
  market_cap_rank: '3',
  fully_diluted_valuation: '83834650426',
  total_volume: '15153190047',
  high_24h: '1.002',
  low_24h: '0.997953',
  price_change_24h: '-0.000101133801949649',
  price_change_percentage_24h: '-0.01011',
  market_cap_change_24h: '48584980',
  market_cap_change_percentage_24h: '0.05799',
  circulating_supply: '83814882993.8953',
  total_supply: '83814882993.8953',
  max_supply: null,
  ath: '1.32',
  ath_change_percentage: '-24.39439',
  ath_date: '2018-07-24T00:00:00.000Z',
  atl: '0.572521',
  atl_change_percentage: '74.72446',
  atl_date: '2015-03-02T00:00:00.000Z',
  roi: null,
  last_updated: '2023-10-19T14:00:00.872Z',
  address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
  decimals: 6,
  chainId: '1',
  type: 'ERC20',
  updatedAt: '2023-10-22T10:05:05.529Z',
  chain: 'Ethereum',
};

const newTron = {
  id: 'tron',
  symbol: 'trx',
  name: 'TRON',
  image:
    'https://assets.coingecko.com/coins/images/1094/large/tron-logo.png?1696502193',
  current_price: 0.089211,
  market_cap: '7940706751',
  market_cap_rank: 11,
  fully_diluted_valuation: '7940715780',
  total_volume: '249767521',
  high_24h: '0.089511',
  low_24h: '0.088464',
  price_change_24h: '-0.000081448537954873',
  price_change_percentage_24h: '-0.09122',
  market_cap_change_24h: '-580879.8217954636',
  market_cap_change_percentage_24h: '-0.00731',
  circulating_supply: '88903131082.5918',
  total_supply: '88902827407.8873',
  max_supply: null,
  ath: 0.231673,
  ath_change_percentage: '-61.47436',
  ath_date: '2018-01-05T00:00:00.000Z',
  atl: 0.00180434,
  atl_change_percentage: '4846.59129',
  atl_date: '2017-11-12T00:00:00.000Z',
  roi: {
    times: 45.95294465386169,
    currency: 'usd',
    percentage: 4595.29446538617,
  },
  last_updated: {
    $date: '2023-10-19T14:04:00.135Z',
  },
  updatedAt: {
    $date: '2023-10-22T12:09:00.190Z',
  },
  chain: 'Tron',
};

const getTokenAmount1 = asyncHandler(async (token, value) => {
  let amount; // fValue formatted to transaction decimals
  let amountFixed;
  let estimatedGas; // to be completed
  if (token?.chain === 'Bitcoin') {
    const satoshiToSend = Number(value) * 1e8; // check || 1e9
    amount = satoshiToSend;
  }

  if (token?.chain === 'Ethereum') {
    // amount = ethers.utils.parseUnits(value.toString(), Number(token?.decimals)); // Example: 1 ETH or 1 token (adjust as needed)
    amount = ethers.utils
      .parseUnits(value.toString(), token?.decimals.toString())
      .toString(); // Gives fully formatted value and not hex value

    // amountFixed = Number(amount).toFixed(3);
  }

  if (token?.chain === 'Tron') {
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
});

// getTokenAmount(newBTC, '1')
// getTokenAmount(newETH, '1')
// getTokenAmount(newTron, '1')

async function getHDWalletBitcoin() {
  // main logic

  //testing
  // const response = {
  //   address: '0x0ae21D71E104ED05D7a15fD7a1ACe66A21E0CC5E',
  // };

  const response = await addBitcoinHDWalletAdmin();

  return response;
}

async function getHDWalletEthereum() {
  // main logic

  //testing
  // const response = {
  //   address: '0x0ae21D71E104ED05D7a15fD7a1ACe66A21E0CC5E',
  // };

  const response = await addEVMHDWalletAdmin();

  return response;
}

async function getHDWalletTron() {
  // main logic

  //testing
  // const response = {
  //   address: '0x0ae21D71E104ED05D7a15fD7a1ACe66A21E0CC5E',
  // };

  const response = await addTronHDWalletAdmin();

  return response;
}

const getTransactionWallet = async (chain) => {
  let blenderyAddress;

  switch (chain) {
    //MAINNETS
    //Arbitrum
    case 'Bitcoin':
      const walletBTC = await addBitcoinHDWalletAdmin();

      if (walletBTC) {
        blenderyAddress = walletBTC?.address;
      }

      break;

    case 'Ethereum':
      const walletETH = await addEVMHDWalletAdmin();

      if (walletETH) {
        blenderyAddress = walletETH?.address;
      }

      break;

    case 'Tron':
      const walletTRX = await addTronHDWalletAdmin();

      if (walletTRX) {
        blenderyAddress = walletTRX?.address;
      }

      break;

    default:
      console.warn('Please choose a chain!');
      break;
  }

  let response = {
    blenderyAddress,
  };
  console.log(response);
  return response;
};

// getTransactionWallet('Bitcoin')
// getTransactionWallet('Ethereum')
// getTransactionWallet('Tron')
const createTransaction1 = asyncHandler(async (req, res) => {
  // generate newOrder number
  console.log({ calling: true });
  const user = await User.findById(req.user._id); // get userId from "protect middleware"
  if (!user) {
    res.status(400);
    throw new Error('User not found, please login');
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

  if (service === 'exchange' && subService === 'exchange') {
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
      chain: fToken?.chain ? fToken?.chain : '',
      chainId: fToken?.chainId ? fToken?.chainId : '',
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

  if (service === 'defi' && subService === 'defi') {
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
      chain: fToken?.chain ? fToken?.chain : '',
      chainId: fToken?.chainId ? fToken?.chainId : '',
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

  if (service === 'buy' && subService === 'buyCash') {
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
      chainId: tToken?.chainId ? tToken?.chainId : '',
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

  if (service === 'buy' && subService === 'buyCard') {
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
      chain: fToken?.chain ? fToken?.chain : '',
      chainId: tToken?.chainId ? tToken?.chainId : '',
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

  if (service === 'sell' && subService === 'sellCash') {
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
      chain: fToken?.chain ? fToken?.chain : '',
      chainId: fToken?.chainId ? fToken?.chainId : '',
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
  if (service === 'sell' && subService === 'sellCard') {
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
      chain: fToken?.chain ? fToken?.chain : '',
      chainId: fToken?.chainId ? fToken?.chainId : '',
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

const createTransaction = asyncHandler(async (req, res) => {
  // generate newOrder number
  console.log({ calling: true });
  const user = await User.findById(req.user._id); // get userId from "protect middleware"
  if (!user) {
    res.status(400);
    throw new Error('User not found, please login');
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

  if (service === 'exchange' && subService === 'exchange') {
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
      chain: fToken?.chain ? fToken?.chain : '',
      chainId: fToken?.chainId ? fToken?.chainId : '',
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

  if (service === 'defi' && subService === 'defi') {
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
      chain: fToken?.chain ? fToken?.chain : '',
      chainId: fToken?.chainId ? fToken?.chainId : '',
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

  if (service === 'buy' && subService === 'buyCash') {
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
      chainId: tToken?.chainId ? tToken?.chainId : '',
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

  if (service === 'buy' && subService === 'buyCard') {
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
      chain: fToken?.chain ? fToken?.chain : '',
      chainId: tToken?.chainId ? tToken?.chainId : '',
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

  if (service === 'sell' && subService === 'sellCash') {
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
      chain: fToken?.chain ? fToken?.chain : '',
      chainId: fToken?.chainId ? fToken?.chainId : '',
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
  if (service === 'sell' && subService === 'sellCard') {
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
      chain: fToken?.chain ? fToken?.chain : '',
      chainId: fToken?.chainId ? fToken?.chainId : '',
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
    updatedTimeStatus = 'Active';
  }
  //==={Is Expired}==================
  if (timeLeft < currentTime) {
    updatedTimeStatus = 'Expired';
  }

  const blockchainUrlBitcoinMainnet = 'https://blockstream.info/tx';
  const blockchainUrlBitcoinTest = 'https://blockstream.info/testnet/tx';
  const blockchainUrlBitcoinEndpoint = blockchainUrlBitcoinTest;
  const blockchainUrlBitcoin = `${blockchainUrlBitcoinEndpoint}/${hashOut}`;

  const tronblockchainUrlMainnet = 'https://tronscan.org/#/transaction'; // goerli test net
  const tronblockchainUrlNile = 'https://nile.tronscan.org/#/transaction'; // goerli test net
  const tronblockchainUrlEndpoint = tronblockchainUrlNile;
  const blockchainUrlTron = `${tronblockchainUrlEndpoint}/${hashOut}`;

  const blockchainUrlEthereumMainnet = 'https://etherscan.io/tx'; // goerli test net
  const blockchainUrlEthereumGoerli = 'https://goerli.etherscan.io/tx'; // goerli test net
  const blockchainUrlEthereumEndpoint = blockchainUrlEthereumGoerli;
  const blockchainUrlEthereum = `${blockchainUrlEthereumEndpoint}/${hashOut}`;
  let blockchainUrl = '';
  let chain;

  if (hashOut) {
    if (service === 'buy' && subService === 'buyCash') {
      chain = transaction?.tToken?.chain ? transaction?.tToken?.chain : '';
      if (chain === 'Bitcoin') {
        blockchainUrl = blockchainUrlBitcoin;
      }
      if (chain === 'Tron') {
        blockchainUrl = blockchainUrlTron;
      }
      if (chain === 'Ethereum') {
        blockchainUrl = blockchainUrlEthereum;
      }
      //
    }

    if (service === 'buy' && subService === 'buyCard') {
      chain = transaction?.tToken?.chain ? transaction?.tToken?.chain : '';

      if (chain === 'Bitcoin') {
        blockchainUrl = blockchainUrlBitcoin;
      }
      if (chain === 'Tron') {
        blockchainUrl = blockchainUrlTron;
      }
      if (chain === 'Ethereum') {
        blockchainUrl = blockchainUrlEthereum;
      }
    }

    if (service === 'exchange' && subService === 'exchange') {
      chain = transaction?.tToken?.chain ? transaction?.tToken?.chain : '';
      if (chain === 'Bitcoin') {
        blockchainUrl = blockchainUrlBitcoin;
      }
      if (chain === 'Tron') {
        blockchainUrl = blockchainUrlTron;
      }
      if (chain === 'Ethereum') {
        blockchainUrl = blockchainUrlEthereum;
      }
    }
  }

  const blockchainUrlOut = blockchainUrl;
  // const percentageProgress = 5;
  // const status = 'Completed';

  let percentageProgress;
  if (status === 'Completed') {
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
    'https://www.blockchain.com/explorer/transactions/btc';
  const blockchainUrlBitcoinTest = '';
  const blockchainUrlBitcoinEndpoint = blockchainUrlBitcoinMainnet;
  const blockchainUrlBitcoin = `${blockchainUrlBitcoinEndpoint}/${req.body.hash}`;

  const tronblockchainUrlMainnet = 'https://tronscan.org/#/transaction'; // goerli test net
  const tronblockchainUrlNile = 'https://nile.tronscan.org/#/transaction'; // goerli test net
  const tronblockchainUrlEndpoint = tronblockchainUrlNile;
  const blockchainUrlTron = `${tronblockchainUrlEndpoint}/${req.body.hash}`;

  const blockchainUrlEthereumMainnet = 'https://etherscan.io/tx'; // goerli test net
  const blockchainUrlEthereumGoerli = 'https://etherscan.io/tx'; // goerli test net
  const blockchainUrlEthereumEndpoint = blockchainUrlEthereumGoerli;
  const blockchainUrlEthereum = `${blockchainUrlEthereumEndpoint}/${req.body.hash}`;

  let blockchainUrl;

  const service = req.body.service;
  const subService = req.body.subService;

  if (service === 'buy' && subService === 'buyCash') {
    if (chain === 'Bitcoin') {
      blockchainUrl = blockchainUrlBitcoin;
    }
    if (chain === 'Tron') {
      blockchainUrl = blockchainUrlTron;
    }
    if (chain === 'Ethereum') {
      blockchainUrl = blockchainUrlEthereum;
    }
    //
  }

  if (service === 'buy' && subService === 'buyCard') {
    if (chain === 'Bitcoin') {
      blockchainUrl = blockchainUrlBitcoin;
    }
    if (chain === 'Tron') {
      blockchainUrl = blockchainUrlTron;
    }
    if (chain === 'Ethereum') {
      blockchainUrl = blockchainUrlEthereum;
    }
  }

  if (service === 'exchange' && subService === 'exchange') {
    if (chain === 'Bitcoin') {
      blockchainUrl = blockchainUrlBitcoin;
    }
    if (chain === 'Tron') {
      blockchainUrl = blockchainUrlTron;
    }
    if (chain === 'Ethereum') {
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
    'message'
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
  }).populate('message');
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
  }).populate('message');
  let response = [];

  userTransactions?.map(async (transaction) => {
    // await updateBlockChainTransactionsAutomaticallyInternal(transaction?._id);
    let service = transaction.service;
    let subService = transaction.subService;
    if (service === 'exchange' && subService === 'exchange') {
      response.push(transaction);
    }
  });
  res.status(200).json(response);
});
const getUserDefi = asyncHandler(async (req, res) => {
  const userTransactions = await Transaction.find({
    user: req.user.id,
  }).populate('message');
  let response = [];

  userTransactions?.map(async (transaction) => {
    // await updateBlockChainTransactionsAutomaticallyInternal(transaction?._id);
    let service = transaction.service;
    let subService = transaction.subService;
    if (service === 'defi' && subService === 'defi') {
      response.push(transaction);
    }
  });
  res.status(200).json(response);
});

const getUserBuyCash = asyncHandler(async (req, res) => {
  const userTransactions = await Transaction.find({
    user: req.user.id,
  }).populate('message');
  let response = [];

  userTransactions?.map(async (transaction) => {
    // await updateBlockChainTransactionsAutomaticallyInternal(transaction?._id);
    let service = transaction.service;
    let subService = transaction.subService;
    if (service === 'buy' && subService === 'buyCash') {
      response.push(transaction);
    }
  });
  res.status(200).json(response);
});

const getUserBuyCard = asyncHandler(async (req, res) => {
  const userTransactions = await Transaction.find({
    user: req.user.id,
  }).populate('message');
  let response = [];

  userTransactions?.map(async (transaction) => {
    // await updateBlockChainTransactionsAutomaticallyInternal(transaction?._id);
    let service = transaction.service;
    let subService = transaction.subService;
    if (service === 'buy' && subService === 'buyCard') {
      response.push(transaction);
    }
  });
  res.status(200).json(response);
});

const getUserSellCash = asyncHandler(async (req, res) => {
  const userTransactions = await Transaction.find({
    user: req.user.id,
  }).populate('message');
  let response = [];

  userTransactions?.map(async (transaction) => {
    // await updateBlockChainTransactionsAutomaticallyInternal(transaction?._id);
    let service = transaction.service;
    let subService = transaction.subService;
    if (service === 'sell' && subService === 'sellCash') {
      response.push(transaction);
    }
  });
  res.status(200).json(response);
});

const getUserSellCard = asyncHandler(async (req, res) => {
  const userTransactions = await Transaction.find({
    user: req.user.id,
  }).populate('message');
  let response = [];

  userTransactions?.map(async (transaction) => {
    // await updateBlockChainTransactionsAutomaticallyInternal(transaction?._id);
    let service = transaction.service;
    let subService = transaction.subService;
    if (service === 'sell' && subService === 'sellCard') {
      response.push(transaction);
    }
  });
  res.status(200).json(response);
});

//======={Admin: Get Transactions By Services and subServices}========================================

const getAdminExchange1 = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); // get userId from "protect middleware"
  const userTransactions = await Transaction.find().populate('message');
  let response = [];

  userTransactions?.map(async (transaction) => {
    // await updateBlockChainTransactionsAutomaticallyInternal(transaction?._id);
    let service = transaction.service;
    let subService = transaction.subService;
    if (service === 'exchange' && subService === 'exchange') {
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
    updatedTimeStatus = 'Active';
  }
  //==={Is Expired}==================
  if (timeLeft < currentTime) {
    updatedTimeStatus = 'Expired';
  }

  if (transactionDoc?.status === 'Completed') {
    updatedTimeStatus = 'Completed';
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
  const userTransactions = await Transaction.find().populate('message');
  let response = [];

  userTransactions?.map(async (transaction) => {
    // await updateBlockChainTransactionsAutomaticallyInternal(transaction?._id);
    let service = transaction.service;
    let subService = transaction.subService;
    if (service === 'exchange' && subService === 'exchange') {
      updateTimeLeftAutomatically(transaction?._id);
      response.push(transaction);
    }
  });
  res.status(200).json(response);
});
const getAdminDefi = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); // get userId from "protect middleware"
  const userTransactions = await Transaction.find().populate('message');
  let response = [];

  userTransactions?.map(async (transaction) => {
    // await updateBlockChainTransactionsAutomaticallyInternal(transaction?._id);
    let service = transaction.service;
    let subService = transaction.subService;
    if (service === 'defi' && subService === 'defi') {
      response.push(transaction);
    }
  });
  res.status(200).json(response);
});

const getAdminBuyCash = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); // get userId from "protect middleware"
  const userTransactions = await Transaction.find().populate('message');
  let response = [];

  userTransactions?.map(async (transaction) => {
    // await updateBlockChainTransactionsAutomaticallyInternal(transaction?._id);
    let service = transaction.service;
    let subService = transaction.subService;
    if (service === 'buy' && subService === 'buyCash') {
      updateTimeLeftAutomatically(transaction?._id);
      response.push(transaction);
    }
  });
  res.status(200).json(response);
});

const getAdminBuyCard = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); // get userId from "protect middleware"
  const userTransactions = await Transaction.find().populate('message');
  let response = [];

  userTransactions?.map(async (transaction) => {
    // await updateBlockChainTransactionsAutomaticallyInternal(transaction?._id);
    let service = transaction.service;
    let subService = transaction.subService;
    if (service === 'buy' && subService === 'buyCard') {
      updateTimeLeftAutomatically(transaction?._id);

      response.push(transaction);
    }
  });
  res.status(200).json(response);
});

const getAdminSellCash = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); // get userId from "protect middleware"
  const userTransactions = await Transaction.find().populate('message');
  let response = [];

  userTransactions?.map(async (transaction) => {
    // await updateBlockChainTransactionsAutomaticallyInternal(transaction?._id);
    let service = transaction.service;
    let subService = transaction.subService;
    if (service === 'sell' && subService === 'sellCash') {
      updateTimeLeftAutomatically(transaction?._id);
      response.push(transaction);
    }
  });
  res.status(200).json(response);
});

const getAdminSellCard = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); // get userId from "protect middleware"
  const userTransactions = await Transaction.find().populate('message');
  let response = [];

  userTransactions?.map(async (transaction) => {
    // await updateBlockChainTransactionsAutomaticallyInternal(transaction?._id);
    let service = transaction.service;
    let subService = transaction.subService;
    if (service === 'sell' && subService === 'sellCard') {
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

  res.json(await Transaction.findById(txId).populate('message'));
});

// not required
const getAllTransactionsByUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); // get managers userId from "protect middleware"
  const { userId } = req.params;
  if (user.role === 'User') {
    res.json(await Transaction.find({ userId: userId }).populate('user'));
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
    manager.role === 'Admin' &&
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

const updateTransactionsAutomatically = asyncHandler(async (req, res) => {
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
    updatedTimeStatus = 'Active';
  }
  //==={Is Expired}==================
  if (timeLeft < currentTime) {
    updatedTimeStatus = 'Expired';
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
const updateBlockChainTransaction = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const transactionDoc = await Transaction.findById(id);

  let timeLeft = new Date(transactionDoc?.timeLeft).getTime();
  let currentTime = new Date(Date.now()).getTime();

  let updatedTimeStatus;

  // let updatedTimeLeft;
  //==={Is Active}==================
  if (timeLeft > currentTime) {
    updatedTimeStatus = 'Active';
  }
  //==={Is Expired}==================
  if (timeLeft < currentTime) {
    updatedTimeStatus = 'Expired';
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
    updatedTimeStatus = 'Active';
  }
  //==={Is Expired}==================
  if (timeLeft < currentTime) {
    updatedTimeStatus = 'Expired';
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
  if (manager.role === 'Admin') {
    res.json(
      await Transaction.find({ manager: managerId, user: userId })
        .populate('user')
        .populate('manager')
        .populate('messages')
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
    'user'
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
  if (supervisor.role === 'Admin' && supervisor.level > 2) {
    // super admin also has this previledge
    //
    res.json(
      await Transaction.find({ manager: managerId })
        .populate('user')
        .populate('manager')
        .populate('messages')
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
  if (admin.role === 'Admin' && admin.level > 2) {
    // supervisors below do not have this previledge
    res.json(
      await Transaction.findOne({ manager: managerId, _id: id })
        .populate('user')
        .populate('manager')
        .populate('messages')
        .exec()
    );
  }
});

const getAllManagersTransactionByAdmin = asyncHandler(async (req, res) => {
  // const user = await Manager.findById(req.user._id); // protected route
  const admin = await User.findById(req.user._id); // get managers userId from "protect middleware"
  const { managerId } = req.params;
  if (admin.role === 'Admin' && admin.level > 2) {
    res.json(
      await Transaction.findOne({ manager: managerId })
        .populate('user')
        .populate('manager')
        .populate('messages')
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

const getAllTransactions = asyncHandler(async (req, res) => {
  const admin = await User.findById(req.user._id); // get managers userId from "protect middleware"

  // console.log({ admin: admin });

  if (admin.role === 'Admin') {
    res.json(await Transaction.find().populate('user').exec());
  }
});

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
    throw new Error('User does not exist');
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
  const subject = 'Registration Sucessful';

  const emailTest = 'peter.space.io@gmail.com';
  // const send_to = email;
  const send_to = emailTest;
  const sent_from = process.env.EMAIL_USER;

  console.log({ email: email, walletAddress: walletAddress });

  await sendEmail(subject, message, send_to, sent_from);
  res
    .status(200)
    .json({ success: true, message: 'your registration was sucessful' });
});

//==========================={Transaction Notifications}=========================

//=============================={Order started notification email on Transaction page}============================================================
const transactionConfirmation = asyncHandler(async (req, res) => {
  const { email, txId } = req.body;

  // const { email, txId, orderType, fromToken, toToken, fromAmount, toAmount } =
  //   req.body;

  if (!email) throw new Error('Sender not found with this email');
  if (!txId) throw new Error('Order number not found');

  const subject = 'Order Confirmation';
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

  const emailTest = 'peter.space.io@gmail.com';

  // const send_to = email; // live production
  const send_to = emailTest; // testing
  const sent_from = process.env.EMAIL_USER;
  //  const sent_from = 'noreply@govercity.com',

  await sendEmail(subject, message, send_to, sent_from);
  res.status(200).json({ success: true, message: 'Email sent' });
});

//=============================={Order Completed notification email on Transaction page}============================================================
const transactionCompleted = asyncHandler(async (req, res) => {
  const { email, txId, orderType, fromSymbol, toSymbol, fromValue, toValue } =
    req.body;

  if (!email) throw new Error('Sender not found with this email');
  if (!txId) throw new Error('Order number not found');

  const subject = 'Order Completed';

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

  const emailTest = 'peter.space.io@gmail.com';

  // const send_to = email; // live production
  const send_to = emailTest; // testing
  const sent_from = process.env.EMAIL_USER;
  //  const sent_from = 'noreply@govercity.com',

  await sendEmail(subject, message, send_to, sent_from);
  res.status(200).json({ success: true, message: 'Email sent' });
});

// Get all transaction between your manager and a single user
const getUserTransactionById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); // get managers userId from "protect middleware"
  const { id } = req.params; // user's Id
  if (user) {
    const transaction = await Transaction.findOne({ user: user?._id, _id: id })
      .populate('user')
      .populate('manager')
      .populate('messages')
      .exec();

    res.json(transaction);
  }
});

// Get all UserTransactions
// const getUserInactiveTransactions = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id);
//   console.log({ userTx: user });

//   const response = await Transaction.find({ user: user._id, status: 'InActive' })
//   console.log({ responseTx: response });
//   res.status(200).json(response);
//   // res.json(response);
// });

const getUserInactiveTransactions = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  // console.log({ userTx: user });

  const response = await Transaction.find({
    user: user._id,
    status: 'InActive',
  })
    .populate('user')
    .exec();
  console.log({ responseTx: response });
  res.status(200).json(response);
  // res.json(response);
});

// const getUserActiveTransactions = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id);
//   // console.log({ userTx: user });

//   const response = await Transaction.find({
//     user: user._id,
//     status: 'Active',
//   })
//     .populate('user')
//     .exec();
//   console.log({ responseTx: response });
//   res.status(200).json(response);
//   // res.json(response);
// });

const getUserActiveTransactions = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  // console.log({ userTx: user });

  let transactions = await Transaction.find({ status: 'pending' }).populate(
    'message'
  );

  const response = await Transaction.find({
    user: user._id,
  })
    .populate('user')
    .exec();

  response.map(async (t) => {
    if (t.status !== 'Pending') {
      transactions.push(t);
    }
  });
  // console.log({ responseTx: response });
  res.status(200).json(transactions);
  // res.json(response);
});
// const getManagerActiveTransactions = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id);
//   // console.log({ userTx: user });

//   const response = await Transaction.find({
//     manager: user._id,
//     status: 'Active',
//   })
//     .populate('user')
//     .exec();
//   console.log({ responseTx: response });
//   res.status(200).json(response);
//   // res.json(response);
// });

const getManagerActiveTransactions = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  // console.log({ userTx: user });

  let transactions = [];

  const response = await Transaction.find({
    manager: user._id,
  })
    .populate('user')
    .exec();
  response.map(async (t) => {
    if (t.status !== 'Pending') {
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

  if (!email) throw new Error('Sender not found with this email');
  if (!txId) throw new Error('Order number not found');

  const subject = 'Order Confirmation';
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

  const emailTest = 'peter.space.io@gmail.com';

  // const send_to = email; // live production
  const send_to = emailTest; // testing
  const sent_from = process.env.EMAIL_USER;
  //  const sent_from = 'noreply@govercity.com',

  await sendEmail(subject, message, send_to, sent_from);
  res.status(200).json({ success: true, message: 'Email sent' });
});

const orderCompleted = asyncHandler(async (req, res) => {
  const { email, txId, orderType, fromSymbol, toSymbol, fromValue, toValue } =
    req.body;

  if (!email) throw new Error('Sender not found with this email');
  if (!txId) throw new Error('Order number not found');

  const subject = 'Order Completed';

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

  const emailTest = 'peter.space.io@gmail.com';

  // const send_to = email; // live production
  const send_to = emailTest; // testing
  const sent_from = process.env.EMAIL_USER;
  //  const sent_from = 'noreply@govercity.com',

  await sendEmail(subject, message, send_to, sent_from);
  res.status(200).json({ success: true, message: 'Email sent' });
});

// /********************************************************************************************************************** */
// /********************************************************************************************************************** */
// /*********************************************     BLOCKCHAIN TRANSACTION MONITORING    ******************************* */
// /********************************************************************************************************************** */
// /********************************************************************************************************************** */
// const getNetworkRPC = async (chainId) => {
//   let networkRPC = '';
//   // let decimals = '';

//   switch (chainId) {
//     //MAINNETS
//     //Arbitrum
//     case '42161':
//       networkRPC = 'https://goerli-rollup.arbitrum.io/rpc';

//       break;

//     //Aurora
//     case '1313161554':
//       networkRPC = 'https://mainnet.aurora.dev';

//       break;

//     //Avalanche
//     case '43114':
//       networkRPC = 'https://api.avax.network/ext/bc/C/rpc';

//       break;

//     //Binance
//     case '56':
//       networkRPC = 'https://rpc.ankr.com/bsc';

//       break;

//     //ETH
//     case '1':
//       networkRPC = 'https://cloudflare-eth.com';

//       break;

//     //Fantom
//     case '250':
//       networkRPC = 'https://rpc.ankr.com/fantom/';

//       break;

//     //Gnosis
//     case '100':
//       networkRPC = 'https://rpc.gnosischain.com/';

//       break;

//     //Klaytn
//     case '8217':
//       networkRPC = 'https://rpc.ankr.com/klaytn';

//       break;

//     //Optimism
//     case '10':
//       networkRPC = 'https://mainnet.optimism.io';

//       break;

//     //Polygon
//     case '137':
//       networkRPC = 'https://polygon-rpc.com';

//       break;

//     //================================{TESTNETS}=====================================
//     //PolygonMumbai
//     case '80001':
//       networkRPC = 'https://matic-mumbai.chainstacklabs.com';

//       break;

//     //GoerliEth

//     case '5':
//       networkRPC = 'https://rpc.ankr.com/eth_goerli';

//       break;

//     //BinanceTestnet

//     case '97':
//       networkRPC = 'https://data-seed-prebsc-1-s1.binance.org:8545/';

//       break;

//     default:
//       console.warn('Please choose a token!');
//       break;
//   }

//   //========{Formatting networkRPC Output}=================================
//   let networkRPCToJson = JSON.stringify(networkRPC);
//   let networkRPCFormatted = networkRPCToJson.replace(
//     /^["'](.+(?=["']$))["']$/,
//     '$1'
//   );
//   //========{Formatting decimals Output}=================================
//   // let decimalsToJson = JSON.stringify(decimals);
//   // let decimalsFormatted = decimalsToJson.replace(
//   //   /^["'](.+(?=["']$))["']$/,
//   //   '$1'
//   // );

//   let response = {
//     networkRPC: networkRPCFormatted,
//   };

//   return response;

//   // res.status(200).json({ status: isAvailable, token: userToken });
// };

// //====={check specific order status on Bitcoin network}========================
// const orderStatusBitcoin = async (order) => {
//   let received = false;

//   // Initialize Axios instance for making HTTP requests
//   // const api = axios.create({
//   //   baseURL: 'https://blockstream.info/api',
//   // });
//   // chainge from testnet in real transactions
//   let network;
//   if (order?.networkName === 'Testnet') {
//     network = bitcoin.networks.testnet;
//   } else {
//     network = bitcoin.networks.bitcoin;
//   }
//   // Initialize Axios instance for making HTTP requests
//   const api = axios.create({
//     baseURL: `https://blockstream.info/${network}/api`,
//   });

//   // mainnet
//   // baseURL: 'https://blockstream.info/api',
//   // testnet
//   //   baseURL: 'https://blockstream.info/testnet/api',

//   // Check for incoming transactions for each payment address
//   const paymentStatus = await Promise.all(
//     order.map(async (record) => {
//       const address = record.address;
//       const response = await api.get(`/address/${address}/txs`);

//       const transactions = response.data;

//       // Calculate the total amount received
//       const totalAmountReceived = transactions.reduce((total, tx) => {
//         const outputs = tx.vout.filter(
//           (output) => output.scriptpubkey_address === address
//         );
//         const receivedAmount = outputs.reduce(
//           (amount, output) => amount + output.value,
//           0
//         );

//         return total + receivedAmount;
//       }, 0);

//       if (totalAmountReceived > 0) {
//         //==========={Update DB status}======================================
//         order.status = 'paid' || order.status;
//         await order.save();
//         return {
//           status: 'paid',
//           amount: order?.amount,
//           address,
//           totalReceived: totalAmountReceived / 1e8, // Convert from satoshis to BTC
//         };
//       } else {
//         return {
//           status: 'pending',
//           amount: order?.amount,
//           address,
//           totalReceived: totalAmountReceived / 1e8, // Convert from satoshis to BTC
//         };
//       }
//     })
//   );

//   return paymentStatus;
// };
// //====={check specific order status on Ethereum network}========================
// const orderStatusEvm = async (order) => {
//   // const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/your-infura-project-id'); // Replace with your Infura project ID
//   const verifyToken = await getNetworkRPC(order?.chainId);
//   let networkRPC = verifyToken.networkRPC;
//   const provider = new ethers.providers.JsonRpcProvider(networkRPC); // Replace with your Infura project ID

//   //=================================================================
//   const receiver = order?.receiver; // Replace with wallet A's address
//   const sender = order?.sender; // Replace with wallet B's address

//   const tokenAddress = order?.tokenAddress;
//   const tokenDecimals = order?.tokenDecimals;
//   const tokenSymbol = order?.tokenSymbol;
//   const amount = order?.amount;
//   if (tokenAddress != '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
//     const expectedAmount = ethers.utils.parseEther(order?.amount); // Replace with the expected amount in Ether
//     // const expectedAmount = ethers.utils.parseEther('1'); // Replace with the expected amount in Ether

//     // Create a filter to monitor incoming transactions from wallet B to wallet A
//     const filter = {
//       address: receiver,
//       topics: [
//         ethers.utils.id('Transfer(address,address,uint256)'),
//         null,
//         sender,
//       ],
//     };

//     provider.on(filter, async (log) => {
//       try {
//         const transactionHash = log.transactionHash;
//         const transaction = await provider.getTransaction(transactionHash);

//         // Check if the transaction value matches the expected amount
//         if (transaction && transaction.value.eq(expectedAmount)) {
//           console.log(
//             `Received ${expectedAmount.toString()} Ether from ${sender} to ${receiver}`
//           );
//           // Perform further actions or handle the transaction as needed

//           //==========={Update DB status}======================================
//           return {
//             status: 'paid',
//             from: receiver,
//             to: sender,
//             totalReceived: expectedAmount,
//             isAmountMatched: true,
//             transactionHash: transactionHash,
//           };
//         } else {
//           return {
//             status: 'pending',
//             from: receiver,
//             to: sender,
//             totalReceived: transaction.value,
//             isAmountMatched: false,
//           };
//         }
//       } catch (error) {
//         console.error('Error processing incoming transaction:', error);
//       }
//     });
//   } else {
//     // Create a filter to monitor incoming USDT transfers from wallet B to wallet A
//     // const expectedAmount = ethers.utils.parseUnits('100', 6); // Replace with the expected amount in USDT (e.g., 100 USDT)
//     const expectedAmount = ethers.utils
//       .parseUnits(amount.toString(), tokenDecimals.toString())
//       .toString();

//     const tokenContract = new ethers.Contract(
//       tokenAddress,
//       ['transfer(address,uint256)'],
//       provider
//     );
//     tokenContract.on('Transfer', async (from, to, value, event) => {
//       try {
//         // Check if the transfer matches the expected amount and destination address

//         if (to === receiver && from === sender && value.eq(expectedAmount)) {
//           console.log(
//             `Received ${ethers.utils.formatUnits(
//               expectedAmount,
//               tokenDecimals
//             )} ${tokenSymbol} from ${sender} to ${receiver}`
//           );
//           // Perform further actions or handle the transaction as needed

//           //==========={Update DB status}======================================
//           return { status: 'paid' };
//         }
//       } catch (error) {
//         console.error('Error processing incoming USDT transfer:', error);
//       }
//     });
//   }
// };
// //====={check specific order status on tron network}========================
// const orderStatusTron = async (order) => {
//   // Initialize Axios instance for making HTTP requests
//   const api = axios.create({
//     baseURL: 'https://api.trongrid.io',
//   });

//   //=================================================================

//   //=================================================================
//   const receiver = order?.receiver; // Replace with wallet A's address
//   const sender = order?.sender; // Replace with wallet B's address

//   const tokenAddress = order?.tokenAddress;
//   const tokenDecimals = order?.tokenDecimals;
//   const tokenSymbol = order?.tokenSymbol;
//   const amount = order?.amount;

//   if (tokenSymbol != 'TX') {
//     // Get transactions sent from wallet B to wallet A
//     const expectedAmount = Number(amount); // 100 // Replace with the expected amount in TRX
//     const response = await api.get('/v1/accounts/txs', {
//       params: {
//         only_to: receiver,
//         only_from: sender,
//       },
//     });

//     const transactions = response.data.data;

//     // Calculate the total amount received from wallet B to wallet A
//     const totalAmountReceived = transactions.reduce((total, tx) => {
//       return total + parseFloat(tx.amount);
//     }, 0);

//     // Check if the total amount received matches the expected amount
//     const isAmountMatched = totalAmountReceived === expectedAmount;

//     if (isAmountMatched) {
//       //==========={Update DB status}======================================
//       return {
//         status: 'paid',
//         from: receiver,
//         to: sender,
//         totalReceived: totalAmountReceived / 1e6, // Convert from SUN to TRX
//         isAmountMatched,
//       };
//     } else {
//       return {
//         status: 'pending',
//         from: receiver,
//         to: sender,
//         totalReceived: totalAmountReceived / 1e6, // Convert from SUN to TRX
//         isAmountMatched,
//       };
//     }
//   } else {
//     // TRON full node endpoint (mainnet or testnet)
//     // const expectedAmount = Number(amount) * 1000000; // 100 // Replace with the expected amount in SUN (e.g., 1000000 SUN)
//     const expectedAmount = Number(amount) * 1e6; // 100 // Replace with the expected amount in SUN (e.g., 1000000 SUN)

//     // USDT contract address on TRON (mainnet or testnet)
//     // const usdtContractAddress = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t'; // Mainnet USDT contract address
//     const usdtContractAddress = tokenAddress; // Mainnet USDT contract address

//     // Create a filter to monitor incoming USDT transfers from wallet B to wallet A
//     const eventFilter = {
//       contractAddress: usdtContractAddress,
//       eventName: 'Transfer',
//       result: {
//         to: receiver,
//         from: sender,
//         value: expectedAmount,
//       },
//     };

//     // // Subscribe to the event
//     // tronWeb.getEventResult(eventFilter, (error, events) => {
//     //   if (error) {
//     //     console.error('Error retrieving events:', error);
//     //     return;
//     //   }

//     //   if (events.length > 0) {
//     //     console.log(
//     //       `Received ${expectedAmount} SUN (${tokenSymbol}) from ${sender} to ${receiver}`
//     //     );
//     //     // Perform further actions or handle the transaction as needed
//     //     //==========={Update DB status}======================================
//     //     return { status: 'paid' };
//     //   }

//     // });

//     // Subscribe to the event
//     let result = tronWeb.getEventResult(eventFilter, (error, events) => {
//       if (error) {
//         console.error('Error retrieving events:', error);
//         return;
//       }

//       if (events.length > 0) {
//         console.log(
//           `Received ${expectedAmount} SUN (${tokenSymbol}) from ${sender} to ${receiver}`
//         );
//         // Perform further actions or handle the transaction as needed
//         //==========={Update DB status}======================================
//         return {
//           status: 'paid',
//           from: receiver,
//           to: sender,
//           totalReceived: expectedAmount / 1e6, // Convert from SUN to TRX //check
//           isAmountMatched: true, // check
//         };
//       }
//     });
//     return result;
//   }
// };

// //====={Update transaction by id internally after receiving blockchain update on the transaction status}=========
// const updateTransactionByIdInternal = async (id, info) => {
//   const transaction = await Transaction.findById(id);

//   if (transaction) {
//     transaction.status = info.status || transaction.status;
//     transaction.totalReceived = info.status || transaction.status;
//     transaction.isAmountMatched = info.status || transaction.status;
//   }
//   const updatedTransaction = await transaction.save();
//   if (updatedTransaction) {
//     console.log({ updatedTransaction: updatedTransaction });
//     return updatedTransaction;
//   }
// };
// const montitorBlockchainTransaction = async (req, res) => {
//   let transactions = await Transaction.find({ status: 'pending' });

//   transactions.map(async (order) => {
//     let statusBitcoin = await orderStatusBitcoin(order);
//     let statusEvm = await orderStatusEvm(order);
//     let statusTron = await orderStatusTron(order);
//     if (statusBitcoin.status === 'Paid') {
//       await updateTransactionByIdInternal(order._id, statusBitcoin);
//     }
//     if (statusEvm.status === 'Paid') {
//       await updateTransactionByIdInternal(order._id, statusEvm);
//     }
//     if (statusTron.status === 'Paid') {
//       await updateTransactionByIdInternal(order._id, statusTron);
//     }
//   });

//   res.status(200).json(transactions);
// };
// //====={Montor all blockchain transactions at intervals : default here is every minute}========================
// //======{Pooling works and should be used for fetching and updating all current market data per set intervals}=================
// const poolRequestForAllBlockchainTransactions = async () => {
//   const intervalId = setInterval(() => {
//     montitorBlockchainTransaction();
//   }, 60000); // check after every minute

//   return () => {
//     clearInterval(intervalId);
//   };
// };

// poolRequestForAllBlockchainTransactions();

// /********************************************************************************************************************** */
// /********************************************************************************************************************** */
// /*********************************************     BLOCKCHAIN TRANSACTION MONITORING    ******************************* */
// /********************************************************************************************************************** */
// /********************************************************************************************************************** */

const protect = asyncHandler(async () => {
  try {
    // const token = req.cookies.token;
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MzRmNGYwMWJhMDJjYmJkYzgyY2ZmOCIsImlhdCI6MTY5Nzk3MjQ3MSwiZXhwIjoxNjk4MDU4ODcxfQ.rL7Iug3hYiWBDFpQxxRcgiqfHAAqhOH1QWGYsas82qw';
    if (!token) {
      console.log('Not authenticated!');
    }

    // Verify Token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log({ verified: verified });
    // Get user id from token
    const user = await User.findById(verified.id).select('-password');
    console.log({ user: user });

    if (!user) {
      console.log('User not found');
    }
    // req.user = user;
    // next();
  } catch (error) {
    console.log('Not authorized, please login');
    // throw new Error('Not ready');
  }
});

// protect()
//=============================================================================================================
//============={updated transactions rate}=============================================

const geTokenPriceData = async (id) => {
  const url = 'https://api.coingecko.com/api/v3/';
  const param = `coins/${id}`;
  const response = await axios.get(url + param);
  return response.data;
};

const getTokenAmount = async (token, value) => {
  let amount; // fValue formatted to transaction decimals
  let amountFixed;
  let estimatedGas; // to be completed
  if (token?.chain === 'Bitcoin') {
    const satoshiToSend = Number(value) * 1e8; // check || 1e9
    amount = satoshiToSend;
  }

  if (token?.chain === 'Ethereum') {
    // amount = ethers.utils.parseUnits(value.toString(), Number(token?.decimals)); // Example: 1 ETH or 1 token (adjust as needed)
    amount = parseUnits(
      value.toString(),
      token?.decimals.toString()
    ).toString(); // Gives fully formatted value and not hex value

    // amountFixed = Number(amount).toFixed(3);
  }

  if (token?.chain === 'Tron') {
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

  if (service === 'defi' && subService === 'defi') {
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
  if (service === 'buy' && subService === 'buyCash') {
    //=================================================================================================
    const toPrice = await geTokenPriceData(tToken?.id);
    const toPriceData = toPrice?.market_data?.current_price;
    //=================================================================================================

    let exchangeRate;
    if (fToken?.symbol === 'usd') {
      exchangeRate = Number(toPriceData?.usd);
    }
    if (fToken?.symbol === 'gbp') {
      exchangeRate = Number(toPriceData?.gbp);
    }
    if (fToken?.symbol === 'eur') {
      exchangeRate = Number(toPriceData?.eur);
    }
    if (fToken?.symbol === 'rub') {
      exchangeRate = Number(toPriceData?.rub);
    }
    if (fToken?.symbol === 'cad') {
      exchangeRate = Number(toPriceData?.cad);
    }
    if (fToken?.symbol === 'aed') {
      exchangeRate = Number(toPriceData?.aed);
    }
    if (fToken?.symbol === 'jpy') {
      exchangeRate = Number(toPriceData?.jpy);
    }
    if (fToken?.symbol === 'ngn') {
      exchangeRate = Number(toPriceData?.ngn);
    }
    if (fToken?.symbol === 'php') {
      exchangeRate = Number(toPriceData?.php);
    }
    if (fToken?.symbol === 'chf') {
      exchangeRate = Number(toPriceData?.chf);
    }
    if (fToken?.symbol === 'aud') {
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
  if (service === 'buy' && subService === 'buyCard') {
    //=================================================================================================
    const toPrice = await geTokenPriceData(tToken?.id);
    const toPriceData = toPrice?.market_data?.current_price;
    //=================================================================================================

    let exchangeRate;
    if (fToken?.symbol === 'usd') {
      exchangeRate = Number(toPriceData?.usd);
    }
    if (fToken?.symbol === 'gbp') {
      exchangeRate = Number(toPriceData?.gbp);
    }
    if (fToken?.symbol === 'eur') {
      exchangeRate = Number(toPriceData?.eur);
    }
    if (fToken?.symbol === 'rub') {
      exchangeRate = Number(toPriceData?.rub);
    }
    if (fToken?.symbol === 'cad') {
      exchangeRate = Number(toPriceData?.cad);
    }
    if (fToken?.symbol === 'aed') {
      exchangeRate = Number(toPriceData?.aed);
    }
    if (fToken?.symbol === 'jpy') {
      exchangeRate = Number(toPriceData?.jpy);
    }
    if (fToken?.symbol === 'ngn') {
      exchangeRate = Number(toPriceData?.ngn);
    }
    if (fToken?.symbol === 'php') {
      exchangeRate = Number(toPriceData?.php);
    }
    if (fToken?.symbol === 'chf') {
      exchangeRate = Number(toPriceData?.chf);
    }
    if (fToken?.symbol === 'aud') {
      exchangeRate = Number(toPriceData?.aud);
    }

    if (isNaN(exchangeRate)) {
      exchangeRate = 0;
    }

    const response = {
      exchangeRateRaw: exchangeRate,
      exchangeRate: exchangeRate.toFixed(3),
    };
    console.log({ response: response });
    res.status(200).json(response);
  }
  if (service === 'sell' && subService === 'sellCash') {
    //=================================================================================================
    const fromPrice = await geTokenPriceData(fToken?.id);
    const fromPriceData = fromPrice?.market_data?.current_price;
    //=================================================================================================

    let exchangeRate;
    if (tToken?.symbol === 'usd') {
      exchangeRate = Number(fromPriceData?.usd);
    }
    if (tToken?.symbol === 'gbp') {
      exchangeRate = Number(fromPriceData?.gbp);
    }
    if (tToken?.symbol === 'eur') {
      exchangeRate = Number(fromPriceData?.eur);
    }
    if (tToken?.symbol === 'rub') {
      exchangeRate = Number(fromPriceData?.rub);
    }
    if (tToken?.symbol === 'cad') {
      exchangeRate = Number(fromPriceData?.cad);
    }
    if (tToken?.symbol === 'aed') {
      exchangeRate = Number(fromPriceData?.aed);
    }
    if (tToken?.symbol === 'jpy') {
      exchangeRate = Number(fromPriceData?.jpy);
    }
    if (tToken?.symbol === 'ngn') {
      exchangeRate = Number(fromPriceData?.ngn);
    }
    if (tToken?.symbol === 'php') {
      exchangeRate = Number(fromPriceData?.php);
    }
    if (tToken?.symbol === 'chf') {
      exchangeRate = Number(fromPriceData?.chf);
    }
    if (tToken?.symbol === 'aud') {
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
  if (service === 'sell' && subService === 'sellCard') {
    //=================================================================================================
    const fromPrice = await geTokenPriceData(fToken?.id);
    const fromPriceData = fromPrice?.market_data?.current_price;
    //=================================================================================================

    let exchangeRate;
    if (tToken?.symbol === 'usd') {
      exchangeRate = Number(fromPriceData?.usd);
    }
    if (tToken?.symbol === 'gbp') {
      exchangeRate = Number(fromPriceData?.gbp);
    }
    if (tToken?.symbol === 'eur') {
      exchangeRate = Number(fromPriceData?.eur);
    }
    if (tToken?.symbol === 'rub') {
      exchangeRate = Number(fromPriceData?.rub);
    }
    if (tToken?.symbol === 'cad') {
      exchangeRate = Number(fromPriceData?.cad);
    }
    if (tToken?.symbol === 'aed') {
      exchangeRate = Number(fromPriceData?.aed);
    }
    if (tToken?.symbol === 'jpy') {
      exchangeRate = Number(fromPriceData?.jpy);
    }
    if (tToken?.symbol === 'ngn') {
      exchangeRate = Number(fromPriceData?.ngn);
    }
    if (tToken?.symbol === 'php') {
      exchangeRate = Number(fromPriceData?.php);
    }
    if (tToken?.symbol === 'chf') {
      exchangeRate = Number(fromPriceData?.chf);
    }
    if (tToken?.symbol === 'aud') {
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
  if (service === 'exchange' && subService === 'exchange') {
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
  if (service === 'store' && subService === 'store') {
    //=================================================================================================
    const toPrice = await geTokenPriceData(tToken?.id);
    const toPriceData = toPrice?.market_data?.current_price;
    //=================================================================================================

    let exchangeRate;
    if (fToken?.symbol === 'usd') {
      exchangeRate = Number(toPriceData?.usd);
    }
    if (fToken?.symbol === 'gbp') {
      exchangeRate = Number(toPriceData?.gbp);
    }
    if (fToken?.symbol === 'eur') {
      exchangeRate = Number(toPriceData?.eur);
    }
    if (fToken?.symbol === 'rub') {
      exchangeRate = Number(toPriceData?.rub);
    }
    if (fToken?.symbol === 'cad') {
      exchangeRate = Number(toPriceData?.cad);
    }
    if (fToken?.symbol === 'aed') {
      exchangeRate = Number(toPriceData?.aed);
    }
    if (fToken?.symbol === 'jpy') {
      exchangeRate = Number(toPriceData?.jpy);
    }
    if (fToken?.symbol === 'ngn') {
      exchangeRate = Number(toPriceData?.ngn);
    }
    if (fToken?.symbol === 'php') {
      exchangeRate = Number(toPriceData?.php);
    }
    if (fToken?.symbol === 'chf') {
      exchangeRate = Number(toPriceData?.chf);
    }
    if (fToken?.symbol === 'aud') {
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

  if (service === 'defi' && subService === 'defi') {
    let tValue = Number(fValue) * exchangeRate;

    const serviceFee = (0.25 / 100) * Number(fValue); // 0.25%

    // const networkFees = await getTxFees(txData) // from the blockchain
    const networkFee = (0.25 / 100) * Number(fValue); // should be from the blockchain

    const youSend = Number(fValue);

    const youGet = Number(fValue) - (serviceFee + networkFee);
    const { amount, estimatedGas } = await getTokenAmount(fToken, fValue);

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
  if (service === 'buy' && subService === 'buyCash') {
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
  if (service === 'buy' && subService === 'buyCard') {
    let tValue = Number(fValue) / exchangeRate;

    // const networkFees = await getTxFees(txData) // from the blockchain
    const processingFee = (1 / 100) * Number(fValue); // (1%) should be from the blockchain

    const youSend = Number(fValue);

    const youGet = Number(fValue) - processingFee;
    //============================={TODO}=====================================
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
      processingFeeRaw: processingFee,
      processingFee: processingFee.toFixed(3),
      tValue,
      tValueFormatted,
      amount,
      estimatedGas,
    };
    console.log({ response: response });
    res.status(200).json(response);
  }
  if (service === 'sell' && subService === 'sellCash') {
    let tValue = Number(fValue) * exchangeRate;

    const serviceFee = (0.25 / 100) * Number(fValue); // 0.25%

    // const networkFees = await getTxFees(txData) // from the blockchain
    const networkFee = (0.25 / 100) * Number(fValue); // should be from the blockchain

    const youSend = Number(fValue);

    const youGet = Number(fValue) - (serviceFee + networkFee);
    const { amount, estimatedGas } = await getTokenAmount(fToken, fValue);

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
  if (service === 'sell' && subService === 'sellCard') {
    let tValue = Number(fValue) * exchangeRate;

    const serviceFee = (0.25 / 100) * Number(fValue); // 0.25%

    // const networkFees = await getTxFees(txData) // from the blockchain
    const networkFee = (0.25 / 100) * Number(fValue); // should be from the blockchain
    const processingFee = (1 / 100) * Number(fValue); // (1%) should be from the blockchain

    const youSend = Number(fValue);

    const youGet = Number(fValue) - (serviceFee + networkFee);
    const { amount, estimatedGas } = await getTokenAmount(fToken, fValue);

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
      processingFeeRaw: processingFee,
      processingFee: processingFee.toFixed(3),
      tValue,
      tValueFormatted,
      amount,
      estimatedGas,
    };

    res.status(200).json(response);
  }
  if (service === 'exchange' && subService === 'exchange') {
    let tValue = Number(fValue) * exchangeRate;

    const serviceFee = (0.25 / 100) * Number(fValue); // 0.25%

    // const networkFees = await getTxFees(txData) // from the blockchain
    const networkFee = (0.25 / 100) * Number(fValue); // should be from the blockchain

    const youSend = Number(fValue);

    const youGet = Number(fValue) - (serviceFee + networkFee);
    const { amount, estimatedGas } = await getTokenAmount(fToken, fValue);

    let tValueFormatted = Number(tValue).toFixed(3);
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
  if (service === 'store' && subService === 'store') {
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

async function statusUpdateOneBooking(booking) {
  let timeLeft = new Date(booking?.timeLeft).getTime();
  let currentTime = new Date(Date.now()).getTime();

  console.log({
    checkIn: checkIn,
    currentTime: currentTime,
  });

  let newStatusx;
  //==={Is Active}==================
  if (timeLeft > currentTime) {
    newStatusx = 'Active';
  }
  //==={Is Expired}==================
  if (timeLeft < currentTime) {
    newStatusx = 'Expired';
  }

  const userData = {
    id: booking._id, // new
    place: booking?.room?.placeId,
    room: booking?.room?._id,
    checkIn: booking.checkIn,
    checkOut: booking.checkOut,
    numberOfGuests: booking.numberOfGuests,
    name: booking.name,
    phone: booking.phone,
    price: booking.price,
    paymentMethod: booking.paymentMethod,
    owner: booking.owner,
    status: booking, // new update
    timeStatus: newStatusx,
  };
  console.log('userData:', userData);
  updateBookingsAutomaticallyInternal(userData);
}
// Pool data at intervals of 30 mins
async function statusUpdate() {
  const bookings = await Booking.find().populate('room');
  bookings?.map(async (booking) => {
    let checkIn = new Date(booking?.checkIn).getTime();
    let checkOut = new Date(booking?.checkOut).getTime();
    let currentTime = new Date(Date.now()).getTime();

    console.log({
      checkIn: checkIn,
      checkOut: checkOut,
      currentTime: currentTime,
    });

    let newStatusx;

    if (
      checkIn <= currentTime && // checkIn date is today or behind and checkout date has not reached yet
      checkOut >= currentTime
    ) {
      newStatusx = 'Active';
    }

    if (
      checkIn > currentTime && // checkIn date is ahead of now
      checkOut > currentTime
    ) {
      newStatusx = 'Inactive';
    }

    //==={Is Completed}==================

    if (checkOut < currentTime) {
      newStatusx = 'Completed';
    }

    const userData = {
      id: booking._id, // new
      place: booking?.room?.placeId,
      room: booking?.room?._id,
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      numberOfGuests: booking.numberOfGuests,
      name: booking.name,
      phone: booking.phone,
      price: booking.price,
      paymentMethod: booking.paymentMethod,
      owner: booking.owner,
      status: newStatusx, // new update
    };
    console.log('userData:', userData);
    updateBookingsAutomaticallyInternal(userData);
  });
}
//==========================={STORE}=================================================================================================
const createStore = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); // get userId from "protect middleware"
  const { currency, cryptoCurrency, bitcoinAddress, tronAddress } = req.body;
  console.log({ store: 'active' });
  if (!user) {
    res.status(400);
    throw new Error('User not found, please login');
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
    throw new Error('Store not found, please try again');
  }
  const newOrderId = await generateOrderId();

  console.log({ userData: req.body });
  if (service === 'store' && subService === 'store') {
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
      chainId: tToken?.chainId ? tToken?.chainId : '',
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
    updatedTimeStatus = 'Active';
  }
  //==={Is Expired}==================
  if (timeLeft < currentTime) {
    updatedTimeStatus = 'Expired';
  }

  const blockchainUrlBitcoinMainnet = 'https://blockstream.info/tx';
  const blockchainUrlBitcoinTest = 'https://blockstream.info/testnet/tx';
  const blockchainUrlBitcoinEndpoint = blockchainUrlBitcoinTest;
  const blockchainUrlBitcoin = `${blockchainUrlBitcoinEndpoint}/${hashOut}`;

  const tronblockchainUrlMainnet = 'https://tronscan.org/#/transaction'; // goerli test net
  const tronblockchainUrlNile = 'https://nile.tronscan.org/#/transaction'; // goerli test net
  const tronblockchainUrlEndpoint = tronblockchainUrlNile;
  const blockchainUrlTron = `${tronblockchainUrlEndpoint}/${hashOut}`;

  const blockchainUrlEthereumMainnet = 'https://etherscan.io/tx'; // goerli test net
  const blockchainUrlEthereumGoerli = 'https://goerli.etherscan.io/tx'; // goerli test net
  const blockchainUrlEthereumEndpoint = blockchainUrlEthereumGoerli;
  const blockchainUrlEthereum = `${blockchainUrlEthereumEndpoint}/${hashOut}`;
  let blockchainUrl = '';
  let chain;

  if (hashOut) {
    if (service === 'store' && subService === 'store') {
      chain = transaction?.tToken?.chain ? transaction?.tToken?.chain : '';
      if (chain === 'Bitcoin') {
        blockchainUrl = blockchainUrlBitcoin;
      }
      if (chain === 'Tron') {
        blockchainUrl = blockchainUrlTron;
      }
      if (chain === 'Ethereum') {
        blockchainUrl = blockchainUrlEthereum;
      }
      //
    }
  }

  const blockchainUrlOut = blockchainUrl;
  // const percentageProgress = 5;
  // const status = 'Completed';

  let percentageProgress;
  if (status === 'Completed') {
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
  }).populate('user');

  if (response) {
    res.status(200).json(response);
  }
  // res.json(response);
});

const getAllUserTransactionsByStore = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const { storeId } = req.params;

  const response = await Store.find({ user: req.user.id }).populate('user');

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
  }).populate('user');
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

  res.json(await Store.findById(txId).populate('user'));
});

// not required
const getAllTransactionsByUserStore = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); // get managers userId from "protect middleware"
  const { userId } = req.params;
  if (user.role === 'User') {
    res.json(await Store.find({ user: userId }).populate('user'));
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
    updatedTimeStatus = 'Active';
  }
  //==={Is Expired}==================
  if (timeLeft < currentTime) {
    updatedTimeStatus = 'Expired';
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
    updatedTimeStatus = 'Active';
  }
  //==={Is Expired}==================
  if (timeLeft < currentTime) {
    updatedTimeStatus = 'Expired';
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
};
