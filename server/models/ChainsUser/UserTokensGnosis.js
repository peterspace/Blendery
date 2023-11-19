const mongoose = require('mongoose');
// const AutoIncrement = require('mongoose-sequence')(mongoose)

const userTokensGnosisSchema = new mongoose.Schema(
  {
    walletId: {
      type: mongoose.Schema.Types.ObjectId, // walletId
      ref: 'Wallets',
    },
    symbol: { type: String, default: 'xDAI' },
    name: { type: String, default: 'xDAI' },
    address: {
      type: String,
      default: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    },
    decimals: { type: String, default: '18' },
    logoURI: {
      type: String,
      default:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png',
    },
    tags: [{ type: String, default: 'native' }],
  },
  { timestamps: true }
);


const  UserTokensGnosis = mongoose.model("UserTokensGnosis", userTokensGnosisSchema);
module.exports = UserTokensGnosis;