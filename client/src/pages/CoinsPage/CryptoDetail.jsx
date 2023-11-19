import CoinDetail from "../../components/coins/CoinDetail"
import HistoryChart from "../../components/coins/HistoryChart"


const CryptoDetail = () => {
  return (
    <div className="wrapper-container mt-10">
      <HistoryChart />
      <CoinDetail />
    </div>
  )
}

export default CryptoDetail