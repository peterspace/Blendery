const express = require('express');

const {
  addToken,
  btcExchangeRates,
  trending,
  globalData,
  historyChart,
  //============================================
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
  //==================={Defi}=========================
} = require('../controllers/tokensController.js');

const router = express.Router();

router.post('/addToken', addToken);
router.get('/btcExchangeRates', btcExchangeRates);

router.get('/trending', trending);

router.get('/globalData', globalData);
router.post('/historyChart', historyChart);

router.get('/getTokenList', getTokenList);
router.get('/getTokenListDefi', getTokenListDefi);
router.get('/getTokenListFiat', getTokenListFiat);
router.get('/getTokenListBuy', getTokenListBuy);
router.get('/getTokenListSell', getTokenListSell);
router.get('/getTokenListExchange', getTokenListExchange);
router.get('/getTokensDefiById/:chainId', getTokensDefiById);
router.get('/updatedTokenPrices', updatedTokenPrices);
router.get('/getTokenListPrice', getTokenListPrice);
router.get('/getTokensController', getTokensController);
router.get('/updateAllTokenListPrice', updateAllTokenListPrice);

module.exports = router;
