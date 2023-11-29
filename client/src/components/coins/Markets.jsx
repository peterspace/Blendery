import useAxios from '../../hooks/useAxios';
import useFetch from '../../hooks/useFetch';

import Coin from './Coin';
import Skeleton from './Skeleton';

import { useState, useEffect } from 'react';

export const MarketsTitle = (props) => {
  const { mode } = props;
  return (
    <div
      className={`gap-6 flex flex-row font-light border border-indigo-600 border-b ${
        mode === true ? 'text-black' : 'text-white'
      }`}
    >
      <span className="ml-4 flex items-center w-[25%] text-center">
        {' '}
        <p className="font-semibold">Name</p>
      </span>
      <span className="flex items-center w-[25%] text-center">
        {' '}
        <p className="font-semibold">Price</p>
      </span>
      <span className={`flex items-center gap-1 w-[25%]`}>
        <p className="font-semibold">24hr</p>
      </span>
      <div className="hidden sm:block w-[25%]">
        <p className="font-semibold">Market Cap</p>
      </div>
    </div>
  );
};

const Markets = (props) => {
  const { setIdx, mode } = props;
  //======{using Axios Api}============================
  // const { response, loading } = useAxios(
  //   'coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
  // );
  //======{using Fetch Api}============================
  const { response, loading } = useFetch(
    'coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
  );
  // console.log({ response: response });

  if (loading) {
    return (
      <div className="wrapper-container mt-8">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-8 w-full mt-2" />
        <Skeleton className="h-8 w-full mt-2" />
        <Skeleton className="h-8 w-full mt-2" />
        <Skeleton className="h-8 w-full mt-2" />
        <Skeleton className="h-8 w-full mt-2" />
        <Skeleton className="h-8 w-full mt-2" />
        <Skeleton className="h-8 w-full mt-2" />
      </div>
    );
  }

  // useEffect(() => {
  //   if (response) {
  //     localStorage.setItem('tokensData', JSON.stringify(response));
  //   }
  // }, [response]);

  async function getCryptoData() {
    if (response) {
      localStorage.setItem('tokensData', JSON.stringify(response));
    }
  }

  return (
    // <section className="flex mt-8 flex-col gap-[8px] rounded-lg p-2 outline outline-lightslategray-300 outline-[1px]">
    // <section className="flex mt-8 flex-col gap-[8px] p-2">
    <section
      className={`flex flex-col rounded h-full ${
        mode === true
          ? 'bg-white'
          : 'bg-bgDark outline outline-bgDarkOutline outline-[1px]'
      }`}
    >
      <div
        className={`flex flex-row justify-center text-lg font-sans font-bold py-4 ${
          mode === true ? 'text-bgPrimary' : 'text-white'
        }`}
      >
        {'Markets'}
      </div>
      <div
        className={`flex w-full h-px ${
          mode === true ? 'bg-lightslategray-300' : 'bg-darkslategray-400'
        }`}
      />

      <MarketsTitle mode={mode} />

      <div
        className={`overflow-scroll m-2 flex flex-col max-h-0 ${
          mode === true
            ? 'bg-white outline outline-lightslategray-300 outline-[1px]'
            : 'bg-bgDark outline outline-darkslategray-400 outline-[1px]'
        }`}
      >
        {response &&
          response.map((coin) => (
            <Coin key={coin.id} coin={coin} setIdx={setIdx} mode={mode} />
          ))}
      </div>
    </section>
  );
};

export default Markets;
