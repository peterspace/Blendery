import axios from 'axios';
import { toast } from 'react-toastify';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

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
// loginSocial
export const loginSocial = async (userData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/users/loginSocial`,
      userData,
      { withCredentials: true }
    );
    if (response.data) {
      toast.success('User Registered successfully');
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
    const response = await axios.post(
      `${BACKEND_URL}/user/pin`,
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

export const createYandexPay = async (userData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/payment/createYandexPay`,
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
