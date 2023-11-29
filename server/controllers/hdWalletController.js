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

  //  const result3 ={
  //   accountFromMnemonic: {
  //     mnemonic: e {
  //       phrase: 'strategy domain aspect mercy hotel table foot swarm arctic hazard endorse rare',
  //       password: '',
  //       wordlist: [o],
  //       entropy: '0xd6c81c35c5a6e3b9d6bedb0b2d3d2759'
  //     },
  //     privateKey: '0x3decd9424a2bfaefa84e36ce2fbdaa86c4ba5f7b6d37af614177f4886529fff1',
  //     publicKey: '0x043cc5f8fe67120a34500ea6212321c96851917c1cc0c65f8f8fa0f867121930ae7e3f1703bad511305601448cffd8069493531449658ee5ce1a8c3e895db08afd',
  //     address: 'TYWi3kxH9wXLZDDKUunQDuGmXt8bq4q3fM'
  //   }
  // }

  // console.log({fullNode: tronWeb})

  // const response=[
  //   {
  //     tronWebTrx: <ref *1> e {
  //       tronWeb: s {
  //         _events: Events <Complex prototype> {},
  //         _eventsCount: 0,
  //         event: [e],
  //         transactionBuilder: [e],
  //         trx: [Circular *1],
  //         plugin: [e],
  //         utils: [Object],
  //         fullNode: [e],
  //         solidityNode: [e],
  //         eventServer: [e],
  //         providers: [Object],
  //         BigNumber: [Function],
  //         defaultBlock: false,
  //         defaultPrivateKey: 'f48568daeaa884e82391c423189bb205654edb925524529757f7081696f78655',
  //         defaultAddress: [Object],
  //         sha3: [Function: value],
  //         toHex: [Function: value],
  //         toUtf8: [Function: value],
  //         fromUtf8: [Function: value],
  //         toAscii: [Function: value],
  //         fromAscii: [Function: value],
  //         toDecimal: [Function: value],
  //         fromDecimal: [Function: value],
  //         toSun: [Function: value],
  //         fromSun: [Function: value],
  //         toBigNumber: [Function: value],
  //         isAddress: [Function: value],
  //         createAccount: [Function (anonymous)],
  //         address: [Object],
  //         version: '5.3.0',
  //         createRandom: [Function: value],
  //         fromMnemonic: [Function: value],
  //         fullnodeVersion: '4.7.1',
  //         feeLimit: 150000000,
  //         injectPromise: [Function (anonymous)]
  //       },
  //       injectPromise: [Function (anonymous)],
  //       cache: { contracts: {} },
  //       validator: e { tronWeb: [s] }
  //     }
  //   }
  //   {
  //     tronWebTransactionBuilder: <ref *1> e {
  //       tronWeb: s {
  //         _events: Events <Complex prototype> {},
  //         _eventsCount: 0,
  //         event: [e],
  //         transactionBuilder: [Circular *1],
  //         trx: [e],
  //         plugin: [e],
  //         utils: [Object],
  //         fullNode: [e],
  //         solidityNode: [e],
  //         eventServer: [e],
  //         providers: [Object],
  //         BigNumber: [Function],
  //         defaultBlock: false,
  //         defaultPrivateKey: 'f48568daeaa884e82391c423189bb205654edb925524529757f7081696f78655',
  //         defaultAddress: [Object],
  //         sha3: [Function: value],
  //         toHex: [Function: value],
  //         toUtf8: [Function: value],
  //         fromUtf8: [Function: value],
  //         toAscii: [Function: value],
  //         fromAscii: [Function: value],
  //         toDecimal: [Function: value],
  //         fromDecimal: [Function: value],
  //         toSun: [Function: value],
  //         fromSun: [Function: value],
  //         toBigNumber: [Function: value],
  //         isAddress: [Function: value],
  //         createAccount: [Function (anonymous)],
  //         address: [Object],
  //         version: '5.3.0',
  //         createRandom: [Function: value],
  //         fromMnemonic: [Function: value],
  //         fullnodeVersion: '4.7.1',
  //         feeLimit: 150000000,
  //         injectPromise: [Function (anonymous)]
  //       },
  //       injectPromise: [Function (anonymous)],
  //       validator: e { tronWeb: [s] }
  //     }
  //   }
  //   {
  //     tronWebUtils: {
  //       isValidURL: [Function: isValidURL],
  //       isObject: [Function: isObject],
  //       isArray: [Function: isArray],
  //       isJson: [Function: isJson],
  //       isBoolean: [Function: isBoolean],
  //       isBigNumber: [Function: isBigNumber],
  //       isString: [Function: isString],
  //       isFunction: [Function: isFunction],
  //       isHex: [Function: isHex],
  //       isInteger: [Function: isInteger],
  //       hasProperty: [Function: hasProperty],
  //       hasProperties: [Function: hasProperties],
  //       mapEvent: [Function: mapEvent],
  //       parseEvent: [Function: parseEvent],
  //       padLeft: [Function: padLeft],
  //       isNotNullOrUndefined: [Function: isNotNullOrUndefined],
  //       sleep: [Function: sleep],
  //       code: Object [Module] {
  //         arrayEquals: [Getter],
  //         base64DecodeFromString: [Getter],
  //         base64EncodeToString: [Getter],
  //         bin2String: [Getter],
  //         byte2hexStr: [Getter],
  //         byteArray2hexStr: [Getter],
  //         bytesToString: [Getter],
  //         getStringType: [Getter],
  //         hexChar2byte: [Getter],
  //         hexStr2byteArray: [Getter],
  //         hextoString: [Getter],
  //         isHexChar: [Getter],
  //         isNumber: [Getter],
  //         strToDate: [Getter],
  //         stringToBytes: [Getter]
  //       },
  //       accounts: Object [Module] {
  //         generateAccount: [Getter],
  //         generateAccountWithMnemonic: [Getter],
  //         generateRandom: [Getter]
  //       },
  //       base58: Object [Module] { decode58: [Getter], encode58: [Getter] },
  //       bytes: Object [Module] {
  //         base64DecodeFromString: [Getter],
  //         base64EncodeToString: [Getter],
  //         byte2hexStr: [Getter],
  //         byteArray2hexStr: [Getter],
  //         bytesToString: [Getter],
  //         hextoString: [Getter]
  //       },
  //       crypto: Object [Module] {
  //         ECKeySign: [Getter],
  //         SHA256: [Getter],
  //         _signTypedData: [Getter],
  //         arrayToBase64String: [Getter],
  //         computeAddress: [Getter],
  //         decode58Check: [Getter],
  //         decodeBase58Address: [Getter],
  //         genPriKey: [Getter],
  //         getAddressFromPriKey: [Getter],
  //         getAddressFromPriKeyBase64String: [Getter],
  //         getBase58CheckAddress: [Getter],
  //         getBase58CheckAddressFromPriKeyBase64String: [Getter],
  //         getHexStrAddressFromPriKeyBase64String: [Getter],
  //         getPubKeyFromPriKey: [Getter],
  //         getRowBytesFromTransactionBase64: [Getter],
  //         isAddressValid: [Getter],
  //         passwordToAddress: [Getter],
  //         pkToAddress: [Getter],
  //         signBytes: [Getter],
  //         signTransaction: [Getter]
  //       },
  //       abi: Object [Module] {
  //         decodeParams: [Getter],
  //         decodeParamsV2ByABI: [Getter],
  //         encodeParams: [Getter],
  //         encodeParamsV2ByABI: [Getter]
  //       },
  //       message: Object [Module] {
  //         TRON_MESSAGE_PREFIX: [Getter],
  //         hashMessage: [Getter],
  //         signMessage: [Getter],
  //         verifyMessage: [Getter]
  //       },
  //       _TypedDataEncoder: [Function: e],
  //       transaction: Object [Module] {
  //         txCheck: [Getter],
  //         txCheckWithArgs: [Getter],
  //         txJsonToPb: [Getter],
  //         txJsonToPbWithArgs: [Getter],
  //         txPbToRawDataHex: [Getter],
  //         txPbToTxID: [Getter]
  //       },
  //       ethersUtils: Object [Module] {
  //         AbiCoder: [Getter],
  //         FormatTypes: [Getter],
  //         Interface: [Getter],
  //         Mnemonic: [Getter],
  //         SigningKey: [Getter],
  //         Wordlist: [Getter],
  //         arrayify: [Getter],
  //         concat: [Getter],
  //         ethersHDNodeWallet: [Getter],
  //         ethersWallet: [Getter],
  //         id: [Getter],
  //         isValidMnemonic: [Getter],
  //         joinSignature: [Getter],
  //         keccak256: [Getter],
  //         recoverAddress: [Getter],
  //         sha256: [Getter],
  //         splitSignature: [Getter],
  //         toUtf8Bytes: [Getter],
  //         toUtf8String: [Getter],
  //         wordlists: [Getter]
  //       }
  //     }
  //   }
  // {
  //   tronWebAddress: {
  //     fromHex: [Function: fromHex],
  //     toHex: [Function: toHex],
  //     fromPrivateKey: [Function: fromPrivateKey]
  //   }
  // }
  // ]
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

// getBitcoinTestBalance('mwZDqNNGFJLxEGWq2nHtqgUH1nm1dW2TYk')//balances: 7486 // 0.00007486 tBTC
// getBitcoinTestBalance('mjd6NPVrNugHXZioezadR5tiEsFsE2H3BN')//balances: 2000 // 0.00002tBTC
// getBitcoinTestBalance('n4qtagBJ9Wx5LfyGdeQQzJU52H7JSMQBqM') // balances: 0
//sender: tb1qr7x7yq9gytegnnfn6yp9sk9gxktsf79t7hext2
// receiver: mwZDqNNGFJLxEGWq2nHtqgUH1nm1dW2TYk
//expected amount: 0.0001

const createHDWalletOrder2 = asyncHandler(async (req, res) => {
  const { orderId, address, networkName } = req.body;

  const orders = Orders.findById(orderId);
  // Start monitoring the Bitcoin blockchain for transactions to this address
  // const network = networkName === 'testnet' ? bitcoin.networks.testnet : bitcoin.networks.bitcoin;

  // Use a Bitcoin API or your own full node to monitor transactions
  // You can use an API like Blockstream's Esplora API for testnet or mainnet
  let network;
  if (networkName === 'Testnet') {
    network = bitcoin.networks.testnet;
  } else {
    network = bitcoin.networks.bitcoin;
  }

  const esploraApiUrl = `https://blockstream.info/${network}/api/address/${address}/txs`;
  // const esploraApiUrl = `https://blockstream.info/${networkName}/api/address/${address}/txs`;

  const response = await axios.get(esploraApiUrl);
  if (response?.data) {
    const transactions = JSON.parse(response?.data);
    transactions.forEach(async (transaction) => {
      // Check if the transaction has received funds
      if (
        transaction.vout.some(
          (output) => output.scriptpubkey_address === address
        )
      ) {
        // Update order status in the database (e.g., mark the order as "paid")
        console.log(`Received payment in transaction ${transaction.txid}`);
        // ======================{Implement order status update logic here}===========================================
        orders.status = 'paid' || orders.status;
        await orders.save();
      }
    });
  }

  // const esploraApiUrl = `https://blockstream.info/${network}/api/address/${address}/txs`;
  // function pollForTransactions() {
  //   request(esploraApiUrl)
  //     .then((response) => {
  //       const transactions = JSON.parse(response);

  //       transactions.forEach(async (transaction) => {
  //         // Check if the transaction has received funds
  //         if (
  //           transaction.vout.some(
  //             (output) => output.scriptpubkey_address === address
  //           )
  //         ) {
  //           // Update order status in the database (e.g., mark the order as "paid")
  //           console.log(`Received payment in transaction ${transaction.txid}`);
  //           // ======================{Implement order status update logic here}===========================================
  //           orders.status = 'paid' || orders.status;
  //           await orders.save();
  //         }
  //       });
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching transactions:', error);
  //     });
  // }

  // Poll for transactions periodically (adjust the interval as needed)
  // setInterval(pollForTransactions, 60000); // every 60 seconds or 1 minute
  setInterval(response, 60000); // every 60 seconds or 1 minute
});

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
//TWo1bbdmV67hyL5747WMzSeD3uwW5P9tCa
//mmganfY9LWop4VevRiigyUhxcFNUm9No9b
const sendBitcoin = async () => {
  // const recieverAddress = 'mjd6NPVrNugHXZioezadR5tiEsFsE2H3BN';
  const recieverAddress = 'n3KzXkuLZdqhGYVn2kSFMarGWvrc7wEJ5d';

  const amountToSend = '0.00001';
  //0.0001
  try {
    const privateKey =
      'a9b904b94b966beb33f99845ee6b07c75bb1ac8364f0290481640cba2a113a17';
    const sourceAddress = 'mwZDqNNGFJLxEGWq2nHtqgUH1nm1dW2TYk';
    // const satoshiToSend = amountToSend * 100000000;
    const satoshiToSendRaw = Number(amountToSend) * 1e8;
    const satoshiToSend = Number(satoshiToSendRaw.toFixed(0));

    let fee = 0;
    let inputCount = 0;
    let outputCount = 2;

    // const recommendedFee = await axios.get(
    //   "https://bitcoinfees.earn.com/api/v1/fees/recommended"
    // );

    const transaction = new bitcore.Transaction();
    let totalAmountAvailable = 0;

    let inputs = [];
    const resp = await axios({
      method: 'GET',
      url: `https://blockstream.info/testnet/api/address/${sourceAddress}/utxo`,
    });
    const utxos = resp.data;

    for (const utxo of utxos) {
      let input = {};
      input.satoshis = utxo.value;
      input.script =
        bitcore.Script.buildPublicKeyHashOut(sourceAddress).toHex();
      input.address = sourceAddress;
      input.txId = utxo.txid;
      input.outputIndex = utxo.vout;
      totalAmountAvailable += utxo.value; // // current balance
      inputCount += 1;
      inputs.push(input);
    }

    console.log({ utxos: utxos }); // checking balance
    console.log({ totalAmountAvailable: totalAmountAvailable }); // checking balance

    console.log({ difference: totalAmountAvailable - satoshiToSend - fee });
    console.log({ inputs: inputs });
    console.log({ satoshiToSend: satoshiToSend }); //{ satoshiToSend: 1000.0000000000001 }

    /**
     * In a bitcoin transaction, the inputs contribute 180 bytes each to the transaction,
     * while the output contributes 34 bytes each to the transaction. Then there is an extra 10 bytes you add or subtract
     * from the transaction as well.
     * */

    const transactionSize =
      inputCount * 180 + outputCount * 34 + 10 - inputCount;

    // fee = transactionSize * recommendedFee.data.hourFee / 3; // satoshi per byte
    fee = transactionSize * 1; // 1 sat/byte is fine for testnet
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
    const result = await axios({
      method: 'POST',
      url: `https://blockstream.info/testnet/api/tx`,
      data: serializedTransaction,
    });
    console.log({ result: result.data });
    //result: 'cd5fae1389a17e2991d0329be79763db89fa19c92eccc2b2dd7f60b03f1f4186'
    //result: '3574728a269f852e403fd7c3759affa09dd326a9b28c4acf76e5ebf78da6d23a'
    return result.data;
  } catch (error) {
    console.log({ error: error });
    return error;
  }
};

// sendBitcoin()
//n1D2ddaAiBYrVvjWhDPiK1pn9ZVcMJBXWV
const sendTestBitcoinWalletTx = asyncHandler(async () => {
  console.log('BTC sending in progress');
  // let hdWallet = userWallets.bitcoin.hdMasterAccounts;
  // const receiver = 'mvDdqnRWf4FRnZT5pSf4FFftoPRYLbB5N1'; // blendery address [2]
  const receiver = 'n1D2ddaAiBYrVvjWhDPiK1pn9ZVcMJBXWV'; // blendery address
  //
  const amount = '0.00001';
  // const amount = '0.0001';
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
  //response: 'f98d1676b7bf6600e6331b880c8f8fe0534f2aaaa086e00bc6c0a34988a0dd33'
  //response: 'd347ef9d8600b94720e84d5657e2b146acbcd96ec417845b817fe5e8235babf5'
  // res.status(200).json(response);
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

//====={check specific order status on Bitcoin network}========================
const orderStatusBitcoin = async (order) => {
  let received = false;

  // Initialize Axios instance for making HTTP requests
  // const api = axios.create({
  //   baseURL: 'https://blockstream.info/api',
  // });

  //================={Testing Bitcoin network}========================
  const network = bitcoin.networks.testnet;
  //================={Production Bitcoin network}========================
  // const network = bitcoin.networks.bitcoin;

  // Initialize Axios instance for making HTTP requests
  const api = axios.create({
    baseURL: `https://blockstream.info/${network}/api`,
  });

  // mainnet
  // baseURL: 'https://blockstream.info/api',
  // testnet
  //   baseURL: 'https://blockstream.info/testnet/api',

  // Check for incoming transactions for each payment address
  const paymentStatus = await Promise.all(
    order.map(async (record) => {
      let address;

      if (record?.service === '') {
        address = record.address;
      }

      //=========================={Order Conditions}=======================================
      //==========={fToken}======================
      if (service === 'defi' && subService === 'defi') {
        address = record?.fToken?.address;
      }
      if (service === 'sell' && subService === 'sellCash') {
        address = record?.fToken?.address;
      }
      if (service === 'sell' && subService === 'sellCard') {
        address = record?.fToken?.address;
      }
      if (service === 'exchange' && subService === 'exchange') {
        address = record?.fToken?.address;
      }
      //==========={tToken}======================
      if (service === 'buy' && subService === 'buyCash') {
        address = record?.tToken?.address; // tToken
      }
      if (service === 'buy' && subService === 'buyCard') {
        address = record?.tToken?.address; // tToken
      }

      //=================================================================

      const response = await api.get(`/address/${address}/txs`);

      const transactions = response.data;

      // Calculate the total amount received
      const totalAmountReceived = transactions.reduce((total, tx) => {
        const outputs = tx.vout.filter(
          (output) => output.scriptpubkey_address === address
        );
        const receivedAmount = outputs.reduce(
          (amount, output) => amount + output.value,
          0
        );

        return total + receivedAmount;
      }, 0);

      if (totalAmountReceived > 0) {
        //==========={Update DB status}======================================
        order.status = 'Paid' || order.status;
        await order.save();
        return {
          status: 'Paid',
          amount: order?.amount,
          address,
          totalReceived: totalAmountReceived / 1e8, // Convert from satoshis to BTC
        };
      } else {
        return {
          status: 'Pending',
          amount: order?.amount,
          address,
          totalReceived: totalAmountReceived / 1e8, // Convert from satoshis to BTC
        };
      }
    })
  );

  return paymentStatus;
};
//====={check specific order status on Ethereum network}========================
const orderStatusEvm = async (order) => {
  // const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/your-infura-project-id'); // Replace with your Infura project ID

  let token;

  let receiver; // Replace with wallet A's address
  let sender; // Replace with wallet B's address

  //=========================={Order Conditions}=======================================
  //==========={fToken}======================
  if (service === 'defi' && subService === 'defi') {
    //we don't need to track it is handled by provider (oneInch)
    // token = record?.fToken;
    // sender = order?.userAddress;
    // sender = order?.userAddress;
    // receiver = 'oneInch Router';
    return;
  }
  if (service === 'sell' && subService === 'sellCash') {
    token = record?.fToken;
    sender = order?.userAddress;
    receiver = order?.blenderyAddress;
  }
  if (service === 'sell' && subService === 'sellCard') {
    token = record?.fToken;
    sender = order?.userAddress;
    receiver = order?.blenderyAddress;
  }
  if (service === 'exchange' && subService === 'exchange') {
    token = record?.fToken;
    sender = order?.userAddress;
    receiver = order?.blenderyAddress;
  }
  //==========={tToken}======================
  if (service === 'buy' && subService === 'buyCash') {
    token = record?.tToken; // tToken
    sender = order?.blenderyAddress;
    receiver = order?.userAddress;
  }
  if (service === 'buy' && subService === 'buyCard') {
    token = record?.tToken; // tToken
    sender = order?.blenderyAddress;
    receiver = order?.userAddress;
  }

  //=================================================================
  const verifyToken = await getNetworkRPC(token?.chainId);
  let networkRPC = verifyToken.networkRPC;
  const provider = new ethers.providers.JsonRpcProvider(networkRPC); // Replace with your Infura project ID

  //=================================================================
  // const receiver = order?.receiver; // Replace with wallet A's address
  // const sender = order?.userAddress; // Replace with wallet B's address

  const tokenAddress = token.address;
  const tokenDecimals = token.decimals;
  const tokenSymbol = token.symbol;
  // const amount = order?.amount;
  const amount = order?.fValue;

  if (tokenAddress != '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
    const expectedAmount = ethers.utils.parseEther(order?.amount); // Replace with the expected amount in Ether
    // const expectedAmount = ethers.utils.parseEther('1'); // Replace with the expected amount in Ether

    // Create a filter to monitor incoming transactions from wallet B to wallet A
    const filter = {
      address: receiver,
      topics: [
        ethers.utils.id('Transfer(address,address,uint256)'),
        null,
        sender,
      ],
    };

    provider.on(filter, async (log) => {
      try {
        const transactionHash = log.transactionHash;
        const transaction = await provider.getTransaction(transactionHash);

        // Check if the transaction value matches the expected amount
        if (transaction && transaction.value.eq(expectedAmount)) {
          console.log(
            `Received ${expectedAmount.toString()} Ether from ${sender} to ${receiver}`
          );
          // Perform further actions or handle the transaction as needed

          //==========={Update DB status}======================================
          return {
            status: 'Paid',
            from: sender,
            to: receiver,
            totalReceived: expectedAmount,
            isAmountMatched: true,
            transactionHash: transactionHash,
          };
        } else {
          return {
            status: 'Pending',
            from: sender,
            to: receiver,
            totalReceived: transaction.value,
            isAmountMatched: false,
          };
        }
      } catch (error) {
        console.error('Error processing incoming transaction:', error);
      }
    });
  } else {
    // Create a filter to monitor incoming USDT transfers from wallet B to wallet A
    // const expectedAmount = ethers.utils.parseUnits('100', 6); // Replace with the expected amount in USDT (e.g., 100 USDT)
    const expectedAmount = ethers.utils
      .parseUnits(amount.toString(), tokenDecimals.toString())
      .toString();

    const tokenContract = new ethers.Contract(
      tokenAddress,
      ['transfer(address,uint256)'],
      provider
    );
    tokenContract.on('Transfer', async (from, to, value, event) => {
      try {
        // Check if the transfer matches the expected amount and destination address

        if (to === receiver && from === sender && value.eq(expectedAmount)) {
          console.log(
            `Received ${ethers.utils.formatUnits(
              expectedAmount,
              tokenDecimals
            )} ${tokenSymbol} from ${sender} to ${receiver}`
          );
          // Perform further actions or handle the transaction as needed

          //==========={Update DB status}======================================
          return { status: 'Paid' };
        }
      } catch (error) {
        console.error('Error processing incoming USDT transfer:', error);
      }
    });
  }
};
//====={check specific order status on tron network}========================
const orderStatusTron = async (order) => {
  // Initialize Axios instance for making HTTP requests
  const api = axios.create({
    baseURL: 'https://api.trongrid.io',
  });

  let token;

  let receiver; // Replace with wallet A's address
  let sender; // Replace with wallet B's address

  //=========================={Order Conditions}=======================================
  //==========={fToken}======================
  if (service === 'defi' && subService === 'defi') {
    //we don't need to track it is handled by provider (oneInch)
    // token = record?.fToken;
    // sender = order?.userAddress;
    // sender = order?.userAddress;
    // receiver = 'oneInch Router';
    return;
  }
  if (service === 'sell' && subService === 'sellCash') {
    token = record?.fToken;
    sender = order?.userAddress;
    receiver = order?.blenderyAddress;
  }
  if (service === 'sell' && subService === 'sellCard') {
    token = record?.fToken;
    sender = order?.userAddress;
    receiver = order?.blenderyAddress;
  }
  if (service === 'exchange' && subService === 'exchange') {
    token = record?.fToken;
    sender = order?.userAddress;
    receiver = order?.blenderyAddress;
  }
  //==========={tToken}======================
  if (service === 'buy' && subService === 'buyCash') {
    token = record?.tToken; // tToken
    sender = order?.blenderyAddress;
    receiver = order?.userAddress;
  }
  if (service === 'buy' && subService === 'buyCard') {
    token = record?.tToken; // tToken
    sender = order?.blenderyAddress;
    receiver = order?.userAddress;
  }

  const tokenAddress = order?.fToken?.address;
  const tokenDecimals = order?.fToken?.decimals;
  const tokenSymbol = order?.fToken?.symbol;
  // const amount = order?.amount;
  const amount = order?.fToken?.fValue;

  if (tokenSymbol != 'TX') {
    // Get transactions sent from wallet B to wallet A
    const expectedAmount = Number(amount); // 100 // Replace with the expected amount in TRX
    const response = await api.get('/v1/accounts/txs', {
      params: {
        only_to: receiver,
        only_from: sender,
      },
    });

    const transactions = response.data.data;

    // Calculate the total amount received from wallet B to wallet A
    const totalAmountReceived = transactions.reduce((total, tx) => {
      return total + parseFloat(tx.amount);
    }, 0);

    // Check if the total amount received matches the expected amount
    const isAmountMatched = totalAmountReceived === expectedAmount;

    if (isAmountMatched) {
      //==========={Update DB status}======================================
      return {
        status: 'Paid',
        from: receiver,
        to: sender,
        totalReceived: totalAmountReceived / 1e6, // Convert from SUN to TRX
        isAmountMatched,
      };
    } else {
      return {
        status: 'Pending',
        from: receiver,
        to: sender,
        totalReceived: totalAmountReceived / 1e6, // Convert from SUN to TRX
        isAmountMatched,
      };
    }
  } else {
    // TRON full node endpoint (mainnet or testnet)
    // const expectedAmount = Number(amount) * 1000000; // 100 // Replace with the expected amount in SUN (e.g., 1000000 SUN)
    const expectedAmount = Number(amount) * 1e6; // 100 // Replace with the expected amount in SUN (e.g., 1000000 SUN)

    // USDT contract address on TRON (mainnet or testnet)
    // const usdtContractAddress = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t'; // Mainnet USDT contract address
    const usdtContractAddress = tokenAddress; // Mainnet USDT contract address

    // Create a filter to monitor incoming USDT transfers from wallet B to wallet A
    const eventFilter = {
      contractAddress: usdtContractAddress,
      eventName: 'Transfer',
      result: {
        to: receiver,
        from: sender,
        value: expectedAmount,
      },
    };

    // // Subscribe to the event
    // tronWeb.getEventResult(eventFilter, (error, events) => {
    //   if (error) {
    //     console.error('Error retrieving events:', error);
    //     return;
    //   }

    //   if (events.length > 0) {
    //     console.log(
    //       `Received ${expectedAmount} SUN (${tokenSymbol}) from ${sender} to ${receiver}`
    //     );
    //     // Perform further actions or handle the transaction as needed
    //     //==========={Update DB status}======================================
    //     return { status: 'paid' };
    //   }

    // });

    // Subscribe to the event
    let result = tronWeb.getEventResult(eventFilter, (error, events) => {
      if (error) {
        console.error('Error retrieving events:', error);
        return;
      }

      if (events.length > 0) {
        console.log(
          `Received ${expectedAmount} SUN (${tokenSymbol}) from ${sender} to ${receiver}`
        );
        // Perform further actions or handle the transaction as needed
        //==========={Update DB status}======================================
        return {
          status: 'Paid',
          from: receiver,
          to: sender,
          totalReceived: expectedAmount / 1e6, // Convert from SUN to TRX //check
          isAmountMatched: true, // check
        };
      }
    });
    return result;
  }
};

const orderStatusTronTest = async (order) => {
  // Initialize Axios instance for making HTTP requests
  // const api = axios.create({
  //   baseURL: 'https://api.trongrid.io',
  // });
  const api = axios.create({
    baseURL: 'https://nile.trongrid.io',
  });

  let token;

  let receiver = 'TWo1bbdmV67hyL5747WMzSeD3uwW5P9tCa'; // Replace with wallet A's address
  let sender = 'THFxGz1Pq5pyL7kdjZFwFqbP8zbBSLsYzE'; // Replace with wallet B's address

  //=========================={Order Conditions}=======================================
  //==========={fToken}======================
  // if (service === 'defi' && subService === 'defi') {
  //   //we don't need to track it is handled by provider (oneInch)
  //   return;
  // }
  // if (service === 'sell' && subService === 'sellCash') {
  //   token = record?.fToken;
  //   sender = order?.userAddress;
  //   receiver = order?.blenderyAddress;
  // }
  // if (service === 'sell' && subService === 'sellCard') {
  //   token = record?.fToken;
  //   sender = order?.userAddress;
  //   receiver = order?.blenderyAddress;
  // }
  // if (service === 'exchange' && subService === 'exchange') {
  //   token = record?.fToken;
  //   sender = order?.userAddress;
  //   receiver = order?.blenderyAddress;
  // }
  // //==========={tToken}======================
  // if (service === 'buy' && subService === 'buyCash') {
  //   token = record?.tToken; // tToken
  //   sender = order?.blenderyAddress;
  //   receiver = order?.userAddress;
  // }
  // if (service === 'buy' && subService === 'buyCard') {
  //   token = record?.tToken; // tToken
  //   sender = order?.blenderyAddress;
  //   receiver = order?.userAddress;
  // }
  //=========================={Order Conditions}=======================================

  const tokenAddress = '';
  const tokenDecimals = '';
  const tokenSymbol = 'TRX';
  // const amount = order?.amount;
  const amount = '50';

  if (tokenSymbol === 'TRX') {
    // Get transactions sent from wallet B to wallet A
    const expectedAmount = Number(amount); // 100 // Replace with the expected amount in TRX
    const response = await api.get('/v1/accounts/txs', {
      params: {
        only_to: receiver,
        only_from: sender,
      },
    });

    const transactions = response.data.data;

    // Calculate the total amount received from wallet B to wallet A
    const totalAmountReceived = transactions.reduce((total, tx) => {
      return total + parseFloat(tx.amount);
    }, 0);

    // Check if the total amount received matches the expected amount
    const isAmountMatched = totalAmountReceived === expectedAmount;

    if (isAmountMatched) {
      //==========={Update DB status}======================================
      return {
        status: 'Paid',
        from: receiver,
        to: sender,
        totalReceived: totalAmountReceived / 1e6, // Convert from SUN to TRX
        isAmountMatched,
      };
    } else {
      return {
        status: 'Pending',
        from: receiver,
        to: sender,
        totalReceived: totalAmountReceived / 1e6, // Convert from SUN to TRX
        isAmountMatched,
      };
    }
  } else {
    // TRON full node endpoint (mainnet or testnet)
    // const expectedAmount = Number(amount) * 1000000; // 100 // Replace with the expected amount in SUN (e.g., 1000000 SUN)
    const expectedAmount = Number(amount) * 1e6; // 100 // Replace with the expected amount in SUN (e.g., 1000000 SUN)

    // USDT contract address on TRON (mainnet or testnet)
    // const usdtContractAddress = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t'; // Mainnet USDT contract address
    const usdtContractAddress = tokenAddress; // Mainnet USDT contract address

    // Create a filter to monitor incoming USDT transfers from wallet B to wallet A
    const eventFilter = {
      contractAddress: usdtContractAddress,
      eventName: 'Transfer',
      result: {
        to: receiver,
        from: sender,
        value: expectedAmount,
      },
    };

    // // Subscribe to the event
    // tronWeb.getEventResult(eventFilter, (error, events) => {
    //   if (error) {
    //     console.error('Error retrieving events:', error);
    //     return;
    //   }

    //   if (events.length > 0) {
    //     console.log(
    //       `Received ${expectedAmount} SUN (${tokenSymbol}) from ${sender} to ${receiver}`
    //     );
    //     // Perform further actions or handle the transaction as needed
    //     //==========={Update DB status}======================================
    //     return { status: 'paid' };
    //   }

    // });

    // Subscribe to the event
    let result = tronWeb.getEventResult(eventFilter, (error, events) => {
      if (error) {
        console.error('Error retrieving events:', error);
        return;
      }

      if (events.length > 0) {
        console.log(
          `Received ${expectedAmount} SUN (${tokenSymbol}) from ${sender} to ${receiver}`
        );
        // Perform further actions or handle the transaction as needed
        //==========={Update DB status}======================================
        return {
          status: 'Paid',
          from: receiver,
          to: sender,
          totalReceived: expectedAmount / 1e6, // Convert from SUN to TRX //check
          isAmountMatched: true, // check
        };
      }
    });
    return result;
  }
};

//====={Update transaction by id internally after receiving blockchain update on the transaction status}=========
const updateTransactionByIdInternal = async (id, info) => {
  const transaction = await Transaction.findById(id);

  if (transaction) {
    transaction.status = info.status || transaction.status;
    transaction.totalReceived = info.status || transaction.status;
    transaction.isAmountMatched = info.status || transaction.status;
  }
  const updatedTransaction = await transaction.save();
  if (updatedTransaction) {
    console.log({ updatedTransaction: updatedTransaction });
    return updatedTransaction;
  }
};
const montitorBlockchainTransaction = async (req, res) => {
  let transactions = await Transaction.find({ status: 'Pending' });

  transactions.map(async (order) => {
    let statusBitcoin = await orderStatusBitcoin(order);
    let statusEvm = await orderStatusEvm(order);
    let statusTron = await orderStatusTron(order);
    if (statusBitcoin.status === 'Paid') {
      await updateTransactionByIdInternal(order._id, statusBitcoin);
    }
    if (statusEvm.status === 'Paid') {
      await updateTransactionByIdInternal(order._id, statusEvm);
    }
    if (statusTron.status === 'Paid') {
      await updateTransactionByIdInternal(order._id, statusTron);
    }
  });

  res.status(200).json(transactions);
};
//====={Montor all blockchain transactions at intervals : default here is every minute}========================
//======{Pooling works and should be used for fetching and updating all current market data per set intervals}=================
const poolRequestForAllBlockchainTransactions = async () => {
  const intervalId = setInterval(() => {
    montitorBlockchainTransaction();
  }, 60000); // check after every minute

  return () => {
    clearInterval(intervalId);
  };
};

const montitorBlockchainTransactionInternal = async () => {
  let transactions = await Transaction.find({ status: 'Pending' });

  transactions.map(async (order) => {
    let statusBitcoin = await orderStatusBitcoin(order);
    let statusEvm = await orderStatusEvm(order);
    let statusTron = await orderStatusTron(order);
    if (statusBitcoin.status === 'Paid') {
      await updateTransactionByIdInternal(order._id, statusBitcoin);
    }
    if (statusEvm.status === 'Paid') {
      await updateTransactionByIdInternal(order._id, statusEvm);
    }
    if (statusTron.status === 'Paid') {
      await updateTransactionByIdInternal(order._id, statusTron);
    }
  });

  const response = {
    transactions,
  };
  return response;
};

const checkBlockchain = async (id) => {
  let transactions = await Transaction.findById(id);

  transactions.map(async (order) => {
    // if(order?.chain === "Bitcoin"){

    // }
    let statusBitcoin = await orderStatusBitcoin(order);
    let statusEvm = await orderStatusEvm(order);
    let statusTron = await orderStatusTron(order);
    if (statusBitcoin.status === 'Paid') {
      await updateTransactionByIdInternal(order._id, statusBitcoin);
    }
    if (statusEvm.status === 'Paid') {
      await updateTransactionByIdInternal(order._id, statusEvm);
    }
    if (statusTron.status === 'Paid') {
      await updateTransactionByIdInternal(order._id, statusTron);
    }
  });

  const response = {
    transactions,
  };
  return response;
};

// activate to start pooling
//               ||
//               ||
//               ||
//               ||
//               vv

// poolRequestForAllBlockchainTransactions();

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

const getOneOrderStatusBitcoin = async (order) => {
  let received = false;
  let result;

  // Initialize Axios instance for making HTTP requests
  // const api = axios.create({
  //   baseURL: 'https://blockstream.info/api',
  // });
  // chainge from testnet in real transactions
  let network;
  if (order?.networkName === 'Testnet') {
    network = bitcoin.networks.testnet;
  } else {
    network = bitcoin.networks.bitcoin;
  }
  // Initialize Axios instance for making HTTP requests
  const api = axios.create({
    baseURL: `https://blockstream.info/${network}/api`,
  });

  // mainnet
  // baseURL: 'https://blockstream.info/api',
  // testnet
  //   baseURL: 'https://blockstream.info/testnet/api',

  // Check for incoming transactions for each payment address

  const address = order.address; // bitcoin receiver address
  const response = await api.get(`/address/${address}/txs`);

  const transactions = response.data;

  // Calculate the total amount received
  const totalAmountReceived = transactions.reduce((total, tx) => {
    const outputs = tx.vout.filter(
      (output) => output.scriptpubkey_address === address
    );
    const receivedAmount = outputs.reduce(
      (amount, output) => amount + output.value,
      0
    );

    return total + receivedAmount;
  }, 0);

  if (totalAmountReceived > 0) {
    //==========={Update DB status}======================================

    console.log({
      status: 'paid',
      amount: order?.amount,
      address,
      totalReceived: totalAmountReceived / 1e8, // Convert from satoshis to BTC
    });
  } else {
    console.log({
      status: 'pending',
      amount: order?.amount,
      address,
      totalReceived: totalAmountReceived / 1e8, // Convert from satoshis to BTC
    });
  }
};

const orderBTC = {};
// getOneOrderStatusBitcoin(orderBTC)

const orderEVM = {
  receiver: '0x2754897d2B0493Fd0463281e36db83BB202f6343',
  // sender: '0xE89f1B55964FF68a0dAC5eE6da9de64E8EcE3fC0',
  sender: '0x6fba12b1370499C5824E9383c445C3298D72501C',
  fToken: {
    address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    decimals: '18',
    symbol: 'ETH',
    chainId: '5',
    networkRPC: 'https://rpc.ankr.com/eth_goerli',
  },
  amount: '0.21',
};

const getOneOrderStatusEvm1 = async () => {
  const abi = erc20;
  const address = '0x2754897d2B0493Fd0463281e36db83BB202f6343';
  const wssEthereum = 'wss://go.getblock.io/3eca94e5b6f54129a425559e716f5187';

  var web3 = new Web3(new Web3.providers.WebsocketProvider(wssEthereum));

  let options = {
    topics: [web3.utils.sha3('Transfer(address,address,uint256)')],
  };

  let subscription = web3.eth.subscribe('logs', options);
  async function collectData(contract) {
    const [decimals, symbol] = await Promise.all([
      contract.methods.decimals.call(),
      contract.methods.symbol(),
    ]);
    return { decimals, symbol };
  }

  subscription.on('data', (event) => {
    if (event.topics.length == 3) {
      let transaction = web3.eth.abi.decodeLog(
        // [
        //   {
        //     type: 'address',
        //     name: 'from',
        //     indexed: true,
        //   },
        //   {
        //     type: 'address',
        //     name: 'to',
        //     indexed: true,
        //   },
        //   {
        //     type: 'unit256',
        //     name: 'value',
        //     indexed: false,
        //   },
        // ],
        [
          {
            indexed: true,
            name: 'from',
            type: 'address',
          },
          {
            indexed: true,
            name: 'to',
            type: 'address',
          },
          {
            indexed: false,
            name: 'value',
            type: 'uint256',
          },
        ],
        event.data,
        [event.topics[1], event.topics[2], event.topics[3]]
      );

      const contract = new web3.eth.Contract(abi, event.address);
      collectData(contract).then((contractData) => {
        const unit = Object.keys(web3.utils.unitMap).find(
          (key) =>
            web3.utils.unitMap[key] ===
            web3.utils
              .toBN(10)
              .pow(web3.utils.toBN(contractData.decimals))
              .toString()
        );
        if (transaction.from == address) {
          console.log(
            `Transfer of ${web3.utils.fromWei(transaction.value, unit)} ${
              contractData.symbol
            } from ${transaction.from} to ${transaction.to}`
          );
        }
      });
    }
  });

  subscription.on('error', (err) => {
    throw err;
  });

  subscription.on('connected', (msg) =>
    console.log('subscribed on ERC-20 started with ID %s', msg)
  );
};

// getOneOrderStatusEvm1()

const getOneOrderStatusEvm2 = async (order) => {
  // const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/your-infura-project-id'); // Replace with your Infura project ID
  const verifyToken = await getNetworkRPC(order?.fToken?.chainId);
  let networkRPC = verifyToken.networkRPC;
  const provider = new ethers.providers.JsonRpcProvider(networkRPC); // Replace with your Infura project ID

  //=================================================================
  const receiver = order?.receiver; // Replace with wallet A's address
  const sender = order?.sender; // Replace with wallet B's address

  const tokenAddress = order?.fToken?.address;
  const tokenDecimals = order?.fToken?.decimals;
  const tokenSymbol = order?.fToken?.symbol;
  const amount = order?.amount;

  const expectedAmount = ethers.utils.parseEther(order?.amount); // Replace with the expected amount in Ether
  // const expectedAmount = ethers.utils.parseEther('1'); // Replace with the expected amount in Ether

  // Create a filter to monitor incoming transactions from wallet B to wallet A
  // const filter = {
  //   address: receiver,
  //   topics: [
  //     ethers.utils.id('Transfer(address,address,uint256)'),
  //     null,
  //     sender,
  //   ],
  // };

  const filter = {
    address: receiver,
    topics: [ethers.utils.id('Transfer(address,address,uint256)')],
  };
  console.log('started');
  provider.on(filter, async (log) => {
    try {
      const transactionHash = log.transactionHash;
      const transaction = await provider.getTransaction(transactionHash);
      console.log(transaction);

      // Check if the transaction value matches the expected amount
      if (transaction && transaction.value.eq(expectedAmount)) {
        console.log(
          `Received ${expectedAmount.toString()} Ether from ${sender} to ${receiver}`
        );
        // Perform further actions or handle the transaction as needed

        //==========={Update DB status}======================================
        const response = {
          status: 'paid',
          from: receiver,
          to: sender,
          expectedAmount,
          totalReceived: expectedAmount,
          isAmountMatched: true,
          transactionHash: transactionHash,
        };
        console.log(response);
      } else {
        const response = {
          status: 'pending',
          from: receiver,
          to: sender,
          expectedAmount,
          totalReceived: transaction.value,
          isAmountMatched: false,
        };
        console.log(response);
      }
    } catch (error) {
      console.error('Error processing incoming transaction:', error);
    }
  });
};

// getOneOrderStatusEvm2(orderEVM);
//====={check specific order status on Ethereum network}========================
const getOneOrderStatusEvm = async (order) => {
  // const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/your-infura-project-id'); // Replace with your Infura project ID
  const verifyToken = await getNetworkRPC(order?.fToken?.chainId);
  let networkRPC = verifyToken.networkRPC;
  const provider = new ethers.providers.JsonRpcProvider(networkRPC); // Replace with your Infura project ID

  //=================================================================
  const receiver = order?.receiver; // Replace with wallet A's address
  const sender = order?.sender; // Replace with wallet B's address

  const tokenAddress = order?.fToken?.address;
  const tokenDecimals = order?.fToken?.decimals;
  const tokenSymbol = order?.fToken?.symbol;
  const amount = order?.amount;
  if (tokenAddress == '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
    const expectedAmount = ethers.utils.parseEther(order?.amount); // Replace with the expected amount in Ether
    // const expectedAmount = ethers.utils.parseEther('1'); // Replace with the expected amount in Ether

    // Create a filter to monitor incoming transactions from wallet B to wallet A
    const filter = {
      address: receiver,
      topics: [
        ethers.utils.id('Transfer(address,address,uint256)'),
        null,
        sender,
      ],
    };

    provider.on(filter, async (log) => {
      try {
        const transactionHash = log.transactionHash;
        const transaction = await provider.getTransaction(transactionHash);

        // Check if the transaction value matches the expected amount
        if (transaction && transaction.value.eq(expectedAmount)) {
          console.log(
            `Received ${expectedAmount.toString()} Ether from ${sender} to ${receiver}`
          );
          // Perform further actions or handle the transaction as needed

          //==========={Update DB status}======================================
          const response = {
            status: 'paid',
            from: receiver,
            to: sender,
            expectedAmount,
            totalReceived: expectedAmount,
            isAmountMatched: true,
            transactionHash: transactionHash,
          };
          console.log(response);
        } else {
          const response = {
            status: 'pending',
            from: receiver,
            to: sender,
            expectedAmount,
            totalReceived: transaction.value,
            isAmountMatched: false,
          };
          console.log(response);
        }
      } catch (error) {
        console.error('Error processing incoming transaction:', error);
      }
    });
  } else {
    // Create a filter to monitor incoming USDT transfers from wallet B to wallet A
    // const expectedAmount = ethers.utils.parseUnits('100', 6); // Replace with the expected amount in USDT (e.g., 100 USDT)
    const expectedAmount = ethers.utils
      .parseUnits(amount.toString(), tokenDecimals.toString())
      .toString();

    const tokenContract = new ethers.Contract(
      tokenAddress,
      ['transfer(address,uint256)'],
      provider
    );
    tokenContract.on('Transfer', async (from, to, value, event) => {
      try {
        // Check if the transfer matches the expected amount and destination address

        if (to === receiver && from === sender && value.eq(expectedAmount)) {
          console.log(
            `Received ${ethers.utils.formatUnits(
              expectedAmount,
              tokenDecimals
            )} ${tokenSymbol} from ${sender} to ${receiver}`
          );

          const response = {
            status: 'paid',
            from: receiver,
            to: sender,
            expectedAmount,
            totalReceived: value,
            isAmountMatched: false,
          };
          console.log(response);
          // Perform further actions or handle the transaction as needed

          //==========={Update DB status}======================================
          // return { status: 'paid' };
        }
      } catch (error) {
        console.error('Error processing incoming USDT transfer:', error);
      }
    });
  }
};

// const orderEVM = {};
// getOneOrderStatusEvm(orderEVM);
//==={Accepted}=================================================
const checkETh1 = async () => {
  // const walletAddress = '0x2754897d2B0493Fd0463281e36db83BB202f6343';
  const walletAddress = '0x6fba12b1370499C5824E9383c445C3298D72501C';

  let txChecker = new TransactionChecker(walletAddress);

  // const intervalId = setInterval(() => {
  //   txChecker.checkBlock();
  // }, 60000); // check after every minute

  // return () => {
  //   clearInterval(intervalId);
  // };
  setInterval(() => {
    txChecker.checkBlock();
  }, 15 * 1000);
  // }, 60 * 1000);
};

// checkETh1();

const checkETh = async () => {
  const walletAddress = '0x2754897d2B0493Fd0463281e36db83BB202f6343';
  let txChecker = new TransactionChecker(walletAddress);
  txChecker.subscribe('pendingTransactions');
  txChecker.watchTransactions();
};

// checkETh();

const checkEth6 = async () => {
  const networkRPCEth = 'https://cloudflare-eth.com';
  const networkRPCGoerliEth = 'https://rpc.ankr.com/eth_goerli';
  const rpcGoreli = 'https://go.getblock.io/1e391968bab843c1bf3f3c42181942b0';

  const address = '0x2754897d2B0493Fd0463281e36db83BB202f6343';
  const wssEthereum = 'wss://go.getblock.io/3eca94e5b6f54129a425559e716f5187';

  var web3 = new Web3(new Web3.providers.WebsocketProvider(wssEthereum));
  var subscription = web3.eth.subscribe(
    'logs',
    {
      address: address,
      topics: [address],
    },
    function (error, result) {
      if (!error) console.log(result);
    }
  );

  // unsubscribes the subscription
  subscription.unsubscribe(function (error, success) {
    if (success) console.log('Successfully unsubscribed!');
  });
};
// checkEth6()

// curl --location --request POST 'https://trx.getblock.io/mainnet/fullnode/jsonrpc' \

// --header 'Content-Type: application/json' \
// --data-raw '{"jsonrpc": "2.0",
// "method": "eth_blockNumber",
// "params": [],
// "id": "getblock.io"}'

//====={check specific order status on tron network}========================
const getOneOrderStatusTron = async (order) => {
  // Initialize Axios instance for making HTTP requests
  const api = axios.create({
    baseURL: 'https://api.trongrid.io',
  });

  //=================================================================

  //=================================================================
  const receiver = order?.receiver; // Replace with wallet A's address
  const sender = order?.sender; // Replace with wallet B's address

  const tokenAddress = order?.tokenAddress;
  const tokenDecimals = order?.tokenDecimals;
  const tokenSymbol = order?.tokenSymbol;
  const amount = order?.amount;

  if (tokenSymbol != 'TX') {
    // Get transactions sent from wallet B to wallet A
    const expectedAmount = Number(amount); // 100 // Replace with the expected amount in TRX
    const response = await api.get('/v1/accounts/txs', {
      params: {
        only_to: receiver,
        only_from: sender,
      },
    });

    const transactions = response.data.data;

    // Calculate the total amount received from wallet B to wallet A
    const totalAmountReceived = transactions.reduce((total, tx) => {
      return total + parseFloat(tx.amount);
    }, 0);

    // Check if the total amount received matches the expected amount
    const isAmountMatched = totalAmountReceived === expectedAmount;

    if (isAmountMatched) {
      //==========={Update DB status}======================================
      const result = {
        status: 'paid',
        from: receiver,
        to: sender,
        totalReceived: totalAmountReceived / 1e6, // Convert from SUN to TRX
        isAmountMatched,
      };
      console.log(result);
    } else {
      const result = {
        status: 'pending',
        from: receiver,
        to: sender,
        totalReceived: totalAmountReceived / 1e6, // Convert from SUN to TRX
        isAmountMatched,
      };
      console.log(result);
    }
  } else {
    // TRON full node endpoint (mainnet or testnet)
    // const expectedAmount = Number(amount) * 1000000; // 100 // Replace with the expected amount in SUN (e.g., 1000000 SUN)
    const expectedAmount = Number(amount) * 1e6; // 100 // Replace with the expected amount in SUN (e.g., 1000000 SUN)

    // USDT contract address on TRON (mainnet or testnet)
    // const usdtContractAddress = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t'; // Mainnet USDT contract address
    const usdtContractAddress = tokenAddress; // Mainnet USDT contract address

    // Create a filter to monitor incoming USDT transfers from wallet B to wallet A
    const eventFilter = {
      contractAddress: usdtContractAddress,
      eventName: 'Transfer',
      result: {
        to: receiver,
        from: sender,
        value: expectedAmount,
      },
    };

    // // Subscribe to the event
    // tronWeb.getEventResult(eventFilter, (error, events) => {
    //   if (error) {
    //     console.error('Error retrieving events:', error);
    //     return;
    //   }

    //   if (events.length > 0) {
    //     console.log(
    //       `Received ${expectedAmount} SUN (${tokenSymbol}) from ${sender} to ${receiver}`
    //     );
    //     // Perform further actions or handle the transaction as needed
    //     //==========={Update DB status}======================================
    //     return { status: 'paid' };
    //   }

    // });

    // Subscribe to the event
    let result = tronWeb.getEventResult(eventFilter, (error, events) => {
      if (error) {
        console.error('Error retrieving events:', error);
        return;
      }

      if (events.length > 0) {
        console.log(
          `Received ${expectedAmount} SUN (${tokenSymbol}) from ${sender} to ${receiver}`
        );
        // Perform further actions or handle the transaction as needed
        //==========={Update DB status}======================================
        return {
          status: 'paid',
          from: receiver,
          to: sender,
          totalReceived: expectedAmount / 1e6, // Convert from SUN to TRX //check
          isAmountMatched: true, // check
        };
      }
    });
    console.log(result);
    return result;
  }
};

const orderTron = {};
// getOneOrderStatusTron(orderTron)

const getEthTransaction2 = async (address) => {
  // const Web3 = require('web3');

  const networkRPCEth = 'https://cloudflare-eth.com';
  const networkRPCGoerliEth = 'https://rpc.ankr.com/eth_goerli';

  // const web3 = new Web3(
  //   // new Web3.providers.HttpProvider(`http://127.0.0.1:8545`)
  //   new Web3.providers.HttpProvider(`http://127.0.0.1:4000`)
  // );

  // const web3 = new Web3(
  //   // new Web3.providers.HttpProvider(`http://127.0.0.1:8545`)
  //   new Web3.providers.JsonRpcProvider(networkRPCEth)
  // );
  // const provider = new ethers.providers.JsonRpcProvider(networkRPC); // default is ethereum homestead

  // var web3 = new Web3("https://eth-mainnet.alchemyapi.io/v2/your-api-key");

  const web3 = new Web3(networkRPCGoerliEth);
  console.log(web3.eth.accounts);

  // var myAddr = '0xdb62d39ab4d6eb76138b2d91e2680233125916e5';
  var myAddr = address;
  var currentBlock = web3.eth.blockNumber;
  var n = web3.eth.getTransactionCount(myAddr, currentBlock);
  var bal = web3.eth.getBalance(myAddr, currentBlock);
  for (var i = currentBlock; i >= 0 && (n > 0 || bal > 0); --i) {
    try {
      var block = eth.getBlock(i, true);
      if (block && block.transactions) {
        {
          block.transactions.forEach(function (e) {
            if (myAddr == e.from) {
              if (e.from != e.to) {
                bal = bal.plus(e.value);
                console.log(i, e.from, e.to, e.value.toString(10));
                --n;
              }
              if ((myAddr = e.to)) {
                if (e.from != e.to) bal = bal.minus(e.value);
                console.log(i, e.from, e.to, e.value.toString(10));
              }
            }
          });
        }
      }
    } catch (e) {
      console.error('Error for block ' + i, e);
    }
  }
};

const addressEVM1 = '0xdb62d39ab4d6eb76138b2d91e2680233125916e5';
const addressEVM2 = '0x2754897d2B0493Fd0463281e36db83BB202f6343';

// getEthTransaction2(addressEVM2)

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
async function sendNativeToken() {
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

const sendToken = asyncHandler(async () => {
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

// sendToken()

/********************************************************************************************************************** */
/********************************************************************************************************************** */
/*********************************************     GET BLOCKS    *************************************************** */
/********************************************************************************************************************** */
/********************************************************************************************************************** */

const geBlockAPI = async ({ userData, url, method }) => {
  try {
    const response = await axios(url, {
      method: method ? method : 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: userData,
    });
    const updatedResponse = response.data;
    console.log(updatedResponse);
    return updatedResponse;
  } catch (error) {
    console.log(error);
  }
};

//https://go.getblock.io/67683fa7c6c34f2e88445f4a844c16ec
const api_key = '67683fa7c6c34f2e88445f4a844c16ec';
// const url = 'https://eth.getblock.io/mainnet/';
// const url = 'https://eth.getblock.io/mainnet/';
const url = `https://eth.getblock.io/${api_key}/mainnet/`;
const userData = {
  jsonrpc: '2.0',
  method: 'eth_getBalance',
  params: ['0xfe3b557e8fb62b89f4916b721be55ceb828dbd73', 'latest'],
  id: 'getblock.io',
};
const method = 'POST';

// geBlockAPI({ userData: userData, url: url, method: method });
// curl --location --request POST 'https://go.getblock.io/<ACCESS-TOKEN>/fullnode/jsonrpc' \
const url2 = `https://go.getblock.io/6e0ae8689fd34c8e9dc03db6321a17df/fullnode/jsonrpc`;
const userData2 = {
  jsonrpc: '2.0',
  method: 'eth_blockNumber',
  params: [],
  id: 'getblock.io',
};

// geBlockAPI({ userData: userData2, url: url2, method: method });

//const toPCS = '0x10ED43C718714eb63d5aA57B78B54704E256024E';

async function mempool() {
  const networkRPC = 'https://cloudflare-eth.com';
  const networkRPCGoerl = 'https://rpc.ankr.com/eth_goerli';
  const wssEthereum = 'wss://go.getblock.io/3eca94e5b6f54129a425559e716f5187';
  // const provider = new ethers.providers.JsonRpcProvider(networkRPC); // default is ethereum homestead

  // const provider = new ethers.providers.WebSocketProvider("wss://ws-nd-455-693-912.p2pify.com/ab870a782db1a62584325ff3edecb044");
  const provider = new ethers.providers.WebSocketProvider(wssEthereum);
  // console.log({provider: provider})
  provider.on('pending', async (tx) => {
    const txInfo = await provider.getTransaction(tx);
    console.log({ txInfo: txInfo });
    // try{
    //   console.log(ethers.utils.formatEther(txInfo.gasLimit))

    // }
    // catch{
    //     console.log("no data to show")
    // }
  });
}

// mempool()

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
// getNativeBalanceTro()

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
const updateOneBlockchainTransactionByIdOriginal = async (req, res) => {
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
  createHDWalletOrder2,
  sendBitcoinWallet,
  sendEVMWallet,
  sendTronWallet,
  getTransactionByTxId,
  addNewWalletAdmin,
  addBitcoinHDWalletAdmin,
  addEVMHDWalletAdmin,
  addTronHDWalletAdmin,
  montitorBlockchainTransactionInternal,
  checkBlockchain,
  checkOneBlockchainTransaction,
  updateOneBlockchainTransactionById,
};
