const mongoose = require('mongoose');
// const AutoIncrement = require('mongoose-sequence')(mongoose)

const chainsPolygonMumbaiSchema = new mongoose.Schema(
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


const ChainsPolygonMumbai = mongoose.model("ChainsPolygonMumbai", chainsPolygonMumbaiSchema);
module.exports = ChainsPolygonMumbai;