const express = require('express');

const {
  addNewChainsEthereum,
  getChainsEthereum,
  updateChainsEthereum,
  deleteChainsEthereum,
} = require('../controllers/chains/ethereumChainController.js');


const router = express.Router();

router.route('/')
    .get(getChainsEthereum)
    .post(addNewChainsEthereum)
    .patch(updateChainsEthereum)
    .delete(deleteChainsEthereum)


module.exports = router
