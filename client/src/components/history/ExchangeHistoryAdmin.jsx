
import { useState, useEffect } from "react";
import TransactionsHistoryAdmin from "./TransactionsHistoryAdmin";
import Skeleton from "./Skeleton";
import { CardUpdateInfo } from "../CardUpdateInfo";

export const MarketsTitle = (props) => {
  const { mode } = props;
  return (
    <div
      className={`grid grid-cols-7 gap-[24px] mr-2 font-light p-4 border border-indigo-600 border-b ${
        mode === true ? "text-black" : "text-white"
      }`}
    >
      <span className="ml-4 flex items-center text-center">
        {" "}
        <p className="font-semibold">#</p>
      </span>
      <span className="ml-4 flex items-center text-center">
        {" "}
        <p className="font-semibold">TxId</p>
      </span>
      <span className="flex items-center text-center">
        {" "}
        <p className="font-semibold">From</p>
      </span>
      <span className={`flex items-center gap-1`}>
        <p className="font-semibold">To</p>
      </span>
      <div className="hidden sm:block">
        <p className="font-semibold">Time left</p>
      </div>
      <div className="hidden sm:block">
        <p className="font-semibold">Status</p>
      </div>
      <div className="hidden sm:block">
        <p className="font-semibold">Action</p>
      </div>
    </div>
  );
};

const ExchangeHistoryAdmin = (props) => {
  const { mode, data, setTxInfo, txData, setRefetchTxData } = props;
  const [isUpdate, setIsUpdate] = useState(false);
  const [isView, setIsView] = useState(false);
  const [isTx, setIsTx] = useState(true);
  // const mode =true

  console.log({ txDataView: txData });
  const txInfo =
    (localStorage.getItem("txInfo") &&
      JSON.parse(localStorage.getItem("txInfo"))) ||
    null;
  console.log({ txInfo: txInfo });

  const [loading, setIsLoading] = useState(false);

  if (loading) {
    return (
      <div className="wrapper-container mt-8">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-8 w-full mt-2" />
        <Skeleton className="h-8 w-full mt-2" />
        <Skeleton className="h-8 w-full mt-2" />
        <Skeleton className="h-8 w-full mt-2" />
        <Skeleton className="h-8 w-full mt-2" />
        <Skeleton className="h-8 w-full mt-2" />
        <Skeleton className="h-8 w-full mt-2" />
      </div>
    );
  }

  return (
    <>
      {isTx && (
        <section className={`flex mt-8 flex-col gap-[8px]`}>
          <div
            className={`mt-[8px] ml-[8px] text-lg font-sans font-bold inline-block ${
              mode === true ? "text-mediumspringgreen" : "text-white"
            }`}
          >
            {"Exchange Transaction History"}
          </div>
          {/* <div
        className={`m-2 flex flex-col rounded-lg shadow-lg h-[22vh] py-4 ${
          mode === true
            ? 'bg-white'
            : 'bg-bgDark outline outline-bgDarkOutline outline-[1px]'
        }`}
      > */}
          <div
            className={`m-2 flex flex-col rounded-lg shadow-lg h-[800px] py-4 ${
              mode === true
                ? "bg-white"
                : "bg-bgDark outline outline-bgDarkOutline outline-[1px]"
            }`}
          >
            {isTx && (
              <>
                {" "}
                <MarketsTitle mode={mode} />
                <div
                  className={`flex w-full h-px ${
                    mode === true ? "bg-lightslategray-300" : "bg-gray-100"
                  }`}
                />
                {/* ==================================={Search box}======================================================================== */}
                {/* <div
        className={`flex flex-row rounded-lg shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[300px] px-4 m-1 ${
          mode === true
            ? 'py-2 rounded-lg hover:bg-gray-100 outline outline-lightslategray-300 outline-[1px]'
            : 'hover:bg-hoverDark hover:outline hover:outline-lightslategray-300 hover:outline-[1px]'
        }`}
      >
        <div className="flex flex-row items-center md:w-[452px] w-[320px] xs:w-[340px]">
          <div className="ml-2 mt-2 text-xs leading-[18px] text-darkslategray-200">
            <AiOutlineSearch color="#181c1f" size={20} />
          </div>
          <input
            type="text"
            className="ml-2 text-[14px] md:text-[16px] leading-[24px] text-darkslategray-200 inline-block w-[90%] outline-none hover:bg-gray-100 placeholder-darkgray-100"
            placeholder="Search by name or paste address"
            onChange={(e) => {
              if (e.target.value === '') {
                setFilteredTokens(data);
                return;
              }
              let ffToken = data.filter(({ txId }) => {
                return txId
                  .toLowerCase()
                  .includes(e.target.value.toLowerCase());
              });
              if (ffToken !== null) {
                setFilteredTokens(ffToken);
              }
            }}
          />
        </div>
      </div> */}
                {/* ==================================={Search box}======================================================================== */}
                <div className="overflow-scroll">
                  {data &&
                    data.map((item, idx) => (
                      <TransactionsHistoryAdmin
                        key={idx}
                        position={idx + 1}
                        item={item}
                        mode={mode}
                        setTxInfo={setTxInfo}
                        txData={txData}
                        setIsUpdate={setIsUpdate}
                        setIsView={setIsView}
                        setIsTx={setIsTx}
                        setRefetchTxData={setRefetchTxData}
                      />
                    ))}
                </div>
              </>
            )}
          </div>
        </section>
      )}
      {isUpdate && (
        <section className={`flex mt-8 flex-col gap-[8px]`}>
          {txData && (
            <>
              <CardUpdateInfo
                mode={mode}
                item={txData}
                setIsUpdate={setIsUpdate}
                setIsView={setIsView}
                setIsTx={setIsTx}
                isUpdate={isUpdate}
                isView={isView}
                setRefetchTxData={setRefetchTxData}
              />
            </>
          )}
        </section>
      )}
    </>
  );
};

export default ExchangeHistoryAdmin;
