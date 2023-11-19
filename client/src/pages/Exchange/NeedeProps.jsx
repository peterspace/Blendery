import React, { useState } from 'react';

import { Exchange1of4 } from './Exchange1of4';
import { Exchange2of4 } from './Exchange2of4';
import { Exchange3of4 } from './Exchange3of4';
import { Exchange4of4 } from './Exchange4of4';
import { Exchange5of5 } from './Exchange5of5';

//w-[370px] ===w-[300px]
//w-[375px] === w-[320px] xs:w-[340px]

export const NeedeProps = () => {
  const [percentageProgress, setPercentageProgress] = useState(1);
  const fromToken = {
    name: '',
    address: '',
    symbol: '',
    logoURI: '',
    decimals: '',
    chain: '',
    type: '',
  };

  const toToken = {
    name: '',
    address: '',
    symbol: '',
    logoURI: '',
    decimals: '',
    chain: '',
    type: '',
  };

  const [floatingRate, setFloatingRate] = useState('1.65098402');
  const [fixedRate, setFixedRate] = useState('1.56650452');
  const [fToken, setFromToken] = useState('');
  const [tToken, setToToken] = useState('');
  const [fromPrice, setFromPrice] = useState('');
  const [toPrice, setToPrice] = useState('');
  const [fValue, setFromValue] = useState('');
  const [tValue, setToValue] = useState('');

  const {
    percentageProgress,
    setPercentageProgress,
    floatingRate,
    fixedRate,
    fToken,
    setFromToken,
    tToken,
    setToToken,
    fromPrice,
    toPrice,
    fValue,
    setFromValue,
    tValue,
    networkFee,
    serviceFee,
    benderyAddress,
    setBenderyAddress,
    userAddress,
    setUserAddress,
    exchangeRate,
    fTitle,
    tTitle,
  } = props;

  floatingRate = { floatingRate };
  fixedRate = { fixedRate };
  fToken = { fToken };
  setFromToken = { setFromToken };
  tToken = { tToken };
  setToToken = { setToToken };
  fromPrice = { fromPrice };
  toPrice = { toPrice };
  fValue = { fValue };
  setFromValue = { setFromValue };
  tValue = { tValue };
  networkFee = { networkFee };
  serviceFee = { serviceFee };
  benderyAddress = { benderyAddress };
  setBenderyAddress = { setBenderyAddress };
  userAddress = { userAddress };
  setUserAddress = { setUserAddress };
  exchangeRate = { exchangeRate };
  fTitle = { fTitle };
  tTitle = { tTitle };

  //====={use source data to reset values here e.g booking app approach like in placeForm }==============
  return (
    <>
      {percentageProgress === 1 && (
        <Exchange1of4
          percentageProgress={percentageProgress}
          setPercentageProgress={setPercentageProgress}
        />
      )}
      {percentageProgress === 2 && (
        <Exchange2of4
          percentageProgress={percentageProgress}
          setPercentageProgress={setPercentageProgress}
        />
      )}
      {percentageProgress === 3 && (
        <Exchange3of4
          percentageProgress={percentageProgress}
          setPercentageProgress={setPercentageProgress}
        />
      )}
      {percentageProgress === 4 && (
        <Exchange4of4
          percentageProgress={percentageProgress}
          setPercentageProgress={setPercentageProgress}
        />
      )}
      {percentageProgress === 5 && (
        <Exchange5of5
          percentageProgress={percentageProgress}
          setPercentageProgress={setPercentageProgress}
        />
      )}
    </>
  );
};
