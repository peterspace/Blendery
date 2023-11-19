import React, { useState } from 'react';
import { RxCopy } from 'react-icons/rx';
import { RiFileWarningFill } from 'react-icons/ri';
import stylesFromToken from './FromTokenList.module.css';
import stylesSwap from './styles/Swap.module.css';

export const TokenCardFiat = (props) => {
  const {
    setIsTokenPage,
    setFilteredTokens,
    filteredTokens,
    setToken,
    setIsTokenChange,
    allTokens,
  } = props;
  const checkout = (
    <div className={`${stylesSwap.frameGroupCustom}`}>
      <div className={stylesFromToken.selectATokenParent}>
        <div className={stylesFromToken.selectAToken}>Select a token</div>
        <div className="transition-transform duration-300 hover:scale-125 cursor-pointer flex flex-row justify-center items-center p-1 rounded-lg bg-gray-300 hover:bg-gray-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#130D1A"
            className="w-5 h-5"
            onClick={() => setIsTokenPage(false)}
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      <div className={stylesFromToken.frameChild} />
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <img
            className={stylesFromToken.xCloseIcon}
            alt=""
            src="/searchmd.svg"
          />
        </div>
        <input
          type="search"
          id="search"
          className="[border:none] block p-4 pl-10 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-surface-tint-d-8 w-[432px] text-secondaryFillDim"
          placeholder="Search by name or paste address"
          onChange={(e) => {
            if (e.target.value === '') {
              setFilteredTokens(allTokens);
              return;
            }
            let ffToken = allTokens.filter(({ symbol }) => {
              return symbol
                .toLowerCase()
                .includes(e.target.value.toLowerCase());
            });
            if (ffToken !== null) {
              setFilteredTokens(ffToken);
            }
          }}
        />
      </div>

      <div
        className={`grid grid-cols-4 ${stylesFromToken.customIconGroupDiv}`}
      ></div>
      <div className={stylesFromToken.frameChild} />
      <div
        className={`overflow-y-auto max-h-[320px] ${stylesFromToken.frameParent1}`}
      >
        <div className={stylesFromToken.frameParent2}>
          {filteredTokens?.map((token, idx) => (
            <div
              key={idx}
              className={`cursor-pointer hover:shadow-md hover:bg-secondaryFill ${stylesFromToken.mdImageGroup}`}
            >
              <img
                className={stylesFromToken.protocolIcon4}
                alt=""
                src={token?.logoURI}
                onClick={() => {
                  setToken(token);
                  setIsTokenChange(true);
                  setIsTokenPage(false);
                }}
              />
              <div
                className={stylesFromToken.ethereumParent}
                onClick={() => {
                  setToken(token);
                  setIsTokenChange(true);
                  setIsTokenPage(false);
                }}
              >
                <div className={stylesFromToken.tetherUsd}>{token?.name}</div>

                <div className={stylesFromToken.eth1}>{token?.symbol}</div>
              </div>
              <span className="justify-start items-start mr-4">
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#9D9DA3"
                    className={`w-5 h-5 hover:stroke-infoText active:fill-infoText stroke-secondaryText`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                  </svg>
                </>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  return <>{checkout}</>;
};
