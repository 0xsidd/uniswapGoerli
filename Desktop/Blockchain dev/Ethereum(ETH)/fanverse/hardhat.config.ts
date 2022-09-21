/* eslint-disable prettier/prettier */
import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "@nomiclabs/hardhat-web3";
import "solidity-coverage";

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.14",
    settings :{
      optimizer :{
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    ropsten: {
      url: process.env.ROPSTEN_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    bsctestnet: {
      url: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
      accounts: [`0xa4cf9f6d432010daa2d049b0028aea8d8d9b917a9ca38a969d18351d0929823f`],
      // gasPrice: 500000000
    },
    rinkeby: {
      url: 'https://eth-rinkeby.alchemyapi.io/v2/BWMh4yxGGzCwVntdaYk835zNhbFc-tUX',
      accounts: [`0xa4cf9f6d432010daa2d049b0028aea8d8d9b917a9ca38a969d18351d0929823f`],
      // gasPrice: 500000000
    },
  },
  etherscan: {
    apiKey: 'K2KYW58RBCGMX3RP134XXP82TN4VP5WSV5',
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
};

export default config;
