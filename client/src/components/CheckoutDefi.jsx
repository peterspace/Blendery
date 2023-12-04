import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import {
  useConnect,
  useAccount,
  useSwitchNetwork,
  useSigner,
  useBalance,
  useDisconnect,
} from 'wagmi';
export const CheckoutDefi = (props) => {
  const {
    setPercentageProgress,
    fTitle,
    tTitle,
    estimatedGas,
    chain,
    swappingData,
    fToken,
    tToken,
    fValue,
    tValue,
    exchangeRate,
  } = props;

  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  /*********************************************     REDUX STATES    **************************************************** */
  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  const { address, isConnected } = useAccount();
  const userAddress = address ? address : '';


  //===={To be added}========
  // const estimatedGas = transactionRates ? transactionRates?.estimatedGas : 0;
  const tx = swappingData ? swappingData?.tx : null;
  const from = tx?.from;
  const to = tx?.to; // OneInch
  const value = tx?.value; // raw fValue
  const gas = tx?.gas || 0;
  const gasPrice = tx?.gasPrice || 0;
  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  /*********************************************     LOCAL STATES    **************************************************** */
  /********************************************************************************************************************** */
  /********************************************************************************************************************** */

  const checkout = (
    <div className="flex justify-center rounded-lg bg-white shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[320px] xs:w-[340px] md:w-[500px] p-4">
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[8px] md:gap-[12px]">
          <div className="flex flex-row justify-between mt-[24px]">
            <div className="text-[18px] md:text-[24px] font-extrabold leading-[32px] inline-block">
              Checkout
            </div>
            <div
              className="cursor-pointer flex flex-row justify-center items-center bg-bgSecondary hover:opacity-90 text-bgPrimary shrink-0 rounded px-6 py-3"
              onClick={() => {
                setPercentageProgress(2);
              }}
            >
              Back
            </div>
          </div>
          <div className="flex bg-lightslategray-300 md:w-[452px] w-[300px] h-px" />
        </div>
        {/* ==========================={You send}==================================== */}
        <div className="flex flex-col w-[300px] md:w-[452px] gap-[8px]">
          <div className="flex flex-col gap-4  md:flex-row md:gap-0">
            <div className="flex flex-col w-[50%]">
              <div className="text-smi leading-[22px] text-darkgray-100 inline-block">
                {fTitle}
              </div>
              <div className="text-base leading-[24px] text-gray-300 inline-block">
                {fValue} {fToken?.symbol.toUpperCase()}
              </div>
              {fToken?.chain ? (
                <div className="text-xs leading-[16px] text-limegreen inline-block">
                  blockchain: {fToken?.chain.toUpperCase()}
                </div>
              ) : (
                <div className="text-xs leading-[16px] text-limegreen inline-block">
                  currency: {fToken?.symbol.toUpperCase()}
                </div>
              )}
            </div>
            <div className="flex flex-col w-[50%]">
              <div className="text-smi leading-[22px] text-darkgray-100 inline-block">
                {tTitle}
              </div>
              <div className="flex flex-row gap-2">
                <div className="text-base leading-[24px] text-gray-300 inline-block">
                  {'~'} {tValue} {tToken?.symbol.toUpperCase()}
                </div>
              </div>
              {tToken?.chain ? (
                <div className="text-xs leading-[16px] text-limegreen inline-block">
                  blockchain: {tToken?.chain.toUpperCase()}
                </div>
              ) : (
                <div className="text-xs leading-[16px] text-limegreen inline-block">
                  currency: {tToken?.symbol.toUpperCase()}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex bg-lightslategray-300 md:w-[452px] w-[300px] h-px" />
        {/* ==========================={Exchange fee}==================================== */}
        <div className="flex flex-col w-[300px] md:w-[452px] gap-[8px]">
          <div className="flex flex-col gap-4  md:flex-row md:gap-0">
            <div className="flex flex-col w-[50%]">
              <div className="leading-[20px] text-darkgray-200 inline-block w-[95px]">
                Exchange fee
              </div>
              <div className="text-base leading-[24px] text-black inline-block w-40">
                {Number(gasPrice) * Number(gas)} {tToken?.symbol.toUpperCase()}
              </div>
              <div className="text-3xs leading-[12px] text-darkgray-100 inline-block w-[216px]">
                The exchange fee is already included in the displayed amount
                you’ll get
              </div>
            </div>
            <div className="flex flex-col w-[50%]">
              <div className="text-smi leading-[20px] text-darkgray-200 inline-block">
                Estimated Gas Price
              </div>
              <div className="text-base leading-[24px] text-black inline-block">
                {`${estimatedGas && (estimatedGas / 10 ** 9).toString()} Gwei`}{' '}
                {chain?.symbol.toUpperCase()}
              </div>
              <div className="text-3xs leading-[12px] text-darkgray-100 inline-block w-52">
                The network fee is already included in the displayed amount
                you’ll get
              </div>
            </div>
          </div>
        </div>
        <div className="flex bg-lightslategray-300 md:w-[452px] w-[300px] h-px" />
        {/* ==========================={Recepient address}==================================== */}
        <div className="flex flex-col w-[300px] md:w-[452px] gap-[8px]">
          <div className="flex flex-col gap-4  md:flex-row md:gap-0">
            <div className="flex flex-col w-[50%]">
              <div className="leading-[20px] text-darkgray-200 inline-block w-[126px]">
                Recipient address
              </div>
              <div className="text-base leading-[24px] text-black inline-block w-[237px]">
                {userAddress && userAddress?.substring(0, 22)}
                <br />
                {userAddress && userAddress?.substring(22, userAddress.length)}
              </div>
            </div>
            <div className="flex flex-col w-[50%]">
              <div className="leading-[20px] text-darkgray-200 inline-block w-[101px]">
                Exchange rate
              </div>
              <div className="text-base leading-[24px] text-black inline-block w-[177px]">
                {1} {fToken?.symbol.toUpperCase()} ~ {exchangeRate}{' '}
                {tToken?.symbol.toUpperCase()}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row w-full" />
      </div>
    </div>
  );
  return <>{checkout}</>;
};
