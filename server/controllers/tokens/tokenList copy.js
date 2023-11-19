//================={Swap Token List}===================
const Arbitrum = require('./Arbitrum.js');
const Aurora = require('./Aurora.js');
const Avalanche = require('./Avalanche.js');
const Binance = require('./Binance.js');
const Ethereum = require('./Ethereum.js');
const Optimism = require('./Optimism.js');
const Polygon = require('./Polygon.js');

async function getTokenList({ chainId }) {
  let tokenList = [];

  switch (chainId) {
    //MAINNETS
    //Arbitrum
    case '42161':
      tokenList = Arbitrum;

      break;

    //Aurora
    case '1313161554':
      tokenList = Aurora;
      break;

    //Avalanche
    case '43114':
      tokenList = Avalanche;

      break;

    //Binance
    case '56':
      tokenList = Binance;

      break;

    //ETH
    case '1':
      tokenList = Ethereum;
      break;

    //Optimism
    case '10':
      tokenList = Optimism;

      break;

    //Polygon
    case '137':
      tokenList = Polygon;

      break;

    default:
      console.warn('Please choose a token!');
      break;
  }

  let response = {
    tokenList,
  };

  return response;
}

module.exports = {
  getTokenList,
};
