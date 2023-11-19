import axios from 'axios';
// import { toast } from 'react-toastify';
const BACKEND_URL = 'https://api.coingecko.com/api/v3/';


const fetchData = async (param) => {
  const response = await fetch(BACKEND_URL + param, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const updatedResponse = await response.json();
  return updatedResponse;
};


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

const getTokensDefiById = async (chainId) => {
  const response = await axios.get(
    `${BACKEND_URL}/token/getTokensDefiById/${chainId}`
  );
  if (response.data) {
    return response.data;
  }
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
};

export default userService;
