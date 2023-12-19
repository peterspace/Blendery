import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
//===============================================================
import { BuyCardHome } from './BuyCardHome/BuyCardHome';
import { BuyCashHome } from './BuyCashHome/BuyCashHome';
import { DefiHome } from './DefiHome/DefiHome';
import { ExchangeHome } from './ExchangeHome/ExchangeHome';
import { SellCardHome } from './SellCardHome/SellCardHome';
import { SellCashHome } from './SellCashHome/SellCashHome';
//===============================================================
import styles from './AppContainer.module.css';
import { Footer } from '../../components/Footer';

import {
  stepsExchange,
  stepsBuy,
  stepsSell,
  stepsDefi,
  helpExchange,
  helpBuy,
  helpSell,
  helpDefi,
} from '../../constants';
import { HowToCard } from '../../components/HowToCard';
import { FaqCard } from '../../components/FaqCard';
import { faqExchange, faqBuy, faqSell, faqDefi } from '../../constants';
import { FeedBack } from '../../components/Feedback';
import { feedback } from '../../constants';

import { HelpGuide } from '../../components/HelpGuide';
import { useDispatch, useSelector } from 'react-redux';

import {
  getTokenList,
  getTokenListDefi,
  getTokenListFiat,
  getTokenListBuy,
  getTokenListSell,
  getTokenListExchange,
  getTokensDefiById,
} from '../../redux/features/token/tokenSlice';

import {
  getUserTransactions,
  getTransactionByTxId,
  getUserExchange,
  getUserDefi,
  getUserBuyCash,
  getUserBuyCard,
  getUserSellCash,
  getUserSellCard,
} from '../../redux/features/transaction/transactionSlice';

import { networksOptions } from '../../constants';

export const AppContainer = (props) => {
  const {
    mode,
    setMode,
    user,
    service,
    setService,
    subService,
    setSubService,
    setTxInfo,
    txInfo,
  } = props;

  const dispatch = useDispatch();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const tokensDefiEthereum = useSelector(
    (state) => state.token?.tokensDefiEthereum
  );

  const [isLightMode, setIsLightMode] = useState(true);
  const allTokensDefi = useSelector((state) => state.token?.tokensDefiById);
  const percentageProgressL = localStorage.getItem('percentageProgress')
    ? JSON.parse(localStorage.getItem('percentageProgress'))
    : 1;

  const [percentageProgress, setPercentageProgress] =
    useState(percentageProgressL);

  const [isToLoading, setIsToLoading] = useState(false);
  const [isFromLoading, setIsFromLoading] = useState(false);

  //====={Controllers}===========================

  useEffect(() => {
    setIsLightMode(mode);
  }, [mode]);

  useEffect(() => {
    if (percentageProgress) {
      localStorage.setItem(
        'percentageProgress',
        JSON.stringify(percentageProgress)
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percentageProgress]);

  //==============={update lists at intervals}===============================

  useEffect(() => {
    setMode(true); // automatically set ,ode to "light" mode
    dispatch(getTokenListDefi());
    dispatch(getTokenListFiat());
    dispatch(getTokenListBuy());
    dispatch(getTokenListSell());
    dispatch(getTokenListExchange());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem('service', JSON.stringify(service));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service]);

  useEffect(() => {
    localStorage.setItem('subService', JSON.stringify(subService));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subService]);

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
    setSubService('sellCard');
  }

  async function nextFuncBuyCard() {
    setService('buy');
    setSubService('buyCard');
  }

  async function nextFuncBuyCash() {
    setService('buy');
    setSubService('buyCash');
  }

  async function nextFuncDefi() {
    setService('defi');
    setSubService('defi');
  }

  return (
    <>
      <div className="flex flex-col">
        {percentageProgress === 1 ? (
          <>
            <div
              className={`${styles.hero} flex flex-col justify-center items-center`}
            >
              <div
                className={`mt-[64px] mb-[64px] flex justify-center rounded-lg bg-white shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[375px] md:w-[500px] p-4`}
              >
                <div className="flex flex-col gap-[10px]">
                  <div className="flex flex-row gap-4 mt-2">
                    <div
                      className={`cursor-pointer hover:text-bgPrimary leading-[24px] ${
                        service === 'exchange' && subService === 'exchange'
                          ? 'text-bgPrimary text-base font-black inline-block underline underline-offset-[16px]'
                          : 'text-darkgray-200 text-mini'
                      }`}
                      onClick={nextFuncExchange}
                    >
                      Exchange
                    </div>
                    <div
                      className={`cursor-pointer hover:text-bgPrimary leading-[24px] inline-block ${
                        service === 'buy' && subService === 'buyCash'
                          ? 'text-bgPrimary text-base font-black inline-block underline underline-offset-[16px]'
                          : 'text-darkgray-200 text-mini'
                      } ${
                        service === 'buy' && subService === 'buyCard'
                          ? 'text-bgPrimary text-base font-black inline-block underline underline-offset-[16px]'
                          : 'text-darkgray-200 text-mini'
                      }`}
                      onClick={nextFuncBuyCard}
                    >
                      Buy
                    </div>
                    <div
                      className={`cursor-pointer hover:text-bgPrimary leading-[24px] inline-block ${
                        service === 'sell' && subService === 'sellCash'
                          ? 'text-bgPrimary text-base font-black inline-block underline underline-offset-[16px]'
                          : 'text-darkgray-200 text-mini'
                      } ${
                        service === 'sell' && subService === 'sellCard'
                          ? 'text-bgPrimary text-base font-black inline-block underline underline-offset-[16px]'
                          : 'text-darkgray-200 text-mini'
                      }`}
                      onClick={nextFuncSellCard}
                    >
                      Sell
                    </div>

                    <div
                      className={`cursor-pointer hover:text-bgPrimary leading-[24px] inline-block ${
                        service === 'defi' && subService === 'defi'
                          ? 'text-bgPrimary text-base font-black inline-block underline underline-offset-[16px]'
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
                      <ExchangeHome
                        mode={mode}
                        service={service}
                        setService={setService}
                        subService={subService}
                        setSubService={setSubService}
                        setTxInfo={setTxInfo}
                        txInfo={txInfo}
                        user={user}
                        setPercentageProgressHome={setPercentageProgress}
                      />
                    )}
                    {service === 'buy' && subService === 'buyCash' && (
                      <BuyCashHome
                        mode={mode}
                        service={service}
                        setService={setService}
                        subService={subService}
                        setSubService={setSubService}
                        setTxInfo={setTxInfo}
                        txInfo={txInfo}
                        user={user}
                        setPercentageProgressHome={setPercentageProgress}
                      />
                    )}
                    {service === 'buy' && subService === 'buyCard' && (
                      <BuyCardHome
                        mode={mode}
                        service={service}
                        setService={setService}
                        subService={subService}
                        setSubService={setSubService}
                        setTxInfo={setTxInfo}
                        txInfo={txInfo}
                        user={user}
                        setPercentageProgressHome={setPercentageProgress}
                      />
                    )}

                    {service === 'sell' && subService === 'sellCash' && (
                      <SellCashHome
                        mode={mode}
                        service={service}
                        setService={setService}
                        subService={subService}
                        setSubService={setSubService}
                        setTxInfo={setTxInfo}
                        txInfo={txInfo}
                        user={user}
                        setPercentageProgressHome={setPercentageProgress}
                      />
                    )}

                    {service === 'sell' && subService === 'sellCard' && (
                      <SellCardHome
                        mode={mode}
                        service={service}
                        setService={setService}
                        subService={subService}
                        setSubService={setSubService}
                        setTxInfo={setTxInfo}
                        txInfo={txInfo}
                        user={user}
                        setPercentageProgressHome={setPercentageProgress}
                      />
                    )}

                    {service === 'defi' && subService === 'defi' && (
                      <DefiHome
                        mode={mode}
                        service={service}
                        setService={setService}
                        subService={subService}
                        setSubService={setSubService}
                        setTxInfo={setTxInfo}
                        txInfo={txInfo}
                        user={user}
                        setPercentageProgressHome={setPercentageProgress}
                      />
                    )}
                  </>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="h-screen mt-[64px] mb-[64px] overflow-auto">
              {service === 'exchange' && subService === 'exchange' && (
                <ExchangeHome
                  mode={mode}
                  service={service}
                  setService={setService}
                  subService={subService}
                  setSubService={setSubService}
                  setTxInfo={setTxInfo}
                  txInfo={txInfo}
                  user={user}
                  setPercentageProgressHome={setPercentageProgress}
                />
              )}
              {service === 'buy' && subService === 'buyCash' && (
                <BuyCashHome
                  mode={mode}
                  service={service}
                  setService={setService}
                  subService={subService}
                  setSubService={setSubService}
                  setTxInfo={setTxInfo}
                  txInfo={txInfo}
                  user={user}
                  setPercentageProgressHome={setPercentageProgress}
                />
              )}
              {service === 'buy' && subService === 'buyCard' && (
                <BuyCardHome
                  mode={mode}
                  service={service}
                  setService={setService}
                  subService={subService}
                  setSubService={setSubService}
                  setTxInfo={setTxInfo}
                  txInfo={txInfo}
                  user={user}
                  setPercentageProgressHome={setPercentageProgress}
                />
              )}

              {service === 'sell' && subService === 'sellCash' && (
                <SellCashHome
                  mode={mode}
                  service={service}
                  setService={setService}
                  subService={subService}
                  setSubService={setSubService}
                  setTxInfo={setTxInfo}
                  txInfo={txInfo}
                  user={user}
                  setPercentageProgressHome={setPercentageProgress}
                />
              )}

              {service === 'sell' && subService === 'sellCard' && (
                <SellCardHome
                  mode={mode}
                  service={service}
                  setService={setService}
                  subService={subService}
                  setSubService={setSubService}
                  setTxInfo={setTxInfo}
                  txInfo={txInfo}
                  user={user}
                  setPercentageProgressHome={setPercentageProgress}
                />
              )}

              {service === 'defi' && subService === 'defi' && (
                <DefiHome
                  mode={mode}
                  service={service}
                  setService={setService}
                  subService={subService}
                  setSubService={setSubService}
                  setTxInfo={setTxInfo}
                  txInfo={txInfo}
                  user={user}
                  setPercentageProgressHome={setPercentageProgress}
                  isToLoading={isToLoading}
                  setIsToLoading={setIsToLoading}
                  isFromLoading={isFromLoading}
                  setIsFromLoading={setIsFromLoading}
                />
              )}
            </div>
          </>
        )}

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
