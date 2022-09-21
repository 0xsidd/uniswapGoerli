/* eslint-disable no-process-exit */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
const BN = require("ethers").BigNumber;
const { ethers } = require("hardhat");
const {
    time, // time
    constants,
  } = require("@openzeppelin/test-helpers");
const { factory } = require("typescript");
// const { SOL_EXP_HEADER_PREFIX } = require("@poanet/solidity-flattener/helpers/constants");

async function fmain() {
    const [deployer] = await ethers.getSigners();
    const { chainId } = await ethers.provider.getNetwork();

    const owner = "0xF3CF8B7B952377557d8DB8f111a277AD67a3Dbff";

    const testnet = {
        Fanverse: "0x63e7B18Ab8329BC4ECE508D9997E7E11c76d49f6"
    }

    let FANVERSE = await ethers.getContractFactory("Fanverse");

    // let fanverse = await FANVERSE.deploy();
    let NFT = await FANVERSE.attach(testnet.Fanverse);
    // await NFT.initialize("Fanverse", 100);
    console.log("fanverse Address");

}
fmain()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });