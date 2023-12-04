import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { getTransactionRate } from '../../../redux/features/transaction/transactionSlice';

import { BsCreditCard } from 'react-icons/bs';
import { BsCashStack } from 'react-icons/bs';
import { SiHiveBlockchain } from 'react-icons/si';

import { TokenCard } from '../../../components/TokenCard';
import {
  getTokenExchangeRate,
  getTransactionRateInfo,
} from '../../../services/apiService';
import { getTokenListExchange } from '../../../redux/features/token/tokenSlice';
import { useDispatch, useSelector } from 'react-redux';

export const BuyCardScreen1 = (props) => {
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
    transactionRates,
    loadingExchangeRate,
  } = props;

  const dispatch = useDispatch();

  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  /*********************************************     LOCAL STATES    **************************************************** */
  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  //======================={RATES and PRICES}========================================================
  const tValue = transactionRates ? transactionRates?.tValueFormatted : 0;
  const exchangeRate = transactionRates ? transactionRates?.exchangeRate : 0;

  const [isNotCountrySupported, setIsNotCountrySupported] = useState(false);
  //================{Cards}==================================================
  const [isFromTokenPage, setIsFromTokenPage] = useState(false);
  const [isToTokenPage, setIsToTokenPage] = useState(false);
  const [filteredfTokens, setFilteredfTokens] = useState();
  const [filteredtTokens, setFilteredtTokens] = useState();

  //============================================{Token selection}==============================
  useEffect(() => {
    dispatch(getTokenListExchange());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (allTokensFrom) {
      filterFTokens();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allTokensFrom, fToken, tToken]);

  function filterFTokens() {
    let newTokens = [];
    if (allTokensFrom) {
      allTokensFrom?.map(async (t) => {
        if (t !== tToken) {
          newTokens.push(t);
        }
      });

      setFilteredfTokens(newTokens);
    }
  }

  useEffect(() => {
    if (allTokensTo) {
      filterTTokens();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allTokensTo, fToken, tToken]);

  function filterTTokens() {
    let newTokens = [];
    if (allTokensTo) {
      allTokensTo?.map(async (t) => {
        if (t === fToken) {
          return;
        } else {
          newTokens.push(t);
        }
      });

      setFilteredtTokens(newTokens);
    }
  }

  function onFromValueChanged(ev) {
    // setToValue(0);
    setFromValue(ev.target.value);
  }

  //================================================================================

  useEffect(() => {
    getCities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country]);

  async function getCities() {
    // let allCities;
    cities?.map(async (l) => {
      if (l.country === country) {
        setCityData(l.cities);
        setCity(l.cities[0]);
      }
    });
  }

  //====================================================================================

  async function nextFunc() {
    if (paymentMethod === 'cash') {
      setService('buy');
      setSubService('buyCash');
      setPercentageProgress(2);
    }
    if (paymentMethod === 'card') {
      setService('buy');
      setSubService('buyCard');
      setPercentageProgress(2);
    }
  }

  return (
    <>
      {/* ================================{SWAP MAIN ACTIVE STATE}===================================== */}
      {isFromTokenPage === false && isToTokenPage === false ? (
        <div className="flex flex-col gap-[24px]">
          <div className="flex flex-col w-[300px] md:w-[452px] gap-[8px]">
            <div className="grid grid-cols-2 gap-2 mt-2 rounded-lg shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] p-1 bg-gray-100 outline outline-lightslategray-300 outline-[1px]">
              {paymentMethod === 'card' ? (
                <div
                  className={`flex flex-row justify-center items-center h-[49px] cursor-pointer text-white bg-bgPrimary hover:bg-bgPrimaryHover focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded dark:bg-blue-600 dark:hover:bg-bgPrimary dark:focus:ring-bgPrimaryHover`}
                  onClick={() => setPaymentMethod(paymentOptions[0])}
                >
                  <div className={`flex flex-row gap-2 `}>
                    <BsCreditCard size={20} />
                    <div className="leading-[20px] inline-block">Card</div>
                  </div>
                </div>
              ) : (
                <div
                  className={`flex flex-row justify-center items-center h-[49px] cursor-pointer text-bgPrimary focus:outline-none bg-white rounded border border-gray-200 hover:bg-gray-100 hover:text-bgPrimary focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`}
                  onClick={() => setPaymentMethod(paymentOptions[0])}
                >
                  <div className={`flex flex-row gap-2 `}>
                    <BsCreditCard size={20} />
                    <div className="leading-[20px] inline-block">Card</div>
                  </div>
                </div>
              )}

              {paymentMethod === 'cash' ? (
                <div
                  className={`flex flex-row justify-center items-center h-[49px] cursor-pointer text-white bg-bgPrimary hover:bg-bgPrimaryHover focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded dark:bg-blue-600 dark:hover:bg-bgPrimary dark:focus:ring-bgPrimaryHover`}
                  onClick={() => setPaymentMethod(paymentOptions[1])}
                >
                  <div className={`flex flex-row gap-2 `}>
                    <BsCashStack size={20} />
                    <div className="leading-[20px] inline-block">Cash</div>
                  </div>
                </div>
              ) : (
                <div
                  className={`flex flex-row justify-center items-center h-[49px] cursor-pointer text-bgPrimary focus:outline-none bg-white rounded border border-gray-200 hover:bg-gray-100 hover:text-bgPrimary focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`}
                  onClick={() => setPaymentMethod(paymentOptions[1])}
                >
                  <div className={`flex flex-row gap-2 `}>
                    <BsCashStack size={20} />
                    <div className="leading-[20px] inline-block">Cash</div>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 gap-2 mt-2 rounded-lg shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] p-2 bg-gray-100 outline outline-lightslategray-300 outline-[1px]">
              <div className="flex justify-center items-center rounded-lg shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] p-1 bg-gray-100 outline outline-lightslategray-300 outline-[1px]">
                <div className="flex flex-row justify-between w-[300px] md:w-[452px] items-center p-1">
                  <div className="flex flex-col items-start h-[44px]">
                    <div className="ml-2 mt-2 text-xs text-darkgray-200">
                      {/* You send */}
                      {fTitle}
                    </div>
                    <input
                      type="text"
                      className="ml-2 font-bold text-lg leading-[24px] text-darkslategray-200 inline-block w-[90%] outline-none bg-gray-100 placeholder-darkgray-100"
                      placeholder="0.1"
                      value={fValue}
                      onChange={onFromValueChanged}
                    />
                  </div>
                  <div className="flex flex-row items-start">
                    <div className="flex items-center bg-whitesmoke-200 w-[121px] h-[44px] rounded-md mr-2 shadow-md hover:bg-whitesmoke-100">
                      <div
                        className="cursor-pointer flex flex-row justify-between w-[121px] ml-[12px]"
                        onClick={() => setIsFromTokenPage(true)}
                      >
                        <div className="flex flex-row items-center gap-2">
                          {/* <FaBitcoin size={20} color={'#f97316'} /> */}
                          <img
                            className="w-[40px] h-$ shrink-0 overflow-hidden rounded-full"
                            alt={fToken?.name}
                            src={fToken?.image}
                          />
                          <span className="font-bold text-[16px] text-darkslategray-200 inline-block">
                            {/* BTC */}
                            {fToken?.symbol.toUpperCase()}
                          </span>
                        </div>
                        <img
                          className="mr-2 top-[280px] w-[18px] h-[48px] overflow-hidden"
                          alt=""
                          src="/frame19.svg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {isNotCountrySupported ? (
                <div className="flex flex-row bg-orangeLight w-full rounded">
                  <div className="h-3 px-2 py-3 font-bold">
                    Country is not supported
                  </div>
                </div>
              ) : (
                <div className="flex flex-row justify-between">
                  <div className="h-3 py-2">
                    1 {fToken?.symbol.toUpperCase()} ~{' '}
                    {loadingExchangeRate ? 'fetching rates' : exchangeRate}{' '}
                    {tToken?.symbol.toUpperCase()}
                  </div>
                  {/* <div className="h-3 py-2">{isToLoading
                          ? 'Fetching price...'
                          : `${`1 ${fToken?.symbol.toUpperCase()} = ${exchangeRate}  ${tToken?.symbol.toUpperCase()}`}`}</div> */}
                </div>
              )}
              <div className="flex justify-center items-center rounded-lg shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] p-1 bg-gray-100 outline outline-lightslategray-300 outline-[1px]">
                <div className="flex flex-row justify-between w-[300px] md:w-[452px] items-center p-1">
                  <div className="flex flex-col items-start h-[44px]">
                    <div className="ml-2 mt-2 text-xs text-darkgray-200">
                      {/* You send */}
                      {tTitle}
                    </div>
                    <input
                      type="text"
                      className="ml-2 font-bold text-lg leading-[24px] text-darkslategray-200 inline-block w-[90%] outline-none bg-gray-100 placeholder-darkgray-100"
                      placeholder="0.1"
                      // value={`~ ${tValue}`}
                      // value={`~ ${1.675}`}
                      value={loading ? 'loading' : `~ ${tValue}`}
                      disabled={true}
                    />
                  </div>
                  <div className="flex flex-row items-start">
                    <div className="flex items-center bg-whitesmoke-200 w-[121px] h-[44px] rounded-md mr-2 shadow-md hover:bg-whitesmoke-100">
                      <div
                        className="cursor-pointer flex flex-row justify-between w-[121px] ml-[12px]"
                        onClick={() => setIsToTokenPage(true)}
                      >
                        <div className="flex flex-row items-center gap-2">
                          {/* <FaEthereum size={20} color={'#3f3f46'} /> */}
                          <img
                            className="w-[40px] h-$ shrink-0 overflow-hidden rounded-full"
                            alt={tToken?.name}
                            src={tToken?.image}
                          />
                          <span className="font-bold text-[16px] text-darkslategray-200 inline-block">
                            {/* ETH */}
                            {tToken?.symbol.toUpperCase()}
                          </span>
                        </div>
                        <img
                          className="mr-2 top-[280px] w-[18px] h-[48px] overflow-hidden"
                          alt=""
                          src="/frame19.svg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {paymentMethod === 'cash' ? (
            <div className="flex flex-col w-[300px] md:w-[452px] gap-[8px]">
              <div className="flex flex-row bg-bgSecondary rounded h-[62px] justify-between">
                <div className="w-[300px] md:w-[452px]">
                  <div className="ml-2 mt-2 text-xs leading-[18px] text-darkslategray-200">
                    Country of residence
                  </div>
                  <div className="ml-2 flex flex-row gap-[8px] items-center w-[300px] md:w-[452px] mt-[13px]">
                    <div className="mr-4 w-[300px] md:w-[452px]">
                      <select
                        name="country"
                        className={`cursor-pointer [border:none] outline-none w-full text-[12px] md:text-[16px] leading-[24px] text-darkslategray-200 inline-block bg-[transparent]`}
                        value={country}
                        onChange={(ev) => setCountry(ev.target.value)}
                      >
                        {cities &&
                          cities.map((country, index) => (
                            <option key={index} value={country?.country}>
                              {country?.country}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row bg-bgSecondary rounded h-[62px] justify-between">
                <div className="w-[300px] md:w-[452px]">
                  <div className="ml-2 mt-2 text-xs leading-[18px] text-darkslategray-200">
                    City
                  </div>
                  <div className="ml-2 flex flex-row gap-[8px] items-center w-[300px] md:w-[452px] mt-[13px]">
                    <div className="mr-4 w-[300px] md:w-[452px]">
                      <select
                        name="city"
                        className={`cursor-pointer [border:none] outline-none w-full text-[12px] md:text-[16px] leading-[24px] text-darkslategray-200 inline-block bg-[transparent]`}
                        value={city}
                        onChange={(ev) => setCity(ev.target.value)}
                      >
                        {cityData &&
                          cityData.map((city, index) => (
                            <option key={index} value={city}>
                              {city}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col w-[300px] md:w-[452px] gap-[8px]">
              <div className="flex flex-row bg-bgSecondary rounded h-[62px] justify-between">
                <div className="w-[300px] md:w-[452px]">
                  <div className="ml-2 mt-2 text-xs leading-[18px] text-darkslategray-200">
                    Country of residence
                  </div>
                  <div className="ml-2 flex flex-row gap-[8px] items-center w-[300px] md:w-[452px] mt-[13px]">
                    <div className="mr-4 w-[300px] md:w-[452px]">
                      <select
                        name="country"
                        className={`cursor-pointer [border:none] outline-none w-full text-[12px] md:text-[16px] leading-[24px] text-darkslategray-200 inline-block bg-[transparent]`}
                        value={country}
                        onChange={(ev) => setCountry(ev.target.value)}
                      >
                        {cities &&
                          cities.map((country, index) => (
                            <option key={index} value={country?.country}>
                              {country?.country}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {paymentMethod === 'card' ? (
            <>
              {country === 'Russia' ? (
                <div
                  className="flex flex-row justify-center items-center h-[49px] cursor-pointer text-white bg-bgPrimary hover:bg-bgPrimaryHover focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded dark:bg-blue-600 dark:hover:bg-bgPrimary dark:focus:ring-bgPrimaryHover"
                  onClick={nextFunc}
                >
                  {`${service} ${fToken?.symbol.toUpperCase()} now`}
                </div>
              ) : (
                <div className="flex flex-row bg-orangeLight w-full rounded">
                  <div className="h-3 px-2 py-3 font-bold">
                    This service is currently not available in your country
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <div
                className="flex flex-row justify-center items-center h-[49px] cursor-pointer text-white bg-bgPrimary hover:bg-bgPrimaryHover focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded dark:bg-blue-600 dark:hover:bg-bgPrimary dark:focus:ring-bgPrimaryHover"
                onClick={nextFunc}
              >
                {`${service} ${fToken?.symbol.toUpperCase()} now`}
              </div>
            </>
          )}
        </div>
      ) : null}
      {/* =============================={FROM TOKEN COMPONENT: PART THREE}========================== */}
      {isFromTokenPage === true && isToTokenPage === false ? (
        <TokenCard
          setIsTokenPage={setIsFromTokenPage}
          setFilteredTokens={setFilteredfTokens}
          filteredTokens={filteredfTokens}
          setToken={setFromToken}
          allTokens={allTokensFrom}
          service={service}
        />
      ) : null}

      {/* ===================={To TOKEN COMPONENT: PART THREE}=================================== */}
      {isFromTokenPage === false && isToTokenPage === true ? (
        <TokenCard
          setIsTokenPage={setIsToTokenPage}
          setFilteredTokens={setFilteredtTokens}
          filteredTokens={filteredtTokens}
          setToken={setToToken}
          allTokens={allTokensTo}
          service={service}
        />
      ) : null}
    </>
  );
};
