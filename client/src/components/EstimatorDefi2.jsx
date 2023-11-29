import React, { useState, useEffect } from 'react';
import { TokenCardNetworks } from './TokenCardNetworks';
import { networksOptions } from '../constants';
import { TokenCard } from './TokenCard';
//android small = w-[320px]/ 352px
//iphone = w-[340px]/ 372px
export const EstimatorDefi = (props) => {
  const {
    fTitle,
    tTitle,
    fToken,
    setFromToken,
    tToken,
    setToToken,
    fValue,
    setFromValue,
    loading,
    service,
    allTokensFrom,
    allTokensTo,
    exchangeRate,
    transactionRates,
    blockchainNetwork,
    setBlockchainNetwork,
    setPercentageProgress,
  } = props;
  //======================={RATES and PRICES}========================================================
  const tValue = transactionRates ? transactionRates?.tValueFormatted : 0;
  //================{CARDS}==================
  const [isNetworkPage, setIsNetworkPage] = useState(false);
  const [isFromTokenPage, setIsFromTokenPage] = useState(false);
  const [isToTokenPage, setIsToTokenPage] = useState(false);
  const [filteredfTokens, setFilteredfTokens] = useState();
  const [filteredtTokens, setFilteredtTokens] = useState();
  const [isChainChange, setIsChainChange] = useState(false);

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
  //====================================================================================

  const estimator = (
    <div className="flex justify-center rounded-lg bg-white shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[320px] xs:w-[340px] md:w-[500px] p-4">
      {isNetworkPage === false &&
      isFromTokenPage === false &&
      isToTokenPage === false ? (
        <div className="flex flex-col gap-[24px]">
          <div className="flex flex-col gap-[10px]">
            <div className="flex flex-row justify-between mt-[24px]">
              <div
                className={`cursor-pointer hover:text-bgPrimary leading-[24px] inline-block text-darkslategray-200 text-[24px]`}
              >
                Calculate amount
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
            <div
              className={`flex flex-row justify-between rounded-lg shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] px-4 py-2 hover:bg-gray-100 outline outline-lightslategray-300 outline-[1px]`}
              onClick={() => setIsNetworkPage(true)}
            >
              <div className="cursor-pointer flex flex-row justify-between items-center w-[250px]">
                <div className="flex flex-row items-center gap-2">
                  <div className="flex justify-center items-center flex-shrink-0">
                    <img
                      className="w-[24px] h-$ shrink-0 overflow-hidden rounded-full"
                      src={blockchainNetwork?.image}
                      alt={blockchainNetwork.symbol}
                    />
                  </div>
                  <div className="flex flex-row gap-1">
                    <div
                      className={`text-base font-sans font-medium leading-[24px] inline-block text-black`}
                    >
                      {blockchainNetwork.name}
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
            </div>

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

            <div className="flex flex-row justify-between">
              <div className="h-3 py-2">
                1 {fToken?.symbol.toUpperCase()} ~ {exchangeRate}{' '}
                {tToken?.symbol.toUpperCase()}
              </div>
              {/* <div className="h-3 py-2">{isToLoading
                          ? 'Fetching price...'
                          : `${`1 ${fToken?.symbol.toUpperCase()} = ${exchangeRate}  ${tToken?.symbol.toUpperCase()}`}`}</div> */}
              <div className="rounded bg-bgSecondary p-2">
                <img
                  className="w-3.5 h-3 overflow-hidden"
                  alt=""
                  src="/frame54.svg"
                />
              </div>
            </div>
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
        </div>
      ) : null}
      <>
        {/* =============================={FROM TOKEN COMPONENT: PART THREE}========================== */}
        {isNetworkPage === true &&
        isFromTokenPage === false &&
        isToTokenPage === false ? (
          <TokenCardNetworks
            setIsTokenPage={setIsNetworkPage}
            setToken={setBlockchainNetwork}
            allTokens={networksOptions}
            service={service}
            setIsChainChange={setIsChainChange}
          />
        ) : null}
        {isNetworkPage === false &&
        isFromTokenPage === true &&
        isToTokenPage === false ? (
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
        {isNetworkPage === false &&
        isFromTokenPage === false &&
        isToTokenPage === true ? (
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
    </div>
  );
  return <>{estimator}</>;
};
