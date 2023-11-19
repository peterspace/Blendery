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
const fiat = [
  {
    name: 'US Dollar',
    symbol: 'USD',
    rate: '1.1',
    rateBuy: 1.05,
    rateSell: 0.95,
    logoURI: '/usd.png',
  },
  {
    name: 'Euro',
    symbol: 'EUR',
    rate: '1.1',
    rateBuy: 1.05,
    rateSell: 0.95,
    logoURI: '/euro.png',
  },
  // {
  //   name: 'British PoundS',
  //   symbol: 'GBP',
  //   rate: '1.1',
  //   rateBuy: 1.05,
  //   rateSell: 0.95,
  //   logoURI: '/gbp.png',
  // },
  // {
  //   name: 'Russian Ruble',
  //   symbol: 'RUB',
  //   rate: '1.1',
  //   rateBuy: 1.05,
  //   rateSell: 0.95,
  //   logoURI: '/rub.png',
  // },
  // {
  //   name: 'Australian Dollar',
  //   symbol: 'AUD',
  //   rate: '1.1',
  //   rateBuy: 1.05,
  //   rateSell: 0.95,
  //   logoURI: '/aud.png',
  // },
  // {
  //   name: 'UAE Dirham',
  //   symbol: 'AED',
  //   rate: '1.1',
  //   rateBuy: 1.05,
  //   rateSell: 0.95,
  //   logoURI: '/aed.png',
  // },
  // {
  //   name: 'Canadian Dollar',
  //   symbol: 'CAD',
  //   rate: '1.1',
  //   rateBuy: 1.05,
  //   rateSell: 0.95,
  //   logoURI: '/cad.png',
  // },
];

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

export const EstimatorBuyCash = (props) => {
  const {
    service,
    subService,
    allTokensFromL,
    allTokensToL,
    fToken,
    setFromToken,
    tToken,
    setToToken,
    fValue,
    setFromValue,
  } = props;
  //==================================================================
  //==================================================================
  //The type of service initiated will determine the api calls made and used by the estimator for calling token list and prices

  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  /*********************************************     REDUX STATES    **************************************************** */
  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  const dispatch = useDispatch();

  const [allTokensFrom, setAllTokensFrom] = useState(allTokensFromL || null);
  const [allTokensTo, setAllTokensTo] = useState(allTokensToL || null);

  //======================={RATES and PRICES}========================================================
  const transactionRates = useSelector(
    (state) => state.transaction?.getTransactionRate
  );
  console.log({ transactionRates: transactionRates });
  const youSend = transactionRates ? transactionRates?.youSend : 0;
  const youGet = transactionRates ? transactionRates?.youGet : 0;
  const processingFee = transactionRates ? transactionRates?.processingFee : 0;
  const networkFee = transactionRates ? transactionRates?.networkFee : 0;
  const serviceFee = transactionRates ? transactionRates?.serviceFee : 0;
  const fromPriceData = transactionRates
    ? transactionRates?.fromPriceData
    : null;
  const toPriceData = transactionRates ? transactionRates?.toPriceData : null;
  const tValue = transactionRates ? transactionRates?.tValueFormatted : 0;
  const exchangeRate = transactionRates ? transactionRates?.exchangeRate : 0;
  const estimatedGas = transactionRates ? transactionRates?.estimatedGas : 0;
  const transactionRatesError = transactionRates
    ? transactionRates?.message
    : '';
  console.log({ transactionRatesError: transactionRatesError });
  const transactionRatesLoading = transactionRates
    ? transactionRates?.isLoading
    : false;
  console.log({ transactionRatesLoading: transactionRatesLoading });
  //======================={RATES and PRICES}========================================================

  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  /*********************************************     LOCAL STATES    **************************************************** */
  /********************************************************************************************************************** */
  /********************************************************************************************************************** */

  const [isNotCountrySupported, setIsNotCountrySupported] = useState(false);

  const countryL = localStorage.getItem('country')
    ? JSON.parse(localStorage.getItem('country'))
    : cities[0]?.country;
  // : 1;

  const cityDataL = localStorage.getItem('cityData')
    ? JSON.parse(localStorage.getItem('cityData'))
    : null;

  const cityL = localStorage.getItem('city')
    ? JSON.parse(localStorage.getItem('city'))
    : null;

  const [country, setCountry] = useState(countryL);
  const [cityData, setCityData] = useState(cityDataL);
  const [city, setCity] = useState(cityL);


  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  /*********************************************     REACT STATES    **************************************************** */
  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  const [fTitle, setFTitle] = useState('You send');
  const [tTitle, setTTitle] = useState('You get');

  //================{PAGES}==================
  const [isFromTokenPage, setIsFromTokenPage] = useState(false);
  const [isToTokenPage, setIsToTokenPage] = useState(false);
  const [filteredfTokens, setFilteredfTokens] = useState();
  const [filteredtTokens, setFilteredtTokens] = useState();

  //====================================================================================================
  //======================================={MAIN TRANSACTION CALLS}=====================================
  //====================================================================================================

  //================================={LOCATION}===================================================================

  useEffect(() => {
    if (allTokensFromL) {
      setAllTokensFrom(allTokensFromL);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (allTokensToL) {
      setAllTokensTo(allTokensToL);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (allTokensFromL && !fToken) {
      setFromToken(allTokensFromL[2]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allTokensFromL]);

  useEffect(() => {
    if (allTokensToL && !tToken) {
      setToToken(allTokensToL[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allTokensToL]);

  useEffect(() => {
    localStorage.setItem('country', JSON.stringify(country));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country]);

  useEffect(() => {
    localStorage.setItem('cityData', JSON.stringify(cityData));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityData]);

  useEffect(() => {
    localStorage.setItem('city', JSON.stringify(city));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  //================================={LOCATION}===================================================================

  //====================================================================================================
  //======================================={MAIN TRANSACTION CALLS}=====================================
  //====================================================================================================

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

  //================================================================================

  useEffect(() => {
    getCities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country]);

  async function getCities() {
    cities?.map(async (l) => {
      if (l.country === country) {
        setCityData(l.cities);
      }
    });
  }

  async function getAllTokensList() {
    dispatch(getTokenListDefi());
    dispatch(getTokenListFiat());
    dispatch(getTokenListBuy());
    dispatch(getTokenListSell());
    dispatch(getTokenListExchange());
  }

  async function openFromTokensList() {
    getAllTokensList();
    setTimeout(() => {
      setIsFromTokenPage(true);
    }, 400);
  }

  async function openToTokensList() {
    getAllTokensList();

    setTimeout(() => {
      setIsToTokenPage(true);
    }, 400);
  }

  const estimator = (
    <div className="flex justify-center rounded-lg bg-white shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[320px] xs:w-[340px] md:w-[500px] p-4">
      {isFromTokenPage === false && isToTokenPage === false ? (
        <div className="flex flex-col gap-[24px]">
          <div className="flex flex-col gap-[10px]">
            <div className="flex flex-row gap-4 mt-2">
              <div
                className={`cursor-pointer hover:text-mediumspringgreen leading-[24px] inline-block text-darkslategray-200 text-[24px]`}
              >
                Calculate amount (Buy Cash)
              </div>
            </div>
            <div className="flex bg-lightslategray-300 md:w-[452px] w-[300px] h-px" />
          </div>

          <div className="flex flex-col w-[300px] md:w-[452px] gap-[8px]">
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
                  <div className="flex items-center bg-whitesmoke-200 w-[121px] h-[44px] rounded-md">
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
                  1 {fToken?.symbol.toUpperCase()} ~ {exchangeRate}{' '}
                  {tToken?.symbol.toUpperCase()}
                </div>
                {/* <div className="h-3 py-2">{isToLoading
                           ? 'Fetching price...'
                           : `${`1 ${fToken?.symbol.toUpperCase()} = ${exchangeRate}  ${tToken?.symbol.toUpperCase()}`}`}</div> */}
                <div className="rounded bg-whitesmoke-100 p-2">
                  <img
                    className="w-3.5 h-3 overflow-hidden"
                    alt=""
                    src="/frame54.svg"
                  />
                </div>
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
                    value={`~ ${tValue}`}
                    // value={`~ ${1.675}`}
                    // value={
                    //   isToLoading
                    //     ? ''
                    //     : tValue &&
                    //       (Number(tValue) * Number(toPrice)).toFixed(4)
                    // }
                    // disabled={true}
                  />
                </div>
                <div className="flex flex-row items-start">
                  <div className="flex items-center bg-whitesmoke-200 w-[121px] h-[44px] rounded-md">
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
          <>
            <div className="flex flex-col w-[300px] md:w-[452px] gap-[8px]">
              <div className="flex flex-row bg-whitesmoke-100 rounded h-[62px] justify-between">
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
              <div className="flex flex-row bg-whitesmoke-100 rounded h-[62px] justify-between">
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
