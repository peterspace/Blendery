const mongoose = require('mongoose');
// const AutoIncrement = require('mongoose-sequence')(mongoose)

const chainsAvalancheSchema = new mongoose.Schema(
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



const ChainsAvalanche = mongoose.model("ChainsAvalanche", chainsAvalancheSchema);
module.exports = ChainsAvalanche;


