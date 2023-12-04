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
  // {
  //   title: 'Profile',
  //   page: 'Profile',
  //   icon: '',
  //   src: '/User.png',
  //   gap: true,
  //   status: false,
  //   subTitle: [],
  // },
  {
    title: 'Exchange',
    page: 'Exchange',
    icon: '',
    src: '/Chat.png',
    status: false,
    subTitle: [],
  },
  {
    title: 'Buy (Card)',
    page: 'Buy (Card)',
    icon: '',
    src: '/Calendar.png',
    status: false,
    subTitle: [],
  },
  {
    title: 'Buy (Cash)',
    page: 'Buy (Cash)',
    icon: '',
    src: '/Chart.png',
    status: false,
    subTitle: [],
  },
  {
    title: 'Sell (Card)',
    page: 'Sell (Card)',
    icon: '',
    src: '/Folder.png',
    status: false,
    subTitle: [],
  },
  {
    title: 'Sell (Cash)',
    page: 'Sell (Cash)',
    icon: '',
    src: '/Folder.png',
    status: false,
    subTitle: [],
  },
  {
    title: 'Defi',
    page: 'Defi',
    icon: '',
    src: '/Chart_fill.png',
    status: false,
    subTitle: [],
  },
  {
    title: 'Notifications',
    page: 'Notifications',
    icon: '',
    src: '/Setting.png',
    gap: true,
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
export const DashboardMenuAdmin = (props) => {
  const { setPage, page, mode, user } = props;

  const [open, setOpen] = useState(true);

  const newCard = (
    <div
      className={` ${
        open ? 'w-50' : 'w-20 '
      } h-screen p-5  pt-8  relative duration-300`}
    >
      <img
        src="./control.png"
        className={`absolute cursor-pointer -right-3 top-9 w-7
       border-2 rounded-full  ${!open && 'rotate-180'} ${
          mode === true
            ? 'border-white'
            : 'border-bgDark outline outline-bgDarkOutline outline-[1px]'
        }`}
        onClick={() => setOpen(!open)}
      />
      <div className="flex flex-col justify-center items-center">
        <div className="flex gap-x-4 items-center">
          <img
            src={user?.photo}
            className={`cursor-pointer duration-500 ${
              open && 'rotate-[360deg]'
            } w-[40px] h-$ shrink-0 overflow-hidden rounded-full`}
          />
          <h1
            className={`origin-left font-medium text-xl duration-200 ${
              !open && 'scale-0'
            } ${mode === true ? 'text-bgPrimary' : 'text-white'}`}
          >
            {user?.name}
          </h1>
        </div>
        <ul className="pt-6">
          {menu.map((Menu, index) => (
            <li
              key={index}
              className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
          ${Menu.gap ? 'mt-9' : 'mt-2'} ${index === 0 && 'bg-light-white'} `}
              onClick={() => setPage(Menu?.page)}
            >
              <img src={Menu.src} />
              <span
                className={`${!open && 'hidden'} origin-left duration-200 ${
                  page === Menu?.page
                    ? 'text-bgPrimary text-base font-black inline-block'
                    : 'text-black dark:text-white text-mini'
                }`}
              >
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
  return <>{newCard}</>;
};
