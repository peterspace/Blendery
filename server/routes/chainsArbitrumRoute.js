const express = require('express');

const {
  addNewChainsArbitrum,
  getChainsArbitrum,
  updateChainsArbitrum,
  deleteChainsArbitrum,
} = require('../controllers/chains/arbitrumChainController.js');

const router = express.Router();


router.route('/')
    .get(getChainsArbitrum)
    .post(addNewChainsArbitrum)
    .patch(updateChainsArbitrum)
    .delete(deleteChainsArbitrum)


module.exports = router
