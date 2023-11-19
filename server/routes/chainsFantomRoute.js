const express = require('express');

const {
  addNewChainsFantom,
  getChainsFantom,
  updateChainsFantom,
  deleteChainsFantom,
} = require('../controllers/chains/fantomChainController.js');

const router = express.Router();

router.route('/')
    .get(getChainsFantom)
    .post(addNewChainsFantom)
    .patch(updateChainsFantom)
    .delete(deleteChainsFantom)


module.exports = router