const mongoose = require('mongoose');
// const AutoIncrement = require('mongoose-sequence')(mongoose)

const userTokensKlaytnSchema = new mongoose.Schema(
  {
    walletId: {
      type: mongoose.Schema.Types.ObjectId, // walletId
      ref: 'Wallets',
    },
    symbol: { type: String, default: 'KLAY' },
      name: { type: String, default: 'Klaytn' },
      address: {
        type: String,
        default: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
      },
      decimals: { type: String, default: '18' },
      logoURI: {
        type: String,
        default:
          'https://tokens.1inch.io/0xe4f05a66ec68b54a58b17c22107b02e0232cc817.png',
      },
      tags: [{ type: String, default: 'native' }],
  },
  { timestamps: true }
);


const  UserTokensKlaytn = mongoose.model("UserTokensKlaytn", userTokensKlaytnSchema);
module.exports = UserTokensKlaytn;