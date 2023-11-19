const mongoose = require('mongoose');
// const AutoIncrement = require('mongoose-sequence')(mongoose)

const userTokensGoerliEthSchema = new mongoose.Schema(
  {
    walletId: {
      type: mongoose.Schema.Types.ObjectId, // walletId
      ref: 'Wallets',
    },
    symbol: { type: String, default: 'ETH' },
    name: { type: String, default: 'Ethereum' },
    address: {
      type: String,
      default: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    },
    decimals: { type: String, default: '18' },
    logoURI: {
      type: String,
      default:
        'https://tokens.1inch.io/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png',
    },
    tags: [{ type: String, default: 'native' }],
  },
  { timestamps: true }
);

const UserTokensGoerliEth = mongoose.model(
  'UserTokensGoerliEth',
  userTokensGoerliEthSchema
);
module.exports = UserTokensGoerliEth;
