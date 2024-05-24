const AccessControlEnumerableABI = require("../common/AccessControlEnumerableABI.json");
const { getRPCURL } = require("../../common/RPCHelper");
const { isNullAddress, isValidAddress } = require("../../common/utils");
const Web3 = require("web3");

const path = require("path");
const dotenv = require("dotenv");
const result = dotenv.config({ path: path.join(__dirname, ".env.local") });

async function commandHandlerCheckIfAccountHasRole(
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

    const web3 = new Web3(getRPCURL(chainId));

    const contract = new web3.eth.Contract(
      AccessControlEnumerableABI,
      contractAddress
    );

    const hasRoleResponse = await contract.methods
      .hasRole(roleBytes32, walletAddress)
      .call({
        from: walletAddress,
      });

    if (hasRoleResponse) {
      return 0;
    } else {
      return 1;
    }
  } catch (error) {
    throw error;
  }
}

module.exports = {
  commandHandlerCheckIfAccountHasRole: commandHandlerCheckIfAccountHasRole,
};
