import React, { useEffect } from 'react';
import { RxCopy } from 'react-icons/rx';
import { updateTransactionsAutomatically } from '../services/apiService';
import {
  apple,
  mastercard,
  visacard,
  qrcode,
  usdt,
  mir,
  unionpay,
} from '../assets/payOptions';

export const Providers = (props) => {
  const { provider } = props;
  const newRate = (
    <div className="flex flex-row justify-between items-center w-full">
      <div className="flex flex-row justify-center items-center gap-1">
        <div
          className={`${
            provider?.bgClass ? provider?.bgClass : 'bg-gray-100 rounded'
          }`}
        >
          <img src={provider?.logo} alt="" className="h-[25px] w-$ p-1" />
        </div>
      </div>
    </div>
  );
  return <>{newRate}</>;
};

export const SendFundCardBuy = (props) => {
  const { txData, transactionRates } = props;

  //========{begin to monitor transaction after this click}=========================
  // const updateTransaction = async () => {
  //   const userData = {
  //     id: txData?._id,
  //     status: 'Paid',
  //     percentageProgress: 4,
  //   };
  //   await updateTransactionsAutomatically(userData);
  // };

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
    await updateTransactionsAutomatically(userData);
  };

  const isSendFunds = (
    <div className="flex justify-center rounded-lg bg-white shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[375px] md:w-[500px] p-4">
      <div className="flex flex-col gap-[24px]">
        {/* <div className="flex flex-col gap-[12px] md:gap-[24px]"> */}
        <div className="flex flex-col gap-[8px] md:gap-[12px]">
          <div className="flex flex-row gap-4 mt-[24px]">
            <div className="text-[18px] md:text-[24px] font-extrabold leading-[32px] inline-block">
              Make Payment
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
              Your address {`(${txData?.tToken?.symbol.toUpperCase()})`}
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
            </div>
          </div>
        </div>
        <div className="flex bg-lightslategray-300 md:w-[452px] w-[370px] h-px" />

        <div className="flex flex-col">
          <div className="flex flex-row justify-end">
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
          <div className="cursor-pointer flex flex-row justify-center items-center bg-white hover:opacity-90 text-bgPrimary h-[49px] shrink-0 rounded w-full outline outline-bgPrimary outline-[1.5px]">
            <span className="flex flex-row ml-6">
              {`Pay ${
                txData?.fValue
              } ${txData?.fToken?.symbol.toUpperCase()} to the Blendery card number below`}
            </span>
          </div>
        </div>

        <div
          className="cursor-pointer flex flex-row justify-center gap-2 items-center bg-bgPrimary hover:opacity-90 text-white h-[49px] shrink-0 rounded w-full"
          onClick={() => {
            navigator.clipboard.writeText(txData?.blenderyCardNumber);
          }}
        >
          <span className="flex flex-row ml-6">
          Card Number: {txData?.blenderyCardNumber}
          </span>
          <RxCopy size={15} color="#ffffff" />
        </div>

        <div
          className="cursor-pointer flex flex-row justify-center gap-2 items-center bg-bgPrimary hover:opacity-90 text-white h-[49px] shrink-0 rounded w-full"
          // onClick={() => {
          //   navigator.clipboard.writeText(txData?.blenderyCardNumber);
          // }}
        >
          <span className="flex flex-row ml-6">
           Card Holder Name: Jason Mayor
          </span>
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
