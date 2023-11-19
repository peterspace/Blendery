async function validateInputs({ chainId, networkRpc, liveMode }) {
  if (!chainId) {
    throw new Error(' chainId is required');
  }
  if (!networkRpc) {
    throw new Error('networkRpc is required');
  }

  if (!liveMode) {
    throw new Error('liveMode is required');
  }
  const approved = true;
  return approved;
}

module.exports = validateInputs;
