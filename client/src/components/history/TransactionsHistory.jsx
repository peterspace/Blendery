import { useState, useEffect } from 'react';
import { TimerFormat } from '../TimerFormat';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getTransactionByTxIdInternal } from '../../redux/features/transaction/transactionSlice';
const TransactionsHistory = (props) => {
  const {
    item,
    mode,
    position,
    setTxInfo,
    setRefetchTxData,
    setService,
    setSubService,
  } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //======{sets the transaction data and navigates to the required page based on the type of "service" and "subService" of the transaction}===========
  // const updateTransaction = async () => {
  //   setTxInfo(item);
  //   setTimeout(() => {
  //     setRefetchTxData(true);

  //     let service = item?.service;
  //     let subService = item?.subService;

  //     if (service === "exchange" && subService === "exchange") {
  //       navigate("/exchange");
  //     }
  //     if (service === "defi" && subService === "defi") {
  //       navigate("/defi");
  //     }
  //     if (service === "buy" && subService === "buyCash") {
  //       navigate("/buyCash");
  //     }

  //     if (service === "buy" && subService === "buyCard") {
  //       navigate("/buyCard");
  //     }
  //     if (service === "sell" && subService === "sellCash") {
  //       navigate("/sellCash");
  //     }
  //     if (service === "sell" && subService === "sellCard") {
  //       navigate("/sellCard");
  //     }
  //   }, 1000); // after 1 sec
  // };

  const updateTransaction = async () => {
    setTxInfo(item);
    dispatch(getTransactionByTxIdInternal(item)); // dispatch txData globally
    setTimeout(() => {
      setRefetchTxData(true);

      let service = item?.service;
      let subService = item?.subService;

      if (service === 'exchange' && subService === 'exchange') {
        setService('exchange');
        setSubService('exchange');
        navigate(`/exchange/${item?._id}`);
      }
      if (service === 'defi' && subService === 'defi') {
        setService('defi');
        setSubService('defi');
        navigate(`/defi/${item?._id}`);
      }
      if (service === 'buy' && subService === 'buyCash') {
        setService('buy');
        setSubService('buyCash');
        navigate(`/buyCash/${item?._id}`);
      }

      if (service === 'buy' && subService === 'buyCard') {
        setService('buy');
        setSubService('buyCard');
        navigate(`/buyCard/${item?._id}`);
      }
      if (service === 'sell' && subService === 'sellCash') {
        setService('sell');
        setSubService('sellCash');
        navigate(`/sellCash/${item?._id}`);
      }
      if (service === 'sell' && subService === 'sellCard') {
        setService('sell');
        setSubService('sellCard');
        navigate(`/sellCard/${item?._id}`);
      }
    }, 1000); // after 1 sec
  };

  return (
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
          className={`text-xs ${mode === true ? 'text-black' : 'text-white'}`}
        >
          {item.fToken?.symbol?.toUpperCase()}
        </span>
      </div>
      <div className="flex flex-row items-center gap-1">
        <p className={`${mode === true ? 'text-black' : 'text-white'}`}>
          {item.tValue}
        </p>
        <span
          className={`text-xs ${mode === true ? 'text-black' : 'text-white'}`}
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
        onClick={updateTransaction}
      >
        <div
          className={`flex flex-col rounded-lg p-2 hover:bg-blue-400 bg-blue-600`}
          onClick={''}
        >
          <span className="text-smi text-gray-100">view</span>
        </div>
      </span>
    </div>
    // </Link>
  );
};

export default TransactionsHistory;
