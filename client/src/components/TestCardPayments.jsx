import React, { useEffect, useState } from 'react';
import { RxCopy } from 'react-icons/rx';
import { RiFileWarningFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  updateTransactionsAutomatically,
  getUserTransactions,
  getTransactionByTxId,
} from '../redux/features/transaction/transactionSlice';
import { toast } from 'react-toastify';

import StripeContainer from '../pages/payment/StripeContainer';
import YandexPayBuy from '../pages/payment/YandexPayBuy';
import YandexPaySell from '../pages/payment/YandexPaySell';

import {
  apple,
  mastercard,
  visacard,
  qrcode,
  usdt,
  mir,
  unionpay,
} from '../assets/payOptions';

const paymentOptions = [
  {
    name: 'Stripe',
    logo: '/stripe.png',
    // bgClass: 'bg-gray-200',
  },
  {
    name: 'YooMoney',
    logo: '/yoomoney.png',
    // bgClass: 'bg-gray-200',
  },
  {
    name: 'Stripe',
    logo: '/stripe.png',
    // bgClass: 'bg-gray-200',
  },
];

export const Providers = (props) => {
  const { provider } = props;
  const newRate = (
    <div className="flex flex-row justify-between items-center w-full">
      <div className="flex flex-row justify-center items-center gap-1">
        <div
          // className={`${
          //   provider?.bgClass ? provider?.bgClass : 'bg-gray-100 rounded'
          // }`}

          className={`${
            provider?.bgClass ? provider?.bgClass : 'bg-gray-100 rounded'
          }`}
        >
          <img src={provider?.logo} alt="" className="h-[25px] w-$ p-1" />
        </div>
      </div>

      {/* <div className="h-3 py-2">{provider?.name}</div> */}
    </div>
  );
  return <>{newRate}</>;
};

export const TestCardPayments = () => {
  const { id } = useParams();

  console.log({ sucessId: id });

  const dispatch = useDispatch();

  const txData = {
    _id: '653bc9d664e0481f264f191b',
    user: '6534f4f01ba02cbbdc82cff8',
    country: 'France',
    city: null,
    orderNo: 'EBXQRCIK',
    txId: 'EBXQRCIK',
    userAddress: '18e8GDFHWPnuLkbTEbKztzrN91G9SQMBwR',
    blenderyAddress: '13oZF3sVyCfSaBuc89g3thmwem13Xc6taz',
    fToken: {
      _id: '65284381082f99ac1aef0112',
      id: 'British Pound Sterling',
      symbol: 'gbp',
      price_symbol: 'gbp',
      name: 'British Pound Sterling',
      unit: '£',
      value: 28079.145,
      type: 'fiat',
      image:
        'https://res.cloudinary.com/datkh2oxv/image/upload/v1697491011/blendery/flags/gbp.png',
      tokenUrl:
        'https://res.cloudinary.com/datkh2oxv/image/upload/v1697491011/blendery/flags/gbp.png',
      updatedAt: '2023-10-27T11:53:31.033Z',
    },
    tToken: {
      _id: '6528436c082f99ac1aef0108',
      id: 'bitcoin',
      symbol: 'btc',
      name: 'Bitcoin',
      image:
        'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
      current_price: 31919,
      market_cap: '612843866806',
      market_cap_rank: '1',
      fully_diluted_valuation: '659238160447',
      total_volume: '29751642831',
      high_24h: '31819',
      low_24h: '29841',
      price_change_24h: '2067.95',
      price_change_percentage_24h: '6.92761',
      market_cap_change_24h: '29681356873',
      market_cap_change_percentage_24h: '5.08972',
      circulating_supply: '19522112',
      total_supply: '21000000',
      max_supply: '21000000',
      ath: '69045',
      ath_change_percentage: '-53.771',
      ath_date: '2021-11-10T14:24:11.849Z',
      atl: '67.81',
      atl_change_percentage: '46971.48796',
      atl_date: '2013-07-06T00:00:00.000Z',
      roi: null,
      last_updated: '2023-10-23T22:20:16.726Z',
      updatedAt: '2023-10-23T22:31:03.910Z',
      chain: 'Bitcoin',
    },
    fValue: '1',
    tValue: '0.500',
    service: 'buy',
    subService: 'buyCard',
    youSend: 1,
    youGet: 0.99,
    processingFee: 0.01,
    exchangeRate: '0.500',
    pin: '882603',
    dispatcherId: 'A7455',
    location: null,
    provider: 'BlenderyPay',
    providerUrl: 'https://blendery.io',
    fallbackUrl: '',
    telegram: '',
    phone: '',
    chain: '',
    chainId: '',
    timeLeft: '2023-10-27T16:31:50.785Z',
    percentageProgress: 4,
    status: 'Pending',
    amount: '15959.5',
    isAmountMatched: false,
    networkName: 'Testnet',
    managerChanged: false,
    createdAt: '2023-10-27T14:31:50.787Z',
    updatedAt: '2023-10-27T16:11:13.206Z',
    __v: 0,
  };
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;

  // const txId = localStorage.getItem('txId')
  //   ? JSON.parse(localStorage.getItem('txId'))
  //   : null;

  const txId = txData?._id;
  const [paymentMethod, setPaymentMethod] = useState(paymentOptions[0]);
  const [isPaymentCompleted, setIsPaymentCompleted] = useState(false);

  console.log({ isPaymentCompleted: isPaymentCompleted });
  const [paymentUrl, setPaymentUrl] = useState(null);
  console.log({ paymentUrl: paymentUrl }); // redirect url for yandex pay
  const isPaidL = localStorage.getItem('isPaid')
    ? JSON.parse(localStorage.getItem('isPaid'))
    : false;
  const [isPaid, setIsPaid] = useState(isPaidL);

  // const txData = useSelector((state) => state.transaction?.transactionByTxId); // from transaction received by id

  useEffect(() => {
    if (id) {
      setIsPaid(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('isPaid', JSON.stringify(isPaid));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaid]);
  useEffect(() => {
    if (isPaid) {
      //yandex payment sucessfull
      updateTransaction();
      // setTimeout(() => {
      //   setIsPaymentCompleted(false);
      // }, [2000]);
      setIsPaid(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaid]);

  // useEffect(() => {
  //   if (isPaymentCompleted) {
  //     //Stripe payment sucessfull
  //     updateTransaction();
  //     setTimeout(() => {
  //       setIsPaymentCompleted(false);
  //     }, [2000]);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isPaymentCompleted]);

  //========{begin to monitor transaction after this click}=========================
  const updateTransaction = async () => {
    // const userData = {
    //   id: txData?._id,
    //   status: 'Pending',
    //   percentageProgress: 4,
    // };

    // dispatch(updateTransactionsAutomatically(userData));
    // setTimeout(() => {
    //   dispatch(getTransactionByTxId(txId));
    //   dispatch(getUserTransactions());
    //   window.location.reload();
    // }, 1000); // after 1 sec
    //deactivate
    return;
  };

  const sendFund = (
    <div className="flex justify-center rounded-lg bg-white shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[375px] md:w-[500px] p-4">
      <div className="flex flex-col gap-[24px]">
        {/* <div className="flex flex-col gap-[12px] md:gap-[24px]"> */}
        <div className="flex flex-col gap-[8px] md:gap-[12px]">
          <div className="flex flex-row gap-4 mt-[24px]">
            <div className="text-[18px] md:text-[24px] font-extrabold leading-[32px] inline-block">
              Pay with your favorite gateway
            </div>
          </div>
          <div className="flex bg-lightslategray-300 md:w-[452px] w-[370px] h-px" />
        </div>

        <div className="flex flex-col w-[370px] md:w-[452px] gap-[8px]">
          <div className="flex flex-row">
            <div className="text-smi leading-[22px] text-darkgray-100 inline-block w-[50%]">
              Amount
            </div>
            <div className="flex flex-row justify-start gap-1 w-[50%]">
              <div className="text-base leading-[24px] text-gray-300 inline-block">
                {txData?.fValue} {txData?.fToken?.symbol}
              </div>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="text-smi leading-[22px] text-darkgray-100 inline-block w-[50%]">
              Your address {`(${txData?.tToken?.symbol})`}
            </div>
            <div className="flex flex-col justify-start w-[50%]">
              <div className="text-base leading-[24px] text-gray-300 w-[298px]">
                {txData?.userAddress && txData?.userAddress?.substring(0, 22)}
                <br />
                {txData?.userAddress &&
                  txData?.userAddress?.substring(
                    22,
                    txData?.userAddress.length
                  )}
              </div>
              <div className="text-xs leading-[16px] text-limegreen inline-block">
                blockchain: {txData?.tToken?.chain}
              </div>
              <div className="flex flex-row gap-2 mt-2">
                <div className=" cursor-pointer flex flex-row justify-center items-center bg-bgPrimary hover:opacity-90 text-white h-[49px] shrink-0 rounded w-[70%]">
                  <div className="flex flex-row gap-2">
                    <RxCopy size={15} color="#ffffff" />
                    <div className="leading-[20px] inline-block">
                      copy address
                    </div>
                  </div>
                </div>
                {/* ======================={Begin to monitor transaction from here}==================================================== */}
                <div
                  className="cursor-pointer flex flex-row justify-center items-center bg-bgSecondary hover:opacity-90 text-bgPrimary h-[49px] shrink-0 rounded w-[30%]"
                  onClick={updateTransaction}
                >
                  Next
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row bg-orangeLight rounded p-1 md:w-[452px] w-[370px]">
          <div className="ml-1 flex justify-center items-center w-[24px] flex-shrink-0">
            {' '}
            <RiFileWarningFill color="#FFB000" size={15} />{' '}
          </div>
          <div className="text-xs leading-[14.4px] text-darkslategray-200 inline-block w-[424px]">
            Please note that you can send funds to the address above only once.
          </div>
        </div>
        <div className="flex bg-lightslategray-300 md:w-[452px] w-[370px] h-px" />
        {txData?.country !== 'Russia' ? (
          <div
            className="flex flex-row justify-center items-center"
            onClick={() => {
              setPaymentMethod(paymentOptions[1]?.name);
            }}
          >
            <div className="cursor-pointer flex flex-row justify-between items-center bg-bgPrimary hover:opacity-90 text-white h-[49px] shrink-0 rounded w-full">
              {/* <span className="flex flex-row ml-6">YooMoney</span> */}
              <span className="flex flex-row ml-6">
                <Providers provider={paymentOptions[1]} />
              </span>

              <div className="flex flex-row justify-center items-center gap-1 mr-6">
                <img
                  src={mastercard}
                  alt="star"
                  className="w-7 h-7 object-contain rounded-lg"
                />
                <img
                  src={visacard}
                  alt="star"
                  className="w-10 h-10 object-contain rounded-lg"
                />
                <img
                  src={mir}
                  alt="star"
                  className="w-8 h-4 object-contain rounded bg-white"
                />
                <img
                  src={unionpay}
                  alt="star"
                  className="w-6 h-6 object-contain rounded-lg"
                />
              </div>
            </div>
          </div>
        ) : (
          <div
            className="flex flex-row justify-center items-center"
            onClick={() => {
              setPaymentMethod(paymentOptions[0]?.name);
            }}
          >
            <div className="cursor-pointer flex flex-row justify-between items-center bg-bgPrimary hover:opacity-90 text-white h-[49px] shrink-0 rounded w-full">
              {/* <span className="flex flex-row ml-6">Stripe</span> */}
              <span className="flex flex-row ml-6">
                <Providers provider={paymentOptions[0]} />
              </span>

              <div className="flex flex-row justify-center items-center gap-1 mr-6">
                <img
                  src={mastercard}
                  alt="star"
                  className="w-7 h-7 object-contain rounded-lg"
                />
                <img
                  src={visacard}
                  alt="star"
                  className="w-10 h-10 object-contain rounded-lg"
                />
              </div>
            </div>
          </div>
        )}
        {/* ======================{Stripe}================================= */}
        {/* <div
          className="flex flex-row justify-center items-center"
          onClick={() => {
            setPaymentMethod(paymentOptions[0]?.name);
          }}
        >
          <div className="cursor-pointer flex flex-row justify-between items-center bg-bgPrimary hover:opacity-90 text-white h-[49px] shrink-0 rounded w-full">
            <span className="flex flex-row ml-6">
              <Providers provider={paymentOptions[0]} />
            </span>

            <div className="flex flex-row justify-center items-center gap-1 mr-6">
              <img
                src={mastercard}
                alt="star"
                className="w-7 h-7 object-contain rounded-lg"
              />
              <img
                src={visacard}
                alt="star"
                className="w-10 h-10 object-contain rounded-lg"
              />
            </div>
          </div>
        </div> */}
        {/* ======================{Yoomoney}================================= */}
        {/* <div
          className="flex flex-row justify-center items-center"
          onClick={() => {
            setPaymentMethod(paymentOptions[1]?.name);
          }}
        >
          <div className="cursor-pointer flex flex-row justify-between items-center bg-bgPrimary hover:opacity-90 text-white h-[49px] shrink-0 rounded w-full">
            <span className="flex flex-row ml-6">
              <Providers provider={paymentOptions[1]} />
            </span>

            <div className="flex flex-row justify-center items-center gap-1 mr-6">
              <img
                src={mastercard}
                alt="star"
                className="w-7 h-7 object-contain rounded-lg"
              />
              <img
                src={visacard}
                alt="star"
                className="w-10 h-10 object-contain rounded-lg"
              />
            </div>
          </div>
        </div> */}

        {paymentMethod === 'Stripe' ? (
          <>
            <div className="mt-10 text-black">
              <StripeContainer
                amount={txData?.fValue}
                setIsPaymentCompleted={setIsPaymentCompleted}
              />
            </div>
          </>
        ) : null}

        {paymentMethod === 'YooMoney' ? (
          <>
            <div className="mt-10">
              <YandexPayBuy
                amount={txData?.fValue}
                setPaymentUrl={setPaymentUrl}
              />
            </div>
          </>
        ) : null}
        {/* {txData?.country === 'Russia' ? (
          <>
            <div className="mt-10">
              <YandexPayBuy
                amount={txData?.fValue}
                setPaymentUrl={setPaymentUrl}
              />
            </div>
          </>
        ) : (
          <>
            <div className="mt-10 text-black">
              <StripeContainer
                amount={txData?.fValue}
                setIsPaymentCompleted={setIsPaymentCompleted}
              />
            </div>
          </>
        )} */}

        <div className="flex flex-row w-full" />
      </div>
    </div>
  );
  return <>{sendFund}</>;
};
