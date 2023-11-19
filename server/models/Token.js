const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema(
  {
    id: String,
    symbol: String,
    name: String,
    price_symbol:String,
    token_type: String, // new // ERC20, TRC20
    image: String,
    tokenUrl: String, // new from cloudinary
    current_price: String,
    market_cap: String,
    market_cap_rank: String,
    fully_diluted_valuation: String,
    total_volume: String,
    high_24h: String,
    low_24h: String,
    price_change_24h: String,
    price_change_percentage_24h: String,
    market_cap_change_24h: String,
    market_cap_change_percentage_24h: String,
    circulating_supply: String,
    total_supply: String,
    max_supply: String,
    ath: String,
    ath_change_percentage: String,
    ath_date: Date,
    atl: String,
    atl_change_percentage: String,
    atl_date: Date,
    roi: {
      type: mongoose.Schema.Types.Mixed,
    },
    last_updated: Date,
  },
  { timestamps: true }
);

const Token = mongoose.model('Token', tokenSchema);
module.exports = Token;


// {
//   "id": "rocket-pool-eth",
//   "symbol": "reth",
//   "name": "Rocket Pool ETH",
//   "image": "https://assets.coingecko.com/coins/images/20764/large/reth.png?1696520159",
//   "current_price": 1683,
//   "market_cap": 900072519,
//   "market_cap_rank": 46,
//   "fully_diluted_valuation": 900072519,
//   "total_volume": 5546751,
//   "high_24h": 1708.12,
//   "low_24h": 1675.81,
//   "price_change_24h": -24.716909735511308,
//   "price_change_percentage_24h": -1.44736,
//   "market_cap_change_24h": -14706005.049885035,
//   "market_cap_change_percentage_24h": -1.6076,
//   "circulating_supply": 536278.747097551,
//   "total_supply": 536274.747097551,
//   "max_supply": null,
//   "ath": 4814.31,
//   "ath_change_percentage": -65.03505,
//   "ath_date": "2021-12-01T08:03:50.749Z",
//   "atl": 887.26,
//   "atl_change_percentage": 89.72057,
//   "atl_date": "2022-06-18T20:55:45.957Z",
//   "roi": null,
//   "last_updated": "2023-10-12T12:15:37.990Z",
//   "decimals": 18,
//   "address": "0x9bcef72be871e61ed4fbbc7630889bee758eb81d",
//   "chainId": "10"
// },