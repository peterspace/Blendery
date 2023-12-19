import axios from 'axios';
import { toast } from 'react-toastify';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
//updated with defi functions
export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

//=====================================================================================================================================
//======================================================={Local}==============================================================================

// Register User
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/users/register`,
      userData,
      { withCredentials: true }
    );
    if (response.statusText === 'OK') {
      toast.success('User Registered successfully');
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// Register User
export const registerSocial = async (userData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/users/registerSocial`,
      userData,
      { withCredentials: true }
    );
    if (response.data) {
      toast.success('Signup Successful...');
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
// loginSocial
export const loginSocial = async (userData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/users/loginSocial`,
      userData,
      { withCredentials: true }
    );
    if (response.data) {
      toast.success('Login Successful...');
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// Login User
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/users/login`, userData);
    if (response.data) {
      toast.success('Login Successful...');
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

//======================================================={Facebook}==============================================================================

// Register User
export const authenticateUserFacebook = async () => {
  try {
    // const response = await axios.get(`${BACKEND_URL}/auth/facebook`);
    const response = await axios.get(`${BACKEND_URL}/users/loginFacebook`);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// /success callback
export const successUserFacebook = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/auth/facebook/success`);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// /success callback
export const errorUserFacebook = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/auth/facebook/error`);
    if (response.data) {
      toast.success('Error authentication via Facebook...');
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

//======================================================={Google}==============================================================================

export const authenticateUserGoogle = async () => {
  try {
    // const response = await axios.get(`${BACKEND_URL}/auth/google`);
    // const response = await axios.get(`${BACKEND_URL}/users/loginGoogle`);
    const response = await axios.get(`${BACKEND_URL}/auth/google`);

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// /success callback
export const successUserGoogle = async () => {
  try {
    // const response = await axios.get(`${BACKEND_URL}/auth/google/success`);
    const response = await axios.get(`${BACKEND_URL}/users/loginByGoogle`);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// /success callback
export const errorUserGoogle = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/auth/google/error`);
    if (response.data) {
      toast.success('Error authentication via Google...');
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

//=====================================================================================================================================

// Logout User
export const logoutUser = async () => {
  try {
    await axios.get(`${BACKEND_URL}/users/logout`);
    localStorage.removeItem('user');
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// Forgot Password
export const forgotPassword = async (userData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/users/forgotpassword`,
      userData
    );
    toast.success(response.data.message);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// Reset Password
export const resetPassword = async (userData, resetToken) => {
  try {
    const response = await axios.put(
      `${BACKEND_URL}/users/resetpassword/${resetToken}`,
      userData
    );
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// Forgot Password
export const forgotOtp = async (userData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/users/forgotOtp`,
      userData
    );
    toast.success(response.data.message);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// Reset Password
export const verifyOtp = async (userData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/users/verifyOtp`,
      userData
    );
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const getPin = async (userData) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/user/pin`, userData);
    toast.success(response.data.message);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// Get Login Status
export const getLoginStatus = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/users/loggedin`);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
// Get User Profile
export const getUser = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/users/getuser`);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
// Update Profile
export const updateUser = async (formData) => {
  try {
    const response = await axios.patch(
      `${BACKEND_URL}/users/updateuser`,
      formData
    );
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
// Update Profile
export const changePassword = async (formData) => {
  try {
    const response = await axios.patch(
      `${BACKEND_URL}/users/changepassword`,
      formData
    );
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const stripeCheckOut = async (userData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/payment/stripCheckout`,
      userData
    );
    if (response.statusText === 'OK') {
      toast.success('Payment successful');
    }
    // return response.data;
    // return response;

    return response.data.success;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const stripeCheckOutSession = async (userData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/payment/create-checkout-session`,
      userData
    );
    if (response.statusText === 'OK') {
      toast.success('Payment successful');
    }
    // return response.data;
    // return response;

    return response.data.url;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const createYandexPayBuy = async (userData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/payment/createYandexPayBuy`,
      userData
    );
    if (response.data) {
      toast.success('invoice created');
    }
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const createYandexPaySell = async (userData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/payment/createYandexPaySell`,
      userData
    );
    if (response.data) {
      toast.success('invoice created');
    }
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
export const paymentConfirmation = async (userData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/payment/paymentConfirmation`,
      userData
    );
    if (response.statusText === 'OK') {
      toast.success('payment successful');
    }

    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const registrationConfirmation = async (userData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/users/registrationConfirmation`,
      userData
    );
    if (response.statusText === 'OK') {
      toast.success('registration confirmation');
    }

    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

//=================={Transaction Routes}============================================================

export const getTokenExchangeRate = async (userData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/transaction/getTokenExchangeRate`,
      userData
    );
    console.log({ exchangeData: response.data });

    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const getTransactionRateInfo = async (userData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/transaction/getTransactionRate`,
      userData
    );
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const updateTransactionsAutomatically = async (userData) => {
  try {
    const response = await axios.patch(
      `${BACKEND_URL}/transaction/updateTransactionsAutomatically`,
      userData
    );
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const updateTransactionRatesByIdService = async (userData) => {
  try {
    const response = await axios.patch(
      `${BACKEND_URL}/transaction/updateTransactionRatesById`,
      userData
    );
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const updateOneBlockchainTransactionByIdService1 = async (userData) => {
  console.log({ updateinBlockChain: 'client input' });
  console.log({ input: userData });

  try {
    const response = await axios.patch(
      `${BACKEND_URL}/transaction/updateOneBlockchainTransactionById`,
      userData
    );
    console.log({ updateinBlockChain: 'client output' });
    console.log({ output: response.data });

    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const updateOneBlockchainTransactionByIdService = async (userData) => {
  console.log({ updateinBlockChain: 'client input' });
  console.log({ input: userData });

  try {
    const response = await axios.patch(
      `${BACKEND_URL}/transaction/updateOneBlockchainTransactionById`,
      userData
    );
    console.log({ updateinBlockChain: 'client output' });
    console.log({ output: response.data });

    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};


export const updateOnePaidTransactionByIdService = async (userData) => {
  console.log({ updateinPaidTransaction: 'client input' });
  console.log({ input: userData });

  try {
    const response = await axios.patch(
      `${BACKEND_URL}/transaction/updateOnePaidTransactionById`,
      userData
    );
    console.log({ updateinPaidTransaction: 'client output' });
    console.log({ output: response.data });

    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const getTransactionByTxIdService = async (txId) => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/transaction/getTransactionByTxId/${txId}`
    );
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

//=============================================================================

export const getUserTransactions = async () => {
  const response = await axios.get(
    `${BACKEND_URL}/transaction/getUserTransactions`
  );
  return response.data;
};

export const getOneUserTransaction = async (userData) => {
  if (!userData) return;

  const response = await axios.get(
    `${BACKEND_URL}/transaction/getOneUserTransaction`,
    userData
  );
  return response.data;
};

export const getAllTransactionsByUser = async () => {
  const response = await axios.get(
    `${BACKEND_URL}/transaction/getAllTransactionsByUser`
  );
  return response.data;
};

export const updateOneBlockchainTransactionById = async (userData) => {
  if (!userData) return;

  if (userData?.status !== 'Pending' || userData?.status !== 'Paid') {
    return;
  }
  const response = await axios.patch(
    `${BACKEND_URL}/transaction/updateOneBlockchainTransactionById`,
    userData
  );
  return response.data;
};

// export const getAllTransactions = async (userData) => {
//   if (!userData) return;

//   const response = await axios.get(
//     `${BACKEND_URL}/transaction/getAllTransactions`,
//     userData
//   );
//   return response.data;
// };

export const getAllTransactions = async () => {
  const response = await axios.get(
    `${BACKEND_URL}/transaction/getAllTransactions`
  );
  return response.data;
};

export const getTransactionByTxId = async (txId) => {
  if (!txId) return;

  const response = await axios.get(
    `${BACKEND_URL}/transaction/getTransactionByTxId/${txId}`
  );
  return response.data;
};

export const updateTransactionById = async (userData) => {
  if (!userData) return;

  const response = await axios.patch(
    `${BACKEND_URL}/transaction/updateTransactionById`,
    userData
  );
  return response.data;
};

export const updateTransactionByIdService = async (userData) => {
  if (!userData) return;

  const response = await axios.patch(
    `${BACKEND_URL}/transaction/updateTransactionById`,
    userData
  );
  return response.data;
};

export const getUserInactiveTransactions = async () => {
  const response = await axios.get(
    `${BACKEND_URL}/transaction/getUserInactiveTransactions`
  );
  return response.data;
};

export const getUserActiveTransactions = async () => {
  const response = await axios.get(
    `${BACKEND_URL}/transaction/getUserActiveTransactions`
  );
  return response.data;
};

//============{transactions by services and subservices}============

export const getUserExchange = async () => {
  const response = await axios.get(
    `${BACKEND_URL}/transaction/getUserExchange`
  );
  return response.data;
};

export const getUserDefi = async () => {
  const response = await axios.get(`${BACKEND_URL}/transaction/getUserDefi`);
  return response.data;
};

export const getUserBuyCash = async () => {
  const response = await axios.get(`${BACKEND_URL}/transaction/getUserBuyCash`);
  return response.data;
};

export const getUserBuyCard = async () => {
  const response = await axios.get(`${BACKEND_URL}/transaction/getUserBuyCard`);
  return response.data;
};

export const getUserSellCash = async () => {
  const response = await axios.get(
    `${BACKEND_URL}/transaction/getUserSellCash`
  );
  return response.data;
};

export const getUserSellCard = async () => {
  const response = await axios.get(
    `${BACKEND_URL}/transaction/getUserSellCard`
  );
  return response.data;
};

//============{Admin: transactions by services and subservices}==================================================

export const getAdminExchange = async () => {
  const response = await axios.get(
    `${BACKEND_URL}/transaction/getAdminExchange`
  );
  return response.data;
};

export const getAdminDefi = async () => {
  const response = await axios.get(`${BACKEND_URL}/transaction/getAdminDefi`);
  return response.data;
};

export const getAdminBuyCash = async () => {
  const response = await axios.get(
    `${BACKEND_URL}/transaction/getAdminBuyCash`
  );
  return response.data;
};

export const getAdminBuyCard = async () => {
  const response = await axios.get(
    `${BACKEND_URL}/transaction/getAdminBuyCard`
  );
  return response.data;
};

export const getAdminSellCash = async () => {
  const response = await axios.get(
    `${BACKEND_URL}/transaction/getAdminSellCash`
  );
  return response.data;
};

export const getAdminSellCard = async () => {
  const response = await axios.get(
    `${BACKEND_URL}/transaction/getAdminSellCard`
  );
  return response.data;
};

//========================{Tokens}======================================

export const getTokenListFiat = async () => {
  const response = await axios.get(`${BACKEND_URL}/token/getTokenListFiat`);
  if (response.data) {
    return response.data;
  }
};
export const getTokenListStore = async () => {
  const response = await axios.get(`${BACKEND_URL}/token/getTokenListStore`);
  if (response.data) {
    return response.data;
  }
};

export const getTokensDefiByIdService = async (chainId) => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/token/getTokensDefiById/${chainId}`
    );
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
/*
 **************************************************************************************************************
 **************************************************************************************************************

                                          Defi Block
                      
 **************************************************************************************************************
 **************************************************************************************************************
 */

export const getTransactionSwapRateService = async (userData) => {
  console.log({ transactData: userData });
  try {
    const response = await axios.post(
      `${BACKEND_URL}/transaction/getTransactionRateSwap`,
      userData
    );
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const getTokenExchangeRateSwapService = async (userData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/transaction/getTokenExchangeRateSwap`,
      userData
    );
    console.log({ swappingDataClient: response.data });

    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const getChainRateSwapService = async (userData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/transaction/getChainRateSwap`,
      userData
    );
    console.log({ exchangeData: response.data });

    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const getChainPriceService = async (userData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/transaction/getChainPrice`,
      userData
    );

    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const getSpenderService = async (userData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/transaction/getSpender`,
      userData
    );

    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const swapService = async (userData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/transaction/swap`,
      userData
    );
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const getSwapApprovalService = async (userData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/transaction/getSwapApproval`,
      userData
    );
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const createTransactionService = async (userData) => {
  if (!userData) return;
  try {
    const response = await axios.post(
      `${BACKEND_URL}/transaction/createTransaction`,
      userData
    );
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

//======={Master wallet balances}=========================

export const getMasterWalletsService = async () => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/transaction/getMasterWallets`
    );
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const getMasterWalletsAdminService = async () => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/transaction/getMasterWalletsAdmin`
    );
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
