const Arbitrum = require('./tokens/Arbitrum.js');
const Aurora = require('./tokens/Aurora.js');
const Avalanche = require('./tokens/Avalanche.js');
const Binance = require('./tokens/Binance.js');
const Ethereum = require('./tokens/Ethereum.js');
const Optimism = require('./tokens/Optimism.js');
const Polygon = require('./tokens/Polygon.js');

const { ethers } = require('ethers');
const { utils } = ethers;
const asyncHandler = require('express-async-handler');
const { parseUnits, parseEther, formatUnits } = require('@ethersproject/units');
const axios = require('axios');
let fee = process.env.Fee;

//============================{UserTokens Favorite List}=====================================================



const getTokensList = (chainId) => {
  let allTokens;

  switch (chainId) {
    //MAINNETS
    //Arbitrum
    case 42161:
      allTokens = Arbitrum;

      break;

    //Aurora
    case 1313161554:
      allTokens = Aurora;
      break;

    //Avalanche
    case 43114:
      allTokens = Avalanche;

      break;

    //Binance
    case 56:
      allTokens = Binance;

      break;

    //ETH
    case 1:
      allTokens = Ethereum;
      break;

    //Optimism
    case 10:
      allTokens = Optimism;

      break;

    //Polygon
    case 137:
      allTokens = Polygon;

      break;

    default:
      console.warn('Please choose a token!');
      break;
  }

  // let allTokenKeys = Object.keys(allTokens?.tokens);

  // let allTokenFormatted = allTokenKeys.map((key) => allTokens?.tokens[key]);

  let allTokenKeys = Object.keys(allTokens?.tokens);
  let allTokenFormatted = allTokenKeys.map((key) => allTokens?.tokens[key]);

  // return allTokenFormatted;

  // return allTokens;
  // return allTokenKeys;
  return allTokenFormatted;
};

// Arbitrum

const tokenList = asyncHandler(async (req, res) => {
  const { chainId } = req.params;

  let binanceTokens;
  let tokenPrices = [];
  let oneInchByChain = getTokensList(Number(chainId));
  // let rateUSDTUSD;
  let rateUSDTUSD = '1';
  let usdtToken;

  // let rateUSDTUSD = converterUSDTUSD()
  // const { symbol, price } = converterUSDTUSD();

  // let rateUSDTUSD = price;

  // let url = 'https://www.binance.com/api/v3/ticker/price?symbol=ETHUSDT';
  let url = 'https://www.binance.com/api/v3/ticker/price';
  let response = await axios.get(url);

  // console.log({ response });
  if (response.data) {
    binanceTokens = response.data;
  }

  for (let i = 0; i < binanceTokens.length; i++) {
    oneInchByChain.map((b) => {
      let tokenPair = b?.symbol + 'USDT';
      if (binanceTokens[i]?.symbol === tokenPair) {
        tokenPrices.push({ ...b, price: binanceTokens[i]?.price });
      }
    });
  }
  //====={Update USDT Rate}===============================
  oneInchByChain.map((b) => {
    if (b.symbol === 'USDT') {
      usdtToken = b;
      tokenPrices.push({ ...b, price: rateUSDTUSD });
    }
  });

  let result = {
    allTokensCount: tokenPrices.length,

    allTokens: tokenPrices,
    fToken: tokenPrices[0],
    tToken: tokenPrices[1],
    usdtToken: usdtToken,
    fromPrice: tokenPrices[0]?.price,
    toPrice: tokenPrices[1]?.price,
  };

  res.status(200).json(result);
});

const tokenPrice = asyncHandler(async (req, res) => {
  const { fToken, tToken, rateUSDTUSD } = req.body;

  let fSymbol = fToken?.symbol;

  let tSymbol = tToken?.symbol;

  let rateUSDTUSDFormatted = Number(rateUSDTUSD).toFixed(8);
  let rateUSDTUSDString = rateUSDTUSDFormatted.toString();

  console.log({ fSymbol: fSymbol, tSymbol: tSymbol, rateUSDTUSD: rateUSDTUSD });

  let fromPrice;
  let toPrice;

  //======={rateUSDTUSD from FrontEnd}=============
  if (fSymbol === 'USDT') {
    fromPrice = rateUSDTUSDString;
  } else {
    let response = await axios.get(
      `https://www.binance.com/api/v3/ticker/price?symbol=${fSymbol}USDT`
    );
    if (response?.data) {
      fromPrice = response.data?.price;
    }
  }
  if (tSymbol === 'USDT') {
    toPrice = rateUSDTUSDString;
  } else {
    let response = await axios.get(
      `https://www.binance.com/api/v3/ticker/price?symbol=${tSymbol}USDT`
    );
    if (response?.data) {
      toPrice = response?.data?.price;
    }
  }

  console.log({ fromPrice: fromPrice, toPrice: toPrice });

  let result = {
    fromPrice: fromPrice,
    toPrice: toPrice,
  };

  res.status(200).json(result);
});

const chainPrice = asyncHandler(async (req, res) => {
  const { chainId } = req.params;
  let price;
  let chainIdFormmated = Number(chainId);

  let symbol;
  let response;

  // switch (chainIdFormmated) {
  switch (Number(chainId)) {
    //MAINNETS
    //Arbitrum
    case 42161:
      symbol = 'ETH';
      response = await axios.get(
        `https://www.binance.com/api/v3/ticker/price?symbol=${symbol}USDT`
      );
      if (response?.data) {
        price = response.data?.price;
      }

      break;

    //Aurora
    case 1313161554:
      symbol = 'ETH';
      response = await axios.get(
        `https://www.binance.com/api/v3/ticker/price?symbol=${symbol}USDT`
      );
      if (response?.data) {
        price = response.data?.price;
      }
      break;

    //Avalanche
    case 43114:
      symbol = 'AVAX';
      response = await axios.get(
        `https://www.binance.com/api/v3/ticker/price?symbol=${symbol}USDT`
      );
      if (response?.data) {
        price = response.data?.price;
      }

      break;

    //Binance
    case 56:
      symbol = 'BNB';
      response = await axios.get(
        `https://www.binance.com/api/v3/ticker/price?symbol=${symbol}USDT`
      );
      if (response?.data) {
        price = response.data?.price;
      }

      break;

    //ETH
    case 1:
      symbol = 'ETH';
      response = await axios.get(
        `https://www.binance.com/api/v3/ticker/price?symbol=${symbol}USDT`
      );
      if (response?.data) {
        price = response.data?.price;
      }
      break;

    //Optimism
    case 10:
      symbol = 'ETH';
      response = await axios.get(
        `https://www.binance.com/api/v3/ticker/price?symbol=${symbol}USDT`
      );
      if (response?.data) {
        price = response.data?.price;
      }
      break;
      //gorliEth
    case 5:
      symbol = 'ETH';
      response = await axios.get(
        `https://www.binance.com/api/v3/ticker/price?symbol=${symbol}USDT`
      );
      if (response?.data) {
        price = response.data?.price;
      }

      break;

    //Polygon
    case 137:
      symbol = 'MATIC';
      response = await axios.get(
        `https://www.binance.com/api/v3/ticker/price?symbol=${symbol}USDT`
      );
      if (response?.data) {
        price = response.data?.price;
      }

      break;

    default:
      console.warn('Please choose a token!');
      break;
  }

  console.log({ chainSymbol: symbol, chainPrice: price });

  let result = {
    chainPrice: price,
    chainSymbol: symbol,
  };

  res.status(200).json(result);
});

module.exports = {
  //====={New}==============
  tokenList,
  tokenPrice,
  chainPrice,
};
