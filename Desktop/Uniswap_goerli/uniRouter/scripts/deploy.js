// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  let signer;
    let uniswapV2Router;
    let uniswapV2Factory;
    let uniswapV2Pair;
    let getInit;
    let initHash;
    let weth;
    let lpToken;
    let feeToSetterAddress = '0x16a4CbBdD4872418b69A4946c05228B035a401FD';
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
    const GetInit = await ethers.getContractFactory("CalHash");
    getInit = await GetInit.deploy();
    initHash = await getInit.getInitHash();
    console.log("initHash",initHash);
    // console.log(GetInit);

    // const LpToken = await ethers.getContractFactory("UniswapV2ERC20");
    // lpToken = await LpToken.deploy();

    // const WETH = await ethers.getContractFactory("WETH9");
    // weth = await WETH.deploy();
    // console.log(weth.address,"weth.address");
    // // await weth.wait();
      
    // const UniswapV2Factory = await ethers.getContractFactory("UniswapV2Factory");
    // uniswapV2Factory = await UniswapV2Factory.deploy(feeToSetterAddress);
    // console.log(uniswapV2Factory.address,"uniswapV2Factory.address");
    // await uniswapV2Factory.wait();

    // const UniswapV2Pair = await ethers.getContractFactory("UniswapV2Pair");
    // uniswapV2Pair = await UniswapV2Pair.deploy();
    // console.log(uniswapV2Pair.address,"uniswapV2Pair.address");
    // await uniswapV2Pair.wait();
    let factoryAddress = '0x01705144f6f42F8902260c9A83ACd1f5243Ec1bc';
    let wethAddress = '0x9929a6080B3252D05E874C7C9B62755cF94ffa79';
    const UniswapV2Router = await ethers.getContractFactory("UniswapV2Router02");
    uniswapV2Router = await UniswapV2Router.deploy(factoryAddress,wethAddress); //pair0x0813a5E1f703F4488cE7C0c5bF8B26B9e2496be0
    console.log(uniswapV2Router.address,"uniswapV2Router.address");
    // await uniswapV2Router.wait();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
