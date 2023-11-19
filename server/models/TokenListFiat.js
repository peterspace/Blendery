const mongoose = require('mongoose');

const tokenListFiatSchema = new mongoose.Schema(
  {
    id: String,
    symbol: String,
    price_symbol: String,
    name: String,
    unit: String,
    value: Number,
    type: String,
    image: String,
    logoURI: String,
  },
  { timestamps: true }
);

const TokenListFiat = mongoose.model('TokenListFiat', tokenListFiatSchema);
module.exports = TokenListFiat;
