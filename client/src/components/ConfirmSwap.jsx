import React, { useEffect, useState } from 'react';

export const ConfirmSwap = (props) => {
  const { submitTransaction, isValidTransaction, setIsSendTransaction } = props;

  const confirm = (
    <div className="flex justify-center rounded-lg bg-white shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[320px] xs:w-[340px] md:w-[500px] p-4">
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-row justify-center items-center md:w-[452px] w-[300px]">
          <div
            className="cursor-pointer flex flex-row justify-center items-center bg-bgPrimary hover:opacity-90 text-white h-[49px] shrink-0 rounded w-full"
            onClick={() => {
              submitTransaction(true);
            }}
          >
            Confirm
          </div>
        </div>
      </div>
    </div>
  );

  const send = (
    <div className="flex justify-center rounded-lg bg-white shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[320px] xs:w-[340px] md:w-[500px] p-4">
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-row justify-center items-center md:w-[452px] w-[300px]">
          <div
            className="cursor-pointer flex flex-row justify-center items-center bg-bgPrimary hover:opacity-90 text-white h-[49px] shrink-0 rounded w-full"
            onClick={() => {
              setIsSendTransaction(true);
            }}
          >
            Swap
          </div>
        </div>
      </div>
    </div>
  );
  return <>{isValidTransaction ? <>{send}</> : <>{confirm}</>}</>;
};
