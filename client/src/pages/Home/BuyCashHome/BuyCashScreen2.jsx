import React, { useState, useEffect } from 'react';

import { Progress } from '../../../components/Progress';
import { EstimatorBuyCash } from '../../../components/EstimatorBuyCash';
import { CashInfo } from '../../../components/CashInfo';
import { DetailsLocal } from '../../../components/DetailsLocal';
import { useDispatch, useSelector } from 'react-redux';
import { getTokenListExchange } from '../../../redux/features/token/tokenSlice';

export const BuyCashScreen2 = (props) => {
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
    paymentMethod,
    setPaymentMethod,
    paymentOptions,
    cities,
    setCountry,
    setCityData,
    setCity,
    country,
    cityData,
    city,
    tValue,
    userAddress,
    setUserAddress,
    telegram,
    setTelegram,
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
          <EstimatorBuyCash
            service={service}
            subService={subService}
            fToken={fToken}
            setFromToken={setFromToken}
            tToken={tToken}
            setToToken={setToToken}
            fValue={fValue}
            setFromValue={setFromValue}
            setCountry={setCountry}
            country={country}
            cityData={cityData}
            setCityData={setCityData}
            city={city}
            setCity={setCity}
            loading={loading}
            fTitle={fTitle}
            tTitle={tTitle}
            allTokensFrom={allTokensFrom}
            allTokensTo={allTokensTo}
            tValue={tValue}
            exchangeRate={exchangeRate}
            cities={cities}
            transactionRates={transactionRates}
            setPercentageProgress={setPercentageProgress}
            loadingExchangeRate={loadingExchangeRate}


          />
          <CashInfo
            setPercentageProgress={setPercentageProgress}
            userAddress={userAddress}
            setUserAddress={setUserAddress}
            service={service}
            fValue={fValue}
            fToken={fToken}
            tToken={tToken}
            telegram={telegram}
            setTelegram={setTelegram}
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
