const mongoose = require('mongoose');
// const AutoIncrement = require('mongoose-sequence')(mongoose)

const chainsBinanceSchema = new mongoose.Schema(
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


const ChainsBinance = mongoose.model("ChainsBinance", chainsBinanceSchema);
module.exports = ChainsBinance;
