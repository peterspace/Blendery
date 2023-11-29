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
    logoUrl: '',
    symbol: 'BTC',
    amount: '+1.32',
    date: `08:22 PM`,
    status: true,
  },
  {
    name: 'Ethereum',
    logoUrl: '',
    symbol: 'ETH',
    amount: '+2.40',
    date: `05:30 PM`,
    status: true,
  },

  {
    name: 'Tether',
    logoUrl: '',
    symbol: 'USDT',
    amount: '-1.000',
    date: `11:02 AM`,
    status: false,
  },
  {
    name: 'Litecoin',
    logoUrl: '',
    symbol: 'LTC',
    amount: '+13.032',
    date: `07:13 AM`,
    status: true,
  },
];

export const UserProfile = (props) => {
  const { l } = props;

  const [show, setShow] = useState(false);

  const newCard = (
    <div className="flex justify-center rounded-lg shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[280px] p-4 bg-gray-100 outline-lightslategray-300 outline-[1px]">
      <div className="flex flex-row justify-between w-[280px]">
        <div className="flex flex-row items-center gap-2">
          <div className="flex justify-center items-center flex-shrink-0">
            {/* <img
            className="w-[40px] h-$ shrink-0 overflow-hidden rounded-full"
            alt=""
            src={l?.pic}
          /> */}

            {l.symbol === 'BTC' && <FaBitcoin size={40} color={'#f97316'} />}
            {l.symbol === 'ETH' && <FaEthereum size={40} color={'#3f3f46'} />}
            {l.symbol === 'USDT' && <SiTether size={40} color={'#065f46'} />}
            {l.symbol === 'LTC' && <SiLitecoin size={40} color={'#1e3a8a'} />}
          </div>

          <div className="flex flex-col">
            <div className="cursor-pointer flex flex-col items-start">
              <div className="text-base font-sans font-medium leading-[24px] inline-block">
                {l?.name}
              </div>
              <div className="text-[12px] text-gray-200 font-sans font-medium leading-[24px] inline-block">
                {l?.symbol}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="cursor-pointer flex flex-col items-end">
            {l.status ? (
              <div className="text-base text-green-600 font-sans font-medium leading-[24px] inline-block">
                {l?.amount} {l.symbol}
              </div>
            ) : (
              <div className="text-base font-sans font-medium leading-[24px] inline-block">
                {l?.amount} {l.symbol}
              </div>
            )}
            <div className="text-[8px] text-gray-200 font-sans font-medium leading-[24px] inline-block">
              {l?.date}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  return <>{newCard}</>;
};
export const TotalBalance = () => {
  const newCard = (
    <div className="flex flex-col gap-[16px] rounded-lg p-4 bg-gray-100 outline outline-lightslategray-300 outline-[1px]">
      <div className="mt-[24px] text-lg font-sans font-bold text-bgPrimary inline-block">
        {'Total Balance'}
      </div>
      {/* <div className="flex flex-col md:flex-row gap-[16px]"> */}
      <div className="flex flex-col gap-[16px]">
        <UserProfile l={menu[0]} />
      </div>
    </div>
  );
  return <>{newCard}</>;
};
