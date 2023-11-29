import React, { useEffect, useState } from 'react';
import { RxCopy } from 'react-icons/rx';
import { BiSolidLockAlt } from 'react-icons/bi';
import { RiFileWarningFill } from 'react-icons/ri';
import { SiAuthelia } from 'react-icons/si';

import { useDispatch, useSelector } from 'react-redux';

import { updateTransactionsAutomaticallyStore } from '../services/apiServiceStore';
import { toast } from 'react-toastify';

export const ReceiveFundStore = (props) => {
  const {
    setPercentageProgress,
    setLoginRedirect,
    txData,
    setTxInfo,
    setRefetchTxData,
  } = props;

  const txId = txData?._id;

  const [pin, setPin] = useState();
  const [showpin, setshowPin] = useState(false);

  useEffect(() => {
    if (!user) {
      toast.error('Please login to continue');
      setTimeout(() => {
        setLoginRedirect(true);
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const updateTransaction = async () => {
    const userData = {
      id: txData?._id,
      // status: 'Pending',
      status: 'Paid',
      percentageProgress: 4,
    };
    const response = await updateTransactionsAutomaticallyStore(userData);
    setTxInfo(response);
    setTimeout(() => {
      setRefetchTxData(true);
    }, 2000); // after 1 sec
  };

  const sendFund = (
    <div className="flex justify-center rounded-lg bg-white shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[375px] md:w-[500px] p-4">
      <div className="flex flex-col gap-[24px]">
        {/* <div className="flex flex-col gap-[12px] md:gap-[24px]"> */}
        <div className="flex flex-col gap-[8px] md:gap-[12px]">
          <div className="flex flex-row gap-4 mt-[24px]">
            <div className="text-[18px] md:text-[24px] font-extrabold leading-[32px] inline-block">
              Send funds to the address below
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
                {txData?.tValue} {txData?.tToken?.symbol}
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

                <div
                  className="cursor-pointer flex flex-row justify-center items-center bg-bgSecondary hover:opacity-90 text-bgPrimary h-[49px] shrink-0 rounded w-[30%]"
                  onClick={updateTransaction}
                >
                  Next
                </div>
              </div>
            </div>
          </div>
          <div className="mt-2 flex flex-row bg-orangeLight rounded p-1 md:w-[452px] w-[370px]">
            <div className="ml-1 flex justify-center items-center w-[24px] flex-shrink-0">
              {' '}
              <RiFileWarningFill color="#FFB000" size={15} />{' '}
            </div>
            <div className="text-xs leading-[14.4px] text-darkslategray-200 inline-block">
              Please note that you can send funds to the address above only
              once.
            </div>
          </div>
          <div className="mt-2 mb-4 flex bg-lightslategray-300 md:w-[452px] w-[370px] h-px" />
          <div className="flex flex-row bg-orangeLight rounded p-1 md:w-[452px] w-[370px]">
            <div className="ml-1 flex justify-center items-center w-[24px] flex-shrink-0">
              {' '}
              <RiFileWarningFill color="#FFB000" size={15} />{' '}
            </div>
            <div className="text-xs leading-[14.4px] text-darkslategray-200 inline-block w-[424px]">
              Please do not disclose this pin to anyone except the dispatcher
            </div>
          </div>
          <div className="mt-2 flex bg-lightslategray-300 md:w-[452px] w-[370px] h-px" />
        </div>

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

  return <>{sendFund}</>;
};
