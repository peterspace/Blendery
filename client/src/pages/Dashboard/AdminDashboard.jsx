import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { DashboardMenuAdmin } from "../../components/DashboardMenuAdmin";

import { useDispatch, useSelector } from "react-redux";
import {
  getTransactionByTxIdService,
  updateOneBlockchainTransactionByIdService,
  //=============================================
  getAllTransactions,
  //======{Admin}==============
  getAdminExchange,
  getAdminDefi,
  getAdminBuyCash,
  getAdminBuyCard,
  getAdminSellCash,
  getAdminSellCard,
} from "../../services/apiService";
import { getTransactionByTxIdInternal } from "../../redux/features/transaction/transactionSlice";
import AdminRecord from "../Tanstack/AdminRecord";
import { ColumnsAdminRecords } from "../Tanstack/ColumnsAdminRecords";
import { CardUpdateInfo } from "../../components/CardUpdateInfo";
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

export const AdminDashboard = (props) => {
  const { mode, user, setTxInfo, setMode } = props;

  const location = useLocation();

  const dispatch = useDispatch();
  const [idx, setIdx] = useState(menu[0]?.id);

  const txData = useSelector(
    (state) => state.transaction?.transactionByTxIdInternal
  );

  const isUpdating = localStorage.getItem("isUpdating")
    ? JSON.parse(localStorage.getItem("isUpdating"))
    : false;

  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  /*********************************************     REDUX STATES    **************************************************** */
  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  // const txData = useSelector(
  //   (state) => state.transaction?.transactionByTxIdInternal
  // );
  const [refetchTxData, setRefetchTxData] = useState(false);
  const [refetchAdminData, setRefetchAdminData] = useState(false);

  const transactions = localStorage.getItem("transactions")
    ? JSON.parse(localStorage.getItem("transactions"))
    : null;

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

  //=========={Pages}================================================================
  const pageL = localStorage.getItem("page")
    ? JSON.parse(localStorage.getItem("page"))
    : "Exchange";
  const [page, setPage] = useState(pageL);
  //=========={Pages}================================================================

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

  //=============================={Admin Data Calls}===============================================

  async function fetchAllTransactionAdmin() {
    //====={Admin}===========================

    const response = await getAllTransactions();
    if (response) {
      setAllTransactions(response);
    }
  }

  async function fetchAllTransactionAdminExchange() {
    //====={Admin}===========================

    const response = await getAdminExchange();
    if (response) {
      setAllExchangeTransactionsAdmin(response);
    }
  }

  async function fetchAllTransactionAdminDefi() {
    //====={Admin}===========================

    const response = await getAdminDefi();
    if (response) {
      setAllDefiTransactionsAdmin(response);
    }
  }

  async function fetchAllTransactionAdminBuyCash() {
    //====={Admin}===========================

    const response = await getAdminBuyCash();
    if (response) {
      setAllBuyCashTransactionsAdmin(response);
    }
  }

  async function fetchAllTransactionAdminBuyCard() {
    //====={Admin}===========================

    const response = await getAdminBuyCard();
    if (response) {
      setAllBuyCardTransactionsAdmin(response);
    }
  }

  async function fetchAllTransactionAdmiSellCash() {
    //====={Admin}===========================

    const response = await getAdminSellCash();
    if (response) {
      setAllSellCashTransactionsAdmin(response);
    }
  }

  async function fetchAllTransactionAdmiSellCard() {
    const response = await getAdminSellCard();
    if (response) {
      setAllSellCardTransactionsAdmin(response);
    }
  }

  useEffect(() => {
    fetchAllTransactionAdmin();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allTransactions]);

  useEffect(() => {
    fetchAllTransactionAdminExchange();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allExchangeTransactionsAdmin]);
  useEffect(() => {
    fetchAllTransactionAdminDefi();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allDefiTransactionsAdmin]);
  useEffect(() => {
    fetchAllTransactionAdminBuyCash();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allBuyCashTransactionsAdmin]);
  useEffect(() => {
    fetchAllTransactionAdminBuyCard();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allBuyCardTransactionsAdmin]);
  useEffect(() => {
    fetchAllTransactionAdmiSellCash();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allSellCashTransactionsAdmin]);
  useEffect(() => {
    fetchAllTransactionAdmiSellCard();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allSellCardTransactionsAdmin]);

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
      // setTxInfo(response);
      // window.location.reload();
    }
  };

  //====================================================================================================

  return (
    <div className="flex gap-5 bg-[#F3F3F3]">
      <DashboardMenuAdmin
        setPage={setPage}
        mode={mode}
        user={user}
        page={page}
      />
      {!isUpdating && (
        <div className="w-[78%]">
          {page === "Exchange" &&
            (allExchangeTransactionsAdmin ? (
              <AdminRecord
                columns={ColumnsAdminRecords}
                data={allExchangeTransactionsAdmin}
                mode={mode}
                setMode={setMode}
              />
            ) : (
              <div className="w-full h-full flex justify-center items-center">
                <CircularProgress />
              </div>
            ))}
          {page === "Defi" &&
            (allDefiTransactionsAdmin ? (
              <AdminRecord
                columns={ColumnsAdminRecords}
                data={allDefiTransactionsAdmin}
                mode={mode}
                setMode={setMode}
              />
            ) : (
              <div className="w-full h-full flex justify-center items-center">
                <CircularProgress />
              </div>
            ))}
          {page === "Buy (Cash)" &&
            (allBuyCashTransactionsAdmin ? (
              <AdminRecord
                columns={ColumnsAdminRecords}
                data={allBuyCashTransactionsAdmin}
                mode={mode}
                setMode={setMode}
              />
            ) : (
              <div className="w-full h-full flex justify-center items-center">
                <CircularProgress />
              </div>
            ))}
          {page === "Buy (Card)" &&
            (allBuyCardTransactionsAdmin ? (
              <AdminRecord
                columns={ColumnsAdminRecords}
                data={allBuyCardTransactionsAdmin}
                mode={mode}
                setMode={setMode}
              />
            ) : (
              <div className="w-full h-full flex justify-center items-center">
                <CircularProgress />
              </div>
            ))}
          {page === "Sell (Cash)" &&
            (allSellCashTransactionsAdmin ? (
              <AdminRecord
                columns={ColumnsAdminRecords}
                data={allSellCashTransactionsAdmin}
                mode={mode}
                setMode={setMode}
              />
            ) : (
              <div className="w-full h-full flex justify-center items-center">
                <CircularProgress />
              </div>
            ))}
          {page === "Sell (Card)" &&
            (allSellCardTransactionsAdmin ? (
              <AdminRecord
                columns={ColumnsAdminRecords}
                data={allSellCardTransactionsAdmin}
                mode={mode}
                setMode={setMode}
              />
            ) : (
              <div className="w-full h-full flex justify-center items-center">
                <CircularProgress />
              </div>
            ))}
        </div>
      )}

      {isUpdating && txData && (
        <section className={`container p-2`}>
          <CardUpdateInfo mode={mode} setRefetchTxData={setRefetchTxData} />
        </section>
      )}
    </div>
  );
};
