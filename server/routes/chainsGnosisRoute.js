const express = require('express');

const {
  addNewChainsGnosis,
  getChainsGnosis,
  updateChainsGnosis,
  deleteChainsGnosis,
} = require('../controllers/chains/gnosisChainController.js');

const router = express.Router();

router.route('/')
    .get(getChainsGnosis)
    .post(addNewChainsGnosis)
    .patch(updateChainsGnosis)
    .delete(deleteChainsGnosis)


module.exports = router