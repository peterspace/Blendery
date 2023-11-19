
const ChainsKlaytn = require('../../models/Chains/Klaytn.js');

//Require tokenId
//==========================================={chain}======================================
//======================================={Create Token}=============================================================================================
const addNewChainsKlaytn = async (req, res) => {
  const {
    chainId,
    name,
    address,
    symbol,
    logoUrl,
    networkName,
    currency,
    decimals,
    explorerName,
    explorerUrl,
    explorerApi,
    networkRpc,
    networkRpc2,
    type,
    networkDecimals,
    chain,
  } = req.body;


  // Confirm data
  if (!chainId || !address || networkRpc) {
    return res.status(400).json({ message: 'All fields are required' })
}

const duplicate = await ChainsKlaytn.findOne({ address }).collation({ locale: 'en', strength: 2 }).lean().exec()

if (duplicate) {
    return res.status(409).json({ message: 'Duplicate Toke address' })
}

let token = new ChainsKlaytn();
    token.chainId = chainId;
    token.name = name;
    token.address = address;
    token.symbol = symbol;
    token.logoUrl = logoUrl;
    token.networkName = networkName;
    token.currency = currency;
    token.decimals = decimals;
    token.explorerName = explorerName;
    token.explorerUrl = explorerUrl;
    token.explorerApi = explorerApi;
    token.networkRpc = networkRpc;
    token.networkRpc2 = networkRpc2;
    token.type = type;
    token.networkDecimals = networkDecimals;
    token.chain = chain;

    const newToken = await token.save();

    if (newToken) { // Created 
      return res.status(201).json({ message: 'New Token created' })
  } else {
      return res.status(400).json({ message: 'Invalid Token data received' })
  }
};

// To get all networks
const getChainsKlaytn = async (req, res) => {
  const chain = await ChainsKlaytn.find();
  if (!chain?.length) {
    return res.status(400).json('No chain found');
  }
  res.json(chain);
};

const getOneChain = async (req, res) => {
  const { id } = req.params;

  const token = await ChainsKlaytn.findById(id).exec()

  if (!token) {
      return res.status(400).json({ message: 'Token not found' })
  }
  res.json(token);
};


const updateChainsKlaytn = async (req, res) => {
  const {
    id,
    chainId,
    name,
    address,
    symbol,
    logoUrl,
    networkName,
    currency,
    decimals,
    explorerName,
    explorerUrl,
    explorerApi,
    networkRpc,
    networkRpc2,
    type,
    networkDecimals,
    chain,
  } = req.body;

   // Confirm data
   if (!id || !chainId || !address || networkRpc) {
    return res.status(400).json({ message: 'All fields are required' })
}

  // Confirm Chain exists to update
  const token = await ChainsKlaytn.findById(id).exec();

  if (!token) {
    return res.status(400).json({ message: 'token not found' });
  }

  // Check for duplicate title
  const duplicate = await token.findOne({ address })
    .collation({ locale: 'en', strength: 2 })
    .lean()
    .exec();

  // Allow renaming of the original chain
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: 'Duplicate chain address' });
  }

  token.chainId = chainId;
    token.name = name;
    token.address = address;
    token.symbol = symbol;
    token.logoUrl = logoUrl;
    token.networkName = networkName;
    token.currency = currency;
    token.decimals = decimals;
    token.explorerName = explorerName;
    token.explorerUrl = explorerUrl;
    token.explorerApi = explorerApi;
    token.networkRpc = networkRpc;
    token.networkRpc2 = networkRpc2;
    token.type = type;
    token.networkDecimals = networkDecimals;
    token.chain = chain;

  const updatedToken = await token.save();

  res.json(`'${updatedToken.name}' updated`);
};



const deleteChainsKlaytn = async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: 'Chain ID required' });
  }

  // Confirm Chain exists to delete
  const token = await ChainsKlaytn.findById(id).exec();

  if (!token) {
    return res.status(400).json({ message: 'Chain not found' });
  }

  const result = await token.deleteOne();

  const reply = `Chain '${result.name}' with ID ${result._id} deleted`;

  res.json(reply);
};


module.exports = {
  addNewChainsKlaytn,
  getChainsKlaytn,
  updateChainsKlaytn,
  deleteChainsKlaytn,
} 