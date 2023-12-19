import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSlippage } from "../redux/features/swap/swapSlice";
import stylesSlippage from "./Slippage.module.css";
import {
  useAccount,
  useSwitchNetwork,
  useBalance,
  useNetwork,
  useDisconnect,
} from "wagmi";

import {
  getChainRateSwapService,
  getChainPriceService,
} from "../services/apiService";

import {
  getChainPrice,
  getChainRateSwap,
} from "../redux/features/swap/swapSlice";

export const TokenCardContainer = (props) => {
  const { mode, setSlippage, setIsSlippageChange, slippage } = props;
  const dispatch = useDispatch();

  //============{SLIPPAGE DATA}============================================== //==========={Connection}=============
  const [isCustom, setIsCustom] = useState(false);
  const [isWarning, setIsWarning] = useState(false);
  const [isLowSlippage, setIsLowSlippage] = useState(false);
  const [customSlippage, setCustomSlippage] = useState("");
  // const [isSlippageChange, setIsSlippageChange] = useState(false);
  const [isSlippageAuto, setIsSlippageAuto] = useState(true); // default state is

  //=========================================================================
  const [isBalanceLoading, setIsBalanceLoading] = useState(false);
  //==============={Secondary Data}=========================

  const { address, isConnected } = useAccount();

  console.log({ isConnected: isConnected });
  const { disconnect } = useDisconnect();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const chain = useSelector((state) => state?.swap?.chain);
  const chainId = chain ? chain.chainId : "1";
  const chainSymbol = chain ? chain?.chainSymbol : "ETH";
  console.log({ chainId: chainId });

  const chainUsdBalance = useSelector(
    (state) => state?.swap?.getChainPrice?.chainPrice
  );
  const chainExchangeRate = useSelector(
    (state) => state?.swap?.getChainRateSwap?.chainExchangeRate
  );

  console.log({ chainExchangeRate: chainExchangeRate });

  const { data } = useBalance({
    address,
    // chainId: chainId,
    chainId: Number(chainId), // requires type "Number"
    watch: true,
  });

  const [balance, setBalance] = useState("");

  useEffect(() => {
    if (isConnected) {
      const tokenbal = Number(data?.formatted).toFixed(3);
      setBalance(tokenbal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, balance, isConnected]);

  useEffect(() => {
    localStorage.setItem("chainBalance", JSON.stringify(balance));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [balance]);

  // Simulate fetching expected prices
  useEffect(() => {
    if (isConnected === true) {
      fetchChainPrice();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [balance, chainExchangeRate, isConnected]);

  useEffect(() => {
    const fetchRates = async () => {
      fetchChainRate();
    };
    // Fetch prices immediately and then every 2 minutes
    fetchChainRate();
    const priceInterval = setInterval(fetchRates, 2 * 60 * 1000);
    // Clear the interval on unmount
    return () => clearInterval(priceInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain]);

  const fetchChainRate = async () => {
    if (!chain) {
      return;
    }

    // const userData = { fToken, tToken, service: 'defi', subService: 'defi' };
    const userData = {
      chain,
    };

    try {
      setLoading(true);

      const response = await getChainRateSwapService(userData);

      if (response.chainExchangeRate) {
        dispatch(getChainRateSwap(response));
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchChainPrice = async () => {
    if (!chainExchangeRate) {
      return;
    }
    // const userData = { fToken, tToken, service: 'defi', subService: 'defi' };
    const userData = { chainExchangeRate, balance };

    try {
      setLoading(true);
      setIsBalanceLoading(true);

      const response = await getChainPriceService(userData);
      console.log({ exchangeData: response });

      if (response.chainPrice) {
        dispatch(getChainPrice(response));
        setIsBalanceLoading(false);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  //============{SLIPPAGE}=================================

  //TODO, Slippage has to be a valid Integer [0-9] range from 0-50 {max = 50}
  //================={Slippage controller}===============
  useEffect(() => {
    let slippageValue = Number(slippage);
    if (slippage !== null && slippageValue > 0 && slippageValue < 1) {
      setIsLowSlippage(true);
    }

    if (slippageValue > 3) {
      setIsWarning(true);
    }

    if (slippage !== null && slippageValue > 1 && slippageValue <= 3) {
      setIsLowSlippage(false);
      setIsWarning(false);
    }

    if (slippage === null || undefined) {
      setIsLowSlippage(false);
      setIsWarning(false);
    }
    if (slippage === "") {
      setIsLowSlippage(false);
      setIsWarning(false);
    }
  }, [slippage, isWarning, isLowSlippage]);
  //#9D9DA3
  // <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-81xl [background:linear-gradient(89.96deg,_#74ff63,_#7c90fe_30.21%,_#f05dfd_70.31%,_#fff73f)]" />
  return (
    <div
      className={`flex flex-col rounded-lg shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[300px] px-4 m-1 ${
        mode === true
          ? "py-2 rounded-lg hover:bg-gray-100 outline outline-lightslategray-300 outline-[1px]"
          : "hover:bg-hoverDark hover:outline hover:outline-lightslategray-300 hover:outline-[1px]"
      }`}
    >
      <>
        {/* {slippageFrame} */}
        <div className={stylesSlippage.frameChild} />
        <div className={stylesSlippage.frameDiv}>
          <div
            className={`text-[14px] ${stylesSlippage.slippageToleranceParent}`}
          >
            <div className={`${stylesSlippage.slippageTolerance}`}>
              Slippage tolerance
            </div>
            {isSlippageAuto && !isWarning && !isLowSlippage ? (
              <div className={stylesSlippage.autoWrapper}>
                <div className={`${stylesSlippage.ethereum}`}>Auto</div>
              </div>
            ) : null}
            {!isSlippageAuto && !isWarning && !isLowSlippage ? (
              <div className={stylesSlippage.autoWrapper}>
                <div className={stylesSlippage.ethereum}>{slippage}%</div>
              </div>
            ) : null}
            {!isSlippageAuto && isWarning && !isLowSlippage ? (
              <div className={stylesSlippage.alertCircleParent}>
                <img
                  className={stylesSlippage.chevronLeftIcon}
                  alt=""
                  src="/alertcircle1.svg"
                />
                <div className={stylesSlippage.ethereum}>
                  {slippage}% Custom
                </div>
              </div>
            ) : null}
            {!isSlippageAuto && !isWarning && isLowSlippage ? (
              <div className={stylesSlippage.alertCircleParent}>
                <img
                  className={stylesSlippage.chevronLeftIcon}
                  alt=""
                  src="/alerttriangle1.svg"
                />
                <div className={stylesSlippage.ethereum}>{slippage}%</div>
              </div>
            ) : null}
          </div>
          <div className={stylesSlippage.frameParent1}>
            {isSlippageAuto ? (
              <div className={stylesSlippage.autoContainer}>
                <div className={`text-white ${stylesSlippage.ethereum}`}>
                  Auto
                </div>
              </div>
            ) : (
              <div className={stylesSlippage.autoWrapper2}>
                <div
                  className={`${stylesSlippage.ethereum} text-[#B27CFF]`}
                  onClick={() => {
                    dispatch(updateSlippage("0.7"));
                    setSlippage("0.7");
                    setIsSlippageChange(true);
                    setIsSlippageAuto(true);
                    setIsCustom(false);
                  }}
                >
                  Auto
                </div>
              </div>
            )}

            <div className={stylesSlippage.frameParent2}>
              <div
                className={`${stylesSlippage.wrapper} ${
                  slippage === "1" ? "rounded-2xl bg-[#AB94EB]" : "rounded-2xl"
                }`}
              >
                <div
                  className={stylesSlippage.ethereum}
                  onClick={() => {
                    dispatch(updateSlippage("1"));
                    setSlippage("1");
                    setIsSlippageChange(true);
                    setIsSlippageAuto(false);
                    setIsCustom(false);
                  }}
                >
                  1%
                </div>
              </div>
              <div
                className={`${stylesSlippage.container} ${
                  slippage === "2" ? "rounded-2xl bg-[#AB94EB]" : "rounded-2xl"
                }`}
              >
                <div
                  className={stylesSlippage.ethereum}
                  onClick={() => {
                    dispatch(updateSlippage("2"));
                    setSlippage("2");
                    setIsSlippageChange(true);
                    setIsSlippageAuto(false);
                    setIsCustom(false);
                  }}
                >
                  2%
                </div>
              </div>
              <div
                className={`${stylesSlippage.container} ${
                  slippage === "1" ? "rounded-2xl bg-[#AB94EB]" : "rounded-2xl"
                }`}
              >
                <div
                  className={stylesSlippage.ethereum}
                  onClick={() => {
                    dispatch(updateSlippage("3"));
                    setSlippage("3");
                    setIsSlippageChange(true);
                    setIsSlippageAuto(false);
                    setIsCustom(false);
                  }}
                >
                  3%
                </div>
              </div>
              {isCustom === true ? (
                <div className="flex">
                  <div className="flex object-contain ml-2">
                    <input
                      type="text"
                      placeholder="custom"
                      className="focus:outline-0 ml-2 py-1.5 rounded-lg w-[70px] object-contain
                active:bg-black active:text-primaryText bg-transparent text-[#9D9DA3]
                border border-secondaryFillLight hover:border-[#9D9DA3]"
                      value={customSlippage}
                      onChange={(e) => {
                        setCustomSlippage(e.target.value);
                        setSlippage(e.target.value);
                        dispatch(updateSlippage(e.target.value));
                        setIsSlippageChange(true);
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div
                  className={`${stylesSlippage.customWrapper} ${
                    slippage === "custom"
                      ? "rounded-2xl bg-[#AB94EB]"
                      : "rounded-2xl"
                  }`}
                >
                  <div
                    className={stylesSlippage.ethereum}
                    onClick={() => setIsCustom(true)}
                  >
                    Custom
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {isLowSlippage && (
          <div className={stylesSlippage.transactionWithExtremelyLowWrapper}>
            <div className={stylesSlippage.slippageTolerance}>
              Transaction with extremely low slippage tolerance might be
              reverted because of very small market movement
            </div>
          </div>
        )}
        {isWarning && (
          <div className={stylesSlippage.youMayReceive12LessWithWrapper}>
            <div className={stylesSlippage.slippageTolerance}>
              {`You may receive ${slippage}% less with this level of slippage tolerance`}
            </div>
          </div>
        )}

        <div className={`${stylesSlippage.frameChild}`} />
        <div className={stylesSlippage.frameDiv}>
          <div className={`text-[14px] ${stylesSlippage.transactionDeadline}`}>
            Transaction deadline
          </div>
          <div className={`${stylesSlippage.frameParent3}`}>
            {/* <div className={stylesSlippage.wrapper1}> */}
            <div className="flex flex-row px-2 py-1 bg-gray-600 rounded">
              <div className={`text-[14px] ${stylesSlippage.ethereum}`}>20</div>
            </div>
            <div className={`text-[14px]  ${stylesSlippage.minutes}`}>
              minutes
            </div>
          </div>
        </div>
      </>
      <>
        <div className="self-stretch rounded-2xl bg-surface-tint-d-8 overflow-hidden flex flex-col py-4 px-4 items-center justify-start gap-[8px] text-center text-13xl">
          <div
            className={`self-stretch relative tracking-[0.02em] leading-[44px] ${
              isBalanceLoading
                ? "rounded-lg bg-secondaryFillLight animate-pulse h-[44px]"
                : ""
            }`}
          >
            {isBalanceLoading ? "" : `${balance} ${chainSymbol}`}
          </div>
          <div
            className={`self-stretch relative text-sm tracking-[0.02em] leading-[20px] font-medium text-black ${
              isBalanceLoading
                ? "rounded-lg bg-secondaryFillLight animate-pulse h-[20px]"
                : ""
            }`}
          >
            {isBalanceLoading ? "" : `~$ ${chainUsdBalance}`}
          </div>
        </div>
      </>
      <>
        <div className="self-stretch rounded-2xl overflow-hidden flex flex-row py-2 px-0 items-center justify-start gap-[12px]">
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-8 h-8 shrink-0">
              <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-81xl [background:linear-gradient(89.96deg,_#74ff63,_#7c90fe_30.21%,_#f05dfd_70.31%,_#fff73f)]" />
            </div>
          </div>
          <div className="flex-1 relative tracking-[0.02em] leading-[22px] font-medium">
            {address
              ? address?.substring(0, 6) + "..." + address?.substring(10, 14)
              : ""}
          </div>
          <button
            className="cursor-pointer [border:none] py-4 px-3 bg-surface-tint-d-8 rounded-xl w-10 h-10 shrink-0 flex flex-row box-border items-center justify-center"
            onClick={""}
          >
            <img
              className="relative w-5 h-5 shrink-0 overflow-hidden"
              alt=""
              src="/share04.svg"
            />
          </button>
          <button
            className="cursor-pointer [border:none] py-4 px-3 bg-surface-tint-d-8 rounded-xl w-10 h-10 shrink-0 flex flex-row box-border items-center justify-center"
            onClick={""}
          >
            <img
              className="relative w-5 h-5 shrink-0 overflow-hidden"
              alt=""
              src="/copy031.svg"
            />
          </button>
          <button
            className="cursor-pointer [border:none] py-4 px-3 bg-surface-tint-d-8 rounded-xl w-10 h-10 shrink-0 flex flex-row box-border items-center justify-center"
            to="/"
            onClick={() => {
              disconnect();
            }}
          >
            <img
              className="relative w-5 h-5 shrink-0 overflow-hidden"
              alt=""
              src="/logout01.svg"
            />
          </button>
        </div>
      </>
      {mode === true ? null : (
        <div className="mt-2 flex bg-lightslategray-300 w-full h-px" />
      )}
    </div>
  );
};

export const SlippageCard = (props) => {
  const {
    // setIsTokenPage,
    setSlippage,
    setIsSlippageChange,
    setIsSlippageAuto,
    setIsCustom,
    isSlippageAuto,
    isWarning,
    isLowSlippage,
    slippage,
    setCustomSlippage,
  } = props;

  // const mode = true; // keep in light mode
  const mode = true; // keep in light mode
  const checkout = (
    <div
      className={`flex flex-col gap-[16px] rounded-lg p-2 outline outline-lightslategray-300 outline-[1px] ${
        mode === true && "bg-white"
      }`}
    >
      <div className="mt-2 flex flex-col gap-[16px] overflow-scroll h-[25vh]">
        <TokenCardContainer
          mode={mode}
          setSlippage={setSlippage}
          setIsSlippageChange={setIsSlippageChange}
          setIsSlippageAuto={setIsSlippageAuto}
          setIsCustom={setIsCustom}
          isSlippageAuto={isSlippageAuto}
          isWarning={isWarning}
          isLowSlippage={isLowSlippage}
          slippage={slippage}
          setCustomSlippage={setCustomSlippage}
        />
      </div>
    </div>
  );
  return <>{checkout}</>;

  // return (
  //   <>
  //     <div className="flex justify-center rounded-lg bg-white shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[320px] xs:w-[340px] md:w-[500px] p-4">
  //       {checkout}
  //     </div>
  //   </>
  // );
};
