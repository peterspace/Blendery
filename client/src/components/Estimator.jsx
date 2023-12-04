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

export const Estimator = (props) => {
  const { service, subService, allTokensFromL, allTokensToL } = props;
  const dispatch = useDispatch();

  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  /*********************************************     REDUX STATES    **************************************************** */
  /********************************************************************************************************************** */
  /********************************************************************************************************************** */

  const transactionRates = useSelector(
    (state) => state.transaction?.getTransactionRate
  );
  const youSend = transactionRates ? transactionRates?.youSend : 0;
  const youGet = transactionRates ? transactionRates?.youGet : 0;
  const processingFee = transactionRates ? transactionRates?.processingFee : 0;
  const networkFee = transactionRates ? transactionRates?.networkFee : 0;
  const serviceFee = transactionRates ? transactionRates?.serviceFee : 0;
  const tValue = transactionRates ? transactionRates?.tValueFormatted : 0;
  const exchangeRate = transactionRates ? transactionRates?.exchangeRate : 0;
  //===={To be added}========
  const estimatedGas = transactionRates ? transactionRates?.estimatedGas : 0;

  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  /*********************************************     LOCAL STATES    **************************************************** */
  /********************************************************************************************************************** */
  /********************************************************************************************************************** */

  const fTokenL = localStorage.getItem('fTokenE')
    ? JSON.parse(localStorage.getItem('fTokenE'))
    : null;
  // : null;

  const [fToken, setFromToken] = useState(fTokenL);
  const tTokenL = localStorage.getItem('tTokenE')
    ? JSON.parse(localStorage.getItem('tTokenE'))
    : null;
  // : null;

  const [tToken, setToToken] = useState(tTokenL);
  const fValueL = localStorage.getItem('fValueE')
    ? JSON.parse(localStorage.getItem('fValueE'))
    : '1';
  const [fValue, setFromValue] = useState(fValueL);

  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  /*********************************************     REACT STATES    **************************************************** */
  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  const [allTokensFrom, setAllTokensFrom] = useState(allTokensFromL);
  const [allTokensTo, setAllTokensTo] = useState(allTokensToL);

  const [fTitle, setFTitle] = useState('You send');
  const [tTitle, setTTitle] = useState('You get');

  //================{PAGES}==================
  const [isFromTokenPage, setIsFromTokenPage] = useState(false);
  const [isToTokenPage, setIsToTokenPage] = useState(false);
  const [filteredfTokens, setFilteredfTokens] = useState();
  const [filteredtTokens, setFilteredtTokens] = useState();
  // const [exchangeRate, setExchangeRate] = useState(0.0);
  //=============={Loading State}==========================
  const [isToLoading, setIsToLoading] = useState(false);
  const [isFromLoading, setIsFromLoading] = useState(false);

  const [check, setCheck] = useState();

  //====================================================================================================
  //======================================={MAIN TRANSACTION CALLS}=====================================
  //====================================================================================================
  useEffect(() => {
    const userData = { fToken, tToken, fValue, service, subService };

    dispatch(getTransactionRate(userData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fToken, tToken, fValue, service, subService]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeout(() => {
        const userData = { fToken, tToken, fValue, service, subService };

        dispatch(getTransactionRate(userData));
      }, 4000);
    }, 60000); // every minute
    return () => {
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fToken, tToken, fValue]);

  useEffect(() => {
    setTimeout(() => {
      if (
        fValue === 0 ||
        fValue === '0' ||
        fValue === null ||
        fValue === undefined
      ) {
        return;
      }
      const userData = { fToken, tToken, fValue, service, subService };

      dispatch(getTransactionRate(userData));
    }, 4000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fToken, tToken, fValue]);
  // useEffect(() => {
  //   if (!check || check === undefined || tValue === 0) {
  //     setIsToLoading(true);
  //   } else {
  //     setIsToLoading(false);
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [check, tValue]);

  useEffect(() => {
    localStorage.setItem('fTokenE', JSON.stringify(fToken));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fToken]);

  useEffect(() => {
    localStorage.setItem('tTokenE', JSON.stringify(tToken));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tToken]);

  useEffect(() => {
    localStorage.setItem('fValueE', JSON.stringify(fValue));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fValue]);

  useEffect(() => {
    localStorage.setItem('tValueE', JSON.stringify(tValue));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tValue]);

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
    setFromValue(ev.target.value);
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
  //======================================={CHAIN CHANGE}============================================
  //======================================={CHAIN CHANGE}============================================

  //======================================={SWAP ESTIMATES}===============================================
  //===={Updates at intervatls}============

  //===================================================================

  const estimator = (
    <div className="flex justify-center rounded-lg bg-white shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[320px] xs:w-[340px] md:w-[500px] p-4">
      {isFromTokenPage === false && isToTokenPage === false ? (
        <div className="flex flex-col gap-[24px]">
          <div className="flex flex-col gap-[10px]">
            <div className="flex flex-row gap-4 mt-2">
              <div
                className={`cursor-pointer hover:text-bgPrimary leading-[24px] inline-block text-darkslategray-200 text-[24px]`}
              >
                Calculate amount
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
                  <div className="flex items-center bg-whitesmoke-200 w-[121px] h-[44px] rounded-md mr-2 shadow-md hover:bg-whitesmoke-100">
                    <div
                      className="cursor-pointer flex flex-row justify-between w-[121px] ml-[12px]"
                      onClick={openFromTokensList}
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

            <div className="flex flex-row justify-center">
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
                  {tValue ? (
                    <input
                      type="text"
                      className="ml-2 font-bold text-lg leading-[24px] text-darkslategray-200 inline-block w-[90%] outline-none bg-gray-100 placeholder-darkgray-100"
                      placeholder="0.1"
                      // value={`~ ${tValue}`}
                      defaultValue={`~ ${tValue ? tValue : 0}`}
                      // value={`~ ${1.675}`}
                      // value={
                      //   isToLoading
                      //     ? ''
                      //     : tValue &&
                      //       (Number(tValue) * Number(toPrice)).toFixed(4)
                      // }
                      // disabled={true}
                    />
                  ) : null}
                </div>
                <div className="flex flex-row items-start">
                  <div className="flex items-center bg-whitesmoke-200 w-[121px] h-[44px] rounded-md mr-2 shadow-md hover:bg-whitesmoke-100">
                    <div
                      className="cursor-pointer flex flex-row justify-between w-[121px] ml-[12px]"
                      onClick={openToTokensList}
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
