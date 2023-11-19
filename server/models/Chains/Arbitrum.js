const mongoose = require('mongoose');
//const AutoIncrement = require('mongoose-sequence')(mongoose)

const chainsArbitrumSchema = new mongoose.Schema(
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

// chainsArbitrumSchema .plugin(AutoIncrement, {
//   inc_field: 'ticket',
//   id: 'ticketNums',
//   start_seq: 500
// })

const ChainsArbitrum = mongoose.model("ChainsArbitrum", chainsArbitrumSchema);
module.exports = ChainsArbitrum;
