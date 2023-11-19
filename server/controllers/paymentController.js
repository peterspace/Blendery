const asyncHandler = require('express-async-handler');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const YooKassa = require('yookassa');

const yooKassa = new YooKassa({
  shopId: process.env.YOKASSA_SHOPID,
  secretKey: process.env.YOKASSA_SECRET_KEY,
});

//============={STRIPE PAYMENTS}================================

// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys

// const paymentIntent1 = await stripe.paymentIntents.create({
//   amount: 1099,
//   currency: 'usd',
//   confirm: true,
//   payment_method: '{{PAYMENT_METHOD_ID}}',
//   payment_method_types: ['card'],
// });

// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys

// const paymentIntent2 = await stripe.paymentIntents.create({
//   amount: 1099,
//   currency: 'usd',
//   confirm: true,
//   payment_method: '{{PAYMENT_METHOD_ID}}',
//   return_url: 'https://example.com/return_url',
// });
//========{ stripe payments are only in USD}======================
//hence all payments must be converted to their USD equivalence
// const stripePay = asyncHandler(async (req, res) => {
//   let { amount, id } = req.body;
//   try {
//     const payment = await stripe.paymentIntents.create({
//       amount: amount * 100, // convert to cents
//       currency: 'USD',
//       description: 'Crib Bookings',
//       payment_method: id,
//       confirm: true,
//     });
//     console.log('Payment', payment);
//     res.json({
//       message: 'Payment successful',
//       success: true,
//     });
//   } catch (error) {
//     console.log('Error', error);
//     res.json({
//       message: 'Payment failed',
//       success: false,
//     });
//     throw new Error(error);
//   }
// });

const stripePay = asyncHandler(async (req, res) => {
  let { amount, id } = req.body;
  const successId = '1'; // new Idea
  try {
    const payment = await stripe.paymentIntents.create({
      amount: amount * 100, // convert to cents
      currency: 'USD',
      description: 'Sales',
      confirm: true,
      payment_method: id,
      // return_url: `${process.env.FRONTEND_URL}/buyCard/${successId}`,
      return_url: `${process.env.FRONTEND_URL}/testCardPayments/${successId}`,

      // return_url: 'https://example.com/return_url',

      //     payment_method: '{{PAYMENT_METHOD_ID}}',
      // payment_method_types: ['card'],
    });
    console.log('Payment', payment);
    // res.json({
    //   message: 'Payment successful',
    //   success: true,
    // });

    console.log({ status: payment?.status });

    if (payment?.status === 'succeeded') {
      console.log({ status: payment?.status });
      res.json({
        message: 'Payment successful',
        success: true,
      });
    } else {
      res.json({
        message: 'Payment unsuccessful',
        success: false,
      });
    }
  } catch (error) {
    console.log('Error', error);
    res.json({
      message: 'Payment failed',
      success: false,
    });
    throw new Error(error);
  }
});

const StripeResponsedata = {
  id: 'pi_3O5ukJAhdp6UAp9j06aBXfWs',
  object: 'payment_intent',
  amount: 100,
  amount_capturable: 0,
  amount_details: { tip: {} },
  amount_received: 100,
  application: null,
  application_fee_amount: null,
  automatic_payment_methods: { allow_redirects: 'always', enabled: true },
  canceled_at: null,
  cancellation_reason: null,
  capture_method: 'automatic',
  client_secret: 'pi_3O5ukJAhdp6UAp9j06aBXfWs_secret_gwuvCmOaGgcC986qemhq3Iqjc',
  confirmation_method: 'automatic',
  created: 1698431219,
  currency: 'usd',
  customer: null,
  description: 'Sales',
  invoice: null,
  last_payment_error: null,
  latest_charge: 'ch_3O5ukJAhdp6UAp9j0xjZQ2Hl',
  livemode: false,
  metadata: {},
  next_action: null,
  on_behalf_of: null,
  payment_method: 'pm_1O5ukIAhdp6UAp9jV4bO35aw',
  payment_method_configuration_details: null,
  payment_method_options: {
    card: {
      installments: null,
      mandate_options: null,
      network: null,
      request_three_d_secure: 'automatic',
    },
  },
  payment_method_types: ['card'],
  processing: null,
  receipt_email: null,
  review: null,
  setup_future_usage: null,
  shipping: null,
  source: null,
  statement_descriptor: null,
  statement_descriptor_suffix: null,
  status: 'succeeded',
  transfer_data: null,
  transfer_group: null,
};

// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.

const createStripeCheckout = async (req, res) => {
  let { userId, cartItems } = req.body;
  const customer = await stripe.customers.create({
    metadata: {
      userId,
      cart: JSON.stringify(cartItems),
    },
  });

  const line_items = {
    price_data: {
      currency: 'usd',
      product_data: {
        name: cartItems.name,
        images: cartItems.images,
        description: cartItems.roomType, // check
        // description: 'Hotel reservation', // check
        metadata: {
          id: cartItems._id,
        },
      },
      unit_amount: cartItems.totalPrice * 100, // conversion to cents
    },
    quantity: 1,
  };

  const session = await stripe.checkout.sessions.create({
    // payment_method_types: ['card'],
    payment_method_types: ['card'],
    phone_number_collection: {
      enabled: true,
    },
    line_items,
    mode: 'payment',
    customer: customer.id,
    success_url: `${process.env.FRONTEND_URL}/paySucess`,
    cancel_url: `${process.env.FRONTEND_URL}/payFailed`,
  });

  // res.redirect(303, session.url);
  res.send({ url: session.url });
};

//============={YANDEX {Yokassa} PAYMENTS}================================

//createPayment
//https://yookassa.ru/developers/api#create_payment
const createPayment = asyncHandler(async (req, res) => {
  // const user = await User.findById(req.user._id); // get userId from "protect middleware"
  const { amount, currency, paymentMethod, description } = req.body;

  console.log({ amount: amount });
  const payment = await yooKassa.createPayment({
    amount: {
      value: amount,
      currency,
    },
    payment_method_data: {
      type: paymentMethod,
    },
    confirmation: {
      type: 'redirect',
      // return_url: 'https://yookassa.ru/',
      return_url: 'http://localhost:5173/paySuccess',
      // return_url: "https://www.merchant-website.com/return_url"
    },
    description,
  });

  if (payment) {
    res.json(payment);
  }
});

// payment_id = '215d8da0-000f-50be-b000-0003308c89be'
//payment information
//https://yookassa.ru/developers/api#get_payment
const getPayment = asyncHandler(async (req, res) => {
  // const user = await User.findById(req.user._id); // get userId from "protect middleware"
  const { payment_id } = req.body;

  console.log({ amount: amount });
  const payment = await yooKassa.getPayment({
    payment_id: payment_id,
  });

  if (payment) {
    res.json(payment);
  }
});

//payment information
//https://yookassa.ru/developers/api#capture_payment
const capturePayment = asyncHandler(async (req, res) => {
  // const user = await User.findById(req.user._id); // get userId from "protect middleware"
  const { payment_id, amount, currency, paymentMethod, description } = req.body;

  console.log({ amount: amount });
  const payment = await yooKassa.capturePayment({
    payment_id,
    amount: {
      value: amount,
      currency,
    },
  });

  if (payment) {
    res.json(payment);
  }
});

//payment information
//https://yookassa.ru/developers/api#capture_payment
const cancelPayment = asyncHandler(async (req, res) => {
  // const user = await User.findById(req.user._id); // get userId from "protect middleware"
  const { payment_id } = req.body;

  const payment = await yooKassa.cancelPayment({
    payment_id,
  });

  if (payment) {
    res.json(payment);
  }
});

//payment information
//https://yookassa.ru/developers/api#create_refund
const createRefund = asyncHandler(async (req, res) => {
  // const user = await User.findById(req.user._id); // get userId from "protect middleware"
  const { payment_id, amount, currency } = req.body;

  console.log({ amount: amount });
  const refund = await yooKassa.createRefund({
    amount: {
      value: amount,
      currency,
    },
    payment_id,
  });

  if (refund) {
    res.json(refund);
  }
});

//refund
//https://yookassa.ru/developers/api#get_refund
const getRefund = asyncHandler(async (req, res) => {
  // const user = await User.findById(req.user._id); // get userId from "protect middleware"
  const { refund_id } = req.body;

  const refund = await yooKassa.getRefund({
    refund_id: refund_id,
  });

  if (refund) {
    res.json(refund);
  }
});

const createYandexPayBuy = asyncHandler(async (req, res) => {
  // const user = await User.findById(req.user._id); // get userId from "protect middleware"
  const { amount, currency, paymentMethod, description } = req.body;
  const successId = '1'; // new Idea
  console.log({ amount, currency, paymentMethod, description });
  console.log('status: inprogress');
  const payment = await yooKassa.createPayment({
    amount: {
      value: amount,
      currency,
    },
    payment_method_data: {
      type: paymentMethod,
    },
    confirmation: {
      type: 'redirect',
      return_url: `${process.env.FRONTEND_URL}/buyCard/${successId}`,
      // return_url: `${process.env.FRONTEND_URL}/testCardPayments/${successId}`,
    },
    description,
  });

  if (payment) {
    res.json(payment);
  }
});

const createYandexPaySell = asyncHandler(async (req, res) => {
  // const user = await User.findById(req.user._id); // get userId from "protect middleware"
  const { amount, currency, paymentMethod, description } = req.body;
  const successId = '1'; // new Idea
  console.log({ amount: amount });
  const payment = await yooKassa.createPayment({
    amount: {
      value: amount,
      currency,
    },
    payment_method_data: {
      type: paymentMethod,
    },
    confirmation: {
      type: 'redirect',
      return_url: `${process.env.FRONTEND_URL}/sellCard/${successId}`,
      // return_url: `${process.env.FRONTEND_URL}/testCardPayments/${successId}`,
    },
    description,
  });

  if (payment) {
    res.json(payment);
  }
});

module.exports = {
  stripePay,
  createStripeCheckout,
  createYandexPayBuy,
  createYandexPaySell,
};
