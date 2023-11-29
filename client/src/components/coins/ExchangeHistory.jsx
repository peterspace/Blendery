import TransactionsHistory from './TransactionsHistory';
import Skeleton from './Skeleton';
import { getUserTransactions } from '../../redux/features/transaction/transactionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useState, useEffect } from 'react';

export const MarketsTitle = (props) => {
  const { mode } = props;
  return (
    <div
      className={`gap-6 flex flex-row font-light p-4 border border-indigo-600 border-b ${
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
        <p className="font-semibold">Created At</p>
      </div>
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
  const { mode } = props;

  const dispatch = useDispatch();

  const response = useSelector(
    (state) => state.transaction?.allUserTransactions
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getUserTransactions());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log({ response: response });

  useEffect(() => {
    if (!response) {
      setLoading(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    // <section className="flex mt-8 flex-col gap-[8px] rounded-lg p-2 outline outline-lightslategray-300 outline-[1px]">
    // <section className="flex mt-8 flex-col gap-[8px] p-2">
    <section className={`flex mt-8 flex-col gap-[8px]`}>
      <div
        className={`mt-[8px] ml-[8px] text-lg font-sans font-bold inline-block ${
          mode === true ? 'text-bgPrimary' : 'text-white'
        }`}
      >
        {'Exchange Transaction History'}
      </div>
      {/* <div className="m-2 flex flex-col rounded-lg bg-white shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] h-[50vh] py-4"> */}
      <div
        className={`m-2 flex flex-col rounded-lg shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] h-[22vh] py-4 ${
          mode === true
            ? 'bg-white'
            : 'outline outline-lightslategray-300 outline-[1px]'
        }`}
      >
        <MarketsTitle mode={mode} />
        <div
          className={`flex w-full h-px ${
            mode === true ? 'bg-lightslategray-300' : 'bg-gray-100'
          }`}
        />
        <div className="overflow-scroll">
          {response &&
            response.map((coin, idx) => (
              <TransactionsHistory
                key={idx}
                position={idx + 1}
                coin={coin}
                mode={mode}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default ExchangeHistory;
