// Etherscan;

const axios = require('axios');
const { ethers } = require('ethers');

const apiEndpointMainnet = 'https://blockstream.info/api'; // mainnet
const apiEndpointTestNet = 'https://blockstream.info/testnet/api'; // goerli test net
// const apiEndpoint = apiEndpointMainnet;
const apiEndpoint = apiEndpointTestNet;

const blockchainInfoApiKey = '0198f704-8efb-42f8-b529-ad3c2df7431e';
const apiKey = blockchainInfoApiKey;
//==============================================={Etherscan native}==================================================

const blockchainUrlMainnet =
  'https://www.blockchain.com/explorer/transactions/btc';
const blockchainUrlTest = '';
const blockchainUrlEndpoint = blockchainUrlMainnet;

const blockchainUrlBitcoinMainnet =
'https://blockstream.info/tx';
const blockchainUrlBitcoinTest = 'https://blockstream.info/testnet/tx';
const blockchainUrlBitcoinEndpoint = blockchainUrlBitcoinTest;
//==============================================={Etherscan native}==================================================

//36db9ae1738c0970c03a680055b37cec5ed9741b445115b3cee6039379579e1a
//THFxGz1Pq5pyL7kdjZFwFqbP8zbBSLsYzE
const getBitcoinNativeTransactionToUser1 = async (
  userAddress,
  blenderyAddress,
  value
) => {
  const senderAddress = blenderyAddress;
  const recipientAddress = userAddress;
  const valueExpected = value;
  //   let valueExpected = 0.74929761
  try {
    const url = `${apiEndpoint}/address/${senderAddress}/txs`;

    const response = await axios.get(url);
    const transactions = response.data;
    let result = {};

    // Use map to process transactions and collect the transactions where the amount was sent.
    const sentTransactions = transactions
      .map((tx) => {
        const sentAmount = tx.vout.reduce(
          (amount, output) =>
            output.scriptpubkey_address === recipientAddress
              ? amount + output.value
              : amount,
          0
        );

        if (sentAmount > 0) {
          return {
            transaction: tx,
            sentAmount,
          };
        }

        return null;
      })
      .filter(Boolean); // Remove null entries

    console.log(`Sent Transactions to ${recipientAddress}:`);
    const newData = sentTransactions.forEach((sentTx, index) => {
      let newResult;
      if (sentTx?.sentAmount === valueExpected * 1e8) {
        console.log(`Transaction ${index + 1}:`);
        console.log(sentTx.transaction); // Full transaction details
        console.log(`Amount Sent Satoshi: ${sentTx.sentAmount} Satoshi`);
        console.log(`Amount Sent BTC: ${sentTx.sentAmount / 1e8} BTC`);

        console.log('--------------------');
        const responseInfo = sentTx.transaction;

        // console.log({responseInfo: responseInfo})
        const summary = {
          // tx: sentTx.transaction,
          txId: responseInfo?.txid,
          fromAddress: senderAddress,
          toAddress: recipientAddress,
          amountRaw: sentTx.sentAmount,
          amount: sentTx.sentAmount / 1e8,
          blockchainUrl: `${blockchainUrlBitcoinEndpoint}/${responseInfo?.txid}`,
        };
        console.log({ summary: summary });
        newResult = summary;
        result = summary;
        return summary;
      }
      return newResult;
    });

    console.log({ newData: newData });
    // if (sentTransactions) {
    //   return result;
    // }
    // return newData;
    // if (newData) {
    //   // return result;
    //   return newData
    // }

    // if (newData) {
    //   console.log('new data available')
    //   console.log({newData: newData})
    // }
    return result;
  } catch (error) {
    console.error('Error:', error);
  }
};

const getBitcoinNativeTransactionToUser = async (
  userAddress,
  blenderyAddress,
  value
) => {
  const senderAddress = blenderyAddress;
  const recipientAddress = userAddress;
  const valueExpected = value;
  //   let valueExpected = 0.74929761
  try {
    const url = `${apiEndpoint}/address/${senderAddress}/txs`;

    const response = await axios.get(url);
    const transactions = response.data;
    let result = {};

    // Use map to process transactions and collect the transactions where the amount was sent.
    const sentTransactions = transactions
      .map((tx) => {
        const sentAmount = tx.vout.reduce(
          (amount, output) =>
            output.scriptpubkey_address === recipientAddress
              ? amount + output.value
              : amount,
          0
        );

        if (sentAmount > 0) {
          return {
            transaction: tx,
            sentAmount,
          };
        }

        return null;
      })
      .filter(Boolean); // Remove null entries

    console.log(`Sent Transactions to ${recipientAddress}:`);
    const newData = sentTransactions.forEach((sentTx, index) => {
      if (sentTx?.sentAmount === valueExpected * 1e8) {
        // console.log(`Transaction ${index + 1}:`);
        // console.log(sentTx.transaction); // Full transaction details
        // console.log(`Amount Sent Satoshi: ${sentTx.sentAmount} Satoshi`);
        // console.log(`Amount Sent BTC: ${sentTx.sentAmount / 1e8} BTC`);

        // console.log('--------------------');
        const responseInfo = sentTx.transaction;

        // console.log({responseInfo: responseInfo})
        const summary = {
          // tx: sentTx.transaction,
          txId: responseInfo?.txid,
          fromAddress: senderAddress,
          toAddress: recipientAddress,
          amountRaw: sentTx.sentAmount,
          amount: sentTx.sentAmount / 1e8,
          blockchainUrl: `${blockchainUrlBitcoinEndpoint}/${responseInfo?.txid}`,
        };
        console.log({ summary: summary });
        result = summary;
        return summary;
      }
    });

    // console.log({result: result})
    return result;
  } catch (error) {
    console.error('Error:', error);
  }
};

//with useraddress
const getBitcoinNativeTransactionToBlenderyWithUserAddress = async (
  userAddress,
  blenderyAddress,
  value
) => {
  const senderAddress = userAddress;
  const recipientAddress = blenderyAddress;
  const valueExpected = value;
  //   let valueExpected = 0.74929761
  try {
    const url = `${apiEndpoint}/address/${senderAddress}/txs`;

    const response = await axios.get(url);
    const transactions = response.data;
    let result = {};

    // Use map to process transactions and collect the transactions where the amount was sent.
    const sentTransactions = transactions
      .map((tx) => {
        const sentAmount = tx.vout.reduce(
          (amount, output) =>
            output.scriptpubkey_address === recipientAddress
              ? amount + output.value
              : amount,
          0
        );

        if (sentAmount > 0) {
          return {
            transaction: tx,
            sentAmount,
          };
        }

        return null;
      })
      .filter(Boolean); // Remove null entries

    console.log(`Sent Transactions to ${recipientAddress}:`);
    const newData = sentTransactions.forEach((sentTx, index) => {
      if (sentTx?.sentAmount === valueExpected * 1e8) {
        console.log(`Transaction ${index + 1}:`);
        console.log(sentTx.transaction); // Full transaction details
        console.log(`Amount Sent Satoshi: ${sentTx.sentAmount} Satoshi`);
        console.log(`Amount Sent BTC: ${sentTx.sentAmount / 1e8} BTC`);
        console.log('--------------------');
        const responseInfo = sentTx.transaction;
        const summary = {
          // tx: sentTx.transaction,
          txId: responseInfo?.txid,
          fromAddress: senderAddress,
          toAddress: recipientAddress,
          amountRaw: sentTx.sentAmount,
          amount: sentTx.sentAmount / 1e8,
          blockchainUrl: `${blockchainUrlBitcoinEndpoint}/${responseInfo?.txid}`,
        };
        result = summary;
      }
    });

    return result;
  } catch (error) {
    console.error('Error:', error);
  }
};

const getBitcoinNativeTransactionToBlenderyWithOutUserAddress = async (
  blenderyAddress,
  value
) => {
  let expectedValue = value;

  console.log({expectedValue: expectedValue})

  let targetData = [];
  let newResult = await getSpecificReceivedTransactions(blenderyAddress); //4
  console.log({newResult: newResult})

  if (newResult.length > 0) {
    newResult?.map(async (m) => {
      if (m?.amount === expectedValue) {
        console.log({ expectedTxnew: m });
        targetData.push(m);
      }
    });
  }
  if (targetData.length > 0) {
    return targetData[0];
  }
};

async function getSpecificReceivedTransactions(blenderyAddress) {
  const receiverAddress = blenderyAddress;
  try {
    const url = `${apiEndpoint}/address/${receiverAddress}/txs`;

    const response = await axios.get(url);
    const transactions = response.data;
    let allResults = [];

    // Use map to process all transactions and collect deposits.
    const receivedTransactions = transactions
      .map((tx, index) => {
        const receivedAmount = tx.vout.reduce(
          (amount, output) =>
            output.scriptpubkey_address === receiverAddress
              ? amount + output.value
              : amount,
          0
        );

        if (receivedAmount > 0) {
          return {
            transactionIndex: index,
            transaction: tx,
            receivedAmount,
          };
        }

        return null;
      })
      .filter(Boolean);

    receivedTransactions.map((specificTx, index) => {
      const responseInfo = specificTx.transaction;
      const summary = {
        // tx: specificTx.transaction,
        txId: responseInfo?.txid,
        //   fromAddress: senderAddress,
        toAddress: receiverAddress,
        amountRaw: specificTx.receivedAmount,
        amount: specificTx.receivedAmount / 1e8,
        blockchainUrl: `${blockchainUrlBitcoinEndpoint}/${responseInfo?.txid}`,
      };
      result = summary;
      // console.log({summary: summary})

      allResults.push(summary);
    });
    return allResults;
  } catch (error) {
    console.error('Error:', error);
  }
}

//==============================================={Etherscan erc20}==================================================

module.exports = {
  getBitcoinNativeTransactionToUser,
  getBitcoinNativeTransactionToBlenderyWithUserAddress,
  getBitcoinNativeTransactionToBlenderyWithOutUserAddress,
};
