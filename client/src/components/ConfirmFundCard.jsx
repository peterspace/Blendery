import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const ConfirmFundCard = (props) => {
  const { txData } = props;
  console.log({ txData40f4: txData });

  const navigate = useNavigate();
  const [isMontor, setIsMontor] = useState(false); // to monitor transaction

  useEffect(() => {
    if (isMontor) {
      setTimeout(() => {
        window.location.href = txData?.providerUrlOut
          ? txData?.providerUrlOut
          : txData?.fallbackUrl;
        setIsMontor(false);
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMontor]);

  const sendFund = (
    <div className="flex justify-center rounded-lg bg-white shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[320px] xs:w-[340px] md:w-[500px] p-4">
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[8px] md:gap-[12px]">
          <div className="flex flex-row gap-4 mt-[24px]">
            <div className="text-[18px] md:text-[24px] font-extrabold leading-[32px] inline-block">
              Confirming payment
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
                {txData?.provider?.name}
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
            {` Please hold while we confirm your payment and deposit the `}{' '}
            <br />
            {`${
              txData?.tValue
            } ${txData?.tToken?.symbol.toUpperCase()} to your wallet address.`}
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
  return <>{sendFund}</>;
};
