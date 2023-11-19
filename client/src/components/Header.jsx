import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Logout } from '../redux/features/user/userSlice';
import { BsFillMoonStarsFill, BsMoonStars } from 'react-icons/bs'; // Bitcoin
import { useDispatch } from 'react-redux';
const tabs = ['Home', 'Exchange', 'Buy', 'Sell', 'Defi'];
const modes = ['light', 'dark'];
export const Header = (props) => {
  const { mode, setMode, user } = props;

  const isApp = true;
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [isRedirectHome, setIsRedirectHome] = useState(false);
  const [isRedirectExchange, setIsRedirectExchange] = useState(false);
  const [isRedirectBuy, setIsRedirectBuy] = useState(false);
  const [isRedirectSell, setIsRedirectSell] = useState(false);
  const [isRedirectDefi, setIsRedirectDefi] = useState(false);
  const [isRedirectDashboard, setIsRedirectDashboard] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[1]);

  useEffect(() => {
    if (isLogin) {
      navigate('/auth');
      setIsLogin(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin]);

  useEffect(() => {
    if (isRedirectExchange) {
      navigate('/exchange');
      setIsRedirectExchange(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRedirectExchange]);

  useEffect(() => {
    if (isRedirectBuy) {
      navigate('/buyCard');
      setIsRedirectBuy(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRedirectBuy]);

  useEffect(() => {
    if (isRedirectSell) {
      navigate('/sellCard');
      setIsRedirectSell(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRedirectSell]);

  useEffect(() => {
    if (isRedirectDefi) {
      navigate('/defi');
      setIsRedirectDefi(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRedirectDefi]);

  useEffect(() => {
    if (isRedirectHome) {
      newFunc()
      navigate('/');
      setIsRedirectHome(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRedirectHome]);

  useEffect(() => {
    if (isRedirectDashboard) {
      newFunc()
      navigate('/dashboard');
      setIsRedirectDashboard(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRedirectDashboard]);

  async function newFunc() {
    localStorage.removeItem('fTokenE');
    localStorage.removeItem('tTokenE');
    localStorage.removeItem('telegram');
    localStorage.removeItem('userAddress');
    localStorage.removeItem('benderyAddress');
    localStorage.removeItem('country');
    localStorage.removeItem('cityData');
    localStorage.removeItem('city');
    localStorage.removeItem('paymentMethod');
    localStorage.removeItem('txInfo');
    localStorage.removeItem('percentageProgress');
    localStorage.removeItem('blockchainNetworkE');
    localStorage.removeItem('provider');
    localStorage.removeItem('service');
    localStorage.removeItem('subService');
    navigate('/');
  }

  const handleLogout = () => {
    dispatch(Logout());
    newFunc()
    // window.location.replace('/');
  };

  const isHome = (
    <>
      <div className="flex flex-col md:flex-row gap-[32px] md:justify-between md:gap-0 mt-[8px] w-screen">
        <div className="flex flex-col md:flex-row gap-[32px] ml-[20px]">
          <div
            className="cursor-pointer text-smi text-mediumseagreen-200 leading-[24px] text-center inline-block"
            onClick={() => {
              setIsRedirectHome(true);
              setActiveTab(tabs[0]);
            }}
          >
            Blendery
          </div>
          {isApp ? (
           
            null
          ) : (
            <div className="flex flex-col md:flex-row gap-[32px] ml-[20px]">
              <div className="cursor-pointer leading-[24px] text-center inline-block">
                Personal
              </div>
              <div className="cursor-pointer text-smi leading-[24px] text-center inline-block]">
                Business
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col md:flex-row gap-[32px] mr-[20px]">
          <div className="cursor-pointer text-smi leading-[24px] text-center inline-block">
            Support
          </div>

          {user?.token ? (
            <>
              <div
                className="cursor-pointer text-smi leading-[24px] text-center inline-block"
                onClick={() => {
                  setIsRedirectDashboard(true);
                }}
              >
                Dashboard
              </div>
              <div
                className="cursor-pointer text-smi leading-[24px] text-center inline-block"
                onClick={() => {
                  handleLogout();
                }}
              >
                Logout
              </div>
              <div
                className="cursor-pointer flex justify-center h-[24px] items-center"
                onClick={() => {
                  setMode((prev) => !prev);
                }}
              >
                {mode === true ? (
                  <BsMoonStars size={18} color={'#404b51'} />
                ) : (
                  <BsFillMoonStarsFill size={18} color={'#4f46e5'} />
                )}
              </div>
            </>
          ) : (
            <div
              className="cursor-pointer text-smi leading-[24px] text-center inline-block"
              onClick={() => {
                setIsLogin(true);
                // use localStorage
              }}
            >
              Login
            </div>
          )}
        </div>
      </div>
    </>
  );

  return (
    <div className="flex flex-col bg-white md:flex-row justify-center gap-4">
      <div className="flex flex-row">{isHome}</div>
    </div>
  );
};
