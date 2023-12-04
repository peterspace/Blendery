import React, { useState, useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookSquare } from 'react-icons/fa';
import { loginUser, validateEmail } from '../../services/apiService';

import { toast } from 'react-toastify';

import { useDispatch } from 'react-redux';
import { LoginUser } from '../../redux/features/user/userSlice';
import { useFormik } from 'formik';

export const Login = (props) => {
  const {
    setIsLogin,
    setIsRegister,
    setIsForgot,
    redirectS,
    setUser,
    setIsLoggedIn,
    setRedirectHome,
  } = props;
  const dispatch = useDispatch();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [redirect, setRedirect] = useState(false);
  const [isLocal, setIsLocal] = useState(false);
  const [isFacebook, setIsFacebook] = useState(false);
  const [isGoogle, setIsGoogle] = useState(false);
  // const [redirectHome, setRedirectHome] = useState(false);

  const { values, handleChange, handleSubmit, touched, errors, resetForm } =
    useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validate: (values) => {
        const errors = {};

        if (!values.email) {
          errors.email = 'Email address is required!';
        }

        if (!values.password) {
          errors.password = 'Password is required!';
        }

        return errors;
      },
      onSubmit: ({ email, password }) => {
        handleLogin(email, password);
      },
    });

  async function handleLogin(email, password) {
    let userData;

    if (isLocal) {
      if (!validateEmail(email)) {
        return toast.error('Please enter a valid email');
      }

      userData = {
        email,
        password,
      };
    }

    try {
      const data = await loginUser(userData);
      console.log({ userData: data });
      if (data) {
        dispatch(LoginUser(data));
        localStorage.setItem('isLoggedIn', JSON.stringify(true));
        localStorage.setItem('user', JSON.stringify(data));
        // setUser(data);
        setIsLoggedIn(true);
        setTimeout(() => {
          setRedirect(true);
        }, 200);

        // window.location.reload(); // relaod to update changes m,ade by localStoarge
      }
    } catch (e) {
      alert('Login failed');
    }
  }

  //====================================

  useEffect(() => {
    if (isGoogle) {
      setTimeout(() => {
        window.location.href = `${BACKEND_URL}/auth/google`;
        setIsGoogle(false);
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGoogle]);

  useEffect(() => {
    if (isFacebook) {
      setTimeout(() => {
        window.location.href = `${BACKEND_URL}/auth/facebook`;
        setIsFacebook(false);
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFacebook]);

  useEffect(() => {
    if (redirect) {
      handleSuccessLogin();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redirect]);

  useEffect(() => {
    if (redirectS) {
      handleSuccessLogin();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redirectS]);

  // useEffect(() => {
  //   if (redirectHome) {
  //     navigate('/');
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [redirectHome]);

  const handleSuccessLogin = () => {
    console.log('loggedIn sucessfull');
  };

  /************************************************************************************** */
  /******************************{TODO REDIRECT TO LOGIN********************************* */
  /************************************************************************************** */

  /************************************************************************************** */
  /******************************{TODO REDIRECT TO LOGIN********************************* */
  /************************************************************************************** */

  const login = (
    <div className="flex justify-center rounded-lg bg-white shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[375px] md:w-[500px] p-4">
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[8px] md:gap-[12px]">
          <div className="flex flex-row justify-between mt-[24px]">
            <div className="text-[18px] md:text-[24px] font-extrabold leading-[32px] inline-block">
              Login to Blendery
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
        <form onSubmit={handleSubmit}>
          <div
            className="flex flex-col gap-[8px]"
            onClick={() => {
              setIsLocal(true);
              setIsFacebook(false);
              setIsGoogle(false);
            }}
          >
            <div className="flex flex-col mb-6 h-[48px] bg-white rounded outline outline-lightslategray-300 outline-[1px]">
              <input
                id="email"
                name="email"
                type="email"
                className="ml-2 text-[16px] md:text-[14px] leading-[24px] text-darkslategray-200 placeholder-darkgray-100 inline-block outline-none bg-white"
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
            <div className="flex flex-col mb-6 h-[48px] bg-white rounded outline outline-lightslategray-300 outline-[1px]">
              <input
                id="password"
                name="password"
                type="password"
                className="ml-2 text-[16px] md:text-[14px] leading-[24px] text-darkslategray-200 placeholder-darkgray-100 inline-block outline-none bg-white"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
              />
              <div>
                {touched.password && errors.password ? (
                  <div className="mt-6 text-[#ef4444]">{errors.password}</div>
                ) : null}
              </div>
            </div>
            <div className="flex flex-row justify-center items-center">
              <div
                className="cursor-pointer flex flex-row justify-center items-center bg-bgPrimary hover:opacity-90 text-white h-[49px] shrink-0 rounded w-full"
                onClick={handleSubmit}
              >
                Login
              </div>
            </div>
          </div>
        </form>

        <div className="flex flex-row gap-2 items-center justify-center">
          <div className="flex bg-lightslategray-300 w-[150px] h-px" />
          <div className="text-smi leading-[22px] text-gray-300 inline-block">
            or
          </div>
          <div className="flex bg-lightslategray-300 w-[150px] h-px" />
        </div>
        <div className="flex flex-col justify-center items-center gap-[16px]">
          {/* <a href={`${BACKEND_URL}/auth/google`}>
            <div
              className="cursor-pointer flex flex-row justify-center items-center bg-white hover:opacity-90 text-bgPrimary h-[49px] shrink-0 rounded w-full outline outline-bgPrimary outline-[1.5px]"
              onClick={() => {
                setIsLocal(false);
                setIsFacebook(false);
                setIsGoogle(true);
              }}
            >
              <FcGoogle size={20} />
              <span className="ml-2"> Continue with Google</span>
            </div>
          </a> */}
          <div
            className="cursor-pointer flex flex-row justify-center items-center bg-white hover:opacity-90 text-bgPrimary h-[49px] shrink-0 rounded w-full outline outline-bgPrimary outline-[1.5px]"
            onClick={() => {
              setIsLocal(false);
              setIsFacebook(false);
              setIsGoogle(true);
            }}
          >
            <FcGoogle size={20} />
            <span className="ml-2"> Continue with Google</span>
          </div>
          <div
            className="cursor-pointer flex flex-row justify-center items-center bg-white hover:opacity-90 text-bgPrimary h-[49px] shrink-0 rounded w-full outline outline-bgPrimary outline-[1.5px]"
            onClick={() => {
              setIsLocal(false);
              setIsFacebook(false);
              setIsGoogle(true);
            }}
          >
            <FaFacebookSquare size={20} />
            <span className="ml-2"> Continue with Facebook</span>
          </div>
        </div>

        <div className="flex flex-row justify-between">
          <div className="flex flex-row">
            <div
              className="cursor-pointer text-smi leading-[22px] text-bgPrimary hover:text-opacity-80 inline-block"
              onClick={() => {
                setIsLogin(false);
                setIsRegister(false);
                setIsForgot(true);
              }}
            >
              Forgot your password?
            </div>
          </div>
          <div className="flex flex-row gap-2 justify-center">
            <div className="text-smi leading-[22px] text-gray-300 inline-block">
              {"Don't have an account?"}
            </div>
            <div
              className="cursor-pointer text-smi leading-[22px] text-bgPrimary hover:text-opacity-80 inline-block"
              onClick={() => {
                setIsLogin(false);
                setIsRegister(true);
                setIsForgot(false);
              }}
            >
              Signup now!
            </div>
          </div>
        </div>

        <div className="flex flex-row w-full" />
      </div>
    </div>
  );
  return <>{login}</>;
};
