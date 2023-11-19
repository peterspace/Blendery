const express = require('express');

const {
  addNewChainsPolygonMumbai,
  getChainsPolygonMumbai,
  updateChainsPolygonMumbai,
  deleteChainsPolygonMumbai,
} = require('../controllers/chains/polygonMumbaiChainController.js');

const router = express.Router();

router.route('/')
    .get(getChainsPolygonMumbai)
    .post(addNewChainsPolygonMumbai)
    .patch(updateChainsPolygonMumbai)
    .delete(deleteChainsPolygonMumbai)


module.exports = router