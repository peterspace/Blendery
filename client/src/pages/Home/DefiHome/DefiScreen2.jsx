import React, { useState, useEffect } from 'react';
import { Progress } from '../../../components/Progress';
import { EstimatorDefi } from '../../../components/EstimatorDefi';
import { DetailsLocal } from '../../../components/DetailsLocal';
import { useDispatch } from 'react-redux';

import { getTokensDefiByIdService } from '../../../services/apiService';
import { getTokensDefiById } from '../../../redux/features/swap/swapSlice';

export const DefiScreen2 = (props) => {
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
    transactionRates,
    userAddress,
    setUserAddress,
    chain,
    setChain,
    chainId,
    //====================={new}===============================
    isFromLoading,
    fromBalance,
    fromPrice,
    toPrice,
    isToLoading,
    toBalance,
    priceDeviation,
    fromBalancePercent,
    //========================={modals control}=======================================
    isConnected,
    isFromTokenPage,
    isToTokenPage,
    isSlippagePage,
    isConnecting,
    setIsConnectingL,
    loadingExchangeRate
  } = props;

  const dispatch = useDispatch();

  //======================={RATES and PRICES}========================================================
  const tValue = transactionRates ? transactionRates?.tValueFormatted : 0;
  const exchangeRate = transactionRates ? transactionRates?.exchangeRate : 0;

  // useEffect(() => {
  //   getConnectedChain();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // async function getConnectedChain() {
  //   const response = await getTokensDefiByIdService(chainId);
  //   if (response) {
  //     dispatch(getTokensDefiById(response));
  //   }

  //   // window.location.reload(); // reconsider removing
  // }

  return (
    <div className="flex flex-col xl:flex-row justify-center">
      <div className="flex flex-col xl:flex-row gap-[32px] mt-[8px]">
        <div className="flex-col xl:flex-row h-[500px]">
          <Progress percentageProgress={percentageProgress} />
        </div>
        <div className="flex flex-col justify-start items-start xl:justify-center xl:items-center mt-6 xl:mt-0 gap-4">
          <>
            <EstimatorDefi
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
              chain={chain}
              setChain={setChain}
              setPercentageProgress={setPercentageProgress}
              //============={New}=================
              isFromLoading={isFromLoading}
              fromBalance={fromBalance}
              fromPrice={fromPrice}
              toPrice={toPrice}
              isToLoading={isToLoading}
              toBalance={toBalance}
              priceDeviation={priceDeviation}
              tValue={tValue}
              fromBalancePercent={fromBalancePercent}
              //======================{modals control}===================================
              isConnected={isConnected}
              isFromTokenPage={isFromTokenPage}
              isToTokenPage={isToTokenPage}
              isSlippagePage={isSlippagePage}
              loadingExchangeRate={loadingExchangeRate}
            />
          </>
        </div>
        <div className="flex-col xl:flex-row h-[374px]">
          <DetailsLocal
            fToken={fToken}
            tToken={tToken}
            fValue={fValue}
            fTitle={fTitle}
            tTitle={tTitle}
          />
        </div>
      </div>
    </div>
  );
};
