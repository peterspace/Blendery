const Aurora = {
  tokens: {
    '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee': {
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: 18,
      address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
      logoURI:
        'https://tokens.1inch.io/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png',
      tags: ['native'],
    },
    '0xc9bdeed33cd01541e1eed10f90519d2c06fe3feb': {
      address: '0xc9bdeed33cd01541e1eed10f90519d2c06fe3feb',
      symbol: 'WETH',
      name: 'Wrapped ETH',
      decimals: 18,
      logoURI:
        'https://tokens.1inch.io/0xc9bdeed33cd01541e1eed10f90519d2c06fe3feb.png',
      wrappedNative: true,
      tags: ['tokens', 'PEG:ETH'],
    },
    '0xe3520349f477a5f6eb06107066048508498a291b': {
      address: '0xe3520349f477a5f6eb06107066048508498a291b',
      symbol: 'DAI',
      name: 'Dai Stablecoin',
      decimals: 18,
      logoURI:
        'https://tokens.1inch.io/0xe3520349f477a5f6eb06107066048508498a291b.png',
      tags: ['tokens', 'PEG:USD'],
    },
    '0x026dda7f0f0a2e42163c9c80d2a5b6958e35fc49': {
      symbol: 'CRF',
      name: 'Crafting Finance',
      decimals: 18,
      address: '0x026dda7f0f0a2e42163c9c80d2a5b6958e35fc49',
      logoURI:
        'https://tokens.1inch.io/0x026dda7f0f0a2e42163c9c80d2a5b6958e35fc49.png',
      tags: ['tokens'],
    },
    '0xda2585430fef327ad8ee44af8f1f989a2a91a3d2': {
      symbol: 'FRAX',
      name: 'Frax',
      decimals: 18,
      address: '0xda2585430fef327ad8ee44af8f1f989a2a91a3d2',
      logoURI:
        'https://tokens.1inch.io/0xda2585430fef327ad8ee44af8f1f989a2a91a3d2.png',
      tags: ['tokens'],
    },
    '0x885f8cf6e45bdd3fdcdc644efdcd0ac93880c781': {
      symbol: 'PAD',
      name: 'NearPad Token',
      decimals: 18,
      address: '0x885f8cf6e45bdd3fdcdc644efdcd0ac93880c781',
      logoURI:
        'https://tokens.1inch.io/0x885f8cf6e45bdd3fdcdc644efdcd0ac93880c781.png',
      tags: ['tokens'],
    },
    '0x291c8fceaca3342b29cc36171deb98106f712c66': {
      symbol: 'PICKLE',
      name: 'PickleToken',
      decimals: 18,
      address: '0x291c8fceaca3342b29cc36171deb98106f712c66',
      logoURI:
        'https://tokens.1inch.io/0x291c8fceaca3342b29cc36171deb98106f712c66.png',
      tags: ['tokens'],
    },
    '0xb12bfca5a55806aaf64e99521918a4bf0fc40802': {
      symbol: 'USDC',
      name: 'USD Coin',
      decimals: 6,
      address: '0xb12bfca5a55806aaf64e99521918a4bf0fc40802',
      logoURI:
        'https://tokens.1inch.io/0xb12bfca5a55806aaf64e99521918a4bf0fc40802.png',
      tags: ['tokens', 'PEG:USD'],
    },
    '0xf4eb217ba2454613b15dbdea6e5f22276410e89e': {
      symbol: 'WBTC',
      name: 'Wrapped BTC',
      decimals: 8,
      address: '0xf4eb217ba2454613b15dbdea6e5f22276410e89e',
      logoURI:
        'https://tokens.1inch.io/0xf4eb217ba2454613b15dbdea6e5f22276410e89e.png',
      tags: ['tokens', 'PEG:BTC'],
    },
    '0xc42c30ac6cc15fac9bd938618bcaa1a1fae8501d': {
      symbol: 'NEAR',
      name: 'NEAR',
      decimals: 24,
      address: '0xc42c30ac6cc15fac9bd938618bcaa1a1fae8501d',
      logoURI:
        'https://tokens.1inch.io/0xc42c30ac6cc15fac9bd938618bcaa1a1fae8501d.png',
      tags: ['tokens'],
    },
    '0x74974575d2f1668c63036d51ff48dbaa68e52408': {
      symbol: 'MODA',
      name: 'moda',
      decimals: 18,
      address: '0x74974575d2f1668c63036d51ff48dbaa68e52408',
      logoURI:
        'https://tokens.1inch.io/0x74974575d2f1668c63036d51ff48dbaa68e52408.png',
      tags: ['tokens'],
    },
    '0x8bec47865ade3b172a928df8f990bc7f2a3b9f79': {
      symbol: 'AURORA',
      name: 'Aurora',
      decimals: 18,
      address: '0x8bec47865ade3b172a928df8f990bc7f2a3b9f79',
      logoURI:
        'https://tokens.1inch.io/0x8bec47865ade3b172a928df8f990bc7f2a3b9f79.png',
      tags: ['tokens'],
    },
    '0xdcd6d4e2b3e1d1e1e6fa8c21c8a323dcbecff970': {
      symbol: 'ROSE',
      name: 'Rose Token',
      decimals: 18,
      address: '0xdcd6d4e2b3e1d1e1e6fa8c21c8a323dcbecff970',
      logoURI:
        'https://tokens.1inch.io/0xdcd6d4e2b3e1d1e1e6fa8c21c8a323dcbecff970.png',
      tags: ['tokens'],
    },
    '0xd126b48c072f4668e944a8895bc74044d5f2e85b': {
      symbol: 'MNFT',
      name: 'MANUFACTORY',
      decimals: 18,
      address: '0xd126b48c072f4668e944a8895bc74044d5f2e85b',
      logoURI:
        'https://tokens.1inch.io/0xd126b48c072f4668e944a8895bc74044d5f2e85b.png',
      tags: ['tokens'],
    },
    '0x7faa64faf54750a2e3ee621166635feaf406ab22': {
      symbol: 'WANNA',
      name: 'WannaSwap',
      decimals: 18,
      address: '0x7faa64faf54750a2e3ee621166635feaf406ab22',
      logoURI:
        'https://tokens.1inch.io/0x7faa64faf54750a2e3ee621166635feaf406ab22.png',
      tags: ['tokens'],
    },
    '0x4988a896b1227218e4a686fde5eabdcabd91571f': {
      symbol: 'USDT',
      name: 'Tether USD',
      decimals: 6,
      address: '0x4988a896b1227218e4a686fde5eabdcabd91571f',
      logoURI:
        'https://tokens.1inch.io/0x4988a896b1227218e4a686fde5eabdcabd91571f.png',
      tags: ['tokens', 'PEG:USD'],
    },
    '0x09c9d464b58d96837f8d8b6f4d9fe4ad408d3a4f': {
      symbol: 'PLY',
      name: 'Aurigami Token',
      decimals: 18,
      address: '0x09c9d464b58d96837f8d8b6f4d9fe4ad408d3a4f',
      logoURI:
        'https://tokens.1inch.io/0x09c9d464b58d96837f8d8b6f4d9fe4ad408d3a4f.png',
      tags: ['tokens'],
    },
    '0xea62791aa682d455614eaa2a12ba3d9a2fd197af': {
      symbol: 'FLX',
      name: 'Flux Token',
      decimals: 18,
      address: '0xea62791aa682d455614eaa2a12ba3d9a2fd197af',
      logoURI:
        'https://tokens.1inch.io/0xea62791aa682d455614eaa2a12ba3d9a2fd197af.png',
      tags: ['tokens'],
    },
    '0x501ace9c35e60f03a2af4d484f49f9b1efde9f40': {
      symbol: 'SOLACE',
      name: 'solace',
      decimals: 18,
      address: '0x501ace9c35e60f03a2af4d484f49f9b1efde9f40',
      logoURI:
        'https://tokens.1inch.io/0x501ace9c35e60f03a2af4d484f49f9b1efde9f40.png',
      tags: ['tokens'],
    },
    '0x5ce9f0b6afb36135b5ddbf11705ceb65e634a9dc': {
      symbol: 'atUST',
      name: 'UST Terra',
      decimals: 18,
      address: '0x5ce9f0b6afb36135b5ddbf11705ceb65e634a9dc',
      logoURI:
        'https://tokens.1inch.io/0x5ce9f0b6afb36135b5ddbf11705ceb65e634a9dc.png',
      tags: ['tokens'],
    },
    '0x5183e1b1091804bc2602586919e6880ac1cf2896': {
      symbol: 'USN',
      name: 'USN',
      decimals: 18,
      address: '0x5183e1b1091804bc2602586919e6880ac1cf2896',
      logoURI:
        'https://tokens.1inch.io/0x5183e1b1091804bc2602586919e6880ac1cf2896.png',
      tags: ['tokens'],
    },
    '0xfa94348467f64d5a457f75f8bc40495d33c65abb': {
      symbol: 'TRI',
      name: 'Trisolaris',
      decimals: 18,
      address: '0xfa94348467f64d5a457f75f8bc40495d33c65abb',
      logoURI:
        'https://tokens.1inch.io/0xfa94348467f64d5a457f75f8bc40495d33c65abb.png',
      eip2612: true,
      tags: ['tokens'],
    },
    '0x2bae00c8bc1868a5f7a216e881bae9e662630111': {
      symbol: 'ABR',
      name: 'Allbridge',
      decimals: 18,
      address: '0x2bae00c8bc1868a5f7a216e881bae9e662630111',
      logoURI:
        'https://tokens.1inch.io/0x2bae00c8bc1868a5f7a216e881bae9e662630111.png',
      tags: ['tokens'],
    },
  },
};
module.exports = Aurora;
