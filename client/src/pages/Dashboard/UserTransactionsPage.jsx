import React, { useState, useEffect } from 'react';
import ExchangeHistory from '../../components/history/ExchangeHistory';

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

export const UserTransactionsPage = (props) => {
  const { mode, data, setTxInfo, setRefetchTxData, setService, setSubService } =
    props;

  const [idx, setIdx] = useState(menu[0]?.id);

  return (
    <>
      {/* <div className="flex flex-col justify-start items-start xl:justify-center xl:items-center mt-6 xl:mt-0 gap-4">
       
      </div> */}
      <div className="p-1 w-full">
        <ExchangeHistory
          setIdx={setIdx}
          mode={mode}
          data={data}
          setTxInfo={setTxInfo}
          setRefetchTxData={setRefetchTxData}
          setService={setService}
          setSubService={setSubService}
        />
      </div>
    </>
  );
};
