const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema(
  {
    // for testing, meaning that a user can only have multiple wallet account
    user: {
      type: mongoose.Schema.Types.ObjectId, // userId
      ref: 'User',
    },
    address: String, // receiver
    receiver: String, // receiver
    sender: String,
    amount: String,
    tokenAddress: String,
    tokenDecimals: String,
    tokenSymbol: String,
    transactionHash: String,
    status: { type: String, default: 'pending' }, // pending, paid, completed, cancel, active, inActive
    // shipped: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  { timestamps: true }
);

const Orders = mongoose.model('Orders', ordersSchema);
module.exports = Orders;
