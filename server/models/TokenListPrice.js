const mongoose = require('mongoose');

const tokenListPriceSchema = new mongoose.Schema(
  {
    id: String,
    symbol: String,
    name: String,
    image: String,
    current_price: Number,
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
    decimals: Number,
    address: String,
    chainId: String,
    price_symbol: String,
    type: String, // new // ERC20, TRC20
    tokenUrl: String, // new from cloudinary
    chain: String,
  },
  { timestamps: true }
);

const TokenListPrice = mongoose.model('TokenListPrice', tokenListPriceSchema);
module.exports = TokenListPrice;
