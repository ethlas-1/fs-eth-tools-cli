const AccessControlEnumerableABI = require("../common/AccessControlEnumerableABI.json");
const { getRPCURL } = require("../../common/RPCHelper");
const { isNullAddress, isValidAddress } = require("../../common/utils");
const Web3 = require("web3");

const path = require("path");
const dotenv = require("dotenv");
const result = dotenv.config({ path: path.join(__dirname, ".env.local") });

async function commandHandlerListAccountsForRole(
  contractAddress,
  roleBytes32,
  chainId
) {
  try {
    if (isNullAddress(contractAddress) || !isValidAddress(contractAddress)) {
      throw new Error("Invalid or null contract address");
    }

    if (typeof chainId !== "number" || chainId <= 0) {
      throw new Error("Invalid chain id");
    }

    const web3 = new Web3(getRPCURL(chainId));

    const contract = new web3.eth.Contract(
      AccessControlEnumerableABI,
      contractAddress
    );

    const memberCount = await contract.methods
      .getRoleMemberCount(roleBytes32)
      .call();

    let members = [];
    for (var i = 0; i < memberCount; i++) {
      let member = await contract.methods.getRoleMember(roleBytes32, i).call();
      members.push(member);
    }

    return members;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  commandHandlerListAccountsForRole: commandHandlerListAccountsForRole,
};
