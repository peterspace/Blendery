import React, { useState, useEffect } from 'react';
import { Progress } from '../../../components/Progress';
import { Checkout } from '../../../components/Checkout';
import { CheckoutDefi } from '../../../components/CheckoutDefi';
import { Signup } from '../../../components/Signup';
import { Confirm } from '../../../components/Confirm';
import { ConfirmSwap } from '../../../components/ConfirmSwap';
import {
  createTransaction,
  getTransactionByTxId,
  getTransactionByTxIdInternal,
} from '../../../redux/features/transaction/transactionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';
import stylesSlippage from '../../../components/Slippage.module.css';

export const DefiScreen4 = (props) => {
  const {
    percentageProgress,
    setPercentageProgress,
    isConnected,
    setIsSwapSuccess,
    isSwapSuccess,
    isSwapError,
    isApproveSuccess,
    isApproveError,
    setIsSwapError,
    setIsApproveSuccess,
    setIsApproveError,
  } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  /*********************************************     REDUX STATES    **************************************************** */
  /********************************************************************************************************************** */
  /********************************************************************************************************************** */

  const { user } = useSelector((state) => state.user);

  return (
    <div className="flex flex-col xl:flex-row justify-center">
      <div className="flex flex-col xl:flex-row gap-[32px] mt-[8px]">
        <div className="flex-col xl:flex-row h-[500px]">
          <Progress percentageProgress={percentageProgress} />
        </div>
        <>
          <div className="flex flex-col justify-start items-start xl:justify-center xl:items-center mt-6 xl:mt-0 gap-4">
            <div className="flex justify-center rounded-lg bg-white shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[320px] xs:w-[340px] md:w-[500px] p-4">
              <div className="flex flex-col gap-[24px]">
                <div className="flex flex-col gap-[10px]">
                  <div className="flex flex-row justify-between mt-[24px]">
                    <div
                      className={`cursor-pointer hover:text-bgPrimary leading-[24px] inline-block text-darkslategray-200 text-[24px]`}
                    >
                      Status
                    </div>
                    <div
                      className="cursor-pointer flex flex-row justify-center items-center bg-bgSecondary hover:opacity-90 text-bgPrimary shrink-0 rounded px-6 py-3"
                      onClick={() => {
                        setPercentageProgress(2);
                      }}
                    >
                      Back
                    </div>
                  </div>
                  <div className="flex bg-lightslategray-300 md:w-[452px] w-[300px] h-px" />
                </div>

                {/* Transaction sucessfull */}
                {isConnected === true &&
                isSwapSuccess === true &&
                isSwapError === false &&
                isApproveSuccess === false &&
                isApproveError === false ? (
                  <>
                    <div className={stylesSlippage.frameContainer}>
                      <div className={stylesSlippage.iconButtonParent}>
                        <div
                          className={stylesSlippage.iconButton}
                          onClick={() => {
                            setIsSwapSuccess(false);
                          }}
                        >
                          <img
                            className={stylesSlippage.chevronLeftIcon}
                            alt=""
                            src="/chevronleft.svg"
                          />
                        </div>
                        <div className={stylesSlippage.swapSettings}>
                          Transaction Status
                        </div>
                        <div className={stylesSlippage.iconButton1}>
                          <img
                            className={stylesSlippage.chevronLeftIcon}
                            alt=""
                          />
                        </div>
                      </div>
                      <div className={stylesSlippage.frameChild} />
                      <div className={stylesSlippage.iconButtonParent}>
                        <div className="flex justify-center items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-8 h-8"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.5 12.75l6 6 9-13.5"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className={stylesSlippage.iconButtonParent}>
                        <div className="flex justify-center items-center">
                          Sucessful
                        </div>
                      </div>
                      <div className={stylesSlippage.iconButtonParent}>
                        <div
                          className="cursor-pointer flex flex-row justify-center items-center w-[393px] h-[24px] px-[40px] py-[12px] rounded-xl bg-[#8D3DFF] text-white text-normal"
                          onClick={() => {
                            setIsSwapSuccess(false);
                          }}
                        >
                          Close
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}

                {/* Transaction unsucessfull */}
                {isConnected === true &&
                isSwapSuccess === false &&
                isSwapError === true &&
                isApproveSuccess === false &&
                isApproveError === false ? (
                  <>
                    <div className={stylesSlippage.frameContainer}>
                      <div className={stylesSlippage.iconButtonParent}>
                        <div
                          className={stylesSlippage.iconButton}
                          onClick={() => {
                            setIsSwapError(false);
                          }}
                        >
                          <img
                            className={stylesSlippage.chevronLeftIcon}
                            alt=""
                            src="/chevronleft.svg"
                          />
                        </div>
                        <div className={stylesSlippage.swapSettings}>
                          Transaction Status
                        </div>
                        <div className={stylesSlippage.iconButton1}>
                          <img
                            className={stylesSlippage.chevronLeftIcon}
                            alt=""
                          />
                        </div>
                      </div>
                      <div className={stylesSlippage.frameChild} />
                      <div className={stylesSlippage.iconButtonParent}>
                        <div className="flex justify-center items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-8 h-8"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className={stylesSlippage.iconButtonParent}>
                        <div className="flex justify-center items-center">
                          Unsucessful
                        </div>
                      </div>
                      <div className={stylesSlippage.iconButtonParent}>
                        <div
                          className="cursor-pointer flex flex-row justify-center items-center w-[393px] h-[24px] px-[40px] py-[12px] rounded-xl bg-[#8D3DFF] text-white text-normal"
                          onClick={() => {
                            setIsSwapError(false);
                          }}
                        >
                          Close
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}

                {/* Approval sucessfull */}
                {isConnected === true &&
                isSwapSuccess === false &&
                isSwapError === false &&
                isApproveSuccess === true &&
                isApproveError === false ? (
                  <>
                    <div className={stylesSlippage.frameContainer}>
                      <div className={stylesSlippage.iconButtonParent}>
                        <div
                          className={stylesSlippage.iconButton}
                          onClick={() => {
                            setIsApproveSuccess(false);
                          }}
                        >
                          <img
                            className={stylesSlippage.chevronLeftIcon}
                            alt=""
                            src="/chevronleft.svg"
                          />
                        </div>
                        <div className={stylesSlippage.swapSettings}>
                          Approval Status
                        </div>
                        <div className={stylesSlippage.iconButton1}>
                          <img
                            className={stylesSlippage.chevronLeftIcon}
                            alt=""
                          />
                        </div>
                      </div>
                      <div className={stylesSlippage.frameChild} />
                      <div className={stylesSlippage.iconButtonParent}>
                        <div className="flex justify-center items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-12 h-12"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className={stylesSlippage.iconButtonParent}>
                        <div className="flex justify-center items-center">
                          Granted
                        </div>
                      </div>
                      <div className={stylesSlippage.iconButtonParent}>
                        <div
                          className="cursor-pointer flex flex-row justify-center items-center w-[393px] h-[24px] px-[40px] py-[12px] rounded-xl bg-[#8D3DFF] text-white text-normal"
                          onClick={() => {
                            setIsApproveSuccess(false);
                          }}
                        >
                          Close
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}

                {/* Approval unsucessfull */}
                {isConnected === true &&
                isSwapSuccess === false &&
                isSwapError === false &&
                isApproveSuccess === false &&
                isApproveError === true ? (
                  <>
                    <div className={stylesSlippage.frameContainer}>
                      <div className={stylesSlippage.iconButtonParent}>
                        <div
                          className={stylesSlippage.iconButton}
                          onClick={() => {
                            setIsApproveError(false);
                          }}
                        >
                          <img
                            className={stylesSlippage.chevronLeftIcon}
                            alt=""
                            src="/chevronleft.svg"
                          />
                        </div>
                        <div className={stylesSlippage.swapSettings}>
                          Approval Status
                        </div>
                        <div className={stylesSlippage.iconButton1}>
                          <img
                            className={stylesSlippage.chevronLeftIcon}
                            alt=""
                          />
                        </div>
                      </div>
                      <div className={stylesSlippage.frameChild} />
                      <div className={stylesSlippage.iconButtonParent}>
                        <div className="flex justify-center items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-12 h-12"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className={stylesSlippage.iconButtonParent}>
                        <div className="flex justify-center items-center">
                          Denied
                        </div>
                      </div>
                      <div className={stylesSlippage.iconButtonParent}>
                        <div
                          className="cursor-pointer flex flex-row justify-center items-center w-[393px] h-[24px] px-[40px] py-[12px] rounded-xl bg-[#8D3DFF] text-white text-normal"
                          onClick={() => {
                            setIsApproveError(false);
                          }}
                        >
                          Close
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};
