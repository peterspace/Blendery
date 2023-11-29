import React, { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

export const CardProvider = (props) => {
  const {
    setPercentageProgress,
    service,
    provider,
    setLoginRedirect,
    txData,
    setTxInfo,
  } = props;

  const dispatch = useDispatch();
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;

  const txId = txData?._id;

  useEffect(() => {
    if (!user) {
      toast.error('Please login to continue');
      setTimeout(() => {
        setLoginRedirect(true);
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (txData?.status === 'Paid') {
      // setPercentageProgress(4);
      setTxInfo(txData);
      setPercentageProgress(txData?.percentageProgress); // update stage from backend
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [txData]);

  const newProvider = (
    <div className="flex justify-center rounded-lg bg-white shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[320px] xs:w-[340px] md:w-[500px] p-4">
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[8px] md:gap-[12px]">
          <div className="flex flex-row gap-4 mt-[24px]">
            <div className="text-[18px] md:text-[24px] font-extrabold leading-[32px] inline-block">
              Connect to {provider?.name}
            </div>
          </div>
          <div className="flex bg-lightslategray-300 md:w-[452px] w-[370px] h-px" />
        </div>
        <div className="flex flex-col w-[370px] md:w-[452px] gap-[24px]">
          <div className="flex flex-col justify-center items-center">
            <img
              className="w-[132px] h-[94px] object-cover"
              alt=""
              src="/image11@2x.png"
            />
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="text-lg leading-[24px] text-center inline-block w-[415px]">
              {service} crypto via bank card from {provider?.name}
            </div>
          </div>
        </div>
        <div
          className="mb-4 cursor-pointer flex flex-row justify-center items-center w-full bg-bgPrimary hover:opacity-90 text-white h-[49px] shrink-0 rounded"
          onClick={() => setPercentageProgress(4)}
        >
          {service} crypto
        </div>
      </div>
    </div>
  );

  return <>{newProvider}</>;
};
