import React, { useEffect, useState } from 'react';

import {
  createYandexPayBuy,
  createYandexPaySell,
} from '../../services/apiService';

const YandexPaySell = (props) => {
  const {
    amount,
    currency,
    paymentMethod,
    description,
    setPaymentUrl,
    // setIsPaymentCompleted,
  } = props;
  const [redirect, setRedirect] = useState(false);
  const [confirmationUrl, setConfirmationUrl] = useState(null);
  const [confirmationData, setConfirmationData] = useState(null);
  console.log({ confirmationData: confirmationData });

  // console.log({ paymentStatus: paymentStatus });

  useEffect(() => {
    if (redirect) {
      setTimeout(() => {
        window.location.href = confirmationUrl;
        setRedirect(false);
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redirect]);

  //   {
  //   "amount": "200", "currency":"RUB", "paymentMethod":"bank_card","description": "Заказ №72"
  // }

  const handleGetConfirmationUrl = async () => {
    const userData = {
      amount,
      currency: currency ? currency : 'RUB', // convert currency value to RUB
      paymentMethod: paymentMethod ? paymentMethod : 'bank_card',
      description: description ? description : 'sale',
    };
    try {
      const data = await createYandexPaySell(userData);
      console.log({ userData: data });
      if (data) {
        setConfirmationUrl(data?.confirmation?.confirmation_url);
        setConfirmationData(data);
        setPaymentUrl(data?.confirmation?.confirmation_url);
        // setIsBookingVisible(false);
        // setIsPaymentCompleted(true); //new

        setRedirect(true);
      }
    } catch (e) {
      alert('Login failed');
    }
  };

  const sendFund = (
    <>
      <button
        className="primary bg-bgPrimary hover:bg-indigo-500 mt-4"
        onClick={handleGetConfirmationUrl}
      >
        Pay {amount} {currency ? currency : 'RUB'}
      </button>
    </>
  );

  return <>{sendFund}</>;
};

export default YandexPaySell;

// curl https://api.yookassa.ru/v3/payments \
//   -X POST \
//   -u <Shop ID>:<Secret Key> \
//   -H 'Idempotence-Key: <Idempotence Key>' \
//   -H 'Content-Type: application/json' \
//   -d '{
//         "amount": {
//           "value": "100.00",
//           "currency": "RUB"
//         },
//         "capture": true,
//         "confirmation": {
//           "type": "redirect",
//           "return_url": "https://www.example.com/return_url"
//         },
//         "description": "Order No. 1"
//       }'
