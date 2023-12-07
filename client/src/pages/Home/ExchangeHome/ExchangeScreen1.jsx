import { useState, useEffect } from "react";
import { getTokenListExchange } from "../../../redux/features/token/tokenSlice";
import { useDispatch } from "react-redux";

import TokenModal from "../../../components/TokenModal";

export const ExchangeScreen1 = (props) => {
  const {
    percentageProgress,
    setPercentageProgress,
    fTitle,
    tTitle,
    fToken,
    setFromToken,
    tToken,
    setToToken,
    fValue,
    setFromValue,
    loading,
    mode,
    service,
    setService,
    subService,
    setSubService,
    setTxInfo,
    allTokensFrom,
    allTokensTo,
    transactionRates,
    loadingExchangeRate,
  } = props;
  const dispatch = useDispatch();

  //======================={RATES and PRICES}========================================================
  const tValue = transactionRates ? transactionRates?.tValueFormatted : 0;
  const exchangeRate = transactionRates ? transactionRates?.exchangeRate : 0;
  const [filteredfTokens, setFilteredfTokens] = useState();
  const [filteredtTokens, setFilteredtTokens] = useState();
  const [isFromTokenModalOpen, setIsFromTokenModalOpen] = useState(false);
  const [isToTokenModalOpen, setToTokenModalOpen] = useState(false);

  //============================================{Token selection}==============================
  useEffect(() => {
    dispatch(getTokenListExchange());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (allTokensFrom) {
      filterFTokens();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allTokensFrom, fToken, tToken]);

  function filterFTokens() {
    let newTokens = [];
    if (allTokensFrom) {
      allTokensFrom?.map(async (t) => {
        if (t !== tToken) {
          newTokens.push(t);
        }
      });

      setFilteredfTokens(newTokens);
    }
  }

  useEffect(() => {
    if (allTokensTo) {
      filterTTokens();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allTokensTo, fToken, tToken]);

  function filterTTokens() {
    let newTokens = [];
    if (allTokensTo) {
      allTokensTo?.map(async (t) => {
        if (t === fToken) {
          return;
        } else {
          newTokens.push(t);
        }
      });

      setFilteredtTokens(newTokens);
    }
  }

  function onFromValueChanged(ev) {
    // setToValue(0);
    setFromValue(ev.target.value);
  }

  //====================================================================================

  async function nextFunc() {
    setService("exchange");
    setSubService("exchange");
    setPercentageProgress(2);
  }

  function swapTokensPosition() {
    let tmpToken = fToken;
    setFromToken(tToken);
    setToToken(tmpToken);
  }

  function openFromTokenModal() {
    setIsFromTokenModalOpen(true);
  }

  function openToTokenModal() {
    setToTokenModalOpen(true);
  }

  return (
    <>
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-col w-[300px] md:w-[452px] gap-[8px]">
          <div className="grid grid-cols-1 gap-2 mt-2 rounded-lg shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] p-2 bg-gray-100 outline outline-lightslategray-300 outline-[1px]">
            <div className="flex justify-center items-center rounded-lg shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] p-1 bg-gray-100 outline outline-lightslategray-300 outline-[1px]">
              <div className="flex flex-row justify-between w-[300px] md:w-[452px] items-center p-1">
                <div className="flex flex-col items-start h-[44px]">
                  <div className="ml-2 mt-2 text-xs text-darkgray-200">
                    {/* You send */}
                    {fTitle}
                  </div>
                  <input
                    type="text"
                    className="ml-2 font-bold text-lg leading-[24px] text-darkslategray-200 inline-block w-[90%] outline-none bg-gray-100 placeholder-darkgray-100"
                    placeholder="0.1"
                    value={fValue}
                    onChange={onFromValueChanged}
                  />
                </div>
                <div className="flex flex-row items-start">
                  <div className="flex items-center bg-whitesmoke-200 w-[121px] h-[44px] rounded-md mr-2 shadow-md hover:bg-whitesmoke-100">
                    <div
                      className="cursor-pointer flex flex-row justify-between w-[121px] ml-[12px]"
                      onClick={openFromTokenModal}
                    >
                      <div className="flex flex-row items-center gap-2">
                        <img
                          className="w-[40px] h-$ shrink-0 overflow-hidden rounded-full"
                          alt={fToken?.name}
                          src={fToken?.image}
                        />
                        <span className="font-bold text-[16px] text-darkslategray-200 inline-block">
                          {fToken?.symbol.toUpperCase()}
                        </span>
                      </div>
                      <img
                        className="mr-2 top-[280px] w-[18px] h-[48px] overflow-hidden"
                        alt=""
                        src="/frame19.svg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-row justify-between">
              <div className="h-3 py-2">
                1 {fToken?.symbol.toUpperCase()} ~{" "}
                {loadingExchangeRate ? "fetching rates" : exchangeRate}{" "}
                {tToken?.symbol.toUpperCase()}
              </div>
              {/* <div className="h-3 py-2">{isToLoading
                          ? 'Fetching price...'
                          : `${`1 ${fToken?.symbol} = ${exchangeRate}  ${tToken?.symbol}`}`}</div> */}
              <div
                className="cursor-pointer transition-transform duration-300 hover:scale-110 shadow-md rounded bg-bgSecondary p-2"
                onClick={swapTokensPosition}
              >
                <img
                  className="w-3.5 h-3 overflow-hidden"
                  alt=""
                  src="/frame54.svg"
                />
              </div>
            </div>
            <div className="flex justify-center items-center rounded-lg shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] p-1 bg-gray-100 outline outline-lightslategray-300 outline-[1px]">
              <div className="flex flex-row justify-between w-[300px] md:w-[452px] items-center p-1">
                <div className="flex flex-col items-start h-[44px]">
                  <div className="ml-2 mt-2 text-xs text-darkgray-200">
                    {/* You send */}
                    {tTitle}
                  </div>
                  <input
                    type="text"
                    className={`ml-2 font-bold text-lg leading-[24px] inline-block w-[90%] outline-none bg-gray-100 placeholder-darkgray-100 ${
                      loading ? "text-bgPrimary" : "text-darkslategray-200"
                    }`}
                    placeholder="0.1"
                    // value={`~ ${tValue}`}
                    // value={`~ ${1.675}`}
                    value={loading ? "loading" : `~ ${tValue}`}
                    disabled={true}
                  />
                </div>
                <div className="flex flex-row items-start">
                  <div className="flex items-center bg-whitesmoke-200 w-[121px] h-[44px] rounded-md mr-2 shadow-md hover:bg-whitesmoke-100">
                    <div
                      className="cursor-pointer flex flex-row justify-between w-[121px] ml-[12px]"
                      onClick={openToTokenModal}
                    >
                      <div className="flex flex-row items-center gap-2">
                        {/* <FaEthereum size={20} color={'#3f3f46'} /> */}
                        <img
                          className="w-[40px] h-$ shrink-0 overflow-hidden rounded-full"
                          alt={tToken?.name}
                          src={tToken?.image}
                        />
                        <span className="font-bold text-[16px] text-darkslategray-200 inline-block">
                          {/* ETH */}
                          {tToken?.symbol.toUpperCase()}
                        </span>
                      </div>
                      <img
                        className="mr-2 top-[280px] w-[18px] h-[48px] overflow-hidden"
                        alt=""
                        src="/frame19.svg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="flex flex-row justify-center items-center h-[49px] cursor-pointer text-white bg-bgPrimary hover:bg-bgPrimaryHover focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded dark:bg-blue-600 dark:hover:bg-bgPrimary dark:focus:ring-bgPrimaryHover"
          onClick={nextFunc}
        >
          {`${service} ${fToken?.symbol.toUpperCase()} now`}
        </div>
      </div>

      {/* From Token Modal */}
      <TokenModal
        isTokenModalOpen={isFromTokenModalOpen}
        setIsTokenModalOpen={setIsFromTokenModalOpen}
        filteredTokens={filteredfTokens}
        setToken={setFromToken}
        allTokens={allTokensFrom}
        service={service}
        isNotCrypto={false}
        title={"Select Token"}
      />

      {/* To Token Modal */}
      <TokenModal
        isTokenModalOpen={isToTokenModalOpen}
        setIsTokenModalOpen={setToTokenModalOpen}
        filteredTokens={filteredtTokens}
        setToken={setToToken}
        allTokens={allTokensTo}
        service={service}
        isNotCrypto={false}
        title={"Select Token"}
      />
    </>
  );
};
