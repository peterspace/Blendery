//Bitcoin solutions

const getBitcoinTransactionToBlendery = async () => {
  //================={Testing Bitcoin network}========================
  //================={Production Bitcoin network}========================

  // Initialize Axios instance for making HTTP requests
  const address = recipientAddress;
  const url = `https://blockstream.info/api/address/${address}/txs`;

  const response = await axios.get(url);
  const transactions = response.data;

  // Calculate the total amount received
  const totalAmountReceived = transactions.reduce((total, tx) => {
    const outputs = tx.vout.filter(
      (output) => output.scriptpubkey_address === address
    );
    const receivedAmount = outputs.reduce(
      (amount, output) => amount + output.value,
      0
    );

    return total + receivedAmount;
  }, 0);

  if (totalAmountReceived > 0) {
    //==========={Update DB status}======================================

    const result = {
      status: 'Paid',
      receiver: address,
      totalReceived: totalAmountReceived / 1e8, // Convert from satoshis to BTC
    };

    console.log({ result: result });
  }

  // mainnet
  // baseURL: 'https://blockstream.info/api',
  // testnet
  //   baseURL: 'https://blockstream.info/testnet/api',

  // Check for incoming transactions for each payment address
};

async function getBitcoinTransactionFromBlendery() {
  const senderAddress = '1G9Sm8eXkFpAUMb6JH1D9Pf4Z8tbyuD3bi'; /// blendery
  const recipientAddress = '1FWQiwK27EnGXb6BiBMRLJvunJQZZPMcGd'; // useraddress

  try {
    const url = `https://blockstream.info/api/address/${senderAddress}/txs`;

    const response = await axios.get(url);
    const transactions = response.data;

    // Filter transactions that involve the recipient address.
    const recipientTransactions = transactions.filter((tx) => {
      return tx.vout.some(
        (output) => output.scriptpubkey_address === recipientAddress
      );
    });

    // Calculate the total amount sent to the recipient.
    const totalAmountSent = recipientTransactions.reduce((total, tx) => {
      return (
        total +
        tx.vout.reduce((amount, output) => {
          if (output.scriptpubkey_address === recipientAddress) {
            return amount + output.value;
          }
          return amount;
        }, 0)
      );
    }, 0);

    console.log(
      `Total amount sent to ${recipientAddress}: ${totalAmountSent} BTC`
    );
    console.log(`Converted to BTC ${totalAmountSent / 1e8} BTC`);
  } catch (error) {
    console.error('Error:', error);
  }
}

getBitcoinTransactionFromBlendery();

const getNativeTransactionToUser = async (
  userAddress,
  blenderyAddress,
  value
) => {
  const senderAddress = blenderyAddress;
  const recipientAddress = userAddress;
  try {
    const url = `https://blockstream.info/api/address/${recipientAddress
}/txs`;

    const response = await axios.get(url);
    const transactions = response.data;
    let targetTransaction = {};

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
    sentTransactions.forEach((sentTx, index) => {
      console.log(`Transaction ${index + 1}:`);
      console.log(sentTx.transaction); // Full transaction details
      console.log(`Amount Sent: ${sentTx.sentAmount} BTC`);
      console.log('--------------------');

      const responseInfo = sentTx.transaction;
      let summary = {
        txId: responseInfo?.txid,
        fromAddress: senderAddress,
        toAddress: recipientAddress,
        amountRaw: sentTx.sentAmount,
        amount: sentTx.sentAmount / 1e8,
        blockchainUrl: `${blockchainUrlEndpoint}/${responseInfo?.txid}`,
      };

      targetTransaction = summary;
      return targetTransaction;
    });
  } catch (error) {
    console.error('Error:', error);
  }
};




async function getAllReceivedTransactions(receiverAddress) {
    // const receiverAddress = recipientAddress
  try {
    const url = `https://blockstream.info/api/address/${receiverAddress}/txs`;

    const response = await axios.get(url);
    const transactions = response.data;
    let allResults = []

    // Use map to process all transactions and collect deposits.
    const receivedTransactions = transactions.map((tx, index) => {
      const receivedAmount = tx.vout.reduce((amount, output) =>
        output.scriptpubkey_address === receiverAddress
          ? amount + output.value
          : amount
      , 0);

      if (receivedAmount > 0) {
        return {
          transactionIndex: index,
          transaction: tx,
          receivedAmount,
        };
      }
      
      return null;
    }).filter(Boolean);

    console.log(`All Bitcoin Deposits to ${receiverAddress}:`);
    receivedTransactions.map((specificTx, index) => {
      console.log(`Transaction ${index + 1} (Index ${specificTx.transactionIndex}):`);
    //   console.log(specificTx.transaction); // Full transaction details
    //   console.log(`Amount Received: ${specificTx.receivedAmount} BTC`);
    //   console.log('--------------------');

      const responseInfo = specificTx.transaction;
            const summary = {
              // tx: specificTx.transaction,
              txId: responseInfo?.txid,
            //   fromAddress: senderAddress,
              toAddress: recipientAddress,
              amountRaw: specificTx.receivedAmount,
              amount: specificTx.receivedAmount / 1e8,
              blockchainUrl: `${blockchainUrlEndpoint}/${responseInfo?.txid}`,
            };
            result = summary

            allResults.push(summary)
            // console.log({summary: summary})

    });

    // console.log({allResults: allResults})
    return allResults
  } catch (error) {
    console.error('Error:', error);
  }
}


async function checkResult(value){
    let expectedValue =value

    let targetData = []
    let newResult = await  getSpecificReceivedTransactions(blenderyAddress) //4




    if(newResult.length > 0){
        newResult?.map(async(m)=>{
            if(m?.amount === expectedValue){
                console.log({expectedTxnew: m})
                targetData.push(m)
            }
        })
    }

    if(targetData.length > 0){
        // console.log({targetData: targetData})
        // console.log({targetData1: targetData[0]})
        return targetData[0]
    }

    
}

checkResult()



