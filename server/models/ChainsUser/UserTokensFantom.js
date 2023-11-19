const mongoose = require('mongoose');
// const AutoIncrement = require('mongoose-sequence')(mongoose)

const userTokensFantomSchema = new mongoose.Schema(
  {
    walletId: {
      type: mongoose.Schema.Types.ObjectId, // walletId
      ref: 'Wallets',
    },
    symbol: { type: String, default: 'FTM' },
    name: { type: String, default: 'Fantom Token' },
    address: {
      type: String,
      default: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    },
    decimals: { type: String, default: '18' },
    logoURI: {
      type: String,
      default:
        'https://tokens.1inch.io/0x4e15361fd6b4bb609fa63c81a2be19d873717870.png',
    },
    tags: [{ type: String, default: 'native' }],
  },
  { timestamps: true }
);


const  UserTokensFantom = mongoose.model("UserTokensFantom", userTokensFantomSchema);
module.exports = UserTokensFantom;