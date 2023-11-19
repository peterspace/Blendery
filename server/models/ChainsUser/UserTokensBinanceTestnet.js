const mongoose = require('mongoose');
// const AutoIncrement = require('mongoose-sequence')(mongoose)

const userTokensBinanceTestnetSchema = new mongoose.Schema(
  {
    walletId: {
      type: mongoose.Schema.Types.ObjectId, // walletId
      ref: 'Wallets',
    },
    symbol: { type: String, default: 'TBNB' },
    name: { type: String, default: 'TBNB' },
    address: {
      type: String,
      default: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    },
    decimals: { type: String, default: '18' },
    logoURI: {
      type: String,
      default:
        'https://tokens.1inch.io/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c_1.png',
    },
    tags: [{ type: String, default: 'native' }],
  },
  { timestamps: true }
);


const  UserTokensBinanceTestnet = mongoose.model("UserTokensBinanceTestnet", userTokensBinanceTestnetSchema);
module.exports = UserTokensBinanceTestnet;