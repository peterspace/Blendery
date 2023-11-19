// Etherscan;

const axios = require('axios');
const { ethers } = require('ethers');

const blockchainInfoApiKey = '0198f704-8efb-42f8-b529-ad3c2df7431e';
const apiKey = blockchainInfoApiKey;
//==============================================={Etherscan native}==================================================

const blockchainUrlMainnet =
  'https://www.blockchain.com/explorer/transactions/btc';
const blockchainUrlTest = '';
const blockchainUrlEndpoint = blockchainUrlMainnet;
//==============================================={Etherscan native}==================================================

//sent to blendery
const getNativeTransactionToBlendery = async (blenderyAddress, value) => {
  const url = `https://blockchain.info/rawaddr/${blenderyAddress}?api_code=${apiKey}`;

  const response = await axios.get(url);
  if (response.data) {
    const allData = response.data;

    let requiredTransaction = [];
    let transaction = {};

    allData.map(async (l) => {
      let amount = l.value;
      let valueFormatted = ethers.utils
        .formatEther(amount.toString())
        .toString();
      if (l?.to == blenderyAddress && valueFormatted >= value) {
        // tx = l
        requiredTransaction.push(l);
      }
    });

    if (requiredTransaction.length > 0 && requiredTransaction[0].value) {
      const responseInfo = requiredTransaction[0];
      let summary = {
        txId: responseInfo?.hash,
        fromAddress: responseInfo?.from,
        toAddress: responseInfo?.to,
        amountRaw: responseInfo?.value,
        amount: value,
        blockchainUrl: `${blockchainUrlEndpoint}/${responseInfo?.hash}`,
      };

      transaction = summary;
      // console.log({transaction: transaction});
      return transaction;
    }
  }
};
const getNativeTransactionToUser = async (
  userAddress,
  blenderyAddress,
  value
) => {
  const url = `https://blockchain.info/rawaddr/${blenderyAddress}?api_code=${apiKey}`;

  const response = await axios.get(url);

  if (response.data) {
    // USDT token transaction history data is in response.data.result.

    const allData = response.data;

    let requiredTransaction = [];
    let transaction = {};

    allData.map(async (l) => {
      let amount = l.value;
      let valueFormatted = ethers.utils
        .formatEther(amount.toString())
        .toString();
      if (
        l.from == blenderyAddress &&
        l?.to == userAddress &&
        valueFormatted >= value
      ) {
        requiredTransaction.push(l);
      }
    });
    if (requiredTransaction.length > 0 && requiredTransaction[0].value) {
      const responseInfo = requiredTransaction[0];
      let summary = {
        txId: responseInfo?.hash,
        fromAddress: responseInfo?.from,
        toAddress: responseInfo?.to,
        amountRaw: responseInfo?.value,
        amount: value,
        blockchainUrl: `${blockchainUrlEndpoint}/${responseInfo?.hash}`,
      };

      transaction = summary;
      // console.log({transaction: transaction});
      return transaction;
    }
  }
};

const result = [
  {
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
    balance: 51803065453,
  },
];

//==============================================={Etherscan erc20}==================================================

module.exports = {
  getNativeTransactionToBlendery,
  getNativeTransactionToUser,
};
