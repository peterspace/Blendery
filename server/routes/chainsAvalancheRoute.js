const express = require('express');

const {
  addNewChainsAvalanche,
  getChainsAvalanche,
  updateChainsAvalanche,
  deleteChainsAvalanche,
} = require('../controllers/chains/avalancheChainController.js');

const router = express.Router();

router.route('/')
    .get(getChainsAvalanche)
    .post(addNewChainsAvalanche)
    .patch(updateChainsAvalanche)
    .delete(deleteChainsAvalanche)


module.exports = router

