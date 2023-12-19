import React, { useEffect, useState } from 'react';
import { Progress } from '../../components/Progress';
import { Details } from '../../components/Details';
import { SendFund } from '../../components/SendFund';
import { Timer } from '../../components/Timer';

import {
  getTokenExchangeRate,
  getTransactionRateInfo,
} from '../../services/apiService';

// user must be logged in at this stage
export const Exchange3of4 = (props) => {
  const { percentageProgress, fTitle, tTitle, txData, setRefetchTxData } =
    props;

  /**
   * TODO:
   * fetch transaction rates estimate again
   * update transaction rates at the time the user clicks paid
   */

  //======================{updateing transaction rates}=================

  //======================={RATES and PRICES}========================================================
  const [loading, setLoading] = useState(false);
  const [loadingExchangeRate, setLoadingExchangeRate] = useState(false);

  const [error, setError] = useState('');
  const [retryMessage, setRetryMessage] = useState();
  const [exchangeRateInfo, setExchangeRateInfo] = useState('0');
  console.log({ exchangeRateInfo: exchangeRateInfo });
  const transactionRatesL = localStorage.getItem('transactionRatesExchange')
    ? JSON.parse(localStorage.getItem('transactionRatesExchange'))
    : 0;
  // const [transactionRates, setTransactionRates] = useState(0);
  const [transactionRates, setTransactionRates] = useState(transactionRatesL);
  console.log({ transactionRates: transactionRates });

  //======================={RATES and PRICES}========================================================

  const [activeInterval, setActiveInterval] = useState(0);
  const [initailInterval, setinitailInterval] = useState(15000); // fixed// every 15 seconds
  // const [initailInterval, setinitailInterval] = useState(30000); // fixed
  const [delay, setDelay] = useState(60000); // fixed 1 minute 0r 60 secs
  const [nextInterval, setNextInterval] = useState(initailInterval);

  console.log({ activeInterval: activeInterval });
  // const [nextInterval, setNextInterval] = useState(30000);
  console.log({ nextInterval: nextInterval });

  const fToken = txData?.fToken;
  const tToken = txData?.tToken;
  const service = txData?.service;
  const subService = txData?.subService;
  const fValue = txData?.fValue;

  useEffect(() => {
    if (transactionRates) {
      localStorage.setItem(
        'transactionRatesExchange',
        JSON.stringify(transactionRates)
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionRates]);

  //====================================================================================================
  //======================================={PRICE BLOCK}================================================
  //====================================================================================================

  useEffect(() => {
    if (activeInterval) {
      setNextInterval(activeInterval);
    }
  }, [activeInterval]);

  useEffect(() => {
    if (exchangeRateInfo === '0.000') {
      setActiveInterval(initailInterval + delay);

      setTimeout(() => {
        setActiveInterval(initailInterval);
      }, initailInterval + delay);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exchangeRateInfo]);

  // Simulate fetching expected prices
  useEffect(() => {
    priceDataException();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fValue, exchangeRateInfo]);

  //=========={on Page Reload or Mount}=============================

  useEffect(() => {
    const fetchPrices = async () => {
      exchangeRateException();
      priceDataException();
    };

    fetchPrices();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fToken, tToken]);

  useEffect(() => {
    const fetchPrices = async () => {
      exchangeRateException();
      priceDataException();
    };
    fetchPrices();

    let priceInterval;

    let duration = nextInterval; // stable mode // 15000 for buy and sell since we're only making a single request per time

    priceInterval = setInterval(fetchPrices, duration); // once every 30 seconds (i.e 4 calls per minute)

    // Clear the interval on unmount
    return () => clearInterval(priceInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fToken, tToken]);

  useEffect(() => {
    if (exchangeRateInfo === '0.000') {
      setLoadingExchangeRate(true);
      setLoading(true);
      console.log({ loading: 'loading prices please hold' });
    } else {
      setLoadingExchangeRate(false);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exchangeRateInfo]);

  const exchangeRateException = async () => {
    if (!fToken) {
      return;
    }

    if (!tToken) {
      return;
    }
    const userData = { fToken, tToken, service, subService };
    try {
      setLoading(true);
      setLoadingExchangeRate(true);

      const response = await getTokenExchangeRate(userData);
      console.log({ exchangeData: response });

      // setExchangeRateInfo(response?.exchangeRate);

      if (response.exchangeRate === 'undefined') {
        // set is loading as true
        //too many requests
        return;
      }
      if (response.exchangeRate) {
        // set is loading as true
        setExchangeRateInfo(response?.exchangeRate);
        setRetryMessage('');
      }
      if (response.message) {
        setRetryMessage(response?.message);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
      setLoadingExchangeRate(false);
    }
  };

  //====================={PRICE DATA RATE ERROR HANDLING}=========================

  const priceDataException = async () => {
    if (
      fValue === 0 ||
      fValue === '0' ||
      fValue === null ||
      fValue === undefined
    ) {
      return;
    }

    if (
      Number(exchangeRateInfo) === 0 ||
      exchangeRateInfo === '0.000' ||
      exchangeRateInfo === null ||
      exchangeRateInfo === undefined
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
      tToken,
      exchangeRate: exchangeRateInfo,
      fValue,
      service,
      subService,
    };
    try {
      setLoading(true);

      const response = await getTransactionRateInfo(userData);

      if (response.tValueFormatted) {
        // setTransactionRates(response);
        let newRates = response;
        let updatedRate = { ...newRates, exchangeRate: exchangeRateInfo };
        setTransactionRates(updatedRate);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col xl:flex-row justify-center">
      <>
        {txData ? (
          <div className="flex flex-col xl:flex-row gap-[32px] mt-[8px]">
            <div className="flex-col xl:flex-row h-[500px]">
              <Progress
                percentageProgress={
                  txData?.percentageProgress
                    ? txData?.percentageProgress
                    : percentageProgress
                }
              />
            </div>
            <div className="flex flex-col justify-start items-start xl:justify-center xl:items-center mt-6 xl:mt-0 gap-4">
              <SendFund
                txData={txData}
                setRefetchTxData={setRefetchTxData}
                transactionRates={transactionRates}
              />
            </div>
            <div className="flex-col xl:flex-row h-[374px]">
              <div className="mb-[16px]">
                <Timer txData={txData} />
              </div>

              <Details
                fTitle={fTitle}
                tTitle={tTitle}
                txData={txData}
                transactionRates={transactionRates}
              />
            </div>
          </div>
        ) : null}
      </>
    </div>
  );
};
