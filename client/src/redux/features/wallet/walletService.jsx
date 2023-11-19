import axios from 'axios';
// import { toast } from 'react-toastify';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

//==========================={             }===============================================
//==========================={  WALLET     }===============================================
//==========================={             }===============================================

const addNewWallet = async (data) => {
  const response = await axios.post(
    BACKEND_URL + '/wallet/create-wallet',
    data
  );
  if (response.data) {
    return response.data;
  }
};

const getTokensArbitrum = async (userWalletId) => {
  const response = await axios.get(
    BACKEND_URL + `/wallet/tokens/getUserTokenArbitrum/${userWalletId}`
  );
  if (response.data) {
    return response.data;
  }
};

const getTokensAurora = async (userWalletId) => {
  const response = await axios.get(
    BACKEND_URL + `/wallet/tokens/getUserTokenAurora/${userWalletId}`
  );
  if (response.data) {
    return response.data;
  }
};

const getTokensAvalanche = async (userWalletId) => {
  const response = await axios.get(
    BACKEND_URL + `/wallet/tokens/getUserTokenAvalanche/${userWalletId}`
  );
  if (response.data) {
    return response.data;
  }
};

const getTokensBinance = async (userWalletId) => {
  const response = await axios.get(
    BACKEND_URL + `/wallet/tokens/getUserTokenBinance/${userWalletId}`
  );
  if (response.data) {
    return response.data;
  }
};

const getTokensBinanceTestnet = async (userWalletId) => {
  const response = await axios.get(
    BACKEND_URL + `/wallet/tokens/getUserTokenBinanceTestnet/${userWalletId}`
  );
  if (response.data) {
    return response.data;
  }
};

const getTokensEthereum = async (userWalletId) => {
  const response = await axios.get(
    BACKEND_URL + `/wallet/tokens/getUserTokenEthereum/${userWalletId}`
  );
  if (response.data) {
    return response.data;
  }
};

const getTokensFantom = async (userWalletId) => {
  const response = await axios.get(
    BACKEND_URL + `/wallet/tokens/getUserTokenFantom/${userWalletId}`
  );
  if (response.data) {
    return response.data;
  }
};

const getTokensGnosis = async (userWalletId) => {
  const response = await axios.get(
    BACKEND_URL + `/wallet/tokens/getUserTokenGnosis/${userWalletId}`
  );
  if (response.data) {
    return response.data;
  }
};

const getTokensGoerliEth = async (userWalletId) => {
  const response = await axios.get(
    BACKEND_URL + `/wallet/tokens/getUserTokenGoerliEth/${userWalletId}`
  );
  if (response.data) {
    return response.data;
  }
};

const getTokensKlaytn = async (userWalletId) => {
  const response = await axios.get(
    BACKEND_URL + `/wallet/tokens/getUserTokenKlaytn/${userWalletId}`
  );
  if (response.data) {
    return response.data;
  }
};
const getTokensOptimism = async (userWalletId) => {
  const response = await axios.get(
    BACKEND_URL + `/wallet/tokens/getUserTokenOptimism/${userWalletId}`
  );
  if (response.data) {
    return response.data;
  }
};

const getTokensPolygon = async (userWalletId) => {
  const response = await axios.get(
    BACKEND_URL + `/wallet/tokens/getUserTokenPolygon/${userWalletId}`
  );
  if (response.data) {
    return response.data;
  }
};

const getTokensPolygonMumbai = async (userWalletId) => {
  const response = await axios.get(
    BACKEND_URL + `/wallet/tokens/getUserTokenPolygonMumbai/${userWalletId}`
  );
  if (response.data) {
    return response.data;
  }
};

//======================{AddRemove User Tokens}===================================================
const updateTokensArbitrum = async (data) => {
  const response = await axios.post(
    BACKEND_URL + '/wallet/tokens/addUserTokenArbitrum',
    data
  );
  if (response.data) {
    return response.data;
  }
};

const updateTokensAurora = async (data) => {
  const response = await axios.post(
    BACKEND_URL + '/wallet/tokens/addUserTokenAurora',
    data
  );
  if (response.data) {
    return response.data;
  }
};

const updateTokensAvalanche = async (data) => {
  const response = await axios.post(
    BACKEND_URL + '/wallet/tokens/addUserTokenAvalanche',
    data
  );
  if (response.data) {
    return response.data;
  }
};

const updateTokensBinance = async (data) => {
  const response = await axios.post(
    BACKEND_URL + '/wallet/tokens/addUserTokenBinance',
    data
  );
  if (response.data) {
    return response.data;
  }
};

const updateTokensBinanceTestnet = async (data) => {
  const response = await axios.post(
    BACKEND_URL + '/wallet/tokens/addUserTokenBinanceTestnet',
    data
  );
  if (response.data) {
    return response.data;
  }
};

const updateTokensEthereum = async (data) => {
  const response = await axios.post(
    BACKEND_URL + '/wallet/tokens/addUserTokenEthereum',
    data
  );
  if (response.data) {
    return response.data;
  }
};

const updateTokensFantom = async (data) => {
  const response = await axios.post(
    BACKEND_URL + '/wallet/tokens/addUserTokenFantom',
    data
  );
  if (response.data) {
    return response.data;
  }
};

const updateTokensGnosis = async (data) => {
  const response = await axios.post(
    BACKEND_URL + '/wallet/tokens/addUserTokenGnosis',
    data
  );
  if (response.data) {
    return response.data;
  }
};

const updateTokensGoerliEth = async (data) => {
  const response = await axios.post(
    BACKEND_URL + '/wallet/tokens/addUserTokenGoerliEth',
    data
  );
  if (response.data) {
    return response.data;
  }
};

const updateTokensKlaytn = async (data) => {
  const response = await axios.post(
    BACKEND_URL + '/wallet/tokens/addUserTokenKlaytn',
    data
  );
  if (response.data) {
    return response.data;
  }
};
const updateTokensOptimism = async (data) => {
  const response = await axios.post(
    BACKEND_URL + '/wallet/tokens/addUserTokenOptimism',
    data
  );
  if (response.data) {
    return response.data;
  }
};

const updateTokensPolygon = async (data) => {
  const response = await axios.post(
    BACKEND_URL + '/wallet/tokens/addUserTokenPolygon',
    data
  );
  if (response.data) {
    return response.data;
  }
};

const updateTokensPolygonMumbai = async (data) => {
  const response = await axios.post(
    BACKEND_URL + '/wallet/tokens/addUserTokenBinanceTestnet',
    data
  );
  if (response.data) {
    return response.data;
  }
};

const getAllTokens = async (chainId) => {
  const response = await axios.post(
    BACKEND_URL + `/wallet/tokens-all/${chainId}`
  );
  if (response.data) {
    return response.data;
  }
};

const getEstimateGas = async (data) => {
  const response = await axios.post(
    BACKEND_URL + '/wallet/tokens/estimated-gas',
    data
  );
  if (response.data) {
    return response.data;
  }
};

const getWallets = async (userId) => {
  const response = await axios.get(
    BACKEND_URL + `/wallet/my-wallets/${userId}`
  );
  if (response.data) {
    return response.data;
  }
};

const getOneWallet = async (userId, userWalletId) => {
  const response = await axios.get(
    BACKEND_URL + `/wallet/user-wallet/${userId}/${userWalletId}`
  );
  if (response.data) {
    return response.data;
  }
};

const updateWalletAccountName = async (data) => {
  const response = await axios.patch(
    BACKEND_URL + '/wallet/updateWalletAccountName',
    data
  );
  if (response.data) {
    return response.data;
  }
};

const getUserWalletInfo = async (userId, userWalletId) => {
  const response = await axios.get(
    BACKEND_URL + `/wallet/getUserWalletInfo/${userId}/${userWalletId}`
  );
  if (response.data) {
    return response.data;
  }
};

const walletRecover = async (data) => {
  const response = await axios.post(
    BACKEND_URL + '/wallet/recover-wallet',
    data
  );
  if (response.data) {
    return response.data;
  }
};

const sendToken = async (data) => {
  const response = await axios.post(BACKEND_URL + '/wallet/send-token', data);
  if (response.data) {
    return response.data;
  }
};

//================={BALANCES}=======================================

const getBalanceArbitrum = async (userId, userWalletId) => {
  const response = await axios.get(
    BACKEND_URL + `/wallet/balances-arbitrum/${userId}/${userWalletId}`
  );
  if (response.data) {
    return response.data;
  }
};

const getBalanceAurora = async (userId, userWalletId) => {
  const response = await axios.get(
    BACKEND_URL + `/wallet/balances-aurora/${userId}/${userWalletId}`
  );
  if (response.data) {
    return response.data;
  }
};

const getBalanceAvalanche = async (userId, userWalletId) => {
  const response = await axios.get(
    BACKEND_URL + `/wallet/balances-avalanche/${userId}/${userWalletId}`
  );
  if (response.data) {
    return response.data;
  }
};

const getBalanceBinance = async (userId, userWalletId) => {
  const response = await axios.get(
    BACKEND_URL + `/wallet/balances-binance/${userId}/${userWalletId}`
  );
  if (response.data) {
    return response.data;
  }
};

const getBalanceEthereum = async (userId, userWalletId) => {
  const response = await axios.get(
    BACKEND_URL + `/wallet/balances-binance/${userId}/${userWalletId}`
  );
  if (response.data) {
    return response.data;
  }
};

const getBalanceFantom = async (userId, userWalletId) => {
  const response = await axios.get(
    BACKEND_URL + `/wallet/balances-ethereum/${userId}/${userWalletId}`
  );
  if (response.data) {
    return response.data;
  }
};

const getBalanceGnosis = async (userId, userWalletId) => {
  const response = await axios.get(
    BACKEND_URL + `/wallet/balances-fantom/${userId}/${userWalletId}`
  );
  if (response.data) {
    return response.data;
  }
};

const getBalanceKlaytn = async (userId, userWalletId) => {
  const response = await axios.get(
    BACKEND_URL + `/wallet/balances-gnosis/${userId}/${userWalletId}`
  );
  if (response.data) {
    return response.data;
  }
};

const getBalancePolygon = async (userId, userWalletId) => {
  const response = await axios.get(
    BACKEND_URL + `/wallet/balances-polygon/${userId}/${userWalletId}`
  );
  if (response.data) {
    return response.data;
  }
};

const getBalanceOptimism = async (userId, userWalletId) => {
  const response = await axios.get(
    BACKEND_URL + `/wallet/balances-klaytn/${userId}/${userWalletId}`
  );
  if (response.data) {
    return response.data;
  }
};
const getBalancePolygonMumbai = async (userId, userWalletId) => {
  const response = await axios.get(
    BACKEND_URL + `/wallet/balances-optimism/${userId}/${userWalletId}`
  );
  if (response.data) {
    return response.data;
  }
};

const getBalanceGoerliEth = async (userId, userWalletId) => {
  const response = await axios.get(
    BACKEND_URL + `/wallet/balances-goerliEth/${userId}/${userWalletId}`
  );
  if (response.data) {
    return response.data;
  }
};

const getBalanceBinanceTestnet = async (userId, userWalletId) => {
  const response = await axios.get(
    BACKEND_URL + `/wallet/balances-polygonMumbai/${userId}/${userWalletId}`
  );
  if (response.data) {
    return response.data;
  }
};

const getOneNativeBalance = async (userId, userWalletId, chainId) => {
  const response = await axios.get(
    BACKEND_URL +
      `/wallet/tokens/getOneNativeBalance/${userId}/${userWalletId}/${chainId}`
  );
  if (response.data) {
    return response.data;
  }
};

//============================={Wallet Transactions: get}=============================

// const getAllTokenBalancesWithUSDValue = async (id) => {
//   const response = await axios.get(
//     BACKEND_URL + `wallet/all-token-balances-with-usd-value/${id}`
//   );
//   if (response.data) {
//     return response.data;
//   }
// };

//============={End: Require UserId}====================================

// const getAllWalletHistory = async () => {
//   const response = await axios.get(
//     BACKEND_URL + '/wallet/history/all-wallet-history'
//   );
//   if (response.data) {
//     return response.data;
//   }
// };

// const getMyWalletHistory = async (id) => {
//   const response = await axios.get(
//     BACKEND_URL + `/wallet/history/all-my-wallet-history/${id}`
//   );
//   if (response.data) {
//     return response.data;
//   }
// };

// const getAllTransactionHistory = async () => {
//   const response = await axios.get(
//     BACKEND_URL + '/wallet/history/all-transactions-history'
//   );
//   if (response.data) {
//     return response.data;
//   }
// };

const walletService = {
  sendToken,
  addNewWallet,
  getWallets,
  walletRecover,
  getBalanceArbitrum,
  getBalanceAurora,
  getBalanceAvalanche,
  getBalanceBinance,
  getBalanceEthereum,
  getBalanceFantom,
  getBalanceGnosis,
  getBalanceKlaytn,
  getBalancePolygon,
  getBalanceOptimism,
  getBalancePolygonMumbai,
  getBalanceGoerliEth,
  getBalanceBinanceTestnet,
  getAllTokens,
  getEstimateGas,
  getOneWallet,
  updateTokensArbitrum,
  updateTokensAurora,
  updateTokensAvalanche,
  updateTokensBinance,
  updateTokensBinanceTestnet,
  updateTokensEthereum,
  updateTokensFantom,
  updateTokensGnosis,
  updateTokensGoerliEth,
  updateTokensKlaytn,
  updateTokensOptimism,
  updateTokensPolygon,
  updateTokensPolygonMumbai,
  getTokensArbitrum,
  getTokensAurora,
  getTokensAvalanche,
  getTokensBinance,
  getTokensBinanceTestnet,
  getTokensEthereum,
  getTokensFantom,
  getTokensGnosis,
  getTokensGoerliEth,
  getTokensKlaytn,
  getTokensOptimism,
  getTokensPolygon,
  getTokensPolygonMumbai,
  updateWalletAccountName,
  getUserWalletInfo,
  getOneNativeBalance,
};

export default walletService;
