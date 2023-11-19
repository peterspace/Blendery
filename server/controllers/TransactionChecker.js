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
const network = 'https://rpc.ankr.com/eth_goerli';

module.exports = class TransactionChecker {
  account;

  constructor(account) {
    this.web3 = new Web3(new Web3.providers.HttpProvider(rpcGoreli));
    // this.web3 = new Web3(new Web3.providers.HttpProvider(network));
    // this.account = account.toLowerCase();
    this.account = account;
  }

  // const block = await provider.getBlockNumber();
  // const contractEvent = dexContract.queryFilter('Mint', block - 10, block);
  async checkBlock() {
    console.log({ 'current account': this.account });
    let block = await this.web3.eth.getBlock('latest');
    // let currentBlock = await this.web3.eth.getBlock('latest');
    // let block = currentBlock - 20; // check from previos 20 blocks

    let number = block.number;
    console.log('Searching block ' + number);

    if (block != null && block.transactions != null) {
      for (let txHash of block.transactions) {
        let tx = await this.web3.eth.getTransaction(txHash);
        // if (this.account == tx.to.toLowerCase()) {
        if (this.account == tx?.to) {
          console.log('Transaction found on block: ' + number);
          console.log({
            address: tx.from,
            value: this.web3.utils.fromWei(tx.value, 'ether'),
            timestamp: new Date(),
          });
        }
      }
    }
  }
};

// { 'current account': '0x2754897d2B0493Fd0463281e36db83BB202f6343' }
// Searching block 9958079
// Transaction found on block: 9958079
// {
//   address: '0x6fba12b1370499C5824E9383c445C3298D72501C',
//   value: '0.1',
//   timestamp: 2023-10-30T16:53:37.903Z
// }
// { 'current account': '0x2754897d2B0493Fd0463281e36db83BB202f6343' }
// Searching block 9958081
// { 'current account': '0x2754897d2B0493Fd0463281e36db83BB202f6343' }
