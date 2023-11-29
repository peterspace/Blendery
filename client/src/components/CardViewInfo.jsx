import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

import styles from './AppContainer.module.css';
import { MdQrCodeScanner } from 'react-icons/md';
import { FaBitcoin } from 'react-icons/fa'; // Bitcoin
import { SiTether } from 'react-icons/si'; // Tether
import { FaEthereum } from 'react-icons/fa'; //Ethereum
import { SiLitecoin } from 'react-icons/si'; //Litecoin

const menu = [
  {
    name: 'Bitcoin',
    id: 'bitcoin', //coingeko id
    logoUrl:
      'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
    symbol: 'BTC',
    amount: '1.21',
    date: `$31, 688`,
    status: true,
  },
  {
    name: 'Ethereum',
    logoUrl:
      'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880',
    id: 'ethereum', //coingeko id
    symbol: 'ETH',
    amount: '3.25',
    date: `$5,150.37`,
    status: true,
  },

  {
    name: 'Tether',
    logoUrl:
      'https://assets.coingecko.com/coins/images/325/large/Tether.png?1668148663',
    symbol: 'USDT',
    amount: '1500',
    date: `$1,499.67`,
    status: false,
  },
  {
    name: 'Tron',
    logoUrl:
      'https://assets.coingecko.com/coins/images/1094/large/tron-logo.png?1547035066',
    id: 'tron', //coingeko id
    symbol: 'TRX',
    amount: '1500',
    date: `$1,499.67`,
    status: false,
  },
];

export const CardViewInfo = (props) => {
  const { mode, user } = props;
  // const [isRedirect, setIsRedirect] = useState(false);

  // if (isRedirect) {
  //   return <Navigate to="/defi" />;
  // }

  const [isSend, setIsSend] = useState(true);
  const [isTokens, setIsTokens] = useState(false);
  const [isActivities, setIsActivities] = useState(false);
  const [isPortfolio, setIsPortfolio] = useState(false);

  //===================={new}==========================

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  //===================={new}==========================

  return (
    <div className={`flex flex-col`}>
      <div
        className={`flex justify-center items-center rounded-lg shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[320px] p-4 ${
          mode === true
            ? 'bg-white'
            : 'bg-bgDark outline outline-bgDarkOutline outline-[1px]'
        }`}
      >
        <div className="flex flex-col gap-[24px]">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-4 mt-2">
              <div
                className={`cursor-pointer leading-[24px] inline-block text-base font-black ${
                  mode === true ? 'text-bgPrimary' : 'text-gray-100'
                }`}
              >
                Messenger
              </div>
            </div>
            <div className="flex flex-row gap-4 mt-2 rounded-lg bg-indigo-100 outline outline-indigo-200 outline-[1px] shadow-md p-2">
              <div
                className={`cursor-pointer hover:text-bgPrimary text-bgPrimary text-xs font-black`}
              >
                {user?.email}
                {/* ludi@gmail... */}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[10px]">
            <div className="flex flex-row gap-4 mt-2">
              <div
                className={`cursor-pointer hover:text-bgPrimary leading-[24px] ${
                  isSend
                    ? 'text-bgPrimary text-base font-black inline-block underline underline-offset-[16px]'
                    : 'text-darkgray-200 text-mini'
                } ${mode === true ? 'text-darkgray-200' : 'text-gray-100'}`}
                onClick={() => {
                  setIsSend(true);
                  setIsTokens(false);
                  setIsActivities(false);
                  setIsPortfolio(false);
                }}
              >
                New
              </div>
              <div
                className={`cursor-pointer hover:text-bgPrimary leading-[24px] inline-block ${
                  isTokens
                    ? 'text-bgPrimary text-base font-black inline-block underline underline-offset-[16px]'
                    : 'text-darkgray-200 text-mini'
                } ${mode === true ? 'text-darkgray-200' : 'text-gray-100'}`}
                onClick={() => {
                  setIsSend(false);
                  setIsTokens(true);
                  setIsActivities(false);
                  setIsPortfolio(false);
                }}
              >
                All
              </div>
              <div
                className={`cursor-pointer hover:text-bgPrimary leading-[24px] inline-block ${
                  isActivities
                    ? 'text-bgPrimary text-base font-black inline-block underline underline-offset-[16px]'
                    : 'text-darkgray-200 text-mini'
                } ${mode === true ? 'text-darkgray-200' : 'text-gray-100'}`}
                onClick={() => {
                  setIsSend(false);
                  setIsTokens(false);
                  setIsActivities(true);
                  setIsPortfolio(false);
                }}
              >
                Inbox
              </div>
              <div
                className={`cursor-pointer hover:text-bgPrimary leading-[24px] inline-block ${
                  isPortfolio
                    ? 'text-bgPrimary text-base font-black inline-block underline underline-offset-[16px]'
                    : 'text-darkgray-200 text-mini'
                } ${mode === true ? 'text-darkgray-200' : 'text-gray-100'}`}
                onClick={() => {
                  setIsSend(false);
                  setIsTokens(false);
                  setIsActivities(false);
                  setIsPortfolio(true);
                }}
              >
                Outbox
              </div>
            </div>
            <div className="flex bg-lightslategray-300 w-full h-px" />
          </div>

          <div className={`flex flex-col w-[280px] gap-[8px]`}>
            <div
              className={`flex  rounded-lg shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[280px] p-1 outline outline-lightslategray-300 outline-[1px] ${
                mode === true ? 'bg-gray-100' : ''
              }
          `}
            >
              <div
                className={`flex flex-row rounded-lg justify-between shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[280px] p-1 ${
                  mode === true
                    ? 'bg-bgSecondary outline outline-[1px] outline-lightslategray-300'
                    : 'outline bg-hoverDark outline-[1px] outline-lightslategray-300 hover:bg-bgDark hover:outline-[1px] hover:outline-lightslategray-300'
                }`}
              >
                <div className="ml-2 flex flex-row items-center">
                  {/* <div className="">
                    <img
                      className="w-[24px] h-$ shrink-0 overflow-hidden rounded-full"
                      alt={menu[1]?.name}
                      src={menu[1]?.logoUrl}
                    />
                  </div> */}

                  <span
                    className={`font-bold text-lg leading-[24px] inline-block ${
                      mode === true ? 'text-darkslategray-200' : 'text-gray-100'
                    }`}
                  >
                    {/* Ethereum */}
                    {/* {menu[1]?.name} */}
                    Subject
                  </span>
                </div>
                <img
                  className="mr-2 w-[18px] overflow-hidden"
                  alt=""
                  src="/frame19.svg"
                />
              </div>
            </div>
            <div
              className={`flex justify-center items-center rounded-lg shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[280px] p-1 outline outline-lightslategray-300 outline-[1px] h-[48px] ${
                mode === true ? 'bg-gray-100' : 'bg-bgDarkMode'
              }`}
            >
              <div className="w-[280px]">
                <div
                  className={`ml-2 mt-2 text-xs leading-[18px] ${
                    mode === true ? 'text-darkslategray-200' : 'text-gray-100'
                  }`}
                >
                  Transaction id
                </div>
                <input
                  type="text"
                  className={`ml-2 text-[12px] md:text-[16px] leading-[24px] inline-block w-[90%] outline-none ${
                    mode === true
                      ? 'text-darkslategray-200 bg-bgSecondary placeholder-darkgray-100'
                      : 'text-gray-100 bg-bgDarkMode'
                  }`}
                  placeholder="0258"
                  // value={userAddress}
                  // onChange={(e) => setUserAddress(e.target.value)}
                />
              </div>
            </div>

            <div
              className={`flex justify-center items-center rounded-lg shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[280px] p-1 outline outline-lightslategray-300 outline-[1px] ${
                mode === true ? 'bg-gray-100' : 'bg-bgDarkMode'
              }`}
            >
              <div className="w-[280px]">
                <div
                  className={`ml-2 mt-2 text-xs leading-[18px] ${
                    mode === true ? 'text-darkslategray-200' : 'text-gray-100'
                  }`}
                >
                  Message
                </div>
                <textarea
                  className={`ml-2 text-[12px] md:text-[16px] leading-[24px] inline-block w-[90%] outline-none ${
                    mode === true
                      ? 'text-darkslategray-200 bg-bgSecondary placeholder-darkgray-100'
                      : 'text-gray-100 bg-bgDarkMode'
                  }`}
                  // placeholder="Message"
                  value={message}
                  onChange={(ev) => setMessage(ev.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          <div
            className={`mb-4 p-1 cursor-pointer flex flex-row justify-center items-center w-full bg-bgPrimary hover:opacity-90 text-white h-[49px] shrink-0 rounded-md`}
            onClick={''}
          >
            Send
          </div>
        </div>
      </div>
    </div>
  );
};
