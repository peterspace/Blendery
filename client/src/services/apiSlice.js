import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


//==========================={                    }===============================================
//==========================={  Chains            }===============================================
//==========================={                    }===============================================

async function GetChainsArbitrum() {
  try {
    const response = await axios.get(BACKEND_URL + '/chainsArbitrum');
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function GetChainsAurora() {
  try {
    const response = await axios.get(BACKEND_URL + '/chainsAurora');
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function GetChainsAvalanche() {
  try {
    const response = await axios.get(BACKEND_URL + '/chainsAvalanche');
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function GetChainsBinance() {
  try {
    const response = await axios.get(BACKEND_URL + '/chainsBinance');
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function GetChainsBinanceTestnet() {
  try {
    const response = await axios.get(BACKEND_URL + '/chainsBinanceTestnet');
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function GetChainsEthereum() {
  try {
    const response = await axios.get(BACKEND_URL + '/chainsEthereum');
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function GetChainsFantom() {
  try {
    const response = await axios.get(BACKEND_URL + '/chainsFantom');
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function GetChainsGnosis() {
  try {
    const response = await axios.get(BACKEND_URL + '/chainsGnosis');
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function GetChainsGoerliEth() {
  try {
    const response = await axios.get(BACKEND_URL + '/chainsGoerliEth');
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function GetChainsKlaytn() {
  try {
    const response = await axios.get(BACKEND_URL + '/chainsKlaytn');
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}
async function GetChainsOptimism() {
  try {
    const response = await axios.get(BACKEND_URL + '/chainsOptimism');
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function GetChainsPolygon() {
  try {
    const response = await axios.get(BACKEND_URL + '/chainsPolygon');
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function GetChainsPolygonMumbai() {
  try {
    const response = await axios.get(BACKEND_URL + '/chainsPolygonMumbai');
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

//==========================={            }===============================================
//==========================={  NETWORK   }===============================================
//==========================={            }===============================================

//check api route
async function goConnect(data) {
  try {
    const response = await axios.post(BACKEND_URL + '/connect', data);
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function signMessage(data) {
  try {
    const response = await axios.post(BACKEND_URL + '/connect', data);
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}
//==========================={          }===============================================
//==========================={  SWAP    }===============================================
//==========================={          }===============================================

//TODO: Add Swap History with tag(Swap)

async function getSwapQuote(data) {
  try {
    const response = await axios.get(BACKEND_URL + '/swap', data);
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function swapTokenToOwnAddress(data) {
  try {
    const response = await axios.post(BACKEND_URL + '/swap/swap-to-owner', data);
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function swapTokenToReceiver(data) {
  try {
    const response = await axios.post(BACKEND_URL + '/swap/swap-to-receiver', data);
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

//==========================={             }===============================================
//==========================={  WALLET     }===============================================
//==========================={             }===============================================

async function addNewWallet(data) {
  try {
    const response = await axios.post(BACKEND_URL + '/wallet/create-wallet', data);
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function GetTokensArbitrum(userWalletId) {
  try {
    const response = await axios.get(
      BACKEND_URL + `/wallet/tokens/getUserTokenArbitrum/${userWalletId}`
    );
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function GetTokensAurora(userWalletId) {
  try {
    const response = await axios.get(
      BACKEND_URL + `/wallet/tokens/getUserTokenAurora/${userWalletId}`
    );
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function GetTokensAvalanche(userWalletId) {
  try {
    const response = await axios.get(
      BACKEND_URL + `/wallet/tokens/getUserTokenAvalanche/${userWalletId}`
    );
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function GetTokensBinance(userWalletId) {
  try {
    const response = await axios.get(
      BACKEND_URL + `/wallet/tokens/getUserTokenBinance/${userWalletId}`
    );
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function GetTokensBinanceTestnet(userWalletId) {
  try {
    const response = await axios.get(
      BACKEND_URL + `/wallet/tokens/getUserTokenBinanceTestnet/${userWalletId}`
    );
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function GetTokensEthereum(userWalletId) {
  try {
    const response = await axios.get(
      BACKEND_URL + `/wallet/tokens/getUserTokenEthereum/${userWalletId}`
    );
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function GetTokensFantom(userWalletId) {
  try {
    const response = await axios.get(
      BACKEND_URL + `/wallet/tokens/getUserTokenFantom/${userWalletId}`
    );
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function GetTokensGnosis(userWalletId) {
  try {
    const response = await axios.get(
      BACKEND_URL + `/wallet/tokens/getUserTokenGnosis/${userWalletId}`
    );
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function GetTokensGoerliEth(userWalletId) {
  try {
    const response = await axios.get(
      BACKEND_URL + `/wallet/tokens/getUserTokenGoerliEth/${userWalletId}`
    );
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function GetTokensKlaytn(userWalletId) {
  try {
    const response = await axios.get(
      BACKEND_URL + `/wallet/tokens/getUserTokenKlaytn/${userWalletId}`
    );
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}
async function GetTokensOptimism(userWalletId) {
  try {
    const response = await axios.get(
      BACKEND_URL + `/wallet/tokens/getUserTokenOptimism/${userWalletId}`
    );
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function GetTokensPolygon(userWalletId) {
  try {
    const response = await axios.get(
      BACKEND_URL + `/wallet/tokens/getUserTokenPolygon/${userWalletId}`
    );
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function GetTokensPolygonMumbai(userWalletId) {
  try {
    const response = await axios.get(
      BACKEND_URL + `/wallet/tokens/getUserTokenPolygonMumbai/${userWalletId}`
    );
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

//======================{AddRemove User Tokens}===================================================
async function UpdateTokensArbitrum(data) {
  try {
    const response = await axios.post(
      BACKEND_URL + '/wallet/tokens/addUserTokenArbitrum',
      data
    );
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function UpdateTokensAurora(data) {
  try {
    const response = await axios.post(
      BACKEND_URL + '/wallet/tokens/addUserTokenAurora',
      data
    );
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function UpdateTokensAvalanche(data) {
  try {
    const response = await axios.post(
      BACKEND_URL + '/wallet/tokens/addUserTokenAvalanche',
      data
    );
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function UpdateTokensBinance(data) {
  try {
    const response = await axios.post(
      BACKEND_URL + '/wallet/tokens/addUserTokenBinance',
      data
    );
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function UpdateTokensBinanceTestnet(data) {
  try {
    const response = await axios.post(
      BACKEND_URL + '/wallet/tokens/addUserTokenBinanceTestnet',
      data
    );
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function UpdateTokensEthereum(data) {
  try {
    const response = await axios.post(
      BACKEND_URL + '/wallet/tokens/addUserTokenEthereum',
      data
    );
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function UpdateTokensFantom(data) {
  try {
    const response = await axios.post(
      BACKEND_URL + '/wallet/tokens/addUserTokenFantom',
      data
    );
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function UpdateTokensGnosis(data) {
  try {
    const response = await axios.post(
      BACKEND_URL + '/wallet/tokens/addUserTokenGnosis',
      data
    );
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function UpdateTokensGoerliEth(data) {
  try {
    const response = await axios.post(
      BACKEND_URL + '/wallet/tokens/addUserTokenGoerliEth',
      data
    );
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function UpdateTokensKlaytn(data) {
  try {
    const response = await axios.post(
      BACKEND_URL + '/wallet/tokens/addUserTokenKlaytn',
      data
    );
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}
async function UpdateTokensOptimism(data) {
  try {
    const response = await axios.post(
      BACKEND_URL + '/wallet/tokens/addUserTokenOptimism',
      data
    );
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function UpdateTokensPolygon(data) {
  try {
    const response = await axios.post(
      BACKEND_URL + '/wallet/tokens/addUserTokenPolygon',
      data
    );
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function UpdateTokensPolygonMumbai(data) {
  try {
    const response = await axios.post(
      BACKEND_URL + '/wallet/tokens/addUserTokenBinanceTestnet',
      data
    );
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function getAllTokens(chainId) {
  try {
    const response = await axios.post(
      BACKEND_URL + `/wallet/tokens-all/${chainId}`
    );
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function getAllUserTokens(data) {
  try {
    const response = await axios.get(BACKEND_URL + '/wallet/tokens-user');
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function GetEstimateGas(data) {
  try {
    const response = await axios.post(
      BACKEND_URL + '/wallet/tokens/estimated-gas',
      data
    );
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function GetWallets(userId) {
  try {
    const response = await axios.get(BACKEND_URL + `/wallet/my-wallets/${userId}`);
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function GetOneWallet({userId, userWalletId}) {
  try {
    const response = await axios.get(
      BACKEND_URL + `/wallet/user-wallet/${userId}/${userWalletId}`
    );
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function UpdateWalletAccountName(data) {
  try {
    const response = await axios.patch(
      BACKEND_URL + '/wallet/updateWalletAccountName',
      data
    );
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function GetUserWalletInfo(userId, userWalletId) {
  try {
    const response = await axios.get(
      BACKEND_URL + `/wallet/getUserWalletInfo/${userId}/${userWalletId}`
    );
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function walletRecover(data) {
  try {
    const response = await axios.post(BACKEND_URL + '/wallet/recover-wallet', data);
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function SendToken(data) {
  try {
    const response = await axios.post(BACKEND_URL + '/wallet/send-token', data);
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function addUserTokens(data) {
  try {
    const response = await axios.post(BACKEND_URL + '/wallet/add-token', data);
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

//================={BALANCES}=======================================

async function GetBalanceArbitrum(userId, userWalletId) {
  try {
    const response = await axios.get(
      BACKEND_URL + `/wallet/balances-arbitrum/${userId}/${userWalletId}`
    );
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function GetBalanceAurora(userId, userWalletId) {
  try {
    const response = await axios.get(
      BACKEND_URL + `/wallet/balances-aurora/${userId}/${userWalletId}`
    );
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function GetBalanceAvalanche(userId, userWalletId) {
  try {
    const response = await axios.get(
      BACKEND_URL + `/wallet/balances-avalanche/${userId}/${userWalletId}`
    );
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function GetBalanceBinance(userId, userWalletId) {
  try {
    const response = await axios.get(
      BACKEND_URL + `/wallet/balances-binance/${userId}/${userWalletId}`
    );
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function GetBalanceEthereum(userId, userWalletId) {
  try {
    const response = await axios.get(
      BACKEND_URL + `/wallet/balances-binance/${userId}/${userWalletId}`
    );
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function GetBalanceFantom(userId, userWalletId) {
  try {
    const response = await axios.get(
      BACKEND_URL + `/wallet/balances-ethereum/${userId}/${userWalletId}`
    );
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function GetBalanceGnosis(userId, userWalletId) {
  try {
    const response = await axios.get(
      BACKEND_URL + `/wallet/balances-fantom/${userId}/${userWalletId}`
    );
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function GetBalanceKlaytn(userId, userWalletId) {
  try {
    const response = await axios.get(
      BACKEND_URL + `/wallet/balances-gnosis/${userId}/${userWalletId}`
    );
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function GetBalancePolygon(userId, userWalletId) {
  try {
    const response = await axios.get(
      BACKEND_URL + `/wallet/balances-polygon/${userId}/${userWalletId}`
    );
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function GetBalanceOptimism(userId, userWalletId) {
  try {
    const response = await axios.get(
      BACKEND_URL + `/wallet/balances-klaytn/${userId}/${userWalletId}`
    );
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}
async function GetBalancePolygonMumbai(userId, userWalletId) {
  try {
    const response = await axios.get(
      BACKEND_URL + `/wallet/balances-optimism/${userId}/${userWalletId}`
    );
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function GetBalanceGoerliEth(userId, userWalletId) {
  try {
    const response = await axios.get(
      BACKEND_URL + `/wallet/balances-goerliEth/${userId}/${userWalletId}`
    );
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function GetBalanceBinanceTestnet(userId, userWalletId) {
  try {
    const response = await axios.get(
      BACKEND_URL + `/wallet/balances-polygonMumbai/${userId}/${userWalletId}`
    );
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

//============================={Wallet Transactions: GET}=============================

async function getAllTokenBalancesWithUSDValue(id) {
  try {
    const response = await axios.get(
      BACKEND_URL + `wallet/all-token-balances-with-usd-value/${id}`
    );
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

//============={End: Require UserId}====================================

async function getAllWalletHistory() {
  try {
    const response = await axios.get(
      BACKEND_URL + '/wallet/history/all-wallet-history'
    );
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function getMyWalletHistory(id) {
  try {
    const response = await axios.get(
      BACKEND_URL + `/wallet/history/all-my-wallet-history/${id}`
    );
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function getAllTransactionHistory() {
  try {
    const response = await axios.get(
      BACKEND_URL + '/wallet/history/all-transactions-history'
    );
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

//==========================={          }===============================================
//==========================={  USD PRICE CONVERTER   }===============================================
//==========================={          }===============================================

const getUSDPrice = async (amount, symbol) => {
  let price = null; // Price of any crypto selected currency in USD

  // let amount = product?.itemPrice;
  //const totalUSD = null;

  // let symbol = "ETH";
  // let symbol = chainSymbol;
  let CRYPTOCOMPARE_KEY =
    'a1f8d982c6e5049b8f052da97c17bfd9b39e5f1a7ac0d8158f1ddb6ca0a7b89f';

  await axios
    .get(
      `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbol}&tsyms=USD&api_key=${CRYPTOCOMPARE_KEY}`
    )
    .then((res) => {
      // console.log(res.data);

      //To get Cryptocompare.com rates for any crptocurrency to USD

      let data = res.data.DISPLAY[symbol].USD;
      // console.log(data);

      price = data.PRICE;

      //Rate of each cryptocurrency to USD

      let pricex = price.split(' ')[1];

      // console.log("This is change := " + pricex);

      let pricey = parseFloat(pricex.replace(/,/g, ''));
      // console.log("corrected price: " + pricey);
      // console.log("amount = " + amount);
      let rateUSD = pricey.toFixed(2);

      let totalUSD = amount * rateUSD;
      let usdPrice = totalUSD.toFixed(3);

      return usdPrice;
    });

  // console.log(newPrice);
  // setUSDPrice(newPrice?.toFixed(3));
};

async function GetOneNativeBalance(userId, userWalletId, chainId) {
  try {
    const response = await axios.get(
      BACKEND_URL + `/wallet/tokens/getOneNativeBalance/${userId}/${userWalletId}/${chainId}`
    );
    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}


//==========================={          }===============================================
//==========================={  AUTH    }===============================================
//==========================={          }===============================================

//==========================={          }===============================================
//==========================={  AUTH    }===============================================
//==========================={          }===============================================

//=================================================================================================================
export {
 
  //==============={get chains}======================
  GetChainsArbitrum,
  GetChainsAurora,
  GetChainsAvalanche,
  GetChainsBinance,
  GetChainsEthereum,
  GetChainsFantom,
  GetChainsGnosis,
  GetChainsKlaytn,
  GetChainsPolygon,
  GetChainsOptimism,
  GetChainsPolygonMumbai,
  GetChainsGoerliEth,
  GetChainsBinanceTestnet,
  //==============={get Balance}======================
  GetBalanceArbitrum,
  GetBalanceAurora,
  GetBalanceAvalanche,
  GetBalanceBinance,
  GetBalanceEthereum,
  GetBalanceFantom,
  GetBalanceGnosis,
  GetBalanceKlaytn,
  GetBalancePolygon,
  GetBalanceOptimism,
  GetBalancePolygonMumbai,
  GetBalanceGoerliEth,
  GetBalanceBinanceTestnet,
  //==============={get Tokens}======================
  GetTokensArbitrum,
  GetTokensAurora,
  GetTokensAvalanche,
  GetTokensBinance,
  GetTokensEthereum,
  GetTokensFantom,
  GetTokensGnosis,
  GetTokensKlaytn,
  GetTokensPolygon,
  GetTokensOptimism,
  GetTokensPolygonMumbai,
  GetTokensGoerliEth,
  GetTokensBinanceTestnet,
  //==============={ADD/REMOVE Tokens}======================
  UpdateTokensArbitrum,
  UpdateTokensAurora,
  UpdateTokensAvalanche,
  UpdateTokensBinance,
  UpdateTokensEthereum,
  UpdateTokensFantom,
  UpdateTokensGnosis,
  UpdateTokensKlaytn,
  UpdateTokensPolygon,
  UpdateTokensOptimism,
  UpdateTokensPolygonMumbai,
  UpdateTokensGoerliEth,
  UpdateTokensBinanceTestnet,
  GetOneWallet,
  GetUserWalletInfo,
  UpdateWalletAccountName,
  GetWallets,
  GetEstimateGas,
  //============{Swap}====================================

  getSwapQuote,
  swapTokenToOwnAddress,
  swapTokenToReceiver,
  
  //============{WALET OTHERS}=========================

  getAllTokens,
  getAllWalletHistory,
  getMyWalletHistory,
  getAllTransactionHistory,
  SendToken,
  addNewWallet,
  goConnect,
  signMessage,
  getAllTokenBalancesWithUSDValue,
  walletRecover,
  addUserTokens,
  getAllUserTokens,
  getUSDPrice,
  GetOneNativeBalance
};
