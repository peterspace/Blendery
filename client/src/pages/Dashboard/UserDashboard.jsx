import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { DashboardMenuUser } from "../../components/DashboardMenuUser";
import { useDispatch, useSelector } from "react-redux";
import {
  getTransactionByTxIdService,
  getUserTransactions,
  getUserExchange,
  getUserDefi,
  getUserBuyCash,
  getUserBuyCard,
  getUserSellCash,
  getUserSellCard,
} from "../../services/apiService";
import { getTransactionByTxIdInternal } from "../../redux/features/transaction/transactionSlice";

import UserRecord from "../Tanstack/UserRecord";
import { ColumnsUserRecords } from "../Tanstack/ColumnsUserRecords";
import CircularProgress from "../../components/CircularProgress";

const menu = [
  {
    name: "Bitcoin",
    id: "bitcoin", //coingeko id
    logoUrl:
      "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
    symbol: "BTC",
    amount: "1.21",
    date: `$31, 688`,
    status: true,
  },
  {
    name: "Ethereum",
    logoUrl:
      "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
    id: "ethereum", //coingeko id
    symbol: "ETH",
    amount: "3.25",
    date: `$5,150.37`,
    status: true,
  },

  {
    name: "Tron",
    logoUrl:
      "https://assets.coingecko.com/coins/images/1094/large/tron-logo.png?1547035066",
    id: "tron", //coingeko id
    symbol: "TRX",
    amount: "1500",
    date: `$1,499.67`,
    status: false,
  },
];

export const UserDashboard = (props) => {
  const { mode, user, setService, setSubService, setTxInfo, setMode } = props;

  const location = useLocation();
  const navigate = useNavigate();

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

  const transactions = localStorage.getItem("transactions")
    ? JSON.parse(localStorage.getItem("transactions"))
    : null;

  console.log({ transactions: transactions });
  //=========================={User}=======================================================
  const [allUserTransactions, setAllUserTransactions] = useState();
  const [allExchangeTransactions, setAllExchangeTransactions] = useState();
  const [allDefiTransactions, setAllDefiTransactions] = useState();
  const [allBuyCashTransactions, setAllBuyCashTransactions] = useState();
  const [allBuyCardTransactions, setAllBuyCardTransactions] = useState();
  const [allSellCashTransactions, setAllSellCashTransactions] = useState();
  const [allSellCardTransactions, setAllSellCardTransactions] = useState();
  console.log({ allUserTransactions: allUserTransactions });
  //=========={Pages}================================================================
  const pageL = localStorage.getItem("page")
    ? JSON.parse(localStorage.getItem("page"))
    : "Exchange";
  const [page, setPage] = useState(pageL);
  console.log({ page: page });
  //=========={Pages}================================================================

  const isView = localStorage.getItem("isView")
    ? JSON.parse(localStorage.getItem("isView"))
    : false;

  const isViewIng = localStorage.getItem("isViewIng")
    ? JSON.parse(localStorage.getItem("isViewIng"))
    : false;

  const txDataUpdate = localStorage.getItem("txDataUpdate")
    ? JSON.parse(localStorage.getItem("txDataUpdate"))
    : null;

  const [newData, setNewData] = useState();

  console.log({ newData: newData });
  //========================================={LOCATION}===================================================

  //======================================================================================================
  useEffect(() => {
    localStorage.setItem("prevLocation", JSON.stringify(location?.pathname));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //======================================================================================================
  useEffect(() => {
    if (page) {
      localStorage.setItem("page", JSON.stringify(page));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  async function fetchAllUserTransactions() {
    //====={Admin}===========================

    const response = await getUserTransactions();
    if (response) {
      setAllUserTransactions(response);
    }
  }

  async function fetchAllUserExchange() {
    //====={Admin}===========================

    const response = await getUserExchange();
    if (response) {
      setAllExchangeTransactions(response);
    }
  }

  async function fetchAlltUserDefi() {
    //====={Admin}===========================

    const response = await getUserDefi();
    if (response) {
      setAllDefiTransactions(response);
    }
  }

  async function fetchAllUserBuyCash() {
    //====={Admin}===========================

    const response = await getUserBuyCash();
    if (response) {
      setAllBuyCashTransactions(response);
    }
  }

  async function fetchAllUserBuyCard() {
    //====={Admin}===========================

    const response = await getUserBuyCard();
    if (response) {
      setAllBuyCardTransactions(response);
    }
  }

  async function fetchAllUserSellCash() {
    //====={Admin}===========================

    const response = await getUserSellCash();
    if (response) {
      setAllSellCashTransactions(response);
    }
  }

  async function fetchAllUserSellCard() {
    //====={Admin}===========================

    const response = await getUserSellCard();
    if (response) {
      setAllSellCardTransactions(response);
    }
  }

  useEffect(() => {
    fetchAllUserTransactions();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allUserTransactions]);

  //====={recommended}=====================================
  //   useEffect(() => {
  //     fetchAllUserTransactions();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [allUserTransactions]);

  useEffect(() => {
    fetchAllUserExchange();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allExchangeTransactions]);

  useEffect(() => {
    fetchAlltUserDefi();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allDefiTransactions]);

  useEffect(() => {
    fetchAllUserBuyCash();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allBuyCashTransactions]);

  useEffect(() => {
    fetchAllUserBuyCard();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allBuyCardTransactions]);

  useEffect(() => {
    fetchAllUserSellCash();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allSellCashTransactions]);

  useEffect(() => {
    fetchAllUserSellCard();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allSellCardTransactions]);

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

  useEffect(() => {
    if (isViewIng) {
      updateUserTxData();
      setTimeout(() => {
        // localStorage.setItem('isViewIng', JSON.stringify(false));
        // localStorage.removeItem('isViewIng'); // remove from local storage to allow new data
      }, 200);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isViewIng]);

  async function updateUserTxData() {
    const response = await getTransactionByTxIdService(txDataUpdate?._id);

    if (response) {
      setNewData(response);
      updateTransaction(response);
    }
  }

  const updateTransaction = async (item) => {
    setTxInfo(item);
    dispatch(getTransactionByTxIdInternal(item)); // dispatch txData globally
    setTimeout(() => {
      setRefetchTxData(true);

      let service = item?.service;
      let subService = item?.subService;
      localStorage.removeItem("isViewIng"); // remove from local storage to allow new data
      if (service === "exchange" && subService === "exchange") {
        setService("exchange");
        setSubService("exchange");
        navigate(`/exchange`);
      }
      if (service === "defi" && subService === "defi") {
        setService("defi");
        setSubService("defi");
        navigate(`/defi`);
      }
      if (service === "buy" && subService === "buyCash") {
        setService("buy");
        setSubService("buyCash");
        navigate(`/buyCash`);
      }

      if (service === "buy" && subService === "buyCard") {
        setService("buy");
        setSubService("buyCard");
        navigate(`/buyCard`);
      }
      if (service === "sell" && subService === "sellCash") {
        setService("sell");
        setSubService("sellCash");
        navigate(`/sellCash`);
      }
      if (service === "sell" && subService === "sellCard") {
        setService("sell");
        setSubService("sellCard");
        navigate(`/sellCard`);
      }
    }, 1000); // after 1 sec
  };

  //====================================================================================================

  return (
    <div className="flex gap-[64px]">
      <DashboardMenuUser
        setPage={setPage}
        mode={mode}
        user={user}
        page={page}
      />
      <div className="container mx-auto p-1">
        {page === "Exchange" &&
          (allExchangeTransactions ? (
            <UserRecord
              columns={ColumnsUserRecords}
              data={allExchangeTransactions}
              setTxInfo={setTxInfo}
              setRefetchTxData={setRefetchTxData}
              setService={setService}
              setSubService={setSubService}
              mode={mode}
              setMode={setMode}
            />
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <CircularProgress />
            </div>
          ))}
        {page === "Defi" &&
          (allDefiTransactions ? (
            <UserRecord
              columns={ColumnsUserRecords}
              data={allDefiTransactions}
              setTxInfo={setTxInfo}
              setRefetchTxData={setRefetchTxData}
              setService={setService}
              setSubService={setSubService}
              mode={mode}
              setMode={setMode}
            />
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <CircularProgress />
            </div>
          ))}
        {page === "Buy (Cash)" &&
          (allBuyCashTransactions ? (
            <UserRecord
              columns={ColumnsUserRecords}
              data={allBuyCashTransactions}
              setTxInfo={setTxInfo}
              setRefetchTxData={setRefetchTxData}
              setService={setService}
              setSubService={setSubService}
              mode={mode}
              setMode={setMode}
            />
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <CircularProgress />
            </div>
          ))}
        {page === "Buy (Card)" &&
          (allBuyCardTransactions ? (
            <UserRecord
              columns={ColumnsUserRecords}
              data={allBuyCardTransactions}
              setTxInfo={setTxInfo}
              setRefetchTxData={setRefetchTxData}
              setService={setService}
              setSubService={setSubService}
              mode={mode}
              setMode={setMode}
            />
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <CircularProgress />
            </div>
          ))}
        {page === "Sell (Cash)" &&
          (allSellCashTransactions ? (
            <UserRecord
              columns={ColumnsUserRecords}
              data={allSellCashTransactions}
              setTxInfo={setTxInfo}
              setRefetchTxData={setRefetchTxData}
              setService={setService}
              setSubService={setSubService}
              mode={mode}
              setMode={setMode}
            />
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <CircularProgress />
            </div>
          ))}
        {page === "Sell (Card)" &&
          (allSellCardTransactions ? (
            <UserRecord
              columns={ColumnsUserRecords}
              data={allSellCardTransactions}
              setTxInfo={setTxInfo}
              setRefetchTxData={setRefetchTxData}
              setService={setService}
              setSubService={setSubService}
              mode={mode}
              setMode={setMode}
            />
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <CircularProgress />
            </div>
          ))}
      </div>
    </div>
  );
};
