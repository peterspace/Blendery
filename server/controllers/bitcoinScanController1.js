BitcoinScan

const axios = require('axios');

// Your Blockchain.info API key (if you have one).
// const apiKey = 'YourBlockchainInfoApiKey';
const apiKey = '0198f704-8efb-42f8-b529-ad3c2df7431e'

// The Bitcoin wallet address for which you want to fetch the transaction history.
// const address = 'YourBitcoinAddressHere';
const address = '1FWQiwK27EnGXb6BiBMRLJvunJQZZPMcGd';


async function getBitcoinTransactionHistory() {
  try {
    const url = `https://blockchain.info/rawaddr/${address}?api_code=${apiKey}`;

    const response = await axios.get(url);

    // The response data will contain the transaction history.
    console.log('Transaction History:', response.data);
  } catch (error) {
    console.error('Error:', error);
  }
}

getBitcoinTransactionHistory();


// node bitcoinScan.js

const result =[{
  hash: '371604f6e3a271f3d4f69b0abf359ecd687b91dab19c7bbbc8eb91b792f1849b',
  ver: 1,
  vin_sz: 1,
  vout_sz: 1,
  size: 192,
  weight: 768,
  fee: 50000,
  relayed_by: '0.0.0.0',
  lock_time: 0,
  tx_index: 5471849309205053,
  double_spend: false,
  time: 1698840556,
  block_index: 814833,
  block_height: 814833,
  inputs: [Array],
  out: [Array],
  result: 74929761,
  balance: 51803065453
}]
