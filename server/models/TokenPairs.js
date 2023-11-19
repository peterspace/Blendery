const mongoose = require('mongoose');

const tokenPairsSchema = new mongoose.Schema(
  {
    exchange: {
      type: mongoose.Schema.Types.Mixed,
    },
    buycard: {
      type: mongoose.Schema.Types.Mixed,
    },
    buycash: {
      type: mongoose.Schema.Types.Mixed,
    },
    sellcard: {
      type: mongoose.Schema.Types.Mixed,
    },
    sellcash: {
      type: mongoose.Schema.Types.Mixed,
    },
    defi: {
      type: mongoose.Schema.Types.Mixed,
    },
    allTokens: {
      type: mongoose.Schema.Types.Mixed,
    },

    last_updated: Date,
  },
  { timestamps: true }
);

const TokenPairs = mongoose.model('TokenPairs', tokenPairsSchema);
module.exports = TokenPairs;
