import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import PaymentForm from './PaymentForm';

// const PUBLIC_KEY = "pk_test_rgWMA3zxjAtwaB6iV8b5W40x"

const PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer(props) {
  const { amount, setIsPaymentCompleted } = props;
  // const { amount } = props;


  console.log({ amount: amount });
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm
        amount={amount}
        setIsPaymentCompleted={setIsPaymentCompleted}
      />
    </Elements>
  );
}
