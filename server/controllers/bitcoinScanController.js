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

const blockchainUrlBitcoinMainnet = 'https://blockstream.info/tx';
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

const getBitcoinNativeTransactionToBlenderyWithOutUserAddress1 = async (
  blenderyAddress,
  value
) => {
  let expectedValue = value;

  console.log({ expectedValue: expectedValue });

  let targetData = [];
  let newResult = await getSpecificReceivedTransactions(blenderyAddress); //4
  console.log({ newResult: newResult });

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

const getBitcoinNativeTransactionToBlenderyWithOutUserAddress = async (
  blenderyAddress,
  value
) => {
  let expectedValue = value;

  console.log({ expectedValue: expectedValue });

  let targetData = [];
  let newResult = await getSpecificReceivedTransactions(blenderyAddress); //4
  console.log({ newResult: newResult });

  if (newResult.length > 0) {
    newResult?.map(async (m) => {
      if (m?.amount === expectedValue) {
        console.log({ expectedTxnew: m });
        targetData.push(m);
      }
    });
  }
  if (targetData.length > 0) {
    let allIndex = targetData.length;

    let lastIndex = allIndex - 1;

    return targetData[lastIndex]; // last/most recent transaction received

    // return targetData[0];
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

//getBitcoinNativeTransactionToBlenderyWithOutUserAddress
//==============================================================================================
// Server Running on port 4000
// {
//   newResult: [
//     {
//       txId: '14b34592a230baa434c391ed05cf97e9911629ff4f38afcc535b8696d448fa98',
//       toAddress: 'mwZDqNNGFJLxEGWq2nHtqgUH1nm1dW2TYk',
//       amountRaw: 4167182,
//       amount: 0.04167182,
//       blockchainUrl: 'https://blockstream.info/testnet/tx/14b34592a230baa434c391ed05cf97e9911629ff4f38afcc535b8696d448fa98'
//     },
//     {
//       txId: '4d4a068798617b5017a7f48ab555f744e452cea22c8beb2f2ed6b27cc89456e3',
//       toAddress: 'mwZDqNNGFJLxEGWq2nHtqgUH1nm1dW2TYk',
//       amountRaw: 10000,
//       amount: 0.0001,
//       blockchainUrl: 'https://blockstream.info/testnet/tx/4d4a068798617b5017a7f48ab555f744e452cea22c8beb2f2ed6b27cc89456e3'
//     },
//     {
//       txId: '8d8ae60cca75cd99f101ed1ecdb30d29073635e18028a39edd59658aca88170e',
//       toAddress: 'mwZDqNNGFJLxEGWq2nHtqgUH1nm1dW2TYk',
//       amountRaw: 5145518,
//       amount: 0.05145518,
//       blockchainUrl: 'https://blockstream.info/testnet/tx/8d8ae60cca75cd99f101ed1ecdb30d29073635e18028a39edd59658aca88170e'
//     },
//     {
//       txId: 'd20c30e3663b8590babac0369babcee40f98d77ee246b4339186c802e4d8a5ce',
//       toAddress: 'mwZDqNNGFJLxEGWq2nHtqgUH1nm1dW2TYk',
//       amountRaw: 10000,
//       amount: 0.0001,
//       blockchainUrl: 'https://blockstream.info/testnet/tx/d20c30e3663b8590babac0369babcee40f98d77ee246b4339186c802e4d8a5ce'
//     },
//     {
//       txId: '001c0541c448ad5203b82c4726c33fff176a9925c55039ca9dd46633faad4739',
//       toAddress: 'mwZDqNNGFJLxEGWq2nHtqgUH1nm1dW2TYk',
//       amountRaw: 2458,
//       amount: 0.00002458,
//       blockchainUrl: 'https://blockstream.info/testnet/tx/001c0541c448ad5203b82c4726c33fff176a9925c55039ca9dd46633faad4739'
//     },
//     {
//       txId: 'd347ef9d8600b94720e84d5657e2b146acbcd96ec417845b817fe5e8235babf5',
//       toAddress: 'mwZDqNNGFJLxEGWq2nHtqgUH1nm1dW2TYk',
//       amountRaw: 3715,
//       amount: 0.00003715,
//       blockchainUrl: 'https://blockstream.info/testnet/tx/d347ef9d8600b94720e84d5657e2b146acbcd96ec417845b817fe5e8235babf5'
//     },
//     {
//       txId: '3574728a269f852e403fd7c3759affa09dd326a9b28c4acf76e5ebf78da6d23a',
//       toAddress: 'mwZDqNNGFJLxEGWq2nHtqgUH1nm1dW2TYk',
//       amountRaw: 4972,
//       amount: 0.00004972,
//       blockchainUrl: 'https://blockstream.info/testnet/tx/3574728a269f852e403fd7c3759affa09dd326a9b28c4acf76e5ebf78da6d23a'
//     },
//     {
//       txId: 'f98d1676b7bf6600e6331b880c8f8fe0534f2aaaa086e00bc6c0a34988a0dd33',
//       toAddress: 'mwZDqNNGFJLxEGWq2nHtqgUH1nm1dW2TYk',
//       amountRaw: 6229,
//       amount: 0.00006229,
//       blockchainUrl: 'https://blockstream.info/testnet/tx/f98d1676b7bf6600e6331b880c8f8fe0534f2aaaa086e00bc6c0a34988a0dd33'
//     },
//     {
//       txId: 'cd5fae1389a17e2991d0329be79763db89fa19c92eccc2b2dd7f60b03f1f4186',
//       toAddress: 'mwZDqNNGFJLxEGWq2nHtqgUH1nm1dW2TYk',
//       amountRaw: 8743,
//       amount: 0.00008743,
//       blockchainUrl: 'https://blockstream.info/testnet/tx/cd5fae1389a17e2991d0329be79763db89fa19c92eccc2b2dd7f60b03f1f4186'
//     },
//     {
//       txId: 'ad6f20b93731b3d1f16d0589c916bcc64f784bd221deaa885fd7f57a34596e04',
//       toAddress: 'mwZDqNNGFJLxEGWq2nHtqgUH1nm1dW2TYk',
//       amountRaw: 7486,
//       amount: 0.00007486,
//       blockchainUrl: 'https://blockstream.info/testnet/tx/ad6f20b93731b3d1f16d0589c916bcc64f784bd221deaa885fd7f57a34596e04'
//     },
//     {
//       txId: '5229ff374b04b0aa69f34b608c6ec1f2fda712b73e6cd1a29699b8b0f2ad911a',
//       toAddress: 'mwZDqNNGFJLxEGWq2nHtqgUH1nm1dW2TYk',
//       amountRaw: 10000,
//       amount: 0.0001,
//       blockchainUrl: 'https://blockstream.info/testnet/tx/5229ff374b04b0aa69f34b608c6ec1f2fda712b73e6cd1a29699b8b0f2ad911a'
//     }
//   ]
// }
// {
//   expectedTxnew: {
//     txId: '4d4a068798617b5017a7f48ab555f744e452cea22c8beb2f2ed6b27cc89456e3',
//     toAddress: 'mwZDqNNGFJLxEGWq2nHtqgUH1nm1dW2TYk',
//     amountRaw: 10000,
//     amount: 0.0001,
//     blockchainUrl: 'https://blockstream.info/testnet/tx/4d4a068798617b5017a7f48ab555f744e452cea22c8beb2f2ed6b27cc89456e3'
//   }
// }
// {
//   expectedTxnew: {
//     txId: 'd20c30e3663b8590babac0369babcee40f98d77ee246b4339186c802e4d8a5ce',
//     toAddress: 'mwZDqNNGFJLxEGWq2nHtqgUH1nm1dW2TYk',
//     amountRaw: 10000,
//     amount: 0.0001,
//     blockchainUrl: 'https://blockstream.info/testnet/tx/d20c30e3663b8590babac0369babcee40f98d77ee246b4339186c802e4d8a5ce'
//   }
// }
// {
//   expectedTxnew: {
//     txId: '5229ff374b04b0aa69f34b608c6ec1f2fda712b73e6cd1a29699b8b0f2ad911a',
//     toAddress: 'mwZDqNNGFJLxEGWq2nHtqgUH1nm1dW2TYk',
//     amountRaw: 10000,
//     amount: 0.0001,
//     blockchainUrl: 'https://blockstream.info/testnet/tx/5229ff374b04b0aa69f34b608c6ec1f2fda712b73e6cd1a29699b8b0f2ad911a'
//   }
// }
// {
//   txId: '5229ff374b04b0aa69f34b608c6ec1f2fda712b73e6cd1a29699b8b0f2ad911a',
//   toAddress: 'mwZDqNNGFJLxEGWq2nHtqgUH1nm1dW2TYk',
//   amountRaw: 10000,
//   amount: 0.0001,
//   blockchainUrl: 'https://blockstream.info/testnet/tx/5229ff374b04b0aa69f34b608c6ec1f2fda712b73e6cd1a29699b8b0f2ad911a'
// }