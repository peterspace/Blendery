import React, { useState, useEffect } from 'react';

//==============={Dashboard imports}===========================
import { DashboardMenu } from '../../components/DashboardMenu';
import { History } from '../../components/History';
import { WalletBalances } from '../../components/WalletBalances';
import { CardWallet } from '../../components/CardWallet';
//==============={crypto market info}===========================
import Trending from '../../components/coins/Trending';
//==============={crypto market chart}===========================
import HistoryChart from '../../components/coins/HistoryChart';
import { CardMessenger } from '../../components/CardMessenger';
//==============={crypto description}===========================

import { WalletHistory } from '../../components/WalletHistory';
import { CardAdvert } from '../../components/CardAdvert';
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

export const WalletsPageTest = (props) => {
  const { setPage, mode, user } = props;

  const response = localStorage.getItem('tokensData')
    ? JSON.parse(localStorage.getItem('tokensData'))
    : null;

  const [idx, setIdx] = useState(menu[0]?.id);

  return (
    <div className="container mx-auto flex flex-col xl:flex-row justify-center">
      <div
        className={`flex flex-col xl:flex-row gap-[16px] mt-[8px] rounded-lg p-[16px] ${
          mode === true
            ? 'bg-gray-100 outline outline-lightslategray-300 outline-[1px]'
            : 'bg-bgDark outline outline-lightslategray-300 outline-[1px]'
        }`}
      >
        <div
          className={`flex-col xl:flex-row rounded-lg shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] h-full ${
            mode === true
              ? 'bg-white'
              : 'bg-bgDark outline outline-lightslategray-300 outline-[1px]'
          }`}
        >
          <DashboardMenu setPage={setPage} mode={mode} user={user}/>
        </div>
        <div className="flex flex-col justify-start items-start xl:justify-center xl:items-center mt-6 xl:mt-0 gap-4">
          {/* <WalletBalances setIdx={setIdx} /> */}
          <div
            className={`flex justify-center rounded-lg shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[70vh] ${
              mode === true
                ? 'bg-white'
                : 'bg-bgDark outline outline-lightslategray-300 outline-[1px]'
            }`}
          >
            <WalletBalances setIdx={setIdx} mode={mode} />
          </div>
          <div
            className={`flex justify-center rounded-lg shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[70vh] mode === true
              ? 'bg-white'
              : 'bg-bgDark outline outline-lightslategray-300 outline-[1px]'
          }`}
          >
            <HistoryChart idx={idx} mode={mode} />
          </div>
          {/* <HistoryChart idx={idx}/> */}
          <div className="flex flex-row justify-between w-[70vh]">
            <History mode={mode} />
            <WalletHistory mode={mode} />
            <Trending setIdx={setIdx} mode={mode} />
          </div>
        </div>
        <div className="flex flex-col gap-[16px]">
          <CardWallet mode={mode} />
          <CardAdvert mode={mode} />
          <CardMessenger mode={mode} />
        </div>
      </div>
    </div>
  );
};
