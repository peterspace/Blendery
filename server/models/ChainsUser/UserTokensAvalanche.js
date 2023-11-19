const mongoose = require('mongoose');

const userTokensAvalancheSchema = new mongoose.Schema(
  {
    walletId: {
      type: mongoose.Schema.Types.ObjectId, // walletId
      ref: 'Wallets',
    },
    symbol: { type: String, default: 'AVAX' },
    name: { type: String, default: 'Avalanche' },
    address: {
      type: String,
      default: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    },
    decimals: { type: String, default: '18' },
    logoURI: {
      type: String,
      default:
        'https://tokens.1inch.io/0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7.png',
    },
    tags: [{ type: String, default: 'native' }],
  },
  { timestamps: true }
);


const  UserTokensAvalanche = mongoose.model("UserTokensAvalanche", userTokensAvalancheSchema);
module.exports = UserTokensAvalanche;