import { useState } from 'react';

import { Link } from 'react-router-dom';
import { TrendingDown, TrendingUp } from '../../icons/icons';
import { currencyFormat } from '../../utils';

const tokenObj = {
  id: 'gala',
  symbol: 'gala',
  name: 'GALA',
  image:
    'https://assets.coingecko.com/coins/images/12493/large/GALA-COINGECKO.png?1600233435',
  current_price: 0.01329208,
  market_cap: 351972612,
  market_cap_rank: 95,
  fully_diluted_valuation: 664460258,
  total_volume: 393231240,
  high_24h: 0.013401,
  low_24h: 0.0131671,
  price_change_24h: -0.000063155391006724,
  price_change_percentage_24h: -0.47289,
  market_cap_change_24h: -3979571.212519884,
  market_cap_change_percentage_24h: -1.11801,
  circulating_supply: 26485602971.0567,
  total_supply: 26485208123.3413,
  max_supply: 50000000000,
  ath: 0.824837,
  ath_change_percentage: -98.38895,
  ath_date: '2021-11-26T01:03:48.731Z',
  atl: 0.00013475,
  atl_change_percentage: 9761.64337,
  atl_date: '2020-12-28T08:46:48.367Z',
  roi: null,
  last_updated: '2023-09-27T08:40:27.468Z',
};

// const token = {
//   id: coin?.id,
//   symbol: coin?.symbol,
//   name: coin?.name,
//   image: coin?.image,
//   current_price: coin?.current_price,
//   market_cap: coin?.market_cap,
//   market_cap_rank: coin?.market_cap_rank,
//   fully_diluted_valuation: coin?.fully_diluted_valuation,
//   total_volume: coin?.total_volume,
//   high_24h: coin?.high_24h,
//   low_24h: coin?.low_24h,
//   price_change_24h: coin?.price_change_24h,
//   price_change_percentage_24h: coin?.price_change_percentage_24h,
//   market_cap_change_24h: coin?.market_cap_change_24h,
//   market_cap_change_percentage_24h: coin?.market_cap_change_percentage_24h,
//   circulating_supply: coin?.circulating_supply,
//   total_supply: coin?.total_supply,
//   max_supply: coin?.max_supply,
//   ath: coin?.ath,
//   ath_change_percentage: coin?.ath_change_percentage,
//   ath_date: coin?.ath_date,
//   atl: coin?.atl,
//   atl_change_percentage: coin?.atl_change_percentage,
//   atl_date: coin?.atl_date,
//   roi: coin?.roi,
//   last_updated: coin?.last_updated,
// };

const LogoUpload = (props) => {
  const { coin, setTCoin } = props;
  // console.log(coin);

  return (
    <div
      onClick={() => {
        setTCoin(coin);
      }}
    >
      <div className="cursor-pointer grid grid-cols-3 sm:grid-cols-4 font-light p-2 rounded border-gray-200 border-b hover:bg-gray-200">
        <div className="flex items-center gap-1 w-full">
          <img className="w-6" src={coin.image} alt={coin.name} />
          <p>{coin.name}</p>
          <span className="text-xs">({coin.symbol})</span>
        </div>
        <span className="w-full text-center">
          {currencyFormat(coin.current_price)}
        </span>
        <span
          className={`flex gap-1 ${
            coin.price_change_percentage_24h < 0
              ? 'text-red-400'
              : 'text-green-400'
          }`}
        >
          {coin.price_change_percentage_24h < 0 ? (
            <TrendingDown />
          ) : (
            <TrendingUp />
          )}
          {coin.price_change_percentage_24h}
        </span>
        <div className="hidden sm:block">
          <p className="font-semibold">Market Cap</p>
          <span>{currencyFormat(coin.market_cap)}</span>
        </div>
      </div>
    </div>
  );
};

export default LogoUpload;
