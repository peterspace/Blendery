import axios from 'axios';
import { toast } from 'react-toastify';

import {
  parseEther,
  formatEther,
  parseUnits,
  formatUnits,
} from '@ethersproject/units';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

//========================{Transaction Routes}=====================================

const createTransaction = async (userData) => {
  if (!userData) return;

  const response = await axios.post(
    `${BACKEND_URL}/transaction/createTransaction`,
    userData
  );
  if (response.data?._id) {
    console.log({ newResponse: response.data });
    toast.success('transaction created Successful...');
  }
  return response.data;
};

const getUserTransactions = async () => {
  const response = await axios.get(
    `${BACKEND_URL}/transaction/getUserTransactions`
  );
  return response.data;
};

const getOneUserTransaction = async (userData) => {
  if (!userData) return;

  const response = await axios.get(
    `${BACKEND_URL}/transaction/getOneUserTransaction`,
    userData
  );
  return response.data;
};

const getAllTransactionsByUser = async () => {
  const response = await axios.get(
    `${BACKEND_URL}/transaction/getAllTransactionsByUser`
  );
  return response.data;
};

const updateTransactionsAutomatically = async (userData) => {
  if (!userData) return;

  const response = await axios.patch(
    `${BACKEND_URL}/transaction/updateTransactionsAutomatically`,
    userData
  );
  return response.data;
};

// const updateOneBlockchainTransactionById = async (userData) => {
//   if(!userData) return

//   const response = await axios.patch(
//     `${BACKEND_URL}/transaction/updateOneBlockchainTransactionById`,
//     userData
//   );
//   return response.data;
// };

const updateOneBlockchainTransactionById = async (userData) => {
  if (!userData) return;

  if (userData?.status !== 'Pending' || userData?.status !== 'Paid') {
    return;
  }
  const response = await axios.patch(
    `${BACKEND_URL}/transaction/updateOneBlockchainTransactionById`,
    userData
  );
  return response.data;
};

const getAllTransactions = async (userData) => {
  if (!userData) return;

  const response = await axios.get(
    `${BACKEND_URL}/transaction/getAllTransactions`,
    userData
  );
  return response.data;
};

const getTransactionByTxId = async (txId) => {
  if (!txId) return;

  const response = await axios.get(
    `${BACKEND_URL}/transaction/getTransactionByTxId/${txId}`
  );
  return response.data;
};

// const getTransactionByTxIdInternal = async (userData) => {
//   if (!userData) return;

//   const response = userData
//   return response;
// };

const getTransactionByTxIdInternal = async (userData) => {
  const response = userData;
  return response;
};

const updateTransactionById = async (userData) => {
  if (!userData) return;
  console.log({ buycashDataIn: userData });
  const response = await axios.patch(
    `${BACKEND_URL}/transaction/updateTransactionById`,
    userData
  );
  console.log({ buycashDataOut: response.data });

  return response.data;
};

const getUserInactiveTransactions = async () => {
  const response = await axios.get(
    `${BACKEND_URL}/transaction/getUserInactiveTransactions`
  );
  return response.data;
};

const getUserActiveTransactions = async () => {
  const response = await axios.get(
    `${BACKEND_URL}/transaction/getUserActiveTransactions`
  );
  return response.data;
};

const getManagerActiveTransactions = async () => {
  const response = await axios.get(
    `${BACKEND_URL}/transaction/getManagerActiveTransactions`
  );
  return response.data;
};

const orderConfirmation = async (userData) => {
  if (!userData) return;

  const response = await axios.post(
    `${BACKEND_URL}/transaction/orderConfirmation`,
    userData
  );
  if (response.data) {
    toast.success('payment successful');
  }

  return response.data;
};

const orderCompleted = async (userData) => {
  if (!userData) return;

  const response = await axios.post(
    `${BACKEND_URL}/transaction/orderCompleted`,
    userData
  );

  return response.data;
};

const getTransactionRate = async (userData) => {
  if (!userData) return;

  const response = userData;

  return response;
};

const getTransactionRate2 = async (userData) => {
  if (!userData) return;

  const response = await axios.post(
    `${BACKEND_URL}/transaction/getTransactionRate`,
    userData
  );

  return response.data;
};
//  console.log({transactionData: response})
//============={updated transactions rate}=============================================
const getTransactionRate1 = async (userData) => {
  const {
    fToken,
    fromPriceData,
    tToken,
    toPriceData,
    fValue,
    service,
    subService,
  } = userData;

  if (service === 'defi' && subService === 'defi') {
    const fUSDPrice = Number(fromPriceData?.usd); // usd price
    const tUSDPrice = Number(toPriceData?.usd); // usd price

    let exchangeRate = 1 * (fUSDPrice / tUSDPrice); //fToken?.symbol/tToken.symbol

    let tValue = Number(fValue) * exchangeRate;

    const serviceFee = (0.25 / 100) * Number(fValue); // 0.25%

    // const networkFees = await getTxFees(txData) // from the blockchain
    const networkFee = (0.25 / 100) * Number(fValue); // should be from the blockchain

    const youSend = Number(fValue);

    const youGet = Number(fValue) - (serviceFee + networkFee);
    const { amount, estimatedGas } = await getTokenAmount(fToken, fValue);

    const tValueFormatted = Number(tValue).toFixed(3);

    const response = {
      youSend,
      youGet,
      serviceFee,
      networkFee,
      exchangeRate: exchangeRate.toFixed(3),
      tValue,
      tValueFormatted,
      amount,
      estimatedGas,
    };

    return response;
  }
  if (service === 'buy' && subService === 'buyCash') {
    // const fUSDPrice = Number(fToken?.value); // usd price // fiat currency
    // const tUSDPrice = Number(toPriceData?.usd); // usd price // crypto currency

    // let exchangeRate = 1 * (fUSDPrice / tUSDPrice); //fToken?.symbol/tToken.symbol

    let exchangeRate;
    if (fToken?.symbol === 'usd') {
      exchangeRate = Number(toPriceData?.usd);
    }
    if (fToken?.symbol === 'gbp') {
      exchangeRate = Number(toPriceData?.gbp);
    }
    if (fToken?.symbol === 'eur') {
      exchangeRate = Number(toPriceData?.eur);
    }
    if (fToken?.symbol === 'rub') {
      exchangeRate = Number(toPriceData?.rub);
    }
    if (fToken?.symbol === 'cad') {
      exchangeRate = Number(toPriceData?.cad);
    }
    if (fToken?.symbol === 'aed') {
      exchangeRate = Number(toPriceData?.aed);
    }
    if (fToken?.symbol === 'jpy') {
      exchangeRate = Number(toPriceData?.jpy);
    }
    if (fToken?.symbol === 'ngn') {
      exchangeRate = Number(toPriceData?.ngn);
    }
    if (fToken?.symbol === 'php') {
      exchangeRate = Number(toPriceData?.php);
    }
    if (fToken?.symbol === 'chf') {
      exchangeRate = Number(toPriceData?.chf);
    }
    if (fToken?.symbol === 'aud') {
      exchangeRate = Number(toPriceData?.aud);
    }

    let tValue = Number(fValue) / exchangeRate;

    const serviceFee = (0.25 / 100) * Number(fValue); // 0.25%

    // const networkFees = await getTxFees(txData) // from the blockchain
    const networkFee = (0.25 / 100) * Number(fValue); // should be from the blockchain

    const youSend = Number(fValue);

    const youGet = Number(fValue) - (serviceFee + networkFee);
    const { amount, estimatedGas } = await getTokenAmount(
      tToken,
      tValue.toString()
    );

    const tValueFormatted = Number(tValue).toFixed(3);
    const response = {
      youSend,
      youGet,
      serviceFee,
      networkFee,
      exchangeRate,
      tValue,
      tValueFormatted,
      amount,
      estimatedGas,
    };

    return response;
  }
  if (service === 'buy' && subService === 'buyCard') {
    // const fUSDPrice = Number(fToken?.value); // usd price // fiat currency
    // const tUSDPrice = Number(toPriceData?.usd); // usd price // crypto currency

    // // const priceRatio = 1 * (tUSDPrice / fUSDPrice); //fToken?.symbol/tToken.symbol
    // let exchangeRate = 1 * (fUSDPrice / tUSDPrice); //fToken?.symbol/tToken.symbol

    let exchangeRate;
    if (fToken?.symbol === 'usd') {
      exchangeRate = Number(toPriceData?.usd);
    }
    if (fToken?.symbol === 'gbp') {
      exchangeRate = Number(toPriceData?.gbp);
    }
    if (fToken?.symbol === 'eur') {
      exchangeRate = Number(toPriceData?.eur);
    }
    if (fToken?.symbol === 'rub') {
      exchangeRate = Number(toPriceData?.rub);
    }
    if (fToken?.symbol === 'cad') {
      exchangeRate = Number(toPriceData?.cad);
    }
    if (fToken?.symbol === 'aed') {
      exchangeRate = Number(toPriceData?.aed);
    }
    if (fToken?.symbol === 'jpy') {
      exchangeRate = Number(toPriceData?.jpy);
    }
    if (fToken?.symbol === 'ngn') {
      exchangeRate = Number(toPriceData?.ngn);
    }
    if (fToken?.symbol === 'php') {
      exchangeRate = Number(toPriceData?.php);
    }
    if (fToken?.symbol === 'chf') {
      exchangeRate = Number(toPriceData?.chf);
    }
    if (fToken?.symbol === 'aud') {
      exchangeRate = Number(toPriceData?.aud);
    }

    let tValue = Number(fValue) / exchangeRate;

    // const networkFees = await getTxFees(txData) // from the blockchain
    const processingFee = (1 / 100) * Number(fValue); // (1%) should be from the blockchain

    const youSend = Number(fValue);

    const youGet = Number(fValue) - processingFee;
    //============================={TODO}=====================================
    const { amount, estimatedGas } = await getTokenAmount(
      tToken,
      tValue.toString()
    );
    const tValueFormatted = Number(tValue).toFixed(3);

    const response = {
      youSend,
      youGet,
      processingFee,
      exchangeRate,
      tValue,
      tValueFormatted,
      amount,
      estimatedGas,
    };

    return response;
  }
  if (service === 'sell' && subService === 'sellCash') {
    // const fUSDPrice = Number(fromPriceData?.usd); // usd price // crypto currency
    // const tUSDPrice = Number(tToken?.value); // usd price // fiat currency

    // let exchangeRate = 1 * (fUSDPrice / tUSDPrice); //fToken?.symbol/tToken.symbol

    let exchangeRate;
    if (tToken?.symbol === 'usd') {
      exchangeRate = Number(fromPriceData?.usd);
    }
    if (tToken?.symbol === 'gbp') {
      exchangeRate = Number(fromPriceData?.gbp);
    }
    if (tToken?.symbol === 'eur') {
      exchangeRate = Number(fromPriceData?.eur);
    }
    if (tToken?.symbol === 'rub') {
      exchangeRate = Number(fromPriceData?.rub);
    }
    if (tToken?.symbol === 'cad') {
      exchangeRate = Number(fromPriceData?.cad);
    }
    if (tToken?.symbol === 'aed') {
      exchangeRate = Number(fromPriceData?.aed);
    }
    if (tToken?.symbol === 'jpy') {
      exchangeRate = Number(fromPriceData?.jpy);
    }
    if (tToken?.symbol === 'ngn') {
      exchangeRate = Number(fromPriceData?.ngn);
    }
    if (tToken?.symbol === 'php') {
      exchangeRate = Number(fromPriceData?.php);
    }
    if (tToken?.symbol === 'chf') {
      exchangeRate = Number(fromPriceData?.chf);
    }
    if (tToken?.symbol === 'aud') {
      exchangeRate = Number(fromPriceData?.aud);
    }

    let tValue = Number(fValue) * exchangeRate;

    const serviceFee = (0.25 / 100) * Number(fValue); // 0.25%

    // const networkFees = await getTxFees(txData) // from the blockchain
    const networkFee = (0.25 / 100) * Number(fValue); // should be from the blockchain

    const youSend = Number(fValue);

    const youGet = Number(fValue) - (serviceFee + networkFee);
    const { amount, estimatedGas } = await getTokenAmount(fToken, fValue);

    const tValueFormatted = Number(tValue).toFixed(3);

    const response = {
      youSend,
      youGet,
      serviceFee,
      networkFee,
      exchangeRate: exchangeRate.toFixed(3),
      tValue,
      tValueFormatted,
      amount,
      estimatedGas,
    };

    return response;
  }
  if (service === 'sell' && subService === 'sellCard') {
    // const fUSDPrice = Number(fromPriceData?.usd); // usd price // crypto currency
    // const tUSDPrice = Number(tToken?.value); // usd price // fiat currency

    // let exchangeRate = 1 * (fUSDPrice / tUSDPrice); //fToken?.symbol/tToken.symbol

    let exchangeRate;
    if (tToken?.symbol === 'usd') {
      exchangeRate = Number(fromPriceData?.usd);
    }
    if (tToken?.symbol === 'gbp') {
      exchangeRate = Number(fromPriceData?.gbp);
    }
    if (tToken?.symbol === 'eur') {
      exchangeRate = Number(fromPriceData?.eur);
    }
    if (tToken?.symbol === 'rub') {
      exchangeRate = Number(fromPriceData?.rub);
    }
    if (tToken?.symbol === 'cad') {
      exchangeRate = Number(fromPriceData?.cad);
    }
    if (tToken?.symbol === 'aed') {
      exchangeRate = Number(fromPriceData?.aed);
    }
    if (tToken?.symbol === 'jpy') {
      exchangeRate = Number(fromPriceData?.jpy);
    }
    if (tToken?.symbol === 'ngn') {
      exchangeRate = Number(fromPriceData?.ngn);
    }
    if (tToken?.symbol === 'php') {
      exchangeRate = Number(fromPriceData?.php);
    }
    if (tToken?.symbol === 'chf') {
      exchangeRate = Number(fromPriceData?.chf);
    }
    if (tToken?.symbol === 'aud') {
      exchangeRate = Number(fromPriceData?.aud);
    }

    let tValue = Number(fValue) * exchangeRate;

    const serviceFee = (0.25 / 100) * Number(fValue); // 0.25%

    // const networkFees = await getTxFees(txData) // from the blockchain
    const networkFee = (0.25 / 100) * Number(fValue); // should be from the blockchain
    const processingFee = (1 / 100) * Number(fValue); // (1%) should be from the blockchain

    const youSend = Number(fValue);

    const youGet = Number(fValue) - (serviceFee + networkFee);
    const { amount, estimatedGas } = await getTokenAmount(fToken, fValue);

    const tValueFormatted = Number(tValue).toFixed(3);

    const response = {
      youSend,
      youGet,
      serviceFee,
      networkFee,
      processingFee,
      exchangeRate: exchangeRate.toFixed(3),
      tValue,
      tValueFormatted,
      amount,
      estimatedGas,
    };

    return response;
  }
  if (service === 'exchange' && subService === 'exchange') {
    const fUSDPrice = Number(fromPriceData?.usd); // usd price
    const tUSDPrice = Number(toPriceData?.usd); // usd price

    let exchangeRate = 1 * (fUSDPrice / tUSDPrice); //fToken?.symbol/tToken.symbol

    let tValue = Number(fValue) * exchangeRate;

    const serviceFee = (0.25 / 100) * Number(fValue); // 0.25%

    // const networkFees = await getTxFees(txData) // from the blockchain
    const networkFee = (0.25 / 100) * Number(fValue); // should be from the blockchain

    const youSend = Number(fValue);

    const youGet = Number(fValue) - (serviceFee + networkFee);
    const { amount, estimatedGas } = await getTokenAmount(fToken, fValue);

    const tValueFormatted = Number(tValue).toFixed(3);

    const response = {
      youSend,
      youGet,
      serviceFee,
      networkFee,
      exchangeRate: exchangeRate.toFixed(3),
      tValue,
      tValueFormatted,
      amount,
      estimatedGas,
    };

    return response;
  }
};

const getTokenAmount = async (token, value) => {
  let amount; // fValue formatted to transaction decimals
  let amountFixed;
  let estimatedGas; // to be completed
  if (token?.chain === 'Bitcoin') {
    const satoshiToSend = Number(value) * 1e8; // check || 1e9
    amount = satoshiToSend;
  }

  if (token?.chain === 'Ethereum') {
    // amount = ethers.utils.parseUnits(value.toString(), Number(token?.decimals)); // Example: 1 ETH or 1 token (adjust as needed)
    amount = parseUnits(
      value.toString(),
      token?.decimals.toString()
    ).toString(); // Gives fully formatted value and not hex value

    // amountFixed = Number(amount).toFixed(3);
  }

  if (token?.chain === 'Tron') {
    // Amount in SUN (TRX)
    // const amount = 1000000; // Example: 1 TRX or 1,000,000 SUN (adjust as needed)
    const amountInSUN = Number(value) * 1e6;

    amount = amountInSUN;
  }

  // amountFixed = Number(amount).toFixed(3);

  const response = {
    amount,
    // estimatedGas,
    estimatedGas: 0.001, // testing
    // amountFixed,
  };

  // console.log({ response: response });
  return response;
};

//============{transactions by services and subservices}============

const getUserExchange = async () => {
  const response = await axios.get(
    `${BACKEND_URL}/transaction/getUserExchange`
  );
  return response.data;
};

const getUserDefi = async () => {
  const response = await axios.get(`${BACKEND_URL}/transaction/getUserDefi`);
  return response.data;
};

const getUserBuyCash = async () => {
  const response = await axios.get(`${BACKEND_URL}/transaction/getUserBuyCash`);
  return response.data;
};

const getUserBuyCard = async () => {
  const response = await axios.get(`${BACKEND_URL}/transaction/getUserBuyCard`);
  return response.data;
};

const getUserSellCash = async () => {
  const response = await axios.get(
    `${BACKEND_URL}/transaction/getUserSellCash`
  );
  return response.data;
};

const getUserSellCard = async () => {
  const response = await axios.get(
    `${BACKEND_URL}/transaction/getUserSellCard`
  );
  return response.data;
};

const getTokenPriceData = async (id) => {
  const response = await axios.get(
    `${BACKEND_URL}/transaction/getTokenPriceData/${id}`
  );

  return response.data;
};

const getTokenPriceDataFrom = async (id) => {
  if (!id) return;

  const response = await axios.get(
    `${BACKEND_URL}/transaction/getTokenPriceData/${id}`
  );

  return response.data;
};

const getTokenPriceDataTo = async (id) => {
  if (!id) return;

  const response = await axios.get(
    `${BACKEND_URL}/transaction/getTokenPriceData/${id}`
  );

  return response.data;
};

const updateBlockChainTransaction = async (id) => {
  if (!id) return;

  const response = await axios.get(
    `${BACKEND_URL}/transaction/updateBlockChainTransaction/${id}`
  );

  return response.data;
};
//============{Admin: transactions by services and subservices}============

const getAdminExchange = async () => {
  const response = await axios.get(
    `${BACKEND_URL}/transaction/getAdminExchange`
  );
  return response.data;
};

const getAdminDefi = async () => {
  const response = await axios.get(`${BACKEND_URL}/transaction/getAdminDefi`);
  return response.data;
};

const getAdminBuyCash = async () => {
  const response = await axios.get(
    `${BACKEND_URL}/transaction/getAdminBuyCash`
  );
  return response.data;
};

const getAdminBuyCard = async () => {
  const response = await axios.get(
    `${BACKEND_URL}/transaction/getAdminBuyCard`
  );
  return response.data;
};

const getAdminSellCash = async () => {
  const response = await axios.get(
    `${BACKEND_URL}/transaction/getAdminSellCash`
  );
  return response.data;
};

const getAdminSellCard = async () => {
  const response = await axios.get(
    `${BACKEND_URL}/transaction/getAdminSellCard`
  );
  return response.data;
};

const transactionService = {
  createTransaction,
  getUserTransactions,
  getOneUserTransaction,
  updateTransactionsAutomatically,
  getAllTransactionsByUser,
  getAllTransactions,
  getTransactionByTxId,
  getTransactionByTxIdInternal,
  updateTransactionById,
  getUserInactiveTransactions,
  getUserActiveTransactions,
  getManagerActiveTransactions,
  orderConfirmation,
  orderCompleted,
  getTransactionRate,
  //============{transactions by services and subservices}============
  getUserExchange,
  getUserDefi,
  getUserBuyCash,
  getUserBuyCard,
  getUserSellCash,
  getUserSellCard,
  getTokenPriceData,
  updateBlockChainTransaction,
  getTokenPriceDataFrom,
  getTokenPriceDataTo,
  //============{Admin: transactions by services and subservices}============
  getAdminExchange,
  getAdminDefi,
  getAdminBuyCash,
  getAdminBuyCard,
  getAdminSellCash,
  getAdminSellCard,
  updateOneBlockchainTransactionById,
};

export default transactionService;
