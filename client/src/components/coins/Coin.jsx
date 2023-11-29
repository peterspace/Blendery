import { Link } from 'react-router-dom';
import { TrendingDown, TrendingUp } from '../../icons/icons';
import { currencyFormat } from '../../utils';

const Coin = (props) => {
  const { coin, setIdx, mode } = props;
  return (
    <div className="flex flex-col">
      <div
        className={`cursor-pointer gap-6 flex flex-row font-light p-4 border border-indigo-600 border-b  ${
          mode === true
            ? 'bg-white hover:bg-gray-100 hover:outline hover:outline-lightslategray-300 hover:outline-[1px]'
            : 'bg-bgDarkMode hover:bg-hoverDark hover:outline hover:outline-lightslategray-300 hover:outline-[1px]'
        }`}
        onClick={() => setIdx(coin?.id)}
      >
        <div className="flex flex-row items-center gap-1 w-[25%]">
          <img className="w-6" src={coin.image} alt={coin.name} />
          <p className={`${mode === true ? 'text-black' : 'text-white'}`}>
            {coin.name}
          </p>
          <span
            className={`text-xs ${mode === true ? 'text-black' : 'text-white'}`}
          >
            ({coin.symbol})
          </span>
        </div>
        <span
          className={`flex items-center w-[25%] text-center ${
            mode === true ? 'text-black' : 'text-white'
          }`}
        >
          {currencyFormat(coin.current_price)}
        </span>
        <span
          className={`flex items-center gap-1 w-[25%] ${
            coin.price_change_percentage_24h < 0
              ? 'text-red-400'
              : 'text-green-400'
          }`}
        >
          {coin.price_change_percentage_24h < 0 ? (
            <TrendingDown />
          ) : (
            <TrendingUp />
          )}
          {coin.price_change_percentage_24h}
        </span>
        <div
          className={`hidden sm:block w-[25%] ${
            mode === true ? 'text-black' : 'text-white'
          }`}
        >
          <span>{currencyFormat(coin.market_cap)}</span>
        </div>
      </div>
      <div
        className={`flex w-full h-px ${
          mode === true ? 'bg-lightslategray-300' : 'bg-darkslategray-400'
        }`}
      />
    </div>

    // </Link>
  );
};

export default Coin;
