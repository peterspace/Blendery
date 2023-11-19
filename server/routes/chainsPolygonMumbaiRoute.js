const express = require('express');

const {
  addNewChainsPolygon,
  getChainsPolygon,
  updateChainsPolygon,
  deleteChainsPolygon,
} = require('../controllers/chains/polygonChainController.js');

const router = express.Router();

router.route('/')
    .get(getChainsPolygon)
    .post(addNewChainsPolygon)
    .patch(updateChainsPolygon)
    .delete(deleteChainsPolygon)


module.exports = router
