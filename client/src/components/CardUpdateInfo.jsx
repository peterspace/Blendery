import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { MdQrCodeScanner } from 'react-icons/md';

import { updateTransactionByIdService } from '../services/apiService';
import { TimerFormat } from './TimerFormat';

const paymentStatus = [
  {
    name: 'Pending', // user has not sent fiat/crypto to blendery
  },
  {
    name: 'Paid', // user has sent fiat/crypto to blendery
  },
  {
    name: 'Received', // blendery received users fiat/crypto
  },
  {
    name: 'Completed', // blendery has sent  fiat/crypto to user
  },
];

export const CashInfo = (props) => {
  const { mode, item, setRefetchTxData } = props;

  async function handleClose() {
    setRefetchTxData(true);
    localStorage.removeItem('txDataUpdate'); // remove from local storage to allow new data
    localStorage.removeItem('isUpdate'); // remove from local storage to allow new data
    localStorage.removeItem('isUpdating'); // remove from local storage to allow new data
  }

  return (
    <div
      className={`flex justify-center rounded-lg shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[320px] xs:w-[340px] md:w-[500px] p-4 ${
        mode === true
          ? 'bg-white outline outline-lightslategray-300 outline-[1px]'
          : 'bg-bgDarkMode outline outline-lightslategray-300 outline-[1px]'
      }`}
    >
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[10px]">
          <div className="flex flex-row justify-between mt-2">
            <div
              className={`cursor-pointer hover:text-bgPrimary leading-[24px] inline-block text-[24px] ${
                mode === true ? 'text-darkslategray-200' : 'text-gray-100'
              }`}
            >
              Transaction Detail
            </div>
            <div className="transition-transform duration-300 hover:scale-125 cursor-pointer flex flex-row justify-center items-center p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#130D1A"
                className="w-5 h-5"
                onClick={handleClose}
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div className="flex bg-lightslategray-300 md:w-[452px] w-[320px] xs:w-[340px] h-px" />
        </div>

        <div className="flex flex-col w-[320px] xs:w-[340px] md:w-[452px]">
          <>
            <div
              className={`cursor-pointer flex flex-col mr-2 ml-2 font-light p-4 border border-indigo-600 border-b  ${
                mode === true
                  ? 'hover:bg-gray-100 hover:outline hover:outline-lightslategray-300 hover:outline-[1px]'
                  : 'hover:bg-hoverDark hover:outline hover:outline-lightslategray-300 hover:outline-[1px]'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <div
                  className={`flex text-center ${
                    mode === true ? 'text-black' : 'text-white'
                  }`}
                >
                  OrderNo:
                </div>
                <span
                  className={`flex text-center ${
                    mode === true ? 'text-black' : 'text-white'
                  }`}
                >
                  {item?.orderNo}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between">
                <div
                  className={`flex text-center ${
                    mode === true ? 'text-black' : 'text-white'
                  }`}
                >
                  From:
                </div>
                <div className="flex flex-row items-center gap-1">
                  <p
                    className={`${mode === true ? 'text-black' : 'text-white'}`}
                  >
                    {item.fValue}
                  </p>
                  <span
                    className={`${mode === true ? 'text-black' : 'text-white'}`}
                  >
                    {item.fToken?.symbol?.toUpperCase()}{' '}
                    {`(${item.fToken?.chain})`}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between">
                <div
                  className={`flex text-center ${
                    mode === true ? 'text-black' : 'text-white'
                  }`}
                >
                  To:
                </div>
                <div className="flex flex-row items-center gap-1">
                  <p
                    className={`${mode === true ? 'text-black' : 'text-white'}`}
                  >
                    {item.tValue}
                  </p>
                  <span
                    className={`${mode === true ? 'text-black' : 'text-white'}`}
                  >
                    {item.tToken?.symbol?.toUpperCase()}{' '}
                    {`(${item.tToken?.chain})`}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between">
                <div
                  className={`flex text-center ${
                    mode === true ? 'text-black' : 'text-white'
                  }`}
                >
                  Status:
                </div>
                <span
                  className={`flex items-center text-center ${
                    mode === true ? 'text-black' : 'text-white'
                  }`}
                >
                  {item?.status}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <div
                  className={`flex text-center ${
                    mode === true ? 'text-black' : 'text-white'
                  }`}
                >
                  Amount:
                </div>
                <span
                  className={`flex items-center text-center ${
                    mode === true ? 'text-black' : 'text-white'
                  }`}
                >
                  {item?.amount}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <div
                  className={`flex text-center ${
                    mode === true ? 'text-black' : 'text-white'
                  }`}
                >
                  User:
                </div>
                <span
                  className={`flex items-center text-center ${
                    mode === true ? 'text-black' : 'text-white'
                  }`}
                >
                  {item?.userAddress}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <div
                  className={`flex text-center ${
                    mode === true ? 'text-black' : 'text-white'
                  }`}
                >
                  Blendery:
                </div>
                <span
                  className={`flex items-center text-center ${
                    mode === true ? 'text-black' : 'text-white'
                  }`}
                >
                  {item?.blenderyAddress}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <div
                  className={`flex text-center ${
                    mode === true ? 'text-black' : 'text-white'
                  }`}
                >
                  Country:
                </div>
                <span
                  className={`flex items-center text-center ${
                    mode === true ? 'text-black' : 'text-white'
                  }`}
                >
                  {item?.country}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <div
                  className={`flex text-center ${
                    mode === true ? 'text-black' : 'text-white'
                  }`}
                >
                  City:
                </div>
                <span
                  className={`flex items-center text-center ${
                    mode === true ? 'text-black' : 'text-white'
                  }`}
                >
                  {item?.city}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <div
                  className={`flex text-center ${
                    mode === true ? 'text-black' : 'text-white'
                  }`}
                >
                  Timeleft:
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
                      <div className={`text-red-600 inline-block w-[69px]`}>
                        Expired
                      </div>
                    ) : (
                      <div
                        className={`${
                          mode === true ? 'text-black' : 'text-white'
                        } inline-block w-[69px]`}
                      >
                        <TimerFormat duration={item?.timeLeft} />
                      </div>
                    )}
                  </span>
                )}
              </div>
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export const CashUpdate = (props) => {
  // const dispatch = useDispatch();

  const { mode, item, setRefetchTxData } = props;
  const [benderyStatus, setBenderyStatus] = useState(item?.status);
  const [dispatcherTelegram, setDispatcherTelegram] = useState('');
  const [hash, setHash] = useState('');

  let service = item?.service;
  let subService = item?.subService;

  // useEffect(() => {
  //   setBenderyStatus(item?.status);
  // }, [item]);

  const updateTransaction = async () => {
    let userData;

    if (service === 'exchange' && subService === 'exchange') {
      userData = {
        id: item?._id,
        status: benderyStatus,
        hashOut: hash,
        service: item?.service,
        subService: item?.subService,
        progress: item?.percentageProgress,
        //===========================
      };
      //
    }
    if (service === 'defi' && subService === 'defi') {
      userData = {
        id: item?._id,
        status: benderyStatus,
        service: item?.service,
        subService: item?.subService,
        progress: item?.percentageProgress,
        //===========================
      };
    }
    if (service === 'buy' && subService === 'buyCash') {
      userData = {
        id: item?._id,
        status: benderyStatus,
        dispatcherTelegram,
        hashOut: hash,
        service: item?.service,
        subService: item?.subService,
        progress: item?.percentageProgress,
        //===========================
      };
      //
    }
    if (service === 'buy' && subService === 'buyCard') {
      userData = {
        id: item?._id,
        status: benderyStatus,
        hashOut: hash,
        service: item?.service,
        subService: item?.subService,
        progress: item?.percentageProgress,
        //===========================
      };
      //
    }
    if (service === 'sell' && subService === 'sellCash') {
      userData = {
        id: item?._id,
        status: benderyStatus,
        dispatcherTelegram,
        service: item?.service,
        subService: item?.subService,
        progress: item?.percentageProgress,
        //===========================
      };
      //
    }
    if (service === 'sell' && subService === 'sellCard') {
      userData = {
        id: item?._id,
        status: benderyStatus,
        service: item?.service,
        subService: item?.subService,
        progress: item?.percentageProgress,
        //===========================
      };
      //
    }
    const response = await updateTransactionByIdService(userData);
    if (response) {
      setRefetchTxData(true);
      localStorage.removeItem('txDataUpdate'); // remove from local storage to allow new data
      localStorage.removeItem('isUpdate'); // remove from local storage to allow new data
      localStorage.removeItem('isUpdating'); // remove from local storage to allow new data
    }
  };

  return (
    <div
      className={`flex justify-center rounded-lg shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[320px] xs:w-[340px] md:w-[500px] p-4 ${
        mode === true
          ? 'bg-white outline outline-lightslategray-300 outline-[1px]'
          : 'bg-bgDarkMode outline outline-lightslategray-300 outline-[1px]'
      }`}
    >
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[10px]">
          <div className="flex flex-row gap-4 mt-2">
            <div
              className={`cursor-pointer hover:text-bgPrimary leading-[24px] inline-block text-[24px] ${
                mode === true ? 'text-darkslategray-200' : 'text-gray-100'
              }`}
            >
              Update Transaction
            </div>
          </div>
          <div className="flex bg-lightslategray-300 md:w-[452px] w-[320px] xs:w-[340px] h-px" />
        </div>

        <div className="flex flex-col w-[320px] xs:w-[340px] md:w-[452px] gap-[8px]">
          <div className="flex flex-row bg-bgSecondary rounded h-[62px] justify-between">
            <div className="md:w-[452px] w-[320px] xs:w-[340px]">
              <div className="ml-2 mt-2 text-xs leading-[18px] text-darkslategray-200">
                Blendery Payment Status
              </div>
              <div className="ml-2 flex flex-row gap-[8px] items-center w-[320px] xs:w-[340px] md:w-[452px] mt-[13px]">
                <div className="mr-4 w-[320px] xs:w-[340px] md:w-[452px]">
                  <select
                    name="benderyStatus"
                    className={`[border:none] outline-none w-full text-[12px] md:text-[16px] leading-[24px] text-darkslategray-200 inline-block bg-[transparent]`}
                    value={benderyStatus}
                    onChange={(ev) => setBenderyStatus(ev.target.value)}
                  >
                    {paymentStatus &&
                      paymentStatus.map((status, index) => (
                        <option key={index} value={status?.name}>
                          {status?.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="cursor-pointer mr-2 flex justify-center items-center w-[18px] h-[64px] overflow-hidden">
              <MdQrCodeScanner size={15} />
            </div>
          </div>
          {service === 'exchange' && subService === 'exchange' && (
            <>
              <div className="flex flex-row bg-bgSecondary rounded h-[62px] justify-between">
                <div className="md:w-[452px] w-[320px] xs:w-[340px]">
                  <div className="ml-2 mt-2 text-xs leading-[18px] text-darkslategray-200">
                    Transaction Hash
                  </div>
                  <input
                    type="text"
                    className="ml-2 text-[12px] md:text-[16px] leading-[24px] text-darkslategray-200 inline-block w-[90%] outline-none bg-bgSecondary placeholder-darkgray-100"
                    placeholder="5229ff374b04b0aa6..."
                    value={hash}
                    onChange={(ev) => setHash(ev.target.value)}
                  />
                </div>
                <div className="cursor-pointer mr-2 flex justify-center items-center w-[18px] h-[64px] overflow-hidden">
                  <MdQrCodeScanner size={15} />
                </div>
              </div>
            </>
          )}
          {service === 'defi' && subService === 'defi' && null}
          {service === 'buy' && subService === 'buyCash' && (
            <>
              <div className="flex flex-row bg-bgSecondary rounded h-[62px] justify-between">
                <div className="md:w-[452px] w-[320px] xs:w-[340px]">
                  <div className="ml-2 mt-2 text-xs leading-[18px] text-darkslategray-200">
                    Transaction Hash
                  </div>
                  <input
                    type="text"
                    className="ml-2 text-[12px] md:text-[16px] leading-[24px] text-darkslategray-200 inline-block w-[90%] outline-none bg-bgSecondary placeholder-darkgray-100"
                    placeholder="5229ff374b04b0aa6..."
                    value={hash}
                    onChange={(ev) => setHash(ev.target.value)}
                  />
                </div>
                <div className="cursor-pointer mr-2 flex justify-center items-center w-[18px] h-[64px] overflow-hidden">
                  <MdQrCodeScanner size={15} />
                </div>
              </div>

              <div
                className={`flex flex-row bg-bgSecondary rounded h-[62px] justify-between ${
                  mode === true
                    ? 'bg-whitesmoke-200'
                    : 'hover:outline bg-hoverDark hover:bg-bgDark hover:outline-[1px] hover:outline-lightslategray-300'
                }`}
              >
                <div className="">
                  <div className="ml-2 mt-2 text-xs leading-[18px] text-darkslategray-200">
                    Dispatcher Telegram
                  </div>
                  <input
                    type="text"
                    className="ml-2 text-[12px] md:text-[16px] leading-[24px] text-darkslategray-200 inline-block w-[90%] outline-none bg-bgSecondary placeholder-darkgray-100"
                    placeholder="@jason"
                    value={dispatcherTelegram}
                    onChange={(ev) => setDispatcherTelegram(ev.target.value)}
                  />
                </div>
                <div className="cursor-pointer mr-2 flex justify-center items-center w-[18px] h-[64px] overflow-hidden">
                  <MdQrCodeScanner size={15} />
                </div>
              </div>
            </>
          )}
          {service === 'buy' && subService === 'buyCard' && (
            <>
              <div className="flex flex-row bg-bgSecondary rounded h-[62px] justify-between">
                <div className="md:w-[452px] w-[320px] xs:w-[340px]">
                  <div className="ml-2 mt-2 text-xs leading-[18px] text-darkslategray-200">
                    Transaction Hash
                  </div>
                  <input
                    type="text"
                    className="ml-2 text-[12px] md:text-[16px] leading-[24px] text-darkslategray-200 inline-block w-[90%] outline-none bg-bgSecondary placeholder-darkgray-100"
                    placeholder="5229ff374b04b0aa6..."
                    value={hash}
                    onChange={(ev) => setHash(ev.target.value)}
                  />
                </div>
                <div className="cursor-pointer mr-2 flex justify-center items-center w-[18px] h-[64px] overflow-hidden">
                  <MdQrCodeScanner size={15} />
                </div>
              </div>
            </>
          )}
          {service === 'sell' && subService === 'sellCash' && (
            <>
              {' '}
              <div className="flex flex-row bg-bgSecondary rounded h-[62px] justify-between">
                <div className="">
                  <div className="ml-2 mt-2 text-xs leading-[18px] text-darkslategray-200">
                    Dispatcher Telegram
                  </div>
                  <input
                    type="text"
                    className="ml-2 text-[12px] md:text-[16px] leading-[24px] text-darkslategray-200 inline-block w-[90%] outline-none bg-bgSecondary placeholder-darkgray-100"
                    placeholder="@jason"
                    value={dispatcherTelegram}
                    onChange={(ev) => setDispatcherTelegram(ev.target.value)}
                  />
                </div>
                <div className="cursor-pointer mr-2 flex justify-center items-center w-[18px] h-[64px] overflow-hidden">
                  <MdQrCodeScanner size={15} />
                </div>
              </div>
            </>
          )}
          {service === 'sell' && subService === 'sellCard' && null}
        </div>
        <div
          className="mb-4 cursor-pointer flex flex-row justify-center items-center w-full bg-bgPrimary hover:opacity-90 text-white h-[49px] shrink-0 rounded"
          onClick={updateTransaction}
        >
          Update
        </div>
      </div>
    </div>
  );
};
//setTxInfo={setTxInfo}
export const CardUpdateInfo = (props) => {
  const { mode, setRefetchTxData } = props;
  const txData = useSelector(
    (state) => state.transaction?.transactionByTxIdInternal
  );

  //===================={new}==========================

  return (
    <div className={`flex flex-col justify-center items-center gap-[24px]`}>
      <>
        <CashInfo
          item={txData}
          mode={mode}
          setRefetchTxData={setRefetchTxData}
        />
        <CashUpdate
          item={txData}
          mode={mode}
          setRefetchTxData={setRefetchTxData}
        />
      </>
    </div>
  );
};
