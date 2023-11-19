const express = require('express');

const {
  addNewChainsOptimism,
  getChainsOptimism,
  updateChainsOptimism,
  deleteChainsOptimism,
} = require('../controllers/chains/optimismChainController.js');

const router = express.Router();

router.route('/')
    .get(getChainsOptimism)
    .post(addNewChainsOptimism)
    .patch(updateChainsOptimism)
    .delete(deleteChainsOptimism)


module.exports = router