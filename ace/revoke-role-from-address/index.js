const AccessControlEnumerableABI = require("../common/AccessControlEnumerableABI.json");
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

async function commandHandlerRevokeRoleFromAddress(
  contractAddress,
  walletAddress,
  roleBytes32,
  chainId
) {
  try {
    if (isNullAddress(contractAddress) || !isValidAddress(contractAddress)) {
      throw new Error("Invalid or null contract address");
    }

    if (isNullAddress(walletAddress) || !isValidAddress(walletAddress)) {
      throw new Error("Invalid or null safe address");
    }

    if (typeof chainId !== "number" || chainId <= 0) {
      throw new Error("Invalid chain id");
    }

    if (!process.env.ROLE_ADMIN_PRIV) {
      throw new Error("ROLE_ADMIN_PRIV not set in .env.local file");
    }

    const web3 = new Web3(getRPCURL(chainId));

    const roleAdminPriv = process.env.ROLE_ADMIN_PRIV;

    const account = web3.eth.accounts.privateKeyToAccount(roleAdminPriv);
    // Extract the role admin wallet address
    const roleAdminWalletAddress = account.address;

    const contract = new web3.eth.Contract(
      AccessControlEnumerableABI,
      contractAddress
    );

    const revokeRoleFunction = contract.methods.revokeRole(
      roleBytes32,
      walletAddress
    );

    const gasEstimates = await getGasEstimates(
      web3,
      revokeRoleFunction,
      walletAddress
    );

    const revokeRoleTxPayload = {
      from: roleAdminWalletAddress,
      to: contractAddress,
      chainId: chainId,
      gas: gasEstimates.gas,
      data: revokeRoleFunction.encodeABI(),
      gasPrice: gasEstimates.gasPrice,
      nonce: gasEstimates.nonce,
    };

    const revokeRoleTxPayloadSigned = await web3.eth.accounts.signTransaction(
      revokeRoleTxPayload,
      roleAdminPriv
    );

    const receipt = await web3.eth.sendSignedTransaction(
      revokeRoleTxPayloadSigned.rawTransaction
    );

    if (receipt.status) {
      return 0;
    } else {
      return 1;
    }
  } catch (error) {
    throw error;
  }
}

module.exports = {
  commandHandlerRevokeRoleFromAddress: commandHandlerRevokeRoleFromAddress,
};
