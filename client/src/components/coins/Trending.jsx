import useAxios from '../../hooks/useAxios';
import useFetch from '../../hooks/useFetch';
import CoinTrending from './CoinTrending';
import Skeleton from './Skeleton';

const Trending = (props) => {
  const { setIdx, mode } = props;
  //======{using Axios Api}============================
  // const { response, loading } = useAxios('search/trending');
  //======{using Fetch Api}============================
  const { response, loading } = useFetch('search/trending');

  // const { response, loading } = useFetch(`coins/bitcoin`);
  // const { response, loading } = useFetch(`coins/${id}`);

  // async function getPriceData(id){
  //   // const { response, loading } = useFetch(`coins/${id}`);

  //   const data = useFetch(`coins/${id}`);

  //   return { response, loading }
  // }

  if (loading) {
    return (
      <div className="wrapper-container mt-8">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-8 w-full mt-2" />
        <Skeleton className="h-8 w-full mt-2" />
        <Skeleton className="h-8 w-full mt-2" />
        <Skeleton className="h-8 w-full mt-2" />
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col rounded shadow-lg w-[300px] h-full ${
        mode === true
          ? 'bg-white outline outline-lightslategray-300 outline-[1px]'
          : 'bg-bgDarkMode outline outline-lightslategray-300 outline-[2px]'
      }`}
    >
      <div
        className={`mt-[24px] ml-4 text-lg font-sans font-bold inline-block ${
          mode === true ? 'text-bgPrimary' : 'text-white'
        }`}
      >
        {'Trending'}
      </div>
      <div
        className={`flex w-full h-px mt-6 ${
          mode === true ? 'bg-lightslategray-300' : 'bg-darkslategray-400'
        }`}
      />

      <div className="mt-2 flex flex-col gap-[16px] overflow-scroll max-h-0">
        {response &&
          response.coins.map((coin) => (
            <CoinTrending
              key={coin.item.coin_id}
              coin={coin.item}
              setIdx={setIdx}
              mode={mode}
            />
          ))}
        {/* <UserProfile l={menu[0]} /> */}
      </div>
    </div>
  );
};

export default Trending;
