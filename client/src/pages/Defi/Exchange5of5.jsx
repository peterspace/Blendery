import React, { useEffect, useState } from 'react';
import { Progress } from '../../components/Progress';
import { Details } from '../../components/Details';
import { SendFund } from '../../components/SendFund';
import { Timer } from '../../components/Timer';
import { ConfirmFund } from '../../components/ConfirmFund';
import { VerifiedFund } from '../../components/VerifiedFund';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactionByTxId } from '../../redux/features/transaction/transactionSlice';
import { Navigate } from 'react-router-dom';

export const Exchange5of5 = (props) => {
  const {
    percentageProgress,
    setPercentageProgress,
    fTitle,
    tTitle,
    setLoginRedirect,
    txData,
    setTxInfo,
    setRefetchTxData
  } = props;

  const { user } = useSelector((state) => state.user);

  if (!user?.token) {
    return <Navigate to="/auth" />;
  }
  
  return (
    <div className="flex flex-col xl:flex-row justify-center">
      {txData ? (
        <div className="flex flex-col xl:flex-row gap-[32px] mt-[8px]">
          <div className="flex-col xl:flex-row h-[500px]">
            <Progress
              percentageProgress={
                txData?.percentageProgress
                  ? txData?.percentageProgress
                  : percentageProgress
              }
            />
          </div>

          <div className="flex flex-col justify-start items-start xl:justify-center xl:items-center mt-6 xl:mt-0 gap-4">
            <VerifiedFund
              setPercentageProgress={setPercentageProgress}
              setLoginRedirect={setLoginRedirect}
              txData={txData}
              setTxInfo={setTxInfo}
              setRefetchTxData={setRefetchTxData}
            />
          </div>

          <div className="flex-col xl:flex-row h-[374px]">
            <div className="mb-[16px]">
              <Timer txData={txData} />
            </div>

            <Details fTitle={fTitle} tTitle={tTitle} txData={txData} />
          </div>
        </div>
      ) : null}
    </div>
  );
};
