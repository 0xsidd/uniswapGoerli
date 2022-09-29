require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
// require('hardhat-contract-sizer');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
// task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
//   const accounts = await hre.ethers.getSigners();

//   for (const account of accounts) {
//     console.log(account.address);
//   }
// });

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 module.exports = {
  solidity: "0.8.4",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
  // contractSizer: {
  //   alphaSort: true,
  //   runOnCompile: true,
  //   disambiguatePaths: false,
  // },
  networks: {
    goerli: {
        url: `https://goerli.infura.io/v3/1e3b867538be4c389db34ecc5dc7b8b5`,
        // url: `https://rpc.goerli.mudit.blog/`,
        accounts: ["1aa00af2249c90ddef8565fb073e682e361699fd802b46b2efc867198ffbc71c"],
        //gasPrice: 50000000000
      },
    // hardhat: {
    //   allowUnlimitedContractSize: true,
    //   // chainId: 0
    // },
  },
  // gasReporter: {
  //   currency: 'CHF',
  //   gasPrice: 21
  // },
  // networks: {
    // goerli: {
    //   url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
    //   accounts: [GOERLI_PRIVATE_KEY]
    // }
  // }
  // defaultNetwork: 'localhost',
  // networks: {
  //   localhost: {
  //     forking: {
  //       url: "https://eth-mainnet.alchemyapi.io/v2/<your key here>",
  //       blockNumber: 15023890,
  //     },
  //   },
  // },
};
