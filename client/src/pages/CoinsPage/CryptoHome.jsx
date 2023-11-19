import Markets from "../../components/coins/Markets"
import Trending from "../../components/coins/Trending"

const CryptoHome = () => {
  return (
    <div className="wrapper-container">
      <Trending />
      <Markets />
    </div>
  )
}

export default CryptoHome