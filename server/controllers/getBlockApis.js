const axios = require('axios');

// const { getblock } = require('./getblock.config.js');
// var Web3 = require('web3');

// // Create the JSON-RPC provider
// var web3Rpc = new Web3(
//   new Web3.providers.HttpProvider(getblock.shared.eth.mainnet.rpc[0].go())
// );

// // var web3Rpc = new Web3(
// //   new Web3.providers.HttpProvider(getblock.shared.eth.mainnet.jsonRpc[0].go())
// // );

// // Create the WebSocket provider
// var web3Ws = new Web3.providers.WebsocketProvider(
//   `wss://go.getblock.io/${getblock.shared.eth.mainnet.ws[0].token()}`
// );

// console.log({web3Ws: web3Ws})

//BTC
const api_key = '6e0ae8689fd34c8e9dc03db6321a17df';

//https://go.getblock.io/6e0ae8689fd34c8e9dc03db6321a17df

const bitcoinEndpoint = `https://btc.getblock.io/&lt;${api_key}&gt;/mainnet/`;
const bitcoinEndpointTest = `https://btc.getblock.io/&lt;${api_key}&gt;/testnet/`;

const tronEndpoint = `https://trx.getblock.io/&lt;${api_key}&gt;/mainnet/`;
const tronEndpointTest = `https://trx.getblock.io/&lt;${api_key}&gt;/testnet/`;

const ethereumEndpoint = `https://eth.getblock.io/&lt;${api_key}&gt;/mainnet/`;
const ethereumEndpointGoreli = `https://eth.getblock.io/&lt;${api_key}&gt;/goerli/`;
const ethereumEndpointHoleskey = `https://eth.getblock.io/&lt;${api_key}&gt;/holesky/`;
const ethereumEndpointSepolia = `https://eth.getblock.io/&lt;${api_key}&gt;/sepolia/`;

const binanceEndpoint = `https://bsc.getblock.io/&lt;${api_key}&gt;/mainnet/`;
const binanceEndpointTest = `https://bsc.getblock.io/&lt;${api_key}&gt;/testnet/`;
const optimismEndpoint = `https://op.getblock.io/&lt;${api_key}&gt;/mainnet/`;
const polygonEndpoint = `https://matic.getblock.io/&lt;${api_key}&gt;/mainnet/`;
const polygonEndpointTest = `https://matic.getblock.io/&lt;${api_key}&gt;/testnet/`;

const arbitrumEndpoint = `https://arb.getblock.io/&lt;${api_key}&gt;/mainnet/`;
const arbitrumEndpointGoerli = `https://arb.getblock.io/&lt;${api_key}&gt;/goerli/`;

const getBlockRPC = {
  shared: {
    btc: {
      mainnet: {
        rest: ['ca1eda4af25d45d5a05bacaf43b90a57'],
      },
      testnet: {
        rest: ['e54609c4b4c6469ba3d0c987fbc0ff6e'],
      },
    },
    eth: {
      goerli: {
        jsonRpc: ['1e391968bab843c1bf3f3c42181942b0'],
      },
      mainnet: {
        jsonRpc: ['67683fa7c6c34f2e88445f4a844c16ec'],
      },
    },
    trx: {
      mainnet: {
        fullnodeJsonRpc: ['6e0ae8689fd34c8e9dc03db6321a17df'],
      },
      testnet: {
        fullnodeJsonRpc: ['a7de3858d08241c4bc969434914ba09b'],
      },
    },
  },
};

//===={example}========

const geBlockAPI = async ({ userData, url, method }) => {
  try {
    const response = await axios(url, {
      method: method ? method : 'GET',
      headers: {
        'Content-Type': 'application/json',
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
const url = 'https://eth.getblock.io/mainnet/';
const userData = {
  jsonrpc: '2.0',
  method: 'eth_getBalance',
  params: ['0xfe3b557e8fb62b89f4916b721be55ceb828dbd73', 'latest'],
  id: 'getblock.io',
};
const method = 'POST';

// geBlockAPI({ userData: userData, url: url, method: method });

// curl --location --request POST 'https://eth.getblock.io/mainnet/'

// --header 'Content-Type: application/json'
// --data-raw '{"jsonrpc": "2.0",
// "method": "eth_getBalance",
// "params": ["0xfe3b557e8fb62b89f4916b721be55ceb828dbd73", "latest"],
// "id": "getblock.io"}'
