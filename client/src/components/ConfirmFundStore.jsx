import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { RxCopy } from 'react-icons/rx';
import { RiFileWarningFill } from 'react-icons/ri';
import { SiHiveBlockchain } from 'react-icons/si';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateOneBlockchainTransactionById } from '../services/apiServiceStore';
import {
  updateTransactionsAutomatically,
  getTransactionByTxIdInternal,
} from '../redux/features/transaction/transactionSlice';

import { toast } from 'react-toastify';

// update "plese hold" ... to "Next"
export const ConfirmFundStore = (props) => {
  const { txData } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMontor, setIsMontor] = useState(false); // to monitor transaction

  const updateTransaction = async () => {
    const userData = {
      id: txData?._id,
    };
    await updateOneBlockchainTransactionById(userData);
  };

  useEffect(() => {
    if (isMontor) {
      setTimeout(() => {
        window.location.href = txData?.blockchainUrl
          ? txData?.blockchainUrl
          : txData?.fallbackUrl;
        setIsMontor(false);
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMontor]);

  // if (isRedirect) {
  //   return <Navigate to="/" />;
  // }

  // async function newFunc() {
  //   setTxInfo(null);
  //   setPercentageProgress(1);
  //   // localStorage.setItem('telegram', JSON.stringify(null));
  //   // localStorage.setItem('userAddress', JSON.stringify(null));
  //   // localStorage.setItem('benderyAddress', JSON.stringify(null));
  //   navigate('/');
  // }

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
    dispatch(getTransactionByTxIdInternal(null));
    navigate('/');
  }

  const sendFund = (
    <div className="flex justify-center rounded-lg bg-white shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[320px] xs:w-[340px] md:w-[500px] p-4">
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[8px] md:gap-[12px]">
          <div className="flex flex-row gap-4 mt-[24px]">
            <div className="text-[18px] md:text-[24px] font-extrabold leading-[32px] inline-block">
              Confirming payment
            </div>
          </div>
          <div className="flex bg-lightslategray-300 md:w-[452px] w-[300px] h-px" />
        </div>

        <div className="flex flex-col w-[300px] md:w-[452px] gap-[8px]">
          <div className="flex flex-row">
            <div className="text-smi leading-[22px] text-darkgray-100 inline-block w-[50%]">
              Amount
            </div>
            <div className="flex flex-row justify-start gap-1 w-[50%]">
              <div className="text-base leading-[24px] text-gray-300 inline-block">
                {txData?.fValue} {txData?.fToken?.symbol.toUpperCase()}
              </div>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="text-smi leading-[22px] text-darkgray-100 inline-block w-[50%]">
              Service provider
            </div>
            <div className="flex flex-col justify-start w-[50%]">
              <div className="text-xs leading-[16px] text-limegreen inline-block">
                {txData?.provider?.name}
              </div>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="text-smi leading-[22px] text-darkgray-100 inline-block w-[50%]">
              Your address {`(${txData?.tToken?.symbol.toUpperCase()})`}
            </div>
            <div className="flex flex-col justify-start w-[50%]">
              <div className="text-xs leading-[16px] text-green-600 inline-block">
                {txData?.userAddress && txData?.userAddress?.substring(0, 22)}
                <br />
                {txData?.userAddress &&
                  txData?.userAddress?.substring(
                    22,
                    txData?.userAddress.length
                  )}
              </div>
            </div>
          </div>
        </div>
        {txData?.provider === 'BlenderyPay' ? (
          <div className="flex flex-row rounded bg-gray-100 p-2 md:w-[452px] w-[300px]">
            <div className="ml-1 flex justify-center items-center w-[24px] flex-shrink-0">
              {' '}
            </div>
            <div className="text-xs leading-[14.4px] text-darkslategray-200 inline-block w-[424px]">
              {` Your payment has been received. Please hold while we deposit the ${
                txData?.tValue
              } ${txData?.tToken?.symbol.toUpperCase()} to your wallet address.`}
            </div>
          </div>
        ) : (
          <div className="flex flex-row rounded bg-gray-100 p-2 md:w-[452px] w-[300px]">
            <div className="ml-1 flex justify-center items-center w-[24px] flex-shrink-0">
              {' '}
            </div>
            <div className="text-xs leading-[14.4px] text-darkslategray-200 inline-block w-[424px]">
              Currently, the transaction is processed on the side of the
              provider. You can always create a new transaction if it is needed.
            </div>
          </div>
        )}

        {txData?.provider === 'BlenderyPay' ? null : (
          <div className="flex flex-row gap-2 mt-2">
            <div
              className=" cursor-pointer flex flex-row justify-center items-center bg-bgPrimary hover:opacity-90 text-white h-[49px] shrink-0 rounded w-[70%]"
              onClick={() => setIsMontor(true)}
            >
              <div className="flex flex-row gap-2">
                <SiHiveBlockchain size={20} color="#b4b4b4" />
                <div className="leading-[20px] inline-block">
                  Go to provider
                </div>
              </div>
            </div>

            <div
              className="cursor-pointer flex flex-row justify-center items-center bg-bgSecondary hover:opacity-90 text-bgPrimary h-[49px] shrink-0 rounded w-[30%]"
              onClick={newFunc}
            >
              New
            </div>
          </div>
        )}

        <div className="flex bg-lightslategray-300 md:w-[452px] w-[300px] h-px" />
        <div
          className="flex flex-row justify-center items-center"
          // onClick={() => setPercentageProgress(5)}
          onClick={updateTransaction}
        >
          <div className="cursor-pointer flex flex-row justify-center items-center bg-bgPrimary hover:opacity-90 text-white h-[49px] shrink-0 rounded w-full">
            Please hold ...
          </div>
        </div>

        <div className="flex flex-row w-full" />
      </div>
    </div>
  );
  return <>{sendFund}</>;
};
