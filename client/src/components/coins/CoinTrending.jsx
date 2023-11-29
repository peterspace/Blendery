import { Link } from 'react-router-dom';

const CoinTrending = (props) => {
  const { coin, setIdx, mode } = props;
  return (
    <div className="flex flex-col">
      <div
        className={`cursor-pointer flex flex-col font-light p-4 border border-indigo-600 border-b  ${
          mode === true
            ? 'bg-white hover:bg-gray-100 hover:outline hover:outline-lightslategray-300 hover:outline-[1px]'
            : 'bg-bgDarkMode hover:bg-hoverDark hover:outline hover:outline-lightslategray-300 hover:outline-[1px]'
        }`}
        onClick={() => setIdx(coin?.id)}
      >
        {/* <div className="flex flex-row justify-between w-[280px]"> */}
        <div className="cursor-pointer flex flex-row justify-between items-center w-[250px]">
          <div className="flex flex-row items-center gap-2">
            <div className="cursor-pointer flex flex-col items-start">
              <div
                className={`text-base font-sans font-medium leading-[24px] inline-block ${
                  mode === true ? 'text-black' : 'text-gray-100'
                }`}
              >
                {coin.score + 1}
              </div>
            </div>
            <div className="flex justify-center items-center flex-shrink-0">
              <img
                className="w-[40px] h-$ shrink-0 overflow-hidden rounded-full"
                src={coin.small}
                alt={coin.name}
              />
            </div>
            <div className="flex flex-row gap-1">
              <div
                className={`text-base font-sans font-medium leading-[24px] inline-block ${
                  mode === true ? 'text-black' : 'text-gray-100'
                }`}
              >
                {coin.name}
              </div>
              <div
                className={`text-xs font-sans font-medium leading-[24px] inline-block ${
                  mode === true ? 'text-black' : 'text-gray-100'
                }`}
              >
                ({coin.symbol})
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`flex w-full h-px ${
          mode === true ? 'bg-lightslategray-300' : 'bg-darkslategray-400'
        }`}
      />
    </div>
  );
};

export default CoinTrending;
