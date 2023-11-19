const express = require('express');

const {
  addNewChainsAurora,
  getChainsAurora,
  updateChainsAurora,
  deleteChainsAurora,
} = require('../controllers/chains/auroraChainsController');

const router = express.Router();

router.route('/')
    .get(getChainsAurora)
    .post(addNewChainsAurora)
    .patch(updateChainsAurora)
    .delete(deleteChainsAurora)


module.exports = router
