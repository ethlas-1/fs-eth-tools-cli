#!/usr/bin/env node

const { Command } = require("commander");
const program = new Command();

program
  .name("fs-eth-tools")
  .description(
    "Useful toolset from FailSafe team to perform various operations on EVM blockchain using command line"
  )
  .version("0.8.0");

// Import the `change contract ownership` command handler
program.command(
  "cco",
  "Subcommands to manage the ownership of Ethereum smart contracts that inherits OpenZeppelin's Ownable contract",
  { executableFile: "cco/index.js" }
);

// Import the `access control enumerable` command handler
program.command(
  "ace",
  "Subcommands to manage the roles of an Ethereum smart contracts that inherits OpenZeppelin's AccessControlEnumerable contract",
  { executableFile: "ace/index.js" }
);

program.parse(process.argv);
