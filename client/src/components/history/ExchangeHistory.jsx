import TransactionsHistory from './TransactionsHistory';
import Skeleton from './Skeleton';
import {
  getUserTransactions,
  getTransactionByTxId,
  getUserExchange,
  getUserDefi,
  getUserBuyCash,
  getUserBuyCard,
  getUserSellCash,
  getUserSellCard,
} from '../../redux/features/transaction/transactionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useState, useEffect } from 'react';

const serviceTypes = [
  { name: 'all' },
  { name: 'Exchange' },
  { name: 'Defi' },
  { name: 'Buy (Cash)' },
  { name: 'Buy (Card)' },
  { name: 'Sell (Card)' },
  { name: 'Sell (Cash)' },
];

export const MarketsTitle = (props) => {
  const { mode } = props;
  return (
    <div
      className={`grid grid-cols-7 gap-[24px] mr-2 font-light p-4 border border-indigo-600 border-b ${
        mode === true ? 'text-black' : 'text-white'
      }`}
    >
      <span className="ml-4 flex items-center w-[25%] text-center">
        {' '}
        <p className="font-semibold">#</p>
      </span>
      <span className="ml-4 flex items-center w-[25%] text-center">
        {' '}
        <p className="font-semibold">TxId</p>
      </span>
      <span className="flex items-center w-[25%] text-center">
        {' '}
        <p className="font-semibold">From</p>
      </span>
      <span className={`flex items-center gap-1 w-[25%]`}>
        <p className="font-semibold">To</p>
      </span>
      <div className="hidden sm:block w-[25%]">
        <p className="font-semibold">Time left</p>
      </div>
      <div className="hidden sm:block w-[25%]">
        <p className="font-semibold">Status</p>
      </div>
      <div className="hidden sm:block w-[25%]">
        <p className="font-semibold">Action</p>
      </div>
    </div>
  );
};

const ExchangeHistory = (props) => {
  const { mode, data, setTxInfo, setRefetchTxData, setService, setSubService } =
    props;
  // const mode =true

  const [loading, setIsLoading] = useState(false);

  if (loading) {
    return (
      <div className="wrapper-container mt-8">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-8 w-full mt-2" />
        <Skeleton className="h-8 w-full mt-2" />
        <Skeleton className="h-8 w-full mt-2" />
        <Skeleton className="h-8 w-full mt-2" />
        <Skeleton className="h-8 w-full mt-2" />
        <Skeleton className="h-8 w-full mt-2" />
        <Skeleton className="h-8 w-full mt-2" />
      </div>
    );
  }

  return (
    <section className={`flex mt-8 flex-col gap-[8px]`}>
      <div
        className={`mt-[8px] ml-[8px] text-lg font-sans font-bold inline-block ${
          mode === true ? 'text-bgPrimary' : 'text-white'
        }`}
      >
        {'Exchange Transaction History'}
      </div>
      {/* <div className="m-2 flex flex-col rounded-lg bg-white shadow-lg h-[50vh] py-4"> */}
      <div
        className={`m-2 flex flex-col rounded-lg shadow-lg h-[800px] py-4 ${
          mode === true
            ? 'bg-white'
            : 'bg-bgDark outline outline-bgDarkOutline outline-[1px]'
        }`}
      >
        <MarketsTitle mode={mode} />
        <div
          className={`flex w-full h-px ${
            mode === true ? 'bg-lightslategray-300' : 'bg-gray-100'
          }`}
        />
        <div className="overflow-scroll">
          {data &&
            data.map((item, idx) => (
              <TransactionsHistory
                key={idx}
                position={idx + 1}
                item={item}
                mode={mode}
                setTxInfo={setTxInfo}
                setRefetchTxData={setRefetchTxData}
                setService={setService}
                setSubService={setSubService}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default ExchangeHistory;
