const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema(
  {
    //====={user}==================
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    storeId: String, // like pin
    currency: String, // like pin
    cryptoCurrency: String, // like pin
    bitcoinAddress: String, // like pin
    tronAddress: String, // like pin
    orderNo: String,
    txId: String,
    userAddress: String, // blendery hd child wallet address
    blenderyAddress: String, // blendery hd child wallet address
    blenderyAddressOut: String, // only for exchange

    //========={Transaction}==================

    fToken: {
      type: mongoose.Schema.Types.Mixed,
    },
    tToken: {
      type: mongoose.Schema.Types.Mixed,
    },
    fValue: String,
    tValue: String,
    service: String, // BUYCRYPTO, SELLCRYPTO,
    subService: String,
    youSend: Number,
    youGet: Number,
    networkFee: Number,
    serviceFee: Number,
    processingFee: Number,
    exchangeRate: String,
    pin: String,
    storeId: String,
    hash: String, // "transaction hash for completed transactions"
    blockchainUrl: String, // "tx url for transaction monitoring"
    hashOut: String, // "transaction hash for completed transactions"
    blockchainUrlOut: String, // "tx url for transaction monitoring"
    provider: String, // for card transactions with third party providers
    providerUrl: String, // for card transactions with third party providers
    fallbackUrl: { type: String, default: "" }, // frontend url/fallback ==> not available
    chain: String,
    chainId: { type: String, default: "1" }, // only for evm chains, to get the network rpc,
    timeLeft: {
      type: Date,
    },
    percentageProgress: Number,
    status: { type: String, default: "Pending" }, // Pending, Paid, Completed, Cancel, Active, inActive
    blenderyStatus: { type: String, default: "Pending" }, // Pending, Paid, Completed, Cancel, Active, inActive
    timeStatus: { type: String, default: "Active" }, // "Active" or "Expired",
    amount: String,
    amountReceived: String,
    amountSent: String,
    totalReceived: String,
    sender: String, // blendery hd child wallet address
    receiver: String, // blendery hd child wallet address
    isAmountMatched: { type: Boolean, default: false },
    networkName: { type: String, default: "Testnet" }, // "Testnet" for bitcoin

    age: {
      type: Date,
    },
    //======================={live chat}==================
    message: { type: mongoose.Schema.Types.ObjectId, ref: "Messages" }, // chat history
    //======================={Admin}==================
    // managerId:String,
    manager: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // responsible admin
    managerPrevious: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // responsible admin
    managerChanged: {
      type: Boolean,
      default: false,
    },
    managersInfo: Number, // if manager was changed on a trasaction, we should know the number of managers

    //================{New}========================================
  },
  {
    timestamps: true,
  }
);

const Store = mongoose.model("Store", storeSchema);
module.exports = Store;
