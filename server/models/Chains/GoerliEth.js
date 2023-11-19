const mongoose = require('mongoose');
// const AutoIncrement = require('mongoose-sequence')(mongoose)

const chainsGoerliEthSchema = new mongoose.Schema(
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



const ChainsGoerliEth = mongoose.model("ChainsGoerliEth", chainsGoerliEthSchema);
module.exports = ChainsGoerliEth;