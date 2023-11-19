const User = require('../models/User.js');
const erc20 = require('./wallet/contracts/erc20.js');
const Wallets = require('../models/Wallets.js');
//=================={ethers library}===============================================
const { ethers } = require('ethers');
const { utils } = ethers;
const { SigningKey } = require('@ethersproject/signing-key');
const asyncHandler = require('express-async-handler');

//===================={UserTokens}=========================================
const UserTokensArbitrum = require('../models/ChainsUser/UserTokensArbitrum.js');
const UserTokensAurora = require('../models/ChainsUser/UserTokensAurora.js');
const UserTokensAvalanche = require('../models/ChainsUser/UserTokensAvalanche.js');
const UserTokensBinance = require('../models/ChainsUser/UserTokensBinance.js');
const UserTokensEthereum = require('../models/ChainsUser/UserTokensEthereum.js');
const UserTokensFantom = require('../models/ChainsUser/UserTokensFantom.js');
const UserTokensGnosis = require('../models/ChainsUser/UserTokensGnosis.js');
const UserTokensKlaytn = require('../models/ChainsUser/UserTokensKlaytn.js');
const UserTokensOptimism = require('../models/ChainsUser/UserTokensOptimism.js');
const UserTokensPolygon = require('../models/ChainsUser/UserTokensPolygon.js');
const UserTokensBinanceTestnet = require('../models/ChainsUser/UserTokensBinanceTestnet.js');
const UserTokensGoerliEth = require('../models/ChainsUser/UserTokensGoerliEth.js');
const UserTokensPolygonMumbai = require('../models/ChainsUser/UserTokensPolygonMumbai.js');

//=====================================================================================




const ERC20Abi = erc20;

//==============={Chains data}==================================

const userTokensChecker = async ({
  userId,
  userWalletId,
  address,
  chainId,
}) => {
  // const { userWalletId, address, chainId } = req.body;

  let userToken = {};
  let isAvailable = false;
  let networkRPC = '';
  let decimals = '';

  let userWallets = await Wallets.findOne({
    user: userId,
    _id: userWalletId,
  }).exec();

  console.log('userWallets:', userWallets);

  let activeWallet = userWallets;

  let key = userWallets.key;
  // console.log("key:", key)

  // let walletAddress = userWallets.walletAddress;
  let walletAddressFormmated = JSON.stringify(activeWallet.walletAddress);
  //==========={get Privatekey}=========================================================
  let privateKeyFormmated = JSON.stringify(key.privateKey, undefined, 2);
  let privateKey = privateKeyFormmated.replace(/^["'](.+(?=["']$))["']$/, '$1');

  let walletAddress = walletAddressFormmated.replace(
    /^["'](.+(?=["']$))["']$/,
    '$1'
  );

  switch (chainId) {
    //MAINNETS
    //Arbitrum
    case '42161':
      networkRPC = 'https://goerli-rollup.arbitrum.io/rpc';
      userToken = await UserTokensArbitrum.findOne({
        walletId: userWalletId,
        address: address,
      });

      if (userToken) {
        isAvailable = true;
        decimals = userToken.decimals;
      }

      break;

    //Aurora
    case '1313161554':
      networkRPC = 'https://mainnet.aurora.dev';
      userToken = await UserTokensAurora.findOne({
        walletId: userWalletId,
        address: address,
      });

      if (userToken) {
        isAvailable = true;
        decimals = userToken.decimals;
      }
      break;

    //Avalanche
    case '43114':
      networkRPC = 'https://api.avax.network/ext/bc/C/rpc';
      userToken = await UserTokensAvalanche.findOne({
        walletId: userWalletId,
        address: address,
      });

      if (userToken) {
        isAvailable = true;
        decimals = userToken.decimals;
      }

      break;

    //Binance
    case '56':
      networkRPC = 'https://rpc.ankr.com/bsc';
      userToken = await UserTokensBinance.findOne({
        walletId: userWalletId,
        address: address,
      });

      if (userToken) {
        isAvailable = true;
        decimals = userToken.decimals;
      }

      break;

    //ETH
    case '1':
      networkRPC = 'https://cloudflare-eth.com';
      userToken = await UserTokensEthereum.findOne({
        walletId: userWalletId,
        address: address,
      });

      if (userToken) {
        isAvailable = true;
        decimals = userToken.decimals;
      }

      break;

    //Fantom
    case '250':
      networkRPC = 'https://rpc.ankr.com/fantom/';
      userToken = await UserTokensFantom.findOne({
        walletId: userWalletId,
        address: address,
      });

      if (userToken) {
        isAvailable = true;
        decimals = userToken.decimals;
      }

      break;

    //Gnosis
    case '100':
      networkRPC = 'https://rpc.gnosischain.com/';
      userToken = await UserTokensGnosis.findOne({
        walletId: userWalletId,
        address: address,
      });

      if (userToken) {
        isAvailable = true;
        decimals = userToken.decimals;
      }
      break;

    //Klaytn
    case '8217':
      networkRPC = 'https://rpc.ankr.com/klaytn';
      userToken = await UserTokensKlaytn.findOne({
        walletId: userWalletId,
        address: address,
      });

      if (userToken) {
        isAvailable = true;
        decimals = userToken.decimals;
      }

      break;

    //Optimism
    case '10':
      networkRPC = 'https://mainnet.optimism.io';
      userToken = await UserTokensOptimism.findOne({
        walletId: userWalletId,
        address: address,
      });

      if (userToken) {
        isAvailable = true;
        decimals = userToken.decimals;
      }

      break;

    //Polygon
    case '137':
      networkRPC = 'https://polygon-rpc.com';
      userToken = await UserTokensPolygon.findOne({
        walletId: userWalletId,
        address: address,
      });

      if (userToken) {
        isAvailable = true;
        decimals = userToken.decimals;
      }

      break;

    //================================{TESTNETS}=====================================
    //PolygonMumbai
    case '80001':
      networkRPC = 'https://matic-mumbai.chainstacklabs.com';
      userToken = await UserTokensPolygonMumbai.findOne({
        walletId: userWalletId,
        address: address,
      });

      if (userToken) {
        isAvailable = true;
        decimals = userToken.decimals;
      }

      break;

    //GoerliEth

    case '5':
      networkRPC = 'https://rpc.ankr.com/eth_goerli';
      userToken = await UserTokensGoerliEth.findOne({
        walletId: userWalletId,
        address: address,
      });

      if (userToken) {
        isAvailable = true;
        decimals = userToken.decimals;
      }

      break;

    //BinanceTestnet

    case '97':
      networkRPC = 'https://data-seed-prebsc-1-s1.binance.org:8545/';
      userToken = await UserTokensBinanceTestnet.findOne({
        walletId: userWalletId,
        address: address,
      });

      if (userToken) {
        isAvailable = true;
        decimals = userToken.decimals;
      }

      break;

    default:
      console.warn('Please choose a token!');
      break;
  }

  console.log('isAvailable:', isAvailable);
  console.log('networRPC:', networkRPC);

  //========{Formatting networkRPC Output}=================================
  let networkRPCToJson = JSON.stringify(networkRPC);
  let networkRPCFormatted = networkRPCToJson.replace(
    /^["'](.+(?=["']$))["']$/,
    '$1'
  );
  //========{Formatting decimals Output}=================================
  let decimalsToJson = JSON.stringify(decimals);
  let decimalsFormatted = decimalsToJson.replace(
    /^["'](.+(?=["']$))["']$/,
    '$1'
  );

  let response = {
    isAvailable: isAvailable,
    token: JSON.stringify(userToken),
    networkRPC: networkRPCFormatted,
    privateKey,
    walletAddress,
    decimals: decimalsFormatted,
  };

  return response;

  // res.status(200).json({ status: isAvailable, token: userToken });
};

// const userTokensChecker = async ({
//   userId,
//   userWalletId,
//   address,
//   chainId,
// }) => {
//   // const { userWalletId, address, chainId } = req.body;

//   let userToken = {};
//   let isAvailable = false;
//   let networkRPC = '';
//   let decimals = '';

//   const userWallets = await Wallets.findOne({
//     user: userId,
//     _id: userWalletId,
//   }).exec();
//   let activeWallet = userWallets;
//   let key = activeWallet.key;

//   // let walletAddress = userWallets.walletAddress;
//   let walletAddressFormmated = JSON.stringify(activeWallet.walletAddress);
//   //==========={get Privatekey}=========================================================
//   let privateKeyFormmated = JSON.stringify(key.privateKey, undefined, 2);
//   let privateKey = privateKeyFormmated.replace(/^["'](.+(?=["']$))["']$/, '$1');

//   let walletAddress = walletAddressFormmated.replace(
//     /^["'](.+(?=["']$))["']$/,
//     '$1'
//   );

//   switch (chainId) {
//     //MAINNETS
//     //Arbitrum
//     case '42161':
//       networkRPC = 'https://goerli-rollup.arbitrum.io/rpc';
//       userToken = await UserTokensArbitrum.findOne({
//         walletId: userWalletId,
//         address: address,
//       });

//       if (userToken) {
//         isAvailable = true;
//         decimals = userToken.decimals;
//       }

//       break;

//     //Aurora
//     case '1313161554':
//       networkRPC = 'https://mainnet.aurora.dev';
//       userToken = await UserTokensAurora.findOne({
//         walletId: userWalletId,
//         address: address,
//       });

//       if (userToken) {
//         isAvailable = true;
//         decimals = userToken.decimals;
//       }
//       break;

//     //Avalanche
//     case '43114':
//       networkRPC = 'https://api.avax.network/ext/bc/C/rpc';
//       userToken = await UserTokensAvalanche.findOne({
//         walletId: userWalletId,
//         address: address,
//       });

//       if (userToken) {
//         isAvailable = true;
//         decimals = userToken.decimals;
//       }

//       break;

//     //Binance
//     case '56':
//       networkRPC = 'https://rpc.ankr.com/bsc';
//       userToken = await UserTokensBinance.findOne({
//         walletId: userWalletId,
//         address: address,
//       });

//       if (userToken) {
//         isAvailable = true;
//         decimals = userToken.decimals;
//       }

//       break;

//     //ETH
//     case '1':
//       networkRPC = 'https://cloudflare-eth.com';
//       userToken = await UserTokensEthereum.findOne({
//         walletId: userWalletId,
//         address: address,
//       });

//       if (userToken) {
//         isAvailable = true;
//         decimals = userToken.decimals;
//       }

//       break;

//     //Fantom
//     case '250':
//       networkRPC = 'https://rpc.ankr.com/fantom/';
//       userToken = await UserTokensFantom.findOne({
//         walletId: userWalletId,
//         address: address,
//       });

//       if (userToken) {
//         isAvailable = true;
//         decimals = userToken.decimals;
//       }

//       break;

//     //Gnosis
//     case '100':
//       networkRPC = 'https://rpc.gnosischain.com/';
//       userToken = await UserTokensGnosis.findOne({
//         walletId: userWalletId,
//         address: address,
//       });

//       if (userToken) {
//         isAvailable = true;
//         decimals = userToken.decimals;
//       }
//       break;

//     //Klaytn
//     case '8217':
//       networkRPC = 'https://rpc.ankr.com/klaytn';
//       userToken = await UserTokensKlaytn.findOne({
//         walletId: userWalletId,
//         address: address,
//       });

//       if (userToken) {
//         isAvailable = true;
//         decimals = userToken.decimals;
//       }

//       break;

//     //Optimism
//     case '10':
//       networkRPC = 'https://mainnet.optimism.io';
//       userToken = await UserTokensOptimism.findOne({
//         walletId: userWalletId,
//         address: address,
//       });

//       if (userToken) {
//         isAvailable = true;
//         decimals = userToken.decimals;
//       }

//       break;

//     //Polygon
//     case '137':
//       networkRPC = 'https://polygon-rpc.com';
//       userToken = await UserTokensPolygon.findOne({
//         walletId: userWalletId,
//         address: address,
//       });

//       if (userToken) {
//         isAvailable = true;
//         decimals = userToken.decimals;
//       }

//       break;

//     //================================{TESTNETS}=====================================
//     //PolygonMumbai
//     case '80001':
//       networkRPC = 'https://matic-mumbai.chainstacklabs.com';
//       userToken = await UserTokensPolygonMumbai.findOne({
//         walletId: userWalletId,
//         address: address,
//       });

//       if (userToken) {
//         isAvailable = true;
//         decimals = userToken.decimals;
//       }

//       break;

//     //GoerliEth

//     case '5':
//       networkRPC = 'https://rpc.ankr.com/eth_goerli';
//       userToken = await UserTokensGoerliEth.findOne({
//         walletId: userWalletId,
//         address: address,
//       });

//       if (userToken) {
//         isAvailable = true;
//         decimals = userToken.decimals;
//       }

//       break;

//     //BinanceTestnet

//     case '97':
//       networkRPC = 'https://data-seed-prebsc-1-s1.binance.org:8545/';
//       userToken = await UserTokensBinanceTestnet.findOne({
//         walletId: userWalletId,
//         address: address,
//       });

//       if (userToken) {
//         isAvailable = true;
//         decimals = userToken.decimals;
//       }

//       break;

//     default:
//       console.warn('Please choose a token!');
//       break;
//   }

//   console.log('isAvailable:', isAvailable);
//   console.log('networRPC:', networkRPC);

//   //========{Formatting networkRPC Output}=================================
//   let networkRPCToJson = JSON.stringify(networkRPC);
//   let networkRPCFormatted = networkRPCToJson.replace(
//     /^["'](.+(?=["']$))["']$/,
//     '$1'
//   );
//   //========{Formatting decimals Output}=================================
//   let decimalsToJson = JSON.stringify(decimals);
//   let decimalsFormatted = decimalsToJson.replace(
//     /^["'](.+(?=["']$))["']$/,
//     '$1'
//   );

//   let response = {
//     isAvailable: isAvailable,
//     token: JSON.stringify(userToken),
//     networkRPC: networkRPCFormatted,
//     privateKey,
//     walletAddress,
//     decimals: decimalsFormatted,
//   };

//   return response;

//   // res.status(200).json({ status: isAvailable, token: userToken });
// };

//======={createwallet}==============================

const addNewWallet = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); // from cookie

  // const { user } = req.body; // user====userId
  // const user = await User.findById(user);

  // Confirm data
  if (!user) {
    res.status(400);
    throw new Error('Invalid credentials');
  }
  const wallet = ethers.Wallet.createRandom();
  const walletAddress = wallet.address;
  const privateKey = wallet.privateKey;
  console.log('privateKey', privateKey);
  const words = wallet.mnemonic.phrase;
  const node = ethers.utils.HDNode.fromMnemonic(words); // creating the hdWallet

  //const key = new ethers.utils.SigningKey(privateKey); // Option 1 with  "ethers": "^5.7.2" below
  //const key = new utils.SigningKey(privateKey); // Option 2 "ethers": "^5.7.2" below
  const key = new SigningKey(privateKey); // Option 3  with  "@ethersproject/signing-key": "^5.7.0", which is newly maintained

  console.log({ signingKey: key });

  //Create a new EVM wallet
  const walletCreation = new Wallets({
    user, // userId
    key, // check again
    walletAddress,
    node,
  });

  const newWallet = await walletCreation.save();

  // add wallet to the list of the users wallets, so one user can have several wallets
  if (newWallet) {
    const walletId = newWallet._id;
    // console.log("walletId:",walletId);
    console.log('walletId:', JSON.stringify(walletId));
    // const addUserWallet = user.userWallets.push(walletId);
    // const addUserWallet = user.userWallets.push({ walletId: walletId });

    const numberOfAccounts = user.userWallets.length;
    console.log('numberOfAccounts:', numberOfAccounts);

    let newAccount = numberOfAccounts + 1;
    console.log('newAccount:', newAccount);

    const addUserWallet = user.userWallets.push({
      walletName: `Account ${newAccount}`,
      walletId: walletId,
      walletAddress: walletAddress,
    });

    // addUserWallet.save(done);
    await user.save();

    if (addUserWallet) {
      console.log('addUserWallet', addUserWallet);
    }
    // user.save(done);

    //     person.friends.push(friend);
    // person.save(done);
  }

  let response = {
    walletMessage: 'Wallet creation successful!',
    cautionMessage:
      'Please save your mnemonic phrase for wallet recovery and do not share your private key with anyone.',
    address: wallet.address,
    phrase: wallet.mnemonic.phrase,
    // key: wallet.privateKey,
    successMessage: 'Wallet created successfully',
  };

  res.status(200).json(response);

  // res.status(400);
  throw new Error({ errorMessage: 'User Already exists!' });
});

const addNewHDWallet = asyncHandler(async (req, res) => {

  const { userId, userWalletId } = req.body;

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
    let node = userWallets.node;
    let newAccountNumber = userWallets.hdAccounts?.length; // so that the default address is not repeated which should be at index "0"

    let newAccount = node.derivePath(`m/44'/60'/0'/0/${newAccountNumber}`);
    let hdWalletName = `Account ${newAccountNumber + 1}`;
    let hdWalletAddress = newAccount?.address;
    let hdWalletPrivateKey = newAccount?.privateKey;

    const addUserHDWallet = userWallets.hdAccounts.push({
      hdWalletName,
      hdWalletAddress,
      hdWalletPrivateKey,
    });

    // addUserWallet.save(done);
    await userWallets.save();

    if (addUserHDWallet) {
      console.log('addUserHDWallet', addUserHDWallet);

      let response = {
        address: newAccount?.address,
        successMessage: 'HD Wallet created successfully',
      };

      res.status(200).json(response);
    }
  }
});

async function getPrivateKey(key) {
  const privateKeyFormmated = JSON.stringify(key.privateKey, undefined, 2);

  //Sample result:
  //retrievedPrivateKey: '"0x5deb59b357d4c4c418cf179a168b10fd479891791730f5867a4cfe8a80a2477e"'

  // remove dpuble qoutes from result
  let privateKey = privateKeyFormmated.replace(/^["'](.+(?=["']$))["']$/, '$1');

  //Sample result:
  //retrievedPrivateKey: '0x5deb59b357d4c4c418cf179a168b10fd479891791730f5867a4cfe8a80a2477e'

  return privateKey;
}

const updateWalletAccountName = asyncHandler(async (req, res) => {
  const { userId, userWalletId, userWalletName } = req.body;
  const user = await User.findById(userId);

  if (!user) {
    res.status(400);
    throw new Error('User not found!');
  }

  const { userWallets } = user;

  const usersWallet = await Promise.all(
    userWallets.map(async (wallet) => {
      if (wallet.walletId === userWalletId) {
        wallet.walletName = userWalletName || wallet.walletName;
      }

      return { ...wallet };
    })
  );
  console.log(usersWallet);

  await user.save();
  let response = {
    updateWallet: usersWallet,
    successMessage: 'Wallet updated sucessfully',
  };

  res.status(200).json(response);
});

// All user Wallets
const getWallets = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);

  if (!user) {
    res.status(400);
    throw new Error('User not found!');
  }

  const { userWallets } = user;

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

  let key = userWallets.key;
  // let walletAddress = userWallets.walletAddress;
  let walletAddressFormatted = JSON.stringify(userWallets.walletAddress);
  //==========={get Privatekey}=========================================================
  let privateKeyFormmated = JSON.stringify(key.privateKey, undefined, 2);
  let privateKey = privateKeyFormmated.replace(/^["'](.+(?=["']$))["']$/, '$1');
  let walletAddress = walletAddressFormatted.replace(
    /^["'](.+(?=["']$))["']$/,
    '$1'
  );

  let response = {
    userWallets,
    key,
    walletAddress,
    privateKey,
  };

  res.status(200).json(response);
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

const sendToken = asyncHandler(async (req, res) => {
  // const { tokenId, userId, receiver, amount } = req.body;

  const { userId, userWalletId, chainId, fromTokenAddress, amount, receiver } =
    req.body;

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

  //============{Verify Token}=========================================================
  let address = fromTokenAddress;
  const verifyToken = await userTokensChecker({
    userId,
    userWalletId,
    address,
    chainId,
  });
  // let isAvailable = verifyToken.response.isAvailable;
  let isAvailable = verifyToken.isAvailable;
  if (isAvailable === false) {
    res.status(400);
    throw new Error('Token not found on this network');
  }

  let fromTokenAddressDecimals = verifyToken.decimals;
  console.log('fromTokenAddressDecimals:', fromTokenAddressDecimals);

  let networkRPC = verifyToken.networkRPC;
  console.log('networkRPC:', networkRPC);

  //==========={get walletAddress}=========================================================
  let walletAddress = verifyToken.walletAddress;
  console.log('walletAddress:', walletAddress);
  //==========={get Privatekey}=========================================================
  let privateKey = verifyToken.privateKey;
  console.log('privateKey:', privateKey);

  console.log('networkRPC:', networkRPC);

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

    res.status(201).json({
      userId,
      sender: walletAddress,
      sucess: true,
      receiver,
      amount: amount,
      balance: balance,
      type: type,
      action: 'send',
    });
  } else {
    type = 'Native';
    const tx = {
      to: receiver,
      value: ethers.utils.parseEther(amount.toString()).toString(),
    };

    const rawBalance = await provider.getBalance(walletAddress);
    const balance = ethers.utils.formatEther(rawBalance.toString()).toString();

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
      res.status(201).json(response);
    });
  }
});

const walletRecover = asyncHandler(async (req, res) => {
  const { mnemonic } = req.body;
  // user here means the userId

  let mnemonicWallet = ethers.Wallet.fromMnemonic(mnemonic);
  let response = {
    privateKey: mnemonicWallet.privateKey,
    walletAddress: mnemonicWallet.address,
  };

  res.status(200).json(response);
});

//========================={                     }=================================================
//========================={  BALANCES            }=================================================
//========================={                     }=================================================

//======================={BALANCES BY CHAINS}======================

const getBalanceArbitrum = asyncHandler(async (req, res) => {
  const { userId, userWalletId } = req.params;
  const chainId = '42161';

  const user = await User.findById(userId);
  if (!user) {
    res.status(400);
    throw new Error({ errorMessage: 'User not found' });
  }

  const userWallets = await Wallets.findOne({
    user: userId,
    _id: userWalletId,
  }).exec();
  let activeWallet = userWallets;
  let key = activeWallet.key;

  // let walletAddress = userWallets.walletAddress;
  let walletAddressFormmated = JSON.stringify(activeWallet.walletAddress);
  //==========={get Privatekey}=========================================================
  let privateKeyFormmated = JSON.stringify(key.privateKey, undefined, 2);
  let privateKey = privateKeyFormmated.replace(/^["'](.+(?=["']$))["']$/, '$1');

  let walletAddress = walletAddressFormmated.replace(
    /^["'](.+(?=["']$))["']$/,
    '$1'
  );

  let networkRPC = 'https://goerli-rollup.arbitrum.io/rpc';
  let userTokens = await UserTokensArbitrum.find({
    walletId: userWalletId,
  });

  console.log('userTokens', userTokens);

  if (!userTokens?.length) {
    return res
      .status(400)
      .json({ message: 'No tokens available, please contact support' });
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
        balance: ethers.utils.formatUnits(balance, userTokens[i].decimals),
        logoURI: userTokens[i]?.logoURI,
        type: typeRaw,
      });
    } else {
      typeRaw = 'Native';
      //  //========{Formatting type Output}=================================

      const balance = await provider.getBalance(walletAddress);

      balances.push({
        address: userTokens[i].address,
        symbol: userTokens[i].symbol.toUpperCase(),
        balance: ethers.utils.formatEther(balance.toString()).toString(),
        logoURI: userTokens[i]?.logoURI,
        type: typeRaw,
      });
    }
  }

  res.status(200).json(balances);
});

const getBalanceAurora = asyncHandler(async (req, res) => {
  const { userId, userWalletId } = req.params;
  const chainId = '1313161554';

  const user = await User.findById(userId);
  if (!user) {
    res.status(400);
    throw new Error({ errorMessage: 'User not found' });
  }

  const userWallets = await Wallets.findOne({
    user: userId,
    _id: userWalletId,
  }).exec();
  let activeWallet = userWallets;
  let key = activeWallet.key;

  // let walletAddress = userWallets.walletAddress;
  let walletAddressFormmated = JSON.stringify(activeWallet.walletAddress);
  //==========={get Privatekey}=========================================================
  let privateKeyFormmated = JSON.stringify(key.privateKey, undefined, 2);
  let privateKey = privateKeyFormmated.replace(/^["'](.+(?=["']$))["']$/, '$1');

  let walletAddress = walletAddressFormmated.replace(
    /^["'](.+(?=["']$))["']$/,
    '$1'
  );

  let networkRPC = 'https://mainnet.aurora.dev';
  let userTokens = await UserTokensAurora.find({
    walletId: userWalletId,
  });

  console.log('userTokens', userTokens);

  if (!userTokens?.length) {
    return res
      .status(400)
      .json({ message: 'No tokens available, please contact support' });
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
        balance: ethers.utils.formatUnits(balance, userTokens[i].decimals),
        logoURI: userTokens[i]?.logoURI,
        type: typeRaw,
      });
    } else {
      typeRaw = 'Native';
      //  //========{Formatting type Output}=================================

      const balance = await provider.getBalance(walletAddress);

      balances.push({
        address: userTokens[i].address,
        symbol: userTokens[i].symbol.toUpperCase(),
        balance: ethers.utils.formatEther(balance.toString()).toString(),
        logoURI: userTokens[i]?.logoURI,
        type: typeRaw,
      });
    }
  }

  res.status(200).json(balances);
});

const getBalanceAvalanche = asyncHandler(async (req, res) => {
  const { userId, userWalletId } = req.params;
  const chainId = '43114';

  const user = await User.findById(userId);
  if (!user) {
    res.status(400);
    throw new Error({ errorMessage: 'User not found' });
  }

  const userWallets = await Wallets.findOne({
    user: userId,
    _id: userWalletId,
  }).exec();
  let activeWallet = userWallets;
  let key = activeWallet.key;

  // let walletAddress = userWallets.walletAddress;
  let walletAddressFormmated = JSON.stringify(activeWallet.walletAddress);
  //==========={get Privatekey}=========================================================
  let privateKeyFormmated = JSON.stringify(key.privateKey, undefined, 2);
  let privateKey = privateKeyFormmated.replace(/^["'](.+(?=["']$))["']$/, '$1');

  let walletAddress = walletAddressFormmated.replace(
    /^["'](.+(?=["']$))["']$/,
    '$1'
  );

  let networkRPC = 'https://api.avax.network/ext/bc/C/rpc';
  let userTokens = await UserTokensAvalanche.find({
    walletId: userWalletId,
  });

  console.log('userTokens', userTokens);

  if (!userTokens?.length) {
    return res
      .status(400)
      .json({ message: 'No tokens available, please contact support' });
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
        balance: ethers.utils.formatUnits(balance, userTokens[i].decimals),
        logoURI: userTokens[i]?.logoURI,
        type: typeRaw,
      });
    } else {
      typeRaw = 'Native';
      //  //========{Formatting type Output}=================================

      const balance = await provider.getBalance(walletAddress);

      balances.push({
        address: userTokens[i].address,
        symbol: userTokens[i].symbol.toUpperCase(),
        balance: ethers.utils.formatEther(balance.toString()).toString(),
        logoURI: userTokens[i]?.logoURI,
        type: typeRaw,
      });
    }
  }

  res.status(200).json(balances);
});

const getBalanceBinance = asyncHandler(async (req, res) => {
  const { userId, userWalletId } = req.params;
  const chainId = '56';

  const user = await User.findById(userId);
  if (!user) {
    res.status(400);
    throw new Error({ errorMessage: 'User not found' });
  }

  const userWallets = await Wallets.findOne({
    user: userId,
    _id: userWalletId,
  }).exec();
  let activeWallet = userWallets;
  let key = activeWallet.key;

  // let walletAddress = userWallets.walletAddress;
  let walletAddressFormmated = JSON.stringify(activeWallet.walletAddress);
  //==========={get Privatekey}=========================================================
  let privateKeyFormmated = JSON.stringify(key.privateKey, undefined, 2);
  let privateKey = privateKeyFormmated.replace(/^["'](.+(?=["']$))["']$/, '$1');

  let walletAddress = walletAddressFormmated.replace(
    /^["'](.+(?=["']$))["']$/,
    '$1'
  );

  let networkRPC = 'https://rpc.ankr.com/bsc';
  let userTokens = await UserTokensBinance.find({
    walletId: userWalletId,
  });

  console.log('userTokens', userTokens);

  if (!userTokens?.length) {
    return res
      .status(400)
      .json({ message: 'No tokens available, please contact support' });
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
        balance: ethers.utils.formatUnits(balance, userTokens[i].decimals),
        logoURI: userTokens[i]?.logoURI,
        type: typeRaw,
      });
    } else {
      typeRaw = 'Native';
      //  //========{Formatting type Output}=================================

      const balance = await provider.getBalance(walletAddress);

      balances.push({
        address: userTokens[i].address,
        symbol: userTokens[i].symbol.toUpperCase(),
        balance: ethers.utils.formatEther(balance.toString()).toString(),
        logoURI: userTokens[i]?.logoURI,
        type: typeRaw,
      });
    }
  }

  res.status(200).json(balances);
});

const getBalanceEthereum = asyncHandler(async (req, res) => {
  const { userId, userWalletId } = req.params;
  const chainId = '1';

  const user = await User.findById(userId);
  if (!user) {
    res.status(400);
    throw new Error({ errorMessage: 'User not found' });
  }

  const userWallets = await Wallets.findOne({
    user: userId,
    _id: userWalletId,
  }).exec();
  let activeWallet = userWallets;
  let key = activeWallet.key;

  // let walletAddress = userWallets.walletAddress;
  let walletAddressFormmated = JSON.stringify(activeWallet.walletAddress);
  //==========={get Privatekey}=========================================================
  let privateKeyFormmated = JSON.stringify(key.privateKey, undefined, 2);
  let privateKey = privateKeyFormmated.replace(/^["'](.+(?=["']$))["']$/, '$1');

  let walletAddress = walletAddressFormmated.replace(
    /^["'](.+(?=["']$))["']$/,
    '$1'
  );

  let networkRPC = 'https://cloudflare-eth.com';
  let userTokens = await UserTokensEthereum.find({
    walletId: userWalletId,
  });

  console.log('userTokens', userTokens);

  if (!userTokens?.length) {
    return res
      .status(400)
      .json({ message: 'No tokens available, please contact support' });
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
        balance: ethers.utils.formatUnits(balance, userTokens[i].decimals),
        logoURI: userTokens[i]?.logoURI,
        type: typeRaw,
      });
    } else {
      typeRaw = 'Native';
      //  //========{Formatting type Output}=================================

      const balance = await provider.getBalance(walletAddress);

      balances.push({
        address: userTokens[i].address,
        symbol: userTokens[i].symbol.toUpperCase(),
        balance: ethers.utils.formatEther(balance.toString()).toString(),
        logoURI: userTokens[i]?.logoURI,
        type: typeRaw,
      });
    }
  }

  res.status(200).json(balances);
});

const getBalanceFantom = asyncHandler(async (req, res) => {
  const { userId, userWalletId } = req.params;
  const chainId = '250';

  const user = await User.findById(userId);
  if (!user) {
    res.status(400);
    throw new Error({ errorMessage: 'User not found' });
  }

  const userWallets = await Wallets.findOne({
    user: userId,
    _id: userWalletId,
  }).exec();
  let activeWallet = userWallets;
  let key = activeWallet.key;

  // let walletAddress = userWallets.walletAddress;
  let walletAddressFormmated = JSON.stringify(activeWallet.walletAddress);
  //==========={get Privatekey}=========================================================
  let privateKeyFormmated = JSON.stringify(key.privateKey, undefined, 2);
  let privateKey = privateKeyFormmated.replace(/^["'](.+(?=["']$))["']$/, '$1');

  let walletAddress = walletAddressFormmated.replace(
    /^["'](.+(?=["']$))["']$/,
    '$1'
  );

  let networkRPC = 'https://rpc.ankr.com/fantom/';
  let userTokens = await UserTokensFantom.find({
    walletId: userWalletId,
  });

  console.log('userTokens', userTokens);

  if (!userTokens?.length) {
    return res
      .status(400)
      .json({ message: 'No tokens available, please contact support' });
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
        balance: ethers.utils.formatUnits(balance, userTokens[i].decimals),
        logoURI: userTokens[i]?.logoURI,
        type: typeRaw,
      });
    } else {
      typeRaw = 'Native';
      //  //========{Formatting type Output}=================================

      const balance = await provider.getBalance(walletAddress);

      balances.push({
        address: userTokens[i].address,
        symbol: userTokens[i].symbol.toUpperCase(),
        balance: ethers.utils.formatEther(balance.toString()).toString(),
        logoURI: userTokens[i]?.logoURI,
        type: typeRaw,
      });
    }
  }

  res.status(200).json(balances);
});

const getBalanceGnosis = asyncHandler(async (req, res) => {
  const { userId, userWalletId } = req.params;
  const chainId = '100';

  const user = await User.findById(userId);
  if (!user) {
    res.status(400);
    throw new Error({ errorMessage: 'User not found' });
  }

  const userWallets = await Wallets.findOne({
    user: userId,
    _id: userWalletId,
  }).exec();
  let activeWallet = userWallets;
  let key = activeWallet.key;

  // let walletAddress = userWallets.walletAddress;
  let walletAddressFormmated = JSON.stringify(activeWallet.walletAddress);
  //==========={get Privatekey}=========================================================
  let privateKeyFormmated = JSON.stringify(key.privateKey, undefined, 2);
  let privateKey = privateKeyFormmated.replace(/^["'](.+(?=["']$))["']$/, '$1');

  let walletAddress = walletAddressFormmated.replace(
    /^["'](.+(?=["']$))["']$/,
    '$1'
  );

  let networkRPC = 'https://rpc.gnosischain.com/';
  let userTokens = await UserTokensGnosis.find({
    walletId: userWalletId,
  });

  console.log('userTokens', userTokens);

  if (!userTokens?.length) {
    return res
      .status(400)
      .json({ message: 'No tokens available, please contact support' });
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
        balance: ethers.utils.formatUnits(balance, userTokens[i].decimals),
        logoURI: userTokens[i]?.logoURI,
        type: typeRaw,
      });
    } else {
      typeRaw = 'Native';
      //  //========{Formatting type Output}=================================

      const balance = await provider.getBalance(walletAddress);

      balances.push({
        address: userTokens[i].address,
        symbol: userTokens[i].symbol.toUpperCase(),
        balance: ethers.utils.formatEther(balance.toString()).toString(),
        logoURI: userTokens[i]?.logoURI,
        type: typeRaw,
      });
    }
  }

  res.status(200).json(balances);
});

const getBalanceKlaytn = asyncHandler(async (req, res) => {
  const { userId, userWalletId } = req.params;
  const chainId = '8217';

  const user = await User.findById(userId);
  if (!user) {
    res.status(400);
    throw new Error({ errorMessage: 'User not found' });
  }

  const userWallets = await Wallets.findOne({
    user: userId,
    _id: userWalletId,
  }).exec();
  let activeWallet = userWallets;
  let key = activeWallet.key;

  // let walletAddress = userWallets.walletAddress;
  let walletAddressFormmated = JSON.stringify(activeWallet.walletAddress);
  //==========={get Privatekey}=========================================================
  let privateKeyFormmated = JSON.stringify(key.privateKey, undefined, 2);
  let privateKey = privateKeyFormmated.replace(/^["'](.+(?=["']$))["']$/, '$1');

  let walletAddress = walletAddressFormmated.replace(
    /^["'](.+(?=["']$))["']$/,
    '$1'
  );

  let networkRPC = 'https://rpc.ankr.com/klaytn';
  let userTokens = await UserTokensKlaytn.find({
    walletId: userWalletId,
  });

  console.log('userTokens', userTokens);

  if (!userTokens?.length) {
    return res
      .status(400)
      .json({ message: 'No tokens available, please contact support' });
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
        balance: ethers.utils.formatUnits(balance, userTokens[i].decimals),
        logoURI: userTokens[i]?.logoURI,
        type: typeRaw,
      });
    } else {
      typeRaw = 'Native';
      //  //========{Formatting type Output}=================================

      const balance = await provider.getBalance(walletAddress);

      balances.push({
        address: userTokens[i].address,
        symbol: userTokens[i].symbol.toUpperCase(),
        balance: ethers.utils.formatEther(balance.toString()).toString(),
        logoURI: userTokens[i]?.logoURI,
        type: typeRaw,
      });
    }
  }

  res.status(200).json(balances);
});

const getBalanceOptimism = asyncHandler(async (req, res) => {
  const { userId, userWalletId } = req.params;
  const chainId = '10';

  const user = await User.findById(userId);
  if (!user) {
    res.status(400);
    throw new Error({ errorMessage: 'User not found' });
  }

  const userWallets = await Wallets.findOne({
    user: userId,
    _id: userWalletId,
  }).exec();
  let activeWallet = userWallets;
  let key = activeWallet.key;

  // let walletAddress = userWallets.walletAddress;
  let walletAddressFormmated = JSON.stringify(activeWallet.walletAddress);
  //==========={get Privatekey}=========================================================
  let privateKeyFormmated = JSON.stringify(key.privateKey, undefined, 2);
  let privateKey = privateKeyFormmated.replace(/^["'](.+(?=["']$))["']$/, '$1');

  let walletAddress = walletAddressFormmated.replace(
    /^["'](.+(?=["']$))["']$/,
    '$1'
  );

  let networkRPC = 'https://mainnet.optimism.io';
  // networkRPC2= 'https://rpc.ankr.com/multichain';
  let userTokens = await UserTokensOptimism.find({
    walletId: userWalletId,
  });

  console.log('userTokens', userTokens);

  if (!userTokens?.length) {
    return res
      .status(400)
      .json({ message: 'No tokens available, please contact support' });
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
        balance: ethers.utils.formatUnits(balance, userTokens[i].decimals),
        logoURI: userTokens[i]?.logoURI,
        type: typeRaw,
      });
    } else {
      typeRaw = 'Native';
      //  //========{Formatting type Output}=================================

      const balance = await provider.getBalance(walletAddress);

      balances.push({
        address: userTokens[i].address,
        symbol: userTokens[i].symbol.toUpperCase(),
        balance: ethers.utils.formatEther(balance.toString()).toString(),
        logoURI: userTokens[i]?.logoURI,
        type: typeRaw,
      });
    }
  }

  res.status(200).json(balances);
});

const getBalancePolygon = asyncHandler(async (req, res) => {
  const { userId, userWalletId } = req.params;
  const chainId = '137';

  const user = await User.findById(userId);
  if (!user) {
    res.status(400);
    throw new Error({ errorMessage: 'User not found' });
  }

  const userWallets = await Wallets.findOne({
    user: userId,
    _id: userWalletId,
  }).exec();
  let activeWallet = userWallets;
  let key = activeWallet.key;

  // let walletAddress = userWallets.walletAddress;
  let walletAddressFormmated = JSON.stringify(activeWallet.walletAddress);
  //==========={get Privatekey}=========================================================
  let privateKeyFormmated = JSON.stringify(key.privateKey, undefined, 2);
  let privateKey = privateKeyFormmated.replace(/^["'](.+(?=["']$))["']$/, '$1');

  let walletAddress = walletAddressFormmated.replace(
    /^["'](.+(?=["']$))["']$/,
    '$1'
  );

  let networkRPC = 'https://polygon-rpc.com';
  let userTokens = await UserTokensPolygon.find({
    walletId: userWalletId,
  });

  console.log('userTokens', userTokens);

  if (!userTokens?.length) {
    return res
      .status(400)
      .json({ message: 'No tokens available, please contact support' });
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
        balance: ethers.utils.formatUnits(balance, userTokens[i].decimals),
        logoURI: userTokens[i]?.logoURI,
        type: typeRaw,
      });
    } else {
      typeRaw = 'Native';
      //  //========{Formatting type Output}=================================

      const balance = await provider.getBalance(walletAddress);

      balances.push({
        address: userTokens[i].address,
        symbol: userTokens[i].symbol.toUpperCase(),
        balance: ethers.utils.formatEther(balance.toString()).toString(),
        logoURI: userTokens[i]?.logoURI,
        type: typeRaw,
      });
    }
  }

  res.status(200).json(balances);
});

const getBalancePolygonMumbai = asyncHandler(async (req, res) => {
  const { userId, userWalletId } = req.params;
  const chainId = '80001';

  const user = await User.findById(userId);
  if (!user) {
    res.status(400);
    throw new Error({ errorMessage: 'User not found' });
  }

  const userWallets = await Wallets.findOne({
    user: userId,
    _id: userWalletId,
  }).exec();
  let activeWallet = userWallets;
  let key = activeWallet.key;

  // let walletAddress = userWallets.walletAddress;
  let walletAddressFormmated = JSON.stringify(activeWallet.walletAddress);
  //==========={get Privatekey}=========================================================
  let privateKeyFormmated = JSON.stringify(key.privateKey, undefined, 2);
  let privateKey = privateKeyFormmated.replace(/^["'](.+(?=["']$))["']$/, '$1');

  let walletAddress = walletAddressFormmated.replace(
    /^["'](.+(?=["']$))["']$/,
    '$1'
  );

  let networkRPC = 'https://matic-mumbai.chainstacklabs.com';
  let userTokens = await UserTokensPolygonMumbai.find({
    walletId: userWalletId,
  });

  console.log('userTokens', userTokens);

  if (!userTokens?.length) {
    return res
      .status(400)
      .json({ message: 'No tokens available, please contact support' });
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
        balance: ethers.utils.formatUnits(balance, userTokens[i].decimals),
        logoURI: userTokens[i]?.logoURI,
        type: typeRaw,
      });
    } else {
      typeRaw = 'Native';
      //  //========{Formatting type Output}=================================

      const balance = await provider.getBalance(walletAddress);

      balances.push({
        address: userTokens[i].address,
        symbol: userTokens[i].symbol.toUpperCase(),
        balance: ethers.utils.formatEther(balance.toString()).toString(),
        logoURI: userTokens[i]?.logoURI,
        type: typeRaw,
      });
    }
  }

  res.status(200).json(balances);
});

const getBalanceGoerliEth = asyncHandler(async (req, res) => {
  const { userId, userWalletId } = req.params;
  // const chainId = '5';

  const user = await User.findById(userId);
  if (!user) {
    res.status(400);
    throw new Error({ errorMessage: 'User not found' });
  }

  const userWallets = await Wallets.findOne({
    user: userId,
    _id: userWalletId,
  }).exec();
  let activeWallet = userWallets;
  let key = activeWallet.key;

  // let walletAddress = userWallets.walletAddress;
  let walletAddressFormmated = JSON.stringify(activeWallet.walletAddress);
  //==========={get Privatekey}=========================================================
  let privateKeyFormmated = JSON.stringify(key.privateKey, undefined, 2);
  let privateKey = privateKeyFormmated.replace(/^["'](.+(?=["']$))["']$/, '$1');

  let walletAddress = walletAddressFormmated.replace(
    /^["'](.+(?=["']$))["']$/,
    '$1'
  );

  let networkRPC = 'https://rpc.ankr.com/eth_goerli';
  let userTokens = await UserTokensGoerliEth.find({
    walletId: userWalletId,
  });

  console.log('userTokens', userTokens);

  if (!userTokens?.length) {
    return res
      .status(400)
      .json({ message: 'No tokens available, please contact support' });
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
        balance: ethers.utils.formatUnits(balance, userTokens[i].decimals),
        logoURI: userTokens[i]?.logoURI,
        type: typeRaw,
      });
    } else {
      typeRaw = 'Native';
      //  //========{Formatting type Output}=================================

      const balance = await provider.getBalance(walletAddress);

      balances.push({
        address: userTokens[i].address,
        symbol: userTokens[i].symbol.toUpperCase(),
        balance: ethers.utils.formatEther(balance.toString()).toString(),
        logoURI: userTokens[i]?.logoURI,
        type: typeRaw,
      });
    }
  }

  res.status(200).json(balances);
});

const getBalanceBinanceTestnet = asyncHandler(async (req, res) => {
  const { userId, userWalletId } = req.params;
  const chainId = '97';

  const user = await User.findById(userId);
  if (!user) {
    res.status(400);
    throw new Error({ errorMessage: 'User not found' });
  }

  const userWallets = await Wallets.findOne({
    user: userId,
    _id: userWalletId,
  }).exec();
  let activeWallet = userWallets;
  let key = activeWallet.key;

  // let walletAddress = userWallets.walletAddress;
  let walletAddressFormmated = JSON.stringify(activeWallet.walletAddress);
  //==========={get Privatekey}=========================================================
  let privateKeyFormmated = JSON.stringify(key.privateKey, undefined, 2);
  let privateKey = privateKeyFormmated.replace(/^["'](.+(?=["']$))["']$/, '$1');

  let walletAddress = walletAddressFormmated.replace(
    /^["'](.+(?=["']$))["']$/,
    '$1'
  );

  let networkRPC = 'https://data-seed-prebsc-1-s1.binance.org:8545/';
  let userTokens = await UserTokensBinanceTestnet.find({
    walletId: userWalletId,
  });

  console.log('userTokens', userTokens);

  if (!userTokens?.length) {
    return res
      .status(400)
      .json({ message: 'No tokens available, please contact support' });
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
        balance: ethers.utils.formatUnits(balance, userTokens[i].decimals),
        logoURI: userTokens[i]?.logoURI,
        type: typeRaw,
      });
    } else {
      typeRaw = 'Native';
      //  //========{Formatting type Output}=================================

      const balance = await provider.getBalance(walletAddress);

      balances.push({
        address: userTokens[i].address,
        symbol: userTokens[i].symbol.toUpperCase(),
        balance: ethers.utils.formatEther(balance.toString()).toString(),
        logoURI: userTokens[i]?.logoURI,
        type: typeRaw,
      });
    }
  }

  res.status(200).json(balances);
});

//========================={                     }=================================================
//========================={ USERTOKENS          }=================================================
//========================={                     }=================================================

const getAllTokens = asyncHandler(async (req, res) => {
  const { chainId } = req.params; // user====userId

  // Confirm data
  if (!chainId) {
    res.status(400);
    throw new Error('Invalid credentials');
  }
  if (chainId == '42161') {
    let response = await getChainsArbitrum();
    if (response.length >= 1) {
      res.status(200).json(response);
    } else {
      res.status(400);
      throw new Error('No data found');
    }
  }
  if (chainId == '1313161554') {
    let response = await getChainsAurora();
    if (response.length >= 1) {
      res.status(200).json(response);
    } else {
      res.status(400);
      throw new Error('No data found');
    }
  }
  if (chainId == '43114') {
    let response = await getChainsAvalanche();
    if (response.length >= 1) {
      res.status(200).json(response);
    } else {
      res.status(400);
      throw new Error('No data found');
    }
  }
  if (chainId == '56') {
    let response = await getChainsBinance();
    if (response.length >= 1) {
      res.status(200).json(response);
    } else {
      res.status(400);
      throw new Error('No data found');
    }
  }
  if (chainId == '1') {
    let response = await getChainsEthereum();
    if (response.length >= 1) {
      res.status(200).json(response);
    } else {
      res.status(400);
      throw new Error('No data found');
    }
  }
  if (chainId == '250') {
    let response = await getChainsFantom();
    if (response.length >= 1) {
      res.status(200).json(response);
    } else {
      res.status(400);
      throw new Error('No data found');
    }
  }
  if (chainId == '100') {
    let response = await getChainsGnosis();
    if (response.length >= 1) {
      res.status(200).json(response);
    } else {
      res.status(400);
      throw new Error('No data found');
    }
  }
  if (chainId == '8217') {
    let response = await getChainsKlaytn();
    if (response.length >= 1) {
      res.status(200).json(response);
    } else {
      res.status(400);
      throw new Error('No data found');
    }
  }
  if (chainId == '10') {
    let response = await getChainsOptimism();
    if (response.length >= 1) {
      res.status(200).json(response);
    } else {
      res.status(400);
      throw new Error('No data found');
    }
  }
  if (chainId == '137') {
    let response = await getChainsPolygon();
    if (response.length >= 1) {
      res.status(200).json(response);
    } else {
      res.status(400);
      throw new Error('No data found');
    }
  }
  if (chainId == '80001') {
    let response = await getChainsBinanceTestnet();
    if (response.length >= 1) {
      res.status(200).json(response);
    } else {
      res.status(400);
      throw new Error('No data found');
    }
  }
  if (chainId == '5') {
    let response = await getChainsGoerliEth();
    if (response.length >= 1) {
      res.status(200).json(response);
    } else {
      res.status(400);
      throw new Error('No data found');
    }
  }
  if (chainId == '97') {
    let response = await getChainsPolygonMumbai();
    if (response.length >= 1) {
      res.status(200).json(response);
    } else {
      res.status(400);
      throw new Error('No data found');
    }
  }
});

//================================{LATEST BALANCES: WITH USD VALUE}===========================

//================================{                 }=========================
//================================{ User Networks   }=========================
//================================{                 }=========================

const getEstimateGas = asyncHandler(async (req, res) => {
  const { userId, chainId, fromTokenAddress, amount, receiver, userWalletId } =
    req.body;

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

  //============{Verify Token}=========================================================
  let address = fromTokenAddress;
  const verifyToken = await userTokensChecker({
    userId,
    userWalletId,
    address,
    chainId,
  });
  // let isAvailable = verifyToken.response.isAvailable;
  let isAvailable = verifyToken.isAvailable;
  if (isAvailable === false) {
    res.status(400);
    throw new Error('Token not found on this network');
  }

  let fromTokenAddressDecimals = verifyToken.decimals;
  console.log('fromTokenAddressDecimals:', fromTokenAddressDecimals);

  let networkRPC = verifyToken.networkRPC;
  console.log('networkRPC:', networkRPC);

  //==========={get walletAddress}=========================================================
  let walletAddress = verifyToken.walletAddress;
  console.log('walletAddress:', walletAddress);
  //==========={get Privatekey}=========================================================
  let privateKey = verifyToken.privateKey;
  console.log('privateKey:', privateKey);

  console.log('networkRPC:', networkRPC);

  const provider = new ethers.providers.JsonRpcProvider(networkRPC); // default is ethereum homestead
  const signer = new ethers.Wallet(privateKey, provider);

  let estimatedGas = '';

  if (fromTokenAddress != '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
    const contract = new ethers.Contract(fromTokenAddress, ERC20Abi, signer);

    let to = receiver;
    let value = ethers.utils
      .parseUnits(amount.toString(), fromTokenAddressDecimals.toString())
      .toString();

    const estimatedGasRaw = await contract.estimateGas.transfer(to, value);

    // let value = ethers.utils
    // .parseUnits(amount.toString(), fromTokenAddressDecimals.toString())
    // .toString();

    //     const value = ethers.utils.parseEther(amount); // send

    // let tx = {
    //   to: receiver,
    //   value
    // };

    //     let estimatedGasRaw = signer.estimateGas(tx); // to setimate gas

    const estimatedGasHex = await Promise.resolve(estimatedGasRaw);
    estimatedGas = ethers.utils
      .formatUnits(estimatedGasHex, fromTokenAddressDecimals.toString())
      .toString();
    estimatedGas = estimatedGasRaw.toString();
    console.log('estimatedGas:', estimatedGas);

    // estimatedGas = estimatedGasRaw.toString();
    console.log('estimatedGas:', estimatedGas);
  } else {
    const tx = {
      to: receiver,
      value: ethers.utils.parseEther(amount.toString()).toString(),
    };

    let estimatedGasRaw = signer.estimateGas(tx); // to setimate gas
    const estimatedGasHex = await Promise.resolve(estimatedGasRaw);
    estimatedGas = ethers.utils.formatEther(estimatedGasHex);
    // estimatedGas = estimatedGasRaw.toString();
    console.log('estimatedGas:', estimatedGas);
  }

  // Connect to the network
  // let provider = ethers.getDefaultProvider(networkRPC);
  // let signer = provider.getSigner();

  // or
  // const privateKey = req.query.privateKey;
  // let wallet = new ethers.Wallet(privateKey, provider);

  res.status(200).json(estimatedGas);
});

// const getEstimateGas=  asyncHandler(async (req, res) => {
//   const {
//     userId, // consider removing
//     chainId,
//     tokenAddress,
//     amount,
//     receiver,
//     userWalletId,
//   } = req.params;

//   let address = tokenAddress;

//   const verifyToken = await userTokensChecker({
//     userId,
//     userWalletId,
//     address,
//     chainId,
//   });

//   let isAvailable = verifyToken.isAvailable;
//   if (isAvailable === false) {
//      res.status(400);
// throw new Error('Token not found on this network');
//   }

//   let tokenDecimals = verifyToken.decimals;
//   console.log('tokenDecimals:', tokenDecimals);

//   let networkRPC = verifyToken.networkRPC;
//   console.log('networkRPC:', networkRPC);

//   let amountInEth = '';

//   if (tokenAddress != '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
//     amountInEth = ethers.utils
//       .parseUnits(amount.toString(), tokenDecimals.toString())
//       .toString();
//   } else {
//     amountInEth = ethers.utils.parseEther(amount.toString()).toString();
//   }

//   // Connect to the network
//   let provider = ethers.getDefaultProvider(networkRPC);
//   let signer = provider.getSigner();

//   // or
//   // const privateKey = req.query.privateKey;
//   // let wallet = new ethers.Wallet(privateKey, provider);

//   let tx = {
//     to: receiver,
//     value: amountInEth,
//   };

//   let estimatedGasRaw = signer.estimateGas(tx); // to setimate gas
//   const estimatedGas = estimatedGasRaw.toString();

//   // res.send({
//   //     'estimated Gas': estimatedGas,
//   // });

//   res.status(200).json(estimatedGas);
// };

const usernameCheckController = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      res.status(302).json({
        errorMessage: 'Username already taken',
      });
      return;
    }
    res.status(202).json({
      successMessage: 'username is accepted',
    });
  } catch (err) {
    res.status(500).json({
      errorMessage: 'Server error',
    });
  }
});

/* Overall Stats:  Advanced Find function */
//============={Advanced: 1}=====================================================================
// const overallStat = await OverallStat.find({ year: currentYear });

// const {
//   totalCustomers,
//   yearlyTotalSoldUnits,
//   yearlySalesTotal,
//   monthlyData,
//   salesByCategory,
// } = overallStat[0];
// //============={Advanced: 2}=====================================================================
// const thisMonthStats = overallStat[0].monthlyData.find(({ month }) => {
//   return month === currentMonth;
// });

// const todayStats = overallStat[0].dailyData.find(({ date }) => {
//   return date === currentDay;
// });

//================={Test wallet data}=================================================

// {
//   "userWalletId":"640c82b313ba8d5d5b2895d0",
//   "symbol": "ETH",
//   "name": "Ethereum",
//   "decimals": "18",
//   "address": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
//   "logoURI": "https://tokens.1inch.io/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png",
//   "tags": [
//     "native"
//   ]
// }

// {
//   "userWalletId":"640c82b313ba8d5d5b2895d0",
//   "symbol": "BADGER",
//   "name": "Badger",
//   "decimals": "18",
//   "address": "0xbfa641051ba0a0ad1b0acf549a89536a0d76472e",
//   "logoURI": "https://tokens.1inch.io/0x3472a5a71965499acd81997a54bba8d852c6e53d.png",
//   "tags": [
//     "tokens"
//   ]
// }

//============================{UserTokenArbitrum}=====================================================

const addUserTokensArbitrum = asyncHandler(async (req, res) => {
  const { userWalletId, symbol, name, decimals, address, logoURI, tags } =
    req.body;

  let userToken = await UserTokensArbitrum.findOne({
    walletId: userWalletId,
    address: address,
  });

  if (userToken) {
    let updateToken = await UserTokensArbitrum.findOneAndRemove({
      walletId: userWalletId,
      address: address,
    });
    let response = { message: 'Token removed', token: updateToken };

    res.status(200).json(response);
  } else {
    const newToken = new UserTokensArbitrum({
      walletId: userWalletId,
      symbol,
      name,
      decimals,
      address,
      logoURI,
      tags,
    });

    const savedToken = await newToken.save();
    let response = { message: 'Token added', token: savedToken };
    res.status(200).json(response);
  }
});

// const getUserTokensArbitrum=  asyncHandler(async (req, res) => {
//   const { userWalletId } = req.params;

//   let userTokens = await UserTokensArbitrum.find({ walletId: userWalletId });

//   res.status(200).json(userTokens);
// };

const getUserTokensArbitrum = asyncHandler(async (req, res) => {
  const { userWalletId } = req.params;

  let userTokens = await UserTokensArbitrum.find({ walletId: userWalletId });

  res.status(200).json(userTokens);
});

const getUserWalletInfo = asyncHandler(async (req, res) => {
  const { userId, userWalletId } = req.params;
  // const chainId = '97';

  const user = await User.findById(userId);
  if (!user) {
    res.status(400);
    throw new Error({ errorMessage: 'User not found' });
  }
  const userWallet = await Wallets.findOne({
    user: userId,
    _id: userWalletId,
  }).exec();

  let key = userWallet.key;
  // let walletAddress = userWallet.walletAddress;
  let walletAddressFormmated = JSON.stringify(userWallet.walletAddress);
  //==========={get Privatekey}=========================================================
  let privateKeyFormmated = JSON.stringify(key.privateKey, undefined, 2);
  let privateKey = privateKeyFormmated.replace(/^["'](.+(?=["']$))["']$/, '$1');

  let walletAddress = walletAddressFormmated.replace(
    /^["'](.+(?=["']$))["']$/,
    '$1'
  );

  res.status(200).json({
    // userWallet,
    // key,
    walletAddress,
    // privateKey,
  });

  // let response = {
  //   userWallets,
  //   key,
  //   walletAddress,
  //   privateKey,
  // }

  // res.status(200).json(response);
});
//============================{UserTokensAurora}=====================================================

const addUserTokensAurora = asyncHandler(async (req, res) => {
  const { userWalletId, symbol, name, decimals, address, logoURI, tags } =
    req.body;

  let userToken = await UserTokensAurora.findOne({
    walletId: userWalletId,
    address: address,
  });

  if (userToken) {
    let updateToken = await UserTokensAurora.findOneAndRemove({
      walletId: userWalletId,
      address: address,
    });
    let response = { message: 'Token removed', token: updateToken };

    res.status(200).json(response);
  } else {
    const newToken = new UserTokensAurora({
      walletId: userWalletId,
      symbol,
      name,
      decimals,
      address,
      logoURI,
      tags,
    });

    const savedToken = await newToken.save();
    let response = { message: 'Token added', token: savedToken };
    res.status(200).json(response);
  }
});

const getUserTokensAurora = asyncHandler(async (req, res) => {
  const { userWalletId } = req.params;

  let userTokens = await UserTokensAurora.find({ walletId: userWalletId });

  res.status(200).json(userTokens);
});

//============================{UserTokensAvalanche}=====================================================

const addUserTokensAvalanche = asyncHandler(async (req, res) => {
  const { userWalletId, symbol, name, decimals, address, logoURI, tags } =
    req.body;

  let userToken = await UserTokensAvalanche.findOne({
    walletId: userWalletId,
    address: address,
  });

  if (userToken) {
    let updateToken = await UserTokensAvalanche.findOneAndRemove({
      walletId: userWalletId,
      address: address,
    });

    let response = { message: 'Token removed', token: updateToken };

    res.status(200).json(response);
  } else {
    const newToken = new UserTokensAvalanche({
      walletId: userWalletId,
      symbol,
      name,
      decimals,
      address,
      logoURI,
      tags,
    });

    const savedToken = await newToken.save();
    let response = { message: 'Token added', token: savedToken };
    res.status(200).json(response);
  }
});

const getUserTokensAvalanche = asyncHandler(async (req, res) => {
  const { userWalletId } = req.params;

  let userTokens = await UserTokensAvalanche.find({ walletId: userWalletId });

  res.status(200).json(userTokens);
});

//============================{UserTokensBinance}=====================================================

const addUserTokensBinance = asyncHandler(async (req, res) => {
  const { userWalletId, symbol, name, decimals, address, logoURI, tags } =
    req.body;

  let userToken = await UserTokensBinance.findOne({
    walletId: userWalletId,
    address: address,
  });

  if (userToken) {
    let updateToken = await UserTokensBinance.findOneAndRemove({
      walletId: userWalletId,
      address: address,
    });

    let response = { message: 'Token removed', token: updateToken };

    res.status(200).json(response);
  } else {
    const newToken = new UserTokensBinance({
      walletId: userWalletId,
      symbol,
      name,
      decimals,
      address,
      logoURI,
      tags,
    });

    const savedToken = await newToken.save();
    let response = { message: 'Token added', token: savedToken };
    res.status(200).json(response);
  }
});

const getUserTokensBinance = asyncHandler(async (req, res) => {
  const { userWalletId } = req.params;

  let userTokens = await UserTokensBinance.find({ walletId: userWalletId });

  res.status(200).json(userTokens);
});

//============================{UserTokensEthereum}=====================================================

const addUserTokensEthereum = asyncHandler(async (req, res) => {
  const { userWalletId, symbol, name, decimals, address, logoURI, tags } =
    req.body;

  let userToken = await UserTokensEthereum.findOne({
    walletId: userWalletId,
    address: address,
  });

  if (userToken) {
    let updateToken = await UserTokensEthereum.findOneAndRemove({
      walletId: userWalletId,
      address: address,
    });

    let response = { message: 'Token removed', token: updateToken };

    res.status(200).json(response);
  } else {
    const newToken = new UserTokensEthereum({
      walletId: userWalletId,
      symbol,
      name,
      decimals,
      address,
      logoURI,
      tags,
    });

    const savedToken = await newToken.save();
    let response = { message: 'Token added', token: savedToken };
    res.status(200).json(response);
  }
});

const getUserTokensEthereum = asyncHandler(async (req, res) => {
  const { userWalletId } = req.params;

  let userTokens = await UserTokensEthereum.find({ walletId: userWalletId });

  res.status(200).json(userTokens);
});

//============================{UserTokensFantom}=====================================================

const addUserTokensFantom = asyncHandler(async (req, res) => {
  const { userWalletId, symbol, name, decimals, address, logoURI, tags } =
    req.body;

  let userToken = await UserTokensFantom.findOne({
    walletId: userWalletId,
    address: address,
  });

  if (userToken) {
    let updateToken = await UserTokensFantom.findOneAndRemove({
      walletId: userWalletId,
      address: address,
    });

    let response = { message: 'Token removed', token: updateToken };

    res.status(200).json(response);
  } else {
    const newToken = new UserTokensFantom({
      walletId: userWalletId,
      symbol,
      name,
      decimals,
      address,
      logoURI,
      tags,
    });

    const savedToken = await newToken.save();
    let response = { message: 'Token added', token: savedToken };
    res.status(200).json(response);
  }
});

const getUserTokensFantom = asyncHandler(async (req, res) => {
  const { userWalletId } = req.params;

  let userTokens = await UserTokensFantom.find({ walletId: userWalletId });

  res.status(200).json(userTokens);
});

//============================{UserTokensGnosis}=====================================================

const addUserTokensGnosis = asyncHandler(async (req, res) => {
  const { userWalletId, symbol, name, decimals, address, logoURI, tags } =
    req.body;

  let userToken = await UserTokensGnosis.findOne({
    walletId: userWalletId,
    address: address,
  });

  if (userToken) {
    let updateToken = await UserTokensGnosis.findOneAndRemove({
      walletId: userWalletId,
      address: address,
    });

    let response = { message: 'Token removed', token: updateToken };

    res.status(200).json(response);
  } else {
    const newToken = new UserTokensGnosis({
      walletId: userWalletId,
      symbol,
      name,
      decimals,
      address,
      logoURI,
      tags,
    });

    const savedToken = await newToken.save();
    let response = { message: 'Token added', token: savedToken };
    res.status(200).json(response);
  }
});

const getUserTokensGnosis = asyncHandler(async (req, res) => {
  const { userWalletId } = req.params;

  let userTokens = await UserTokensGnosis.find({ walletId: userWalletId });

  res.status(200).json(userTokens);
});

//============================{UserTokensKlaytn}=====================================================

const addUserTokensKlaytn = asyncHandler(async (req, res) => {
  const { userWalletId, symbol, name, decimals, address, logoURI, tags } =
    req.body;

  let userToken = await UserTokensKlaytn.findOne({
    walletId: userWalletId,
    address: address,
  });

  if (userToken) {
    let updateToken = await UserTokensKlaytn.findOneAndRemove({
      walletId: userWalletId,
      address: address,
    });

    let response = { message: 'Token removed', token: updateToken };

    res.status(200).json(response);
  } else {
    const newToken = new UserTokensKlaytn({
      walletId: userWalletId,
      symbol,
      name,
      decimals,
      address,
      logoURI,
      tags,
    });

    const savedToken = await newToken.save();
    let response = { message: 'Token added', token: savedToken };
    res.status(200).json(response);
  }
});

const getUserTokensKlaytn = asyncHandler(async (req, res) => {
  const { userWalletId } = req.params;

  let userTokens = await UserTokensKlaytn.find({ walletId: userWalletId });

  res.status(200).json(userTokens);
});

//============================{UserTokensOptimism}=====================================================

const addUserTokensOptimism = asyncHandler(async (req, res) => {
  const { userWalletId, symbol, name, decimals, address, logoURI, tags } =
    req.body;

  let userToken = await UserTokensOptimism.findOne({
    walletId: userWalletId,
    address: address,
  });

  if (userToken) {
    let updateToken = await UserTokensOptimism.findOneAndRemove({
      walletId: userWalletId,
      address: address,
    });

    let response = { message: 'Token removed', token: updateToken };

    res.status(200).json(response);
  } else {
    const newToken = new UserTokensOptimism({
      walletId: userWalletId,
      symbol,
      name,
      decimals,
      address,
      logoURI,
      tags,
    });

    const savedToken = await newToken.save();
    let response = { message: 'Token added', token: savedToken };
    res.status(200).json(response);
  }
});

const getUserTokensOptimism = asyncHandler(async (req, res) => {
  const { userWalletId } = req.params;

  let userTokens = await UserTokensOptimism.find({ walletId: userWalletId });

  res.status(200).json(userTokens);
});

//============================{UserTokensPolygon}=====================================================

const addUserTokensPolygon = asyncHandler(async (req, res) => {
  const { userWalletId, symbol, name, decimals, address, logoURI, tags } =
    req.body;

  let userToken = await UserTokensPolygon.findOne({
    walletId: userWalletId,
    address: address,
  });

  if (userToken) {
    let updateToken = await UserTokensPolygon.findOneAndRemove({
      walletId: userWalletId,
      address: address,
    });

    let response = { message: 'Token removed', token: updateToken };

    res.status(200).json(response);
  } else {
    const newToken = new UserTokensPolygon({
      walletId: userWalletId,
      symbol,
      name,
      decimals,
      address,
      logoURI,
      tags,
    });

    const savedToken = await newToken.save();
    let response = { message: 'Token added', token: savedToken };
    res.status(200).json(response);
  }
});

const getUserTokensPolygon = asyncHandler(async (req, res) => {
  const { userWalletId } = req.params;

  let userTokens = await UserTokensPolygon.find({ walletId: userWalletId });

  res.status(200).json(userTokens);
});

//============================{UserTokensBinanceTestnet}=====================================================

const addUserTokensBinanceTestnet = asyncHandler(async (req, res) => {
  const { userWalletId, symbol, name, decimals, address, logoURI, tags } =
    req.body;

  let userToken = await UserTokensBinanceTestnet.findOne({
    walletId: userWalletId,
    address: address,
  });

  if (userToken) {
    let updateToken = await UserTokensBinanceTestnet.findOneAndRemove({
      walletId: userWalletId,
      address: address,
    });

    let response = { message: 'Token removed', token: updateToken };

    res.status(200).json(response);
  } else {
    const newToken = new UserTokensBinanceTestnet({
      walletId: userWalletId,
      symbol,
      name,
      decimals,
      address,
      logoURI,
      tags,
    });

    const savedToken = await newToken.save();
    let response = { message: 'Token added', token: savedToken };
    res.status(200).json(response);
  }
});

const getUserTokensBinanceTestnet = asyncHandler(async (req, res) => {
  const { userWalletId } = req.params;

  let userTokens = await UserTokensBinanceTestnet.find({
    walletId: userWalletId,
  });

  res.status(200).json(userTokens);
});

//============================{UserTokensGoerliEth}=====================================================

const addUserTokensGoerliEth = asyncHandler(async (req, res) => {
  const { userWalletId, symbol, name, decimals, address, logoURI, tags } =
    req.body;

  let userToken = await UserTokensGoerliEth.findOne({
    walletId: userWalletId,
    address: address,
  });

  if (userToken) {
    let updateToken = await UserTokensGoerliEth.findOneAndRemove({
      walletId: userWalletId,
      address: address,
    });

    let response = { message: 'Token removed', token: updateToken };

    res.status(200).json(response);
  } else {
    const newToken = new UserTokensGoerliEth({
      walletId: userWalletId,
      symbol,
      name,
      decimals,
      address,
      logoURI,
      tags,
    });

    const savedToken = await newToken.save();
    let response = { message: 'Token added', token: savedToken };
    res.status(200).json(response);
  }
});

const getUserTokensGoerliEth = asyncHandler(async (req, res) => {
  const { userWalletId } = req.params;

  let userTokens = await UserTokensGoerliEth.find({ walletId: userWalletId });

  res.status(200).json(userTokens);
});

//============================{UserTokensPolygonMumbai}=====================================================

const addUserTokensPolygonMumbai = asyncHandler(async (req, res) => {
  const { userWalletId, symbol, name, decimals, address, logoURI, tags } =
    req.body;

  let userToken = await UserTokensPolygonMumbai.findOne({
    walletId: userWalletId,
    address: address,
  });

  if (userToken) {
    let updateToken = await UserTokensPolygonMumbai.findOneAndRemove({
      walletId: userWalletId,
      address: address,
    });

    let response = { message: 'Token removed', token: updateToken };

    res.status(200).json(response);
  } else {
    const newToken = new UserTokensPolygonMumbai({
      walletId: userWalletId,
      symbol,
      name,
      decimals,
      address,
      logoURI,
      tags,
    });

    const savedToken = await newToken.save();
    let response = { message: 'Token added', token: savedToken };
    res.status(200).json(response);
  }
});

const getUserTokensPolygonMumbai = asyncHandler(async (req, res) => {
  const { userWalletId } = req.params;

  let userTokens = await UserTokensPolygonMumbai.find({
    walletId: userWalletId,
  });

  res.status(200).json(userTokens);
});

// Users Tokens List
const getAllBalancesChecker = async ({ userId, userWalletId }) => {
  // const { userWalletId, address, chainId } = req.body;

  //======================{Status: isAvailable}==============================
  let isAvailableArbitrum = false;
  let isAvailableAurora = false;
  let isAvailableAvalanche = false;
  let isAvailableBinance = false;
  let isAvailableEthereum = false;
  let isAvailableFantom = false;
  let isAvailableGnosis = false;
  let isAvailableKlaytn = false;
  let isAvailableOptimism = false;
  let isAvailablePolygon = false;
  let isAvailablePolygonMumbai = false;
  let isAvailableGoerliEth = false;
  let isAvailableBinanceTestnet = false;

  const userWallets = await Wallets.findOne({
    user: userId,
    _id: userWalletId,
  }).exec();
  let activeWallet = userWallets;
  let key = activeWallet.key;
  let walletAddress = activeWallet.walletAddress;

  const userTokensArbitrum = await UserTokensArbitrum.find({
    walletId: userWalletId,
  });

  if (userTokensArbitrum) {
    isAvailableArbitrum = true;
  }
  const userTokensAurora = await UserTokensAurora.find({
    walletId: userWalletId,
  });

  if (userTokensAurora) {
    isAvailableAurora = true;
  }
  const userTokensAvalanche = await UserTokensAvalanche.find({
    walletId: userWalletId,
  });

  if (userTokensAvalanche) {
    isAvailableAvalanche = true;
  }
  const userTokensBinance = await UserTokensBinance.find({
    walletId: userWalletId,
  });

  if (userTokensBinance) {
    isAvailableBinance = true;
  }
  const userTokensEthereum = await UserTokensEthereum.find({
    walletId: userWalletId,
  });

  if (userTokensEthereum) {
    isAvailableEthereum = true;
  }
  const userTokensFantom = await UserTokensFantom.find({
    walletId: userWalletId,
  });

  if (userTokensFantom) {
    isAvailableFantom = true;
  }
  const userTokensGnosis = await UserTokensGnosis.find({
    walletId: userWalletId,
  });

  if (userTokensGnosis) {
    isAvailableGnosis = true;
  }
  const userTokensKlaytn = await UserTokensKlaytn.find({
    walletId: userWalletId,
  });

  if (userTokensKlaytn) {
    isAvailableKlaytn = true;
  }
  const userTokensOptimism = await UserTokensOptimism.find({
    walletId: userWalletId,
  });

  if (userTokensOptimism) {
    isAvailableOptimism = true;
  }
  const userTokensPolygon = await UserTokensPolygon.find({
    walletId: userWalletId,
  });

  if (userTokensPolygon) {
    isAvailablePolygon = true;
  }
  const userTokensPolygonMumbai = await UserTokensPolygonMumbai.find({
    walletId: userWalletId,
  });

  if (userTokensPolygonMumbai) {
    isAvailablePolygonMumbai = true;
  }
  const userTokensGoerliEth = await UserTokensGoerliEth.find({
    walletId: userWalletId,
  });

  if (userTokensGoerliEth) {
    isAvailableGoerliEth = true;
  }
  const userTokensBinanceTestnet = await UserTokensBinanceTestnet.find({
    walletId: userWalletId,
  });

  if (userTokensBinanceTestnet) {
    isAvailableBinanceTestnet = true;
  }

  let response = {
    networkRPC: JSON.stringify(networkRPC),
    key,
    walletAddress: JSON.stringify(walletAddress),
    userTokensArbitrum: JSON.stringify(userTokensArbitrum),
    userTokensAurora: JSON.stringify(userTokensAurora),
    userTokensAvalanche: JSON.stringify(userTokensAvalanche),
    userTokensBinance: JSON.stringify(userTokensBinance),
    userTokensEthereum: JSON.stringify(userTokensEthereum),
    userTokensFantom: JSON.stringify(userTokensFantom),
    userTokensGnosis: JSON.stringify(userTokensGnosis),
    userTokensKlaytn: JSON.stringify(userTokensKlaytn),
    userTokensOptimism: JSON.stringify(userTokensOptimism),
    userTokensPolygon: JSON.stringify(userTokensPolygon),
    userTokensPolygonMumbai: JSON.stringify(userTokensPolygonMumbai),
    userTokensGoerliEth: JSON.stringify(userTokensGoerliEth),
    userTokensBinanceTestnet: JSON.stringify(userTokensBinanceTestnet),

    //======================{is Available}==============================

    statusArbitrum: JSON.stringify(isAvailableArbitrum),
    statusAurora: JSON.stringify(isAvailableAurora),
    statusAvalanche: JSON.stringify(isAvailableAvalanche),
    statusBinance: JSON.stringify(isAvailableBinance),
    statusEthereum: JSON.stringify(isAvailableEthereum),
    statusFantom: JSON.stringify(isAvailableFantom),
    statusGnosis: JSON.stringify(isAvailableGnosis),
    statusKlaytn: JSON.stringify(isAvailableKlaytn),
    statusOptimism: JSON.stringify(isAvailableOptimism),
    statusPolygon: JSON.stringify(isAvailablePolygon),
    statusPolygonMumbai: JSON.stringify(isAvailablePolygonMumbai),
    statusGoerliEth: JSON.stringify(isAvailableGoerliEth),
    statusBinanceTestnet: JSON.stringify(isAvailableBinanceTestnet),
  };
  console.log(response);

  return response;
};

const getAllUserTokenBalances = async ({ userId, userWalletId }) => {
  // const { userWalletId, address, chainId } = req.body;

  //======================{Status: isAvailable}==============================
  let isAvailableArbitrum = true;
  let isAvailableAurora = true;
  let isAvailableAvalanche = true;
  let isAvailableBinance = true;
  let isAvailableEthereum = true;
  let isAvailableFantom = true;
  let isAvailableGnosis = true;
  let isAvailableKlaytn = true;
  let isAvailableOptimism = true;
  let isAvailablePolygon = true;
  let isAvailablePolygonMumbai = true;
  let isAvailableGoerliEth = true;
  let isAvailableBinanceTestnet = true;

  //=================={user Tokens List}===========================

  //=================={user Balances List}===========================

  let userTokensBalancesArbitrum = [];
  let userTokensBalancesAurora = [];
  let userTokensBalancesAvalanche = [];
  let userTokensBalancesBinance = [];
  let userTokensBalancesEthereum = [];
  let userTokensBalancesFantom = [];
  let userTokensBalancesGnosis = [];
  let userTokensBalancesKlaytn = [];
  let userTokensBalancesOptimism = [];
  let userTokensBalancesPolygon = [];
  let userTokensBalancesPolygonMumbai = [];
  let userTokensBalancesGoerliEth = [];
  let userTokensBalancesBinanceTestnet = [];

  const userWallets = await Wallets.findOne({
    user: userId,
    _id: userWalletId,
  }).exec();
  let activeWallet = userWallets;
  let key = activeWallet.key;
  let walletAddress = activeWallet.walletAddress;

  const userTokensArbitrum = await UserTokensArbitrum.find({
    walletId: userWalletId,
  });

  if (!userTokensArbitrum) {
    isAvailableArbitrum = false;
  } else {
    userTokensBalancesArbitrum = await getBalance({
      networkRPC: 'https://goerli-rollup.arbitrum.io/rpc',
      userTokens: userTokensArbitrum,
      key,
      walletAddress,
    });
  }
  const userTokensAurora = await UserTokensAurora.find({
    walletId: userWalletId,
  });

  if (!userTokensAurora) {
    isAvailableAurora = false;
  } else {
    userTokensBalancesAurora = await getBalance({
      networkRPC: 'https://mainnet.aurora.dev',
      userTokens: userTokensAurora,
      key,
      walletAddress,
    });
  }
  const userTokensAvalanche = await UserTokensAvalanche.find({
    walletId: userWalletId,
  });

  if (!userTokensAvalanche) {
    isAvailableAvalanche = false;
  } else {
    userTokensBalancesAvalanche = await getBalance({
      networkRPC: 'https://api.avax.network/ext/bc/C/rpc',
      userTokens: userTokensAvalanche,
      key,
      walletAddress,
    });
  }
  const userTokensBinance = await UserTokensBinance.find({
    walletId: userWalletId,
  });

  if (!userTokensBinance) {
    isAvailableBinance = false;
  } else {
    userTokensBalancesBinance = await getBalance({
      networkRPC: 'https://rpc.ankr.com/bsc',
      userTokens: userTokensBinance,
      key,
      walletAddress,
    });
  }
  userTokensEthereum = await UserTokensEthereum.find({
    walletId: userWalletId,
  });

  if (!userTokensEthereum) {
    isAvailableEthereum = false;
  } else {
    userTokensBalancesEthereum = await getBalance({
      networkRPC: 'https://cloudflare-eth.com',
      userTokens: userTokensEthereum,
      key,
      walletAddress,
    });
  }
  const userTokensFantom = await UserTokensFantom.find({
    walletId: userWalletId,
  });

  if (!userTokensFantom) {
    isAvailableFantom = false;
  } else {
    userTokensBalancesFantom = await getBalance({
      networkRPC: 'https://rpc.ankr.com/fantom/',
      userTokens: userTokensFantom,
      key,
      walletAddress,
    });
  }
  const userTokensGnosis = await UserTokensGnosis.find({
    walletId: userWalletId,
  });

  if (!userTokensGnosis) {
    isAvailableGnosis = false;
  } else {
    userTokensBalancesGnosis = await getBalance({
      networkRPC: 'https://rpc.gnosischain.com/',
      userTokens: userTokensGnosis,
      key,
      walletAddress,
    });
  }
  const userTokensKlaytn = await UserTokensKlaytn.find({
    walletId: userWalletId,
  });

  if (!userTokensKlaytn) {
    isAvailableKlaytn = false;
  } else {
    userTokensBalancesKlaytn = await getBalance({
      networkRPC: 'https://rpc.ankr.com/klaytn',
      userTokens: userTokensKlaytn,
      key,
      walletAddress,
    });
  }
  // networkRPC2= 'https://rpc.ankr.com/multichain';
  const userTokensOptimism = await UserTokensOptimism.find({
    walletId: userWalletId,
  });

  if (!userTokensOptimism) {
    isAvailableOptimism = false;
  } else {
    userTokensBalancesOptimism = await getBalance({
      networkRPC: 'https://mainnet.optimism.io',
      userTokens: userTokensOptimism,
      key,
      walletAddress,
    });
  }
  const userTokensPolygon = await UserTokensPolygon.find({
    walletId: userWalletId,
  });

  if (!userTokensPolygon) {
    isAvailablePolygon = false;
  } else {
    userTokensBalancesPolygon = await getBalance({
      networkRPC: 'https://polygon-rpc.com',
      userTokens: userTokensPolygon,
      key,
      walletAddress,
    });
  }
  const userTokensPolygonMumbai = await UserTokensPolygonMumbai.find({
    walletId: userWalletId,
  });

  if (!userTokensPolygonMumbai) {
    isAvailablePolygonMumbai = false;
  } else {
    userTokensBalancesPolygonMumbai = await getBalance({
      networkRPC: 'https://matic-mumbai.chainstacklabs.com',
      userTokens: userTokensPolygonMumbai,
      key,
      walletAddress,
    });
  }
  const userTokensGoerliEth = await UserTokensGoerliEth.find({
    walletId: userWalletId,
  });

  if (!userTokensGoerliEth) {
    isAvailableGoerliEth = false;
  } else {
    userTokensBalancesGoerliEth = await getBalance({
      networkRPC: 'https://rpc.ankr.com/eth_goerli',
      userTokens: userTokensGoerliEth,
      key,
      walletAddress,
    });
  }
  const userTokensBinanceTestnet = await UserTokensBinanceTestnet.find({
    walletId: userWalletId,
  });

  if (!userTokensBinanceTestnet) {
    isAvailableBinanceTestnet = false;
  } else {
    userTokensBalancesBinanceTestnet = await getBalance({
      networkRPC: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
      userTokens: userTokensBinanceTestnet,
      key,
      walletAddress,
    });
  }

  let response = {
    networkRPC: JSON.stringify(networkRPC),
    // userTokens: JSON.stringify(userTokens),
    key,
    walletAddress: JSON.stringify(walletAddress),
    //=============={User Tokens}================================
    userTokensArbitrum: JSON.stringify(userTokensArbitrum),
    userTokensAurora: JSON.stringify(userTokensAurora),
    userTokensAvalanche: JSON.stringify(userTokensAvalanche),
    userTokensBinance: JSON.stringify(userTokensBinance),
    userTokensEthereum: JSON.stringify(userTokensEthereum),
    userTokensFantom: JSON.stringify(userTokensFantom),
    userTokensGnosis: JSON.stringify(userTokensGnosis),
    userTokensKlaytn: JSON.stringify(userTokensKlaytn),
    userTokensOptimism: JSON.stringify(userTokensOptimism),
    userTokensPolygon: JSON.stringify(userTokensPolygon),
    userTokensPolygonMumbai: JSON.stringify(userTokensPolygonMumbai),
    userTokensGoerliEth: JSON.stringify(userTokensGoerliEth),
    userTokensBinanceTestnet: JSON.stringify(userTokensBinanceTestnet),

    //=============={User Tokens Balances}================================
    userTokensBalancesArbitrum: JSON.stringify(userTokensBalancesArbitrum),
    userTokensBalancesAurora: JSON.stringify(userTokensBalancesAurora),
    userTokensBalancesAvalanche: JSON.stringify(userTokensBalancesAvalanche),
    userTokensBalancesBinance: JSON.stringify(userTokensBalancesBinance),
    userTokensBalancesEthereum: JSON.stringify(userTokensBalancesEthereum),
    userTokensBalancesFantom: JSON.stringify(userTokensBalancesFantom),
    userTokensBalancesGnosis: JSON.stringify(userTokensBalancesGnosis),
    userTokensBalancesKlaytn: JSON.stringify(userTokensBalancesKlaytn),
    userTokensBalancesOptimism: JSON.stringify(userTokensBalancesOptimism),
    userTokensBalancesPolygon: JSON.stringify(userTokensBalancesPolygon),
    userTokensBalancesPolygonMumbai: JSON.stringify(
      userTokensBalancesPolygonMumbai
    ),
    userTokensBalancesGoerliEth: JSON.stringify(userTokensBalancesGoerliEth),
    userTokensBalancesBinanceTestnet: JSON.stringify(
      userTokensBalancesBinanceTestnet
    ),

    //======================{is Available}==============================

    statusArbitrum: JSON.stringify(isAvailableArbitrum),
    statusAurora: JSON.stringify(isAvailableAurora),
    statusAvalanche: JSON.stringify(isAvailableAvalanche),
    statusBinance: JSON.stringify(isAvailableBinance),
    statusEthereum: JSON.stringify(isAvailableEthereum),
    statusFantom: JSON.stringify(isAvailableFantom),
    statusGnosis: JSON.stringify(isAvailableGnosis),
    statusKlaytn: JSON.stringify(isAvailableKlaytn),
    statusOptimism: JSON.stringify(isAvailableOptimism),
    statusPolygon: JSON.stringify(isAvailablePolygon),
    statusPolygonMumbai: JSON.stringify(isAvailablePolygonMumbai),
    statusGoerliEth: JSON.stringify(isAvailableGoerliEth),
    statusBinanceTestnet: JSON.stringify(isAvailableBinanceTestnet),
  };
  console.log(response);

  return response;
};

const getBalance = async ({ networkRPC, userTokens, key, walletAddress }) => {
  //==========={get Privatekey}=========================================================
  let privateKeyFormmated = JSON.stringify(key.privateKey, undefined, 2);
  let privateKey = privateKeyFormmated.replace(/^["'](.+(?=["']$))["']$/, '$1');
  const provider = new ethers.providers.JsonRpcProvider(networkRPC);
  const signer = new ethers.Wallet(privateKey, provider);
  let balanceFormat = '';
  let type = '';

  //==========={get BAlances}=========================================================
  const balances = await Promise.all(
    userTokens.map(async (x) => {
      let symbol = x.symbol;
      let address = x.address;
      let decimals = x.decimals;
      let ERC20Address = x.address;

      if (address != '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
        // It must be Non-Native

        let contract = new ethers.Contract(ERC20Address, ERC20Abi, signer);
        let balance = await contract.balanceOf(walletAddress);
        //balanceFormat = ethers.utils.formatEther(balance);
        balanceFormat = ethers.utils
          .formatUnits(balance.toString(), decimals.toString())
          .toString();
        type = 'Native';
      } else {
        const balance = await provider.getBalance(walletAddress);
        balanceFormat = ethers.utils.formatEther(balance.toString()).toString();
        type = 'Token';
      }
      let result = {
        balance: balanceFormat,
        symbol: symbol,
        type: type,
      };

      return result;
    })
  );

  // return balances
  return JSON.stringify(balances);
};

const getBalance2 = async ({ networkRPC, userTokens, key, walletAddress }) => {
  //==========={get Privatekey}=========================================================
  let privateKeyFormmated = JSON.stringify(key.privateKey, undefined, 2);
  let privateKey = privateKeyFormmated.replace(/^["'](.+(?=["']$))["']$/, '$1');
  const provider = new ethers.providers.JsonRpcProvider(networkRPC);
  const signer = new ethers.Wallet(privateKey, provider);
  let balanceFormat = '';
  let type = '';

  let balances = [];
  //==========={get BAlances}=========================================================

  for (let i = 0; i < userTokens.length; i++) {
    let symbol = userTokens[i].symbol;
    let address = userTokens[i].address;
    let decimals = userTokens[i].decimals;
    let ERC20Address = userTokens[i].address;

    if (address != '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
      // It must be Non-Native

      let contract = new ethers.Contract(ERC20Address, ERC20Abi, signer);
      let balance = await contract.balanceOf(walletAddress);
      //balanceFormat = ethers.utils.formatEther(balance);
      balanceFormat = ethers.utils
        .formatUnits(balance.toString(), decimals.toString())
        .toString();
      type = 'NATIVE';
    } else {
      const balance = await provider.getBalance(walletAddress);
      balanceFormat = ethers.utils.formatEther(balance.toString()).toString();
      type = 'ARBITRUM';
    }
    let result = {
      address: address,
      symbol: symbol,
      balance: balanceFormat,

      type: type,
    };

    balances.push(result);
    // let balancesOnly = balances.push(result.balances);
  }

  return JSON.stringify(balances);
};

// advanced mapping for arrays using for loop
// can be used in a similar way for getting wallet balances of each connected user
const mapping1 = async () => {
  let walletTokenBalances = [];
  for (let i = 0; i < tokens.length; i++) {
    try {
      const ERC20Contract = new ethers.Contract(
        tokens[i].testAddress,
        Erc20,
        signer.data
      );

      const balance = await ERC20Contract.balanceOf(walletAddress);
      walletTokenBalances.push({
        symbol: tokens[i].symbol.toUpperCase(),
        balance: ethers.utils.formatEther(balance),
        logoURI: tokens[i]?.logoURI,
      });
    } catch (e) {}
  }
  setWalletBalances(walletTokenBalances);
  setIsWalletBalanceLoading(false);
  console.info('wallet balance', walletTokenBalances);
};

//==============={Chains data}==================================

const userOneBalanceChecker = async ({ chainId }) => {
  let networkRPC = '';

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

  console.log('networRPC:', networkRPC);

  //========{Formatting networkRPC Output}=================================
  let networkRPCToJson = JSON.stringify(networkRPC);
  let networkRPCFormatted = networkRPCToJson.replace(
    /^["'](.+(?=["']$))["']$/,
    '$1'
  );

  let response = {
    networkRPC: networkRPCFormatted,
  };

  return response;

  // res.status(200).json({ status: isAvailable, token: userToken });
};

const getOneNativeBalance = asyncHandler(async (req, res) => {
  const { userId, userWalletId, chainId } = req.params;

  const data = await userOneBalanceChecker({ chainId });
  const networkRPC = data.networkRPC;

  const user = await User.findById(userId);
  if (!user) {
    res.status(400);
    throw new Error({ errorMessage: 'User not found' });
  }

  const userWallets = await Wallets.findOne({
    user: userId,
    _id: userWalletId,
  }).exec();
  let activeWallet = userWallets;
  let key = activeWallet.key;

  // let walletAddress = userWallets.walletAddress;
  let walletAddressFormmated = JSON.stringify(activeWallet.walletAddress);
  //==========={get Privatekey}=========================================================
  let privateKeyFormmated = JSON.stringify(key.privateKey, undefined, 2);
  let privateKey = privateKeyFormmated.replace(/^["'](.+(?=["']$))["']$/, '$1');

  let walletAddress = walletAddressFormmated.replace(
    /^["'](.+(?=["']$))["']$/,
    '$1'
  );

  const provider = new ethers.providers.JsonRpcProvider(networkRPC); // default is ethereum homestead
  const signer = new ethers.Wallet(privateKey, provider);

  const balanceRaw = await provider.getBalance(walletAddress);
  const balanceFormatted = ethers.utils
    .formatEther(balanceRaw.toString())
    .toString();
  const balanceNumber = Number(balanceFormatted).toFixed(4);

  const response = {
    balance: balanceNumber,
  };

  res.status(200).json(response);
});

module.exports = {
  sendToken,
  addNewWallet,
  getWallets,
  walletRecover,
  getBalanceArbitrum,
  getBalanceAurora,
  getBalanceAvalanche,
  getBalanceBinance,
  getBalanceEthereum,
  getBalanceFantom,
  getBalanceGnosis,
  getBalanceKlaytn,
  getBalancePolygon,
  getBalanceOptimism,
  getBalancePolygonMumbai,
  getBalanceGoerliEth,
  getBalanceBinanceTestnet,
  getAllTokens,
  getEstimateGas,
  getOneWallet,
  addUserTokensArbitrum,
  addUserTokensAurora,
  addUserTokensAvalanche,
  addUserTokensBinance,
  addUserTokensEthereum,
  addUserTokensFantom,
  addUserTokensGnosis,
  addUserTokensKlaytn,
  addUserTokensOptimism,
  addUserTokensPolygon,
  addUserTokensBinanceTestnet,
  addUserTokensGoerliEth,
  addUserTokensPolygonMumbai,
  getUserTokensArbitrum,
  getUserTokensAurora,
  getUserTokensAvalanche,
  getUserTokensBinance,
  getUserTokensEthereum,
  getUserTokensFantom,
  getUserTokensGnosis,
  getUserTokensKlaytn,
  getUserTokensOptimism,
  getUserTokensPolygon,
  getUserTokensBinanceTestnet,
  getUserTokensGoerliEth,
  getUserTokensPolygonMumbai,
  updateWalletAccountName,
  getUserWalletInfo,
  getOneNativeBalance,
  addNewHDWallet,
};
