const axios = require('axios');
// const fetch = require('node-fetch');

const tronGridApiKey = '7c2ba8b0-5d4e-42cc-86f9-a82c8c6bb1dd';
const tronExplorerApi = '68992ff8-6752-4a02-aaa7-4f9bee486b71';
const apiKey = tronExplorerApi;
const endpoint = 'https://apilist.tronscanapi.com/api/block';

//https://nile.tronscan.org/#/transaction/ce44562748b72cebd7b1a8960710bb73c9e2970421f467180f0c1848a38c2044
//========================================{Base API}======================================================================

const tronPostAPI = async (userData, url) => {
  try {
    const response = await axios(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'TRON-PRO-API-KEY': tronGridApiKey, // if mainnet
      },
      body: userData,
    });
    const updatedResponse = response.data;
    console.log(updatedResponse);
    return updatedResponse;
  } catch (error) {
    console.log(error);
  }
};
//======={mainnet}=====================================================
// const tronGetAPI = async (url) => {
//   try {
//     const response = await axios(url, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         // 'TRON-PRO-API-KEY': tronGridApiKey, // if mainnet
//       },
//     });
//     const updatedResponse = response.data;
//     console.log(updatedResponse);
//     return updatedResponse;
//   } catch (error) {
//     console.log(error);
//   }
// };

const tronGetAPI = async (url) => {
  try {
    const response = await axios(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    });
    const updatedResponse = response.data;
    console.log(updatedResponse);
    return updatedResponse;
  } catch (error) {
    console.log(error);
  }
};

const tronGetWithParamsAPI = async (url, params) => {
  try {
    const response = await axios(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
      params,
    });
    const updatedResponse = response.data;
    console.log(updatedResponse);
    return updatedResponse;
  } catch (error) {
    console.log(error);
  }
};

const tronScanAPI = async (url) => {
  try {
    const response = await axios(url, {
      method: 'GET',
      headers: {
        'TRON-PRO-API-KEY': apiKey,
      },
    });
    const updatedResponse = response.data;
    console.log(updatedResponse);
    return updatedResponse;
  } catch (error) {
    console.log(error);
  }
};

const tronScanFetchAPI = async (endpoint) => {
  const response = fetch(endpoint, {
    headers: {
      'TRON-PRO-API-KEY': apiKey,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.error(error));

  return response;
};

//==============================================================================================================

const createTransaction = async (userData) => {
  const url = 'https://api.trongrid.io/wallet/createtransaction';
  const urlShasta = 'https://api.shasta.trongrid.io/wallet/createtransaction';
  const urlNile = 'https://nile.trongrid.io/wallet/createtransaction';
  const response = await tronPostAPI(userData, url);

  return response;
};

//===={example}================
const tx1 = {
  to_address: '41e9d79cc47518930bc322d9bf7cddd260a0260a8d',
  owner_address: '41D1E7A6BC354106CB410E65FF8B181C600FF14292',
  amount: 1000,
};

// createTransaction(tx1);

const getAccountInfoByAddress = async (address) => {
  const url = `https://api.trongrid.io//v1/accounts/${address}`;
  const urlShasta = `https://api.shasta.trongrid.io/v1/accounts/${address}`;
  const urlNile = `https://nile.trongrid.io//v1/accounts/${address}`;
  const response = await tronGetAPI(url);

  return response;
};

const getOnlyConfirmedTransactiosnToAddress = async (address) => {
  const url = `https://api.trongrid.io//v1/accounts/${address}/transactions?only_confirmed=true&only_to=true`;
  const urlShasta = `api.shasta.trongrid.io/v1/accounts/${address}/transactions?only_confirmed=true&only_to=true`;
  const urlNile = `https://nile.trongrid.io/v1/accounts/${address}/transactions?only_confirmed=true&only_to=true`;
  const response = await tronGetAPI(urlNile);

  return response;
};

const getOnlyConfirmedTransactiosnFromAddress = async (address) => {
  const url = `https://api.trongrid.io//v1/accounts/${address}/transactions?only_confirmed=true&only_to=false&only_from=true`;
  const urlShasta = `https://api.shasta.trongrid.io/v1/accounts/${address}/transactions?only_confirmed=true&only_to=false&only_from=true`;
  const urlNile = `https://nile.trongrid.io/v1/accounts/${address}/transactions?only_confirmed=true&only_to=false&only_from=true`;
  const response = await tronGetAPI(urlNile);

  return response;
};

const getOnlyConfirmedTransactiosnToAddressTRC20 = async (address) => {
  const url = `https://api.trongrid.io//v1/accounts/${address}/transactions/trc20?only_confirmed=true&only_to=true`;
  const urlShasta = `api.shasta.trongrid.io/v1/accounts/${address}/transactions/trc20?only_confirmed=true&only_to=true`;
  const urlNile = `https://nile.trongrid.io/v1/accounts/${address}/transactions/trc20?only_confirmed=true&only_to=true`;
  const response = await tronGetAPI(urlNile);

  return response;
};

const getOnlyConfirmedTransactiosnFromAddressTRC20 = async (address) => {
  const url = `https://api.trongrid.io//v1/accounts/${address}/transactions/trc20?only_confirmed=true&only_to=false&only_from=true`;
  const urlShasta = `https://api.shasta.trongrid.io/v1/accounts/${address}/transactions/trc20?only_confirmed=true&only_to=false&only_from=true`;
  const urlNile = `https://nile.trongrid.io/v1/accounts/${address}/transactions/trc20?only_confirmed=true&only_to=false&only_from=true`;
  const response = await tronGetAPI(urlNile);

  return response;
};
//'https://api.shasta.trongrid.io/v1/accounts/address/transactions/trc20?only_confirmed=true&only_to=true'

//https://api.shasta.trongrid.io/v1/accounts/{address}/transactions/trc20

const getTransactionByQuery = async (params) => {
  const url = `https://api.trongrid.io//v1/accounts/txs`;
  const urlShasta = `https://api.shasta.trongrid.io/v1/accounts/txs`;
  const urlNile = `https://nile.trongrid.io/v1/accounts/txs`;
  const response = await tronGetWithParamsAPI(urlNile, params);

  return response;
};

const getTransactionsToAddressExplorer = async (address) => {
  // const url = `https://apilist.tronscanapi.com/api/transaction?sort=-timestamp&count=true&limit=20&start=0&start_timestamp=1529856000000&end_timestamp=1680503191391&toAddress=${address}`;
  const url = `https://apilist.tronscanapi.com/api/transaction?toAddress=${address}`;
  const response = tronScanAPI(url);
  return response.data;
};

const getTransactionsFromAddressExplorer = async (address) => {
  const url = `https://apilist.tronscanapi.com/api/transaction?sort=-timestamp&count=true&limit=20&start=0&start_timestamp=1529856000000&end_timestamp=1680503191391&fromAddress=${address}`;
  const response = tronScanAPI(url);
  return response.data;
};

const getTransactionsInfoExplorer = async () => {
  const url = `https://apilist.tronscanapi.com/api/transaction-info?hash=3194a00c5cf427a931b908453588b2ca3f661dafa3860b76a6362d08b3b08583`;
  const response = tronScanAPI(url);
  return response.data;
};

//
//======{TRON explorer}=============
// daily limit 200million

// fetch(endpoint, {
//   headers: {
//     'TRON-PRO-API-KEY': apiKey,
//   },
// })
//   .then((response) => response.json())
//   .then((data) => console.log(data))
//   .catch((error) => console.error(error));

//

// const response = await api.get('/v1/accounts/txs', {
//   params: {
//     only_to: receiver,
//     only_from: sender,
//   },
// });

// const transactions = response.data.data;

//fromAddress
//toAddress
//https://apilist.tronscanapi.com/api/transaction?sort=-timestamp&count=true&limit=20&start=0&start_timestamp=1529856000000&end_timestamp=1680503191391

/**
 * 
 * Replace {wallet-address} with your desired tron wallet address.

Replace {standard} with the standard of token that you want e.g. trc20.

Replace {contract_address} with the address of the contract of your target token e.g. TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t (USD Tether).
 */

//`https://api.trongrid.io/v1/accounts/{wallet-address}/transactions/{standard}?&contract_address={contract-address}`

module.exports = {
  createTransaction,
  getAccountInfoByAddress,
  getOnlyConfirmedTransactiosnToAddress,
  getOnlyConfirmedTransactiosnFromAddress,
  getOnlyConfirmedTransactiosnToAddressTRC20,
  getOnlyConfirmedTransactiosnFromAddressTRC20,
  getTransactionByQuery,
  getTransactionsToAddressExplorer,
  getTransactionsFromAddressExplorer,
  getTransactionsInfoExplorer,
};
