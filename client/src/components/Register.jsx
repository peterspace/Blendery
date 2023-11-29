import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookSquare } from 'react-icons/fa';
import { AiFillApple, AiOutlineClose } from 'react-icons/ai';

export const Register = (props) => {
  const { setIsLogin, setIsRegister, setIsLoggedIn } = props;
  const signup = (
    <div className="flex justify-center rounded-lg bg-white shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[375px] md:w-[500px] p-4">
      <div className="flex flex-col gap-[24px]">
        {/* <div className="flex flex-col gap-[12px] md:gap-[24px]"> */}
        <div className="flex flex-col gap-[8px] md:gap-[12px]">
          <div className="flex flex-row justify-between mt-[24px]">
            <div className="text-[18px] md:text-[24px] font-extrabold leading-[32px] inline-block">
              Signup for Blendery
            </div>
            <div
              className="cursor-pointer"
              onClick={() => {
                setIsLogin(false);
                setIsRegister(false);
                setIsLoggedIn(false);
                // use localStorage
              }}
            >
              <AiOutlineClose size={16} />
            </div>
          </div>
          {/* <div className="text-gray-200">
            Blendery is totally free to use. Sign up using your email address
            below to get started.
          </div> */}

          <div className="flex bg-lightslategray-300 md:w-[452px] w-[370px] h-px" />
        </div>
        <div className="flex flex-row h-[48px] bg-bgSecondary rounded outline outline-lightslategray-300 outline-[1px]">
          <input
            type="text"
            className="ml-2 text-[16px] md:text-[14px] leading-[24px] text-darkslategray-200 placeholder-darkgray-100 inline-block w-full outline-none bg-gray-100"
            placeholder="Username"
            value={''}
            onChange={''}
          />
        </div>
        <div className="flex flex-row h-[48px] bg-bgSecondary rounded outline outline-lightslategray-300 outline-[1px]">
          <input
            type="text"
            className="ml-2 text-[16px] md:text-[14px] leading-[24px] text-darkslategray-200 placeholder-darkgray-100 inline-block w-full outline-none bg-gray-100"
            placeholder="Email"
            value={''}
            onChange={''}
          />
        </div>
        <div className="flex flex-row h-[48px] bg-bgSecondary rounded outline outline-lightslategray-300 outline-[1px]">
          <input
            type="text"
            className="ml-2 text-[16px] md:text-[14px] leading-[24px] text-darkslategray-200 placeholder-darkgray-100 inline-block w-full outline-none bg-gray-100"
            placeholder="Password"
            value={''}
            onChange={''}
          />
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex flex-row gap-2">
            <input
              type="checkbox"
              className="outline-none bg-bgSecondary accent-bgPrimary focus:accent-bgPrimary/30"
            />

            <div className="flex flex-row gap-1 text-xs md:text-smi">
              <div className="leading-[20px] text-darkslategray-200 inline-block">
                <span>{`I agree to the `}</span>
                <span
                  className="text-bgPrimary"
                  onClick={''}
                >{`terms and conditions`}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <input
              type="checkbox"
              className="outline-none bg-bgSecondary accent-bgPrimary focus:accent-bgPrimary/30"
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
            className="cursor-pointer flex flex-row justify-center items-center bg-bgPrimary hover:opacity-90 text-white h-[49px] shrink-0 rounded w-full"
            onClick={() => {
              setIsLogin(true);
              setIsRegister(false);
              setIsLoggedIn(false);
              // use localStorage
            }}
          >
            Create account
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
          <div className="cursor-pointer flex flex-row justify-center items-center bg-white hover:opacity-90 text-bgPrimary h-[49px] shrink-0 rounded w-full outline outline-bgPrimary outline-[1.5px]">
            <FcGoogle size={20} />
            <span className="ml-2"> Continue with Google</span>
          </div>
          <div className="cursor-pointer flex flex-row justify-center items-center bg-white hover:opacity-90 text-bgPrimary h-[49px] shrink-0 rounded w-full outline outline-bgPrimary outline-[1.5px]">
            <AiFillApple size={20} />
            <span className="ml-2">Continue with Apple</span>
          </div>
          <div className="cursor-pointer flex flex-row justify-center items-center bg-white hover:opacity-90 text-bgPrimary h-[49px] shrink-0 rounded w-full outline outline-bgPrimary outline-[1.5px]">
            <FaFacebookSquare size={20} />
            <span className="ml-2"> Continue with Facebook</span>
          </div>
        </div>

        <div className="flex flex-row gap-2 justify-center">
          <div className="text-smi leading-[22px] text-gray-300 inline-block">
            Already have an account?
          </div>
          <div
            className="cursor-pointer text-smi leading-[22px] text-bgPrimary hover:text-opacity-80 inline-block"
            onClick={() => {
              setIsLogin(true);
              setIsRegister(false);
              setIsLoggedIn(false);
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
