import React, { useEffect, useState } from 'react';
import { BiSolidLockAlt } from 'react-icons/bi';
import { RiFileWarningFill } from 'react-icons/ri';
import { updateTransactionsAutomatically } from '../services/apiService';

export const SendFundCash = (props) => {
  const { txData, transactionRates } = props;

  const [showpin, setshowPin] = useState(false);

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
    await updateTransactionsAutomatically(userData);
  };

  const sendFund = (
    <div className="flex justify-center rounded-lg bg-white shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[320px] xs:w-[340px] md:w-[500px] p-4">
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[8px] md:gap-[12px]">
          <div className="flex flex-row gap-4 mt-[24px]">
            <div className="text-[18px] md:text-[24px] font-extrabold leading-[32px] inline-block">
              Send funds to the dispatcher below
            </div>
          </div>
          <div className="flex bg-lightslategray-300 md:w-[452px] w-[300px] h-px" />
        </div>

        <div className="flex flex-col w-[300px] md:w-[452px] gap-[8px]">
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
              Blendery dispatcher
            </div>
            <div className="flex flex-col justify-start w-[50%]">
              <div className="text-base leading-[24px] text-gray-300 w-[298px]">
                Id: {txData?.dispatcherId}
              </div>
              <div className="text-xs leading-[16px] text-limegreen inline-block">
                location: {txData?.city}
              </div>
              <div className="flex flex-row gap-2 mt-2">
                {showpin ? (
                  <div
                    className=" cursor-pointer flex flex-row justify-center items-center bg-bgPrimary hover:opacity-90 text-white h-[49px] shrink-0 rounded w-[70%]"
                    onClick={() => setshowPin(false)}
                  >
                    <div className="flex flex-row gap-2">
                      <div className="leading-[20px] inline-block">
                        {txData?.pin}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className=" cursor-pointer flex flex-row justify-center items-center bg-bgPrimary hover:opacity-90 text-white h-[49px] shrink-0 rounded w-[70%]"
                    onClick={() => setshowPin(true)}
                  >
                    <div className="flex flex-row gap-2">
                      {/* <SiAuthelia size={18} color="#ffffff" /> */}
                      <BiSolidLockAlt size={18} color="#ffffff" />

                      <div className="leading-[20px] inline-block">Pin</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row bg-orangeLight rounded p-1 md:w-[452px] w-[300px]">
          <div className="ml-1 flex justify-center items-center w-[24px] flex-shrink-0">
            {' '}
            <RiFileWarningFill color="#FFB000" size={15} />{' '}
          </div>
          <div className="text-xs leading-[14.4px] text-darkslategray-200 inline-block w-[424px]">
            {/* Please confirm the security pin from the dispatcher. */}
            Please do not disclose this pin to anyone except the dispatcher
          </div>
        </div>
        <div className="flex bg-lightslategray-300 md:w-[452px] w-[300px] h-px" />
        {/* ======================={Begin to monitor transaction from here}==================================================== */}
        <div className="flex flex-row justify-end">
          <div
            className="cursor-pointer flex flex-row justify-center items-center bg-bgPrimary hover:opacity-90 text-white h-[49px] shrink-0 rounded w-[30%]"
            onClick={updateTransaction}
          >
            Paid
          </div>
        </div>

        <div className="flex flex-row w-full" />
      </div>
    </div>
  );

  const dispatcherCard = (
    <div className="flex justify-center rounded-lg bg-white shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[320px] xs:w-[340px] md:w-[500px] p-4">
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[8px] md:gap-[12px]">
          <div className="flex flex-row gap-4 mt-[24px]">
            <div className="text-smi leading-[22px] text-darkgray-100 inline-block w-[50%]">
              Blendery dispatcher
            </div>
          </div>
          <div className="flex bg-lightslategray-300 md:w-[452px] w-[300px] h-px" />
        </div>

        <div className="flex flex-col w-[300px] md:w-[452px] gap-[8px]">
          <div className="flex flex-row">
            <div className="text-smi leading-[22px] text-darkgray-100 inline-block w-[50%]">
              Amount
            </div>
            <div className="flex flex-row justify-start gap-1 w-[50%]">
              <div className="text-base leading-[24px] text-gray-300 inline-block">
                {txData?.fValue} {txData?.fToken?.symbol.toUpperCase()}
              </div>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="text-smi leading-[22px] text-darkgray-100 inline-block w-[50%]">
              Service provider
            </div>
            <div className="flex flex-col justify-start w-[50%]">
              <div className="text-xs leading-[16px] text-limegreen inline-block">
                {'Blendery Pay'}
              </div>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="text-smi leading-[22px] text-darkgray-100 inline-block w-[50%]">
              Your address {`(${txData?.tToken?.symbol.toUpperCase()})`}
            </div>
            <div className="flex flex-col justify-start w-[50%]">
              <div className="text-xs leading-[16px] text-green-600 inline-block">
                {txData?.userAddress && txData?.userAddress?.substring(0, 22)}
                <br />
                {txData?.userAddress &&
                  txData?.userAddress?.substring(
                    22,
                    txData?.userAddress.length
                  )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row rounded bg-gray-100 p-2 md:w-[452px] w-[300px]">
          <div className="ml-1 flex justify-center items-center w-[24px] flex-shrink-0">
            {' '}
          </div>
          <div className="text-xs leading-[14.4px] text-darkslategray-200 inline-block w-[424px]">
            We are currently connecting you with a dispatcher.
          </div>
        </div>
        <div className="flex bg-lightslategray-300 md:w-[452px] w-[300px] h-px" />
        <div className="flex flex-row justify-center items-center">
          <div className="cursor-pointer flex flex-row justify-center items-center bg-bgPrimary hover:opacity-90 text-white h-[49px] shrink-0 rounded w-full">
            Please hold ...
          </div>
        </div>

        <div className="flex flex-row w-full" />
      </div>
    </div>
  );
  // return <>{sendFund}</>;
  return <>{txData?.dispatcherTelegram ? sendFund : dispatcherCard}</>;
};
