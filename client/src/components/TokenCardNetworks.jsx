import React, { useEffect, useState } from 'react';
import { RxCopy } from 'react-icons/rx';
import { AiOutlineSearch } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import axios from 'axios';

import {
  useConnect,
  useAccount,
  useSwitchNetwork,
  useSigner,
  useBalance,
} from 'wagmi';

import {
  updateIsChangeChainId,
  updateConnectedNetwork,
  updateChain,
} from '../redux/features/swap/swapSlice';
import { getTokensDefiById } from '../redux/features/token/tokenSlice';
import { getTokensDefiByIdService } from '../services/apiService';
export const TokenCardContainer = (props) => {
  const { token, setToken, setIsTokenPage, mode, service } = props;
  const dispatch = useDispatch();

  return (
    <>
      <div
        className={`flex flex-col rounded-lg shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[300px] px-4 m-1 ${
          mode === true
            ? 'py-2 rounded-lg hover:bg-gray-100 outline outline-lightslategray-300 outline-[1px]'
            : 'hover:bg-hoverDark hover:outline hover:outline-lightslategray-300 hover:outline-[1px]'
        }`}
        onClick={() => setToken(token)}
      >
        {/* <div className="flex flex-row justify-between w-[280px]"> */}
        <div className="cursor-pointer flex flex-row justify-between items-center w-[300px]">
          <div className="flex flex-row items-center gap-2">
            <div className="flex justify-center items-center flex-shrink-0">
              <img
                className="w-[25px] h-$ shrink-0 overflow-hidden rounded-full"
                src={token?.image}
                alt={token.symbol}
              />
            </div>
            <div className="flex flex-row gap-1">
              <div
                className={`text-base font-sans font-medium leading-[24px] inline-block ${
                  mode === true ? 'text-black' : 'text-gray-100'
                }`}
              >
                {token.name}
              </div>
              <div
                className={`text-xs font-sans font-medium leading-[24px] inline-block ${
                  mode === true ? 'text-black' : 'text-gray-100'
                }`}
              >
                ({token.symbol.toUpperCase()})
              </div>
            </div>
          </div>
          {token?.chain && service !== 'defi' ? (
            <>
              <div
                className={`flex flex-col rounded p-1 ${
                  token?.chain === 'Ethereum' && 'bg-rose-600'
                }

          ${token?.chain === 'Tron' && 'bg-blue-600'}

          ${token?.chain === 'Bitcoin' && 'bg-indigo-600'}

          ${token?.chain === 'Binance' && 'bg-yellow-600'}
          
          `}
              >
                <span className="font-bold text-[14px] text-gray-100 inline-block">
                  {token?.chain}
                </span>
              </div>
            </>
          ) : null}
        </div>
        {mode === true ? null : (
          <div className="mt-2 flex bg-lightslategray-300 w-full h-px" />
        )}
      </div>
    </>
  );
};

export const TokenCardNetworks = (props) => {
  const { setIsTokenPage, setToken, allTokens, service } = props;
  const dispatch = useDispatch();
  const { isConnected } = useAccount();
  console.log({ isConnected: isConnected });

  // const mode = true; // keep in light mode
  const mode = true; // keep in light mode
  const checkout = (
    <div
      className={`flex flex-col gap-[16px] rounded-lg p-2 outline outline-lightslategray-300 outline-[1px] ${
        mode === true && 'bg-white'
      }`}
    >
      <div className="flex flex-col gap-[8px]">
        <div className="flex flex-row justify-between mt-[24px]">
          <div
            className={`mt-[24px] p-2 text-lg font-sans font-bold inline-block ${
              mode === true ? 'text-bgPrimary' : 'text-white'
            }`}
          >
            {'Select a network'}
          </div>
          <div className="transition-transform duration-300 hover:scale-125 cursor-pointer flex flex-row justify-center items-center p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#130D1A"
              className="w-5 h-5"
              onClick={() => {
                setIsTokenPage(false);
                dispatch(updateConnectedNetwork(false));
                localStorage.setItem('chainSwitch', JSON.stringify(false));
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
        <div className="flex bg-lightslategray-300 h-px" />
      </div>

      <div className="mt-2 flex flex-col gap-[16px] overflow-scroll h-[25vh]">
        {allTokens?.map((token, idx) => (
          <TokenCardContainer
            key={idx}
            token={token}
            setToken={setToken}
            setIsTokenPage={setIsTokenPage}
            mode={mode}
            service={service}
            // isConnected={isConnected}
          />
        ))}
      </div>
    </div>
  );
  // return <>{checkout}</>;

  return (
    <>
      {/* <div className="flex justify-center rounded-lg bg-white shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[320px] xs:w-[340px] md:w-[500px] p-4">
        {checkout}
      </div> */}
      {checkout}
    </>
  );
};
