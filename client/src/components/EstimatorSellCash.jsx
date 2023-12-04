import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactionRate } from '../redux/features/transaction/transactionSlice';

import { FaBitcoin } from 'react-icons/fa'; // Bitcoin
import { SiTether } from 'react-icons/si'; // Tether
import { FaEthereum } from 'react-icons/fa'; //Ethereum
import { SiLitecoin } from 'react-icons/si'; //Litecoin
import { TokenCard } from './TokenCard';
import { TokenCardDefi } from './TokenCardDefi';
import {
  getTokenList,
  getTokenListDefi,
  getTokenListFiat,
  getTokenListBuy,
  getTokenListSell,
  getTokenListExchange,
  getTokensDefiById,
} from '../redux/features/token/tokenSlice';

//android small = w-[320px]/ 352px
//iphone = w-[340px]/ 372px

const cities = [
  {
    country: 'United States',
    cities: ['New york'],
    flag: '',
  },
  {
    country: 'United Kingdom',
    cities: ['London'],
    flag: '',
  },
  {
    country: 'France',
    cities: ['Paris'],
    flag: '',
  },

  {
    country: 'Germany',
    cities: ['Berlin'],
    flag: '',
  },
  {
    country: 'Spain',
    cities: ['Barcelona'],
    flag: '',
  },
  {
    country: 'Russia',
    cities: ['Saint Petersburg', 'Moscow'],
    flag: '',
  },
  {
    country: 'Finland',
    cities: ['Helsinki'],
    flag: '',
  },
  {
    country: 'Hungary',
    cities: ['Budapest'],
    flag: '',
  },
  {
    country: 'Czech',
    cities: ['Prague'],
    flag: '',
  },
];

export const EstimatorSellCash = (props) => {
  const {
    setPercentageProgress,
    service,
    subService,
    fToken,
    setFromToken,
    tToken,
    setToToken,
    fValue,
    setFromValue,
    setCountry,
    country,
    cityData,
    setCityData,
    city,
    setCity,
    loading,
    fTitle,
    tTitle,
    allTokensFrom,
    allTokensTo,
    exchangeRate,
    cities,
    transactionRates,
    loadingExchangeRate,
  } = props;
  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  /*********************************************     REACT STATES    **************************************************** */
  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  const [isNotCountrySupported, setIsNotCountrySupported] = useState(false);
  //======================={RATES and PRICES}========================================================
  const tValue = transactionRates ? transactionRates?.tValueFormatted : 0;
  //================{CARDS}==================
  const [isFromTokenPage, setIsFromTokenPage] = useState(false);
  const [isToTokenPage, setIsToTokenPage] = useState(false);
  const [filteredfTokens, setFilteredfTokens] = useState();
  const [filteredtTokens, setFilteredtTokens] = useState();

  //============================================{Token selection}==============================
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

  const estimator = (
    <div className="flex justify-center rounded-lg bg-white shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[320px] xs:w-[340px] md:w-[500px] p-4">
      {isFromTokenPage === false && isToTokenPage === false ? (
        <div className="flex flex-col gap-[24px]">
          <div className="flex flex-col gap-[10px]">
            <div className="flex flex-row justify-between mt-[24px]">
              <div
                className={`cursor-pointer hover:text-bgPrimary leading-[24px] inline-block text-darkslategray-200 text-[24px]`}
              >
                Calculate amount (Sell Cash)
              </div>
              <div
                className="cursor-pointer flex flex-row justify-center items-center bg-bgSecondary hover:opacity-90 text-bgPrimary shrink-0 rounded px-6 py-3"
                onClick={() => {
                  setPercentageProgress(1);
                }}
              >
                Back
              </div>
            </div>
            <div className="flex bg-lightslategray-300 md:w-[452px] w-[300px] h-px" />
          </div>

          <div className="flex flex-col w-[300px] md:w-[452px] gap-[8px]">
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
          <>
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
          </>
          <div className="flex flex-row w-full" />
        </div>
      ) : null}

      <>
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
            setIsTokenPage={setIsFromTokenPage}
            setFilteredTokens={setFilteredfTokens}
            filteredTokens={filteredtTokens}
            setToken={setFromToken}
            allTokens={allTokensTo}
            service={service}
          />
        ) : null}
      </>
    </div>
  );
  return <>{estimator}</>;
};
