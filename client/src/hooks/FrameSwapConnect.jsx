// import { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { HiArrowNarrowRight } from 'react-icons/hi';
// import { FaDotCircle } from 'react-icons/fa';
// import Modal from './Modal';
// import { ethers } from 'ethers';
// import { networksOptions } from '../../constants';

// import { formatUnits, parseUnits } from '@ethersproject/units';
// //=============={Using wallet Connect}======================
// import {
//   useConnect,
//   useAccount,
//   useSwitchNetwork,
//   useSigner,
//   useBalance,
// } from 'wagmi';

// import erc20ABI from '../engine/erc20.json';
// // import { useSendTransaction, useWaitForTransaction } from 'wagmi';
// import { useDispatch, useSelector } from 'react-redux';
// import { getLocalStorage } from '../../redux/localStorage';

// import {
//   fetchSpender,
//   // updatePrice,
// } from '../../redux/features/swap/swapService';

// import {
//   updateChain,
//   updateChainSymbol,
//   updateConnectedNetwork,
//   updateSlippage,
//   updateIsChangeChainId,
//   updateConnecting,
// } from '../../redux/features/swap/swapSlice';

// import { updateSwapEstimates } from '../../redux/api/api';

// //========={importing Page}======================================

// //=========={Styles}======================
// import stylesSlippage from './Slippage.module.css';
// import stylesFromToken from './FromTokenList.module.css';
// import stylesSwap from './Swap.module.css';
// import stylesSwapTx from './SwapTransact.module.css';
// import useWindowResize from '../../hooks/useWindowResize';

// //==============={Mobile components}===============================
// import Component4Network from '../../pagesMobileApp/Component4Network';
// import Component8 from '../../pagesMobileApp/Component8';
// import Component6FromToken from '../../pagesMobileApp/Component6FromToken';
// import Component6ToToken from '../../pagesMobileApp/Component6ToToken';
// import stylesSwapMobile from '../../pagesMobileApp/Component11.module.css';
// import stylesSwapMobileDetail from '../../pagesMobileApp/Component9.module.css';
// import { apiRequest } from '../../redux/api/api';
// import { approveSwap, createSwap } from './oneInchApiRequest';
// //============{Styles}=======================
// const FrameSwapConnect = () => {
//   const version = '5.2';
//   const fee = import.meta.env.VITE_SWAP_FEE;
//   const dexAddress = import.meta.env.VITE_DEX_ADDRESS;
//   const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
//   console.log({ dexAddressFrontend: dexAddress });
//   console.log({ BACKEND_URLFrontEnd: BACKEND_URL });

//   const dispatch = useDispatch();
//   const {
//     connect,
//     connectors,
//     error: isErrorConnector,
//     isLoading: isLoadingConnector,
//     pendingConnector,
//   } = useConnect();

//   let axiosCancelToken = useRef(null); // axios ref

//   //=============={Loading State}==========================
//   const [isToLoading, setIsToLoading] = useState(false);
//   const [isFromLoading, setIsFromLoading] = useState(false);
//   //=============={Loading State}==========================

//   const [isLoading, setIsLoading] = useState(false);
//   const [isError, setIsError] = useState(false);
//   const [isSuccess, setIsSucess] = useState(false);
//   const [isSent, setIsSent] = useState(false);
//   const [isApprove, setIsApprove] = useState(false);
//   const [isApproved, setIsApproved] = useState(false); // approval granted
//   const [isTxValue, setIsTxValue] = useState(false);

//   console.log({ isApproved: isApproved });

//   //================{PAGES}==================

//   const [isSwap, setIsSwap] = useState(false);
//   const [isFromTokenPage, setIsFromTokenPage] = useState(false);
//   const [isToTokenPage, setIsToTokenPage] = useState(false);
//   const [isSlippagePage, setIsSlippagePage] = useState(false);
//   const [isNetworkPage, setIsNetworkPage] = useState(false);

//   //================{ORDER OF EXECUTION}==================

//   //isChange ==> fetchUserOrder();
//   //activeDataFetched ==> fetchUser()();
//   //isUpdateData ==> fetchSetData();

//   //======================================={REDUX BLOCK BEGINS}===============================================
//   //======================================={REDUX BLOCK BEGINS}===============================================
//   //======================================={REDUX BLOCK BEGINS}===============================================
//   //==============={Primary Data}=========================

//   // const userPricesL =
//   //   getLocalStorage('userPrices') && getLocalStorage('userPrices');

//   //======={Current}==============================================

//   const isChainChange = localStorage.getItem('chainSwitch')
//     ? JSON.parse(localStorage.getItem('chainSwitch'))
//     : false;

//   //=============={To be Removed New}===============================
//   const chainL = localStorage.getItem('chain')
//     ? JSON.parse(localStorage.getItem('chain'))
//     : networksOptions[0];
//   const [chain, setChain] = useState(chainL);
//   const chainId = chain ? chain.id : 1;

//   const allTokensL = localStorage.getItem('allTokens')
//     ? JSON.parse(localStorage.getItem('allTokens'))
//     : null;

//   const fTokenL = localStorage.getItem('fToken')
//     ? JSON.parse(localStorage.getItem('fToken'))
//     : null;

//   const tTokenL = localStorage.getItem('tToken')
//     ? JSON.parse(localStorage.getItem('tToken'))
//     : null;

//   const slippageL = localStorage.getItem('slippage')
//     ? JSON.parse(localStorage.getItem('slippage'))
//     : '1';

//   const fValueL = localStorage.getItem('fValue')
//     ? JSON.parse(localStorage.getItem('fValue'))
//     : 1;

//   const tValueL = localStorage.getItem('tValue')
//     ? JSON.parse(localStorage.getItem('tValue'))
//     : 1;

//   // const fValueL =
//   //   getLocalStorage('fValue') !== undefined ? getLocalStorage('fValue') : 1;

//   const usdtTokenL = localStorage.getItem('usdtToken')
//     ? JSON.parse(localStorage.getItem('usdtToken'))
//     : null;

//   // const allProtocols = userPricesL?.allProtocols || null;

//   //==============={Secondary Data}=========================

//   // const tValueL = userPricesL?.tValueFormatted && userPricesL?.tValueFormatted;
//   const [usdtToken, setUsdtToken] = useState(usdtTokenL);
//   const [allTokens, setAllTokens] = useState(allTokensL);
//   console.log({ allTokens: allTokens });
//   const [fToken, setFromToken] = useState(fTokenL);
//   console.log({ fToken: fToken });

//   const [tToken, setToToken] = useState(tTokenL);

//   const [fromPrice, setFromPrice] = useState('');
//   console.log({ fromPrice: fromPrice });
//   const [toPrice, setToPrice] = useState('');
//   console.log({ toPrice: toPrice });

//   const [slippage, setSlippage] = useState(slippageL);
//   const [fValue, setFromValue] = useState(fValueL);
//   console.log({ fValueType: typeof fValue });
//   // console.log({ fValueLength: fValue.length });
//   // console.log({ fValueSlice: fValue && fValue.slice(0, 3) });

//   const fSymbol = fToken && fToken?.symbol;
//   const fLogoURI = fToken && fToken?.logoURI;
//   const tSymbol = tToken && tToken?.symbol;
//   const tLogoURI = tToken && tToken?.logoURI;

//   //======================================={ISCHANGE CONDITIONS}===============================================

//   //======================================={OLD BLOCK BEGINS}===============================================
//   //======================================={OLD BLOCK BEGINS}===============================================
//   //======================================={OLD BLOCK BEGINS}===============================================

//   const signer = useSigner();
//   const { address, isConnected } = useAccount();
//   const walletAddress = address;
//   const { switchNetwork } = useSwitchNetwork();

//   const [swapRoutes, setSwapRoutes] = useState([]);
//   const [allProtocols, setAllProtocols] = useState([]);
//   const [activeProtocols, setActiveProtocols] = useState([]);
//   const [protocols, setProtocols] = useState('');
//   const [validationOwner, setValidationOwner] = useState(false);
//   console.log({ validationOwner: validationOwner });
//   //========={Tokens}===============================
//   const [isFromValueChange, setIsFromValueChange] = useState(false);
//   const [tValue, setToValue] = useState(0.0);
//   console.log({ tValue: tValue });

//   const [tValueFormatted, setToValueFormatted] = useState(0.0);
//   const [filteredtTokens, setFilteredtTokens] = useState();
//   const [validatedValue, setValidatedValue] = useState(0.0);
//   const [estimatedGas, setEstimatedGas] = useState(0.0);
//   const [exchangeRate, setExchangeRate] = useState(0.0);

//   // console.log({ validatedValue: typeof validatedValue });
//   //====================={Prices}===============================

//   const connectedNetworkSwitchL = useSelector(
//     (state) => state.swap?.connectedNetwork
//   );
//   const [isChainModalVisible, setIsChainModalVisible] = useState(
//     connectedNetworkSwitchL
//   );
//   // const [isChainModalVisible, setIsChainModalVisible] = useState(false);

//   //==========={Connection}=============
//   // const [isConnected, setIsConnected] = useState(true);
//   const [isCaution, setIsCaution] = useState(false);
//   //==========={Connection}=============

//   const [isRouting, setIsRouting] = useState(false);

//   const [spender, setSpender] = useState();
//   //==========={Favorite List}=============

//   const [info, setInfo] = useState('');
//   const [isProcessing, setIsProcessing] = useState(false);

//   const [isTransactionMessage, setIsTransactionMessage] = useState('');
//   const [transactionMessage, setTransactionMessage] = useState('');

//   console.log({ transactionMessage: transactionMessage });

//   //===========================================================================

//   const [isFromTokenChange, setIsFromTokenChange] = useState(false);
//   const [isToTokenChange, setIsToTokenChange] = useState(false);
//   const [selectedToken, setSelectedToken] = useState();
//   const [isAddToFavorite, setIsAddToFavorite] = useState();
//   const [isRemoveFromFavorite, setIsRemoveFromFavorite] = useState();

//   const [filteredfTokens, setFilteredfTokens] = useState();

//   const userTokensL = localStorage.getItem('userTokens')
//     ? JSON.parse(localStorage.getItem('userTokens'))
//     : null;
//   // const [favoriteTokens, setFavoriteTokens] = useState(userTokensL);
//   // const [favoriteTokens, setFavoriteTokens] = useState([]);
//   const [favoriteTokens, setFavoriteTokens] = useState(null);

//   console.log({ favoriteTokens: favoriteTokens });
//   console.log({ favoriteTokensType: typeof favoriteTokens });

//   const [savedFavoriteTokens, setSavedFavoriteTokens] = useState(userTokensL); // last used
//   // const [savedFavoriteTokens, setSavedFavoriteTokens] = useState([]);
//   console.log({ savedFavoriteTokens: savedFavoriteTokens });

//   const [favoriteTokensMobile, setFavoriteTokensMobile] = useState([]);
//   console.log({ favoriteTokensMobileType: typeof favoriteTokensMobile });

//   const [updatedFavorites, setUpdatedFavorites] = useState([]);
//   console.log({ updatedFavorites: updatedFavorites });

//   const [favoriteToken1, setFavoriteToken1] = useState({});
//   const [favoriteToken2, setFavoriteToken2] = useState({});
//   const [favoriteToken3, setFavoriteToken3] = useState({});
//   const [favoriteToken4, setFavoriteToken4] = useState({});

//   //==========={Connection}=============
//   const [isCustom, setIsCustom] = useState(false);
//   const [isWarning, setIsWarning] = useState(false);
//   const [isLowSlippage, setIsLowSlippage] = useState(false);
//   const [customSlippage, setCustomSlippage] = useState('');
//   const [isSlippageAuto, setIsSlippageAuto] = useState(true); // default state is
//   const isConnecting = localStorage.getItem('isConnecting')
//     ? JSON.parse(localStorage.getItem('isConnecting'))
//     : false;

//   const [isConnectingL, setIsConnectingL] = useState(false);
//   const [activeConnection, setActiveConnection] = useState(
//     connectors && connectors[0]
//   );

//   console.log({ activeConnection: activeConnection });
//   //====================================================================================================
//   //======================================={BALANCES}=====================================
//   //====================================================================================================

//   const { data: dataBal } = useBalance({
//     address,
//     // chainId: chainId,
//     chainId: chainId,
//     watch: true,
//   });

//   const [balance, setBalance] = useState('');
//   // const [balance, setBalance] = useState(0.0);

//   // console.log({ newChainBalance: balance });
//   // console.log({ chainBalanceType: typeof balance });

//   const [fromBalance, setFromBalance] = useState(0.0);
//   const [fromBalancePercent, setFromBalancePercent] = useState(75);
//   // console.log({ fromBalance: fromBalance });
//   const [toBalance, setToBalance] = useState(0.0);

//   console.log({ fValueReal: fValue });
//   console.log({ fValueFormatted: new Intl.NumberFormat().format(fValue) });
//   console.log({ tValueFormatted: new Intl.NumberFormat().format(tValue) });
//   const [priceDeviation, setPriceDeviation] = useState(0.0);
//   console.log({ priceDeviation: priceDeviation });
//   console.log({ priceDeviationType: typeof priceDeviation });

//   const [isPriceDeviation, setIsPriceDeviation] = useState(true);
//   const [isCriticalPriceDeviation, setIsCriticalPriceDeviation] =
//     useState(true);

//   //====================================================================================================
//   //======================================={MAIN TRANSACTION CALLS}=====================================
//   //====================================================================================================

//   //====================================================================================================
//   //======================================={Format Number Function}=====================================
//   //====================================================================================================
//   const [toInput, setToInput] = useState('');

//   console.log({ toInput: toInput });

//   const [isSwapSuccess, setIsSwapSuccess] = useState(false);
//   const [isSwapError, setIsSwapError] = useState(false);
//   const [isApproveSuccess, setIsApproveSuccess] = useState(false);
//   const [isApproveError, setIsApproveError] = useState(false);

//   const { width, height } = useWindowResize();
//   console.log({ screenWidth: width, sreenHeight: height });

//   //====={PriceAPI from Binance}=============================
//   const [rateETHEUR, setRateETHEUR] = useState('');
//   console.log({ rateETHEUR: rateETHEUR });

//   //====={PriceAPI from Google}=============================
//   const [rateEURUSD, setRateEURUSD] = useState('');
//   console.log({ rateEURUSD: rateEURUSD });

//   //====={Function}=============================
//   const [rateETHUSD, setRateETHUSD] = useState('');
//   console.log({ rateETHUSD: rateETHUSD });

//   //====={PriceAPI from Binance}=============================
//   const [rateETHUSDT, setRateETHUSDT] = useState('');
//   console.log({ rateETHUSDT: rateETHUSDT });

//   //====={PriceAPI fFunction}=============================
//   const [rateUSDTUSD, setRateUSDTUSD] = useState('');
//   // const [rateUSDTUSD, setRateUSDTUSD] = useState(0.0);
//   console.log({ rateUSDTUSD: rateUSDTUSD });
//   console.log({ rateUSDTUSDType: typeof rateUSDTUSD });

//   const usdExchangeRate = localStorage.getItem('rateUSDTUSD')
//     ? JSON.parse(localStorage.getItem('rateUSDTUSD'))
//     : null;

//   console.log({ usdExchangeRate: usdExchangeRate });

//   const [checkFNaN, setcheckFNaN] = useState(false);
//   console.log({ checkFNaN: checkFNaN });
//   const [updatedFNaN, setUpdatedFNaN] = useState(0.0);
//   console.log({ updatedFNaN: updatedFNaN });
//   const [checkTNaN, setcheckTNaN] = useState(false);
//   console.log({ checkTNaN: checkTNaN });
//   const [updatedTNaN, setUpdatedTNaN] = useState(0.0);
//   console.log({ updatedTNaN: updatedTNaN });
//   const [checkUSDRate, setCheckUSDRate] = useState(false);
//   console.log({ checkUSDRate: checkUSDRate });

//   const [check, setCheck] = useState();
//   console.log({ check: check });

//   //===={Update rateUSDTUSD in local storage only if there is value}===============
//   useEffect(() => {
//     if (rateUSDTUSD !== null) {
//       localStorage.setItem('rateUSDTUSD', JSON.stringify(rateUSDTUSD));
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [rateUSDTUSD]);

//   useEffect(() => {
//     getChainBalance();

//     if (isNaN(balance)) {
//       // return NaN;
//       getChainBalance();
//     }

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [chainId, balance, isConnected]);

//   async function getChainBalance() {
//     if (isConnected) {
//       const tokenbal = Number(dataBal?.formatted).toFixed(3);
//       setBalance(tokenbal);
//       localStorage.setItem('chainBalance', JSON.stringify(tokenbal));
//     }
//   }

//   //====================================================================================================
//   //======================================={MAIN TRANSACTION CALLS}=====================================
//   //====================================================================================================
//   //

//   useEffect(() => {
//     if (connectedNetworkSwitchL === true) {
//       setIsChainModalVisible(true);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [connectedNetworkSwitchL]);

//   useEffect(() => {
//     localStorage.setItem('isConnecting', JSON.stringify(isConnectingL));

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isConnectingL]);

//   useEffect(() => {
//     localStorage.setItem('chain', JSON.stringify(chain));

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [chain]);

//   useEffect(() => {
//     if (isConnected === true) {
//       setIsConnectingL(false);
//       dispatch(updateConnecting(false));
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isConnected]);

//   useEffect(() => {
//     localStorage.setItem('allToken', JSON.stringify(allTokens));

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [allTokens]);

//   useEffect(() => {
//     localStorage.setItem('usdtToken', JSON.stringify(usdtToken));

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [usdtToken]);

//   useEffect(() => {
//     localStorage.setItem('fToken', JSON.stringify(fToken));

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [fToken]);

//   useEffect(() => {
//     localStorage.setItem('tToken', JSON.stringify(tToken));

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [tToken]);

//   useEffect(() => {
//     localStorage.setItem('slippage', JSON.stringify(slippage));

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [slippage]);

//   useEffect(() => {
//     localStorage.setItem('fValue', JSON.stringify(fValue));

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [fValue]);

//   useEffect(() => {
//     localStorage.setItem('tValue', JSON.stringify(tValue));

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [tValue]);

//   // fetch favoriteTokenList
//   useEffect(() => {
//     if (allTokens !== null || undefined) {
//       getFavorites();
//     }

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [allTokens]);

//   useEffect(() => {
//     if (tValue !== 0) {
//       getPriceDeviation();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [tValue, fromPrice, toPrice]);

//   async function getPriceDeviation() {
//     let fromValueTotalL = Number(fValue) * Number(fromPrice);
//     let toValueTotalL = Number(tValue) * Number(toPrice);
//     if (fromValueTotalL > toValueTotalL) {
//       let priceDifference = fromValueTotalL - toValueTotalL;
//       let priceSum = toValueTotalL + fromValueTotalL;
//       let priceAverage = priceSum / 2;
//       let percentageDeviationRaw = 100 * (priceDifference / priceAverage);
//       let percentageDeviation = percentageDeviationRaw.toFixed(2);

//       setPriceDeviation(percentageDeviation);
//       setIsPriceDeviation(true);

//       if (Number(percentageDeviationRaw) > 12) {
//         setIsCriticalPriceDeviation(true);
//       }
//     } else {
//       setIsPriceDeviation(false);
//     }
//   }

//   useEffect(() => {
//     handleToInput();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [tValue]);

//   const handleToInput = () => {
//     if (fValue !== null) {
//       const formattedToNumber = new Intl.NumberFormat().format(tValue);

//       // Limit to three significant digits
//       // console.log(new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(tValue));
//       // Expected output: "1,23,000"

//       // const toNumberEdited = formattedToNumber.replace(/[^\d]/g, '');
//       const toNumberEdited = formattedToNumber.replace(/,/g, ' '); // replace comme with space
//       setToInput(toNumberEdited);
//     }
//   };

//   async function getFavorites() {
//     // await Promise?.allSettled?(
//     allTokens?.map(async (b) => {
//       // let favoriteList = [];
//       // if (b.address === fromToken.address) {
//       if (b.symbol === 'WBTC') {
//         setFavoriteToken1(b);
//       }
//       if (b.symbol === 'USDC') {
//         setFavoriteToken2(b);
//       }

//       if (b.address === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
//         setFavoriteToken3(b);
//       }
//       if (b.symbol === 'USDT') {
//         setFavoriteToken4(b);
//       }
//     });
//     // )
//   }

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       if (allTokens && !userTokensL) {
//         let newTokens = [];
//         newTokens.push(
//           favoriteToken1,
//           favoriteToken2,
//           favoriteToken3,
//           favoriteToken4
//         );

//         setSavedFavoriteTokens(newTokens);
//         localStorage.setItem('userTokens', JSON.stringify(newTokens));
//       }
//     }, 10000);
//     return () => {
//       clearInterval(intervalId);
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [
//     allTokens,
//     userTokensL,
//     favoriteToken1,
//     favoriteToken2,
//     favoriteToken3,
//     favoriteToken4,
//   ]);

//   //======{Add or remove favorite tokens}=============
//   const getFavoriteByChain = async () => {
//     let newTokens;
//     switch (chainId) {
//       //MAINNETS

//       //Arbitrum
//       case 42161:
//         newTokens = localStorage.getItem('userTokensArbitrum')
//           ? JSON.parse(localStorage.getItem('userTokensArbitrum'))
//           : null;

//         break;

//       //Avalanche
//       case 43114:
//         newTokens = localStorage.getItem('userTokensAvalanche')
//           ? JSON.parse(localStorage.getItem('userTokensAvalanche'))
//           : null;
//         break;

//       //Binance
//       case 56:
//         newTokens = localStorage.getItem('userTokensBinance')
//           ? JSON.parse(localStorage.getItem('userTokensBinance'))
//           : null;
//         break;

//       //ETH
//       case 1:
//         newTokens = localStorage.getItem('userTokensEthereum')
//           ? JSON.parse(localStorage.getItem('userTokensEthereum'))
//           : null;
//         break;

//       //Optimism
//       case 10:
//         newTokens = localStorage.getItem('userTokensOptimism')
//           ? JSON.parse(localStorage.getItem('userTokensOptimism'))
//           : null;
//         break;

//       //Polygon
//       case 137:
//         newTokens = localStorage.getItem('userTokensPolygon')
//           ? JSON.parse(localStorage.getItem('userTokensPolygon'))
//           : null;
//         break;

//       default:
//         return;
//       //break;
//     }

//     setSavedFavoriteTokens(newTokens);
//     localStorage.setItem('userTokens', JSON.stringify(newTokens));
//   };

//   useEffect(() => {
//     getFavoriteByChain();

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [chainId]);

//   //Mobile tokens
//   useEffect(() => {
//     if (allTokens) {
//       let newTokens = [];

//       newTokens.push(favoriteToken1, favoriteToken2, favoriteToken3);

//       console.log({ newTokensOnly: newTokens });
//       setFavoriteTokensMobile(newTokens);
//     }
//   }, [
//     allTokens,
//     favoriteToken1,
//     favoriteToken2,
//     favoriteToken3,
//     favoriteTokens,
//   ]);

//   //========{On IntervalChanges}=========================

//   //setSelectedToken=======================================================================

//   useEffect(() => {
//     if (savedFavoriteTokens) {
//       localStorage.setItem('userTokens', JSON.stringify(savedFavoriteTokens));
//       setFavoriteTokens(savedFavoriteTokens);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [savedFavoriteTokens]);

//   useEffect(() => {
//     if (isAddToFavorite) {
//       addToFavorite(selectedToken);
//       setIsAddToFavorite(false);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isAddToFavorite]);

//   useEffect(() => {
//     if (isRemoveFromFavorite) {
//       removeFromFavorite(selectedToken);
//       setIsRemoveFromFavorite(false);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isRemoveFromFavorite]);

//   // async function addToFavorite(newToken) {
//   //   let updatedTokens = favoriteTokens;
//   //   updatedTokens.push(newToken);
//   //   setSavedFavoriteTokens(updatedTokens);
//   //   localStorage.setItem('userTokens', JSON.stringify(updatedTokens));
//   //   favoriteSwitch(updatedTokens);
//   // }

//   // <img src="image.png" onError="this.onerror=null;this.src='/images/noimage.gif';" />
//   // <img src="image.png" onError="this.onerror=null;this.src='/default-a-silhouette-design-of-a-eagle-sunset-design-t-shirt-3-1698a835a2d5488e8794031be1fa6098-0-4@2x.png';" />

//   async function addToFavorite(newToken) {
//     let isActive;
//     favoriteTokens?.map(async (b) => {
//       if (b?.address === newToken?.address) {
//         isActive = true;
//       }
//     });
//     if (isActive === true) {
//       return;
//     } else {
//       let updatedTokens = favoriteTokens;
//       updatedTokens.push(newToken);
//       setSavedFavoriteTokens(updatedTokens);
//       localStorage.setItem('userTokens', JSON.stringify(updatedTokens));
//       favoriteSwitch(updatedTokens);
//     }
//   }

//   async function removeFromFavorite(newToken) {
//     let updatedTokens = [];
//     favoriteTokens?.map(async (b) => {
//       if (b !== newToken) {
//         updatedTokens.push(b);
//       }
//     });
//     setSavedFavoriteTokens(updatedTokens);
//     localStorage.setItem('userTokens', JSON.stringify(updatedTokens));
//     favoriteSwitch(updatedTokens);
//   }

//   useEffect(() => {
//     updateFavoriteToken();

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [allTokens, favoriteTokens]);

//   async function updateFavoriteToken() {
//     let newTokensList = allTokens;

//     if (newTokensList.length >= 1 && favoriteTokens.length >= 1) {
//       for (let i = 0; i < newTokensList.length; i++) {
//         for (let j = 0; j < favoriteTokens.length; j++) {
//           if (favoriteTokens[j].address === newTokensList[i].address) {
//             newTokensList[i] = { ...newTokensList[i], favorite: true }; // add new state
//           }
//         }
//       }
//     }
//     setUpdatedFavorites(newTokensList);
//     localStorage.setItem('allToken', JSON.stringify(newTokensList));
//     setAllTokens(newTokensList); // re-update allTokens
//   }

//   useEffect(() => {
//     favoriteSwitch(savedFavoriteTokens);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [savedFavoriteTokens]);

//   //======{Add or remove favorite tokens}=============
//   const favoriteSwitch = async (newParams) => {
//     switch (chainId) {
//       //MAINNETS

//       //Arbitrum
//       case 42161:
//         localStorage.setItem('userTokensArbitrum', JSON.stringify(newParams));
//         break;

//       //Avalanche
//       case 43114:
//         localStorage.setItem('userTokensAvalanche', JSON.stringify(newParams));
//         break;

//       //Binance
//       case 56:
//         localStorage.setItem('userTokensBinance', JSON.stringify(newParams));
//         break;

//       //ETH
//       case 1:
//         localStorage.setItem('userTokensEthereum', JSON.stringify(newParams));
//         break;

//       //Optimism
//       case 10:
//         localStorage.setItem('userTokensOptimism', JSON.stringify(newParams));
//         break;

//       //Polygon
//       case 137:
//         localStorage.setItem('userTokensPolygon', JSON.stringify(newParams));
//         break;

//       default:
//         return;
//       //break;
//     }
//   };

//   //==========================================================================

//   useEffect(() => {
//     if (
//       fToken !== undefined ||
//       allTokens !== undefined ||
//       tToken !== undefined
//     ) {
//       filterFTokens();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [fToken]);

//   function filterFTokens() {
//     let filteredFTokens = allTokens?.filter((filter) => {
//       return filter?.symbol?.toLowerCase() !== tToken?.symbol.toLowerCase();
//     });
//     setFilteredfTokens(filteredFTokens);
//   }

//   useEffect(() => {
//     if (
//       fToken !== undefined ||
//       allTokens !== undefined ||
//       tToken !== undefined
//     ) {
//       filterTTokens();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [tToken]);

//   function filterTTokens() {
//     let filteredTTokens = allTokens?.filter((filter) => {
//       return filter?.symbol.toLowerCase() !== fToken?.symbol.toLowerCase();
//     });
//     setFilteredtTokens(filteredTTokens);
//   }
//   //================={Slippage controller}===============
//   useEffect(() => {
//     let slippageValue = Number(slippage);
//     if (slippage !== null && slippageValue > 0 && slippageValue < 0.09) {
//       setIsLowSlippage(true);
//     }

//     if (slippageValue > 3) {
//       setIsWarning(true);
//     }

//     if (slippage !== null && slippageValue > 0.09 && slippageValue <= 3) {
//       setIsLowSlippage(false);
//       setIsWarning(false);
//     }

//     if (slippage === null || undefined) {
//       setIsLowSlippage(false);
//       setIsWarning(false);
//     }
//     if (slippage === '') {
//       setIsLowSlippage(false);
//       setIsWarning(false);
//     }
//   }, [slippage, isWarning, isLowSlippage]);

//   //===================================================================================================

//   useEffect(() => {
//     if (isProcessing === true) {
//       setTimeout(() => {
//         setIsProcessing(false);
//       }, 10000); // reduce time
//     }
//   });

//   //==============={useEffect Blocks}=================================

//   useEffect(() => {
//     updateProtocols();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [activeProtocols]); //======================================={OLD BLOCK BEGINS}===============================================

//   function onFromValueChanged(ev) {
//     setToValue(0);
//     setFromValue(ev.target.value);
//     setIsFromValueChange(true);
//   }

//   /*
//  ====================================================================
//         The Swap function
//  ====================================================================
// */

//   /*
//  ====================================================================
//         Swap Owner
//  ====================================================================
// */

//   useEffect(() => {
//     setTimeout(() => {
//       validateSwapOwner();
//       if (validationOwner === true) {
//         setInfo('');
//         setIsCaution(false);
//       }
//     }, 1000);
//   });

//   useEffect(() => {
//     resetProtocolsValidation();
//   }, [fValue, fToken, tToken, chainId]);

//   async function resetProtocolsValidation() {
//     setProtocols('');
//     setInfo('No routes available');
//     setIsCaution(true);

//     setValidationOwner(false);
//   }

//   useEffect(() => {
//     setTimeout(() => {
//       validateSwapOwner();
//       if (fromBalance <= fValue) {
//         setValidationOwner(false);
//         setInfo('Insufficient balance');
//         setIsCaution(true);
//       }
//     }, 1000);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [fValue, fToken, tToken, chainId, protocols, fromBalance]);

//   async function validateSwapOwner() {
//     setValidationOwner(false);

//     if (!walletAddress) {
//       setInfo('Wallet not connected');
//       setIsCaution(true);

//       setValidationOwner(false);
//     } else if (!fValue) {
//       setInfo('Please enter amount');
//       setIsCaution(true);

//       setValidationOwner(false);
//     } else if (balance <= 0) {
//       setInfo(`Insufficient network balance`);
//       setIsCaution(true);

//       //   setValidationOwner(false);
//       // } else if (balance <= 0) {
//       //   setInfo(`Insufficient balance`);
//       //   setIsCaution(true);

//       setValidationOwner(false);
//     } else if (fromBalance <= fValue) {
//       setInfo('Insufficient balance');
//       setIsCaution(true);

//       setValidationOwner(false);
//     } else if (!protocols) {
//       setInfo('No routes available');
//       setIsCaution(true);

//       setValidationOwner(false);
//     } else {
//       setValidationOwner(true);
//     }
//   }

//   useEffect(() => {
//     if (isApprove) {
//       setIsTransactionMessage(true);
//       if (isSent) {
//         setTransactionMessage('Approval sent');
//       }
//       if (isLoading) {
//         setTransactionMessage('Approval in progress...');
//       }
//       if (isSuccess) {
//         setTransactionMessage('Approval successful');
//       }
//       if (isError) {
//         setTransactionMessage('Approval Denied');
//       }
//       setIsTransactionMessage(false);
//     }
//   }, [isApprove, isSent, isLoading, isSuccess, isError]);

//   useEffect(() => {
//     if (isSwap) {
//       setIsTransactionMessage(true);
//       if (isSent) {
//         setTransactionMessage('Swap sent');
//       }
//       if (isLoading) {
//         setTransactionMessage('Swap in progress...');
//       }
//       if (isSuccess) {
//         setTransactionMessage('Swap successful');
//       }
//       if (isError) {
//         setTransactionMessage('Swap Denied');
//       }
//       setIsTransactionMessage(false);
//     }
//   }, [isSwap, isSent, isLoading, isSuccess, isError]);

//   //======================================================================================

//   async function swapToken() {
//     if (
//       fToken?.address === '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE' ||
//       fToken?.address === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
//     ) {
//       setIsSwap(true);
//       await swapOwner();
//     } else {
//       setIsApprove(true);
//       await approve();
//     }
//   }

//   // send for approval from backend
//   async function approve() {
//     setIsProcessing(true);
//     setIsLoading(true);
//     try {
//       const userData = {
//         chainId,
//         fToken,
//         tToken,
//         fValue,
//         slippage,
//       };
//       const response = await approveSwap(userData);
//       if (response) {
//         let tx = response;

//         let wallet = signer.data;
//         setIsSent(true);
//         const approval = await wallet.sendTransaction(tx);
//         console.log({ approvalReward: approval });

//         let approvalStatus = await approval.wait();

//         if (approvalStatus?.status) {
//           // if (approvalStatus?.status === 1) {
//           setIsSucess(true);
//           setIsApproved(true);
//           setIsApproveSuccess(true);
//           console.log({ approvalData: approvalStatus });
//           console.log({
//             txHash:
//               (approvalStatus?.hash && approvalStatus?.hash) ||
//               (approvalStatus?.transactionHash &&
//                 approvalStatus?.transactionHash) ||
//               '',
//           });
//           setTimeout(() => {
//             setIsSwap(false);
//           }, 2000);
//           setTimeout(async () => {
//             await swapOwner();
//           }, 2000);
//         }
//       }
//     } catch (error) {
//       console.log(error);
//       setIsError(true); // original
//       setIsApproveError(true);
//       setTimeout(() => {
//         setIsApproved(false);
//       }, 20000);
//       console.log({ ApproveError: error?.message });
//       // return error?.message;
//     }
//   }

//   useEffect(() => {
//     if (isApprove === false && isSwap === false) {
//       resetStatus();
//     }
//   }, [isApprove, isSwap]);

//   async function resetStatus() {
//     setIsLoading(false);
//     setIsError(false);
//     setIsSucess(false);
//     setIsSent(false);
//     setIsApprove(false);
//     setIsApproved(false);
//     setIsTransactionMessage(false);
//     setTransactionMessage('');
//   }

//   async function swapOwner() {
//     if (validationOwner === true) {
//       setIsProcessing(true);
//       setIsLoading(true);
//       try {
//         const userData = {
//           chainId,
//           fToken,
//           tToken,
//           fValue,
//           slippage,
//           walletAddress,
//           protocols,
//         };
//         const response = await createSwap(userData);

//         if (response) {
//           let tx = {
//             data: response.data.tx.data,
//             from: response.data.tx.from,
//             gasLimit: estimatedGas,
//             gasPrice: response.data.tx.gasPrice,
//             to: response.data.tx.to,
//             value: response.data.tx.value,
//           };

//           let wallet = signer.data;
//           setIsSent(true);

//           const transaction = await wallet.sendTransaction(tx);

//           console.log({ swapReward: transaction });

//           let txStatus = await transaction.wait();

//           if (txStatus?.status) {
//             // if (txStatus?.status === 1) {
//             setIsSucess(true);
//             setIsSwapSuccess(true);
//             console.log({ txData: txStatus });
//             console.log({
//               txHash:
//                 (txStatus?.hash && txStatus?.hash) ||
//                 (txStatus?.transactionHash && txStatus?.transactionHash) ||
//                 '',
//             });
//             console.log({ txStatus: 'Successful' });
//             setTimeout(() => {
//               setIsSwap(false);
//             }, 20000);
//           }
//         }
//       } catch (error) {
//         console.log(error);
//         setIsError(true);
//         setIsSwapError(true);
//         console.log({ SwapError: error?.message });
//         // return error?.message;
//         setTimeout(() => {
//           setIsSwap(false);
//         }, 20000);
//       }
//     }
//   }

//   function swapTokensPosition() {
//     let tmpToken = fToken;
//     setFromToken(tToken);
//     setToToken(tmpToken);
//     setIsFromTokenChange(true);
//     setIsToTokenChange(true);
//   }

//   //======={ To be tested for switching inpute values}=========

//   //================={updateProtocols}===============

//   async function updateProtocols() {
//     if (activeProtocols.length >= 1) {
//       let protocolsList = [];

//       for (let i = 0; i < activeProtocols.length; i++) {
//         let name = activeProtocols[i].name;
//         protocolsList.push(name);
//       }

//       console.log({ protocolsList: protocolsList });

//       const formattedProtocols = protocolsList.toString();
//       console.log({ formattedProtocols: formattedProtocols });
//       setProtocols(formattedProtocols); // Selected Protocols
//     }
//   }

//   useEffect(() => {
//     if (fromBalance === 'NaN') {
//       // return NaN;
//       setTimeout(() => {
//         fTokenBalance();
//       }, 200);
//     }

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [fromBalance]);

//   useEffect(() => {
//     if (isConnected) {
//       setFromBalance(0.0);
//       fTokenBalance();
//     }

//     if (isConnected === true && isFromTokenChange === true) {
//       setFromBalance(0.0);
//       setTimeout(() => {
//         fTokenBalance();
//         setIsFromTokenChange(false);
//       }, 2000); // production 2000
//     }

//     if (isConnected === true && isChainChange === true) {
//       // setFromBalance(0.0);
//       setTimeout(() => {
//         fTokenBalance();
//         setIsFromTokenChange(false);
//       }, 2000); // production 2000
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [chainId, fToken, fromBalance, balance, isFromTokenChange]);

//   async function fTokenBalance() {
//     let tokenAddress = fToken?.address;
//     if (tokenAddress === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
//       // setFromBalance(balance);
//       setFromBalance(Number(balance));
//     } else {
//       const ERC20Contract = new ethers.Contract(
//         tokenAddress,
//         erc20ABI,
//         signer.data
//       );
//       const tokenbal = await ERC20Contract.balanceOf(walletAddress);
//       const balanceRaw = formatUnits(tokenbal, fToken?.decimals);
//       if (Number(balanceRaw) > 0) {
//         const formattedBalance = Number(balanceRaw).toFixed(5);
//         setFromBalance(formattedBalance);
//       }
//     }
//   }

//   useEffect(() => {
//     if (isNaN(toBalance)) {
//       // return NaN;
//       setTimeout(() => {
//         tTokenBalance();
//       }, 200);
//     }

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [toBalance]);

//   useEffect(() => {
//     if (isConnected) {
//       setToBalance(0.0);
//       tTokenBalance();
//       // setTimeout(() => {
//       //   tTokenBalance();
//       // }, 2000); // production 2000
//     }

//     if (isConnected === true && isToTokenChange === true) {
//       setToBalance(0.0);
//       setTimeout(() => {
//         tTokenBalance();
//         setIsToTokenChange(false);
//       }, 2000); // production 2000
//     }

//     if (isConnected === true && isChainChange === true) {
//       // setToBalance(0.0);
//       setTimeout(() => {
//         tTokenBalance();
//         setIsToTokenChange(false);
//       }, 2000); // production 2000
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [chainId, tToken, toBalance, balance, isToTokenChange]);

//   async function tTokenBalance() {
//     let tokenAddress = tToken?.address;
//     if (tokenAddress === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
//       // setToBalance(balance);
//       setToBalance(Number(balance));
//     } else {
//       const ERC20Contract = new ethers.Contract(
//         tokenAddress,
//         erc20ABI,
//         signer.data
//       );
//       const tokenbal = await ERC20Contract.balanceOf(walletAddress);
//       const balanceRaw = formatUnits(tokenbal, tToken?.decimals);
//       if (Number(balanceRaw) > 0) {
//         const formattedBalance = Number(balanceRaw).toFixed(5);
//         setToBalance(formattedBalance);
//       }
//     }
//   }

//   //========{API CALLS}=========================
//   useEffect(() => {
//     UpdateSpender();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [spender, chain]);

//   async function UpdateSpender() {
//     fetchSpender(chainId)
//       .then((response) => {
//         console.log('Spender', response);
//         setSpender(response);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }

//   //================================{USER  DATA PERSIST}
//   /**
//    *
//    * @returns Persisting user state is acheived by taking the raw data and storing to the
//    * backend before refetching with the "getUser()"
//    * Emphasis is placed on "chainId: chian?.id" as agains "chainId" fetched from the "Redux State"
//    * Initial state of the "chainId" is manged with updated with "Redux" and "localStorage"
//    * A similar approach is used in this app for persisting "UserId"
//    */

//   //===========================================================

//   useEffect(() => {
//     //   //=================={First loading/ rendering}=======================================
//     dispatch(updateChain(chain));
//     dispatch(updateChainSymbol(chain?.chainSymbol));
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [chain]);

//   //======================================={TRANSACTION ERRORS/SUCCESS PROMPTS}============================================
//   //======================================={TRANSACTION ERRORS/SUCCESS PROMPTS}============================================

//   useEffect(() => {
//     if (isSwapSuccess) {
//       setTimeout(() => {
//         setIsSwapSuccess(false);
//       }, 5000);
//     }
//     if (isSwapError) {
//       setTimeout(() => {
//         setIsSwapError(false);
//       }, 5000);
//     }
//     if (isApproveSuccess) {
//       setTimeout(() => {
//         setIsApproveSuccess(false);
//       }, 5000);
//     }
//     if (isApproveError) {
//       setTimeout(() => {
//         setIsApproveError(false);
//       }, 5000);
//     }
//   }, [isSwapSuccess, isSwapError, isApproveSuccess, isApproveError]);

//   //======================================={CHAIN CHANGE}============================================
//   //======================================={CHAIN CHANGE}============================================
//   useEffect(() => {
//     fetchChainData();
//     if (isChainChange === true) {
//       setTimeout(() => {
//         fetchChainData();
//       }, 200);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [chainId]);
//   async function fetchChainData() {
//     setIsFromLoading(true);
//     let userData = {
//       chainId: chainId ? chainId : 1,
//     };
//     try {
//       const response = await axios.get(
//         `${BACKEND_URL}/swap/tokenList/${chainId.toString()}`
//       );
//       if (response.data) {
//         setUsdtToken(response.data?.usdtToken);
//         setAllTokens(response.data?.allTokens);

//         if (fTokenL === null) {
//           setUsdtToken(response.data?.usdtToken);

//           setAllTokens(response.data?.allTokens);
//           setFromToken(response.data?.fToken);
//           setToToken(response.data?.tToken);
//           setFromPrice(response.data?.fromPrice);
//           setToPrice(response.data?.toPrice);
//           setIsFromTokenChange(true);
//           setIsToTokenChange(true);
//         }

//         if (isChainChange === true && chainId !== null) {
//           setUsdtToken(response.data?.usdtToken);

//           setAllTokens(response.data?.allTokens);
//           setFromToken(response.data?.fToken);
//           setToToken(response.data?.tToken);
//           localStorage.setItem('chainSwitch', JSON.stringify(false));
//           setIsFromTokenChange(true);
//           setIsToTokenChange(true);
//         }

//         localStorage.setItem('chainId', JSON.stringify(userData?.chainId));
//         networksOptions?.map(async (b) => {
//           if (b.id === userData?.chainId) {
//             localStorage.setItem('chain', JSON.stringify(b));
//           }
//         });
//         setIsFromLoading(false);
//       }
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       console.log(message);
//     }
//   }

//   //======================================={USD PRICES}===============================================
//   //======================================={USD PRICES}===============================================
//   //===={Updates at intervatls}============
//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       if (checkUSDRate !== true) {
//         fetchLatestPrices();
//       }
//     }, 60000); // every minute
//     return () => {
//       clearInterval(intervalId);
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [fromPrice, toPrice]);

//   //===={Temporary changes in values}============
//   useEffect(() => {
//     setTimeout(() => {
//       if (checkUSDRate !== true) {
//         fetchLatestPrices();
//       }
//     }, 200);

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [fToken, tToken]);

//   async function fetchLatestPrices() {
//     // setIsFromLoading(true);
//     if (rateUSDTUSD === null) {
//       return;
//     }
//     let userData = {
//       fToken,
//       tToken,
//       rateUSDTUSD,
//     };
//     try {
//       const response = await axios.post(
//         `${BACKEND_URL}/swap/tokenPrice`,
//         userData
//       );
//       if (response.data) {
//         setFromPrice(response.data?.fromPrice);
//         setToPrice(response.data?.toPrice);
//         setIsFromTokenChange(true);
//         setIsToTokenChange(true);
//       }
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       console.log(message);
//     }
//   }

//   //======================================={SWAP ESTIMATES}===============================================
//   //===={Updates at intervatls}============

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setTimeout(() => {
//         fetchToPrice();
//       }, 4000);
//     }, 60000); // every minute
//     return () => {
//       clearInterval(intervalId);
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [fToken, tToken, fValue]);

//   useEffect(() => {
//     setTimeout(() => {
//       if (
//         fValue === 0 ||
//         fValue === '0' ||
//         fValue === null ||
//         fValue === undefined
//       ) {
//         return;
//       }
//       if (chainId === undefined || chainId === null || chainId === '') {
//         return;
//       }
//       fetchToPrice();
//     }, 4000);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [fToken, tToken, fValue]);

//   useEffect(() => {
//     if (!check || check === undefined || tValue === 0) {
//       setIsToLoading(true);
//     } else {
//       setIsToLoading(false);
//     }

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [check, tValue]);

//   //Based on FValue only

//   const fetchToPrice = async () => {
//     let userData = {
//       chainId,
//       fToken,
//       tToken,
//       slippage,
//       fValue,
//       isChainChange: isChainChange ? isChainChange : false,
//     };
//     const response = await updateSwapEstimates(userData);
//     if (response) {
//       setCheck(response);
//       setValidatedValue(response?.validatedValue);
//       setToValue(response?.tValueFormatted);
//       setToValueFormatted(response?.tValueFormatted);
//       setEstimatedGas(response?.estimatedGas);
//       setAllProtocols(response?.allProtocols);
//       setExchangeRate(response?.exchangeRate);

//       let newProtocols = response?.allProtocols;
//       let routes = [];
//       newProtocols?.[0].forEach((route) => {
//         routes.push(route);
//       });
//       setSwapRoutes(routes); // send the routes to the SwapRoute component through Layout

//       //================{SET AUTOMATIC PROTOCOL}===================
//       if (routes.length > 0) {
//         console.info({ aroute: routes[0] });
//         let newRoute = routes[0];

//         let autoRoute = newRoute?.map((l) => {
//           const activeRoute = l.name;
//           return activeRoute;
//         });
//         let pRoute = autoRoute.toString();
//         setProtocols(pRoute);
//       }
//     }
//   };

//   //====================================================================================================
//   //======================================={CURRENCY CONVERTER}=====================================
//   //====================================================================================================
//   //==========={Conversion steps}================================
//   //1. ETH ---> EUR : Binance
//   //2. EUR ---> USD : Google
//   //3. ETH ----> USD: function
//   //4. USDT ---> ETH: Binance
//   //5. USDT ----> USD: Function

//   //======={Step 1: ETH ---> EUR : Binance}==================================
//   useEffect(() => {
//     converterETHEUR();

//     if (!rateETHEUR) {
//       converterETHEUR();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [rateETHEUR]);

//   //====={PriceAPI from Binance}=============================

//   async function converterETHEUR() {
//     let ws = new WebSocket('wss://stream.binance.com:9443/ws/etheur@trade');
//     ws.onmessage = (event) => {
//       let stockObject = JSON.parse(event?.data);
//       console.log(stockObject?.p); // only price data
//       setRateETHEUR(stockObject?.p);
//     };
//   }

//   //======={Step 2: EUR ---> USD : Google}==================================
//   //======{on component mount}========================
//   useEffect(() => {
//     googleExchangeRates();
//   }, []);
//   //===={on 60 sec Intervals}====================
//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       googleExchangeRates();
//     }, 60000); // after every 60 seconds
//     return () => {
//       clearInterval(intervalId);
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [rateEURUSD]);

//   async function googleExchangeRates() {
//     let sheetId = '1E2TtDlN52STMBMUPMre8zccfBs3OuKKTbzCELKoodyY';

//     let sheetTitle = 'ExchangeData';
//     let sheetRange = 'A1:B2';

//     let full_url =
//       'https://docs.google.com/spreadsheets/d/' +
//       sheetId +
//       '/gviz/tq?sheet=' +
//       sheetTitle +
//       '&range=' +
//       sheetRange;

//     fetch(full_url)
//       .then((res) => res.text())
//       .then((rep) => {
//         let data = JSON.parse(rep.substr(47).slice(0, -2));
//         console.log(data);
//         setRateEURUSD(data?.table?.rows[0]?.c[1]?.v);
//       });
//   }

//   //======={Step 3: ETH ---> USD : Google}==================================
//   // useIntervals for this calculation
//   useEffect(() => {
//     setTimeout(() => {
//       converterETHUSD();
//     }, 200);

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [rateEURUSD, rateETHEUR]);

//   async function converterETHUSD() {
//     let ethRate = Number(rateEURUSD) * rateETHEUR; // convert ethPrice to USD
//     setRateETHUSD(ethRate);
//   }

//   //======={Step 4: USDT ---> ETH : Google}==================================
//   useEffect(() => {
//     converterETHUSDT();

//     if (!rateETHUSDT) {
//       converterETHUSDT();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [rateETHUSDT]);

//   //====={PriceAPI from Binance}=============================

//   async function converterETHUSDT() {
//     let ws = new WebSocket('wss://stream.binance.com:9443/ws/ethusdt@trade');
//     ws.onmessage = (event) => {
//       //   console.log(event.data);// all data
//       let stockObject = JSON.parse(event?.data);
//       console.log(stockObject?.p); // only price data
//       //   console.log(event.data);
//       // let newValue = 1 / Number(stockObject?.p);

//       setRateETHUSDT(stockObject?.p);
//       // setRateETHUSDT(newValue);
//     };
//   }

//   useEffect(() => {
//     setTimeout(() => {
//       converterUSDTUSD();

//       if (!rateUSDTUSD) {
//         converterUSDTUSD();
//       }
//     }, 200);

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [rateUSDTUSD, rateETHUSDT]);

//   async function sanitiseInput(x) {
//     if (isNaN(x)) {
//       // return NaN;
//       return true;
//     }
//     // return x;
//     return false;
//   }

//   async function converterUSDTUSD() {
//     let newRate = Number(rateETHUSDT) / Number(rateETHUSD); // USDT/USD
//     let check = sanitiseInput(newRate);
//     if (check === true) {
//       return;
//     } else {
//       setRateUSDTUSD(newRate);
//     }
//   }

//   useEffect(() => {
//     sanitiseFrom(fromPrice);
//     sanitiseTo(toPrice);
//     sanitiseUsdRate(rateUSDTUSD);

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [checkFNaN, checkTNaN]);

//   // async function sanitise(x) {
//   //   if (isNaN(x)) {
//   //     // return NaN;
//   //     return true;
//   //   }
//   //   // return x;
//   //   return false;
//   // }

//   async function sanitiseUsdRate(x) {
//     if (isNaN(x)) {
//       // return NaN;
//       setCheckUSDRate(true);

//       return true;
//     }
//     // return x;
//     setCheckUSDRate(false);
//     return false;
//   }

//   async function sanitiseFrom(x) {
//     if (isNaN(x)) {
//       // return NaN;
//       setcheckFNaN(true);
//       let newValue = parseFloat(fromPrice);
//       setUpdatedFNaN(newValue);
//       return true;
//     }
//     // return x;
//     setcheckFNaN(false);
//     return false;
//   }

//   async function sanitiseTo(x) {
//     if (isNaN(x)) {
//       // return NaN;
//       setcheckTNaN(true);
//       let newValue = parseFloat(toPrice);
//       setUpdatedTNaN(newValue);
//       return true;
//     }
//     // return x;
//     setcheckTNaN(false);
//     return false;
//   }

//   return (
//     <>
//       {/* {width > 479 ? ( */}
//       {/* {width > 375 ? ( */}
//       {width > 479 ? (
//         <>
//           {/* ==============================={Desktop View}====================================== */}
//           {/* Connect Wallet */}
//           {isConnected === false && isConnecting === true ? (
//             <div className={stylesFromToken.frameContainer}>
//               <div className={stylesFromToken.selectATokenParent}>
//                 <div className={stylesFromToken.selectAToken}>
//                   Connect Wallet
//                 </div>
//                 <div
//                   className={`cursor-pointer hover:bg-secondaryFillLight ${stylesFromToken.iconButton} `}
//                 >
//                   <img
//                     className={stylesFromToken.xCloseIcon}
//                     onClick={() => {
//                       setIsConnectingL(false);
//                       dispatch(updateConnecting(false));
//                     }}
//                     alt=""
//                     src="/xclose.svg"
//                   />
//                 </div>
//               </div>
//               <div className={stylesFromToken.frameChild} />
//               <div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
//                 <div
//                   className="self-stretch rounded-2xl overflow-hidden flex flex-row py-2 px-4 items-center justify-start gap-[16px] cursor-pointer hover:bg-secondaryFill"
//                   // onClick={() => open()}
//                   onClick={() => {
//                     connect({ connector: connectors[0] });
//                     setActiveConnection(connectors[0]);
//                   }}
//                 >
//                   <img
//                     className="relative w-10 h-10 shrink-0 overflow-hidden"
//                     alt=""
//                     src="/wallet-icon8.svg"
//                   />
//                   <div className="flex-1 relative tracking-[0.02em] leading-[22px] font-medium">
//                     MetaMask
//                   </div>
//                   {/* <div className="rounded-9xl bg-surface-success-d flex flex-row py-1 pr-3 pl-2 items-center justify-start gap-[8px] text-sm text-text-success-d">
//              <img
//                className="relative w-2 h-2 shrink-0"
//                alt=""
//                src="/ellipse-1.svg"
//              />
//              <div className="relative tracking-[0.02em] leading-[20px] font-medium">
//                Connected
//              </div>
//            </div> */}
//                   {activeConnection?.name === connectors[0]?.name ? (
//                     <div className="rounded-9xl bg-surface-success-d flex flex-row py-1 pr-3 pl-2 items-center justify-start gap-[8px] text-sm text-text-success-d">
//                       <img
//                         className="relative w-2 h-2 shrink-0"
//                         alt=""
//                         src="/ellipse-1.svg"
//                       />
//                       <div className="relative tracking-[0.02em] leading-[20px] font-medium">
//                         Connected
//                       </div>
//                     </div>
//                   ) : (
//                     <img
//                       className="relative w-5 h-5 shrink-0 overflow-hidden"
//                       alt=""
//                       src="/chevronright1.svg"
//                     />
//                   )}
//                 </div>
//                 {/* <div
//               className="self-stretch rounded-2xl overflow-hidden flex flex-row py-2 px-4 items-center justify-start gap-[16px] cursor-pointer hover:bg-secondaryFill"

//               onClick={() => {
//                 connect({ connector: connectors[1] });
//                 setActiveConnection(connectors[1]);
//               }}
//             >
//               <img
//                 className="relative w-10 h-10 shrink-0 overflow-hidden"
//                 alt=""
//                 src="/walletlink.svg"
//               />
//               <div className="flex-1 relative tracking-[0.02em] leading-[22px] font-medium">
//                 Coinbase Wallet
//               </div>
//               {activeConnection?.name === connectors[1]?.name ? (
//                 <div className="rounded-9xl bg-surface-success-d flex flex-row py-1 pr-3 pl-2 items-center justify-start gap-[8px] text-sm text-text-success-d">
//                   <img
//                     className="relative w-2 h-2 shrink-0"
//                     alt=""
//                     src="/ellipse-1.svg"
//                   />
//                   <div className="relative tracking-[0.02em] leading-[20px] font-medium">
//                     Connected
//                   </div>
//                 </div>
//               ) : (
//                 <img
//                   className="relative w-5 h-5 shrink-0 overflow-hidden"
//                   alt=""
//                   src="/chevronright1.svg"
//                 />
//               )}
//             </div> */}
//                 <div
//                   className="self-stretch rounded-2xl overflow-hidden flex flex-row py-2 px-4 items-center justify-start gap-[16px] cursor-pointer hover:bg-secondaryFill"
//                   onClick={() => {
//                     connect({ connector: connectors[3] });
//                     setActiveConnection(connectors[3]);
//                   }}
//                 >
//                   <img
//                     className="relative w-10 h-10 shrink-0 overflow-hidden"
//                     alt=""
//                     src="/walletlink.svg"
//                   />
//                   <div className="flex-1 relative tracking-[0.02em] leading-[22px] font-medium">
//                     Coinbase Wallet
//                   </div>
//                   {activeConnection?.name === connectors[3]?.name ? (
//                     <div className="rounded-9xl bg-surface-success-d flex flex-row py-1 pr-3 pl-2 items-center justify-start gap-[8px] text-sm text-text-success-d">
//                       <img
//                         className="relative w-2 h-2 shrink-0"
//                         alt=""
//                         src="/ellipse-1.svg"
//                       />
//                       <div className="relative tracking-[0.02em] leading-[20px] font-medium">
//                         Connected
//                       </div>
//                     </div>
//                   ) : (
//                     <img
//                       className="relative w-5 h-5 shrink-0 overflow-hidden"
//                       alt=""
//                       src="/chevronright1.svg"
//                     />
//                   )}
//                 </div>
//                 <div
//                   className="self-stretch rounded-2xl overflow-hidden flex flex-row py-2 px-4 items-center justify-start gap-[16px] cursor-pointer hover:bg-secondaryFill"
//                   onClick={() => {
//                     connect({ connector: connectors[2] });
//                     setActiveConnection(connectors[2]);
//                   }}
//                 >
//                   <img
//                     className="relative w-10 h-10 shrink-0 overflow-hidden"
//                     alt=""
//                     src="/walletconnect.svg"
//                   />
//                   <div className="flex-1 relative tracking-[0.02em] leading-[22px] font-medium">
//                     Wallet Connect
//                   </div>
//                   {activeConnection?.name === connectors[2]?.name ? (
//                     <div className="rounded-9xl bg-surface-success-d flex flex-row py-1 pr-3 pl-2 items-center justify-start gap-[8px] text-sm text-text-success-d">
//                       <img
//                         className="relative w-2 h-2 shrink-0"
//                         alt=""
//                         src="/ellipse-1.svg"
//                       />
//                       <div className="relative tracking-[0.02em] leading-[20px] font-medium">
//                         Connected
//                       </div>
//                     </div>
//                   ) : (
//                     <img
//                       className="relative w-5 h-5 shrink-0 overflow-hidden"
//                       alt=""
//                       src="/chevronright1.svg"
//                     />
//                   )}
//                 </div>
//                 <div
//                   className="self-stretch rounded-2xl overflow-hidden flex flex-row py-2 px-4 items-center justify-start gap-[16px] cursor-pointer hover:bg-secondaryFill"
//                   // onClick={() => open()}
//                   onClick={() => {
//                     connect({ connector: connectors[4] });
//                     setActiveConnection(connectors[4]);
//                   }}
//                 >
//                   <img
//                     className="relative rounded-xl w-10 h-10 shrink-0"
//                     alt=""
//                     src="/frame-1321314394.svg"
//                   />
//                   <div className="flex-1 relative tracking-[0.02em] leading-[22px] font-medium">
//                     Ledger
//                   </div>
//                   {activeConnection?.name === connectors[4]?.name ? (
//                     <div className="rounded-9xl bg-surface-success-d flex flex-row py-1 pr-3 pl-2 items-center justify-start gap-[8px] text-sm text-text-success-d">
//                       <img
//                         className="relative w-2 h-2 shrink-0"
//                         alt=""
//                         src="/ellipse-1.svg"
//                       />
//                       <div className="relative tracking-[0.02em] leading-[20px] font-medium">
//                         Connected
//                       </div>
//                     </div>
//                   ) : (
//                     <img
//                       className="relative w-5 h-5 shrink-0 overflow-hidden"
//                       alt=""
//                       src="/chevronright1.svg"
//                     />
//                   )}
//                 </div>
//                 <div
//                   className="self-stretch rounded-2xl overflow-hidden flex flex-row py-2 px-4 items-center justify-start gap-[16px] cursor-pointer hover:bg-secondaryFill"
//                   // onClick={() => open()}
//                   onClick={() => {
//                     connect({ connector: connectors[3] });
//                     setActiveConnection(connectors[3]);
//                   }}
//                 >
//                   <img
//                     className="relative w-[34.29px] h-10 shrink-0"
//                     alt=""
//                     src="/bravelogosanstext-21.svg"
//                   />
//                   <div className="flex-1 relative tracking-[0.02em] leading-[22px] font-medium">
//                     Brave
//                   </div>
//                   {activeConnection?.name === connectors[3]?.name ? (
//                     <div className="rounded-9xl bg-surface-success-d flex flex-row py-1 pr-3 pl-2 items-center justify-start gap-[8px] text-sm text-text-success-d">
//                       <img
//                         className="relative w-2 h-2 shrink-0"
//                         alt=""
//                         src="/ellipse-1.svg"
//                       />
//                       <div className="relative tracking-[0.02em] leading-[20px] font-medium">
//                         Connected
//                       </div>
//                     </div>
//                   ) : (
//                     <img
//                       className="relative w-5 h-5 shrink-0 overflow-hidden"
//                       alt=""
//                       src="/chevronright1.svg"
//                     />
//                   )}
//                 </div>
//               </div>
//               <div className="self-stretch rounded-xl bg-surface-tint-d-8 flex flex-row p-4 items-center justify-start gap-[16px] text-surface-tint-64-d">
//                 <input
//                   className="cursor-pointer rounded-md [background:radial-gradient(50%_50%_at_50%_50%,_#5a38a3,_#683fab_31.77%,_#9d52ff_68.23%,_#edbcfc_96.35%)] w-5 h-5 shrink-0 overflow-hidden flex flex-row p-1 box-border items-center justify-center"
//                   // className="cursor-pointer rounded-md [background:radial-gradient(59.21% 78.44% at 50% 50%, #5A38A3 0%, #683FAB 31.77%, #9D52FF 68.23%, #EDBCFC 96.35%)] w-5 h-5 shrink-0 overflow-hidden flex flex-row p-1 box-border items-center justify-center"
//                   type="checkbox"
//                   required
//                   autoFocus
//                   defaultChecked={true}
//                 />
//                 <div className="flex-1 relative tracking-[0.02em] leading-[22px] font-medium">
//                   <p className="m-0">
//                     I have read, understand, and agree to the
//                   </p>
//                   <p className="m-0 text-mediumslateblue">Terms of Service</p>
//                 </div>
//               </div>
//             </div>
//           ) : null}

//           {/* SWITCH NETWORK */}
//           {isChainModalVisible === true &&
//           isFromTokenPage === false &&
//           isToTokenPage === false &&
//           isSlippagePage === false &&
//           isConnecting === false ? (
//             <>
//               <div className={stylesFromToken.frameContainer}>
//                 <div className={stylesFromToken.selectATokenParent}>
//                   <div className={stylesFromToken.selectAToken}>
//                     Select a Network
//                   </div>
//                   <div
//                     className={`cursor-pointer hover:bg-secondaryFillLight ${stylesFromToken.iconButton} `}
//                   >
//                     <img
//                       className={stylesFromToken.xCloseIcon}
//                       onClick={() => {
//                         setIsChainModalVisible(false);
//                         dispatch(updateConnectedNetwork(false));
//                       }}
//                       alt=""
//                       src="/xclose.svg"
//                     />
//                   </div>
//                 </div>
//                 <div className={stylesFromToken.frameChild} />
//                 <div className="self-stretch overflow-hidden flex flex-row items-start justify-start gap-[8px] overflow-y-auto">
//                   <div className="flex-1 flex flex-col items-start justify-start gap-[24px]">
//                     {isConnected ? (
//                       <div className="self-stretch">
//                         {networksOptions?.map((c, idx) => (
//                           <div className="flex flex-row justify-between items-center cursor-pointer hover:shadow-md hover:bg-secondaryFill">
//                             <div
//                               className="px-3 py-2 w-full flex flex-row gap-4"
//                               key={idx}
//                               onClick={() => {
//                                 switchNetwork(c.id);
//                                 setChain(c);
//                                 setIsChainModalVisible(false);
//                                 localStorage.setItem(
//                                   'chainSwitch',
//                                   JSON.stringify(true)
//                                 );
//                                 dispatch(updateIsChangeChainId(true));
//                                 dispatch(updateConnectedNetwork(false));
//                               }}
//                             >
//                               <img
//                                 src={c.logoURI}
//                                 alt="logo"
//                                 className="w-8 h-8"
//                               />

//                               <div className="flex flex-col">
//                                 <span className="text-xs text-primaryText">
//                                   {c?.name}
//                                 </span>
//                                 <span className="text-xs text-secondaryText">
//                                   {c?.chainSymbol}
//                                 </span>
//                               </div>
//                             </div>
//                             <span className="justify-start items-start mr-4">
//                               <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 strokeWidth="1.5"
//                                 stroke="#9D9DA3"
//                                 className={`w-6 h-6 hover:stroke-infoText active:fill-infoText ${
//                                   c === chain
//                                     ? 'stroke-infoText fill-infoText'
//                                     : 'stroke-secondaryText'
//                                 }`}
//                               >
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
//                                 />
//                               </svg>
//                             </span>
//                           </div>
//                         ))}
//                       </div>
//                     ) : (
//                       <div className="self-stretch">
//                         {networksOptions?.map((c, idx) => (
//                           <div className="flex flex-row justify-between items-center cursor-pointer hover:shadow-md hover:bg-secondaryFill">
//                             <div
//                               className="px-3 py-2 w-full flex flex-row gap-4"
//                               key={idx}
//                               onClick={() => {
//                                 setChain(c);
//                                 setIsChainModalVisible(false);

//                                 localStorage.setItem(
//                                   'chainSwitch',
//                                   JSON.stringify(true)
//                                 );
//                                 dispatch(updateIsChangeChainId(true));
//                                 dispatch(updateConnectedNetwork(false));
//                               }}
//                             >
//                               <img
//                                 src={c.logoURI}
//                                 alt="logo"
//                                 className="w-8 h-8"
//                               />

//                               <div className="flex flex-col">
//                                 <span className="text-xs text-primaryText">
//                                   {c?.name}
//                                 </span>
//                                 <span className="text-xs text-secondaryText">
//                                   {c?.chainSymbol}
//                                 </span>
//                               </div>
//                             </div>
//                             <span className="justify-start items-start mr-4">
//                               <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 strokeWidth="1.5"
//                                 stroke="#9D9DA3"
//                                 className={`w-6 h-6 hover:stroke-infoText active:fill-infoText ${
//                                   c === chain
//                                     ? 'stroke-infoText fill-infoText'
//                                     : 'stroke-secondaryText'
//                                 }`}
//                               >
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
//                                 />
//                               </svg>
//                             </span>
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </>
//           ) : null}

//           {/* ================================{SWAP MAIN ACTIVE STATE}===================================== */}

//           {isChainModalVisible === false &&
//           isFromTokenPage === false &&
//           isToTokenPage === false &&
//           isSlippagePage === false &&
//           isConnecting === false ? (
//             // <div className={`${stylesSwap.frameContainer}`}>
//             <div className={`${stylesSwap.frameGroupCustom}`}>
//               <div className={stylesSwap.swapGroup}>
//                 {/* <div className={`font-medium ${stylesSwap.swap1}`}>Swap</div> */}
//                 <div
//                   className={`cursor-pointer font-medium ${stylesSwap.swap1}`}
//                   // onClick={() => usdPrice()}
//                 >
//                   Swap
//                 </div>
//                 <img
//                   className={`cursor-pointer ${stylesSwap.settings04Icon}`}
//                   onClick={() => {
//                     setIsSlippagePage(true);
//                   }}
//                   alt=""
//                   src="/settings04.svg"
//                 />
//               </div>
//               <div className={stylesSwap.frameDiv}>
//                 <div className={stylesSwap.frameParent1}>
//                   <div className={stylesSwap.frameParent2}>
//                     <div className={stylesSwap.frameParent3}>
//                       <div
//                         className={`cursor-pointer ${stylesSwap.protocolIconGroup}`}
//                         onClick={() => setIsFromTokenPage(true)}
//                       >
//                         <img
//                           className={stylesSwap.protocolIcon}
//                           alt=""
//                           // src={fLogoURI}
//                           src={fSymbol === 'BNB' ? '/bnb.png' : fLogoURI}
//                         />
//                         <div className={`font-medium ${stylesSwap.eth}`}>
//                           {fSymbol}
//                         </div>
//                         <img
//                           className={stylesSwap.chevronDownIcon}
//                           alt=""
//                           src="/chevrondown.svg"
//                         />
//                       </div>
//                       {/* <div className={stylesSwap.div1}>3859.042109</div> */}
//                       {/* <input
//                     className={`${stylesSwap.div1} ${
//                       isFromLoading
//                         ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[24px]'
//                         : ''
//                     }`}
//                     type="text"
//                     pattern="[0-9]*.[0-9]*"
//                     placeholder={isFromLoading ? '' : '0.0'}
//                     value={isFromLoading ? '' : `${fValue}`}
//                     onChange={onFromValueChanged}
//                   /> */}
//                       <input
//                         // className={`[border:none] font-satoshi font-medium  text-5xl bg-[transparent] flex-1 relative tracking-[0.02em] leading-[32px] text-text-1-d text-right`}
//                         className={`focus:outline-0 [border:none] font-satoshi font-medium  text-5xl bg-[transparent] flex-1 relative tracking-[0.02em] leading-[32px] text-text-1-d text-right`}
//                         type="text"
//                         pattern="[0-9]*.[0-9]*"
//                         placeholder={'0.0'}
//                         value={fValue}
//                         // value={
//                         //   (isFromLoading && '') ||
//                         //   (fValue && `${new Intl.NumberFormat().format(fValue)}`)
//                         // }
//                         // value={
//                         //   (isFromLoading && '') ||
//                         //   (fValue && `${Number(fromInput)}`)
//                         // }
//                         onChange={onFromValueChanged}
//                       />
//                     </div>
//                     <div className={stylesSwap.balance0Parent}>
//                       {/* <div className={stylesSwap.transactionDetails}>Balance: 0</div> */}
//                       <div
//                         className={`${stylesSwap.transactionDetails} ${
//                           isFromLoading
//                             ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
//                             : ''
//                         }`}
//                       >
//                         {isFromLoading
//                           ? ''
//                           : `Balance: ${fromBalance.toString() || ''}`}
//                       </div>
//                       {/* <div className={stylesSwap.documentation}>~$1432.54</div> */}
//                       <div className={stylesSwap.documentation}>
//                         {isFromLoading
//                           ? ''
//                           : `~$${
//                               fValue
//                                 ? new Intl.NumberFormat().format(
//                                     Number(fValue) * Number(fromPrice)
//                                   )
//                                 : ''
//                             }`}
//                         {/* {Number(fValue) * Number(fromPrice)} */}
//                       </div>
//                     </div>
//                   </div>
//                   <div className={stylesSwap.frameParent4}>
//                     <div
//                       className={`cursor-pointer ${stylesSwap.wrapper} ${
//                         fromBalancePercent === 25
//                           ? `bg-surface-tint-16-d`
//                           : `bg-surface-tint-d-8`
//                       }`}
//                     >
//                       <div
//                         className={`${stylesSwap.documentation} ${
//                           fromBalancePercent === 25
//                             ? `text-text-1-d`
//                             : `text-text-2-d`
//                         }`}
//                         onClick={() => {
//                           let newValue = 0.25 * fromBalance;
//                           setFromValue(newValue);
//                           setFromBalancePercent(25);
//                           setIsFromValueChange(true);
//                         }}
//                       >
//                         25%
//                       </div>
//                     </div>
//                     <div
//                       className={`cursor-pointer ${stylesSwap.wrapper} ${
//                         fromBalancePercent === 50
//                           ? `bg-surface-tint-16-d`
//                           : `bg-surface-tint-d-8`
//                       }`}
//                     >
//                       <div
//                         className={`${stylesSwap.documentation} ${
//                           fromBalancePercent === 50
//                             ? `text-text-1-d`
//                             : `text-text-2-d`
//                         }`}
//                         onClick={() => {
//                           let newValue = 0.5 * fromBalance;
//                           setFromValue(newValue);
//                           setFromBalancePercent(50);
//                           setIsFromValueChange(true);
//                         }}
//                       >
//                         50%
//                       </div>
//                     </div>
//                     <div
//                       className={`cursor-pointer ${stylesSwap.wrapper} ${
//                         fromBalancePercent === 75
//                           ? `bg-surface-tint-16-d`
//                           : `bg-surface-tint-d-8`
//                       }`}
//                     >
//                       <div
//                         className={`${stylesSwap.documentation} ${
//                           fromBalancePercent === 75
//                             ? `text-text-1-d`
//                             : `text-text-2-d`
//                         }`}
//                         onClick={() => {
//                           let newValue = 0.75 * fromBalance;
//                           setFromValue(newValue);
//                           setFromBalancePercent(75);
//                           setIsFromValueChange(true);
//                         }}
//                       >
//                         75%
//                       </div>
//                     </div>
//                     <div
//                       className={`cursor-pointer ${stylesSwap.wrapper} ${
//                         fromBalancePercent === 100
//                           ? `bg-surface-tint-16-d`
//                           : `bg-surface-tint-d-8`
//                       }`}
//                     >
//                       <div
//                         className={`${stylesSwap.documentation} ${
//                           fromBalancePercent === 100
//                             ? `text-text-1-d`
//                             : `text-text-2-d`
//                         }`}
//                         onClick={() => {
//                           let newValue = 1 * fromBalance;
//                           setFromValue(newValue);
//                           setFromBalancePercent(100);
//                           setIsFromValueChange(true);
//                         }}
//                       >
//                         100%
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className={`${stylesSwap.frameParent5}`}>
//                   <div className={stylesSwap.group}>
//                     {/* <b className={stylesSwap.b}>􀅈</b> */}
//                     {/* <img
//                       className={`relative w-5 h-5 shrink-0 overflow-hidden ${
//                         isToLoading && 'animate-spin'
//                       }`}
//                       alt=""
//                       src="/processBar.svg"
//                     /> */}
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       strokeWidth="1.5"
//                       stroke="currentColor"
//                       className={`relative w-6 h-6 shrink-0 overflow-hidden ${
//                         isToLoading && 'animate-spin'
//                       }`}
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
//                       />
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                       />
//                     </svg>

//                     {/* <b
//                       className={`${stylesSwap.eth167771} ${
//                         isToLoading
//                           ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
//                           : ''
//                       }`}
//                     > */}
//                     <b className={`${stylesSwap.eth167771}`}>
//                       {isToLoading
//                         ? 'Fetching price...'
//                         : `${`1 ${fSymbol} = ${exchangeRate}  ${tSymbol}`}`}
//                     </b>
//                   </div>

//                   <div
//                     className={`cursor-pointer transition-transform duration-300 hover:scale-125 hover:rotate-180 ${stylesSwap.arrowDownWrapper}`}
//                     onClick={swapTokensPosition}
//                   >
//                     <img
//                       className={stylesSwap.wallet02Icon}
//                       alt=""
//                       src="/arrowdown.svg"
//                     />
//                   </div>
//                 </div>
//                 <div className={stylesSwap.frameWrapper}>
//                   <div className={stylesSwap.frameParent2}>
//                     <div className={stylesSwap.frameParent3}>
//                       <div
//                         className={`cursor-pointer ${stylesSwap.protocolIconGroup}`}
//                         onClick={() => setIsToTokenPage(true)}
//                       >
//                         <img
//                           className={stylesSwap.mdImageIcon}
//                           alt=""
//                           // src={tLogoURI}
//                           src={tSymbol === 'BNB' ? '/bnb.png' : tLogoURI}
//                           // src="/bnb.png"
//                         />

//                         {/* <img
//                           src="img.jpg"
//                           className={stylesSwap.mdImageIcon}
//                           alt=""
//                           onError="this.style.display='none';"
//                         /> */}
//                         <div className={`font-medium ${stylesSwap.eth}`}>
//                           {tSymbol}
//                         </div>
//                         <img
//                           className={stylesSwap.chevronDownIcon}
//                           alt=""
//                           src="/chevrondown.svg"
//                         />
//                       </div>
//                       {/* <div className={stylesSwap.div1}>3859.042109</div> */}
//                       {/* <input
//                     className={`${stylesSwap.div1} ${
//                       isToLoading
//                         ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[24px]'
//                         : ''
//                     }`}
//                     type="text"
//                     pattern="[0-9]*.[0-9]*"
//                     placeholder={isToLoading ? '' : '0.0'}
//                     value={isToLoading ? '' : `${tValue}`}
//                     disabled={true}
//                   /> */}
//                       <input
//                         className={`[border:none] font-satoshi font-medium text-5xl bg-[transparent] flex-1 relative tracking-[0.02em] leading-[32px] text-text-1-d text-right ${
//                           isToLoading
//                             ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[24px]'
//                             : ''
//                         }`}
//                         type="text"
//                         pattern="[0-9]*.[0-9]*"
//                         placeholder={isToLoading ? '' : '0.0'}
//                         value={
//                           isToLoading
//                             ? ''
//                             : tValue &&
//                               (Number(tValue) * Number(toPrice)).toFixed(4)
//                         }
//                         // value={
//                         //   isToLoading
//                         //     ? ''
//                         //     : tValue &&
//                         //       `${new Intl.NumberFormat()
//                         //         .format(Number(tValue) * Number(toPrice))
//                         //         .toFixed(4)}`
//                         // }

//                         disabled={true}
//                       />
//                     </div>
//                     <div className={stylesSwap.balance0Parent}>
//                       <div
//                         className={`${stylesSwap.transactionDetails} ${
//                           isToLoading
//                             ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
//                             : ''
//                         }`}
//                       >
//                         {isToLoading
//                           ? ''
//                           : `Balance: ${toBalance.toString() || ''}`}
//                       </div>
//                       {isPriceDeviation ? (
//                         <>
//                           <div
//                             className={`${stylesSwap.documentation} ${
//                               isToLoading
//                                 ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
//                                 : ''
//                             }`}
//                           >
//                             {isToLoading
//                               ? ''
//                               : `~$${
//                                   tValue
//                                     ? new Intl.NumberFormat().format(
//                                         Number(tValue) * Number(toPrice)
//                                       )
//                                     : ''
//                                 } (-${priceDeviation ? priceDeviation : ''}%)`}
//                           </div>
//                         </>
//                       ) : (
//                         <div className={stylesSwap.documentation}>
//                           {isToLoading
//                             ? ''
//                             : `~$${
//                                 tValue
//                                   ? new Intl.NumberFormat().format(
//                                       Number(tValue) * Number(toPrice)
//                                     )
//                                   : ''
//                               }`}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               {!isConnected && isTxValue ? (
//                 <>
//                   <div className={stylesSwap.frameParent8}>
//                     <div className={stylesSwap.transactionDetailsParent}>
//                       <div className={stylesSwap.transactionDetails}>
//                         Transaction details
//                       </div>
//                       <img
//                         className={stylesSwap.chevronDownIcon}
//                         onClick={() => {
//                           setIsTxValue(false);
//                         }}
//                         alt=""
//                         src="/chevronup.svg"
//                       />
//                     </div>
//                     <div className={stylesSwap.usdtPriceParent}>
//                       <div className={stylesSwap.documentation}>
//                         1 {fSymbol} price
//                       </div>
//                       <div
//                         className={`${stylesSwap.div9} ${
//                           isFromLoading
//                             ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
//                             : ''
//                         }`}
//                       >
//                         {/* ~${fromPriceData ? fromPriceData?.fromPrice : ''} */}{' '}
//                         {/* {isFromLoading
//                           ? ''
//                           : `~$${
//                               fromPriceData ? fromPriceData?.fromPrice : ''
//                             }`} */}
//                         {isFromLoading ? '' : `~$${fromPrice}`}
//                       </div>
//                     </div>
//                     <div className={stylesSwap.usdtPriceParent}>
//                       <div className={stylesSwap.documentation}>
//                         1 {tSymbol} price
//                       </div>
//                       <div
//                         className={`${stylesSwap.div9} ${
//                           isToLoading
//                             ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
//                             : ''
//                         }`}
//                       >
//                         {/* {isToLoading
//                           ? ''
//                           : `~$${userPricesL ? userPricesL?.toPrice : ''}`} */}

//                         {/* {`~$${toPrice}`} */}
//                         {isToLoading ? '' : `~$${toPrice}`}
//                       </div>
//                     </div>
//                     <div className={stylesSwap.usdtPriceParent}>
//                       <div className={stylesSwap.documentation}>Tx cost</div>
//                       {/* <div className={stylesSwap.div9}>$6.65</div> */}
//                       <div
//                         className={`${stylesSwap.div9} ${
//                           isToLoading
//                             ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
//                             : ''
//                         }`}
//                       >
//                         {' '}
//                         {/* {isToLoading
//                           ? ''
//                           : `${
//                               userPricesL?.estimatedGas &&
//                               (userPricesL?.estimatedGas / 10 ** 9).toString()
//                             } Gwei`} */}
//                         {isToLoading
//                           ? ''
//                           : `${
//                               estimatedGas &&
//                               (estimatedGas / 10 ** 9).toString()
//                             } Gwei`}
//                       </div>
//                     </div>
//                   </div>
//                   <div
//                     className={`button_gradient cursor-pointer ${stylesSwapTx.connectWalletWrapper}`}
//                     onClick={() => {
//                       setIsConnectingL(true);
//                       dispatch(updateConnectedNetwork(true));
//                     }}
//                   >
//                     <div
//                       className={`font-medium ${stylesSwapTx.connectWallet}`}
//                     >
//                       Connect Wallet
//                     </div>
//                   </div>
//                 </>
//               ) : null}
//               {!isConnected && !isTxValue ? (
//                 <>
//                   <div
//                     className={stylesSwapTx.frameParent6}
//                     onClick={() => {
//                       setIsTxValue(true);
//                     }}
//                   >
//                     <div className={stylesSwapTx.txCostParent}>
//                       <div className={stylesSwapTx.documentation}>Tx cost</div>
//                       {/* <div className={stylesSwapTx.div9}>$6.65</div> */}
//                       <div
//                         className={`${stylesSwapTx.div9} ${
//                           isToLoading
//                             ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
//                             : ''
//                         }`}
//                       >
//                         {/* {isToLoading
//                           ? ''
//                           : `${
//                               userPricesL?.estimatedGas &&
//                               (userPricesL?.estimatedGas / 10 ** 9).toString()
//                             } Gwei`} */}
//                         {isToLoading
//                           ? ''
//                           : `${
//                               estimatedGas &&
//                               (estimatedGas / 10 ** 9).toString()
//                             } Gwei`}
//                       </div>
//                     </div>
//                     <img
//                       className={stylesSwapTx.chevronDownIcon}
//                       alt=""
//                       src="/chevrondown.svg"
//                     />
//                   </div>
//                   <div
//                     className={`button_gradient cursor-pointer ${stylesSwapTx.connectWalletWrapper}`}
//                     onClick={() => {
//                       setIsConnectingL(true);
//                       dispatch(updateConnectedNetwork(true));
//                     }}
//                   >
//                     <div
//                       className={`font-medium ${stylesSwapTx.connectWallet}`}
//                     >
//                       Connect Wallet
//                     </div>
//                   </div>
//                 </>
//               ) : null}
//               {isConnected && !isCaution ? (
//                 <>
//                   {validationOwner === true && (
//                     <button
//                       className="cursor-pointer [border:none] py-3 px-10 bg-[transparent] self-stretch rounded-xl overflow-hidden flex flex-row items-center justify-center button_gradient"
//                       disabled={fValue === 0 ? true : false}
//                       onClick={() => swapToken()}
//                     >
//                       <div className="relative text-lg tracking-[0.02em] leading-[24px] font-text-16-md text-text-1-d text-left">
//                         Swap
//                       </div>
//                     </button>
//                   )}
//                 </>
//               ) : null}

//               {isConnected && isCaution ? (
//                 <>
//                   <button
//                     className="cursor-pointer [border:none] py-3 px-10 self-stretch rounded-xl overflow-hidden flex flex-row items-center justify-center bg-infoFill"
//                     disabled={fValue === 0 ? true : false}
//                   >
//                     <div className="relative text-lg tracking-[0.02em] leading-[24px] font-text-16-md text-text-1-d text-left">
//                       {info}
//                     </div>
//                   </button>
//                 </>
//               ) : null}
//               {isConnected ? (
//                 <div className="self-stretch flex flex-col py-0 px-2 items-start justify-start gap-[8px] text-text-1-48-d">
//                   <div className="self-stretch flex flex-row items-start justify-start gap-[24px]">
//                     <div className="relative tracking-[0.02em] leading-[20px] font-medium">
//                       Tx cost
//                     </div>
//                     <div
//                       className={`flex-1 relative tracking-[0.02em] leading-[20px] font-medium text-right ${
//                         isToLoading
//                           ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
//                           : ''
//                       }`}
//                     >
//                       {/* {isToLoading
//                         ? ''
//                         : `${
//                             userPricesL?.estimatedGas &&
//                             (userPricesL?.estimatedGas / 10 ** 9).toString()
//                           } Gwei`} */}
//                       {isToLoading
//                         ? ''
//                         : `${
//                             estimatedGas && (estimatedGas / 10 ** 9).toString()
//                           } Gwei`}
//                     </div>
//                   </div>
//                   <div className="self-stretch flex flex-row items-start justify-start gap-[24px]">
//                     <button
//                       className="cursor-pointer [border:none] p-0 bg-[transparent] relative text-sm tracking-[0.02em] leading-[20px] font-medium font-text-16-md text-text-1-48-d text-left inline-block"
//                       onClick={() => setIsRouting((prev) => !prev)}
//                     >
//                       Route
//                     </button>
//                     <div className="flex-1 flex flex-row items-center justify-end gap-[4px]">
//                       <div className="relative tracking-[0.02em] leading-[20px] font-medium">
//                         {fSymbol}
//                       </div>
//                       <img
//                         className="relative w-3 h-3 shrink-0 overflow-hidden"
//                         alt=""
//                         src="/chevronright.svg"
//                       />
//                       <div className="relative tracking-[0.02em] leading-[20px] font-medium">
//                         {tSymbol}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ) : null}
//             </div>
//           ) : null}

//           {/* FROM TOKEN COMPONENT: PART THREE */}
//           {isChainModalVisible === false &&
//           isFromTokenPage === true &&
//           isToTokenPage === false &&
//           isSlippagePage === false &&
//           isConnecting === false ? (
//             <div className={stylesFromToken.frameContainer}>
//               <div className={stylesFromToken.selectATokenParent}>
//                 <div className={stylesFromToken.selectAToken}>
//                   Select a token
//                 </div>
//                 <div
//                   className={`cursor-pointer hover:bg-secondaryFillLight ${stylesFromToken.iconButton} `}
//                 >
//                   <img
//                     className={stylesFromToken.xCloseIcon}
//                     onClick={() => setIsFromTokenPage(false)}
//                     alt=""
//                     src="/xclose.svg"
//                   />
//                 </div>
//               </div>
//               <div className={stylesFromToken.frameChild} />
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                   <img
//                     className={stylesFromToken.xCloseIcon}
//                     alt=""
//                     src="/searchmd.svg"
//                   />
//                 </div>
//                 <input
//                   type="search"
//                   id="search"
//                   className="[border:none] block p-4 pl-10 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-surface-tint-d-8 w-[432px] text-secondaryFillDim"
//                   placeholder="Search by name or paste address"
//                   onChange={(e) => {
//                     if (e.target.value === '') {
//                       setFilteredfTokens(allTokens);
//                       return;
//                     }
//                     let ffToken = allTokens.filter(({ symbol }) => {
//                       return symbol
//                         .toLowerCase()
//                         .includes(e.target.value.toLowerCase());
//                     });
//                     if (ffToken !== null) {
//                       setFilteredfTokens(ffToken);
//                     }
//                   }}
//                 />
//               </div>

//               <div
//                 className={`grid grid-cols-4 ${stylesFromToken.customIconGroupDiv}`}
//               >
//                 <>
//                   {favoriteTokens?.map((token, idx) => (
//                     <div
//                       className={`cursor-pointer group/item hover:bg-secondaryFill flex flex-row justify-center items-center object-contain ${
//                         stylesFromToken.customIconGroup
//                       } ${token?.name === fTokenL?.name && 'bg-secondaryFill'}`}
//                       key={idx}
//                     >
//                       <div className="flex flex-row gap-1">
//                         <div
//                           className="flex flex-row justify-start gap-1"
//                           onClick={() => {
//                             setFromToken(token);
//                             setIsFromTokenChange(true);
//                             setIsFromTokenPage(false);
//                           }}
//                         >
//                           <img
//                             className={stylesFromToken.customIcon}
//                             alt=""
//                             src={token?.logoURI}
//                           />
//                           <div className={stylesFromToken.customSymbol}>
//                             {token?.symbol}
//                           </div>
//                         </div>

//                         <div className="group/edit invisible group-hover/item:visible ...">
//                           <img
//                             className={`group-hover/edit:text-gray-700 hover:rounded-full hover:bg-secondaryFillLight ${stylesFromToken.xCloseIconCustom}`}
//                             onClick={() => removeFromFavorite(token)}
//                             alt=""
//                             src="/xclose.svg"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </>
//               </div>
//               <div className={stylesFromToken.frameChild} />
//               <div
//                 className={`overflow-y-auto max-h-[320px] ${stylesFromToken.frameParent1}`}
//               >
//                 <div className={stylesFromToken.frameParent2}>
//                   {filteredfTokens?.map((token, idx) => (
//                     <div
//                       key={idx}
//                       className={`cursor-pointer ${stylesFromToken.mdImageGroup} hover:bg-secondaryFill`}
//                     >
//                       <img
//                         className={stylesFromToken.protocolIcon4}
//                         alt=""
//                         src={token?.logoURI}
//                         onClick={() => {
//                           setFromToken(token);
//                           setIsFromTokenChange(true);
//                           setIsFromTokenPage(false);
//                         }}
//                       />
//                       <div
//                         className={stylesFromToken.ethereumParent}
//                         onClick={() => {
//                           setFromToken(token);
//                           setIsFromTokenChange(true);
//                           setIsFromTokenPage(false);
//                         }}
//                       >
//                         <div className={stylesFromToken.tetherUsd}>
//                           {token?.name}
//                         </div>

//                         <div className={stylesFromToken.eth1}>
//                           {token?.symbol}
//                         </div>
//                       </div>
//                       <span className="justify-start items-start mr-4">
//                         <>
//                           {token?.favorite === true ? (
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               fill="none"
//                               viewBox="0 0 24 24"
//                               strokeWidth="1.5"
//                               stroke="#9D9DA3"
//                               className={`w-5 h-5 hover:stroke-infoText active:fill-infoText stroke-infoText
//                             fill-infoText`}
//                               onClick={() => {
//                                 setSelectedToken(token);
//                                 setIsAddToFavorite(true);
//                               }}
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
//                               />
//                             </svg>
//                           ) : (
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               fill="none"
//                               viewBox="0 0 24 24"
//                               strokeWidth="1.5"
//                               stroke="#9D9DA3"
//                               className={`w-5 h-5 hover:stroke-infoText active:fill-infoText stroke-secondaryText`}
//                               onClick={() => {
//                                 setSelectedToken(token);
//                                 setIsAddToFavorite(true);
//                               }}
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
//                               />
//                             </svg>
//                           )}
//                         </>
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           ) : null}

//           {/* To TOKEN COMPONENT: PART THREE */}
//           {isChainModalVisible === false &&
//           isFromTokenPage === false &&
//           isToTokenPage === true &&
//           isSlippagePage === false &&
//           isConnecting === false ? (
//             <div className={stylesFromToken.frameContainer}>
//               <div className={stylesFromToken.selectATokenParent}>
//                 <div className={stylesFromToken.selectAToken}>
//                   Select a token
//                 </div>
//                 <div
//                   className={`cursor-pointer hover:bg-secondaryFillLight ${stylesFromToken.iconButton} `}
//                 >
//                   <img
//                     className={stylesFromToken.xCloseIcon}
//                     onClick={() => setIsToTokenPage(false)}
//                     alt=""
//                     src="/xclose.svg"
//                   />
//                 </div>
//               </div>
//               <div className={stylesFromToken.frameChild} />
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                   <img
//                     className={stylesFromToken.xCloseIcon}
//                     alt=""
//                     src="/searchmd.svg"
//                   />
//                 </div>
//                 <input
//                   type="search"
//                   id="search"
//                   className="[border:none] block p-4 pl-10 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-surface-tint-d-8 w-[432px] text-secondaryFillDim"
//                   placeholder="Search by name or paste address"
//                   onChange={(e) => {
//                     if (e.target.value === '') {
//                       setFilteredtTokens(allTokens);
//                       return;
//                     }
//                     let ttToken = allTokens.filter(({ symbol }) => {
//                       return symbol
//                         .toLowerCase()
//                         .includes(e.target.value.toLowerCase());
//                     });
//                     if (ttToken !== null) {
//                       setFilteredtTokens(ttToken);
//                     }
//                   }}
//                 />
//               </div>
//               <div
//                 className={`grid grid-cols-4 ${stylesFromToken.customIconGroupDiv}`}
//               >
//                 <>
//                   {favoriteTokens?.map((token, idx) => (
//                     <div
//                       className={`cursor-pointer group/item hover:bg-secondaryFill flex flex-row justify-center items-center object-contain ${
//                         stylesFromToken.customIconGroup
//                       } ${token?.name === tTokenL?.name && 'bg-secondaryFill'}`}
//                       key={idx}
//                     >
//                       <div className="flex flex-row gap-1">
//                         <div
//                           className="flex flex-row justify-start gap-1"
//                           onClick={() => {
//                             setToToken(token);
//                             setIsToTokenChange(true);
//                             setIsToTokenPage(false);
//                           }}
//                         >
//                           <img
//                             className={stylesFromToken.customIcon}
//                             alt=""
//                             src={token?.logoURI}
//                           />
//                           <div className={stylesFromToken.customSymbol}>
//                             {token?.symbol}
//                           </div>
//                         </div>

//                         <div className="group/edit invisible group-hover/item:visible ...">
//                           <img
//                             className={`group-hover/edit:text-gray-700 hover:rounded-full hover:bg-secondaryFillLight ${stylesFromToken.xCloseIconCustom}`}
//                             onClick={() => removeFromFavorite(token)}
//                             alt=""
//                             src="/xclose.svg"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </>
//               </div>
//               <div className={stylesFromToken.frameChild} />
//               <div
//                 className={`overflow-y-auto max-h-[320px] ${stylesFromToken.frameParent1}`}
//               >
//                 <div className={stylesFromToken.frameParent2}>
//                   {filteredtTokens?.map((token, idx) => (
//                     <div
//                       key={idx}
//                       className={`cursor-pointer ${stylesFromToken.mdImageGroup} hover:bg-secondaryFill`}
//                     >
//                       <img
//                         className={stylesFromToken.protocolIcon4}
//                         alt=""
//                         src={token?.logoURI}
//                         onClick={() => {
//                           setToToken(token);
//                           setIsToTokenChange(true);
//                           setIsToTokenPage(false);
//                         }}
//                       />
//                       <div
//                         className={stylesFromToken.ethereumParent}
//                         onClick={() => {
//                           setToToken(token);
//                           setIsToTokenChange(true);
//                           setIsToTokenPage(false);
//                         }}
//                       >
//                         <div className={stylesFromToken.tetherUsd}>
//                           {token?.name}
//                         </div>
//                         <div className={stylesFromToken.eth1}>
//                           {token?.symbol}
//                         </div>
//                       </div>
//                       <span className="justify-start items-start mr-4">
//                         <>
//                           {token?.favorite === true ? (
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               fill="none"
//                               viewBox="0 0 24 24"
//                               strokeWidth="1.5"
//                               stroke="#9D9DA3"
//                               className={`w-5 h-5 hover:stroke-infoText active:fill-infoText stroke-infoText
//                             fill-infoText`}
//                               onClick={() => {
//                                 setSelectedToken(token);
//                                 setIsAddToFavorite(true);
//                               }}
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
//                               />
//                             </svg>
//                           ) : (
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               fill="none"
//                               viewBox="0 0 24 24"
//                               strokeWidth="1.5"
//                               stroke="#9D9DA3"
//                               className={`w-5 h-5 hover:stroke-infoText active:fill-infoText stroke-secondaryText`}
//                               onClick={() => {
//                                 setSelectedToken(token);
//                                 setIsAddToFavorite(true);
//                               }}
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
//                               />
//                             </svg>
//                           )}
//                         </>
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           ) : null}
//           {/* ============================{Slippage}=============================== */}
//           {isChainModalVisible === false &&
//           isFromTokenPage === false &&
//           isToTokenPage === false &&
//           isSlippagePage === true &&
//           isConnecting === false ? (
//             <>
//               {/* <div className={stylesSlippage.frameContainer}> */}
//               <div className={`${stylesSwap.frameGroupCustom}`}>
//                 <div className={stylesSlippage.iconButtonParent}>
//                   <div
//                     className={stylesSlippage.iconButton}
//                     onClick={() => {
//                       setIsCustom(false);
//                       setIsSlippagePage(false);
//                     }}
//                   >
//                     <img
//                       className={stylesSlippage.chevronLeftIcon}
//                       alt=""
//                       src="/chevronleft.svg"
//                     />
//                   </div>
//                   <div className={stylesSlippage.swapSettings}>
//                     Swap settings
//                   </div>
//                   <div className={stylesSlippage.iconButton1}>
//                     <img className={stylesSlippage.chevronLeftIcon} alt="" />
//                   </div>
//                 </div>
//                 <div className={stylesSlippage.frameChild} />
//                 <div className={stylesSlippage.frameDiv}>
//                   <div className={stylesSlippage.slippageToleranceParent}>
//                     <div className={stylesSlippage.slippageTolerance}>
//                       Slippage tolerance
//                     </div>
//                     {isSlippageAuto && !isWarning && !isLowSlippage ? (
//                       <div className={stylesSlippage.autoWrapper}>
//                         <div className={stylesSlippage.ethereum}>Auto</div>
//                       </div>
//                     ) : null}
//                     {!isSlippageAuto && !isWarning && !isLowSlippage ? (
//                       <div className={stylesSlippage.autoWrapper}>
//                         <div className={stylesSlippage.ethereum}>
//                           {slippage}%
//                         </div>
//                       </div>
//                     ) : null}
//                     {!isSlippageAuto && isWarning && !isLowSlippage ? (
//                       <div className={stylesSlippage.alertCircleParent}>
//                         <img
//                           className={stylesSlippage.chevronLeftIcon}
//                           alt=""
//                           src="/alertcircle1.svg"
//                         />
//                         <div className={stylesSlippage.ethereum}>
//                           {slippage}% Custom
//                         </div>
//                       </div>
//                     ) : null}
//                     {!isSlippageAuto && !isWarning && isLowSlippage ? (
//                       <div className={stylesSlippage.alertCircleParent}>
//                         <img
//                           className={stylesSlippage.chevronLeftIcon}
//                           alt=""
//                           src="/alerttriangle1.svg"
//                         />
//                         <div className={stylesSlippage.ethereum}>
//                           {slippage}%
//                         </div>
//                       </div>
//                     ) : null}
//                   </div>
//                   <div className={stylesSlippage.frameParent1}>
//                     {isSlippageAuto ? (
//                       <div className={stylesSlippage.autoContainer}>
//                         <div className={stylesSlippage.ethereum}>Auto</div>
//                       </div>
//                     ) : (
//                       <div className={stylesSlippage.autoWrapper2}>
//                         <div
//                           className={`${stylesSlippage.ethereum} text-[#B27CFF]`}
//                           onClick={() => {
//                             dispatch(updateSlippage('0.7'));
//                             setSlippage('0.7');
//                             setIsSlippageAuto(true);
//                             setIsCustom(false);
//                           }}
//                         >
//                           Auto
//                         </div>
//                       </div>
//                     )}

//                     <div className={stylesSlippage.frameParent2}>
//                       <div
//                         className={`${stylesSlippage.wrapper} ${
//                           slippage === '0.1'
//                             ? 'rounded-2xl bg-surface-tint-16-d'
//                             : 'rounded-2xl'
//                         }`}
//                       >
//                         <div
//                           className={stylesSlippage.ethereum}
//                           onClick={() => {
//                             dispatch(updateSlippage('0.1'));
//                             setSlippage('0.1');
//                             setIsSlippageAuto(false);
//                             setIsCustom(false);
//                           }}
//                         >
//                           0.1%
//                         </div>
//                       </div>
//                       <div
//                         className={`${stylesSlippage.container} ${
//                           slippage === '0.5'
//                             ? 'rounded-2xl bg-surface-tint-16-d'
//                             : 'rounded-2xl'
//                         }`}
//                       >
//                         <div
//                           className={stylesSlippage.ethereum}
//                           onClick={() => {
//                             dispatch(updateSlippage('0.5'));
//                             setSlippage('0.5');
//                             setIsSlippageAuto(false);
//                             setIsCustom(false);
//                           }}
//                         >
//                           0.5%
//                         </div>
//                       </div>
//                       <div
//                         className={`${stylesSlippage.container} ${
//                           slippage === '1'
//                             ? 'rounded-2xl bg-surface-tint-16-d'
//                             : 'rounded-2xl'
//                         }`}
//                       >
//                         <div
//                           className={stylesSlippage.ethereum}
//                           onClick={() => {
//                             dispatch(updateSlippage('1'));
//                             setSlippage('1');
//                             setIsSlippageAuto(false);
//                             setIsCustom(false);
//                           }}
//                         >
//                           1%
//                         </div>
//                       </div>
//                       {isCustom === true ? (
//                         <div className="flex">
//                           <div className="flex object-contain ml-2">
//                             <input
//                               type="text"
//                               placeholder="custom"
//                               className="ml-2 py-1.5 rounded-lg w-[70px] object-contain
//                 active:bg-black active:text-primaryText bg-transparent text-secondaryText
//                 border border-secondaryFillLight hover:border-secondaryText"
//                               value={customSlippage}
//                               onChange={(e) => {
//                                 setCustomSlippage(e.target.value);
//                                 setSlippage(e.target.value);
//                                 dispatch(updateSlippage(e.target.value));
//                               }}
//                             />
//                           </div>
//                         </div>
//                       ) : (
//                         <div
//                           className={`${stylesSlippage.customWrapper} ${
//                             slippage === 'custom'
//                               ? 'rounded-2xl bg-surface-tint-16-d'
//                               : 'rounded-2xl'
//                           }`}
//                         >
//                           <div
//                             className={stylesSlippage.ethereum}
//                             onClick={() => setIsCustom(true)}
//                           >
//                             Custom
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//                 {isLowSlippage && (
//                   <div
//                     className={
//                       stylesSlippage.transactionWithExtremelyLowWrapper
//                     }
//                   >
//                     <div className={stylesSlippage.slippageTolerance}>
//                       Transaction with extremely low slippage tolerance might be
//                       reverted because of very small market movement
//                     </div>
//                   </div>
//                 )}
//                 {isWarning && (
//                   <div
//                     className={stylesSlippage.youMayReceive12LessWithWrapper}
//                   >
//                     <div className={stylesSlippage.slippageTolerance}>
//                       {`You may receive ${slippage}% less with this level of slippage tolerance`}
//                     </div>
//                   </div>
//                 )}

//                 <div className={stylesSlippage.frameChild} />
//                 <div className={stylesSlippage.frameDiv}>
//                   <div className={stylesSlippage.transactionDeadline}>
//                     Transaction deadline
//                   </div>
//                   <div className={stylesSlippage.frameParent3}>
//                     <div className={stylesSlippage.wrapper1}>
//                       <div className={stylesSlippage.ethereum}>20</div>
//                     </div>
//                     <div className={stylesSlippage.minutes}>minutes</div>
//                   </div>
//                 </div>
//               </div>
//             </>
//           ) : null}

//           {isChainModalVisible === false &&
//           isFromTokenPage === false &&
//           isToTokenPage === false &&
//           isSlippagePage === true &&
//           isConnecting === false ? (
//             <>
//               <Modal visible={true}>
//                 <div className={stylesSlippage.frameContainer}>
//                   <div className={stylesSlippage.iconButtonParent}>
//                     <div
//                       className={stylesSlippage.iconButton}
//                       onClick={() => {
//                         setIsCustom(false);
//                         setIsSlippagePage(false);
//                       }}
//                     >
//                       <img
//                         className={stylesSlippage.chevronLeftIcon}
//                         alt=""
//                         src="/chevronleft.svg"
//                       />
//                     </div>
//                     <div className={stylesSlippage.swapSettings}>
//                       Swap settings
//                     </div>
//                     <div className={stylesSlippage.iconButton1}>
//                       <img className={stylesSlippage.chevronLeftIcon} alt="" />
//                     </div>
//                   </div>
//                   <div className={stylesSlippage.frameChild} />
//                   <div className={stylesSlippage.frameDiv}>
//                     <div className={stylesSlippage.slippageToleranceParent}>
//                       <div className={stylesSlippage.slippageTolerance}>
//                         Slippage tolerance
//                       </div>
//                       {isSlippageAuto && !isWarning && !isLowSlippage ? (
//                         <div className={stylesSlippage.autoWrapper}>
//                           <div className={stylesSlippage.ethereum}>Auto</div>
//                         </div>
//                       ) : null}
//                       {!isSlippageAuto && !isWarning && !isLowSlippage ? (
//                         <div className={stylesSlippage.autoWrapper}>
//                           <div className={stylesSlippage.ethereum}>
//                             {slippage}%
//                           </div>
//                         </div>
//                       ) : null}
//                       {!isSlippageAuto && isWarning && !isLowSlippage ? (
//                         <div className={stylesSlippage.alertCircleParent}>
//                           <img
//                             className={stylesSlippage.chevronLeftIcon}
//                             alt=""
//                             src="/alertcircle1.svg"
//                           />
//                           <div className={stylesSlippage.ethereum}>
//                             {slippage}% Custom
//                           </div>
//                         </div>
//                       ) : null}
//                       {!isSlippageAuto && !isWarning && isLowSlippage ? (
//                         <div className={stylesSlippage.alertCircleParent}>
//                           <img
//                             className={stylesSlippage.chevronLeftIcon}
//                             alt=""
//                             src="/alerttriangle1.svg"
//                           />
//                           <div className={stylesSlippage.ethereum}>
//                             {slippage}%
//                           </div>
//                         </div>
//                       ) : null}
//                     </div>
//                     <div className={stylesSlippage.frameParent1}>
//                       {isSlippageAuto ? (
//                         <div className={stylesSlippage.autoContainer}>
//                           <div className={stylesSlippage.ethereum}>Auto</div>
//                         </div>
//                       ) : (
//                         <div className={stylesSlippage.autoWrapper2}>
//                           <div
//                             className={`${stylesSlippage.ethereum} text-[#B27CFF]`}
//                             onClick={() => {
//                               dispatch(updateSlippage('0.7'));
//                               setSlippage('0.7');

//                               setIsSlippageAuto(true);
//                               setIsCustom(false);
//                             }}
//                           >
//                             Auto
//                           </div>
//                         </div>
//                       )}

//                       <div className={stylesSlippage.frameParent2}>
//                         <div
//                           className={`${stylesSlippage.wrapper} ${
//                             slippage === '0.1'
//                               ? 'rounded-2xl bg-surface-tint-16-d'
//                               : 'rounded-2xl'
//                           }`}
//                         >
//                           <div
//                             className={stylesSlippage.ethereum}
//                             onClick={() => {
//                               dispatch(updateSlippage('0.1'));
//                               setSlippage('0.1');

//                               setIsSlippageAuto(false);
//                               setIsCustom(false);
//                             }}
//                           >
//                             0.1%
//                           </div>
//                         </div>
//                         <div
//                           className={`${stylesSlippage.container} ${
//                             slippage === '0.5'
//                               ? 'rounded-2xl bg-surface-tint-16-d'
//                               : 'rounded-2xl'
//                           }`}
//                         >
//                           <div
//                             className={stylesSlippage.ethereum}
//                             onClick={() => {
//                               dispatch(updateSlippage('0.5'));
//                               setSlippage('0.5');

//                               setIsSlippageAuto(false);
//                               setIsCustom(false);
//                             }}
//                           >
//                             0.5%
//                           </div>
//                         </div>
//                         <div
//                           className={`${stylesSlippage.container} ${
//                             slippage === '1'
//                               ? 'rounded-2xl bg-surface-tint-16-d'
//                               : 'rounded-2xl'
//                           }`}
//                         >
//                           <div
//                             className={stylesSlippage.ethereum}
//                             onClick={() => {
//                               dispatch(updateSlippage('1'));
//                               setSlippage('1');

//                               setIsSlippageAuto(false);
//                               setIsCustom(false);
//                             }}
//                           >
//                             1%
//                           </div>
//                         </div>
//                         {isCustom === true ? (
//                           <div className="flex">
//                             <div className="flex object-contain ml-2">
//                               <input
//                                 type="text"
//                                 placeholder="custom"
//                                 className="focus:outline-0 ml-2 py-1.5 rounded-lg w-[70px] object-contain
//                 active:bg-black active:text-primaryText bg-transparent text-secondaryText
//                 border border-secondaryFillLight hover:border-secondaryText"
//                                 value={customSlippage}
//                                 onChange={(e) => {
//                                   setCustomSlippage(e.target.value);
//                                   setSlippage(e.target.value);
//                                   dispatch(updateSlippage(e.target.value));
//                                 }}
//                               />
//                             </div>
//                           </div>
//                         ) : (
//                           <div
//                             className={`${stylesSlippage.customWrapper} ${
//                               slippage === 'custom'
//                                 ? 'rounded-2xl bg-surface-tint-16-d'
//                                 : 'rounded-2xl'
//                             }`}
//                           >
//                             <div
//                               className={stylesSlippage.ethereum}
//                               onClick={() => setIsCustom(true)}
//                             >
//                               Custom
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                   {isLowSlippage && (
//                     <div
//                       className={
//                         stylesSlippage.transactionWithExtremelyLowWrapper
//                       }
//                     >
//                       <div className={stylesSlippage.slippageTolerance}>
//                         Transaction with extremely low slippage tolerance might
//                         be reverted because of very small market movement
//                       </div>
//                     </div>
//                   )}
//                   {isWarning && (
//                     <div
//                       className={stylesSlippage.youMayReceive12LessWithWrapper}
//                     >
//                       <div className={stylesSlippage.slippageTolerance}>
//                         {`You may receive ${slippage}% less with this level of slippage tolerance`}
//                       </div>
//                     </div>
//                   )}

//                   <div className={stylesSlippage.frameChild} />
//                   <div className={stylesSlippage.frameDiv}>
//                     <div className={stylesSlippage.transactionDeadline}>
//                       Transaction deadline
//                     </div>
//                     <div className={stylesSlippage.frameParent3}>
//                       <div className={stylesSlippage.wrapper1}>
//                         <div className={stylesSlippage.ethereum}>20</div>
//                       </div>
//                       <div className={stylesSlippage.minutes}>minutes</div>
//                     </div>
//                   </div>
//                 </div>
//               </Modal>
//             </>
//           ) : null}

//           {/* =====================Information Desk============================= */}
//           {/* Transaction sucessfull */}
//           {isConnected === true &&
//           isSwapSuccess === true &&
//           isSwapError === false &&
//           isApproveSuccess === false &&
//           isApproveError === false ? (
//             <>
//               <Modal visible={true}>
//                 <div className={stylesSlippage.frameContainer}>
//                   <div className={stylesSlippage.iconButtonParent}>
//                     <div
//                       className={stylesSlippage.iconButton}
//                       onClick={() => {
//                         setIsSwapSuccess(false);
//                       }}
//                     >
//                       <img
//                         className={stylesSlippage.chevronLeftIcon}
//                         alt=""
//                         src="/chevronleft.svg"
//                       />
//                     </div>
//                     <div className={stylesSlippage.swapSettings}>
//                       Transaction Status
//                     </div>
//                     <div className={stylesSlippage.iconButton1}>
//                       <img className={stylesSlippage.chevronLeftIcon} alt="" />
//                     </div>
//                   </div>
//                   <div className={stylesSlippage.frameChild} />
//                   <div className={stylesSlippage.iconButtonParent}>
//                     <div className="flex justify-center items-center">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         strokeWidth="1.5"
//                         stroke="currentColor"
//                         className="w-8 h-8"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           d="M4.5 12.75l6 6 9-13.5"
//                         />
//                       </svg>
//                     </div>
//                   </div>
//                   <div className={stylesSlippage.iconButtonParent}>
//                     <div className="flex justify-center items-center">
//                       Sucessful
//                     </div>
//                   </div>
//                   <div className={stylesSlippage.iconButtonParent}>
//                     <div
//                       className="cursor-pointer flex flex-row justify-center items-center w-[393px] h-[24px] px-[40px] py-[12px] rounded-xl bg-[#8D3DFF] text-white text-normal"
//                       onClick={() => {
//                         setIsSwapSuccess(false);
//                       }}
//                     >
//                       Close
//                     </div>
//                   </div>
//                 </div>
//               </Modal>
//             </>
//           ) : null}

//           {/* Transaction unsucessfull */}
//           {isConnected === true &&
//           isSwapSuccess === false &&
//           isSwapError === true &&
//           isApproveSuccess === false &&
//           isApproveError === false ? (
//             <>
//               <Modal visible={true}>
//                 <div className={stylesSlippage.frameContainer}>
//                   <div className={stylesSlippage.iconButtonParent}>
//                     <div
//                       className={stylesSlippage.iconButton}
//                       onClick={() => {
//                         setIsSwapError(false);
//                       }}
//                     >
//                       <img
//                         className={stylesSlippage.chevronLeftIcon}
//                         alt=""
//                         src="/chevronleft.svg"
//                       />
//                     </div>
//                     <div className={stylesSlippage.swapSettings}>
//                       Transaction Status
//                     </div>
//                     <div className={stylesSlippage.iconButton1}>
//                       <img className={stylesSlippage.chevronLeftIcon} alt="" />
//                     </div>
//                   </div>
//                   <div className={stylesSlippage.frameChild} />
//                   <div className={stylesSlippage.iconButtonParent}>
//                     <div className="flex justify-center items-center">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         strokeWidth="1.5"
//                         stroke="currentColor"
//                         className="w-8 h-8"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           d="M6 18L18 6M6 6l12 12"
//                         />
//                       </svg>
//                     </div>
//                   </div>
//                   <div className={stylesSlippage.iconButtonParent}>
//                     <div className="flex justify-center items-center">
//                       Unsucessful
//                     </div>
//                   </div>
//                   <div className={stylesSlippage.iconButtonParent}>
//                     <div
//                       className="cursor-pointer flex flex-row justify-center items-center w-[393px] h-[24px] px-[40px] py-[12px] rounded-xl bg-[#8D3DFF] text-white text-normal"
//                       onClick={() => {
//                         setIsSwapError(false);
//                       }}
//                     >
//                       Close
//                     </div>
//                   </div>
//                 </div>
//               </Modal>
//             </>
//           ) : null}

//           {/* Approval sucessfull */}
//           {isConnected === true &&
//           isSwapSuccess === false &&
//           isSwapError === false &&
//           isApproveSuccess === true &&
//           isApproveError === false ? (
//             <>
//               <Modal visible={true}>
//                 <div className={stylesSlippage.frameContainer}>
//                   <div className={stylesSlippage.iconButtonParent}>
//                     <div
//                       className={stylesSlippage.iconButton}
//                       onClick={() => {
//                         setIsApproveSuccess(false);
//                       }}
//                     >
//                       <img
//                         className={stylesSlippage.chevronLeftIcon}
//                         alt=""
//                         src="/chevronleft.svg"
//                       />
//                     </div>
//                     <div className={stylesSlippage.swapSettings}>
//                       Approval Status
//                     </div>
//                     <div className={stylesSlippage.iconButton1}>
//                       <img className={stylesSlippage.chevronLeftIcon} alt="" />
//                     </div>
//                   </div>
//                   <div className={stylesSlippage.frameChild} />
//                   <div className={stylesSlippage.iconButtonParent}>
//                     <div className="flex justify-center items-center">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         strokeWidth="1.5"
//                         stroke="currentColor"
//                         className="w-12 h-12"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
//                         />
//                       </svg>
//                     </div>
//                   </div>
//                   <div className={stylesSlippage.iconButtonParent}>
//                     <div className="flex justify-center items-center">
//                       Granted
//                     </div>
//                   </div>
//                   <div className={stylesSlippage.iconButtonParent}>
//                     <div
//                       className="cursor-pointer flex flex-row justify-center items-center w-[393px] h-[24px] px-[40px] py-[12px] rounded-xl bg-[#8D3DFF] text-white text-normal"
//                       onClick={() => {
//                         setIsApproveSuccess(false);
//                       }}
//                     >
//                       Close
//                     </div>
//                   </div>
//                 </div>
//               </Modal>
//             </>
//           ) : null}

//           {/* Approval unsucessfull */}
//           {isConnected === true &&
//           isSwapSuccess === false &&
//           isSwapError === false &&
//           isApproveSuccess === false &&
//           isApproveError === true ? (
//             <>
//               <Modal visible={true}>
//                 <div className={stylesSlippage.frameContainer}>
//                   <div className={stylesSlippage.iconButtonParent}>
//                     <div
//                       className={stylesSlippage.iconButton}
//                       onClick={() => {
//                         setIsApproveError(false);
//                       }}
//                     >
//                       <img
//                         className={stylesSlippage.chevronLeftIcon}
//                         alt=""
//                         src="/chevronleft.svg"
//                       />
//                     </div>
//                     <div className={stylesSlippage.swapSettings}>
//                       Approval Status
//                     </div>
//                     <div className={stylesSlippage.iconButton1}>
//                       <img className={stylesSlippage.chevronLeftIcon} alt="" />
//                     </div>
//                   </div>
//                   <div className={stylesSlippage.frameChild} />
//                   <div className={stylesSlippage.iconButtonParent}>
//                     <div className="flex justify-center items-center">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         strokeWidth="1.5"
//                         stroke="currentColor"
//                         className="w-12 h-12"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z"
//                         />
//                       </svg>
//                     </div>
//                   </div>
//                   <div className={stylesSlippage.iconButtonParent}>
//                     <div className="flex justify-center items-center">
//                       Denied
//                     </div>
//                   </div>
//                   <div className={stylesSlippage.iconButtonParent}>
//                     <div
//                       className="cursor-pointer flex flex-row justify-center items-center w-[393px] h-[24px] px-[40px] py-[12px] rounded-xl bg-[#8D3DFF] text-white text-normal"
//                       onClick={() => {
//                         setIsApproveError(false);
//                       }}
//                     >
//                       Close
//                     </div>
//                   </div>
//                 </div>
//               </Modal>
//             </>
//           ) : null}

//           {/* Project 2 */}

//           <>
//             {/*
//             ====================================================================
//                 Switch Network Modals
//             ====================================================================
//             */}
//             {/* <Modal visible={isChainModalVisible}> */}

//             {/* </Modal> */}
//             {/* Swap Routing*/}
//             <Modal visible={isRouting}>
//               <section className="w-[480px] px-2 py-2 border border-secondaryFillLight rounded-xl shadow-lg mb-8">
//                 <div className="block mt-6 max-w-screen-sm overflow-scroll scrollbar-hide">
//                   <div className="w-full h-fit flex flex-col">
//                     {/* Heading */}
//                     <section className="flex flex-row  gap-[30px] mb-4 mt-4 ml-4 mr-4">
//                       {/* Back Button*/}
//                       <span
//                         className="px-1 py-1 bg-secondaryFill rounded-lg border border-transparent hover:scale-110 ease-in duration-200 shadow-gray-400 cursor-pointer"
//                         onClick={() => setIsRouting((prev) => !prev)}
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           strokeWidth="1.5"
//                           stroke="#FFFFFF"
//                           className="w-5 h-5 stroke-secondaryText hover:stroke-infoText active:fill-infoText"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             d="M15.75 19.5L8.25 12l7.5-7.5"
//                           />
//                         </svg>
//                       </span>
//                       <div className="text-primaryText w-[312px] h-[28px] flex justify-center items-center text-base">
//                         Swap Routes{' '}
//                         {swapRoutes.length < 1 && 'are not available'}
//                       </div>
//                     </section>
//                     <div className="border-b border-secondaryFill mb-3"></div>

//                     <section className="border-white/20">
//                       <div className="my-1 flex flex-col gap-4 mb-4 mt-4 ml-4 mr-4">
//                         {swapRoutes.length > 0 && (
//                           <>
//                             {swapRoutes?.map((routesArray, idx) => (
//                               <div
//                                 key={idx}
//                                 onClick={() => {
//                                   setActiveProtocols(
//                                     // routesArray ? routesArray : swapRoutes[0]
//                                     routesArray ? routesArray : swapRoutes[0]
//                                   );
//                                 }}
//                                 className="flex flex-col gap-10 "
//                               >
//                                 <span
//                                   className={`w-fit flex flex-row gap-3 px-3 py-3 rounded-lg items-center border ${
//                                     routesArray === activeProtocols
//                                       ? 'border-infoText'
//                                       : 'border-secondaryFill'
//                                   } hover:bg-infoFill hover:border-blue-300 ${
//                                     routesArray === activeProtocols
//                                       ? 'text-primaryText'
//                                       : 'text-secondaryText'
//                                   }`}
//                                 >
//                                   {/* {routesArray[0].name} */}
//                                   {routesArray?.map((route, idx) => (
//                                     <>
//                                       <div className="multi-route-path">
//                                         <span className="">
//                                           <FaDotCircle />
//                                         </span>
//                                         {routesArray.length > 1 && (
//                                           <i className="">
//                                             {' '}
//                                             <HiArrowNarrowRight />{' '}
//                                           </i>
//                                         )}
//                                       </div>
//                                       <div className="px-4 py-1 flex flex-col gap-1 items-end bg-black/20 rounded-lg">
//                                         <div
//                                           key={idx}
//                                           className="text-sm font-mono"
//                                         >
//                                           {route.name}
//                                         </div>
//                                         <div className="text-xs">
//                                           {route.part}%
//                                         </div>
//                                       </div>
//                                     </>
//                                   ))}
//                                 </span>
//                               </div>
//                             ))}
//                           </>
//                         )}
//                       </div>
//                     </section>
//                   </div>
//                 </div>
//               </section>
//             </Modal>
//           </>
//         </>
//       ) : (
//         <>
//           {/* ==============================={Mobile View}====================================== */}
//           {/* Connect Wallet */}
//           {isConnected === false && isConnecting === true ? (
//             <Component8
//               setIsConnectingL={setIsConnectingL}
//               setActiveConnection={setActiveConnection}
//               activeConnection={activeConnection}
//             />
//           ) : null}

//           {/* SWITCH NETWORK */}
//           {isChainModalVisible === true &&
//           isFromTokenPage === false &&
//           isToTokenPage === false &&
//           isSlippagePage === false &&
//           isConnecting === false ? (
//             <Component4Network
//               setIsChainModalVisible={setIsChainModalVisible}
//               setChain={setChain}
//               chain={chain}
//             />
//           ) : null}

//           {/* ================================{SWAP MAIN ACTIVE STATE}===================================== */}

//           {isChainModalVisible === false &&
//           isFromTokenPage === false &&
//           isToTokenPage === false &&
//           isSlippagePage === false &&
//           isConnecting === false ? (
//             // <Component11
//             //   setIsSlippagePage={setIsSlippagePage}
//             //   fLogoURI={fLogoURI}
//             //   fSymbol={fSymbol}
//             //   isFromLoading={isFromLoading}
//             //   fValue={fValue}
//             //   onFromValueChanged={onFromValueChanged}
//             //   fromBalance={fromBalance}
//             //   fromPriceData={fromPriceData}
//             //   fromBalancePercent={fromBalancePercent}
//             //   setFromValue={setFromValue}
//             //   setFromBalancePercent={setFromBalancePercent}
//             //   userPricesL={userPricesL}
//             //   tSymbol={tSymbol}
//             //   swapTokensPosition={swapTokensPosition}
//             //   setIsToTokenPage={setIsToTokenPage}
//             //   tLogoURI={tLogoURI}
//             //   isToLoading={isToLoading}
//             //   tValue={tValue}
//             //   toInput={toInput}
//             //   toBalance={toBalance}
//             //   isConnected={isConnected}
//             //   isTxValue={isTxValue}
//             //   setIsTxValue={setIsTxValue}
//             //   setIsConnectingL={setIsConnectingL}
//             //   isCaution={isCaution}
//             //   validationOwner={validationOwner}
//             //   swapToken={swapToken}
//             //   setIsFromTokenPage={setIsFromTokenPage}
//             //   priceDeviation={priceDeviation}
//             //   setIsRouting={setIsRouting}
//             //   isPriceDeviation={isPriceDeviation}
//             //   info={info}
//             // />

//             <div className={stylesSwapMobile.frameGroupCustom}>
//               {/* <div className={`h-screen ${stylesSwapMobile.frameGroupCustom}`}> */}
//               {/* <div className={`h-full ${stylesSwapMobile.frameGroupCustom}`}> */}

//               {/* <div className={stylesSwapMobile.div}> */}

//               {/* <Header /> */}
//               {/* <div className={stylesSwapMobile.frameGroup}> */}
//               <div className={stylesSwapMobile.swapParent}>
//                 <div className={stylesSwapMobile.swap}>Swap</div>
//                 <img
//                   className={`cursor-pointer ${stylesSwapMobile.settings04Icon}`}
//                   onClick={() => {
//                     setIsSlippagePage(true);
//                   }}
//                   alt=""
//                   src="/settings04.svg"
//                 />
//               </div>
//               <div className={stylesSwapMobile.frameContainer}>
//                 <div className={stylesSwapMobile.frameDiv}>
//                   <div className={stylesSwapMobile.frameParent1}>
//                     <div className={stylesSwapMobile.frameParent2}>
//                       <div
//                         className={`cursor-pointer ${stylesSwapMobile.protocolIconGroup}`}
//                         onClick={() => setIsFromTokenPage(true)}
//                       >
//                         <img
//                           className={stylesSwapMobile.protocolIcon}
//                           alt=""
//                           // src={fLogoURI}
//                           src={fSymbol === 'BNB' ? '/bnb.png' : fLogoURI}
//                         />
//                         <div
//                           className={`font-medium ${stylesSwapMobile.horiza}`}
//                         >
//                           {fSymbol}
//                         </div>
//                         <img
//                           className={stylesSwapMobile.chevronDownIcon}
//                           alt=""
//                           src="/chevrondown.svg"
//                         />
//                       </div>

//                       <input
//                         // className={`[border:none] font-satoshi font-medium text-xl bg-[transparent] flex-1 relative tracking-[0.02em] leading-[32px] text-text-1-d text-right ${
//                         //   isFromLoading
//                         //     ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[24px]'
//                         //     : ''
//                         // }`}
//                         className={`focus:outline-0  [border:none] font-satoshi font-medium text-xl bg-[transparent] flex-1 relative tracking-[0.02em] leading-[32px] text-text-1-d text-right`}
//                         type="text"
//                         pattern="[0-9]*.[0-9]*"
//                         placeholder={isFromLoading ? '' : '0.0'}
//                         value={isFromLoading ? '' : `${fValue}`}
//                         onChange={onFromValueChanged}
//                       />
//                     </div>

//                     <div className={stylesSwapMobile.balance0Parent}>
//                       <div
//                         className={`${stylesSwapMobile.balance0} ${
//                           isFromLoading
//                             ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
//                             : ''
//                         }`}
//                       >
//                         {isFromLoading
//                           ? ''
//                           : `Balance: ${fromBalance.toString() || ''}`}
//                       </div>

//                       <div className={stylesSwapMobile.txCost}>
//                         {isFromLoading
//                           ? ''
//                           : `~$${
//                               fValue
//                                 ? new Intl.NumberFormat().format(
//                                     Number(fValue) * Number(fromPrice)
//                                   )
//                                 : ''
//                             }`}
//                       </div>
//                     </div>
//                   </div>
//                   <div className={stylesSwapMobile.frameParent3}>
//                     <div
//                       className={`cursor-pointer ${stylesSwapMobile.wrapper} ${
//                         fromBalancePercent === 25
//                           ? `bg-surface-tint-16-d`
//                           : `bg-surface-tint-d-8`
//                       }`}
//                     >
//                       <div
//                         className={`${stylesSwapMobile.txCost} ${
//                           fromBalancePercent === 25
//                             ? `text-text-1-d`
//                             : `text-text-2-d`
//                         }`}
//                         onClick={() => {
//                           let newValue = 0.25 * fromBalance;
//                           setFromValue(newValue);
//                           setFromBalancePercent(25);
//                           setIsFromValueChange(true);
//                         }}
//                       >
//                         25%
//                       </div>
//                     </div>
//                     <div
//                       className={`cursor-pointer ${stylesSwapMobile.wrapper} ${
//                         fromBalancePercent === 50
//                           ? `bg-surface-tint-16-d`
//                           : `bg-surface-tint-d-8`
//                       }`}
//                     >
//                       <div
//                         className={`${stylesSwapMobile.txCost} ${
//                           fromBalancePercent === 50
//                             ? `text-text-1-d`
//                             : `text-text-2-d`
//                         }`}
//                         onClick={() => {
//                           let newValue = 0.5 * fromBalance;
//                           setFromValue(newValue);
//                           setFromBalancePercent(50);
//                           setIsFromValueChange(true);
//                         }}
//                       >
//                         50%
//                       </div>
//                     </div>
//                     <div
//                       className={`cursor-pointer ${stylesSwapMobile.wrapper} ${
//                         fromBalancePercent === 75
//                           ? `bg-surface-tint-16-d`
//                           : `bg-surface-tint-d-8`
//                       }`}
//                     >
//                       <div
//                         className={`${stylesSwapMobile.txCost} ${
//                           fromBalancePercent === 75
//                             ? `text-text-1-d`
//                             : `text-text-2-d`
//                         }`}
//                         onClick={() => {
//                           let newValue = 0.75 * fromBalance;
//                           setFromValue(newValue);
//                           setFromBalancePercent(75);
//                           setIsFromValueChange(true);
//                         }}
//                       >
//                         75%
//                       </div>
//                     </div>
//                     <div
//                       className={`cursor-pointer ${stylesSwapMobile.wrapper} ${
//                         fromBalancePercent === 100
//                           ? `bg-surface-tint-16-d`
//                           : `bg-surface-tint-d-8`
//                       }`}
//                     >
//                       <div
//                         className={`${stylesSwapMobile.txCost} ${
//                           fromBalancePercent === 100
//                             ? `text-text-1-d`
//                             : `text-text-2-d`
//                         }`}
//                         onClick={() => {
//                           let newValue = 1 * fromBalance;
//                           setFromValue(newValue);
//                           setFromBalancePercent(100);
//                           setIsFromValueChange(true);
//                         }}
//                       >
//                         100%
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className={stylesSwapMobile.frameParent4}>
//                   <div className={stylesSwapMobile.parent}>
//                     <img
//                       className="relative w-5 h-5 shrink-0 overflow-hidden"
//                       alt=""
//                       src="/processBar.svg"
//                     />

//                     <b
//                       className={`${stylesSwapMobile.eth167771} ${
//                         isToLoading
//                           ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
//                           : ''
//                       }`}
//                     >
//                       {isToLoading
//                         ? ''
//                         : `${`1 ${fSymbol} = ${exchangeRate}  ${tSymbol}`}`}
//                     </b>
//                   </div>
//                   <div
//                     className={`cursor-pointer transition-transform duration-300 hover:scale-125 hover:rotate-180 ${stylesSwapMobile.arrowDownWrapper}`}
//                     onClick={swapTokensPosition}
//                   >
//                     <img
//                       className={stylesSwapMobile.arrowDownIcon}
//                       alt=""
//                       src="/arrowdown.svg"
//                     />
//                   </div>
//                 </div>
//                 <div className={stylesSwapMobile.frameWrapper}>
//                   <div className={stylesSwapMobile.frameParent1}>
//                     <div className={stylesSwapMobile.frameParent2}>
//                       <div
//                         className={`cursor-pointer ${stylesSwapMobile.protocolIconGroup}`}
//                         onClick={() => setIsToTokenPage(true)}
//                       >
//                         <div
//                           className={stylesSwapMobile.customToTokenFrame}
//                         ></div>
//                         <img
//                           className={stylesSwapMobile.walletIcon}
//                           alt=""
//                           // src={tLogoURI}
//                           src={tSymbol === 'BNB' ? '/bnb.png' : tLogoURI}
//                         />
//                         <div
//                           className={`font-medium ${stylesSwapMobile.horiza}`}
//                         >
//                           {tSymbol}
//                         </div>
//                         <img
//                           className={stylesSwapMobile.chevronDownIcon}
//                           alt=""
//                           src="/chevrondown.svg"
//                         />
//                       </div>
//                       <input
//                         className={`[border:none] font-satoshi font-medium text-xl bg-[transparent] flex-1 relative tracking-[0.02em] leading-[32px] text-text-1-d text-right ${
//                           isToLoading
//                             ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[24px]'
//                             : ''
//                         }`}
//                         type="text"
//                         pattern="[0-9]*.[0-9]*"
//                         placeholder={isToLoading ? '' : '0.0'}
//                         value={
//                           isToLoading
//                             ? ''
//                             : tValue &&
//                               (Number(tValue) * Number(toPrice)).toFixed(4)
//                         }
//                         // value={
//                         //   isToLoading
//                         //     ? ''
//                         //     : tValue &&
//                         //       `${new Intl.NumberFormat().format(Number(tValue) * Number(toPrice)).toFixed(4)}`
//                         // }
//                         disabled={true}
//                       />
//                     </div>
//                     <div className={stylesSwapMobile.balance0Parent}>
//                       <div
//                         className={`${stylesSwapMobile.balance0} ${
//                           isToLoading
//                             ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
//                             : ''
//                         }`}
//                       >
//                         {isToLoading
//                           ? ''
//                           : `Balance: ${toBalance.toString() || ''}`}
//                       </div>

//                       <div className={stylesSwapMobile.txCost}>
//                         {isToLoading
//                           ? ''
//                           : `~$${
//                               tValue
//                                 ? new Intl.NumberFormat().format(
//                                     Number(tValue) * Number(toPrice)
//                                   )
//                                 : ''
//                             } (-${priceDeviation ? priceDeviation : ''}%)`}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 {/* <div className={stylesSwapMobile.frameWrapper}>
//                   <div className={stylesSwapMobile.frameParent1}>
//                     <div className={stylesSwapMobile.pFrame1}>
//                       <div
//                         className={`cursor-pointer ${stylesSwapMobile.pFrameToken}`}
//                         onClick={() => setIsToTokenPage(true)}
//                       >
//                         <img
//                           className={stylesSwapMobile.pLogo}
//                           alt=""
//                           src={tLogoURI}
//                         />
//                         <div
//                           className={`font-medium ${stylesSwapMobile.pText}`}
//                         >
//                           {tSymbol}
//                         </div>
//                         <img
//                           className={stylesSwapMobile.pIcon}
//                           alt=""
//                           src="/chevrondown.svg"
//                         />
//                       </div>
//                       <input
//                         className={`[border:none] font-satoshi font-medium text-xl bg-[transparent] flex-1 relative tracking-[0.02em] leading-[32px] text-text-1-d text-right ${
//                           isToLoading
//                             ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[24px]'
//                             : ''
//                         }`}
//                         type="text"
//                         pattern="[0-9]*.[0-9]*"
//                         placeholder={isToLoading ? '' : '0.0'}
//                         value={
//                           isToLoading
//                             ? ''
//                             : tValue && Number(tValue) * Number(toPrice)
//                         }
//                         disabled={true}
//                       />
//                     </div>
//                     <div className={stylesSwapMobile.balance0Parent}>
//                       <div
//                         className={`${stylesSwapMobile.balance0} ${
//                           isToLoading
//                             ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
//                             : ''
//                         }`}
//                       >
//                         {isToLoading
//                           ? ''
//                           : `Balance: ${toBalance.toString() || ''}`}
//                       </div>

//                       <div className={stylesSwapMobile.txCost}>
                       
//                         {isToLoading
//                           ? ''
//                           : `~$${
//                               tValue
//                                 ? new Intl.NumberFormat().format(
//                                     Number(tValue) * Number(toPrice)
//                                   )
//                                 : ''
//                             } (-${priceDeviation ? priceDeviation : ''}%)`}
//                       </div>
//                     </div>
//                   </div>
//                 </div> */}
//               </div>

//               {/* //============================================================ */}
//               {isTxValue ? (
//                 <>
//                   <div className={`${stylesSwapMobileDetail.frameParent7}`}>
//                     <div
//                       className={
//                         stylesSwapMobileDetail.transactionDetailsParent
//                       }
//                     >
//                       <div
//                         className={stylesSwapMobileDetail.transactionDetails}
//                       >
//                         Transaction details
//                       </div>
//                       <img
//                         className={stylesSwapMobileDetail.chevronDownIcon}
//                         onClick={() => {
//                           setIsTxValue(false);
//                         }}
//                         alt=""
//                         src="/chevronup.svg"
//                       />
//                     </div>
//                     <div className={stylesSwapMobileDetail.usdtPriceParent}>
//                       <div className={stylesSwapMobileDetail.usdtPrice}>
//                         1 {fSymbol} price
//                       </div>
//                       <div
//                         className={`${stylesSwapMobileDetail.div9} ${
//                           isFromLoading
//                             ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
//                             : ''
//                         }`}
//                       >
//                         {/* {isFromLoading
//                           ? ''
//                           : `~$${
//                               fromPriceData ? fromPriceData?.fromPrice : ''
//                             }`} */}

//                         {isFromLoading ? '' : `~$${fromPrice}`}
//                       </div>
//                     </div>
//                     <div className={stylesSwapMobileDetail.usdtPriceParent}>
//                       <div className={stylesSwapMobileDetail.usdtPrice}>
//                         1 {tSymbol} price
//                       </div>
//                       <div
//                         className={`${stylesSwapMobileDetail.div9} ${
//                           isToLoading
//                             ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
//                             : ''
//                         }`}
//                       >
//                         {/* {isToLoading
//                           ? ''
//                           : `~$${userPricesL ? userPricesL?.toPrice : ''}`} */}
//                         {isToLoading ? '' : `~$${toPrice}`}
//                       </div>
//                     </div>
//                     <div
//                       className={`${stylesSwapMobileDetail.usdtPriceParent}`}
//                     >
//                       <div className={stylesSwapMobileDetail.txCost}>
//                         Tx cost
//                       </div>

//                       <div
//                         className={`${stylesSwapMobileDetail.div9} ${
//                           isToLoading
//                             ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
//                             : ''
//                         }`}
//                       >
//                         {/* {isToLoading
//                           ? ''
//                           : `${
//                               userPricesL?.estimatedGas &&
//                               (userPricesL?.estimatedGas / 10 ** 9).toString()
//                             } Gwei`} */}
//                         {isToLoading
//                           ? ''
//                           : `${
//                               estimatedGas &&
//                               (estimatedGas / 10 ** 9).toString()
//                             } Gwei`}
//                       </div>
//                     </div>
//                   </div>
//                 </>
//               ) : null}
//               {!isTxValue ? (
//                 <>
//                   <div
//                     className={stylesSwapMobile.frameParent7}
//                     onClick={() => {
//                       setIsTxValue(true);
//                     }}
//                   >
//                     <div className={stylesSwapMobile.txCostParent}>
//                       <div className={stylesSwapMobile.txCost}>Tx cost</div>
//                       <div
//                         className={`${stylesSwapMobile.div9} ${
//                           isToLoading
//                             ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
//                             : ''
//                         }`}
//                       >
//                         {/* {isToLoading
//                           ? ''
//                           : `${
//                               userPricesL?.estimatedGas &&
//                               (userPricesL?.estimatedGas / 10 ** 9).toString()
//                             } Gwei`} */}
//                         {isToLoading
//                           ? ''
//                           : `${
//                               estimatedGas &&
//                               (estimatedGas / 10 ** 9).toString()
//                             } Gwei`}
//                       </div>
//                     </div>
//                     <img
//                       className={stylesSwapMobile.chevronDownIcon}
//                       alt=""
//                       src="/chevrondown.svg"
//                     />
//                   </div>
//                 </>
//               ) : null}

//               {isConnected === false ? (
//                 <div
//                   className={`button_gradient cursor-pointer ${stylesSwapMobile.connectWalletWrapper}`}
//                   onClick={() => {
//                     setIsConnectingL(true);
//                     dispatch(updateConnectedNetwork(true));
//                   }}
//                 >
//                   <div
//                     className={`font-medium ${stylesSwapMobile.connectWallet}`}
//                   >
//                     Connect Wallet
//                   </div>
//                 </div>
//               ) : null}
//               {isConnected === true &&
//               validationOwner === true &&
//               isCaution === false ? (
//                 <div
//                   className={`button_gradient cursor-pointer ${stylesSwapMobile.connectWalletWrapper}`}
//                   disabled={fValue === 0 ? true : false}
//                   onClick={() => swapToken()}
//                 >
//                   <div
//                     className={`font-medium ${stylesSwapMobile.connectWallet}`}
//                   >
//                     Swap
//                   </div>
//                 </div>
//               ) : null}
//               {isConnected === true &&
//               validationOwner === false &&
//               isCaution === true ? (
//                 <>
//                   <button
//                     className="cursor-pointer [border:none] py-3 px-10 self-stretch rounded-xl overflow-hidden flex flex-row items-center justify-center bg-infoFill"
//                     disabled={fValue === 0 ? true : false}
//                   >
//                     <div className="relative text-lg tracking-[0.02em] leading-[24px] font-text-16-md text-text-1-d text-left">
//                       {info}
//                     </div>
//                   </button>
//                 </>
//               ) : null}

//               {isConnected === false &&
//               isTxValue &&
//               isCriticalPriceDeviation ? (
//                 <>
//                   <div
//                     className={
//                       stylesSwapMobileDetail.priceDeviation1373LargeWrapper
//                     }
//                   >
//                     <div className={stylesSwapMobileDetail.priceDeviation1373}>
//                       {` Price Deviation ${priceDeviation}%. Large price deviation means that you will
//                     likely trade at a worse price.`}
//                     </div>
//                   </div>
//                 </>
//               ) : null}
//               {/* </div> */}
//             </div>
//           ) : null}

//           {/* FROM TOKEN COMPONENT: PART THREE */}
//           {isChainModalVisible === false &&
//           isFromTokenPage === true &&
//           isToTokenPage === false &&
//           isSlippagePage === false &&
//           isConnecting === false ? (
//             <Component6FromToken
//               setFilteredfTokens={setFilteredfTokens}
//               allTokens={allTokens}
//               favoriteTokens={favoriteTokens}
//               fTokenL={fTokenL}
//               setFromToken={setFromToken}
//               setIsFromTokenChange={setIsFromTokenChange}
//               setIsFromTokenPage={setIsFromTokenPage}
//               filteredfTokens={filteredfTokens}
//               setSelectedToken={setSelectedToken}
//               setIsRemoveFromFavorite={setIsRemoveFromFavorite}
//               setIsAddToFavorite={setIsAddToFavorite}
//             />
//           ) : null}

//           {/* To TOKEN COMPONENT: PART THREE */}
//           {isChainModalVisible === false &&
//           isFromTokenPage === false &&
//           isToTokenPage === true &&
//           isSlippagePage === false &&
//           isConnecting === false ? (
//             <Component6ToToken
//               setFilteredtTokens={setFilteredtTokens}
//               allTokens={allTokens}
//               favoriteTokens={favoriteTokens}
//               tTokenL={tTokenL}
//               setToToken={setToToken}
//               setIsToTokenChange={setIsToTokenChange}
//               setIsToTokenPage={setIsToTokenPage}
//               filteredtTokens={filteredtTokens}
//               setSelectedToken={setSelectedToken}
//               setIsRemoveFromFavorite={setIsRemoveFromFavorite}
//               setIsAddToFavorite={setIsAddToFavorite}
//             />
//           ) : null}

//           {/* MANAGE TOKEN COMPONENT: PART THREE */}
//           {/* {isChainModalVisible === false &&
//           isFromTokenPage === false &&
//           isToTokenPage === true &&
//           isSlippagePage === false &&
//           isConnecting === false ? (
//             <Component4
//               setFilteredtTokens={setFilteredtTokens}
//               allTokens={allTokens}
//               tTokenL={tTokenL}
//               setToToken={setToToken}
//               setIsToTokenChange={setIsToTokenChange}
//               setIsToTokenPage={setIsToTokenPage}
//               filteredtTokens={filteredtTokens}
//             />
//           ) : null} */}
//           {/* ============================{Slippage}=============================== */}
//           {isChainModalVisible === false &&
//           isFromTokenPage === false &&
//           isToTokenPage === false &&
//           isSlippagePage === true &&
//           isConnecting === false ? (
//             <>
//               {/* <Component3
//                 setIsCustom={setIsCustom}
//                 setIsSlippagePage={setIsSlippagePage}
//                 setSlippage={setSlippage}
//                 setIsSlippageChange={setIsSlippageChange}
//                 setIsSlippageAuto={setIsSlippageAuto}
//                 isSlippageAuto={isSlippageAuto}
//                 isWarning={isWarning}
//                 isLowSlippage={isLowSlippage}
//                 slippage={slippage}
//                 isCustom={isCustom}
//               /> */}
//               <div className={`${stylesSwap.frameGroupMobileCustom}`}>
//                 <div className={stylesSlippage.iconButtonParent}>
//                   <div
//                     className={stylesSlippage.iconButton}
//                     onClick={() => {
//                       setIsCustom(false);
//                       setIsSlippagePage(false);
//                     }}
//                   >
//                     <img
//                       className={stylesSlippage.chevronLeftIcon}
//                       alt=""
//                       src="/chevronleft.svg"
//                     />
//                   </div>
//                   <div className={stylesSlippage.swapSettings}>
//                     Swap settings
//                   </div>
//                   <div className={stylesSlippage.iconButton1}>
//                     <img className={stylesSlippage.chevronLeftIcon} alt="" />
//                   </div>
//                 </div>
//                 <div className={stylesSlippage.frameChild} />
//                 <div className={stylesSlippage.frameDiv}>
//                   <div className={stylesSlippage.slippageToleranceParent}>
//                     <div className={stylesSlippage.slippageTolerance}>
//                       Slippage tolerance
//                     </div>
//                     {isSlippageAuto && !isWarning && !isLowSlippage ? (
//                       <div className={stylesSlippage.autoWrapper}>
//                         <div className={stylesSlippage.ethereum}>Auto</div>
//                       </div>
//                     ) : null}
//                     {!isSlippageAuto && !isWarning && !isLowSlippage ? (
//                       <div className={stylesSlippage.autoWrapper}>
//                         <div className={stylesSlippage.ethereum}>
//                           {slippage}%
//                         </div>
//                       </div>
//                     ) : null}
//                     {!isSlippageAuto && isWarning && !isLowSlippage ? (
//                       <div className={stylesSlippage.alertCircleParent}>
//                         <img
//                           className={stylesSlippage.chevronLeftIcon}
//                           alt=""
//                           src="/alertcircle1.svg"
//                         />
//                         <div className={stylesSlippage.ethereum}>
//                           {slippage}% Custom
//                         </div>
//                       </div>
//                     ) : null}
//                     {!isSlippageAuto && !isWarning && isLowSlippage ? (
//                       <div className={stylesSlippage.alertCircleParent}>
//                         <img
//                           className={stylesSlippage.chevronLeftIcon}
//                           alt=""
//                           src="/alerttriangle1.svg"
//                         />
//                         <div className={stylesSlippage.ethereum}>
//                           {slippage}%
//                         </div>
//                       </div>
//                     ) : null}
//                   </div>
//                   <div className={stylesSlippage.frameParent1}>
//                     {isSlippageAuto ? (
//                       <div
//                         className={`cursor-pointer ${stylesSlippage.autoContainer}`}
//                       >
//                         <div className={stylesSlippage.ethereum}>Auto</div>
//                       </div>
//                     ) : (
//                       <div
//                         className={`cursor-pointer {stylesSlippage.autoWrapper2}`}
//                       >
//                         <div
//                           className={`${stylesSlippage.ethereum} text-[#B27CFF]`}
//                           onClick={() => {
//                             dispatch(updateSlippage('1'));
//                             setSlippage('1');
//                             setIsSlippageAuto(true);
//                             setIsCustom(false);
//                           }}
//                         >
//                           Auto
//                         </div>
//                       </div>
//                     )}

//                     <div className={stylesSlippage.frameParent2}>
//                       {/* <div
//                         className={`${stylesSlippage.wrapper} ${
//                           slippage === '0.1'
//                             ? 'rounded-2xl bg-surface-tint-16-d'
//                             : 'rounded-2xl'
//                         }`}
//                       >
//                         <div
//                           className={stylesSlippage.ethereum}
//                           onClick={() => {
//                             dispatch(updateSlippage('0.1'));
//                             setSlippage('0.1');
//                             setIsSlippageAuto(false);
//                             setIsCustom(false);
//                           }}
//                         >
//                           0.1%
//                         </div>
//                       </div> */}
//                       <div
//                         className={`cursor-pointer ${
//                           stylesSlippage.container
//                         } ${
//                           slippage === '0.5'
//                             ? 'rounded-2xl bg-surface-tint-16-d'
//                             : 'rounded-2xl'
//                         }`}
//                       >
//                         <div
//                           className={stylesSlippage.ethereum}
//                           onClick={() => {
//                             dispatch(updateSlippage('0.5'));
//                             setSlippage('0.5');
//                             setIsSlippageAuto(false);
//                             setIsCustom(false);
//                           }}
//                         >
//                           0.5%
//                         </div>
//                       </div>
//                       <div
//                         className={`cursor-pointer ${
//                           stylesSlippage.container
//                         } ${
//                           slippage === '1'
//                             ? 'rounded-2xl bg-surface-tint-16-d'
//                             : 'rounded-2xl'
//                         }`}
//                       >
//                         <div
//                           className={stylesSlippage.ethereum}
//                           onClick={() => {
//                             dispatch(updateSlippage('1'));
//                             setSlippage('1');
//                             setIsSlippageAuto(false);
//                             setIsCustom(false);
//                           }}
//                         >
//                           1%
//                         </div>
//                       </div>
//                       {isCustom === true ? (
//                         <div className="flex">
//                           <div className="flex object-contain ml-2">
//                             <input
//                               type="text"
//                               placeholder="custom"
//                               className="focus:outline-0 ml-2 py-1.5 rounded-lg w-[70px] object-contain
//                 active:bg-black active:text-primaryText bg-transparent text-secondaryText
//                 border border-secondaryFillLight hover:border-secondaryText"
//                               value={customSlippage}
//                               onChange={(e) => {
//                                 setCustomSlippage(e.target.value);
//                                 setSlippage(e.target.value);
//                                 dispatch(updateSlippage(e.target.value));
//                               }}
//                             />
//                           </div>
//                         </div>
//                       ) : (
//                         <div
//                           className={`${stylesSlippage.customWrapper} ${
//                             slippage === 'custom'
//                               ? 'rounded-2xl bg-surface-tint-16-d'
//                               : 'rounded-2xl'
//                           }`}
//                         >
//                           <div
//                             className={stylesSlippage.ethereum}
//                             onClick={() => setIsCustom(true)}
//                           >
//                             Custom
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//                 {isLowSlippage && (
//                   <div
//                     className={
//                       stylesSlippage.transactionWithExtremelyLowWrapperMobile
//                     }
//                   >
//                     <div className={stylesSlippage.slippageTolerance}>
//                       Transaction with extremely low slippage tolerance might be
//                       reverted because of very small market movement
//                     </div>
//                   </div>
//                 )}
//                 {isWarning && (
//                   <div
//                     className={
//                       stylesSlippage.youMayReceive12LessWithWrapperMobile
//                     }
//                   >
//                     <div className={stylesSlippage.slippageTolerance}>
//                       {`You may receive ${slippage}% less with this level of slippage tolerance`}
//                     </div>
//                   </div>
//                 )}

//                 <div className={stylesSlippage.frameChild} />
//                 <div className={stylesSlippage.frameDiv}>
//                   <div className={stylesSlippage.transactionDeadline}>
//                     Transaction deadline
//                   </div>
//                   <div className={stylesSlippage.frameParent3}>
//                     <div className={stylesSlippage.wrapper1}>
//                       <div className={stylesSlippage.ethereum}>20</div>
//                     </div>
//                     <div className={stylesSlippage.minutes}>minutes</div>
//                   </div>
//                 </div>
//               </div>
//             </>
//           ) : null}

//           {/* =====================Information Desk============================= */}
//           {/* Transaction sucessfull */}
//           {isConnected === true &&
//           isSwapSuccess === true &&
//           isSwapError === false &&
//           isApproveSuccess === false &&
//           isApproveError === false ? (
//             <>
//               <Modal visible={true}>
//                 <div className={stylesSlippage.frameContainer}>
//                   <div className={stylesSlippage.iconButtonParent}>
//                     <div
//                       className={stylesSlippage.iconButton}
//                       onClick={() => {
//                         setIsSwapSuccess(false);
//                       }}
//                     >
//                       <img
//                         className={stylesSlippage.chevronLeftIcon}
//                         alt=""
//                         src="/chevronleft.svg"
//                       />
//                     </div>
//                     <div className={stylesSlippage.swapSettings}>
//                       Transaction Status
//                     </div>
//                     <div className={stylesSlippage.iconButton1}>
//                       <img className={stylesSlippage.chevronLeftIcon} alt="" />
//                     </div>
//                   </div>
//                   <div className={stylesSlippage.frameChild} />
//                   <div className={stylesSlippage.iconButtonParent}>
//                     <div className="flex justify-center items-center">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         strokeWidth="1.5"
//                         stroke="currentColor"
//                         className="w-8 h-8"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           d="M4.5 12.75l6 6 9-13.5"
//                         />
//                       </svg>
//                     </div>
//                   </div>
//                   <div className={stylesSlippage.iconButtonParent}>
//                     <div className="flex justify-center items-center">
//                       Sucessful
//                     </div>
//                   </div>
//                   <div className={stylesSlippage.iconButtonParent}>
//                     <div
//                       className="cursor-pointer flex flex-row justify-center items-center w-[393px] h-[24px] px-[40px] py-[12px] rounded-xl bg-[#8D3DFF] text-white text-normal"
//                       onClick={() => {
//                         setIsSwapSuccess(false);
//                       }}
//                     >
//                       Close
//                     </div>
//                   </div>
//                 </div>
//               </Modal>
//             </>
//           ) : null}

//           {/* Transaction unsucessfull */}
//           {isConnected === true &&
//           isSwapSuccess === false &&
//           isSwapError === true &&
//           isApproveSuccess === false &&
//           isApproveError === false ? (
//             <>
//               <Modal visible={true}>
//                 <div className={stylesSlippage.frameContainer}>
//                   <div className={stylesSlippage.iconButtonParent}>
//                     <div
//                       className={stylesSlippage.iconButton}
//                       onClick={() => {
//                         setIsSwapError(false);
//                       }}
//                     >
//                       <img
//                         className={stylesSlippage.chevronLeftIcon}
//                         alt=""
//                         src="/chevronleft.svg"
//                       />
//                     </div>
//                     <div className={stylesSlippage.swapSettings}>
//                       Transaction Status
//                     </div>
//                     <div className={stylesSlippage.iconButton1}>
//                       <img className={stylesSlippage.chevronLeftIcon} alt="" />
//                     </div>
//                   </div>
//                   <div className={stylesSlippage.frameChild} />
//                   <div className={stylesSlippage.iconButtonParent}>
//                     <div className="flex justify-center items-center">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         strokeWidth="1.5"
//                         stroke="currentColor"
//                         className="w-8 h-8"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           d="M6 18L18 6M6 6l12 12"
//                         />
//                       </svg>
//                     </div>
//                   </div>
//                   <div className={stylesSlippage.iconButtonParent}>
//                     <div className="flex justify-center items-center">
//                       Unsucessful
//                     </div>
//                   </div>
//                   <div className={stylesSlippage.iconButtonParent}>
//                     <div
//                       className="cursor-pointer flex flex-row justify-center items-center w-[393px] h-[24px] px-[40px] py-[12px] rounded-xl bg-[#8D3DFF] text-white text-normal"
//                       onClick={() => {
//                         setIsSwapError(false);
//                       }}
//                     >
//                       Close
//                     </div>
//                   </div>
//                 </div>
//               </Modal>
//             </>
//           ) : null}

//           {/* Approval sucessfull */}
//           {isConnected === true &&
//           isSwapSuccess === false &&
//           isSwapError === false &&
//           isApproveSuccess === true &&
//           isApproveError === false ? (
//             <>
//               <Modal visible={true}>
//                 <div className={stylesSlippage.frameContainer}>
//                   <div className={stylesSlippage.iconButtonParent}>
//                     <div
//                       className={stylesSlippage.iconButton}
//                       onClick={() => {
//                         setIsApproveSuccess(false);
//                       }}
//                     >
//                       <img
//                         className={stylesSlippage.chevronLeftIcon}
//                         alt=""
//                         src="/chevronleft.svg"
//                       />
//                     </div>
//                     <div className={stylesSlippage.swapSettings}>
//                       Approval Status
//                     </div>
//                     <div className={stylesSlippage.iconButton1}>
//                       <img className={stylesSlippage.chevronLeftIcon} alt="" />
//                     </div>
//                   </div>
//                   <div className={stylesSlippage.frameChild} />
//                   <div className={stylesSlippage.iconButtonParent}>
//                     <div className="flex justify-center items-center">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         strokeWidth="1.5"
//                         stroke="currentColor"
//                         className="w-12 h-12"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
//                         />
//                       </svg>
//                     </div>
//                   </div>
//                   <div className={stylesSlippage.iconButtonParent}>
//                     <div className="flex justify-center items-center">
//                       Granted
//                     </div>
//                   </div>
//                   <div className={stylesSlippage.iconButtonParent}>
//                     <div
//                       className="cursor-pointer flex flex-row justify-center items-center w-[393px] h-[24px] px-[40px] py-[12px] rounded-xl bg-[#8D3DFF] text-white text-normal"
//                       onClick={() => {
//                         setIsApproveSuccess(false);
//                       }}
//                     >
//                       Close
//                     </div>
//                   </div>
//                 </div>
//               </Modal>
//             </>
//           ) : null}

//           {/* Approval unsucessfull */}
//           {isConnected === true &&
//           isSwapSuccess === false &&
//           isSwapError === false &&
//           isApproveSuccess === false &&
//           isApproveError === true ? (
//             <>
//               <Modal visible={true}>
//                 <div className={stylesSlippage.frameContainer}>
//                   <div className={stylesSlippage.iconButtonParent}>
//                     <div
//                       className={stylesSlippage.iconButton}
//                       onClick={() => {
//                         setIsApproveError(false);
//                       }}
//                     >
//                       <img
//                         className={stylesSlippage.chevronLeftIcon}
//                         alt=""
//                         src="/chevronleft.svg"
//                       />
//                     </div>
//                     <div className={stylesSlippage.swapSettings}>
//                       Approval Status
//                     </div>
//                     <div className={stylesSlippage.iconButton1}>
//                       <img className={stylesSlippage.chevronLeftIcon} alt="" />
//                     </div>
//                   </div>
//                   <div className={stylesSlippage.frameChild} />
//                   <div className={stylesSlippage.iconButtonParent}>
//                     <div className="flex justify-center items-center">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         strokeWidth="1.5"
//                         stroke="currentColor"
//                         className="w-12 h-12"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z"
//                         />
//                       </svg>
//                     </div>
//                   </div>
//                   <div className={stylesSlippage.iconButtonParent}>
//                     <div className="flex justify-center items-center">
//                       Denied
//                     </div>
//                   </div>
//                   <div className={stylesSlippage.iconButtonParent}>
//                     <div
//                       className="cursor-pointer flex flex-row justify-center items-center w-[393px] h-[24px] px-[40px] py-[12px] rounded-xl bg-[#8D3DFF] text-white text-normal"
//                       onClick={() => {
//                         setIsApproveError(false);
//                       }}
//                     >
//                       Close
//                     </div>
//                   </div>
//                 </div>
//               </Modal>
//             </>
//           ) : null}

//           {/* Project 2 */}

//           <>
//             {/* <Modal visible={isConfirmation}>
//           <>
//             <section className="flex flex-col justify-center items-center gap-2 mb-8">
//               <div className="border border-secondaryFillLight rounded-xl bg-primaryFill">
//                 <section className="w-fit h-fit flex flex-col gap-2 text-infoText/50">
//                   <div className="flex flex-row gap-2 justify-center items-center bg-infoFill rounded-xl w-[432px] py-4 outline">
//                     <div className="p-2 text-sm text-secondaryText flex flex-col">
//                       <section className="flex flex-row  gap-[30px] mb-5 mt-4 ml-4 mr-4">
//                         <span
//                           className="px-1 py-1 bg-secondaryFill rounded-lg cursor-pointer border border-transparent hover:scale-110 ease-in duration-200"
//                           onClick={() => {
//                             setIsConfirmation(false);
//                             setValidationOwner(false);
//                           }}
//                         >
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             strokeWidth="1.5"
//                             stroke="#FFFFFF"
//                             className="w-5 h-5 stroke-secondaryText active:fill-infoText hover:stroke-infoText"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               d="M15.75 19.5L8.25 12l7.5-7.5"
//                             />
//                           </svg>
//                         </span>
//                         <div className="text-primaryText text-lg w-[312px] h-[28px] flex justify-center items-center">
//                           Confirmation
//                         </div>
//                       </section>
//                       <div className="border-b border-infoText/20 m-1"></div>
//                       <section className="overflow-y-auto max-h-[320px] mb-5 ml-4 mt-4 mr-4 flex flex-row justify-between items-center">
//                         <div className="flex flex-row w-[312px] gap-2">
//                           <span className="py-1 text-sm justify-start items-start text-primaryText">
//                             Network
//                           </span>
//                         </div>
//                         <div className="flex flex-col">
//                           <ActiveChainComponent currentItem={chain} />
//                         </div>
//                       </section>
//                       <div className="border-b border-infoText/20 m-1"></div>
//                       <section className="flex flex-col gap-1 text-primaryText/50 mb-4 mt-4 ml-4 mr-4">
//                         <div className="flex justify-between">
//                           <span className="py-1 text-sm justify-start items-start text-primaryText">
//                             Send:
//                           </span>
//                           <span
//                             className="px-2.5 py-1 cursor-pointer 
//                     text-secondaryText"
//                           >
//                             {fValue ? fValue : 0} {fSymbol}
//                           </span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span className="py-1 text-sm justify-start items-start text-primaryText">
//                             Receive:
//                           </span>
//                           <span
//                             className="px-2.5 py-1 cursor-pointer 
//                     text-secondaryText"
//                           >
//                             {tValueFormatted ? tValueFormatted : 0} {tSymbol}
//                           </span>
//                         </div>
//                         <div className="flex justify-between">
//                           <div className="">
//                             <span className="py-1 text-sm justify-start items-start text-primaryText">
//                               Gas
//                             </span>
//                             <span className="ml-1 py-1 text-sm justify-start items-start text-secondaryText">
//                               (estimate)
//                             </span>
//                             <span className="ml-1 py-1 text-sm justify-start items-start text-primaryText">
//                               :
//                             </span>
//                           </div>

//                           <span
//                             className="px-2.5 py-1 cursor-pointer 
//                     text-secondaryText"
//                           >
//                             {estimatedGas ? estimatedGas / 10 ** 9 : null} Gwei
//                           </span>
//                         </div>
//                       </section>

//                       <div className="border-b border-infoText/20 m-1"></div>

//                       <section
//                         className="overflow-y-auto py-4 max-h-[320px]  flex flex-row justify-between text-infoText items-center rounded-lg cursor-pointer border border-secondaryFill bg-infoFill hover:bg-infoFill
//                   outline hover:outline-attentionText shadow-lg  w-[350px] mb-8 mt-4 ml-8 mr-4 hover:scale-105 ease-in duration-200 shadow-infoText/20"
//                       >
//                         {approvalStatus === 'yes' && (
//                           <button
//                             className="py-1 px-4 h-full w-full outline-none text-primaryText"
//                             disabled={fValue === 0 ? true : false}
//                             onClick={() => {
//                               setIsConfirmation(false);
//                               setApprovalStatus('pending');
//                             }}
//                           >
//                             Return
//                           </button>
//                         )}
//                         {approvalStatus === 'no' && (
//                           <button
//                             className="py-1 px-4 h-full w-full outline-none text-primaryText"
//                             disabled={fValue === 0 ? true : false}
//                             onClick={() => {
//                               setIsConfirmation(false);
//                               setApprovalStatus('pending');
//                             }}
//                           >
//                             Return
//                           </button>
//                         )}
//                         {approvalStatus === 'pending' && (
//                           <button
//                             className="py-1 px-4 h-full w-full outline-none text-primaryText"
//                             disabled={fValue === 0 ? true : false}
//                             onClick={() => {
//                               swapToken();
//                             }}
//                           >
//                             Swap Now!
//                           </button>
//                         )}
//                         {approvalStatus === 'not required' && (
//                           <button
//                             className="py-1 px-4 h-full w-full outline-none text-primaryText"
//                             disabled={fValue === 0 ? true : false}
//                             onClick={() => {
//                               setIsConfirmation(false);
//                               setApprovalStatus('pending');
//                             }}
//                           >
//                             Return
//                           </button>
//                         )}
//                       </section>
//                       <section
//                         className="py-2 mb-2 ml-4 mr-4 flex flex-row text-infoText items-center rounded-lg cursor-pointer border border-secondaryFill bg-infoFill
//                   shadow-lg"
//                       >
//                         <div className="text-xs flex flex-row justify-center items-center ml-4">
//                           Please note that Gas prices are likely to change on
//                           the network
//                         </div>
//                       </section>

//                       {isTransactionMessage ? (
//                         <section
//                           className="py-2 mb-2 ml-4 mr-4 flex flex-row text-infoText items-center rounded-lg cursor-pointer border border-secondaryFill bg-infoFill
//                   shadow-lg"
//                         >
//                           <div className="text-xs flex flex-row justify-center items-center ml-4">
//                             {transactionMessage}
//                           </div>
//                         </section>
//                       ) : null}
//                     </div>
//                   </div>
//                 </section>
//               </div>
//             </section>
//           </>
//         </Modal> */}

//             {/*
//             ====================================================================
//                 Switch Network Modals
//             ====================================================================
//             */}
//             {/* <Modal visible={isChainModalVisible}> */}

//             {/* </Modal> */}
//             {/* Swap Routing*/}
//             <Modal visible={isRouting}>
//               <section className="w-[480px] px-2 py-2 border border-secondaryFillLight rounded-xl shadow-lg mb-8">
//                 <div className="block mt-6 max-w-screen-sm overflow-scroll scrollbar-hide">
//                   <div className="w-full h-fit flex flex-col">
//                     {/* Heading */}
//                     <section className="flex flex-row  gap-[30px] mb-4 mt-4 ml-4 mr-4">
//                       {/* Back Button*/}
//                       <span
//                         className="px-1 py-1 bg-secondaryFill rounded-lg border border-transparent hover:scale-110 ease-in duration-200 shadow-gray-400 cursor-pointer"
//                         onClick={() => setIsRouting((prev) => !prev)}
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           strokeWidth="1.5"
//                           stroke="#FFFFFF"
//                           className="w-5 h-5 stroke-secondaryText hover:stroke-infoText active:fill-infoText"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             d="M15.75 19.5L8.25 12l7.5-7.5"
//                           />
//                         </svg>
//                       </span>
//                       <div className="text-primaryText w-[312px] h-[28px] flex justify-center items-center text-base">
//                         Swap Routes{' '}
//                         {swapRoutes.length < 1 && 'are not available'}
//                       </div>
//                     </section>
//                     <div className="border-b border-secondaryFill mb-3"></div>

//                     <section className="border-white/20">
//                       <div className="my-1 flex flex-col gap-4 mb-4 mt-4 ml-4 mr-4">
//                         {swapRoutes.length > 0 && (
//                           <>
//                             {swapRoutes?.map((routesArray, idx) => (
//                               <div
//                                 key={idx}
//                                 onClick={() => {
//                                   setActiveProtocols(
//                                     // routesArray ? routesArray : swapRoutes[0]
//                                     routesArray ? routesArray : swapRoutes[0]
//                                   );
//                                 }}
//                                 className="flex flex-col gap-10 "
//                               >
//                                 <span
//                                   className={`w-fit flex flex-row gap-3 px-3 py-3 rounded-lg items-center border ${
//                                     routesArray === activeProtocols
//                                       ? 'border-infoText'
//                                       : 'border-secondaryFill'
//                                   } hover:bg-infoFill hover:border-blue-300 ${
//                                     routesArray === activeProtocols
//                                       ? 'text-primaryText'
//                                       : 'text-secondaryText'
//                                   }`}
//                                 >
//                                   {/* {routesArray[0].name} */}
//                                   {routesArray?.map((route, idx) => (
//                                     <>
//                                       <div className="multi-route-path">
//                                         <span className="">
//                                           <FaDotCircle />
//                                         </span>
//                                         {routesArray.length > 1 && (
//                                           <i className="">
//                                             {' '}
//                                             <HiArrowNarrowRight />{' '}
//                                           </i>
//                                         )}
//                                       </div>
//                                       <div className="px-4 py-1 flex flex-col gap-1 items-end bg-black/20 rounded-lg">
//                                         <div
//                                           key={idx}
//                                           className="text-sm font-mono"
//                                         >
//                                           {route.name}
//                                         </div>
//                                         <div className="text-xs">
//                                           {route.part}%
//                                         </div>
//                                       </div>
//                                     </>
//                                   ))}
//                                 </span>
//                               </div>
//                             ))}
//                           </>
//                         )}
//                       </div>
//                     </section>
//                   </div>
//                 </div>
//               </section>
//             </Modal>
//           </>
//         </>
//       )}
//     </>
//   );
// };

// export default FrameSwapConnect;
