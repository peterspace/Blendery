import React, { useState } from 'react';
import { RiFileWarningFill } from 'react-icons/ri';
import { FiUser } from 'react-icons/fi'; // profile
import { BiWalletAlt } from 'react-icons/bi'; // Wallet
import { FiBell } from 'react-icons/fi'; // Notification
import { RiExchangeFundsLine } from 'react-icons/ri'; // Exchange
import { RiTokenSwapLine } from 'react-icons/ri'; // Swap
import { LiaSellsy } from 'react-icons/lia'; // Dashboard
import ProfileCard from './ProfileCard';
import { BsCurrencyBitcoin } from 'react-icons/bs'; // Sell
import { FaHandHoldingUsd } from 'react-icons/fa'; // Buy

//====={Crypto currencies}=============================
import { FaBitcoin } from 'react-icons/fa'; // Bitcoin
import { SiTether } from 'react-icons/si'; // Tether
import { FaEthereum } from 'react-icons/fa'; //Ethereum
import { SiLitecoin } from 'react-icons/si'; //Litecoin

import styles from './ProfileCard.module.css';

const menu = [
  {
    name: 'Bitcoin',
    logoUrl:
      'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
    symbol: 'BTC',
    amount: '+1.32',
    date: `08:22 PM`,
    status: true,
  },
  {
    name: 'Ethereum',
    logoUrl:
      'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880',
    symbol: 'ETH',
    amount: '+2.40',
    date: `05:30 PM`,
    status: true,
  },
  {
    name: 'Tron',
    logoUrl:
      'https://assets.coingecko.com/coins/images/1094/large/tron-logo.png?1547035066',
    id: 'tron', //coingeko id
    symbol: 'TRX',
    amount: '-1.000',
    date: `11:02 AM`,
    status: false,
  },

  // {
  //   name: 'Tether',
  //   logoUrl: '',
  //   symbol: 'USDT',
  //   amount: '-1.000',
  //   date: `11:02 AM`,
  //   status: false,
  // },
  // {
  //   name: 'Litecoin',
  //   logoUrl: '',
  //   symbol: 'LTC',
  //   amount: '+13.032',
  //   date: `07:13 AM`,
  //   status: true,
  // },
];

export const UserProfile = (props) => {
  const { l, mode } = props;

  const [show, setShow] = useState(false);
  const newCard = (
    // <div
    //   onClick={() => setIdx(l.id)}
    //   className={`flex flex-col shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[250px] px-4 ${
    //     mode === true
    //       ? 'py-2 rounded-lg hover:bg-gray-100 hover:outline hover:outline-lightslategray-300 hover:outline-[1px]'
    //       : 'hover:bg-hoverDark hover:outline hover:outline-lightslategray-300 hover:outline-[1px]'
    //   }`}
    // >
    <div className="flex flex-col">
      <div
        // onClick={() => setIdx(l.id)}
        className={`cursor-pointer flex flex-col font-light p-4 border border-indigo-600 border-b  ${
          mode === true
            ? 'bg-white hover:bg-gray-100 hover:outline hover:outline-lightslategray-300 hover:outline-[1px]'
            : 'bg-bgDarkMode hover:bg-hoverDark hover:outline hover:outline-lightslategray-300 hover:outline-[1px]'
        }`}
      >
        <div className="flex flex-row justify-between items-center w-[250px]">
          <div className="flex flex-row gap-1">
            <img
              className="w-[40px] h-[40px] shrink-0 overflow-hidden rounded-full"
              alt={l?.name}
              src={l?.logoUrl}
            />
            <div className="flex flex-col">
              <div className="cursor-pointer flex flex-col items-start">
                <div
                  className={`text-base font-sans font-medium leading-[24px] inline-block ${
                    mode === true ? 'text-black' : 'text-gray-100'
                  }`}
                >
                  {l?.name}
                </div>
                <div
                  className={`text-[12px] font-sans font-medium leading-[24px] inline-block ${
                    mode === true ? 'text-gray-200' : 'text-gray-100'
                  }`}
                >
                  {l?.symbol}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-end">
            {l.status ? (
              <div className="text-base text-green-600 font-sans font-medium leading-[24px] inline-block">
                {l?.amount} {l.symbol}
              </div>
            ) : (
              <div className="text-base text-rose-600 font-sans font-medium leading-[24px] inline-block">
                {l?.amount} {l.symbol}
              </div>
            )}
            <div
              className={`text-[8px] font-sans font-medium leading-[24px] inline-block ${
                mode === true ? 'text-gray-200' : 'text-gray-100'
              }`}
            >
              {l?.date}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`flex w-full h-px ${
          mode === true ? 'bg-lightslategray-300' : 'bg-darkslategray-400'
        }`}
      />
    </div>
  );

  return <>{newCard}</>;
};
export const History = (props) => {
  const { mode } = props;
  const newCard = (
    <div
      className={`flex flex-col rounded shadow-lg w-[300px] h-full ${
        mode === true
          ? 'bg-white outline outline-lightslategray-300 outline-[1px]'
          : 'bg-bgDarkMode outline outline-lightslategray-300 outline-[2px]'
      }`}
    >
      <div
        className={`mt-[24px] ml-4 text-lg font-sans font-bold inline-block ${
          mode === true ? 'text-bgPrimary' : 'text-white'
        }`}
      >
        {'Recent transactions'}
      </div>
      <div
        className={`flex w-full h-px mt-6 ${
          mode === true ? 'bg-lightslategray-300' : 'bg-darkslategray-400'
        }`}
      />

      <div className="mt-2 flex flex-col gap-[16px] overflow-scroll max-h-0">
        <UserProfile l={menu[0]} mode={mode} />
        <UserProfile l={menu[1]} mode={mode} />
        <UserProfile l={menu[2]} mode={mode} />
        <UserProfile l={menu[2]} mode={mode} />
        <UserProfile l={menu[2]} mode={mode} />
        <UserProfile l={menu[2]} mode={mode} />
        <UserProfile l={menu[2]} mode={mode} />
      </div>
    </div>
  );
  return <>{newCard}</>;
};
