import React, { useState, useEffect } from 'react';
import { Progress } from '../../../components/Progress';
import { CheckoutReceiveCash } from '../../../components/CheckoutReceiveCash';
import { Signup } from '../../../components/Signup';
import { Confirm } from '../../../components/Confirm';
import {
  createTransaction,
  getTransactionByTxId,
  getTransactionByTxIdInternal,
} from '../../../redux/features/transaction/transactionSlice';
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createTransactionService } from '../../../services/apiService';
import { getTokenListExchange } from '../../../redux/features/token/tokenSlice';
export const SellCashScreen3 = (props) => {
  const {
    percentageProgress,
    setPercentageProgress,
    fToken,
    tToken,
    fValue,
    userAddress,
    fTitle,
    tTitle,
    service,
    subService,
    setTxInfo,
    country,
    city,
    telegram,
    transactionRates,
    loadingExchangeRate,
  } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  /*********************************************     REDUX STATES    **************************************************** */
  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  const { user } = useSelector((state) => state.user);

  const youSend = transactionRates ? transactionRates?.youSend : 0;
  const youGet = transactionRates ? transactionRates?.youGet : 0;
  const processingFee = transactionRates ? transactionRates?.processingFee : 0;
  const networkFee = transactionRates ? transactionRates?.networkFee : 0;
  const serviceFee = transactionRates ? transactionRates?.serviceFee : 0;
  const tValue = transactionRates ? transactionRates?.tValueFormatted : 0;
  const exchangeRate = transactionRates ? transactionRates?.exchangeRate : 0;
  const estimatedGas = transactionRates ? transactionRates?.estimatedGas : 0;
  const transactionRatesError = transactionRates
    ? transactionRates?.message
    : '';
  console.log({ transactionRatesError: transactionRatesError });
  const transactionRatesLoading = transactionRates
    ? transactionRates?.isLoading
    : false;
  console.log({ transactionRatesLoading: transactionRatesLoading });
  const amount = transactionRates ? transactionRates?.amount : 0;

  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  /*********************************************     REACT STATES    **************************************************** */
  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  const [isCheckout, setIsCheckout] = useState(false);
  const [isConfirm, setIsConfirm] = useState(true);
  const [isSend, setIsSend] = useState(false);

  useEffect(() => {
    dispatch(getTokenListExchange());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function newFunc() {
    //================{new updates}===============================
    localStorage.removeItem('fTokenSellCash');
    localStorage.removeItem('tTokenSellCash');
    localStorage.removeItem('fValueSellCash');
    localStorage.removeItem('transactionRatesSellCash');
    //================{new updates}===============================

    localStorage.removeItem('telegram');
    localStorage.removeItem('userAddress');
    localStorage.removeItem('benderyAddress');
    localStorage.removeItem('country');
    localStorage.removeItem('cityData');
    localStorage.removeItem('city');
    localStorage.removeItem('paymentMethod');
    localStorage.removeItem('txInfo');
    localStorage.removeItem('percentageProgressSellCash');
    localStorage.removeItem('percentageProgressHome');
    localStorage.removeItem('blockchainNetworkE');
    localStorage.removeItem('provider');
    dispatch(getTransactionByTxIdInternal(null));
  }

  const submitTransaction = async () => {
    if (Number(fValue) < 0) {
      return toast.error('One or more required fields are empty');
    }

    const userData = {
      userId: user?._id ? user?._id : user?.userId,
      fToken,
      tToken,
      fValue,
      userAddress,
      service,
      subService, // new to be added to frontend
      percentageProgress: 3,
      country,
      city,
      telegram,
      //======{new}==========
      youSend,
      youGet,
      serviceFee,
      networkFee,
      processingFee,
      exchangeRate,
      tValue,
      amount,
    };

    const response = await createTransactionService(userData);
    if (response?._id) {
      newFunc();
      dispatch(getTransactionByTxId(response?._id));
      dispatch(getTransactionByTxIdInternal(response));
      setTimeout(() => {
        navigate(`/sellCash`); // proceed to stage 3
      }, 200);
    }
  };
  useEffect(() => {
    if (isSend && user?.token) {
      submitTransaction();
      setIsSend(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSend]);

  if (isSend && !user?.token) {
    return <Navigate to="/auth" />;
  }

  return (
    <div className="flex flex-col xl:flex-row justify-center">
      <div className="flex flex-col xl:flex-row gap-[32px] mt-[8px]">
        <div className="flex-col xl:flex-row h-[500px]">
          <Progress percentageProgress={percentageProgress} />
        </div>
        {isCheckout && (
          <>
            <div className="flex flex-col justify-start items-start xl:justify-center xl:items-center mt-6 xl:mt-0 gap-4">
              <CheckoutReceiveCash
                setPercentageProgress={setPercentageProgress}
                fTitle={fTitle}
                tTitle={tTitle}
                fToken={fToken}
                tToken={tToken}
                fValue={fValue}
                userAddress={userAddress}
                transactionRates={transactionRates}
                loadingExchangeRate={loadingExchangeRate}
              />
              <Signup
                setIsCheckout={setIsCheckout}
                setIsConfirm={setIsConfirm}
              />
            </div>
          </>
        )}
        {isConfirm && (
          <>
            <div className="flex flex-col justify-start items-start xl:justify-center xl:items-center mt-6 xl:mt-0 gap-4">
              <CheckoutReceiveCash
                setPercentageProgress={setPercentageProgress}
                fTitle={fTitle}
                tTitle={tTitle}
                fToken={fToken}
                tToken={tToken}
                fValue={fValue}
                userAddress={userAddress}
                transactionRates={transactionRates}
                loadingExchangeRate={loadingExchangeRate}
              />
              <Confirm submitTransaction={setIsSend} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
