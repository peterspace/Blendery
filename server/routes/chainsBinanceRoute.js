const express = require('express');

const {
  addNewChainsBinance,
  getChainsBinance,
  updateChainsBinance,
  deleteChainsBinance,
} = require('../controllers/chains/binanceChainController.js');

const router = express.Router();

router.route('/')
    .get(getChainsBinance)
    .post(addNewChainsBinance)
    .patch(updateChainsBinance)
    .delete(deleteChainsBinance)


module.exports = router

