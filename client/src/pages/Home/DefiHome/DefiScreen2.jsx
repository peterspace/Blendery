import React, { useState, useEffect } from 'react';
import { Progress } from '../../../components/Progress';
import { EstimatorDefi } from '../../../components/EstimatorDefi';
import { WalletInfo } from '../../../components/WalletInfo';
import { DetailsLocal } from '../../../components/DetailsLocal';

export const DefiScreen2 = (props) => {
  const {
    percentageProgress,
    setPercentageProgress,
    fTitle,
    tTitle,
    fToken,
    setFromToken,
    tToken,
    setToToken,
    fValue,
    setFromValue,
    loading,
    mode,
    service,
    setService,
    subService,
    setSubService,
    setTxInfo,
    allTokensFrom,
    allTokensTo,
    exchangeRate,
    transactionRates,
    userAddress,
    setUserAddress,
    blockchainNetwork,
    setBlockchainNetwork,
    chainId,
  } = props;

  // const allTokensFromL = useSelector((state) => state.token?.tokenListDefi);
  // const allTokensToL = useSelector((state) => state.token?.tokenListDefi);

  return (
    <div className="flex flex-col xl:flex-row justify-center">
      <div className="flex flex-col xl:flex-row gap-[32px] mt-[8px]">
        <div className="flex-col xl:flex-row h-[500px]">
          <Progress percentageProgress={percentageProgress} />
        </div>
        <div className="flex flex-col justify-start items-start xl:justify-center xl:items-center mt-6 xl:mt-0 gap-4">
          <EstimatorDefi
           fTitle={fTitle}
           tTitle={tTitle}
           fToken={fToken}
           setFromToken={setFromToken}
           tToken={tToken}
           setToToken={setToToken}
           fValue={fValue}
           setFromValue={setFromValue}
           loading={loading}
           service={service}
           allTokensFrom={allTokensFrom}
           allTokensTo={allTokensTo}
           exchangeRate={exchangeRate}
           transactionRates={transactionRates}
            blockchainNetwork={blockchainNetwork}
            setBlockchainNetwork={setBlockchainNetwork}
            setPercentageProgress={setPercentageProgress}
          />
          <WalletInfo
          setPercentageProgress={setPercentageProgress}
          setUserAddress={setUserAddress}
          userAddress={userAddress}
          service={service}
          fToken={fToken}
          fValue={fValue}
          />
        </div>
        <div className="flex-col xl:flex-row h-[374px]">
          <DetailsLocal
            fToken={fToken}
            tToken={tToken}
            fValue={fValue}
            fTitle={fTitle}
            tTitle={tTitle}
          />
        </div>
      </div>
    </div>
  );
};
