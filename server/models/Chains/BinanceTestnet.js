const mongoose = require('mongoose');
// const AutoIncrement = require('mongoose-sequence')(mongoose)

const chainsBinanceTestnetSchema = new mongoose.Schema(
  {
    symbol: String,
    name: String,
    address: String,
    decimals: String,
    logoURI: String,
    tags: [String],
  },
  { timestamps: true }
);



const ChainsBinanceTestnet = mongoose.model("ChainsBinanceTestnet", chainsBinanceTestnetSchema);
module.exports = ChainsBinanceTestnet;