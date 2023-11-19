import { Link } from 'react-router-dom';
import { TrendingDown, TrendingUp } from '../../icons/icons';
import { currencyFormat } from '../../utils';

// setIdx
// const Coin = ({ coin }) => {
// console.log(coin);
const CoinsHighlights = (props) => {
  const { coin, setIdx } = props;
  return (
    <div
      className={`gap-6 flex flex-row font-light p-4 border border-indigo-600 border-b hover:bg-gray-100 hover:outline hover:outline-lightslategray-300 hover:outline-[1px]`}
      onClick={() => setIdx(coin?.id)}
    >
      <div className="flex flex-row items-center gap-1 w-[25%]">
        <img className="w-6" src={coin.image} alt={coin.name} />
        <span className="text-xs">({coin.symbol})</span>
      </div>
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
    </div>
    // </Link>
  );
};

export default CoinsHighlights;
