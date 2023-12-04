import React, { useState } from 'react';

import { FaBitcoin } from 'react-icons/fa'; // Bitcoin
import { SiTether } from 'react-icons/si'; // Tether
import { FaEthereum } from 'react-icons/fa'; //Ethereum
import { SiLitecoin } from 'react-icons/si'; //Litecoin

export const OrderCard = () => {
  const estimator = (
    <div className="flex flex-col w-[300px] md:w-[452px] gap-[8px]">
      {/* start */}
      <div className="flex justify-center items-center rounded-lg shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] p-1 bg-gray-100 outline outline-lightslategray-300 outline-[1px]">
        <div className="flex flex-row justify-between w-[300px] md:w-[452px] items-center p-1">
          <div className="flex flex-col items-start h-[44px]">
            <div className="ml-2 mt-2 text-xs text-darkgray-200">You send</div>
            <input
              type="text"
              className="ml-2 font-bold text-lg leading-[24px] text-darkslategray-200 inline-block w-[90%] outline-none bg-gray-100 placeholder-darkgray-100"
              placeholder="0.1"
            />
          </div>
          <div className="flex flex-row items-start">
            <div className="flex items-center bg-whitesmoke-200 w-[121px] h-[44px] rounded-md mr-2 shadow-md hover:bg-whitesmoke-100">
              <div
                className="cursor-pointer flex flex-row justify-between w-[121px] ml-[12px]"
                onClick={''}
              >
                <div className="flex flex-row items-center gap-2">
                  <FaBitcoin size={20} color={'#f97316'} />
                  <span className="font-bold text-[16px] text-darkslategray-200 inline-block">
                    BTC
                  </span>
                </div>
                <img
                  className="mr-2 top-[280px] w-[18px] h-[48px] overflow-hidden"
                  alt=""
                  src="/frame19.svg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end */}
    </div>
  );
  return <>{estimator}</>;
};
