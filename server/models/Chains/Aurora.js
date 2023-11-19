const mongoose = require('mongoose');
// const AutoIncrement = require('mongoose-sequence')(mongoose)

const chainsAuroraSchema = new mongoose.Schema(
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



const ChainsAurora = mongoose.model("ChainsAurora", chainsAuroraSchema);
module.exports = ChainsAurora;
