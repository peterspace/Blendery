import React, { useEffect, useState } from 'react';
import { TfiTimer } from 'react-icons/tfi';
import { RxCopy } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { TimerFormat } from './TimerFormat';
import Countdown from './Countdown';

import { getTransactionByTxId } from '../redux/features/transaction/transactionSlice';

// 2hrs = 2 * 60 * 60 * 1000 ===> to milisecons
//defaultTime={2*60*60*100}

export const Timer = (props) => {
  const { txData } = props;

  // create logic for countdown timer
  const timer = (
    <div className="flex justify-center rounded-lg bg-white shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[276px] p-4">
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[10px]">
          <div className="flex flex-row gap-2 mt-2">
            <TfiTimer size={20} color="#b4b4b4" />
            {/* <div className="text-base leading-[24px] text-gray-300 inline-block w-[69px]">
              <TimerFormat duration={txData?.timeLeft} />
            </div> */}
            {txData?.status === 'Received' || txData?.service === 'defi' ? (
              <div className="text-base leading-[24px] text-gray-300 inline-block">
                {`-- : -- : --`}
              </div>
            ) : (
              <>
                {txData?.timeStatus === 'Expired' ? (
                  <div className="text-base leading-[24px] text-red-600 inline-block">
                    Expired
                  </div>
                ) : (
                  <>
                    {txData?.status === 'Completed' ? (
                      <div className="text-base leading-[24px] text-gray-300 inline-block">
                        {`-- : -- : --`}
                      </div>
                    ) : (
                      <div className="text-base leading-[24px] text-gray-300 inline-block">
                        <TimerFormat duration={txData?.timeLeft} />
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
          <div className="text-xs leading-[18px] text-darkslategray-100 inline-block">
            Time left to send {txData?.fValue}{' '}
            {txData?.fToken?.symbol.toUpperCase()}
          </div>
          <div className="flex bg-lightslategray-300 w-[276px] h-px" />
          <div className="">
            <div className="flex flex-row gap-2 mt-2">
              <div className="leading-[20px] text-gray-300 inline-block">
                {txData?.orderNo}
              </div>
              <div
                className="ccursor-pointer text-[#b4b4b4] hover:text-darkslategray-100 hover:-translate-y-0.5 transform transition"
                onClick={() => {
                  navigator.clipboard.writeText(txData?.orderNo);
                }}
              >
                <RxCopy size={15} />
              </div>
            </div>

            <div className="text-xs leading-[18px] text-darkslategray-100 inline-block w-[87px]">
              Transaction ID
            </div>
          </div>
        </div>
        <div className="flex flex-row w-full" />
      </div>
    </div>
  );
  return <>{timer}</>;
};
