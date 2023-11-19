const mongoose = require('mongoose');
// const AutoIncrement = require('mongoose-sequence')(mongoose)

const userTokensPolygonMumbaiSchema = new mongoose.Schema(
  {
    walletId: {
      type: mongoose.Schema.Types.ObjectId, // walletId
      ref: 'Wallets',
    },
    symbol: { type: String, default: 'MATIC' },
    name: { type: String, default: 'MATIC' },
    address: {
      type: String,
      default: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    },
    decimals: { type: String, default: '18' },
    logoURI: {
      type: String,
      default:
        'https://tokens.1inch.io/0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0.png',
    },
    tags: [{ type: String, default: 'native' }],
  },
  { timestamps: true }
);

const  UserTokensPolygonMumbai = mongoose.model("UserTokensPolygonMumbai", userTokensPolygonMumbaiSchema);
module.exports = UserTokensPolygonMumbai;