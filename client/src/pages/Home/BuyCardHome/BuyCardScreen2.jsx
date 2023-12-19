import React, { useState, useEffect } from 'react';

import { Progress } from '../../../components/Progress';
import { EstimatorBuyCard } from '../../../components/EstimatorBuyCard';
import { DetailsCardLocal } from '../../../components/DetailsCardLocal';
import { Providers } from '../../../components/Providers';
import { BankInfo } from '../../../components/BankInfo';
import { useDispatch, useSelector } from 'react-redux';
import { getTokenListExchange } from '../../../redux/features/token/tokenSlice';

export const BuyCardScreen2 = (props) => {
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
    subService,
    allTokensFrom,
    allTokensTo,
    exchangeRate,
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
    //==================================================
    provider,
    providers,
    setProvider,
    fullName,
    setFullName,
    bankName,
    setBankName,
    cardNumber,
    setCardNumber,
    phone,
    setPhone,
    transactionRates,
    loadingExchangeRate,
  } = props;
  const dispatch = useDispatch();
  const [selectedProvider, setSelectedProvider] = useState("Phone");


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
          <EstimatorBuyCard
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
          {providers?.map((provider, i) => (
            <Providers
              key={i}
              setProvider={setProvider}
              provider={provider}
              selectedProvider={selectedProvider}
              setSelectedProvider={setSelectedProvider}
            />
          ))}

          {/* <Banking Info /> */}

          {provider && (
            <>
              <BankInfo
                setPercentageProgress={setPercentageProgress}
                userAddress={userAddress}
                setUserAddress={setUserAddress}
                service={service}
                fValue={fValue}
                fToken={fToken}
                tToken={tToken}
                fullName={fullName}
                setFullName={setFullName}
                bankName={bankName}
                setBankName={setBankName}
                cardNumber={cardNumber}
                setCardNumber={setCardNumber}
                phone={phone}
                setPhone={setPhone}
                provider={provider}
              />
            </>
          )}
        </div>
        <div className="flex-col xl:flex-row h-[374px]">
          <DetailsCardLocal
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
