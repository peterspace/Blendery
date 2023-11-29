import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { SellCardScreen1 } from './SellCardScreen1';
import { SellCardScreen2 } from './SellCardScreen2';
import { SellCardScreen3 } from './SellCardScreen3';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactionRate } from '../../../redux/features/transaction/transactionSlice';
import {
  getTokenExchangeRate,
  getTransactionRateInfo,
} from '../../../services/apiService';
import { getTokenListExchange } from '../../../redux/features/token/tokenSlice';

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

export const SellCardHome = (props) => {
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
  const allTokensFromL = useSelector((state) => state.token?.tokenListSell); // send token to get money
  const allTokensToL = useSelector((state) => state.token?.tokenListFiat);

  const [allTokensFrom, setAllTokensFrom] = useState(allTokensFromL || null);
  const [allTokensTo, setAllTokensTo] = useState(allTokensToL || null);

  //======================={RATES and PRICES}========================================================
  const [loading, setLoading] = useState(false);
  const [loadingExchangeRate, setLoadingExchangeRate] = useState(false);

  const [error, setError] = useState('');
  const [exchangeRate, setExchangeRate] = useState('0');
  console.log({ exchangeRate: exchangeRate });
  const transactionRatesL = localStorage.getItem('transactionRatesSellCard')
    ? JSON.parse(localStorage.getItem('transactionRatesSellCard'))
    : 0;
  // const [transactionRates, setTransactionRates] = useState(0);
  const [transactionRates, setTransactionRates] = useState(transactionRatesL);

  const tValue = transactionRates ? transactionRates?.tValueFormatted : 0;

  const percentageProgressL = localStorage.getItem('percentageProgressSellCard')
    ? JSON.parse(localStorage.getItem('percentageProgressSellCard'))
    : 1;

  const [percentageProgress, setPercentageProgress] =
    useState(percentageProgressL);

  const fTokenL = localStorage.getItem('fTokenSellCard')
    ? JSON.parse(localStorage.getItem('fTokenSellCard'))
    : null;

  const [fToken, setFromToken] = useState(fTokenL);
  const tTokenL = localStorage.getItem('tTokenSellCard')
    ? JSON.parse(localStorage.getItem('tTokenSellCard'))
    : null;
  const [tToken, setToToken] = useState(tTokenL);
  const fValueL = localStorage.getItem('fValueSellCard')
    ? JSON.parse(localStorage.getItem('fValueSellCard'))
    : 1;
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
        'percentageProgressSellCard',
        JSON.stringify(percentageProgress)
      );
      setPercentageProgressHome(percentageProgress);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percentageProgress]);

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
      setFromToken(allTokensFromL[0]);
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
        'transactionRatesSellCard',
        JSON.stringify(transactionRates)
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionRates]);

  useEffect(() => {
    if (fToken) {
      localStorage.setItem('fTokenSellCard', JSON.stringify(fToken));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fToken]);

  useEffect(() => {
    if (tToken) {
      localStorage.setItem('tTokenSellCard', JSON.stringify(tToken));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tToken]);

  useEffect(() => {
    if (fValue) {
      localStorage.setItem('fValueSellCard', JSON.stringify(fValue));
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

  //====================================================================================================
  //======================================={PRICE BLOCK}================================================
  //====================================================================================================
  // Simulate fetching expected prices
  useEffect(() => {
    fetchPriceData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fValue, exchangeRate]);

  //=========={on Page Reload or Mount}=============================

  useEffect(() => {
    exchangeRateException();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchPrices = async () => {
      fetchExchangeRate();
    };
    fetchExchangeRate();
    const priceInterval = setInterval(fetchPrices, 30 * 1000); // once every 30 seconds (i.e 4 calls per minute)

    // Clear the interval on unmount
    return () => clearInterval(priceInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fToken, tToken]);

  const fetchPriceData = async () => {
    if (loading) {
      return;
    }
    if (
      fValue === 0 ||
      fValue === '0' ||
      fValue === null ||
      fValue === undefined
    ) {
      return;
    }

    if (
      exchangeRate === 0 ||
      exchangeRate === '0' ||
      exchangeRate === null ||
      exchangeRate === undefined
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
      exchangeRate,
      fValue,
      service,
      subService,
    };
    try {
      setLoading(true);

      const response = await getTransactionRateInfo(userData);

      if (response.tValueFormatted) {
        setTransactionRates(response);
        let newRates = response;
        let updatedRate = { ...newRates, exchangeRate: exchangeRate };
        setTransactionRates(updatedRate); // update the transaction rate
        dispatch(getTransactionRate(updatedRate));
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchExchangeRate = async () => {
    if (loading) {
      return;
    }

    if (!fToken) {
      return;
    }

    if (!tToken) {
      return;
    }
    const userData = { fToken, tToken, service, subService };
    try {
      setLoading(true);

      const response = await getTokenExchangeRate(userData);
      console.log({ exchangeData: response });

      // setExchangeRate(response?.exchangeRate);

      if (response.exchangeRate === 'undefined') {
        // set is loading as true
        //too many requests
        return;
      }
      if (response.exchangeRate) {
        // set is loading as true
        setExchangeRate(response?.exchangeRate);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      setLoadingExchangeRate(true);

      // add loading animate to toPrice and exchange rate
      console.log({ loading: 'loading prices please hold' });
    } else {
      setLoadingExchangeRate(false);
    }
  }, [loading]);

  //====================={EXCHANGE RATE ERROR HANDLING}=========================
  useEffect(() => {
    if (Number(fValue) > 0 && Number(exchangeRate) === 0) {
      // if (Number(fValue) > 0 && !exchangeRate) {
      setLoading(true);
      setLoadingExchangeRate(true);

      setTimeout(() => {
        setLoadingExchangeRate(false);
      }, 3000); // 3 seconds take away the notification
      setTimeout(() => {
        exchangeRateException();
      }, 30000); // 30 seconds interval due to api rate limits
      console.log({ loading: 'loading prices please hold' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fValue, exchangeRate]);
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

      // setExchangeRate(response?.exchangeRate);

      if (response.exchangeRate === 'undefined') {
        // set is loading as true
        //too many requests
        return;
      }
      if (response.exchangeRate) {
        // set is loading as true
        setExchangeRate(response?.exchangeRate);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
      setLoadingExchangeRate(false);
    }
  };

  //====================={PRICE DATA RATE ERROR HANDLING}=========================

  useEffect(() => {
    if (Number(fValue) > 0 && Number(tValue) === 0) {
      setLoading(true);
      setTimeout(() => {
        priceDataException();
      }, 30000); // 30 seconds interval due to api rate limits
      console.log({ loading: 'loading prices please hold' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fValue, tValue]);

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
      exchangeRate === 0 ||
      exchangeRate === '0' ||
      exchangeRate === null ||
      exchangeRate === undefined
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
      exchangeRate,
      fValue,
      service,
      subService,
    };
    try {
      setLoading(true);

      const response = await getTransactionRateInfo(userData);

      if (response.tValueFormatted) {
        setTransactionRates(response);
        let newRates = response;
        let updatedRate = { ...newRates, exchangeRate: exchangeRate };
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
        <SellCardScreen1
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
        <SellCardScreen2
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
        <SellCardScreen3
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
