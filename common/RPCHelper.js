function getRPCURL(chainId) {
  const supportedChainIds = [1, 56, 137, 8453];
  const RPC_URLS = {
    137: "https://polygon-rpc.com",
    1: "https://mainnet.infura.io/v3/80ad14d1287a4669a0889f5d735391a7",
    56: "https://bsc-dataseed1.binance.org",
    8453: "https://mainnet.base.org",
  };

  if (supportedChainIds.includes(chainId)) {
    return RPC_URLS[chainId];
  }
  throw new Error(
    "Unsupported chainId. Supported chainIds: " + supportedChainIds.join(", ")
  );
}

module.exports = {
  getRPCURL: getRPCURL,
};
