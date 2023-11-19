const mongoose = require('mongoose');
// const AutoIncrement = require('mongoose-sequence')(mongoose)

const chainsKlaytnSchema = new mongoose.Schema(
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


const ChainsKlaytn = mongoose.model("ChainsKlaytn", chainsKlaytnSchema);
module.exports = ChainsKlaytn;