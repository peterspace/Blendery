import React, { useState, useEffect } from 'react';
import { BsCreditCard } from 'react-icons/bs';
import { BsCashStack } from 'react-icons/bs';
import { TokenCard } from '../../../components/TokenCard';

export const SellCardScreen1 = (props) => {
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
  } = props;

  
  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  /*********************************************     LOCAL STATES    **************************************************** */
  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  const [isNotCountrySupported, setIsNotCountrySupported] = useState(false);
  //================{Cards}==================================================
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
      setService('sell');
      setSubService('sellCash');
      setPercentageProgress(1);
    }
    if (paymentMethod === 'card') {
      setService('sell');
      setSubService('sellCard');
      setPercentageProgress(2);
    }
  }

  return (
    <>
      {/* ================================{SWAP MAIN ACTIVE STATE}===================================== */}
      {isFromTokenPage === false && isToTokenPage === false ? (
        <div className="flex flex-col gap-[24px]">
          <div className="flex flex-col w-[300px] md:w-[452px] gap-[8px]">
            <div className="flex flex-row bg-whitesmoke-100 rounded justify-between h-[57px]">
              <div className="ml-2 flex flex-row gap-[8px] items-center w-[370px] md:w-[452px] mt-[13px]">
                <div className="">
                  {paymentMethod === 'card' && (
                    <BsCreditCard color="#4f46e5" size={24} />
                  )}
                  {paymentMethod === 'cash' && (
                    <BsCashStack color="#4f46e5" size={24} />
                  )}
                </div>

                <div className="mr-2 w-[90%]">
                  <select
                    name="paymentMethod"
                    className={`cursor-pointer [border:none] outline-none w-full font-bold text-lg leading-[24px] text-darkslategray-200 bg-[transparent] relative tracking-[0.02em]`}
                    value={paymentMethod}
                    onChange={(ev) => setPaymentMethod(ev.target.value)}
                  >
                    {paymentOptions?.map((payment, index) => (
                      <option key={index} value={payment}>
                        {payment}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            {/* <div
                  className={`flex flex-row justify-between rounded-lg shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] px-4 py-2 hover:bg-gray-100 outline outline-lightslategray-300 outline-[1px]`}
                  onChange={(ev) => setPaymentMethod(ev.target.value)}
                >
                  <div className="cursor-pointer flex flex-row justify-between items-center w-[250px]">
                    <div className="flex flex-row items-center gap-2">
                      <div className="flex justify-center items-center flex-shrink-0">
                        {paymentMethod === 'card' && (
                          <BsCreditCard color="#4f46e5" size={20} />
                        )}
                        {paymentMethod === 'cash' && (
                          <BsCashStack color="#4f46e5" size={20} />
                        )}
                      </div>
                      <div className="flex flex-row gap-1">
                        <div
                          className={`text-base font-sans font-medium leading-[24px] inline-block text-black`}
                        >
                          {paymentMethod}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start h-[44px]">
                    <img
                      className="mr-2 top-[280px] w-[18px] h-[48px] overflow-hidden"
                      alt=""
                      src="/frame19.svg"
                    />
                  </div>
                </div> */}
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
                    // value={`~ ${tValue}`}
                    // value={`~ ${1.675}`}
                    value={loading ? 'loading' : `~ ${tValue}`}
                    disabled={true}
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

          {paymentMethod === 'cash' ? (
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
          ) : (
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
            </div>
          )}
          {paymentMethod === 'card' ? (
            <>
              {country === 'Russia' ? (
                <div
                  className="mb-4 cursor-pointer flex flex-row justify-center items-center w-full bg-mediumspringgreen hover:opacity-90 text-white h-[49px] shrink-0 rounded-md"
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
                className="mb-4 cursor-pointer flex flex-row justify-center items-center w-full bg-mediumspringgreen hover:opacity-90 text-white h-[49px] shrink-0 rounded-md"
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
