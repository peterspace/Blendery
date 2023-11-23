import React, { useState } from "react";

import { PiLockSimpleOpenBold } from "react-icons/pi";
import { IoCardOutline } from "react-icons/io5";
import { MdOutlinePhoneIphone } from "react-icons/md";
//FaArrowRight

import { FaArrowRight } from "react-icons/fa";
// border-solid hover:border-2 hover:border-mediumspringgreen

export const Providers = (props) => {
  const { setProvider, provider, selectedProvider, setSelectedProvider } =
    props;

  return (
    <div
      className={`${
        selectedProvider == provider?.name
          ? `border-2 border-solid border-mediumspringgreen`
          : ``
      } cursor-pointer h-[86px] box-border flex justify-center rounded-lg bg-white shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] xs:w-[340px] md:w-[532px] p-4`}
      onClick={() => {
        setSelectedProvider(provider?.name);
        setProvider(provider);
      }}
    >
      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex flex-row justify-center items-center p-2 gap-1">
          {/* <div className={`${bgClass ? bgClass : 'bg-gray-100 rounded'}`}>
          <img src={logo} alt="" className="h-[25px] w-$ p-1" />
        </div> */}
          {provider?.name === "Phone" && (
            <>
              <MdOutlinePhoneIphone size={20} />
            </>
          )}
          {provider?.name === "Card" && (
            <>
              <IoCardOutline size={20} />
            </>
          )}
          <div className="text-lg py-2">{provider?.name}</div>
        </div>

        <div className="h-3 py-2">
          <FaArrowRight size={20} />
        </div>
      </div>
    </div>
  );
};
