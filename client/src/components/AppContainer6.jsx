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
import { useDispatch, useSelector } from 'react-redux';

import {
  getTokenList,
  getTokenListDefi,
  getTokenListFiat,
  getTokenListBuy,
  getTokenListSell,
  getTokenListExchange,
} from '../redux/features/token/tokenSlice';
export const AppContainer = (props) => {
  const {
    isRegister,
    setIsRegister,
    isLogin,
    setIsLogin,
    isLoggedIn,
    setIsLoggedIn,
    setMode,
    mode,
    setUser,
    service,
    setService,
  } = props;

  const dispatch = useDispatch();

  const [isExchange, setIsExchange] = useState(true);
  const [isBuy, setIsBuy] = useState(false);
  const [isSell, setIsSell] = useState(false);
  const [isDefi, setIsDefi] = useState(false);
  const [isCard, setIsCard] = useState(false);
  // const [isLightMode, setIsLightMode] = useState(false);
  const [isLightMode, setIsLightMode] = useState(true);

  //====={Controllers}===========================
  const [isApp, setIsApp] = useState(false);

  useEffect(() => {
    dispatch(getTokenListDefi());
    dispatch(getTokenListFiat());
    dispatch(getTokenListBuy());
    dispatch(getTokenListSell());
    dispatch(getTokenListExchange());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isRegister || isLogin) {
    return <Navigate to={'/auth'} />;
  }

  return (
    <>
      <Header
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        isRegister={isRegister}
        setIsRegister={setIsRegister}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setIsApp={setIsApp}
        isApp={isApp}
        setMode={setMode}
        mode={mode}
        setUser={setUser}
      />
      {isExchange && (
        <CardExchange
          isExchange={isExchange}
          setIsExchange={setIsExchange}
          isBuy={isBuy}
          setIsBuy={setIsBuy}
          isSell={isSell}
          setIsSell={setIsSell}
          isDefi={isDefi}
          setIsDefi={setIsDefi}
          isLightMode={isLightMode}
          setIsApp={setIsApp}
          service={service}
          setService={setService}
        />
      )}
      {isBuy && (
        <CardBuy
          isExchange={isExchange}
          setIsExchange={setIsExchange}
          isBuy={isBuy}
          setIsBuy={setIsBuy}
          isSell={isSell}
          setIsSell={setIsSell}
          isDefi={isDefi}
          setIsDefi={setIsDefi}
          isLightMode={isLightMode}
          setIsApp={setIsApp}
          service={service}
          setService={setService}
        />
      )}
      {isSell && (
        <CardSell
          isExchange={isExchange}
          setIsExchange={setIsExchange}
          isBuy={isBuy}
          setIsBuy={setIsBuy}
          isSell={isSell}
          setIsSell={setIsSell}
          isDefi={isDefi}
          setIsDefi={setIsDefi}
          isLightMode={isLightMode}
          setIsApp={setIsApp}
          service={service}
          setService={setService}
        />
      )}
      {isDefi && (
        <CardDefi
          isExchange={isExchange}
          setIsExchange={setIsExchange}
          isBuy={isBuy}
          setIsBuy={setIsBuy}
          isSell={isSell}
          setIsSell={setIsSell}
          isDefi={isDefi}
          setIsDefi={setIsDefi}
          isLightMode={isLightMode}
          setIsApp={setIsApp}
          service={service}
          setService={setService}
        />
      )}
      <div className="relative bg-white w-full overflow-auto text-left text-sm text-gray-400 font-montserrat">
        <div className="mt-8 flex flex-col justify-center items-center gap-4 mb-8">
          <div className="flex bg-lightslategray-300 w-full h-px" />
          <Footer />
        </div>
      </div>

      {/* {isRegister && (
        <Modal visible={isRegister}>
          <Register
            setIsLogin={setIsLogin}
            setIsRegister={setIsRegister}
            setIsLoggedIn={setIsLoggedIn}
          />
        </Modal>
      )}
      {isLogin && (
        <Modal visible={isLogin}>
          <Login
            setIsLogin={setIsLogin}
            setIsRegister={setIsRegister}
            setIsLoggedIn={setIsLoggedIn}
          />
        </Modal>
      )} */}
    </>
  );
};
