#!/usr/bin/env node

const { Command } = require("commander");
const chalk = require("chalk");
const program = new Command();

const { commandHandlerEoAToSafe } = require("./eoa-to-safe/index");

program
  .name("cco")
  .description(
    "Subcommands to manage the ownership of Ethereum smart contracts that inherits OpenZeppelin's Ownable contract"
  )
  .version("0.8.0");

program
  .command("eoa-to-safe")
  .description(
    "Convert the ownership of an Ethereum smart contract from an externally owned wallet address to a Safe (multi-signature) wallet address"
  )
  .argument("<contractAddress>", "smart contract address")
  .argument("<safeAddress>", "safe multi-sig wallet address")
  .argument("<chainId>", "chain id", parseInt)
  .action(async (contractAddress, safeAddress, chainId) => {
    try {
      const returnCode = await commandHandlerEoAToSafe(
        contractAddress,
        safeAddress,
        chainId
      );

      if (returnCode === 0) {
        console.log(
          chalk.green(
            "Ownership of contract successfully transferred to Safe wallet"
          )
        );
      } else {
        console.log(
          chalk.red("Failed to transfer ownership of contract to Safe wallet")
        );
      }
    } catch (error) {
      console.log(chalk.red(error.message));
    }
  });

program.parse(process.argv);
