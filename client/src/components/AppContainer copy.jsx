import React, { useState, useEffect } from 'react';

import { Navigate } from 'react-router-dom';
import { CardExchange } from './CardExchange';
import { CardBuy } from './CardBuy';
import { CardSell } from './CardSell';
import { CardDefi } from './CardDefi';
import { CardBankCard } from './CardBankCard';
import styles from './AppContainer.module.css';
import { Login } from './Login';
import { Register } from './Register';
import Modal from './Modal';
import { Header } from './Header';
import { Footer } from './Footer';

import {
  stepsExchange,
  stepsBuy,
  stepsSell,
  stepsDefi,
  helpExchange,
  helpBuy,
  helpSell,
  helpDefi,
} from '../constants';
import { HowToCard } from './HowToCard';
import { FaqCard } from './FaqCard';
import { faqExchange, faqBuy, faqSell, faqDefi } from '../constants';
import { FeedBack } from './Feedback';
import { feedback } from '../constants';

import { HelpGuide } from './HelpGuide';
import { useDispatch, useSelector } from 'react-redux';

import {
  getTokenList,
  getTokenListDefi,
  getTokenListFiat,
  getTokenListBuy,
  getTokenListSell,
  getTokenListExchange,
  getTokensDefiById,

} from '../redux/features/token/tokenSlice';

import {
  getUserTransactions,
  getTransactionByTxId,
  getUserExchange,
  getUserDefi,
  getUserBuyCash,
  getUserBuyCard,
  getUserSellCash,
  getUserSellCard,
} from '../redux/features/transaction/transactionSlice';

import { networksOptions } from '../constants';

export const AppContainer = (props) => {
  const {
    mode,
    user,
    service,
    setService,
    subService,
    setSubService,
    setTxInfo,
    txInfo,
  } = props;

  const dispatch = useDispatch();
  const tokensDefiEthereum = useSelector(
    (state) => state.token?.tokensDefiEthereum
  );

  const allExchangeTransactions = useSelector(
    (state) => state.transaction?.allExchangeTransactions
  );
  // console.log({ allExchangeTransactions: allExchangeTransactions });

  const transactionByTxId = useSelector(
    (state) => state.transaction?.transactionByTxId
  );
  // console.log({ transactionByTxId: transactionByTxId });
  const isExchangeL = localStorage.getItem('isExchange')
    ? JSON.parse(localStorage.getItem('isExchange'))
    : true;
  const isBuyL = localStorage.getItem('isBuy')
    ? JSON.parse(localStorage.getItem('isBuy'))
    : false;
  const isSellL = localStorage.getItem('isSell')
    ? JSON.parse(localStorage.getItem('isSell'))
    : false;
  const isDefiL = localStorage.getItem('isDefi')
    ? JSON.parse(localStorage.getItem('isDefi'))
    : false;

  const [isExchange, setIsExchange] = useState(isExchangeL);
  // const [isExchange, setIsExchange] = useState(false);
  const [isBuy, setIsBuy] = useState(isBuyL);
  const [isSell, setIsSell] = useState(isSellL);
  const [isDefi, setIsDefi] = useState(isDefiL);
  // const [isDefi, setIsDefi] = useState(true);

  const [isCard, setIsCard] = useState(false);
  // const [isLightMode, setIsLightMode] = useState(false);
  const [isLightMode, setIsLightMode] = useState(true);

  const blockchainNetworkL = localStorage.getItem('blockchainNetworkE')
    ? JSON.parse(localStorage.getItem('blockchainNetworkE'))
    : networksOptions[0];
  const [blockchainNetwork, setBlockchainNetwork] =
    useState(blockchainNetworkL);
  const chainId = blockchainNetwork?.chainId;

  //====={Controllers}===========================
  const [isApp, setIsApp] = useState(false);

  // useEffect(() => {
  //   dispatch(getTokensDefiById(chainId));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    dispatch(getTokensDefiById(chainId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId]);

  //==============={update lists at intervals}===============================

  useEffect(() => {
    dispatch(getTokenListDefi());
    dispatch(getTokenListFiat());
    dispatch(getTokenListBuy());
    dispatch(getTokenListSell());
    dispatch(getTokenListExchange());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     dispatch(getTokenListDefi());
  //     dispatch(getTokenListFiat());
  //     dispatch(getTokenListBuy());
  //     dispatch(getTokenListSell());
  //     dispatch(getTokenListExchange());
  //     if (chainId) {
  //       dispatch(getTokensDefiById(chainId));
  //     }
  //   }, 120000); // every 2 minute
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    localStorage.setItem('service', JSON.stringify(service));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service]);

  useEffect(() => {
    localStorage.setItem('subService', JSON.stringify(subService));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subService]);

  useEffect(() => {
    localStorage.setItem(
      'blockchainNetworkE',
      JSON.stringify(blockchainNetwork)
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockchainNetwork]);

  // useEffect(() => {
  //   localStorage.setItem('isExchange', JSON.stringify(isExchange));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isExchange]);

  useEffect(() => {
    localStorage.setItem('isExchange', JSON.stringify(isExchange));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExchange]);
  useEffect(() => {
    localStorage.setItem('isBuy', JSON.stringify(isBuy));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBuy]);
  useEffect(() => {
    localStorage.setItem('isSell', JSON.stringify(isSell));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSell]);
  useEffect(() => {
    localStorage.setItem('isDefi', JSON.stringify(isDefi));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDefi]);

  useEffect(() => {
    if (user) {
      dispatch(getUserTransactions());
      dispatch(getUserExchange());
      dispatch(getUserDefi());
      dispatch(getUserBuyCash());
      dispatch(getUserBuyCard());
      dispatch(getUserSellCash());
      dispatch(getUserSellCard());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // useEffect(() => {
  //   if (user && txId) {
  //     dispatch(getTransactionByTxId(txId));
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [user]);

  // useEffect(() => {
  //   // const txId = '65397009bd59e0497100751a';
  //   if (user && txId) {
  //     dispatch(getTransactionByTxId(txId));
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [user]);

  async function nextFuncExchange() {
    setService('exchange');
    setSubService('exchange');
  }

  async function nextFuncSellCash() {
    setService('sell');
    setSubService('sellCash');
  }

  async function nextFuncSellCard() {
    setService('sell');
    setSubService('sellCash');
  }

  async function nextFuncBuyCard() {
    setService('buy');
    setSubService('buyCard');
  }

  async function nextFuncBuyCash() {
    setService('exchange');
    setSubService('exchange');
  }

  async function nextFuncDefi() {
    setService('defi');
    setSubService('defi');
  }

  // useEffect(()=>{
  //   if(isBuy){
  //     setService('buy');
  //     setSubService('buyCard');
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // },[isBuy])

  // useEffect(() => {
  //   const fetchPrices = async () => {
  //     dispatch(getTokenList());
  //   };
  //   // Fetch prices immediately and then every 5 minutes
  //   fetchPrices();
  //   const priceInterval = setInterval(fetchPrices, 3000);
  //   // Clear the interval on unmount
  //   return () => clearInterval(priceInterval);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    // <>
    //   {txInfo ? null : (

    //   )}
    // </>
    <>
      <div className="relative bg-white w-full h-screen overflow-auto text-left text-sm text-gray-400 font-montserrat">
        <div
          className={`${styles.hero} flex flex-col justify-center items-center`}
        >
          <div
            className={`mt-[64px] mb-[64px] flex justify-center rounded-lg bg-white shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[375px] md:w-[500px] p-4`}
          >
            <div className="flex flex-col gap-[10px]">
              <div className="flex flex-row gap-4 mt-2">
                <div
                  className={`cursor-pointer hover:text-mediumspringgreen leading-[24px] ${
                    service === 'exchange' && subService === 'exchange'
                      ? 'text-mediumspringgreen text-base font-black inline-block underline underline-offset-[16px]'
                      : 'text-darkgray-200 text-mini'
                  }`}
                  onClick={nextFuncExchange}
                >
                  Exchange
                </div>
                <div
                  className={`cursor-pointer hover:text-mediumspringgreen leading-[24px] inline-block ${
                    service === 'buy' && subService === 'buyCash'
                      ? 'text-mediumspringgreen text-base font-black inline-block underline underline-offset-[16px]'
                      : 'text-darkgray-200 text-mini'
                  } ${
                    service === 'buy' && subService === 'buyCard'
                      ? 'text-mediumspringgreen text-base font-black inline-block underline underline-offset-[16px]'
                      : 'text-darkgray-200 text-mini'
                  }`}
                  onClick={nextFuncBuyCard}
                >
                  Buy
                </div>
                <div
                  className={`cursor-pointer hover:text-mediumspringgreen leading-[24px] inline-block ${
                    service === 'sell' && subService === 'sellCash'
                      ? 'text-mediumspringgreen text-base font-black inline-block underline underline-offset-[16px]'
                      : 'text-darkgray-200 text-mini'
                  } ${
                    service === 'sell' && subService === 'sellCard'
                      ? 'text-mediumspringgreen text-base font-black inline-block underline underline-offset-[16px]'
                      : 'text-darkgray-200 text-mini'
                  }`}
                  onClick={nextFuncSellCard}
                >
                  Sell
                </div>

                <div
                  className={`cursor-pointer hover:text-mediumspringgreen leading-[24px] inline-block ${
                    service === 'defi' && subService === 'defi'
                      ? 'text-mediumspringgreen text-base font-black inline-block underline underline-offset-[16px]'
                      : 'text-darkgray-200 text-mini'
                  }`}
                  onClick={nextFuncDefi}
                >
                  DeFi
                </div>
              </div>
              <div className="flex bg-lightslategray-300 w-full h-px" />
              <>
                {service === 'exchange' && subService === 'exchange' && (
                  <CardExchange
                    mode={mode}
                    setIsApp={setIsApp}
                    service={service}
                    setService={setService}
                    subService={subService}
                    setSubService={setSubService}
                    setTxInfo={setTxInfo}
                  />
                )}
                {service === 'buy' && subService === 'buyCash' && (
                  <CardBuy
                    mode={mode}
                    setIsApp={setIsApp}
                    service={service}
                    setService={setService}
                    subService={subService}
                    setSubService={setSubService}
                    setTxInfo={setTxInfo}
                  />
                )}
                {service === 'buy' && subService === 'buyCard' && (
                  <CardBuy
                    mode={mode}
                    setIsApp={setIsApp}
                    service={service}
                    setService={setService}
                    subService={subService}
                    setSubService={setSubService}
                    setTxInfo={setTxInfo}
                  />
                )}

                {service === 'sell' && subService === 'sellCash' && (
                  <CardSell
                    mode={mode}
                    setIsApp={setIsApp}
                    service={service}
                    setService={setService}
                    subService={subService}
                    setSubService={setSubService}
                    setTxInfo={setTxInfo}
                  />
                )}

                {service === 'sell' && subService === 'sellCard' && (
                  <CardSell
                    mode={mode}
                    setIsApp={setIsApp}
                    service={service}
                    setService={setService}
                    subService={subService}
                    setSubService={setSubService}
                    setTxInfo={setTxInfo}
                  />
                )}

                {service === 'defi' && subService === 'defi' && (
                  <CardDefi
                    mode={mode}
                    setIsApp={setIsApp}
                    service={service}
                    setService={setService}
                    subService={subService}
                    setSubService={setSubService}
                    blockchainNetwork={blockchainNetwork}
                    setBlockchainNetwork={setBlockchainNetwork}
                    chainId={chainId}
                    setTxInfo={setTxInfo}
                  />
                )}
              </>
            </div>
          </div>
        </div>

        {/* {service === 'exchange' && subService === 'exchange' && (
)}

{service === 'buy' && subService === 'buyCash' && (
)}

{service === 'buy' && subService === 'buyCard' && (
)}

{service === 'sell' && subService === 'sellCash' && (
)}

{service === 'sell' && subService === 'sellCard' && (
)}

{service === 'defi' && subService === 'defi' && (
)} */}

        {/* =============={others}=======================*/}
        {service === 'exchange' && subService === 'exchange' && (
          <>
            {isLightMode ? (
              <div className="mt-[64px] flex flex-col justify-center items-center gap-[64px] mb-[64px]">
                <div className="mt-[64px]">
                  <FeedBack data={feedback} title={'Testimonials'} />
                </div>

                <HowToCard
                  data={stepsExchange}
                  title={`How to ${service} Crypto`}
                />

                <div className="flex flex-col md:flex-row gap-[16px]">
                  <HelpGuide
                    data={helpExchange}
                    title={'Helpful guides'}
                    isLightMode={isLightMode}
                  />
                  <FaqCard data={faqExchange} title={`FaQ ${service}`} />
                </div>
              </div>
            ) : (
              <div className="mt-[64px] flex flex-col justify-center items-center gap-[64px] mb-[64px] bg-black">
                <div className="mt-[64px]">
                  <FeedBack data={feedback} title={'Testimonials'} />
                </div>

                <HowToCard
                  data={stepsExchange}
                  title={`How to ${service} Crypto`}
                />

                <div className="flex flex-col md:flex-row gap-[16px]">
                  <HelpGuide
                    data={helpExchange}
                    title={'Helpful guides'}
                    isLightMode={isLightMode}
                  />
                  <FaqCard data={faqExchange} title={`FaQ ${service}`} />
                </div>
              </div>
            )}
          </>
        )}

        {service === 'buy' && subService === 'buyCash' && (
          <>
            {isLightMode ? (
              <div className="mt-[64px] flex flex-col justify-center items-center gap-[64px] mb-[64px]">
                <div className="mt-[64px]">
                  <FeedBack data={feedback} title={'Testimonials'} />
                </div>

                <HowToCard data={stepsBuy} title={`How to ${service} Crypto`} />

                <div className="flex flex-col md:flex-row gap-[16px]">
                  <HelpGuide
                    data={helpBuy}
                    title={'Helpful guides'}
                    isLightMode={isLightMode}
                  />
                  <FaqCard data={faqBuy} title={`FaQ ${service}`} />
                </div>
              </div>
            ) : (
              <div className="mt-[64px] flex flex-col justify-center items-center gap-[64px] mb-[64px] bg-black">
                <div className="mt-[64px]">
                  <FeedBack data={feedback} title={'Testimonials'} />
                </div>

                <HowToCard data={stepsBuy} title={`How to ${service} Crypto`} />

                <div className="flex flex-col md:flex-row gap-[16px]">
                  <HelpGuide
                    data={helpBuy}
                    title={'Helpful guides'}
                    isLightMode={isLightMode}
                  />
                  <FaqCard data={faqBuy} title={`FaQ ${service}`} />
                </div>
              </div>
            )}
          </>
        )}

        {service === 'buy' && subService === 'buyCard' && (
          <>
            {isLightMode ? (
              <div className="mt-[64px] flex flex-col justify-center items-center gap-[64px] mb-[64px]">
                <div className="mt-[64px]">
                  <FeedBack data={feedback} title={'Testimonials'} />
                </div>

                <HowToCard data={stepsBuy} title={`How to ${service} Crypto`} />

                <div className="flex flex-col md:flex-row gap-[16px]">
                  <HelpGuide
                    data={helpBuy}
                    title={'Helpful guides'}
                    isLightMode={isLightMode}
                  />
                  <FaqCard data={faqBuy} title={`FaQ ${service}`} />
                </div>
              </div>
            ) : (
              <div className="mt-[64px] flex flex-col justify-center items-center gap-[64px] mb-[64px] bg-black">
                <div className="mt-[64px]">
                  <FeedBack data={feedback} title={'Testimonials'} />
                </div>

                <HowToCard data={stepsBuy} title={`How to ${service} Crypto`} />

                <div className="flex flex-col md:flex-row gap-[16px]">
                  <HelpGuide
                    data={helpBuy}
                    title={'Helpful guides'}
                    isLightMode={isLightMode}
                  />
                  <FaqCard data={faqBuy} title={`FaQ ${service}`} />
                </div>
              </div>
            )}
          </>
        )}

        {service === 'sell' && subService === 'sellCash' && (
          <>
            {isLightMode ? (
              <div className="mt-[64px] flex flex-col justify-center items-center gap-[64px] mb-[64px]">
                <div className="mt-[64px]">
                  <FeedBack data={feedback} title={'Testimonials'} />
                </div>

                <HowToCard
                  data={stepsSell}
                  title={`How to ${service} Crypto`}
                />

                <div className="flex flex-col md:flex-row gap-[16px]">
                  <HelpGuide
                    data={helpSell}
                    title={'Helpful guides'}
                    isLightMode={isLightMode}
                  />
                  <FaqCard data={faqSell} title={`FaQ ${service}`} />
                </div>
              </div>
            ) : (
              <div className="mt-[64px] flex flex-col justify-center items-center gap-[64px] mb-[64px] bg-black">
                <div className="mt-[64px]">
                  <FeedBack data={feedback} title={'Testimonials'} />
                </div>

                <HowToCard
                  data={stepsSell}
                  title={`How to ${service} Crypto`}
                />

                <div className="flex flex-col md:flex-row gap-[16px]">
                  <HelpGuide
                    data={helpSell}
                    title={'Helpful guides'}
                    isLightMode={isLightMode}
                  />
                  <FaqCard data={faqSell} title={`FaQ ${service}`} />
                </div>
              </div>
            )}
          </>
        )}

        {service === 'sell' && subService === 'sellCard' && (
          <>
            {isLightMode ? (
              <div className="mt-[64px] flex flex-col justify-center items-center gap-[64px] mb-[64px]">
                <div className="mt-[64px]">
                  <FeedBack data={feedback} title={'Testimonials'} />
                </div>

                <HowToCard
                  data={stepsSell}
                  title={`How to ${service} Crypto`}
                />

                <div className="flex flex-col md:flex-row gap-[16px]">
                  <HelpGuide
                    data={helpSell}
                    title={'Helpful guides'}
                    isLightMode={isLightMode}
                  />
                  <FaqCard data={faqSell} title={`FaQ ${service}`} />
                </div>
              </div>
            ) : (
              <div className="mt-[64px] flex flex-col justify-center items-center gap-[64px] mb-[64px] bg-black">
                <div className="mt-[64px]">
                  <FeedBack data={feedback} title={'Testimonials'} />
                </div>

                <HowToCard
                  data={stepsSell}
                  title={`How to ${service} Crypto`}
                />

                <div className="flex flex-col md:flex-row gap-[16px]">
                  <HelpGuide
                    data={helpSell}
                    title={'Helpful guides'}
                    isLightMode={isLightMode}
                  />
                  <FaqCard data={faqSell} title={`FaQ ${service}`} />
                </div>
              </div>
            )}
          </>
        )}

        {service === 'defi' && subService === 'defi' && (
          <>
            {isLightMode ? (
              <div className="mt-[64px] flex flex-col justify-center items-center gap-[64px] mb-[64px]">
                <div className="mt-[64px]">
                  <FeedBack data={feedback} title={'Testimonials'} />
                </div>

                <HowToCard
                  data={stepsDefi}
                  title={`How to ${service} Crypto`}
                />

                <div className="flex flex-col md:flex-row gap-[16px]">
                  <HelpGuide
                    data={helpDefi}
                    title={'Helpful guides'}
                    isLightMode={isLightMode}
                  />
                  <FaqCard data={faqDefi} title={`FaQ ${service}`} />
                </div>
              </div>
            ) : (
              <div className="mt-[64px] flex flex-col justify-center items-center gap-[64px] mb-[64px] bg-black">
                <div className="mt-[64px]">
                  <FeedBack data={feedback} title={'Testimonials'} />
                </div>

                <HowToCard
                  data={stepsDefi}
                  title={`How to ${service} Crypto`}
                />

                <div className="flex flex-col md:flex-row gap-[16px]">
                  <HelpGuide
                    data={helpDefi}
                    title={'Helpful guides'}
                    isLightMode={isLightMode}
                  />
                  <FaqCard data={faqDefi} title={`FaQ ${service}`} />
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <div className="relative bg-white w-full overflow-auto text-left text-sm text-gray-400 font-montserrat">
        <div className="mt-8 flex flex-col justify-center items-center gap-4 mb-8">
          <div className="flex bg-lightslategray-300 w-full h-px" />
          <Footer />
        </div>
      </div>
    </>
  );
};
