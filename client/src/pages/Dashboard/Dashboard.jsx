import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { UserTransactionsPage } from './UserTransactionsPage';
import { AdminTransactionsPage } from './AdminTransactionsPage';
import { DashboardMenu } from '../../components/DashboardMenu';
import { DashboardMenuAdmin } from '../../components/DashboardMenuAdmin';

import { useDispatch, useSelector } from 'react-redux';
import {
  getTransactionByTxIdService,
  updateOneBlockchainTransactionByIdService,
  //=============================================
  getAllTransactions,
  getUserTransactions,
  getTransactionByTxId,
  updateOneBlockchainTransactionById,
  getUserExchange,
  getUserDefi,
  getUserBuyCash,
  getUserBuyCard,
  getUserSellCash,
  getUserSellCard,
  //======{Admin}==============
  getAdminExchange,
  getAdminDefi,
  getAdminBuyCash,
  getAdminBuyCard,
  getAdminSellCash,
  getAdminSellCard,
} from '../../services/apiService';
import { getTransactionByTxIdInternal } from '../../redux/features/transaction/transactionSlice';

const modes = ['light', 'dark'];
const menu = [
  {
    name: 'Bitcoin',
    id: 'bitcoin', //coingeko id
    logoUrl:
      'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
    symbol: 'BTC',
    amount: '1.21',
    date: `$31, 688`,
    status: true,
  },
  {
    name: 'Ethereum',
    logoUrl:
      'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880',
    id: 'ethereum', //coingeko id
    symbol: 'ETH',
    amount: '3.25',
    date: `$5,150.37`,
    status: true,
  },

  {
    name: 'Tron',
    logoUrl:
      'https://assets.coingecko.com/coins/images/1094/large/tron-logo.png?1547035066',
    id: 'tron', //coingeko id
    symbol: 'TRX',
    amount: '1500',
    date: `$1,499.67`,
    status: false,
  },
];

const paymentStatus = [
  {
    name: 'All', // user has not sent fiat/crypto to blendery
  },
  {
    name: 'Pending', // user has not sent fiat/crypto to blendery
  },
  {
    name: 'Paid', // user has sent fiat/crypto to blendery
  },
  {
    name: 'Received', // blendery received users fiat/crypto
  },
  {
    name: 'Completed', // blendery has sent  fiat/crypto to user
  },
];

export const Dashboard = (props) => {
  const {
    mode,
    user,
    service,
    subService,
    setService,
    setSubService,
    setTxInfo,
    txInfo,
  } = props;

  const location = useLocation();

  const dispatch = useDispatch();
  const [idx, setIdx] = useState(menu[0]?.id);

 /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  /*********************************************     REDUX STATES    **************************************************** */
  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  const txData = useSelector(
    (state) => state.transaction?.transactionByTxIdInternal
  );
  const [refetchTxData, setRefetchTxData] = useState();

  //=========================={User}=======================================================
  const [allUserTransactions, setAllUserTransactions] = useState();
  const [allExchangeTransactions, setAllExchangeTransactions] = useState();
  const [allDefiTransactions, setAllDefiTransactions] = useState();
  const [allBuyCashTransactions, setAllBuyCashTransactions] = useState();
  const [allBuyCardTransactions, setAllBuyCardTransactions] = useState();
  const [allSellCashTransactions, setAllSellCashTransactions] = useState();
  const [allSellCardTransactions, setAllSellCardTransactions] = useState();

  //=========================={Admin}=======================================================
  const [allTransactions, setAllTransactions] = useState();
  const [allExchangeTransactionsAdmin, setAllExchangeTransactionsAdmin] =
    useState();
  const [allDefiTransactionsAdmin, setAllDefiTransactionsAdmin] = useState();

  const [allBuyCashTransactionsAdmin, setAllBuyCashTransactionsAdmin] =
    useState();
  const [allBuyCardTransactionsAdmin, setAllBuyCardTransactionsAdmin] =
    useState();

  const [allSellCashTransactionsAdmin, setAllSellCashTransactionsAdmin] =
    useState();

  const [allSellCardTransactionsAdmin, setAllSellCardTransactionsAdmin] =
    useState();

  console.log({ allUserTransactions: allUserTransactions });
  console.log({ allExchangeTransactions: allExchangeTransactions });
  console.log({ allBuyCashTransactions: allBuyCashTransactions });
  //============{Admin: transactions by services and subservices}============
  console.log({ allExchangeTransactionsAdmin: allExchangeTransactionsAdmin });
  console.log({ allBuyCashTransactionsAdmin: allBuyCashTransactionsAdmin });
  console.log({ allBuyCardTransactionsAdmin: allBuyCardTransactionsAdmin });
  console.log({ allSellCashTransactionsAdmin: allSellCashTransactionsAdmin });
  console.log({ allSellCardTransactionsAdmin: allSellCardTransactionsAdmin });

  //=========={Pages}================================================================
  const pageL = localStorage.getItem('page')
    ? JSON.parse(localStorage.getItem('page'))
    : 'Profile';
  const [page, setPage] = useState(pageL);
  console.log({ page: page });
  //=========={Pages}================================================================
  const filterStatus = localStorage.getItem('filterStatus')
    ? JSON.parse(localStorage.getItem('filterStatus'))
    : paymentStatus[0]?.name;

  console.log({ filterStatus: filterStatus });
  const [status, setStatus] = useState(filterStatus);
  console.log({ status: status });

  const [activeData, setActiveData] = useState();
  console.log({ activeData: activeData });

  const [allData, setAllData] = useState();
  console.log({ allData: allData });

  const [allPendingData, setAllPendingData] = useState();
  const [allPaidData, setAllPaidData] = useState();
  const [allReceivedData, setAllReceivedData] = useState();
  const [allCompletedData, setAllCompletedData] = useState();
  //========================================={LOCATION}===================================================
  useEffect(() => {
    if (page === 'Exchange') {
      setAllData(allExchangeTransactionsAdmin);
    }
    if (page === 'Defi') {
      setAllData(allDefiTransactionsAdmin);
    }
    if (page === 'Buy (Cash)') {
      setAllData(allBuyCashTransactionsAdmin);
    }
    if (page === 'Buy (Card)') {
      setAllData(allBuyCardTransactionsAdmin);
    }
    if (page === 'Sell (Cash)') {
      setAllData(allSellCashTransactionsAdmin);
    }
    if (page === 'Sell (Card)') {
      setAllData(allSellCardTransactionsAdmin);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);



  useEffect(() => {
    filterData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allData]);

  useEffect(() => {
    setTimeout(() => {
      setStatus(paymentStatus[0]?.name); // "pending"
      setActiveData(allData);
    }, 200);
  }, []);

  useEffect(() => {
    if (!activeData && allData) {
      setTimeout(() => {
        updateActiveData();
      }, 2000);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allData]);

  useEffect(() => {
    updateActiveData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    status,
    allData,
    allPendingData,
    allPaidData,
    allReceivedData,
    allCompletedData,
  ]);

  async function updateActiveData() {
    if (status === 'All') {
      setActiveData(allData);
    }
    if (status === 'Pending') {
      setActiveData(allPendingData);
    }
    if (status === 'Paid') {
      setActiveData(allPaidData);
    }
    if (status === 'Received') {
      setActiveData(allReceivedData);
    }
    if (status === 'Completed') {
      setActiveData(allCompletedData);
    }
  }

  useEffect(() => {
    localStorage.setItem('filterStatus', JSON.stringify(status));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  async function filterData() {
    // let dataPending;
    // let dataPaid;
    // let dataReceived;
    // let dataCompleted;

    let dataPending = [];
    let dataPaid = [];
    let dataReceived = [];
    let dataCompleted = [];

    if (allData) {
      allData?.map(async (l) => {
        //
        if (l?.status === 'Pending') {
          dataPending.push(l);
        }
        if (l?.status === 'Paid') {
          dataPaid.push(l);
        }
        if (l?.status === 'Received') {
          dataReceived.push(l);
        }
        if (l?.status === 'Completed') {
          dataCompleted.push(l);
        }
      });
      // setAllData(data);
      setAllPendingData(dataPending);
      setAllPaidData(dataPaid);
      setAllReceivedData(dataReceived);
      setAllCompletedData(dataCompleted);
    }
  }
  //======================================================================================================
  useEffect(() => {
    localStorage.setItem('prevLocation', JSON.stringify(location?.pathname));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //======================================================================================================
  useEffect(() => {
    localStorage.setItem('page', JSON.stringify(page));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // Simulate fetching expected prices
  useEffect(() => {
    const fetchPrices = async () => {
      fetchAllTransactionData();
    };
    // Fetch prices immediately and then every 2 minutes
    // Fetch prices immediately and then every minute

    fetchPrices();
    // const priceInterval = setInterval(fetchPrices, 2 * 60 * 1000);
    const priceInterval = setInterval(fetchPrices, 60000);
    // Clear the interval on unmount
    return () => clearInterval(priceInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, page]);
  // const [mode, setMode] = useState(modes[1]);

  //updateOneBlockchainTransactionById
  //allUserTransactions

  async function fetchAllTransactionData() {
    if (user?.role == 'User') {
      const response1 = await getUserTransactions();
      if (response1) {
        setAllUserTransactions(response1);
      }
      const response2 = await getUserExchange();
      if (response2) {
        setAllExchangeTransactions(response2);
      }
      const response3 = await getUserDefi();
      if (response3) {
        setAllDefiTransactions(response3);
      }
      const response4 = await getUserBuyCash();
      if (response4) {
        setAllBuyCashTransactions(response4);
      }
      const response5 = await getUserBuyCard();
      if (response5) {
        setAllBuyCardTransactions(response5);
      }
      const response6 = await getUserSellCash();
      if (response6) {
        setAllSellCashTransactions(response6);
        const response7 = await getUserSellCard();
        if (response7) {
          setAllSellCardTransactions(response7);
        }
      }
    }
    if (user?.role === 'Admin') {
      //====={Admin}===========================

      const response1 = await getAllTransactions();
      if (response1) {
        setAllTransactions(response1);
      }
      const response2 = await getAdminExchange();
      if (response2) {
        setAllExchangeTransactionsAdmin(response2);
      }
      const response3 = await getAdminDefi();
      if (response3) {
        setAllDefiTransactionsAdmin(response3);
      }
      const response4 = await getAdminBuyCash();
      if (response4) {
        setAllBuyCashTransactionsAdmin(response4);
      }
      const response5 = await getAdminBuyCard();
      if (response5) {
        setAllBuyCardTransactionsAdmin(response5);
      }
      const response6 = await getAdminSellCash();
      if (response6) {
        setAllSellCashTransactionsAdmin(response6);
        const response7 = await getAdminSellCard();
        if (response7) {
          setAllSellCardTransactionsAdmin(response7);
        }
      }
    }
  }

  //==================================={TX DATA}=================================================================

 
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

  return (
    <div className="h-screen">
      <>
        {user?.role === 'Admin' && (
          <>
            {user?.token ? (
              <div className="container mx-auto flex flex-col xl:flex-row justify-center p-4 2xl:mt-[64px]">
                <div
                  className={`flex flex-col xl:flex-row gap-[16px] mt-[8px] rounded-lg p-[16px] container mx-auto ${
                    mode === true
                      ? 'bg-white outline outline-lightslategray-300 outline-[1px]'
                      : 'bg-bgDarker outline outline-lightslategray-300 outline-[1px]'
                  }`}
                >
                  <div
                    className={`flex-col xl:flex-row rounded-lg shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[260px] ${
                      mode === true
                        ? 'bg-white'
                        : 'bg-bgDark outline outline-bgDarkOutline outline-[1px]'
                    }`}
                  >
                    <DashboardMenuAdmin
                      setPage={setPage}
                      mode={mode}
                      user={user}
                      page={page}
                    />
                  </div>
                  <div className="flex flex-col gap-[16px] w-full">
                    {/* ==================================={AdminBlock}=============================================================== */}
                    <>
                      <div className="flex flex-col justify-start items-start xl:justify-center xl:items-center mt-6 xl:mt-0 gap-4">
                        <div
                          className={`flex justify-center rounded-lg shadow-lg p-1 ${
                            mode === true
                              ? 'bg-white'
                              : 'bg-bgDark outline outline-bgDarkOutline outline-[1px]'
                          }`}
                        >
                          <span
                            className={`flex flex-row items-center text-center w-[315px] xl:w-[910px] justify-between ${
                              mode === true ? 'text-black' : 'text-white'
                            }`}
                          >
                            <div
                              className={`cursor-pointer flex flex-col rounded-lg p-2 w-[80px] ${
                                status === paymentStatus[0]?.name
                                  ? 'hover:bg-blue-400 bg-blue-600'
                                  : 'hover:bg-rose-400 bg-rose-600'
                              }`}
                              onClick={() => {
                                setStatus(paymentStatus[0]?.name);
                              }}
                            >
                              <span className="text-smi text-gray-100">
                                All
                              </span>
                            </div>
                            <div
                              className={`cursor-pointer flex flex-col rounded-lg p-2 w-[80px] ${
                                status === paymentStatus[1]?.name
                                  ? 'hover:bg-blue-400 bg-blue-600'
                                  : 'hover:bg-rose-400 bg-rose-600'
                              }`}
                              onClick={() => {
                                setStatus(paymentStatus[1]?.name);
                              }}
                            >
                              <span className="text-smi text-gray-100">
                                Pending
                              </span>
                            </div>
                            <div
                              className={`cursor-pointer flex flex-col rounded-lg p-2 w-[80px] ${
                                status === paymentStatus[2]?.name
                                  ? 'hover:bg-blue-400 bg-blue-600'
                                  : 'hover:bg-rose-400 bg-rose-600'
                              }`}
                              onClick={() => {
                                setStatus(paymentStatus[2]?.name);
                              }}
                            >
                              <span className="text-smi text-gray-100">
                                Paid
                              </span>
                            </div>
                            <div
                              className={`cursor-pointer flex flex-col rounded-lg p-2 w-[80px] ${
                                status === paymentStatus[3]?.name
                                  ? 'hover:bg-blue-400 bg-blue-600'
                                  : 'hover:bg-rose-400 bg-rose-600'
                              }`}
                              onClick={() => {
                                setStatus(paymentStatus[3]?.name);
                              }}
                            >
                              <span className="text-smi text-gray-100">
                                Received
                              </span>
                            </div>
                            <div
                              className={`cursor-pointer flex flex-col rounded-lg p-2 w-[80px] ${
                                status === paymentStatus[4]?.name
                                  ? 'hover:bg-blue-400 bg-blue-600'
                                  : 'hover:bg-rose-400 bg-rose-600'
                              }`}
                              onClick={() => {
                                setStatus(paymentStatus[4]?.name);
                              }}
                            >
                              <span className="text-smi text-gray-100">
                                Completed
                              </span>
                            </div>
                          </span>
                        </div>
                        {page === 'Exchange' && (
                          <AdminTransactionsPage
                            mode={mode}
                            data={activeData}
                            setTxInfo={setTxInfo}
                            txData={txData}
                            setStatus={setStatus}
                            status={status}
                            setRefetchTxData={setRefetchTxData}
                          />
                        )}
                        {page === 'Defi' && (
                          <AdminTransactionsPage
                            mode={mode}
                            data={activeData}
                            setTxInfo={setTxInfo}
                            txData={txData}
                            setStatus={setStatus}
                            status={status}
                            setRefetchTxData={setRefetchTxData}
                          />
                        )}
                        {page === 'Buy (Cash)' && (
                          <AdminTransactionsPage
                            mode={mode}
                            data={activeData}
                            setTxInfo={setTxInfo}
                            txData={txData}
                            setStatus={setStatus}
                            status={status}
                            setRefetchTxData={setRefetchTxData}
                          />
                        )}
                        {page === 'Buy (Card)' && (
                          <AdminTransactionsPage
                            mode={mode}
                            data={activeData}
                            setTxInfo={setTxInfo}
                            txData={txData}
                            setStatus={setStatus}
                            status={status}
                            setRefetchTxData={setRefetchTxData}
                          />
                        )}
                        {page === 'Sell (Cash)' && (
                          <AdminTransactionsPage
                            mode={mode}
                            data={activeData}
                            setTxInfo={setTxInfo}
                            txData={txData}
                            setStatus={setStatus}
                            status={status}
                            setRefetchTxData={setRefetchTxData}
                          />
                        )}
                        {page === 'Sell (Card)' && (
                          <AdminTransactionsPage
                            mode={mode}
                            data={activeData}
                            setTxInfo={setTxInfo}
                            txData={txData}
                            setStatus={setStatus}
                            status={status}
                            setRefetchTxData={setRefetchTxData}
                          />
                        )}
                      </div>
                    </>
                  </div>
                </div>
              </div>
            ) : (
              <Navigate to="/auth" state={{ from: location }} replace />
            )}
          </>
        )}
        {user?.role === 'User' && (
          <>
            {user?.token ? (
              <div className="container mx-auto flex flex-col xl:flex-row justify-center p-4 2xl:mt-[64px]">
                <div
                  className={`flex flex-col xl:flex-row gap-[16px] mt-[8px] rounded-lg p-[16px] container mx-auto ${
                    mode === true
                      ? 'bg-white outline outline-lightslategray-300 outline-[1px]'
                      : 'bg-bgDarker outline outline-lightslategray-300 outline-[1px]'
                  }`}
                >
                  <div
                    className={`flex-col xl:flex-row rounded-lg shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[260px] ${
                      mode === true
                        ? 'bg-white'
                        : 'bg-bgDark outline outline-bgDarkOutline outline-[1px]'
                    }`}
                  >
                    <DashboardMenu
                      setPage={setPage}
                      mode={mode}
                      user={user}
                      page={page}
                    />
                  </div>
                  <div className="flex flex-col w-full overflow-hidden h-full">
                    {/* ==================================={UserBlock}=============================================================== */}

                    {page === 'Exchange' && (
                      <UserTransactionsPage
                        mode={mode}
                        data={allExchangeTransactions}
                        setTxInfo={setTxInfo}
                        setRefetchTxData={setRefetchTxData}
                        setService={setService}
                        setSubService={setSubService}
                      />
                    )}
                    {page === 'Defi' && (
                      <UserTransactionsPage
                        mode={mode}
                        data={allDefiTransactions}
                        setTxInfo={setTxInfo}
                        setRefetchTxData={setRefetchTxData}
                        setService={setService}
                        setSubService={setSubService}
                      />
                    )}
                    {page === 'Buy (Cash)' && (
                      <UserTransactionsPage
                        mode={mode}
                        data={allBuyCashTransactions}
                        setTxInfo={setTxInfo}
                        setRefetchTxData={setRefetchTxData}
                        setService={setService}
                        setSubService={setSubService}
                      />
                    )}
                    {page === 'Buy (Card)' && (
                      <UserTransactionsPage
                        mode={mode}
                        data={allBuyCardTransactions}
                        setTxInfo={setTxInfo}
                        setRefetchTxData={setRefetchTxData}
                        setService={setService}
                        setSubService={setSubService}
                      />
                    )}
                    {page === 'Sell (Cash)' && (
                      <UserTransactionsPage
                        mode={mode}
                        data={allSellCashTransactions}
                        setTxInfo={setTxInfo}
                        setRefetchTxData={setRefetchTxData}
                        setService={setService}
                        setSubService={setSubService}
                      />
                    )}
                    {page === 'Sell (Card)' && (
                      <UserTransactionsPage
                        mode={mode}
                        data={allSellCardTransactions}
                        setTxInfo={setTxInfo}
                        setRefetchTxData={setRefetchTxData}
                        setService={setService}
                        setSubService={setSubService}
                      />
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <Navigate to="/auth" state={{ from: location }} replace />
            )}
          </>
        )}
      </>
    </div>
  );
};
