import {
    parseEther,
    formatEther,
    parseUnits,
    formatUnits,
  } from '@ethersproject/units';
  

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
  export const fetchTransactionRate = async (userData) => {
    const { fToken, tToken, fValue, service, subService, fromPriceData, toPriceData } =
      userData;
  
    if (service === 'defi' && subService === 'defi') {
      //=================================================================================================
      const fUSDPrice = Number(fromPriceData?.usd); // usd price
      const tUSDPrice = Number(toPriceData?.usd); // usd price
  
      let exchangeRate = 1 * (fUSDPrice / tUSDPrice); //fToken?.symbol/tToken.symbol
  
      let tValue = Number(fValue) * exchangeRate;
  
      const serviceFee = (0.25 / 100) * Number(fValue); // 0.25%
  
      // const networkFees = await getTxFees(txData) // from the blockchain
      const networkFee = (0.25 / 100) * Number(fValue); // should be from the blockchain
  
      const youSend = Number(fValue);
  
      const youGet = Number(fValue) - (serviceFee + networkFee);
      const { amount, estimatedGas } = await getTokenAmount(fToken, fValue);
  
      let tValueFormatted = Number(tValue).toFixed(4);
      if (isNaN(tValue)) {
        tValue = 0;
      }
  
      if (isNaN(exchangeRate)) {
        exchangeRate = 0;
      }
  
      if (isNaN(tValueFormatted)) {
        tValueFormatted = 0;
      }
  
      const response = {
        youSend,
        youGet,
        serviceFeeRaw: serviceFee,
        serviceFee: serviceFee.toFixed(3),
        networkFeeRew: networkFee,
        networkFee: networkFee.toFixed(3),
        exchangeRateRaw: exchangeRate,
        exchangeRate: exchangeRate.toFixed(3),
        tValue,
        tValueFormatted,
        amount,
        estimatedGas,
        fromPriceData,
        toPriceData,
      };
  
      return response;
    }
    if (service === 'buy' && subService === 'buyCash') {
      //=================================================================================================
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
  
      let tValue = Number(fValue) / exchangeRate;
  
      const serviceFee = (0.25 / 100) * Number(fValue); // 0.25%
  
      // const networkFees = await getTxFees(txData) // from the blockchain
      const networkFee = (0.25 / 100) * Number(fValue); // should be from the blockchain
  
      const youSend = Number(fValue);
  
      const youGet = Number(fValue) - (serviceFee + networkFee);
      const { amount, estimatedGas } = await getTokenAmount(
        tToken,
        tValue.toString()
      );
  
      let tValueFormatted = Number(tValue).toFixed(4);
      if (isNaN(tValue)) {
        tValue = 0;
      }
  
      if (isNaN(exchangeRate)) {
        exchangeRate = 0;
      }
  
      if (isNaN(tValueFormatted)) {
        tValueFormatted = 0;
      }
      const response = {
        youSend,
        youGet,
        serviceFeeRaw: serviceFee,
        serviceFee: serviceFee.toFixed(3),
        networkFeeRew: networkFee,
        networkFee: networkFee.toFixed(3),
        exchangeRateRaw: exchangeRate,
        exchangeRate: exchangeRate.toFixed(3),
        tValue,
        tValueFormatted,
        amount,
        estimatedGas,
        toPriceData,
      };
  
      return response;
    }
    if (service === 'buy' && subService === 'buyCard') {
      //=================================================================================================
  
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
  
      let tValue = Number(fValue) / exchangeRate;
  
      // const networkFees = await getTxFees(txData) // from the blockchain
      const processingFee = (1 / 100) * Number(fValue); // (1%) should be from the blockchain
  
      const youSend = Number(fValue);
  
      const youGet = Number(fValue) - processingFee;
      //============================={TODO}=====================================
      const { amount, estimatedGas } = await getTokenAmount(
        tToken,
        tValue.toString()
      );
      let tValueFormatted = Number(tValue).toFixed(4);
      if (isNaN(tValue)) {
        tValue = 0;
      }
  
      if (isNaN(exchangeRate)) {
        exchangeRate = 0;
      }
  
      if (isNaN(tValueFormatted)) {
        tValueFormatted = 0;
      }
  
      const response = {
        youSend,
        youGet,
        processingFeeRaw: processingFee,
        processingFee: processingFee.toFixed(3),
        exchangeRateRaw: exchangeRate,
        exchangeRate: exchangeRate.toFixed(3),
        tValue,
        tValueFormatted,
        amount,
        estimatedGas,
        toPriceData,
      };
      console.log({ response: response });
      return response;
    }
    if (service === 'sell' && subService === 'sellCash') {
      //=================================================================================================
      //=================================================================================================
  
      let exchangeRate;
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
  
      let tValue = Number(fValue) * exchangeRate;
  
      const serviceFee = (0.25 / 100) * Number(fValue); // 0.25%
  
      // const networkFees = await getTxFees(txData) // from the blockchain
      const networkFee = (0.25 / 100) * Number(fValue); // should be from the blockchain
  
      const youSend = Number(fValue);
  
      const youGet = Number(fValue) - (serviceFee + networkFee);
      const { amount, estimatedGas } = await getTokenAmount(fToken, fValue);
  
      let tValueFormatted = Number(tValue).toFixed(4);
      if (isNaN(tValue)) {
        tValue = 0;
      }
  
      if (isNaN(exchangeRate)) {
        exchangeRate = 0;
      }
  
      if (isNaN(tValueFormatted)) {
        tValueFormatted = 0;
      }
  
      const response = {
        youSend,
        youGet,
        serviceFeeRaw: serviceFee,
        serviceFee: serviceFee.toFixed(3),
        networkFeeRew: networkFee,
        networkFee: networkFee.toFixed(3),
        exchangeRateRaw: exchangeRate,
        exchangeRate: exchangeRate.toFixed(3),
        tValue,
        tValueFormatted,
        amount,
        estimatedGas,
        fromPriceData,
      };
  
      return response;
    }
    if (service === 'sell' && subService === 'sellCard') {
      //=================================================================================================
      //=================================================================================================
  
      let exchangeRate;
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
  
      let tValue = Number(fValue) * exchangeRate;
  
      const serviceFee = (0.25 / 100) * Number(fValue); // 0.25%
  
      // const networkFees = await getTxFees(txData) // from the blockchain
      const networkFee = (0.25 / 100) * Number(fValue); // should be from the blockchain
      const processingFee = (1 / 100) * Number(fValue); // (1%) should be from the blockchain
  
      const youSend = Number(fValue);
  
      const youGet = Number(fValue) - (serviceFee + networkFee);
      const { amount, estimatedGas } = await getTokenAmount(fToken, fValue);
  
      let tValueFormatted = Number(tValue).toFixed(4);
  
      if (isNaN(tValue)) {
        tValue = 0;
      }
  
      if (isNaN(exchangeRate)) {
        exchangeRate = 0;
      }
  
      if (isNaN(tValueFormatted)) {
        tValueFormatted = 0;
      }
  
      const response = {
        youSend,
        youGet,
        serviceFeeRaw: serviceFee,
        serviceFee: serviceFee.toFixed(3),
        networkFeeRew: networkFee,
        networkFee: networkFee.toFixed(3),
        exchangeRateRaw: exchangeRate,
        exchangeRate: exchangeRate.toFixed(3),
        processingFeeRaw: processingFee,
        processingFee: processingFee.toFixed(3),
        tValue,
        tValueFormatted,
        amount,
        estimatedGas,
        fromPriceData,
      };
  
      return response;
    }
    if (service === 'exchange' && subService === 'exchange') {
      //=================================================================================================
      //=================================================================================================
      const fUSDPrice = Number(fromPriceData?.usd); // usd price
      const tUSDPrice = Number(toPriceData?.usd); // usd price
  
      let exchangeRate = 1 * (fUSDPrice / tUSDPrice); //fToken?.symbol/tToken.symbol
  
      let tValue = Number(fValue) * exchangeRate;
  
      const serviceFee = (0.25 / 100) * Number(fValue); // 0.25%
  
      // const networkFees = await getTxFees(txData) // from the blockchain
      const networkFee = (0.25 / 100) * Number(fValue); // should be from the blockchain
  
      const youSend = Number(fValue);
  
      const youGet = Number(fValue) - (serviceFee + networkFee);
      const { amount, estimatedGas } = await getTokenAmount(fToken, fValue);
  
      let tValueFormatted = Number(tValue).toFixed(3);
      if (isNaN(tValue)) {
        tValue = 0;
      }
  
      if (isNaN(exchangeRate)) {
        exchangeRate = 0;
      }
  
      if (isNaN(tValueFormatted)) {
        tValueFormatted = 0;
      }
  
      const response = {
        youSend,
        youGet,
        serviceFeeRaw: serviceFee,
        serviceFee: serviceFee.toFixed(3),
        networkFeeRew: networkFee,
        networkFee: networkFee.toFixed(3),
        exchangeRateRaw: exchangeRate,
        exchangeRate: exchangeRate.toFixed(3),
        tValue,
        tValueFormatted,
        amount,
        estimatedGas,
        fromPriceData,
        toPriceData,
      };
      return response;
    }
  };

