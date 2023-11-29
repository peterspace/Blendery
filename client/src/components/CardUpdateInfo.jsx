import { useState, useEffect } from "react";

import { MdQrCodeScanner } from "react-icons/md";
import { updateTransactionById } from "../redux/features/transaction/transactionSlice";

import {
  //======{Admin}==============
  getAdminExchange,
  getAdminDefi,
  getAdminBuyCash,
  getAdminBuyCard,
  getAdminSellCash,
  getAdminSellCard,
} from "../services/apiService";
import { useDispatch } from "react-redux";
import { TimerFormat } from "./TimerFormat";
import { useFormik } from "formik";

const paymentStatus = [
  {
    name: "Pending", // user has not sent fiat/crypto to blendery
  },
  {
    name: "Paid", // user has sent fiat/crypto to blendery
  },
  {
    name: "Received", // blendery received users fiat/crypto
  },
  {
    name: "Completed", // blendery has sent  fiat/crypto to user
  },
];

export const CashInfo = (props) => {
  const { mode, item, setIsUpdate, setIsView, setIsTx } = props;

  return (
    <div
      className={`flex justify-center rounded-lg shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[320px] xs:w-[340px] md:w-[500px] p-4 ${
        mode === true
          ? "bg-white outline outline-lightslategray-300 outline-[1px]"
          : "bg-bgDarker outline outline-lightslategray-300 outline-[1px]"
      }`}
    >
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[10px]">
          <div className="flex flex-row justify-between mt-2">
            <div
              className={`cursor-pointer hover:text-mediumspringgreen leading-[24px] inline-block text-[24px] ${
                mode === true ? "text-darkslategray-200" : "text-gray-100"
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
                onClick={() => {
                  setIsUpdate(false);
                  setIsView(false);
                  setIsTx(true);
                }}
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
                  ? "hover:bg-gray-100 hover:outline hover:outline-lightslategray-300 hover:outline-[1px]"
                  : "hover:bg-hoverDark hover:outline hover:outline-lightslategray-300 hover:outline-[1px]"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <div
                  className={`flex text-center ${
                    mode === true ? "text-black" : "text-white"
                  }`}
                >
                  OrderNo:
                </div>
                <span
                  className={`flex text-center ${
                    mode === true ? "text-black" : "text-white"
                  }`}
                >
                  {item?.orderNo}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between">
                <div
                  className={`flex text-center ${
                    mode === true ? "text-black" : "text-white"
                  }`}
                >
                  From:
                </div>
                <div className="flex flex-row items-center gap-1">
                  <p
                    className={`${mode === true ? "text-black" : "text-white"}`}
                  >
                    {item.fValue}
                  </p>
                  <span
                    className={`${mode === true ? "text-black" : "text-white"}`}
                  >
                    {item.fToken?.symbol?.toUpperCase()}{" "}
                    {`(${item.fToken?.chain})`}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between">
                <div
                  className={`flex text-center ${
                    mode === true ? "text-black" : "text-white"
                  }`}
                >
                  To:
                </div>
                <div className="flex flex-row items-center gap-1">
                  <p
                    className={`${mode === true ? "text-black" : "text-white"}`}
                  >
                    {item.tValue}
                  </p>
                  <span
                    className={`${mode === true ? "text-black" : "text-white"}`}
                  >
                    {item.tToken?.symbol?.toUpperCase()}{" "}
                    {`(${item.tToken?.chain})`}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between">
                <div
                  className={`flex text-center ${
                    mode === true ? "text-black" : "text-white"
                  }`}
                >
                  Status:
                </div>
                <span
                  className={`flex items-center text-center ${
                    mode === true ? "text-black" : "text-white"
                  }`}
                >
                  {item?.status}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <div
                  className={`flex text-center ${
                    mode === true ? "text-black" : "text-white"
                  }`}
                >
                  Amount:
                </div>
                <span
                  className={`flex items-center text-center ${
                    mode === true ? "text-black" : "text-white"
                  }`}
                >
                  {item?.amount}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <div
                  className={`flex text-center ${
                    mode === true ? "text-black" : "text-white"
                  }`}
                >
                  User:
                </div>
                <span
                  className={`flex items-center text-center ${
                    mode === true ? "text-black" : "text-white"
                  }`}
                >
                  {item?.userAddress}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <div
                  className={`flex text-center ${
                    mode === true ? "text-black" : "text-white"
                  }`}
                >
                  Blendery:
                </div>
                <span
                  className={`flex items-center text-center ${
                    mode === true ? "text-black" : "text-white"
                  }`}
                >
                  {item?.blenderyAddress}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <div
                  className={`flex text-center ${
                    mode === true ? "text-black" : "text-white"
                  }`}
                >
                  Country:
                </div>
                <span
                  className={`flex items-center text-center ${
                    mode === true ? "text-black" : "text-white"
                  }`}
                >
                  {item?.country}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <div
                  className={`flex text-center ${
                    mode === true ? "text-black" : "text-white"
                  }`}
                >
                  City:
                </div>
                <span
                  className={`flex items-center text-center ${
                    mode === true ? "text-black" : "text-white"
                  }`}
                >
                  {item?.city}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <div
                  className={`flex text-center ${
                    mode === true ? "text-black" : "text-white"
                  }`}
                >
                  Timeleft:
                </div>
                {item?.status === "Received" || item?.service === "defi" ? (
                  <span
                    className={`flex items-center text-center ${
                      mode === true ? "text-black" : "text-white"
                    }`}
                  >
                    {`-- : -- : --`}
                  </span>
                ) : (
                  <span
                    className={`flex items-center text-center ${
                      mode === true ? "text-black" : "text-white"
                    }`}
                  >
                    {item?.timeStatus === "Expired" ? (
                      <div className={`text-red-600 inline-block w-[69px]`}>
                        Expired
                      </div>
                    ) : (
                      <div
                        className={`${
                          mode === true ? "text-black" : "text-white"
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
  const dispatch = useDispatch();

  const { mode, item, setRefetchTxData } = props;
  const [benderyStatus, setBenderyStatus] = useState(item?.status);
  const [dispatcherTelegram, setDispatcherTelegram] = useState("");
  const [hash, setHash] = useState("");

  const { values, handleChange, handleSubmit, touched, errors, resetForm } =
    useFormik({
      initialValues: {
        hash: "",
        dispatcherTelegram: "",
        benderyStatus: item.status,
      },
      validate: ({ hash, dispatcherTelegram }) => {
        const errors = {};

        // TODO: will be implemented later (with some other conditions)

        // if (service === "exchange" && subService === "exchange") {
        //   if (!hash) {
        //     errors.hash = "Hash is required!";
        //   }
        // }

        // if (service === "buy" && subService === "buyCard") {
        //   if (!hash) {
        //     errors.hash = "Hash is required!";
        //   }
        // }

        // if (service === "buy" && subService === "buyCash") {
        //   if (!hash) {
        //     errors.hash = "Hash is required!";
        //   }
        //   if (!dispatcherTelegram) {
        //     errors.dispatcherTelegram = "Dispatcher Telegram is required!";
        //   }
        // }

        // if (service === "sell" && subService === "sellCash") {
        //   if (!dispatcherTelegram) {
        //     errors.dispatcherTelegram = "Dispatcher Telegram is required!";
        //   }
        // }

        // // We dont need
        // if (benderyStatus === item.status) {
        //   errors.benderyStatus = "Status has to be updated!";
        // }

        return errors;
      },
      onSubmit: ({ benderyStatus, hash, dispatcherTelegram }) => {
        updateTransaction(benderyStatus, hash, dispatcherTelegram);
      },
    });

  let service = item?.service;
  let subService = item?.subService;

  useEffect(() => {
    setBenderyStatus(item?.status);
  }, [item]);

  const updateTransaction = async (benderyStatus, hash, dispatcherTelegram) => {
    let userData;

    if (service === "exchange" && subService === "exchange") {
      userData = {
        id: item?._id,
        // benderyAddress,
        // blenderyAddressOut: benderyAddress,
        status: benderyStatus,
        //  status: "Completed",
        hashOut: hash,
        service: item?.service,
        subService: item?.subService,
        progress: item?.percentageProgress,
        //===========================
      };
      //
    }
    if (service === "defi" && subService === "defi") {
      userData = {
        id: item?._id,
        status: benderyStatus,
        //  status: "Completed",
        service: item?.service,
        subService: item?.subService,
        progress: item?.percentageProgress,
        //===========================
      };
    }
    if (service === "buy" && subService === "buyCash") {
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
    if (service === "buy" && subService === "buyCard") {
      userData = {
        id: item?._id,
        // benderyAddress,
        // blenderyAddressOut: benderyAddress,
        status: benderyStatus,
        //  status: "Completed",
        hashOut: hash,
        service: item?.service,
        subService: item?.subService,
        progress: item?.percentageProgress,
        //===========================
      };
      //
    }
    if (service === "sell" && subService === "sellCash") {
      userData = {
        id: item?._id,
        status: benderyStatus,
        //  status: "Completed",
        dispatcherTelegram,
        service: item?.service,
        subService: item?.subService,
        progress: item?.percentageProgress,
        //===========================
      };
      //
    }
    if (service === "sell" && subService === "sellCard") {
      userData = {
        id: item?._id,
        status: benderyStatus,
        //  status: "Completed",
        service: item?.service,
        subService: item?.subService,
        progress: item?.percentageProgress,
        //===========================
      };
      //
    }
    dispatch(updateTransactionById(userData));

    setTimeout(() => {
      setRefetchTxData(true);
      reFetchAdminData();
      // window.location.reload();
    }, 2000); // after 2 sec
  };

  async function reFetchAdminData() {
    await getAdminExchange();
    await getAdminDefi();
    await getAdminBuyCash();
    await getAdminBuyCard();
    await getAdminSellCash();
    await getAdminSellCard();
  }

  return (
    <div
      className={`flex justify-center rounded-lg shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[320px] xs:w-[340px] md:w-[500px] p-4 ${
        mode === true
          ? "bg-white outline outline-lightslategray-300 outline-[1px]"
          : "bg-bgDarker outline outline-lightslategray-300 outline-[1px]"
      }`}
    >
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-[24px]">
          <div className="flex flex-col gap-[10px]">
            <div className="flex flex-row gap-4 mt-2">
              <div
                className={`cursor-pointer hover:text-mediumspringgreen leading-[24px] inline-block text-[24px] ${
                  mode === true ? "text-darkslategray-200" : "text-gray-100"
                }`}
              >
                Update Transaction
              </div>
            </div>
            <div className="flex bg-lightslategray-300 md:w-[452px] w-[320px] xs:w-[340px] h-px" />
          </div>

          <div className="flex flex-col w-[320px] xs:w-[340px] md:w-[452px] gap-[8px]">
            <div className="flex flex-row bg-whitesmoke-100 rounded h-[62px] justify-between">
              <div className="md:w-[452px] w-[320px] xs:w-[340px]">
                <div className="ml-2 mt-2 text-xs leading-[18px] text-darkslategray-200">
                  Blendery Payment Status
                </div>
                <div className="ml-2 flex flex-row gap-[8px] items-center w-[320px] xs:w-[340px] md:w-[452px] mt-[13px]">
                  <div className="flex mr-4 mb-4 w-[320px] xs:w-[340px] md:w-[452px]">
                    <select
                      id="benderyStatus"
                      name="benderyStatus"
                      className={`[border:none] outline-none w-full text-[12px] md:text-[16px] leading-[24px] text-darkslategray-200 inline-block bg-[transparent]`}
                      value={values.benderyStatus}
                      onChange={handleChange}
                    >
                      {paymentStatus &&
                        paymentStatus.map((status, index) => (
                          <option key={index} value={status?.name}>
                            {status?.name}
                          </option>
                        ))}
                    </select>
                    <div>
                      {touched.benderyStatus && errors.benderyStatus ? (
                        <div className="mt-6 text-[#ef4444]">
                          {errors.benderyStatus}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
              <div className="cursor-pointer mr-2 flex justify-center items-center w-[18px] h-[64px] overflow-hidden">
                <MdQrCodeScanner size={15} />
              </div>
            </div>
            {service === "exchange" && subService === "exchange" && (
              <>
                <div className="flex flex-row bg-whitesmoke-100 rounded h-[62px] justify-between">
                  <div className="md:w-[452px] w-[320px] xs:w-[340px]">
                    <div className="ml-2 mt-2 text-xs leading-[18px] text-darkslategray-200">
                      Transaction Hash
                    </div>
                    <input
                      id="hash"
                      name="hash"
                      type="text"
                      className="ml-2 text-[12px] md:text-[16px] leading-[24px] text-darkslategray-200 inline-block w-[90%] outline-none bg-whitesmoke-100 placeholder-darkgray-100"
                      placeholder="5229ff374b04b0aa6..."
                      value={values.hash}
                      onChange={handleChange}
                    />
                    <div>
                      {touched.hash && errors.hash ? (
                        <div className="mt-6 text-[#ef4444]">{errors.hash}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="cursor-pointer mr-2 flex justify-center items-center w-[18px] h-[64px] overflow-hidden">
                    <MdQrCodeScanner size={15} />
                  </div>
                </div>
              </>
            )}
            {service === "defi" && subService === "defi" && null}
            {service === "buy" && subService === "buyCash" && (
              <>
                <div className="flex flex-row bg-whitesmoke-100 rounded h-[62px] justify-between">
                  <div className="md:w-[452px] w-[320px] xs:w-[340px]">
                    <div className="ml-2 mt-2 text-xs leading-[18px] text-darkslategray-200">
                      Transaction Hash
                    </div>
                    <input
                      id="hash"
                      name="hash"
                      type="text"
                      className="ml-2 text-[12px] md:text-[16px] leading-[24px] text-darkslategray-200 inline-block w-[90%] outline-none bg-whitesmoke-100 placeholder-darkgray-100"
                      placeholder="5229ff374b04b0aa6..."
                      value={values.hash}
                      onChange={handleChange}
                    />
                    <div>
                      {touched.hash && errors.hash ? (
                        <div className="mt-6 text-[#ef4444]">{errors.hash}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="cursor-pointer mr-2 flex justify-center items-center w-[18px] h-[64px] overflow-hidden">
                    <MdQrCodeScanner size={15} />
                  </div>
                </div>

                <div
                  className={`flex flex-row bg-whitesmoke-100 rounded h-[62px] justify-between ${
                    mode === true
                      ? "bg-whitesmoke-200"
                      : "hover:outline bg-hoverDark hover:bg-bgDark hover:outline-[1px] hover:outline-lightslategray-300"
                  }`}
                >
                  <div className="">
                    <div className="ml-2 mt-2 text-xs leading-[18px] text-darkslategray-200">
                      Dispatcher Telegram
                    </div>
                    <input
                      id="dispatcherTelegram"
                      name="dispatcherTelegram"
                      type="text"
                      className="ml-2 text-[12px] md:text-[16px] leading-[24px] text-darkslategray-200 inline-block w-[90%] outline-none bg-whitesmoke-100 placeholder-darkgray-100"
                      placeholder="Telegram address"
                      value={values.dispatcherTelegram}
                      onChange={handleChange}
                    />
                    <div>
                      {touched.dispatcherTelegram &&
                      errors.dispatcherTelegram ? (
                        <div className="mt-6 text-[#ef4444]">
                          {errors.dispatcherTelegram}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="cursor-pointer mr-2 flex justify-center items-center w-[18px] h-[64px] overflow-hidden">
                    <MdQrCodeScanner size={15} />
                  </div>
                </div>
              </>
            )}
            {service === "buy" && subService === "buyCard" && (
              <>
                <div className="flex flex-row bg-whitesmoke-100 rounded h-[62px] justify-between">
                  <div className="md:w-[452px] w-[320px] xs:w-[340px]">
                    <div className="ml-2 mt-2 text-xs leading-[18px] text-darkslategray-200">
                      Transaction Hash
                    </div>
                    <input
                      id="hash"
                      name="hash"
                      type="text"
                      className="ml-2 text-[12px] md:text-[16px] leading-[24px] text-darkslategray-200 inline-block w-[90%] outline-none bg-whitesmoke-100 placeholder-darkgray-100"
                      placeholder="5229ff374b04b0aa6..."
                      value={values.hash}
                      onChange={handleChange}
                    />
                    <div>
                      {touched.hash && errors.hash ? (
                        <div className="mt-6 text-[#ef4444]">{errors.hash}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="cursor-pointer mr-2 flex justify-center items-center w-[18px] h-[64px] overflow-hidden">
                    <MdQrCodeScanner size={15} />
                  </div>
                </div>
              </>
            )}
            {service === "sell" && subService === "sellCash" && (
              <>
                {" "}
                <div className="flex flex-row bg-whitesmoke-100 rounded h-[62px] justify-between">
                  <div className="">
                    <div className="ml-2 mt-2 text-xs leading-[18px] text-darkslategray-200">
                      Dispatcher Telegram
                    </div>
                    <input
                      id="dispatcherTelegram"
                      name="dispatcherTelegram"
                      type="text"
                      className="ml-2 text-[12px] md:text-[16px] leading-[24px] text-darkslategray-200 inline-block w-[90%] outline-none bg-whitesmoke-100 placeholder-darkgray-100"
                      placeholder="Telegramm address"
                      value={values.dispatcherTelegram}
                      onChange={handleChange}
                    />
                    <div>
                      {touched.hash && errors.hash ? (
                        <div className="mt-6 text-[#ef4444]">{errors.hash}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="cursor-pointer mr-2 flex justify-center items-center w-[18px] h-[64px] overflow-hidden">
                    <MdQrCodeScanner size={15} />
                  </div>
                </div>
              </>
            )}
            {service === "sell" && subService === "sellCard" && null}
          </div>
          <div
            className="mb-4 cursor-pointer flex flex-row justify-center items-center w-full bg-mediumspringgreen hover:opacity-90 text-white h-[49px] shrink-0 rounded"
            onClick={handleSubmit}
          >
            Update
          </div>
        </div>
      </form>
    </div>
  );
};
//setTxInfo={setTxInfo}
export const CardUpdateInfo = (props) => {
  const {
    mode,
    item,
    setIsUpdate,
    setIsView,
    setIsTx,
    isUpdate,
    isView,
    setRefetchTxData,
  } = props;

  //===================={new}==========================

  return (
    <div className={`flex flex-col justify-center items-center gap-[24px]`}>
      {isView && (
        <>
          <CashInfo
            item={item}
            mode={mode}
            setIsUpdate={setIsUpdate}
            setIsView={setIsView}
            setIsTx={setIsTx}
          />
        </>
      )}
      {isUpdate && (
        <>
          <CashInfo
            item={item}
            mode={mode}
            setIsUpdate={setIsUpdate}
            setIsView={setIsView}
            setIsTx={setIsTx}
          />
          <CashUpdate
            item={item}
            mode={mode}
            setIsUpdate={setIsUpdate}
            setIsView={setIsView}
            setIsTx={setIsTx}
            setRefetchTxData={setRefetchTxData}
          />
        </>
      )}
    </div>
  );
};
