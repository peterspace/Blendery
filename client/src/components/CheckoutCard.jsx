import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export const CheckoutCard = (props) => {
  const {
    setPercentageProgress,
    fTitle,
    tTitle,
    service,
    provider,
    fullName,
    bankName,
    cardNumber,
    phone,
  } = props;

  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  /*********************************************     REDUX STATES    **************************************************** */
  /********************************************************************************************************************** */
  /********************************************************************************************************************** */

  const transactionRates = useSelector(
    (state) => state.transaction?.getTransactionRate
  );
  const youSend = transactionRates ? transactionRates?.youSend : 0;
  const youGet = transactionRates ? transactionRates?.youGet : 0;
  const processingFee = transactionRates ? transactionRates?.processingFee : 0;
  const networkFee = transactionRates ? transactionRates?.networkFee : 0;
  const serviceFee = transactionRates ? transactionRates?.serviceFee : 0;
  const tValue = transactionRates ? transactionRates?.tValueFormatted : 0;
  const exchangeRate = transactionRates ? transactionRates?.exchangeRate : 0;
  //===={To be added}========
  const estimatedGas = transactionRates ? transactionRates?.estimatedGas : 0;
  console.log({service: service})
  console.log({provider: provider})


  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  /*********************************************     LOCAL STATES    **************************************************** */
  /********************************************************************************************************************** */
  /********************************************************************************************************************** */

  const fToken = localStorage.getItem('fTokenE')
    ? JSON.parse(localStorage.getItem('fTokenE'))
    : null;

  const tToken = localStorage.getItem('tTokenE')
    ? JSON.parse(localStorage.getItem('tTokenE'))
    : null;

  const fValue = localStorage.getItem('fValueE')
    ? JSON.parse(localStorage.getItem('fValueE'))
    : '1';
  const userAddress = localStorage.getItem('userAddress')
    ? JSON.parse(localStorage.getItem('userAddress'))
    : null;

  const checkout = (
    <div className="flex justify-center rounded-lg bg-white shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[320px] xs:w-[340px] md:w-[500px] p-4">
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[8px] md:gap-[12px]">
          <div className="flex flex-row justify-between mt-[24px]">
            <div className="text-[18px] md:text-[24px] font-extrabold leading-[32px] inline-block">
              Checkout
            </div>
            <div
              className="cursor-pointer flex flex-row justify-center items-center bg-whitesmoke-100 hover:opacity-90 text-mediumspringgreen shrink-0 rounded px-6 py-3"
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
                  blockchain: {fToken?.chain}
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
                  blockchain: {tToken?.chain}
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
              <div className="leading-[20px] text-darkgray-200 inline-block">
                Processing fee
              </div>
              <div className="text-base leading-[24px] text-black inline-block w-40">
                {processingFee} {tToken?.symbol.toUpperCase()}
              </div>
              <div className="text-3xs leading-[12px] text-darkgray-100 inline-block w-[216px]">
                The exchange fee is already included in the displayed amount
                you’ll get
              </div>
            </div>
            <div className="flex flex-col w-[50%]">
              <div className="text-smi leading-[20px] text-darkgray-200 inline-block">
                Payment Method
              </div>
              <div className="text-base leading-[24px] text-black inline-block">
                {provider?.name}
              </div>
              <div className="text-3xs leading-[12px] text-darkgray-100 inline-block w-52">
                {service} via card is powered by Blendery
              </div>
            </div>
          </div>
        </div>
        <div className="flex bg-lightslategray-300 md:w-[452px] w-[300px] h-px" />
        {/* ==========================={Recepient address}==================================== */}
        <div className="flex flex-col w-[300px] md:w-[452px] gap-[8px]">
          <div className="flex flex-col gap-4  md:flex-row md:gap-0">
            <div className="flex flex-col w-[50%]">
              {service === 'buy' && (
                <div className="leading-[20px] text-darkgray-200 inline-block w-[126px]">
                  {`Receiver's address`}
                </div>
              )}
              {service === 'sell' && (
                <div className="leading-[20px] text-darkgray-200 inline-block w-[126px]">
                  {`Sender's address`}
                </div>
              )}

              <div className="text-base leading-[24px] text-black inline-block w-[237px]">
                {userAddress && userAddress?.substring(0, 22)}
                <br />
                {userAddress && userAddress?.substring(22, userAddress.length)}
              </div>
            </div>
            <div className="flex flex-col w-[50%]">
              <div className="leading-[20px] text-darkgray-200 inline-block">
                Exchange rate
              </div>
              <div className="text-base leading-[24px] text-black inline-block w-[177px]">
                {1} {fToken?.symbol.toUpperCase()} ~ {exchangeRate}{' '}
                {tToken?.symbol.toUpperCase()}
              </div>
            </div>
          </div>
        </div>
        {/* ==========================={Banking information}==================================== */}

        {service === 'sell' && (
          <>
            {provider?.name === 'Phone' && (
              <>
                <div className="flex flex-col w-[300px] md:w-[452px] gap-[8px]">
                  <div className="flex flex-col gap-4  md:flex-row md:gap-0">
                    <div className="flex flex-col w-[50%]">
                      <div className="leading-[20px] text-darkgray-200 inline-block">
                        Full Name
                      </div>
                      <div className="text-base leading-[24px] text-black inline-block w-40">
                        {fullName ? fullName.toUpperCase() : ''}
                      </div>
                    </div>
                    <div className="flex flex-col w-[50%]">
                      <div className="leading-[20px] text-darkgray-200 inline-block">
                        Phone
                      </div>
                      <div className="text-base leading-[24px] text-black inline-block w-40">
                        {phone ? phone : ''}
                      </div>
                    </div>
                    <div className="flex flex-col w-[50%]">
                      <div className="leading-[20px] text-darkgray-200 inline-block">
                        Bank Name
                      </div>
                      <div className="text-base leading-[24px] text-black inline-block w-40">
                        {bankName ? bankName : ''}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            {provider?.name === 'Card' && (
              <>
                <div className="flex flex-col w-[300px] md:w-[452px] gap-[8px]">
                  <div className="flex flex-col gap-4  md:flex-row md:gap-0">
                    <div className="flex flex-col w-[50%]">
                      <div className="leading-[20px] text-darkgray-200 inline-block">
                        Full Name
                      </div>
                      <div className="text-base leading-[24px] text-black inline-block w-40">
                        {fullName ? fullName.toUpperCase() : ''}
                      </div>
                    </div>
                    <div className="flex flex-col w-[50%]">
                      <div className="leading-[20px] text-darkgray-200 inline-block">
                        Card Number
                      </div>
                      <div className="text-base leading-[24px] text-black inline-block w-40">
                        {cardNumber ? cardNumber : ''}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
        <div className="flex bg-lightslategray-300 md:w-[452px] w-[300px] h-px" />
        <div className="flex flex-row w-full" />
      </div>
    </div>
  );
  return <>{checkout}</>;
};
