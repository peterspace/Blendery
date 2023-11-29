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
import { Link } from 'react-router-dom';

import styles from './ProfileCard.module.css';

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

export const UserProfile = (props) => {
  const { l, setIdx, mode } = props;

  const [show, setShow] = useState(false);

  const newCard = (
    <div
      onClick={() => setIdx(l.id)}
      className={`flex rounded-lg shadow-lg w-[250px] py-2 px-4 ${
        mode === true
          ? 'text-black bg-white outline outline-[1px] outline-lightslategray-300'
          : 'text-gray-100 outline bg-hoverDark outline-[1px] outline-lightslategray-300 hover:bg-bgDark hover:outline-[1px] hover:outline-lightslategray-300'
      }`}
    >
      {/* <div className="flex flex-row justify-between w-[280px]"> */}
      <div className="flex flex-row justify-between items-center w-[250px]">
        <div className="flex flex-col gap-2">
          {l.symbol === 'BTC' && (
            <img
              className="w-[40px] h-$ shrink-0 overflow-hidden rounded-full"
              alt={l?.name}
              src={l?.logoUrl}
            />
          )}
          {l.symbol === 'ETH' && (
            <img
              className="w-[40px] h-$ shrink-0 overflow-hidden rounded-full"
              alt={l?.name}
              src={l?.logoUrl}
            />
          )}
          {l.symbol === 'TRX' && (
            <img
              className="w-[40px] h-$ shrink-0 overflow-hidden rounded-full"
              alt={l?.name}
              src={l?.logoUrl}
            />
          )}
          <div className="cursor-pointer flex flex-col items-start">
            <div className="text-base font-sans font-medium leading-[24px] inline-block">
              {l?.name}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-end">
          <div className="text-base text-green-600 font-sans font-medium leading-[24px] inline-block">
            {l?.amount} {l.symbol}
          </div>
          <div className="text-[8px] text-gray-200 font-sans font-medium leading-[24px] inline-block">
            {l?.date}
          </div>
        </div>
      </div>
    </div>
  );
  return <>{newCard}</>;
};
export const WalletBalances = (props) => {
  const { setIdx, mode } = props;
  const newCard = (
    <div className="cursor-pointer flex-col md:flex-row rounded-lg p-4 w-full">
      <div className="flex flex-col md:flex-row justify-between w-full">
        <UserProfile l={menu[0]} setIdx={setIdx} mode={mode} />
        <UserProfile l={menu[1]} setIdx={setIdx} mode={mode} />
        <UserProfile l={menu[2]} setIdx={setIdx} mode={mode} />
      </div>
    </div>
  );
  return <>{newCard}</>;
};
