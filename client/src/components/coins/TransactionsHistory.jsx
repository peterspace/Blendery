import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TrendingDown, TrendingUp } from '../../icons/icons';
import { currencyFormat } from '../../utils';
import { TimerFormat } from '../TimerFormat';

import { getUserTransactions, getTransactionByTxId } from '../../redux/features/transaction/transactionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';



const TransactionsHistory = (props) => {
  const { coin, mode, position } = props;

  const dispatch = useDispatch();
  const naviagte = useNavigate();

  const updateTransaction = async () => {
    localStorage.setItem('txId', JSON.stringify(coin?._id));
    setTimeout(() => {
      dispatch(getTransactionByTxId(coin?._id));
      dispatch(getUserTransactions());
      window.location.reload(); // so that the local storage state can be effective
      naviagte('/exchange');
    }, 1000); // after 1 sec
  };


  return (
    <div
      className={`cursor-pointer gap-6 flex flex-row font-light p-4 border border-indigo-600 border-b  ${
        mode === true
          ? 'hover:bg-gray-100 hover:outline hover:outline-lightslategray-300 hover:outline-[1px]'
          : 'hover:bg-hoverDark hover:outline hover:outline-lightslategray-300 hover:outline-[1px]'
      }`}
    >
      <span
        className={`flex items-center w-[25%] text-center ${
          mode === true ? 'text-black' : 'text-white'
        }`}
      >
        {position}
      </span>
      <span
        className={`flex items-center w-[25%] text-center ${
          mode === true ? 'text-black' : 'text-white'
        }`}
      >
        {coin?.orderNo}
      </span>
      <div className="flex flex-row items-center gap-1 w-[25%]">
        <p className={`${mode === true ? 'text-black' : 'text-white'}`}>
          {coin.fValue}
        </p>
        <span
          className={`text-xs ${mode === true ? 'text-black' : 'text-white'}`}
        >
          {coin.fToken?.symbol?.toUpperCase()}
        </span>
      </div>
      <div className="flex flex-row items-center gap-1 w-[25%]">
        <p className={`${mode === true ? 'text-black' : 'text-white'}`}>
          {coin.tValue}
        </p>
        <span
          className={`text-xs ${mode === true ? 'text-black' : 'text-white'}`}
        >
          {coin.tToken?.symbol?.toUpperCase()}
        </span>
      </div>
      <span
        className={`flex items-center w-[25%] text-center ${
          mode === true ? 'text-black' : 'text-white'
        }`}
      >
        {/* ==========={convert to local time}======================== */}
        {new Date(coin?.createdAt)}
      </span>
      {coin?.status === 'Received' || coin?.service === 'defi' ? (
        <span
          className={`flex items-center w-[25%] text-center ${
            mode === true ? 'text-black' : 'text-white'
          }`}
        >
          {`-- : -- : --`}
        </span>
      ) : (
        <span
          className={`flex items-center w-[25%] text-center ${
            mode === true ? 'text-black' : 'text-white'
          }`}
        >
          <div className="text-base leading-[24px] text-gray-300 inline-block w-[69px]">
            {/* 02:59:48 */}
            {/* {txData?.timeLeft} */}
            {/* using db countdown timer*/}
            <TimerFormat duration={coin?.timeLeft} />
          </div>
        </span>
      )}

      <span
        className={`flex items-center w-[25%] text-center ${
          mode === true ? 'text-black' : 'text-white'
        }`}
      >
        {coin?.status}
      </span>
      <span
        className={`flex items-center w-[25%] text-center ${
          mode === true ? 'text-black' : 'text-white'
        }`}
        onClick={updateTransaction}
      >
        view
      </span>
    </div>
    // </Link>
  );
};

export default TransactionsHistory;
