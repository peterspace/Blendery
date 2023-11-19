const Web3 = require('web3');

// const { getblock } = require('./getblock.config.js');
// var Web3 = require('web3');

// // Create the JSON-RPC provider
// var web3Rpc = new Web3(
//   new Web3.providers.HttpProvider(getblock.shared.eth.mainnet.rpc[0].go())
// );

// // var web3Rpc = new Web3(
// //   new Web3.providers.HttpProvider(getblock.shared.eth.mainnet.jsonRpc[0].go())
// // );

// // Create the WebSocket provider
// var web3Ws = new Web3.providers.WebsocketProvider(
//   `wss://go.getblock.io/${getblock.shared.eth.mainnet.ws[0].token()}`
// );

// console.log({web3Ws: web3Ws})
const wssGoreli = 'wss://go.getblock.io/6c4fc468de9c4097875b931e8a1264ec';
const rpcGoreli = 'https://go.getblock.io/1e391968bab843c1bf3f3c42181942b0';

const wssEthereum = 'wss://go.getblock.io/3eca94e5b6f54129a425559e716f5187';
const rpcEthereum = 'https://go.getblock.io/67683fa7c6c34f2e88445f4a844c16ec';

class TransactionChecker {
  web3;
  web3ws;
  account;
  subscription;

  //   constructor(projectId, account) {

  // this.web3ws = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/' + projectId));
  // this.web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/' + projectId));
  constructor(account) {
    //============={} gorli test net}========================
    this.web3ws = new Web3(new Web3.providers.WebsocketProvider(wssGoreli));
    this.web3 = new Web3(new Web3.providers.HttpProvider(rpcGoreli));
    this.account = account.toLowerCase();
  }

  subscribe(topic) {
    this.subscription = this.web3ws.eth.subscribe(topic, (err, res) => {
      if (err) console.error(err);
    });
  }

  watchTransactions() {
    console.log('Watching all pending transactions...');
    this.subscription.on('data', (txHash) => {
      setTimeout(async () => {
        try {
          let tx = await this.web3.eth.getTransaction(txHash);
          if (tx != null) {
            if (this.account == tx.to.toLowerCase()) {
              console.log({
                address: tx.from,
                value: this.web3.utils.fromWei(tx.value, 'ether'),
                timestamp: new Date(),
              });
            }
          }
        } catch (err) {
          console.error(err);
        }
      }, 60000);
    });
  }
}

// let txChecker = new TransactionChecker(
//   process.env.INFURA_ID,
//   '0xe1Dd30fecAb8a63105F2C035B084BfC6Ca5B1493'
// );
const walletAddress = '0x2754897d2B0493Fd0463281e36db83BB202f6343';
let txChecker = new TransactionChecker(walletAddress);
txChecker.subscribe('pendingTransactions');
txChecker.watchTransactions();
