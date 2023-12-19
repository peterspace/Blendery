import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateConnecting } from '../redux/features/swap/swapSlice';


import { useConnect } from 'wagmi';

export const TokenCardContainer = (props) => {
  const { token, setToken, setIsTokenPage, mode, service } = props;
  return (
    <div
      className={`flex flex-col rounded-lg shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[300px] px-4 m-1 ${
        mode === true
          ? 'py-2 rounded-lg hover:bg-gray-100 outline outline-lightslategray-300 outline-[1px]'
          : 'hover:bg-hoverDark hover:outline hover:outline-lightslategray-300 hover:outline-[1px]'
      }`}
      onClick={() => {
        setToken(token);
        setIsTokenPage(false);
      }}
    >
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
  );
};

export const ConnectWalletCard = (props) => {
  const { setIsTokenPage } = props;

  const { connect, connectors } = useConnect();

  const [activeConnection, setActiveConnection] = useState(
    connectors && connectors[0]
  );

  console.log({ activeConnection: activeConnection });

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
            {'Connect Wallet'}
          </div>
          <div
            className="transition-transform duration-300 hover:scale-125 cursor-pointer flex flex-row justify-center items-center p-2"
            onClick={() => {
              setIsTokenPage(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#130D1A"
              className="w-5 h-5"
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

      {/* ==================================={Search box}======================================================================== */}

      <div className="mt-2 flex flex-col gap-[16px] overflow-scroll h-[25vh]">
        <div
          className={`flex flex-col rounded-lg shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[300px] px-4 m-1 ${
            mode === true
              ? 'py-2 rounded-lg hover:bg-gray-100 outline outline-lightslategray-300 outline-[1px]'
              : 'hover:bg-hoverDark hover:outline hover:outline-lightslategray-300 hover:outline-[1px]'
          }`}
        >
          <div className="cursor-pointer flex flex-row justify-between items-center w-[300px]">
            <div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
              <div
                className="self-stretch rounded-2xl overflow-hidden flex flex-row py-2 px-4 items-center justify-start gap-[16px] cursor-pointer hover:bg-secondaryFill"
                // onClick={() => open()}
                onClick={() => {
                  connect({ connector: connectors[0] });
                  setActiveConnection(connectors[0]);
                }}
              >
                <img
                  className="relative w-10 h-10 shrink-0 overflow-hidden"
                  alt=""
                  src="/wallet-icon8.svg"
                />
                <div className="flex-1 relative tracking-[0.02em] leading-[22px] font-medium">
                  MetaMask
                </div>
                {activeConnection?.name === connectors[0]?.name ? (
                  <div className="rounded-9xl bg-surface-success-d flex flex-row py-1 pr-3 pl-2 items-center justify-start gap-[8px] text-sm text-text-success-d">
                    <img
                      className="relative w-2 h-2 shrink-0"
                      alt=""
                      src="/ellipse-1.svg"
                    />
                    <div className="relative tracking-[0.02em] leading-[20px] font-medium">
                      Connected
                    </div>
                  </div>
                ) : (
                  <img
                    className="relative w-5 h-5 shrink-0 overflow-hidden"
                    alt=""
                    src="/chevronright1.svg"
                  />
                )}
              </div>
              <div
                className="self-stretch rounded-2xl overflow-hidden flex flex-row py-2 px-4 items-center justify-start gap-[16px] cursor-pointer hover:bg-secondaryFill"
                onClick={() => {
                  connect({ connector: connectors[3] });
                  setActiveConnection(connectors[3]);
                }}
              >
                <img
                  className="relative w-10 h-10 shrink-0 overflow-hidden"
                  alt=""
                  src="/walletlink.svg"
                />
                <div className="flex-1 relative tracking-[0.02em] leading-[22px] font-medium">
                  Coinbase Wallet
                </div>
                {activeConnection?.name === connectors[3]?.name ? (
                  <div className="rounded-9xl bg-surface-success-d flex flex-row py-1 pr-3 pl-2 items-center justify-start gap-[8px] text-sm text-text-success-d">
                    <img
                      className="relative w-2 h-2 shrink-0"
                      alt=""
                      src="/ellipse-1.svg"
                    />
                    <div className="relative tracking-[0.02em] leading-[20px] font-medium">
                      Connected
                    </div>
                  </div>
                ) : (
                  <img
                    className="relative w-5 h-5 shrink-0 overflow-hidden"
                    alt=""
                    src="/chevronright1.svg"
                  />
                )}
              </div>
              <div
                className="self-stretch rounded-2xl overflow-hidden flex flex-row py-2 px-4 items-center justify-start gap-[16px] cursor-pointer hover:bg-secondaryFill"
                onClick={() => {
                  connect({ connector: connectors[2] });
                  setActiveConnection(connectors[2]);
                }}
              >
                <img
                  className="relative w-10 h-10 shrink-0 overflow-hidden"
                  alt=""
                  src="/walletconnect.svg"
                />
                <div className="flex-1 relative tracking-[0.02em] leading-[22px] font-medium">
                  Wallet Connect
                </div>
                {activeConnection?.name === connectors[2]?.name ? (
                  <div className="rounded-9xl bg-surface-success-d flex flex-row py-1 pr-3 pl-2 items-center justify-start gap-[8px] text-sm text-text-success-d">
                    <img
                      className="relative w-2 h-2 shrink-0"
                      alt=""
                      src="/ellipse-1.svg"
                    />
                    <div className="relative tracking-[0.02em] leading-[20px] font-medium">
                      Connected
                    </div>
                  </div>
                ) : (
                  <img
                    className="relative w-5 h-5 shrink-0 overflow-hidden"
                    alt=""
                    src="/chevronright1.svg"
                  />
                )}
              </div>
              <div
                className="self-stretch rounded-2xl overflow-hidden flex flex-row py-2 px-4 items-center justify-start gap-[16px] cursor-pointer hover:bg-secondaryFill"
                // onClick={() => open()}
                onClick={() => {
                  connect({ connector: connectors[4] });
                  setActiveConnection(connectors[4]);
                }}
              >
                <img
                  className="relative rounded-xl w-10 h-10 shrink-0"
                  alt=""
                  src="/frame-1321314394.svg"
                />
                <div className="flex-1 relative tracking-[0.02em] leading-[22px] font-medium">
                  Ledger
                </div>
                {activeConnection?.name === connectors[4]?.name ? (
                  <div className="rounded-9xl bg-surface-success-d flex flex-row py-1 pr-3 pl-2 items-center justify-start gap-[8px] text-sm text-text-success-d">
                    <img
                      className="relative w-2 h-2 shrink-0"
                      alt=""
                      src="/ellipse-1.svg"
                    />
                    <div className="relative tracking-[0.02em] leading-[20px] font-medium">
                      Connected
                    </div>
                  </div>
                ) : (
                  <img
                    className="relative w-5 h-5 shrink-0 overflow-hidden"
                    alt=""
                    src="/chevronright1.svg"
                  />
                )}
              </div>
              <div
                className="self-stretch rounded-2xl overflow-hidden flex flex-row py-2 px-4 items-center justify-start gap-[16px] cursor-pointer hover:bg-secondaryFill"
                // onClick={() => open()}
                onClick={() => {
                  connect({ connector: connectors[3] });
                  setActiveConnection(connectors[3]);
                }}
              >
                <img
                  className="relative w-[34.29px] h-10 shrink-0"
                  alt=""
                  src="/bravelogosanstext-21.svg"
                />
                <div className="flex-1 relative tracking-[0.02em] leading-[22px] font-medium">
                  Brave
                </div>
                {activeConnection?.name === connectors[3]?.name ? (
                  <div className="rounded-9xl bg-surface-success-d flex flex-row py-1 pr-3 pl-2 items-center justify-start gap-[8px] text-sm text-text-success-d">
                    <img
                      className="relative w-2 h-2 shrink-0"
                      alt=""
                      src="/ellipse-1.svg"
                    />
                    <div className="relative tracking-[0.02em] leading-[20px] font-medium">
                      Connected
                    </div>
                  </div>
                ) : (
                  <img
                    className="relative w-5 h-5 shrink-0 overflow-hidden"
                    alt=""
                    src="/chevronright1.svg"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="self-stretch rounded-xl bg-white flex flex-row p-4 items-center justify-start gap-[16px] text-surface-tint-64-d">
            <input
              className="cursor-pointer rounded-md [background:radial-gradient(50%_50%_at_50%_50%,_#5a38a3,_#683fab_31.77%,_#9d52ff_68.23%,_#edbcfc_96.35%)] w-5 h-5 shrink-0 overflow-hidden flex flex-row p-1 box-border items-center justify-center"
              // className="cursor-pointer rounded-md [background:radial-gradient(59.21% 78.44% at 50% 50%, #5A38A3 0%, #683FAB 31.77%, #9D52FF 68.23%, #EDBCFC 96.35%)] w-5 h-5 shrink-0 overflow-hidden flex flex-row p-1 box-border items-center justify-center"
              type="checkbox"
              required
              autoFocus
              defaultChecked={true}
            />
            <div className="flex-1 relative tracking-[0.02em] leading-[22px] font-medium">
              <p className="m-0">I have read, understand, and agree to the</p>
              <p className="m-0 text-mediumslateblue">Terms of Service</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  return <>{checkout}</>;

  // return (
  //   <>
  //     <div className="flex justify-center rounded-lg bg-white shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[320px] xs:w-[340px] md:w-[500px] p-4">
  //       {checkout}
  //     </div>
  //   </>
  // );
};
