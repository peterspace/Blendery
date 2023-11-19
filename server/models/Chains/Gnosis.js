const mongoose = require('mongoose');
// const AutoIncrement = require('mongoose-sequence')(mongoose)

const chainsGnosisSchema = new mongoose.Schema(
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



const ChainsGnosis = mongoose.model("ChainsGnosis", chainsGnosisSchema);
module.exports = ChainsGnosis;
