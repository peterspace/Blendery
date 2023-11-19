const express = require('express');

const {
  addNewChainsGoerliEth,
  getChainsGoerliEth,
  updateChainsGoerliEth,
  deleteChainsGoerliEth,
} = require('../controllers/chains/goerliEthChainController.js');


const router = express.Router();

router.route('/')
    .get(getChainsGoerliEth)
    .post(addNewChainsGoerliEth)
    .patch(updateChainsGoerliEth)
    .delete(deleteChainsGoerliEth)


module.exports = router