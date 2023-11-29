import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
//updated with defi functions
const getTokenExchangeRateSwap = async (userData) => {
  if (!userData) return;

  const response = userData;

  return response;
};

const getTransactionRateSwap = async (userData) => {
  if (!userData) return;

  const response = userData;

  return response;
};

const getChainRateSwap = async (userData) => {
  if (!userData) return;

  const response = userData;

  return response;
};

const getChainPrice = async (userData) => {
  if (!userData) return;

  const response = userData;

  return response;
};

const getSpender = async (userData) => {
  if (!userData) return;

  const response = userData;

  return response;
};

const getSwapApproval = async (userData) => {
  const response = await axios.post(
    `${BACKEND_URL}/transaction/getSwapApproval`,
    userData
  );
  return response?.data?.approveData;
};

const swap = async (userData) => {
  const response = await axios.post(
    `${BACKEND_URL}/transaction/swapOwner`,
    userData
  );
  return response?.data?.swapData;
};

const getTokensDefiById = async (chainId) => {
  const response = await axios.get(
    `${BACKEND_URL}/token/getTokensDefiById/${chainId}`
  );
  console.log({ tokensList: response?.data });
  // return response;
  return response?.data;
};

const swapService = {
  getTokenExchangeRateSwap,
  getTransactionRateSwap,
  getChainRateSwap,
  getChainPrice,
  getSpender,
  getSwapApproval,
  swap,
  getTokensDefiById,
};
export default swapService;
