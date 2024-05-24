# fs-eth-tools-cli
Useful toolset from FailSafe team to perform various operations on EVM blockchain on the command line

## Installation

1. Install globally using **npm install -g fs-eth-tools-cli**
2. Execute commands using the command prefix **fs-eth-tools**

See list of available commands below

| Command  | Explaination  |
| ------------ | ------------ |
|  **cco** |  Commands to manage the ownership of Ethereum smart contracts that inherits OpenZeppelin's Ownable contract |
|  **ace** | Commands to manage the roles of an Ethereum smart contracts that inherits OpenZeppelin's AccessControlEnumerable contract  |
| **help**| Display list of available Commands |

See list of available sub-commands under each command below

| Command  | Sub-command  | Arguements  | Explainination  | Example |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| **cco**   | eoa-to-safe  | 1.contractAddress 2.safeAddress 3.chainId  | Convert the ownership of an Ethereum smart contract from an externally owned wallet address to a Safe (multi-signature) wallet address  | fs-eth-tools cco 0x475e0DB6c69117565A85cd6cBc06a917274CE189 0xD503aa20Fd1704B8600933E531804d3d4B58672d 137	|
| **cco**   | help  |   | Display list of available sub-commands for **cco** | fs-eth-tools cco help	|
| **ace**   | check-if-account-has-role  | 1.contractAddress 2.walletAddress 3.roleBytes32 4.chainId  | Check if an account has a role on the Ethereum smart contract that inherits OpenZeppelin's AccessControlEnumerable contract   | fs-eth-tools ace check-if-account-has-role 0x986F5dD85b7C7361ed9Fc4b5094d3C5eD1a34fDa 0xe7804c37c13166fF0b37F5aE0BB07A3aEbb6e245 0x0000000000000000000000000000000000000000000000000000000000000003 137	|
| **ace**   | check-if-account-has-role  | 1.contractAddress 2.walletAddress 3.roleBytes32 4.chainId  | Grant role to an address on the Ethereum smart contract that inherits OpenZeppelin's AccessControlEnumerable contract   | fs-eth-tools ace grant-role-to-address 0x986F5dD85b7C7361ed9Fc4b5094d3C5eD1a34fDa 0xe7804c37c13166fF0b37F5aE0BB07A3aEbb6e245 0x0000000000000000000000000000000000000000000000000000000000000003 137	|
| **ace**   | revoke-role-from-address  | 1.contractAddress 2.walletAddress 3.roleBytes32 4.chainId  | Revoke role from an address on the Ethereum smart contract that inherits OpenZeppelin's AccessControlEnumerable contract   | fs-eth-tools ace revoke-role-from-address 0x986F5dD85b7C7361ed9Fc4b5094d3C5eD1a34fDa 0xe7804c37c13166fF0b37F5aE0BB07A3aEbb6e245 0x0000000000000000000000000000000000000000000000000000000000000003 137	|
| **ace**   | list-accounts-for-role  | 1.contractAddress 2.roleBytes32 3.chainId  | List accounts that have a given role on the Ethereum smart contract that inherits OpenZeppelin's AccessControlEnumerable contract | fs-eth-tools ace list-accounts-for-role 0x986F5dD85b7C7361ed9Fc4b5094d3C5eD1a34fDa 0x0000000000000000000000000000000000000000000000000000000000000003 137	|
| **ace**   | help  |   | Display list of available sub-commands for **ace** | fs-eth-tools ace help	|

