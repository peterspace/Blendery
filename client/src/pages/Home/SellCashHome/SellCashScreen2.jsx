import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { Progress } from '../../../components/Progress';
import { EstimatorSellCash } from '../../../components/EstimatorSellCash';
import { CashInfo } from '../../../components/CashInfo';
import { DetailsCashLocal } from '../../../components/DetailsCashLocal';

export const SellCashScreen2 = (props) => {
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
  } = props;
  const allTokensFromL = useSelector((state) => state.token?.tokenListSell); // send token to get money
  const allTokensToL = useSelector((state) => state.token?.tokenListFiat);
  return (
    <div className="flex flex-col xl:flex-row justify-center">
      <div className="flex flex-col xl:flex-row gap-[32px] mt-[8px]">
        <div className="flex-col xl:flex-row h-[500px]">
          <Progress percentageProgress={percentageProgress} />
        </div>
        <div className="flex flex-col justify-start items-start xl:justify-center xl:items-center mt-6 xl:mt-0 gap-4">
          <EstimatorSellCash
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
           setPercentageProgress={setPercentageProgress}

          />
          <CashInfo
           setPercentageProgress={setPercentageProgress}
           userAddress={userAddress}
           setUserAddress={setUserAddress}
           service={service}
           fValue={fValue}
           fToken={fToken}
           telegram={telegram}
           setTelegram={setTelegram}
          />
        </div>
        <div className="flex-col xl:flex-row h-[374px]">
          <DetailsCashLocal
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
