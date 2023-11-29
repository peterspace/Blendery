import React, { useState } from 'react';

export const CardBankCard = (props) => {
  const {
    isExchange,
    setIsExchange,
    isBuy,
    setIsBuy,
    isSell,
    setIsSell,
    isDefi,
    setIsDefi,
    isCard,
    setIsCard,
  } = props;

  return (
    <div className="relative bg-white w-full h-screen overflow-hidden text-left text-sm text-gray-400 font-montserrat">
      <div className="mt-8 flex flex-col justify-center items-center">
        {/* <div className="flex justify-center rounded-lg bg-white shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[500px] h-[355px] p-4"> */}
        <div className="flex justify-center rounded-lg bg-white shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[375px] md:w-[500px] p-4">
          <div className="flex flex-col gap-[24px]">
            <div className="flex flex-col gap-[10px]">
              <div className="flex flex-row gap-4 mt-2">
                <div
                  className={`cursor-pointer hover:text-bgPrimary leading-[24px] inline-block ${
                    isExchange
                      ? 'text-bgPrimary text-base font-black'
                      : 'text-darkgray-200 text-mini'
                  }`}
                  onClick={() => {
                    setIsExchange(true);
                    setIsBuy(false);
                    setIsSell(false);
                    setIsDefi(false);
                    setIsCard(false);
                  }}
                >
                  Exchange
                </div>
                <div
                  className={`cursor-pointer hover:text-bgPrimary leading-[24px] inline-block ${
                    isBuy
                      ? 'text-bgPrimary text-base font-black'
                      : 'text-darkgray-200 text-mini'
                  }`}
                  onClick={() => {
                    setIsExchange(false);
                    setIsBuy(true);
                    setIsSell(false);
                    setIsDefi(false);
                    setIsCard(false);
                  }}
                >
                  Buy
                </div>
                <div
                  className={`cursor-pointer hover:text-bgPrimary leading-[24px] inline-block ${
                    isSell
                      ? 'text-bgPrimary text-base font-black'
                      : 'text-darkgray-200 text-mini'
                  }`}
                  onClick={() => {
                    setIsExchange(false);
                    setIsBuy(false);
                    setIsSell(true);
                    setIsDefi(false);
                    setIsCard(false);
                  }}
                >
                  Sell
                </div>
                <div
                  className={`cursor-pointer hover:text-bgPrimary leading-[24px] inline-block ${
                    isCard
                      ? 'text-bgPrimary text-base font-black'
                      : 'text-darkgray-200 text-mini'
                  }`}
                  onClick={() => {
                    setIsExchange(false);
                    setIsBuy(false);
                    setIsSell(false);
                    setIsDefi(false);
                    setIsCard(true);
                  }}
                >
                  Card
                </div>
                <div
                  className={`cursor-pointer hover:text-bgPrimary leading-[24px] inline-block ${
                    isDefi
                      ? 'text-bgPrimary text-base font-black'
                      : 'text-darkgray-200 text-mini'
                  }`}
                  onClick={() => {
                    setIsExchange(false);
                    setIsBuy(false);
                    setIsSell(false);
                    setIsDefi(true);
                    setIsCard(false);
                  }}
                >
                  DeFi
                </div>
              </div>
              {!isExchange && !isBuy && !isSell && !isDefi && !isCard && (
                <div className="flex bg-lightslategray-300 w-[362px] md:w-[452px] h-px" />
              )}
              {isExchange && (
                <div className="flex flex-row">
                  <div className="flex bg-bgPrimary w-[80px] h-px z-10" />
                  <div className="flex bg-lightslategray-300 w-[282px] md:w-[372px] h-px z-10" />
                </div>
              )}
              {isBuy && (
                <div className="flex flex-row">
                  <div className="flex bg-lightslategray-300 w-[85px] h-px z-10" />
                  <div className="flex bg-bgPrimary w-[32px] h-px" />
                  <div className="flex bg-lightslategray-300 w-[253px] md:w-[335px] h-px z-10" />
                </div>
              )}
              {isSell && (
                <div className="flex flex-row">
                  <div className="flex bg-lightslategray-300 w-[135px] h-px z-10" />
                  <div className="flex bg-bgPrimary w-[28px] h-px" />
                  <div className="flex bg-lightslategray-300 w-[207px] md:w-[289px] h-px z-10" />
                </div>
              )}
              {isCard && (
                <div className="flex flex-row">
                  <div className="flex bg-lightslategray-300 w-[175px] h-px z-10" />
                  <div className="flex bg-bgPrimary w-[42px] h-px" />
                  <div className="flex bg-lightslategray-300 w-[153px] md:w-[235px] h-px z-10" />
                </div>
              )}
              {isDefi && (
                <div className="flex flex-row">
                  <div className="flex bg-lightslategray-300 w-[225px] h-px z-10" />
                  <div className="flex bg-bgPrimary w-[42px] h-px" />
                  <div className="flex bg-lightslategray-300 w-[103px] md:w-[185px] h-px z-10" />
                </div>
              )}
            </div>

            <div className="flex flex-col w-[370px] md:w-[452px] gap-[24px]">
              <div className="flex flex-col justify-center items-center">
                <img
                  className="w-[132px] h-[94px] object-cover"
                  alt=""
                  src="/image11@2x.png"
                />
              </div>
              <div className="flex flex-col justify-center items-center">
                <div className="text-lg leading-[24px] text-center inline-block w-[415px]">
                  Buy crypto via bank card and bank transfers
                </div>
              </div>
            </div>
            <div className="mb-4 cursor-pointer flex flex-row justify-center items-center w-full bg-bgPrimary hover:opacity-90 text-white h-[49px] shrink-0 rounded">
              Buy crypto
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
