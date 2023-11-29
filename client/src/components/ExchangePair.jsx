import React, { useState } from 'react';

// import { FaBeer } from 'react-icons/fa';
import { BsInfoCircleFill } from 'react-icons/bs';
import { MdQrCodeScanner } from 'react-icons/md';
import { PiLockSimpleBold, PiLockSimpleOpenBold } from 'react-icons/pi';
{
  /* <PiLockSimpleBold color="red" size={15}/> */
}
//  <PiLockSimpleBold color="#4f46e5" size={15}/>

import { BsCreditCard } from 'react-icons/bs';
import { BsCashStack } from 'react-icons/bs';

const cities = [
  {
    name: 'Moscow',
  },
  {
    name: 'Saint petersburg',
  },
];
export const ExchangePair = () => {
  const [city, setCity] = useState(cities[0]);

  const estimator = (
    <div className="flex justify-center rounded-lg bg-white shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[375px] md:w-[500px] p-4">
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[10px]">
          <div className="flex flex-row gap-4 mt-2">
            <div
              className={`cursor-pointer hover:text-bgPrimary leading-[24px] inline-block text-darkslategray-200 text-[24px]`}
            >
              Calculate amount
            </div>
          </div>
          <div className="flex bg-lightslategray-300 md:w-[452px] w-[370px] h-px" />
        </div>

        <div className="flex flex-col w-[370px] md:w-[452px] gap-[8px]">
          <div className="flex flex-row bg-bgSecondary rounded">
            <div className="bg-bgSecondary w-[295px] h-[62px] rounded-s-lg">
              {' '}
              <div className="">
                <div className="ml-2 mt-2 text-xs leading-[18px] text-darkgray-100">
                  You send
                </div>
                <input
                  type="text"
                  className="ml-2 font-bold text-lg leading-[24px] text-darkslategray-200 inline-block w-[90%] outline-none bg-bgSecondary"
                  placeholder="0.1"
                />
              </div>
            </div>

            <div className="bg-gainsboro-200 w-px h-[48px] mt-[7px]" />

            <div className="bg-bgSecondary w-[156px] h-[64px] rounded">
              <div
                className="cursor-pointer flex flex-row justify-between ml-[12px]"
                onClick={''}
              >
                <div className="flex flex-col mt-[13px]">
                  {' '}
                  <span className="text-xs leading-[12px] text-darkgray-100 inline-block">
                    Bitcoin
                  </span>
                  <span className="font-bold text-lg leading-[24px] text-darkslategray-200 inline-block">
                    BTC
                  </span>
                </div>
                <img
                  className="mr-2 top-[280px] w-[18px] h-[64px] overflow-hidden"
                  alt=""
                  src="/frame19.svg"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-center">
            <div className="rounded bg-bgSecondary p-2">
              <img
                className="w-3.5 h-3 overflow-hidden"
                alt=""
                src="/frame54.svg"
              />
            </div>
          </div>
          <div className="flex flex-row bg-bgSecondary rounded">
            <div className="bg-bgSecondary w-[295px] h-[62px] rounded-s-lg">
              <div className="">
                <div className="ml-2 mt-2 text-xs leading-[18px] text-darkgray-100">
                  You get
                </div>
                <input
                  type="text"
                  className="ml-2 font-bold text-lg leading-[24px] text-darkslategray-200 inline-block w-[90%] outline-none bg-bgSecondary"
                  placeholder="0.1"
                  // value={1.675}
                  value={`~ ${1.675}`}
                />
              </div>
            </div>
            <div className="bg-gainsboro-200 w-px h-[48px] mt-[7px]" />
            <div className="mb-4bg-bgSecondary w-[156px] h-[64px] rounded">
              {' '}
              <div
                className="cursor-pointer flex flex-row justify-between ml-[12px]"
                onClick={''}
              >
                <div className="flex flex-col mt-[13px]">
                  {' '}
                  <span className="text-xs leading-[12px] text-darkgray-100 inline-block">
                    Ethereum
                  </span>
                  <span className="font-bold text-lg leading-[24px] text-darkslategray-200 inline-block">
                    ETH
                  </span>
                </div>
                <img
                  className="mr-2 w-[18px] h-[64px] overflow-hidden"
                  alt=""
                  src="/frame19.svg"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row w-full" />
      </div>
    </div>
  );

  const floatingRate = (
    <div className="border-solid hover:border-2 hover:border-bgPrimary flex justify-center rounded-lg bg-white shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[375px] md:w-[500px] p-4 cursor-pointer">
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-row justify-center items-center p-2 gap-1">
          {/* <PiLockSimpleBold color="red" size={15}/> */}
          {/* <PiLockSimpleBold color="red" size={20}/> */}
          <PiLockSimpleOpenBold />

          <div className="h-[15px]">
            <div className="h-3">Floating rate</div>
          </div>
        </div>

        <div className="h-3 py-2">~ 1.65098402</div>
      </div>
    </div>
  );

  const fixedRate = (
    <div className="border-solid hover:border-2 hover:border-bgPrimary flex justify-center rounded-lg bg-white shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[375px] md:w-[500px] p-4 cursor-pointer">
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-row justify-center items-center p-2 gap-1">
          {/* <PiLockSimpleBold color="red" size={15}/> */}
          <PiLockSimpleBold size={15} />
          <div className="h-[15px]">
            <div className="h-3">Fixed rate</div>
          </div>
        </div>

        <div className="h-3 py-2">~ 1.56650452</div>
      </div>
    </div>
  );

  const InfoRate = (
    <div className="flex justify-center rounded-lg w-[375px] md:w-[500px] p-4">
      <div className="flex flex-row gap-2 w-full">
        {/* <img className="w-2 h-2 overflow-hidden" alt="" src="/frame54.svg" /> */}
        <BsInfoCircleFill color="#4f46e5" size={15} />
        <div className="text-xs leading-[17px] inline-block w-[446px]">
          The floating rate can change at any point due to market conditions, so
          you might receive more or less crypto than expected.
        </div>
      </div>
    </div>
  );

  const walletInfo = (
    <div className="flex justify-center rounded-lg bg-white shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[375px] md:w-[500px] p-4">
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[10px]">
          <div className="flex flex-row gap-4 mt-2">
            <div
              className={`cursor-pointer hover:text-bgPrimary leading-[24px] inline-block text-darkslategray-200 text-[24px]`}
            >
              Wallet address
            </div>
          </div>
          <div className="flex bg-lightslategray-300 md:w-[452px] w-[370px] h-px" />
        </div>

        <div className="flex flex-col w-[370px] md:w-[452px] gap-[8px]">
          <div className="flex flex-row bg-bgSecondary rounded h-[62px] justify-between">
            <div className="md:w-[452px] w-[370px]">
              <div className="ml-2 mt-2 text-xs leading-[18px] text-darkslategray-200">
                Recipient address
              </div>
              <input
                type="text"
                className="ml-2 text-[16px] md:text-[14px] leading-[24px] text-darkslategray-200 inline-block w-full outline-none bg-bgSecondary placeholder-darkgray-100"
                placeholder="0x05301d500C789bd59aC307Bef714d10EbF22C1e3"
              />
            </div>
            <div className="cursor-pointer mr-2 flex justify-center items-center w-[18px] h-[64px] overflow-hidden">
              <MdQrCodeScanner size={15} />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex flex-row gap-2">
              <div className="flex flex-row justify-center items-center bg-gray-400 rounded-[4px] w-[26px] h-[16px]">
                <span className="text-3xs uppercase text-white inline-block">
                  fio
                </span>
              </div>
              <div className="flex flex-row justify-center items-center bg-steelblue rounded-[4px] w-[26px] h-[16px]">
                <span className="text-3xs uppercase text-white inline-block">
                  ud
                </span>
              </div>
              <div className="flex flex-row justify-start items-center">
                <span className="text-2xs inline-block py-1 px-1.5">
                  FIO protocol and Unstoppable Domains are supported
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex flex-row gap-2">
              <input
                type="checkbox"
                className="outline-none bg-bgSecondary accent-bgPrimary focus:accent-bgPrimary/30"
              />

              <div className="flex flex-row gap-1 text-xs md:text-smi">
                <div className="leading-[20px] text-darkslategray-200 inline-block">
                  I agree with
                </div>
                <div className="leading-[20px] text-darkslategray-100 inline-block">
                  Terms of Use
                </div>
                <div className="leading-[20px] text-darkslategray-200 inline-block">
                  ,
                </div>
                <div className="text-smi leading-[20px] text-darkslategray-100 inline-block">
                  Privacy Policy
                </div>
                <div className="leading-[20px] text-darkslategray-200 inline-block">
                  and
                </div>
                <div className="leading-[20px] text-darkslategray-100 inline-block">
                  AML/KYC
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-4 cursor-pointer flex flex-row justify-center items-center w-full bg-bgPrimary hover:opacity-90 text-white h-[49px] shrink-0 rounded">
          Next step
        </div>
      </div>
    </div>
  );

  const cashInfo = (
    <div className="flex justify-center rounded-lg bg-white shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[375px] md:w-[500px] p-4">
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[10px]">
          <div className="flex flex-row gap-4 mt-2">
            <div
              className={`cursor-pointer hover:text-bgPrimary leading-[24px] inline-block text-darkslategray-200 text-[24px]`}
            >
              Cash Payment Detail
            </div>
          </div>
          <div className="flex bg-lightslategray-300 md:w-[452px] w-[370px] h-px" />
        </div>

        <div className="flex flex-col w-[370px] md:w-[452px] gap-[8px]">
          {/* <div className="flex flex-row bg-bgSecondary rounded justify-between h-[57px]">
                <div className="ml-2 flex flex-row gap-[8px] items-center w-[370px] md:w-[452px] mt-[13px]">
                  <div className="">
                    {city === 'Moscow' && (
                      <BsCreditCard color="#4f46e5" size={24} />
                    )}
                    {city === 'Saint petersburg' && (
                      <BsCashStack color="#4f46e5" size={24} />
                    )}
                  </div>

                  <div className="mr-2 w-[90%]">
                    <select
                      name="city"
                      className={`[border:none] outline-none w-full font-bold text-lg leading-[24px] text-darkslategray-200 bg-[transparent] relative tracking-[0.02em]`}
                      value={city}
                      onChange={(ev) => setCity(ev.target.value)}
                    >
                      {cities?.map((city, index) => (
                        <option key={index} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div> */}
          <div className="flex flex-row bg-bgSecondary rounded h-[62px] justify-between">
            <div className="md:w-[452px] w-[370px]">
              <div className="ml-2 mt-2 text-xs leading-[18px] text-darkslategray-200">
                City
              </div>
              <div className="ml-2 flex flex-row gap-[8px] items-center w-[370px] md:w-[452px] mt-[13px]">
                <div className="mr-4 w-[370px] md:w-[452px]">
                  <select
                    name="city"
                    className={`[border:none] outline-none w-full text-[16px] md:text-[14px] leading-[24px] text-darkslategray-200 inline-block bg-[transparent]`}
                    value={city}
                    onChange={(ev) => setCity(ev.target.value)}
                  >
                    {cities &&
                      cities.map((city, index) => (
                        <option key={index} value={city?.name}>
                          {city?.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="cursor-pointer mr-2 flex justify-center items-center w-[18px] h-[64px] overflow-hidden">
              <MdQrCodeScanner size={15} />
            </div>
          </div>
          <div className="flex flex-row bg-bgSecondary rounded h-[62px] justify-between">
            <div className="md:w-[452px] w-[370px]">
              <div className="ml-2 mt-2 text-xs leading-[18px] text-darkslategray-200">
                Recipient address
              </div>
              <input
                type="text"
                className="ml-2 text-[16px] md:text-[14px] leading-[24px] text-darkslategray-200 inline-block w-full outline-none bg-bgSecondary placeholder-darkgray-100"
                placeholder="0x05301d500C789bd59aC307Bef714d10EbF22C1e3"
              />
            </div>
            <div className="cursor-pointer mr-2 flex justify-center items-center w-[18px] h-[64px] overflow-hidden">
              <MdQrCodeScanner size={15} />
            </div>
          </div>
          <div className="flex flex-row bg-bgSecondary rounded h-[62px] justify-between">
            <div className="">
              <div className="ml-2 mt-2 text-xs leading-[18px] text-darkslategray-200">
                Telegram
              </div>
              <input
                type="text"
                className="ml-2 text-[16px] md:text-[14px] leading-[24px] text-darkslategray-200 inline-block w-full outline-none bg-bgSecondary placeholder-darkgray-100"
                placeholder="@jason"
              />
            </div>
            <div className="cursor-pointer mr-2 flex justify-center items-center w-[18px] h-[64px] overflow-hidden">
              <MdQrCodeScanner size={15} />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex flex-row gap-2">
              <div className="flex flex-row justify-center items-center bg-gray-400 rounded-[4px] w-[26px] h-[16px]">
                <span className="text-3xs uppercase text-white inline-block">
                  fio
                </span>
              </div>
              <div className="flex flex-row justify-center items-center bg-steelblue rounded-[4px] w-[26px] h-[16px]">
                <span className="text-3xs uppercase text-white inline-block">
                  ud
                </span>
              </div>
              <div className="flex flex-row justify-start items-center">
                <span className="text-2xs inline-block py-1 px-1.5">
                  FIO protocol and Unstoppable Domains are supported
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex flex-row gap-2">
              <input
                type="checkbox"
                className="outline-none bg-bgSecondary accent-bgPrimary focus:accent-bgPrimary/30"
              />

              <div className="flex flex-row gap-1 text-xs md:text-smi">
                <div className="leading-[20px] text-darkslategray-200 inline-block">
                  I agree with
                </div>
                <div className="leading-[20px] text-darkslategray-100 inline-block">
                  Terms of Use
                </div>
                <div className="leading-[20px] text-darkslategray-200 inline-block">
                  ,
                </div>
                <div className="text-smi leading-[20px] text-darkslategray-100 inline-block">
                  Privacy Policy
                </div>
                <div className="leading-[20px] text-darkslategray-200 inline-block">
                  and
                </div>
                <div className="leading-[20px] text-darkslategray-100 inline-block">
                  AML/KYC
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-4 cursor-pointer flex flex-row justify-center items-center w-full bg-bgPrimary hover:opacity-90 text-white h-[49px] shrink-0 rounded">
          Next step
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative bg-white w-full h-screen overflow-hidden text-left text-sm text-gray-400 font-montserrat">
      <div className="mt-8 flex flex-col justify-center items-center gap-4">
        {estimator}
        {floatingRate}
        {fixedRate}
        {InfoRate}
        {walletInfo}
        {cashInfo}
      </div>
    </div>
  );
};
