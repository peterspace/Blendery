import React, { useState, useEffect } from 'react';
import { Progress } from '../../../components/Progress';
import { Checkout } from '../../../components/Checkout';
import { Signup } from '../../../components/Signup';
import { Confirm } from '../../../components/Confirm';
import {
  createTransaction,
  getTransactionByTxId,
  getTransactionByTxIdInternal,
} from '../../../redux/features/transaction/transactionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

export const ExchangeScreen3 = (props) => {
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
  } = props;

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate()
  console.log({ fromLocationExchange: location });

  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  /*********************************************     REDUX STATES    **************************************************** */
  /********************************************************************************************************************** */
  /********************************************************************************************************************** */

  const { user } = useSelector((state) => state.user);
  const createTransactionResponse = useSelector(
    (state) => state.transaction?.createTransaction
  );
  console.log({ createTransactionResponse: createTransactionResponse });

  const transactionRates = useSelector(
    (state) => state.transaction?.getTransactionRate
  );

  console.log({ transactionRates: transactionRates });
  const youSend = transactionRates ? transactionRates?.youSend : 0;
  const youGet = transactionRates ? transactionRates?.youGet : 0;
  const processingFee = transactionRates ? transactionRates?.processingFee : 0;
  const networkFee = transactionRates ? transactionRates?.networkFee : 0;
  const serviceFee = transactionRates ? transactionRates?.serviceFee : 0;
  const tValue = transactionRates ? transactionRates?.tValueFormatted : 0;
  const exchangeRate = transactionRates ? transactionRates?.exchangeRate : 0;
  //===={To be added}========
  const estimatedGas = transactionRates ? transactionRates?.estimatedGas : 0;
  const amount = transactionRates ? transactionRates?.amount : 0;
  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  /*********************************************     LOCAL STATES    **************************************************** */
  /********************************************************************************************************************** */
  /********************************************************************************************************************** */

  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  /*********************************************     REACT STATES    **************************************************** */
  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  const [isCheckout, setIsCheckout] = useState(false);
  const [isConfirm, setIsConfirm] = useState(true);
  const [isSend, setIsSend] = useState(false);

  useEffect(() => {
    if (createTransactionResponse) {
      setTxInfo(createTransactionResponse);
      let txData = createTransactionResponse;
      dispatch(getTransactionByTxId(txData?._id));
      dispatch(getTransactionByTxIdInternal(createTransactionResponse));
      navigate(`exchange/${txData?._id}`) // proceed to stage 3
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createTransactionResponse]);

  // useEffect(() => {
  //   if (isSend) {
  //     submitTransaction();
  //     setIsSend(false);
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isSend]);

  const submitTransaction = async () => {
    if (Number(fValue) < 0) {
      return toast.error('One or more required fields are empty');
    }
    const userData = {
      //===========================
      // userId: user?._id ? user?._id : user?.userId,
      fToken,
      tToken,
      fValue,
      userAddress,
      service,
      subService, // new to be added to frontend
      percentageProgress: 3,
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

    dispatch(createTransaction(userData));
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
              <Checkout
                setPercentageProgress={setPercentageProgress}
                fTitle={fTitle}
                tTitle={tTitle}
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
              <Checkout
                setPercentageProgress={setPercentageProgress}
                fTitle={fTitle}
                tTitle={tTitle}
              />
              <Confirm submitTransaction={setIsSend} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
