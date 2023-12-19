import React, { useEffect, useState } from 'react';
import { RxCopy } from 'react-icons/rx';
import { RiFileWarningFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';

import {
  updateTransactionsAutomatically,
  updateOneBlockchainTransactionByIdService,
} from '../services/apiService';

import { toast } from 'react-toastify';
import StripeContainer from '../pages/payment/StripeContainer';
import YandexPayBuy from '../pages/payment/YandexPayBuy';

import {
  apple,
  mastercard,
  visacard,
  qrcode,
  // usdt,
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
      <div className="flex flex-row justify-center items-center p-2 gap-1">
        <div
          className={`${
            provider?.bgClass ? provider?.bgClass : 'bg-gray-100 rounded'
          }`}
        >
          <img src={provider?.logo} alt="" className="h-[25px] w-$ p-1" />
        </div>
      </div>

      <div className="h-3 py-2">{provider?.name}</div>
    </div>
  );
  return <>{newRate}</>;
};

export const SendFundCardSell = (props) => {
  const { txData, setRefetchTxData, transactionRates } = props;
  const [blockChainData, setBlockChainData] = useState();

  //========{begin to monitor transaction after this click}=========================
  const updateTransaction = async () => {
    const userData = {
      id: txData?._id,
      status: 'Paid',
      percentageProgress: 4,
      youSend: transactionRates?.youSend,
      youGet: transactionRates?.youGet,
      serviceFee: transactionRates?.serviceFee,
      networkFee: transactionRates?.networkFee,
      processingFee: transactionRates?.processingFee,
      exchangeRate: transactionRates?.exchangeRate,
      tValue: transactionRates?.tValue,
      amount: transactionRates?.amount,
      directValue: transactionRates?.directValue,
    };
    const response = await updateTransactionsAutomatically(userData);
    if (response?.status === 'Paid') {
      fetchUpdatedBlockchainData();
      setTimeout(() => {
        setRefetchTxData(true);
      }, 2000); // after 1 sec
    }
  };

  const fetchUpdatedBlockchainData = async () => {
    const userData = {
      id: txData?._id,
    };
    const response = await updateOneBlockchainTransactionByIdService(userData);
    setBlockChainData(response);
  };

  //========{begin to monitor transaction after this click}=========================

  const isSendFunds = (
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
              Blendery address {`(${txData?.fToken?.symbol})`}
            </div>
            <div className="flex flex-col justify-start w-[50%]">
              <div className="text-base leading-[24px] text-gray-300 w-[298px]">
                {txData?.blenderyAddress &&
                  txData?.blenderyAddress?.substring(0, 22)}
                <br />
                {txData?.blenderyAddress &&
                  txData?.blenderyAddress?.substring(
                    22,
                    txData?.blenderyAddress.length
                  )}
              </div>
              <div className="text-xs leading-[16px] text-limegreen inline-block">
                blockchain: {txData?.fToken?.chain}
              </div>
              <div className="flex flex-row gap-2 mt-2">
                <div
                  className="cursor-pointer flex flex-row justify-center items-center bg-bgPrimary hover:opacity-90 text-white h-[49px] shrink-0 rounded w-[70%]"
                  onClick={() => {
                    navigator.clipboard.writeText(txData?.blenderyAddress);
                  }}
                >
                  <div className="flex flex-row gap-2">
                    <RxCopy size={15} color="#ffffff" />
                    <div className="leading-[20px] inline-block">
                      copy address
                    </div>
                  </div>
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
        <div
          className="flex flex-row justify-center items-center h-[49px] cursor-pointer text-white bg-bgPrimary hover:bg-bgPrimaryHover focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded dark:bg-blue-600 dark:hover:bg-bgPrimary dark:focus:ring-bgPrimaryHover"
          onClick={updateTransaction}
        >
          Paid
        </div>
        <div className="flex bg-lightslategray-300 md:w-[452px] w-[370px] h-px" />
        <div className="flex flex-row w-full" />
      </div>
    </div>
  );

  return <>{isSendFunds}</>;
};
