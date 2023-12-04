import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContainer } from './pages/Home/AppContainer';
import { Header } from './components/Header';
import { ExchangePair } from './components/ExchangePair';
import { TransactionDetail } from './components/TransactionDetail.';
import { BuyCard, BuyCash, SellCard, SellCash, DeFi, Exchange } from './pages';
import CryptoHome from './pages/CoinsPage/CryptoHome';
import CryptoDetail from './pages/CoinsPage/CryptoDetail';
import LogoMarkets from './components/coins/LogoMarkets';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Auth } from './pages/Auth/Auth';
import { Reset } from './pages/auth/Reset';
import { Otp } from './pages/auth/Otp';
import { getTransactionByTxIdInternal } from './redux/features/transaction/transactionSlice';
axios.defaults.withCredentials = true;

function App() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const [userL, setUser] = useState('');

  const txInfoL =
    (localStorage.getItem('txInfo') &&
      JSON.parse(localStorage.getItem('txInfo'))) ||
    null;

  const [txInfo, setTxInfo] = useState(txInfoL);

  const isLoggedInL = localStorage.getItem('isLoggedIn')
    ? JSON.parse(localStorage.getItem('isLoggedIn'))
    : false;

  const modeL = localStorage.getItem('mode')
    ? JSON.parse(localStorage.getItem('mode'))
    : true;

  const [mode, setMode] = useState(modeL);
  const serviceL = localStorage.getItem('service')
    ? JSON.parse(localStorage.getItem('service'))
    : 'exchange';
  const [service, setService] = useState(serviceL);

  const subServiceL = localStorage.getItem('subService')
    ? JSON.parse(localStorage.getItem('subService'))
    : 'exchange';
  const [subService, setSubService] = useState(subServiceL);

  const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInL);
  const txDataRedux = useSelector(
    (state) => state.transaction?.transactionByTxIdInternal
  );
  const txDataLocal = localStorage.getItem('txData')
    ? JSON.parse(localStorage.getItem('txData'))
    : null;
  const [txData, setTxData] = useState(txDataLocal);

  console.log({ txDataInBackground: txData });
  const [blockChainTx, setBlockChainTx] = useState();
  //=========={Refetch current transaction}=====================================
  const { data } = useQuery(
    ['GET_ONE_USER_TRANSACTION'],
    async () => {
      if (txData?._id) {
        const { data } = await axios.get(
          `${BACKEND_URL}/transaction/getTransactionByTxId/${txData?._id}`
        );
        return data;
      }
    },
    {
      refetchInterval: 3000, // every 3 seconds
      refetchIntervalInBackground: true, // when tab is not on focus
      refetchOnMount: true,
    }
  );
  //=========={verify blockchain payments}=====================================
  const { data: blockChainData } = useQuery(
    ['UPDATE_ONE_BLOCKCHAIN_TRANSACTION'],
    async () => {
      if (!blockChainTx) {
        return;
      }
      const userData = {
        id: blockChainTx?._id,
      };

      const { data } = await axios.patch(
        `${BACKEND_URL}/transaction/updateOneBlockchainTransactionById`,
        userData
      );
      console.log({ blockChainResult: data });
      return data;
    },
    {
      refetchInterval: 60000, // every minute
      refetchIntervalInBackground: true, // when tab is not on focus
      refetchOnMount: true,
    }
  );

  //====================={Global txData dispatch}==================================
  useEffect(() => {
    if (data) {
      setTxInfo(data);
      dispatch(getTransactionByTxIdInternal(data)); // dispatch txData globally
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  //====================={To Monitor the blockchain}==================================
  useEffect(() => {
    if (
      txData?.status === 'Paid' &&
      txData?.service === 'sell' &&
      txData?.subService === 'sellCash'
    ) {
      setBlockChainTx(txData);
    }

    if (
      txData?.status === 'Paid' &&
      txData?.service === 'sell' &&
      txData?.subService === 'sellCard'
    ) {
      setBlockChainTx(txData);
    }

    if (
      txData?.status === 'Paid' &&
      txData?.service === 'exchange' &&
      txData?.subService === 'exchange'
    ) {
      setBlockChainTx(txData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [txData]);

  //================================={TXDATA HANDLING wITH LOCAL STORAGE, REDUX, REACT QUERY AND REACT STATES}========================================

  //============{The Goal is have the reight id: txData?._id to fetch transaction detail using React Query, fetching data in the background}
  //if real data in txDataRedux set txData as value
  useEffect(() => {
    if (txDataRedux) {
      setTxData(txDataRedux);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [txDataRedux]);
  //if there is no data in txDataRedux first remove txData from local storage to avoid empty value error and set txData as null
  useEffect(() => {
    if (txDataRedux === null) {
      localStorage.removeItem('txData');
      setTxData(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [txDataRedux]);
  //if there is no data in txData (e.g if txdata is null, undefined or {}) then do not save value to local storage, else you can save the data
  useEffect(() => {
    if (txData) {
      localStorage.setItem('txData', JSON.stringify(txData));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [txData]);

  //================================={TXDATA BLOCK}========================================

  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  // making the default light mode
  useEffect(() => {
    localStorage.setItem('mode', JSON.stringify(mode));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  useEffect(() => {
    localStorage.setItem('service', JSON.stringify(service));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service]);

  useEffect(() => {
    localStorage.setItem('subService', JSON.stringify(subService));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subService]);

  useEffect(() => {
    localStorage.setItem('txInfo', JSON.stringify(txInfo));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [txInfo]);

  return (
    <div
      className={`flex flex-col justify-between w-full h-screen text-left text-sm text-gray-400 font-montserrat ${
        mode === true ? 'bg-white' : 'bg-bgDarkMode'
      }`}
    >
      {' '}
      <BrowserRouter>
        <ToastContainer />
        <div className="h-[50px]">
          <Header mode={mode} setMode={setMode} user={user} />
        </div>
        <div
          className={`relative overflow-auto ${
            mode === true ? 'bg-white' : 'bg-bgDarkMode'
          }`}
        >
          <Routes>
            <Route path="/resetpassword/:resetToken" element={<Reset />} />
            <Route
              path="/otp"
              element={<Otp setUser={setUser} setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route
              path="/otp/:authId"
              element={<Otp setUser={setUser} setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route
              path="/auth/success/:authId"
              element={<Auth setUser={setUser} setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route
              path="/auth/failure/:message"
              element={<Auth setUser={setUser} setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route
              path="/auth"
              element={<Auth setUser={setUser} setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route
              path="/dashboard"
              element={
                <Dashboard
                  mode={mode}
                  setMode={setMode}
                  user={user}
                  service={service}
                  setService={setService}
                  setSubService={setSubService}
                  txData={txData}
                  setTxData={setTxData}
                  setTxInfo={setTxInfo}
                />
              }
            />

            <Route path="/coins" element={<CryptoHome />} />
            <Route path="/coin/:id" element={<CryptoDetail />} />
            <Route path="/logomarkets" element={<LogoMarkets />} />
            {/* =================={using app container as home}======================= */}
            <Route
              path="/"
              element={
                <AppContainer
                  mode={mode}
                  setMode={setMode}
                  user={user}
                  service={service}
                  setService={setService}
                  subService={subService}
                  setSubService={setSubService}
                  setTxInfo={setTxInfo}
                  txInfo={txInfo}
                />
              }
            />

            <Route path="/exchangePair" element={<ExchangePair />} />
            <Route path="/transactionDetail" element={<TransactionDetail />} />
            <Route
              path="/buyCard"
              element={
                <BuyCard
                  mode={mode}
                  user={user}
                  service={service}
                  subService={subService}
                  txInfo={txInfo}
                  setTxInfo={setTxInfo}
                />
              }
            />
            <Route
              path="/buyCash"
              element={
                <BuyCash
                  mode={mode}
                  user={user}
                  service={service}
                  subService={subService}
                  txInfo={txInfo}
                  setTxInfo={setTxInfo}
                />
              }
            />
            <Route
              path="/sellCard"
              element={
                <SellCard
                  mode={mode}
                  user={user}
                  service={service}
                  subService={subService}
                  txInfo={txInfo}
                  setTxInfo={setTxInfo}
                />
              }
            />
            <Route
              path="/sellCash"
              element={
                <SellCash
                  mode={mode}
                  user={user}
                  service={service}
                  subService={subService}
                  txInfo={txInfo}
                  setTxInfo={setTxInfo}
                />
              }
            />
            <Route
              path="/defi"
              element={
                <DeFi
                  mode={mode}
                  user={user}
                  service={service}
                  subService={subService}
                  txInfo={txInfo}
                  setTxInfo={setTxInfo}
                />
              }
            />
            <Route
              path="/exchange"
              element={
                <Exchange
                  mode={mode}
                  user={user}
                  service={service}
                  subService={subService}
                  txInfo={txInfo}
                  setTxInfo={setTxInfo}
                />
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
