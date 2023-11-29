import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

import styles from './AppContainer.module.css';
import { MdQrCodeScanner } from 'react-icons/md';
import { FaBitcoin } from 'react-icons/fa'; // Bitcoin
import { SiTether } from 'react-icons/si'; // Tether
import { FaEthereum } from 'react-icons/fa'; //Ethereum
import { SiLitecoin } from 'react-icons/si'; //Litecoin
import { createStore } from '../services/apiServiceStore';

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

export const CardAdvert = (props) => {
  const { mode, user } = props;
  // const [isRedirect, setIsRedirect] = useState(false);

  // if (isRedirect) {
  //   return <Navigate to="/defi" />;
  // }

  const [storeInfo, setStoreInfo] = useState();
  console.log({ storeInfo: storeInfo });

  const createUserStore = async () => {
    // const userData = {
    //   currency, cryptoCurrency, bitcoinAddress, tronAddress
    // }

    const userData = {
      currency: 'usd',
      cryptoCurrency: 'trx',
      // bitcoinAddress: "mpbVJDf8Yni55hL1fTJvVWwFQf8395XMSa",
      tronAddress: 'TBGehZvQo63jqM1T4UyaJaoJBZNJxi75qe',
    };

    const response = await createStore(userData);
    if (response) {
      setStoreInfo(response);
    }
  };
  return (
    <div className={`flex flex-col`}>
      <div
        className={`flex justify-center items-center rounded-lg shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[320px] p-4 ${
          mode === true
            ? 'bg-white'
            : 'bg-bgDark outline outline-bgDarkOutline outline-[1px]'
        }`}
      >
        <div className="flex flex-col gap-[4px]">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-4 mt-2">
              <div
                className={`cursor-pointer leading-[24px] inline-block text-xs font-black ${
                  mode === true ? 'text-bgPrimary' : 'text-gray-100'
                }`}
              >
                Start receiving payments in USDT today!
              </div>
            </div>
          </div>
          <div
            className={`mb-2 p-1 cursor-pointer flex flex-row justify-center items-center w-[280px] bg-bgPrimary hover:opacity-90 text-white h-[49px] shrink-0 rounded-md outline outline-lightslategray-300 outline-[1px]`}
            onClick={createUserStore}
          >
            Create Store
          </div>
        </div>
      </div>
    </div>
  );
};
