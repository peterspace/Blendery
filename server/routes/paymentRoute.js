const express = require('express');
const {
  stripePay,
  createStripeCheckout,
  createYandexPayBuy,
  createYandexPaySell,
} = require('../controllers/paymentController');
const router = express.Router();
router.post('/stripCheckout', stripePay);
router.post('/create-checkout-session', createStripeCheckout);
router.post('/createYandexPayBuy', createYandexPayBuy);
router.post('/createYandexPaySell', createYandexPaySell);

module.exports = router;
