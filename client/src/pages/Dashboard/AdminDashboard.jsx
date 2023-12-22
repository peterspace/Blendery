import { useState, useEffect, createContext } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import { DashboardMenuAdmin } from "../../components/DashboardMenuAdmin";

import { useDispatch, useSelector } from "react-redux";
import {
  getTransactionByTxIdService,
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
import TransactionUpdateModal from "../../components/TransactionUpdateModal";

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

export const TransActionUpdateModalContext = createContext(null);

export const AdminDashboard = (props) => {
  const { mode, user, setTxInfo, setMode } = props;

  const location = useLocation();

  const dispatch = useDispatch();
  const [idx, setIdx] = useState(menu[0]?.id);
  const [isTransactionUpdateModalOpen, setIsTransactionUpdateModalOpen] =
    useState(false);
  // formatted data of selected transaction
  const [selectedRowData, setSelectedRowData] = useState();
  // unformatted data of selected transaction
  const [selectedRowFullData, setSelectedRowFullData] = useState();
  const [isExchangeLoading, setIsExchangeLoading] = useState(false);
  const [isBuyCardLoading, setIsBuyCardLoading] = useState(false);
  const [isBuyCashLoading, setIsBuyCashLoading] = useState(false);
  const [isSellCardLoading, setIsSellCardLoading] = useState(false);
  const [isSellCashLoading, setIsSellCashLoading] = useState(false);
  const [isDefiLoading, setIsDefiLoading] = useState(false);
  const [revalidateExchange, setRevalidateExchange] = useState(true);
  const [revalidateBuyCash, setRevalidateBuyCash] = useState(true);
  const [revalidateBuyCard, setRevalidateBuyCard] = useState(true);
  const [revalidateSellCash, setRevalidateSellCash] = useState(true);
  const [revalidateSellCard, setRevalidateSellCard] = useState(true);
  const [revalidateDefi, setRevalidateDefi] = useState(true);

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

  //=========================={Admin}=======================================================
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

  async function fetchAllTransactionAdminExchange() {
    //====={Admin}===========================
    try {
      setIsExchangeLoading(true);
      const response = await getAdminExchange();
      if (response) {
        setAllExchangeTransactionsAdmin(response);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsExchangeLoading(false);
      setRevalidateExchange(false);
    }
  }

  async function fetchAllTransactionAdminDefi() {
    //====={Admin}===========================
    try {
      setIsDefiLoading(true);
      const response = await getAdminDefi();
      if (response) {
        setAllDefiTransactionsAdmin(response);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsDefiLoading(false);
      setRevalidateDefi(false);
    }
  }

  async function fetchAllTransactionAdminBuyCash() {
    //====={Admin}===========================
    try {
      setIsBuyCashLoading(true);
      const response = await getAdminBuyCash();
      if (response) {
        setAllBuyCashTransactionsAdmin(response);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsBuyCashLoading(false);
      setRevalidateBuyCash(false);
    }
  }

  async function fetchAllTransactionAdminBuyCard() {
    //====={Admin}===========================
    try {
      setIsBuyCardLoading(true);
      const response = await getAdminBuyCard();
      if (response) {
        setAllBuyCardTransactionsAdmin(response);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsBuyCardLoading(false);
      setRevalidateBuyCard(false);
    }
  }

  async function fetchAllTransactionAdmiSellCash() {
    //====={Admin}===========================
    try {
      setIsSellCashLoading(true);
      const response = await getAdminSellCash();
      if (response) {
        setAllSellCashTransactionsAdmin(response);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsSellCashLoading(false);
      setRevalidateSellCash(false);
    }
  }

  async function fetchAllTransactionAdmiSellCard() {
    try {
      setIsSellCardLoading(true);
      const response = await getAdminSellCard();
      if (response) {
        setAllSellCardTransactionsAdmin(response);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsSellCardLoading(false);
      setRevalidateSellCard(false);
    }
  }

  useEffect(() => {
    if (revalidateExchange) {
      fetchAllTransactionAdminExchange();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revalidateExchange]);

  useEffect(() => {
    if (revalidateDefi) {
      fetchAllTransactionAdminDefi();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revalidateDefi]);

  useEffect(() => {
    if (revalidateBuyCash) {
      fetchAllTransactionAdminBuyCash();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revalidateBuyCash]);

  useEffect(() => {
    if (revalidateBuyCard) {
      fetchAllTransactionAdminBuyCard();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revalidateBuyCard]);

  useEffect(() => {
    if (revalidateSellCash) {
      fetchAllTransactionAdmiSellCash();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revalidateSellCash]);

  useEffect(() => {
    if (revalidateSellCard) {
      fetchAllTransactionAdmiSellCard();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revalidateSellCard]);

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
    <TransActionUpdateModalContext.Provider
      value={{
        isTransactionUpdateModalOpen,
        setIsTransactionUpdateModalOpen,
        selectedRowData,
        setSelectedRowData,
        selectedRowFullData,
        setSelectedRowFullData,
        setRevalidateExchange,
        setRevalidateBuyCard,
        setRevalidateBuyCash,
        setRevalidateSellCard,
        setRevalidateSellCash,
        setRevalidateDefi,
        setRefetchTxData,
      }}
    >
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
              (!isExchangeLoading && allExchangeTransactionsAdmin ? (
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
              (!isDefiLoading && allDefiTransactionsAdmin ? (
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
              (!isBuyCashLoading && allBuyCashTransactionsAdmin ? (
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
              (!isBuyCardLoading && allBuyCardTransactionsAdmin ? (
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
              (!isSellCashLoading && allSellCashTransactionsAdmin ? (
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
              (!isSellCardLoading && allSellCardTransactionsAdmin ? (
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

        <TransactionUpdateModal page={page} />
      </div>
    </TransActionUpdateModalContext.Provider>
  );
};
