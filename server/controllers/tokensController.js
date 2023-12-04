const Global = require('../models/Global.js');
const Rates = require('../models/Rates.js');
const Trending = require('../models/Trending.js');
const Token = require('../models/Token.js');
const TokenPairs = require('../models/TokenPairs.js');
const TokenList = require('../models/TokenList.js');
const TokenListDefi = require('../models/TokenListDefi.js');
const TokenListFiat = require('../models/TokenListFiat.js');
const TokenListBuy = require('../models/TokenListBuy.js');
const TokenListSell = require('../models/TokenListSell.js');
const TokenListExchange = require('../models/TokenListExchange.js');
const TokenListPrice = require('../models/TokenListPrice.js');
const TokenListStore = require('../models/TokenListStore.js');

const Charts = require('../models/Charts.js');
const axios = require('axios');
//=================={ethers library}===============================================
const asyncHandler = require('express-async-handler');
const fs = require('fs');
//==================FS SYNC}===============================================

const writeNewFile = async (filePath, data) => {
  return fs.promises.writeFile(filePath, JSON.stringify(data));
};

async function readDataWithFS(filePath) {
  try {
    const jsonData = await fs.promises.readFile(filePath);
    const jsonObj = JSON.parse(jsonData);
    console.log({ newData: jsonObj });
    return jsonObj;
  } catch (error) {
    console.log(`[error] : ${error.message}`);
  }
}
// const newFile = readDataWithFS('./data.json');
// console.log({newFile: newFile})

//=====================================================================================
//======================================{FETCH TOKENS API}===============================================
//=====================================================================================

const getTokenList = asyncHandler(async (req, res) => {
  const tokenList = await TokenList.find();
  res.status(200).json(tokenList);
});

// const getTokenList = asyncHandler(async (req, res) => {
//   // const tokenList = await TokenList.find();
//   // ==={Read file from fs storage}======================
//   const tokenList = await fs.promises.readFile('./data.json');
//   const jsonObj = JSON.parse(tokenList);

//   res.status(200).json(jsonObj);
// });

const getTokenListDefi = asyncHandler(async (req, res) => {
  const tokenList = await TokenListDefi.find();
  res.status(200).json(tokenList);
});

const getTokenListFiat = asyncHandler(async (req, res) => {
  const tokenList = await TokenListFiat.find();
  res.status(200).json(tokenList);
});

const getTokenListBuy = asyncHandler(async (req, res) => {
  const tokenList = await TokenListBuy.find();
  res.status(200).json(tokenList);
});

const getTokenListSell = asyncHandler(async (req, res) => {
  const tokenList = await TokenListSell.find();
  res.status(200).json(tokenList);
});

const getTokenListExchange = asyncHandler(async (req, res) => {
  const tokenList = await TokenListExchange.find();
  res.status(200).json(tokenList);
});

const getTokenListPrice = asyncHandler(async (req, res) => {
  const tokenList = await TokenListPrice.find();
  res.status(200).json(tokenList);
});

const getTokenListStore = asyncHandler(async (req, res) => {
  const tokenList = await TokenListStore.find();
  res.status(200).json(tokenList);
});
const updatePricesDefi = async (token) => {
  let tokenExist = await TokenListDefi.findOne({
    symbol: token?.symbol,
  }).exec();

  let address;
  let decimals;

  if (tokenExist) {
    let chain;

    if (tokenExist?.symbol === 'btc') {
      chain = 'Bitcoin';
    }
    if (tokenExist?.symbol === 'trx') {
      chain = 'Tron';
    }

    if (tokenExist?.symbol === 'usdt' && tokenExist?.type === 'TRC20') {
      chain = 'Tron';
      // address = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t' // mainnet usdt address (USDT)
      // decimals = '6'// mainnet usdt address
      // address = 'TXYZopYRdj2D9XRtbG411XZZ3kM5VkAeBf' // test tron on Nile (USDT)
      address = 'TLBaRhANQoJFTqre9Nf1mjuwNWjCJeYqUL'; //USDJ
      decimals = '18';
    }

    if (tokenExist?.chainId === '56') {
      chain = 'Binance';
    }

    if (tokenExist?.chainId === '42161') {
      chain = 'Arbitrum';
    }

    if (tokenExist?.chainId === '1') {
      chain = 'Ethereum';
    }

    if (tokenExist?.chainId === '10') {
      chain === 'Optimism';
    }

    if (tokenExist?.chainId === '137') {
      chain = 'Polygon';
    }
    const {
      current_price,
      market_cap,
      market_cap_rank,
      fully_diluted_valuation,
      total_volume,
      high_24h,
      low_24h,
      price_change_24h,
      price_change_percentage_24h,
      market_cap_change_24h,
      market_cap_change_percentage_24h,
      circulating_supply,
      total_supply,
      max_supply,
      ath,
      ath_change_percentage,
      ath_date,
      atl,
      atl_change_percentage,
      atl_date,
      roi,
      last_updated,
    } = tokenExist;
    tokenExist.current_price = token?.current_price || current_price;
    tokenExist.market_cap = token?.market_cap || market_cap;
    tokenExist.market_cap_rank = token?.market_cap_rank || market_cap_rank;
    tokenExist.fully_diluted_valuation =
      token?.fully_diluted_valuation || fully_diluted_valuation;
    tokenExist.total_volume = token?.total_volume || total_volume;
    tokenExist.high_24h = token?.high_24h || high_24h;
    tokenExist.low_24h = token?.low_24h || low_24h;
    tokenExist.price_change_24h = token?.price_change_24h || price_change_24h;
    tokenExist.price_change_percentage_24h =
      token?.price_change_percentage_24h || price_change_percentage_24h;
    tokenExist.market_cap_change_24h =
      token?.market_cap_change_24h || market_cap_change_24h;
    tokenExist.market_cap_change_percentage_24h =
      token?.market_cap_change_percentage_24h ||
      market_cap_change_percentage_24h;
    tokenExist.circulating_supply =
      token?.circulating_supply || circulating_supply;
    tokenExist.total_supply = token?.total_supply || total_supply;
    tokenExist.max_supply = token?.max_supply || max_supply;
    tokenExist.ath = token?.ath || ath;
    tokenExist.ath_change_percentage =
      token?.ath_change_percentage || ath_change_percentage;
    tokenExist.ath_date = token?.ath_date || ath_date;
    tokenExist.atl = token?.atl || atl;
    tokenExist.atl_change_percentage =
      token?.atl_change_percentage || atl_change_percentage;
    tokenExist.atl_date = token?.atl_date || atl_date;
    tokenExist.roi = token?.roi || roi;
    tokenExist.last_updated = token?.last_updated || last_updated;
    tokenExist.chain = token?.chain || chain;
    tokenExist.address = token?.address || address;
    tokenExist.decimals = token?.decimals || decimals;

    const result = await tokenExist.save();

    if (result) {
      // res.status(200).json(result);
      console.log({ updatedResult: result });
      return result;
    }
  }
};
const updatePricesFiat = async (token) => {
  let tokenExist = await TokenListFiat.findOne({
    symbol: token?.symbol,
  }).exec();

  if (tokenExist) {
    const { value } = tokenExist;
    tokenExist.value = token?.value || value;
    const result = await tokenExist.save();
    if (result) {
      // res.status(200).json(result);
      console.log('ok');
      return result;
    } else {
      console.log('update fiat prices error');
    }
  }
};

const updatePricesBuy = async (token) => {
  let tokenExist = await TokenListBuy.findOne({
    symbol: token?.symbol,
  }).exec();

  let address;
  let decimals;

  if (tokenExist) {
    let chain;

    if (tokenExist?.symbol === 'btc') {
      chain = 'Bitcoin';
    }
    if (tokenExist?.symbol === 'trx') {
      chain = 'Tron';
    }

    if (tokenExist?.symbol === 'usdt' && tokenExist?.type === 'TRC20') {
      chain = 'Tron';
      // address = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t' // mainnet usdt address (USDT)
      // decimals = '6'// mainnet usdt address
      // address = 'TXYZopYRdj2D9XRtbG411XZZ3kM5VkAeBf' // test tron on Nile (USDT)
      address = 'TLBaRhANQoJFTqre9Nf1mjuwNWjCJeYqUL'; //USDJ
      decimals = '18';
    }

    if (tokenExist?.chainId === '56') {
      chain = 'Binance';
    }

    if (tokenExist?.chainId === '42161') {
      chain = 'Arbitrum';
    }

    if (tokenExist?.chainId === '1') {
      chain = 'Ethereum';
    }

    if (tokenExist?.chainId === '10') {
      chain === 'Optimism';
    }

    if (tokenExist?.chainId === '137') {
      chain = 'Polygon';
    }
    const {
      current_price,
      market_cap,
      market_cap_rank,
      fully_diluted_valuation,
      total_volume,
      high_24h,
      low_24h,
      price_change_24h,
      price_change_percentage_24h,
      market_cap_change_24h,
      market_cap_change_percentage_24h,
      circulating_supply,
      total_supply,
      max_supply,
      ath,
      ath_change_percentage,
      ath_date,
      atl,
      atl_change_percentage,
      atl_date,
      roi,
      last_updated,
    } = tokenExist;
    tokenExist.current_price = token?.current_price || current_price;
    tokenExist.market_cap = token?.market_cap || market_cap;
    tokenExist.market_cap_rank = token?.market_cap_rank || market_cap_rank;
    tokenExist.fully_diluted_valuation =
      token?.fully_diluted_valuation || fully_diluted_valuation;
    tokenExist.total_volume = token?.total_volume || total_volume;
    tokenExist.high_24h = token?.high_24h || high_24h;
    tokenExist.low_24h = token?.low_24h || low_24h;
    tokenExist.price_change_24h = token?.price_change_24h || price_change_24h;
    tokenExist.price_change_percentage_24h =
      token?.price_change_percentage_24h || price_change_percentage_24h;
    tokenExist.market_cap_change_24h =
      token?.market_cap_change_24h || market_cap_change_24h;
    tokenExist.market_cap_change_percentage_24h =
      token?.market_cap_change_percentage_24h ||
      market_cap_change_percentage_24h;
    tokenExist.circulating_supply =
      token?.circulating_supply || circulating_supply;
    tokenExist.total_supply = token?.total_supply || total_supply;
    tokenExist.max_supply = token?.max_supply || max_supply;
    tokenExist.ath = token?.ath || ath;
    tokenExist.ath_change_percentage =
      token?.ath_change_percentage || ath_change_percentage;
    tokenExist.ath_date = token?.ath_date || ath_date;
    tokenExist.atl = token?.atl || atl;
    tokenExist.atl_change_percentage =
      token?.atl_change_percentage || atl_change_percentage;
    tokenExist.atl_date = token?.atl_date || atl_date;
    tokenExist.roi = token?.roi || roi;
    tokenExist.last_updated = token?.last_updated || last_updated;
    tokenExist.chain = token?.chain || chain;
    tokenExist.address = token?.address || address;
    tokenExist.decimals = token?.decimals || decimals;

    const result = await tokenExist.save();

    if (result) {
      // res.status(200).json(result);
      console.log({ updatedResult: result });
      return result;
    }
  }
};
const updatePricesSell = async (token) => {
  let tokenExist = await TokenListSell.findOne({
    symbol: token?.symbol,
  }).exec();
  let address;
  let decimals;

  if (tokenExist) {
    let chain;

    if (tokenExist?.symbol === 'btc') {
      chain = 'Bitcoin';
    }
    if (tokenExist?.symbol === 'trx') {
      chain = 'Tron';
    }

    if (tokenExist?.symbol === 'usdt' && tokenExist?.type === 'TRC20') {
      chain = 'Tron';
      // address = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t' // mainnet usdt address (USDT)
      // decimals = '6'// mainnet usdt address
      // address = 'TXYZopYRdj2D9XRtbG411XZZ3kM5VkAeBf' // test tron on Nile (USDT)
      address = 'TLBaRhANQoJFTqre9Nf1mjuwNWjCJeYqUL'; //USDJ
      decimals = '18';
    }

    if (tokenExist?.chainId === '56') {
      chain = 'Binance';
    }

    if (tokenExist?.chainId === '42161') {
      chain = 'Arbitrum';
    }

    if (tokenExist?.chainId === '1') {
      chain = 'Ethereum';
    }

    if (tokenExist?.chainId === '10') {
      chain === 'Optimism';
    }

    if (tokenExist?.chainId === '137') {
      chain = 'Polygon';
    }
    const {
      current_price,
      market_cap,
      market_cap_rank,
      fully_diluted_valuation,
      total_volume,
      high_24h,
      low_24h,
      price_change_24h,
      price_change_percentage_24h,
      market_cap_change_24h,
      market_cap_change_percentage_24h,
      circulating_supply,
      total_supply,
      max_supply,
      ath,
      ath_change_percentage,
      ath_date,
      atl,
      atl_change_percentage,
      atl_date,
      roi,
      last_updated,
    } = tokenExist;
    tokenExist.current_price = token?.current_price || current_price;
    tokenExist.market_cap = token?.market_cap || market_cap;
    tokenExist.market_cap_rank = token?.market_cap_rank || market_cap_rank;
    tokenExist.fully_diluted_valuation =
      token?.fully_diluted_valuation || fully_diluted_valuation;
    tokenExist.total_volume = token?.total_volume || total_volume;
    tokenExist.high_24h = token?.high_24h || high_24h;
    tokenExist.low_24h = token?.low_24h || low_24h;
    tokenExist.price_change_24h = token?.price_change_24h || price_change_24h;
    tokenExist.price_change_percentage_24h =
      token?.price_change_percentage_24h || price_change_percentage_24h;
    tokenExist.market_cap_change_24h =
      token?.market_cap_change_24h || market_cap_change_24h;
    tokenExist.market_cap_change_percentage_24h =
      token?.market_cap_change_percentage_24h ||
      market_cap_change_percentage_24h;
    tokenExist.circulating_supply =
      token?.circulating_supply || circulating_supply;
    tokenExist.total_supply = token?.total_supply || total_supply;
    tokenExist.max_supply = token?.max_supply || max_supply;
    tokenExist.ath = token?.ath || ath;
    tokenExist.ath_change_percentage =
      token?.ath_change_percentage || ath_change_percentage;
    tokenExist.ath_date = token?.ath_date || ath_date;
    tokenExist.atl = token?.atl || atl;
    tokenExist.atl_change_percentage =
      token?.atl_change_percentage || atl_change_percentage;
    tokenExist.atl_date = token?.atl_date || atl_date;
    tokenExist.roi = token?.roi || roi;
    tokenExist.last_updated = token?.last_updated || last_updated;
    tokenExist.chain = token?.chain || chain;
    tokenExist.address = token?.address || address;
    tokenExist.decimals = token?.decimals || decimals;

    const result = await tokenExist.save();

    if (result) {
      // res.status(200).json(result);
      console.log({ updatedResult: result });
      return result;
    }
  }
};
const updatePricesExchange1 = async (token) => {
  let tokenExist = await TokenListExchange.findOne({
    symbol: token?.symbol,
  }).exec();

  let address;
  let decimals;

  if (tokenExist) {
    let chain;

    // if (tokenExist?.symbol === 'btc') {
    //   chain = 'Bitcoin';
    // }
    // if (tokenExist?.symbol === 'trx') {
    //   chain = 'Tron';
    // }

    if (tokenExist?.symbol === 'usdt' && tokenExist?.type === 'TRC20') {
      chain = 'Tron';
      // address = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t' // mainnet usdt address (USDT)
      // decimals = '6'// mainnet usdt address
      // address = 'TXYZopYRdj2D9XRtbG411XZZ3kM5VkAeBf' // test tron on Nile (USDT)
      address = 'TLBaRhANQoJFTqre9Nf1mjuwNWjCJeYqUL'; //USDJ
      decimals = '18';
    }

    // if (tokenExist?.chainId === '56') {
    //   chain = 'Binance';
    // }

    // if (tokenExist?.chainId === '42161') {
    //   chain = 'Arbitrum';
    // }

    // if (tokenExist?.chainId === '1') {
    //   chain = 'Ethereum';
    // }

    // if (tokenExist?.chainId === '10') {
    //   chain === 'Optimism';
    // }

    // if (tokenExist?.chainId === '137') {
    //   chain = 'Polygon';
    // }
    const {
      current_price,
      market_cap,
      market_cap_rank,
      fully_diluted_valuation,
      total_volume,
      high_24h,
      low_24h,
      price_change_24h,
      price_change_percentage_24h,
      market_cap_change_24h,
      market_cap_change_percentage_24h,
      circulating_supply,
      total_supply,
      max_supply,
      ath,
      ath_change_percentage,
      ath_date,
      atl,
      atl_change_percentage,
      atl_date,
      roi,
      last_updated,
    } = tokenExist;
    tokenExist.current_price = token?.current_price || current_price;
    tokenExist.market_cap = token?.market_cap || market_cap;
    tokenExist.market_cap_rank = token?.market_cap_rank || market_cap_rank;
    tokenExist.fully_diluted_valuation =
      token?.fully_diluted_valuation || fully_diluted_valuation;
    tokenExist.total_volume = token?.total_volume || total_volume;
    tokenExist.high_24h = token?.high_24h || high_24h;
    tokenExist.low_24h = token?.low_24h || low_24h;
    tokenExist.price_change_24h = token?.price_change_24h || price_change_24h;
    tokenExist.price_change_percentage_24h =
      token?.price_change_percentage_24h || price_change_percentage_24h;
    tokenExist.market_cap_change_24h =
      token?.market_cap_change_24h || market_cap_change_24h;
    tokenExist.market_cap_change_percentage_24h =
      token?.market_cap_change_percentage_24h ||
      market_cap_change_percentage_24h;
    tokenExist.circulating_supply =
      token?.circulating_supply || circulating_supply;
    tokenExist.total_supply = token?.total_supply || total_supply;
    tokenExist.max_supply = token?.max_supply || max_supply;
    tokenExist.ath = token?.ath || ath;
    tokenExist.ath_change_percentage =
      token?.ath_change_percentage || ath_change_percentage;
    tokenExist.ath_date = token?.ath_date || ath_date;
    tokenExist.atl = token?.atl || atl;
    tokenExist.atl_change_percentage =
      token?.atl_change_percentage || atl_change_percentage;
    tokenExist.atl_date = token?.atl_date || atl_date;
    tokenExist.roi = token?.roi || roi;
    tokenExist.last_updated = token?.last_updated || last_updated;
    tokenExist.chain = token?.chain || chain;
    tokenExist.address = address;
    tokenExist.decimals = decimals;

    const result = await tokenExist.save();

    if (result) {
      // res.status(200).json(result);
      console.log({ updatedResult: result });
      return result;
    }
  }
};

const updatePricesExchange = async (token) => {
  // let tokenExist = await TokenListExchange.findOne({
  //   symbol: token?.symbol,
  // }).exec();

  let tokenExist;
  let address;
  let decimals;
  let chain;

  if (token?.symbol === 'btc') {
    tokenExist = await TokenListExchange.findOne({
      id: token?.id,
    }).exec();
    if (tokenExist) {
      chain = 'Bitcoin';
    }
  }

  if (token?.symbol === 'trx') {
    tokenExist = await TokenListExchange.findOne({
      id: token?.id,
    }).exec();
    if (tokenExist) {
      chain = 'Tron';
    }
  }

  if (token?.symbol === 'usdt' && token?.type === 'TRC20') {
    tokenExist = await TokenListExchange.findOne({
      symbol: 'usdt',
      type: 'TRC20',
    }).exec();
    if (tokenExist) {
      chain = 'Tron';
      // address = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t' // mainnet usdt address (USDT)
      // decimals = '6'// mainnet usdt address
      // address = 'TXYZopYRdj2D9XRtbG411XZZ3kM5VkAeBf' // test tron on Nile (USDT)
      address = 'TLBaRhANQoJFTqre9Nf1mjuwNWjCJeYqUL'; //USDJ
      decimals = '18';
    }
  }

  if (token?.chainId === '1') {
    tokenExist = await TokenListExchange.findOne({
      id: token?.id,
    }).exec();
    if (tokenExist) {
      chain = 'Ethereum';
    }
  }

  if (token?.chainId === '56') {
    tokenExist = await TokenListExchange.findOne({
      id: token?.id,
    }).exec();
    if (tokenExist) {
      chain = 'Binance';
    }
  }

  if (token?.chainId === '42161') {
    tokenExist = await TokenListExchange.findOne({
      id: token?.id,
    }).exec();
    if (tokenExist) {
      chain = 'Arbitrum';
    }
  }

  if (token?.chainId === '10') {
    tokenExist = await TokenListExchange.findOne({
      id: token?.id,
    }).exec();
    if (tokenExist) {
      chain === 'Optimism';
    }
  }

  if (token?.chainId === '137') {
    tokenExist = await TokenListExchange.findOne({
      id: token?.id,
    }).exec();
    if (tokenExist) {
      chain = 'Polygon';
    }
  }

  if (tokenExist) {
    const {
      current_price,
      market_cap,
      market_cap_rank,
      fully_diluted_valuation,
      total_volume,
      high_24h,
      low_24h,
      price_change_24h,
      price_change_percentage_24h,
      market_cap_change_24h,
      market_cap_change_percentage_24h,
      circulating_supply,
      total_supply,
      max_supply,
      ath,
      ath_change_percentage,
      ath_date,
      atl,
      atl_change_percentage,
      atl_date,
      roi,
      last_updated,
    } = tokenExist;
    tokenExist.current_price = token?.current_price || current_price;
    tokenExist.market_cap = token?.market_cap || market_cap;
    tokenExist.market_cap_rank = token?.market_cap_rank || market_cap_rank;
    tokenExist.fully_diluted_valuation =
      token?.fully_diluted_valuation || fully_diluted_valuation;
    tokenExist.total_volume = token?.total_volume || total_volume;
    tokenExist.high_24h = token?.high_24h || high_24h;
    tokenExist.low_24h = token?.low_24h || low_24h;
    tokenExist.price_change_24h = token?.price_change_24h || price_change_24h;
    tokenExist.price_change_percentage_24h =
      token?.price_change_percentage_24h || price_change_percentage_24h;
    tokenExist.market_cap_change_24h =
      token?.market_cap_change_24h || market_cap_change_24h;
    tokenExist.market_cap_change_percentage_24h =
      token?.market_cap_change_percentage_24h ||
      market_cap_change_percentage_24h;
    tokenExist.circulating_supply =
      token?.circulating_supply || circulating_supply;
    tokenExist.total_supply = token?.total_supply || total_supply;
    tokenExist.max_supply = token?.max_supply || max_supply;
    tokenExist.ath = token?.ath || ath;
    tokenExist.ath_change_percentage =
      token?.ath_change_percentage || ath_change_percentage;
    tokenExist.ath_date = token?.ath_date || ath_date;
    tokenExist.atl = token?.atl || atl;
    tokenExist.atl_change_percentage =
      token?.atl_change_percentage || atl_change_percentage;
    tokenExist.atl_date = token?.atl_date || atl_date;
    tokenExist.roi = token?.roi || roi;
    tokenExist.last_updated = token?.last_updated || last_updated;
    tokenExist.chain = token?.chain || chain;
    tokenExist.address = address;
    tokenExist.decimals = decimals;

    const result = await tokenExist.save();

    if (result) {
      // res.status(200).json(result);
      console.log({ updatedResult: result });
      return result;
    }
  }
};

const updatePricesStore = async (token) => {
  let tokenExist = await TokenListStore.findOne({
    symbol: token?.symbol,
  }).exec();

  let address;
  let decimals;

  if (tokenExist) {
    let chain;

    if (tokenExist?.symbol === 'btc') {
      chain = 'Bitcoin';
    }
    if (tokenExist?.symbol === 'trx') {
      chain = 'Tron';
    }

    if (tokenExist?.symbol === 'usdt' && tokenExist?.type === 'TRC20') {
      chain = 'Tron';
      // address = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t' // mainnet usdt address (USDT)
      // decimals = '6'// mainnet usdt address
      // address = 'TXYZopYRdj2D9XRtbG411XZZ3kM5VkAeBf' // test tron on Nile (USDT)
      address = 'TLBaRhANQoJFTqre9Nf1mjuwNWjCJeYqUL'; //USDJ
      decimals = '18';
    }

    if (tokenExist?.chainId === '56') {
      chain = 'Binance';
    }

    if (tokenExist?.chainId === '42161') {
      chain = 'Arbitrum';
    }

    if (tokenExist?.chainId === '1') {
      chain = 'Ethereum';
    }

    if (tokenExist?.chainId === '10') {
      chain === 'Optimism';
    }

    if (tokenExist?.chainId === '137') {
      chain = 'Polygon';
    }
    const {
      current_price,
      market_cap,
      market_cap_rank,
      fully_diluted_valuation,
      total_volume,
      high_24h,
      low_24h,
      price_change_24h,
      price_change_percentage_24h,
      market_cap_change_24h,
      market_cap_change_percentage_24h,
      circulating_supply,
      total_supply,
      max_supply,
      ath,
      ath_change_percentage,
      ath_date,
      atl,
      atl_change_percentage,
      atl_date,
      roi,
      last_updated,
    } = tokenExist;
    tokenExist.current_price = token?.current_price || current_price;
    tokenExist.market_cap = token?.market_cap || market_cap;
    tokenExist.market_cap_rank = token?.market_cap_rank || market_cap_rank;
    tokenExist.fully_diluted_valuation =
      token?.fully_diluted_valuation || fully_diluted_valuation;
    tokenExist.total_volume = token?.total_volume || total_volume;
    tokenExist.high_24h = token?.high_24h || high_24h;
    tokenExist.low_24h = token?.low_24h || low_24h;
    tokenExist.price_change_24h = token?.price_change_24h || price_change_24h;
    tokenExist.price_change_percentage_24h =
      token?.price_change_percentage_24h || price_change_percentage_24h;
    tokenExist.market_cap_change_24h =
      token?.market_cap_change_24h || market_cap_change_24h;
    tokenExist.market_cap_change_percentage_24h =
      token?.market_cap_change_percentage_24h ||
      market_cap_change_percentage_24h;
    tokenExist.circulating_supply =
      token?.circulating_supply || circulating_supply;
    tokenExist.total_supply = token?.total_supply || total_supply;
    tokenExist.max_supply = token?.max_supply || max_supply;
    tokenExist.ath = token?.ath || ath;
    tokenExist.ath_change_percentage =
      token?.ath_change_percentage || ath_change_percentage;
    tokenExist.ath_date = token?.ath_date || ath_date;
    tokenExist.atl = token?.atl || atl;
    tokenExist.atl_change_percentage =
      token?.atl_change_percentage || atl_change_percentage;
    tokenExist.atl_date = token?.atl_date || atl_date;
    tokenExist.roi = token?.roi || roi;
    tokenExist.last_updated = token?.last_updated || last_updated;
    tokenExist.chain = token?.chain || chain;
    tokenExist.address = token?.address || address;
    tokenExist.decimals = token?.decimals || decimals;

    const result = await tokenExist.save();

    if (result) {
      // res.status(200).json(result);
      console.log({ updatedResult: result });
      return result;
    }
  }
};

const updatePricesCheckTron = async () => {
  let address;
  let decimals;
  let chain;

  let tokenExist;

  // const tokenExist1 = await TokenListExchange.findOne({
  //   symbol: 'usdt',
  //   type: 'TRC20',
  // }).exec();
  const tokenExist2 = await TokenListBuy.findOne({
    symbol: 'usdt',
    type: 'TRC20',
  }).exec();
  const tokenExist3 = await TokenListSell.findOne({
    symbol: 'usdt',
    type: 'TRC20',
  }).exec();

  const tokenExist4 = await TokenListPrice.findOne({
    symbol: 'usdt',
    type: 'TRC20',
  }).exec();
  tokenExist = tokenExist4;
  if (tokenExist) {
    console.log({ tokenExist: tokenExist });
    chain = 'Tron';
    // address = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t' // mainnet usdt address (USDT)
    // decimals = '6'// mainnet usdt address
    // address = 'TXYZopYRdj2D9XRtbG411XZZ3kM5VkAeBf' // test tron on Nile (USDT)
    address = 'TLBaRhANQoJFTqre9Nf1mjuwNWjCJeYqUL'; //USDJ
    decimals = '18';
  }

  tokenExist.chain = chain || tokenExist?.chain;
  tokenExist.address = address || tokenExist?.address;
  tokenExist.decimals = decimals || tokenExist?.decimals;

  const result = await tokenExist.save();

  if (result) {
    // res.status(200).json(result);
    console.log({ updatedResult: result });
    return result;
  }
};

// updatePricesCheckTron()

const updatePricesCheckEthereum = async () => {
  // let address;
  // let decimals;
  let chain;

  let tokenExist;

  const tokenExist1 = await TokenListExchange.findOne({
    symbol: 'usdt',
    type: 'ERC20',
  }).exec();
  const tokenExist2 = await TokenListBuy.findOne({
    symbol: 'usdt',
    type: 'ERC20',
  }).exec();
  const tokenExist3 = await TokenListSell.findOne({
    symbol: 'usdt',
    type: 'ERC20',
  }).exec();

  tokenExist = tokenExist3;
  if (tokenExist) {
    console.log({ tokenExist: tokenExist });
    chain = 'Ethereum';
  }

  tokenExist.chain = chain || tokenExist?.chain;

  const result = await tokenExist.save();

  if (result) {
    // res.status(200).json(result);
    console.log({ updatedResult: result });
    return result;
  }
};

// updatePricesCheckEthereum()

const updatePricesCheckEthereumExchangeOnly = async () => {
  let address;
  let decimals;
  let chain;

  let tokenExist;

  const tokenExist1 = await TokenListExchange.findOne({
    symbol: 'eth',
  }).exec();

  tokenExist = tokenExist1;
  if (tokenExist) {
    console.log({ tokenExist: tokenExist });
    // chain = 'Ethereum';
    address = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
    decimals = 18;
  }

  tokenExist.address = address || tokenExist?.address;
  tokenExist.decimals = decimals || tokenExist?.decimals;

  const result = await tokenExist.save();

  if (result) {
    // res.status(200).json(result);
    console.log({ updatedResult: result });
    return result;
  }
};

// updatePricesCheckEthereumExchangeOnly()

const updateAllTokenListPrice = asyncHandler(async (req, res) => {
  const tokenListPrice = await TokenListPrice.find();
  tokenListPrice?.map(async (token) => {
    await updatePricesDefi(token);
    await updatePricesBuy(token);
    await updatePricesSell(token);
    await updatePricesExchange(token);
  });

  res.status(200).json('ok');
});

const updateAllTokenListPriceLocal = async () => {
  // const tokenListPrice = await readDataWithFS('./data.json');
  const tokenListPrice = await TokenListPrice.find();
  tokenListPrice?.map(async (token) => {
    // await updatePricesDefi(token);
    // await updatePricesBuy(token);
    // await updatePricesSell(token);
    await updatePricesExchange(token);
  });
};

// updateAllTokenListPriceLocal();

const allTokenListPoolRequest = async () => {
  const intervalId = setInterval(() => {
    updateAllTokenListPriceLocal();
  }, 360000); // 6min
  return () => {
    clearInterval(intervalId);
  };
};
//=================={on system boot/ startup} ====================================
// updateAllTokenListPriceLocal();
//=================={Resume later: at intervals} ====================================
// allTokenListPoolRequest();

//=====================================================================================
//======================================{GET TOKENS DEFI BY CHAIN ID}===============================================
//=====================================================================================

//Arbitrum: '42161'
//Binance: '56'
//ETH: '1'
//Optimism: '10'
//Polygon: '137'

// http://127.0.0.1:4000/token/getTokensDefiById/56

const getTokensDefiById = asyncHandler(async (req, res) => {
  const { chainId } = req.params;
  const tokenList = await TokenListDefi.find({ chainId: chainId });
  console.log({ defiList: tokenList });
  res.status(200).json(tokenList);
});

const getTokensDefiEthereum = asyncHandler(async (req, res) => {
  const chainId = '1';
  const tokenList = await TokenListDefi.find({ chainId: chainId });
  res.status(200).json(tokenList);
});

const getTokensDefiBinance = asyncHandler(async (req, res) => {
  const chainId = '56';
  const tokenList = await TokenListDefi.find({ chainId: chainId });
  res.status(200).json(tokenList);
});

const getTokensDefiPolygon = asyncHandler(async (req, res) => {
  const chainId = '137';
  const tokenList = await TokenListDefi.find({ chainId: chainId });
  res.status(200).json(tokenList);
});

const getTokensDefiArbitrum = asyncHandler(async (req, res) => {
  const chainId = '42161';
  const tokenList = await TokenListDefi.find({ chainId: chainId });
  res.status(200).json(tokenList);
});

const getTokensDefiOptimism = asyncHandler(async (req, res) => {
  const chainId = '10';
  const tokenList = await TokenListDefi.find({ chainId: chainId });
  res.status(200).json(tokenList);
});

//==================================={TokenListPrice}============================
// create schedulled updates

const updatePrices = async (token) => {
  let tokenExist = await TokenListPrice.findOne({
    symbol: token?.symbol,
  }).exec();

  if (tokenExist) {
    const {
      current_price,
      market_cap,
      market_cap_rank,
      fully_diluted_valuation,
      total_volume,
      high_24h,
      low_24h,
      price_change_24h,
      price_change_percentage_24h,
      market_cap_change_24h,
      market_cap_change_percentage_24h,
      circulating_supply,
      total_supply,
      max_supply,
      ath,
      ath_change_percentage,
      ath_date,
      atl,
      atl_change_percentage,
      atl_date,
      roi,
      last_updated,
    } = tokenExist;
    tokenExist.current_price = token?.current_price || current_price;
    tokenExist.market_cap = token?.market_cap || market_cap;
    tokenExist.market_cap_rank = token?.market_cap_rank || market_cap_rank;
    tokenExist.fully_diluted_valuation =
      token?.fully_diluted_valuation || fully_diluted_valuation;
    tokenExist.total_volume = token?.total_volume || total_volume;
    tokenExist.high_24h = token?.high_24h || high_24h;
    tokenExist.low_24h = token?.low_24h || low_24h;
    tokenExist.price_change_24h = token?.price_change_24h || price_change_24h;
    tokenExist.price_change_percentage_24h =
      token?.price_change_percentage_24h || price_change_percentage_24h;
    tokenExist.market_cap_change_24h =
      token?.market_cap_change_24h || market_cap_change_24h;
    tokenExist.market_cap_change_percentage_24h =
      token?.market_cap_change_percentage_24h ||
      market_cap_change_percentage_24h;
    tokenExist.circulating_supply =
      token?.circulating_supply || circulating_supply;
    tokenExist.total_supply = token?.total_supply || total_supply;
    tokenExist.max_supply = token?.max_supply || max_supply;
    tokenExist.ath = token?.ath || ath;
    tokenExist.ath_change_percentage =
      token?.ath_change_percentage || ath_change_percentage;
    tokenExist.ath_date = token?.ath_date || ath_date;
    tokenExist.atl = token?.atl || atl;
    tokenExist.atl_change_percentage =
      token?.atl_change_percentage || atl_change_percentage;
    tokenExist.atl_date = token?.atl_date || atl_date;
    tokenExist.roi = token?.roi || roi;
    tokenExist.last_updated = token?.last_updated || last_updated;
    const result = await tokenExist.save();

    if (result) {
      console.log('success: tokens update');
    } else {
      console.log('error: tokens update');
    }
  }
};
const updatedTokenPrices = asyncHandler(async (req, res) => {
  const tokenList = await TokenList.find();
  tokenList?.map(async (token) => {
    const result = await updatePrices(token);
    if (result) {
      // console.log({ result: result });
      console.log('ok');
    }
  });
  res.status(200).json('ok');
});

//=================={AllTokenList}============================

const updateTokenData = async (token) => {
  let tokenExist = await TokenList.findOne({ id: token?.id }).exec();
  console.log({ status: 'update' });
  if (tokenExist) {
    const {
      current_price,
      market_cap,
      market_cap_rank,
      fully_diluted_valuation,
      total_volume,
      high_24h,
      low_24h,
      price_change_24h,
      price_change_percentage_24h,
      market_cap_change_24h,
      market_cap_change_percentage_24h,
      circulating_supply,
      total_supply,
      max_supply,
      ath,
      ath_change_percentage,
      ath_date,
      atl,
      atl_change_percentage,
      atl_date,
      roi,
      last_updated,
    } = tokenExist;
    tokenExist.current_price = token?.current_price || current_price;
    tokenExist.market_cap = token?.market_cap || market_cap;
    tokenExist.market_cap_rank = token?.market_cap_rank || market_cap_rank;
    tokenExist.fully_diluted_valuation =
      token?.fully_diluted_valuation || fully_diluted_valuation;
    tokenExist.total_volume = token?.total_volume || total_volume;
    tokenExist.high_24h = token?.high_24h || high_24h;
    tokenExist.low_24h = token?.low_24h || low_24h;
    tokenExist.price_change_24h = token?.price_change_24h || price_change_24h;
    tokenExist.price_change_percentage_24h =
      token?.price_change_percentage_24h || price_change_percentage_24h;
    tokenExist.market_cap_change_24h =
      token?.market_cap_change_24h || market_cap_change_24h;
    tokenExist.market_cap_change_percentage_24h =
      token?.market_cap_change_percentage_24h ||
      market_cap_change_percentage_24h;
    tokenExist.circulating_supply =
      token?.circulating_supply || circulating_supply;
    tokenExist.total_supply = token?.total_supply || total_supply;
    tokenExist.max_supply = token?.max_supply || max_supply;
    tokenExist.ath = token?.ath || ath;
    tokenExist.ath_change_percentage =
      token?.ath_change_percentage || ath_change_percentage;
    tokenExist.ath_date = token?.ath_date || ath_date;
    tokenExist.atl = token?.atl || atl;
    tokenExist.atl_change_percentage =
      token?.atl_change_percentage || atl_change_percentage;
    tokenExist.atl_date = token?.atl_date || atl_date;
    tokenExist.roi = token?.roi || roi;
    tokenExist.last_updated = token?.last_updated || last_updated;
    const result = await tokenExist.save();

    if (result) {
      console.log('ok');
    } else {
      console.log('error');
    }
  }
};

const addTokenData = async (token) => {
  console.log({ status: 'new' });
  const result = await TokenList.create({
    id: token?.id,
    symbol: token?.symbol,
    name: token?.name,
    image: token?.image, // update with cloudinary image before sending to backend
    current_price: token?.current_price,
    market_cap: token?.market_cap,
    market_cap_rank: token?.market_cap_rank,
    fully_diluted_valuation: token?.fully_diluted_valuation,
    total_volume: token?.total_volume,
    high_24h: token?.high_24h,
    low_24h: token?.low_24h,
    price_change_24h: token?.price_change_24h,
    price_change_percentage_24h: token?.price_change_percentage_24h,
    market_cap_change_24h: token?.market_cap_change_24h,
    market_cap_change_percentage_24h: token?.market_cap_change_percentage_24h,
    circulating_supply: token?.circulating_supply,
    total_supply: token?.total_supply,
    max_supply: token?.max_supply,
    ath: token?.ath,
    ath_change_percentage: token?.ath_change_percentage,
    ath_date: token?.ath_date,
    atl: token?.atl,
    atl_change_percentage: token?.atl_change_percentage,
    atl_date: token?.atl_date,
    roi: token?.roi,
    last_updated: token?.last_updated,
  });

  if (result) {
    console.log('ok');
  } else {
    console.log('error');
  }
};

const addAllTokens = async (page) => {
  page?.map(async (tokenObj) => {
    let tokenExist = await TokenList.findOne({ id: tokenObj?.id }).exec();

    if (tokenExist) {
      await updateTokenData(tokenObj);
      return;
    } else {
      await addTokenData(tokenObj);
    }
  });
};

//=====================================================================================
//======================================{API}===============================================
//=====================================================================================

const addTokenByPage = asyncHandler(async (req, res) => {
  //pageLimit, pageNumber
  // const page = await fetchTokenFromCoinGeko(100, 1);// 25 times more
  const page = await fetchTokenFromCoinGeko(20, 2); // 25 times more
  page?.map(async (tokenObj) => {
    let tokenExist = await Token.findOne({ id: tokenObj?.id }).exec();

    if (tokenExist) {
      const result = await updateTokenData(tokenObj);
      if (result) {
        console.log({ result: result });
      }
    } else {
      const result = await addTokenData(tokenObj);
      if (result) {
        console.log({ result: result });
      }
    }
  });
  res.status(200).json('ok');
});

const addToken = async (page) => {
  page?.map(async (tokenObj) => {
    let tokenExist = await TokenList.findOne({ id: tokenObj?.id }).exec();

    if (tokenExist) {
      const result = await updateTokenData(tokenObj);
      if (result) {
        console.log({ resultUpdate: result });
      }
    } else {
      const result = await addTokenData(tokenObj);
      if (result) {
        console.log({ resultNew: result });
      }
    }
  });
};

const fetchTokenFromCoinGeko = async (pageLimit, pageNumber) => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${pageLimit.toString()}&page=${pageNumber.toString()}&sparkline=false&locale=en`
    );
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

const getTokensController = asyncHandler(async (req, res) => {
  let page1;
  let page2;
  let page3;
  let page4;
  let page5;
  let page6;
  let page7;
  let page8;
  let page9;
  let page10;
  let verify = false;

  let allPages = [];

  setTimeout(async () => {
    // page1 = await fetchTokenFromCoinGeko(250, 1);
    page1 = await fetchTokenFromCoinGeko(250, 1);
    if (page1) {
      page1.map(async (tokens) => {
        allPages.push(tokens);
      });
    }
    setTimeout(async () => {
      page2 = await fetchTokenFromCoinGeko(250, 2);
      if (page2) {
        page2.map(async (tokens) => {
          allPages.push(tokens);
        });
      }
    }, 30000); // 30 sec

    setTimeout(async () => {
      page3 = await fetchTokenFromCoinGeko(250, 3);
      if (page3) {
        page3.map(async (tokens) => {
          allPages.push(tokens);
        });
      }
    }, 60000); // 1 min

    setTimeout(async () => {
      page4 = await fetchTokenFromCoinGeko(250, 4);
      if (page4) {
        page4.map(async (tokens) => {
          allPages.push(tokens);
        });
      }
    }, 90000); // 1.5min

    setTimeout(async () => {
      page5 = await fetchTokenFromCoinGeko(250, 5);
      if (page5) {
        page5.map(async (tokens) => {
          allPages.push(tokens);
        });
      }
    }, 120000); // 2min

    setTimeout(async () => {
      page6 = await fetchTokenFromCoinGeko(250, 6);
      if (page6) {
        page6.map(async (tokens) => {
          allPages.push(tokens);
        });
      }
    }, 150000); // 2.5min

    setTimeout(async () => {
      page7 = await fetchTokenFromCoinGeko(250, 7);
      if (page7) {
        page7.map(async (tokens) => {
          allPages.push(tokens);
        });
      }
    }, 180000); // 3min

    setTimeout(async () => {
      page8 = await fetchTokenFromCoinGeko(250, 8);
      if (page8) {
        page8.map(async (tokens) => {
          allPages.push(tokens);
        });
      }
    }, 210000); // 3.5min

    setTimeout(async () => {
      page9 = await fetchTokenFromCoinGeko(250, 9);
      if (page9) {
        page8.map(async (tokens) => {
          allPages.push(tokens);
        });
      }
    }, 240000); // 4min

    setTimeout(async () => {
      page10 = await fetchTokenFromCoinGeko(250, 10);
      if (page10) {
        page10.map(async (tokens) => {
          allPages.push(tokens);
        });
      }
    }, 300000); // 4min 30sec

    setTimeout(async () => {
      await addAllTokens(allPages);
      res.status(200).json({
        message: 'ok',
        allPages: allPages,
      });
    }, 360000); // 5min
  }, 100);
});

const getTokensControllerLocal = async () => {
  let page1;
  let page2;
  let page3;
  let page4;
  let page5;
  let page6;
  let page7;
  let page8;
  let page9;
  let page10;
  let verify = false;

  let allPages = [];

  setTimeout(async () => {
    console.log({ page1: 'fetching' });
    // page1 = await fetchTokenFromCoinGeko(250, 1);
    page1 = await fetchTokenFromCoinGeko(250, 1);
    if (page1) {
      page1.map(async (tokens) => {
        allPages.push(tokens);
        // console.log({ page1: page1 });
      });
    }

    setTimeout(async () => {
      console.log({ page2: 'fetching' });
      page2 = await fetchTokenFromCoinGeko(250, 2);
      if (page2) {
        page2.map(async (tokens) => {
          allPages.push(tokens);
        });
      }
    }, 30000); // 30 sec

    setTimeout(async () => {
      console.log({ page3: 'fetching' });
      page3 = await fetchTokenFromCoinGeko(250, 3);
      if (page3) {
        page3.map(async (tokens) => {
          allPages.push(tokens);
        });
      }
    }, 60000); // 1 min

    setTimeout(async () => {
      console.log({ page4: 'fetching' });
      page4 = await fetchTokenFromCoinGeko(250, 4);
      if (page4) {
        page4.map(async (tokens) => {
          allPages.push(tokens);
        });
      }
    }, 90000); // 1.5min

    setTimeout(async () => {
      console.log({ page5: 'fetching' });
      page5 = await fetchTokenFromCoinGeko(250, 5);
      if (page5) {
        page5.map(async (tokens) => {
          allPages.push(tokens);
        });
      }
    }, 120000); // 2min

    setTimeout(async () => {
      console.log({ page6: 'fetching' });
      page6 = await fetchTokenFromCoinGeko(250, 6);
      if (page6) {
        page6.map(async (tokens) => {
          allPages.push(tokens);
        });
      }
    }, 150000); // 2.5min

    setTimeout(async () => {
      console.log({ page7: 'fetching' });
      page7 = await fetchTokenFromCoinGeko(250, 7);
      if (page7) {
        page7.map(async (tokens) => {
          allPages.push(tokens);
        });
      }
    }, 180000); // 3min

    setTimeout(async () => {
      console.log({ page8: 'fetching' });
      page8 = await fetchTokenFromCoinGeko(250, 8);
      if (page8) {
        page8.map(async (tokens) => {
          allPages.push(tokens);
        });
      }
    }, 210000); // 3.5min

    setTimeout(async () => {
      console.log({ page9: 'fetching' });
      page9 = await fetchTokenFromCoinGeko(250, 9);
      if (page9) {
        page8.map(async (tokens) => {
          allPages.push(tokens);
        });
      }
    }, 240000); // 4min

    setTimeout(async () => {
      console.log({ page10: 'fetching' });
      page10 = await fetchTokenFromCoinGeko(250, 10);
      if (page10) {
        page10.map(async (tokens) => {
          allPages.push(tokens);
        });
        allPages?.map(async (token) => {
          if (token?.symbol === 'btc') {
            console.log({ btcToke: token });
          }
          await updatePrices(token); // update tokens prices
          // await updatePricesDefi(token);
        });
        await addAllTokens(allPages);
      }
      console.log('all Pages fetched');
      console.log('all updates completed');
    }, 300000); // 4min 30sec
  }, 100);
};

const tokensControllerPoolRequest = async () => {
  const intervalId = setInterval(() => {
    getTokensControllerLocal();
    // }, 370000);  //too many request
  }, 1800000); // 30min // too many request 60000 * 30
  return () => {
    clearInterval(intervalId);
  };
};
//=================={on system boot/ startup} ====================================
// getTokensControllerLocal();
//=================={at intervals} ===============================================
// tokensControllerPoolRequest();
//=====================================================================================

const test1 = async () => {
  let p = 1;
  let verify = false;

  if (p) {
    console.log('P1');
    verify = true;
  }

  if (verify === true) {
    return verify;
  }
};
const test2 = async () => {
  let p = 1;
  let verify = false;

  if (p) {
    setTimeout(() => {
      console.log('P2');
      verify = true;
      return true;
    }, 5000);
  }

  // if (verify === true) {
  //   return verify;
  // }

  const response = {
    verify,
  };

  return response;
};

// const test2 = async () => {
//   let p = 1;
//   let verify = false;
//   if (p) {
//     console.log('P2');
//     verify = true;
//   }

//   if (verify === true) {
//     return verify;
//   }
// };

const test3 = async () => {
  let p = 1;
  let verify = false;
  if (p) {
    console.log('P3');
    verify = true;

    if (verify === true) {
      return verify;
    }
  }
};
const TOF1 = async () => {
  let p1;
  let p2;
  let p3;

  const intervalId = setInterval(async () => {
    p1 = await test1();
    console.log({ p1: p1 });
    if (p1) {
      p2 = await test2();
      console.log({ p2: p2 });
    }
    // if (p2) {
    //   p3 = await test3();
    //   console.log({ p3: p3 });
    // }

    if (p2?.verify === true) {
      p3 = await test3();
      console.log({ p3: p3 });
    }
  }, 10000);
  return () => {
    clearInterval(intervalId);
  };
};

// TOF1();

//====={Call this function every 2 minutes} to maintain market price updates
//without exceeding the api limits of 30 calls /minute set by coinGeko
// here we're fetching the data across 10 pages of 250 data rows per page
// In total, we'll generate 250*10 = 2500 tokens market data and save in our db
// new tokens will be saved with additional image saved to cloudinary

// const rates ={
//   "rates": {
//     "btc": {
//       "name": "Bitcoin",
//       "unit": "BTC",
//       "value": 1,
//       "type": "crypto"
//     },
//     "eth": {
//       "name": "Ether",
//       "unit": "ETH",
//       "value": 16.359,
//       "type": "crypto"
//     },
//     "ltc": {
//       "name": "Litecoin",
//       "unit": "LTC",
//       "value": 409.047,
//       "type": "crypto"
//     },
//     "bch": {
//       "name": "Bitcoin Cash",
//       "unit": "BCH",
//       "value": 114.956,
//       "type": "crypto"
//     },
//     "bnb": {
//       "name": "Binance Coin",
//       "unit": "BNB",
//       "value": 123.784,
//       "type": "crypto"
//     },
//     "eos": {
//       "name": "EOS",
//       "unit": "EOS",
//       "value": 46545.271,
//       "type": "crypto"
//     },
//     "xrp": {
//       "name": "XRP",
//       "unit": "XRP",
//       "value": 52583.443,
//       "type": "crypto"
//     },
//     "xlm": {
//       "name": "Lumens",
//       "unit": "XLM",
//       "value": 232595.862,
//       "type": "crypto"
//     },
//     "link": {
//       "name": "Chainlink",
//       "unit": "LINK",
//       "value": 3497.194,
//       "type": "crypto"
//     },
//     "dot": {
//       "name": "Polkadot",
//       "unit": "DOT",
//       "value": 6553.425,
//       "type": "crypto"
//     },
//     "yfi": {
//       "name": "Yearn.finance",
//       "unit": "YFI",
//       "value": 5.034,
//       "type": "crypto"
//     },
//     "usd": {
//       "name": "US Dollar",
//       "unit": "$",
//       "value": 26537.264,
//       "type": "fiat"
//     },
//     "aed": {
//       "name": "United Arab Emirates Dirham",
//       "unit": "DH",
//       "value": 97471.904,
//       "type": "fiat"
//     },
//     "ars": {
//       "name": "Argentine Peso",
//       "unit": "$",
//       "value": 9288788.338,
//       "type": "fiat"
//     },
//     "aud": {
//       "name": "Australian Dollar",
//       "unit": "A$",
//       "value": 41675.288,
//       "type": "fiat"
//     },
//     "bdt": {
//       "name": "Bangladeshi Taka",
//       "unit": "৳",
//       "value": 2929385.276,
//       "type": "fiat"
//     },
//     "bhd": {
//       "name": "Bahraini Dinar",
//       "unit": "BD",
//       "value": 10003.142,
//       "type": "fiat"
//     },
//     "bmd": {
//       "name": "Bermudian Dollar",
//       "unit": "$",
//       "value": 26537.264,
//       "type": "fiat"
//     },
//     "brl": {
//       "name": "Brazil Real",
//       "unit": "R$",
//       "value": 132375.838,
//       "type": "fiat"
//     },
//     "cad": {
//       "name": "Canadian Dollar",
//       "unit": "CA$",
//       "value": 35919.833,
//       "type": "fiat"
//     },
//     "chf": {
//       "name": "Swiss Franc",
//       "unit": "Fr.",
//       "value": 24389.046,
//       "type": "fiat"
//     },
//     "clp": {
//       "name": "Chilean Peso",
//       "unit": "CLP$",
//       "value": 23969784.536,
//       "type": "fiat"
//     },
//     "cny": {
//       "name": "Chinese Yuan",
//       "unit": "¥",
//       "value": 194021.904,
//       "type": "fiat"
//     },
//     "czk": {
//       "name": "Czech Koruna",
//       "unit": "Kč",
//       "value": 616357.593,
//       "type": "fiat"
//     },
//     "dkk": {
//       "name": "Danish Krone",
//       "unit": "kr.",
//       "value": 187795.944,
//       "type": "fiat"
//     },
//     "eur": {
//       "name": "Euro",
//       "unit": "€",
//       "value": 25184.368,
//       "type": "fiat"
//     },
//     "gbp": {
//       "name": "British Pound Sterling",
//       "unit": "£",
//       "value": 21868.351,
//       "type": "fiat"
//     },
//     "hkd": {
//       "name": "Hong Kong Dollar",
//       "unit": "HK$",
//       "value": 207536.007,
//       "type": "fiat"
//     },
//     "huf": {
//       "name": "Hungarian Forint",
//       "unit": "Ft",
//       "value": 9841785.452,
//       "type": "fiat"
//     },
//     "idr": {
//       "name": "Indonesian Rupiah",
//       "unit": "Rp",
//       "value": 412613733.998,
//       "type": "fiat"
//     },
//     "ils": {
//       "name": "Israeli New Shekel",
//       "unit": "₪",
//       "value": 102100.454,
//       "type": "fiat"
//     },
//     "inr": {
//       "name": "Indian Rupee",
//       "unit": "₹",
//       "value": 2208910.369,
//       "type": "fiat"
//     },
//     "jpy": {
//       "name": "Japanese Yen",
//       "unit": "¥",
//       "value": 3960187.888,
//       "type": "fiat"
//     },
//     "krw": {
//       "name": "South Korean Won",
//       "unit": "₩",
//       "value": 35909734.991,
//       "type": "fiat"
//     },
//     "kwd": {
//       "name": "Kuwaiti Dinar",
//       "unit": "KD",
//       "value": 8207.79,
//       "type": "fiat"
//     },
//     "lkr": {
//       "name": "Sri Lankan Rupee",
//       "unit": "Rs",
//       "value": 8603404.294,
//       "type": "fiat"
//     },
//     "mmk": {
//       "name": "Burmese Kyat",
//       "unit": "K",
//       "value": 55787535.349,
//       "type": "fiat"
//     },
//     "mxn": {
//       "name": "Mexican Peso",
//       "unit": "MX$",
//       "value": 465848.098,
//       "type": "fiat"
//     },
//     "myr": {
//       "name": "Malaysian Ringgit",
//       "unit": "RM",
//       "value": 124937.443,
//       "type": "fiat"
//     },
//     "ngn": {
//       "name": "Nigerian Naira",
//       "unit": "₦",
//       "value": 20712069.895,
//       "type": "fiat"
//     },
//     "nok": {
//       "name": "Norwegian Krone",
//       "unit": "kr",
//       "value": 286339.662,
//       "type": "fiat"
//     },
//     "nzd": {
//       "name": "New Zealand Dollar",
//       "unit": "NZ$",
//       "value": 44782.961,
//       "type": "fiat"
//     },
//     "php": {
//       "name": "Philippine Peso",
//       "unit": "₱",
//       "value": 1510341.868,
//       "type": "fiat"
//     },
//     "pkr": {
//       "name": "Pakistani Rupee",
//       "unit": "₨",
//       "value": 7659858.199,
//       "type": "fiat"
//     },
//     "pln": {
//       "name": "Polish Zloty",
//       "unit": "zł",
//       "value": 116428.454,
//       "type": "fiat"
//     },
//     "rub": {
//       "name": "Russian Ruble",
//       "unit": "₽",
//       "value": 2562836.12,
//       "type": "fiat"
//     },
//     "sar": {
//       "name": "Saudi Riyal",
//       "unit": "SR",
//       "value": 99541.652,
//       "type": "fiat"
//     },
//     "sek": {
//       "name": "Swedish Krona",
//       "unit": "kr",
//       "value": 293112.768,
//       "type": "fiat"
//     },
//     "sgd": {
//       "name": "Singapore Dollar",
//       "unit": "S$",
//       "value": 36396.071,
//       "type": "fiat"
//     },
//     "thb": {
//       "name": "Thai Baht",
//       "unit": "฿",
//       "value": 970374.897,
//       "type": "fiat"
//     },
//     "try": {
//       "name": "Turkish Lira",
//       "unit": "₺",
//       "value": 724475.293,
//       "type": "fiat"
//     },
//     "twd": {
//       "name": "New Taiwan Dollar",
//       "unit": "NT$",
//       "value": 855654.354,
//       "type": "fiat"
//     },
//     "uah": {
//       "name": "Ukrainian hryvnia",
//       "unit": "₴",
//       "value": 980860.222,
//       "type": "fiat"
//     },
//     "vef": {
//       "name": "Venezuelan bolívar fuerte",
//       "unit": "Bs.F",
//       "value": 2657.176,
//       "type": "fiat"
//     },
//     "vnd": {
//       "name": "Vietnamese đồng",
//       "unit": "₫",
//       "value": 647487490.351,
//       "type": "fiat"
//     },
//     "zar": {
//       "name": "South African Rand",
//       "unit": "R",
//       "value": 509733.543,
//       "type": "fiat"
//     },
//     "xdr": {
//       "name": "IMF Special Drawing Rights",
//       "unit": "XDR",
//       "value": 20187.136,
//       "type": "fiat"
//     },
//     "xag": {
//       "name": "Silver - Troy Ounce",
//       "unit": "XAG",
//       "value": 1164.975,
//       "type": "commodity"
//     },
//     "xau": {
//       "name": "Gold - Troy Ounce",
//       "unit": "XAU",
//       "value": 14.019,
//       "type": "commodity"
//     },
//     "bits": {
//       "name": "Bits",
//       "unit": "μBTC",
//       "value": 1000000,
//       "type": "crypto"
//     },
//     "sats": {
//       "name": "Satoshi",
//       "unit": "sats",
//       "value": 100000000,
//       "type": "crypto"
//     }
//   }
// }

const btcExchangeRates = asyncHandler(async (req, res) => {
  try {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/exchange_rates'
    );
    if (response.data) {
      let result = await Rates.create({
        rates: response.data,
      });

      if (result) {
        res.status(200).json(result);
      }
    }
  } catch (error) {
    console.log(error);
  }
});

const btcExchangeRatesLocal = async () => {
  try {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/exchange_rates'
    );
    if (response.data) {
      let result = await Rates.create({
        rates: response.data?.rates,
      });

      if (result) {
        return result;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

// const trending = {
//   coins: [
//     {
//       item: {
//         id: 'bella-protocol',
//         coin_id: 12478,
//         name: 'Bella Protocol',
//         symbol: 'BEL',
//         market_cap_rank: 449,
//         thumb:
//           'https://assets.coingecko.com/coins/images/12478/thumb/Bella.png?1602230054',
//         small:
//           'https://assets.coingecko.com/coins/images/12478/small/Bella.png?1602230054',
//         large:
//           'https://assets.coingecko.com/coins/images/12478/large/Bella.png?1602230054',
//         slug: 'bella-protocol',
//         price_btc: 0.000024028003799838947,
//         score: 0,
//       },
//     },
//     {
//       item: {
//         id: 'trust-wallet-token',
//         coin_id: 11085,
//         name: 'Trust Wallet',
//         symbol: 'TWT',
//         market_cap_rank: 102,
//         thumb:
//           'https://assets.coingecko.com/coins/images/11085/thumb/Trust.png?1588062702',
//         small:
//           'https://assets.coingecko.com/coins/images/11085/small/Trust.png?1588062702',
//         large:
//           'https://assets.coingecko.com/coins/images/11085/large/Trust.png?1588062702',
//         slug: 'trust-wallet-token',
//         price_btc: 0.000028720650979000688,
//         score: 1,
//       },
//     },
//     {
//       item: {
//         id: 'matic-network',
//         coin_id: 4713,
//         name: 'Polygon',
//         symbol: 'MATIC',
//         market_cap_rank: 14,
//         thumb:
//           'https://assets.coingecko.com/coins/images/4713/thumb/matic-token-icon.png?1624446912',
//         small:
//           'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png?1624446912',
//         large:
//           'https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png?1624446912',
//         slug: 'polygon',
//         price_btc: 0.00001933072498284376,
//         score: 2,
//       },
//     },
//     {
//       item: {
//         id: 'bitcoin',
//         coin_id: 1,
//         name: 'Bitcoin',
//         symbol: 'BTC',
//         market_cap_rank: 1,
//         thumb:
//           'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579',
//         small:
//           'https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579',
//         large:
//           'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
//         slug: 'bitcoin',
//         price_btc: 1,
//         score: 3,
//       },
//     },
//     {
//       item: {
//         id: 'alpaca-finance',
//         coin_id: 14165,
//         name: 'Alpaca Finance',
//         symbol: 'ALPACA',
//         market_cap_rank: 627,
//         thumb:
//           'https://assets.coingecko.com/coins/images/14165/thumb/Logo200.png?1614748442',
//         small:
//           'https://assets.coingecko.com/coins/images/14165/small/Logo200.png?1614748442',
//         large:
//           'https://assets.coingecko.com/coins/images/14165/large/Logo200.png?1614748442',
//         slug: 'alpaca-finance',
//         price_btc: 0.0000050400277758939676,
//         score: 4,
//       },
//     },
//     {
//       item: {
//         id: 'veloce-vext',
//         coin_id: 31214,
//         name: 'Veloce',
//         symbol: 'VEXT',
//         market_cap_rank: 786,
//         thumb:
//           'https://assets.coingecko.com/coins/images/31214/thumb/VEXT_Logo.jpg?1691461995',
//         small:
//           'https://assets.coingecko.com/coins/images/31214/small/VEXT_Logo.jpg?1691461995',
//         large:
//           'https://assets.coingecko.com/coins/images/31214/large/VEXT_Logo.jpg?1691461995',
//         slug: 'veloce',
//         price_btc: 0.000020245079259032765,
//         score: 5,
//       },
//     },
//     {
//       item: {
//         id: 'metahero',
//         coin_id: 16911,
//         name: 'Metahero',
//         symbol: 'HERO',
//         market_cap_rank: 638,
//         thumb:
//           'https://assets.coingecko.com/coins/images/16911/thumb/AVATAR2.png?1681208843',
//         small:
//           'https://assets.coingecko.com/coins/images/16911/small/AVATAR2.png?1681208843',
//         large:
//           'https://assets.coingecko.com/coins/images/16911/large/AVATAR2.png?1681208843',
//         slug: 'metahero',
//         price_btc: 9.255653183349604e-8,
//         score: 6,
//       },
//     },
//   ],
//   nfts: [
//     {
//       id: 'rektguy',
//       name: 'rektguy',
//       symbol: 'Rektguy',
//       thumb:
//         'https://assets.coingecko.com/nft_contracts/images/396/small/rektguy.gif?1653900224',
//       nft_contract_id: 396,
//       native_currency_symbol: 'eth',
//       floor_price_in_native_currency: 0.4873973964483828,
//       floor_price_24h_percentage_change: 18.978134060222,
//     },
//     {
//       id: 'cryptokhat',
//       name: 'cryptokhat',
//       symbol: 'ck',
//       thumb:
//         'https://assets.coingecko.com/nft_contracts/images/2908/small/cryptokhat.png?1675752516',
//       nft_contract_id: 2908,
//       native_currency_symbol: 'eth',
//       floor_price_in_native_currency: 1.65,
//       floor_price_24h_percentage_change: 16.6730588011394,
//     },
//     {
//       id: 'otherdeed-for-otherside',
//       name: 'Otherdeed for Otherside',
//       symbol: 'OTHR',
//       thumb:
//         'https://assets.coingecko.com/nft_contracts/images/366/small/otherdeed-for-otherside.jpg?1651377116',
//       nft_contract_id: 366,
//       native_currency_symbol: 'eth',
//       floor_price_in_native_currency: 0.5090321514964571,
//       floor_price_24h_percentage_change: 15.2388685007585,
//     },
//     {
//       id: 'pudgy-penguins',
//       name: 'Pudgy Penguins',
//       symbol: 'PPG',
//       thumb:
//         'https://assets.coingecko.com/nft_contracts/images/38/small/pudgy-penguins.png?1687420064',
//       nft_contract_id: 38,
//       native_currency_symbol: 'eth',
//       floor_price_in_native_currency: 5.191302184450465,
//       floor_price_24h_percentage_change: 13.5114296736173,
//     },
//     {
//       id: 'lilpudgys',
//       name: 'Lil Pudgys',
//       symbol: 'LilPudgys',
//       thumb:
//         'https://assets.coingecko.com/nft_contracts/images/229/small/lil-pudgys.png?1661754782',
//       nft_contract_id: 229,
//       native_currency_symbol: 'eth',
//       floor_price_in_native_currency: 0.44680002342111674,
//       floor_price_24h_percentage_change: 13.5022495657358,
//     },
//   ],
//   exchanges: [],
// };
const trending = asyncHandler(async (req, res) => {
  try {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/search/trending'
    );
    if (response.data) {
      let result = await Trending.create({
        trending: response.data,
      });

      if (result) {
        res.status(200).json(result);
      }
    }
  } catch (error) {
    console.log(error);
  }
});

// const global = {
//   data: {
//     active_cryptocurrencies: 10155,
//     upcoming_icos: 0,
//     ongoing_icos: 49,
//     ended_icos: 3376,
//     markets: 870,
//     total_market_cap: {
//       btc: 41281417.34271039,
//       eth: 677272238.4931256,
//       ltc: 16914954127.493298,
//       bch: 4788380853.130506,
//       bnb: 5125980623.556965,
//       eos: 1928917294065.1794,
//       xrp: 2177823866170.832,
//       xlm: 9649304663911.725,
//       link: 144298016554.62192,
//       dot: 271410024558.471,
//       yfi: 208249572.9455287,
//       usd: 1103496155881.0142,
//       aed: 4053163450474.0786,
//       ars: 386242082944157.5,
//       aud: 1733295620423.139,
//       bdt: 121812304395388.67,
//       bhd: 415959565470.881,
//       bmd: 1103496155881.0142,
//       brl: 5504680223996.832,
//       cad: 1493226721222.7559,
//       chf: 1013864680619.5765,
//       clp: 998112272994377.1,
//       cny: 8068212143724.004,
//       czk: 25629801716492.375,
//       dkk: 7807648010420.468,
//       eur: 1047047913523.0747,
//       gbp: 909081099641.7379,
//       hkd: 8629830994778.887,
//       huf: 409913496790854.06,
//       idr: 17149558144633522,
//       ils: 4247143729227.927,
//       inr: 91845648022683.78,
//       jpy: 164563829978457.44,
//       krw: 1493403484754488.5,
//       kwd: 341303636540.9062,
//       lkr: 357754410467791.44,
//       mmk: 2319806920373622.5,
//       mxn: 19420369258557.52,
//       myr: 5195259901887.807,
//       ngn: 861267714703571.2,
//       nok: 11908929410771.713,
//       nzd: 1862815171231.2043,
//       php: 62841897981615.78,
//       pkr: 318519037448417.9,
//       pln: 4841855326501.504,
//       rub: 106523251495553.3,
//       sar: 4139229529655.84,
//       sek: 12184367568760.398,
//       sgd: 1513286074344.3618,
//       thb: 40376924343686.25,
//       try: 30128981760731.24,
//       twd: 35590508664056.2,
//       uah: 40787002274646.27,
//       vef: 110493070088.36569,
//       vnd: 26924400792625292,
//       zar: 21169183345420.836,
//       xdr: 839439457244.0874,
//       xag: 48453203044.30982,
//       xau: 582634935.343616,
//       bits: 41281417342710.39,
//       sats: 4128141734271039,
//     },
//     total_volume: {
//       btc: 1192665.7235504577,
//       eth: 19567142.708719973,
//       ltc: 488691699.604446,
//       bch: 138341609.4322282,
//       bnb: 148095239.52500024,
//       eos: 55728550235.96901,
//       xrp: 62919735908.019905,
//       xlm: 278779065001.635,
//       link: 4168929009.686823,
//       dot: 7841335258.2245245,
//       yfi: 6016560.079180788,
//       usd: 31881222252.204967,
//       aed: 117100366956.79378,
//       ars: 11158960204683.33,
//       aud: 50076824109.42809,
//       bdt: 3519291960180.9434,
//       bhd: 12017531084.301914,
//       bmd: 31881222252.204967,
//       brl: 159036289082.89868,
//       cad: 43140968564.79412,
//       chf: 29291669974.76955,
//       clp: 28836565527119.387,
//       cny: 233099556496.9957,
//       czk: 740473268029.7108,
//       dkk: 225571571011.47226,
//       eur: 30250370209.115612,
//       gbp: 26264356634.589146,
//       hkd: 249325345156.14474,
//       huf: 11842853485007.389,
//       idr: 495469668672889.4,
//       ils: 122704671372.8419,
//       inr: 2653522173052.9546,
//       jpy: 4754430733860.193,
//       krw: 43146075458380.67,
//       kwd: 9860638874.05122,
//       lkr: 10335919895184.53,
//       mmk: 67021783099540.99,
//       mxn: 561075908830.5526,
//       myr: 150096794363.38077,
//       ngn: 24882975155623.41,
//       nok: 344062118664.5727,
//       nzd: 53818786927.61386,
//       php: 1815571812937.3445,
//       pkr: 9202366651059.145,
//       pln: 139886546006.11166,
//       rub: 3077574342110.7554,
//       sar: 119586911005.13159,
//       sek: 352019831144.8345,
//       sgd: 43720505422.89473,
//       thb: 1166533922208.178,
//       try: 870459546802.5126,
//       twd: 1028249088808.017,
//       uah: 1178381526377.8752,
//       vef: 3192266784.1132755,
//       vnd: 777875664634111,
//       zar: 611601078568.5142,
//       xdr: 24252332698.2525,
//       xag: 1399866530.4398396,
//       xau: 16832966.53694168,
//       bits: 1192665723550.4578,
//       sats: 119266572355045.78,
//     },
//     market_cap_percentage: {
//       btc: 47.230209753064344,
//       eth: 17.751231859711535,
//       usdt: 7.546751226898611,
//       bnb: 3.0014989253665214,
//       xrp: 2.4448224087054893,
//       usdc: 2.3237549762534364,
//       steth: 1.2914668057944176,
//       ada: 0.7865742350213626,
//       doge: 0.7848059260907848,
//       sol: 0.7272251200524673,
//     },
//     market_cap_change_percentage_24h_usd: 1.7417671934613816,
//     updated_at: 1695815506,
//   },
// };

const globalData = asyncHandler(async (req, res) => {
  const response = await axios.get('https://api.coingecko.com/api/v3/global');
  if (response.data) {
    let result = await Global.create({
      global: response.data,
    });

    if (result) {
      res.status(200).json(result);
    }
  }
});

// https://api.coingecko.com/api/v3/search?query=btc
const searchTokenMarketInfo = asyncHandler(async (req, res) => {
  const { symbol } = req.params;

  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/search?query=${symbol}`
    );
    if (response.data) {
      let result = await Trending.create({
        trending: response.data,
      });

      if (result) {
        res.status(200).json(result);
      }
    }
  } catch (error) {
    console.log(error);
  }
});

const trending2 = asyncHandler(async (req, res) => {
  try {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/search/trending'
    );
    if (response.data) {
      let result = await Trending.create({
        trending: response.data,
      });

      if (result) {
        res.status(200).json(result);
      }
    }
  } catch (error) {
    console.log(error);
  }
});

const historyChart = asyncHandler(async (req, res) => {
  const { id } = req.body;
  try {
    const response = await axios.get(
      `coins/${id}/market_chart?vs_currency=usd&days=7`
    );
    if (response.data) {
      let result = await Charts.create({
        charts: response.data,
      });

      if (result) {
        res.status(200).json(result);
      }
    }
  } catch (error) {
    console.log(error);
  }
});

// poolRequest();

// chats for
//btc
//eth
//tron
//usdt

//====================================================================================================
//======================================={EXCHANGE PAIRS}=============================================
//====================================================================================================

const addExchangePair = async (token) => {
  console.log({ status: 'new' });
  let result;
  const formData = {
    file: token.image,
    public_id: token.symbol,
    upload_preset: 'kxxtmdn1', //testing
    // upload_preset: 'blendery', // production
  };
  const response = await axios.post(
    'https://api.cloudinary.com/v1_1/datkh2oxv/image/upload/',
    formData
  );
  const url = response.data.secure_url;
  if (url) {
    result = await TokenPairs.create({
      id: token?.id,
      symbol: token?.symbol,
      name: token?.name,
      image: token?.image, // update with cloudinary image before sending to backend
      tokenUrl: url, // update with cloudinary image before sending to backend
      current_price: token?.current_price,
      market_cap: token?.market_cap,
      market_cap_rank: token?.market_cap_rank,
      fully_diluted_valuation: token?.fully_diluted_valuation,
      total_volume: token?.total_volume,
      high_24h: token?.high_24h,
      low_24h: token?.low_24h,
      price_change_24h: token?.price_change_24h,
      price_change_percentage_24h: token?.price_change_percentage_24h,
      market_cap_change_24h: token?.market_cap_change_24h,
      market_cap_change_percentage_24h: token?.market_cap_change_percentage_24h,
      circulating_supply: token?.circulating_supply,
      total_supply: token?.total_supply,
      max_supply: token?.max_supply,
      ath: token?.ath,
      ath_change_percentage: token?.ath_change_percentage,
      ath_date: token?.ath_date,
      atl: token?.atl,
      atl_change_percentage: token?.atl_change_percentage,
      atl_date: token?.atl_date,
      roi: token?.roi,
      last_updated: token?.last_updated,
    });

    if (result) {
      // res.status(200).json(result);
      console.log({ newResult: result });
      return result;
    }
  }
};

const updateExchangePair = async () => {
  let tokensFrom = [
    {
      id: 'bitcoin',
      symbol: 'btc',
      price_symbol: 'btc',
      name: 'Bitcoin',
      token_type: 'native',
      image:
        'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
      current_price: 26615,
      pricUSD: '',
      pricEUR: '',
      pricGBP: '',
      pricRUB: '',
      pricAED: '',
    },
    {
      id: 'ethereum',
      symbol: 'eth',
      price_symbol: 'eth',
      name: 'Ethereum',
      token_type: 'native',
      image:
        'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628',
      current_price: 1553.55,
      pricUSD: '',
      pricEUR: '',
      pricGBP: '',
      pricRUB: '',
      pricAED: '',
    },
    {
      id: 'tether TRC20',
      symbol: 'usdtTRX',
      price_symbol: 'usdt',
      name: 'Tether TRC20',
      token_type: 'TRC20',
      image:
        'https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661',
      current_price: 0.999702,
      pricUSD: '',
      pricEUR: '',
      pricGBP: '',
      pricRUB: '',
      pricAED: '',
    },
    {
      id: 'tether ERC20',
      symbol: 'usdt20',
      price_symbol: 'usdt',
      name: 'Tether ERC20',
      token_type: 'ERC20',
      image:
        'https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661',
      current_price: 0.999702,
      pricUSD: '',
      pricEUR: '',
      pricGBP: '',
      pricRUB: '',
      pricAED: '',
    },
  ];
  let tokensTo = [
    {
      id: 'bitcoin',
      symbol: 'btc',
      price_symbol: 'btc',
      name: 'Bitcoin',
      token_type: 'native',
      image:
        'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
      current_price: 26615,
      pricUSD: '',
      pricEUR: '',
      pricGBP: '',
      pricRUB: '',
      pricAED: '',
    },
    {
      id: 'ethereum',
      symbol: 'eth',
      price_symbol: 'eth',
      name: 'Ethereum',
      token_type: 'native',
      image:
        'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628',
      current_price: 1553.55,
      pricUSD: '',
      pricEUR: '',
      pricGBP: '',
      pricRUB: '',
      pricAED: '',
    },
    {
      id: 'tether TRC20',
      symbol: 'usdtTRX',
      price_symbol: 'usdt',
      name: 'Tether TRC20',
      token_type: 'TRC20',
      image:
        'https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661',
      current_price: 0.999702,
      pricUSD: '',
      pricEUR: '',
      pricGBP: '',
      pricRUB: '',
      pricAED: '',
    },
    {
      id: 'tether ERC20',
      symbol: 'usdt20',
      price_symbol: 'usdt',
      name: 'Tether ERC20',
      token_type: 'ERC20',
      image:
        'https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661',
      current_price: 0.999702,
      pricUSD: '',
      pricEUR: '',
      pricGBP: '',
      pricRUB: '',
      pricAED: '',
    },
  ];

  let fTokens; // from tokens
  let tTokens; // toTokens
  tokensFrom.map(async (token) => {
    fTokens = await addExchangePair(token);
  });

  tokensTo.map(async (token) => {
    tTokens = await addExchangePair(token);
  });

  const response = await TokenPairs.create({
    exchange: {
      fTokens,
      tTokens,
    },
  });

  if (response) {
  }

  return response;
};

//====================================================================================================
//======================================={BUY CARD PAIRS}=============================================
//====================================================================================================

const addBuyCardPair = async (token) => {
  console.log({ status: 'new' });
  let result;
  const formData = {
    file: token.image,
    public_id: token.symbol,
    upload_preset: 'kxxtmdn1', //testing
    // upload_preset: 'blendery', // production
  };
  const response = await axios.post(
    'https://api.cloudinary.com/v1_1/datkh2oxv/image/upload/',
    formData
  );
  const url = response.data.secure_url;
  if (url) {
    result = await TokenPairs.create({
      id: token?.id,
      symbol: token?.symbol,
      name: token?.name,
      image: token?.image, // update with cloudinary image before sending to backend
      tokenUrl: url, // update with cloudinary image before sending to backend
      current_price: token?.current_price,
      market_cap: token?.market_cap,
      market_cap_rank: token?.market_cap_rank,
      fully_diluted_valuation: token?.fully_diluted_valuation,
      total_volume: token?.total_volume,
      high_24h: token?.high_24h,
      low_24h: token?.low_24h,
      price_change_24h: token?.price_change_24h,
      price_change_percentage_24h: token?.price_change_percentage_24h,
      market_cap_change_24h: token?.market_cap_change_24h,
      market_cap_change_percentage_24h: token?.market_cap_change_percentage_24h,
      circulating_supply: token?.circulating_supply,
      total_supply: token?.total_supply,
      max_supply: token?.max_supply,
      ath: token?.ath,
      ath_change_percentage: token?.ath_change_percentage,
      ath_date: token?.ath_date,
      atl: token?.atl,
      atl_change_percentage: token?.atl_change_percentage,
      atl_date: token?.atl_date,
      roi: token?.roi,
      last_updated: token?.last_updated,
    });

    if (result) {
      // res.status(200).json(result);
      console.log({ newResult: result });
      return result;
    }
  }
};

const updateBuyCardPair = async () => {
  let tokensFrom = [
    {
      id: 'US Dollar',
      symbol: 'usd',
      price_symbol: 'usd',
      name: 'US Dollar',
      unit: '$',
      value: 26537.264,
      type: 'fiat',
      image:
        'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
      // logoURI: '/usd.png',
      logoURI: '',
    },
    {
      id: 'Euro',
      symbol: 'eur',
      price_symbol: 'eur',
      name: 'Euro',
      unit: '€',
      value: 25184.368,
      type: 'fiat',
      image:
        'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
      logoURI: '',
    },
    {
      id: 'British Pound Sterling',
      symbol: 'gbp',
      price_symbol: 'gbp',
      name: 'British Pound Sterling',
      unit: '£',
      value: 21868.351,
      type: 'fiat',
      image:
        'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
      logoURI: '',
    },
    {
      id: 'Russian Ruble',
      symbol: 'rub',
      price_symbol: 'rub',
      name: 'Russian Ruble',
      unit: '₽',
      value: 41675.288,
      type: 'fiat',
      image:
        'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
      logoURI: '',
    },
    {
      id: 'United Arab Emirates Dirham',
      symbol: 'aed',
      price_symbol: 'aed',
      name: 'United Arab Emirates Dirham',
      unit: 'DH',
      value: 97471.904,
      type: 'fiat',
      image:
        'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
      logoURI: '',
    },
  ];
  let tokensTo = [
    {
      id: 'bitcoin',
      symbol: 'btc',
      price_symbol: 'btc',
      name: 'Bitcoin',
      token_type: 'native',
      image:
        'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
      current_price: 26615,
      pricUSD: '',
      pricEUR: '',
      pricGBP: '',
      pricRUB: '',
      pricAED: '',
    },
    {
      id: 'ethereum',
      symbol: 'eth',
      price_symbol: 'eth',
      name: 'Ethereum',
      token_type: 'native',
      image:
        'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628',
      current_price: 1553.55, // prie usd
      pricUSD: '',
      pricEUR: '',
      pricGBP: '',
      pricRUB: '',
      pricAED: '',
    },
    {
      id: 'tether TRC20',
      symbol: 'usdtTRX',
      price_symbol: 'usdt',
      name: 'Tether TRC20',
      token_type: 'TRC20',
      image:
        'https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661',
      current_price: 0.999702,
      pricUSD: '',
      pricEUR: '',
      pricGBP: '',
      pricRUB: '',
      pricAED: '',
    },
    {
      id: 'tether ERC20',
      symbol: 'usdt20',
      price_symbol: 'usdt',
      name: 'Tether ERC20',
      token_type: 'ERC20',
      image:
        'https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661',
      current_price: 0.999702,
      pricUSD: '',
      pricEUR: '',
      pricGBP: '',
      pricRUB: '',
      pricAED: '',
    },
  ];

  let fTokens; // from tokens
  let tTokens; // toTokens
  tokensFrom.map(async (token) => {
    fTokens = await addBuyCardPair(token);
  });

  tokensTo.map(async (token) => {
    tTokens = await addBuyCardPair(token);
  });

  const response = await TokenPairs.create({
    buycard: {
      fTokens,
      tTokens,
    },
  });

  if (response) {
  }

  return response;
};

//====================================================================================================
//======================================={BUY CASH PAIRS}=============================================
//====================================================================================================

const addBuyCashPair = async (token) => {
  console.log({ status: 'new' });
  let result;
  const formData = {
    file: token.image,
    public_id: token.symbol,
    upload_preset: 'kxxtmdn1', //testing
    // upload_preset: 'blendery', // production
  };
  const response = await axios.post(
    'https://api.cloudinary.com/v1_1/datkh2oxv/image/upload/',
    formData
  );
  const url = response.data.secure_url;
  if (url) {
    result = await TokenPairs.create({
      id: token?.id,
      symbol: token?.symbol,
      name: token?.name,
      image: token?.image, // update with cloudinary image before sending to backend
      tokenUrl: url, // update with cloudinary image before sending to backend
      current_price: token?.current_price,
      market_cap: token?.market_cap,
      market_cap_rank: token?.market_cap_rank,
      fully_diluted_valuation: token?.fully_diluted_valuation,
      total_volume: token?.total_volume,
      high_24h: token?.high_24h,
      low_24h: token?.low_24h,
      price_change_24h: token?.price_change_24h,
      price_change_percentage_24h: token?.price_change_percentage_24h,
      market_cap_change_24h: token?.market_cap_change_24h,
      market_cap_change_percentage_24h: token?.market_cap_change_percentage_24h,
      circulating_supply: token?.circulating_supply,
      total_supply: token?.total_supply,
      max_supply: token?.max_supply,
      ath: token?.ath,
      ath_change_percentage: token?.ath_change_percentage,
      ath_date: token?.ath_date,
      atl: token?.atl,
      atl_change_percentage: token?.atl_change_percentage,
      atl_date: token?.atl_date,
      roi: token?.roi,
      last_updated: token?.last_updated,
    });

    if (result) {
      // res.status(200).json(result);
      console.log({ newResult: result });
      return result;
    }
  }
};

const updateBuyCashPair = async () => {
  let tokensFrom = [
    {
      id: 'US Dollar',
      symbol: 'usd',
      price_symbol: 'usd',
      name: 'US Dollar',
      unit: '$',
      value: 26537.264,
      type: 'fiat',
      image:
        'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
      // logoURI: '/usd.png',
      logoURI: '',
    },
    {
      id: 'Euro',
      symbol: 'eur',
      price_symbol: 'eur',
      name: 'Euro',
      unit: '€',
      value: 25184.368,
      type: 'fiat',
      image:
        'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
      logoURI: '',
    },
    {
      id: 'British Pound Sterling',
      symbol: 'gbp',
      price_symbol: 'gbp',
      name: 'British Pound Sterling',
      unit: '£',
      value: 21868.351,
      type: 'fiat',
      image:
        'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
      logoURI: '',
    },
    {
      id: 'Russian Ruble',
      symbol: 'rub',
      price_symbol: 'rub',
      name: 'Russian Ruble',
      unit: '₽',
      value: 41675.288,
      type: 'fiat',
      image:
        'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
      logoURI: '',
    },
    {
      id: 'United Arab Emirates Dirham',
      symbol: 'aed',
      price_symbol: 'aed',
      name: 'United Arab Emirates Dirham',
      unit: 'DH',
      value: 97471.904,
      type: 'fiat',
      image:
        'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
      logoURI: '',
    },
  ];
  let tokensTo = [
    {
      id: 'bitcoin',
      symbol: 'btc',
      price_symbol: 'btc',
      name: 'Bitcoin',
      token_type: 'native',
      image:
        'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
      current_price: 26615,
      pricUSD: '',
      pricEUR: '',
      pricGBP: '',
      pricRUB: '',
      pricAED: '',
    },
    {
      id: 'ethereum',
      symbol: 'eth',
      price_symbol: 'eth',
      name: 'Ethereum',
      token_type: 'native',
      image:
        'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628',
      current_price: 1553.55,
      pricUSD: '',
      pricEUR: '',
      pricGBP: '',
      pricRUB: '',
      pricAED: '',
    },
    {
      id: 'tether TRC20',
      symbol: 'usdtTRX',
      price_symbol: 'usdt',
      name: 'Tether TRC20',
      token_type: 'TRC20',
      image:
        'https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661',
      current_price: 0.999702,
      pricUSD: '',
      pricEUR: '',
      pricGBP: '',
      pricRUB: '',
      pricAED: '',
    },
    {
      id: 'tether ERC20',
      symbol: 'usdt20',
      price_symbol: 'usdt',
      name: 'Tether ERC20',
      token_type: 'ERC20',
      image:
        'https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661',
      current_price: 0.999702,
      pricUSD: '',
      pricEUR: '',
      pricGBP: '',
      pricRUB: '',
      pricAED: '',
    },
  ];

  let fTokens; // from tokens
  let tTokens; // toTokens
  tokensFrom.map(async (token) => {
    fTokens = await addBuyCashPair(token);
  });

  tokensTo.map(async (token) => {
    tTokens = await addBuyCashPair(token);
  });

  const response = await TokenPairs.create({
    buycash: {
      fTokens,
      tTokens,
    },
  });

  if (response) {
  }

  return response;
};

//====================================================================================================
//======================================={SELL CARD PAIRS}=============================================
//====================================================================================================
const addSellCardPair = async (token) => {
  console.log({ status: 'new' });
  let result;
  const formData = {
    file: token.image,
    public_id: token.symbol,
    upload_preset: 'kxxtmdn1', //testing
    // upload_preset: 'blendery', // production
  };
  const response = await axios.post(
    'https://api.cloudinary.com/v1_1/datkh2oxv/image/upload/',
    formData
  );
  const url = response.data.secure_url;
  if (url) {
    result = await TokenPairs.create({
      id: token?.id,
      symbol: token?.symbol,
      name: token?.name,
      image: token?.image, // update with cloudinary image before sending to backend
      tokenUrl: url, // update with cloudinary image before sending to backend
      current_price: token?.current_price,
      market_cap: token?.market_cap,
      market_cap_rank: token?.market_cap_rank,
      fully_diluted_valuation: token?.fully_diluted_valuation,
      total_volume: token?.total_volume,
      high_24h: token?.high_24h,
      low_24h: token?.low_24h,
      price_change_24h: token?.price_change_24h,
      price_change_percentage_24h: token?.price_change_percentage_24h,
      market_cap_change_24h: token?.market_cap_change_24h,
      market_cap_change_percentage_24h: token?.market_cap_change_percentage_24h,
      circulating_supply: token?.circulating_supply,
      total_supply: token?.total_supply,
      max_supply: token?.max_supply,
      ath: token?.ath,
      ath_change_percentage: token?.ath_change_percentage,
      ath_date: token?.ath_date,
      atl: token?.atl,
      atl_change_percentage: token?.atl_change_percentage,
      atl_date: token?.atl_date,
      roi: token?.roi,
      last_updated: token?.last_updated,
    });

    if (result) {
      // res.status(200).json(result);
      console.log({ newResult: result });
      return result;
    }
  }
};

const updateSellCardPair = async () => {
  let tokensFrom = [
    {
      id: 'bitcoin',
      symbol: 'btc',
      price_symbol: 'btc',
      name: 'Bitcoin',
      token_type: 'native',
      image:
        'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
      current_price: 26615,
      pricUSD: '',
      pricEUR: '',
      pricGBP: '',
      pricRUB: '',
      pricAED: '',
    },
    {
      id: 'ethereum',
      symbol: 'eth',
      price_symbol: 'eth',
      name: 'Ethereum',
      token_type: 'native',
      image:
        'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628',
      current_price: 1553.55,
      pricUSD: '',
      pricEUR: '',
      pricGBP: '',
      pricRUB: '',
      pricAED: '',
    },
    {
      id: 'tether TRC20',
      symbol: 'usdtTRX',
      price_symbol: 'usdt',
      name: 'Tether TRC20',
      token_type: 'TRC20',
      image:
        'https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661',
      current_price: 0.999702,
      pricUSD: '',
      pricEUR: '',
      pricGBP: '',
      pricRUB: '',
      pricAED: '',
    },
    {
      id: 'tether ERC20',
      symbol: 'usdt20',
      price_symbol: 'usdt',
      name: 'Tether ERC20',
      token_type: 'ERC20',
      image:
        'https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661',
      current_price: 0.999702,
      pricUSD: '',
      pricEUR: '',
      pricGBP: '',
      pricRUB: '',
      pricAED: '',
    },
  ];
  let tokensTo = [
    {
      id: 'US Dollar',
      symbol: 'usd',
      price_symbol: 'usd',
      name: 'US Dollar',
      unit: '$',
      value: 26537.264,
      type: 'fiat',
      image:
        'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
      // logoURI: '/usd.png',
      logoURI: '',
    },
    {
      id: 'Euro',
      symbol: 'eur',
      price_symbol: 'eur',
      name: 'Euro',
      unit: '€',
      value: 25184.368,
      type: 'fiat',
      image:
        'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
      logoURI: '',
    },
    {
      id: 'British Pound Sterling',
      symbol: 'gbp',
      price_symbol: 'gbp',
      name: 'British Pound Sterling',
      unit: '£',
      value: 21868.351,
      type: 'fiat',
      image:
        'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
      logoURI: '',
    },
    {
      id: 'Russian Ruble',
      symbol: 'rub',
      price_symbol: 'rub',
      name: 'Russian Ruble',
      unit: '₽',
      value: 41675.288,
      type: 'fiat',
      image:
        'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
      logoURI: '',
    },
    {
      id: 'United Arab Emirates Dirham',
      symbol: 'aed',
      price_symbol: 'aed',
      name: 'United Arab Emirates Dirham',
      unit: 'DH',
      value: 97471.904,
      type: 'fiat',
      image:
        'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
      logoURI: '',
    },
  ];

  let fTokens; // from tokens
  let tTokens; // toTokens
  tokensFrom.map(async (token) => {
    fTokens = await addSellCardPair(token);
  });

  tokensTo.map(async (token) => {
    tTokens = await addSellCardPair(token);
  });

  const response = await TokenPairs.create({
    sellcard: {
      fTokens,
      tTokens,
    },
  });

  if (response) {
  }

  return response;
};

//====================================================================================================
//======================================={SELL CASH PAIRS}=============================================
//====================================================================================================
const addSellCashPair = async (token) => {
  console.log({ status: 'new' });
  let result;
  const formData = {
    file: token.image,
    public_id: token.symbol,
    upload_preset: 'kxxtmdn1', //testing
    // upload_preset: 'blendery', // production
  };
  const response = await axios.post(
    'https://api.cloudinary.com/v1_1/datkh2oxv/image/upload/',
    formData
  );
  const url = response.data.secure_url;
  if (url) {
    result = await TokenPairs.create({
      id: token?.id,
      symbol: token?.symbol,
      name: token?.name,
      image: token?.image, // update with cloudinary image before sending to backend
      tokenUrl: url, // update with cloudinary image before sending to backend
      current_price: token?.current_price,
      market_cap: token?.market_cap,
      market_cap_rank: token?.market_cap_rank,
      fully_diluted_valuation: token?.fully_diluted_valuation,
      total_volume: token?.total_volume,
      high_24h: token?.high_24h,
      low_24h: token?.low_24h,
      price_change_24h: token?.price_change_24h,
      price_change_percentage_24h: token?.price_change_percentage_24h,
      market_cap_change_24h: token?.market_cap_change_24h,
      market_cap_change_percentage_24h: token?.market_cap_change_percentage_24h,
      circulating_supply: token?.circulating_supply,
      total_supply: token?.total_supply,
      max_supply: token?.max_supply,
      ath: token?.ath,
      ath_change_percentage: token?.ath_change_percentage,
      ath_date: token?.ath_date,
      atl: token?.atl,
      atl_change_percentage: token?.atl_change_percentage,
      atl_date: token?.atl_date,
      roi: token?.roi,
      last_updated: token?.last_updated,
    });

    if (result) {
      // res.status(200).json(result);
      console.log({ newResult: result });
      return result;
    }
  }
};
const updateSellCashPair = async () => {
  let tokensFrom = [
    {
      id: 'bitcoin',
      symbol: 'btc',
      price_symbol: 'btc',
      name: 'Bitcoin',
      token_type: 'native',
      image:
        'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
      current_price: 26615,
      pricUSD: '',
      pricEUR: '',
      pricGBP: '',
      pricRUB: '',
      pricAED: '',
    },
    {
      id: 'ethereum',
      symbol: 'eth',
      price_symbol: 'eth',
      name: 'Ethereum',
      token_type: 'native',
      image:
        'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628',
      current_price: 1553.55,
      pricUSD: '',
      pricEUR: '',
      pricGBP: '',
      pricRUB: '',
      pricAED: '',
    },
    {
      id: 'tether TRC20',
      symbol: 'usdtTRX',
      price_symbol: 'usdt',
      name: 'Tether TRC20',
      token_type: 'TRC20',
      image:
        'https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661',
      current_price: 0.999702,
      pricUSD: '',
      pricEUR: '',
      pricGBP: '',
      pricRUB: '',
      pricAED: '',
    },
    {
      id: 'tether ERC20',
      symbol: 'usdt20',
      price_symbol: 'usdt',
      name: 'Tether ERC20',
      token_type: 'ERC20',
      image:
        'https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661',
      current_price: 0.999702,
      pricUSD: '',
      pricEUR: '',
      pricGBP: '',
      pricRUB: '',
      pricAED: '',
    },
  ];
  let tokensTo = [
    {
      id: 'US Dollar',
      symbol: 'usd',
      price_symbol: 'usd',
      name: 'US Dollar',
      unit: '$',
      value: 26537.264,
      type: 'fiat',
      image:
        'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
      // logoURI: '/usd.png',
      logoURI: '',
    },
    {
      id: 'Euro',
      symbol: 'eur',
      price_symbol: 'eur',
      name: 'Euro',
      unit: '€',
      value: 25184.368,
      type: 'fiat',
      image:
        'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
      logoURI: '',
    },
    {
      id: 'British Pound Sterling',
      symbol: 'gbp',
      price_symbol: 'gbp',
      name: 'British Pound Sterling',
      unit: '£',
      value: 21868.351,
      type: 'fiat',
      image:
        'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
      logoURI: '',
    },
    {
      id: 'Russian Ruble',
      symbol: 'rub',
      price_symbol: 'rub',
      name: 'Russian Ruble',
      unit: '₽',
      value: 41675.288,
      type: 'fiat',
      image:
        'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
      logoURI: '',
    },
    {
      id: 'United Arab Emirates Dirham',
      symbol: 'aed',
      price_symbol: 'aed',
      name: 'United Arab Emirates Dirham',
      unit: 'DH',
      value: 97471.904,
      type: 'fiat',
      image:
        'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
      logoURI: '',
    },
  ];

  let fTokens; // from tokens
  let tTokens; // toTokens
  tokensFrom.map(async (token) => {
    fTokens = await addSellCashPair(token);
  });

  tokensTo.map(async (token) => {
    tTokens = await addSellCashPair(token);
  });

  const response = await TokenPairs.create({
    sellcash: {
      fTokens,
      tTokens,
    },
  });

  if (response) {
  }

  return response;
};

//====================================================================================================
//======================================={DEFI PAIRS}=============================================
//====================================================================================================
// use oneInch List
const addDefiPair = async (token) => {
  console.log({ status: 'new' });
  let result;
  const formData = {
    file: token.image,
    public_id: token.symbol,
    upload_preset: 'kxxtmdn1', //testing
    // upload_preset: 'blendery', // production
  };
  const response = await axios.post(
    'https://api.cloudinary.com/v1_1/datkh2oxv/image/upload/',
    formData
  );
  const url = response.data.secure_url;
  if (url) {
    result = await TokenPairs.create({
      id: token?.id,
      symbol: token?.symbol,
      name: token?.name,
      image: token?.image, // update with cloudinary image before sending to backend
      tokenUrl: url, // update with cloudinary image before sending to backend
      current_price: token?.current_price,
      market_cap: token?.market_cap,
      market_cap_rank: token?.market_cap_rank,
      fully_diluted_valuation: token?.fully_diluted_valuation,
      total_volume: token?.total_volume,
      high_24h: token?.high_24h,
      low_24h: token?.low_24h,
      price_change_24h: token?.price_change_24h,
      price_change_percentage_24h: token?.price_change_percentage_24h,
      market_cap_change_24h: token?.market_cap_change_24h,
      market_cap_change_percentage_24h: token?.market_cap_change_percentage_24h,
      circulating_supply: token?.circulating_supply,
      total_supply: token?.total_supply,
      max_supply: token?.max_supply,
      ath: token?.ath,
      ath_change_percentage: token?.ath_change_percentage,
      ath_date: token?.ath_date,
      atl: token?.atl,
      atl_change_percentage: token?.atl_change_percentage,
      atl_date: token?.atl_date,
      roi: token?.roi,
      last_updated: token?.last_updated,
    });

    if (result) {
      // res.status(200).json(result);
      console.log({ newResult: result });
      return result;
    }
  }
};

const updateDefiPair = async () => {
  let tokensFrom = [
    {
      id: 'bitcoin',
      symbol: 'btc',
      price_symbol: 'btc',
      name: 'Bitcoin',
      token_type: 'native',
      image:
        'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
      current_price: 26615,
      chainId: '1',
      address: '',
      decimals: '',
    },
    {
      id: 'ethereum',
      symbol: 'eth',
      price_symbol: 'eth',
      name: 'Ethereum',
      token_type: 'native',
      image:
        'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628',
      current_price: 1553.55,
    },
    {
      id: 'tether TRC20',
      symbol: 'usdtTRX',
      price_symbol: 'usdt',
      name: 'Tether TRC20',
      token_type: 'TRC20',
      image:
        'https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661',
      current_price: 0.999702,
    },
    {
      id: 'tether ERC20',
      symbol: 'usdt20',
      price_symbol: 'usdt',
      name: 'Tether ERC20',
      token_type: 'ERC20',
      image:
        'https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661',
      current_price: 0.999702,
    },
  ];
  let tokensTo = [
    {
      id: 'bitcoin',
      symbol: 'btc',
      price_symbol: 'btc',
      name: 'Bitcoin',
      token_type: 'native',
      image:
        'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
      current_price: 26615,
    },
    {
      id: 'ethereum',
      symbol: 'eth',
      price_symbol: 'eth',
      name: 'Ethereum',
      token_type: 'native',
      image:
        'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628',
      current_price: 1553.55,
    },
    {
      id: 'tether TRC20',
      symbol: 'usdtTRX',
      price_symbol: 'usdt',
      name: 'Tether TRC20',
      token_type: 'TRC20',
      image:
        'https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661',
      current_price: 0.999702,
    },
    {
      id: 'tether ERC20',
      symbol: 'usdt20',
      price_symbol: 'usdt',
      name: 'Tether ERC20',
      token_type: 'ERC20',
      image:
        'https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661',
      current_price: 0.999702,
    },
  ];

  let fTokens; // from tokens
  let tTokens; // toTokens
  tokensFrom.map(async (token) => {
    fTokens = await addDefiPair(token);
  });

  tokensTo.map(async (token) => {
    tTokens = await addDefiPair(token);
  });

  let tokensFromEthereum = [
    {
      id: 'bitcoin',
      symbol: 'btc',
      name: 'Bitcoin',
      image:
        'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
      current_price: 26615,
      market_cap: 518927028307,
      market_cap_rank: 1,
      fully_diluted_valuation: 558533374612,
      total_volume: 12319345219,
      high_24h: 27470,
      low_24h: 26570,
      price_change_24h: -746.7241308926823,
      price_change_percentage_24h: -2.72907,
      market_cap_change_24h: -15318022735.526428,
      market_cap_change_percentage_24h: -2.86723,
      circulating_supply: 19510862,
      total_supply: 21000000,
      max_supply: 21000000,
      ath: 69045,
      ath_change_percentage: -61.44603,
      ath_date: '2021-11-10T14:24:11.849Z',
      atl: 67.81,
      atl_change_percentage: 39156.58473,
      atl_date: '2013-07-06T00:00:00.000Z',
      roi: null,
      last_updated: '2023-10-11T17:57:36.197Z',
    },
    {
      id: 'ethereum',
      symbol: 'eth',
      name: 'Ethereum',
      image:
        'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628',
      current_price: 1553.55,
      market_cap: 186734441975,
      market_cap_rank: 2,
      fully_diluted_valuation: 186734441975,
      total_volume: 8087325187,
      high_24h: 1577.86,
      low_24h: 1552.24,
      price_change_24h: -7.637757916698092,
      price_change_percentage_24h: -0.48923,
      market_cap_change_24h: -1009773395.7304382,
      market_cap_change_percentage_24h: -0.53785,
      circulating_supply: 120252073.560565,
      total_supply: 120252073.560565,
      max_supply: null,
      ath: 4878.26,
      ath_change_percentage: -68.1423,
      ath_date: '2021-11-10T14:24:19.604Z',
      atl: 0.432979,
      atl_change_percentage: 358832.41577,
      atl_date: '2015-10-20T00:00:00.000Z',
      roi: {
        times: 77.0509894490856,
        currency: 'btc',
        percentage: 7705.098944908561,
      },
      last_updated: '2023-10-11T17:57:42.803Z',
    },
    {
      id: 'tether',
      symbol: 'usdt',
      name: 'Tether',
      image:
        'https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661',
      current_price: 0.999702,
      market_cap: 83534390789,
      market_cap_rank: 3,
      fully_diluted_valuation: 83534390789,
      total_volume: 20023452069,
      high_24h: 1.001,
      low_24h: 0.997821,
      price_change_24h: -0.000525913297202529,
      price_change_percentage_24h: -0.05258,
      market_cap_change_24h: -1206624.1215667725,
      market_cap_change_percentage_24h: -0.00144,
      circulating_supply: 83519009631.3892,
      total_supply: 83519009631.3892,
      max_supply: null,
      ath: 1.32,
      ath_change_percentage: -24.442,
      ath_date: '2018-07-24T00:00:00.000Z',
      atl: 0.572521,
      atl_change_percentage: 74.61443,
      atl_date: '2015-03-02T00:00:00.000Z',
      roi: null,
      last_updated: '2023-10-11T17:55:00.498Z',
    },
  ];
  let tokensToEthereum = [
    {
      id: 'bitcoin',
      symbol: 'btc',
      name: 'Bitcoin',
      image:
        'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
      current_price: 26615,
      market_cap: 518927028307,
      market_cap_rank: 1,
      fully_diluted_valuation: 558533374612,
      total_volume: 12319345219,
      high_24h: 27470,
      low_24h: 26570,
      price_change_24h: -746.7241308926823,
      price_change_percentage_24h: -2.72907,
      market_cap_change_24h: -15318022735.526428,
      market_cap_change_percentage_24h: -2.86723,
      circulating_supply: 19510862,
      total_supply: 21000000,
      max_supply: 21000000,
      ath: 69045,
      ath_change_percentage: -61.44603,
      ath_date: '2021-11-10T14:24:11.849Z',
      atl: 67.81,
      atl_change_percentage: 39156.58473,
      atl_date: '2013-07-06T00:00:00.000Z',
      roi: null,
      last_updated: '2023-10-11T17:57:36.197Z',
    },
    {
      id: 'ethereum',
      symbol: 'eth',
      name: 'Ethereum',
      image:
        'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628',
      current_price: 1553.55,
      market_cap: 186734441975,
      market_cap_rank: 2,
      fully_diluted_valuation: 186734441975,
      total_volume: 8087325187,
      high_24h: 1577.86,
      low_24h: 1552.24,
      price_change_24h: -7.637757916698092,
      price_change_percentage_24h: -0.48923,
      market_cap_change_24h: -1009773395.7304382,
      market_cap_change_percentage_24h: -0.53785,
      circulating_supply: 120252073.560565,
      total_supply: 120252073.560565,
      max_supply: null,
      ath: 4878.26,
      ath_change_percentage: -68.1423,
      ath_date: '2021-11-10T14:24:19.604Z',
      atl: 0.432979,
      atl_change_percentage: 358832.41577,
      atl_date: '2015-10-20T00:00:00.000Z',
      roi: {
        times: 77.0509894490856,
        currency: 'btc',
        percentage: 7705.098944908561,
      },
      last_updated: '2023-10-11T17:57:42.803Z',
    },
    {
      id: 'tether',
      symbol: 'usdt',
      name: 'Tether',
      image:
        'https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661',
      current_price: 0.999702,
      market_cap: 83534390789,
      market_cap_rank: 3,
      fully_diluted_valuation: 83534390789,
      total_volume: 20023452069,
      high_24h: 1.001,
      low_24h: 0.997821,
      price_change_24h: -0.000525913297202529,
      price_change_percentage_24h: -0.05258,
      market_cap_change_24h: -1206624.1215667725,
      market_cap_change_percentage_24h: -0.00144,
      circulating_supply: 83519009631.3892,
      total_supply: 83519009631.3892,
      max_supply: null,
      ath: 1.32,
      ath_change_percentage: -24.442,
      ath_date: '2018-07-24T00:00:00.000Z',
      atl: 0.572521,
      atl_change_percentage: 74.61443,
      atl_date: '2015-03-02T00:00:00.000Z',
      roi: null,
      last_updated: '2023-10-11T17:55:00.498Z',
    },
  ];

  let fTokensEthereum; // from tokens
  let tTokensEthereum; // toTokens
  tokensFromEthereum.map(async (token) => {
    fTokens = await addDefiPair(token);
  });

  tokensTo.map(async (token) => {
    tTokensEthereum = await addDefiPair(token);
  });

  // const response = await TokenPairs.create({
  //   defi: {
  //     fTokens,
  //     tTokens,
  //   },
  // });

  const response = await TokenPairs.create({
    defi: {
      ethereum: {
        fTokens: tokensFromEthereum,
        tTokens: tTokensEthereum,
      },
      binance: {
        fTokens,
        tTokens,
      },
      polygon: {
        fTokens,
        tTokens,
      },
      arbitrum: {
        fTokens,
        tTokens,
      },
      optimism: {
        fTokens,
        tTokens,
      },
    },
  });

  if (response) {
  }

  return response;
};

async function BtcExchangeRatesLocal() {
  let result;
  try {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/exchange_rates'
    );
    if (response.data) {
      result = await Rates.create({
        rates: response.data,
      });
    }

    if (result) {
      return result;
    }
  } catch (error) {
    console.log(error);
  }
}

async function getExchangeRateRub() {
  //todo
}

async function convertRate() {
  const { rates } = await BtcExchangeRatesLocal();
  const btcRate = rates?.btc?.value; // 1 base params
  const usdRate = rates?.usd?.value;
  const aedRate = rates?.aed?.value;
  const eurRate = rates?.eur?.value;
  const gbpRate = rates?.gbp?.value;

  // const usd_rub = await getExchangeRateRub(); // to be done
  const usd_rub = usdRate; // for develpoment
  //====={usd to rub}========
  //====={usd to aed}========
  //====={usd to eur}========
  //====={usd to gbp}========
  const usd_aed_rate = usdRate / aedRate;
  const usd_eur_rate = usdRate / eurRate;
  const usd_gbp_rate = usdRate / gbpRate;

  const response = {
    usd_aed_rate,
    usd_eur_rate,
    usd_gbp_rate,
    usd_rub,
  };
  return response;
}

//========{Udates tokens rates for buy/sell and exchange}=====
// {
//   id: 'tether TRC20',
//   symbol: 'usdtTRX',
//   price_symbol: 'usdt',
//   name: 'Tether TRC20',
//   token_type: 'TRC20',
//   image:
//     'https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661',
//   current_price: 0.999702,
//   pricUSD: '',
//   pricEUR: '',
//   pricGBP: '',
//   pricRUB: '',
//   pricAED: '',
// },
async function updateRates() {
  const tokens = TokenPairs.find(); // to be done

  const { usd_aed_rate, usd_eur_rate, usd_gbp_rate, usd_rub } =
    await convertRate();

  const allTokensExchangeFrom = tokens.exchange; // to be done
  const allTokensExchangeTo = tokens.exchange; // to be done

  const allTokensBuyCardTo = tokens.buycard; // to be done
  const allTokensBuyCashTo = tokens.buyCash; // to be done

  const allTokensSellCardFrom = tokens.sellcard; // to be done

  const allTokensSellCashFrom = tokens.sellCash; // to be done

  allTokensExchangeFrom.map(async (token) => {
    let rateUsd = token.current_price;
    token.pricUSD = rateUsd;
    token.pricEUR = rateUsd * usd_eur_rate;
    token.pricGBP = rateUsd * usd_gbp_rate;
    token.pricRUB = rateUsd * usd_rub;
    token.pricAED = rateUsd * usd_aed_rate;
  });
  allTokensExchangeTo.map(async (token) => {
    let rateUsd = token.current_price;
    token.pricUSD = rateUsd;
    token.pricEUR = rateUsd * usd_eur_rate;
    token.pricGBP = rateUsd * usd_gbp_rate;
    token.pricRUB = rateUsd * usd_rub;
    token.pricAED = rateUsd * usd_aed_rate;
  });
  allTokensBuyCardTo.map(async (token) => {
    let rateUsd = token.current_price;
    token.pricUSD = rateUsd;
    token.pricEUR = rateUsd * usd_eur_rate;
    token.pricGBP = rateUsd * usd_gbp_rate;
    token.pricRUB = rateUsd * usd_rub;
    token.pricAED = rateUsd * usd_aed_rate;
  });
  allTokensBuyCashTo.map(async (token) => {
    let rateUsd = token.current_price;
    token.pricUSD = rateUsd;
    token.pricEUR = rateUsd * usd_eur_rate;
    token.pricGBP = rateUsd * usd_gbp_rate;
    token.pricRUB = rateUsd * usd_rub;
    token.pricAED = rateUsd * usd_aed_rate;
  });
  allTokensSellCardFrom.map(async (token) => {
    let rateUsd = token.current_price;
    token.pricUSD = rateUsd;
    token.pricEUR = rateUsd * usd_eur_rate;
    token.pricGBP = rateUsd * usd_gbp_rate;
    token.pricRUB = rateUsd * usd_rub;
    token.pricAED = rateUsd * usd_aed_rate;
  });
  allTokensSellCashFrom.map(async (token) => {
    let rateUsd = token.current_price;
    token.pricUSD = rateUsd;
    token.pricEUR = rateUsd * usd_eur_rate;
    token.pricGBP = rateUsd * usd_gbp_rate;
    token.pricRUB = rateUsd * usd_rub;
    token.pricAED = rateUsd * usd_aed_rate;
  });

  await tokens.save();
}

// update at interval using pool
//======{Pooling works and should be used for fetching and updating all current market data per set intervals}=================
const poolUpdatedPrices = async () => {
  const intervalId = setInterval(() => {
    updateRates();
  }, 60000); // every minute || 60 seconds
  // }, 10000);
  return () => {
    clearInterval(intervalId);
  };
};

// poolUpdatedPrices()

const updateTokenListFiat = async () => {
  const tokenListPrice = await btcExchangeRatesLocal();

  // console.log({ tokenListPrice: tokenListPrice });

  let usdValue = tokenListPrice?.rates?.usd.value;
  // console.log({ usdValue: usdValue });

  let eurValue = tokenListPrice?.rates?.eur.value;
  // console.log({ eurValue: eurValue });

  let gbpValue = tokenListPrice?.rates?.gbp.value;
  // console.log({ gbpValue: gbpValue });

  let aedValue = tokenListPrice?.rates?.aed.value;
  // console.log({ aedValue: aedValue });

  const tokens = [
    {
      symbol: 'usd',
      value: usdValue,
    },
    {
      symbol: 'eur',
      value: eurValue,
    },
    {
      symbol: 'gbp',
      value: gbpValue,
    },
    {
      symbol: 'aed',
      value: aedValue,
    },
  ];

  // console.log({ tokens: tokens });

  tokens?.map(async (token) => {
    await updatePricesFiat(token);
  });
};

// updateTokenListFiat();

//======{Pooling works and should be used for fetching and updating all current market data per set intervals}=================
const poolTokenListFiat = async () => {
  const intervalId = setInterval(() => {
    updateTokenListFiat();
  }, 1800000); // 30min // too many request 60000 * 30
  // }, 10000);
  return () => {
    clearInterval(intervalId);
  };
};

// poolTokenListFiat();

module.exports = {
  addToken,
  btcExchangeRates,
  trending,
  globalData,
  historyChart,
  getTokenList,
  getTokenListDefi,
  getTokenListFiat,
  getTokenListBuy,
  getTokenListSell,
  getTokenListExchange,
  getTokensDefiById,
  updatedTokenPrices,
  getTokenListPrice,
  getTokensController,
  updateAllTokenListPrice,
  getTokensDefiEthereum,
  getTokensDefiBinance,
  getTokensDefiPolygon,
  getTokensDefiArbitrum,
  getTokensDefiOptimism,
  getTokenListStore,
};
