const mongoose = require("mongoose");

const storeRecoverySchema = new mongoose.Schema(
  {
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   // required: true,
    //   ref: "User",
    // },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: "user",
    },
    //======={for verification}=============
    storeId: String, // like pin
    currency: String, // like pin
    cryptoCurrency: String, // like pin
    bitcoinAddress: String, // like pin
    tronAddress: String, // like pin
    provider: String,
    // role:String,
  },
  { timestamps: true }
);

const StoreRecovery = mongoose.model("StoreRecovery", storeRecoverySchema);
module.exports = StoreRecovery;
