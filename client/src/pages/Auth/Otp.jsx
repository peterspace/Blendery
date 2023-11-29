import { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { forgotOtp, verifyOtp, validateEmail } from '../../services/apiService';

import { toast } from 'react-toastify';

import Modal from './Modal';
import { useDispatch } from 'react-redux';
import { LoginUser } from '../../redux/features/user/userSlice';
import { useFormik } from 'formik';

//eenglishwithpeter@gmail.com
export const Otp = (props) => {
  const { setIsLoggedIn } = props;
  const dispatch = useDispatch();

  const params = useParams();
  const { authId } = params;
  // initially true
  const isForgotOtpL = localStorage.getItem('isForgotOtp')
    ? JSON.parse(localStorage.getItem('isForgotOtp'))
    : true;
  const [isForgotOtp, setIsForgotOtp] = useState(isForgotOtpL);

  // initially false
  const isVerifyOtpL = localStorage.getItem('isVerifyOtp')
    ? JSON.parse(localStorage.getItem('isVerifyOtp'))
    : false;
  const [isVerifyOtp, setIsVerifyOtp] = useState(isVerifyOtpL);

  const { values, handleChange, handleSubmit, touched, errors, resetForm } =
    useFormik({
      initialValues: {
        email: '',
        otp1: '',
        otp2: '',
        otp3: '',
        otp4: '',
      },
      validate: (values) => {
        const errors = {};

        if (isForgotOtp && !values.email) {
          errors.email = 'Email is required!';
        }

        if (isVerifyOtp) {
          if (!values.otp1) {
            errors.otp1 = 'OTP1 is required!';
          } else if (values.otp1.length !== 4) {
            errors.otp1 = 'OTP must be only 4 characters';
          }

          if (!values.otp2) {
            errors.otp2 = 'OTP2 is required!';
          } else if (values.otp2.length !== 4) {
            errors.otp2 = 'OTP must be only 4 characters';
          }

          if (!values.otp3) {
            errors.otp3 = 'OTP3 is required!';
          } else if (values.otp3.length !== 4) {
            errors.otp3 = 'OTP must be only 4 characters';
          }

          if (!values.otp4) {
            errors.otp4 = 'OTP4 is required!';
          } else if (values.otp4.length !== 4) {
            errors.otp4 = 'OTP must be only 4 characters';
          }
        }

        return errors;
      },
      onSubmit: ({ email, otp1, otp2, otp3, otp4 }) => {
        if (isForgotOtp) {
          handleForgotSubmit(email);
          setIsForgotOtp(false);
          setIsVerifyOtp(true);
        } else if (isVerifyOtp) {
          handleVerify(otp1, otp2, otp3, otp4);
        }
      },
    });

  const [redirectHome, setRedirectHome] = useState(false);
  const [redirectVerify, setRedirectVerify] = useState(false);

  useEffect(() => {
    localStorage.setItem('isVerifyOtp', JSON.stringify(isVerifyOtp));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVerifyOtp]);

  useEffect(() => {
    localStorage.setItem('isForgotOtp', JSON.stringify(isForgotOtp));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isForgotOtp]);

  // useEffect(() => {
  //   localStorage.setItem('authId', JSON.stringify(authId));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [authId]);

  // async function LoginSubmit() {

  async function handleForgotSubmit(email) {
    if (!validateEmail(email)) {
      return toast.error('Please enter a valid email');
    }
    const userData = {
      email,
    };

    try {
      const data = await forgotOtp(userData);
      if (data) {
        toast.success(data.message);
        resetForm();
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async function handleVerify(otp1, otp2, otp3, otp4) {
    if (!authId) {
      return toast.error('OTP must be authorized');
    }

    const fullOtp = `${otp1}${otp2}${otp3}${otp4}`;
    const userData = {
      otp: fullOtp,
      authId,
    };

    try {
      const data = await verifyOtp(userData);

      if (data) {
        dispatch(LoginUser(data));
        localStorage.setItem('isLoggedIn', JSON.stringify(true));
        localStorage.setItem('user', JSON.stringify(data));
        // setUser(data);
        setIsLoggedIn(true);
        resetForm();
        setTimeout(() => {
          setIsVerifyOtp(false);
          setIsForgotOtp(true);
          setRedirectVerify(true);
        }, 200);

        // window.location.reload(); // relaod to update changes m,ade by localStoarge
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  if (redirectVerify) {
    // return <Navigate to={'/landingPage'} />;
    return <Navigate to={'/account'} />;
  }

  if (redirectHome) {
    // return <Navigate to={'/landingPage'} />;
    return <Navigate to={'/'} />;
  }

  const login = (
    <div className="flex justify-center rounded-lg bg-white shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[375px] md:w-[500px] p-4">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-[24px]">
          <div className="flex flex-col gap-[8px] md:gap-[12px]">
            <div className="flex flex-row justify-between mt-[24px]">
              <div className="text-[18px] md:text-[24px] font-extrabold leading-[32px] inline-block">
                Verify account
              </div>
              <div className="transition-transform duration-300 hover:scale-125 cursor-pointer flex flex-row justify-center items-center p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#130D1A"
                  className="w-5 h-5"
                  onClick={() => setRedirectHome(true)}
                >
                  <path
                    fillRule="evenodd"
                    d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            <div className="flex bg-lightslategray-300 md:w-[452px] w-[370px] h-px" />
          </div>
          {isForgotOtp && (
            <>
              <div className="flex flex-col gap-[8px]">
                <div className="flex flex-col mb-4 h-[48px] bg-whitesmoke-100 rounded outline outline-lightslategray-300 outline-[1px]">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="ml-2 text-[16px] md:text-[14px] leading-[24px] text-darkslategray-200 placeholder-darkgray-100 inline-block w-full outline-none bg-gray-100"
                    placeholder="Email"
                    value={values.email}
                    onChange={handleChange}
                  />
                  <div>
                    {touched.email && errors.email ? (
                      <div className="mt-6 text-[#ef4444]">{errors.email}</div>
                    ) : null}
                  </div>
                </div>
                <div className="flex flex-row justify-center items-center">
                  <div
                    className="cursor-pointer flex flex-row justify-center items-center bg-bgPrimary hover:opacity-90 text-white h-[49px] shrink-0 rounded w-full"
                    onClick={handleSubmit}
                  >
                    Get OTP
                  </div>
                </div>
              </div>
            </>
          )}
          {isVerifyOtp && (
            <>
              <div className="flex flex-col">
                <div className="flex flex-row justify-center items-center">
                  <div className="flex flex-row justify-center items-center gap-[24px] mb-[24px] w-[200px]">
                    <div className="flex flex-col mb-4 justify-center items-center">
                      <input
                        id="otp1"
                        name="otp1"
                        type="text"
                        className="text-center text-[16px] md:text-[18px] text-darkslategray-200 placeholder-darkgray-100 outline-none bg-gray-100"
                        placeholder="OTP 1"
                        value={values.otp1}
                        onChange={handleChange}
                      />
                      <div>
                        {touched.otp1 && errors.otp1 ? (
                          <div className="mt-6 text-[#ef4444]">
                            {errors.otp1}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex flex-col mb-4 justify-center items-center">
                      <input
                        id="otp2"
                        name="otp2"
                        type="text"
                        className="text-center text-[16px] md:text-[18px] text-darkslategray-200 placeholder-darkgray-100 outline-none bg-gray-100"
                        placeholder="OTP 2"
                        value={values.otp2}
                        onChange={handleChange}
                      />
                      <div>
                        {touched.otp2 && errors.otp2 ? (
                          <div className="mt-6 text-[#ef4444]">
                            {errors.otp2}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex flex-col mb-4 justify-center items-center">
                      {' '}
                      <input
                        id="otp3"
                        name="otp3"
                        type="text"
                        className="text-center text-[16px] md:text-[18px] text-darkslategray-200 placeholder-darkgray-100 outline-none bg-gray-100"
                        placeholder="OTP 3"
                        value={values.otp3}
                        onChange={handleChange}
                      />
                      <div>
                        {touched.otp3 && errors.otp3 ? (
                          <div className="mt-6 text-[#ef4444]">
                            {errors.otp3}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex flex-col mb-4 justify-center items-center">
                      <input
                        id="otp4"
                        name="otp4"
                        type="text"
                        className="text-center text-[16px] md:text-[18px] text-darkslategray-200 placeholder-darkgray-100 outline-none bg-gray-100"
                        placeholder="OTP 4"
                        value={values.otp4}
                        onChange={handleChange}
                      />
                      <div>
                        {touched.otp4 && errors.otp4 ? (
                          <div className="mt-6 text-[#ef4444]">
                            {errors.otp4}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row justify-center items-center">
                  <div
                    className="cursor-pointer flex flex-row justify-center items-center bg-bgPrimary hover:opacity-90 text-white h-[49px] shrink-0 rounded w-full"
                    onClick={handleSubmit}
                  >
                    Verify
                  </div>
                </div>
              </div>
            </>
          )}
          {isVerifyOtp && (
            <div className="flex flex-row gap-2 justify-end mr-[24px]">
              <div className="text-smi leading-[22px] text-gray-300 inline-block">
                OTP expired?
              </div>
              <div
                className="cursor-pointer text-smi leading-[22px] text-bgPrimary hover:text-opacity-80 inline-block"
                onClick={() => {
                  setIsVerifyOtp(false);
                  setIsForgotOtp(true);
                }}
              >
                Resend
              </div>
            </div>
          )}

          {isForgotOtp && (
            <div className="flex flex-row gap-2 justify-end mr-[24px]">
              <div className="text-smi leading-[22px] text-gray-300 inline-block">
                Already have an account?
              </div>
              <div
                className="cursor-pointer text-smi leading-[22px] text-bgPrimary hover:text-opacity-80 inline-block"
                onClick={() => {
                  setRedirectVerify(true);
                }}
              >
                Login
              </div>
            </div>
          )}

          <div className="flex flex-row w-full" />
        </div>
      </form>
    </div>
  );
  return (
    <>
      <div className="h-screen mt-[64px] mb-[64px] overflow-auto">
        <Modal visible={true}>{login}</Modal>
      </div>
    </>
  );
};
