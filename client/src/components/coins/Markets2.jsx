import useAxios from '../../hooks/useAxios';
import useFetch from '../../hooks/useFetch';
import Coin from './Coin';
import Skeleton from './Skeleton';

import { useState, useEffect } from 'react';

const Markets = (props) => {
  const { setIdx } = props;
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
    <section className="mt-8">
      {/* <div
        className="cursor-pointer m-2 flex flex-row justify-center items-center p-3 rounded-lg text-blue-600 shadow-md outline outline-blue-600 outline-[1px]"
        onClick={getCryptoData}
      >
        crypto data
      </div> */}
      <h1 className="text-2xl mb-2">Markets</h1>
      {/* <div className="m-2 flex flex-col p-3 rounded-lg text-blue-600 shadow-md outline outline-blue-600 outline-[1px] h-[50vh] overflow-scroll"> */}
      <div className="m-2 flex flex-col p-3 rounded-lg bg-white shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] h-[50vh] overflow-scroll">
        {response &&
          response.map((coin) => (
            <Coin key={coin.id} coin={coin} setIdx={setIdx} />
          ))}
      </div>
    </section>
  );
};

export default Markets;
//rounded-lg bg-white shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)]