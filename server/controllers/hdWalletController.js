//=================={database schema's}===============================================
const User = require('../models/User.js');
const Wallets = require('../models/Wallets.js');
const WalletsAdmin = require('../models/WalletsAdmin.js');
const Orders = require('../models/Orders.js');
const Transaction = require('../models/transactionModel');
const TransactionChecker = require('./TransactionChecker.js');
const axios = require('axios');
//=================={cryptographic security}===============================================
const crypto = require('crypto');
// Generate a random initialization vector (IV)
const algorithm = 'aes-256-cbc'; // AES with a 256-bit key in CBC mode

const bcrypt = require('bcrypt');
//=================={bitcore library: for bitcoin wallets}===============================================
const bitcore = require('bitcore-lib');
const { mainnet, testnet } = require('bitcore-lib/lib/networks');
//======{Bitcoin Network}==================================
// const network = mainnet // live network
const network = testnet; // test network
//=================================================

// const mnemonic = require('bitcore-mnemonic'); // new
// Generate a new random mnemonic (12 words)
// const mnemonic = new bitcore.Mnemonic();
const bip39 = require('bip39');
const bip32 = require('bip32');
const mnemonic = bip39.generateMnemonic();

// const secretKey = 'your-secret-key';
const secretKey = process.env.SecretKey;
const passphrase = process.env.SecretKey;

//=================={ether js library: for evm wallets}===============================================
const { ethers } = require('ethers');
const erc20 = require('./wallet/contracts/erc20.js');
const ERC20Abi = erc20;

const Web3 = require('web3');
const TronWeb = require('tronweb');
//=================={TronWeb library: for evm wallets}===============================================
//================{Private key}================================
const tronPrivateKey = crypto.randomBytes(32).toString('hex');
//======================={MAINNET TRON}========================================
// const tronDefaultPrivetkey =
//   'f48568daeaa884e82391c423189bb205654edb925524529757f7081696f78655';
// const tronGridApiKey = '7c2ba8b0-5d4e-42cc-86f9-a82c8c6bb1dd';

// const HttpProvider = TronWeb.providers.HttpProvider;
// const fullNode = new HttpProvider('https://api.trongrid.io');
// const solidityNode = new HttpProvider('https://api.trongrid.io');
// const eventServer = new HttpProvider('https://api.trongrid.io');
// const privateKey = tronDefaultPrivetkey;
// const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);
// tronWeb.setHeader({ 'TRON-PRO-API-KEY': tronGridApiKey });
//======================={MAINNET TRON}========================================
// console.log('Private Key', privateKey);
// create new account
// const account = tronWeb.createAccount();

// // Generate the master key from the mnemonic
// const masterKey = TronWeb.hdkey.fromMasterSeed(
//   TronWeb.utils.crypto.getMnemonicToSeedSync(mnemonic)
// );

// const tronWeb1 = new TronWeb({
//   fullHost: 'https://api.trongrid.io', // Replace with your Tron full node endpoint
//   solidityNode: 'https://api.trongrid.io', // Replace with your Tron solidity node endpoint
// });
//======================={NILE TESTNET TRON}========================================
const tronWeb = new TronWeb({
  fullHost: 'https://nile.trongrid.io', // Replace with your Tron full node endpoint
  solidityNode: 'https://nile.trongrid.io', // Replace with your Tron solidity node endpoint
});

//======================={NILE TESTNET TRON}========================================

const tronblockchainUrlMainnet = 'https://tronscan.org/#/transaction'; // goerli test net
const tronblockchainUrlNile = 'https://nile.tronscan.org/#/transaction'; // goerli test net
const tronblockchainUrlEndpoint = tronblockchainUrlNile;
//server/controllers/hdWalletController.js

//=================={error handling}===============================================
const asyncHandler = require('express-async-handler');

const etherScanApiKey = 'your-etherscan-api-key';

const usdtAddressTestTron = 'TLXYTvdWdbTbeBS18JSSmyAe6S7wJ3BpJb';
const usdtAddressMainnetTron = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t';

const usdtAddressTestEthereum = '0x0F29978575fe11D9F727f0D13F558ebbc55Af94A';
const usdtAddressMainnetEthereum = '0xdac17f958d2ee523a2206206994597c13d831ec7';

const usdtAddressTron = usdtAddressTestTron;
const usdtAddressEthereum = usdtAddressTestEthereum;

const {
  createTransaction,
  getAccountInfoByAddress,
  getOnlyConfirmedTransactiosnToAddress,
  getOnlyConfirmedTransactiosnFromAddress,
  getOnlyConfirmedTransactiosnToAddressTRC20,
  getOnlyConfirmedTransactiosnFromAddressTRC20,
  getTransactionByQuery,
  getTransactionsToAddressExplorer,
  getTransactionsFromAddressExplorer,
  getTransactionsInfoExplorer,
} = require('./tronScanController.js');

const {
  getNativeTransactionToBlendery,
  getNativeTransactionToUser,
  getERC20TransactionToBlendery,
  getERC20TransactionToUser,
} = require('./etherScanController.js');

const {
  getBitcoinNativeTransactionToUser,
  getBitcoinNativeTransactionToBlenderyWithUserAddress,
  getBitcoinNativeTransactionToBlenderyWithOutUserAddress,
} = require('./bitcoinScanController.js');
const { recoverPublicKey } = require('@ethersproject/signing-key');
// const { ethereum } = require('../../client/src/assets/networkOptions/index.js');
//===================={UserTokens}=========================================
//=====================================================================================

// Encrypt a private key
const encryptPrivateKey = (privateKey) => {
  const cipher = crypto.createCipher(algorithm, secretKey);
  let encryptedPrivateKey = cipher.update(privateKey, 'utf8', 'hex');
  encryptedPrivateKey += cipher.final('hex');
  return encryptedPrivateKey;
};

// Decrypt an encrypted private key
const decryptPrivateKey = (encryptedPrivateKey) => {
  const decipher = crypto.createDecipher(algorithm, secretKey);
  let decryptedPrivateKey = decipher.update(encryptedPrivateKey, 'hex', 'utf8');
  decryptedPrivateKey += decipher.final('utf8');
  return decryptedPrivateKey;
};

//=================={createwallet}==============================

async function addBitcoinWallet(mnemonic) {
  // Generate a random BIP-39 mnemonic (12 words by default)
  // const mnemonic = bip39.generateMnemonic();
  // Create an HD wallet using BIP-32 from the mnemonic
  // const seedBuffer = bip39.mnemonicToSeedSync(mnemonic);

  //======{Save Mnemonic phrase as an encrypted asset}==================================
  const hdMnemonic = mnemonic;
  const mnemonicJSON = JSON.stringify(hdMnemonic);
  const encryptedHDMnemonic = encryptPrivateKey(mnemonicJSON); // save as Mnemonic

  //======{Begin to create Bitcoin wallet}==================================

  const seedBuffer = bip39.mnemonicToSeedSync(mnemonic);

  //======={secure HD privateKey}====================================
  // const hdPrivateKey = bitcore.HDPrivateKey.fromSeed(seedBuffer); // by default live network
  const hdPrivateKey = bitcore.HDPrivateKey.fromSeed(seedBuffer, network);
  const hdPrivateKeyJSON = JSON.stringify(hdPrivateKey.toObject());
  // Encrypt the private key before storing it in MongoDB
  const encryptedHDPrivateKey = encryptPrivateKey(hdPrivateKeyJSON);
  const decryptedHdPrivateKeyJSON = decryptPrivateKey(encryptedHDPrivateKey);
  const decryptedHDPrivateKey = bitcore.HDPrivateKey.fromObject(
    JSON.parse(decryptedHdPrivateKeyJSON)
  );

  const accountIndex = 0;
  // const derivedPrivateKey = hdPrivateKey.derive("m/0'"); // Derive a private key (change path as needed)
  const derivedMasterAccount = hdPrivateKey.derive(`m/44'/0'/${accountIndex}'`);
  const address = derivedMasterAccount.publicKey.toAddress().toString();

  //======={Secure Derived privateKey}====================================
  const privateKey = derivedMasterAccount.privateKey.toString(); // to be encrypted
  const encryptedPrivateKey = encryptPrivateKey(privateKey);
  const decryptedPrivateKey = decryptPrivateKey(encryptedPrivateKey);

  console.log('Bitcoin Address:', address);
  console.log('Bitcoin Private Key (WIF):', privateKey);
  console.log('Bitcoin encryptedPrivateKey:', encryptedPrivateKey);
  console.log('Bitcoin decryptedPrivateKey:', decryptedPrivateKey);
  console.log({ 'phrase Bitcoin': mnemonic });

  //==================================={HD}========================================================
  console.log('Bitcoin hdPrivateKey:', hdPrivateKey);
  console.log('Bitcoin hdPrivateKeyJSON:', hdPrivateKeyJSON);

  const response = {
    bitcoin: {
      hdMasterAccounts: {
        address, // privateKey: encryptedPrivateKey,
        privateKey: encryptedPrivateKey,
        hdPrivateKey: encryptedHDPrivateKey,
        hdPhrase: encryptedHDMnemonic,
      },
    },
  };

  return response;
  // res.status(200).json(response);
}
// addBitcoinWallet(mnemonic)

async function addTestBitcoinWallet(mnemonic) {
  // Generate a random BIP-39 mnemonic (12 words by default)
  // const mnemonic = bip39.generateMnemonic();
  // Create an HD wallet using BIP-32 from the mnemonic
  // const seedBuffer = bip39.mnemonicToSeedSync(mnemonic);

  //======{Save Mnemonic phrase as an encrypted asset}==================================
  const hdMnemonic = mnemonic;
  const mnemonicJSON = JSON.stringify(hdMnemonic);
  const encryptedHDMnemonic = encryptPrivateKey(mnemonicJSON); // save as Mnemonic

  //======{Begin to create Bitcoin wallet}==================================

  const seedBuffer = bip39.mnemonicToSeedSync(mnemonic);
  //======={secure HD privateKey}====================================
  // const hdPrivateKey = bitcore.HDPrivateKey.fromSeed(seedBuffer); // default live network
  const hdPrivateKey = bitcore.HDPrivateKey.fromSeed(seedBuffer, network); // default test network

  // let xpriv = passPhrase.toHDPrivateKey(passPhrase.toString(), network);

  const hdPrivateKeyJSON = JSON.stringify(hdPrivateKey.toObject());
  // Encrypt the private key before storing it in MongoDB
  const encryptedHDPrivateKey = encryptPrivateKey(hdPrivateKeyJSON);
  const decryptedHdPrivateKeyJSON = decryptPrivateKey(encryptedHDPrivateKey);
  const decryptedHDPrivateKey = bitcore.HDPrivateKey.fromObject(
    JSON.parse(decryptedHdPrivateKeyJSON)
  );

  const accountIndex = 0;
  // const derivedPrivateKey = hdPrivateKey.derive("m/0'"); // Derive a private key (change path as needed)
  const derivedMasterAccount = hdPrivateKey.derive(`m/44'/0'/${accountIndex}'`);
  const address = derivedMasterAccount.publicKey.toAddress().toString();

  //======={Secure Derived privateKey}====================================
  const privateKey = derivedMasterAccount.privateKey.toString(); // to be encrypted
  const encryptedPrivateKey = encryptPrivateKey(privateKey);
  const decryptedPrivateKey = decryptPrivateKey(encryptedPrivateKey);

  console.log('Bitcoin Address:', address);
  console.log('Bitcoin Private Key (WIF):', privateKey);
  console.log('Bitcoin encryptedPrivateKey:', encryptedPrivateKey);
  console.log('Bitcoin decryptedPrivateKey:', decryptedPrivateKey);
  console.log({ 'phrase Bitcoin': mnemonic });

  //==================================={HD}========================================================
  console.log('Bitcoin hdPrivateKey:', hdPrivateKey);
  console.log('Bitcoin hdPrivateKeyJSON:', hdPrivateKeyJSON);

  const response = {
    bitcoin: {
      hdMasterAccounts: {
        address, // privateKey: encryptedPrivateKey,
        privateKey: encryptedPrivateKey,
        hdPrivateKey: encryptedHDPrivateKey,
        hdPhrase: encryptedHDMnemonic,
      },
    },
  };
  console.log({ wallet: response });

  return response;
  // res.status(200).json(response);
}
// addTestBitcoinWallet(mnemonic)

const addBitcoinHDWallet = asyncHandler(async (req, res) => {
  const { userId, userWalletId, sender, amount, token } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    res.status(400);
    throw new Error({ errorMessage: 'User not found' });
  }

  if (!userWalletId) {
    res.status(400);
    throw new Error({ errorMessage: 'userWalletId required' });
  }

  let userWallets = await Wallets.findOne({
    user: userId,
    _id: userWalletId,
  }).exec();

  if (userWallets) {
    const hdMnemonicEncrypted = userWallets.bitcoin.hdMasterAccounts.hdPhrase; // encrypted key
    // Decrypt the private key for use in Bitcoin transactions
    const decryptedHDMnemonicJson = decryptPrivateKey(hdMnemonicEncrypted);
    const decryptedMnemonic = JSON.parse(decryptedHDMnemonicJson);
    const hdMnemonic = decryptedMnemonic;
    //======{Begin to create Bitcoin wallet}==================================

    const seedBuffer = bip39.mnemonicToSeedSync(hdMnemonic);

    // const hdPrivateKey = bitcore.HDPrivateKey.fromSeed(seedBuffer); // default live network
    const hdPrivateKey = bitcore.HDPrivateKey.fromSeed(seedBuffer, network); // default test network

    let newAccountNumber = userWallets.bitcoin.hdAccounts?.length; // so that the default address is not repeated which should be at index "0"

    const accountIndex = newAccountNumber + 1;
    const derivedAccount = hdPrivateKey.derive(`m/44'/0'/${accountIndex}'`);
    let accountName = `Account ${accountIndex + 1}`;
    const address = derivedAccount.publicKey.toAddress().toString();
    const privateKey = derivedAccount.privateKey.toString(); // encrypt privateKey
    // Encrypt the private key before storing it in MongoDB
    const encryptedPrivateKey = encryptPrivateKey(privateKey);

    const addUserHDWallet = userWallets.bitcoin.hdAccounts.push({
      accountName,
      address,
      privateKey: encryptedPrivateKey,
    });

    // addUserWallet.save(done);
    await userWallets.save();

    // Create user order
    const userOrder = await Orders.create({
      user: userId,
      receiver: address,
      sender,
      amount,
      tokenAddress: token?.address,
      tokenDecimals: token?.decimals,
      tokenSymbol: token?.symbol,
      // tokenSymbol: token?.symbol ? token?.symbol : '',
    });

    const newUserOrder = await userOrder.save();
    if (addUserHDWallet && newUserOrder) {
      console.log('addUserHDWallet', addUserHDWallet);
      const { _id } = newUserOrder;
      let response = {
        userWallets, // return userWallets
        hDWallet: addUserHDWallet,
        order: newUserOrder,
        orderId: _id,
        successMessage: 'HD Wallet created successfully',
      };

      res.status(200).json(response);
    }
  }
});

const addTestBitcoinHDWallet = asyncHandler(async (req, res) => {
  // const hdMnemonic = 'struggle rail mansion always surface pole brisk benefit follow snow apart list'; // last index:1
  const hdMnemonic =
    'struggle rail mansion always surface pole brisk benefit follow snow apart list';

  //======{Begin to create Bitcoin wallet}==================================

  const seedBuffer = bip39.mnemonicToSeedSync(hdMnemonic);

  // const hdPrivateKey = bitcore.HDPrivateKey.fromSeed(seedBuffer);
  const hdPrivateKey = bitcore.HDPrivateKey.fromSeed(seedBuffer, network);

  let newAccountNumber = 0; // 1, 2, 3

  const accountIndex = newAccountNumber + 1;
  const derivedAccount = hdPrivateKey.derive(`m/44'/0'/${accountIndex}'`);
  let accountName = `Account ${accountIndex + 1}`;
  const address = derivedAccount.publicKey.toAddress().toString();
  const privateKey = derivedAccount.privateKey.toString(); // encrypt privateKey
  // Encrypt the private key before storing it in MongoDB
  const encryptedPrivateKey = encryptPrivateKey(privateKey);

  console.log({
    accountName,
    address,
    privateKey,
    encryptedPrivateKey,
  });
});

// addTestBitcoinHDWallet()
const addEVMWalle1 = asyncHandler(async (req, res) => {
  const wallet = ethers.Wallet.createRandom();

  const address = wallet.address;
  const privateKey = wallet.privateKey;
  //======={secure HD privateKey}====================================
  const hdMnemonic = wallet.mnemonic.phrase;
  // Convert the mnemonic to JSON format
  const mnemonicJSON = JSON.stringify(hdMnemonic);

  // Encrypt the private key before storing it in MongoDB
  const encryptedHDPrivateKey = encryptPrivateKey(mnemonicJSON); // save as Mnemonic
  // Decrypt the private key for use in Bitcoin transactions
  // const decryptedHDPrivateKey = decryptPrivateKey(encryptedHDPrivateKey);
  const decryptedHDPrivateKeyJson = decryptPrivateKey(encryptedHDPrivateKey);
  const decryptedHDPrivateKey = JSON.parse(decryptedHDPrivateKeyJson);
  console.log('Decrypted HD Private Key:', decryptedHDPrivateKey);
  const decryptedHdMnemonic = decryptedHDPrivateKey; // decrypted key

  const accountIndex = 0;
  // let derivedMasterAccount = ethers.utils.HDNode.fromMnemonic(mnemonic).derivePath(`m/44'/60'/0'/${accountIndex}'`);
  let derivedMasterAccount = ethers.utils.HDNode.fromMnemonic(
    hdMnemonic
  ).derivePath(`m/44'/60'/0'/${accountIndex}'`);

  //======={Secure Derived privateKey}====================================
  // Encrypt the private key before storing it in MongoDB
  const encryptedPrivateKey = encryptPrivateKey(privateKey);
  // Decrypt the private key for use in Bitcoin transactions
  const decryptedPrivateKey = decryptPrivateKey(encryptedPrivateKey);

  console.log('ETH Address:', address);
  console.log('ETH Private Key (WIF):', privateKey);
  const response = {
    evm: {
      hdMasterAccounts: {
        address,
        privateKey,
        // privateKey: encryptedPrivateKey,
        hdPrivateKey: encryptedHDPrivateKey,
        // hdMnemonic: encryptedHDPrivateKey,

        encryptedPrivateKey,
        decryptedPrivateKey,
        hdMnemonic,
        decryptedHdMnemonic,
        encryptedHDPrivateKey,
      },
    },
  };

  // return response;
  res.status(200).json(response);
});

const addEVMWalletTest = asyncHandler(async (mnemonic) => {
  // const wallet = ethers.Wallet.createRandom();
  const wallet = ethers.Wallet.fromMnemonic(mnemonic);

  const address = wallet.address;
  const privateKey = wallet.privateKey;
  //======={secure HD privateKey}====================================
  const hdMnemonic = wallet.mnemonic.phrase;
  // Convert the mnemonic to JSON format
  const mnemonicJSON = JSON.stringify(hdMnemonic);
  // Encrypt the private key before storing it in MongoDB
  const encryptedHDPrivateKey = encryptPrivateKey(mnemonicJSON); // save as Mnemonic
  const accountIndex = 0;
  // let derivedMasterAccount = ethers.utils.HDNode.fromMnemonic(mnemonic).derivePath(`m/44'/60'/0'/${accountIndex}'`);
  let derivedMasterAccount = ethers.utils.HDNode.fromMnemonic(
    hdMnemonic
  ).derivePath(`m/44'/60'/0'/${accountIndex}'`);

  //======={Secure Derived privateKey}====================================
  // Encrypt the private key before storing it in MongoDB
  const encryptedPrivateKey = encryptPrivateKey(privateKey);

  console.log('ETH Address:', address);
  console.log('ETH Private Key:', privateKey);
  const response = {
    evm: {
      hdMasterAccounts: {
        address,
        privateKey: encryptedPrivateKey || '',
        // hdMnemonic: encryptedHDPrivateKey,
        hdPrivateKey: encryptedHDPrivateKey || '',
        //===={not required}===========
        hdMnemonic,
        derivedMasterAccount,
        phrase: mnemonic,
      },
    },
  };
  // return response;
  console.log(response);
  // res.status(200).json(response);
});

// addEVMWalletTest(mnemonic)
// console.log({
//   pharse: mnemonic
// })

async function addEVMWallet(mnemonic) {
  // const wallet = ethers.Wallet.createRandom();
  const wallet = ethers.Wallet.fromMnemonic(mnemonic);

  const address = wallet.address;
  const privateKey = wallet.privateKey;
  //======={secure HD privateKey}====================================
  const hdMnemonic = wallet.mnemonic.phrase;
  // Convert the mnemonic to JSON format
  const mnemonicJSON = JSON.stringify(hdMnemonic);
  // Encrypt the private key before storing it in MongoDB
  const encryptedHDPrivateKey = encryptPrivateKey(privateKey); // save as Mnemonic
  const encryptedHDMnemonic = encryptPrivateKey(mnemonicJSON); // save as Mnemonic
  const accountIndex = 0;
  // let derivedMasterAccount = ethers.utils.HDNode.fromMnemonic(mnemonic).derivePath(`m/44'/60'/0'/${accountIndex}'`);
  let derivedMasterAccount = ethers.utils.HDNode.fromMnemonic(
    hdMnemonic
  ).derivePath(`m/44'/60'/0'/${accountIndex}'`);

  //======={Secure Derived privateKey}====================================
  // Encrypt the private key before storing it in MongoDB
  const encryptedPrivateKey = encryptPrivateKey(privateKey);

  console.log('ETH Address:', address);
  console.log('ETH Private Key (WIF):', privateKey);
  const response = {
    evm: {
      hdMasterAccounts: {
        address,
        privateKey: encryptedPrivateKey,
        hdPrivateKey: encryptedHDPrivateKey,
        hdPhrase: encryptedHDMnemonic,
      },
    },
  };
  // console.log(response)
  return response;
  // res.status(200).json(response);
}

// addEVMWallet(mnemonic)

const addEVMHDWallet = asyncHandler(async (req, res) => {
  const { userId, userWalletId, sender, amount, token } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    res.status(400);
    throw new Error({ errorMessage: 'User not found' });
  }

  if (!userWalletId) {
    res.status(400);
    throw new Error({ errorMessage: 'userWalletId required' });
  }

  let userWallets = await Wallets.findOne({
    user: userId,
    _id: userWalletId,
  }).exec();

  if (userWallets) {
    // const hdPrivateKeyEncrypted = userWallets.evm.hdMasterAccounts.hdPrivateKey; // encrypted key
    const hdMnemonicEncrypted = userWallets.evm.hdMasterAccounts.hdPhrase; // encrypted key
    // Decrypt the private key for use in Bitcoin transactions
    const decryptedHDMnemonicJson = decryptPrivateKey(hdMnemonicEncrypted);
    const decryptedMnemonic = JSON.parse(decryptedHDMnemonicJson);

    console.log('Decrypted HD Private Key:', decryptedMnemonic);
    const hdMnemonic = decryptedMnemonic; // decrypted key
    let newAccountNumber = userWallets.evm.hdAccounts?.length; // so that the default address is not repeated which should be at index "0"

    const accountIndex = newAccountNumber + 1;
    let derivedAccount = ethers.utils.HDNode.fromMnemonic(
      hdMnemonic
    ).derivePath(`m/44'/60'/0'/${accountIndex}'`);
    let accountName = `Account ${accountIndex + 1}`;
    let wallet = new ethers.Wallet(derivedAccount.privateKey);
    const address = wallet?.address;
    const privateKey = wallet.privateKey; // encrypt privateKey
    // Encrypt the private key before storing it in MongoDB
    const encryptedPrivateKey = encryptPrivateKey(privateKey);

    const addUserHDWallet = userWallets.evm.hdAccounts.push({
      accountName,
      address,
      privateKey: encryptedPrivateKey,
      phrase: hdMnemonicEncrypted,
    });

    // addUserWallet.save(done);
    await userWallets.save();

    // Create user order
    const userOrder = await Orders.create({
      user: userId,
      receiver: address,
      sender,
      amount,
      tokenAddress: token?.address,
      tokenDecimals: token?.decimals,
      tokenSymbol: token?.symbol,
      // tokenSymbol: token?.symbol ? token?.symbol : '',
    });

    const newUserOrder = await userOrder.save();
    if (addUserHDWallet && newUserOrder) {
      console.log('addUserHDWallet', addUserHDWallet);
      const { _id } = newUserOrder;
      let response = {
        userWallets, // return userWallets
        hDWallet: addUserHDWallet,
        order: newUserOrder,
        orderId: _id,
        successMessage: 'HD Wallet created successfully',
      };

      res.status(200).json(response);
    }
  }
});

const addTronWalletTestBasic = asyncHandler(async () => {
  // const account1 = tronWeb.createAcccount();

  // const account2 = tronWeb.createRandom();

  // console.log({ account1: account1 });
  // console.log({ account2: account2 });

  //======================{Main Libraries}===========================
  // const tronWebTrx = tronWeb.trx;
  // const tronWebTransactionBuilder = tronWeb.transactionBuilder;
  // const tronWebUtils = tronWeb.utils;
  // const tronWebAddress = tronWeb.address;
  // console.log({ tronWebTrx: tronWebTrx });
  // console.log({ tronWebTransactionBuilder: tronWebTransactionBuilder });
  // console.log({ tronWebUtils: tronWebUtils });
  // console.log({ tronWebAddress: tronWebAddress });
  //======================{Main Libraries}===========================

  // const tronWebAddressFromPrivateKey = tronWeb.address.fromPrivateKey();
  // console.log({ tronWebAddressFromPrivateKey: tronWebAddressFromPrivateKey }); // false

  // ======================={create from private key}=========================================================================
  // const tronWebAccount = tronWeb.createAccount()
  // console.log({ tronWebAccount: tronWebAccount });

  // const result= {
  //   tronWebAccount: Promise {
  //     {
  //       privateKey: '4EC55613BDB5D6D7A09F8CB8AA19075B7F54B0C9D00366E11D6CE45E7E4DF9F9',
  //       publicKey: '04C504BBA8B5651DCCE3B7B76E11FC55668DAE2428DE2AFFCA46DB92D0AEFCE3D138C9D2601F156A1C6E62FB99B123794A47372E103BAF6A205DF9A5EAD0837A67',
  //       address: [Object]
  //     }
  //   }
  // }
  // ======================={get address from private key}=========================================================================

  const tronWebAddressFromPrivateKey = tronWeb.address.fromPrivateKey(
    '4EC55613BDB5D6D7A09F8CB8AA19075B7F54B0C9D00366E11D6CE45E7E4DF9F9'
  );
  console.log({ tronWebAddressFromPrivateKey: tronWebAddressFromPrivateKey }); // false

  // const result ={ tronWebAddressFromPrivateKey: 'TZ41n5vXiZAMi4d5ZWZbk9VhiB7X8x8S7j' }
  // ======================={encrypt address}=========================================================================
  const tronWebAddressHex = tronWeb.address.toHex(tronWebAddressFromPrivateKey);
  console.log({ tronWebAddressHex: tronWebAddressHex });
  //41fd339a916d4202bc31a36c2850ab95b3dba8997f
  // ======================={decrypt asddress}=========================================================================
  const tronWebAddressUnHex = tronWeb.address.fromHex(tronWebAddressHex);
  console.log({ tronWebAddressUnHex: tronWebAddressUnHex });
  //'TZ41n5vXiZAMi4d5ZWZbk9VhiB7X8x8S7j'

  const accountFromMnemonic = tronWeb.fromMnemonic(mnemonic);
  console.log({ accountFromMnemonic: accountFromMnemonic });

  
});

// addTronWalletTestBasic()
async function addTronWallet(mnemonic) {
  //======================{From Mnemonic}==========================================
  // const accountFromMnemonic = tronWeb.fromMnemonic(mnemonic);
  // console.log({ accountFromMnemonic: accountFromMnemonic });
  // const masterKey = accountFromMnemonic?.privateKey;
  // console.log({ masterKey: masterKey });

  //======================{AS HD WALLET}==========================================

  const accountIndex = 0;
  const derivedMasterAccount = tronWeb.createRandom({
    // path: "m/44'/195'/0'/0/0",
    path: `m/44'/195'/0'/0/${accountIndex}`,
    extraEntropy: '',
    locale: 'en',
  });

  console.log({ hdAccountPhrase1: derivedMasterAccount?.mnemonic?.phrase });
  const address = derivedMasterAccount?.address;
  const privateKey = derivedMasterAccount?.privateKey;
  const encryptedHDPrivateKey = encryptPrivateKey(privateKey);
  const encryptedPrivateKey = encryptPrivateKey(privateKey);

  //===================={Mnemonic}======================================
  const hdMnemonic = derivedMasterAccount?.mnemonic?.phrase;
  const mnemonicJSON = JSON.stringify(hdMnemonic);
  // Encrypt the private key before storing it in MongoDB
  const encryptedHDMnemonic = encryptPrivateKey(mnemonicJSON); // save as Mnemonic

  console.log('Tron Address:', address);
  console.log('Tron Private Key:', privateKey);
  const response = {
    tron: {
      hdMasterAccounts: {
        address,
        privateKey: encryptedPrivateKey,
        hdPrivateKey: encryptedHDPrivateKey,
        hdPhrase: encryptedHDMnemonic,
      },
    },
  };
  // console.log(response);
  return response;
}
// addTronWallet(mnemonic)

async function addTronWalletWithMnemonic(mnemonic) {
  //======================{From Mnemonic}==========================================
  // const accountFromMnemonic = tronWeb.fromMnemonic(mnemonic);
  // console.log({ accountFromMnemonic: accountFromMnemonic });
  // const masterKey = accountFromMnemonic?.privateKey;
  // console.log({ masterKey: masterKey });

  //  const account1 = await tronWeb.createAcccount();

  const account2 = await tronWeb.createRandom();

  // console.log({ account1: account1 });
  console.log({ account2: account2 });

  //======================{AS HD WALLET}==========================================
  // const result1 = {
  //   mnemonic: e {
  //     phrase: 'alert jacket curtain hover almost total visa trend rich salt achieve train',
  //     password: '',
  //     wordlist: [o],
  //     entropy: '0x062ee0d8b7306dcbbd2f40b957d40773'
  //   },
  //   privateKey: '0x5a534c0328fee5a1c2063d1bdb793e7cf9e6aeb66d8492479f00fc9be5aed71b',
  //   publicKey: '0x04a7be0302c2e61b836a99714d923530d4dc73265d93e496b75a081dce1b56f7c9c7e7c22828516bce3a6fa92ffacc4eae0f30f2f4e3837ca95d4e35adb2acb234',
  //   address: 'TYZUfAS3gD7bW6saVrZ7wmCdLBP6f2EpGK'
  // }
}

// console.log({mnemonic:mnemonic})
const mnemonicTest =
  'alert jacket curtain hover almost total visa trend rich salt achieve train';

// addTronWalletWithMnemonic(mnemonicTest)

const addTronHDWallet = asyncHandler(async (req, res) => {
  const { userId, userWalletId, sender, amount, token } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    res.status(400);
    throw new Error({ errorMessage: 'User not found' });
  }

  if (!userWalletId) {
    res.status(400);
    throw new Error({ errorMessage: 'userWalletId required' });
  }

  let userWallets = await Wallets.findOne({
    user: userId,
    _id: userWalletId,
  }).exec();

  if (userWallets) {
    const hdPrivateKeyEncrypted =
      userWallets.tron.hdMasterAccounts.hdPrivateKey; // encrypted key
    // Decrypt the private key for use in Bitcoin transactions
    const decryptedPrivateKey = decryptPrivateKey(hdPrivateKeyEncrypted);
    console.log('Decrypted HD Private Key:', decryptedPrivateKey);

    let newAccountNumber = userWallets.tron.hdAccounts?.length; // so that the default address is not repeated which should be at index "0"

    const accountIndex = newAccountNumber + 1;

    const derivedAccount = decryptedPrivateKey.derive(accountIndex);
    const address = tronWeb.address.fromPrivateKey(derivedAccount.privateKey);
    const privateKey = derivedAccount.privateKey; // to be encrypted

    let accountName = `Account ${accountIndex + 1}`;

    // Encrypt the private key before storing it in MongoDB
    const encryptedPrivateKey = encryptPrivateKey(privateKey);

    const addUserHDWallet = userWallets.tron.hdAccounts.push({
      accountName,
      address,
      privateKey: encryptedPrivateKey,
    });

    // addUserWallet.save(done);
    await userWallets.save();

    // Create user order
    const userOrder = await Orders.create({
      user: userId,
      receiver: address,
      sender,
      amount,
      tokenAddress: token?.address,
      tokenDecimals: token?.decimals,
      tokenSymbol: token?.symbol,
      // tokenSymbol: token?.symbol ? token?.symbol : '',
    });

    const newUserOrder = await userOrder.save();
    if (addUserHDWallet && newUserOrder) {
      console.log('addUserHDWallet', addUserHDWallet);
      const { _id } = newUserOrder;
      let response = {
        userWallets, // return userWallets
        hDWallet: addUserHDWallet,
        order: newUserOrder,
        orderId: _id,
        successMessage: 'HD Wallet created successfully',
      };

      res.status(200).json(response);
    }
  }
});

const addNewWallet = asyncHandler(async (req, res) => {
  /**
   *
   *
   * If user already has a wallet account
   *
   *
   */
  //=========={For Production}==================================
  // const user = await User.findById(req.user._id); //for production

  // // Confirm data
  // if (!user) {
  //   res.status(400);
  //   throw new Error('Invalid credentials');
  // }

  // if (req.body.userWalletId) { // if available

  //   let userWallets = await Wallets.findOne({
  //     user: user?._id,
  //     _id: req.body.userWalletId,
  //   }).exec();

  // }

  //=========={For Testing}==================================
  // const { userId, userWalletId } = req.body; // user====userId
  const { userId, password } = req.body; // user====userId
  // const { user } = req.body; // user====userId

  let userWallets = await Wallets.findOne({
    user: userId,
  }).exec();

  if (userWallets) {
    res.status(400);
    throw new Error('Wallet exists');
  }

  // Hash password for the wallet
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt); // wallet auth
  //=========={using one mnemonic phrase for all wallets}==================================

  const phrase = mnemonic;
  const { bitcoin } = addBitcoinWallet(phrase);
  const { evm } = addEVMWallet(phrase);
  const { tron } = addTronWallet(phrase);

  //Create a new EVM wallet
  const walletCreation = new Wallets({
    // user, // userId
    //  user: user?._id, // for production
    user: userId, // for testing
    accountNumber: 1,
    password: hashedPassword, // for protecting the wallet and maintaining user section like user auth
    bitcoin,
    evm,
    tron,
  });

  const newWallet = await walletCreation.save();

  if (newWallet) {
    console.log('newWallet', newWallet);

    let response = {
      address,
      privateKey,
      phrase: mnemonic,
      cautionMessage:
        'Please save your mnemonic phrase for wallet recovery and do not share your private key with anyone.',

      successMessage: 'Wallet created successfully',
    };
    res.status(200).json(response);
  }
});
const walletLogin = asyncHandler(async (req, res) => {
  const { userId, userWalletId, password } = req.body;
  // Check if user exists
  const user = await User.findById(userId);

  if (!user) {
    res.status(400);
    throw new Error('User not found, please signup');
  }

  // Validate Request
  if (!password) {
    res.status(400);
    throw new Error('password required');
  }

  const userWallets = await Wallets.findOne({
    user: userId,
  }).exec();

  // User exists, check if password is correct
  const passwordIsCorrect = await bcrypt.compare(
    password,
    userWallets.password
  );

  if (userWallets && passwordIsCorrect) {
    const { _id, accountNumber, bitcoin, tron, evm } = user;
    let response = {
      _id,
      user,
      accountNumber,
      bitcoin,
      tron,
      evm,
      successMessage: 'Wallet Login successfull',
    };
    res.status(200).json(response);
  } else {
    res.status(400);
    throw new Error('Invalid email or password');
  }
});

//======={Update account Names}==================================
const updateBitcoinWallet = asyncHandler(async (req, res) => {
  const { userId, userWalletId, accountName, newAccountName } = req.body;
  const user = await User.findById(userId);

  if (!user) {
    res.status(400);
    throw new Error('User not found!');
  }

  if (!userWalletId) {
    res.status(400);
    throw new Error('User wallet not found!');
  }

  let userWallets = await Wallets.findOne({
    user: userId,
    _id: userWalletId,
  }).exec();

  let hdWallet = userWallets.bitcoin.hdMasterAccounts;
  hdWallet.accountName = newAccountName || hdWallet.accountName;
  const updateWallet = await userWallets.save();
  if (updateWallet) {
    console.log(hdWallet);
    res.status(200).json(userWallets);
  }
});

const updateBitcoinHDWallet = asyncHandler(async (req, res) => {
  const { userId, userWalletId, accountName, newAccountName } = req.body;
  const user = await User.findById(userId);

  if (!user) {
    res.status(400);
    throw new Error('User not found!');
  }

  if (!userWalletId) {
    res.status(400);
    throw new Error('User wallet not found!');
  }

  let userWallets = await Wallets.findOne({
    user: userId,
    _id: userWalletId,
  }).exec();

  let hdWallets = userWallets.bitcoin.hdAccounts;

  const updateWallet = await Promise.all(
    hdWallets.map(async (wallet) => {
      if (wallet.accountName === accountName) {
        wallet.accountName = newAccountName || wallet.accountName;
      }

      return { ...wallet };
    })
  );
  console.log(updateWallet);

  await userWallets.save();

  res.status(200).json(userWallets);
});
const updateEVMWallet = asyncHandler(async (req, res) => {
  const { userId, userWalletId, accountName, newAccountName } = req.body;
  const user = await User.findById(userId);

  if (!user) {
    res.status(400);
    throw new Error('User not found!');
  }

  if (!userWalletId) {
    res.status(400);
    throw new Error('User wallet not found!');
  }

  let userWallets = await Wallets.findOne({
    user: userId,
    _id: userWalletId,
  }).exec();

  let hdWallet = userWallets.evm.hdMasterAccounts;
  hdWallet.accountName = newAccountName || hdWallet.accountName;
  const updateWallet = await userWallets.save();
  if (updateWallet) {
    console.log(hdWallet);
    res.status(200).json(userWallets);
  }
});

const updateEVMHDWallet = asyncHandler(async (req, res) => {
  const { userId, userWalletId, accountName, newAccountName } = req.body;
  const user = await User.findById(userId);

  if (!user) {
    res.status(400);
    throw new Error('User not found!');
  }

  if (!userWalletId) {
    res.status(400);
    throw new Error('User wallet not found!');
  }

  let userWallets = await Wallets.findOne({
    user: userId,
    _id: userWalletId,
  }).exec();

  let hdWallets = userWallets.evm.hdAccounts;

  const updateWallet = await Promise.all(
    hdWallets.map(async (wallet) => {
      if (wallet.accountName === accountName) {
        wallet.accountName = newAccountName || wallet.accountName;
      }

      return { ...wallet };
    })
  );
  console.log(updateWallet);

  await userWallets.save();

  res.status(200).json(userWallets);
});
const updateTronWallet = asyncHandler(async (req, res) => {
  const { userId, userWalletId, accountName, newAccountName } = req.body;
  const user = await User.findById(userId);

  if (!user) {
    res.status(400);
    throw new Error('User not found!');
  }

  if (!userWalletId) {
    res.status(400);
    throw new Error('User wallet not found!');
  }

  let userWallets = await Wallets.findOne({
    user: userId,
    _id: userWalletId,
  }).exec();

  let hdWallet = userWallets.tron.hdMasterAccounts;
  hdWallet.accountName = newAccountName || hdWallet.accountName;
  const updateWallet = await userWallets.save();
  if (updateWallet) {
    console.log(hdWallet);
    res.status(200).json(userWallets);
  }
});

const updateTronHDWallet = asyncHandler(async (req, res) => {
  const { userId, userWalletId, accountName, newAccountName } = req.body;
  const user = await User.findById(userId);

  if (!user) {
    res.status(400);
    throw new Error('User not found!');
  }

  if (!userWalletId) {
    res.status(400);
    throw new Error('User wallet not found!');
  }

  let userWallets = await Wallets.findOne({
    user: userId,
    _id: userWalletId,
  }).exec();

  let hdWallets = userWallets.tron.hdAccounts;

  const updateWallet = await Promise.all(
    hdWallets.map(async (wallet) => {
      if (wallet.accountName === accountName) {
        wallet.accountName = newAccountName || wallet.accountName;
      }

      return { ...wallet };
    })
  );
  console.log(updateWallet);

  await userWallets.save();

  res.status(200).json(userWallets);
});

// All user Wallets
const getWallets = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);

  if (!user) {
    res.status(400);
    throw new Error('User not found!');
  }

  let userWallets = await Wallets.findOne({
    user: userId,
  }).exec();

  res.status(200).json(userWallets);
});

// All user Wallets By Id // getting one wallet record
const getAllWalletsById = asyncHandler(async (req, res) => {
  const { userId, userWalletId } = req.params;

  const user = await User.findById(userId);

  if (!user) {
    res.status(400);
    throw new Error('User not found!');
  }

  if (!user) {
    res.status(400);
    throw new Error('User not found!');
  }

  if (!userWalletId) {
    res.status(400);
    throw new Error('User wallet not found!');
  }

  let userWallets = await Wallets.findOne({
    user: userId,
    _id: userWalletId,
  }).exec();

  res.status(200).json(userWallets);
});

// Single/selected user wallet
//================={New test routes}================
const getOneWallet = asyncHandler(async (req, res) => {
  const { userId, userWalletId } = req.params;
  let userWallets = await Wallets.findOne({
    user: userId,
    _id: userWalletId,
  }).exec();

  let response = {
    accountNumber,
    bitcoin: userWallets?.bitcoin,
    tron: userWallets?.tron,
    evm: userWallets?.evm,
  };

  res.status(200).json(response);
});

//consider alternatives
const walletRecover = asyncHandler(async (req, res) => {
  const { userMnemonic } = req.body;

  // Create a Bitcoin wallet from the mnemonic
  const seed = bitcore.Mnemonic(userMnemonic).toSeed();
  const hdPrivateKey = bitcore.HDPrivateKey.fromSeed(seed);

  const accountIndex = 0;
  // Derive a private key (change path as needed)
  const derivedMasterAccount = hdPrivateKey.derive(`m/44'/0'/${accountIndex}'`);
  const address = derivedMasterAccount.toAddress().toString();
  const privateKey = derivedMasterAccount.privateKey.toString(); // to be encrypted

  console.log('Recovered Address:', address);
  console.log('Recovered Private Key (WIF):', privateKey);
  let response = {
    address,
    privateKey,
  };

  res.status(200).json(response);
});

const walletRecover2 = asyncHandler(async (req, res) => {
  const { userMnemonic } = req.body;
  // const seed = bip39.mnemonicToSeedSync(mnemonic);
  const seed = bip39.mnemonicToSeedSync(userMnemonic);
  // Create a Bitcoin HD wallet
  const hdPrivateKey = new bitcore.HDPrivateKey(seed);

  const accountIndex = 0;
  const derivedMasterAccount = hdPrivateKey.derive(`m/44'/0'/${accountIndex}'`);
  // Get the address and private key for the recovered account
  const address = derivedMasterAccount.publicKey.toAddress().toString();
  const privateKey = derivedMasterAccount.privateKey.toString(); // to be encrypted

  console.log('Recovered Address:', address);
  console.log('Recovered Private Key (WIF):', privateKey);
  let response = {
    address,
    privateKey,
  };

  res.status(200).json(response);
});

const walletRecover3 = asyncHandler(async (req, res) => {
  const { userMnemonic } = req.body;

  if (!bip39.validateMnemonic(userMnemonic)) {
    console.error('Invalid mnemonic provided.');
    return null;
  }

  // Create a Bitcoin wallet from the mnemonic
  const accountIndex = 0;
  // Create a Bitcoin wallet from the provided mnemonic
  const seedBuffer = bip39.mnemonicToSeedSync(userMnemonic);
  const hdPrivateKey = bitcore.HDPrivateKey.fromSeed(seedBuffer);
  const derivedMasterAccount = hdPrivateKey.derive(`m/44'/0'/${accountIndex}'`);
  const address = derivedMasterAccount.privateKey.toAddress().toString();
  const privateKey = derivedMasterAccount.privateKey.toString(); // to be encrypted

  console.log('Recovered Address:', address);
  console.log('Recovered Private Key (WIF):', privateKey);
  let response = {
    address,
    privateKey,
  };

  res.status(200).json(response);
});

//======================={BALANCES BY CHAINS}======================

const getBalance = asyncHandler(async (req, res) => {
  const { address, userNetwork } = req.params;

  const sourceAddress = address;

  let inputCount = 0;

  let totalAmountAvailable = 0;

  let inputs = [];
  let resp;
  if (userNetwork === 'Testnet') {
    resp = await axios({
      method: 'GET',
      url: `https://blockstream.info/testnet/api/address/${sourceAddress}/utxo`,
    });
  } else {
    resp = await axios({
      method: 'GET',
      url: `https://blockstream.info/api/address/${sourceAddress}/utxo`,
    });
  }
  const utxos = resp.data;

  for (const utxo of utxos) {
    let input = {};
    input.satoshis = utxo.value;
    input.script = bitcore.Script.buildPublicKeyHashOut(sourceAddress).toHex();
    input.address = sourceAddress;
    input.txId = utxo.txid;
    input.outputIndex = utxo.vout;
    totalAmountAvailable += utxo.value;
    inputCount += 1;
    inputs.push(input);
  }

  const balances = totalAmountAvailable;

  res.status(200).json(balances);
});

const getBitcoinTestBalance = asyncHandler(async (address) => {
  const sourceAddress = address;

  let inputCount = 0;

  let totalAmountAvailable = 0;

  let inputs = [];
  let resp;
  if (network === testnet) {
    resp = await axios({
      method: 'GET',
      url: `https://blockstream.info/testnet/api/address/${sourceAddress}/utxo`,
    });
  } else {
    resp = await axios({
      method: 'GET',
      url: `https://blockstream.info/api/address/${sourceAddress}/utxo`,
    });
  }
  const utxos = resp.data;

  for (const utxo of utxos) {
    let input = {};
    input.satoshis = utxo.value;
    input.script = bitcore.Script.buildPublicKeyHashOut(sourceAddress).toHex();
    input.address = sourceAddress;
    input.txId = utxo.txid;
    input.outputIndex = utxo.vout;
    totalAmountAvailable += utxo.value;
    inputCount += 1;
    inputs.push(input);
  }

  const balances = totalAmountAvailable;

  console.log({ balances: balances });
  console.log({ balanceFormatted: `${balances / 1e8} tBTC` });
});

// getBitcoinTestBalance('mwZDqNNGFJLxEGWq2nHtqgUH1nm1dW2TYk')//balances: 7486 // '0.05167976 tBTC'
// getBitcoinTestBalance('mvDdqnRWf4FRnZT5pSf4FFftoPRYLbB5N1')//balances: 101000 // '0.00101 tBTC'
// getBitcoinTestBalance('n3KzXkuLZdqhGYVn2kSFMarGWvrc7wEJ5d')//balances: 1001000 // '0.01001 tBTC'

// getBitcoinTestBalance('mjd6NPVrNugHXZioezadR5tiEsFsE2H3BN')//balances: 2000 // 0.00002tBTC
// getBitcoinTestBalance('n4qtagBJ9Wx5LfyGdeQQzJU52H7JSMQBqM') // balances: 0
//sender: tb1qr7x7yq9gytegnnfn6yp9sk9gxktsf79t7hext2
// receiver: mwZDqNNGFJLxEGWq2nHtqgUH1nm1dW2TYk
//expected amount: 0.0001

//========================={                     }=================================================
//========================={  Send Transactions  }=================================================
//========================={                     }=================================================

//Native

// {
//   "userId":"640198fa8dc70de2acd3dbec",
//   "chainId": "5",
//   "fromTokenAddress":"0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
//   "amount": "0.05",
//   "receiver":"0x8D8f2AfAf11DD22BAa54C7102572BEf7f17a92e0",
//   "userWalletId":"640f279f40baa4d03deadc08"
// }

//NonNative

// {
//   "userId":"640198fa8dc70de2acd3dbec",
//   "chainId": "5",
//   "fromTokenAddress":"0x3dCd73E2a38ADd627D1DF1b2c6Ca29939A7Cf6c5",
//   "amount": "100",
//   "receiver":"0x8D8f2AfAf11DD22BAa54C7102572BEf7f17a92e0",
//   "userWalletId":"640f279f40baa4d03deadc08"
// }

const sendBitcoinWallet = asyncHandler(async (req, res) => {
  // const { tokenId, userId, receiver, amount } = req.body;

  const { userId, userWalletId, amount, receiver, userNetwork, walletAddress } =
    req.body;

  const recieverAddress = receiver;

  // const TESTNET = true;

  const user = await User.findById(userId);
  if (!user) {
    res.status(400);
    throw new Error({ errorMessage: 'User not found' });
  }
  if (!chainId) {
    res
      .status(404)
      .json({ errorMessage: 'ChainId required, please select a network' });
  }
  if (!amount) {
    res.status(400);
    throw new Error({ errorMessage: 'amount required' });
  }
  if (!userWalletId) {
    res.status(400);
    throw new Error({ errorMessage: 'userWalletId required' });
  }

  let userWallets = await Wallets.findOne({
    user: userId,
    _id: userWalletId,
  }).exec();

  if (userWallets) {
    let hdWallet = userWallets.bitcoin.hdMasterAccounts;

    let privateKey;
    let address;
    //======{Check if its the hdmaster wallet}=============================
    if (hdWallet?.address === walletAddress) {
      let hdPrivateKeyEncrypted = hdWallet?.privateKey;
      // Decrypt the private key for use in Bitcoin transactions
      const decryptedPrivateKey = decryptPrivateKey(hdPrivateKeyEncrypted);
      address = hdWallet?.address;
      privateKey = decryptedPrivateKey;
    } else {
      let wallets = userWallets.bitcoin.hdAccounts;
      let wallet;

      wallets.map(async (w) => {
        if (w?.address === walletAddress) {
          wallet = b;
          const decryptedPrivateKey = decryptPrivateKey(wallet?.privateKey);
          privateKey = decryptedPrivateKey;
        }
      });
    }

    const sourceAddress = address;
    // const satoshiToSend = amountToSend * 100000000;
    // const satoshiToSend = Number(amount) * 100000000;
    const satoshiToSend = Number(amount) * 1e8; // check || 1e9
    let fee = 0;
    let inputCount = 0;
    let outputCount = 2;

    const recommendedFee = await axios.get(
      'https://bitcoinfees.earn.com/api/v1/fees/recommended'
    );

    const transaction = new bitcore.Transaction();
    let totalAmountAvailable = 0;

    let inputs = [];
    let resp;
    if (userNetwork === 'Testnet') {
      resp = await axios({
        method: 'GET',
        url: `https://blockstream.info/testnet/api/address/${sourceAddress}/utxo`,
      });
    } else {
      resp = await axios({
        method: 'GET',
        url: `https://blockstream.info/api/address/${sourceAddress}/utxo`,
      });
    }

    const utxos = resp.data;

    for (const utxo of utxos) {
      let input = {};
      input.satoshis = utxo.value;
      input.script =
        bitcore.Script.buildPublicKeyHashOut(sourceAddress).toHex();
      input.address = sourceAddress;
      input.txId = utxo.txid;
      input.outputIndex = utxo.vout;
      totalAmountAvailable += utxo.value;
      inputCount += 1;
      inputs.push(input);
    }

    /**
     * In a bitcoin transaction, the inputs contribute 180 bytes each to the transaction,
     * while the output contributes 34 bytes each to the transaction. Then there is an extra 10 bytes you add or subtract
     * from the transaction as well.
     * */

    const transactionSize =
      inputCount * 180 + outputCount * 34 + 10 - inputCount;

    if (userNetwork === 'Testnet') {
      fee = transactionSize * 1; // 1 sat/byte is fine for testnet
    } else {
      fee = (transactionSize * recommendedFee.data.hourFee) / 3; // satoshi per byte
    }
    if (totalAmountAvailable - satoshiToSend - fee < 0) {
      throw new Error('Balance is too low for this transaction');
    }
    //Set transaction input
    transaction.from(inputs);

    // set the recieving address and the amount to send
    transaction.to(recieverAddress, satoshiToSend);

    // Set change address - Address to receive the left over funds after transfer
    transaction.change(sourceAddress);

    //manually set transaction fees: 20 satoshis per byte
    transaction.fee(Math.round(fee));

    // Sign transaction with your private key
    transaction.sign(privateKey);

    // serialize Transactions
    const serializedTransaction = transaction.serialize();

    // Send transaction

    if (userNetwork === 'Testnet') {
      resp = await axios({
        method: 'POST',
        url: `https://blockstream.info/testnet/api/tx`,
        data: serializedTransaction,
      });
    } else {
      resp = await axios({
        method: 'POST',
        url: `https://blockstream.info/api/tx`,
        data: serializedTransaction,
      });
    }

    // return result.data;

    let response = result.data;
    res.status(200).json(response);
  }
});

const sendTestBitcoinWallet = asyncHandler(async () => {
  console.log('BTC sending in progress');
  // let hdWallet = userWallets.bitcoin.hdMasterAccounts;
  // const receiver = 'mjd6NPVrNugHXZioezadR5tiEsFsE2H3BN';
  const receiver = 'mmganfY9LWop4VevRiigyUhxcFNUm9No9b';
  //
  const amount = '0.00001';
  const amountToSend = Number(amount);
  // const amount = '0.00015';

  let privateKey =
    'a9b904b94b966beb33f99845ee6b07c75bb1ac8364f0290481640cba2a113a17';
  let address = 'mwZDqNNGFJLxEGWq2nHtqgUH1nm1dW2TYk';
  const recieverAddress = receiver;
  const sourceAddress = address;
  // const satoshiToSend = amountToSend * 100000000;
  // const satoshiToSend = Number(amount) * 100000000;
  // const satoshiToSend = Number(amount) * 1e8; // check || 1e9
  const satoshiToSendRaw = amountToSend * 1e8;
  const satoshiToSend = Number(satoshiToSendRaw.toFixed(0));

  let fee = 0;
  let inputCount = 0;
  let outputCount = 2;

  // const recommendedFee = await axios.get(
  //   'https://bitcoinfees.earn.com/api/v1/fees/recommended'
  // );

  // console.log({recommendedFee: recommendedFee})

  const transaction = new bitcore.Transaction();
  let totalAmountAvailable = 0;

  let inputs = [];
  let resp;
  if (network === testnet) {
    resp = await axios({
      method: 'GET',
      url: `https://blockstream.info/testnet/api/address/${sourceAddress}/utxo`,
    });
  } else {
    resp = await axios({
      method: 'GET',
      url: `https://blockstream.info/api/address/${sourceAddress}/utxo`,
    });
  }

  const utxos = resp.data;

  // console.log({utxos: utxos})

  for (const utxo of utxos) {
    let input = {};
    input.satoshis = utxo.value;
    input.script = bitcore.Script.buildPublicKeyHashOut(sourceAddress).toHex();
    input.address = sourceAddress;
    input.txId = utxo.txid;
    input.outputIndex = utxo.vout;
    totalAmountAvailable += utxo.value;
    inputCount += 1;
    inputs.push(input);
  }

  /**
   * In a bitcoin transaction, the inputs contribute 180 bytes each to the transaction,
   * while the output contributes 34 bytes each to the transaction. Then there is an extra 10 bytes you add or subtract
   * from the transaction as well.
   * */

  const transactionSize = inputCount * 180 + outputCount * 34 + 10 - inputCount;
  // fee = transactionSize * recommendedFee.data.hourFee / 3; // satoshi per byte
  fee = transactionSize * 1; // 1 sat/byte is fine for testnet but update for mainnet
  if (network === testnet) {
    fee = transactionSize * 1; // 1 sat/byte is fine for testnet
  }
  if (totalAmountAvailable - satoshiToSend - fee < 0) {
    throw new Error('Balance is too low for this transaction');
  }
  //Set transaction input
  transaction.from(inputs);

  // set the recieving address and the amount to send
  transaction.to(recieverAddress, satoshiToSend);

  // Set change address - Address to receive the left over funds after transfer
  transaction.change(sourceAddress);

  //manually set transaction fees: 20 satoshis per byte
  transaction.fee(Math.round(fee));

  // Sign transaction with your private key
  transaction.sign(privateKey);

  // serialize Transactions
  const serializedTransaction = transaction.serialize();

  // Send transaction
  let result;

  if (network === testnet) {
    result = await axios({
      method: 'POST',
      url: `https://blockstream.info/testnet/api/tx`,
      data: serializedTransaction,
    });
  } else {
    result = await axios({
      method: 'POST',
      url: `https://blockstream.info/api/tx`,
      data: serializedTransaction,
    });
  }

  // return result.data;
  console.log('responding');

  let response = result.data;
  console.log({ response: response });
  //response: 'ad6f20b93731b3d1f16d0589c916bcc64f784bd221deaa885fd7f57a34596e04'
  //response: '001c0541c448ad5203b82c4726c33fff176a9925c55039ca9dd46633faad4739'
  // res.status(200).json(response);
});
// sendTestBitcoinWallet()
const sendBitcoinValue = async () => {
  const satoshiToSendRaw = 1 * 1e8;
  const satoshiToSend1 = 1 * 100000000;
  //
  console.log(satoshiToSendRaw);
  if (satoshiToSendRaw === satoshiToSend1) {
    console.log(true);
  } else {
    console.log(false);
  }
};
// sendBitcoinValue()

const sendTestBitcoinWalletTx = asyncHandler(async () => {
  console.log('BTC sending in progress');
  const receiver = 'moxAHV2xedF4LJEuTmahBQYiJMaX3xBPp2'; // admin master wallet

  const amount = '0.004';
  const amountToSend = Number(amount);

  // let privateKey =
  //   'a9b904b94b966beb33f99845ee6b07c75bb1ac8364f0290481640cba2a113a17';
  // let address = 'mwZDqNNGFJLxEGWq2nHtqgUH1nm1dW2TYk';

  const wallet = {
    accountName: 'Account 4',
    address: 'mvDdqnRWf4FRnZT5pSf4FFftoPRYLbB5N1',
    privateKey:
      '77184a44238054adebd6bcff4b2ade09ac3b8a1e5324fc2f51ced0058eb21e1c3c2b003b202fe30ffbcf82128ef6b5497d6b93c1e5077275cadd09f6ff21716ba21f3cf6e5d1a0bb403d6d864fcd0dad',
    // _id: new ObjectId('6549a881f494abb0fb4fca78'),
  };

  const hdPrivateKeyEncrypted = wallet?.privateKey;
  // Decrypt the private key for use in Tron transactions
  const decryptedPrivateKey = decryptPrivateKey(hdPrivateKeyEncrypted);

  let privateKey;
  let address;
  let isWallet = true;
  if (isWallet) {
    privateKey = decryptedPrivateKey;
    console.log({ privateKey: privateKey });
    address = wallet?.address;
  } else {
    privateKey =
      'a9b904b94b966beb33f99845ee6b07c75bb1ac8364f0290481640cba2a113a17';
    address = 'mwZDqNNGFJLxEGWq2nHtqgUH1nm1dW2TYk';
  }

  const recieverAddress = receiver;
  const sourceAddress = address;
  const satoshiToSendRaw = amountToSend * 1e8;
  const satoshiToSend = Number(satoshiToSendRaw.toFixed(0));

  let fee = 0;
  let inputCount = 0;
  let outputCount = 2;

  const transaction = new bitcore.Transaction();
  let totalAmountAvailable = 0;

  let inputs = [];
  let resp;
  if (network === testnet) {
    resp = await axios({
      method: 'GET',
      url: `https://blockstream.info/testnet/api/address/${sourceAddress}/utxo`,
    });
  } else {
    resp = await axios({
      method: 'GET',
      url: `https://blockstream.info/api/address/${sourceAddress}/utxo`,
    });
  }

  const utxos = resp.data;

  for (const utxo of utxos) {
    let input = {};
    input.satoshis = utxo.value;
    input.script = bitcore.Script.buildPublicKeyHashOut(sourceAddress).toHex();
    input.address = sourceAddress;
    input.txId = utxo.txid;
    input.outputIndex = utxo.vout;
    totalAmountAvailable += utxo.value;
    inputCount += 1;
    inputs.push(input);
  }

  /**
   * In a bitcoin transaction, the inputs contribute 180 bytes each to the transaction,
   * while the output contributes 34 bytes each to the transaction. Then there is an extra 10 bytes you add or subtract
   * from the transaction as well.
   * */

  const transactionSize = inputCount * 180 + outputCount * 34 + 10 - inputCount;
  // fee = transactionSize * recommendedFee.data.hourFee / 3; // satoshi per byte
  fee = transactionSize * 1; // 1 sat/byte is fine for testnet but update for mainnet
  if (network === testnet) {
    fee = transactionSize * 1; // 1 sat/byte is fine for testnet
  }
  if (totalAmountAvailable - satoshiToSend - fee < 0) {
    throw new Error('Balance is too low for this transaction');
  }
  //Set transaction input
  transaction.from(inputs);

  // set the recieving address and the amount to send
  transaction.to(recieverAddress, satoshiToSend);

  // Set change address - Address to receive the left over funds after transfer
  transaction.change(sourceAddress);

  //manually set transaction fees: 20 satoshis per byte
  transaction.fee(Math.round(fee));

  // Sign transaction with your private key
  transaction.sign(privateKey);

  // serialize Transactions
  const serializedTransaction = transaction.serialize();

  // Send transaction
  let result;

  if (network === testnet) {
    result = await axios({
      method: 'POST',
      url: `https://blockstream.info/testnet/api/tx`,
      data: serializedTransaction,
    });
  } else {
    result = await axios({
      method: 'POST',
      url: `https://blockstream.info/api/tx`,
      data: serializedTransaction,
    });
  }

  // return result.data;
  console.log('responding');

  let response = result.data;
  console.log({ response: response });
});
// sendTestBitcoinWalletTx()
//

const sendEVMWallet = asyncHandler(async (req, res) => {
  // const { tokenId, userId, receiver, amount } = req.body;

  const {
    userId,
    userWalletId,
    amount,
    receiver,
    token,
    walletAddress,
    networkRPC,
  } = req.body;

  const recipientAddress = receiver;
  const provider = new ethers.providers.JsonRpcProvider(networkRPC); // Replace with your Infura project ID

  // Token contract address (use the ERC-20 contract address for ERC-20 tokens)
  const tokenContractAddress = token?.address; // Replace with the token contract address for ERC-20 tokens

  // const TESTNET = true;

  const user = await User.findById(userId);
  if (!user) {
    res.status(400);
    throw new Error({ errorMessage: 'User not found' });
  }
  if (!amount) {
    res.status(400);
    throw new Error({ errorMessage: 'amount required' });
  }
  if (!userWalletId) {
    res.status(400);
    throw new Error({ errorMessage: 'userWalletId required' });
  }

  let userWallets = await Wallets.findOne({
    user: userId,
    _id: userWalletId,
  }).exec();

  if (userWallets) {
    let hdWallet = userWallets.evm.hdMasterAccounts;

    let privateKey;
    //======{Check if its the hdmaster wallet}=============================
    if (hdWallet?.address === walletAddress) {
      let hdPrivateKeyEncrypted = hdWallet?.privateKey;
      // Decrypt the private key for use in Tron transactions
      const decryptedPrivateKey = decryptPrivateKey(hdPrivateKeyEncrypted);
      privateKey = decryptedPrivateKey;
    } else {
      let wallets = userWallets.evm.hdAccounts;
      let wallet;

      wallets.map(async (w) => {
        if (w?.address === walletAddress) {
          wallet = b;
          const decryptedPrivateKey = decryptPrivateKey(wallet?.privateKey);
          privateKey = decryptedPrivateKey;
        }
      });
    }

    // const tokenAddress = token?.tokenAddress;
    const tokenDecimals = token?.tokenDecimals;
    const tokenSymbol = token?.tokenSymbol;

    // const amount = ethers.utils.parseUnits('1', 18); // Example: 1 ETH or 1 token (adjust as needed)
    const amountFormatted = ethers.utils.parseUnits(
      amount.toString(),
      Number(tokenDecimals)
    ); // Example: 1 ETH or 1 token (adjust as needed)

    // Create a wallet from the private key
    const signer = new ethers.Wallet(privateKey, provider);

    // Check the sender's ETH balance (for native ETH transfer)
    const balanceInWei = await provider.getBalance(walletAddress);

    // Check the sender's token balance (for ERC-20 token transfer)
    let tokenBalance;
    if (tokenContractAddress !== 'eth') {
      const tokenContract = new ethers.Contract(
        tokenContractAddress,
        ['balanceOf(address)'],
        signer
      );
      tokenBalance = await tokenContract.balanceOf(walletAddress);
    }

    // Calculate the estimated transaction fee (in Wei)
    const estimatedGasLimit = 21000; // Default gas limit for ETH transfer (adjust as needed)
    const gasPrice = await provider.getGasPrice();
    const estimatedFeeInWei = gasPrice.mul(estimatedGasLimit);

    // Check if the balance is sufficient for the transaction fee
    if (
      tokenContractAddress === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee' &&
      balanceInWei.lt(estimatedFeeInWei)
    ) {
      console.error('Insufficient ETH balance for the transaction fee.');
      return;
    } else if (
      tokenContractAddress !== '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee' &&
      tokenBalance.lt(amountFormatted)
    ) {
      console.error('Insufficient token balance for the transfer.');
      return;
    }

    // Send native ETH or ERC-20 tokens to the recipient
    if (tokenContractAddress === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
      const tx = await signer.sendTransaction({
        to: recipientAddress,
        value: amountFormatted,
        gasLimit: estimatedGasLimit,
        gasPrice: gasPrice,
      });
      //  await tx.wait(); // Wait for the transaction to be mined

      let response = await tx.wait(); // Wait for the transaction to be mined
      if (response) {
        res.status(200).json(response);
      }
    } else {
      // Create an instance of the ERC-20 token contract
      const erc20Token = new ethers.Contract(
        tokenContractAddress,
        ['transfer(address,uint256)'],
        signer
      );

      // Send ERC-20 tokens to the recipient
      const tx = await erc20Token.transfer(recipientAddress, amountFormatted, {
        gasLimit: estimatedGasLimit,
        gasPrice: gasPrice,
      });
      //  await tx.wait(); // Wait for the transaction to be mined

      let response = await tx.wait(); // Wait for the transaction to be mined
      if (response) {
        res.status(200).json(response);
      }
    }

    console.log(
      `Transaction successful: Sent ${ethers.utils.formatUnits(
        amount.toString(),
        Number(tokenDecimals)
      )} ${
        tokenContractAddress === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
          ? 'ETH'
          : tokenSymbol
      } to ${recipientAddress}`
    );
  }
});

const sendTronWallet = asyncHandler(async (req, res) => {
  // const { tokenId, userId, receiver, amount } = req.body;

  const { userId, userWalletId, amount, receiver, token, walletAddress } =
    req.body;

  // Create a TronWeb instance and connect to a full node

  const recipientAddress = receiver;

  // const TESTNET = true;

  const user = await User.findById(userId);
  if (!user) {
    res.status(400);
    throw new Error({ errorMessage: 'User not found' });
  }
  if (!amount) {
    res.status(400);
    throw new Error({ errorMessage: 'amount required' });
  }
  if (!userWalletId) {
    res.status(400);
    throw new Error({ errorMessage: 'userWalletId required' });
  }

  let userWallets = await Wallets.findOne({
    user: userId,
    _id: userWalletId,
  }).exec();

  if (userWallets) {
    let hdWallet = userWallets.tron.hdMasterAccounts;

    let privateKey;
    //======{Check if its the hdmaster wallet}=============================
    if (hdWallet?.address === walletAddress) {
      let hdPrivateKeyEncrypted = hdWallet?.privateKey;
      // Decrypt the private key for use in Tron transactions
      const decryptedPrivateKey = decryptPrivateKey(hdPrivateKeyEncrypted);
      privateKey = decryptedPrivateKey;
    } else {
      let wallets = userWallets.tron.hdAccounts;
      let wallet;

      wallets.map(async (w) => {
        if (w?.address === walletAddress) {
          wallet = b;
          const decryptedPrivateKey = decryptPrivateKey(wallet?.privateKey);
          privateKey = decryptedPrivateKey;
        }
      });
    }

    // Sender's TRON address
    const senderAddress = walletAddress;

    const tokenAddress = token?.tokenAddress;
    const tokenDecimals = token?.tokenDecimals;
    const tokenSymbol = token?.tokenSymbol;

    // Amount in SUN (TRX)
    // const amount = 1000000; // Example: 1 TRX or 1,000,000 SUN (adjust as needed)
    const amountInSUN = Number(amount) * 1e6;

    // Token contract address (use the TRC-20 contract address for TRC-20 tokens)
    const tokenContractAddress = tokenAddress; // Replace with the token contract address for TRC-20 tokens

    // Set the private key for the sender's wallet
    tronWeb.setPrivateKey(privateKey);

    // Check the sender's TRX balance (for native TRX transfer)
    const accountInfo = await tronWeb.trx.getAccount(senderAddress);
    const balanceInSUN = accountInfo.balance || 0;

    // Check the sender's token balance (for TRC-20 token transfer)
    let tokenBalance;
    if (tokenSymbol !== 'TRX') {
      // find trx native address
      const tokenContract = await tronWeb.contract().at(tokenContractAddress);
      tokenBalance = await tokenContract.balanceOf(senderAddress);
    }

    // Calculate the estimated transaction fee (in SUN)
    const estimatedFeeInSUN = await tronWeb.trx.getTransactionFee();

    // Check if the balance is sufficient for the transaction fee
    if (tokenSymbol === 'TRX' && balanceInSUN < estimatedFeeInSUN) {
      console.error('Insufficient TRX balance for the transaction fee.');
      return;
    } else if (tokenSymbol !== 'TRX' && tokenBalance < amountInSUN) {
      console.error('Insufficient token balance for the transfer.');
      return;
    }

    // Send native TRX or TRC-20 tokens to the recipient
    if (tokenSymbol === 'TRX') {
      // Send TRX (native token)
      const transaction = await tronWeb.transactionBuilder.sendTrx(
        recipientAddress,
        amountInSUN
      );
      const signedTransaction = await tronWeb.trx.sign(transaction);
      const result = await tronWeb.trx.sendRawTransaction(signedTransaction);
      console.log(
        `Transaction successful: Sent ${amountInSUN} SUN (TRX) to ${recipientAddress}`
      );
      if (result) {
        // let response = result.data;
        let response = result;
        res.status(200).json(response);
      }
    } else {
      // Send TRC-20 tokens
      const tokenContract = await tronWeb.contract().at(tokenContractAddress);
      const data = tokenContract
        .transfer(recipientAddress, amountInSUN)
        .encodeABI();
      const transaction = await tronWeb.transactionBuilder.triggerSmartContract(
        tokenContractAddress,
        'transfer(address,uint256)',
        {},
        [
          {
            type: 'address',
            value: recipientAddress,
          },
          {
            type: 'uint256',
            value: amountInSUN,
          },
        ],
        senderAddress
      );
      const signedTransaction = await tronWeb.trx.sign(transaction);
      const result = await tronWeb.trx.sendRawTransaction(signedTransaction);
      console.log(
        `Transaction successful: Sent ${amountInSUN} ${tokenSymbol} to ${recipientAddress}`
      );
      if (result) {
        // let response = result.data;
        let response = result;
        res.status(200).json(response);
      }
    }
  }
});

async function getEstimateFeeTron() {
  // const estimatedFeeInSUN = await tronWeb.trx.getTransactionFee();
  // console.log({ estimatedFeeInSUN: estimatedFeeInSUN });

  //Example 1
  const estimatedBandwidth = await tronWeb.trx.getBandwidth(
    'TVJ6njG5EpUwJt4N9xjTrqU5za78cgadS2'
  );
  console.log({ estimatedBandwidth: estimatedBandwidth });

  // const estimatedBandwidthInTRX = 0.1 * Number(estimatedBandwidth)

  // Promise{<pending>}
  // __proto__: Promise
  // [[PromiseStatus]]: "resolved"
  // [[PromiseValue]]: 5000

  // //Example 2
  // >tronWeb.trx.getBandwidth('41D3FD1B6F3F3A86303E2925844456C49876C4561F');
  // Promise {<pending>}
  // __proto__: Promise
  // [[PromiseStatus]]: "resolved"
  // [[PromiseValue]]: 5000
}

// getEstimateFeeTron()

async function checkConfirmedTRC20Transaction() {
  const hash1 =
    '55b9efa905b65be1222b9bf5826aa68329ffec641e59fd9b3af79474334e2ced'; // successful
  const hash2 =
    '65055cac63b6586fa63ca08446c627857d71e18f9bd706f286288a50d72581f1'; // unsuccessful

  // let transaction = hash1;

  const txid = hash1;

  //==========={ConfirmedTransactionInfo}=================================
  try {
    const confirmedTransactionInfo = await tronWeb.trx.getConfirmedTransaction(
      txid
    );
    if (confirmedTransactionInfo) {
      console.log('ConfirmedTransactionInfo Result:', confirmedTransactionInfo);

      const result = confirmedTransactionInfo?.ret[0]?.contractRet;
      console.log({ result: result });

      if (result === 'SUCCESS') {
        console.log({ status: 'Successful' });
      } else {
        console.log({ status: 'UnSuccessful' }); //result === 'REVERT'
      }
    }
  } catch (error) {
    console.error('ConfirmedTransactionInfo Error:', error);
  }

  const confirmedResultSuccess = {
    ret: [{ contractRet: 'SUCCESS' }],
    signature: [
      'f7b5e08d26bd53c091ea8463951a3039198514aa991e63e4f9a6550b7d93c1187a9fce4a75370c0c397b88c2de5621316cbcb92ef6520af9f219c348fcccfd421b',
    ],
    txID: '55b9efa905b65be1222b9bf5826aa68329ffec641e59fd9b3af79474334e2ced',
    raw_data: {
      contract: [[Object]],
      ref_block_bytes: 'a972',
      ref_block_hash: '763a263a755e830b',
      expiration: 1702139469000,
      fee_limit: 150000000,
      timestamp: 1702139409876,
    },
    raw_data_hex:
      '0a02a9722208763a263a755e830b40c8b9acfbc4315aae01081f12a9010a31747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e54726967676572536d617274436f6e747261637412740a15414ff3a8df95dd76a23819562e6c185d94644a00cd12154170082243784dcdf3042034e7b044d6d342a913602244a9059cbb000000000000000000000000e46cf63b61bea8603421d5b23fba07805451c1470000000000000000000000000000000000000000000000004563918244f4000070d4eba8fbc431900180a3c347',
  };

  const confirmedResultFailed = {
    ret: [{ contractRet: 'REVERT' }],
    signature: [
      'ed1fbdeba521b55a85d9c83d79be43ea3abac213216adf54d2d34690aa6ceb90495d7dccff42e4c6a2a49555d32ab6462d47f5ced2114455c900d2ca3702be011b',
    ],
    txID: '65055cac63b6586fa63ca08446c627857d71e18f9bd706f286288a50d72581f1',
    raw_data: {
      contract: [[Object]],
      ref_block_bytes: 'a9b2',
      ref_block_hash: '1496ea52ec5da742',
      expiration: 1702139670000,
      fee_limit: 150000000,
      timestamp: 1702139610145,
    },
    raw_data_hex:
      '0a02a9b222081496ea52ec5da74240f0dbb8fbc4315aae01081f12a9010a31747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e54726967676572536d617274436f6e747261637412740a15414ff3a8df95dd76a23819562e6c185d94644a00cd12154170082243784dcdf3042034e7b044d6d342a913602244a9059cbb000000000000000000000000e46cf63b61bea8603421d5b23fba07805451c14700000000000000000000000000000000000000000000000ad78ebc5ac620000070a188b5fbc431900180a3c347',
  };
}

async function checkUnConfirmedTRC20Transaction() {
  const hash1 =
    '55b9efa905b65be1222b9bf5826aa68329ffec641e59fd9b3af79474334e2ced'; // successful
  const hash2 =
    '65055cac63b6586fa63ca08446c627857d71e18f9bd706f286288a50d72581f1'; // unsuccessful

  // let transaction = hash1;

  const txid = hash1;
  //==========={UnconfirmedTransactionInfo}=================================
  try {
    const unconfirmedTransactionInfo =
      await tronWeb.trx.getUnconfirmedTransactionInfo(txid);
    if (unconfirmedTransactionInfo) {
      console.log(
        'UnconfirmedTransactionInfo Result:',
        unconfirmedTransactionInfo
      );
      const result = unconfirmedTransactionInfo?.receipt?.result;
      console.log({ result: result });

      if (result === 'SUCCESS') {
        console.log({ status: 'Successful' });
      } else {
        console.log({ status: 'UnSuccessful' }); //result === 'REVERT'
      }
    }
  } catch (error) {
    console.error('UnconfirmedTransactionInfo Error:', error);
  }

  const unconfirmedResultSuccess = {
    id: '55b9efa905b65be1222b9bf5826aa68329ffec641e59fd9b3af79474334e2ced',
    fee: 6028440,
    blockNumber: 42510725,
    blockTimeStamp: 1702139412000,
    contractResult: [
      '0000000000000000000000000000000000000000000000000000000000000001',
    ],
    contract_address: '4170082243784dcdf3042034e7b044d6d342a91360',
    receipt: {
      energy_fee: 5683440,
      energy_usage_total: 13532,
      net_fee: 345000,
      result: 'SUCCESS',
    },
    log: [
      {
        address: '70082243784dcdf3042034e7b044d6d342a91360',
        topics: [Array],
        data: '0000000000000000000000000000000000000000000000004563918244f40000',
      },
    ],
    packingFee: 6028440,
  };

  const unconfirmedResultFailed = {
    id: '65055cac63b6586fa63ca08446c627857d71e18f9bd706f286288a50d72581f1',
    fee: 802800,
    blockNumber: 42510789,
    blockTimeStamp: 1702139613000,
    contractResult: [
      '08c379a00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000001d64732d746f6b656e2d696e73756666696369656e742d62616c616e6365000000',
    ],
    contract_address: '4170082243784dcdf3042034e7b044d6d342a91360',
    receipt: {
      energy_fee: 457800,
      energy_usage_total: 1090,
      net_fee: 345000,
      result: 'REVERT',
    },
    result: 'FAILED',
    resMessage: '524556455254206f70636f6465206578656375746564',
    packingFee: 802800,
  };
}

// checkSendTransactionTronToken()

async function getContract() {
  const usdjTronAddress = 'TLBaRhANQoJFTqre9Nf1mjuwNWjCJeYqUL'; // usdj address
  let address = usdjTronAddress;
  let res = await tronWeb.trx.getContract(address);
  console.log(res);

  const abi = res?.abi;
  const name = res?.name;
  const entrys = res?.abi?.entrys;

  console.log(res);
  console.log({ abi: abi });
  console.log({ name: name });
  console.log({ entrys: entrys });
}
// getContract();// Execute the function

async function createTronTRC20Token() {
  const issuerAddress = ''; // creators wallet address

  const trc_options = {
    name: 'test', //Token name, default string
    abbreviation: 'tt', //Token name abbreviation, default string
    description: 'fortest', //Token description, default string
    url: 'www.baidu.com', //Token official website url, default string
    totalSupply: 100000, //Token total supply
    trxRatio: 1, // Define the price by the ratio of trx_num/num
    tokenRatio: 1, // Define the price by the ratio of trx_num/num
    saleStart: 1581047830000, //ICO start time
    saleEnd: 1681047110000, //ICO end time
    freeBandwidth: 0, // The creator's "donated" bandwidth for use by token holders
    freeBandwidthLimit: 0, // Out of `totalFreeBandwidth`, the amount each token holder get
    frozenAmount: 0, //Token staked supply
    frozenDuration: 0,
    // for now there is no default for the following values
    precision: 6, //Precision of issued tokens
    permission_id: 1, //Optional, for multi-signature use
  };
  const token = await tronWeb.transactionBuilder.createToken(
    trc_options,
    issuerAddress
  );

  if (token) {
    console.log({ token: token });

    const contract = token?.raw_data?.contract;
    console.log({ contract: contract });

    const contract1 = token?.raw_data?.contract[0];
    console.log({ contract1: contract1 });

    // tronWeb.transactionBuilder.createToken(trc_options,"41BF97A54F4B829C4E9253B26024B1829E1A3B1120").then(result=>console.log(result))
    const sampleResult = {
      visible: false,
      txID: '5a2b16c0436dddd6378a29087ba1e924b9a55f6bc2978554a0830cf741b1c03e',
      raw_data: {
        contract: [[Object]],
        ref_block_bytes: 'b756',
        ref_block_hash: '64bdb1724356ee49',
        expiration: 1581047856000,
        timestamp: 1581047797358,
      },
      raw_data_hex:
        '0a02b756220864bdb1724356ee494080f7aeee812e5a8b0108061286010a2f747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e41737365744973737565436f6e747261637412530a1541bf97a54f4b829c4e9253b26024b1829e1a3b11201204746573741a02747420a08d0630013806400148f0abadee812e50f082ddb1f630a20107666f7274657374aa010d7777772e62616964752e636f6d70eeacabee812e',
    };
  }
}

async function comparingTronWallets() {
  //TronLink generated each wallet in an account using thesame mnemonic which makes it HD, but not directly using a hdMethod//
  // it basically means that in terms of wallet recovery, all wallets can be recovered at once
  const wallet1 = {
    address: 'THFxGz1Pq5pyL7kdjZFwFqbP8zbBSLsYzE',
    privateKey:
      'cb9070d226d088fac33636b4f3a429f5f74f63f48719e7a2df2f9c10cb3abc92',
    mnemonic:
      'laugh impact train birth produce busy thrive video tree pig gossip acid',
  };

  const wallet2 = {
    address: 'TWo1bbdmV67hyL5747WMzSeD3uwW5P9tCa',
    privateKey:
      'ade5c249380d0f0ee9b1e94e71323c8195b1f63d723f0287e30e1dd0d476c54f',
    mnemonic:
      'laugh impact train birth produce busy thrive video tree pig gossip acid',
  };
  //
}
//============================{Send tron test}========================

async function sendTronTest(txData, selectedWallet) {
  let response;

  console.log({ txData: txData });
  console.log({ selectedWallet: selectedWallet });

  const token = txData?.tToken;

  const wallet = selectedWallet;

  const sender = wallet?.address; // String type // owner_address
  const receiver = txData?.userAddress;
  const amount = Number(txData?.tValue); //Number type//// specify the amount of token to send

  const hdPrivateKeyEncrypted = wallet?.privateKey;
  // Decrypt the private key for use in Tron transactions
  const decryptedPrivateKey = decryptPrivateKey(hdPrivateKeyEncrypted);
  const privateKeyOriginal = decryptedPrivateKey; //'0x0c4d8bb9500a74f3eaeb395f77e9e19a683951c410a1c441e503d95ca2b0577d'
  console.log({ privateKeyOriginal: privateKeyOriginal }); // Output: "abcdef"
  const privateKey = privateKeyOriginal.slice(2); // removing "OX" from private key// '0c4d8bb9500a74f3eaeb395f77e9e19a683951c410a1c441e503d95ca2b0577d'
  console.log({ privateKey: privateKey }); // Output: "abcdef"

  const tronWeb = new TronWeb({
    fullHost: 'https://nile.trongrid.io', // Replace with your Tron full node endpoint
    solidityNode: 'https://nile.trongrid.io', // Replace with your Tron solidity node endpoint
    privateKey: privateKey,
  });

  if (token?.symbol === 'trx') {
    const amountInSUN = tronWeb.toSun(Number(amount)); // convert to TRX

    const unsignedTxn = await tronWeb.transactionBuilder.sendTrx(
      receiver,
      Number(amountInSUN),
      sender
    );

    console.log({ unsignedTxn: unsignedTxn });

    // const signedTxn = await tronWeb.trx.sign(unsignedTxn, privateKey);
    const signedTxn = await tronWeb.trx.sign(unsignedTxn);

    console.log({ signedTxn: signedTxn });

    const receipt = await tronWeb.trx.sendRawTransaction(signedTxn);

    if (receipt) {
      console.log({ receipt: receipt });

      const result = receipt?.result;

      if (result === true) {
        console.log({ status: 'Successful' });
        response = {
          hashOut: unsignedTxn?.txID, //'9e5d48d4cbfe4e661c333cea627aead631a32dae4f8ab157c46530a44004bf24'
          // hashOut2: receipt?.txid,// also correct

          //======={not necessary}=============
          sender: sender,
          success: true,
          amount: amount,
          action: 'send',
          message: 'Successfull',
        };
        console.log(response);
      } else {
        console.log({ status: 'UnSuccessful' }); //result === 'false'
      }
    }
  } else {
    // let abi = token?.abi;

    let tokenContract = await tronWeb.trx.getContract(token?.address); // retreive contract
    const abi = tokenContract?.abi?.entrys; // assign abi
    let address = token?.address;
    let contract = await tronWeb.contract(abi, address);
    // let contract = tokenContract;

    //
    // console.log(contract);

    const toAddress = receiver;
    const decimals = token?.decimals;

    const convertedAmount = (
      Number(`1e${decimals}`) * Number(amount)
    ).toString();

    console.log({ convertedAmount: convertedAmount });

    let transaction;

    try {
      transaction = await contract.methods
        .transfer(toAddress, convertedAmount)
        .send();

      console.log('TransactionHash:', transaction); // transaction hash
    } catch (error) {
      console.error('Error sending USDT:', error);
    }

    if (transaction) {
      setTimeout(async () => {
        const txid = transaction;
        //==========={UnconfirmedTransactionInfo}=================================
        try {
          const unconfirmedTransactionInfo =
            await tronWeb.trx.getUnconfirmedTransactionInfo(txid);
          if (unconfirmedTransactionInfo) {
            console.log(
              'UnconfirmedTransactionInfo Result:',
              unconfirmedTransactionInfo
            );
            const result = unconfirmedTransactionInfo?.receipt?.result;
            console.log({ result: result });

            if (result === 'SUCCESS') {
              console.log({ status: 'Successful' });
              response = {
                hashOut: unconfirmedTransactionInfo?.id, //'09fbf66be18c384ad6c7521e1494a83dd42797dbfb546746008ec3d4f5ccfac6'
                //======={not necessary}=============
                sender: sender,
                success: true,
                amount: amount,
                action: 'transfer',
                message: 'Successfull',
              };
              console.log(response);
            } else {
              console.log({ status: 'UnSuccessful' }); //result === 'REVERT'
            }
          }
        } catch (error) {
          console.error('UnconfirmedTransactionInfo Error:', error);
        }
      }, 10000); // 10 seconds delay
    }
  }

  if (response) {
    return response;
  }
}

const walletTron1 = {
  accountName: 'Account 49',
  address: 'TQu7o18fGP1jieqF5Y5fYu6d8vRL4oC6pv',
  privateKey:
    'ff9e849653f36ca20835063c5e1a274c8aca64727c0ce65c6135e3929f50030c11c4878b2f3044f1f9420bd30e8c0f65f87a7c1ad786a8683f22cda482b1e0b599557d1c802ade934edb659be0f7f178',
  phrase:
    '80850bd93f6490ddb23404fc57e03a321c468b4affa2253e3e1648cd77bb004fc9d781d56721129501e11972f61c313d999a22ecc971b76d1c058e01145798baec87a7cff56f11ef0732863546485ad8',
  // _id: new ObjectId('6569dfa36fdb73792b836b35'),
};

const tokenTron1 = {
  name: '',
  symbol: 'trx',
  address: '',
  decimals: 6,
};

const tokenTron2 = {
  name: 'JUST Stablecoin',
  symbol: 'usdj',
  address: 'TLBaRhANQoJFTqre9Nf1mjuwNWjCJeYqUL', // usdj address
  decimals: 18,
};

const tokenTron3 = {
  name: 'Tether USD',
  symbol: 'usdt',
  address: usdtAddressTron, // official tron usdt address
  decimals: 6,
};

const txDataTron1 = {
  tToken: tokenTron1,
  userAddress: 'THFxGz1Pq5pyL7kdjZFwFqbP8zbBSLsYzE',
  amount: '1',
  tValue: '1',
};

const txDataTron2 = {
  tToken: tokenTron2,
  userAddress: 'THFxGz1Pq5pyL7kdjZFwFqbP8zbBSLsYzE',
  amount: '1',
  tValue: '1',
};
// sendTronTest(txDataTron1, walletTron1)
// sendTronTest(txDataTron2, walletTron1)

//============================{Send ethereum test}========================

async function sendEthereumTest(txData, wallet) {
  const fromTokenAddress = txData?.tToken?.address;
  const fromTokenAddressDecimals = txData?.tToken?.decimals;

  console.log({ fromTokenAddress: fromTokenAddress });

  const walletAddress = wallet?.address;

  const hdPrivateKeyEncrypted = wallet?.privateKey;
  // Decrypt the private key for use in Tron transactions
  const decryptedPrivateKey = decryptPrivateKey(hdPrivateKeyEncrypted);
  const privateKey = decryptedPrivateKey;
  console.log({ privateKey: privateKey });

  const amount = txData?.tValue;
  const receiver = txData?.userAddress;
  // const chainId = '1'; // Ethereum mainnet
  // const chainId = '5'; // Goerli testnet

  let response;

  const networkRPCEthereum = 'https://cloudflare-eth.com';
  const networkRPCGoerli = 'https://rpc.ankr.com/eth_goerli';
  const networkRPC = networkRPCGoerli;
  // const networkRPC = networkRPCEthereum;

  //==========={get Privatekey}=========================================================

  const provider = new ethers.providers.JsonRpcProvider(networkRPC); // default is ethereum homestead
  const signer = new ethers.Wallet(privateKey, provider);

  let type = '';

  if (fromTokenAddress == '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
    type = 'Native';
    const tx = {
      to: receiver,
      value: ethers.utils.parseEther(amount.toString()).toString(),
    };

    const rawBalance = await provider.getBalance(walletAddress);
    const balance = ethers.utils.formatEther(rawBalance.toString()).toString();
    console.log({ balance: balance });

    console.log({ tx: tx });
    //To get gas estimate
    // let estimatedGasRaw = signer.estimateGas(tx); // to setimate gas
    // const estimatedGas = estimatedGasRaw.toString();
    // console.log(estimatedGas);

    //================={Consider}=====================================
    // const transaction = await signer.sendTransaction(tx);
    // let txResponse = await transaction.wait();

    // if (txResponse?.status) {
    //   let response = {
    //     txHash:
    //       (txResponse?.hash && txResponse?.hash) ||
    //       (txResponse?.transactionHash && txResponse?.transactionHash) ||
    //       '',
    //     sender: walletAddress,
    //     success: true,
    //     amount: amount,
    //     balance: balance,
    //     type: type,
    //     action: 'send',
    //     message: 'Successfull',
    //   };
    //   console.log(response);
    // }

    if (tx) {
      signer.sendTransaction(tx).then((hash) => {
        response = {
          receipt: hash,
          hashOut: hash?.hash,
          //======={not necessary}=============
          sender: walletAddress,
          success: true,
          amount: amount,
          balance: balance,
          type: type,
          action: 'send',
          message: 'Successfull',
        };
        console.log(response);
        // res.status(201).json(response);
      });
    }
  } else {
    const contract = new ethers.Contract(fromTokenAddress, ERC20Abi, signer);
    type = 'Token';

    try {
      const tx = await contract.transfer(
        receiver,
        ethers.utils
          .parseUnits(amount.toString(), fromTokenAddressDecimals.toString())
          .toString()
      );
      const transactionStatus = await tx.wait();

      console.log({ transactionStatus: transactionStatus });

      const rawBalance = await contract.balanceOf(walletAddress);
      const balance = ethers.utils
        .formatEther(rawBalance.toString())
        .toString();
      //const balance = ethers.utils.formatUnits(rawBalance, decimals);

      if (transactionStatus) {
        response = {
          // hashOut: tx?.hash,
          hashOut: transactionStatus?.transactionHash,
          //======={not necessary}=============
          sender: walletAddress,
          sucess: true,
          receiver,
          amount: amount,
          // balance: balance,
          type: type,
          action: 'send',
        };
        console.log(response);
      }
    } catch (error) {
      console.log({ 'transaction error': error });
    }
  }

  if (response) {
    return response;
  }
}

async function sendEthereumTest2(txData, wallet, isMasterWallet) {
  const fromTokenAddress = txData?.tToken?.address;
  const fromTokenAddressDecimals = txData?.tToken?.decimals;

  console.log({ fromTokenAddress: fromTokenAddress });

  const walletAddress = wallet?.address;

  const hdPrivateKeyEncrypted = wallet?.privateKey;
  // Decrypt the private key for use in Tron transactions
  const decryptedPrivateKey = decryptPrivateKey(hdPrivateKeyEncrypted);
  const privateKey = decryptedPrivateKey;
  console.log({ privateKey: privateKey });

  const amount = txData?.tValue;
  const receiver = txData?.userAddress;
  // const chainId = '1'; // Ethereum mainnet
  // const chainId = '5'; // Goerli testnet

  let response;

  const networkRPCEthereum = 'https://cloudflare-eth.com';
  const networkRPCGoerli = 'https://rpc.ankr.com/eth_goerli';
  const networkRPC = networkRPCGoerli;
  // const networkRPC = networkRPCEthereum;

  //==========={get Privatekey}=========================================================

  const provider = new ethers.providers.JsonRpcProvider(networkRPC); // default is ethereum homestead
  const signer = new ethers.Wallet(privateKey, provider);

  let type = '';

  if (fromTokenAddress == '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
    type = 'Native';
    const tx = {
      to: receiver,
      value: ethers.utils.parseEther(amount.toString()).toString(),
    };

    const rawBalance = await provider.getBalance(walletAddress);
    const balance = ethers.utils.formatEther(rawBalance.toString()).toString();
    console.log({ balance: balance });

    console.log({ tx: tx });
    //To get gas estimate
    // let estimatedGasRaw = signer.estimateGas(tx); // to setimate gas
    // const estimatedGas = estimatedGasRaw.toString();
    // console.log(estimatedGas);

    //================={Consider}=====================================
    const transaction = await signer.sendTransaction(tx);
    let txResponse = await transaction.wait();
    console.log({ txResponse: txResponse });
    if (txResponse?.transactionHash) {
      let response = {
        hashOut: txResponse?.transactionHash,
        //======={not necessary}=============
        sender: walletAddress,
        success: true,
        amount: amount,
        balance: balance,
        type: type,
        action: 'send',
        message: 'Successfull',
      };
      console.log(response);
    }
  } else {
    const contract = new ethers.Contract(fromTokenAddress, ERC20Abi, signer);
    type = 'Token';

    try {
      const tx = await contract.transfer(
        receiver,
        ethers.utils
          .parseUnits(amount.toString(), fromTokenAddressDecimals.toString())
          .toString()
      );
      const transactionStatus = await tx.wait();

      console.log({ transactionStatus: transactionStatus });

      const rawBalance = await contract.balanceOf(walletAddress);
      const balance = ethers.utils
        .formatEther(rawBalance.toString())
        .toString();
      //const balance = ethers.utils.formatUnits(rawBalance, decimals);

      if (transactionStatus) {
        response = {
          // hashOut: tx?.hash,
          hashOut: transactionStatus?.transactionHash,
          //======={not necessary}=============
          sender: walletAddress,
          sucess: true,
          receiver,
          amount: amount,
          // balance: balance,
          type: type,
          action: 'send',
        };
        console.log(response);
      }
    } catch (error) {
      console.log({ 'transaction error': error });
    }
  }

  if (response) {
    if (isMasterWallet) {
      //========================={update wallet balances after transaction}=====================
      await updateHDWalletByIdEvm('', isMasterWallet);
      console.log({ response: response });
      return response;
    } else {
      await updateHDWalletByIdEvm(wallet?._id, isMasterWallet);
      console.log({ response: response });
      return response;
    }
  }
}

const walletsEVMMaster = {
  eth: {
    symbol: 'eth',
    balance: 0,
    address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    decimals: 18,
    name: 'Ethereum',
  },
  usdt: {
    symbol: 'usdt',
    balance: 0,
    address: '0x0F29978575fe11D9F727f0D13F558ebbc55Af94A',
    decimals: 6,
    name: 'Tether',
  },
  address: '0x2B605B3EFF7b5677c49d67eB641877C604B146Ee',
  privateKey:
    'f472daaa5ab76426780ba3c15f64b1fad90c6ee8a4a540c15ecaba37486facff6c4e54a49f800e3651fe9fd4e2509885d5dfad3a69c5178d7994958edc4aac835527cda5de6c33c0d1d3d46d2c088617',
  hdPrivateKey:
    'f472daaa5ab76426780ba3c15f64b1fad90c6ee8a4a540c15ecaba37486facff6c4e54a49f800e3651fe9fd4e2509885d5dfad3a69c5178d7994958edc4aac835527cda5de6c33c0d1d3d46d2c088617',
  hdPhrase:
    '86712b4cd25b7b3cfd91d7b7cc8c05485f1d873a643e4863664ed325d6815c383808d307b78e58a95d7757c163630c3ae6d519680611eb2da3c7282c0ad002383ac7b541867dc8c25a741b86e7e6899c',
  accountName: 'Master',
  gousdt: { symbol: 'usdt', balance: 0 },
};
const newTx = {
  _id: '657b49fdcc65935ba406543c',
  user: '6534f4f01ba02cbbdc82cff8',
  country: 'United States',
  city: 'New york',
  orderNo: 'SAL4W947',
  txId: 'SAL4W947',
  userAddress: '0x2754897d2B0493Fd0463281e36db83BB202f6343',
  fToken: {
    _id: '65284381082f99ac1aef0113',
    id: 'Russian Ruble',
    symbol: 'rub',
    price_symbol: 'rub',
    name: 'Russian Ruble',
    unit: '₽',
    value: 41675.288,
    type: 'fiat',
    image:
      'https://res.cloudinary.com/datkh2oxv/image/upload/v1697491013/blendery/flags/rub.png',
    tokenUrl:
      'https://res.cloudinary.com/datkh2oxv/image/upload/v1697491013/blendery/flags/rub.png',
  },
  tToken: {
    _id: '6528436c082f99ac1aef0109',
    id: 'ethereum',
    symbol: 'eth',
    name: 'Ethereum',
    image:
      'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628',
    max_supply: null,
    decimals: 18,
    address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    chainId: '1',
    updatedAt: '2023-11-06T23:26:08.845Z',
    chain: 'Ethereum',
  },
  fValue: '1500',
  tValue: '0.007276405918631012',
  service: 'buy',
  subService: 'buyCash',
  youSend: 1500,
  youGet: 0.007276405918631012,
  networkFee: 0.00001828,
  serviceFee: 0.00001828,
  exchangeRate: '205115.000',
  pin: '413120',
  dispatcherId: 'A7114',
  location: 'New york',
  fallbackUrl: '',
  telegram: '@peterTouch',
  fullName: '',
  blenderyCardNumber: '5320 1000 2000 3000',
  bankName: '',
  cardNumber: '',
  phone: '',
  chain: 'Ethereum',
  chainId: '1',
  percentageProgress: 5,
  status: 'Completed',
  blenderyStatus: 'Pending',
  timeStatus: 'Active',
  amount: '7276405918631012',
  isAmountMatched: false,
  networkName: 'Testnet',
  managerChanged: false,
  __v: 0,
  dispatcherTelegram: '@dispatcher2',
  hashOut: '',
  blockchainUrlOut: '',
};

async function checkEthereumTransafer() {
  const isMasterWallet = true;
  const txData = newTx;
  const wallet = walletsEVMMaster;
  const response = await sendEthereumTest2(txData, wallet, isMasterWallet);

  if (response?.amount) {
    const userData = {
      id: txData?._id,
      hashOut: response?.hashOut,
      status: 'Completed',
      percentageProgress: 5,
    };
    //update status as paid
    const result = await updateBlockChainOutTransactionByIdInternal(userData);
    if (result) {
      console.log({ result: result });
      // res.status(200).json(result);
    }
  }
}

// checkEthereumTransafer();

const walletsTronMaster = {
  trx: {
    symbol: 'trx',
    balance: 0,
    address: '',
    decimals: 6,
    name: 'TRON',
  },
  usdt: {
    symbol: 'usdt',
    balance: 0,
    address: 'TLXYTvdWdbTbeBS18JSSmyAe6S7wJ3BpJb',
    decimals: 6,
    name: 'Tether',
  },
  address: 'TGBqjk1BjZxmziJqqJSvriiNUikn5vX3LF',
  privateKey:
    'dc71a989df16a00520827134057f8609a50734929725b6fe778c9c4c10421f518d36d758c252fa1d7bceef564bea87298ef8c21af6e1e044f93deb03182f3ab42f463ed874031a59f31f47ee3cba89d7',
  hdPrivateKey:
    'dc71a989df16a00520827134057f8609a50734929725b6fe778c9c4c10421f518d36d758c252fa1d7bceef564bea87298ef8c21af6e1e044f93deb03182f3ab42f463ed874031a59f31f47ee3cba89d7',
  hdPhrase:
    'b0c9699548747eaadcbf054ba94980ec5d7fa7704e9a3891954150847d83a900a9cf0911d844e40a31e1b16e9f3261b168506639decac993e2c10d422c49753de81f42b1992b100e970b719a63c1dc8a',
  accountName: 'Master',
};
const newTxTron = {
  _id: '657ba2b1f0cd563836344004',
  user: '6534f4f01ba02cbbdc82cff8',
  orderNo: 'WY2CRKKW',
  txId: 'WY2CRKKW',
  userAddress: 'TWo1bbdmV67hyL5747WMzSeD3uwW5P9tCa',
  blenderyAddress: '0xB3a0FBE9830CDE8b9255895DF95Ced2bC70f0cf3',
  fToken: {
    _id: '652c68058a1e328256fef033',
    id: 'ethereum',
    symbol: 'eth',
    name: 'Ethereum',
    image:
      'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628',
    current_price: 1771.42,
    market_cap: '215529918225',
    market_cap_rank: '2',
    fully_diluted_valuation: '215529918225',
    total_volume: '16575028597',
    high_24h: '1861.11',
    low_24h: '1770.23',
    price_change_24h: '-40.0072878208216',
    price_change_percentage_24h: '-2.20861',
    market_cap_change_24h: '704227495',
    market_cap_change_percentage_24h: '0.32781',
    circulating_supply: '120260008.347644',
    total_supply: '120260008.347644',
    max_supply: null,
    ath: '4878.26',
    ath_change_percentage: '-63.53572',
    ath_date: '2021-11-10T14:24:19.604Z',
    atl: '0.432979',
    atl_change_percentage: '410733.52956',
    atl_date: '2015-10-20T00:00:00.000Z',
    last_updated: '2023-10-26T15:32:23.061Z',
    chainId: '1',
    updatedAt: '2023-11-08T12:44:37.157Z',
    chain: 'Ethereum',
    address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    decimals: 18,
  },
  tToken: {
    _id: '652c68058a1e328256fef035',
    id: 'tether',
    symbol: 'usdt',
    name: 'Tether',
    image:
      'https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661',
    current_price: 1,
    market_cap: '83834650426',
    market_cap_rank: '3',
    fully_diluted_valuation: '83834650426',
    total_volume: '15153190047',
    high_24h: '1.002',
    low_24h: '0.997953',
    price_change_24h: '-0.000101133801949649',
    price_change_percentage_24h: '-0.01011',
    market_cap_change_24h: '48584980',
    market_cap_change_percentage_24h: '0.05799',
    circulating_supply: '83814882993.8953',
    total_supply: '83814882993.8953',
    max_supply: null,
    ath: '1.32',
    ath_change_percentage: '-24.39439',
    ath_date: '2018-07-24T00:00:00.000Z',
    atl: '0.572521',
    atl_change_percentage: '74.72446',
    atl_date: '2015-03-02T00:00:00.000Z',
    roi: null,
    last_updated: '2023-10-19T14:00:00.872Z',
    type: 'TRC20',
    updatedAt: '2023-11-07T00:17:30.190Z',
    address: 'TLXYTvdWdbTbeBS18JSSmyAe6S7wJ3BpJb',
    chain: 'Tron',
    decimals: 6,
  },
  fValue: '0.001',
  tValue: '2.2944',
  service: 'exchange',
  subService: 'exchange',
  youSend: 0.001,
  youGet: 2.2943506,
  networkFee: 0.0057647,
  serviceFee: 0.0057647,
  exchangeRate: '2305.880',
  fallbackUrl: '',
  telegram: '',
  fullName: '',
  blenderyCardNumber: '5320 1000 2000 3000',
  bankName: '',
  cardNumber: '',
  phone: '',
  chain: 'Ethereum',
  chainId: '1',
  status: 'Received',
  blenderyStatus: 'Pending',
  timeStatus: 'Active',
  amount: '2294350600000000000',
  isAmountMatched: false,
  networkName: 'Testnet',
  managerChanged: false,
  __v: 0,
  sender: '0x2754897d2b0493fd0463281e36db83bb202f6343',
  receiver: '0xb3a0fbe9830cde8b9255895df95ced2bc70f0cf3',
  amountSent: '0.001',
  hash: '0x2def6f4237c16f7c2bdacd202e2fb5674a94e83b232ddf3c7b1488367cdd4877',
  blockchainUrl:
    'https://goerli.etherscan.io/tx/0x2def6f4237c16f7c2bdacd202e2fb5674a94e83b232ddf3c7b1488367cdd4877',
};

async function checkTronTransafer1() {
  const isMasterWallet = true;
  const txData = newTxTron;
  const wallet = walletsTronMaster;
  try {
    const response = await sendTron(txData, wallet, isMasterWallet);

    console.log({ responseBefore: response });

    if (response?.amount) {
      console.log({ responseAfter: response });
      const userData = {
        id: txData?._id,
        hashOut: response?.hashOut,
        status: 'Completed',
        percentageProgress: 5,
      };
      //update status as paid
      const result = await updateBlockChainOutTransactionByIdInternal(userData);
      if (result) {
        console.log({ result: result });
        // res.status(200).json(result);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

async function checkTronTransafer1() {
  const isMasterWallet = true;
  const txData = newTxTron;
  const wallet = walletsTronMaster;
  try {
    const response = await sendTron(txData, wallet, isMasterWallet);

    console.log({ responseBeforeOut: response });

    if (response?.amount) {
      console.log({ responseBeforOut: response });
      const userData = {
        id: txData?._id,
        hashOut: response?.hashOut,
        status: 'Completed',
        percentageProgress: 5,
      };
      //update status as paid
      const result = await updateBlockChainOutTransactionByIdInternal(userData);
      if (result) {
        console.log({ result: result });
        // res.status(200).json(result);
      }
    }

    // setTimeout(async () => {
    //   if (response?.amount) {
    //     console.log({ responseBeforOut: response });
    //     const userData = {
    //       id: txData?._id,
    //       hashOut: response?.hashOut,
    //       status: 'Completed',
    //       percentageProgress: 5,
    //     };
    //     //update status as paid
    //     const result = await updateBlockChainOutTransactionByIdInternal(
    //       userData
    //     );
    //     if (result) {
    //       console.log({ result: result });
    //       // res.status(200).json(result);
    //     }
    //   }
    // }, 10000); // 10 seconds later
  } catch (error) {
    console.log(error);
  }
}

async function checkTronTransafer() {
  const isMasterWallet = true;
  const txData = newTxTron;

  const wallet = walletsTronMaster;
  try {
    const response = await sendTron(txData, wallet, isMasterWallet);

    console.log({ responseBeforeOut: response });

    if (response?.amount) {
      console.log({ responseAfterOut: response });
      const userData = {
        id: txData?._id,
        hashOut: response?.hashOut,
        status: 'Completed',
        percentageProgress: 5,
      };
      //update status as paid
      const result = await updateBlockChainOutTransactionByIdInternal(userData);
      if (result) {
        console.log({ result: result });
        // res.status(200).json(result);
      }
    }
  } catch (error) {
    console.log(error);
  }
}
// checkTronTransafer()

async function checkConvertedUnits() {
  const decimals = 6;
  const amount = '1988.011988011988';
  const roundedAmount = Math.round(Number(amount));

  const convertedAmount = (
    Number(`1e${decimals}`) * Number(roundedAmount)
  ).toString();

  console.log({ convertedAmount: convertedAmount });
}
// checkConvertedUnits()

async function checkTronContract() {
  const token = {
    address: 'TLXYTvdWdbTbeBS18JSSmyAe6S7wJ3BpJb',
  };
  let tokenContract = await tronWeb.trx.getContract(token?.address); // retreive contract
  const abi = tokenContract?.abi?.entrys; // assign abi
  let address = token?.address;
  let contract = await tronWeb.contract(abi, address);

  console.log({ contract: contract });
}

// checkTronContract()

const walletEthereum1 = {
  accountName: 'Account 2',
  address: '0xC5fa054DDC662794944FB9D50BF6412504D30b2b',
  privateKey:
    '869218228594cff6f7d270d1a7c9e7d997be8467a96ff4f6105bf0050761bbb4da0f87670c02348d737da9125ace4c5d8c1a2e56598b1fa3707808835591779d602189997a47cb420c84a18dc5cc9072',
  phrase:
    '86712b4cd25b7b3cfd91d7b7cc8c05485f1d873a643e4863664ed325d6815c383808d307b78e58a95d7757c163630c3ae6d519680611eb2da3c7282c0ad002383ac7b541867dc8c25a741b86e7e6899c',
  // _id: new ObjectId('65498afa1d8bb238bdab9a40'),
};
const tokenEthereum1 = {
  // "_id": {
  //   "$oid": "652c68058a1e328256fef033"
  // },
  id: 'ethereum',
  symbol: 'eth',
  name: 'Ethereum',
  image:
    'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628',
  current_price: 1771.42,
  market_cap: '215529918225',
  market_cap_rank: 2,
  fully_diluted_valuation: '215529918225',
  total_volume: '16575028597',
  high_24h: '1861.11',
  low_24h: '1770.23',
  price_change_24h: '-40.0072878208216',
  price_change_percentage_24h: '-2.20861',
  market_cap_change_24h: '704227495',
  market_cap_change_percentage_24h: '0.32781',
  circulating_supply: '120260008.347644',
  total_supply: '120260008.347644',
  max_supply: null,
  ath: 4878.26,
  ath_change_percentage: '-63.53572',
  ath_date: '2021-11-10T14:24:19.604Z',
  atl: 0.432979,
  atl_change_percentage: '410733.52956',
  atl_date: '2015-10-20T00:00:00.000Z',
  roi: {
    times: 68.89123028749954,
    currency: 'btc',
    percentage: 6889.123028749955,
  },
  last_updated: {
    $date: '2023-10-26T15:32:23.061Z',
  },
  chainId: '1',
  updatedAt: {
    $date: '2023-11-08T12:44:37.157Z',
  },
  chain: 'Ethereum',
  address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  decimals: 18,
};

//
const tokenEthereum2 = {
  // "_id": {
  //   "$oid": "652c68058a1e328256fef036"
  // },
  id: 'tether',
  symbol: 'usdt',
  name: 'Tether',
  image:
    'https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661',
  current_price: 0.999972,
  market_cap: '84205562923',
  market_cap_rank: 3,
  fully_diluted_valuation: '84205562923',
  total_volume: '193111663063',
  high_24h: '1.003',
  low_24h: '0.994532',
  price_change_24h: '-0.002799963643488779',
  price_change_percentage_24h: '-0.27922',
  market_cap_change_24h: '-39911298.171188354',
  market_cap_change_percentage_24h: '-0.04738',
  circulating_supply: '84391561211.9936',
  total_supply: '84391561211.9936',
  max_supply: null,
  ath: 1.32,
  ath_change_percentage: '-24.7247',
  ath_date: '2018-07-24T00:00:00.000Z',
  atl: 0.572521,
  atl_change_percentage: '73.96113',
  atl_date: '2015-03-02T00:00:00.000Z',
  roi: null,
  last_updated: {
    $date: '2023-10-26T15:30:01.021Z',
  },
  chainId: '1',
  type: 'ERC20',
  updatedAt: {
    $date: '2023-11-07T00:31:22.777Z',
  },
  chain: 'Ethereum',
  address: usdtAddressEthereum,
  decimals: 6,
};

const tokenEthereumGoUSDT = {
  // "_id": {
  //   "$oid": "652c68058a1e328256fef036"
  // },
  id: 'tether',
  symbol: 'usdt',
  name: 'Tether USD (Go)',
  image:
    'https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661',
  current_price: 0.999972,
  market_cap: '84205562923',
  market_cap_rank: 3,
  fully_diluted_valuation: '84205562923',
  total_volume: '193111663063',
  high_24h: '1.003',
  low_24h: '0.994532',
  price_change_24h: '-0.002799963643488779',
  price_change_percentage_24h: '-0.27922',
  market_cap_change_24h: '-39911298.171188354',
  market_cap_change_percentage_24h: '-0.04738',
  circulating_supply: '84391561211.9936',
  total_supply: '84391561211.9936',
  max_supply: null,
  ath: 1.32,
  ath_change_percentage: '-24.7247',
  ath_date: '2018-07-24T00:00:00.000Z',
  atl: 0.572521,
  atl_change_percentage: '73.96113',
  atl_date: '2015-03-02T00:00:00.000Z',
  roi: null,
  last_updated: {
    $date: '2023-10-26T15:30:01.021Z',
  },
  chainId: '1',
  type: 'ERC20',
  updatedAt: {
    $date: '2023-11-07T00:31:22.777Z',
  },
  chain: 'Ethereum',
  address: usdtAddressEthereum,
  decimals: 6,
};

const tokenEthereum3 = {
  name: 'Tether USD',
  symbol: 'usdt',
  address: usdtAddressTron, // official Ethereum usdt address
  decimals: 6,
};

const txDataEthereum1 = {
  tToken: tokenEthereum1,
  userAddress: '0x05301d500C789bd59aC307Bef714d10EbF22C1e3',
  amount: '0.001',
  tValue: '0.001',
};

const txDataEthereum2 = {
  tToken: tokenEthereumGoUSDT,
  userAddress: '0x05301d500C789bd59aC307Bef714d10EbF22C1e3',
  amount: '10',
  tValue: '10',
};

// sendEthereumTest(txDataEthereum1, walletEthereum1)
// sendEthereumTest(txDataEthereum2, walletEthereum1)

//============================{Send bitcoin test}========================
async function sendBitcoinTest(txData, wallet) {
  let response;
  console.log('BTC sending in progress');
  const walletAddress = wallet?.address;
  // const privateKey = wallet?.privateKey;

  const hdPrivateKeyEncrypted = wallet?.privateKey;
  // Decrypt the private key for use in Tron transactions
  const decryptedPrivateKey = decryptPrivateKey(hdPrivateKeyEncrypted);
  const privateKey = decryptedPrivateKey;
  console.log({ privateKey: privateKey });

  const amount = txData?.tValue;
  const receiver = txData?.userAddress;

  const amountToSend = Number(amount);
  // const amount = '0.00015';
  const recieverAddress = receiver;
  const sourceAddress = wallet?.address;
  const satoshiToSendRaw = amountToSend * 1e8;
  const satoshiToSend = Number(satoshiToSendRaw.toFixed(0));

  let fee = 0;
  let inputCount = 0;
  let outputCount = 2;

  // const recommendedFee = await axios.get(
  //   'https://bitcoinfees.earn.com/api/v1/fees/recommended'
  // );

  // console.log({recommendedFee: recommendedFee})

  const transaction = new bitcore.Transaction();
  let totalAmountAvailable = 0;

  let inputs = [];
  let resp;
  if (network === testnet) {
    resp = await axios({
      method: 'GET',
      url: `https://blockstream.info/testnet/api/address/${sourceAddress}/utxo`,
    });
  } else {
    resp = await axios({
      method: 'GET',
      url: `https://blockstream.info/api/address/${sourceAddress}/utxo`,
    });
  }

  const utxos = resp.data;

  // console.log({utxos: utxos})

  for (const utxo of utxos) {
    let input = {};
    input.satoshis = utxo.value;
    input.script = bitcore.Script.buildPublicKeyHashOut(sourceAddress).toHex();
    input.address = sourceAddress;
    input.txId = utxo.txid;
    input.outputIndex = utxo.vout;
    totalAmountAvailable += utxo.value;
    inputCount += 1;
    inputs.push(input);
  }

  /**
   * In a bitcoin transaction, the inputs contribute 180 bytes each to the transaction,
   * while the output contributes 34 bytes each to the transaction. Then there is an extra 10 bytes you add or subtract
   * from the transaction as well.
   * */

  const transactionSize = inputCount * 180 + outputCount * 34 + 10 - inputCount;
  // fee = transactionSize * recommendedFee.data.hourFee / 3; // satoshi per byte
  fee = transactionSize * 1; // 1 sat/byte is fine for testnet but update for mainnet
  if (network === testnet) {
    fee = transactionSize * 1; // 1 sat/byte is fine for testnet
  }
  if (totalAmountAvailable - satoshiToSend - fee < 0) {
    throw new Error('Balance is too low for this transaction');
  }
  //Set transaction input
  transaction.from(inputs);

  // set the recieving address and the amount to send
  transaction.to(recieverAddress, satoshiToSend);

  // Set change address - Address to receive the left over funds after transfer
  transaction.change(sourceAddress);

  //manually set transaction fees: 20 satoshis per byte
  transaction.fee(Math.round(fee));

  // Sign transaction with your private key
  transaction.sign(privateKey);

  // serialize Transactions
  const serializedTransaction = transaction.serialize();

  // Send transaction
  let result;

  if (network === testnet) {
    result = await axios({
      method: 'POST',
      url: `https://blockstream.info/testnet/api/tx`,
      data: serializedTransaction,
    });
  } else {
    result = await axios({
      method: 'POST',
      url: `https://blockstream.info/api/tx`,
      data: serializedTransaction,
    });
  }

  // return result.data;
  console.log({ result: result });

  // let response = result.data;
  // console.log({ response: response });

  if (result.data) {
    response = {
      hashOut: result.data,
      //======={not necessary}=============
      sender: walletAddress,
      sucess: true,
      receiver,
      amount: amount,
      action: 'send',
    };
    console.log({ response: response });
  }

  if (response) {
    console.log({ response: response });
    return response;
  }

  //response: 'ad6f20b93731b3d1f16d0589c916bcc64f784bd221deaa885fd7f57a34596e04'
  //response: '001c0541c448ad5203b82c4726c33fff176a9925c55039ca9dd46633faad4739'
  // res.status(200).json(response);
}

const tokenBitcoin1 = {
  // "_id": {
  //   "$oid": "652c68058a1e328256fef032"
  // },
  id: 'bitcoin',
  symbol: 'btc',
  name: 'Bitcoin',
  image:
    'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
  current_price: 33905,
  market_cap: '667879142065',
  market_cap_rank: 1,
  fully_diluted_valuation: '718347096207',
  total_volume: '12947120750',
  high_24h: '35012',
  low_24h: '33900',
  price_change_24h: '-1023.3553420143944',
  price_change_percentage_24h: '-2.92984',
  market_cap_change_24h: '-908821573.8842773',
  market_cap_change_percentage_24h: '-0.13589',
  circulating_supply: '19524631',
  total_supply: 21000000,
  max_supply: 21000000,
  ath: 69045,
  ath_change_percentage: '-50.76197',
  ath_date: '2021-11-10T14:24:11.849Z',
  atl: 67.81,
  atl_change_percentage: '50035.35823',
  atl_date: '2013-07-06T00:00:00.000Z',
  roi: null,
  last_updated: {
    $date: '2023-10-26T15:32:32.407Z',
  },
  updatedAt: {
    $date: '2023-11-07T00:07:34.201Z',
  },
  chain: 'Bitcoin',
};
//balances: 1000 // '0.00001 tBTC'
const walletBitcoin1 = {
  accountName: 'Account 4',
  address: 'mvDdqnRWf4FRnZT5pSf4FFftoPRYLbB5N1',
  privateKey:
    '77184a44238054adebd6bcff4b2ade09ac3b8a1e5324fc2f51ced0058eb21e1c3c2b003b202fe30ffbcf82128ef6b5497d6b93c1e5077275cadd09f6ff21716ba21f3cf6e5d1a0bb403d6d864fcd0dad',
  // _id: new ObjectId('6549a881f494abb0fb4fca78'),
};
//balances: 1001000 // '0.01001 tBTC'
const walletBitcoin2 = {
  accountName: 'Account 6',
  address: 'n3KzXkuLZdqhGYVn2kSFMarGWvrc7wEJ5d',
  privateKey:
    'c6a70e507945db600473df484c34f27786a059a6cbd19066e7ae6155d78fc172bc5362630994a6aa21380437ab21ef1472605369daf08a9be93e1c92fffe81650daecb85f84eef2ac070335e947d8ecc',
  // _id: new ObjectId('6549e350c80d8f28bed0b2eb'),
};

//'0.05167976 tBTC'
const walletBitcoinMaster = {
  accountName: 'Account Master',
  address: 'mwZDqNNGFJLxEGWq2nHtqgUH1nm1dW2TYk',
  privateKey:
    'a9b904b94b966beb33f99845ee6b07c75bb1ac8364f0290481640cba2a113a17', // direct privateKey
  // _id: new ObjectId('6549e350c80d8f28bed0b2eb'),
};

const txDataBitcoin1 = {
  tToken: tokenBitcoin1,
  userAddress: walletBitcoin1?.address,
  amount: '0.001',
  tValue: '0.001',
};

// sendBitcoinTest(txDataBitcoin1, walletBitcoin2)

//========================={                     }=================================================
//========================={  BALANCES            }=================================================
//========================={                     }=================================================

/********************************************************************************************************************** */
/********************************************************************************************************************** */
/*********************************************     BLOCKCHAIN TRANSACTION MONITORING    ******************************* */
/********************************************************************************************************************** */
/********************************************************************************************************************** */
const getNetworkRPC = async (chainId) => {
  let networkRPC = '';
  // let decimals = '';

  switch (chainId) {
    //MAINNETS
    //Arbitrum
    case '42161':
      networkRPC = 'https://goerli-rollup.arbitrum.io/rpc';

      break;

    //Aurora
    case '1313161554':
      networkRPC = 'https://mainnet.aurora.dev';

      break;

    //Avalanche
    case '43114':
      networkRPC = 'https://api.avax.network/ext/bc/C/rpc';

      break;

    //Binance
    case '56':
      networkRPC = 'https://rpc.ankr.com/bsc';

      break;

    //ETH
    case '1':
      networkRPC = 'https://cloudflare-eth.com';

      break;

    //Fantom
    case '250':
      networkRPC = 'https://rpc.ankr.com/fantom/';

      break;

    //Gnosis
    case '100':
      networkRPC = 'https://rpc.gnosischain.com/';

      break;

    //Klaytn
    case '8217':
      networkRPC = 'https://rpc.ankr.com/klaytn';

      break;

    //Optimism
    case '10':
      networkRPC = 'https://mainnet.optimism.io';

      break;

    //Polygon
    case '137':
      networkRPC = 'https://polygon-rpc.com';

      break;

    //================================{TESTNETS}=====================================
    //PolygonMumbai
    case '80001':
      networkRPC = 'https://matic-mumbai.chainstacklabs.com';

      break;

    //GoerliEth

    case '5':
      networkRPC = 'https://rpc.ankr.com/eth_goerli';

      break;

    //BinanceTestnet

    case '97':
      networkRPC = 'https://data-seed-prebsc-1-s1.binance.org:8545/';

      break;

    default:
      console.warn('Please choose a token!');
      break;
  }

  //========{Formatting networkRPC Output}=================================
  let networkRPCToJson = JSON.stringify(networkRPC);
  let networkRPCFormatted = networkRPCToJson.replace(
    /^["'](.+(?=["']$))["']$/,
    '$1'
  );
  //========{Formatting decimals Output}=================================
  // let decimalsToJson = JSON.stringify(decimals);
  // let decimalsFormatted = decimalsToJson.replace(
  //   /^["'](.+(?=["']$))["']$/,
  //   '$1'
  // );

  let response = {
    networkRPC: networkRPCFormatted,
  };

  return response;

  // res.status(200).json({ status: isAvailable, token: userToken });
};

// Get all UserTransactions by Id and
//keep this call under a useffect so the new update can be receieved by the user as soon as the status changes
const getTransactionByTxId = asyncHandler(async (req, res) => {
  const { txId } = req.params; // transaction id
  console.log({ txId: txId });
  res.json(
    await Transaction.findOne({ txId: Number(txId) }).populate('message')
  );
});

/********************************************************************************************************************** */
/********************************************************************************************************************** */
/*********************************************     BLOCKCHAIN TRANSACTION MONITORING    ******************************* */
/********************************************************************************************************************** */
/********************************************************************************************************************** */

async function balanceEth(req, res) {
  //const { address } = req.query;
  const address = '0xE89f1B55964FF68a0dAC5eE6da9de64E8EcE3fC0';
  const address1 = '0xE89f1B55964FF68a0dAC5eE6da9de64E8EcE3fC0'; //0.229
  const address2 = '0x6fba12b1370499C5824E9383c445C3298D72501C'; // 0.668

  // const provider = ethers.getDefaultProvider("homestead");

  // const network = 'https://rpc.ankr.com/eth_goerli';
  // const provider = new ethers.providers.JsonRpcProvider(network);
  const networkGetBlock =
    'https://go.getblock.io/1e391968bab843c1bf3f3c42181942b0';
  const provider = new ethers.providers.JsonRpcProvider(networkGetBlock);

  const balance = await provider.getBalance(address2);
  const balanceFormat = ethers.utils.formatEther(balance);

  console.log({ balance: balanceFormat });

  //goerli: 0.22 ETH
  //res.json({ balance: balanceFormat });
}

// balanceEth();

async function balanceERC20(req, res) {
  try {
    const address = '0x6fba12b1370499C5824E9383c445C3298D72501C';
    const network = 'https://rpc.ankr.com/eth_goerli';
    //const network = 'goerli';
    //const rpc = 'https://rpc.ankr.com/eth_goerli';
    //const network = rpc;
    const privateKey =
      '0x2b14a6b0c7d4c8ab437bb22714ae3813ebcf65967fa094087aae5bc99dd936fc';

    //const key =
    // const privateKey = JSON.stringify(key, undefined, 2);

    const provider = new ethers.providers.JsonRpcProvider(network);

    const signer = new ethers.Wallet(privateKey, provider);
    const ERC20AddressGoerliUSDC = '0x35241FD7824991CA9DD9ffd1930b8FbE4fc5c04C'; //USDC
    const ERC20AddressGoerliTUSD = '0x57fDce9e3E942c39518a7171945001325C3768f8'; //TUSD

    const symbolUSDT = 'USDC';
    const symbolTUSD = 'TUSD';

    //

    //const decimals = await contract.decimals();
    const decimals = '18';
    const contract = new ethers.Contract(
      ERC20AddressGoerliTUSD,
      ERC20Abi,
      signer
    );

    //const balance = await contract.balanceOf(address);
    const balanceRaw = await contract.balanceOf(address);
    const balance = ethers.utils.formatEther(balanceRaw, decimals); // check balance

    console.log({
      status: 'Approved',
      symbol: symbolTUSD,
      'current balance': balance,
    });
    //res.status(200).json('ok');
  } catch (e) {
    const error = e.toString();
    console.log(error);
  }
}

async function gasEstimateERC20(req, res) {
  try {
    const address = '0x6fba12b1370499C5824E9383c445C3298D72501C';
    const network = 'https://rpc.ankr.com/eth_goerli';
    //const network = 'goerli';
    //const rpc = 'https://rpc.ankr.com/eth_goerli';
    //const network = rpc;
    const privateKey =
      '0x2b14a6b0c7d4c8ab437bb22714ae3813ebcf65967fa094087aae5bc99dd936fc';
    const to = '0x56c8b61DB2A5bF5679172901585E76EedB6Bc3e6';

    const amount = '1000';

    //const key =
    // const privateKey = JSON.stringify(key, undefined, 2);

    const provider = new ethers.providers.JsonRpcProvider(network);

    const signer = new ethers.Wallet(privateKey, provider);
    const ERC20AddressGoerliUSDC = '0x35241FD7824991CA9DD9ffd1930b8FbE4fc5c04C'; //USDC
    const ERC20AddressGoerliTUSD = '0x57fDce9e3E942c39518a7171945001325C3768f8'; //TUSD
    const symbolUSDT = 'USDC';
    const symbolTUSD = 'TUSD';
    //const decimals = await contract.decimals();
    const decimals = '18';
    const contract = new ethers.Contract(
      ERC20AddressGoerliTUSD,
      ERC20Abi,
      signer
    );

    // send token
    const value = ethers.utils.parseEther(amount, decimals); // send

    const balanceRaw = await contract.balanceOf(address); // BigNumber
    const balance = ethers.utils.formatUnits(balanceRaw, decimals);
    const estimatedGasRaw = await contract.estimateGas.transfer(to, value);
    //await estimatedGas;

    const estimatedGasHex = await Promise.resolve(estimatedGasRaw);
    const estimatedGas = ethers.utils.formatUnits(estimatedGasHex);

    //const estimatedGasHex = ethers.utils.hexlify(estimatedGasRaw);

    console.log({
      status: 'Gas Price',
      amount: amount,
      symbol: symbolTUSD,
      'Previous balance': balance,
      estimatedGas: estimatedGas,
    });
    //res.status(200).json('ok');
  } catch (e) {
    const error = e.toString();
    console.log(error);
  }
}

// Good
async function sendERC20() {
  //goerli: 0.62 ETH
  try {
    const address = '0x6fba12b1370499C5824E9383c445C3298D72501C';
    const network = 'https://rpc.ankr.com/eth_goerli';
    //const network = 'goerli';
    //const rpc = 'https://rpc.ankr.com/eth_goerli';
    //const network = rpc;
    const privateKey =
      '0x2b14a6b0c7d4c8ab437bb22714ae3813ebcf65967fa094087aae5bc99dd936fc';
    const to = '0x56c8b61DB2A5bF5679172901585E76EedB6Bc3e6';

    const amount = '1000';

    //const key =
    // const privateKey = JSON.stringify(key, undefined, 2);

    const provider = new ethers.providers.JsonRpcProvider(network);

    const signer = new ethers.Wallet(privateKey, provider);
    const ERC20AddressGoerliUSDC = '0x35241FD7824991CA9DD9ffd1930b8FbE4fc5c04C'; //USDC
    const ERC20AddressGoerliTUSD = '0x57fDce9e3E942c39518a7171945001325C3768f8'; //TUSD
    const symbolUSDT = 'USDC';
    const symbolTUSD = 'TUSD';
    //const decimals = await contract.decimals();
    const decimals = '18';
    const contract = new ethers.Contract(
      ERC20AddressGoerliTUSD,
      ERC20Abi,
      signer
    );

    // send token
    const value = ethers.utils.parseEther(amount, decimals); // send

    const balanceRaw = await contract.balanceOf(address);
    const balance = ethers.utils.formatEther(balanceRaw, decimals);
    //     await erc20_rw.estimateGas.transfer("ricmoo.eth", parseUnits("1.23"));
    // // { BigNumber: "34458" }

    const estimatedGasRaw = await contract.estimateGas.transfer(to, value);
    const estimatedGasHex = await Promise.resolve(estimatedGasRaw);
    const estimatedGas = ethers.utils.formatUnits(estimatedGasHex);
    console.log({ 'estimated gas': estimatedGas });

    const gasPriceRaw = provider.getGasPrice();
    const gasPriceHex = await Promise.resolve(gasPriceRaw);
    const gasPrice = ethers.utils.formatUnits(gasPriceHex);
    console.log({ 'gas price ': gasPrice });

    const tx = await contract.transfer(to, value, {
      gasLimit: 230000,
      //gasPrice: gasPrice,
    });
    await tx.wait();

    const balanceRaw2 = await contract.balanceOf(address);
    const balance2 = ethers.utils.formatEther(balanceRaw2, decimals);

    console.log({
      status: 'Sent',
      from: address,
      to: to,
      amount: amount,
      symbol: symbolTUSD,
      'Previous balance': balance,
      'current balance': balance2,
      type: 'ERC20',
      wallet: 'GoWallet',
      estimatedGas: estimatedGas,
      gasPrice: gasPrice,
    });
    //res.status(200).json('ok');
  } catch (e) {
    const error = e.toString();
    console.log(error);
  }
}
//sendERC20();

// NATIVE TOKENS
async function sendNativeTokenEthereum() {
  try {
    const address = '0x6fba12b1370499C5824E9383c445C3298D72501C';
    //const network = 'https://data-seed-prebsc-1-s1.binance.org:8545';
    //const rpc = "https://data-seed-prebsc-1-s1.binance.org:8545"// binance
    //const network = 'goerli';
    const network = 'https://rpc.ankr.com/eth_goerli';

    const privateKey =
      '0x2b14a6b0c7d4c8ab437bb22714ae3813ebcf65967fa094087aae5bc99dd936fc';
    const to = '0x88F22c84C57EbC890C63c48E20ebbaF9e853eBE4';
    const amount = '0.01';

    const value = ethers.utils.parseEther(amount);

    //const key =
    // const privateKey = JSON.stringify(key, undefined, 2);

    const provider = new ethers.providers.JsonRpcProvider(network);

    const signer = new ethers.Wallet(privateKey, provider); // by Wallet// This can write to the blockchain and make a signed/unsigned transactions

    const balanceRaw1 = await provider.getBalance(address);
    const balance1 = ethers.utils.formatEther(balanceRaw1);

    const gasPriceRaw = provider.getGasPrice();
    const gasPriceHex = await Promise.resolve(gasPriceRaw);
    const gasPrice = ethers.utils.formatUnits(gasPriceHex);
    console.log({ 'gas price ': gasPrice });

    const tx = await signer.sendTransaction({ to, value });

    await tx.wait();

    const balanceRaw2 = await provider.getBalance(address);
    const balance2 = ethers.utils.formatEther(balanceRaw2);

    console.log('ok');
    console.log({
      status: 'Sent',
      amount: amount,
      from: address,
      to: to,
      'previous balance': balance1,
      'current balance': balance2,
      type: 'Native',
      symbol: 'ETH',
      wallet: 'GoWallet',
      gasPrice: gasPrice,
    });
    //res.status(200).json('ok');
  } catch (e) {
    const error = e.toString();
    console.log(error);
  }
}

//     const address1 = '0xE89f1B55964FF68a0dAC5eE6da9de64E8EcE3fC0';
//     const privateKey1 = "0xc5707e1d6a86cd65c0f86fa7f24fc17c6245c6f8a6eb10c05081a855baf992ed"

// const address2 = '0x6fba12b1370499C5824E9383c445C3298D72501C';
// const privateKey2 ='0x2b14a6b0c7d4c8ab437bb22714ae3813ebcf65967fa094087aae5bc99dd936fc';

//new account: 0x2754897d2B0493Fd0463281e36db83BB202f6343

// send();

const sendTokenEthereum = asyncHandler(async () => {
  const fromTokenAddress = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
  const chainId = '1';

  const fromTokenAddressDecimals = '18';

  const network = 'https://rpc.ankr.com/eth_goerli';
  let networkRPC = network;
  // const fromAddress = '0xE89f1B55964FF68a0dAC5eE6da9de64E8EcE3fC0';
  // const privateKey =
  // '0xc5707e1d6a86cd65c0f86fa7f24fc17c6245c6f8a6eb10c05081a855baf992ed';

  const fromAddress = '0x6fba12b1370499C5824E9383c445C3298D72501C';
  const privateKey =
    '0x2b14a6b0c7d4c8ab437bb22714ae3813ebcf65967fa094087aae5bc99dd936fc';

  const to = '0x2754897d2B0493Fd0463281e36db83BB202f6343';
  // const amount = '0.21';
  const amount = '0.1';
  const receiver = to;

  //==========={get walletAddress}=========================================================
  let walletAddress = fromAddress;
  //==========={get Privatekey}=========================================================

  const provider = new ethers.providers.JsonRpcProvider(networkRPC); // default is ethereum homestead
  const signer = new ethers.Wallet(privateKey, provider);

  let type = '';

  // if (fromTokenAddress != '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
  //   type = 'Token';
  // } else {
  //   type = 'Native';
  // }

  if (fromTokenAddress != '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
    const contract = new ethers.Contract(fromTokenAddress, ERC20Abi, signer);
    type = 'Token';

    const tx = await contract.transfer(
      receiver,
      ethers.utils
        .parseUnits(amount.toString(), fromTokenAddressDecimals.toString())
        .toString()
    );
    await tx.wait();

    const rawBalance = await contract.balanceOf(walletAddress);
    const balance = ethers.utils.formatEther(rawBalance.toString()).toString();
    //const balance = ethers.utils.formatUnits(rawBalance, decimals);

    const response = {
      sender: walletAddress,
      sucess: true,
      receiver,
      amount: amount,
      balance: balance,
      type: type,
      action: 'send',
    };
    console.log(response);
  } else {
    type = 'Native';
    const tx = {
      to: receiver,
      value: ethers.utils.parseEther(amount.toString()).toString(),
    };

    const rawBalance = await provider.getBalance(walletAddress);
    const balance = ethers.utils.formatEther(rawBalance.toString()).toString();
    console.log({ balance: balance });
    //To get gas estimate
    // let estimatedGasRaw = signer.estimateGas(tx); // to setimate gas
    // const estimatedGas = estimatedGasRaw.toString();
    // console.log(estimatedGas);

    signer.sendTransaction(tx).then((hash) => {
      let response = {
        txHash: hash,
        sender: walletAddress,
        success: true,
        amount: amount,
        balance: balance,
        type: type,
        action: 'send',
        message: 'Successfull',
      };
      console.log(response);
      // res.status(201).json(response);
    });
  }
});

// sendTokenEthereum()

/********************************************************************************************************************** */
/********************************************************************************************************************** */
/*********************************************     GET TRON    *************************************************** */
/********************************************************************************************************************** */
/********************************************************************************************************************** */

const checkConfirmedTransactiosnToAddress = async () => {
  const address = 'THFxGz1Pq5pyL7kdjZFwFqbP8zbBSLsYzE'; // // HD wallet
  const address2 = 'TWo1bbdmV67hyL5747WMzSeD3uwW5P9tCa'; // Wallet #1

  const response = await getOnlyConfirmedTransactiosnToAddress(address);
  console.log(response);
  console.log({ responseData: response?.data });
  console.log({ responseRawData: response?.data?.raw_data });

  // sample result
  // const result = [
  //   {
  //     ret: [Array],
  //     signature: [Array],
  //     txID: 'e43fdbeed9493ee886c1b16c91e0de2b4cd9267c1736a114a0d781728cc5894d',
  //     net_usage: 0,
  //     raw_data_hex: '0a02008b22087be45f67507a2a8940b8db8495b8315a69080112650a2d747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e5472616e73666572436f6e747261637412340a1541bdadc90ce073c4464b03fcd9ccc8ea0a26b5132b1215414ff3a8df95dd76a23819562e6c185d94644a00cd1880a8d6b90770b6938195b831',
  //     net_fee: 100000,
  //     energy_usage: 0,
  //     blockNumber: 41418910,
  //     block_timestamp: 1698703626000,
  //     energy_fee: 0,
  //     energy_usage_total: 0,
  //     raw_data: [Object],
  //     internal_transactions: []
  //   }
  // ]
};

// checkConfirmedTransactiosnToAddress()

// const raw_data_hex =
//   '0a02008b22087be45f67507a2a8940b8db8495b8315a69080112650a2d747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e5472616e73666572436f6e747261637412340a1541bdadc90ce073c4464b03fcd9ccc8ea0a26b5132b1215414ff3a8df95dd76a23819562e6c185d94644a00cd1880a8d6b90770b6938195b831';
// let convertedhex = tronWeb.fromHex(raw_data_hex);
// console.log({ convertedhex: convertedhex });

// var hex = raw_data_hex.toString();
// console.log(hex);
// var parsed = JSON.parse(hex);
// console.log(parsed);

const checkConfirmedTransactiosnFromAddress = async () => {
  const address = 'THFxGz1Pq5pyL7kdjZFwFqbP8zbBSLsYzE';
  const response = await getOnlyConfirmedTransactiosnFromAddress(address);
  console.log(response);
};

const checkTransactionByQuery = async () => {
  let receiver = 'TWo1bbdmV67hyL5747WMzSeD3uwW5P9tCa'; // Replace with wallet A's address
  let sender = 'THFxGz1Pq5pyL7kdjZFwFqbP8zbBSLsYzE'; // Replace with wallet B's address
  const params = {
    only_to: receiver,
    only_from: sender,
  };
  const response = await getTransactionByQuery(params);
  console.log(response);
  console.log({ responseData: response?.data });
};

// checkTransactionByQuery()

// const tronWebTrx = tronWeb.trx;
// console.log({ tronWebTrx: tronWebTrx });
// const txID= 'e43fdbeed9493ee886c1b16c91e0de2b4cd9267c1736a114a0d781728cc5894d';
// const getTransac = tronWeb.trx.getTransaction(txID);
// console.log({ getTransac: getTransac });

// const getTransacHex = await Promise.resolve(getTransac);
// console.log({ getTransac: getTransac });
//  console.log({ getTransacJson: JSON.stringify(getTransac) });

async function checkIt() {
  const txID =
    'e43fdbeed9493ee886c1b16c91e0de2b4cd9267c1736a114a0d781728cc5894d';
  const getTransac = tronWeb.trx.getTransaction(txID);
  // console.log({ getTransac: getTransac });

  const getTransacHex = await Promise.resolve(getTransac);
  // console.log({ getTransacHex: getTransacHex });

  const getRawData = getTransacHex?.raw_data;

  const getRawDataHex = await Promise.resolve(getRawData);
  // console.log({ getRawDataHex: getRawDataHex });

  const getContract = getRawDataHex?.contract;
  console.log({ getContract: getContract });

  const parameter = getContract[0]?.parameter;
  console.log({ parameter: parameter });

  const fromAddress = tronWeb.address.fromHex(parameter?.value?.owner_address);
  const toAddress = tronWeb.address.fromHex(parameter?.value?.to_address);
  const amountRaw = parameter?.value?.amount;
  const amount = tronWeb.fromSun(amountRaw); // convert to TRX

  let summary = {
    fromAddress,
    toAddress,
    amountRaw,
    amount,
  };
  console.log(summary);

  // const result = {
  //   getTransacHex: {
  //     ret: [[Object]],
  //     signature: [
  //       '110fc4610b126bd4da9e128641ed6b4a0efa74e59199f0d694dc85f2704d7bd474e7e6a5f1955372e2d0ae6581dcd098e0c4b6beb36575528025c82d7730625901',
  //     ],
  //     txID: 'e43fdbeed9493ee886c1b16c91e0de2b4cd9267c1736a114a0d781728cc5894d',
  //     raw_data: {
  //       contract: [Array],
  //       ref_block_bytes: '008b',
  //       ref_block_hash: '7be45f67507a2a89',
  //       expiration: 1698703683000,
  //       timestamp: 1698703624630,
  //     },
  //     raw_data_hex:
  //       '0a02008b22087be45f67507a2a8940b8db8495b8315a69080112650a2d747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e5472616e73666572436f6e747261637412340a1541bdadc90ce073c4464b03fcd9ccc8ea0a26b5132b1215414ff3a8df95dd76a23819562e6c185d94644a00cd1880a8d6b90770b6938195b831',
  //   },
  // };

  const rawDataResult = {
    getRawDataHex: {
      contract: [[Object]],
      ref_block_bytes: '008b',
      ref_block_hash: '7be45f67507a2a89',
      expiration: 1698703683000,
      timestamp: 1698703624630,
    },
  };

  const resulofparameter = {
    parameter: {
      value: {
        amount: 2000000000,
        owner_address: '41bdadc90ce073c4464b03fcd9ccc8ea0a26b5132b',
        to_address: '414ff3a8df95dd76a23819562e6c185d94644a00cd',
      },
      type_url: 'type.googleapis.com/protocol.TransferContract',
    },
  };

  const formattedResult = {
    fromAddress: 'TTG8u8fUKqJwMtB59ppaWqgFVGDb5ojWPU',
    toAddress: 'THFxGz1Pq5pyL7kdjZFwFqbP8zbBSLsYzE',
    amountRaw: 2000000000,
    amount: 200,
  };
}

// checkIt();

//
async function getNativeBalanceTron() {
  let receiver = 'TWo1bbdmV67hyL5747WMzSeD3uwW5P9tCa'; // Replace with wallet A's address
  let sender = 'THFxGz1Pq5pyL7kdjZFwFqbP8zbBSLsYzE'; // Replace with wallet B's address
  tronWeb.trx.getBalance(sender).then((result) => {
    console.log({ balance_raw: result });
    const amount = tronWeb.fromSun(result); // convert to TRX
    console.log({ balanceTRC: amount });
  });
  //50000000 // 50 TRC
  //1948900000 //1984.9 TRC
}
// getNativeBalanceTron()

async function getContractTron() {
  // tronWeb.trx.getContract("TEEXEWrkMFKapSMJ6mErg39ELFKDqEs6w3").then(console.log)
  const contractaddress = 'TEEXEWrkMFKapSMJ6mErg39ELFKDqEs6w3';
  tronWeb.trx.getContract(contractaddress).then((result) => {
    // console.log({ contract_raw: result });
    console.log({ contract_name: result?.name });
    console.log({ contract_address: result?.origin_address });
    console.log({ contract_abi: result?.abi });
    console.log({ contract_address: result?.contract_address });
  });
}
// getContractTron()

async function getTransactionInfoTron() {
  const txID =
    'e43fdbeed9493ee886c1b16c91e0de2b4cd9267c1736a114a0d781728cc5894d';
  tronWeb.trx.getTransactionInfo(txID).then((result) => {
    console.log({ result: result });
    // console.log({ log: result?.log });
    // console.log({ data: result?.log[0]?.data });
    // console.log({ topics: result?.log[0]?.topics[0] });
    // console.log({ address: result?.log[0]?.address });
  });

  // const response ={
  //   result: {
  //     id: 'e43fdbeed9493ee886c1b16c91e0de2b4cd9267c1736a114a0d781728cc5894d',
  //     fee: 1100000,
  //     blockNumber: 41418910,
  //     blockTimeStamp: 1698703626000,
  //     contractResult: [ '' ],
  //     receipt: { net_fee: 100000 }
  //   }
  // }
}

// getTransactionInfoTron()

async function getTransactionToAddressExplorerTron() {
  const receiver = 'TWo1bbdmV67hyL5747WMzSeD3uwW5P9tCa'; // Replace with wallet A's address
  const sender = 'THFxGz1Pq5pyL7kdjZFwFqbP8zbBSLsYzE'; // Replace with wallet B's address

  const response = await getTransactionsToAddressExplorer(receiver);
  console.log(response);
}

// getTransactionToAddressExplorerTron()

async function getTransactionInfoByExplorerTron() {
  const receiver = 'TWo1bbdmV67hyL5747WMzSeD3uwW5P9tCa'; // Replace with wallet A's address
  const sender = 'THFxGz1Pq5pyL7kdjZFwFqbP8zbBSLsYzE'; // Replace with wallet B's address

  const response = await getTransactionsInfoExplorer();
  console.log(response);
}

// getTransactionInfoByExplorerTron()
//Tron has already sorted transaction by the latest, so there is no need to sort again using allData[lastIndex
async function verifyTronSentToBlendery(blenderyAddress) {
  let targetTransaction;

  // const userAddress = 'THFxGz1Pq5pyL7kdjZFwFqbP8zbBSLsYzE'; // // HD wallet
  // const blenderyAddress = 'TWo1bbdmV67hyL5747WMzSeD3uwW5P9tCa'; // Wallet #1
  const response = await getOnlyConfirmedTransactiosnToAddress(blenderyAddress);
  console.log(response);
  // console.log({newData: response?.data})
  const txID = response?.data[0]?.txID; // for final deployment// only one transaction

  console.log(txID);
  if (txID) {
    console.log(txID);
    const getTransac = tronWeb.trx.getTransaction(txID);
    const getTransacHex = await Promise.resolve(getTransac);
    const getRawData = getTransacHex?.raw_data;
    const getRawDataHex = await Promise.resolve(getRawData);
    const getContract = getRawDataHex?.contract;
    const parameter = getContract[0]?.parameter;
    const fromAddress = tronWeb.address.fromHex(
      parameter?.value?.owner_address
    );
    const toAddress = tronWeb.address.fromHex(parameter?.value?.to_address);
    const amountRaw = parameter?.value?.amount;
    const amount = tronWeb.fromSun(amountRaw); // convert to TRX
    let summary = {
      txId: txID,
      fromAddress,
      toAddress,
      amountRaw,
      amount,
      blockchainUrl: `${tronblockchainUrlEndpoint}/${txID}`,
    };
    console.log(summary);
    targetTransaction = summary;
  }
  return targetTransaction;
}

// verifyTronSentToBlendery('THFxGz1Pq5pyL7kdjZFwFqbP8zbBSLsYzE')

async function verifyTronSentToUser(blenderyAddress) {
  let targetTransaction;
  // const blenderyAddress = 'THFxGz1Pq5pyL7kdjZFwFqbP8zbBSLsYzE'; // // HD wallet
  // const address2 = 'TWo1bbdmV67hyL5747WMzSeD3uwW5P9tCa'; // Wallet #1
  const response = await getOnlyConfirmedTransactiosnFromAddress(
    blenderyAddress
  );
  console.log(response);
  // console.log({newData: response?.data})
  const txID = response?.data[0]?.txID;
  console.log(txID);
  if (txID) {
    console.log(txID);
    const getTransac = tronWeb.trx.getTransaction(txID);
    const getTransacHex = await Promise.resolve(getTransac);
    const getRawData = getTransacHex?.raw_data;
    const getRawDataHex = await Promise.resolve(getRawData);
    const getContract = getRawDataHex?.contract;
    const parameter = getContract[0]?.parameter;
    console.log({ parameter: parameter });
    const fromAddress = tronWeb.address.fromHex(
      parameter?.value?.owner_address
    );
    const toAddress = tronWeb.address.fromHex(parameter?.value?.to_address);
    const amountRaw = parameter?.value?.amount;
    const amount = tronWeb.fromSun(amountRaw); // convert to TRX
    let summary = {
      txId: txID,
      fromAddress,
      toAddress,
      amountRaw,
      amount,
      blockchainUrl: `${tronblockchainUrlEndpoint}/${txID}`,
    };
    console.log(summary);
    targetTransaction = summary;
  }
  return targetTransaction;
}

async function verifyTronSentToBlenderyTRC20(blenderyAddress) {
  let targetTransaction;
  // const blenderyAddress = 'THFxGz1Pq5pyL7kdjZFwFqbP8zbBSLsYzE'; // // HD wallet
  // const address2 = 'TWo1bbdmV67hyL5747WMzSeD3uwW5P9tCa'; // Wallet #1
  const response = await getOnlyConfirmedTransactiosnToAddressTRC20(
    blenderyAddress
  );
  // console.log(response);

  let allTransaction = response?.data;
  console.log({ allTransaction: allTransaction });
  let tx = allTransaction[0];
  const fromAddress = tx?.from;
  const toAddress = tx?.to;
  const amountRaw = tx?.value;
  const amount = tronWeb.fromSun(amountRaw); // convert to TRX
  const token_info = tx?.token_info;
  console.log({ info: token_info });
  let summary = {
    txId: tx?.transaction_id,
    fromAddress,
    toAddress,
    type: tx?.type,
    amountRaw,
    amount,
    token_info,
    blockchainUrl: `${tronblockchainUrlEndpoint}/${tx?.transaction_id}`,
  };
  console.log(summary);
  targetTransaction = summary;
  return targetTransaction;
}

// verifyTronSentToAccountTRC20();
// verifyTronSentToBlenderyTRC20('THFxGz1Pq5pyL7kdjZFwFqbP8zbBSLsYzE')

async function verifyTronSentToUserTRC20(blenderyAddress) {
  let targetTransaction;

  // const blenderyAddress = 'THFxGz1Pq5pyL7kdjZFwFqbP8zbBSLsYzE'; // // HD wallet
  // const address2 = 'TWo1bbdmV67hyL5747WMzSeD3uwW5P9tCa'; // Wallet #1
  const response = await getOnlyConfirmedTransactiosnFromAddressTRC20(
    blenderyAddress
  );
  // console.log(response);

  let allTransaction = response?.data;
  let tx = allTransaction[0];
  const fromAddress = tx?.from;
  const toAddress = tx?.to;
  const amountRaw = tx?.value;
  const amount = tronWeb.fromSun(amountRaw); // convert to TRX
  const token_info = tx?.token_info;
  console.log({ info: token_info });
  let summary = {
    txId: tx?.transaction_id,
    fromAddress,
    toAddress,
    type: tx?.type,
    amountRaw,
    amount,
    token_info,
    blockchainUrl: `${tronblockchainUrlEndpoint}/${tx?.transaction_id}`,
  };
  console.log(summary);
  // return summary;
  targetTransaction = summary;
  return targetTransaction;

  // ite empty because we havent sent any TRC20 token with this account
  // const result = [{ data: [], success: true, meta: { at: 1698756247500, page_size: 0 } }]
}

// verifyTronReceivedToAccountTRC20();

async function verifyTronSentToAnyAccount(userAddress, blenderyAddress) {
  // const userAddress = 'THFxGz1Pq5pyL7kdjZFwFqbP8zbBSLsYzE'; // // HD wallet
  // const blenderyAddress = 'TWo1bbdmV67hyL5747WMzSeD3uwW5P9tCa'; // Wallet #1
  const response = await getOnlyConfirmedTransactiosnToAddress(blenderyAddress);
  console.log(response);
  let targetTransaction;
  let allTransaction = response?.data;
  allTransaction?.map(async (tx) => {
    const txID = tx.txID;
    console.log(txID);
    if (txID) {
      console.log(txID);
      const getTransac = tronWeb.trx.getTransaction(txID);
      const getTransacHex = await Promise.resolve(getTransac);
      const getRawData = getTransacHex?.raw_data;
      const getRawDataHex = await Promise.resolve(getRawData);
      const getContract = getRawDataHex?.contract;
      const parameter = getContract[0]?.parameter;
      const fromAddress = tronWeb.address.fromHex(
        parameter?.value?.owner_address
      );
      const toAddress = tronWeb.address.fromHex(parameter?.value?.to_address);
      const amountRaw = parameter?.value?.amount;
      const amount = tronWeb.fromSun(amountRaw); // convert to TRX
      let summary = {
        fromAddress,
        toAddress,
        amountRaw,
        amount,
        // success: response?.success,
      };
      console.log(summary);
      if (userAddress == fromAddress) {
        console.log({ targetTransaction: summary });
        targetTransaction = summary;
      }
    }
  });
  return targetTransaction;
}

/********************************************************************************************************************** */
/********************************************************************************************************************** */
/*********************************************     GET ETHEREUM    *************************************************** */
/********************************************************************************************************************** */
/********************************************************************************************************************** */

async function verifyEthereumSentToBlendery(blenderyAddress, value) {
  const response = await getNativeTransactionToBlendery(blenderyAddress, value);
  console.log({ firstResponse: response });

  if (response?.amount) {
    console.log({ receivedResponse: response });
    return response;
  }
}

async function verifyEthereumSentToBlendery2(blenderyAddress, value) {
  try {
    const response = await getNativeTransactionToBlendery(
      blenderyAddress,
      value
    );
    console.log({ firstResponse: response });

    if (response?.amount) {
      console.log({ receivedResponse: response });
      // return response;
    }
  } catch (error) {
    console.log({ error: error });
  }
}

// getNativeTransactionToBlendery(
//   blenderyAddress,
//   value
// );

// verifyEthereumSentToBlendery2(
//   '0x2c84865B7DF57A714910d6f441cb9ff597efE304',
//   '0.001'
// );

// verifyEthereumSentToBlendery(
//   '0x05301d500C789bd59aC307Bef714d10EbF22C1e3',
//   '0.001'
// );

async function verifyEthereumSentToUser(userAddress, blenderyAddress, value) {
  const response = await getNativeTransactionToUser(
    userAddress,
    blenderyAddress,
    value
  );
  if (response?.amount) {
    return response;
  }
}

async function verifyEthereumSentToBlenderyERC20(
  blenderyAddress,
  erc20TokenAddress,
  value
) {
  const response = await getERC20TransactionToBlendery(
    blenderyAddress,
    erc20TokenAddress,
    value
  );
  console.log({ firstResponse: response });
  if (response?.amount) {
    console.log({ receivedResponse: response });
    return response;
  }
}

// verifyEthereumSentToBlenderyERC20(
//   '0x05301d500C789bd59aC307Bef714d10EbF22C1e3',
//   usdtAddressEthereum,
//   '10'
// );

// verifyTronSentToAccountTRC20();

async function verifyEthereumSentToUserERC20(
  userAddress,
  blenderyAddress,
  erc20TokenAddress,
  value
) {
  const response = await getERC20TransactionToUser(
    userAddress,
    blenderyAddress,
    erc20TokenAddress,
    value
  );
  if (response?.value) {
    return response;
  }
}

/********************************************************************************************************************** */
/********************************************************************************************************************** */
/*********************************************     GET BITCOIN    **************************************************** */
/********************************************************************************************************************** */
/********************************************************************************************************************** */

async function verifyBitcoinSentToBlenderyWithAddress(
  userAddress,
  blenderyAddress,
  value
) {
  const response = await getBitcoinNativeTransactionToBlenderyWithUserAddress(
    userAddress,
    blenderyAddress,
    value
  );
  if (response?.amount) {
    console.log(response);
    return response;
  }
}

// const blenderyAddress = 'mwZDqNNGFJLxEGWq2nHtqgUH1nm1dW2TYk'  // receiver
// const userAddress = 'tb1qr7x7yq9gytegnnfn6yp9sk9gxktsf79t7hext2' // sender
// const amount = 0.0001
// const value= Number(amount)

// verifyBitcoinSentToBlenderyWithAddress(
//   userAddress,
//   blenderyAddress,
//   value
// )

async function verifyBitcoinSentToBlenderyWithoutAddress(
  blenderyAddress,
  value
) {
  const response =
    await getBitcoinNativeTransactionToBlenderyWithOutUserAddress(
      blenderyAddress,
      value
    );
  if (response?.amount) {
    console.log(response);
    return response;
  }
}

// const blenderyAddress = 'mwZDqNNGFJLxEGWq2nHtqgUH1nm1dW2TYk'  // receiver
// const amount = 0.0001
// const value= Number(amount)

// verifyBitcoinSentToBlenderyWithoutAddress(
//   blenderyAddress,
//   value
// )

// verifyTronSentToAccountTRC20();

async function verifyBitcoinSentToUser(userAddress, blenderyAddress, value) {
  const response = await getBitcoinNativeTransactionToUser(
    userAddress,
    blenderyAddress,
    value
  );
  if (response?.amount) {
    console.log(response);
    return response;
  }
}

// const blenderyAddress = 'tb1qr7x7yq9gytegnnfn6yp9sk9gxktsf79t7hext2' // sender
// const userAddress = 'mwZDqNNGFJLxEGWq2nHtqgUH1nm1dW2TYk' // receiver
// const amount = 0.0001
// const value= Number(amount)

// verifyBitcoinSentToUser(userAddress, blenderyAddress, value)
/********************************************************************************************************************** */
/********************************************************************************************************************** */
/*********************************************     ADMIN WALLETS    *************************************************** */
/********************************************************************************************************************** */
/********************************************************************************************************************** */

const addNewWalletAdmin = asyncHandler(async (req, res) => {
  // const email = process.env.ADMIN_EMAIL;
  // const password = process.env.ADMIN_PASSWORD;
  const { email, password } = req.body;

  const user = await User.findOne({
    email: email,
  }).exec();

  if (!user) {
    res.status(400);
    throw new Error('User does not exists');
  }

  // if (!user.role === 'Admin') {
  //   res.status(400);
  //   throw new Error('Admin Only');
  // }

  let userWallets = await WalletsAdmin.findOne({
    email: email,
  }).exec();

  if (userWallets) {
    res.status(400);
    throw new Error('Wallet exists');
  }

  // Hash password for the wallet
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt); // wallet auth
  //=========={using one mnemonic phrase for all wallets}==================================

  const phrase = mnemonic;
  const { bitcoin } = await addBitcoinWallet(phrase);
  const { evm } = await addEVMWallet(phrase);
  const { tron } = await addTronWallet(phrase);

  //Create a new EVM wallet
  const walletCreation = new WalletsAdmin({
    // user, // userId
    //  user: user?._id, // for production
    user: user?._id,
    email: email, // for testing
    accountNumber: 1,
    password: hashedPassword, // for protecting the wallet and maintaining user section like user auth
    bitcoin,
    evm,
    tron,
  });

  const newWallet = await walletCreation.save();

  if (newWallet) {
    console.log('newWallet', newWallet);

    let response = {
      phrase: mnemonic,
      cautionMessage:
        'Please save your mnemonic phrase for wallet recovery and do not share your private key with anyone.',

      successMessage: 'Wallet created successfully',
    };
    // return response; //object
    res.status(200).json(response); //callback function
  }
});

// addNewWalletAdmin()

const addNewWalletAdminInternal = asyncHandler(async (req, res) => {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  // const { email, password } = req.body;

  const user = await User.findOne({
    email: email,
  }).exec();

  if (!user) {
    console.log('User does not exists');
  }

  if (!user.role === 'Admin') {
    console.log('Admin Only');
    return;
  }

  // Hash password for the wallet
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt); // wallet auth
  //=========={using one mnemonic phrase for all wallets}==================================

  const phrase = mnemonic;
  const { bitcoin } = await addBitcoinWallet(phrase);
  const { evm } = await addEVMWallet(phrase);
  const { tron } = await addTronWallet(phrase);

  //Create a new EVM wallet
  const walletCreation = new WalletsAdmin({
    // user, // userId
    //  user: user?._id, // for production
    user: user?._id,
    email: email, // for testing
    accountNumber: 1,
    password: hashedPassword, // for protecting the wallet and maintaining user section like user auth
    bitcoin,
    evm,
    tron,
  });

  const newWallet = await walletCreation.save();

  if (newWallet) {
    console.log('newWallet', newWallet);

    let response = {
      phrase: mnemonic,
      cautionMessage:
        'Please save your mnemonic phrase for wallet recovery and do not share your private key with anyone.',

      successMessage: 'Wallet created successfully',
    };
    // return response; //object
    console.log(response); //callback function
  }

  // const newWalletDetrail = [ {
  //     user: new ObjectId("653123756ef5788d4a895b65"),
  //     email: 'peter.space.io@gmail.com',
  //     accountNumber: 1,
  //     password: '$2b$10$/a8eRKY7CLgIqLUYhwo3YujVxVZgjvLImeg1LIcE.F7Rh0YOO1vWm',
  //     bitcoin: {
  //       hdMasterAccounts: {
  //         address: 'moxAHV2xedF4LJEuTmahBQYiJMaX3xBPp2',
  //         privateKey: '919098c27fa25b5eca68da4ea739a4c5415484599f1da3d9bd8712f07009f1cc8d19078275af625dc9bf43688945fdd33983d03031082597a5c46941f20981f7f81c9965c338038103b371ff53f9759e',
  //         hdPrivateKey: '2a2e65b77adef5eda8574416f2646098c7d7d2539cd5bfa619467d8ab0130015327be55c143269707418eed25492f65f2e7e831cddcd352cc73dbc36a85a568dd26e92d21b2c4f9a96433b260d6300485f781188c5c70099932e1a8842e3968d4b522cd0c1e53df4fdab21829556e397128c7656a0e8605f7437dd9c9ad7cc5379e305f70ee986bc5d980652e18ee80ebf5a5d629b96315c4677c8724e3acbb1e82702d7995e27ba06d4307a8940aa37284cd86b9a02e1724fdd54667b7cc61ee69b1c8801132b2222a5526d284b8e1b3dc8f57203a8ef462ea6f6140056729235401ee7805f55dd0c568f64865db7c7fe71b8f0714b70f2165fbe1f6e050ec002b8bb50d2f083d4507299bc84945d9d02c55bd55cbff8cf3d8eb1593bdacefecdadb434855077978a3c3cff1592df58de7ecaab41603b3f4724c31e25128da846e9321bf11816e70fccfffa17d8af7337e08154706b292ac9a684c0dca3b377a289907e39fd101002e45aa1409943a883db6bd5c689d4787c6ae9ab34c8e34c59c264ed189cf2e896af9d00fd535b4ddc04455b43573402c67fa836dc0a3632',
  //         hdPhrase: '86712b4cd25b7b3cfd91d7b7cc8c05485f1d873a643e4863664ed325d6815c383808d307b78e58a95d7757c163630c3ae6d519680611eb2da3c7282c0ad002383ac7b541867dc8c25a741b86e7e6899c',
  //         accountName: 'Master'
  //       },
  //       hdAccounts: []
  //     },
  //     tron: {
  //       hdMasterAccounts: {
  //         address: 'TGBqjk1BjZxmziJqqJSvriiNUikn5vX3LF',
  //         privateKey: 'dc71a989df16a00520827134057f8609a50734929725b6fe778c9c4c10421f518d36d758c252fa1d7bceef564bea87298ef8c21af6e1e044f93deb03182f3ab42f463ed874031a59f31f47ee3cba89d7',
  //         hdPrivateKey: 'dc71a989df16a00520827134057f8609a50734929725b6fe778c9c4c10421f518d36d758c252fa1d7bceef564bea87298ef8c21af6e1e044f93deb03182f3ab42f463ed874031a59f31f47ee3cba89d7',
  //         hdPhrase: 'b0c9699548747eaadcbf054ba94980ec5d7fa7704e9a3891954150847d83a900a9cf0911d844e40a31e1b16e9f3261b168506639decac993e2c10d422c49753de81f42b1992b100e970b719a63c1dc8a',
  //         accountName: 'Master'
  //       },
  //       hdAccounts: []
  //     },
  //     evm: {
  //       hdMasterAccounts: {
  //         address: '0x2B605B3EFF7b5677c49d67eB641877C604B146Ee',
  //         privateKey: 'f472daaa5ab76426780ba3c15f64b1fad90c6ee8a4a540c15ecaba37486facff6c4e54a49f800e3651fe9fd4e2509885d5dfad3a69c5178d7994958edc4aac835527cda5de6c33c0d1d3d46d2c088617',
  //         hdPrivateKey: 'f472daaa5ab76426780ba3c15f64b1fad90c6ee8a4a540c15ecaba37486facff6c4e54a49f800e3651fe9fd4e2509885d5dfad3a69c5178d7994958edc4aac835527cda5de6c33c0d1d3d46d2c088617',
  //         hdPhrase: '86712b4cd25b7b3cfd91d7b7cc8c05485f1d873a643e4863664ed325d6815c383808d307b78e58a95d7757c163630c3ae6d519680611eb2da3c7282c0ad002383ac7b541867dc8c25a741b86e7e6899c',
  //         accountName: 'Master'
  //       },
  //       hdAccounts: []
  //     },
  //     limit: 1,
  //     _id: new ObjectId("654989e47823846b67d18890"),
  //     createdAt: 2023-11-07T00:50:44.283Z,
  //     updatedAt: 2023-11-07T00:50:44.283Z,
  //     __v: 0
  //   }
  //   {
  //     phrase: 'poverty worry moon cricket vanish bid crowd guide pause service misery fossil',
  //     cautionMessage: 'Please save your mnemonic phrase for wallet recovery and do not share your private key with anyone.',
  //     successMessage: 'Wallet created successfully'
  //   }
  // ]
});

// addNewWalletAdminInternal()

const addBitcoinHDWalletAdmin = asyncHandler(async () => {
  const email = process.env.ADMIN_EMAIL;
  const userWalletId = process.env.ADMIN_WALLETID;

  let userWallets = await WalletsAdmin.findOne({
    email: email,
    _id: userWalletId,
  }).exec();

  if (!userWallets) {
    throw new Error('Wallet does not exists');
  }

  if (userWallets) {
    const hdMnemonicEncrypted = userWallets.bitcoin.hdMasterAccounts.hdPhrase; // encrypted key
    // Decrypt the private key for use in Bitcoin transactions
    const decryptedHDMnemonicJson = decryptPrivateKey(hdMnemonicEncrypted);
    const decryptedMnemonic = JSON.parse(decryptedHDMnemonicJson);
    const hdMnemonic = decryptedMnemonic;
    //======{Begin to create Bitcoin wallet}==================================

    const seedBuffer = bip39.mnemonicToSeedSync(hdMnemonic);

    // const hdPrivateKey = bitcore.HDPrivateKey.fromSeed(seedBuffer); // default live network
    const hdPrivateKey = bitcore.HDPrivateKey.fromSeed(seedBuffer, network); // default test network

    //======={secure HD privateKey}====================================

    let newAccountNumber = userWallets.bitcoin.hdAccounts?.length; // so that the default address is not repeated which should be at index "0"
    console.log({ newAccountNumber: newAccountNumber });
    const accountIndex = newAccountNumber + 1;
    const derivedAccount = hdPrivateKey.derive(`m/44'/0'/${accountIndex}'`);
    let accountName = `Account ${accountIndex + 1}`;
    const address = derivedAccount.publicKey.toAddress().toString();
    const privateKey = derivedAccount.privateKey.toString(); // encrypt privateKey
    // Encrypt the private key before storing it in MongoDB

    const encryptedPrivateKey = encryptPrivateKey(privateKey);
    // const decryptedPrivateKey = decryptPrivateKey(encryptedPrivateKey);

    const addUserHDWallet = userWallets.bitcoin.hdAccounts.push({
      accountName,
      address,
      privateKey: encryptedPrivateKey,
    });
    const newHDWallet = await userWallets.save();
    if (newHDWallet) {
      const response = {
        address: address,
      };
      console.log(response);
      return response;
    }
  }
});

// addBitcoinHDWalletAdmin()
const addEVMHDWalletAdmin = asyncHandler(async () => {
  const email = process.env.ADMIN_EMAIL;
  const userWalletId = process.env.ADMIN_WALLETID;

  let userWallets = await WalletsAdmin.findOne({
    email: email,
    _id: userWalletId,
  }).exec();

  if (!userWallets) {
    throw new Error('Wallet does not exists');
  }

  if (userWallets) {
    // const hdPrivateKeyEncrypted = userWallets.evm.hdMasterAccounts.hdPrivateKey; // encrypted key
    const hdMnemonicEncrypted = userWallets.evm.hdMasterAccounts.hdPhrase; // encrypted key
    // Decrypt the private key for use in Bitcoin transactions
    const decryptedHDMnemonicJson = decryptPrivateKey(hdMnemonicEncrypted);
    const decryptedMnemonic = JSON.parse(decryptedHDMnemonicJson);

    console.log('Decrypted HD Private Key:', decryptedMnemonic);
    const hdMnemonic = decryptedMnemonic; // decrypted key
    let newAccountNumber = userWallets.evm.hdAccounts?.length; // so that the default address is not repeated which should be at index "0"

    const accountIndex = newAccountNumber + 1;
    let derivedAccount = ethers.utils.HDNode.fromMnemonic(
      hdMnemonic
    ).derivePath(`m/44'/60'/0'/${accountIndex}'`);

    // let derivedAccount = ethers.HDNode.fromMnemonic(hdMnemonic).derivePath(
    //   `m/44'/60'/0'/${accountIndex}'`
    // );
    let accountName = `Account ${accountIndex + 1}`;
    let wallet = new ethers.Wallet(derivedAccount.privateKey);
    const address = wallet?.address;
    const privateKey = wallet.privateKey; // encrypt privateKey
    // Encrypt the private key before storing it in MongoDB
    const encryptedPrivateKey = encryptPrivateKey(privateKey);

    const addUserHDWallet = userWallets.evm.hdAccounts.push({
      accountName,
      address,
      privateKey: encryptedPrivateKey,
      phrase: hdMnemonicEncrypted,
    });

    // addUserWallet.save(done);
    // await userWallets.save();

    const newHDWallet = await userWallets.save();
    if (newHDWallet) {
      const response = {
        address: address,
      };
      console.log(response);

      return response;
    }
  }
});

// addEVMHDWalletAdmin() ethers version 5.7.2 required

// new weeoe message from ethereum

/**
 * Decrypted HD Private Key: poverty worry moon cricket vanish bid crowd guide pause service misery fossil
(node:17947) [DEP0106] DeprecationWarning: crypto.createDecipher is deprecated.
(Use `node --trace-deprecation ...` to show where the warning was created)
/Users/peterio/Downloads/blendery_develop/server/controllers/hdWalletController.js:5179
    let derivedAccount = ethers.utils.HDNode.fromMnemonic(
                                      ^

TypeError: Cannot read properties of undefined (reading 'HDNode')
    at /Users/peterio/Downloads/blendery_develop/server/controllers/hdWalletController.js:5179:39
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
 */
const addTronHDWalletAdmin = asyncHandler(async () => {
  const email = process.env.ADMIN_EMAIL;
  const userWalletId = process.env.ADMIN_WALLETID;

  let userWallets = await WalletsAdmin.findOne({
    email: email,
    _id: userWalletId,
  }).exec();

  if (!userWallets) {
    throw new Error('Wallet does not exists');
  }

  if (userWallets) {
    const hdPrivateKeyEncrypted =
      userWallets.tron.hdMasterAccounts.hdPrivateKey; // encrypted key
    // Decrypt the private key for use in Bitcoin transactions
    // const decryptedPrivateKey = decryptPrivateKey(hdPrivateKeyEncrypted);
    // console.log('Decrypted HD Private Key:', decryptedPrivateKey);

    let newAccountNumber = userWallets.tron.hdAccounts?.length; // so that the default address is not repeated which should be at index "0"

    const accountIndex = newAccountNumber + 1;

    // const derivedAccount = decryptedPrivateKey.derive(accountIndex);
    // const address = tronWeb.address.fromPrivateKey(derivedAccount.privateKey);
    // const privateKey = derivedAccount.privateKey; // to be encrypted

    //====={New update : 0ct/2023}===============================
    const derivedAccount = tronWeb.createRandom({
      // path: "m/44'/195'/0'/0/0",
      path: `m/44'/195'/0'/0/${accountIndex}`,
      extraEntropy: '',
      locale: 'en',
    });

    // console.log({derivedAccount: derivedAccount})

    const address = derivedAccount?.address;
    const privateKey = derivedAccount.privateKey; // to be encrypted
    const phrase = derivedAccount?.mnemonic?.phrase; // to be encrypted

    const hdMnemonic = derivedAccount?.mnemonic?.phrase; // to be encrypted
    const mnemonicJSON = JSON.stringify(hdMnemonic);
    // Encrypt the private key before storing it in MongoDB
    const encryptedHDMnemonic = encryptPrivateKey(mnemonicJSON); // save as Mnemonic

    let accountName = `Account ${accountIndex + 1}`;

    // Encrypt the private key before storing it in MongoDB
    const encryptedPrivateKey = encryptPrivateKey(privateKey);

    const addUserHDWallet = userWallets.tron.hdAccounts.push({
      accountName,
      address,
      privateKey: encryptedPrivateKey,
      phrase: encryptedHDMnemonic,
    });
    const newHDWallet = await userWallets.save();
    if (newHDWallet) {
      const response = {
        address: address,
      };
      console.log(response);
      return response;
    }
  }
});
// addTronHDWalletAdmin()

const addTransactionWalletBitcoin = asyncHandler(async () => {
  const allWallets = await WalletsAdmin.findById(process.env.ADMIN_WALLETID);

  const walletsBitcoin = allWallets.bitcoin?.hdAccounts;

  const allAccounts = walletsBitcoin.length;
  console.log({ allAccountsCount: allAccounts });

  let nextAccountIndex = allWallets?.lastAccountBitcoin;
  if (nextAccountIndex === allAccounts || nextAccountIndex === 0) {
    nextAccountIndex = 0;
  }
  console.log({ nextAccountIndexBitcoin: nextAccountIndex });

  const newHDWallet = walletsBitcoin[nextAccountIndex];
  if (newHDWallet) {
    console.log({ newHDWalletBitcoin: newHDWallet });

    //====={update previous index number} =================

    allWallets.lastAccountBitcoin = nextAccountIndex + 1;

    const updateIndex = await allWallets.save();
    if (updateIndex) {
      const response = {
        address: newHDWallet?.address,
      };
      console.log(response);

      return response;
    }
  }
});
// addTransactionWalletBitcoin()

const addTransactionWalletEVM = asyncHandler(async () => {
  const allWallets = await WalletsAdmin.findById(process.env.ADMIN_WALLETID);

  const walletsEVM = allWallets.evm?.hdAccounts;
  console.log({ walletsEVM: walletsEVM });

  const allAccounts = walletsEVM.length;
  console.log({ allAccountsCount: allAccounts });

  let nextAccountIndex = allWallets?.lastAccountEVM;
  if (nextAccountIndex === allAccounts || nextAccountIndex === 0) {
    nextAccountIndex = 0;
  }
  console.log({ newAccountIndexEVM: nextAccountIndex });

  const newHDWallet = walletsEVM[nextAccountIndex];
  if (newHDWallet) {
    console.log({ newHDWalletEVM: newHDWallet });

    //====={update previous index number} =================
    allWallets.lastAccountEVM = nextAccountIndex + 1;

    const updateIndex = await allWallets.save();
    if (updateIndex) {
      const response = {
        address: newHDWallet?.address,
      };
      console.log(response);

      return response;
    }
  }
});
// addTransactionWalletEVM()

const addTransactionWalletTron = asyncHandler(async () => {
  const allWallets = await WalletsAdmin.findById(process.env.ADMIN_WALLETID);

  const walletsTron = allWallets.tron?.hdAccounts;
  console.log({ walletsTron: walletsTron });
  const allAccounts = walletsTron.length;
  console.log({ allAccountsCount: allAccounts });

  let nextAccountIndex = allWallets?.lastAccountTron;
  if (nextAccountIndex === allAccounts || nextAccountIndex === 0) {
    nextAccountIndex = 0;
  }
  console.log({ nextAccountIndexTron: nextAccountIndex });

  const newHDWallet = walletsTron[nextAccountIndex];
  if (newHDWallet) {
    console.log({ newHDWalletTron: newHDWallet });

    //====={update previous index number} =================
    allWallets.lastAccountTron = nextAccountIndex + 1;

    const updateIndex = await allWallets.save();
    if (updateIndex) {
      const response = {
        address: newHDWallet?.address,
      };
      console.log(response);

      return response;
    }
  }
});

// addTransactionWalletTron()

/********************************************************************************************************************** */
/********************************************************************************************************************** */
/*********************************************     MONITOR THE BLOCKCHAIN    ****************************************** */
/********************************************************************************************************************** */
/********************************************************************************************************************** */

const checkOneBlockchainTransaction = async (id) => {
  const record = await Transaction.findById(id);

  if (record) {
    let service = record?.service;
    let subService = record?.subService;
    let userAddress = record?.userAddress;

    let token;
    let chain;
    let chainId;
    //===={for exchange only where 2 transactions are monitored}==============

    if (record?.status === 'Pending' || record?.status === 'Paid') {
      console.log({ statusTriple: record?.status });
      if (service === 'sell' && subService === 'sellCash') {
        token = record?.fToken;
        blenderyAddress = record?.blenderyAddress;
        userAddress = record?.userAddress;
        chain = record?.fToken?.chain;
        chainId = record?.fToken?.chainId ? record?.fToken?.chainId : ''; // only applies to evm chain

        if (chain === 'Bitcoin' && token?.symbol === 'btc') {
          console.log('is active: BTC');
          let value = Number(record?.fValue); // single crypto currency transaction
          console.log({ value: value });
          console.log({ blenderyAddress: blenderyAddress });
          const response = await verifyBitcoinSentToBlenderyWithoutAddress(
            blenderyAddress,
            value
          );
          console.log({ responseData: response });

          if (response?.amount) {
            const userData = {
              id: record?._id,
              hash: response?.txId,
              status: 'Received',
              percentageProgress: 5,
              amountSent: '',
              amountReceived: response?.amount,
              sender: response?.fromAddress,
              receiver: response?.toAddress,
              blockchainUrl: response?.blockchainUrl,
            };
            //update status as paid
            const result = await updateBlockchainStatusInternal(userData);
            console.log({ result: result });
          }
        }
        if (chain === 'Tron' && token?.symbol === 'trx') {
          //TRX case
          const response = await verifyTronSentToBlendery(blenderyAddress);
          if (response?.amount) {
            const userData = {
              id: record?._id,
              hash: response?.txId,
              status: 'Received',
              percentageProgress: 5,
              amountSent: '',
              amountReceived: response?.amount,
              sender: response?.fromAddress,
              receiver: response?.toAddress,
              blockchainUrl: response?.blockchainUrl,
            };
            //update status as paid
            await updateBlockchainStatusInternal(userData);
          }
        }

        if (chain === 'Tron' && token?.symbol !== 'trx') {
          const response = await verifyTronSentToBlenderyTRC20(blenderyAddress);
          if (response?.amount) {
            const userData = {
              id: record?._id,
              hash: response?.txId,
              status: 'Received',
              percentageProgress: 5,
              amountSent: '',
              amountReceived: response?.amount,
              sender: response?.fromAddress,
              receiver: response?.toAddress,
              blockchainUrl: response?.blockchainUrl,
            };
            //update status as paid
            await updateBlockchainStatusInternal(userData);
            //'TRC20' case
          }
        }
        //====================={EVM CASES}================================
        if (chain === 'Ethereum' && token?.symbol === 'eth') {
          //ETH case
          // let value = amount;
          let value = record?.fValue.toString(); // single crypto currency transaction
          const response = await verifyEthereumSentToBlendery(
            blenderyAddress,
            value
          );
          if (response?.amount) {
            const userData = {
              id: record?._id,
              hash: response?.txId,
              status: 'Received',
              percentageProgress: 5,
              amountSent: response?.amount,
              amountReceived: '',
              sender: response?.fromAddress,
              receiver: response?.toAddress,
              blockchainUrl: response?.blockchainUrl,
            };
            //update status as paid
            const result = await updateBlockchainStatusInternal(userData);
            console.log({ result: result });
          }
        }

        if (chain === 'Ethereum' && token?.symbol !== 'eth') {
          //ERC20 case
          // let value = amount;
          let value = record?.fValue.toString(); // single crypto currency transaction
          let erc20TokenAddress = token?.address;
          const response = await verifyEthereumSentToBlenderyERC20(
            blenderyAddress,
            erc20TokenAddress,
            value
          );
          if (response?.amount) {
            const userData = {
              id: record?._id,
              hash: response?.txId,
              status: 'Received',
              percentageProgress: 5,

              amountSent: response?.amount,
              amountReceived: '',
              sender: response?.fromAddress,
              receiver: response?.toAddress,
              blockchainUrl: response?.blockchainUrl,
            };
            //update status as paid
            const result = await updateBlockchainStatusInternal(userData);
            console.log({ result: result });
          }
        }
      }

      if (service === 'sell' && subService === 'sellCard') {
        token = record?.fToken;
        blenderyAddress = record?.blenderyAddress;
        userAddress = record?.userAddress;
        chain = record?.fToken?.chain;
        chainId = record?.fToken?.chainId ? record?.fToken?.chainId : ''; // only applies to evm chain

        if (chain === 'Bitcoin' && token?.symbol === 'btc') {
          console.log('is active: BTC');
          let value = Number(record?.fValue); // single crypto currency transaction
          console.log({ value: value });
          console.log({ blenderyAddress: blenderyAddress });
          const response = await verifyBitcoinSentToBlenderyWithoutAddress(
            blenderyAddress,
            value
          );
          console.log({ responseData: response });

          if (response?.amount) {
            const userData = {
              id: record?._id,
              hash: response?.txId,
              status: 'Received',
              percentageProgress: 5,
              amountSent: '',
              amountReceived: response?.amount,
              sender: response?.fromAddress,
              receiver: response?.toAddress,
              blockchainUrl: response?.blockchainUrl,
            };
            //update status as paid
            const result = await updateBlockchainStatusInternal(userData);
            console.log({ result: result });
          }
        }
        if (chain === 'Tron' && token?.symbol === 'trx') {
          //TRX case
          const response = await verifyTronSentToBlendery(blenderyAddress);
          const userData = {
            id: record?._id,
            hash: response?.txId,
            status: 'Received',
            percentageProgress: 5,

            amountSent: '',
            amountReceived: response?.amount,
            sender: response?.fromAddress,
            receiver: response?.toAddress,
            blockchainUrl: response?.blockchainUrl,
          };
          await updateBlockchainStatusInternal(userData);
        }

        if (chain === 'Tron' && token?.symbol !== 'trx') {
          //'TRC20' case
          const response = await verifyTronSentToBlenderyTRC20(blenderyAddress);
          const userData = {
            id: record?._id,
            hash: response?.txId,
            status: 'Received',
            percentageProgress: 5,

            amountSent: '',
            amountReceived: response?.amount,
            sender: response?.fromAddress,
            receiver: response?.toAddress,
            blockchainUrl: response?.blockchainUrl,
          };

          await updateBlockchainStatusInternal(userData);
        }
        //====================={EVM CASES}================================
        if (chain === 'Ethereum' && token?.symbol === 'eth') {
          //ETH case
          // let value = amount;
          let value = record?.fValue.toString(); // single crypto currency transaction
          const response = await verifyEthereumSentToBlendery(
            blenderyAddress,
            value
          );
          if (response?.amount) {
            const userData = {
              id: record?._id,
              hash: response?.txId,
              status: 'Received',
              percentageProgress: 5,
              amountSent: response?.amount,
              amountReceived: '',
              sender: response?.fromAddress,
              receiver: response?.toAddress,
              blockchainUrl: response?.blockchainUrl,
            };
            //update status as paid
            const result = await updateBlockchainStatusInternal(userData);
            console.log({ result: result });
          }
        }

        if (chain === 'Ethereum' && token?.symbol !== 'eth') {
          //ERC20 case
          // let value = amount;
          let value = record?.fValue.toString(); // single crypto currency transaction
          let erc20TokenAddress = token?.address;
          const response = await verifyEthereumSentToBlenderyERC20(
            blenderyAddress,
            erc20TokenAddress,
            value
          );
          if (response?.amount) {
            const userData = {
              id: record?._id,
              hash: response?.txId,
              status: 'Received',
              percentageProgress: 5,

              amountSent: response?.amount,
              amountReceived: '',
              sender: response?.fromAddress,
              receiver: response?.toAddress,
              blockchainUrl: response?.blockchainUrl,
            };
            //update status as paid
            await updateBlockchainStatusInternal(userData);
          }
        }
      }
      if (service === 'exchange' && subService === 'exchange') {
        token = record?.fToken;
        blenderyAddress = record?.blenderyAddress;
        userAddress = record?.userAddress;
        chain = record?.fToken?.chain;
        chainId = record?.fToken?.chainId ? record?.fToken?.chainId : ''; // only applies to evm chain

        if (chain === 'Bitcoin' && token?.symbol === 'btc') {
          console.log('is active: BTC');
          let value = Number(record?.fValue); // single crypto currency transaction
          console.log({ value: value });
          console.log({ blenderyAddress: blenderyAddress });
          const response = await verifyBitcoinSentToBlenderyWithoutAddress(
            blenderyAddress,
            value
          );
          console.log({ responseData: response });

          if (response?.amount) {
            const userData = {
              id: record?._id,
              hash: response?.txId,
              status: 'Paid',
              percentageProgress: 5,
              amountSent: '',
              amountReceived: response?.amount,
              sender: response?.fromAddress,
              receiver: response?.toAddress,
              blockchainUrl: response?.blockchainUrl,
            };
            //update status as paid
            const result = await updateBlockchainStatusInternal(userData);
            console.log({ result: result });
          }
        }
        if (chain === 'Tron' && token?.symbol === 'trx') {
          //TRX case
          const response = await verifyTronSentToBlendery(blenderyAddress);
          const userData = {
            id: record?._id,
            hash: response?.txId,
            status: 'Received',
            percentageProgress: 5,
            amountSent: '',
            amountReceived: response?.amount,
            sender: response?.fromAddress,
            receiver: response?.toAddress,
            blockchainUrl: response?.blockchainUrl,
          };
          const result = await updateBlockchainStatusInternal(userData);
          console.log({ result: result });
        }

        if (chain === 'Tron' && token?.symbol !== 'trx') {
          //'TRC20' case
          const response = await verifyTronSentToBlenderyTRC20(blenderyAddress);
          const userData = {
            id: record?._id,
            hash: response?.txId,
            status: 'Received',
            percentageProgress: 5,

            amountSent: '',
            amountReceived: response?.amount,
            sender: response?.fromAddress,
            receiver: response?.toAddress,
            blockchainUrl: response?.blockchainUrl,
          };

          const result = await updateBlockchainStatusInternal(userData);
          console.log({ result: result });
        }
        //====================={EVM CASES}================================
        if (chain === 'Ethereum' && token?.symbol === 'eth') {
          //ETH case
          // let value = amount;
          let value = record?.fValue.toString(); // single crypto currency transaction
          const response = await verifyEthereumSentToBlendery(
            blenderyAddress,
            value
          );
          if (response?.amount) {
            const userData = {
              id: record?._id,
              hash: response?.txId,
              status: 'Received',
              percentageProgress: 5,
              amountSent: response?.amount,
              amountReceived: '',
              sender: response?.fromAddress,
              receiver: response?.toAddress,
              blockchainUrl: response?.blockchainUrl,
            };
            //update status as paid
            const result = await updateBlockchainStatusInternal(userData);
            console.log({ result: result });
          }
        }

        if (chain === 'Ethereum' && token?.symbol !== 'eth') {
          //ERC20 case
          // let value = amount;
          let value = record?.fValue.toString(); // single crypto currency transaction
          let erc20TokenAddress = token?.address;
          const response = await verifyEthereumSentToBlenderyERC20(
            blenderyAddress,
            erc20TokenAddress,
            value
          );
          if (response?.amount) {
            const userData = {
              id: record?._id,
              hash: response?.txId,
              status: 'Received',
              percentageProgress: 5,

              amountSent: response?.amount,
              amountReceived: '',
              sender: response?.fromAddress,
              receiver: response?.toAddress,
              blockchainUrl: response?.blockchainUrl,
            };
            //update status as paid
            const result = await updateBlockchainStatusInternal(userData);
            console.log({ result: result });
          }
        }
      }
    }
  }
};
// checkOneBlockchainTransaction("65579eab6a45ed46b517685f")
// checkOneBlockchainTransaction("654e18ae7cf4ec38ba83099d")
// checkOneBlockchainTransaction("6549e351c80d8f28bed0b2ed")
// checkOneBlockchainTransaction("654a6ca551a120870487c3bc")

// const received= {
//   result: {
//     _id: new ObjectId("6549e351c80d8f28bed0b2ed"),
//     user: new ObjectId("6534f4f01ba02cbbdc82cff8"),
//     orderNo: 'F4IK8528',
//     txId: 'F4IK8528',
//     userAddress: 'TWo1bbdmV67hyL5747WMzSeD3uwW5P9tCa',
//     blenderyAddress: 'n3KzXkuLZdqhGYVn2kSFMarGWvrc7wEJ5d',
//     fToken: {
//       _id: '652c68058a1e328256fef032',
//       id: 'bitcoin',
//       symbol: 'btc',
//       name: 'Bitcoin',
//       image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
//       current_price: 33905,
//       market_cap: '667879142065',
//       market_cap_rank: '1',
//       fully_diluted_valuation: '718347096207',
//       total_volume: '12947120750',
//       high_24h: '35012',
//       low_24h: '33900',
//       price_change_24h: '-1023.3553420143944',
//       price_change_percentage_24h: '-2.92984',
//       market_cap_change_24h: '-908821573.8842773',
//       market_cap_change_percentage_24h: '-0.13589',
//       circulating_supply: '19524631',
//       total_supply: '21000000',
//       max_supply: '21000000',
//       ath: '69045',
//       ath_change_percentage: '-50.76197',
//       ath_date: '2021-11-10T14:24:11.849Z',
//       atl: '67.81',
//       atl_change_percentage: '50035.35823',
//       atl_date: '2013-07-06T00:00:00.000Z',
//       roi: null,
//       last_updated: '2023-10-26T15:32:32.407Z',
//       updatedAt: '2023-11-07T00:07:34.201Z',
//       chain: 'Bitcoin'
//     },
//     tToken: {
//       _id: '652c68058a1e328256fef035',
//       id: 'tether',
//       symbol: 'usdt',
//       name: 'Tether',
//       image: 'https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661',
//       current_price: 1,
//       market_cap: '83834650426',
//       market_cap_rank: '3',
//       fully_diluted_valuation: '83834650426',
//       total_volume: '15153190047',
//       high_24h: '1.002',
//       low_24h: '0.997953',
//       price_change_24h: '-0.000101133801949649',
//       price_change_percentage_24h: '-0.01011',
//       market_cap_change_24h: '48584980',
//       market_cap_change_percentage_24h: '0.05799',
//       circulating_supply: '83814882993.8953',
//       total_supply: '83814882993.8953',
//       max_supply: null,
//       ath: '1.32',
//       ath_change_percentage: '-24.39439',
//       ath_date: '2018-07-24T00:00:00.000Z',
//       atl: '0.572521',
//       atl_change_percentage: '74.72446',
//       atl_date: '2015-03-02T00:00:00.000Z',
//       roi: null,
//       last_updated: '2023-10-19T14:00:00.872Z',
//       type: 'TRC20',
//       updatedAt: '2023-11-07T00:17:30.190Z',
//       address: 'TLBaRhANQoJFTqre9Nf1mjuwNWjCJeYqUL',
//       chain: 'Tron',
//       decimals: 18
//     },
//     fValue: '0.00001',
//     tValue: '0.349',
//     service: 'exchange',
//     subService: 'exchange',
//     youSend: 0.00001,
//     youGet: 0.000009950000000000001,
//     networkFee: 0,
//     serviceFee: 0,
//     exchangeRate: '34948.000',
//     fallbackUrl: '',
//     telegram: '',
//     phone: '',
//     chain: 'Bitcoin',
//     chainId: '',
//     timeLeft: 2023-11-07T09:12:17.201Z,
//     percentageProgress: 5,
//     status: 'Paid',
//     blenderyStatus: 'Pending',
//     timeStatus: 'Active',
//     amount: '1000.0000000000001',
//     isAmountMatched: false,
//     networkName: 'Testnet',
//     managerChanged: false,
//     createdAt: 2023-11-07T07:12:17.202Z,
//     updatedAt: 2023-11-07T07:19:30.700Z,
//     __v: 0,
//     receiver: 'n3KzXkuLZdqhGYVn2kSFMarGWvrc7wEJ5d',
//     amountReceived: '0.00001',
//     hash: '3574728a269f852e403fd7c3759affa09dd326a9b28c4acf76e5ebf78da6d23a',
//     blockchainUrl: 'https://blockstream.info/testnet/tx//3574728a269f852e403fd7c3759affa09dd326a9b28c4acf76e5ebf78da6d23a'
//   }
// }

const fTokenBitcoin = {
  _id: {
    $oid: '65284394082f99ac1aef0117',
  },
  id: 'bitcoin',
  symbol: 'btc',
  name: 'Bitcoin',
  image:
    'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
  current_price: 33905,
  market_cap: '667879142065',
  market_cap_rank: 1,
  fully_diluted_valuation: '718347096207',
  total_volume: '12947120750',
  high_24h: '35012',
  low_24h: '33900',
  price_change_24h: '-1023.3553420143944',
  price_change_percentage_24h: '-2.92984',
  market_cap_change_24h: '-908821573.8842773',
  market_cap_change_percentage_24h: '-0.13589',
  circulating_supply: '19524631',
  total_supply: 21000000,
  max_supply: 21000000,
  ath: 69045,
  ath_change_percentage: '-50.76197',
  ath_date: '2021-11-10T14:24:11.849Z',
  atl: 67.81,
  atl_change_percentage: '50035.35823',
  atl_date: '2013-07-06T00:00:00.000Z',
  roi: null,
  last_updated: {
    $date: '2023-10-26T15:32:32.407Z',
  },
  updatedAt: {
    $date: '2023-11-06T23:26:08.977Z',
  },
  chain: 'Bitcoin',
};

const recordBTC = {
  id: '6539ff643eb7189dd917eebf',
  fToken: fTokenBitcoin,
  fValue: '0.00001',
  blenderyAddress: 'mjd6NPVrNugHXZioezadR5tiEsFsE2H3BN',
  userAddress: '',
  service: 'sell',
  subService: 'sellCash',
  status: 'Pending',
};

let fTokenEth = {
  _id: {
    $oid: '65284394082f99ac1aef0118',
  },
  id: 'ethereum',
  symbol: 'eth',
  name: 'Ethereum',
  image:
    'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628',
  current_price: 1771.42,
  market_cap: '215529918225',
  market_cap_rank: 2,
  fully_diluted_valuation: '215529918225',
  total_volume: '16575028597',
  high_24h: '1861.11',
  low_24h: '1770.23',
  price_change_24h: '-40.0072878208216',
  price_change_percentage_24h: '-2.20861',
  market_cap_change_24h: '704227495',
  market_cap_change_percentage_24h: '0.32781',
  circulating_supply: '120260008.347644',
  total_supply: '120260008.347644',
  max_supply: null,
  ath: 4878.26,
  ath_change_percentage: '-63.53572',
  ath_date: '2021-11-10T14:24:19.604Z',
  atl: 0.432979,
  atl_change_percentage: '410733.52956',
  atl_date: '2015-10-20T00:00:00.000Z',
  roi: {
    times: 68.89123028749954,
    currency: 'btc',
    percentage: 6889.123028749955,
  },
  last_updated: {
    $date: '2023-10-26T15:32:23.061Z',
  },
  decimals: 18,
  address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  chainId: '1',
  updatedAt: {
    $date: '2023-11-06T23:26:10.658Z',
  },
  chain: 'Ethereum',
};

const recordEth = {
  id: '6539ff643eb7189dd917eebf',
  fToken: fTokenEth,
  fValue: '0.001',
  blenderyAddress: '0xB3a0FBE9830CDE8b9255895DF95Ced2bC70f0cf3',
  userAddress: '0x2754897d2B0493Fd0463281e36db83BB202f6343',
  service: 'sell',
  subService: 'sellCash',
  status: 'Pending',
};
//0x7297699559F16840a550D3F7ABD0CeC463c040F4
const fTokenEthUSDT = {
  _id: {
    $oid: '65284394082f99ac1aef011b',
  },
  id: 'tether',
  symbol: 'usdt',
  name: 'Tether',
  image:
    'https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661',
  current_price: 1,
  market_cap: '83834650426',
  market_cap_rank: 3,
  fully_diluted_valuation: '83834650426',
  total_volume: '15153190047',
  high_24h: '1.002',
  low_24h: '0.997953',
  price_change_24h: '-0.000101133801949649',
  price_change_percentage_24h: '-0.01011',
  market_cap_change_24h: '48584980',
  market_cap_change_percentage_24h: '0.05799',
  circulating_supply: '83814882993.8953',
  total_supply: '83814882993.8953',
  max_supply: null,
  ath: 1.32,
  ath_change_percentage: '-24.39439',
  ath_date: '2018-07-24T00:00:00.000Z',
  atl: 0.572521,
  atl_change_percentage: '74.72446',
  atl_date: '2015-03-02T00:00:00.000Z',
  roi: null,
  last_updated: {
    $date: '2023-10-19T14:00:00.872Z',
  },
  // "address": "0xdac17f958d2ee523a2206206994597c13d831ec7",
  address: '0x7297699559F16840a550D3F7ABD0CeC463c040F4', // test
  decimals: 6,
  chainId: '1',
  type: 'ERC20',
  updatedAt: {
    $date: '2023-11-07T00:31:55.027Z',
  },
  chain: 'Ethereum',
};

const recordEthUSDT = {
  id: '6539ff643eb7189dd917eebf',
  fToken: fTokenEthUSDT,
  // fValue: "400",
  // blenderyAddress: '0xB438D96B2580aC58890E55cbc37d72416cAdd513',
  fValue: '1000',
  blenderyAddress: '0x67C8A2af4149418D4525cE148ca3b196f06C47CA',
  //
  userAddress: '',
  service: 'sell',
  subService: 'sellCash',
  status: 'Pending',
};

const fTokenTron = {
  _id: {
    $oid: '65284394082f99ac1aef0119',
  },
  id: 'tron',
  symbol: 'trx',
  name: 'TRON',
  image:
    'https://assets.coingecko.com/coins/images/1094/large/tron-logo.png?1696502193',
  current_price: 0.092065,
  market_cap: '8219933520',
  market_cap_rank: 11,
  fully_diluted_valuation: '8219929644',
  total_volume: '283994976',
  high_24h: '0.09411',
  low_24h: '0.09203',
  price_change_24h: '-0.002045714167200966',
  price_change_percentage_24h: '-2.17374',
  market_cap_change_24h: '-69966432.91488075',
  market_cap_change_percentage_24h: '-0.844',
  circulating_supply: '88840311387.9229',
  total_supply: '88840269498.4835',
  max_supply: null,
  ath: 0.231673,
  ath_change_percentage: '-60.21746',
  ath_date: '2018-01-05T00:00:00.000Z',
  atl: 0.00180434,
  atl_change_percentage: '5007.97458',
  atl_date: '2017-11-12T00:00:00.000Z',
  roi: {
    times: 47.45500915435254,
    currency: 'usd',
    percentage: 4745.500915435254,
  },
  last_updated: {
    $date: '2023-10-26T15:32:28.529Z',
  },
  updatedAt: {
    $date: '2023-11-06T23:26:08.985Z',
  },
  chain: 'Tron',
};

const recordTron = {
  id: '6539ff643eb7189dd917eebf',
  fToken: fTokenTron,
  fValue: '50',
  blenderyAddress: 'TWo1bbdmV67hyL5747WMzSeD3uwW5P9tCa',
  userAddress: 'THFxGz1Pq5pyL7kdjZFwFqbP8zbBSLsYzE',
  service: 'sell',
  subService: 'sellCash',
  status: 'Pending',
};

const fTokenTronUSDT = {
  _id: {
    $oid: '65284394082f99ac1aef011a',
  },
  id: 'tether',
  symbol: 'usdt',
  name: 'Tether',
  image:
    'https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661',
  current_price: 0.999972,
  market_cap: '84205562923',
  market_cap_rank: 3,
  fully_diluted_valuation: '84205562923',
  total_volume: '193111663063',
  high_24h: '1.003',
  low_24h: '0.994532',
  price_change_24h: '-0.002799963643488779',
  price_change_percentage_24h: '-0.27922',
  market_cap_change_24h: '-39911298.171188354',
  market_cap_change_percentage_24h: '-0.04738',
  circulating_supply: '84391561211.9936',
  total_supply: '84391561211.9936',
  max_supply: null,
  ath: 1.32,
  ath_change_percentage: '-24.7247',
  ath_date: '2018-07-24T00:00:00.000Z',
  atl: 0.572521,
  atl_change_percentage: '73.96113',
  atl_date: '2015-03-02T00:00:00.000Z',
  roi: null,
  last_updated: {
    $date: '2023-10-26T15:30:01.021Z',
  },
  type: 'TRC20',
  updatedAt: {
    $date: '2023-11-07T00:23:24.669Z',
  },
  chain: 'Tron',
  address: 'TLBaRhANQoJFTqre9Nf1mjuwNWjCJeYqUL',
  decimals: 18,
};
const recordTronUSDT = {
  id: '6539ff643eb7189dd917eebf',
  fToken: fTokenTronUSDT,
  fValue: '120',
  blenderyAddress: 'TERDy51KMZsKzDzPcwJXiKdfv768ApCRNZ',
  userAddress: 'TCCF7xA4gQcQSWPZYhanCFHpczVVArUWQh',
  service: 'sell',
  subService: 'sellCash',
  status: 'Pending',
};

const checkOneBlockchainTransactionTest = async () => {
  // const record = await Transaction.findById(id);

  const record = recordTron;

  let service = record?.service;
  let subService = record?.subService;
  let userAddress = record?.userAddress;

  let token;
  let chain;
  let chainId;
  //===={for exchange only where 2 transactions are monitored}==============

  if (record?.status === 'Pending' || record?.status === 'Paid') {
    console.log({ statusTriple: record?.status });
    if (service === 'sell' && subService === 'sellCash') {
      token = record?.fToken;
      blenderyAddress = record?.blenderyAddress;
      userAddress = record?.userAddress;
      chain = record?.fToken?.chain;
      chainId = record?.fToken?.chainId ? record?.fToken?.chainId : ''; // only applies to evm chain

      if (chain === 'Bitcoin' && token?.symbol === 'btc') {
        console.log('is active: BTC');
        let value = Number(record?.fValue); // single crypto currency transaction
        console.log({ value: value });
        console.log({ blenderyAddress: blenderyAddress });
        const response = await verifyBitcoinSentToBlenderyWithoutAddress(
          blenderyAddress,
          value
        );
        console.log({ responseData: response });

        if (response?.amount) {
          const userData = {
            id: record?._id,
            hash: response?.txId,
            status: 'Received',
            percentageProgress: 5,
            amountSent: '',
            amountReceived: response?.amount,
            sender: response?.fromAddress,
            receiver: response?.toAddress,
            blockchainUrl: response?.blockchainUrl,
          };
          //update status as paid
          const result = await updateBlockchainStatusInternal(userData);
          console.log({ result: result });
        }
      }
      if (chain === 'Tron' && token?.symbol === 'trx') {
        //TRX case
        const response = await verifyTronSentToBlendery(blenderyAddress);
        if (response?.amount) {
          const userData = {
            id: record?._id,
            hash: response?.txId,
            status: 'Received',
            percentageProgress: 5,
            amountSent: '',
            amountReceived: response?.amount,
            sender: response?.fromAddress,
            receiver: response?.toAddress,
            blockchainUrl: response?.blockchainUrl,
          };
          //update status as Received
          await updateBlockchainStatusInternal(userData);
        }
      }

      if (chain === 'Tron' && token?.symbol !== 'trx') {
        const response = await verifyTronSentToBlenderyTRC20(blenderyAddress);
        if (response?.amount) {
          const userData = {
            id: record?._id,
            hash: response?.txId,
            status: 'Received',
            percentageProgress: 5,
            amountSent: '',
            amountReceived: response?.amount,
            sender: response?.fromAddress,
            receiver: response?.toAddress,
            blockchainUrl: response?.blockchainUrl,
          };
          //update status as Received
          await updateBlockchainStatusInternal(userData);
          //'TRC20' case
        }
      }
      //====================={EVM CASES}================================
      if (chain === 'Ethereum' && token?.symbol === 'eth') {
        //ETH case
        // let value = amount;
        let value = record?.fValue.toString(); // single crypto currency transaction
        const response = await verifyEthereumSentToBlendery(
          blenderyAddress,
          value
        );
        if (response?.amount) {
          const userData = {
            id: record?._id,
            hash: response?.txId,
            status: 'Received',
            percentageProgress: 5,
            amountSent: response?.amount,
            amountReceived: '',
            sender: response?.fromAddress,
            receiver: response?.toAddress,
            blockchainUrl: response?.blockchainUrl,
          };
          //update status as paid
          const result = await updateBlockchainStatusInternal(userData);
          console.log({ result: result });
        }
      }

      if (chain === 'Ethereum' && token?.symbol !== 'eth') {
        //ERC20 case
        // let value = amount;
        let value = record?.fValue.toString(); // single crypto currency transaction
        let erc20TokenAddress = token?.address;
        const response = await verifyEthereumSentToBlenderyERC20(
          blenderyAddress,
          erc20TokenAddress,
          value
        );
        if (response?.amount) {
          const userData = {
            id: record?._id,
            hash: response?.txId,
            status: 'Received',
            percentageProgress: 5,

            amountSent: response?.amount,
            amountReceived: '',
            sender: response?.fromAddress,
            receiver: response?.toAddress,
            blockchainUrl: response?.blockchainUrl,
          };
          //update status as paid
          const result = await updateBlockchainStatusInternal(userData);
          console.log({ result: result });
        }
      }
    }

    if (service === 'sell' && subService === 'sellCard') {
      token = record?.fToken;
      blenderyAddress = record?.blenderyAddress;
      userAddress = record?.userAddress;
      chain = record?.fToken?.chain;
      chainId = record?.fToken?.chainId ? record?.fToken?.chainId : ''; // only applies to evm chain

      if (chain === 'Bitcoin' && token?.symbol === 'btc') {
        console.log('is active: BTC');
        let value = Number(record?.fValue); // single crypto currency transaction
        console.log({ value: value });
        console.log({ blenderyAddress: blenderyAddress });
        const response = await verifyBitcoinSentToBlenderyWithoutAddress(
          blenderyAddress,
          value
        );
        console.log({ responseData: response });

        if (response?.amount) {
          const userData = {
            id: record?._id,
            hash: response?.txId,
            status: 'Received',
            percentageProgress: 5,
            amountSent: '',
            amountReceived: response?.amount,
            sender: response?.fromAddress,
            receiver: response?.toAddress,
            blockchainUrl: response?.blockchainUrl,
          };
          //update status as Received
          const result = await updateBlockchainStatusInternal(userData);
          console.log({ result: result });
        }
      }
      if (chain === 'Tron' && token?.symbol === 'trx') {
        //TRX case
        const response = await verifyTronSentToBlendery(blenderyAddress);
        const userData = {
          id: record?._id,
          hash: response?.txId,
          status: 'Received',
          percentageProgress: 5,

          amountSent: '',
          amountReceived: response?.amount,
          sender: response?.fromAddress,
          receiver: response?.toAddress,
          blockchainUrl: response?.blockchainUrl,
        };
        await updateBlockchainStatusInternal(userData);
      }

      if (chain === 'Tron' && token?.symbol !== 'trx') {
        //'TRC20' case
        const response = await verifyTronSentToBlenderyTRC20(blenderyAddress);
        const userData = {
          id: record?._id,
          hash: response?.txId,
          status: 'Received',
          percentageProgress: 5,

          amountSent: '',
          amountReceived: response?.amount,
          sender: response?.fromAddress,
          receiver: response?.toAddress,
          blockchainUrl: response?.blockchainUrl,
        };

        await updateBlockchainStatusInternal(userData);
      }
      //====================={EVM CASES}================================
      if (chain === 'Ethereum' && token?.symbol === 'eth') {
        //ETH case
        // let value = amount;
        let value = record?.fValue.toString(); // single crypto currency transaction
        const response = await verifyEthereumSentToBlendery(
          blenderyAddress,
          value
        );
        if (response?.amount) {
          const userData = {
            id: record?._id,
            hash: response?.txId,
            status: 'Received',
            percentageProgress: 5,
            amountSent: response?.amount,
            amountReceived: '',
            sender: response?.fromAddress,
            receiver: response?.toAddress,
            blockchainUrl: response?.blockchainUrl,
          };
          //update status as paid
          const result = await updateBlockchainStatusInternal(userData);
          console.log({ result: result });
        }
      }

      if (chain === 'Ethereum' && token?.symbol !== 'eth') {
        //ERC20 case
        // let value = amount;
        let value = record?.fValue.toString(); // single crypto currency transaction
        let erc20TokenAddress = token?.address;
        const response = await verifyEthereumSentToBlenderyERC20(
          blenderyAddress,
          erc20TokenAddress,
          value
        );
        if (response?.amount) {
          const userData = {
            id: record?._id,
            hash: response?.txId,
            status: 'Received',
            percentageProgress: 5,

            amountSent: response?.amount,
            amountReceived: '',
            sender: response?.fromAddress,
            receiver: response?.toAddress,
            blockchainUrl: response?.blockchainUrl,
          };
          //update status as paid
          await updateBlockchainStatusInternal(userData);
        }
      }
    }
    if (service === 'exchange' && subService === 'exchange') {
      token = record?.fToken;
      blenderyAddress = record?.blenderyAddress;
      userAddress = record?.userAddress;
      chain = record?.fToken?.chain;
      chainId = record?.fToken?.chainId ? record?.fToken?.chainId : ''; // only applies to evm chain

      if (chain === 'Bitcoin' && token?.symbol === 'btc') {
        console.log('is active: BTC');
        let value = Number(record?.fValue); // single crypto currency transaction
        console.log({ value: value });
        console.log({ blenderyAddress: blenderyAddress });
        const response = await verifyBitcoinSentToBlenderyWithoutAddress(
          blenderyAddress,
          value
        );
        console.log({ responseData: response });

        if (response?.amount) {
          const userData = {
            id: record?._id,
            hash: response?.txId,
            status: 'Received',
            percentageProgress: 5,
            amountSent: '',
            amountReceived: response?.amount,
            sender: response?.fromAddress,
            receiver: response?.toAddress,
            blockchainUrl: response?.blockchainUrl,
          };
          //update status as Received
          const result = await updateBlockchainStatusInternal(userData);
          console.log({ result: result });
        }
      }
      if (chain === 'Tron' && token?.symbol === 'trx') {
        //TRX case
        const response = await verifyTronSentToBlendery(blenderyAddress);
        const userData = {
          id: record?._id,
          hash: response?.txId,
          status: 'Received',
          percentageProgress: 5,
          amountSent: '',
          amountReceived: response?.amount,
          sender: response?.fromAddress,
          receiver: response?.toAddress,
          blockchainUrl: response?.blockchainUrl,
        };
        const result = await updateBlockchainStatusInternal(userData);
        console.log({ result: result });
      }

      if (chain === 'Tron' && token?.symbol !== 'trx') {
        //'TRC20' case
        const response = await verifyTronSentToBlenderyTRC20(blenderyAddress);
        const userData = {
          id: record?._id,
          hash: response?.txId,
          status: 'Received',
          percentageProgress: 5,

          amountSent: '',
          amountReceived: response?.amount,
          sender: response?.fromAddress,
          receiver: response?.toAddress,
          blockchainUrl: response?.blockchainUrl,
        };

        const result = await updateBlockchainStatusInternal(userData);
        console.log({ result: result });
      }
      //====================={EVM CASES}================================
      if (chain === 'Ethereum' && token?.symbol === 'eth') {
        //ETH case
        // let value = amount;
        let value = record?.fValue.toString(); // single crypto currency transaction
        const response = await verifyEthereumSentToBlendery(
          blenderyAddress,
          value
        );
        if (response?.amount) {
          const userData = {
            id: record?._id,
            hash: response?.txId,
            status: 'Received',
            percentageProgress: 5,
            amountSent: response?.amount,
            amountReceived: '',
            sender: response?.fromAddress,
            receiver: response?.toAddress,
            blockchainUrl: response?.blockchainUrl,
          };
          //update status as paid
          const result = await updateBlockchainStatusInternal(userData);
          console.log({ result: result });
        }
      }

      if (chain === 'Ethereum' && token?.symbol !== 'eth') {
        //ERC20 case
        // let value = amount;
        let value = record?.fValue.toString(); // single crypto currency transaction
        let erc20TokenAddress = token?.address;
        const response = await verifyEthereumSentToBlenderyERC20(
          blenderyAddress,
          erc20TokenAddress,
          value
        );
        if (response?.amount) {
          const userData = {
            id: record?._id,
            hash: response?.txId,
            status: 'Received',
            percentageProgress: 5,

            amountSent: response?.amount,
            amountReceived: '',
            sender: response?.fromAddress,
            receiver: response?.toAddress,
            blockchainUrl: response?.blockchainUrl,
          };
          //update status as paid
          const result = await updateBlockchainStatusInternal(userData);
          console.log({ result: result });
        }
      }
    }
  }
};
// checkOneBlockchainTransactionTest()

/**
 *
 * Ethereum API needs to be updated
 */
const updateOneBlockchainTransactionById = async (req, res) => {
  const { id } = req.body;
  const record = await Transaction.findById(id);
  console.log({ updateinBlockChain: 'server input' });
  console.log({ input: record });
  if (record) {
    let service = record?.service;
    let subService = record?.subService;
    let userAddress = record?.userAddress;

    let token;
    let chain;
    let chainId;
    //===={for exchange only where 2 transactions are monitored}==============

    // if (record?.status === 'Pending' || record?.status === 'Paid') {
    if (record?.status === 'Paid') {
      if (service === 'sell' && subService === 'sellCash') {
        token = record?.fToken;
        blenderyAddress = record?.blenderyAddress;
        userAddress = record?.userAddress;
        chain = record?.fToken?.chain;
        chainId = record?.fToken?.chainId ? record?.fToken?.chainId : ''; // only applies to evm chain

        if (chain === 'Bitcoin' && token?.symbol === 'btc') {
          console.log('is active: BTC');
          let value = Number(record?.fValue); // single crypto currency transaction
          console.log({ value: value });
          console.log({ blenderyAddress: blenderyAddress });
          const response = await verifyBitcoinSentToBlenderyWithoutAddress(
            blenderyAddress,
            value
          );
          console.log({ responseData: response });

          if (response?.amount) {
            const userData = {
              id: record?._id,
              hash: response?.txId,
              status: 'Received',
              percentageProgress: 5,
              amountSent: '',
              amountReceived: response?.amount,
              sender: response?.fromAddress,
              receiver: response?.toAddress,
              blockchainUrl: response?.blockchainUrl,
            };
            //update status as paid
            const result = await updateBlockchainStatusInternal(userData);
            console.log({ result: result });
            res.status(200).json(result);
          }
        }
        if (chain === 'Tron' && token?.symbol === 'trx') {
          //TRX case
          const response = await verifyTronSentToBlendery(blenderyAddress);
          if (response?.amount) {
            const userData = {
              id: record?._id,
              hash: response?.txId,
              status: 'Received',
              percentageProgress: 5,
              amountSent: '',
              amountReceived: response?.amount,
              sender: response?.fromAddress,
              receiver: response?.toAddress,
              blockchainUrl: response?.blockchainUrl,
            };
            const result = await updateBlockchainStatusInternal(userData);
            console.log({ result: result });
            res.status(200).json(result);
          }
        }

        if (chain === 'Tron' && token?.symbol !== 'trx') {
          const response = await verifyTronSentToBlenderyTRC20(blenderyAddress);
          if (response?.amount) {
            const userData = {
              id: record?._id,
              hash: response?.txId,
              status: 'Received',
              percentageProgress: 5,
              amountSent: '',
              amountReceived: response?.amount,
              sender: response?.fromAddress,
              receiver: response?.toAddress,
              blockchainUrl: response?.blockchainUrl,
            };
            const result = await updateBlockchainStatusInternal(userData);
            console.log({ result: result });
            res.status(200).json(result);
          }
        }
        //====================={EVM CASES}================================
        if (chain === 'Ethereum' && token?.symbol === 'eth') {
          //ETH case
          // let value = amount;
          let value = record?.fValue.toString(); // single crypto currency transaction
          const response = await verifyEthereumSentToBlendery(
            blenderyAddress,
            value
          );
          if (response?.amount) {
            const userData = {
              id: record?._id,
              hash: response?.txId,
              status: 'Received',
              percentageProgress: 5,
              amountSent: response?.amount,
              amountReceived: '',
              sender: response?.fromAddress,
              receiver: response?.toAddress,
              blockchainUrl: response?.blockchainUrl,
            };
            const result = await updateBlockchainStatusInternal(userData);
            console.log({ result: result });
            res.status(200).json(result);
          }
        }

        if (chain === 'Ethereum' && token?.symbol !== 'eth') {
          //ERC20 case
          // let value = amount;
          let value = record?.fValue.toString(); // single crypto currency transaction
          let erc20TokenAddress = token?.address;
          const response = await verifyEthereumSentToBlenderyERC20(
            blenderyAddress,
            erc20TokenAddress,
            value
          );
          if (response?.amount) {
            const userData = {
              id: record?._id,
              hash: response?.txId,
              status: 'Received',
              percentageProgress: 5,

              amountSent: response?.amount,
              amountReceived: '',
              sender: response?.fromAddress,
              receiver: response?.toAddress,
              blockchainUrl: response?.blockchainUrl,
            };
            const result = await updateBlockchainStatusInternal(userData);
            console.log({ result: result });
            res.status(200).json(result);
          }
        }
      }

      if (service === 'sell' && subService === 'sellCard') {
        token = record?.fToken;
        blenderyAddress = record?.blenderyAddress;
        userAddress = record?.userAddress;
        chain = record?.fToken?.chain;
        chainId = record?.fToken?.chainId ? record?.fToken?.chainId : ''; // only applies to evm chain

        if (chain === 'Bitcoin' && token?.symbol === 'btc') {
          console.log('is active: BTC');
          let value = Number(record?.fValue); // single crypto currency transaction
          console.log({ value: value });
          console.log({ blenderyAddress: blenderyAddress });
          const response = await verifyBitcoinSentToBlenderyWithoutAddress(
            blenderyAddress,
            value
          );
          console.log({ responseData: response });

          if (response?.amount) {
            const userData = {
              id: record?._id,
              hash: response?.txId,
              status: 'Received',
              percentageProgress: 5,
              amountSent: '',
              amountReceived: response?.amount,
              sender: response?.fromAddress,
              receiver: response?.toAddress,
              blockchainUrl: response?.blockchainUrl,
            };
            const result = await updateBlockchainStatusInternal(userData);
            console.log({ result: result });
            res.status(200).json(result);
          }
        }
        if (chain === 'Tron' && token?.symbol === 'trx') {
          //TRX case
          const response = await verifyTronSentToBlendery(blenderyAddress);
          if (response?.amount) {
            const userData = {
              id: record?._id,
              hash: response?.txId,
              status: 'Received',
              percentageProgress: 5,
              amountSent: '',
              amountReceived: response?.amount,
              sender: response?.fromAddress,
              receiver: response?.toAddress,
              blockchainUrl: response?.blockchainUrl,
            };
            const result = await updateBlockchainStatusInternal(userData);
            console.log({ result: result });
            res.status(200).json(result);
          }
        }

        if (chain === 'Tron' && token?.symbol !== 'trx') {
          //'TRC20' case
          const response = await verifyTronSentToBlenderyTRC20(blenderyAddress);
          if (response?.amount) {
            const userData = {
              id: record?._id,
              hash: response?.txId,
              status: 'Received',
              percentageProgress: 5,
              amountSent: '',
              amountReceived: response?.amount,
              sender: response?.fromAddress,
              receiver: response?.toAddress,
              blockchainUrl: response?.blockchainUrl,
            };
            const result = await updateBlockchainStatusInternal(userData);
            console.log({ result: result });
            res.status(200).json(result);
          }
        }
        //====================={EVM CASES}================================
        if (chain === 'Ethereum' && token?.symbol === 'eth') {
          //ETH case
          // let value = amount;
          let value = record?.fValue.toString(); // single crypto currency transaction
          const response = await verifyEthereumSentToBlendery(
            blenderyAddress,
            value
          );
          if (response?.amount) {
            const userData = {
              id: record?._id,
              hash: response?.txId,
              status: 'Received',
              percentageProgress: 5,
              amountSent: response?.amount,
              amountReceived: '',
              sender: response?.fromAddress,
              receiver: response?.toAddress,
              blockchainUrl: response?.blockchainUrl,
            };
            const result = await updateBlockchainStatusInternal(userData);
            console.log({ result: result });
            res.status(200).json(result);
          }
        }

        if (chain === 'Ethereum' && token?.symbol !== 'eth') {
          //ERC20 case
          // let value = amount;
          let value = record?.fValue.toString(); // single crypto currency transaction
          let erc20TokenAddress = token?.address;
          const response = await verifyEthereumSentToBlenderyERC20(
            blenderyAddress,
            erc20TokenAddress,
            value
          );
          if (response?.amount) {
            const userData = {
              id: record?._id,
              hash: response?.txId,
              status: 'Received',
              percentageProgress: 5,

              amountSent: response?.amount,
              amountReceived: '',
              sender: response?.fromAddress,
              receiver: response?.toAddress,
              blockchainUrl: response?.blockchainUrl,
            };
            const result = await updateBlockchainStatusInternal(userData);
            console.log({ result: result });
            res.status(200).json(result);
          }
        }
      }
      if (service === 'exchange' && subService === 'exchange') {
        token = record?.fToken;
        blenderyAddress = record?.blenderyAddress;
        userAddress = record?.userAddress;
        chain = record?.fToken?.chain;
        chainId = record?.fToken?.chainId ? record?.fToken?.chainId : ''; // only applies to evm chain

        if (chain === 'Bitcoin' && token?.symbol === 'btc') {
          console.log('is active: BTC');
          let value = Number(record?.fValue); // single crypto currency transaction
          console.log({ value: value });
          console.log({ blenderyAddress: blenderyAddress });
          const response = await verifyBitcoinSentToBlenderyWithoutAddress(
            blenderyAddress,
            value
          );
          console.log({ responseData: response });

          if (response?.amount) {
            const userData = {
              id: record?._id,
              hash: response?.txId,
              status: 'Received',
              percentageProgress: 5,
              amountSent: '',
              amountReceived: response?.amount,
              sender: response?.fromAddress,
              receiver: response?.toAddress,
              blockchainUrl: response?.blockchainUrl,
            };
            const result = await updateBlockchainStatusInternal(userData);
            console.log({ result: result });
            res.status(200).json(result);
          }
        }
        if (chain === 'Tron' && token?.symbol === 'trx') {
          //TRX case
          const response = await verifyTronSentToBlendery(blenderyAddress);
          if (response?.amount) {
            const userData = {
              id: record?._id,
              hash: response?.txId,
              status: 'Received',
              percentageProgress: 5,
              amountSent: '',
              amountReceived: response?.amount,
              sender: response?.fromAddress,
              receiver: response?.toAddress,
              blockchainUrl: response?.blockchainUrl,
            };
            const result = await updateBlockchainStatusInternal(userData);
            console.log({ result: result });
            res.status(200).json(result);
          }
        }

        if (chain === 'Tron' && token?.symbol !== 'trx') {
          //'TRC20' case
          const response = await verifyTronSentToBlenderyTRC20(blenderyAddress);
          if (response?.amount) {
            const userData = {
              id: record?._id,
              hash: response?.txId,
              status: 'Received',
              percentageProgress: 5,
              amountSent: '',
              amountReceived: response?.amount,
              sender: response?.fromAddress,
              receiver: response?.toAddress,
              blockchainUrl: response?.blockchainUrl,
            };
            const result = await updateBlockchainStatusInternal(userData);
            console.log({ result: result });
            res.status(200).json(result);
          }
        }
        //====================={EVM CASES}================================
        if (chain === 'Ethereum' && token?.symbol === 'eth') {
          //ETH case
          // let value = amount;
          let value = record?.fValue.toString(); // single crypto currency transaction
          const response = await verifyEthereumSentToBlendery(
            blenderyAddress,
            value
          );
          if (response?.amount) {
            const userData = {
              id: record?._id,
              hash: response?.txId,
              status: 'Received',
              percentageProgress: 5,
              amountSent: response?.amount,
              amountReceived: '',
              sender: response?.fromAddress,
              receiver: response?.toAddress,
              blockchainUrl: response?.blockchainUrl,
            };
            const result = await updateBlockchainStatusInternal(userData);
            console.log({ result: result });
            res.status(200).json(result);
          }
        }

        if (chain === 'Ethereum' && token?.symbol !== 'eth') {
          //ERC20 case
          // let value = amount;
          let value = record?.fValue.toString(); // single crypto currency transaction
          let erc20TokenAddress = token?.address;
          const response = await verifyEthereumSentToBlenderyERC20(
            blenderyAddress,
            erc20TokenAddress,
            value
          );
          if (response?.amount) {
            const userData = {
              id: record?._id,
              hash: response?.txId,
              status: 'Received',
              percentageProgress: 5,

              amountSent: response?.amount,
              amountReceived: '',
              sender: response?.fromAddress,
              receiver: response?.toAddress,
              blockchainUrl: response?.blockchainUrl,
            };
            const result = await updateBlockchainStatusInternal(userData);
            console.log({ result: result });
            res.status(200).json(result);
          }
        }
      }
    }
  }
};

const updateOneBlockchainTransactionByIdTemporay = async (req, res) => {
  const { id } = req.body;
  const record = await Transaction.findById(id);
  console.log({ updateinBlockChain: 'server input' });
  console.log({ input: record });
  if (record) {
    let service = record?.service;
    let subService = record?.subService;
    let userAddress = record?.userAddress;

    let token;
    let chain;
    let chainId;

    const blockchainUrlMainnet = 'https://etherscan.io/tx'; // goerli test net
    const blockchainUrlGoerli = 'https://goerli.etherscan.io/tx'; // goerli test net
    const blockchainUrlEndpoint = blockchainUrlGoerli;
    let hashEthereum =
      '0x001a68c5eff64edf9236a504726d24ef3096833e8d9961fd6d5b197662be0f98';
    //===={for exchange only where 2 transactions are monitored}==============

    // if (record?.status === 'Pending' || record?.status === 'Paid') {
    if (record?.status === 'Paid') {
      if (service === 'sell' && subService === 'sellCash') {
        token = record?.fToken;
        blenderyAddress = record?.blenderyAddress;
        userAddress = record?.userAddress;
        chain = record?.fToken?.chain;
        chainId = record?.fToken?.chainId ? record?.fToken?.chainId : ''; // only applies to evm chain

        if (chain === 'Bitcoin' && token?.symbol === 'btc') {
          console.log('is active: BTC');
          let value = Number(record?.fValue); // single crypto currency transaction
          console.log({ value: value });
          console.log({ blenderyAddress: blenderyAddress });
          const response = await verifyBitcoinSentToBlenderyWithoutAddress(
            blenderyAddress,
            value
          );
          console.log({ responseData: response });

          if (response?.amount) {
            const userData = {
              id: record?._id,
              hash: response?.txId,
              status: 'Received',
              percentageProgress: 5,
              amountSent: '',
              amountReceived: response?.amount,
              sender: response?.fromAddress,
              receiver: response?.toAddress,
              blockchainUrl: response?.blockchainUrl,
            };
            //update status as paid
            const result = await updateBlockchainStatusInternal(userData);
            console.log({ result: result });
            res.status(200).json(result);
          }
        }
        if (chain === 'Tron' && token?.symbol === 'trx') {
          //TRX case
          const response = await verifyTronSentToBlendery(blenderyAddress);
          if (response?.amount) {
            const userData = {
              id: record?._id,
              hash: response?.txId,
              status: 'Received',
              percentageProgress: 5,
              amountSent: '',
              amountReceived: response?.amount,
              sender: response?.fromAddress,
              receiver: response?.toAddress,
              blockchainUrl: response?.blockchainUrl,
            };
            const result = await updateBlockchainStatusInternal(userData);
            console.log({ result: result });
            res.status(200).json(result);
          }
        }

        if (chain === 'Tron' && token?.symbol !== 'trx') {
          const response = await verifyTronSentToBlenderyTRC20(blenderyAddress);
          if (response?.amount) {
            const userData = {
              id: record?._id,
              hash: response?.txId,
              status: 'Received',
              percentageProgress: 5,
              amountSent: '',
              amountReceived: response?.amount,
              sender: response?.fromAddress,
              receiver: response?.toAddress,
              blockchainUrl: response?.blockchainUrl,
            };
            const result = await updateBlockchainStatusInternal(userData);
            console.log({ result: result });
            res.status(200).json(result);
          }
        }
        //====================={EVM CASES}================================
        if (chain === 'Ethereum' && token?.symbol === 'eth') {
          //ETH case
          // let value = amount;
          let value = record?.fValue.toString(); // single crypto currency transaction
          // const response = await verifyEthereumSentToBlendery(
          //   blenderyAddress,
          //   value
          // );
          const userData = {
            id: record?._id,
            hash: hashEthereum,
            status: 'Received',
            percentageProgress: 5,
            amountSent: value,
            amountReceived: '',
            sender: '',
            receiver: blenderyAddress,
            blockchainUrl: `${blockchainUrlEndpoint}/${hashEthereum}`,
          };
          const result = await updateBlockchainStatusInternal(userData);
          console.log({ result: result });
          res.status(200).json(result);
        }

        if (chain === 'Ethereum' && token?.symbol !== 'eth') {
          //ERC20 case
          // let value = amount;
          let value = record?.fValue.toString(); // single crypto currency transaction
          let erc20TokenAddress = token?.address;
          // const response = await verifyEthereumSentToBlenderyERC20(
          //   blenderyAddress,
          //   erc20TokenAddress,
          //   value
          // );
          const userData = {
            id: record?._id,
            hash: hashEthereum,
            status: 'Received',
            percentageProgress: 5,
            amountSent: value,
            amountReceived: '',
            sender: '',
            receiver: blenderyAddress,
            blockchainUrl: `${blockchainUrlEndpoint}/${hashEthereum}`,
          };
          const result = await updateBlockchainStatusInternal(userData);
          console.log({ result: result });
          res.status(200).json(result);
        }
      }

      if (service === 'sell' && subService === 'sellCard') {
        token = record?.fToken;
        blenderyAddress = record?.blenderyAddress;
        userAddress = record?.userAddress;
        chain = record?.fToken?.chain;
        chainId = record?.fToken?.chainId ? record?.fToken?.chainId : ''; // only applies to evm chain

        if (chain === 'Bitcoin' && token?.symbol === 'btc') {
          console.log('is active: BTC');
          let value = Number(record?.fValue); // single crypto currency transaction
          console.log({ value: value });
          console.log({ blenderyAddress: blenderyAddress });
          const response = await verifyBitcoinSentToBlenderyWithoutAddress(
            blenderyAddress,
            value
          );
          console.log({ responseData: response });

          if (response?.amount) {
            const userData = {
              id: record?._id,
              hash: response?.txId,
              status: 'Received',
              percentageProgress: 5,
              amountSent: '',
              amountReceived: response?.amount,
              sender: response?.fromAddress,
              receiver: response?.toAddress,
              blockchainUrl: response?.blockchainUrl,
            };
            const result = await updateBlockchainStatusInternal(userData);
            console.log({ result: result });
            res.status(200).json(result);
          }
        }
        if (chain === 'Tron' && token?.symbol === 'trx') {
          //TRX case
          const response = await verifyTronSentToBlendery(blenderyAddress);
          if (response?.amount) {
            const userData = {
              id: record?._id,
              hash: response?.txId,
              status: 'Received',
              percentageProgress: 5,
              amountSent: '',
              amountReceived: response?.amount,
              sender: response?.fromAddress,
              receiver: response?.toAddress,
              blockchainUrl: response?.blockchainUrl,
            };
            const result = await updateBlockchainStatusInternal(userData);
            console.log({ result: result });
            res.status(200).json(result);
          }
        }

        if (chain === 'Tron' && token?.symbol !== 'trx') {
          //'TRC20' case
          const response = await verifyTronSentToBlenderyTRC20(blenderyAddress);
          if (response?.amount) {
            const userData = {
              id: record?._id,
              hash: response?.txId,
              status: 'Received',
              percentageProgress: 5,
              amountSent: '',
              amountReceived: response?.amount,
              sender: response?.fromAddress,
              receiver: response?.toAddress,
              blockchainUrl: response?.blockchainUrl,
            };
            const result = await updateBlockchainStatusInternal(userData);
            console.log({ result: result });
            res.status(200).json(result);
          }
        }
        //====================={EVM CASES}================================
        if (chain === 'Ethereum' && token?.symbol === 'eth') {
          //ETH case
          // let value = amount;
          let value = record?.fValue.toString(); // single crypto currency transaction
          // const response = await verifyEthereumSentToBlendery(
          //   blenderyAddress,
          //   value
          // );
          const userData = {
            id: record?._id,
            hash: hashEthereum,
            status: 'Received',
            percentageProgress: 5,
            amountSent: value,
            amountReceived: '',
            sender: '',
            receiver: blenderyAddress,
            blockchainUrl: `${blockchainUrlEndpoint}/${hashEthereum}`,
          };
          const result = await updateBlockchainStatusInternal(userData);
          console.log({ result: result });
          res.status(200).json(result);
        }

        if (chain === 'Ethereum' && token?.symbol !== 'eth') {
          //ERC20 case
          // let value = amount;
          let value = record?.fValue.toString(); // single crypto currency transaction
          let erc20TokenAddress = token?.address;
          // const response = await verifyEthereumSentToBlenderyERC20(
          //   blenderyAddress,
          //   erc20TokenAddress,
          //   value
          // );
          const userData = {
            id: record?._id,
            hash: hashEthereum,
            status: 'Received',
            percentageProgress: 5,
            amountSent: value,
            amountReceived: '',
            sender: '',
            receiver: blenderyAddress,
            blockchainUrl: `${blockchainUrlEndpoint}/${hashEthereum}`,
          };
          const result = await updateBlockchainStatusInternal(userData);
          console.log({ result: result });
          res.status(200).json(result);
        }
      }
      if (service === 'exchange' && subService === 'exchange') {
        token = record?.fToken;
        blenderyAddress = record?.blenderyAddress;
        userAddress = record?.userAddress;
        chain = record?.fToken?.chain;
        chainId = record?.fToken?.chainId ? record?.fToken?.chainId : ''; // only applies to evm chain

        if (chain === 'Bitcoin' && token?.symbol === 'btc') {
          console.log('is active: BTC');
          let value = Number(record?.fValue); // single crypto currency transaction
          console.log({ value: value });
          console.log({ blenderyAddress: blenderyAddress });
          const response = await verifyBitcoinSentToBlenderyWithoutAddress(
            blenderyAddress,
            value
          );
          console.log({ responseData: response });

          if (response?.amount) {
            const userData = {
              id: record?._id,
              hash: response?.txId,
              status: 'Received',
              percentageProgress: 5,
              amountSent: '',
              amountReceived: response?.amount,
              sender: response?.fromAddress,
              receiver: response?.toAddress,
              blockchainUrl: response?.blockchainUrl,
            };
            const result = await updateBlockchainStatusInternal(userData);
            console.log({ result: result });
            res.status(200).json(result);
          }
        }
        if (chain === 'Tron' && token?.symbol === 'trx') {
          //TRX case
          const response = await verifyTronSentToBlendery(blenderyAddress);
          if (response?.amount) {
            const userData = {
              id: record?._id,
              hash: response?.txId,
              status: 'Received',
              percentageProgress: 5,
              amountSent: '',
              amountReceived: response?.amount,
              sender: response?.fromAddress,
              receiver: response?.toAddress,
              blockchainUrl: response?.blockchainUrl,
            };
            const result = await updateBlockchainStatusInternal(userData);
            console.log({ result: result });
            res.status(200).json(result);
          }
        }

        if (chain === 'Tron' && token?.symbol !== 'trx') {
          //'TRC20' case
          const response = await verifyTronSentToBlenderyTRC20(blenderyAddress);
          if (response?.amount) {
            const userData = {
              id: record?._id,
              hash: response?.txId,
              status: 'Received',
              percentageProgress: 5,
              amountSent: '',
              amountReceived: response?.amount,
              sender: response?.fromAddress,
              receiver: response?.toAddress,
              blockchainUrl: response?.blockchainUrl,
            };
            const result = await updateBlockchainStatusInternal(userData);
            console.log({ result: result });
            res.status(200).json(result);
          }
        }
        //====================={EVM CASES}================================
        if (chain === 'Ethereum' && token?.symbol === 'eth') {
          //ETH case
          // let value = amount;
          let value = record?.fValue.toString(); // single crypto currency transaction
          // const response = await verifyEthereumSentToBlendery(
          //   blenderyAddress,
          //   value
          // );

          const userData = {
            id: record?._id,
            hash: hashEthereum,
            status: 'Received',
            percentageProgress: 5,
            amountSent: value,
            amountReceived: '',
            sender: '',
            receiver: blenderyAddress,
            blockchainUrl: `${blockchainUrlEndpoint}/${hashEthereum}`,
          };
          const result = await updateBlockchainStatusInternal(userData);
          console.log({ result: result });
          res.status(200).json(result);
        }

        if (chain === 'Ethereum' && token?.symbol !== 'eth') {
          //ERC20 case
          // let value = amount;
          let value = record?.fValue.toString(); // single crypto currency transaction
          let erc20TokenAddress = token?.address;
          // const response = await verifyEthereumSentToBlenderyERC20(
          //   blenderyAddress,
          //   erc20TokenAddress,
          //   value
          // );
          const userData = {
            id: record?._id,
            hash: hashEthereum,
            status: 'Received',
            percentageProgress: 5,
            amountSent: value,
            amountReceived: '',
            sender: '',
            receiver: blenderyAddress,
            blockchainUrl: `${blockchainUrlEndpoint}/${hashEthereum}`,
          };
          const result = await updateBlockchainStatusInternal(userData);
          console.log({ result: result });
          res.status(200).json(result);
        }
      }
    }
  }
};

async function updateBlockchainStatusInternal(userData) {
  const id = userData?.id; // new transaction mongodb id ==> transaction?._i; // new transaction mongodb id ==> transaction?._id
  const status = userData?.status; // new status ==> // pending, paid, completed, cancel, active, inActiv; // new status ==> // pending, paid, completed, cancel, active, inActive
  const hash = userData?.hash; // hash or tron txId
  const amountSent = userData?.amountSent;
  const amountReceived = userData?.amountReceived;
  const sender = userData?.sender; // transactions could be sent by any address
  const receiver = userData?.receiver; // transactions could be sent by any address
  const percentageProgress = userData?.percentageProgress; // transactions percentageProgress
  const blockchainUrl = userData?.blockchainUrl; // transactions percentageProgress

  const transactionDoc = await Transaction.findById(id);
  if (transactionDoc) {
    transactionDoc.sender = sender || transactionDoc?.sender;
    transactionDoc.receiver = receiver || transactionDoc?.receiver;
    transactionDoc.status = status || transactionDoc?.status;
    transactionDoc.amountSent = amountSent || transactionDoc?.amountSent;
    transactionDoc.amountReceived =
      amountReceived || transactionDoc?.amountReceived;
    transactionDoc.hash = hash || transactionDoc?.hash;
    transactionDoc.percentageProgress =
      percentageProgress || transactionDoc?.percentageProgress;
    transactionDoc.blockchainUrl =
      blockchainUrl || transactionDoc?.blockchainUrl;
  }

  const response = await transactionDoc.save();
  if (response) {
    // res.status(200).json(response);
    console.log({ updated: response });
    return response;
  }
}

//============={admin send and withdraw btc}====================

const sendBitcoinWalletAdmin = asyncHandler(async (req, res) => {
  // const { tokenId, userId, receiver, amount } = req.body;

  const { amount, receiver } = req.body;

  if (!amount) {
    res.status(400);
    throw new Error({ errorMessage: 'amount required' });
  }

  if (!receiver) {
    res.status(400);
    throw new Error({ errorMessage: 'receiver required' });
  }

  let privateKey = process.env.ADMIN_BITCOIN_WALLET_PRIVATE_KEY;
  let address = process.env.ADMIN_BITCOIN_WALLET_ADDRESS;

  const recieverAddress = receiver;
  const sourceAddress = address;
  // const satoshiToSend = amountToSend * 100000000;
  // const satoshiToSend = Number(amount) * 100000000;
  // const satoshiToSend = Number(amount) * 1e8; // check || 1e9
  const satoshiToSendRaw = amountToSend * 1e8;
  const satoshiToSend = Number(satoshiToSendRaw.toFixed(0));

  let fee = 0;
  let inputCount = 0;
  let outputCount = 2;

  // const recommendedFee = await axios.get(
  //   'https://bitcoinfees.earn.com/api/v1/fees/recommended'
  // );

  // console.log({recommendedFee: recommendedFee})

  const transaction = new bitcore.Transaction();
  let totalAmountAvailable = 0;

  let inputs = [];
  let resp;
  if (network === testnet) {
    resp = await axios({
      method: 'GET',
      url: `https://blockstream.info/testnet/api/address/${sourceAddress}/utxo`,
    });
  } else {
    resp = await axios({
      method: 'GET',
      url: `https://blockstream.info/api/address/${sourceAddress}/utxo`,
    });
  }

  const utxos = resp.data;

  // console.log({utxos: utxos})

  for (const utxo of utxos) {
    let input = {};
    input.satoshis = utxo.value;
    input.script = bitcore.Script.buildPublicKeyHashOut(sourceAddress).toHex();
    input.address = sourceAddress;
    input.txId = utxo.txid;
    input.outputIndex = utxo.vout;
    totalAmountAvailable += utxo.value;
    inputCount += 1;
    inputs.push(input);
  }

  /**
   * In a bitcoin transaction, the inputs contribute 180 bytes each to the transaction,
   * while the output contributes 34 bytes each to the transaction. Then there is an extra 10 bytes you add or subtract
   * from the transaction as well.
   * */

  const transactionSize = inputCount * 180 + outputCount * 34 + 10 - inputCount;
  // fee = transactionSize * recommendedFee.data.hourFee / 3; // satoshi per byte
  fee = transactionSize * 1; // 1 sat/byte is fine for testnet but update for mainnet
  if (network === testnet) {
    fee = transactionSize * 1; // 1 sat/byte is fine for testnet
  }
  if (totalAmountAvailable - satoshiToSend - fee < 0) {
    throw new Error('Balance is too low for this transaction');
  }
  //Set transaction input
  transaction.from(inputs);

  // set the recieving address and the amount to send
  transaction.to(recieverAddress, satoshiToSend);

  // Set change address - Address to receive the left over funds after transfer
  transaction.change(sourceAddress);

  //manually set transaction fees: 20 satoshis per byte
  transaction.fee(Math.round(fee));

  // Sign transaction with your private key
  transaction.sign(privateKey);

  // serialize Transactions
  const serializedTransaction = transaction.serialize();

  // Send transaction
  let result;

  if (network === testnet) {
    result = await axios({
      method: 'POST',
      url: `https://blockstream.info/testnet/api/tx`,
      data: serializedTransaction,
    });
  } else {
    result = await axios({
      method: 'POST',
      url: `https://blockstream.info/api/tx`,
      data: serializedTransaction,
    });
  }

  // return result.data;
  console.log('responding');

  let response = result.data;
  console.log({ response: response });
  res.status(200).json(response);
});

const getBitcoinBalanceAdmin = asyncHandler(async (req, res) => {
  let address = process.env.ADMIN_BITCOIN_WALLET_ADDRESS;

  const sourceAddress = address;

  let inputCount = 0;

  let totalAmountAvailable = 0;

  let inputs = [];
  let resp;
  if (network === testnet) {
    resp = await axios({
      method: 'GET',
      url: `https://blockstream.info/testnet/api/address/${sourceAddress}/utxo`,
    });
  } else {
    resp = await axios({
      method: 'GET',
      url: `https://blockstream.info/api/address/${sourceAddress}/utxo`,
    });
  }
  const utxos = resp.data;

  for (const utxo of utxos) {
    let input = {};
    input.satoshis = utxo.value;
    input.script = bitcore.Script.buildPublicKeyHashOut(sourceAddress).toHex();
    input.address = sourceAddress;
    input.txId = utxo.txid;
    input.outputIndex = utxo.vout;
    totalAmountAvailable += utxo.value;
    inputCount += 1;
    inputs.push(input);
  }

  const balance = totalAmountAvailable;

  console.log({ balances: balance });
  console.log({ balanceFormatted: `${balance / 1e8} tBTC` });
  const response = {
    balance: balances / 1e8,
  };
  res.status(200).json(response);
});

async function getWalletsInternal() {
  const allWallets = await WalletsAdmin.findById(process.env.ADMIN_WALLETID);

  const walletsBitcoin = allWallets.bitcoin?.hdAccounts;
  const walletsEvm = allWallets.evm?.hdAccounts;
  const walletsTron = allWallets.tron?.hdAccounts;
  // console.log({ walletsBitcoin: walletsBitcoin });
  console.log({ walletsEvm: walletsEvm });
  // console.log({ walletsTron: walletsTron });

  const walletsBitcoin1 = walletsBitcoin[0];
  if (walletsBitcoin1) {
    let hdPrivateKeyEncrypted = walletsBitcoin1?.privateKey;
    const decryptedPrivateKey = decryptPrivateKey(hdPrivateKeyEncrypted);
    address = walletsBitcoin1?.address;
    privateKey = decryptedPrivateKey;

    console.log({
      address,
      privateKey,
    });
  }
  const walletsEvm1 = walletsEvm[0];
  if (walletsEvm1) {
    let hdPrivateKeyEncrypted = walletsEvm1?.privateKey;
    const decryptedPrivateKey = decryptPrivateKey(hdPrivateKeyEncrypted);
    address = walletsEvm1?.address;
    privateKey = decryptedPrivateKey;

    console.log({
      address,
      privateKey,
    });
  }
  const walletsTron1 = walletsTron[0];
  if (walletsTron1) {
    let hdPrivateKeyEncrypted = walletsTron1?.privateKey;
    const decryptedPrivateKey = decryptPrivateKey(hdPrivateKeyEncrypted);
    address = walletsTron1?.address;
    privateKey = decryptedPrivateKey;

    console.log({
      address,
      privateKey,
    });
  }

  const response = {
    walletsBitcoin,
    walletsEvm,
    walletsTron,
  };

  // console.log({ response: response });

  //await getWalletBalances(response)
  return response;
}

// getWalletsInternal();

// {
//   address: 'mououTnjG5mXa5NJGqfdcyQPN4Qr1BZUAf',
//   privateKey: '7b82bc819906c9401d269b892d81af3f943be403001c79270b722e607d642b5c'
// }
// {
//   address: '0xC5fa054DDC662794944FB9D50BF6412504D30b2b',
//   privateKey: '0x21d9380ff5c311d8cb461ee9f9ff35cb4f01a84dd86245b1a6480f95a43388b7'
// }
// {
//   address: 'TGsHt3zdb6S9Pg8Vgy2Mnsq5geLoYSYTLb',
//   privateKey: '0x08b0cddb61af1f296c41a774303809a545f79d76dc2076a971e3ccb824b7e9dd'
// }

async function getWalletBalances(wallets) {
  const { walletsBitcoin, walletsEvm, walletsTron } = wallets;

  const balancesBitcoin = walletsBitcoin?.map(async (wallet) => {
    const response = await getBalanceBitcoin(wallet);
    return response;
  });

  const balancesEvm = walletsEvm?.map(async (wallet) => {
    const response = await getBalanceEthereum(wallet);
    return response;
  });

  const balancesTron = walletsTron?.map(async (wallet) => {
    const response = await getBalanceTron(wallet);
    return response;
  });

  const response = {
    balancesBitcoin,
    balancesEvm,
    balancesTron,
  };

  return response;
}

async function getBalanceBitcoin(wallet) {
  let hdPrivateKeyEncrypted = wallet?.privateKey;
  const decryptedPrivateKey = decryptPrivateKey(hdPrivateKeyEncrypted);
  const address = wallet?.address;

  let walletAddress = address;
  const sourceAddress = address;
  let inputCount = 0;
  let totalAmountAvailable = 0;

  let inputs = [];
  let resp;
  if (network === testnet) {
    resp = await axios({
      method: 'GET',
      url: `https://blockstream.info/testnet/api/address/${sourceAddress}/utxo`,
    });
  } else {
    resp = await axios({
      method: 'GET',
      url: `https://blockstream.info/api/address/${sourceAddress}/utxo`,
    });
  }
  const utxos = resp.data;

  for (const utxo of utxos) {
    let input = {};
    input.satoshis = utxo.value;
    input.script = bitcore.Script.buildPublicKeyHashOut(sourceAddress).toHex();
    input.address = sourceAddress;
    input.txId = utxo.txid;
    input.outputIndex = utxo.vout;
    totalAmountAvailable += utxo.value;
    inputCount += 1;
    inputs.push(input);
  }

  const balances = totalAmountAvailable;

  console.log({ balances: balances });
  console.log({ balanceFormatted: `${balances / 1e8} tBTC` });
  const balanceFormatted = balances / 1e8;
  const response = {
    addresss: '',
    symbol: 'btc',
    balance: balanceFormatted,
    // image: userTokens[i]?.image,
    walletAddress,
    privateKey: decryptedPrivateKey,
  };

  return response;
}

const testWallet = {
  accountName: 'Account 46',
  address: 'mw34b11YUGLPEMDRdmaZccBsQnSSg4VtT3',
  privateKey:
    'ca73fa7484fb1a8ca0b89987075f9165710a7bd3e34a61361a8865be915af4ead9403842d5e0711da0a936f48831ec31ad9a516209d2fe496c1ff78014a012788bd7a3a826702951491415c3cfbd8942',
  _id: '655a692fcdfebda8d069f389',
};
// getBalanceBitcoin(testWallet)

// getBalanceTronTest('THFxGz1Pq5pyL7kdjZFwFqbP8zbBSLsYzE'); // external wallet
// getBalanceTronTest('TQu7o18fGP1jieqF5Y5fYu6d8vRL4oC6pv');

// const formattedResponse = tronWeb.toDecimal('0x01f5ee8c5fac540000');
// console.log({ formattedResponse: formattedResponse });
// const amount = tronWeb.fromSun(formattedResponse); // convert to TRX
// console.log({ balanceTRC: amount });
// { formattedResponse: 36168000000000000000 }
//expected value36.168

async function getBalanceTron(wallet) {
  let hdPrivateKeyEncrypted = wallet?.privateKey;
  const decryptedPrivateKey = decryptPrivateKey(hdPrivateKeyEncrypted);

  const address = wallet?.address;

  let walletAddress = address;

  const tronDefaultPrivetkey =
    'f48568daeaa884e82391c423189bb205654edb925524529757f7081696f78655';
  // let walletAddress = address;

  const tronWeb = new TronWeb({
    fullHost: 'https://nile.trongrid.io', // Replace with your Tron full node endpoint
    solidityNode: 'https://nile.trongrid.io', // Replace with your Tron solidity node endpoint
    privateKey: tronDefaultPrivetkey,
  });

  const userTokens = [
    {
      address: '',
      decimals: 6,
      symbol: 'trx',
      image:
        'https://assets.coingecko.com/coins/images/1094/large/tron-logo.png?1696502193',
    },
    {
      // address: usdtAddressTron, //mainnet
      address: usdtAddressTron, //testnet
      decimals: 6,
      symbol: 'usdt',
      image:
        'https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661',
    },
    {
      address: 'TLBaRhANQoJFTqre9Nf1mjuwNWjCJeYqUL',
      decimals: 18,
      symbol: 'usdj',
      image:
        'https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661',
    },
  ];

  let balances = [];

  for (let i = 0; i < userTokens.length; i++) {
    if (userTokens[i].symbol === 'trx') {
      const responseNative = await tronWeb.trx.getBalance(walletAddress);

      if (responseNative) {
        const amount = tronWeb.fromSun(responseNative); // convert to TRX
        console.log({ balanceTRC: amount });
        // balances = amount;

        let token = {
          symbol: userTokens[i]?.symbol,
          address: userTokens[i]?.address,
          balance: Number(amount),
          image: userTokens[i]?.image,
          walletAddress,
          privateKey: decryptedPrivateKey,
        };
        balances.push(token);
      }
    } else {
      try {
        const tokenContractAddress = userTokens[i]?.address;
        const contract = await tronWeb.contract().at(tokenContractAddress);
        const balance = await contract.balanceOf(walletAddress).call();
        const normalizedBalance = tronWeb.fromSun(balance);
        console.log(`The TRC20 token balance is: ${normalizedBalance}`);

        let convertedDecimals;
        let fromattedBalance;
        let token;
        const tokenDecimals = userTokens[i].decimals;

        if (tokenDecimals > 6) {
          convertedDecimals = tokenDecimals - 6;
          const decimal = `1e${convertedDecimals}`;
          fromattedBalance = Number(normalizedBalance) / decimal;
          token = {
            symbol: userTokens[i].symbol,
            address: userTokens[i].address,
            decimals: userTokens[i].decimals,
            balance: fromattedBalance,
            image: userTokens[i]?.image,
            walletAddress,
            privateKey: decryptedPrivateKey,
          };

          balances.push(token);
        } else {
          fromattedBalance = Number(normalizedBalance);
          token = {
            symbol: userTokens[i].symbol,
            address: userTokens[i].address,
            decimals: userTokens[i].decimals,
            balance: fromattedBalance,
            image: userTokens[i]?.image,
            walletAddress,
            privateKey: decryptedPrivateKey,
          };

          balances.push(token);
        }

        console.log(`formatted balance is: ${fromattedBalance}`);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }

  if (balances) {
    console.log({ balances: balances });
    return balances;
  }
}

const wallet1 = {
  accountName: 'Account 49',
  address: 'TQu7o18fGP1jieqF5Y5fYu6d8vRL4oC6pv',
  privateKey:
    'ff9e849653f36ca20835063c5e1a274c8aca64727c0ce65c6135e3929f50030c11c4878b2f3044f1f9420bd30e8c0f65f87a7c1ad786a8683f22cda482b1e0b599557d1c802ade934edb659be0f7f178',
  phrase:
    '80850bd93f6490ddb23404fc57e03a321c468b4affa2253e3e1648cd77bb004fc9d781d56721129501e11972f61c313d999a22ecc971b76d1c058e01145798baec87a7cff56f11ef0732863546485ad8',
  // _id: new ObjectId('6569dfa36fdb73792b836b35'),
};

const wallet2 = {
  accountName: 'Account 48',
  address: 'TJF5TwqjAdypX6LWakKg5atdioEbnpBXq7',
  privateKey:
    '00d302ad366c2ec253c3aa3c6f388673a2c04c6c0716c9154a2f13242c2c4fa3cbdd03de07321dcf59068eb7c2e5a8f082c0da2f0524aa40c288f2ba78ccbe740628172a378372a433bbca2cf6e4b291',
  phrase:
    'f1b4862ced651c73228f824614cd85777f2f9294104e833efdca20ba8ad9df0336f1f7c200717d5c70e86e18c236c8bf6a9ca20f2880177077ef0f9ed56c6320392cd557d9a2fe94162cf47cd2263b3c',
  // _id: new ObjectId("6569d5306fdb73792b814604")
};

const walletMaster = {
  accountName: 'Master',
  address: 'TGBqjk1BjZxmziJqqJSvriiNUikn5vX3LF',
  privateKey:
    'dc71a989df16a00520827134057f8609a50734929725b6fe778c9c4c10421f518d36d758c252fa1d7bceef564bea87298ef8c21af6e1e044f93deb03182f3ab42f463ed874031a59f31f47ee3cba89d7',
};

const walletExternalMain = {
  address: 'THFxGz1Pq5pyL7kdjZFwFqbP8zbBSLsYzE',
  privateKey:
    'cb9070d226d088fac33636b4f3a429f5f74f63f48719e7a2df2f9c10cb3abc92',
};

// {
//   privateKey: '0x0c4d8bb9500a74f3eaeb395f77e9e19a683951c410a1c441e503d95ca2b0577d',
//   walletAddress: 'TQu7o18fGP1jieqF5Y5fYu6d8vRL4oC6pv'
// }

// getBalanceTron(walletMaster);
// getBalanceTron(wallet1);
// getBalanceTron(walletExternalMain);

const responseWallet1Tron = {
  balances: [
    {
      symbol: 'trx',
      address: '',
      balance: 10,
      image:
        'https://assets.coingecko.com/coins/images/1094/large/tron-logo.png?1696502193',
    },
    {
      symbol: 'usdt',
      address: usdtAddressTron,
      balance: 0,
      image:
        'https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661',
    },
    {
      symbol: 'usdj',
      address: 'TLBaRhANQoJFTqre9Nf1mjuwNWjCJeYqUL',
      balance: 0,
      image:
        'https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661',
    },
  ],
};

const responseExternalWallet = {
  balances: [
    {
      symbol: 'trx',
      address: '',
      balance: 1259.510128,
      image:
        'https://assets.coingecko.com/coins/images/1094/large/tron-logo.png?1696502193',
    },
    {
      symbol: 'usdt',
      address: usdtAddressTron,
      balance: 0,
      image:
        'https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661',
    },
    {
      symbol: 'usdj',
      address: 'TLBaRhANQoJFTqre9Nf1mjuwNWjCJeYqUL',
      balance: 36.168,
      image:
        'https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661',
    },
  ],
};

//=========================================================================

//=========================================================================

//=========================================================================

// const responseNative = await tronWeb.trx.getAccount(walletAddress)

// if (responseNative) {

//   console.log({ responseNative:responseNative });

// }

//=========================================================================

// let token = {
//   symbol: 'usdj',
//   address: 'TLBaRhANQoJFTqre9Nf1mjuwNWjCJeYqUL',
//   balance: amount,
// };
// balances.push(token);

async function getBalanceEthereum(wallet) {
  //==========={get Privatekey}=========================================================

  let hdPrivateKeyEncrypted = wallet?.privateKey;
  // Decrypt the private key for use in Bitcoin transactions
  const decryptedPrivateKey = decryptPrivateKey(hdPrivateKeyEncrypted);
  const address = wallet?.address;
  privateKey = decryptedPrivateKey;
  let walletAddress = address;
  console.log({ privateKey: privateKey });

  //========{external wallet with direct privatekey}====================
  // address = wallet?.address;
  // privateKey = wallet?.privateKey;
  //  let walletAddress = address;
  //  console.log({ privateKey: privateKey });

  //======{mainnet}=======================
  // const chainId = '1';
  const networkRPCEthereum = 'https://cloudflare-eth.com';
  const userTokensEthereum = [
    {
      name: 'Ethereum',
      address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
      decimals: 18,
      symbol: 'eth',
      image:
        'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628',
    },
    {
      name: 'tether',
      address: usdtAddressEthereum,
      decimals: 6,
      symbol: 'usdt',
      image:
        'https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661',
    },
  ];

  //======{Goreli testnet}=======================

  const chainId = '5';
  const networkRPCGoerli = 'https://rpc.ankr.com/eth_goerli';
  const userTokensGoerli = [
    {
      name: 'Ethereum',
      address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
      decimals: 18,
      symbol: 'eth',
      image:
        'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628',
    },
    {
      name: 'Tether USD (Go)',
      address: usdtAddressEthereum,
      decimals: 6,
      symbol: 'usdt',
      image:
        'https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661',
    },
  ];

  //======{mainnet}=======================

  //======{Goreli testnet}=======================

  const networkRPC = networkRPCGoerli;
  const userTokens = userTokensGoerli;

  // const networkRPC = networkRPCEthereum;
  // const userTokens = userTokensEthereum;

  if (!userTokens?.length) {
    console.log({ message: 'No tokens available, please contact support' });
    return;
  }

  const provider = new ethers.providers.JsonRpcProvider(networkRPC); // default is ethereum homestead
  const signer = new ethers.Wallet(privateKey, provider);

  let typeRaw = '';

  let balances = [];
  for (let i = 0; i < userTokens.length; i++) {
    if (userTokens[i].address != '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
      const ERC20Contract = new ethers.Contract(
        userTokens[i].address,
        ERC20Abi,
        signer
      );
      typeRaw = 'Token';

      const balance = await ERC20Contract.balanceOf(walletAddress);
      balances.push({
        address: userTokens[i].address,
        symbol: userTokens[i].symbol.toUpperCase(),
        decimals: userTokens[i].decimals,
        balance: ethers.utils.formatUnits(balance, userTokens[i].decimals),
        image: userTokens[i]?.image,
        type: typeRaw,
        walletAddress,
        privateKey: decryptedPrivateKey,
      });
    } else {
      typeRaw = 'Native';
      //  //========{Formatting type Output}=================================

      const balanceRaw = await provider.getBalance(walletAddress);
      const balance = ethers.utils
        .formatEther(balanceRaw.toString())
        .toString();

      console.log({ ethBalanceRaw: balance });
      console.log({
        ethBalance: ethers.utils.formatEther(balanceRaw.toString()).toString(),
      });

      balances.push({
        address: userTokens[i].address,
        symbol: userTokens[i].symbol.toUpperCase(),
        decimals: userTokens[i].decimals,
        balance,
        image: userTokens[i]?.image,
        type: typeRaw,
        walletAddress,
        privateKey: decryptedPrivateKey,
      });
    }
  }
  console.log(balances);

  // if (balances.length > 0) {
  //   const response = {
  //     balances,
  //   };

  //   console.log({ response: response });
  //   return response;
  // }

  if (balances) {
    console.log({ balances: balances });
    return balances;
  }

  // res.status(200).json(balances);
}

const ethWallet1 = {
  accountName: 'Account 36',
  address: '0xB2Dc90f92D0E29cb28717619c2E054F36A48e0C2',
  privateKey:
    '7c18adc2e051ec57bde63e1409a00ee54eac12059140affa99340f89134b4091089aac585732962f9139932bed88b0534284db3a0ed77572b9a10641b368a2380c0dd66781f88d045a7a149fd51d5296',
  phrase:
    '86712b4cd25b7b3cfd91d7b7cc8c05485f1d873a643e4863664ed325d6815c383808d307b78e58a95d7757c163630c3ae6d519680611eb2da3c7282c0ad002383ac7b541867dc8c25a741b86e7e6899c',
  // _id: new ObjectId("6569e2776fdb73792b83dfba")
};

const ethWalletExtenal = {
  accountName: 'Account 36',
  address: '0x56c8b61DB2A5bF5679172901585E76EedB6Bc3e6',
  privateKey:
    '3239276808d39d1831df0c804964bda63d74bdc9e9e2b8b2a9fce53f27a8f18d',
  // _id: new ObjectId("6569e2776fdb73792b83dfba")
};

// const responseEthWalletExtenal ={
//   balances: [
//     {
//       address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
//       symbol: 'ETH',
//       balance: '0.007200306136551074',
//       image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628',
//       type: 'Native'
//     },
//     {
//       address: usdtAddressEthereum,
//       symbol: 'USDT',
//       balance: '1.446675',
//       image: 'https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661',
//       type: 'Token'
//     }
//   ]
// }
// getBalanceEthereum(ethWallet1);

// {
//   "_id": {
//     "$oid": "652c6f838a1e328256fef06a"
//   },
//   "id": "tether",
//   "symbol": "usdt",
//   "name": "Tether",
//   "image": "https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661",
//   "current_price": 0.999855,
//   "market_cap": 83499840098,
//   "market_cap_rank": 3,
//   "fully_diluted_valuation": 83499840098,
//   "total_volume": 15161583966,
//   "high_24h": 1.001,
//   "low_24h": 0.998401,
//   "price_change_24h": 0.0006053,
//   "price_change_percentage_24h": 0.06058,
//   "market_cap_change_24h": 19241670,
//   "market_cap_change_percentage_24h": 0.02305,
//   "circulating_supply": 83519009631.3892,
//   "total_supply": 83519009631.3892,
//   "max_supply": null,
//   "ath": 1.32,
//   "ath_change_percentage": -24.45032,
//   "ath_date": "2018-07-24T00:00:00.000Z",
//   "atl": 0.572521,
//   "atl_change_percentage": 74.59521,
//   "atl_date": "2015-03-02T00:00:00.000Z",
//   "roi": null,
//   "last_updated": "2023-10-12T12:15:00.310Z",
//   "address": "0xdac17f958d2ee523a2206206994597c13d831ec7",
//   "decimals": 6,
//   "chainId": "1"
// }

async function getWalletBalancesByNetwork(id) {
  const allWallets = await WalletsAdmin.findById(process.env.ADMIN_WALLETID);
  const txData = await Transaction.findById(id);

  // const reserveWallet = {}; // admin dedicated wallet
  //======{all admin reserve external wallet}====================
  const reserveWallet = {
    bitcoin: {
      walletAddress: process.env.ADMIN_RESERVE_WALLET_BITCOIN_WALLETADDRESS,
      privateKey: process.env.ADMIN_RESERVE_WALLET_BITCOIN_PRIVATEKEY,
    },
    evm: {
      walletAddress: process.env.ADMIN_RESERVE_WALLET_EVM_WALLETADDRESS,
      privateKey: process.env.ADMIN_RESERVE_WALLET_EVM_PRIVATEKEY,
    },
    tron: {
      walletAddress: process.env.ADMIN_RESERVE_WALLET_TRON_WALLETADDRESS,
      privateKey: process.env.ADMIN_RESERVE_WALLET_TRON_PRIVATEKEY,
    },
  }; // admin dedicated wallet

  const walletsBitcoin = allWallets.bitcoin?.hdAccounts;
  const walletsEvm = allWallets.evm?.hdAccounts;
  const walletsTron = allWallets.tron?.hdAccounts;

  let balance; // not necessary anymore
  let balances = [];
  let enabledWallets = [];
  let selectedWallet = {};

  let sF = 1.05; //factor of safety 5% more due to nework flunctuations

  const tValue = Number(txData?.tValue);
  const serviceFee = Number(txData?.serviceFee);
  const networkFee = Number(txData?.networkFee);
  const totalAmount = tValue + serviceFee + networkFee;

  let activeReserveWallet;

  //========={The transaction has to be  on "Bitcoin" network and the transaction status "Received"}======================
  if (txData?.tToken?.chain === 'Bitcoin' && txData?.status === 'Received') {
    activeReserveWallet = reserveWallet?.bitcoin;

    const balancesBitcoin = walletsBitcoin?.map(async (wallet) => {
      const response = await getBalanceBitcoin(wallet);
      balances.push(response);
      return response;
    });

    balance = balancesBitcoin;

    if (balances.length > 0) {
      balances?.map(async (b) => {
        /**
         * ensure that there is sufficient token balance to cover for the transaction cost and that the token addresses are a match
         */
        if (
          b?.balance > sF * totalAmount &&
          b?.address === txData?.tToken?.address
        ) {
          enabledWallets.push(b);
        }
      });
    }
    //========={if we have sufficient balance we could assign the first wallet that meets the condition as the selected wallet for the transaction, else we will have to use our reserve wallet to pay the user}======================

    if (enabledWallets.length > 0) {
      selectedWallet = enabledWallets[0];
      // return selectedWallet;
    } else {
      selectedWallet = activeReserveWallet;
      // return activeReserveWallet;
    }

    if (selectedWallet) {
      const response = await sendBitcoin(txData, selectedWallet);
      console.log({ responseData: response });

      if (response?.amount) {
        const userData = {
          id: txData?._id,
          hashOut: response?.hashOut,
          status: 'Completed',
          percentageProgress: 5,
        };
        //update status as paid
        const result = await updateBlockChainOutTransactionByIdInternal(
          userData
        );
        console.log({ result: result });
      }
    }
  }
  //========={The transaction has to be  on "Ethereum" network and the transaction status "Received"}======================

  if (txData?.tToken?.chain === 'Ethereum' && txData?.status === 'Received') {
    activeReserveWallet = reserveWallet?.evm;

    if (
      txData?.tToken.address == '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
    ) {
      const balancesEvm = walletsEvm?.map(async (wallet) => {
        const response = await getBalanceEthereum(wallet);
        balances.push(response);

        return response;
      });

      balance = balancesEvm;

      if (balances.length > 0) {
        balances?.map(async (b) => {
          /**
           * ensure that there is sufficient networkBalance(balances[0]) and token balance (b?.balance) to cover for the transaction cost and that the token addresses are a match
           */
          if (
            balances[0] > sF * (serviceFee + networkFee) &&
            b?.balance > tValue &&
            b?.address === txData?.tToken?.address
          ) {
            enabledWallets.push(b);
          }
        });
      }
      //========={if we have sufficient balance we could assign the first wallet that meets the condition as the selected wallet for the transaction, else we will have to use our reserve wallet to pay the user}======================

      if (enabledWallets.length > 0) {
        selectedWallet = enabledWallets[0];
        // return selectedWallet;
      } else {
        selectedWallet = activeReserveWallet;
        // return selectedWallet;
      }

      if (selectedWallet) {
        const response = await sendEthereum(txData, selectedWallet);
        console.log({ responseData: response });

        if (response?.amount) {
          const userData = {
            id: txData?._id,
            hashOut: response?.hashOut,
            status: 'Completed',
            percentageProgress: 5,
          };
          //update status as paid
          const result = await updateBlockChainOutTransactionByIdInternal(
            userData
          );
          console.log({ result: result });
        }
      }
    } else {
      const balancesEvm = walletsEvm?.map(async (wallet) => {
        const response = await getBalanceEthereum(wallet);
        balances.push(response);

        return response;
      });

      balance = balancesEvm;
    }

    if (balances.length > 0) {
      balances?.map(async (b) => {
        /**
         * ensure that there is sufficient token balance to cover for the transaction cost and that the token addresses are a match
         */
        if (
          b?.balance > sF * totalAmount &&
          b?.address === txData?.tToken?.address
        ) {
          enabledWallets.push(b);
        }
      });
    }
    //========={if we have sufficient balance we could assign the first wallet that meets the condition as the selected wallet for the transaction, else we will have to use our reserve wallet to pay the user}======================

    if (enabledWallets.length > 0) {
      selectedWallet = enabledWallets[0];
      // return selectedWallet;
    } else {
      selectedWallet = activeReserveWallet;
      // return activeReserveWallet;
    }

    if (selectedWallet) {
      const response = await sendEthereum(txData, selectedWallet);
      console.log({ responseData: response });

      if (response?.amount) {
        const userData = {
          id: txData?._id,
          hashOut: response?.hashOut,
          status: 'Completed',
          percentageProgress: 5,
        };
        //update status as paid
        const result = await updateBlockChainOutTransactionByIdInternal(
          userData
        );
        console.log({ result: result });
      }
    }
  }
  //========={The transaction has to be  on "Tron" network and the transaction status "Received"}======================

  if (txData?.tToken?.chain === 'Tron' && txData?.status === 'Received') {
    activeReserveWallet = reserveWallet?.tron;
    if (txData?.tToken.symbol === 'trx') {
      const balancesTron = walletsTron?.map(async (wallet) => {
        const response = await getBalanceTron(wallet);
        balances.push(response);

        return response;
      });

      balance = balancesTron;

      if (balances.length > 0) {
        balances?.map(async (b) => {
          /**
           * ensure that there is sufficient networkBalance(balances[0]) and token balance (b?.balance) to cover for the transaction cost and that the token addresses are a match
           */
          if (
            balances[0] > sF * (serviceFee + networkFee) &&
            b?.balance > tValue &&
            b?.address === txData?.tToken?.address
          ) {
            enabledWallets.push(b);
          }
        });
      }
      //========={if we have sufficient balance we could assign the first wallet that meets the condition as the selected wallet for the transaction, else we will have to use our reserve wallet to pay the user}======================
      if (enabledWallets.length > 0) {
        selectedWallet = enabledWallets[0];
        // return selectedWallet;
      } else {
        selectedWallet = activeReserveWallet;
        // return activeReserveWallet;
      }

      if (selectedWallet) {
        const response = await sendTron(txData, selectedWallet);
        console.log({ responseData: response });

        if (response?.amount) {
          const userData = {
            id: txData?._id,
            hashOut: response?.hashOut,
            status: 'Completed',
            percentageProgress: 5,
          };
          //update status as paid
          const result = await updateBlockChainOutTransactionByIdInternal(
            userData
          );
          console.log({ result: result });
        }
      }
    } else {
      const balancesTron = walletsTron?.map(async (wallet) => {
        const response = await getBalanceTron(wallet);
        balances.push(response);

        return response;
      });

      balance = balancesTron;
    }

    if (balances.length > 0) {
      balances?.map(async (b) => {
        /**
         * ensure that there is sufficient token balance to cover for the transaction cost and that the token addresses are a match
         */
        if (
          b?.balance > sF * totalAmount &&
          b?.address === txData?.tToken?.address
        ) {
          enabledWallets.push(b);
        }
      });
    }

    if (enabledWallets.length > 0) {
      selectedWallet = enabledWallets[0];
      // return selectedWallet;
    } else {
      selectedWallet = activeReserveWallet;
      // return activeReserveWallet;
    }

    if (selectedWallet) {
      const response = await sendTron(txData, selectedWallet);
      console.log({ responseData: response });

      if (response?.amount) {
        const userData = {
          id: txData?._id,
          hashOut: response?.hashOut,
          status: 'Completed',
          percentageProgress: 5,
        };
        //update status as paid
        const result = await updateBlockChainOutTransactionByIdInternal(
          userData
        );
        console.log({ result: result });
      }
    }
  }
}

//======================={send full}=========================================
//successfull
async function sendBitcoin(txData, wallet, isMasterWallet) {
  let response;
  console.log('BTC sending in progress');
  const walletAddress = wallet?.address;
  // const privateKey = wallet?.privateKey;

  const hdPrivateKeyEncrypted = wallet?.privateKey;
  // Decrypt the private key for use in Tron transactions
  const decryptedPrivateKey = decryptPrivateKey(hdPrivateKeyEncrypted);
  const privateKey = decryptedPrivateKey;
  console.log({ privateKey: privateKey });

  const amount = txData?.tValue;
  const receiver = txData?.userAddress;

  const amountToSend = Number(amount);
  // const amount = '0.00015';
  const recieverAddress = receiver;
  const sourceAddress = wallet?.address;
  const satoshiToSendRaw = amountToSend * 1e8;
  const satoshiToSend = Number(satoshiToSendRaw.toFixed(0));

  let fee = 0;
  let inputCount = 0;
  let outputCount = 2;

  // const recommendedFee = await axios.get(
  //   'https://bitcoinfees.earn.com/api/v1/fees/recommended'
  // );

  // console.log({recommendedFee: recommendedFee})

  const transaction = new bitcore.Transaction();
  let totalAmountAvailable = 0;

  let inputs = [];
  let resp;
  if (network === testnet) {
    resp = await axios({
      method: 'GET',
      url: `https://blockstream.info/testnet/api/address/${sourceAddress}/utxo`,
    });
  } else {
    resp = await axios({
      method: 'GET',
      url: `https://blockstream.info/api/address/${sourceAddress}/utxo`,
    });
  }

  const utxos = resp.data;

  // console.log({utxos: utxos})

  for (const utxo of utxos) {
    let input = {};
    input.satoshis = utxo.value;
    input.script = bitcore.Script.buildPublicKeyHashOut(sourceAddress).toHex();
    input.address = sourceAddress;
    input.txId = utxo.txid;
    input.outputIndex = utxo.vout;
    totalAmountAvailable += utxo.value;
    inputCount += 1;
    inputs.push(input);
  }

  /**
   * In a bitcoin transaction, the inputs contribute 180 bytes each to the transaction,
   * while the output contributes 34 bytes each to the transaction. Then there is an extra 10 bytes you add or subtract
   * from the transaction as well.
   * */

  const transactionSize = inputCount * 180 + outputCount * 34 + 10 - inputCount;
  // fee = transactionSize * recommendedFee.data.hourFee / 3; // satoshi per byte
  fee = transactionSize * 1; // 1 sat/byte is fine for testnet but update for mainnet
  if (network === testnet) {
    fee = transactionSize * 1; // 1 sat/byte is fine for testnet
  }
  if (totalAmountAvailable - satoshiToSend - fee < 0) {
    throw new Error('Balance is too low for this transaction');
  }
  //Set transaction input
  transaction.from(inputs);

  // set the recieving address and the amount to send
  transaction.to(recieverAddress, satoshiToSend);

  // Set change address - Address to receive the left over funds after transfer
  transaction.change(sourceAddress);

  //manually set transaction fees: 20 satoshis per byte
  transaction.fee(Math.round(fee));

  // Sign transaction with your private key
  transaction.sign(privateKey);

  // serialize Transactions
  const serializedTransaction = transaction.serialize();

  // Send transaction
  let result;

  if (network === testnet) {
    result = await axios({
      method: 'POST',
      url: `https://blockstream.info/testnet/api/tx`,
      data: serializedTransaction,
    });
  } else {
    result = await axios({
      method: 'POST',
      url: `https://blockstream.info/api/tx`,
      data: serializedTransaction,
    });
  }
  console.log({ result: result });

  if (result.data) {
    response = {
      hashOut: result.data,
      //======={not necessary}=============
      sender: walletAddress,
      sucess: true,
      receiver,
      amount: amount,
      action: 'send',
    };
  }

  if (response) {
    if (isMasterWallet) {
      //========================={update wallet balances after transaction}=====================
      await updateHDWalletByIdBitcoin('', isMasterWallet);
      console.log({ response: response });
      return response;
    } else {
      await updateHDWalletByIdBitcoin(wallet?._id, isMasterWallet);
      console.log({ response: response });
      return response;
    }
  }
}
//successfull
async function sendEthereum(txData, wallet, isMasterWallet) {
  let response;

  const fromTokenAddress = txData?.tToken?.address;
  const fromTokenAddressDecimals = txData?.tToken?.decimals;

  console.log({ fromTokenAddress: fromTokenAddress });

  const walletAddress = wallet?.address;

  const hdPrivateKeyEncrypted = wallet?.privateKey;
  // Decrypt the private key for use in Tron transactions
  const decryptedPrivateKey = decryptPrivateKey(hdPrivateKeyEncrypted);
  const privateKey = decryptedPrivateKey;
  console.log({ privateKey: privateKey });

  const amount = txData?.tValue;
  const receiver = txData?.userAddress;
  // const chainId = '1'; // Ethereum mainnet
  // const chainId = '5'; // Goerli testnet

  const networkRPCEthereum = 'https://cloudflare-eth.com';
  const networkRPCGoerli = 'https://rpc.ankr.com/eth_goerli';
  const networkRPC = networkRPCGoerli;
  // const networkRPC = networkRPCEthereum;

  //==========={get Privatekey}=========================================================

  const provider = new ethers.providers.JsonRpcProvider(networkRPC); // default is ethereum homestead
  const signer = new ethers.Wallet(privateKey, provider);

  let type = '';

  if (fromTokenAddress == '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
    type = 'Native';
    const tx = {
      to: receiver,
      value: ethers.utils.parseEther(amount.toString()).toString(),
    };

    const rawBalance = await provider.getBalance(walletAddress);
    const balance = ethers.utils.formatEther(rawBalance.toString()).toString();
    console.log({ balance: balance });

    console.log({ tx: tx });
    //To get gas estimate
    // let estimatedGasRaw = signer.estimateGas(tx); // to setimate gas
    // const estimatedGas = estimatedGasRaw.toString();
    // console.log(estimatedGas);

    //================={Consider}=====================================
    const transaction = await signer.sendTransaction(tx);
    let txResponse = await transaction.wait();
    console.log({ txResponse: txResponse });
    if (txResponse?.transactionHash) {
      response = {
        hashOut: txResponse?.transactionHash,
        //======={not necessary}=============
        sender: walletAddress,
        success: true,
        amount: amount,
        balance: balance,
        type: type,
        action: 'send',
        message: 'Successfull',
      };
      console.log(response);
    }
  } else {
    const contract = new ethers.Contract(fromTokenAddress, ERC20Abi, signer);
    type = 'Token';

    try {
      // const tx = await contract.transfer(
      //   receiver,
      //   ethers.utils
      //     .parseUnits(amount.toString(), fromTokenAddressDecimals.toString())
      //     .toString()
      // );
      const roundedAmount = Math.round(Number(amount));
      const tx = await contract.transfer(
        receiver,
        ethers.utils
          .parseUnits(
            roundedAmount.toString(),
            fromTokenAddressDecimals.toString()
          )
          .toString()
      );
      const transactionStatus = await tx.wait();

      console.log({ transactionStatus: transactionStatus });

      const rawBalance = await contract.balanceOf(walletAddress);
      const balance = ethers.utils
        .formatEther(rawBalance.toString())
        .toString();
      //const balance = ethers.utils.formatUnits(rawBalance, decimals);

      if (transactionStatus) {
        response = {
          // hashOut: tx?.hash,
          hashOut: transactionStatus?.transactionHash,
          //======={not necessary}=============
          sender: walletAddress,
          sucess: true,
          receiver,
          amount: amount,
          // balance: balance,
          type: type,
          action: 'send',
        };
        console.log(response);
      }
    } catch (error) {
      console.log({ 'transaction error': error });
    }
  }

  if (response) {
    if (isMasterWallet) {
      //========================={update wallet balances after transaction}=====================
      await updateHDWalletByIdEvm('', isMasterWallet);
      console.log({ response: response });
      return response;
    } else {
      await updateHDWalletByIdEvm(wallet?._id, isMasterWallet);
      console.log({ response: response });
      return response;
    }
  }
}
//successfull
async function sendTron1(txData, selectedWallet, isMasterWallet) {
  let response;

  console.log({ txData: txData });
  console.log({ selectedWallet: selectedWallet });

  const token = txData?.tToken;

  const wallet = selectedWallet;

  const sender = wallet?.address; // String type // owner_address
  const receiver = txData?.userAddress;
  const amount = Number(txData?.tValue); //Number type//// specify the amount of token to send

  const hdPrivateKeyEncrypted = wallet?.privateKey;
  // Decrypt the private key for use in Tron transactions
  const decryptedPrivateKey = decryptPrivateKey(hdPrivateKeyEncrypted);
  const privateKeyOriginal = decryptedPrivateKey; //'0x0c4d8bb9500a74f3eaeb395f77e9e19a683951c410a1c441e503d95ca2b0577d'
  console.log({ privateKeyOriginal: privateKeyOriginal }); // Output: "abcdef"
  const privateKey = privateKeyOriginal.slice(2); // removing "OX" from private key// '0c4d8bb9500a74f3eaeb395f77e9e19a683951c410a1c441e503d95ca2b0577d'
  console.log({ privateKey: privateKey }); // Output: "abcdef"

  const tronWeb = new TronWeb({
    fullHost: 'https://nile.trongrid.io', // Replace with your Tron full node endpoint
    solidityNode: 'https://nile.trongrid.io', // Replace with your Tron solidity node endpoint
    privateKey: privateKey,
  });

  if (token?.symbol === 'trx') {
    const amountInSUN = tronWeb.toSun(Number(amount)); // convert to TRX

    const unsignedTxn = await tronWeb.transactionBuilder.sendTrx(
      receiver,
      Number(amountInSUN),
      sender
    );

    console.log({ unsignedTxn: unsignedTxn });

    // const signedTxn = await tronWeb.trx.sign(unsignedTxn, privateKey);
    const signedTxn = await tronWeb.trx.sign(unsignedTxn);

    console.log({ signedTxn: signedTxn });

    const receipt = await tronWeb.trx.sendRawTransaction(signedTxn);

    if (receipt) {
      console.log({ receipt: receipt });

      const result = receipt?.result;

      if (result === true) {
        console.log({ status: 'Successful' });
        response = {
          hashOut: unsignedTxn?.txID, //'9e5d48d4cbfe4e661c333cea627aead631a32dae4f8ab157c46530a44004bf24'
          // hashOut2: receipt?.txid,// also correct

          //======={not necessary}=============
          sender: sender,
          success: true,
          amount: amount,
          action: 'send',
          message: 'Successfull',
        };
        console.log(response);
      } else {
        console.log({ status: 'UnSuccessful' }); //result === 'false'
      }
    }

    console.log({ responseBeforIn: response });
    if (response?.amount) {
      console.log({ responseBeforeIn: response });

      if (isMasterWallet) {
        //========================={update wallet balances after transaction}=====================
        await updateHDWalletByIdTron('', isMasterWallet);
        console.log({ response: response });
        return response;
      } else {
        await updateHDWalletByIdTron(wallet?._id, isMasterWallet);
        console.log({ response: response });
        return response;
      }
    }
  } else {
    // let abi = token?.abi;
    if (token) {
      let transaction;
      let tokenContract = await tronWeb.trx.getContract(token?.address); // retreive contract
      const abi = tokenContract?.abi?.entrys; // assign abi
      let address = token?.address;
      let contract = await tronWeb.contract(abi, address);
      // let contract = tokenContract;

      //
      // console.log(contract);

      const toAddress = receiver;
      const decimals = token?.decimals;
      const roundedAmount = Math.round(Number(amount));
      const convertedAmount = (
        Number(`1e${decimals}`) * Number(roundedAmount)
      ).toString();

      // const convertedAmount = (
      //   Number(`1e${decimals}`) * Number(amount)
      // ).toString();

      console.log({ convertedAmount: convertedAmount });

      try {
        transaction = await contract.methods
          .transfer(toAddress, convertedAmount)
          .send();

        console.log('TransactionHash:', transaction); // transaction hash
      } catch (error) {
        console.error('Error sending USDT:', error);
      }

      if (transaction) {
        setTimeout(async () => {
          const txid = transaction;
          //==========={UnconfirmedTransactionInfo}=================================
          try {
            const unconfirmedTransactionInfo =
              await tronWeb.trx.getUnconfirmedTransactionInfo(txid);
            if (unconfirmedTransactionInfo) {
              console.log(
                'UnconfirmedTransactionInfo Result:',
                unconfirmedTransactionInfo
              );
              const result = unconfirmedTransactionInfo?.receipt?.result;
              console.log({ result: result });

              if (result === 'SUCCESS') {
                console.log({ status: 'Successful' });
                response = {
                  hashOut: unconfirmedTransactionInfo?.id, //'09fbf66be18c384ad6c7521e1494a83dd42797dbfb546746008ec3d4f5ccfac6'
                  //======={not necessary}=============
                  sender: sender,
                  success: true,
                  amount: amount,
                  action: 'transfer',
                  message: 'Successfull',
                };
                console.log(response);
              } else {
                console.log({ status: 'UnSuccessful' }); //result === 'REVERT'
              }
            }
          } catch (error) {
            console.error('UnconfirmedTransactionInfo Error:', error);
          }
        }, 10000); // 10 seconds delay
      }
    }

    console.log({ responseBeforIn: response });
    if (response?.amount) {
      console.log({ responseBeforeIn: response });

      if (isMasterWallet) {
        //========================={update wallet balances after transaction}=====================
        await updateHDWalletByIdTron('', isMasterWallet);
        console.log({ response: response });
        return response;
      } else {
        await updateHDWalletByIdTron(wallet?._id, isMasterWallet);
        console.log({ response: response });
        return response;
      }
    }
  }
}

async function sendTron2(txData, selectedWallet, isMasterWallet) {
  let response;
  let updatedStatus = false;

  const token = txData?.tToken;

  const wallet = selectedWallet;

  const sender = wallet?.address; // String type // owner_address
  const receiver = txData?.userAddress;
  const amount = Number(txData?.tValue); //Number type//// specify the amount of token to send

  const hdPrivateKeyEncrypted = wallet?.privateKey;
  // Decrypt the private key for use in Tron transactions
  const decryptedPrivateKey = decryptPrivateKey(hdPrivateKeyEncrypted);
  const privateKeyOriginal = decryptedPrivateKey; //'0x0c4d8bb9500a74f3eaeb395f77e9e19a683951c410a1c441e503d95ca2b0577d'
  console.log({ privateKeyOriginal: privateKeyOriginal }); // Output: "abcdef"
  const privateKey = privateKeyOriginal.slice(2); // removing "OX" from private key// '0c4d8bb9500a74f3eaeb395f77e9e19a683951c410a1c441e503d95ca2b0577d'
  console.log({ privateKey: privateKey }); // Output: "abcdef"

  const tronWeb = new TronWeb({
    fullHost: 'https://nile.trongrid.io', // Replace with your Tron full node endpoint
    solidityNode: 'https://nile.trongrid.io', // Replace with your Tron solidity node endpoint
    privateKey: privateKey,
  });

  if (token?.symbol === 'trx') {
    const amountInSUN = tronWeb.toSun(Number(amount)); // convert to TRX

    const unsignedTxn = await tronWeb.transactionBuilder.sendTrx(
      receiver,
      Number(amountInSUN),
      sender
    );

    console.log({ unsignedTxn: unsignedTxn });

    // const signedTxn = await tronWeb.trx.sign(unsignedTxn, privateKey);
    const signedTxn = await tronWeb.trx.sign(unsignedTxn);

    console.log({ signedTxn: signedTxn });

    const receipt = await tronWeb.trx.sendRawTransaction(signedTxn);

    if (receipt.result === true) {
      console.log({ status: 'Successful' });
      response = {
        hashOut: unsignedTxn?.txID, //'9e5d48d4cbfe4e661c333cea627aead631a32dae4f8ab157c46530a44004bf24'
        // hashOut2: receipt?.txid,// also correct
        sender: sender,
        success: true,
        amount: amount,
        action: 'send',
        message: 'Successfull',
      };
      console.log(response);
      updatedStatus = true;
    }
  } else {
    let tokenContract = await tronWeb.trx.getContract(token?.address); // retreive contract
    const abi = tokenContract?.abi?.entrys; // assign abi
    let address = token?.address;
    let contract = await tronWeb.contract(abi, address);
    // let contract = tokenContract;

    //
    // console.log(contract);

    const toAddress = receiver;
    const decimals = token?.decimals;
    const roundedAmount = Math.round(Number(amount));
    const convertedAmount = (
      Number(`1e${decimals}`) * Number(roundedAmount)
    ).toString();

    // const convertedAmount = (
    //   Number(`1e${decimals}`) * Number(amount)
    // ).toString();

    console.log({ convertedAmount: convertedAmount });

    try {
      const transaction = await contract.methods
        .transfer(toAddress, convertedAmount)
        .send();

      if (transaction) {
        setTimeout(async () => {
          const txid = transaction;
          //==========={UnconfirmedTransactionInfo}=================================
          try {
            const unconfirmedTransactionInfo =
              await tronWeb.trx.getUnconfirmedTransactionInfo(txid);
            if (unconfirmedTransactionInfo) {
              console.log(
                'UnconfirmedTransactionInfo Result:',
                unconfirmedTransactionInfo
              );
              const result = unconfirmedTransactionInfo?.receipt?.result;
              console.log({ result: result });

              if (result === 'SUCCESS') {
                console.log({ status: 'Successful' });
                response = {
                  hashOut: unconfirmedTransactionInfo?.id, //'09fbf66be18c384ad6c7521e1494a83dd42797dbfb546746008ec3d4f5ccfac6'
                  //======={not necessary}=============
                  sender: sender,
                  success: true,
                  amount: amount,
                  action: 'transfer',
                  message: 'Successfull',
                };
                console.log(response);
                updatedStatus = true;
              } else {
                console.log({ status: 'UnSuccessful' }); //result === 'REVERT'
              }
            }
          } catch (error) {
            console.error('UnconfirmedTransactionInfo Error:', error);
          }

          if (updatedStatus == true) {
            if (isMasterWallet) {
              //========================={update wallet balances after transaction}=====================
              await updateHDWalletByIdEvm('', isMasterWallet);
              console.log({ response: response });
              return response;
            } else {
              await updateHDWalletByIdEvm(wallet?._id, isMasterWallet);
              console.log({ response: response });
              return response;
            }
          }
        }, 10000); // 10 seconds delay
      }

      console.log('TransactionHash:', transaction); // transaction hash
    } catch (error) {
      console.log({ 'transaction error': error });
    }
  }

  // if (updatedStatus == true) {
  //   if (isMasterWallet) {
  //     //========================={update wallet balances after transaction}=====================
  //     await updateHDWalletByIdEvm('', isMasterWallet);
  //     console.log({ response: response });
  //     return response;
  //   } else {
  //     await updateHDWalletByIdEvm(wallet?._id, isMasterWallet);
  //     console.log({ response: response });
  //     return response;
  //   }
  // }
}

async function sendTronOriginal(txData, selectedWallet, isMasterWallet) {
  let response;
  let updatedStatus = false;

  const token = txData?.tToken;

  const wallet = selectedWallet;

  const sender = wallet?.address; // String type // owner_address
  const receiver = txData?.userAddress;
  const amount = Number(txData?.tValue); //Number type//// specify the amount of token to send

  const hdPrivateKeyEncrypted = wallet?.privateKey;
  // Decrypt the private key for use in Tron transactions
  const decryptedPrivateKey = decryptPrivateKey(hdPrivateKeyEncrypted);
  const privateKeyOriginal = decryptedPrivateKey; //'0x0c4d8bb9500a74f3eaeb395f77e9e19a683951c410a1c441e503d95ca2b0577d'
  console.log({ privateKeyOriginal: privateKeyOriginal }); // Output: "abcdef"
  const privateKey = privateKeyOriginal.slice(2); // removing "OX" from private key// '0c4d8bb9500a74f3eaeb395f77e9e19a683951c410a1c441e503d95ca2b0577d'
  console.log({ privateKey: privateKey }); // Output: "abcdef"

  const tronWeb = new TronWeb({
    fullHost: 'https://nile.trongrid.io', // Replace with your Tron full node endpoint
    solidityNode: 'https://nile.trongrid.io', // Replace with your Tron solidity node endpoint
    privateKey: privateKey,
  });

  if (token?.symbol === 'trx') {
    const amountInSUN = tronWeb.toSun(Number(amount)); // convert to TRX

    const unsignedTxn = await tronWeb.transactionBuilder.sendTrx(
      receiver,
      Number(amountInSUN),
      sender
    );

    console.log({ unsignedTxn: unsignedTxn });

    // const signedTxn = await tronWeb.trx.sign(unsignedTxn, privateKey);
    const signedTxn = await tronWeb.trx.sign(unsignedTxn);

    console.log({ signedTxn: signedTxn });

    const receipt = await tronWeb.trx.sendRawTransaction(signedTxn);

    if (receipt.result === true) {
      console.log({ status: 'Successful' });
      response = {
        hashOut: unsignedTxn?.txID, //'9e5d48d4cbfe4e661c333cea627aead631a32dae4f8ab157c46530a44004bf24'
        // hashOut2: receipt?.txid,// also correct
        sender: sender,
        success: true,
        amount: amount,
        action: 'send',
        message: 'Successfull',
      };
      console.log(response);
      updatedStatus = true;
    }

    if (updatedStatus == true) {
      if (isMasterWallet) {
        //========================={update wallet balances after transaction}=====================
        await updateHDWalletByIdEvm('', isMasterWallet);
        console.log({ response: response });
        return response;
      } else {
        await updateHDWalletByIdEvm(wallet?._id, isMasterWallet);
        console.log({ response: response });
        return response;
      }
    }
  } else {
    let tokenContract = await tronWeb.trx.getContract(token?.address); // retreive contract
    const abi = tokenContract?.abi?.entrys; // assign abi
    let address = token?.address;
    let contract = await tronWeb.contract(abi, address);
    // let contract = tokenContract;

    //
    // console.log(contract);

    const toAddress = receiver;
    const decimals = token?.decimals;
    const roundedAmount = Math.round(Number(amount));
    const convertedAmount = (
      Number(`1e${decimals}`) * Number(roundedAmount)
    ).toString();

    // const convertedAmount = (
    //   Number(`1e${decimals}`) * Number(amount)
    // ).toString();

    console.log({ convertedAmount: convertedAmount });

    try {
      const transaction = await contract.methods
        .transfer(toAddress, convertedAmount)
        .send();
      console.log('TransactionHash:', transaction); // transaction hash
      if (transaction) {
        const txid = transaction;
        //==========={UnconfirmedTransactionInfo}=================================
        try {
          const unconfirmedTransactionInfo =
            await tronWeb.trx.getUnconfirmedTransactionInfo(txid);
          if (unconfirmedTransactionInfo) {
            console.log(
              'UnconfirmedTransactionInfo Result:',
              unconfirmedTransactionInfo
            );
            const result = unconfirmedTransactionInfo?.receipt?.result;
            console.log({ result: result });

            if (result === 'SUCCESS') {
              console.log({ status: 'Successful' });
              response = {
                hashOut: unconfirmedTransactionInfo?.id, //'09fbf66be18c384ad6c7521e1494a83dd42797dbfb546746008ec3d4f5ccfac6'
                //======={not necessary}=============
                sender: sender,
                success: true,
                amount: amount,
                action: 'transfer',
                message: 'Successfull',
              };
              console.log(response);
              updatedStatus = true;
            } else {
              console.log({ status: 'UnSuccessful' }); //result === 'REVERT'
            }
          }
        } catch (error) {
          console.error('UnconfirmedTransactionInfo Error:', error);
        }

        if (updatedStatus == true) {
          if (isMasterWallet) {
            //========================={update wallet balances after transaction}=====================
            await updateHDWalletByIdEvm('', isMasterWallet);
            console.log({ response: response });
            return response;
          } else {
            await updateHDWalletByIdEvm(wallet?._id, isMasterWallet);
            console.log({ response: response });
            return response;
          }
        }
      }
    } catch (error) {
      console.log({ 'transaction error': error });
    }
  }
}

async function sendTron(txData, selectedWallet, isMasterWallet) {
  let response;
  let updatedStatus = false;

  const token = txData?.tToken;

  const wallet = selectedWallet;

  const sender = wallet?.address; // String type // owner_address
  const receiver = txData?.userAddress;
  const amount = Number(txData?.tValue); //Number type//// specify the amount of token to send

  const hdPrivateKeyEncrypted = wallet?.privateKey;
  // Decrypt the private key for use in Tron transactions
  const decryptedPrivateKey = decryptPrivateKey(hdPrivateKeyEncrypted);
  const privateKeyOriginal = decryptedPrivateKey; //'0x0c4d8bb9500a74f3eaeb395f77e9e19a683951c410a1c441e503d95ca2b0577d'
  console.log({ privateKeyOriginal: privateKeyOriginal }); // Output: "abcdef"
  const privateKey = privateKeyOriginal.slice(2); // removing "OX" from private key// '0c4d8bb9500a74f3eaeb395f77e9e19a683951c410a1c441e503d95ca2b0577d'
  console.log({ privateKey: privateKey }); // Output: "abcdef"

  const tronWeb = new TronWeb({
    fullHost: 'https://nile.trongrid.io', // Replace with your Tron full node endpoint
    solidityNode: 'https://nile.trongrid.io', // Replace with your Tron solidity node endpoint
    privateKey: privateKey,
  });

  if (token?.symbol === 'trx') {
    const amountInSUN = tronWeb.toSun(Number(amount)); // convert to TRX

    const unsignedTxn = await tronWeb.transactionBuilder.sendTrx(
      receiver,
      Number(amountInSUN),
      sender
    );

    console.log({ unsignedTxn: unsignedTxn });

    // const signedTxn = await tronWeb.trx.sign(unsignedTxn, privateKey);
    const signedTxn = await tronWeb.trx.sign(unsignedTxn);

    console.log({ signedTxn: signedTxn });

    const receipt = await tronWeb.trx.sendRawTransaction(signedTxn);

    if (receipt.result === true) {
      console.log({ status: 'Successful' });
      response = {
        hashOut: unsignedTxn?.txID, //'9e5d48d4cbfe4e661c333cea627aead631a32dae4f8ab157c46530a44004bf24'
        // hashOut2: receipt?.txid,// also correct
        sender: sender,
        success: true,
        amount: amount,
        action: 'send',
        message: 'Successfull',
      };
      console.log(response);
      updatedStatus = true;
    }

    if (updatedStatus == true) {
      if (isMasterWallet) {
        //========================={update wallet balances after transaction}=====================
        await updateHDWalletByIdEvm('', isMasterWallet);
        console.log({ response: response });
        return response;
      } else {
        await updateHDWalletByIdEvm(wallet?._id, isMasterWallet);
        console.log({ response: response });
        return response;
      }
    }
  } else {
    let tokenContract = await tronWeb.trx.getContract(token?.address); // retreive contract
    const abi = tokenContract?.abi?.entrys; // assign abi
    let address = token?.address;
    let contract = await tronWeb.contract(abi, address);
    // let contract = tokenContract;

    //
    // console.log(contract);

    const toAddress = receiver;
    const decimals = token?.decimals;
    const roundedAmount = Math.round(Number(amount));
    const convertedAmount = (
      Number(`1e${decimals}`) * Number(roundedAmount)
    ).toString();

    // const convertedAmount = (
    //   Number(`1e${decimals}`) * Number(amount)
    // ).toString();

    console.log({ convertedAmount: convertedAmount });

    try {
      const transaction = await contract.methods
        .transfer(toAddress, convertedAmount)
        .send();
      console.log('TransactionHash:', transaction); // transaction hash
      //==========={UnconfirmedTransactionInfo}=================================
      if (transaction) {
        console.log({ status: 'Successful' });
        response = {
          hashOut: transaction, //'09fbf66be18c384ad6c7521e1494a83dd42797dbfb546746008ec3d4f5ccfac6'
          //======={not necessary}=============
          sender: sender,
          success: true,
          amount: amount,
          action: 'transfer',
          message: 'Successfull',
        };
        console.log(response);
        updatedStatus = true;
        if (updatedStatus == true) {
          if (isMasterWallet) {
            //========================={update wallet balances after transaction}=====================
            await updateHDWalletByIdEvm('', isMasterWallet);
            console.log({ response: response });
            return response;
          } else {
            await updateHDWalletByIdEvm(wallet?._id, isMasterWallet);
            console.log({ response: response });
            return response;
          }
        }
      }
    } catch (error) {
      console.log({ 'transaction error': error });
    }
  }
}

async function updateBlockChainOutTransactionByIdInternal(userData) {
  const transaction = await Transaction.findById(userData?.id);

  const service = transaction?.service;
  const subService = transaction?.subService;
  const status = userData?.status;
  const hashOut = userData?.hashOut;
  const progress = userData?.percentageProgress;

  let timeLeft = new Date(transaction?.timeLeft).getTime();
  let currentTime = new Date(Date.now()).getTime();

  let updatedTimeStatus;

  // let updatedTimeLeft;
  //==={Is Active}==================
  if (timeLeft > currentTime) {
    updatedTimeStatus = 'Active';
  }
  //==={Is Expired}==================
  if (timeLeft < currentTime) {
    updatedTimeStatus = 'Expired';
  }

  const blockchainUrlBitcoinMainnet = 'https://blockstream.info/tx';
  const blockchainUrlBitcoinTest = 'https://blockstream.info/testnet/tx';
  const blockchainUrlBitcoinEndpoint = blockchainUrlBitcoinTest;
  const blockchainUrlBitcoin = `${blockchainUrlBitcoinEndpoint}/${hashOut}`;

  const tronblockchainUrlMainnet = 'https://tronscan.org/#/transaction'; // goerli test net
  const tronblockchainUrlNile = 'https://nile.tronscan.org/#/transaction'; // goerli test net
  const tronblockchainUrlEndpoint = tronblockchainUrlNile;
  const blockchainUrlTron = `${tronblockchainUrlEndpoint}/${hashOut}`;

  const blockchainUrlEthereumMainnet = 'https://etherscan.io/tx'; // goerli test net
  const blockchainUrlEthereumGoerli = 'https://goerli.etherscan.io/tx'; // goerli test net
  const blockchainUrlEthereumEndpoint = blockchainUrlEthereumGoerli;
  const blockchainUrlEthereum = `${blockchainUrlEthereumEndpoint}/${hashOut}`;
  let blockchainUrl = '';
  let chain;

  if (hashOut) {
    if (service === 'buy' && subService === 'buyCash') {
      chain = transaction?.tToken?.chain ? transaction?.tToken?.chain : '';
      if (chain === 'Bitcoin') {
        blockchainUrl = blockchainUrlBitcoin;
      }
      if (chain === 'Tron') {
        blockchainUrl = blockchainUrlTron;
      }
      if (chain === 'Ethereum') {
        blockchainUrl = blockchainUrlEthereum;
      }
      //
    }

    if (service === 'buy' && subService === 'buyCard') {
      chain = transaction?.tToken?.chain ? transaction?.tToken?.chain : '';

      if (chain === 'Bitcoin') {
        blockchainUrl = blockchainUrlBitcoin;
      }
      if (chain === 'Tron') {
        blockchainUrl = blockchainUrlTron;
      }
      if (chain === 'Ethereum') {
        blockchainUrl = blockchainUrlEthereum;
      }
    }

    if (service === 'exchange' && subService === 'exchange') {
      chain = transaction?.tToken?.chain ? transaction?.tToken?.chain : '';
      if (chain === 'Bitcoin') {
        blockchainUrl = blockchainUrlBitcoin;
      }
      if (chain === 'Tron') {
        blockchainUrl = blockchainUrlTron;
      }
      if (chain === 'Ethereum') {
        blockchainUrl = blockchainUrlEthereum;
      }
    }
  }

  const blockchainUrlOut = blockchainUrl;
  // const percentageProgress = 5;
  // const status = 'Completed';

  let percentageProgress;
  if (status === 'Completed') {
    percentageProgress = 5;
  } else {
    percentageProgress = progress;
  }

  //blenderyAddressOut: benderyAddress,

  //blockchainUrl
  if (transaction) {
    transaction.status = status || transaction.status;
    transaction.hashOut = hashOut || transaction.hashOut;
    transaction.blockchainUrlOut =
      blockchainUrlOut || transaction.blockchainUrlOut;
    transaction.timeStatus = updatedTimeStatus || transaction?.timeStatus;
    transaction.percentageProgress =
      percentageProgress || transaction?.percentageProgress;
  }
  const response = await transaction.save();
  console.log({ buycashDataDBOut: response });

  if (response) {
    console.log({ response: response });

    return response;
  }
}

async function getHDWalletByIdBitcoin(hdWalletId, isMasterWallet) {
  const allWallets = await WalletsAdmin.findById(process.env.ADMIN_WALLETID);
  const walletsBitcoin = allWallets.bitcoin?.hdAccounts;
  const walletsBitcoinMaster = allWallets.bitcoin?.hdMasterAccounts;

  if (isMasterWallet) {
    const wallet = walletsBitcoinMaster;
    if (wallet?._id == hdWalletId) {
      console.log({ walletX: wallet });
    }
  } else {
    walletsBitcoin?.map(async (wallet) => {
      if (wallet?._id == hdWalletId) {
        console.log({ walletX: wallet });
      }
    });
  }
}

async function updateHDWalletByIdBitcoin(hdWalletId, isMasterWallet) {
  const allWallets = await WalletsAdmin.findById(process.env.ADMIN_WALLETID);
  const walletsBitcoin = allWallets.bitcoin?.hdAccounts;
  const walletsBitcoinMaster = allWallets.bitcoin?.hdMasterAccounts;

  if (isMasterWallet) {
    const wallet = walletsBitcoinMaster;
    if (wallet) {
      console.log({ walletX: wallet });
      const result = await getBalanceBitcoin(wallet);
      if (result) {
        console.log({ result: result });
        const balance = result?.balance;
        console.log({ balance: balance });
        wallet.btc.balance = balance;

        const response = await allWallets.save();
        if (response) {
          console.log('ok');
        }
      }
    }
  } else {
    walletsBitcoin?.map(async (wallet) => {
      if (wallet?._id == hdWalletId) {
        console.log({ walletX: wallet });
        const result = await getBalanceBitcoin(wallet);
        if (result) {
          console.log({ result: result });
          const balance = result?.balance;
          console.log({ balance: balance });
          wallet.btc.balance = balance;

          const response = await allWallets.save();
          if (response) {
            console.log('ok');
          }
        }
      }
    });
  }

  // const response = await allWallets.save();
  // if (response) {
  //   console.log({ response: response });
  // }
}

// updateHDWalletByIdBitcoin('', true); // Masterwallet
// updateHDWalletByIdBitcoin('6549a881f494abb0fb4fca78', false); // HDwallet


// const hdWalletIdBitcoin = '655a692fcdfebda8d069f389';
const hdWalletIdBitcoin1 = '6549a881f494abb0fb4fca78';
const hdWalletIdBitcoin2 = '6549e350c80d8f28bed0b2eb';

// getHDWalletByIdBitcoin(hdWalletIdBitcoin2, false)
// updateHDWalletByIdBitcoin(hdWalletIdBitcoin2, false)

async function getHDWalletByIdEvm(hdWalletId, isMasterWallet) {
  const allWallets = await WalletsAdmin.findById(process.env.ADMIN_WALLETID);
  const walletsEVM = allWallets.evm?.hdAccounts;
  const walletsEVMMaster = allWallets.evm?.hdMasterAccounts;

  if (isMasterWallet) {
    const wallet = walletsEVMMaster;
    if (wallet) {
      console.log({ walletX: wallet });
    }
  } else {
    walletsEVM?.map(async (wallet) => {
      if (wallet?._id == hdWalletId) {
        console.log({ walletX: wallet });
      }
    });
  }
}

// getHDWalletByIdEvm('', true);

async function updateHDWalletByIdEvm(hdWalletId, isMasterWallet) {
  const allWallets = await WalletsAdmin.findById(process.env.ADMIN_WALLETID);
  const walletsEVM = allWallets.evm?.hdAccounts;
  const walletsEVMMaster = allWallets.evm?.hdMasterAccounts;

  if (isMasterWallet) {
    const wallet = walletsEVMMaster;
    if (wallet) {
      console.log({ walletX: wallet });
      const result = await getBalanceEthereum(wallet);

      console.log({ result: result });

      let balanceEth;
      let balanceUsdt;

      if (result) {
        result?.map(async (b) => {
          const balance = b?.balance;
          const address = b?.address;

          if (address == '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
            balanceEth = balance ? Number(balance) : wallet.eth.balance;
          }

          if (address == usdtAddressEthereum) {
            balanceUsdt = balance ? Number(balance) : wallet.usdt.balance;
          }
        });
      }

      wallet.eth.balance = balanceEth;
      wallet.usdt.balance = balanceUsdt;

      const response = await allWallets.save();
      if (response) {
        console.log('ok');
      }
    }
  } else {
    walletsEVM?.map(async (wallet) => {
      if (wallet?._id == hdWalletId) {
        console.log({ walletX: wallet });
        const result = await getBalanceEthereum(wallet);

        console.log({ result: result });

        let balanceEth;
        let balanceUsdt;

        if (result) {
          result?.map(async (b) => {
            const balance = b?.balance;
            const address = b?.address;

            if (address == '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
              balanceEth = balance ? Number(balance) : wallet.eth.balance;
            }

            if (address == usdtAddressEthereum) {
              balanceUsdt = balance ? Number(balance) : wallet.usdt.balance;
            }
          });
        }

        wallet.eth.balance = balanceEth;
        wallet.usdt.balance = balanceUsdt;

        const response = await allWallets.save();
        if (response) {
          console.log('ok');
        }
      }
    });
  }
}

// updateHDWalletByIdEvm('', true); // Masterwallet
const hdWalletIdEvm = '65498afa1d8bb238bdab9a40';
// getHDWalletByIdEvm(hdWalletIdEvm, false)
// updateHDWalletByIdEvm(hdWalletIdEvm, false)

async function getHDWalletByIdTron(hdWalletId, isMasterWallet) {
  const allWallets = await WalletsAdmin.findById(process.env.ADMIN_WALLETID);
  const walletsTron = allWallets.tron?.hdAccounts;

  const walletsTronMaster = allWallets.tron?.hdMasterAccounts;

  if (isMasterWallet) {
    const wallet = walletsTronMaster;
    if (wallet) {
      console.log({ walletX: wallet });
    }
  } else {
    walletsTron?.map(async (wallet) => {
      if (wallet?._id == hdWalletId) {
        console.log({ walletX: wallet });
      }
    });
  }
}

async function updateHDWalletByIdTron(hdWalletId, isMasterWallet) {
  const allWallets = await WalletsAdmin.findById(process.env.ADMIN_WALLETID);
  const walletsTron = allWallets.tron?.hdAccounts;
  const walletsTronMaster = allWallets.tron?.hdMasterAccounts;

  if (isMasterWallet) {
    const wallet = walletsTronMaster; // single wallet and not an array
    if (wallet) {
      console.log({ walletX: wallet });
      const result = await getBalanceTron(wallet);

      console.log({ result: result });

      let balanceTron;
      let balanceUsdt;

      if (result) {
        result?.map(async (b) => {
          const balance = b?.balance;
          const address = b?.address;
          const symbol = b?.symbol;

          if (symbol == 'trx') {
            balanceTron = balance ? Number(balance) : wallet.trx.balance;
          }

          if (symbol == 'usdt') {
            balanceUsdt = balance ? Number(balance) : wallet.usdt.balance;
          }
        });
      }

      wallet.trx.balance = balanceTron;
      wallet.usdt.balance = balanceUsdt;

      const response = await allWallets.save();
      if (response) {
        console.log('ok');
      }
    }
  } else {
    walletsTron?.map(async (wallet) => {
      if (wallet?._id == hdWalletId) {
        console.log({ walletX: wallet });
        const result = await getBalanceTron(wallet);

        console.log({ result: result });

        let balanceTron;
        let balanceUsdt;

        if (result) {
          result?.map(async (b) => {
            const balance = b?.balance;
            const address = b?.address;
            const symbol = b?.symbol;

            if (symbol == 'trx') {
              balanceTron = balance ? Number(balance) : wallet.trx.balance;
            }

            if (symbol == 'usdt') {
              balanceUsdt = balance ? Number(balance) : wallet.usdt.balance;
            }
          });
        }

        wallet.trx.balance = balanceTron;
        wallet.usdt.balance = balanceUsdt;

        const response = await allWallets.save();
        if (response) {
          console.log('ok');
        }
      }
    });
  }
}

// updateHDWalletByIdTron('', true); // Masterwallet

const hdWalletIdTron = '6569dfa36fdb73792b836b35';
// getHDWalletByIdTron(hdWalletIdTron, false)
// updateHDWalletByIdTron(hdWalletIdTron, false)

async function getMasterWalletsInternal() {
  const allWallets = await WalletsAdmin.findById(process.env.ADMIN_WALLETID);
  const walletsBitcoinMaster = allWallets.bitcoin?.hdMasterAccounts;
  const walletsEVMMaster = allWallets.evm?.hdMasterAccounts;
  const walletsTronMaster = allWallets.tron?.hdMasterAccounts;

  // console.log({ walletsBitcoinMaster: walletsBitcoinMaster });
  // console.log({ walletsEVMMaster: walletsEVMMaster });
  // console.log({ walletsTronMaster: walletsTronMaster });

  const response = {
    walletsBitcoinMaster: {
      accountName: walletsBitcoinMaster?.accountName,
      address: walletsBitcoinMaster?.address,
      btc: walletsBitcoinMaster?.btc,
    },
    walletsEVMMaster: {
      accountName: walletsEVMMaster?.accountName,
      address: walletsEVMMaster?.address,
      eth: walletsEVMMaster?.eth,
      usdt: walletsEVMMaster?.usdt,
    },
    walletsTronMaster: {
      accountName: walletsTronMaster?.accountName,
      address: walletsTronMaster?.address,
      trx: walletsTronMaster?.trx,
      usdt: walletsTronMaster?.usdt,
    },
  };

  if (response) {
    console.log({ response: response });
  }
}

// getMasterWalletsInternal()

//===={for user transactions only}=========
const getMasterWallets = asyncHandler(async (req, res) => {
  const allWallets = await WalletsAdmin.findById(process.env.ADMIN_WALLETID);
  const walletsBitcoinMaster = allWallets.bitcoin?.hdMasterAccounts;
  const walletsEVMMaster = allWallets.evm?.hdMasterAccounts;
  const walletsTronMaster = allWallets.tron?.hdMasterAccounts;

  const response = {
    walletsBitcoinMaster: {
      btc: walletsBitcoinMaster?.btc,
    },
    walletsEVMMaster: {
      eth: walletsEVMMaster?.eth,
      usdt: walletsEVMMaster?.usdt,
    },
    walletsTronMaster: {
      trx: walletsTronMaster?.trx,
      usdt: walletsTronMaster?.usdt,
    },
  };

  if (response) {
    console.log({ response: response });
    res.status(200).json(response);
  }
});

//===={for Admin checks and balances only}=========
const getMasterWalletsAdmin = asyncHandler(async (req, res) => {
  const allWallets = await WalletsAdmin.findById(process.env.ADMIN_WALLETID);
  const walletsBitcoinMaster = allWallets.bitcoin?.hdMasterAccounts;
  const walletsEVMMaster = allWallets.evm?.hdMasterAccounts;
  const walletsTronMaster = allWallets.tron?.hdMasterAccounts;

  const response = {
    walletsBitcoinMaster: {
      accountName: walletsBitcoinMaster?.accountName,
      address: walletsBitcoinMaster?.address,
      btc: walletsBitcoinMaster?.btc,
    },
    walletsEVMMaster: {
      accountName: walletsEVMMaster?.accountName,
      address: walletsEVMMaster?.address,
      eth: walletsEVMMaster?.eth,
      usdt: walletsEVMMaster?.usdt,
    },
    walletsTronMaster: {
      accountName: walletsTronMaster?.accountName,
      address: walletsTronMaster?.address,
      trx: walletsTronMaster?.trx,
      usdt: walletsTronMaster?.usdt,
    },
  };

  if (response) {
    console.log({ response: response });
    res.status(200).json(response);
  }
});

async function getWalletBalancesByNetworkTest1(txData) {
  const allWallets = await WalletsAdmin.findById(process.env.ADMIN_WALLETID);
  // const txData = await Transaction.findById(id);

  // const reserveWallet = {}; // admin dedicated wallet
  //======{all admin reserve external wallet}====================

  const reserveWallet = {
    bitcoin: allWallets.bitcoin?.hdMasterAccounts,
    evm: allWallets.evm?.hdMasterAccounts,
    tron: allWallets.tron?.hdMasterAccounts,
  }; // admin dedicated wallet

  const walletsBitcoin = allWallets.bitcoin?.hdAccounts;
  const walletsEvm = allWallets.evm?.hdAccounts;
  const walletsTron = allWallets.tron?.hdAccounts;

  let balance; // not necessary anymore
  let balances = [];
  let enabledWallets = [];
  let selectedWallet = {};

  let sF = 1.05; //factor of safety 5% more due to nework flunctuations

  const tValue = Number(txData?.tValue);
  const serviceFee = (0.25 / 100) * Number(txData?.tValue); // 0.25%
  const networkFee = (0.75 / 100) * Number(txData?.tValue); // 0.25%

  const totalAmount = tValue + serviceFee + networkFee; // 1% above tValue

  //======================{PRODUCTION}===================================
  // const tValue = Number(txData?.tValue);
  // const serviceFee = Number(txData?.serviceFee);
  // const networkFee = Number(txData?.networkFee);
  // const totalAmount = tValue + serviceFee + networkFee;
  //======================{PRODUCTION}===================================

  // const totalAmount = tValue; // in the future after implementing new pricing formular

  let activeReserveWallet;

  //========={The transaction has to be  on "Bitcoin" network and the transaction status "Received"}======================
  if (txData?.tToken?.chain === 'Bitcoin' && txData?.status === 'Received') {
    //======================================{BLOCK: 1}===============================================================

    activeReserveWallet = reserveWallet?.bitcoin;
    // console.log({ activeReserveWallet: activeReserveWallet });
    // console.log({ walletsBitcoin: walletsBitcoin });

    //======================================{BLOCK: 2}===============================================================

    walletsBitcoin?.map(async (wallet) => {
      if (
        txData?.tToken?.symbol == 'btc' &&
        Number(wallet.btc.balance) > sF * totalAmount
      ) {
        enabledWallets.push(wallet);
      }
    });

    //======================================{BLOCK: 4}===============================================================
    //========={if we have sufficient balance we could assign the first wallet that meets the condition as the selected wallet for the transaction, else we will have to use our reserve wallet to pay the user}======================

    if (enabledWallets.length > 0) {
      console.log({ enabledWallets: enabledWallets });

      selectedWallet = enabledWallets[0];
    } else {
      selectedWallet = activeReserveWallet;
    }

    //======================================{BLOCK: 5}===============================================================
    if (selectedWallet) {
      console.log({ selectedWallet: selectedWallet });
    }
    //======================================{BLOCK: 6}===============================================================

    if (selectedWallet) {
      const response = await sendBitcoin(txData, selectedWallet);
      console.log({ responseData: response });

      if (response?.amount) {
        const userData = {
          id: txData?._id,
          hashOut: response?.hashOut,
          status: 'Completed',
          percentageProgress: 5,
        };
        //update status as paid
        const result = await updateBlockChainOutTransactionByIdInternal(
          userData
        );
        console.log({ result: result });
      }
    }
  }
  //========={The transaction has to be  on "Ethereum" network and the transaction status "Received"}======================

  if (txData?.tToken?.chain === 'Ethereum' && txData?.status === 'Received') {
    activeReserveWallet = reserveWallet?.evm;

    walletsEvm?.map(async (wallet) => {
      if (
        txData?.tToken?.address ==
          '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee' &&
        Number(wallet.eth.balance) > sF * totalAmount
      ) {
        enabledWallets.push(wallet);
      }

      if (
        txData?.tToken?.address == usdtAddressEthereum &&
        Number(wallet.eth.balance) > sF * (serviceFee + networkFee) &&
        Number(wallet.usdt.balance) > Number(tValue)
      ) {
        enabledWallets.push(wallet);
      }

      if (
        txData?.tToken?.address == usdtAddressEthereum &&
        Number(wallet.eth.balance) > sF * (serviceFee + networkFee) &&
        Number(wallet.gousdt.balance) > Number(tValue)
      ) {
        enabledWallets.push(wallet);
      }
    });

    //======================================{BLOCK: 4}===============================================================
    //========={if we have sufficient balance we could assign the first wallet that meets the condition as the selected wallet for the transaction, else we will have to use our reserve wallet to pay the user}======================

    if (enabledWallets.length > 0) {
      console.log({ enabledWallets: enabledWallets });

      selectedWallet = enabledWallets[0];
    } else {
      selectedWallet = activeReserveWallet;
    }

    //======================================{BLOCK: 5}===============================================================
    if (selectedWallet) {
      console.log({ selectedWallet: selectedWallet });
    }
    //======================================{BLOCK: 6}===============================================================

    if (selectedWallet) {
      const response = await sendEthereum(txData, selectedWallet);
      console.log({ responseData: response });

      if (response?.amount) {
        const userData = {
          id: txData?._id,
          hashOut: response?.hashOut,
          status: 'Completed',
          percentageProgress: 5,
        };
        //update status as paid
        const result = await updateBlockChainOutTransactionByIdInternal(
          userData
        );
        console.log({ result: result });
      }
    }
  }
  //========={The transaction has to be  on "Tron" network and the transaction status "Received"}======================

  if (txData?.tToken?.chain === 'Tron' && txData?.status === 'Received') {
    activeReserveWallet = reserveWallet?.tron;

    walletsTron?.map(async (wallet) => {
      if (
        txData?.tToken?.symbol == 'trx' &&
        Number(wallet.trx.balance) > sF * totalAmount
      ) {
        enabledWallets.push(wallet);
      }

      if (
        txData?.tToken?.symbol == 'usdt' &&
        Number(wallet.trx.balance) > sF * (serviceFee + networkFee) &&
        Number(wallet.usdt.balance) > Number(tValue)
      ) {
        enabledWallets.push(wallet);
      }

      if (
        txData?.tToken?.symbol == 'usdj' &&
        Number(wallet.trx.balance) > sF * (serviceFee + networkFee) &&
        Number(wallet.usdj.balance) > Number(tValue)
      ) {
        enabledWallets.push(wallet);
      }
    });

    //======================================{BLOCK: 4}===============================================================
    //========={if we have sufficient balance we could assign the first wallet that meets the condition as the selected wallet for the transaction, else we will have to use our reserve wallet to pay the user}======================

    if (enabledWallets.length > 0) {
      console.log({ enabledWallets: enabledWallets });

      selectedWallet = enabledWallets[0];
    } else {
      selectedWallet = activeReserveWallet;
    }

    //======================================{BLOCK: 5}===============================================================
    if (selectedWallet) {
      console.log({ selectedWallet: selectedWallet });
    }
    //======================================{BLOCK: 6}===============================================================

    if (selectedWallet) {
      const response = await sendTron(txData, selectedWallet);
      console.log({ responseData: response });

      if (response?.amount) {
        const userData = {
          id: txData?._id,
          hashOut: response?.hashOut,
          status: 'Completed',
          percentageProgress: 5,
        };
        //update status as paid
        const result = await updateBlockChainOutTransactionByIdInternal(
          userData
        );
        console.log({ result: result });
      }
    }
  }
}

async function payUserByNetworkTest(txData) {
  const allWallets = await WalletsAdmin.findById(process.env.ADMIN_WALLETID);
  // const txData = await Transaction.findById(id);

  // const reserveWallet = {}; // admin dedicated wallet
  //======{all admin reserve external wallet}====================

  const reserveWallet = {
    bitcoin: allWallets.bitcoin?.hdMasterAccounts,
    evm: allWallets.evm?.hdMasterAccounts,
    tron: allWallets.tron?.hdMasterAccounts,
  }; // admin dedicated wallet

  const walletsBitcoin = allWallets.bitcoin?.hdAccounts;
  const walletsEvm = allWallets.evm?.hdAccounts;
  const walletsTron = allWallets.tron?.hdAccounts;

  let enabledWallets = [];
  let selectedWallet = {};

  let sF = 1.05; //factor of safety 5% more due to nework flunctuations

  const tValue = Number(txData?.tValue);
  const serviceFee = (0.25 / 100) * Number(txData?.tValue); // 0.25%
  const networkFee = (0.75 / 100) * Number(txData?.tValue); // 0.25%

  const totalAmount = tValue + serviceFee + networkFee; // 1% above tValue
  // const totalAmount = tValue; // in the future after implementing new pricing formular

  let activeReserveWallet;

  //========={The transaction has to be  on "Bitcoin" network and the transaction status "Received"}======================
  if (txData?.tToken?.chain === 'Bitcoin' && txData?.status === 'Received') {
    //======================================{BLOCK: 1}===============================================================

    activeReserveWallet = reserveWallet?.bitcoin;
    //======================================{BLOCK: 2}===============================================================

    walletsBitcoin?.map(async (wallet) => {
      if (
        txData?.tToken?.symbol == 'btc' &&
        Number(wallet.btc.balance) > sF * totalAmount
      ) {
        enabledWallets.push(wallet);
      }
    });

    //======================================{BLOCK: 4}===============================================================
    //========={if we have sufficient balance we could assign the first wallet that meets the condition as the selected wallet for the transaction, else we will have to use our reserve wallet to pay the user}======================

    if (enabledWallets.length > 0) {
      console.log({ enabledWallets: enabledWallets });

      selectedWallet = enabledWallets[0];
    } else {
      selectedWallet = activeReserveWallet;
    }

    //======================================{BLOCK: 5}===============================================================
    if (selectedWallet) {
      console.log({ selectedWallet: selectedWallet });
    }
    //======================================{BLOCK: 6}===============================================================

    if (selectedWallet) {
      // const response = await sendBitcoin(txData, selectedWallet);
      //============{Testing}================================
      const response = {
        amount: txData?.tValue,
        hashOut:
          '05e19762866d0f3f21afbc48e9e9e9edf028274dcdda64b43fb868b03bf23972',
      };
      console.log({ responseData: response });

      if (response?.amount) {
        const userData = {
          id: txData?._id,
          hashOut: response?.hashOut,
          status: 'Completed',
          percentageProgress: 5,
        };
        //update status as paid
        const result = await updateBlockChainOutTransactionByIdInternal(
          userData
        );
        console.log({ result: result });
      }
    }
  }
  //========={The transaction has to be  on "Ethereum" network and the transaction status "Received"}======================

  if (txData?.tToken?.chain === 'Ethereum' && txData?.status === 'Received') {
    activeReserveWallet = reserveWallet?.evm;

    walletsEvm?.map(async (wallet) => {
      if (
        txData?.tToken?.address ==
          '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee' &&
        Number(wallet.eth.balance) > sF * totalAmount
      ) {
        enabledWallets.push(wallet);
      }

      if (
        txData?.tToken?.address == usdtAddressEthereum &&
        Number(wallet.eth.balance) > sF * (serviceFee + networkFee) &&
        Number(wallet.usdt.balance) >= Number(tValue)
      ) {
        enabledWallets.push(wallet);
      }

      if (
        txData?.tToken?.address == usdtAddressEthereum &&
        Number(wallet.eth.balance) > sF * (serviceFee + networkFee) &&
        Number(wallet.gousdt.balance) >= Number(tValue)
      ) {
        enabledWallets.push(wallet);
      }
    });

    //======================================{BLOCK: 4}===============================================================
    //========={if we have sufficient balance we could assign the first wallet that meets the condition as the selected wallet for the transaction, else we will have to use our reserve wallet to pay the user}======================

    if (enabledWallets.length > 0) {
      console.log({ enabledWallets: enabledWallets });

      selectedWallet = enabledWallets[0];
    } else {
      selectedWallet = activeReserveWallet;
    }

    //======================================{BLOCK: 5}===============================================================
    if (selectedWallet) {
      console.log({ selectedWallet: selectedWallet });
    }
    //======================================{BLOCK: 6}===============================================================

    if (selectedWallet) {
      // const response = await sendEthereum(txData, selectedWallet);
      //============{Testing}================================
      const response = {
        amount: txData?.tValue,
        hashOut:
          '0x5d83530f48633125763af0a8d2895477fe6a0ce76e3bbe5553c17fa778e97bd4',
      };
      console.log({ responseData: response });

      if (response?.amount) {
        const userData = {
          id: txData?._id,
          hashOut: response?.hashOut,
          status: 'Completed',
          percentageProgress: 5,
        };
        //update status as paid
        const result = await updateBlockChainOutTransactionByIdInternal(
          userData
        );
        console.log({ result: result });
      }
    }
  }
  //========={The transaction has to be  on "Tron" network and the transaction status "Received"}======================

  if (txData?.tToken?.chain === 'Tron' && txData?.status === 'Received') {
    activeReserveWallet = reserveWallet?.tron;

    walletsTron?.map(async (wallet) => {
      if (
        txData?.tToken?.symbol == 'trx' &&
        Number(wallet.trx.balance) > sF * totalAmount
      ) {
        enabledWallets.push(wallet);
      }

      if (
        txData?.tToken?.symbol == 'usdt' &&
        Number(wallet.trx.balance) > sF * (serviceFee + networkFee) &&
        Number(wallet.usdt.balance) >= Number(tValue)
      ) {
        enabledWallets.push(wallet);
      }

      if (
        txData?.tToken?.symbol == 'usdj' &&
        Number(wallet.trx.balance) > sF * (serviceFee + networkFee) &&
        Number(wallet.usdj.balance) >= Number(tValue)
      ) {
        enabledWallets.push(wallet);
      }
    });

    //======================================{BLOCK: 4}===============================================================
    //========={if we have sufficient balance we could assign the first wallet that meets the condition as the selected wallet for the transaction, else we will have to use our reserve wallet to pay the user}======================

    if (enabledWallets.length > 0) {
      console.log({ enabledWallets: enabledWallets });

      selectedWallet = enabledWallets[0];
    } else {
      selectedWallet = activeReserveWallet;
    }

    //======================================{BLOCK: 5}===============================================================
    if (selectedWallet) {
      console.log({ selectedWallet: selectedWallet });
    }
    //======================================{BLOCK: 6}===============================================================

    if (selectedWallet) {
      // const response = await sendTron(txData, selectedWallet);
      //============{Testing}================================
      const response = {
        amount: txData?.tValue,
        hashOut:
          '55b9efa905b65be1222b9bf5826aa68329ffec641e59fd9b3af79474334e2ced',
      };
      console.log({ responseData: response });

      if (response?.amount) {
        const userData = {
          id: txData?._id,
          hashOut: response?.hashOut,
          status: 'Completed',
          percentageProgress: 5,
        };
        //update status as paid
        const result = await updateBlockChainOutTransactionByIdInternal(
          userData
        );
        console.log({ result: result });
      }
    }
  }
}

const txDataBitcoinModel1 = {
  _id: '654ace343044fdc0bb280b34',
  user: '6534f4f01ba02cbbdc82cff8',
  country: 'United States',
  city: 'New york',
  orderNo: 'ZURK3CPL',
  txId: 'ZURK3CPL',
  userAddress: 'tb1q8r8n8jh0lgu0e764uh2e0kds2j0f9876gme64f',
  fToken: {
    _id: '65284381082f99ac1aef0112',
    id: 'British Pound Sterling',
    symbol: 'gbp',
    price_symbol: 'gbp',
    name: 'British Pound Sterling',
    unit: '£',
    value: 27935.934,
    type: 'fiat',
    image:
      'https://res.cloudinary.com/datkh2oxv/image/upload/v1697491011/blendery/flags/gbp.png',
    tokenUrl:
      'https://res.cloudinary.com/datkh2oxv/image/upload/v1697491011/blendery/flags/gbp.png',
    updatedAt: '2023-10-28T01:33:21.305Z',
  },
  tToken: {
    _id: '6528436c082f99ac1aef0108',
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    image:
      'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
    current_price: 33905,
    market_cap: '667879142065',
    market_cap_rank: '1',
    fully_diluted_valuation: '718347096207',
    total_volume: '12947120750',
    high_24h: '35012',
    low_24h: '33900',
    price_change_24h: '-1023.3553420143944',
    price_change_percentage_24h: '-2.92984',
    market_cap_change_24h: '-908821573.8842773',
    market_cap_change_percentage_24h: '-0.13589',
    circulating_supply: '19524631',
    total_supply: '21000000',
    max_supply: '21000000',
    ath: '69045',
    ath_change_percentage: '-50.76197',
    ath_date: '2021-11-10T14:24:11.849Z',
    atl: '67.81',
    atl_change_percentage: '50035.35823',
    atl_date: '2013-07-06T00:00:00.000Z',
    roi: null,
    last_updated: '2023-10-26T15:32:32.407Z',
    updatedAt: '2023-11-06T23:26:07.720Z',
    chain: 'Bitcoin',
    addresss: '', // add to bitcoin and tron
  },
  fValue: '150',
  tValue: '0.0052',
  service: 'buy',
  subService: 'buyCard',
  youSend: 150,
  youGet: 148.5,
  processingFee: 1.5,
  exchangeRate: '28798.000',
  pin: '194300',
  dispatcherId: 'A4664',
  location: 'New york',
  provider: 'BlenderyPay',
  providerUrl: 'https://blendery.io',
  fallbackUrl: '',
  telegram: '',
  phone: '',
  chain: '',
  chainId: '',
  timeLeft: {
    $date: '2023-11-08T01:54:28.887Z',
  },
  percentageProgress: 5,
  status: 'Received',
  blenderyStatus: 'Pending',
  timeStatus: 'Completed',
  amount: '520869.5048267241',
  isAmountMatched: false,
  networkName: 'Testnet',
  managerChanged: false,
  createdAt: {
    $date: '2023-11-07T23:54:28.887Z',
  },
  updatedAt: {
    $date: '2023-11-27T07:20:38.099Z',
  },
  __v: 0,
  blockchainUrlOut:
    'https://blockstream.info/testnet/tx/44d463d420cd663b1a2f10804eee0af0ffd4ec01380235bf10775a16e3258034',
  hashOut: '44d463d420cd663b1a2f10804eee0af0ffd4ec01380235bf10775a16e3258034',
  bankName: '',
  blenderyCardNumber: '5320 1000 2000 3000',
  cardNumber: '',
  fullName: '',
};

const txDataEthereumModel = {
  _id: '654b79b928274facde7bf676',
  user: '6534f4f01ba02cbbdc82cff8',
  orderNo: '3XTHPKRN',
  txId: '3XTHPKRN',
  userAddress: '0x02293433044e00d034E29490a041b72776683Eaf',
  blenderyAddress: 'TPzLVyshbcxZjvsK8hKNevXZm68DvWWzKq',
  fToken: {
    _id: '652c68058a1e328256fef034',
    id: 'tron',
    symbol: 'trx',
    name: 'TRON',
    image:
      'https://assets.coingecko.com/coins/images/1094/large/tron-logo.png?1696502193',
    current_price: 0.092065,
    market_cap: '8219933520',
    market_cap_rank: '11',
    fully_diluted_valuation: '8219929644',
    total_volume: '283994976',
    high_24h: '0.09411',
    low_24h: '0.09203',
    price_change_24h: '-0.002045714167200966',
    price_change_percentage_24h: '-2.17374',
    market_cap_change_24h: '-69966432.91488075',
    market_cap_change_percentage_24h: '-0.844',
    circulating_supply: '88840311387.9229',
    total_supply: '88840269498.4835',
    max_supply: null,
    ath: '0.231673',
    ath_change_percentage: '-60.21746',
    ath_date: '2018-01-05T00:00:00.000Z',
    atl: '0.00180434',
    atl_change_percentage: '5007.97458',
    atl_date: '2017-11-12T00:00:00.000Z',
    roi: {
      times: 47.45500915435254,
      currency: 'usd',
      percentage: 4745.500915435254,
    },
    last_updated: '2023-10-26T15:32:28.529Z',
    updatedAt: '2023-11-07T00:07:34.205Z',
    chain: 'Tron',
  },
  tToken: {
    _id: '6528436c082f99ac1aef0109',
    id: 'ethereum',
    symbol: 'eth',
    name: 'Ethereum',
    image:
      'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628',
    current_price: 1771.42,
    market_cap: '215529918225',
    market_cap_rank: 2,
    fully_diluted_valuation: '215529918225',
    total_volume: '16575028597',
    high_24h: '1861.11',
    low_24h: '1770.23',
    price_change_24h: '-40.0072878208216',
    price_change_percentage_24h: '-2.20861',
    market_cap_change_24h: '704227495',
    market_cap_change_percentage_24h: '0.32781',
    circulating_supply: '120260008.347644',
    total_supply: '120260008.347644',
    max_supply: null,
    ath: 4878.26,
    ath_change_percentage: '-63.53572',
    ath_date: '2021-11-10T14:24:19.604Z',
    atl: 0.432979,
    atl_change_percentage: '410733.52956',
    atl_date: '2015-10-20T00:00:00.000Z',
    roi: {
      times: 68.89123028749954,
      currency: 'btc',
      percentage: 6889.123028749955,
    },
    last_updated: '2023-10-26T15:32:23.061Z',
    decimals: 18,
    address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    chainId: '1',
    updatedAt: '2023-11-06T23:26:08.845Z',
    chain: 'Ethereum',
  },
  fValue: '10',
  tValue: '0.01',
  service: 'exchange',
  subService: 'exchange',
  youSend: 10,
  youGet: 9.95,
  networkFee: 0.025,
  serviceFee: 0.025,
  exchangeRate: '0.098',
  fallbackUrl: '',
  telegram: '',
  phone: '',
  chain: 'Tron',
  chainId: '',
  timeLeft: {
    $date: '2023-11-08T14:06:17.014Z',
  },
  percentageProgress: 5,
  status: 'Received',
  blenderyStatus: 'Pending',
  timeStatus: 'Completed',
  amount: '10000000',
  isAmountMatched: false,
  networkName: 'Testnet',
  managerChanged: false,
  createdAt: {
    $date: '2023-11-08T12:06:17.017Z',
  },
  updatedAt: {
    $date: '2023-12-01T08:46:17.220Z',
  },
  __v: 0,
  amountReceived: '10',
  blockchainUrl:
    'https://nile.tronscan.org/#/transaction/1b39cdfed477ccaf19ae315a9d9822a704d2fd84e273f36d1100ebd237c2391b',
  hash: '1b39cdfed477ccaf19ae315a9d9822a704d2fd84e273f36d1100ebd237c2391b',
  receiver: 'TPzLVyshbcxZjvsK8hKNevXZm68DvWWzKq',
  sender: 'THFxGz1Pq5pyL7kdjZFwFqbP8zbBSLsYzE',
  blockchainUrlOut:
    'https://goerli.etherscan.io/tx/0xb93adc1f5e3c41917159b69aecd0f4b6fffb07391c8f0b85b8ea034f6f3aefd9',
  hashOut: '0xb93adc1f5e3c41917159b69aecd0f4b6fffb07391c8f0b85b8ea034f6f3aefd9',
  bankName: '',
  blenderyCardNumber: '5320 1000 2000 3000',
  cardNumber: '',
  fullName: '',
};

//using GoUSDT
const txDataEthereumERC20Model = {
  _id: '654b79b928274facde7bf676',
  user: '6534f4f01ba02cbbdc82cff8',
  orderNo: '3XTHPKRN',
  txId: '3XTHPKRN',
  userAddress: '0x02293433044e00d034E29490a041b72776683Eaf',
  blenderyAddress: 'TPzLVyshbcxZjvsK8hKNevXZm68DvWWzKq',
  fToken: {
    _id: '652c68058a1e328256fef034',
    id: 'tron',
    symbol: 'trx',
    name: 'TRON',
    image:
      'https://assets.coingecko.com/coins/images/1094/large/tron-logo.png?1696502193',
    current_price: 0.092065,
    market_cap: '8219933520',
    market_cap_rank: '11',
    fully_diluted_valuation: '8219929644',
    total_volume: '283994976',
    high_24h: '0.09411',
    low_24h: '0.09203',
    price_change_24h: '-0.002045714167200966',
    price_change_percentage_24h: '-2.17374',
    market_cap_change_24h: '-69966432.91488075',
    market_cap_change_percentage_24h: '-0.844',
    circulating_supply: '88840311387.9229',
    total_supply: '88840269498.4835',
    max_supply: null,
    ath: '0.231673',
    ath_change_percentage: '-60.21746',
    ath_date: '2018-01-05T00:00:00.000Z',
    atl: '0.00180434',
    atl_change_percentage: '5007.97458',
    atl_date: '2017-11-12T00:00:00.000Z',
    roi: {
      times: 47.45500915435254,
      currency: 'usd',
      percentage: 4745.500915435254,
    },
    last_updated: '2023-10-26T15:32:28.529Z',
    updatedAt: '2023-11-07T00:07:34.205Z',
    chain: 'Tron',
  },
  tToken: {
    _id: '6528436c082f99ac1aef010c',
    id: 'tether',
    symbol: 'usdt',
    // "name": "tether",
    name: 'Tether USD (Go)',
    image:
      'https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661',
    current_price: 0.999855,
    market_cap: 83499840098,
    market_cap_rank: 3,
    fully_diluted_valuation: 83499840098,
    total_volume: 15161583966,
    high_24h: 1.001,
    low_24h: 0.998401,
    price_change_24h: 0.0006053,
    price_change_percentage_24h: 0.06058,
    market_cap_change_24h: 19241670,
    market_cap_change_percentage_24h: 0.02305,
    circulating_supply: 83519009631.3892,
    total_supply: 83519009631.3892,
    max_supply: null,
    ath: 1.32,
    ath_change_percentage: -24.45032,
    ath_date: '2018-07-24T00:00:00.000Z',
    atl: 0.572521,
    atl_change_percentage: 74.59521,
    atl_date: '2015-03-02T00:00:00.000Z',
    roi: null,
    last_updated: '2023-10-12T12:15:00.310Z',
    // "address": "0xdac17f958d2ee523a2206206994597c13d831ec7",
    address: usdtAddressEthereum,
    decimals: 6,
    chainId: '1',
    type: 'ERC20',
    chain: 'Ethereum',
    updatedAt: '2023-11-07T00:31:36.949Z',
  },
  fValue: '10',
  tValue: '0.978',
  service: 'exchange',
  subService: 'exchange',
  youSend: 10,
  youGet: 9.95,
  networkFee: 0.025,
  serviceFee: 0.025,
  exchangeRate: '0.098',
  fallbackUrl: '',
  telegram: '',
  phone: '',
  chain: 'Tron',
  chainId: '',
  timeLeft: {
    $date: '2023-11-08T14:06:17.014Z',
  },
  percentageProgress: 5,
  status: 'Received',
  blenderyStatus: 'Pending',
  timeStatus: 'Completed',
  amount: '10000000',
  isAmountMatched: false,
  networkName: 'Testnet',
  managerChanged: false,
  createdAt: {
    $date: '2023-11-08T12:06:17.017Z',
  },
  updatedAt: {
    $date: '2023-12-01T08:46:17.220Z',
  },
  __v: 0,
  amountReceived: '10',
  blockchainUrl:
    'https://nile.tronscan.org/#/transaction/1b39cdfed477ccaf19ae315a9d9822a704d2fd84e273f36d1100ebd237c2391b',
  hash: '1b39cdfed477ccaf19ae315a9d9822a704d2fd84e273f36d1100ebd237c2391b',
  receiver: 'TPzLVyshbcxZjvsK8hKNevXZm68DvWWzKq',
  sender: 'THFxGz1Pq5pyL7kdjZFwFqbP8zbBSLsYzE',
  blockchainUrlOut:
    'https://goerli.etherscan.io/tx/0xb93adc1f5e3c41917159b69aecd0f4b6fffb07391c8f0b85b8ea034f6f3aefd9',
  hashOut: '0xb93adc1f5e3c41917159b69aecd0f4b6fffb07391c8f0b85b8ea034f6f3aefd9',
  bankName: '',
  blenderyCardNumber: '5320 1000 2000 3000',
  cardNumber: '',
  fullName: '',
};

const txDataTronModel = {
  _id: '6564b32864a57ca123e41643',
  user: '6534f4f01ba02cbbdc82cff8',
  country: 'Russia',
  city: 'Saint Petersburg',
  orderNo: 'PMUEBX5G',
  txId: 'PMUEBX5G',
  userAddress: '0xfba419d2D860C8e4557fC4F1d01F1466cfD276fC',
  fToken: {
    _id: '65284381082f99ac1aef0113',
    id: 'Russian Ruble',
    symbol: 'rub',
    price_symbol: 'rub',
    name: 'Russian Ruble',
    unit: '₽',
    value: 41675.288,
    type: 'fiat',
    image:
      'https://res.cloudinary.com/datkh2oxv/image/upload/v1697491013/blendery/flags/rub.png',
    tokenUrl:
      'https://res.cloudinary.com/datkh2oxv/image/upload/v1697491013/blendery/flags/rub.png',
  },
  tToken: {
    _id: '6528436c082f99ac1aef010a',
    id: 'tron',
    symbol: 'trx',
    name: 'TRON',
    image:
      'https://assets.coingecko.com/coins/images/1094/large/tron-logo.png?1696502193',
    current_price: 0.092065,
    market_cap: '8219933520',
    market_cap_rank: 11,
    fully_diluted_valuation: '8219929644',
    total_volume: '283994976',
    high_24h: '0.09411',
    low_24h: '0.09203',
    price_change_24h: '-0.002045714167200966',
    price_change_percentage_24h: '-2.17374',
    market_cap_change_24h: '-69966432.91488075',
    market_cap_change_percentage_24h: '-0.844',
    circulating_supply: '88840311387.9229',
    total_supply: '88840269498.4835',
    max_supply: null,
    ath: 0.231673,
    ath_change_percentage: '-60.21746',
    ath_date: '2018-01-05T00:00:00.000Z',
    atl: 0.00180434,
    atl_change_percentage: '5007.97458',
    atl_date: '2017-11-12T00:00:00.000Z',
    roi: {
      times: 47.45500915435254,
      currency: 'usd',
      percentage: 4745.500915435254,
    },
    last_updated: '2023-10-26T15:32:28.529Z',
    updatedAt: '2023-11-06T23:26:07.716Z',
    chain: 'Tron',
  },
  fValue: '150',
  tValue: '10',
  service: 'buy',
  subService: 'buyCard',
  youSend: 150,
  youGet: 148.5,
  processingFee: 1.5,
  exchangeRate: '88.930',
  pin: '854535',
  dispatcherId: 'A5213',
  location: 'Saint Petersburg',
  provider: 'Phone',
  providerUrl: 'https://www.simplex.com/',
  fallbackUrl: '',
  telegram: '',
  fullName: 'aa',
  blenderyCardNumber: '5320 1000 2000 3000',
  bankName: 'se',
  cardNumber: null,
  phone: '90',
  chain: '',
  chainId: '',
  timeLeft: {
    $date: '2023-11-27T17:18:00.035Z',
  },
  percentageProgress: 3,
  status: 'Received',
  blenderyStatus: 'Pending',
  timeStatus: 'Expired',
  amount: '1686719.8920499266',
  isAmountMatched: false,
  networkName: 'Testnet',
  managerChanged: false,
  createdAt: {
    $date: '2023-11-27T15:18:00.036Z',
  },
  updatedAt: {
    $date: '2023-11-27T17:18:01.491Z',
  },
  __v: 0,
};

const txDataTronTRC20Model = {
  _id: '6564b32864a57ca123e41643',
  user: '6534f4f01ba02cbbdc82cff8',
  country: 'Russia',
  city: 'Saint Petersburg',
  orderNo: 'PMUEBX5G',
  txId: 'PMUEBX5G',
  userAddress: '0xfba419d2D860C8e4557fC4F1d01F1466cfD276fC',
  fToken: {
    _id: '65284381082f99ac1aef0113',
    id: 'Russian Ruble',
    symbol: 'rub',
    price_symbol: 'rub',
    name: 'Russian Ruble',
    unit: '₽',
    value: 41675.288,
    type: 'fiat',
    image:
      'https://res.cloudinary.com/datkh2oxv/image/upload/v1697491013/blendery/flags/rub.png',
    tokenUrl:
      'https://res.cloudinary.com/datkh2oxv/image/upload/v1697491013/blendery/flags/rub.png',
  },
  tToken: {
    _id: '6528436c082f99ac1aef010b',
    id: 'tether',
    // symbol: 'usdt',
    symbol: 'usdj',
    // name: 'Tether',
    name: 'JUST Stablecoin',
    image:
      'https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661',
    current_price: 0.999972,
    market_cap: '84205562923',
    market_cap_rank: '3',
    fully_diluted_valuation: '84205562923',
    total_volume: '193111663063',
    high_24h: '1.003',
    low_24h: '0.994532',
    price_change_24h: '-0.002799963643488779',
    price_change_percentage_24h: '-0.27922',
    market_cap_change_24h: '-39911298.171188354',
    market_cap_change_percentage_24h: '-0.04738',
    circulating_supply: '84391561211.9936',
    total_supply: '84391561211.9936',
    max_supply: null,
    ath: '1.32',
    ath_change_percentage: '-24.7247',
    ath_date: '2018-07-24T00:00:00.000Z',
    atl: '0.572521',
    atl_change_percentage: '73.96113',
    atl_date: '2015-03-02T00:00:00.000Z',
    roi: null,
    last_updated: '2023-10-26T15:30:01.021Z',
    type: 'TRC20',
    updatedAt: '2023-11-07T00:23:07.697Z',
    chain: 'Tron',
    // address: usdtAddressTron,
    address: 'TLBaRhANQoJFTqre9Nf1mjuwNWjCJeYqUL', // usdj address
    // decimals: 6,
    decimals: 18,
  },
  fValue: '150',
  tValue: '1',
  service: 'buy',
  subService: 'buyCard',
  youSend: 150,
  youGet: 148.5,
  processingFee: 1.5,
  exchangeRate: '88.930',
  pin: '854535',
  dispatcherId: 'A5213',
  location: 'Saint Petersburg',
  provider: 'Phone',
  providerUrl: 'https://www.simplex.com/',
  fallbackUrl: '',
  telegram: '',
  fullName: 'aa',
  blenderyCardNumber: '5320 1000 2000 3000',
  bankName: 'se',
  cardNumber: null,
  phone: '90',
  chain: '',
  chainId: '',
  timeLeft: {
    $date: '2023-11-27T17:18:00.035Z',
  },
  percentageProgress: 3,
  status: 'Received',
  blenderyStatus: 'Pending',
  timeStatus: 'Expired',
  amount: '1686719.8920499266',
  isAmountMatched: false,
  networkName: 'Testnet',
  managerChanged: false,
  createdAt: {
    $date: '2023-11-27T15:18:00.036Z',
  },
  updatedAt: {
    $date: '2023-11-27T17:18:01.491Z',
  },
  __v: 0,
};

// payUserByNetworkTest(txDataBitcoinModel1);
// payUserByNetworkTest(txDataEthereumModel)
// payUserByNetworkTest(txDataEthereumERC20Model)
// payUserByNetworkTest(txDataTronModel)
// payUserByNetworkTest(txDataTronTRC20Model)

const updateOnePaidTransactionById = async (req, res) => {
  const { id } = req.body;
  const txData = await Transaction.findById(id);
  const allWallets = await WalletsAdmin.findById(process.env.ADMIN_WALLETID);

  // const reserveWallet = {}; // admin dedicated wallet
  //======{all admin reserve external wallet}====================

  const reserveWallet = {
    bitcoin: allWallets.bitcoin?.hdMasterAccounts,
    evm: allWallets.evm?.hdMasterAccounts,
    tron: allWallets.tron?.hdMasterAccounts,
  }; // admin dedicated wallet

  const walletsBitcoin = allWallets.bitcoin?.hdAccounts;
  const walletsEvm = allWallets.evm?.hdAccounts;
  const walletsTron = allWallets.tron?.hdAccounts;

  let enabledWallets = [];
  let selectedWallet = {};

  let sF = 1.05; //factor of safety 5% more due to nework flunctuations

  const tValue = Number(txData?.tValue);
  const serviceFee = (0.25 / 100) * Number(txData?.tValue); // 0.25%
  const networkFee = (0.75 / 100) * Number(txData?.tValue); // 0.25%
  const totalAmount = tValue + serviceFee + networkFee; // 1% above tValue
  // const totalAmount = tValue; // in the future after implementing new pricing formular

  //======================{PRODUCTION}===================================
  // const tValue = Number(txData?.tValue);
  // const serviceFee = Number(txData?.serviceFee);
  // const networkFee = Number(txData?.networkFee);
  // const totalAmount = tValue + serviceFee + networkFee;
  //======================{PRODUCTION}===================================

  let activeReserveWallet;
  let isMasterWallet = false;

  //========={The transaction has to be  on "Bitcoin" network and the transaction status "Received"}======================
  if (txData?.tToken?.chain === 'Bitcoin' && txData?.status === 'Received') {
    //======================================{BLOCK: 1}===============================================================

    activeReserveWallet = reserveWallet?.bitcoin;
    //======================================{BLOCK: 2}===============================================================

    walletsBitcoin?.map(async (wallet) => {
      if (
        txData?.tToken?.symbol == 'btc' &&
        Number(wallet.btc.balance) > sF * totalAmount
      ) {
        enabledWallets.push(wallet);
      }
    });

    //======================================{BLOCK: 4}===============================================================
    //========={if we have sufficient balance we could assign the first wallet that meets the condition as the selected wallet for the transaction, else we will have to use our reserve wallet to pay the user}======================

    if (enabledWallets.length > 0) {
      console.log({ enabledWallets: enabledWallets });

      // selectedWallet = enabledWallets[0];
      selectedWallet = activeReserveWallet; // for testing till transaction cost is well calculated
      isMasterWallet = false;
    } else {
      selectedWallet = activeReserveWallet;
      isMasterWallet = true;
    }

    //======================================{BLOCK: 5}===============================================================
    if (selectedWallet) {
      console.log({ selectedWallet: selectedWallet });
    }
    //======================================{BLOCK: 6}===============================================================

    if (selectedWallet) {
      const response = await sendBitcoin(
        txData,
        selectedWallet,
        isMasterWallet
      );
      //============{Testing}================================
      // const response = {
      //   amount: txData?.tValue,
      //   hashOut:
      //     '05e19762866d0f3f21afbc48e9e9e9edf028274dcdda64b43fb868b03bf23972',
      // };
      console.log({ responseData: response });

      if (response?.amount) {
        const userData = {
          id: txData?._id,
          hashOut: response?.hashOut,
          status: 'Completed',
          percentageProgress: 5,
        };
        //update status as paid
        const result = await updateBlockChainOutTransactionByIdInternal(
          userData
        );
        // console.log({ result: result });
        // res.status(200).json(result);
        if (result) {
          console.log({ result: result });
          res.status(200).json(result);
        }
      }
    }
  }
  //========={The transaction has to be  on "Ethereum" network and the transaction status "Received"}======================

  if (txData?.tToken?.chain === 'Ethereum' && txData?.status === 'Received') {
    activeReserveWallet = reserveWallet?.evm;

    walletsEvm?.map(async (wallet) => {
      if (
        txData?.tToken?.address ==
          '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee' &&
        Number(wallet.eth.balance) > sF * totalAmount
      ) {
        enabledWallets.push(wallet);
      }

      if (
        txData?.tToken?.address == usdtAddressEthereum &&
        Number(wallet.eth.balance) > sF * (serviceFee + networkFee) &&
        Number(wallet.usdt.balance) >= Number(tValue)
      ) {
        enabledWallets.push(wallet);
      }
    });

    //======================================{BLOCK: 4}===============================================================
    //========={if we have sufficient balance we could assign the first wallet that meets the condition as the selected wallet for the transaction, else we will have to use our reserve wallet to pay the user}======================

    if (enabledWallets.length > 0) {
      console.log({ enabledWallets: enabledWallets });

      // selectedWallet = enabledWallets[0];
      selectedWallet = activeReserveWallet; // for testing till transaction cost is well calculated
      isMasterWallet = false;
    } else {
      selectedWallet = activeReserveWallet;
      isMasterWallet = true;
    }

    //======================================{BLOCK: 5}===============================================================
    if (selectedWallet) {
      console.log({ selectedWallet: selectedWallet });
    }
    //======================================{BLOCK: 6}===============================================================

    if (selectedWallet) {
      const response = await sendEthereum(
        txData,
        selectedWallet,
        isMasterWallet
      );
      //============{Testing}================================
      // const response = {
      //   amount: txData?.tValue,
      //   hashOut:
      //     '0x5d83530f48633125763af0a8d2895477fe6a0ce76e3bbe5553c17fa778e97bd4',
      // };

      if (response?.amount) {
        console.log({ responseData: response });
        const userData = {
          id: txData?._id,
          hashOut: response?.hashOut,
          status: 'Completed',
          percentageProgress: 5,
        };
        //update status as paid
        const result = await updateBlockChainOutTransactionByIdInternal(
          userData
        );
        if (result) {
          console.log({ result: result });
          res.status(200).json(result);
        }
      }
    }
  }
  //========={The transaction has to be  on "Tron" network and the transaction status "Received"}======================

  if (txData?.tToken?.chain === 'Tron' && txData?.status === 'Received') {
    activeReserveWallet = reserveWallet?.tron;

    walletsTron?.map(async (wallet) => {
      if (
        txData?.tToken?.symbol == 'trx' &&
        Number(wallet.trx.balance) > sF * totalAmount
      ) {
        enabledWallets.push(wallet);
      }

      if (
        txData?.tToken?.symbol == 'usdt' &&
        Number(wallet.trx.balance) > sF * (serviceFee + networkFee) &&
        Number(wallet.usdt.balance) >= Number(tValue)
      ) {
        enabledWallets.push(wallet);
      }

      if (
        txData?.tToken?.symbol == 'usdj' &&
        Number(wallet.trx.balance) > sF * (serviceFee + networkFee) &&
        Number(wallet.usdj.balance) >= Number(tValue)
      ) {
        enabledWallets.push(wallet);
      }
    });

    //======================================{BLOCK: 4}===============================================================
    //========={if we have sufficient balance we could assign the first wallet that meets the condition as the selected wallet for the transaction, else we will have to use our reserve wallet to pay the user}======================

    if (enabledWallets.length > 0) {
      console.log({ enabledWallets: enabledWallets });

      // selectedWallet = enabledWallets[0];
      selectedWallet = activeReserveWallet; // for testing till transaction cost is well calculated
      isMasterWallet = false;
    } else {
      selectedWallet = activeReserveWallet;
      isMasterWallet = true;
    }

    //======================================{BLOCK: 5}===============================================================
    if (selectedWallet) {
      console.log({ selectedWallet: selectedWallet });
    }
    //======================================{BLOCK: 6}===============================================================

    if (selectedWallet) {
      const response = await sendTron(txData, selectedWallet, isMasterWallet);
      //============{Testing}================================
      // const response = {
      //   amount: txData?.tValue,
      //   hashOut:
      //     '55b9efa905b65be1222b9bf5826aa68329ffec641e59fd9b3af79474334e2ced',
      // };

      if (response?.amount) {
        console.log({ responseData: response });
        const userData = {
          id: txData?._id,
          hashOut: response?.hashOut,
          status: 'Completed',
          percentageProgress: 5,
        };
        //update status as paid
        const result = await updateBlockChainOutTransactionByIdInternal(
          userData
        );
        if (result) {
          console.log({ result: result });
          res.status(200).json(result);
        }
      }
    }
  }
};

async function updateEthTransactionManually() {
  const txData = {
    _id: '657b49fdcc65935ba406543c',
  };
  const response = {
    hashOut:
      '0x37ceae2e0264270ea6d7d5c902ff175aa17916b9fb08e9ec68e71db605f01ebb',
    sender: '0x2B605B3EFF7b5677c49d67eB641877C604B146Ee',
    success: true,
    amount: '0.007276405918631012',
    balance: '0.810305913630900135',
    type: 'Native',
    action: 'send',
    message: 'Successfull',
  };

  if (response?.amount) {
    console.log({ responseData: response });
    const userData = {
      id: txData?._id,
      hashOut: response?.hashOut,
      status: 'Completed',
      percentageProgress: 5,
    };
    //update status as paid
    const result = await updateBlockChainOutTransactionByIdInternal(userData);
    if (result) {
      console.log({ result: result });
      // res.status(200).json(result);
    }
  }
}

// updateEthTransactionManually()

//======================================================{SELECTION RESULTS}==================================

const txDataBitcoinResult = [
  {
    enabledWallets: [
      {
        btc: [Object],
        accountName: 'Account 6',
        address: 'n3KzXkuLZdqhGYVn2kSFMarGWvrc7wEJ5d',
        privateKey:
          'c6a70e507945db600473df484c34f27786a059a6cbd19066e7ae6155d78fc172bc5362630994a6aa21380437ab21ef1472605369daf08a9be93e1c92fffe81650daecb85f84eef2ac070335e947d8ecc',
        // _id: new ObjectId('6549e350c80d8f28bed0b2eb'),
      },
    ],
  },
  {
    selectedWallet: {
      btc: {
        name: 'Bitcoin',
        address: '',
        decimals: 8,
        symbol: 'btc',
        balance: 0.00800307,
      },
      accountName: 'Account 6',
      address: 'n3KzXkuLZdqhGYVn2kSFMarGWvrc7wEJ5d',
      privateKey:
        'c6a70e507945db600473df484c34f27786a059a6cbd19066e7ae6155d78fc172bc5362630994a6aa21380437ab21ef1472605369daf08a9be93e1c92fffe81650daecb85f84eef2ac070335e947d8ecc',
      // _id: new ObjectId('6549e350c80d8f28bed0b2eb'),
    },
  },
];

const txDataEthereumResult = [
  {
    enabledWallets: [
      {
        eth: [Object],
        usdt: [Object],
        gousdt: [Object],
        accountName: 'Account 2',
        address: '0xC5fa054DDC662794944FB9D50BF6412504D30b2b',
        privateKey:
          '869218228594cff6f7d270d1a7c9e7d997be8467a96ff4f6105bf0050761bbb4da0f87670c02348d737da9125ace4c5d8c1a2e56598b1fa3707808835591779d602189997a47cb420c84a18dc5cc9072',
        phrase:
          '86712b4cd25b7b3cfd91d7b7cc8c05485f1d873a643e4863664ed325d6815c383808d307b78e58a95d7757c163630c3ae6d519680611eb2da3c7282c0ad002383ac7b541867dc8c25a741b86e7e6899c',
        // _id: new ObjectId("65498afa1d8bb238bdab9a40")
      },
    ],
  },
  {
    selectedWallet: {
      eth: {
        name: 'Ethereum',
        address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        decimals: 18,
        symbol: 'eth',
        balance: 0.016647064997716017,
      },
      usdt: {
        name: 'Tether',
        address: usdtAddressEthereum,
        decimals: 6,
        balance: 0,
        symbol: 'usdt',
      },
      gousdt: {
        name: 'Tether USD (Go)',
        address: usdtAddressEthereum,
        decimals: 6,
        symbol: 'usdt',
        balance: 50,
      },
      accountName: 'Account 2',
      address: '0xC5fa054DDC662794944FB9D50BF6412504D30b2b',
      privateKey:
        '869218228594cff6f7d270d1a7c9e7d997be8467a96ff4f6105bf0050761bbb4da0f87670c02348d737da9125ace4c5d8c1a2e56598b1fa3707808835591779d602189997a47cb420c84a18dc5cc9072',
      phrase:
        '86712b4cd25b7b3cfd91d7b7cc8c05485f1d873a643e4863664ed325d6815c383808d307b78e58a95d7757c163630c3ae6d519680611eb2da3c7282c0ad002383ac7b541867dc8c25a741b86e7e6899c',
      // _id: new ObjectId("65498afa1d8bb238bdab9a40")
    },
  },
];
const txDataEthereumERC20Result = [
  {
    enabledWallets: [
      {
        eth: [Object],
        usdt: [Object],
        gousdt: [Object],
        accountName: 'Account 2',
        address: '0xC5fa054DDC662794944FB9D50BF6412504D30b2b',
        privateKey:
          '869218228594cff6f7d270d1a7c9e7d997be8467a96ff4f6105bf0050761bbb4da0f87670c02348d737da9125ace4c5d8c1a2e56598b1fa3707808835591779d602189997a47cb420c84a18dc5cc9072',
        phrase:
          '86712b4cd25b7b3cfd91d7b7cc8c05485f1d873a643e4863664ed325d6815c383808d307b78e58a95d7757c163630c3ae6d519680611eb2da3c7282c0ad002383ac7b541867dc8c25a741b86e7e6899c',
        // _id: new ObjectId("65498afa1d8bb238bdab9a40")
      },
    ],
  },
  {
    selectedWallet: {
      eth: {
        name: 'Ethereum',
        address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        decimals: 18,
        symbol: 'eth',
        balance: 0.016647064997716017,
      },
      usdt: {
        name: 'Tether',
        address: usdtAddressEthereum,
        decimals: 6,
        balance: 0,
        symbol: 'usdt',
      },
      gousdt: {
        name: 'Tether USD (Go)',
        address: usdtAddressEthereum,
        decimals: 6,
        symbol: 'usdt',
        balance: 50,
      },
      accountName: 'Account 2',
      address: '0xC5fa054DDC662794944FB9D50BF6412504D30b2b',
      privateKey:
        '869218228594cff6f7d270d1a7c9e7d997be8467a96ff4f6105bf0050761bbb4da0f87670c02348d737da9125ace4c5d8c1a2e56598b1fa3707808835591779d602189997a47cb420c84a18dc5cc9072',
      phrase:
        '86712b4cd25b7b3cfd91d7b7cc8c05485f1d873a643e4863664ed325d6815c383808d307b78e58a95d7757c163630c3ae6d519680611eb2da3c7282c0ad002383ac7b541867dc8c25a741b86e7e6899c',
      // _id: new ObjectId("65498afa1d8bb238bdab9a40")
    },
  },
];
const txDataTronResult = [
  {
    enabledWallets: [
      {
        trx: [Object],
        usdt: [Object],
        usdj: [Object],
        accountName: 'Account 49',
        address: 'TQu7o18fGP1jieqF5Y5fYu6d8vRL4oC6pv',
        privateKey:
          'ff9e849653f36ca20835063c5e1a274c8aca64727c0ce65c6135e3929f50030c11c4878b2f3044f1f9420bd30e8c0f65f87a7c1ad786a8683f22cda482b1e0b599557d1c802ade934edb659be0f7f178',
        phrase:
          '80850bd93f6490ddb23404fc57e03a321c468b4affa2253e3e1648cd77bb004fc9d781d56721129501e11972f61c313d999a22ecc971b76d1c058e01145798baec87a7cff56f11ef0732863546485ad8',
        // _id: new ObjectId("6569dfa36fdb73792b836b35")
      },
    ],
  },
  {
    selectedWallet: {
      trx: {
        name: 'TRON',
        address: '',
        decimals: 6,
        symbol: 'trx',
        balance: 93.3238,
      },
      usdt: {
        name: 'Tether',
        address: usdtAddressTron,
        decimals: 6,
        symbol: 'usdt',
        balance: 0,
      },
      usdj: {
        name: 'Just Stablecoin',
        address: 'TLBaRhANQoJFTqre9Nf1mjuwNWjCJeYqUL',
        decimals: 18,
        symbol: 'usdj',
        balance: 1,
      },
      accountName: 'Account 49',
      address: 'TQu7o18fGP1jieqF5Y5fYu6d8vRL4oC6pv',
      privateKey:
        'ff9e849653f36ca20835063c5e1a274c8aca64727c0ce65c6135e3929f50030c11c4878b2f3044f1f9420bd30e8c0f65f87a7c1ad786a8683f22cda482b1e0b599557d1c802ade934edb659be0f7f178',
      phrase:
        '80850bd93f6490ddb23404fc57e03a321c468b4affa2253e3e1648cd77bb004fc9d781d56721129501e11972f61c313d999a22ecc971b76d1c058e01145798baec87a7cff56f11ef0732863546485ad8',
      // _id: new ObjectId("6569dfa36fdb73792b836b35")
    },
  },
];
const txDataTronTRC20Result = [
  {
    enabledWallets: [
      {
        trx: [Object],
        usdt: [Object],
        usdj: [Object],
        accountName: 'Account 49',
        address: 'TQu7o18fGP1jieqF5Y5fYu6d8vRL4oC6pv',
        privateKey:
          'ff9e849653f36ca20835063c5e1a274c8aca64727c0ce65c6135e3929f50030c11c4878b2f3044f1f9420bd30e8c0f65f87a7c1ad786a8683f22cda482b1e0b599557d1c802ade934edb659be0f7f178',
        phrase:
          '80850bd93f6490ddb23404fc57e03a321c468b4affa2253e3e1648cd77bb004fc9d781d56721129501e11972f61c313d999a22ecc971b76d1c058e01145798baec87a7cff56f11ef0732863546485ad8',
        // _id: new ObjectId("6569dfa36fdb73792b836b35")
      },
    ],
  },
  {
    selectedWallet: {
      trx: {
        name: 'TRON',
        address: '',
        decimals: 6,
        symbol: 'trx',
        balance: 93.3238,
      },
      usdt: {
        name: 'Tether',
        address: usdtAddressTron,
        decimals: 6,
        symbol: 'usdt',
        balance: 0,
      },
      usdj: {
        name: 'Just Stablecoin',
        address: 'TLBaRhANQoJFTqre9Nf1mjuwNWjCJeYqUL',
        decimals: 18,
        symbol: 'usdj',
        balance: 1,
      },
      accountName: 'Account 49',
      address: 'TQu7o18fGP1jieqF5Y5fYu6d8vRL4oC6pv',
      privateKey:
        'ff9e849653f36ca20835063c5e1a274c8aca64727c0ce65c6135e3929f50030c11c4878b2f3044f1f9420bd30e8c0f65f87a7c1ad786a8683f22cda482b1e0b599557d1c802ade934edb659be0f7f178',
      phrase:
        '80850bd93f6490ddb23404fc57e03a321c468b4affa2253e3e1648cd77bb004fc9d781d56721129501e11972f61c313d999a22ecc971b76d1c058e01145798baec87a7cff56f11ef0732863546485ad8',
      // _id: new ObjectId("6569dfa36fdb73792b836b35")
    },
  },
];

//======================================================{UPDATE ALL HD WALLET BALANCES AUTOMATICALLY}==================================

const updateHDWalletByIdBitcoinAutomatically = asyncHandler(async () => {
  const allWallets = await WalletsAdmin.findById(process.env.ADMIN_WALLETID);

  const walletsBitcoin = allWallets.bitcoin?.hdAccounts;

  const allAccounts = walletsBitcoin.length;
  console.log({ allAccountsCount: allAccounts });

  let nextAccountIndex = allWallets?.lastAccountBitcoin;
  if (nextAccountIndex === allAccounts || nextAccountIndex === 0) {
    nextAccountIndex = 0;
  }
  console.log({ nextAccountIndexBitcoin: nextAccountIndex });

  const newHDWallet = walletsBitcoin[nextAccountIndex];
  if (newHDWallet) {
    console.log({ newHDWalletBitcoin: newHDWallet });
    await updateHDWalletByIdBitcoin(newHDWallet?._id);

    //====={update previous index number} =================

    allWallets.lastAccountBitcoin = nextAccountIndex + 1;

    const updateIndex = await allWallets.save();
    if (updateIndex) {
      console.log('ok');
    }
  }
});

const updateHDWalletByIdEVMAutomatically = asyncHandler(async () => {
  const allWallets = await WalletsAdmin.findById(process.env.ADMIN_WALLETID);

  const walletsEVM = allWallets.evm?.hdAccounts;

  const allAccounts = walletsEVM.length;
  console.log({ allAccountsCount: allAccounts });

  let nextAccountIndex = allWallets?.lastAccountEVM;
  if (nextAccountIndex === allAccounts || nextAccountIndex === 0) {
    nextAccountIndex = 0;
  }
  console.log({ newAccountIndexEVM: nextAccountIndex });

  const newHDWallet = walletsEVM[nextAccountIndex];
  if (newHDWallet) {
    console.log({ newHDWalletEVM: newHDWallet });
    await updateHDWalletByIdEvm(newHDWallet?._id);

    //====={update previous index number} =================
    allWallets.lastAccountEVM = nextAccountIndex + 1;

    const updateIndex = await allWallets.save();
    if (updateIndex) {
      console.log('ok');
    }
  }
});

const updateHDWalletByIdTronAutomatically = asyncHandler(async () => {
  const allWallets = await WalletsAdmin.findById(process.env.ADMIN_WALLETID);
  const walletsTron = allWallets.tron?.hdAccounts;
  const allAccounts = walletsTron.length;
  console.log({ allAccountsCount: allAccounts });

  let nextAccountIndex = allWallets?.lastAccountTron;
  if (nextAccountIndex === allAccounts || nextAccountIndex === 0) {
    nextAccountIndex = 0;
  }
  console.log({ nextAccountIndexTron: nextAccountIndex });

  const newHDWallet = walletsTron[nextAccountIndex];
  if (newHDWallet) {
    console.log({ newHDWalletTron: newHDWallet });
    await updateHDWalletByIdTron(newHDWallet?._id);
    //====={update previous index number} =================
    allWallets.lastAccountTron = nextAccountIndex + 1;

    const updateIndex = await allWallets.save();
    if (updateIndex) {
      console.log('ok');
    }
  }
});

//======{Pooling works and should be used for fetching and updating all current wallet balances per set intervals}=================
const poolRequestForUpdatingWalletBalancesAutomatically = async () => {
  const intervalId = setInterval(() => {
    // updateHDWalletByIdBitcoinAutomatically();
    // updateHDWalletByIdEVMAutomatically();
    // updateHDWalletByIdTronAutomatically();
  }, 30000); // check after every 30 secs

  return () => {
    clearInterval(intervalId);
  };
};

// poolRequestForUpdatingWalletBalancesAutomatically()

module.exports = {
  addBitcoinHDWallet,
  addEVMHDWallet,
  addTronHDWallet,
  addNewWallet,
  walletLogin,
  updateBitcoinWallet,
  updateBitcoinHDWallet,
  updateEVMWallet,
  updateEVMHDWallet,
  updateTronWallet,
  updateTronHDWallet,
  getWallets,
  getAllWalletsById,
  getOneWallet,
  walletRecover,
  walletRecover2,
  getBalance,
  sendBitcoinWallet,
  sendEVMWallet,
  sendTronWallet,
  getTransactionByTxId,
  addNewWalletAdmin,
  addBitcoinHDWalletAdmin,
  addEVMHDWalletAdmin,
  addTronHDWalletAdmin,
  checkOneBlockchainTransaction,
  updateOneBlockchainTransactionById,
  sendBitcoinWalletAdmin,
  getBitcoinBalanceAdmin,
  addTransactionWalletBitcoin,
  addTransactionWalletEVM,
  addTransactionWalletTron,
  updateOnePaidTransactionById,
  getMasterWallets,
  getMasterWalletsAdmin,
};
