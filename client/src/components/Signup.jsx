import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookSquare } from 'react-icons/fa';

export const Signup = (props) => {
  const { setIsCheckout, setIsConfirm } = props;
  const signup = (
    <div className="flex justify-center rounded-lg bg-white shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[320px] xs:w-[340px] md:w-[500px] p-4">
      <div className="flex flex-col gap-[24px]">
        {/* <div className="flex flex-col gap-[12px] md:gap-[24px]"> */}
        <div className="flex flex-col gap-[8px] md:gap-[12px]">
          <div className="flex flex-row gap-4 mt-[24px]">
            <div className="text-[18px] md:text-[24px] font-extrabold leading-[32px] inline-block">
              Signup to make payment
            </div>
          </div>
          <div className="flex bg-lightslategray-300 md:w-[452px] w-[300px] h-px" />
        </div>
        <div className="flex flex-row h-[62px] bg-bgSecondary rounded">
          <input
            type="text"
            className="ml-2 text-[16px] md:text-[14px] leading-[24px] text-darkslategray-200 placeholder-darkgray-100 inline-block w-full outline-none bg-gray-100"
            placeholder="Email"
          />
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex flex-row gap-2">
            {/* <input type="checkbox" className="outline-none bg-bgSecondary" /> */}
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
        <div
          className="flex flex-row justify-center items-center"
          onClick={() => {
            setIsCheckout(false);
            setIsConfirm(true);
          }}
        >
          <div className="cursor-pointer flex flex-row justify-center items-center bg-bgPrimary hover:opacity-90 text-white h-[49px] shrink-0 rounded w-full">
            Sign up & make payment
          </div>
        </div>
        <div className="flex flex-row gap-4 justify-center items-center">
          <div className="cursor-pointer rounded bg-gray-100 h-[30px] w-[30px] outline outline-gray-200">
            <FcGoogle size={30} color="#b4b4b4" />
          </div>
          <div className="cursor-pointer rounded h-[34px] w-[34px]">
            <FaFacebookSquare size={34} color="#3C5A9F" />
          </div>
        </div>
        <div className="flex flex-row gap-2 justify-center">
          <div className="text-smi leading-[22px] text-gray-300 inline-block">
            Already have an account?
          </div>
          <div className="cursor-pointer text-smi leading-[22px] text-bgPrimary hover:text-opacity-80 inline-block">
            Log in
          </div>
        </div>

        <div className="flex flex-row w-full" />
      </div>
    </div>
  );
  return <>{signup}</>;
};
