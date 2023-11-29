import {
  brave,
  coinbaseWallet,
  ledger,
  metamask,
  phantom,
  walletconnect,
} from '../assets/WalletOptions';

import {
  ethereum,
  polygon,
  avalanche,
  arbitrum,
  bsc,
  optimism,
  fantom,
  aurora,
  // polygonMumbai,
  // goerli,
} from '../assets/networkOptions';

// updated

export const banksOptions = [
  {
    name: 'Sberbank',
    nameRu: 'Sberbank',
    image: `https://res.cloudinary.com/datkh2oxv/image/upload/v1701282316/blendery/banks/Sber.png`,
  },
  {
    name: 'VTB Bank',
    nameRu: 'VTB Bank',
    image: `https://res.cloudinary.com/datkh2oxv/image/upload/v1701284628/blendery/banks/Vtb.png`,
  },
  {
    name: 'Alfa Bank',
    nameRu: 'Alfa Bank',
    image: `https://res.cloudinary.com/datkh2oxv/image/upload/v1701282312/blendery/banks/AlfaBank.png`,
  },

  {
    name: 'Tinkoff Bank',
    nameRu: 'Tinkoff Bank',
    image: `https://res.cloudinary.com/datkh2oxv/image/upload/v1701282317/blendery/banks/Tinkoff.png`,
  },
  {
    name: 'Bank Saint-Petersburg',
    nameRu: 'Bank Saint-Petersburg',
    image: `https://res.cloudinary.com/datkh2oxv/image/upload/v1701282315/blendery/banks/BankSaintPetersburg.png`,
  },
  {
    name: 'Sovcombank',
    nameRu: 'Sovcombank',
    image: `https://res.cloudinary.com/datkh2oxv/image/upload/v1701282316/blendery/banks/Sovcombank.png`,
  },
  {
    name: 'Gazprombank',
    nameRu: 'Gazprombank',
    image: `https://res.cloudinary.com/datkh2oxv/image/upload/v1701282314/blendery/banks/Gazprombank.png`,
  },
  {
    name: 'Rosbank',
    nameRu: 'Rosbank',
    image: `https://res.cloudinary.com/datkh2oxv/image/upload/v1701282315/blendery/banks/Rosbank.png`,
  },
  {
    name: 'Raiffeisenbank',
    nameRu: 'Raiffeisenbank',
    image: `https://res.cloudinary.com/datkh2oxv/image/upload/v1701282315/blendery/banks/Raiffeisenbank.png`,
  },
  {
    name: 'Absolut Bank',
    nameRu: 'Absolut Bank',
    image: `https://res.cloudinary.com/datkh2oxv/image/upload/v1701282312/blendery/banks/AbsolutBank.png`,
  },
  {
    name: 'Bank Otkritie',
    nameRu: 'Bank Otkritie',
    image: `https://res.cloudinary.com/datkh2oxv/image/upload/v1701282317/blendery/banks/Otkritie.png`,
  },
  {
    name: 'Citibank',
    nameRu: 'Citibank',
    image: `https://res.cloudinary.com/datkh2oxv/image/upload/v1701282313/blendery/banks/Citibank.png`,
  },
  {
    name: 'MTS Bank',
    nameRu: 'MTS Bank',
    image: `https://res.cloudinary.com/datkh2oxv/image/upload/v1701282314/blendery/banks/MTSBank.png`,
  },
];

export const cardsOptions = [
  {
    name: 'Mastercard',
    image: `https://res.cloudinary.com/datkh2oxv/image/upload/v1701282314/blendery/banks/Mastercard.png`,
    digits: 16,
    spacing: 4,
  },
  {
    name: 'Visa',
    image: `https://res.cloudinary.com/datkh2oxv/image/upload/v1701282322/blendery/banks/visacard.png`,
    digits: 16,
    spacing: 4,
  },
  {
    name: 'Mir',
    image: `https://res.cloudinary.com/datkh2oxv/image/upload/v1701282313/blendery/banks/Mir.png`,
    digits: 16,
    spacing: 4,
  },
];

export const networksOptions = [
  {
    id: 1,
    idPrice: 'ethereum',
    name: 'Ethereum',
    symbol: 'eth',
    chainSymbol: 'ETH',
    balanceSymbol: 'ETH',
    image: ethereum,
    decimals: 18,
    address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    chainId: '1',
  },
  {
    id: 56,
    idPrice: 'bnb',
    name: 'BNB Chain',
    symbol: 'bnb',
    chainSymbol: 'BNB',
    balanceSymbol: 'BNB',
    image: bsc,
    decimals: 18,
    address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    chainId: '56',
  },
  {
    id: 137,
    idPrice: 'matic-network',
    name: 'Polygon',
    symbol: 'matic',
    chainSymbol: 'MATIC',
    balanceSymbol: 'MATIC',
    image: polygon,
    decimals: 18,
    address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    chainId: '137',
  },
  {
    id: 10,
    idPrice: 'optimism',
    name: 'Optimism',
    symbol: 'op',
    chainSymbol: 'OP',
    balanceSymbol: 'ETH',
    image: optimism,
    decimals: 18,
    address: '0x4200000000000000000000000000000000000042',
    chainId: '10',
  },
  {
    id: 42161,
    idPrice: 'ethereum',
    name: 'Arbitrum',
    symbol: 'arbitrum',
    chainSymbol: 'ARBITRUM',
    balanceSymbol: 'ETH',
    image: arbitrum,
    decimals: 18,
    address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    chainId: '42161',
  },
];
export const walletOptions = [
  {
    name: 'MetaMask',
    logoURI: metamask,
  },
  {
    name: 'Coinbase Wallet',
    logoURI: coinbaseWallet,
  },
  {
    name: 'Wallet Connect',
    logoURI: walletconnect,
  },
  {
    name: 'Phantom',
    logoURI: phantom,
  },
  {
    name: 'Ledger',
    logoURI: ledger,
  },
  {
    name: 'Brave',
    logoURI: brave,
  },
];

export const marketInfo = {};

export const feedback = [
  {
    id: '1',
    name: 'Javier L.',
    address: 'AppStore',
    comment: `I am extremely delighted with the exceptional service provided by the Blendery crypto swap app.`,
  },
  {
    id: '2',
    name: 'Chang Su',
    address: 'AppStore',
    comment: `Thank you. Love this! Good to take a little profits here and there.`,
  },
  {
    id: '3',
    name: 'Liam D.',
    address: 'Google Play',
    comment: `very fast, very easy and super rates! definitely recommend!`,
  },
];

export const stepsExchange = [
  {
    id: '1',
    title: 'Set the exchange pair',
    description: 'Select the crypto pair you’d like to exchange',
  },
  {
    id: '2',
    title: 'Enter your wallet address',
    description:
      'Enter your crypto wallet address to which your cryptocurrency will be sent',
  },
  {
    id: '3',
    title: 'Make a payment',
    description:
      'Send the crypto you’d like to exchange to the wallet address you see on the screen',
  },
  {
    id: '4',
    title: 'Wait for your coins to arrive',
    description:
      'Track the progress of your exchange and be ready to get your crypto soon',
  },
];

export const stepsBuy = [
  {
    id: '1',
    title: 'Set the pair to buy',
    description:
      'Select the crypto you would like to buy and the fiat currency you want to purchase crypto with.',
  },
  {
    id: '2',
    title: 'Enter your wallet address',
    description:
      'Enter your crypto wallet address to which your cryptocurrency will be sent',
  },
  {
    id: '3',
    title: 'Proceed to our partner’s website',
    description:
      'You will be redirected to our partner’s website, where you can review all the details and proceed with the payment',
  },
  {
    id: '4',
    title: 'Await the arrival of your coins',
    description:
      'Once the transaction is completed, you can view its details on the selected provider’s platform',
  },
];

export const stepsSell = [
  {
    id: '1',
    title: 'Choose the crypto to sell',
    description:
      'Select the crypto you would like to sell and the fiat currency you prefer to receive in return',
  },
  {
    id: '2',
    title: 'Provide necessary information',
    description:
      'Verify your email address and indicate your full name and date of birth',
  },
  {
    id: '3',
    title: 'Deposit funds and enter payment details',
    description:
      'Send the chosen crypto to the provided address and fill out your card details to receive the fiat currency',
  },
  {
    id: '4',
    title: 'Complete KYC and wait for funds to arrive',
    description:
      'After you submit the information, our partner will verify it and transfer fiat currency to your linked bank card. Note that the funds may take a while to arrive',
  },
];

export const stepsDefi = [
  {
    id: '1',
    title: 'Create a wallet',
    description:
      'Create a MetaMask wallet or any other wallet of your choice supported by WalletConnect. If you already have a DeFi wallet, just skip this step.',
  },
  {
    id: '2',
    title: 'Get native currency',
    description:
      'Top up your wallet with enough native cryptocurrency to cover network fees, then select the blockchain and the token pair you would like to swap.',
  },
  {
    id: '3',
    title: 'Approve transaction',
    description:
      'Send transaction approval to the blockchain. You will have to repeat this step once for each new token you wish to trade. If you’re trading native cryptocurrencies such as Ethereum or BNB, you can skip this step.',
  },
  {
    id: '4',
    title: 'Make а swap',
    description:
      'Confirm the transaction in your wallet and wait for it to be completed. That’s it! Your tokens will now be securely stored in your wallet, ready for you to sell or use as you please.',
  },
];

export const faqExchange = [
  {
    id: '1',
    title: 'Why should I trust Blendery?',
    description:
      'Blendery is an instant cryptocurrency exchange that has been operating on the market since 2015. We successfully serviced millions of customers over this time and continue to provide quick crypto-to-crypto exchanges and purchases to more than 2.6 million users every month. In order to enhance the functionality of our crypto exchange, we collaborate with the leading companies in the industry. Our partners include the giant cryptocurrency exchange platform Binance, secure cryptocurrency wallets like Trezor, Exodus, and Coinomi, and many others. Our dedicated Support team stands guard 24/7 to help you with any exchange-related questions that might arise.',
  },
  {
    id: '2',
    title: 'How to exchange cryptocurrencies?',
    description:
      'Blendery lets you exchange cryptocurrency in a fast and secure way. Just sign up for a new account on Blendery.com, choose the cryptocurrency you would like to exchange, and click the "Exchange now" button. Afterward, enter the address of your digital wallet and wait for a bit. In several minutes, the exchanged coins will arrive in your wallet.',
  },
  {
    id: '3',
    title: 'What cryptocurrencies do you support?',
    description:
      'We support over 500 cryptocurrencies that are available for instant crypto exchange and purchase at the best execution prices. Since the crypto market is developing rapidly, we are continually building up the list of crypto assets so you can exchange, sell, and buy new digital currencies within minutes. Exchange and buy Bitcoin (BTC), Ethereum (ETH), Ripple (XRP), Litecoin (LTC), and a wide variety of other crypto assets using payment methods that suit you the most (Visa, Mastercard, bank transfer, Apple Pay).',
  },
  {
    id: '4',
    title: 'How long does it take to receive my cryptocurrency?',
    description:
      'Typically, a crypto money exchange takes around 10-40 minutes. However, a cryptocurrency exchange might take more time should there be congestion within a particular blockchain.',
  },
  {
    id: '5',
    title: 'How can I contact you?',
    description:
      'You can contact us at any time via the Live chat below. Both the Support team and the Blendery digital currency exchange work 24/7 and will be glad to help. You can also send us an email at support@blendery.com',
  },
];

export const faqBuy = [
  {
    id: '1',
    title: 'How to buy cryptocurrency?',
    description:
      'In 2020, we introduced a cryptocurrency marketplace Blendery Buy. As of today, users can instantly buy crypto with a credit card (Visa, Mastercard), bank transfer, or Apple Pay. The Blendery Buy crypto marketplace partners with the leading fiat gateways to offer you deep liquidity and the best execution prices on the market. Can’t decide which cryptocurrency to buy? Blendery lists over 500 crypto assets, including the most popular ones. Buy Bitcoin, Ethereum, Ripple, and other cryptos with ease. Just sign up for a Blendery account, choose the cryptocurrency you would like to purchase, select the best offer provided, enter the address of your digital wallet, and voilà! Now, you are a proud crypto owner.',
  },
  {
    id: '2',
    title: 'Who are Blendery’s fiat partners?',
    description:
      'Blendery Buy supports over 100 fiat currencies. So, if you would like to purchase crypto with fiat, you can buy crypto online with your native currency at any time. To date, we closely work with the following fiat-to-crypto providers: MoonPay, Simplex, Banxa, and Indacoin. We are constantly monitoring the market to extend this list and provide you with a range of execution prices that will suit you the most.',
  },
  {
    id: '3',
    title: 'What is the minimum order amount I can purchase crypto with?',
    description:
      'The minimum order amount may vary since it depends on the chosen fiat gateway. Usually, the minimum order starts at $20 (or the equivalent amount in your local fiat currency).',
  },
  {
    id: '4',
    title: 'How long does it take to receive my cryptocurrency?',
    description:
      'Transactions made with a credit card (Visa, Mastercard), bank transfer, or Apple Pay usually take several minutes. However, sometimes the transaction might be processed for a few hours. The time estimation of the particular transaction depends on several factors, including the number of orders at the exchange, additional security checks, a chosen payment method, blockchain congestion, etc.',
  },
  {
    id: '5',
    title: 'How long does the KYC verification take?',
    description:
      'Since most verifications are processed automatically, it might take several minutes to pass the KYC procedure. However, if a user submits a document that does not meet the requirements, the verification process might take longer since the verification will be processed manually.',
  },
  {
    id: '6',
    title: 'What are your supported countries, states, and territories?',
    description:
      'Please refer to clause 5 (Eligibility) of the Terms of Use for more details.',
  },
  {
    id: '7',
    title: 'How can I contact you?',
    description:
      'You can contact us at any time via the Live chat below. Both the Support team and the Blendery digital currency exchange work 24/7 and will be glad to help. You can also send us an email at support@blendery.com.',
  },
];

export const faqSell = [
  {
    id: '1',
    title: 'How to sell cryptocurrency?',
    description: `Blendery Sell enables you to sell cryptocurrency online with several clicks. Just visit Blendery.com/sell, choose the cryptocurrency you'd like to sell, submit the transaction, and follow further instructions. Sell cryptocurrency in a fast and secure manner.`,
  },
  {
    id: '2',
    title: 'Who are your partners?',
    description:
      'Mercuryo is a global payment solution that allows our customers to buy and sell cryptocurrency using bank transfers.',
  },
  {
    id: '3',
    title: 'Which cryptocurrencies can I sell?',
    description:
      'You can sell Bitcoin (BTC), Ethereum (ETH), Bitcoin Cash (BCH), Basic Attention Token (BAT), Algorand (ALGO), Tether ERC-20 (USDT), Tron (TRX), OKB (OKB), Dai (DAI), TONCOIN, and Elrond (eGLD ERC-20) using the Mercuryo provider.',
  },
  {
    id: '4',
    title: 'What is the minimum amount I can sell?',
    description:
      'The minimum transaction amount is variable and depends on the chosen cryptocurrency. For example, the minimum amount of Bitcoin you can sell is 0.0003 BTC. See the complete list on Mercuryo’s official website.',
  },
  {
    id: '5',
    title: 'What is the maximum amount I can sell?',
    description:
      'If you want to sell large amounts of cryptocurrency, please take into account that a maximum amount of crypto sold via Mercuryo cannot exceed €1,700/$2,000 per day or €7,500/$8,400 per month. If you want to sell a larger amount of cryptocurrency, we recommend that you try the full-featured cryptocurrency exchange Blendery PRO.',
  },
  {
    id: '6',
    title:
      'How long does it take to get paid after selling cryptocurrency with Mercuryo?',
    description:
      'You will receive your funds once the transaction is processed on the blockchain. The time of transaction processing is different for various blockchains. Please take into consideration that sometimes, there can be network congestion that might significantly increase the time it takes to receive your funds.',
  },
  {
    id: '7',
    title: 'How can I contact you?',
    description:
      'You can contact us at any time via the Live chat below. Both the Support team and the Blendery digital currency exchange work 24/7 and will be glad to help. You can also send us an email at support@Blendery.com.',
  },
];

export const faqDefi = [
  {
    id: '1',
    title: `What is the difference between decentralized (DEX) and centralized (CEX) exchanges?`,
    description:
      'Decentralized exchanges (DEXs) eliminate the need for intermediaries, enabling you to trade cryptocurrencies securely and with complete control over your assets. DEXs operate on the basis of smart contracts, offering a wide range of over 3600 DeFi exotic tokens for exchange. However, these tokens can only be traded within their specific networks, such as Ethereum or Binance Smart Chain (BSC).',
    description2:
      'On the other hand, centralized exchanges (CEXs) offer access to great liquidity, allowing for the exchange of over 500 cryptocurrencies across 140+ blockchains and providing a seamless cross-chain exchange experience.',
  },
  {
    id: '2',
    title: 'Why are exchanges available only within one network?',
    description:
      'Currently, integration on our platform works only with decentralized exchanges (DEXs), which allows exchanges only within one network (for example, Ethereum). Soon, we will integrate decentralized cross-chain bridges that will enable exchanges through different blockchain networks as well.',
  },
  {
    id: '3',
    title: 'Why is it necessary to allow the use of tokens?',
    description: `To exchange ERC20 or BEP20 tokens, it's important to first complete the "approving" transaction. This step grants permission for our smart contract to access and utilize your tokens during the swap process. This is a standard procedure in DeFi protocols and once the approval is made for a specific token type, it will remain valid for future exchanges. Please note that this doesn’t apply to native cryptocurrencies like Ethereum or BNB.`,
  },
  {
    id: '4',
    title: 'Where can I get cryptocurrency to use DeFi Swap?',
    description: `If you wish to exchange a cryptocurrency based on one network for a cryptocurrency based on another, you can do so in the Exchange section. Alternatively, for cryptocurrency purchases, visit the platform's Buy section, where you can obtain various cryptocurrencies using fiat currency.`,
  },
  {
    id: '5',
    title: 'Are there any restrictions or limitations on swaps?',
    description: `On DeFi Swap, there are no restrictions on the minimum or maximum exchange amounts. All exchange rules are defined and executed through a smart contract, ensuring a secure and seamless exchange experience. If your transaction is successful, you'll receive the exchanged tokens promptly. However, if for any reason the transaction can't be executed,your original tokens will be returned to you without loss, minus a small network fee for the transaction attempt.`,
  },
];

export const helpExchange = [
  {
    id: '1',
    title: 'How to Exchange Crypto on Blendery: A Step-by-Step Guide',
    icon: '',
    description:
      'Blendery offers a lot of various crypto services, but the core of our platform has always been our exchange.',
  },
  {
    id: '2',
    title: 'How to choose a wallet?',
    icon: '',
    description:
      'In this article, Blendery will consider the types of wallets and explain which crypto wallet to choose.',
  },
  {
    id: '3',
    title: 'Transaction ID',
    icon: '',
    description:
      'So what is it, and how can it help you when making crypto and fiat transactions?',
  },
  {
    id: '4',
    title: 'Cryptocurrency Hashing Algorithms Explained',
    icon: '',
    description:
      'Cryptocurrency algorithms are a set of specific cryptographic mechanisms and rules that encrypt a digital currency.',
  },
  {
    id: '5',
    title: 'If you sent the wrong coin or to the wrong network',
    icon: '',
    description:
      'Please pay close attention to the network and currency protocol displayed on our platform, when you create a transaction.',
  },
  {
    id: '6',
    title: 'Investment Strategies and Tips',
    icon: '',
    description:
      'Become a successful crypto investor by learning crypto investing basics and essentials.',
  },
];

export const helpBuy = [
  {
    id: '1',
    title: 'How to choose a wallet?',
    icon: '',
    description:
      'In this article, Blendery will consider the types of wallets and explain which crypto wallet to choose.',
  },
  {
    id: '2',
    title: 'How to buy Bitcoin in 5 Easy steps',
    icon: '',
    description:
      'There are not that many people nowadays who don’t know what Bitcoin is. It’s currently one of the highest value assets anyone can',
  },
  {
    id: '3',
    title: 'All the Best Cryptocurrency Apps In One Article',
    icon: '',
    description:
      'The crypto market has grown a lot in the last few years. As a result, crypto enthusiasts now have a wide range of apps they',
  },
];

export const helpSell = [
  {
    id: '1',
    title: 'How can I sell crypto on Blendery?',
    icon: '',
    description:
      'Blendery provides its users with the selling feature via our partner, Mecuryo. Follow these simple steps to withdraw crypto to your bank card',
  },
  {
    id: '2',
    title:
      'How to Sell Large Amounts of BTC (Bitcoins)? Tools and Tips to Sell Bitcoins for Cash',
    icon: '',
    description: `We've gathered all the essentials and put them in a comprehensive article to tell you how to sell large amounts`,
  },
];

export const helpDefi = [
  {
    id: '1',
    title: 'What Is a Decentralized Exchange (DEX), and How Do DEXs Work?',
    icon: '',
    description:
      'Decentralized exchanges are a staple of the crypto world but they can seem confusing at first. In reality, however, they are easy to use.',
  },
  {
    id: '2',
    title: 'Centralized (CEX) vs. Decentralized (DEX)',
    icon: '',
    description: `What are the difference between centralized and decentralized cryptocurrency exchanges? Is it better to use CEX or DEX? Find out in this article.`,
  },
  {
    id: '3',
    title: 'How to Use Blendery DeFi Swap — a Step-by-Step Guide',
    icon: '',
    description: `Our recently released DeFi Swap gives users the chance to exchange thousands of tokens at excellent rates and with little costs. Let's look at it closer!`,
  },
  {
    id: '4',
    title: 'Blendery DeFi Swap: Most Common Questions',
    icon: '',
    description: `We've finally launched our own decentralized exchange for DeFi swaps! Find answers to the most common questions that may occur here!`,
  },
  {
    id: '5',
    title: 'What Is DeFi 2.0? A Comprehensive Guide to Next-Gen DeFi',
    icon: '',
    description: `The way that we think about finance is changing as a result of decentralized finance (DeFi). But what lies ahead for this rapidly expanding sector?`,
  },
  {
    id: '6',
    title: 'Answering popular questions about DeFi',
    icon: '',
    description: `DeFi Swap is a decentralized exchange aggregator that encompasses a wide range of decentralized exchanges’ offers to make the most profitable instant swaps within one blockchain.`,
  },
];
