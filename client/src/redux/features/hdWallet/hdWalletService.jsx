import axios from 'axios';
// import { toast } from 'react-toastify';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const addBitcoinHDWallet = async (userData) => {
  const response = await axios.post(
    `${BACKEND_URL}/hdWallet/addBitcoinHDWallet`,
    userData
  );
  if (response.data) {
    return response.data;
  }
};

const addEVMHDWallet = async (userData) => {
  const response = await axios.post(
    `${BACKEND_URL}/hdWallet/addEVMHDWallet`,
    userData
  );
  if (response.data) {
    return response.data;
  }
};

const addTronHDWallet = async (userData) => {
  const response = await axios.post(
    `${BACKEND_URL}/hdWallet/addTronHDWallet`,
    userData
  );
  if (response.data) {
    return response.data;
  }
};

const addNewWallet = async (userData) => {
  const response = await axios.post(
    `${BACKEND_URL}/hdWallet/addNewWallet`,
    userData
  );
  if (response.data) {
    return response.data;
  }
};

const walletLogin = async (userData) => {
  const response = await axios.post(
    `${BACKEND_URL}/hdWallet/walletLogin`,
    userData
  );
  if (response.data) {
    return response.data;
  }
};

const updateBitcoinWallet = async (userData) => {
  const response = await axios.patch(
    `${BACKEND_URL}/hdWallet/updateBitcoinWallet`,
    userData
  );
  if (response.data) {
    return response.data;
  }
};

const updateBitcoinHDWallet = async (userData) => {
  const response = await axios.patch(
    `${BACKEND_URL}/hdWallet/updateBitcoinHDWallet`,
    userData
  );
  if (response.data) {
    return response.data;
  }
};

const updateEVMWallet = async (userData) => {
  const response = await axios.patch(
    `${BACKEND_URL}/hdWallet/updateEVMWallet`,
    userData
  );
  if (response.data) {
    return response.data;
  }
};

const updateEVMHDWallet = async (userData) => {
  const response = await axios.patch(
    `${BACKEND_URL}/hdWallet/updateEVMHDWallet`,
    userData
  );
  if (response.data) {
    return response.data;
  }
};

const updateTronWallet = async (userData) => {
  const response = await axios.patch(
    `${BACKEND_URL}/hdWallet/updateTronWallet`,
    userData
  );
  if (response.data) {
    return response.data;
  }
};

const updateTronHDWallet = async (userData) => {
  const response = await axios.patch(
    `${BACKEND_URL}/hdWallet/updateTronHDWallet`,
    userData
  );
  if (response.data) {
    return response.data;
  }
};

const getWallets = async (userId) => {
  const response = await axios.get(
    `${BACKEND_URL}/hdWallet/getWallets/${userId}`
  );
  if (response.data) {
    return response.data;
  }
};

const getAllWalletsById = async (userId, userWalletId) => {
  const response = await axios.get(
    `${BACKEND_URL}/hdWallet/getAllWalletsById/${userId}/${userWalletId}`
  );
  if (response.data) {
    return response.data;
  }
};

const getOneWallet = async (userId, userWalletId) => {
  const response = await axios.get(
    `${BACKEND_URL}/hdWallet/getOneWallet/${userId}/${userWalletId}`
  );
  if (response.data) {
    return response.data;
  }
};

const walletRecover = async (userData) => {
  const response = await axios.post(
    `${BACKEND_URL}/hdWallet/walletRecover`,
    userData
  );
  if (response.data) {
    return response.data;
  }
};

const walletRecover2 = async (userData) => {
  const response = await axios.post(
    `${BACKEND_URL}/hdWallet/walletRecover2`,
    userData
  );
  if (response.data) {
    return response.data;
  }
};

const getBalance = async (address, userNetwork) => {
  const response = await axios.get(
    `${BACKEND_URL}/hdWallet/getBalance/${address}/${userNetwork}`
  );
  if (response.data) {
    return response.data;
  }
};

const createHDWalletOrder2 = async (userData) => {
  const response = await axios.post(
    `${BACKEND_URL}/hdWallet/createHDWalletOrder2`,
    userData
  );
  if (response.data) {
    return response.data;
  }
};

const sendBitcoinWallet = async (userData) => {
  const response = await axios.post(
    `${BACKEND_URL}/hdWallet/sendBitcoinWallet`,
    userData
  );
  if (response.data) {
    return response.data;
  }
};

const sendEVMWallet = async (userData) => {
  const response = await axios.post(
    `${BACKEND_URL}/hdWallet/sendEVMWallet`,
    userData
  );
  if (response.data) {
    return response.data;
  }
};

const sendTronWallet = async (userData) => {
  const response = await axios.post(
    `${BACKEND_URL}/hdWallet/sendTronWallet`,
    userData
  );
  if (response.data) {
    return response.data;
  }
};

const getTransactionByTxId = async (txId) => {
  const response = await axios.get(
    `${BACKEND_URL}/hdWallet/getTransactionByTxId/${txId}`
  );
  if (response.data) {
    return response.data;
  }
};

const hdWalletService = {
  addBitcoinHDWallet,
  addEVMHDWallet,
  addTronHDWallet,
  addNewWallet,
  walletLogin,
  updateBitcoinWallet,
  updateBitcoinHDWallet,
  updateEVMWallet,
  updateEVMHDWallet,
  updateTronWallet,
  updateTronHDWallet,
  getWallets,
  getAllWalletsById,
  getOneWallet,
  walletRecover,
  walletRecover2,
  getBalance,
  createHDWalletOrder2,
  sendBitcoinWallet,
  sendEVMWallet,
  sendTronWallet,
  getTransactionByTxId,
};

export default hdWalletService;
