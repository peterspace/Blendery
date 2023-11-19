import axios from 'axios';
import { parseUnits, parseEther, formatUnits } from '@ethersproject/units';
  const fee = import.meta.env.VITE_SWAP_FEE;
  const dexAddress = import.meta.env.VITE_DEX_ADDRESS;

// const API_URL = "http://localhost:8800/api-v1";
// const API_URL = import.meta.env.VITE_BACKEND_URL;
// const API_URL = import.meta.env.VITE_ONEINCH_API_ENDPOINT;
// const API_KEY = import.meta.env.VITE_ONEINCH_API_KEY;

const API_URL = 'https://api.1inch.dev';
const token = 'NX04N086HworSUASL824J1C6F9OAObOJ';
const version = '5.2';

export const API = axios.create({
  baseURL: API_URL,
  responseType: 'json',
});

//============{Axios Api request}===========================
export const apiRequestOneInch = async (url) => {
  try {
    const result = await API(url, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      },
    });

    return result?.data;
  } catch (error) {
    const err = error.response.data;
    console.log(err);
    return { status: err.success, message: err.message };
  }
};

//=========={Fetch api}===================
export const apiRequestExternal = async (url) => {
  try {
    const response = await fetch(API_URL + url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      },
    });

    return response.json();
  } catch (error) {
    const err = error.response ? error.response : error;
    console.log(err);
    return { status: err.success, message: err.message };
  }
};

//==========================={          }===============================================
//==========================={  IN USE  }===============================================
//==========================={          }===============================================

//=========={Fetch api}===================

const apiRequest = async (url) => {
  try {
    const response = await fetch(API_URL + url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      },
    });

    return response.json();
  } catch (error) {
    const err = error.response ? error.response : error;
    console.log(err);
    return { status: err.success, message: err.message };
  }
};

async function updateFromPrice(userData) {
  // const chainId = req.body.chainId || 1;
  try {
    const chainId = userData?.chainId;

    const fToken = userData?.fToken;
    const usdtToken = userData?.usdtToken;
    const fValue = userData?.fValue || '1';
    const uSDTToUsdRate = userData?.uSDTToUsdRate;

    //==============={Primary Data}=========================

    const { fromPrice, totalFromPrice } = await getFromUSDPrice({
      chainId,
      fToken,
      fValue,
      usdtToken,
      uSDTToUsdRate,
    });

    console.log({ fromPrice: fromPrice });
    console.log({ totalFromPrice: totalFromPrice });

    let newResponse = {
      fValue,
      fromPrice,
      totalFromPrice,
    };
    return newResponse;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

//=========={Active Backend}========================
async function updatePrice(userData) {
  try {
    const chainId = userData?.chainId;

    const fToken = userData?.fToken;
    const tToken = userData?.tToken;
    const usdtToken = userData?.usdtToken;

    const fValue = userData?.fValue || '1';

    const slippage = userData?.slippage || '1';

    const fAddress = fToken?.address;
    const tAddress = tToken?.address;

    //==============={Primary Data}=========================

    const fDecimals = fToken?.decimals;
    const tDecimals = tToken?.decimals;

    const {
      validatedValue,
      tValue,
      tValueFormatted,
      estimatedGas,
      allProtocols,
    } = await getPriceInternal({
      chainId,
      fAddress,
      fDecimals,
      tAddress,
      tDecimals,
      fValue,
    });

    const { exchangeRate } = await getPriceCompare({ chainId, fToken, tToken });
    console.log({ exchangeRate: exchangeRate });

    let newResponse = {
      chainId,
      slippage,
      fToken,
      tToken,
      usdtToken,
      fAddress,
      tAddress,
      fValue,
      tValue,
      tValueFormatted,
      estimatedGas,
      validatedValue,
      allProtocols,
      exchangeRate,
      isChainChange: false,
    };
    return newResponse;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function fetchChainPrice(userData) {
  const { chainId, chainBalance, usdtToken, uSDTToUsdRate } = userData;
  if (chainId === null || chainId === undefined) {
    return;
  } else {
    try {
      const { chainPrice, totalChainPrice } = await getChainUSDPrice({
        chainId,
        chainBalance,
        usdtToken,
        uSDTToUsdRate,
      });

      let newResponse = {
        chainPrice,
        totalChainPrice,
      };
      return newResponse;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
    }
  }
}

//==========={Dependences}=============================
//================={New API's}================================

// using usdt for price conversion
const getPriceCompare = async ({ chainId, fToken, tToken }) => {
  if (chainId === null || chainId === undefined) {
    return;
  } else {
    let amount = parseUnits('1', fToken?.decimals.toString());

    let URL = `swap/${version}/${chainId}/quote?fromTokenAddress=${fToken?.address}&toTokenAddress=${tToken?.address}&amount=${amount}&fee=${fee}&gasLimit=3000000`;
    const response = await apiRequest(URL);
    // const response = await axios.get(URL, {
    //   headers: { accept: 'application/json' },
    // });
    if (response.data) {
      let rawValue = response.data.toTokenAmount;
      let value = rawValue / 10 ** tToken.decimals;
      let valueFormmated = value.toFixed(4);
      let exchangeRate = valueFormmated;

      let newData = { exchangeRate };
      return newData;
    }
  }
};

const getFromUSDPrice = async ({
  chainId,
  fToken,
  fValue,
  usdtToken,
  uSDTToUsdRate,
}) => {
  // const { uSDTToUsdRate } = await usdPrice();

  if (fToken?.address === usdtToken.address) {
    let value = '1';
    // let fromPrice = '1';

    let fromPrice = uSDTToUsdRate.toString();
    let totalFromRaw = Number(fValue) * Number(value);
    let totalFromPrice = totalFromRaw.toFixed(4);
    let newData = { fromPrice, totalFromPrice };
    return newData;
  } else {
    if (chainId === null || chainId === undefined) {
      return;
    } else {
      let amount = parseUnits('1', fToken?.decimals.toString());

      let URL = `swap/${version}/${chainId}/quote?fromTokenAddress=${fToken?.address}&toTokenAddress=${usdtToken?.address}&amount=${amount}&fee=${fee}&gasLimit=3000000`;
      const response = await apiRequest(URL);
      // const response = await axios.get(URL, {
      //   headers: { accept: 'application/json' },
      // });
      if (response.data) {
        let rawValue = response.data.toTokenAmount;
        // let value = rawValue / 10 ** usdtToken?.decimals;
        //======{New update}===============================
        let valueConverted = rawValue / 10 ** usdtToken?.decimals;
        let value = uSDTToUsdRate * Number(valueConverted); // check
        let valueFormmated = value.toFixed(4);
        let fromPrice = valueFormmated;
        let totalFromRaw = Number(fValue) * Number(value);
        let totalFromPrice = totalFromRaw.toFixed(2);

        let newData = {
          fromPrice,
          totalFromPrice,
        };
        console.info('FromUSDRate', newData);
        return newData;
      }
    }
  }
};

const getToUSDPrice = async ({
  chainId,
  tToken,
  tValue,
  usdtToken,
  uSDTToUsdRate,
}) => {
  // const { uSDTToUsdRate } = await usdPrice();

  if (tToken?.address === usdtToken?.address) {
    let value = '1';
    // let toPrice = '1';
    let toPrice = uSDTToUsdRate.toString();
    let totalToPriceRaw = Number(tValue) * Number(value);
    let totalToPrice = totalToPriceRaw.toFixed(2);
    let newData = { toPrice, totalToPrice };
    return newData;
  } else {
    if (chainId === null || chainId === undefined) {
      return;
    } else {
      let amount = parseUnits('1', tToken?.decimals.toString());
      // let ratio = uSDRatio.toString();
      // let amount = parseUnits(ratio, tToken?.decimals.toString());
      let URL = `swap/${version}/${chainId}/quote?fromTokenAddress=${tToken?.address}&toTokenAddress=${usdtToken?.address}&amount=${amount}&fee=${fee}&gasLimit=3000000`;
      const response = await apiRequest(URL);
      // const response = await axios.get(URL, {
      //   headers: { accept: 'application/json' },
      // });
      if (response.data) {
        let rawValue = response.data.toTokenAmount;
        // let value = rawValue / 10 ** usdtToken?.decimals;
        //======{New update}===============================
        let valueConverted = rawValue / 10 ** usdtToken?.decimals;
        let value = uSDTToUsdRate * Number(valueConverted); // check
        let valueFormmated = value.toFixed(4);
        let toPrice = valueFormmated;
        let totalToPriceRaw = Number(tValue) * Number(value);
        let totalToPrice = totalToPriceRaw.toFixed(4);

        let newData = {
          toPrice,
          totalToPrice,
        };

        return newData;
      }
    }
  }
};

// connected Chain USD Value

// This has to be a seperate call, as it depends on when a user is connected and on the users balance
// So all "Balances" calls will not fall under this category

const getChainUSDPrice = async ({
  chainId,
  chainBalance,
  usdtToken,
  uSDTToUsdRate,
}) => {
  // const { uSDTToUsdRate } = await usdPrice();

  if (chainId === null || chainId === undefined) {
    return;
  } else {
    const addressNative = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
    const decimalsNative = '18';
    // const { chainId, chainBalance, usdtToken } = userData;
    let amount = parseUnits('1', decimalsNative);
    let URL = `swap/${version}/${chainId}/quote?fromTokenAddress=${addressNative}&toTokenAddress=${usdtToken?.address}&amount=${amount}&fee=${fee}&gasLimit=3000000`;
    const response = await apiRequest(URL);
    // const response = await axios.get(URL, {
    //   headers: { accept: 'application/json' },
    // });
    if (response.data) {
      let rawValue = response.data.toTokenAmount;
      // let value = rawValue / 10 ** usdtToken?.decimals;
      let valueConverted = rawValue / 10 ** usdtToken?.decimals;
      let value = uSDTToUsdRate * Number(valueConverted); // check
      let valueFormmated = value.toFixed(4);
      let chainPrice = valueFormmated;
      let totalChainRaw = Number(chainBalance) * Number(value);
      let totalChainPrice = totalChainRaw.toFixed(2);

      let newData = {
        chainPrice,
        totalChainPrice,
      };
      return newData;
    }
  }
};

const getPriceInternal = async ({
  chainId,
  fAddress,
  fDecimals,
  tAddress,
  tDecimals,
  fValue,
}) => {
  let validatedValue = '';

  if (chainId === null || chainId === undefined) {
    return;
  } else {
    if (fAddress != '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
      validatedValue = parseUnits(
        fValue.toString(),
        fDecimals.toString()
      ).toString();
    } else {
      validatedValue = parseEther(fValue.toString()).toString();
    }
    let URL = `swap/${version}/${chainId}/quote?fromTokenAddress=${fAddress}&toTokenAddress=${tAddress}&amount=${validatedValue}&fee=${fee}&gasLimit=3000000`;

    const response = await apiRequest(URL);
    // const response = await axios.get(URL, {
    //   headers: { accept: 'application/json' },
    // });
    if (response.data) {
      const data = response.data;
      console.log('data:', data);

      const { toTokenAmount, estimatedGas, protocols } = data;

      let toTokenAmountFormatted = '';

      if (tAddress != '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
        toTokenAmountFormatted = formatUnits(
          toTokenAmount.toString(),
          tDecimals.toString()
        ).toString();
      } else {
        toTokenAmountFormatted = parseEther(
          toTokenAmount.toString()
        ).toString();
      }

      let toTokenAmountFixed = Number(toTokenAmountFormatted).toFixed(3);

      const result = {
        validatedValue,
        tValue: toTokenAmount,
        tValueFormatted: toTokenAmountFixed,
        estimatedGas: estimatedGas,
        allProtocols: protocols,
      };

      console.log({ priceDataRaw: result });
      return result;
    }
  }
};

async function fetchSpender(chainId) {
  if (chainId === null || chainId === undefined) {
    return;
  } else {
    try {
      let URL = `swap/${version}/${chainId}/approve/spender`;
      const response = await apiRequest(URL);
      // const response = await axios.get(URL, {
      //   headers: { accept: 'application/json' },
      // });

      if (response.data) {
        return response.data.address;
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
    }
  }
}

async function updateSwapEstimates(userData) {
  try {
    //==============={Primary Data}=========================
    const chainId = userData?.chainId;
    const fToken = userData?.fToken;
    const slippage = userData?.slippage;
    const tToken = userData?.tToken;
    const fValue = userData?.fValue || '1';
    //==============={Primary Data}=========================
    const fAddress = fToken?.address;
    const tAddress = tToken?.address;
    const fDecimals = fToken?.decimals;
    const tDecimals = tToken?.decimals;

    const {
      validatedValue,
      tValue,
      tValueFormatted,
      estimatedGas,
      allProtocols,
    } = await getPriceInternal({
      chainId,
      fAddress,
      fDecimals,
      tAddress,
      tDecimals,
      fValue,
    });

    const { exchangeRate } = await getPriceCompare({ chainId, fToken, tToken });
    console.log({ exchangeRate: exchangeRate });

    let newResponse = {
      chainId,
      slippage,
      fToken,
      tToken,
      fAddress,
      tAddress,
      fValue,
      tValue,
      tValueFormatted,
      estimatedGas,
      validatedValue,
      allProtocols,
      exchangeRate,
      isChainChange: false,
    };
    return newResponse;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

export const approveSwap = async (userData) => {
  try {
    const chainId = userData?.chainId;
    const fToken = userData?.fToken;
    const slippage = userData?.slippage;
    const tToken = userData?.tToken;
    const fValue = userData?.fValue || '1';
    //==============={Primary Data}=========================
    const fAddress = fToken?.address;
    const tAddress = tToken?.address;
    const fDecimals = fToken?.decimals;
    const tDecimals = tToken?.decimals;

    const {
      validatedValue,
      tValue,
      tValueFormatted,
      estimatedGas,
      allProtocols,
    } = await getPriceInternal({
      chainId,
      fAddress,
      fDecimals,
      tAddress,
      tDecimals,
      fValue,
    });

    let URL = `swap/${version}/${chainId}/approve/transaction?tokenAddress=${fToken?.address}&amount=${validatedValue}`;
    const response = await apiRequest(URL);
    // const response = await axios.get(URL, {
    //   headers: { accept: 'application/json' },
    // });

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
};

export const createSwap = async (userData) => {
  try {
    const chainId = userData?.chainId;
    const fToken = userData?.fToken;
    const slippage = userData?.slippage;
    const tToken = userData?.tToken;
    const fValue = userData?.fValue || '1';
    //==============={Primary Data}=========================
    const fAddress = fToken?.address;
    const tAddress = tToken?.address;
    const fDecimals = fToken?.decimals;
    const tDecimals = tToken?.decimals;

    const walletAddress = userData?.walletAddress;
    const protocols = userData?.protocols;

    const {
      validatedValue,
      tValue,
      tValueFormatted,
      estimatedGas,
      allProtocols,
    } = await getPriceInternal({
      chainId,
      fAddress,
      fDecimals,
      tAddress,
      tDecimals,
      fValue,
    });

    let URL = `swap/${version}/${chainId}/swap?fromTokenAddress=${fToken?.address}&toTokenAddress=${tToken?.address}&amount=${validatedValue}&fromAddress=${walletAddress}&slippage=${slippage}&protocols=${protocols}&referrerAddress=${dexAddress}&fee=${fee}&disableEstimate=true&allowPartialFill=false&gasLimit=3000000`;
    const response = await apiRequest(URL);
    // const response = await axios.get(URL, {
    //   headers: { accept: 'application/json' },
    // });

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
};

export {
  //========================{In use}==============================
  updatePrice,
  updateFromPrice,
  fetchChainPrice,
  fetchSpender,
  updateSwapEstimates,
};
