const mongoose = require('mongoose');
// const AutoIncrement = require('mongoose-sequence')(mongoose)

const chainsOptimismSchema = new mongoose.Schema(
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

const ChainsOptimism = mongoose.model("ChainsOptimism", chainsOptimismSchema);
module.exports = ChainsOptimism;