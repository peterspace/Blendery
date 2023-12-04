import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTransactionRate,
  getTokenPriceData,
  getTokenPriceDataFrom,
  getTokenPriceDataTo,
} from '../redux/features/transaction/transactionSlice';
import {
  stepsExchange,
  stepsBuy,
  stepsSell,
  stepsDefi,
  helpExchange,
  helpBuy,
  helpSell,
  helpDefi,
} from '../constants';
import { HowToCard } from './HowToCard';
import { FaqCard } from './FaqCard';
import { faqExchange, faqBuy, faqSell, faqDefi } from '../constants';
import { FeedBack } from './Feedback';
import { feedback } from '../constants';

import { HelpGuide } from './HelpGuide';
import { FaBitcoin } from 'react-icons/fa'; // Bitcoin
import { FaEthereum } from 'react-icons/fa'; //Ethereum
import styles from './AppContainer.module.css';
import { TokenCard } from './TokenCard';
import { geTokenPriceData } from '../hooks/useFetchToken';

export const CardExchange = (props) => {
  const {
    mode,
    setIsApp,
    service,
    setService,
    subService,
    setSubService,
    setTxInfo,
  } = props;

  //==================================================================
  //The type of service initiated will determine the api calls made and used by the estimator for calling token list and prices

  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  /*********************************************     REDUX STATES    **************************************************** */
  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allTokensFromL = useSelector((state) => state.token?.tokenListExchange);
  const allTokensToL = useSelector((state) => state.token?.tokenListExchange);

  const [allTokensFrom, setAllTokensFrom] = useState(allTokensFromL);

  const [allTokensTo, setAllTokensTo] = useState(allTokensToL);
  const transactionRates = useSelector(
    (state) => state.transaction?.getTransactionRate
  );

  console.log({ transactionRates: transactionRates });
  const youSend = transactionRates ? transactionRates?.youSend : 0;
  const youGet = transactionRates ? transactionRates?.youGet : 0;
  const processingFee = transactionRates ? transactionRates?.processingFee : 0;
  const networkFee = transactionRates ? transactionRates?.networkFee : 0;
  const serviceFee = transactionRates ? transactionRates?.serviceFee : 0;
  // const tValue = transactionRates ? transactionRates?.tValueFormatted : 0;
  const [tValue, setToValue] = useState(0);
  console.log({ tValue: tValue });
  // const exchangeRate = transactionRates ? transactionRates?.exchangeRate : 0;
  const [exchangeRate, setExchangeRate] = useState(0);
  //===={To be added}========
  const estimatedGas = transactionRates ? transactionRates?.estimatedGas : 0;

  const tokenPriceData = useSelector(
    (state) => state.transaction?.tokenPriceData
  );

  const tokenPriceDataFrom = useSelector(
    (state) => state.transaction?.tokenPriceDataFrom
  );

  const fromPriceData = tokenPriceDataFrom?.market_data?.current_price || 0;
  console.log({ fromPriceData: fromPriceData });
  const tokenPriceDataTo = useSelector(
    (state) => state.transaction?.tokenPriceDataTo || 0
  );
  const toPriceData = tokenPriceDataTo?.market_data?.current_price || 0;

  console.log({ toPriceData: toPriceData });

  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  /*********************************************     LOCAL STATES    **************************************************** */
  /********************************************************************************************************************** */
  /********************************************************************************************************************** */

  const fTokenL = localStorage.getItem('fTokenE')
    ? JSON.parse(localStorage.getItem('fTokenE'))
    : null;

  // const [fToken, setFromToken] = useState(allTokensFrom ? allTokensFrom[0] : null);
  const [fToken, setFromToken] = useState();

  const tTokenL = localStorage.getItem('tTokenE')
    ? JSON.parse(localStorage.getItem('tTokenE'))
    : null;

  // const [tToken, setToToken] = useState(allTokensTo ? allTokensTo[1]: null);
  const [tToken, setToToken] = useState();

  const fValueL = localStorage.getItem('fValueE')
    ? JSON.parse(localStorage.getItem('fValueE'))
    : 1;
  const [fValue, setFromValue] = useState(fValueL);

  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  /*********************************************     REACT STATES    **************************************************** */
  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  const [isRedirect, setIsRedirect] = useState(false);
  const [fTitle, setFTitle] = useState('You send');
  const [tTitle, setTTitle] = useState('You get');

  //================{PAGES}==================
  const [isFromTokenPage, setIsFromTokenPage] = useState(false);
  const [isToTokenPage, setIsToTokenPage] = useState(false);
  const [filteredfTokens, setFilteredfTokens] = useState();
  const [filteredtTokens, setFilteredtTokens] = useState();

  console.log({ allTokensFrom: allTokensFrom });
  console.log({ allTokensTo: allTokensTo });
  console.log({ filteredfTokens: filteredfTokens });
  console.log({ filteredtTokens: filteredtTokens });
  //====================================================================================================
  //======================================={PRICE BLOCK}================================================
  //====================================================================================================
  // const [fromPriceData, setFromPriceData] = useState();
  // const [toPriceData, setToPriceData] = useState();
  const [isNaNToValue, setIsNaNToValue] = useState(false);
  const [isNaNExchangeRate, setIsNaNExchangeRate] = useState(false);

  const [isToLoading, setIsToLoading] = useState(false);
  const [isFromLoading, setIsFromLoading] = useState(false);
  const [isFromValueChange, setIsFromValueChange] = useState(false);

  // const { response, loading } = useFetch(`coins/${fToken?.id}`);
  // console.log({tokenData: response})
  // setFromPriceData(response);

  // const { response, loading } = useFetch(`coins/${tToken?.id}`);
  // setToPriceData(response);

  //====================================================================================================
  //======================================={MAIN TRANSACTION CALLS}=====================================
  //====================================================================================================
  //==================={transaction estimates}=======================

  //==================={All Tokens List}===========================
  useEffect(() => {
    if (allTokensFromL) {
      setAllTokensFrom(allTokensFromL);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allTokensFromL]);

  useEffect(() => {
    if (allTokensToL) {
      setAllTokensTo(allTokensToL);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allTokensToL]);
  //==================={Default Selected Tokens }===========================

  useEffect(() => {
    if (allTokensFromL && !fToken) {
      setFromToken(allTokensFromL[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allTokensFromL]);

  useEffect(() => {
    if (allTokensToL && !tToken) {
      setToToken(allTokensToL[1]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allTokensToL]);

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
    // setToValue(0);

    setFromValue(ev.target.value);
    setTimeout(() => {
      setIsFromValueChange(true);
    }, 100);
  }

  //====================================================================================

  async function nextFunc() {
    setTxInfo(null);
    setIsApp(true);
    localStorage.setItem('fTokenE', JSON.stringify(fToken));
    localStorage.setItem('tTokenE', JSON.stringify(tToken));
    setService('exchange');
    setSubService('exchange');
    navigate('/exchange');
  }

  //====================================================================================================
  //======================================={PRICE BLOCK}================================================
  //====================================================================================================

  useEffect(() => {
    if (fToken && tToken) {
      getFromPriceData(fToken?.id);
      setTimeout(() => {
        getToPriceData(tToken?.id);
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     getFromPriceData(fToken?.id);
  //     getToPriceData(tToken?.id);
  //   }, 200);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [fValue]);

  useEffect(() => {
    if (isFromValueChange) {
      getFromPriceData(fToken?.id);
      getToPriceData(tToken?.id);
      updatePriceData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFromValueChange]);
  //isFromValueChange

  useEffect(() => {
    setTimeout(() => {
      getFromPriceData(fToken?.id);
      getToPriceData(tToken?.id);
    }, 200);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fToken, tToken]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     getToPriceData(tToken?.id);
  //   }, 200);

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [tValue]);

  useEffect(() => {
    setTimeout(() => {
      updatePriceData();
    }, 400);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fToken, tToken, service, subService]);

  // useEffect(() => {
  //   setIsToLoading(true);
  //   setTimeout(() => {
  //     updatePriceData();
  //     setIsToLoading(false);
  //   }, 400);

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [fromPriceData, service, subService]);

  // useEffect(() => {
  //   if (fromPriceData === 0) {
  //     getFromPriceData(fToken?.id);
  //     setTimeout(() => {
  //       getToPriceData(tToken?.id);
  //       updatePriceData();
  //     }, 400);
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [fromPriceData]);

  useEffect(() => {
    checkTValue();
    checkExchangeRate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionRates]);

  async function checkTValue() {
    let newValue = transactionRates && transactionRates?.tValueFormatted;
    if (isNaN(newValue)) {
      setIsNaNToValue(true);
      return;
    } else {
      setToValue(newValue);
    }
  }
  async function checkExchangeRate() {
    let newValue = transactionRates && transactionRates?.exchangeRate;
    if (isNaN(newValue)) {
      setIsNaNExchangeRate(true);
      return;
    } else {
      setExchangeRate(newValue);
    }
  }

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     getPrices();
  //   }, 120000); // every 2 minutes
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  async function getPrices() {
    if (!fToken) {
      return;
    }
    if (!tToken) {
      return;
    }
    if (fToken && tToken) {
      getFromPriceData(fToken?.id);
      getToPriceData(tToken?.id);
    }
  }

  const getFromPriceData = async (id) => {
    dispatch(getTokenPriceDataFrom(id));
    // const updatedResponse = await geTokenPriceData(id);
    // setFromPriceData(updatedResponse?.market_data?.current_price);
  };

  const getToPriceData = async (id) => {
    dispatch(getTokenPriceDataTo(id));
    // const updatedResponse = await geTokenPriceData(id);
    // setToPriceData(updatedResponse?.market_data?.current_price);
  };

  //dispatch(getTokenPriceData())
  //=============={on system mount}============================

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     updatePriceData();
  //   }, 60000); // every minute
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  async function updatePriceData() {
    if (
      fValue === 0 ||
      fValue === '0' ||
      fValue === null ||
      fValue === undefined
    ) {
      return;
    }

    if (!fToken) {
      return;
    }

    if (!tToken) {
      return;
    }

    const userData = {
      fToken,
      fromPriceData,
      tToken,
      toPriceData,
      fValue,
      service,
      subService,
    };

    dispatch(getTransactionRate(userData));
  }

  return (
    <>
      {/* ================================{SWAP MAIN ACTIVE STATE}===================================== */}
      {isFromTokenPage === false && isToTokenPage === false ? (
        <div className="flex flex-col gap-[24px]">
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
                      onClick={() => setIsFromTokenPage(true)}
                    >
                      <div className="flex flex-row items-center gap-2">
                        <img
                          className="w-[40px] h-$ shrink-0 overflow-hidden rounded-full"
                          alt={fToken?.name}
                          src={fToken?.image}
                        />
                        <span className="font-bold text-[16px] text-darkslategray-200 inline-block">
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
                          : `${`1 ${fToken?.symbol} = ${exchangeRate}  ${tToken?.symbol}`}`}</div> */}
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

          <div
            className="flex flex-row justify-center items-center h-[49px] cursor-pointer text-white bg-bgPrimary hover:bg-bgPrimaryHover focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded dark:bg-blue-600 dark:hover:bg-bgPrimary dark:focus:ring-bgPrimaryHover"
            onClick={nextFunc}
          >
            {`${service} ${fToken?.symbol.toUpperCase()} now`}
          </div>
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
