import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import chatReducer from './features/chat/chatSlice';
import placeReducer from './features/place/placeSlice';
import enquiryReducer from './features/enquiry/enquirySlice';
import hdWalletReducer from './features/hdWallet/hdWalletSlice';
import walletReducer from './features/wallet/walletSlice';
import messagesReducer from './features/messages/messagesSlice';
import tokenReducer from './features/token/tokenSlice';
import swapReducer from './features/swap/swapSlice';
import transactionReducer from './features/transaction/transactionSlice';
import userReducer from './features/user/userSlice';
// import chainsBinanceReducer from './features/chainsBinance/chainsBinanceSlice';
// import chainsBinanceTestReducer from './features/chainsBinanceTest/chainsBinanceTestSlice';
// import chainsBitcoinReducer from './features/chainsBitcoin/chainsBitcoinSlice';
// import chainsEthereumReducer from './features/chainsEthereum/chainsEthereumSlice';
// import chainsGoerliEthReducer from './features/chainsGoerliEth/chainsGoerliEthSlice';
// import chainsPolygonReducer from './features/chainsPolygon/chainsPolygonSlice';
// import chainsPolygonMumbaiReducer from './features/chainsPolygonMumbai/chainsPolygonMumbaiSlice';
// import chainsTronReducer from './features/chainsTron/chainsTronSlice';

import { combineReducers } from '@reduxjs/toolkit';

const reducer = combineReducers({
  auth: authReducer,
  chat: chatReducer,
  enquiry: enquiryReducer,
  hdWallet: hdWalletReducer,
  messages: messagesReducer,
  place: placeReducer,
  swap: swapReducer,
  wallet: walletReducer,
  token: tokenReducer,
  transaction: transactionReducer,
  user: userReducer,
  // chainsBinance: chainsBinanceReducer,
  // chainsBinanceTest: chainsBinanceTestReducer,
  // chainsBitcoin: chainsBitcoinReducer,
  // chainsEthereum: chainsEthereumReducer,
  // chainsGoerliEth: chainsGoerliEthReducer,
  // chainsPolygon: chainsPolygonReducer,
  // chainsPolygonMumbai: chainsPolygonMumbaiReducer,
  // chainsTron: chainsTronReducer,
});

export const store = configureStore({
  reducer,
});
