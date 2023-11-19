import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';

import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { BuyCardScreen1 } from './BuyCardScreen1';
import { BuyCardScreen2 } from './BuyCardScreen2';
import { BuyCardScreen3 } from './BuyCardScreen3';
import { Footer } from '../../../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserTransactions,
  getTransactionRate,
  getUserExchange,
  getUserDefi,
  getUserBuyCash,
  getUserBuyCard,
  getUserSellCash,
  getUserSellCard,
  getTransactionByTxIdInternal,
} from '../../../redux/features/transaction/transactionSlice';

import { getTokenListBuy } from '../../../redux/features/token/tokenSlice';
import {
  getTokenExchangeRate,
  getTransactionRateInfo,
  getTransactionByTxIdService,
} from '../../../services/apiService';

//w-[370px] ===w-[300px]
//w-[375px] === w-[320px] xs:w-[340px]

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
  } = props;

  const location = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  //==================================================================
  //The type of service initiated will determine the api calls made and used by the estimator for calling token list and prices
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  /*********************************************     REDUX STATES    **************************************************** */
  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  // const txData = useSelector((state) => state.transaction?.transactionByTxId);
  const txData = useSelector(
    (state) => state.transaction?.transactionByTxIdInternal
  );
  const [refetchTxData, setRefetchTxData] = useState(false);

  //======================={RATES and PRICES}========================================================
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [exchangeRate, setExchangeRate] = useState('0');
  console.log({ exchangeRate: exchangeRate });
  const [transactionRates, setTransactionRates] = useState(0);
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
  const estimatedGas = transactionRates ? transactionRates?.estimatedGas : 0;
  const transactionRatesError = transactionRates
    ? transactionRates?.message
    : '';
  // console.log({ transactionRatesError: transactionRatesError });
  const transactionRatesLoading = transactionRates
    ? transactionRates?.isLoading
    : false;
  //======================={RATES and PRICES}========================================================

  //===={To be added}========
  //==============={Primary Data}=========================
  const percentageProgressL = localStorage.getItem('percentageProgress')
    ? JSON.parse(localStorage.getItem('percentageProgress'))
    : 0;

  const [percentageProgress, setPercentageProgress] =
    useState(percentageProgressL);

  const fTokenL = localStorage.getItem('fTokenE')
    ? JSON.parse(localStorage.getItem('fTokenE'))
    : null;
  // const [fToken, setFromToken] = useState();
  const [fToken, setFromToken] = useState(fTokenL);
  const tTokenL = localStorage.getItem('tTokenE')
    ? JSON.parse(localStorage.getItem('tTokenE'))
    : null;

  // const [tToken, setToToken] = useState();
  const [tToken, setToToken] = useState(tTokenL);
  const fValueL = localStorage.getItem('fValueE')
    ? JSON.parse(localStorage.getItem('fValueE'))
    : 150;
  const [fValue, setFromValue] = useState(fValueL);

  const [fTitle, setFTitle] = useState('You send');
  const [tTitle, setTTitle] = useState('You get');
  //=============={Exchange1of4}=======================================

  const userAddressL = localStorage.getItem('userAddress')
    ? JSON.parse(localStorage.getItem('userAddress'))
    : null;

  const [userAddress, setUserAddress] = useState(userAddressL);
  //=============={Exchange3of4}=======================================

  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  /*********************************************     LOCAL STATES    **************************************************** */
  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  const telegramL = localStorage.getItem('telegram')
    ? JSON.parse(localStorage.getItem('telegram'))
    : null;

  const [telegram, setTelegram] = useState(telegramL);

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
    localStorage.setItem('prevLocation', JSON.stringify(location?.pathname));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //======================================================================================================

  useEffect(() => {
    dispatch(getUserTransactions());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'percentageProgress',
      JSON.stringify(percentageProgress)
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percentageProgress]);

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

  useEffect(() => {
    localStorage.setItem('telegram', JSON.stringify(telegram));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [telegram]);

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
    localStorage.setItem('userAddress', JSON.stringify(userAddress));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAddress]);

  useEffect(() => {
    localStorage.setItem('provider', JSON.stringify(provider));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider]);

  useEffect(() => {
    if (user) {
      dispatch(getUserTransactions());
      dispatch(getUserExchange());
      dispatch(getUserDefi());
      dispatch(getUserBuyCash());
      dispatch(getUserBuyCard());
      dispatch(getUserSellCash());
      dispatch(getUserSellCard());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  //==============={update lists}===============================
  useEffect(() => {
    dispatch(getTokenListBuy());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //==============={update lists at intervals}===============================
  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(getTokenListBuy());
    }, 120000); // every 2 minute
    return () => {
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //==================================={setting and refetching and updating txData}=======================================================

  useEffect(() => {
    if (refetchTxData) {
      fetchTxData();
      setRefetchTxData(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetchTxData]);

  const fetchTxData = async () => {
    if (user && txData) {
      const response = await getTransactionByTxIdService(txData?._id);
      dispatch(getTransactionByTxIdInternal(response)); // dispatch txData globally
      setTxInfo(response);
    }
  };

  //====================================================================================================
  //======================================={PRICE BLOCK}================================================
  //====================================================================================================

  // Simulate fetching expected prices
  useEffect(() => {
    fetchPriceData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fValue, exchangeRate]);

  useEffect(() => {
    const fetchPrices = async () => {
      fetchExchangeRate();
    };
    // Fetch prices immediately and then every 2 minutes
    fetchExchangeRate();
    const priceInterval = setInterval(fetchPrices, 2 * 60 * 1000);
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
      // add loading animate to toPrice and exchange rate
      console.log({ loading: 'loading prices please hold' });
    }
  }, [loading]);

  //====={use source data to reset values here e.g booking app approach like in placeForm }==============
  return (
    <>
      <div className="h-screen mt-[64px] mb-[64px] overflow-auto">
        {!txData && percentageProgress === 0 && (
          <BuyCardScreen2
          mode={mode}
          service={service}
          setService={setService}
          subService={subService}
          setSubService={setSubService}
          setTxInfo={setTxInfo}
          />
        )}
        {!txData && percentageProgress === 1 && (
          <BuyCardScreen2
            percentageProgress={percentageProgress}
            setPercentageProgress={setPercentageProgress}
            userAddress={userAddress}
            setUserAddress={setUserAddress}
            fTitle={fTitle}
            tTitle={tTitle}
            service={service}
            provider={provider}
            providers={providers}
            setProvider={setProvider}
            subService={subService}
            fToken={fToken}
            setFromToken={setFromToken}
            tToken={tToken}
            setToToken={setToToken}
            fValue={fValue}
            setFromValue={setFromValue}
            loading={loading}
            fullName={fullName}
            setFullName={setFullName}
            bankName={bankName}
            setBankName={setBankName}
            cardNumber={cardNumber}
            setCardNumber={setCardNumber}
            phone={phone}
            setPhone={setPhone}
          />
        )}
        {!txData && percentageProgress === 2 && (
          <BuyCardScreen3
            percentageProgress={percentageProgress}
            setPercentageProgress={setPercentageProgress}
            fToken={fToken}
            tToken={tToken}
            fValue={fValue}
            userAddress={userAddress}
            fTitle={fTitle}
            tTitle={tTitle}
            provider={provider}
            service={service}
            country={country}
            subService={subService}
            setTxInfo={setTxInfo}
            fullName={fullName}
            bankName={bankName}
            cardNumber={cardNumber}
            phone={phone}
          />
        )}
      </div>

      <div className="relative bg-white w-full overflow-auto text-left text-sm text-gray-400 font-montserrat">
        <div className="mt-8 flex flex-col justify-center items-center gap-4 mb-8">
          <div className="flex bg-lightslategray-300 w-full h-px" />
          <Footer />
        </div>
      </div>
    </>
  );
};
