import React, { useState, useEffect } from 'react';
import { History } from '../../components/History';
import { WalletBalances } from '../../components/WalletBalances';
import Trending from '../../components/coins/Trending';
import HistoryChart from '../../components/coins/HistoryChart';
import Markets from '../../components/coins/Markets';
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

export const WalletsPage = (props) => {
  const { mode } = props;

  const [idx, setIdx] = useState(menu[0]?.id);

  return (
    <>
      <div className="p-1 w-full h-[90vh]">
        <div className="flex flex-row gap-2 h-[90vh] w-full">
          <div className="flex flex-col gap-2 h-[90vh] w-full">
            <div
              className={`flex justify-center rounded-lg shadow-lg p-1 ${
                mode === true
                  ? 'bg-white'
                  : 'bg-bgDark outline outline-bgDarkOutline outline-[1px]'
              }`}
            >
              <WalletBalances setIdx={setIdx} mode={mode} />
            </div>
            <div
              className={`flex justify-center rounded-lg shadow-lg p-1 ${
                mode === true
                  ? 'bg-white'
                  : 'bg-bgDark outline outline-bgDarkOutline outline-[1px]'
              }`}
            >
              <HistoryChart idx={idx} mode={mode} />
            </div>
            {/* <div
              className={`flex justify-center rounded-lg shadow-lg p-1 ${
                mode === true
                  ? 'bg-white'
                  : 'bg-bgDark outline outline-bgDarkOutline outline-[1px]'
              }`}
            >
              <div className="p-1 w-full">
                <Markets setIdx={setIdx} mode={mode} />
              </div>
            </div> */}
          </div>
          <div
            className={`flex flex-col justify-between shadow-xl rounded-lg ${
              mode === true
                ? 'bg-white outline outline-lightslategray-300 outline-[1px]'
                : 'bg-bgDark outline outline-bgDarkOutline outline-[1px]'
            } justify-center`}
          >
            <History mode={mode} />
            <Trending setIdx={setIdx} mode={mode} />
          </div>
        </div>
      </div>
    </>
  );
};
