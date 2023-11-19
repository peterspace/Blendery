import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookSquare } from 'react-icons/fa';
import { AiFillApple, AiOutlineClose } from 'react-icons/ai';

import {
  registerUser,
  validateEmail,
  registrationConfirmation,
  authenticateUserFacebook,
  successUserFacebook,
  errorUserFacebook,
  authenticateUserGoogle,
  successUserGoogle,
  errorUserGoogle,
} from '../../services/apiService';

import { registerSocial } from '../../services/apiService';

import { toast } from 'react-toastify';

import { useDispatch } from 'react-redux';

export const Register = (props) => {
  const { setIsLogin, setIsRegister, setIsForgot, redirectS, setRedirectHome } = props;
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [isregisterCompleted, setIsregisterCompleted] = useState(false);
  const [newData, setNewData] = useState('');
  console.log({ newData: newData });

  const [emailResponse, setEmailResponse] = useState();
  console.log({ emailResponse: emailResponse });

  const [isLocal, setIsLocal] = useState(false);
  const [isFacebook, setIsFacebook] = useState(false);
  const [isGoogle, setIsGoogle] = useState(false);
  // const [redirectHome, setRedirectHome] = useState(false);

  const dispatch = useDispatch();

  async function SubmitSignup(ev) {
    ev.preventDefault();

    if (!name || !email || !password) {
      return toast.error('All fields are required');
    }
    if (password.length < 6) {
      return toast.error('Passwords must be up to 6 characters');
    }
    if (!validateEmail(email)) {
      return toast.error('Please enter a valid email');
    }

    const userData = {
      name,
      email,
      password,
      role: 'User',
    };

    try {
      const data = await registerUser(userData);
      console.log(data);
      if (data) {
        // localStorage.setItem('isLoggedIn', JSON.stringify(true));
        localStorage.setItem('user', JSON.stringify(data));
        setTimeout(() => {
          setRedirect(true);
        }, 2000);
      }
    } catch (e) {
      alert('Registration failed. Please try again later');
    }
  }

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
      navigate('/auth');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redirect]);

  useEffect(() => {
    if (redirectS) {
      navigate('/auth');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redirectS]);


  const signup = (
    <div className="flex justify-center rounded-lg bg-white shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[375px] md:w-[500px] p-4">
      <div className="flex flex-col gap-[24px]">
        {/* <div className="flex flex-col gap-[12px] md:gap-[24px]"> */}
        <div className="flex flex-col gap-[8px] md:gap-[12px]">
          <div className="flex flex-row justify-between mt-[24px]">
            <div className="text-[18px] md:text-[24px] font-extrabold leading-[32px] inline-block">
              Signup for Blendery
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
          {/* <div className="text-gray-200">
            Blendery is totally free to use. Sign up using your email address
            below to get started.
          </div> */}

          <div className="flex bg-lightslategray-300 md:w-[452px] w-[370px] h-px" />
        </div>
        <div
          className="flex flex-col gap-[8px]"
        >
          <div className="flex flex-row h-[48px] bg-whitesmoke-100 rounded outline outline-lightslategray-300 outline-[1px]">
            <input
              className="ml-2 text-[16px] md:text-[14px] leading-[24px] text-darkslategray-200 placeholder-darkgray-100 inline-block w-full outline-none bg-gray-100"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
          </div>
          <div className="flex flex-row h-[48px] bg-whitesmoke-100 rounded outline outline-lightslategray-300 outline-[1px]">
            <input
              className="ml-2 text-[16px] md:text-[14px] leading-[24px] text-darkslategray-200 placeholder-darkgray-100 inline-block w-full outline-none bg-gray-100"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
          </div>
          <div className="flex flex-row h-[48px] bg-whitesmoke-100 rounded outline outline-lightslategray-300 outline-[1px]">
            <input
              className="ml-2 text-[16px] md:text-[14px] leading-[24px] text-darkslategray-200 placeholder-darkgray-100 inline-block w-full outline-none bg-gray-100"
              type="password"
              placeholder="password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex flex-row gap-2">
              <input
                type="checkbox"
                className="outline-none bg-whitesmoke-100 accent-mediumspringgreen focus:accent-mediumspringgreen/30"
              />

              <div className="flex flex-row gap-1 text-xs md:text-smi">
                <div className="leading-[20px] text-darkslategray-200 inline-block">
                  <span>{`I agree to the `}</span>
                  <span
                    className="text-mediumspringgreen"
                    onClick={''}
                  >{`terms and conditions`}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-2">
              <input
                type="checkbox"
                className="outline-none bg-whitesmoke-100 accent-mediumspringgreen focus:accent-mediumspringgreen/30"
              />

              <div className="flex flex-row gap-1 text-xs md:text-smi">
                <div className="leading-[20px] text-darkslategray-200 inline-block">
                  Send me promos, market news and product updates
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-center items-center">
            <div
              className="cursor-pointer flex flex-row justify-center items-center bg-mediumspringgreen hover:opacity-90 text-white h-[49px] shrink-0 rounded w-full"
              onClick={SubmitSignup}
            >
              Create account
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-2 items-center justify-center">
          <div className="flex bg-lightslategray-300 w-[150px] h-px" />
          <div className="text-smi leading-[22px] text-gray-300 inline-block">
            or
          </div>
          <div className="flex bg-lightslategray-300 w-[150px] h-px" />
        </div>
        <div className="flex flex-col justify-center items-center gap-[16px]">
          <div
            className="cursor-pointer flex flex-row justify-center items-center bg-white hover:opacity-90 text-mediumspringgreen h-[49px] shrink-0 rounded w-full outline outline-mediumspringgreen outline-[1.5px]"
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
            className="cursor-pointer flex flex-row justify-center items-center bg-white hover:opacity-90 text-mediumspringgreen h-[49px] shrink-0 rounded w-full outline outline-mediumspringgreen outline-[1.5px]"
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

        <div className="flex flex-row gap-2 justify-center">
          <div className="text-smi leading-[22px] text-gray-300 inline-block">
            Already have an account?
          </div>
          <div
            className="cursor-pointer text-smi leading-[22px] text-mediumspringgreen hover:text-opacity-80 inline-block"
            onClick={() => {
              setIsLogin(true);
              setIsRegister(false);
              setIsForgot(false);
            }}
          >
            Log in
          </div>
        </div>

        <div className="flex flex-row w-full" />
      </div>
    </div>
  );
  return <>{signup}</>;
};
