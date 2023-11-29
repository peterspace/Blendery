import React, { useState, useEffect } from 'react';
import { Progress } from '../../../components/Progress';
import { WalletInfo } from '../../../components/WalletInfo';
import { DetailsLocal } from '../../../components/DetailsLocal';
import { EstimatorExchange } from '../../../components/EstimatorExchange';
import { useDispatch, useSelector } from 'react-redux';
import { getTokenListExchange } from '../../../redux/features/token/tokenSlice';

export const ExchangeScreen2 = (props) => {
  const {
    percentageProgress,
    setPercentageProgress,
    fTitle,
    tTitle,
    fToken,
    setFromToken,
    tToken,
    setToToken,
    fValue,
    setFromValue,
    loading,
    mode,
    service,
    setService,
    subService,
    setSubService,
    setTxInfo,
    allTokensFrom,
    allTokensTo,
    exchangeRate,
    transactionRates,
    userAddress,
    setUserAddress,
    loadingExchangeRate,
  } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTokenListExchange());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col xl:flex-row justify-center">
      <div className="flex flex-col xl:flex-row gap-[32px] mt-[8px]">
        <div className="flex-col xl:flex-row h-[500px]">
          <Progress percentageProgress={percentageProgress} />
        </div>
        <div className="flex flex-col justify-start items-start xl:justify-center xl:items-center mt-6 xl:mt-0 gap-4">
          {/* the exchange rate is set inside the estimator */}
          <EstimatorExchange
            fTitle={fTitle}
            tTitle={tTitle}
            fToken={fToken}
            setFromToken={setFromToken}
            tToken={tToken}
            setToToken={setToToken}
            fValue={fValue}
            setFromValue={setFromValue}
            loading={loading}
            service={service}
            allTokensFrom={allTokensFrom}
            allTokensTo={allTokensTo}
            exchangeRate={exchangeRate}
            transactionRates={transactionRates}
            setPercentageProgress={setPercentageProgress}
            loadingExchangeRate={loadingExchangeRate}
          />
          <WalletInfo
            setPercentageProgress={setPercentageProgress}
            setUserAddress={setUserAddress}
            userAddress={userAddress}
            service={service}
            fToken={fToken}
            fValue={fValue}
          />
        </div>
        <div className="flex-col xl:flex-row h-[374px]">
          <DetailsLocal
            fToken={fToken}
            tToken={tToken}
            fValue={fValue}
            fTitle={fTitle}
            tTitle={tTitle}
            transactionRates={transactionRates}
            loadingExchangeRate={loadingExchangeRate}
          />
        </div>
      </div>
    </div>
  );
};
