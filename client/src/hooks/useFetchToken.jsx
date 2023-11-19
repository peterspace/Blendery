import {
  parseEther,
  formatEther,
  parseUnits,
  formatUnits,
} from '@ethersproject/units';

const url = 'https://api.coingecko.com/api/v3/';

// const geTokenPriceData = async (id) => {
//   const param = `coins/${id}`;
//   const response = await fetch(url + param, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
//   const updatedResponse = await response.json();
//   return updatedResponse;
// };


const geTokenPriceData = async (id) => {
  const param = `coins/${id}`;

  try {
    const response = await fetch(url + param, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const updatedResponse = await response.json();
    return updatedResponse;
  } catch (error) {
    console.log(error);
  }
};

const getTransactionRateApi = async (userData) => {
  const {
    fToken,
    tToken,
    fValue,
    service,
    subService,
  } = userData;

  if (service === 'defi' && subService === 'defi') {

//=================================================================================================
    const fromPrice = await geTokenPriceData(fToken?.id)
    const fromPriceData = fromPrice?.market_data?.current_price;
    const toPrice = await geTokenPriceData(tToken?.id)
    const toPriceData = toPrice?.market_data?.current_price;
//=================================================================================================

    const fUSDPrice = Number(fromPriceData?.usd); // usd price
    const tUSDPrice = Number(toPriceData?.usd); // usd price

    const exchangeRate = 1 * (fUSDPrice / tUSDPrice); //fToken?.symbol/tToken.symbol

    const tValue = Number(fValue) * exchangeRate;

    const serviceFee = (0.25 / 100) * Number(fValue); // 0.25%

    // const networkFees = await getTxFees(txData) // from the blockchain
    const networkFee = (0.25 / 100) * Number(fValue); // should be from the blockchain

    const youSend = Number(fValue);

    const youGet = Number(fValue) - (serviceFee + networkFee);
    const { amount, estimatedGas } = await getTokenAmount(fToken, fValue);

    const tValueFormatted = Number(tValue).toFixed(3);

    const response = {
      youSend,
      youGet,
      serviceFee,
      networkFee,
      exchangeRate: exchangeRate.toFixed(3),
      tValue,
      tValueFormatted,
      amount,
      estimatedGas,
    };

    return response;
  }
  if (service === 'buy' && subService === 'buyCash') {
    // const fUSDPrice = Number(fToken?.value); // usd price // fiat currency
//=================================================================================================
const toPrice = await geTokenPriceData(tToken?.id)
const toPriceData = toPrice?.market_data?.current_price;
//=================================================================================================


    let exchangeRate;
    if (fToken?.symbol === 'usd') {
      exchangeRate = Number(toPriceData?.usd);
    }
    if (fToken?.symbol === 'gbp') {
      exchangeRate = Number(toPriceData?.gbp);
    }
    if (fToken?.symbol === 'eur') {
      exchangeRate = Number(toPriceData?.eur);
    }
    if (fToken?.symbol === 'rub') {
      exchangeRate = Number(toPriceData?.rub);
    }
    if (fToken?.symbol === 'cad') {
      exchangeRate = Number(toPriceData?.cad);
    }
    if (fToken?.symbol === 'aed') {
      exchangeRate = Number(toPriceData?.aed);
    }
    if (fToken?.symbol === 'jpy') {
      exchangeRate = Number(toPriceData?.jpy);
    }
    if (fToken?.symbol === 'ngn') {
      exchangeRate = Number(toPriceData?.ngn);
    }
    if (fToken?.symbol === 'php') {
      exchangeRate = Number(toPriceData?.php);
    }
    if (fToken?.symbol === 'chf') {
      exchangeRate = Number(toPriceData?.chf);
    }
    if (fToken?.symbol === 'aud') {
      exchangeRate = Number(toPriceData?.aud);
    }

    const tValue = Number(fValue) * exchangeRate;

    const serviceFee = (0.25 / 100) * Number(fValue); // 0.25%

    // const networkFees = await getTxFees(txData) // from the blockchain
    const networkFee = (0.25 / 100) * Number(fValue); // should be from the blockchain

    const youSend = Number(fValue);

    const youGet = Number(fValue) - (serviceFee + networkFee);
    const { amount, estimatedGas } = await getTokenAmount(
      tToken,
      tValue.toString()
    );

    const tValueFormatted = Number(tValue).toFixed(3);

    const response = {
      youSend,
      youGet,
      serviceFee,
      networkFee,
      exchangeRate: exchangeRate.toFixed(3),
      tValue,
      tValueFormatted,
      amount,
      estimatedGas,
    };

    return response;
  }
  if (service === 'buy' && subService === 'buyCard') {
    let exchangeRate;
    //=================================================================================================
    const toPrice = await geTokenPriceData(tToken?.id)
    const toPriceData = toPrice?.market_data?.current_price;
//=================================================================================================

    if (fToken?.symbol === 'usd') {
      exchangeRate = Number(toPriceData?.usd);
    }
    if (fToken?.symbol === 'gbp') {
      exchangeRate = Number(toPriceData?.gbp);
    }
    if (fToken?.symbol === 'eur') {
      exchangeRate = Number(toPriceData?.eur);
    }
    if (fToken?.symbol === 'rub') {
      exchangeRate = Number(toPriceData?.rub);
    }
    if (fToken?.symbol === 'cad') {
      exchangeRate = Number(toPriceData?.cad);
    }
    if (fToken?.symbol === 'aed') {
      exchangeRate = Number(toPriceData?.aed);
    }
    if (fToken?.symbol === 'jpy') {
      exchangeRate = Number(toPriceData?.jpy);
    }
    if (fToken?.symbol === 'ngn') {
      exchangeRate = Number(toPriceData?.ngn);
    }
    if (fToken?.symbol === 'php') {
      exchangeRate = Number(toPriceData?.php);
    }
    if (fToken?.symbol === 'chf') {
      exchangeRate = Number(toPriceData?.chf);
    }
    if (fToken?.symbol === 'aud') {
      exchangeRate = Number(toPriceData?.aud);
    }

    const tValue = Number(fValue) * exchangeRate;

    // const networkFees = await getTxFees(txData) // from the blockchain
    const processingFee = (1 / 100) * Number(fValue); // (1%) should be from the blockchain

    const youSend = Number(fValue);

    const youGet = Number(fValue) - processingFee;
    //============================={TODO}=====================================
    const { amount, estimatedGas } = await getTokenAmount(
      tToken,
      tValue.toString()
    );
    const tValueFormatted = Number(tValue).toFixed(3);

    const response = {
      youSend,
      youGet,
      processingFee,
      exchangeRate: exchangeRate.toFixed(3),
      tValue,
      tValueFormatted,
      amount,
      estimatedGas,
    };

    return response;
  }
  if (service === 'sell' && subService === 'sellCash') {
    // const fUSDPrice = Number(fromPriceData?.usd); // usd price // crypto currency
    // const tUSDPrice = Number(tToken?.value); // usd price // fiat currency

    // const exchangeRate = 1 * (fUSDPrice / tUSDPrice); //fToken?.symbol/tToken.symbol

    let exchangeRate;
    //=================================================================================================
    const fromPrice = await geTokenPriceData(fToken?.id)
    const fromPriceData = fromPrice?.market_data?.current_price;
//=================================================================================================

    if (tToken?.symbol === 'usd') {
      exchangeRate = Number(fromPriceData?.usd);
    }
    if (tToken?.symbol === 'gbp') {
      exchangeRate = Number(fromPriceData?.gbp);
    }
    if (tToken?.symbol === 'eur') {
      exchangeRate = Number(fromPriceData?.eur);
    }
    if (tToken?.symbol === 'rub') {
      exchangeRate = Number(fromPriceData?.rub);
    }
    if (tToken?.symbol === 'cad') {
      exchangeRate = Number(fromPriceData?.cad);
    }
    if (tToken?.symbol === 'aed') {
      exchangeRate = Number(fromPriceData?.aed);
    }
    if (tToken?.symbol === 'jpy') {
      exchangeRate = Number(fromPriceData?.jpy);
    }
    if (tToken?.symbol === 'ngn') {
      exchangeRate = Number(fromPriceData?.ngn);
    }
    if (tToken?.symbol === 'php') {
      exchangeRate = Number(fromPriceData?.php);
    }
    if (tToken?.symbol === 'chf') {
      exchangeRate = Number(fromPriceData?.chf);
    }
    if (tToken?.symbol === 'aud') {
      exchangeRate = Number(fromPriceData?.aud);
    }

    const tValue = Number(fValue) * exchangeRate;

    const serviceFee = (0.25 / 100) * Number(fValue); // 0.25%

    // const networkFees = await getTxFees(txData) // from the blockchain
    const networkFee = (0.25 / 100) * Number(fValue); // should be from the blockchain

    const youSend = Number(fValue);

    const youGet = Number(fValue) - (serviceFee + networkFee);
    const { amount, estimatedGas } = await getTokenAmount(fToken, fValue);

    const tValueFormatted = Number(tValue).toFixed(3);

    const response = {
      youSend,
      youGet,
      serviceFee,
      networkFee,
      exchangeRate: exchangeRate.toFixed(3),
      tValue,
      tValueFormatted,
      amount,
      estimatedGas,
    };

    return response;
  }
  if (service === 'sell' && subService === 'sellCard') {

    let exchangeRate;
    //=================================================================================================
    const fromPrice = await geTokenPriceData(fToken?.id)
    const fromPriceData = fromPrice?.market_data?.current_price;
//=================================================================================================

    if (tToken?.symbol === 'usd') {
      exchangeRate = Number(fromPriceData?.usd);
    }
    if (tToken?.symbol === 'gbp') {
      exchangeRate = Number(fromPriceData?.gbp);
    }
    if (tToken?.symbol === 'eur') {
      exchangeRate = Number(fromPriceData?.eur);
    }
    if (tToken?.symbol === 'rub') {
      exchangeRate = Number(fromPriceData?.rub);
    }
    if (tToken?.symbol === 'cad') {
      exchangeRate = Number(fromPriceData?.cad);
    }
    if (tToken?.symbol === 'aed') {
      exchangeRate = Number(fromPriceData?.aed);
    }
    if (tToken?.symbol === 'jpy') {
      exchangeRate = Number(fromPriceData?.jpy);
    }
    if (tToken?.symbol === 'ngn') {
      exchangeRate = Number(fromPriceData?.ngn);
    }
    if (tToken?.symbol === 'php') {
      exchangeRate = Number(fromPriceData?.php);
    }
    if (tToken?.symbol === 'chf') {
      exchangeRate = Number(fromPriceData?.chf);
    }
    if (tToken?.symbol === 'aud') {
      exchangeRate = Number(fromPriceData?.aud);
    }

    const tValue = Number(fValue) * exchangeRate;

    const serviceFee = (0.25 / 100) * Number(fValue); // 0.25%

    // const networkFees = await getTxFees(txData) // from the blockchain
    const networkFee = (0.25 / 100) * Number(fValue); // should be from the blockchain
    const processingFee = (1 / 100) * Number(fValue); // (1%) should be from the blockchain

    const youSend = Number(fValue);

    const youGet = Number(fValue) - (serviceFee + networkFee);
    const { amount, estimatedGas } = await getTokenAmount(fToken, fValue);

    const tValueFormatted = Number(tValue).toFixed(3);

    const response = {
      youSend,
      youGet,
      serviceFee,
      networkFee,
      processingFee,
      exchangeRate: exchangeRate.toFixed(3),
      tValue,
      tValueFormatted,
      amount,
      estimatedGas,
    };

    return response;
  }
  if (service === 'exchange' && subService === 'exchange') {

    //=================================================================================================
    const fromPrice = await geTokenPriceData(fToken?.id)
    const fromPriceData = fromPrice?.market_data?.current_price;
    const toPrice = await geTokenPriceData(tToken?.id)
    const toPriceData = toPrice?.market_data?.current_price;
//=================================================================================================

    const fUSDPrice = Number(fromPriceData?.usd); // usd price
    const tUSDPrice = Number(toPriceData?.usd); // usd price

    const exchangeRate = 1 * (fUSDPrice / tUSDPrice); //fToken?.symbol/tToken.symbol

    const tValue = Number(fValue) * exchangeRate;

    const serviceFee = (0.25 / 100) * Number(fValue); // 0.25%

    // const networkFees = await getTxFees(txData) // from the blockchain
    const networkFee = (0.25 / 100) * Number(fValue); // should be from the blockchain

    const youSend = Number(fValue);

    const youGet = Number(fValue) - (serviceFee + networkFee);
    const { amount, estimatedGas } = await getTokenAmount(fToken, fValue);

    const tValueFormatted = Number(tValue).toFixed(3);

    const response = {
      youSend,
      youGet,
      serviceFee,
      networkFee,
      exchangeRate: exchangeRate.toFixed(3),
      tValue,
      tValueFormatted,
      amount,
      estimatedGas,
    };

    return response;
  }
};

const getTokenAmount = async (token, value) => {
  let amount; // fValue formatted to transaction decimals
  let amountFixed;
  let estimatedGas; // to be completed
  if (token?.chain === 'Bitcoin') {
    const satoshiToSend = Number(value) * 1e8; // check || 1e9
    amount = satoshiToSend;
  }

  if (token?.chain === 'Ethereum') {
    // amount = ethers.utils.parseUnits(value.toString(), Number(token?.decimals)); // Example: 1 ETH or 1 token (adjust as needed)
    amount = parseUnits(
      value.toString(),
      token?.decimals.toString()
    ).toString(); // Gives fully formatted value and not hex value

    // amountFixed = Number(amount).toFixed(3);
  }

  if (token?.chain === 'Tron') {
    // Amount in SUN (TRX)
    // const amount = 1000000; // Example: 1 TRX or 1,000,000 SUN (adjust as needed)
    const amountInSUN = Number(value) * 1e6;

    amount = amountInSUN;
  }

  // amountFixed = Number(amount).toFixed(3);

  const response = {
    amount,
    // estimatedGas,
    estimatedGas: 0.001, // testing
    // amountFixed,
  };

  // console.log({ response: response });
  return response;
};
export { geTokenPriceData, getTransactionRateApi };
