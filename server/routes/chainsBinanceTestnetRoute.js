const express = require('express');

const {
  addNewChainsBinanceTestnet,
  getChainsBinanceTestnet,
  updateChainsBinanceTestnet,
  deleteChainsBinanceTestnet,
} = require('../controllers/chains/binanceTestnetChainController.js');

const router = express.Router();

router.route('/')
    .get(getChainsBinanceTestnet)
    .post(addNewChainsBinanceTestnet)
    .patch(updateChainsBinanceTestnet)
    .delete(deleteChainsBinanceTestnet)


module.exports = router