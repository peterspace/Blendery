const express = require('express');

const {
  addNewChainsKlaytn,
  getChainsKlaytn,
  updateChainsKlaytn,
  deleteChainsKlaytn,
} = require('../controllers/chains/klaytnChainController.js');


const router = express.Router();

router.route('/')
    .get(getChainsKlaytn)
    .post(addNewChainsKlaytn)
    .patch(updateChainsKlaytn)
    .delete(deleteChainsKlaytn)


module.exports = router
