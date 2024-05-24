#!/usr/bin/env node

const { Command } = require("commander");
const chalk = require("chalk");
const program = new Command();

const {
  commandHandlerCheckIfAccountHasRole,
} = require("./check-if-account-has-role/index");
const {
  commandHandlerGrantRoleToAddress,
} = require("./grant-role-to-address/index");
const {
  commandHandlerRevokeRoleFromAddress,
} = require("./revoke-role-from-address/index");
const {
  commandHandlerListAccountsForRole,
} = require("./list-accounts-for-role/index");

program
  .name("ace")
  .description(
    "Subcommands to manage the roles of an Ethereum smart contracts that inherits OpenZeppelin's AccessControlEnumerable contract"
  )
  .version("0.8.0");

program
  .command("check-if-account-has-role")
  .description(
    "Check if an account has a role on the Ethereum smart contract that inherits OpenZeppelin's AccessControlEnumerable contract"
  )
  .argument("<contractAddress>", "smart contract address")
  .argument("<walletAddress>", "wallet address")
  .argument("<roleBytes32>", "role bytes 32 string")
  .argument("<chainId>", "chain id", parseInt)
  .action(async (contractAddress, walletAddress, roleBytes32, chainId) => {
    try {
      const returnCode = await commandHandlerCheckIfAccountHasRole(
        contractAddress,
        walletAddress,
        roleBytes32,
        chainId
      );

      if (returnCode === 0) {
        console.log(
          chalk.green(
            "Wallet address " + walletAddress + " has role " + roleBytes32
          )
        );
      } else {
        console.log(
          chalk.red(
            "Wallet address " +
              walletAddress +
              " does not have role " +
              roleBytes32
          )
        );
      }
    } catch (error) {
      console.log(chalk.red(error.message));
    }
  });

program
  .command("grant-role-to-address")
  .description(
    "Grant role to an address on the Ethereum smart contract that inherits OpenZeppelin's AccessControlEnumerable contract"
  )
  .argument("<contractAddress>", "smart contract address")
  .argument("<walletAddress>", "wallet address")
  .argument("<roleBytes32>", "role bytes 32 string")
  .argument("<chainId>", "chain id", parseInt)
  .action(async (contractAddress, walletAddress, roleBytes32, chainId) => {
    try {
      const returnCode = await commandHandlerGrantRoleToAddress(
        contractAddress,
        walletAddress,
        roleBytes32,
        chainId
      );

      if (returnCode === 0) {
        console.log(chalk.green("Role granted successfully."));
      } else {
        console.log(
          chalk.red("Some error occurred while granting role to the address.")
        );
      }
    } catch (error) {
      console.log(chalk.red(error.message));
    }
  });

program
  .command("revoke-role-from-address")
  .description(
    "Revoke a role from an address on the Ethereum smart contract that inherits OpenZeppelin's AccessControlEnumerable contract"
  )
  .argument("<contractAddress>", "smart contract address")
  .argument("<walletAddress>", "wallet address")
  .argument("<roleBytes32>", "role bytes 32 string")
  .argument("<chainId>", "chain id", parseInt)
  .action(async (contractAddress, walletAddress, roleBytes32, chainId) => {
    try {
      const returnCode = await commandHandlerRevokeRoleFromAddress(
        contractAddress,
        walletAddress,
        roleBytes32,
        chainId
      );

      if (returnCode === 0) {
        console.log(chalk.green("Role revoked successfully."));
      } else {
        console.log(
          chalk.red("Some error occurred while revoking role from the address.")
        );
      }
    } catch (error) {
      console.log(chalk.red(error.message));
    }
  });

program
  .command("list-accounts-for-role")
  .description(
    "List accounts that have a given role on the Ethereum smart contract that inherits OpenZeppelin's AccessControlEnumerable contract"
  )
  .argument("<contractAddress>", "smart contract address")
  .argument("<roleBytes32>", "role bytes 32 string")
  .argument("<chainId>", "chain id", parseInt)
  .action(async (contractAddress, roleBytes32, chainId) => {
    try {
      const returnResult = await commandHandlerListAccountsForRole(
        contractAddress,
        roleBytes32,
        chainId
      );

      if (returnResult && returnResult.length > 0) {
        console.log(chalk.green(JSON.stringify(returnResult, 2, null)));
      } else {
        console.log(
          chalk.red("No accounts found with the given role on the contract.")
        );
      }
    } catch (error) {
      console.log(chalk.red(error.message));
    }
  });

program.parse(process.argv);
