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
import { BiMessageAltDetail } from 'react-icons/bi'; // messages
import { FiSettings } from 'react-icons/fi'; // Settings
//====={Crypto currencies}=============================

import { FaEthereum } from 'react-icons/fa'; //Ethereum
import { SiLitecoin } from 'react-icons/si'; //Litecoin

import styles from './ProfileCard.module.css';

const menu = [
  {
    title: 'Profile',
    page: 'Profile',
    icon: '',
    status: false,
    subTitle: [],
  },
  {
    title: 'Exchange',
    page: 'Exchange',
    icon: '',
    status: false,
    subTitle: [],
  },
  {
    title: 'Buy (Card)',
    page: 'Buy (Card)',
    icon: '',
    status: false,
    subTitle: [],
  },
  {
    title: 'Buy (Cash)',
    page: 'Buy (Cash)',
    icon: '',
    status: false,
    subTitle: [],
  },
  {
    title: 'Sell (Card)',
    page: 'Sell (Card)',
    icon: '',
    status: false,
    subTitle: [],
  },
  {
    title: 'Sell (Cash)',
    page: 'Sell (Cash)',
    icon: '',
    status: false,
    subTitle: [],
  },
  {
    title: 'Defi',
    page: 'Defi',
    icon: '',
    status: false,
    subTitle: [],
  },
  {
    title: 'Notifications',
    page: 'Notifications',
    icon: '',
    status: false,
    subTitle: [],
  },
];

export const HowToComponent = (props) => {
  const { l, setPage, page, mode } = props;

  const [show, setShow] = useState(false);

  const newCard = (
    // <div
    //   className={`flex flex-col justify-center hover:rounded hover:shadow-lg w-[200px] p-1 hover:text-indigo-600 hover:bg-indigo-200 text-xs ${
    //     mode === true ? 'text-black' : 'text-white'
    //   } ${
    //     page === l?.page && mode === true
    //       ? 'text-indigo-700'
    //       : 'text-indigo-400'
    //   }
    //   `}
    //   onClick={() => setPage(l?.page)}
    // >

    <div
      className={`flex flex-col justify-center hover:rounded hover:shadow-lg w-[200px] p-1 hover:text-indigo-600 hover:bg-indigo-200 text-xs ${
        page === l?.page
          ? 'text-bgPrimary text-base font-black inline-block'
          : 'text-black text-mini'
      } ${mode === true ? 'text-black' : 'text-gray-100'}
      `}
      onClick={() => setPage(l?.page)}
    >
      <div className={`flex flex-row items-center gap-2 w-full`}>
        <div className="flex justify-center items-center w-[24px] h-[24px] flex-shrink-0">
          {l.title === 'Profile' && <FiUser size={18} />}
          {l.title === 'Notifications' && <FiBell size={18} />}
          {l.title === 'Exchange' && <RiExchangeFundsLine size={18} />}
          {l.title === 'Buy (Cash)' && <FaHandHoldingUsd size={18} />}
          {l.title === 'Buy (Card)' && <FaHandHoldingUsd size={18} />}
          {l.title === 'Sell (Card)' && <BsCurrencyBitcoin size={18} />}
          {l.title === 'Sell (Cash)' && <BsCurrencyBitcoin size={18} />}
          {l.title === 'Defi' && <RiTokenSwapLine size={18} />}
        </div>
        <div className="flex flex-col">
          {/* <div className="text-base leading-[24px] inline-block">
            {l?.title}
          </div> */}
          {l?.status ? (
            <div
              className="cursor-pointer flex flex-row items-center gap-8"
              onClick={() => {
                setShow((prev) => !prev);
              }}
            >
              <div className="font-sans leading-[24px] inline-block w-[80%]">
                {l?.title}
              </div>
              <img
                className="cursor-pointer mr-2 w-[18px] overflow-hidden"
                alt=""
                src="/frame19.svg"
                // onClick={() => setShow(true)}
              />
            </div>
          ) : (
            <div
              className="cursor-pointer font-sans leading-[24px] inline-block"
              onClick={''}
            >
              {l?.title}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col ml-8">
        {show &&
          l?.subTitle &&
          l?.subTitle.map((k, idx) => (
            <div
              className="cursor-pointer font-sans text-gray-200 hover:text-gray-500 leading-[24px] inline-block"
              key={idx}
            >
              {k?.name}
            </div>
          ))}
      </div>
    </div>
  );
  return <>{newCard}</>;
};

export const UserProfile = (props) => {
  const { l, mode } = props;

  const [show, setShow] = useState(false);

  const newCard = (
    <div className="flex flex-col gap-4 justify-center w-[200px] p-4 outline-lightslategray-300 outline-[1px]">
      <div className="flex flex-row justify-between w-[200px]">
        <div className="flex flex-row items-center gap-2">
          <div className="flex justify-center items-center flex-shrink-0">
            <img
              className="w-[40px] h-$ shrink-0 overflow-hidden rounded-full"
              alt=""
              src={l?.photo}
            />
          </div>

          <div className="flex flex-col">
            <div className="cursor-pointer flex flex-col items-start">
              <div
                className={`text-base font-sans font-medium leading-[24px] inline-block ${
                  mode === true ? 'text-bgPrimary' : 'text-white'
                }`}
              >
                {l?.name}
              </div>
              {/* <div className="text-[12px] text-gray-200 font-sans font-medium leading-[24px] inline-block">
                {l?.email}
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="flex bg-lightslategray-300 w-[180px] h-px" />
    </div>
  );
  return <>{newCard}</>;
};
export const DashboardMenu = (props) => {
  const { setPage, page, mode, user } = props;

  const newCard = (
    <div className="flex flex-col gap-[16px]">
      <div className="flex flex-col gap-[16px] ml-4 md:justify-center md:items-center">
        <UserProfile l={user} mode={mode} user={user} />
        <HowToComponent l={menu[0]} setPage={setPage} page={page} mode={mode} />
        <HowToComponent l={menu[1]} setPage={setPage} page={page} mode={mode} />
        <HowToComponent l={menu[2]} setPage={setPage} page={page} mode={mode} />
        <HowToComponent l={menu[3]} setPage={setPage} page={page} mode={mode} />
        <HowToComponent l={menu[4]} setPage={setPage} page={page} mode={mode} />
        <HowToComponent l={menu[5]} setPage={setPage} page={page} mode={mode} />
        <HowToComponent l={menu[6]} setPage={setPage} page={page} mode={mode} />
        <HowToComponent l={menu[7]} setPage={setPage} page={page} mode={mode} />
      </div>
    </div>
  );
  return <>{newCard}</>;
};
