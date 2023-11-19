const mongoose = require('mongoose');
// const AutoIncrement = require('mongoose-sequence')(mongoose)

const chainsEthereumSchema = new mongoose.Schema(
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


const ChainsEthereum = mongoose.model("ChainsEthereum", chainsEthereumSchema);
module.exports = ChainsEthereum;

