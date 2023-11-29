import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import React, { useState } from 'react';
import Style from './payment.module.css';

import { stripeCheckOut } from '../../services/apiService';

const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      // iconColor: '#c4f0ff',
      iconColor: '#4f46e5',
      color: '#4f46e5',
      fontWeight: 500,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': { color: '#b4b4b4' },
      // ':-webkit-autofill': { color: '#ffffff' },
      '::placeholder': { color: '#b4b4b4' },
      // '::placeholder': { color: '#ffffff' },
    },
    invalid: {
      iconColor: '#e11d48',
      color: '#e11d48',
    },
  },
};

// #2563eb
/**
 *
 * stripe test Card
 *
 * Card number: 4242 4242 4242 4242
 * MM/YY: 04/24
 * CCV: 837
 * ZIP: 28976
 *
 */

export default function PaymentForm(props) {
  const { amount, setIsPaymentCompleted } = props;
  // const { amount } = props;

  const [success, setSuccess] = useState(false);

  const [newData, setNewData] = useState();

  console.log({ newData: newData });

  const stripe = useStripe();
  const elements = useElements();

  console.log({ amount: amount });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;

        let userData = {
          amount, // all amount in "cents" ==> 1usd = 100cents
          id,
        };

        const response = await stripeCheckOut(userData);

        if (response) {
          setNewData(response);
          setIsPaymentCompleted(true);
          setSuccess(true);
          // console.log('Successful payment');
          // console.log({ response: response });
          // if (response?.status === 'succeeded') {
          //   setIsPaymentCompleted(true);
          // }
          // //
          // setSuccess(true);
        }
      } catch (error) {
        console.log('Error', error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <>
      {!success ? (
        <form onSubmit={handleSubmit}>
          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          {/* <button>Pay</button> */}
          <button className="primary bg-bgPrimary hover:bg-indigo-500 mt-4">
            Pay ${amount}
          </button>
        </form>
      ) : null}
    </>
  );
}
