import { useState, useEffect } from 'react';
import { TimerFormat } from '../TimerFormat';
import { useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getTransactionByTxIdInternal } from '../../redux/features/transaction/transactionSlice';

const TransactionsHistoryAdmin = (props) => {
  const {
    item,
    mode,
    position,
    setTxInfo,
    setIsUpdate,
    setIsView,
    setIsTx,
  } = props;

  const dispatch = useDispatch();


  return (
    <>
      <>
        <div
          className={`cursor-pointer grid grid-cols-7 gap-[12px] mr-2 ml-2 font-light p-4 border border-indigo-600 border-b  ${
            mode === true
              ? 'hover:bg-gray-100 hover:outline hover:outline-lightslategray-300 hover:outline-[1px]'
              : 'hover:bg-hoverDark hover:outline hover:outline-lightslategray-300 hover:outline-[1px]'
          }`}
        >
          <span
            className={`flex items-center text-center ${
              mode === true ? 'text-black' : 'text-white'
            }`}
          >
            {position}
          </span>
          <span
            className={`flex items-center text-center ${
              mode === true ? 'text-black' : 'text-white'
            }`}
          >
            {item?.orderNo}
          </span>
          <div className="flex flex-row items-center gap-1">
            <p className={`${mode === true ? 'text-black' : 'text-white'}`}>
              {item.fValue}
            </p>
            <span
              className={`text-xs ${
                mode === true ? 'text-black' : 'text-white'
              }`}
            >
              {item.fToken?.symbol?.toUpperCase()}
            </span>
          </div>
          <div className="flex flex-row items-center gap-1">
            <p className={`${mode === true ? 'text-black' : 'text-white'}`}>
              {item.tValue}
            </p>
            <span
              className={`text-xs ${
                mode === true ? 'text-black' : 'text-white'
              }`}
            >
              {item.tToken?.symbol?.toUpperCase()}
            </span>
          </div>

          {item?.status === 'Received' || item?.service === 'defi' ? (
            <span
              className={`flex items-center text-center ${
                mode === true ? 'text-black' : 'text-white'
              }`}
            >
              {`-- : -- : --`}
            </span>
          ) : (
            <span
              className={`flex items-center text-center ${
                mode === true ? 'text-black' : 'text-white'
              }`}
            >
              {item?.timeStatus === 'Expired' ? (
                <div
                  className={`text-base leading-[24px] text-red-600 inline-block w-[69px]`}
                >
                  Expired
                </div>
              ) : (
                <div
                  className={`text-base leading-[24px] ${
                    mode === true ? 'text-black' : 'text-white'
                  } inline-block w-[69px]`}
                >
                  <TimerFormat duration={item?.timeLeft} />
                </div>
              )}
            </span>
          )}

          <span
            className={`flex items-center text-center ${
              mode === true ? 'text-black' : 'text-white'
            }`}
          >
            {item?.status}
          </span>
          <span
            className={`flex gap-1 items-center text-center ${
              mode === true ? 'text-black' : 'text-white'
            }`}
            // onClick={updateTransaction}
          >
            <div
              className={`flex flex-col rounded-lg p-2 hover:bg-rose-400 bg-rose-600`}
              onClick={() => {
                setTxInfo(item);
                dispatch(getTransactionByTxIdInternal(item)); // dispatch txData globally
                setIsUpdate(true);
                setIsView(false);
                setIsTx(false);
              }}
            >
              <span className="text-smi text-gray-100">update</span>
            </div>
          </span>
        </div>
      </>
    </>

    // </Link>
  );
};

export default TransactionsHistoryAdmin;
