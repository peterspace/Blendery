import axios from "axios";
import { toast } from "react-toastify";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


//=================={Transaction Routes}============================================================
export const createStore = async (userData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/transaction/createStore`,
      userData
    );

    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const createTransactionStore = async (userData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/transaction/createTransactionStore`,
      userData
    );

    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const getUserTransactionsByStore = async (userData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/transaction/getUserTransactionsByStore`,
      userData
    );

    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const getTokenExchangeRate = async (userData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/transaction/getTokenExchangeRate`,
      userData
    );
    console.log({ exchangeData: response.data });

    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const getTransactionRateInfo = async (userData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/transaction/getTransactionRate`,
      userData
    );
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const updateTransactionsAutomaticallyStore = async (userData) => {
  try {
    const response = await axios.patch(
      `${BACKEND_URL}/transaction/updateTransactionsAutomaticallyStore`,
      userData
    );
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const updateBlockChainTransactionStore = async (id) => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/transaction/updateBlockChainTransactionStore/${id}`
    );
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
//=============================================================================

export const getUserTransactions = async () => {
  const response = await axios.get(`${BACKEND_URL}/transaction/getUserTransactions`);
  return response.data;
};

export const getOneUserTransactionStore = async (userData) => {
  if (!userData) return;

  const response = await axios.get(
    `${BACKEND_URL}/transaction/getOneUserTransactionStore`,
    userData
  );
  return response.data;
};

export const getAllTransactionsByUserStore = async () => {
  const response = await axios.get(
    `${BACKEND_URL}/transaction/getAllTransactionsByUserStore`
  );
  return response.data;
};

export const updateOneBlockchainTransactionById = async (userData) => {
  if (!userData) return;

  if (userData?.status !== "Pending" || userData?.status !== "Paid") {
    return;
  }
  const response = await axios.patch(
    `${BACKEND_URL}/transaction/updateOneBlockchainTransactionById`,
    userData
  );
  return response.data;
};

export const getAllUserTransactionsByStore = async () => {
  const response = await axios.get(
    `${BACKEND_URL}/transaction/getAllUserTransactionsByStore`,
    userData
  );
  return response.data;
};

export const getTransactionByTxIdStore = async (txId) => {
  if (!txId) return;

  const response = await axios.get(
    `${BACKEND_URL}/transaction/getTransactionByTxIdStore/${txId}`
  );
  return response.data;
};

export const updateTransactionByIdStore = async (userData) => {
  if (!userData) return;

  const response = await axios.patch(
    `${BACKEND_URL}/transaction/updateTransactionByIdStore`,
    userData
  );
  return response.data;
};

export const getUserInactiveTransactions = async () => {
  const response = await axios.get(
    `${BACKEND_URL}/transaction/getUserInactiveTransactions`
  );
  return response.data;
};

export const getUserActiveTransactions = async () => {
  const response = await axios.get(
    `${BACKEND_URL}/transaction/getUserActiveTransactions`
  );
  return response.data;
};

//========================{Tokens}======================================

export const getTokenListFiat = async () => {
  const response = await axios.get(`${BACKEND_URL}/token/getTokenListFiat`);
  if (response.data) {
    return response.data;
  }
};
export const getTokenListStore = async () => {
  const response = await axios.get(`${BACKEND_URL}/token/getTokenListStore`);
  if (response.data) {
    return response.data;
  }
};
