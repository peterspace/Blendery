import React, { useState, useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { AiFillApple, AiOutlineClose } from 'react-icons/ai';
import { resetPassword } from '../../services/apiService';

import { toast } from 'react-toastify';

import { useDispatch } from 'react-redux';
import Modal from './Modal';

export const Reset = () => {
  const { resetToken } = useParams();

  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [redirectHome, setRedirectHome] = useState(false);

  const dispatch = useDispatch();

  async function ResetSubmit(ev) {
    ev.preventDefault();

    if (password.length < 6) {
      return toast.error('Passwords must be up to 6 characters');
    }
    if (password !== password2) {
      return toast.error('Passwords do not match');
    }

    const userData = {
      password,
      password2,
    };

    try {
      const data = await resetPassword(userData, resetToken);
      toast.success(data.message);
      if (data) {
        setTimeout(() => {
          setRedirect(true);
        }, 200);

        // window.location.reload(); // relaod to update changes m,ade by localStoarge
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  if (redirect) {
    // return <Navigate to={'/landingPage'} />;
    return <Navigate to={'/auth'} />;
  }

  if (redirectHome) {
    // return <Navigate to={'/landingPage'} />;
    return <Navigate to={'/'} />;
  }

  const login = (
    <div className="flex justify-center rounded-lg bg-white shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[375px] md:w-[500px] p-4">
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[8px] md:gap-[12px]">
          <div className="flex flex-row justify-between mt-[24px]">
            <div className="text-[18px] md:text-[24px] font-extrabold leading-[32px] inline-block">
              Reset Password
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
        <div className="flex flex-col gap-[8px]">
          <div className="flex flex-row h-[48px] bg-whitesmoke-100 rounded outline outline-lightslategray-300 outline-[1px]">
            <input
              type="password"
              className="ml-2 text-[16px] md:text-[14px] leading-[24px] text-darkslategray-200 placeholder-darkgray-100 inline-block w-full outline-none bg-gray-100"
              placeholder="New Password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
          </div>
          <div className="flex flex-row h-[48px] bg-whitesmoke-100 rounded outline outline-lightslategray-300 outline-[1px]">
            <input
              type="password"
              className="ml-2 text-[16px] md:text-[14px] leading-[24px] text-darkslategray-200 placeholder-darkgray-100 inline-block w-full outline-none bg-gray-100"
              placeholder="Confirm New Password"
              value={password2}
              onChange={(ev) => setPassword2(ev.target.value)}
            />
          </div>
          <div className="flex flex-row justify-center items-center">
            <div
              className="cursor-pointer flex flex-row justify-center items-center bg-mediumspringgreen hover:opacity-90 text-white h-[49px] shrink-0 rounded w-full"
              onClick={ResetSubmit}
            >
              Reset Password
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
              setRedirect(true);
            }}
          >
            <span className="ml-2"> Continue to Login</span>
          </div>
        </div>

        <div className="flex flex-row gap-2 justify-center">
          <div className="text-smi leading-[22px] text-gray-300 inline-block">
            Already have an account?
          </div>
          <div
            className="cursor-pointer text-smi leading-[22px] text-mediumspringgreen hover:text-opacity-80 inline-block"
            onClick={() => {
              setRedirect(true);
            }}
          >
            Log in
          </div>
        </div>

        <div className="flex flex-row w-full" />
      </div>
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
