const mongoose = require('mongoose');

const walletsAdminSchema = new mongoose.Schema(
  {
    // for testing, meaning that a user can only have multiple wallet account
    user: {
      type: mongoose.Schema.Types.ObjectId, // userId
      ref: 'User',
    },
    email: String, // ony admin
    // for production, meaning that a user can only have one wallet account
    // user: {
    //   type: mongoose.Schema.Types.ObjectId, // userId
    //   ref: 'User',
    //   required: true,
    //   unique: true,
    // },
    accountNumber: {
      type: Number,
      default: 0,
    },
    password: {
      type: String,
      // required: true,
    },
    bitcoin: {
      hdMasterAccounts: {
        accountName: {
          type: String,
          default: 'Master',
        },
        address: String,
        privateKey: String, // hashed privateKey
        hdPrivateKey: {
          // use encrypted form
          type: String,
        },
        hdPhrase: {
          // use encrypted form
          type: String,
        },
        btc: {
          name: {
            type: String,
            default: 'Bitcoin',
          },
          address: {
            type: String,
            default: '',
          },
          decimals: {
            type: Number,
            default: 8,
          },
          balance: {
            type: Number,
            default: 0,
          },
          symbol: {
            type: String,
            default: 'btc',
          },
        },
      },
      hdAccounts: [
        {
          accountName: String,
          address: String,
          privateKey: String, // hashed privateKey
          btc: {
            name: {
              type: String,
              default: 'Bitcoin',
            },
            address: {
              type: String,
              default: '',
            },
            decimals: {
              type: Number,
              default: 8,
            },
            balance: {
              type: Number,
              default: 0,
            },
            symbol: {
              type: String,
              default: 'btc',
            },
          },
        },
      ],
    },
    tron: {
      hdMasterAccounts: {
        accountName: {
          type: String,
          default: 'Master',
        },
        address: String,
        privateKey: String, // hashed privateKey
        hdPrivateKey: {
          // use encrypted form
          type: String,
        },
        hdPhrase: {
          // use encrypted form
          type: String,
        },
        trx: {
          name: {
            type: String,
            default: 'TRON',
          },
          address: {
            type: String,
            default: '',
          },
          decimals: {
            type: Number,
            default: 6,
          },
          balance: {
            type: Number,
            default: 0,
          },
          symbol: {
            type: String,
            default: 'trx',
          },
        },
        usdt: {
          name: {
            type: String,
            default: 'Tether',
          },
          address: {
            type: String,
            // default: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t', //mainnet
            default: 'TLXYTvdWdbTbeBS18JSSmyAe6S7wJ3BpJb', //testnet
          },
          decimals: {
            type: Number,
            default: 6,
          },
          balance: {
            type: Number,
            default: 0,
          },
          symbol: {
            type: String,
            default: 'usdt',
          },
        },
      },
      hdAccounts: [
        {
          accountName: String,
          address: String,
          privateKey: String, // hashed privateKey
          phrase: {
            // use encrypted form
            type: String,
          },
          trx: {
            name: {
              type: String,
              default: 'TRON',
            },
            address: {
              type: String,
              default: '',
            },
            decimals: {
              type: Number,
              default: 6,
            },
            balance: {
              type: Number,
              default: 0,
            },
            symbol: {
              type: String,
              default: 'trx',
            },
          },
          usdt: {
            name: {
              type: String,
              default: 'Tether',
            },
            address: {
              type: String,
              // default: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t', //mainnet
              default: 'TLXYTvdWdbTbeBS18JSSmyAe6S7wJ3BpJb', //testnet
            },
            decimals: {
              type: Number,
              default: 6,
            },
            balance: {
              type: Number,
              default: 0,
            },
            symbol: {
              type: String,
              default: 'usdt',
            },
          },
        },
      ],
    },
    evm: {
      hdMasterAccounts: {
        accountName: {
          type: String,
          default: 'Master',
        },
        address: String,
        privateKey: String, // hashed privateKey
        hdPrivateKey: {
          // use encrypted form
          type: String,
        },
        hdPhrase: {
          // use encrypted form
          type: String,
        },
        eth: {
          name: {
            type: String,
            default: 'Ethereum',
          },
          address: {
            type: String,
            default: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
          },
          decimals: {
            type: Number,
            default: 18,
          },
          balance: {
            type: Number,
            default: 0,
          },
          symbol: {
            type: String,
            default: 'eth',
          },
        },
        usdt: {
          name: {
            type: String,
            default: 'Tether',
          },
          address: {
            type: String,
            // default: '0xdac17f958d2ee523a2206206994597c13d831ec7', //mainnet
            default: '0x0F29978575fe11D9F727f0D13F558ebbc55Af94A', //testnet
          },
          decimals: {
            type: Number,
            default: 6,
          },
          balance: {
            type: Number,
            default: 0,
          },
          symbol: {
            type: String,
            default: 'usdt',
          },
        },
      },
      hdAccounts: [
        {
          accountName: String,
          address: String,
          privateKey: String, // hashed privateKey
          phrase: {
            // use encrypted form
            type: String,
          },
          eth: {
            name: {
              type: String,
              default: 'Ethereum',
            },
            address: {
              type: String,
              default: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
            },
            decimals: {
              type: Number,
              default: 18,
            },
            balance: {
              type: Number,
              default: 0,
            },
            symbol: {
              type: String,
              default: 'eth',
            },
          },
          usdt: {
            name: {
              type: String,
              default: 'Tether',
            },
            address: {
              type: String,
              // default: '0xdac17f958d2ee523a2206206994597c13d831ec7', //mainnet
              default: '0x0F29978575fe11D9F727f0D13F558ebbc55Af94A', //testnet
            },
            decimals: {
              type: Number,
              default: 6,
            },
            balance: {
              type: Number,
              default: 0,
            },
            symbol: {
              type: String,
              default: 'usdt',
            },
          },
        },
      ],
    },
    lastAccountBitcoin: { type: Number, default: 0 },
    lastAccountTron: { type: Number, default: 0 },
    lastAccountEVM: { type: Number, default: 0 },

    limit: {
      type: Number,
      default: 1, /// minimum of 1 hdWallet
    },
  },
  { timestamps: true }
);

const WalletsAdmin = mongoose.model('WalletsAdmin', walletsAdminSchema);
module.exports = WalletsAdmin;
