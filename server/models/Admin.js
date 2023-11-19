const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema(
  {
    accountId: String,
    provider: String,
    username: String,
    name: String,
    businessName: String,
    // email: { type: 'String', unique: true },
    email: { type: String },
    password: String,
    pic: {
      type: 'String',
      default:
        'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
    },
    photo: {
      type: 'String',
      default:
        'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
    },
    isAdmin: {
      type: Boolean,
      // required: true,
      default: false,
    },
    level: {
      type: Number,
      default: 0, //0 meanse user, admin begins from 1-5
    },
    supervisor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      // default:
    },
    role: {
      type: String,
      default: 'User', // "User" and "Admin"
      // default:
    },
    walletAddress: {
      type: String,
      default: 'Ox0',
    },
    country: String,
    state: String,
    city: String,
    tokens: [String], // token symbol: "USDT", "USDC", "DAI", "TUSD",
    fiat: [String], // fiat: "USD", "RUB", "GBP",
    userWallets: [
      {
        walletName: String,
        walletType: String, // "Bitcoin", "Ethereum", "Tron" // "Ethereum relates to all EVM compatible chains, including Binance and Polygon"
        walletId: String,
        walletAddress: String,
      },
    ],
    accountId: String, // profile.id,
    provider: String, //'facebook',
  },
  { timestamps: true }
);

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
