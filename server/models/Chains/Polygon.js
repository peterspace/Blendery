const mongoose = require('mongoose');
// const AutoIncrement = require('mongoose-sequence')(mongoose)

const chainsPolygonSchema = new mongoose.Schema(
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


const ChainsPolygon = mongoose.model("ChainsPolygon", chainsPolygonSchema);
module.exports = ChainsPolygon;