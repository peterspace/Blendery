//================={Swap Token List}===================
const Arbitrum = require('./Arbitrum.js');
const Aurora = require('./Aurora.js');
const Avalanche = require('./Avalanche.js');
const Binance = require('./Binance.js');
const Ethereum = require('./Ethereum.js');
const Optimism = require('./Optimism.js');
const Polygon = require('./Polygon.js');

async function getTokenList({ chainId }) {
  // let data = [];
  let data;

  switch (chainId) {
    //MAINNETS
    //Arbitrum
    case '42161':
      data = Arbitrum;

      break;

    //Aurora
    case '1313161554':
      data = Aurora;
      break;

    //Avalanche
    case '43114':
      data = Avalanche;

      break;

    //Binance
    case '56':
      data = Binance;

      break;

    //ETH
    case '1':
      data = Ethereum;
      break;

    //Optimism
    case '10':
      data = Optimism;

      break;

    //Polygon
    case '137':
      data = Polygon;

      break;

    default:
      console.warn('Please choose a token!');
      break;
  }

  let response = {
    data,
  };

  return response;
}

module.exports = {
  getTokenList,
};
