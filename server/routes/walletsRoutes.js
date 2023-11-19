const express = require('express');
const router = express.Router();

// const protect = require('../middleware/authMiddleware.js');

const {
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
} = require('../controllers/walletController.js');

//router.use(verifyJWT)

//==========================={          }===============================================
//==========================={  CREATE  }===============================================
//==========================={          }===============================================

//========{Start: Active}==============================
router.post('/create-wallet', addNewWallet);
// router.route('/create-wallet').post(addNewWallet);
// router.route('/send-token').post(verifyToken, sendToken); //===================(New
router.route('/send-token').post(sendToken); //===================(New
router.route('/recover-wallet').post(walletRecover);

//========{End: Active}==============================

//==========================={         }===============================================
//==========================={  FETCH  }===============================================
//==========================={         }===============================================

//========{All active}==============================
// router.route('/my-wallets').get(getWallets);
router.route('/my-wallets/:userId').get(getWallets);
router
  .route('/balances-arbitrum/:userId/:userWalletId')
  .get(getBalanceArbitrum);
router.route('/balances-aurora/:userId/:userWalletId').get(getBalanceAurora);
router
  .route('/balances-avalanche/:userId/:userWalletId')
  .get(getBalanceAvalanche);
router.route('/balances-binance/:userId/:userWalletId').get(getBalanceBinance);
router
  .route('/balances-ethereum/:userId/:userWalletId')
  .get(getBalanceEthereum);
router.route('/balances-fantom/:userId/:userWalletId').get(getBalanceFantom);
router.route('/balances-gnosis/:userId/:userWalletId').get(getBalanceGnosis);
router.route('/balances-klaytn/:userId/:userWalletId').get(getBalanceKlaytn);
router.route('/balances-polygon/:userId/:userWalletId').get(getBalancePolygon);
router
  .route('/balances-optimism/:userId/:userWalletId')
  .get(getBalanceOptimism);
router
  .route('/balances-polygonMumbai/:userId/:userWalletId')
  .get(getBalancePolygonMumbai);
router
  .route('/balances-goerliEth/:userId/:userWalletId')
  .get(getBalanceGoerliEth);
router
  .route('/balances-binanceTestnet/:userId/:userWalletId')
  .get(getBalanceBinanceTestnet);
// router.route('/tokens-all/:id').get(getAllTokens);
router.route('/tokens-all/:chainId').get(getAllTokens);

// router.route('/tokens/addUserTokenArbitrum').patch(addUserTokenArbitrum);

router.route('/tokens/addUserTokenArbitrum').post(addUserTokensArbitrum);
router
  .route('/tokens/getUserTokenArbitrum/:userWalletId')
  .get(getUserTokensArbitrum);

router.route('/tokens/addUserTokenAurora').post(addUserTokensAurora);
router
  .route('/tokens/getUserTokenAurora/:userWalletId')
  .get(getUserTokensAurora);

router.route('/tokens/addUserTokenAvalanche').post(addUserTokensAvalanche);
router
  .route('/tokens/getUserTokenAvalanche/:userWalletId')
  .get(getUserTokensAvalanche);

router.route('/tokens/addUserTokenBinance').post(addUserTokensBinance);
router
  .route('/tokens/getUserTokenBinance/:userWalletId')
  .get(getUserTokensBinance);

router.route('/tokens/addUserTokenEthereum').post(addUserTokensEthereum);
router
  .route('/tokens/getUserTokenEthereum/:userWalletId')
  .get(getUserTokensEthereum);

router.route('/tokens/addUserTokenFantom').post(addUserTokensFantom);
router
  .route('/tokens/getUserTokenFantom/:userWalletId')
  .get(getUserTokensFantom);

router.route('/tokens/addUserTokenGnosis').post(addUserTokensGnosis);
router
  .route('/tokens/getUserTokenGnosis/:userWalletId')
  .get(getUserTokensGnosis);

router.route('/tokens/addUserTokenKlaytn').post(addUserTokensKlaytn);
router
  .route('/tokens/getUserTokenKlaytn/:userWalletId')
  .get(getUserTokensKlaytn);

router.route('/tokens/addUserTokenOptimism').post(addUserTokensOptimism);
router
  .route('/tokens/getUserTokenOptimism/:userWalletId')
  .get(getUserTokensOptimism);

router.route('/tokens/addUserTokenPolygon').post(addUserTokensPolygon);
router
  .route('/tokens/getUserTokenPolygon/:userWalletId')
  .get(getUserTokensPolygon);

router
  .route('/tokens/addUserTokenBinanceTestnet')
  .post(addUserTokensBinanceTestnet);
router
  .route('/tokens/getUserTokenBinanceTestnet/:userWalletId')
  .get(getUserTokensBinanceTestnet);

router.route('/tokens/addUserTokenGoerliEth').post(addUserTokensGoerliEth);
router
  .route('/tokens/getUserTokenGoerliEth/:userWalletId')
  .get(getUserTokensGoerliEth);

router
  .route('/tokens/addUserTokenPolygonMumbai')
  .post(addUserTokensPolygonMumbai);
router
  .route('/tokens/getUserTokenPolygonMumbai/:userWalletId')
  .get(getUserTokensPolygonMumbai);

router.route('/updateWalletAccountName').patch(updateWalletAccountName);
router.route('/getUserWalletInfo/:userId/:userWalletId').get(getUserWalletInfo);
router.route('/tokens/estimated-gas').post(getEstimateGas);
// router.route('/tokens/user-wallets/?:userId').get(getUserWallet);
router.route('/user-wallet/:userId/:userWalletId').get(getOneWallet);
router
  .route('/tokens/getOneNativeBalance/:userId/:userWalletId/:chainId')
  .get(getOneNativeBalance);
router
  .route('/tokens/addNewHDWallet/:userId/:userWalletId')
  .get(addNewHDWallet); // its a get request



module.exports = router;
