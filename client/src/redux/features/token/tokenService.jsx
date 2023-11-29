import axios from 'axios';
// import { toast } from 'react-toastify';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const addToken = async (userData) => {
  const response = await axios.post(`${BACKEND_URL}/token/addToken`, userData);
  if (response.data) {
    return response.data;
  }
};

const btcExchangeRates = async () => {
  const response = await axios.get(`${BACKEND_URL}/token/btcExchangeRates`);
  if (response.data) {
    return response.data;
  }
};

const trending = async () => {
  const response = await axios.get(`${BACKEND_URL}/token/trending`);
  if (response.data) {
    return response.data;
  }
};

const globalData = async () => {
  const response = await axios.get(`${BACKEND_URL}/token/globalData`);
  if (response.data) {
    return response.data;
  }
};

const historyChart = async (userData) => {
  const response = await axios.post(
    `${BACKEND_URL}/token/historyChart`,
    userData
  );
  if (response.data) {
    return response.data;
  }
};

const getTokenList = async () => {
  const response = await axios.get(`${BACKEND_URL}/token/getTokenList`);
  if (response.data) {
    return response.data;
  }
};

const getTokenListDefi = async () => {
  const response = await axios.get(`${BACKEND_URL}/token/getTokenListDefi`);
  if (response.data) {
    return response.data;
  }
};

// const getTokensDefiById = async (chainId) => {
//   const response = await axios.get(
//     `${BACKEND_URL}/token/getTokensDefiById/${chainId}`
//   );
//   if (response.data) {
//     return response.data;
//   }
// };

const getTokensDefiById = async (userData) => {
  if (!userData) return;

  const response = userData;

  return response;
};

const getTokenListFiat = async () => {
  const response = await axios.get(`${BACKEND_URL}/token/getTokenListFiat`);
  if (response.data) {
    return response.data;
  }
};
const getTokenListBuy = async () => {
  const response = await axios.get(`${BACKEND_URL}/token/getTokenListBuy`);
  if (response.data) {
    return response.data;
  }
};

const getTokenListSell = async () => {
  const response = await axios.get(`${BACKEND_URL}/token/getTokenListSell`);
  if (response.data) {
    return response.data;
  }
};

const getTokenListExchange = async () => {
  const response = await axios.get(`${BACKEND_URL}/token/getTokenListExchange`);
  if (response.data) {
    return response.data;
  }
};

const getTokensDefiEthereum = async () => {
  const response = await axios.get(
    `${BACKEND_URL}/token/getTokensDefiEthereum`
  );
  if (response.data) {
    return response.data;
  }
};

const getTokensDefiBinance = async () => {
  const response = await axios.get(`${BACKEND_URL}/token/getTokensDefiBinance`);
  if (response.data) {
    return response.data;
  }
};

const getTokensDefiPolygon = async () => {
  const response = await axios.get(`${BACKEND_URL}/token/getTokensDefiPolygon`);
  if (response.data) {
    return response.data;
  }
};

const getTokensDefiArbitrum = async () => {
  const response = await axios.get(
    `${BACKEND_URL}/token/getTokensDefiArbitrum`
  );
  if (response.data) {
    return response.data;
  }
};

const getTokensDefiOptimism = async () => {
  const response = await axios.get(
    `${BACKEND_URL}/token/getTokensDefiOptimism`
  );
  if (response.data) {
    return response.data;
  }
};

const getTokenListStore = async () => {
  const response = await axios.get(`${BACKEND_URL}/token/getTokenListStore`);
  if (response.data) {
    return response.data;
  }
};

const userService = {
  addToken,
  btcExchangeRates,
  trending,
  globalData,
  historyChart,
  //================================================
  getTokenList,
  getTokenListDefi,
  getTokensDefiById,
  getTokenListFiat,
  getTokenListBuy,
  getTokenListSell,
  getTokenListExchange,
  getTokensDefiEthereum,
  getTokensDefiBinance,
  getTokensDefiPolygon,
  getTokensDefiArbitrum,
  getTokensDefiOptimism,
  getTokenListStore,
};

export default userService;
