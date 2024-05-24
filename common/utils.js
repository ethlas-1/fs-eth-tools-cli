const Web3 = require("web3");

function isNullAddress(address) {
  const web3 = new Web3("https://polygon.rpc.blxrbdn.com");
  const nullAddress = "0x0000000000000000000000000000000000000000";
  return (
    web3.utils.toChecksumAddress(address) ===
    web3.utils.toChecksumAddress(nullAddress)
  );
}

function isValidAddress(address) {
  const web3 = new Web3("https://polygon.rpc.blxrbdn.com");
  return web3.utils.isAddress(address);
}

async function getGasEstimates(web3, contractFunction, fromWalletAddress) {
  let gasLimit = await contractFunction.estimateGas({
    from: fromWalletAddress,
  });

  const BN = web3.utils.BN;

  // 1.2 times, to increase the chance of transaction being successful
  gasLimit = new BN(gasLimit).mul(new BN(12)).div(new BN(10));

  // 1.2 times, to improve the transaction processing time
  let gasPrice = await web3.eth.getGasPrice();
  gasPrice = new BN(gasPrice).mul(new BN(12)).div(new BN(10));

  const nonce = await web3.eth.getTransactionCount(fromWalletAddress);
  return {
    gas: web3.utils.toHex(gasLimit.toString()),
    gasPrice: web3.utils.toHex(gasPrice.toString()),
    nonce: nonce,
  };
}

module.exports = {
  isNullAddress: isNullAddress,
  isValidAddress: isValidAddress,
  getGasEstimates: getGasEstimates,
};
