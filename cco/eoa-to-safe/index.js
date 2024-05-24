const TransferOwnershipABI = require("./TransferOwnershipABI.json");
const { getRPCURL } = require("../../common/RPCHelper");
const {
  isNullAddress,
  isValidAddress,
  getGasEstimates,
} = require("../../common/utils");
const Web3 = require("web3");

const path = require("path");
const dotenv = require("dotenv");
const result = dotenv.config({ path: path.join(__dirname, ".env.local") });

async function commandHandlerEoAToSafe(contractAddress, safeAddress, chainId) {
  try {
    if (isNullAddress(contractAddress) || !isValidAddress(contractAddress)) {
      throw new Error("Invalid or null contract address");
    }

    if (isNullAddress(safeAddress) || !isValidAddress(safeAddress)) {
      throw new Error("Invalid or null safe address");
    }

    if (typeof chainId !== "number" || chainId <= 0) {
      throw new Error("Invalid chain id");
    }

    if (!process.env.CURRENT_OWNER_PRIV) {
      throw new Error("CURRENT_OWNER_PRIV not set in .env.local file");
    }

    const web3 = new Web3(getRPCURL(chainId));

    const currentOwnerPriv = process.env.CURRENT_OWNER_PRIV;

    const account = web3.eth.accounts.privateKeyToAccount(currentOwnerPriv);
    // Extract the current owner wallet address
    const currentOwnerWalletAddress = account.address;

    const contract = new web3.eth.Contract(
      TransferOwnershipABI,
      contractAddress
    );
    const transferOwnershipFunction =
      contract.methods.transferOwnership(safeAddress);
    const gasEstimates = await getGasEstimates(
      web3,
      transferOwnershipFunction,
      currentOwnerWalletAddress
    );

    const transferOwnershipTxPayload = {
      from: currentOwnerWalletAddress,
      to: contractAddress,
      chainId: chainId,
      gas: gasEstimates.gas,
      data: transferOwnershipFunction.encodeABI(),
      gasPrice: gasEstimates.gasPrice,
      nonce: gasEstimates.nonce,
    };

    const transferOwnershipTxSigned = await web3.eth.accounts.signTransaction(
      transferOwnershipTxPayload,
      currentOwnerPriv
    );

    const receipt = await web3.eth.sendSignedTransaction(
      transferOwnershipTxSigned.rawTransaction
    );

    if (receipt.status) {
      return 0;
    } else {
      return 1;
    }
  } catch (error) {
    if (error.message.indexOf("execution reverted" >= 0)) {
      throw new Error(
        "Execution reverted by the smart contract. Check if private key in the environment file is the current owner of the contract."
      );
    } else {
      throw error;
    }
  }
}

module.exports = {
  commandHandlerEoAToSafe: commandHandlerEoAToSafe,
};
