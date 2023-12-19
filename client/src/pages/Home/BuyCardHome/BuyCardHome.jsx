import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BuyCardScreen1 } from './BuyCardScreen1';
import { BuyCardScreen2 } from './BuyCardScreen2';
import { BuyCardScreen3 } from './BuyCardScreen3';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactionRate } from '../../../redux/features/transaction/transactionSlice';
import {
  getTokenExchangeRate,
  getTransactionRateInfo,
} from '../../../services/apiService';
import { getTokenListExchange } from '../../../redux/features/token/tokenSlice';

//w-[370px] ===w-[300px]
//w-[375px] === w-[320px] xs:w-[340px]
const paymentOptions = ['card', 'cash'];
const providers = [
  {
    name: 'Phone',
    url: '/image@2x.png',
    rate: '0.00526',
    class: 'bg-gray-200',
    providerUrl: 'https://www.simplex.com/',
  },
  {
    name: 'Card',
    url: '/MoonPay.png',
    rate: '0.00519',
    providerUrl: 'https://www.moonpay.com',
  },
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

export const BuyCardHome = (props) => {
  const {
    mode,
    user,
    service,
    subService,
    txInfo,
    setTxInfo,
    setService,
    setSubService,
    setPercentageProgressHome,
  } = props;

  const location = useLocation();

  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  /*********************************************     REDUX STATES    **************************************************** */
  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  const dispatch = useDispatch();
  const allTokensFromL = useSelector((state) => state.token?.tokenListFiat); // send money to get token
  const allTokensToL = useSelector((state) => state.token?.tokenListBuy); //

  const [allTokensFrom, setAllTokensFrom] = useState(allTokensFromL || null);
  const [allTokensTo, setAllTokensTo] = useState(allTokensToL || null);

  //======================={RATES and PRICES}========================================================
  const [loading, setLoading] = useState(false);
  const [loadingExchangeRate, setLoadingExchangeRate] = useState(false);

  const [error, setError] = useState('');
  const [retryMessage, setRetryMessage] = useState();
  const [exchangeRateInfo, setExchangeRateInfo] = useState('0');
  console.log({ exchangeRateInfo: exchangeRateInfo });
  const transactionRatesL = localStorage.getItem('transactionRatesBuyCard')
    ? JSON.parse(localStorage.getItem('transactionRatesBuyCard'))
    : 0;
  // const [transactionRates, setTransactionRates] = useState(0);
  const [transactionRates, setTransactionRates] = useState(transactionRatesL);
  console.log({ transactionRates: transactionRates });

  const tValue = transactionRates ? transactionRates?.tValueFormatted : 0;
  const exchangeRate = transactionRates ? transactionRates?.exchangeRate : 0;

  const percentageProgressL = localStorage.getItem('percentageProgressBuyCard')
    ? JSON.parse(localStorage.getItem('percentageProgressBuyCard'))
    : 1;

  const [percentageProgress, setPercentageProgress] =
    useState(percentageProgressL);

  const fTokenL = localStorage.getItem('fTokenBuyCard')
    ? JSON.parse(localStorage.getItem('fTokenBuyCard'))
    : null;

  const [fToken, setFromToken] = useState(fTokenL);
  const tTokenL = localStorage.getItem('tTokenBuyCard')
    ? JSON.parse(localStorage.getItem('tTokenBuyCard'))
    : null;
  const [tToken, setToToken] = useState(tTokenL);
  // const fValueL = localStorage.getItem('fValueBuyCard')
  //   ? JSON.parse(localStorage.getItem('fValueBuyCard'))
  //   : 150;
  const fValueL = localStorage.getItem('fValueBuyCard')
    ? JSON.parse(localStorage.getItem('fValueBuyCard'))
    : 15000;
  const [fValue, setFromValue] = useState(fValueL);

  const [fTitle, setFTitle] = useState('You give');
  const [tTitle, setTTitle] = useState('You get');
  //=============={Exchange1of4}=======================================

  const userAddressL = localStorage.getItem('userAddress')
    ? JSON.parse(localStorage.getItem('userAddress'))
    : null;

  const [userAddress, setUserAddress] = useState(userAddressL);

  //=============={Exchange3of4}=======================================

  const telegramL = localStorage.getItem('telegram')
    ? JSON.parse(localStorage.getItem('telegram'))
    : null;

  const [telegram, setTelegram] = useState(telegramL);

  const paymentMethodL = localStorage.getItem('paymentMethod')
    ? JSON.parse(localStorage.getItem('paymentMethod'))
    : paymentOptions[0];

  const [paymentMethod, setPaymentMethod] = useState(paymentMethodL);

  const countryL = localStorage.getItem('country')
    ? JSON.parse(localStorage.getItem('country'))
    : cities[0]?.country;

  const cityDataL = localStorage.getItem('cityData')
    ? JSON.parse(localStorage.getItem('cityData'))
    : null;
  const cityL = localStorage.getItem('city')
    ? JSON.parse(localStorage.getItem('city'))
    : null;

  const [country, setCountry] = useState(countryL);
  const [cityData, setCityData] = useState(cityDataL);
  const [city, setCity] = useState(cityL);

  console.log({
    city: city,
    cityData: cityData,
    country: country,
  });

  const providerL = localStorage.getItem('provider')
    ? JSON.parse(localStorage.getItem('provider'))
    : providers[0];
  // const [provider, setProvider] = useState(providers[0]); // important
  const [provider, setProvider] = useState(providerL); // important
  console.log({ providerActive: provider });

  const [activeInterval, setActiveInterval] = useState(0);
  const [initailInterval, setinitailInterval] = useState(15000); // fixed// every 15 seconds
  // const [initailInterval, setinitailInterval] = useState(30000); // fixed
  const [delay, setDelay] = useState(60000); // fixed 1 minute 0r 60 secs
  const [nextInterval, setNextInterval] = useState(initailInterval);

  console.log({ activeInterval: activeInterval });
  // const [nextInterval, setNextInterval] = useState(30000);
  console.log({ nextInterval: nextInterval });

  //====================================================================================================
  //======================================={BANK INFO}==================================================
  //====================================================================================================

  const fullNameL = localStorage.getItem('fullName')
    ? JSON.parse(localStorage.getItem('fullName'))
    : null;

  const bankNameL = localStorage.getItem('bankName')
    ? JSON.parse(localStorage.getItem('bankName'))
    : null;
  const cardNumberL = localStorage.getItem('cardNumber')
    ? JSON.parse(localStorage.getItem('cardNumber'))
    : null;

  const phoneL = localStorage.getItem('phone')
    ? JSON.parse(localStorage.getItem('phone'))
    : null;

  const [fullName, setFullName] = useState(fullNameL);
  const [bankName, setBankName] = useState(bankNameL);
  const [cardNumber, setCardNumber] = useState(cardNumberL);
  const [phone, setPhone] = useState(phoneL);

  console.log({ bankName: bankName });

  /************************************************************************************** */
  /******************************{BANK PAYMENT INFORMATION}****************************** */
  /************************************************************************************** */

  useEffect(() => {
    if (fullName) {
      localStorage.setItem('fullName', JSON.stringify(fullName));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bankName]);
  useEffect(() => {
    if (bankName) {
      localStorage.setItem('bankName', JSON.stringify(bankName));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bankName]);
  useEffect(() => {
    if (cardNumber) {
      localStorage.setItem('cardNumber', JSON.stringify(cardNumber));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardNumber]);
  useEffect(() => {
    if (phone) {
      localStorage.setItem('phone', JSON.stringify(phone));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phone]);

  //====================================================================================================
  //======================================={MAIN TRANSACTION CALLS}=====================================
  //====================================================================================================
  //======================================================================================================

  useEffect(() => {
    dispatch(getTokenListExchange());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (percentageProgress) {
      localStorage.setItem(
        'percentageProgressBuyCard',
        JSON.stringify(percentageProgress)
      );
      setPercentageProgressHome(percentageProgress);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percentageProgress]);

  useEffect(() => {
    if (allTokensFromL) {
      // setAllTokensFrom(allTokensFromL);
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
      setFromToken(allTokensFromL[3]);
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
    localStorage.setItem('prevLocation', JSON.stringify(location?.pathname));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  useEffect(() => {
    if (country) {
      localStorage.setItem('country', JSON.stringify(country));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country]);

  useEffect(() => {
    if (cityData) {
      localStorage.setItem('cityData', JSON.stringify(cityData));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityData]);

  useEffect(() => {
    if (city) {
      localStorage.setItem('city', JSON.stringify(city));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  useEffect(() => {
    if (telegram) {
      localStorage.setItem('telegram', JSON.stringify(telegram));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [telegram]);
  useEffect(() => {
    if (transactionRates) {
      localStorage.setItem(
        'transactionRatesBuyCard',
        JSON.stringify(transactionRates)
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionRates]);

  useEffect(() => {
    if (fToken) {
      localStorage.setItem('fTokenBuyCard', JSON.stringify(fToken));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fToken]);

  useEffect(() => {
    if (tToken) {
      localStorage.setItem('tTokenBuyCard', JSON.stringify(tToken));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tToken]);

  useEffect(() => {
    if (fValue) {
      localStorage.setItem('fValueBuyCard', JSON.stringify(fValue));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fValue]);

  useEffect(() => {
    if (userAddress) {
      localStorage.setItem('userAddress', JSON.stringify(userAddress));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAddress]);

  useEffect(() => {
    if (paymentMethod) {
      localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentMethod]);

  //============================================{Token selection}==============================

  //================================================================================

  useEffect(() => {
    if (paymentMethod === 'cash') {
      setFromValue(2000);
    }
    if (paymentMethod === 'card') {
      setFromValue(15000);
    }
  }, [paymentMethod]);

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

        dispatch(getTransactionRate(updatedRate));
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  //====={use source data to reset values here e.g booking app approach like in placeForm }==============
  return (
    <>
      {percentageProgress === 1 && (
        <BuyCardScreen1
          percentageProgress={percentageProgress}
          setPercentageProgress={setPercentageProgress}
          fTitle={fTitle}
          tTitle={tTitle}
          fToken={fToken}
          setFromToken={setFromToken}
          tToken={tToken}
          setToToken={setToToken}
          fValue={fValue}
          setFromValue={setFromValue}
          loading={loading}
          mode={mode}
          service={service}
          setService={setService}
          subService={subService}
          setSubService={setSubService}
          setTxInfo={setTxInfo}
          allTokensFrom={allTokensFrom}
          allTokensTo={allTokensTo}
          exchangeRate={exchangeRate}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          paymentOptions={paymentOptions}
          cities={cities}
          setCountry={setCountry}
          setCityData={setCityData}
          setCity={setCity}
          country={country}
          cityData={cityData}
          city={city}
          tValue={tValue}
          transactionRates={transactionRates}
          loadingExchangeRate={loadingExchangeRate}
        />
      )}
      {percentageProgress === 2 && (
        <BuyCardScreen2
          percentageProgress={percentageProgress}
          setPercentageProgress={setPercentageProgress}
          fTitle={fTitle}
          tTitle={tTitle}
          fToken={fToken}
          setFromToken={setFromToken}
          tToken={tToken}
          setToToken={setToToken}
          fValue={fValue}
          setFromValue={setFromValue}
          loading={loading}
          mode={mode}
          service={service}
          setService={setService}
          subService={subService}
          setSubService={setSubService}
          setTxInfo={setTxInfo}
          allTokensFrom={allTokensFrom}
          allTokensTo={allTokensTo}
          exchangeRate={exchangeRate}
          transactionRates={transactionRates}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          paymentOptions={paymentOptions}
          cities={cities}
          setCountry={setCountry}
          setCityData={setCityData}
          setCity={setCity}
          country={country}
          cityData={cityData}
          city={city}
          tValue={tValue}
          userAddress={userAddress}
          setUserAddress={setUserAddress}
          telegram={telegram}
          setTelegram={setTelegram}
          //==================================
          provider={provider}
          setProvider={setProvider}
          fullName={fullName}
          setFullName={setFullName}
          bankName={bankName}
          setBankName={setBankName}
          cardNumber={cardNumber}
          setCardNumber={setCardNumber}
          phone={phone}
          setPhone={setPhone}
          providers={providers}
          loadingExchangeRate={loadingExchangeRate}
        />
      )}
      {percentageProgress === 3 && (
        <BuyCardScreen3
          percentageProgress={percentageProgress}
          setPercentageProgress={setPercentageProgress}
          fToken={fToken}
          tToken={tToken}
          fValue={fValue}
          userAddress={userAddress}
          fTitle={fTitle}
          tTitle={tTitle}
          service={service}
          subService={subService}
          setTxInfo={setTxInfo}
          country={country}
          city={city}
          //==================================
          provider={provider}
          fullName={fullName}
          bankName={bankName}
          cardNumber={cardNumber}
          phone={phone}
          transactionRates={transactionRates}
          loadingExchangeRate={loadingExchangeRate}
        />
      )}
    </>
  );
};
