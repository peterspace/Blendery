const express = require('express');
const {
  createCountry,
  getAllCountries,
  getAllStatesByCountry,
} = require('../controllers/placeControllers');
const router = express.Router();
router.post('/createCountry', createCountry);
router.get('/getAllCountries', getAllCountries);
router.get('/getAllStatesByCountry', getAllStatesByCountry);

module.exports = router;
