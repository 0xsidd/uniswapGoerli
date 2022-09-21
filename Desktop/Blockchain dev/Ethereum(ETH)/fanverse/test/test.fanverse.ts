
// import { expect } from "chai";
// import { ethers } from "hardhat";
// import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
// import helper from "./utilities/helper";
// import helper2 from "./utilities/helper2";
// import {
//   Fanverse,
//   Fanverse__factory,

/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable node/no-missing-import */
/* eslint-disable new-cap */
import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import helper from "./utilities/helper";
import helper2 from "./utilities/helper2";
import { Fanverse, Fanverse__factory } from "../typechain";

// describe("Fanverse", async () => {
//   let myNft: Fanverse;
//   let owner: SignerWithAddress;
//   let signers: SignerWithAddress[];

//   beforeEach("", async () => {
//     signers = await ethers.getSigners();
//     owner = signers[0];
//     myNft = await new Fanverse__factory(owner).deploy();
//     await myNft.connect(owner).initialize("Fanverse", 150);
//   });

//   describe("Fanverse", async () => {
//     describe("Primary Buy", async () => {
//       it("User Buy", async () => {
//         const helperclass = new helper({ _contract: myNft, _signer: owner });
//         const voucher = await helperclass.createPrimaryVoucher(
//           myNft.address,
//           owner.address,
//           1,
//           1,
//           1,
//           100,
//           "Hello",
//           owner.address,
//           10,
//           true
//         );
//         await myNft
//           .connect(signers[1])
//           .buyFixBuy(voucher, signers[1].address, 100, { value: 100 });
//       });


//       it("User Buy : Bad Sign", async () => {
//         const helperclass = new helper({
//           _contract: myNft,
//           _signer: signers[1],
//         });
//         const voucher = await helperclass.createPrimaryVoucher(
//             myNft.address,
//             owner.address,
//             1,
//             1,
//             1,
//             100,
//             "Hello",
//             owner.address,
//             10,
//             true
//           );
//         await expect(
//           myNft
//             .connect(signers[1])
//             .buyFixBuy(voucher, signers[1].address, 50,{ value: 50 })
//         ).to.be.revertedWith("invalid signer");
//       });

//       it("User Buy : Different Nft contract", async () => {
//         const helperclass = new helper({
//           _contract: myNft,
//           _signer: signers[1],
//         });
//         const voucher = await helperclass.createPrimaryVoucher(
//             signers[7].address,
//             owner.address,
//             1,
//             1,
//             1,
//             100,
//             "Hello",
//             owner.address,
//             10,
//             true
//           );
//         await expect(
//           myNft
//             .connect(signers[1])
//             .buyFixBuy(voucher, signers[1].address, 50,{ value: 50 })
//         ).to.be.revertedWith("invalid address");
//       });
//       it("User Buy : Redeeming voucher that has expired", async () => {
//         const helperclass = new helper({
//           _contract: myNft,
//           _signer: owner,
//         });
//         const voucher = await helperclass.createPrimaryVoucher(
//             myNft.address,
//             owner.address,
//             1,
//             1,
//             1,
//             100,
//             "Hello",
//             owner.address,
//             10,
//             true
//           );
//         await
//           myNft
//             .connect(signers[1])
//             .buyFixBuy(voucher, signers[1].address, 100,{ value: 100 });
//         await expect(
//             myNft
//               .connect(signers[2])
//               .buyFixBuy(voucher, signers[2].address, 100,{ value: 100 })
//           ).to.be.revertedWith("Voucher has expired");
//       });
//       it("User Buy : owner don't have enough balance", async () => {
//         const helperclass = new helper({
//           _contract: myNft,
//           _signer: owner,
//         });
//         const voucher = await helperclass.createPrimaryVoucher(
//             myNft.address,
//             owner.address,
//             1,
//             1,
//             1,
//             100,
//             "Hello",
//             owner.address,
//             10,
//             true
//           );
//         await
//           myNft
//             .connect(signers[1])
//             .buyFixBuy(voucher, signers[1].address, 50,{ value: 50 });
//         await expect(
//             myNft
//               .connect(signers[2])
//               .buyFixBuy(voucher, signers[2].address, 60,{ value: 60 })
//           ).to.be.revertedWith("Owner doesn't have enough NFT balance");
//       });
//       it("User Buy : buyer pays less", async () => {
//         const helperclass = new helper({
//           _contract: myNft,
//           _signer: owner,
//         });
//         const voucher = await helperclass.createPrimaryVoucher(
//             myNft.address,
//             owner.address,
//             1,
//             1,
//             1,
//             100,
//             "Hello",
//             owner.address,
//             10,
//             true
//           );
//         await
//           myNft
//             .connect(signers[1])
//             .buyFixBuy(voucher, signers[1].address, 50,{ value: 50 });
//         await expect(
//             myNft
//               .connect(signers[2])
//               .buyFixBuy(voucher, signers[2].address, 50,{ value: 45 })
//           ).to.be.revertedWith("pay more");
//       });
//     });
    
//     describe("Auction", async () => {
//       it("Auction - Buy", async () => {
//         const helperclass = new helper({ _contract: myNft, _signer: owner });
//         const voucher = await helperclass.createPrimaryVoucher(
//             myNft.address,
//             owner.address,
//             1,
//             1,
//             1,
//             100,
//             "Hello",
//             owner.address,
//             10,
//             true
//           );
//         const helperclass2 = new helper({
//           _contract: myNft,
//           _signer: signers[1],
//         });
//         const voucher2 = await helperclass2.createVoucherAucBuyer(
//           myNft.address,
//           signers[1].address,
//           1,
//           50,
//           "Hello",
//           50
//         );
//         await myNft
//           .connect(owner)
//           .setApprovalForAll(myNft.address, true);
//         await myNft.connect(signers[1]).buyAuction(voucher, voucher2, {value: 50});
//       });

//       it("User Buy : Bad Sign", async () => {
//         const helperclass = new helper({
//           _contract: myNft,
//           _signer: signers[1],
//         });
//         const voucher = await helperclass.createPrimaryVoucher(
//             myNft.address,
//             owner.address,
//             1,
//             1,
//             1,
//             100,
//             "Hello",
//             owner.address,
//             10,
//             true
//           );
//           const helperclass2 = new helper({
//             _contract: myNft,
//             _signer: signers[1],
//           });
//           const voucher2 = await helperclass2.createVoucherAucBuyer(
//             myNft.address,
//             signers[1].address,
//             1,
//             50,
//             "Hello",
//             50
//           );
//         await expect(
//           myNft
//             .connect(owner)
//             .buyAuction(voucher, voucher2,{ value: 50 })
//         ).to.be.revertedWith("invalid signer");
//       });

//       it("User Buy : Different Nft contract", async () => {
//         const helperclass = new helper({
//           _contract: myNft,
//           _signer: owner,
//         });
//         const voucher = await helperclass.createPrimaryVoucher(
//             signers[7].address,
//             owner.address,
//             1,
//             1,
//             1,
//             100,
//             "Hello",
//             owner.address,
//             10,
//             true
//           );
//           const helperclass2 = new helper({
//             _contract: myNft,
//             _signer: signers[1],
//           });
//           const voucher2 = await helperclass2.createVoucherAucBuyer(
//             myNft.address,
//             signers[1].address,
//             1,
//             50,
//             "Hello",
//             50
//           );
//         await expect(
//           myNft
//             .connect(signers[1])
//             .buyAuction(voucher, voucher2,{ value: 50 })
//         ).to.be.revertedWith("invalid address");
//       });

//       it("User Buy : owner don't have enough balance", async () => {
//         const helperclass = new helper({
//           _contract: myNft,
//           _signer: owner,
//         });
//         const voucher = await helperclass.createPrimaryVoucher(
//             myNft.address,
//             owner.address,
//             1,
//             1,
//             1,
//             100,
//             "Hello",
//             owner.address,
//             10,
//             true
//           );
//           const helperclass2 = new helper({
//             _contract: myNft,
//             _signer: signers[1],
//           });
//           const voucher2 = await helperclass2.createVoucherAucBuyer(
//             myNft.address,
//             signers[1].address,
//             1,
//             120,
//             "Hello",
//             50
//           );
//         // await
//         //   myNft
//         //     .connect(signers[1])
//         //     .buyFixBuy(voucher, signers[1].address, 50,{ value: 50 });
//         await expect(
//             myNft
//               .connect(signers[1])
//               .buyAuction(voucher,voucher2,{ value: 60 })
//           ).to.be.revertedWith("Owner doesn't have enough NFT balance");
//       });
//       it("User Buy : buyer pays less", async () => {
//         const helperclass = new helper({
//           _contract: myNft,
//           _signer: owner,
//         });
//         const voucher = await helperclass.createPrimaryVoucher(
//             myNft.address,
//             owner.address,
//             1,
//             1,
//             1,
//             100,
//             "Hello",
//             owner.address,
//             10,
//             true
//           );
//           const helperclass2 = new helper({
//             _contract: myNft,
//             _signer: signers[1],
//           });
//           const voucher2 = await helperclass2.createVoucherAucBuyer(
//             myNft.address,
//             signers[1].address,
//             1,
//             50,
//             "Hello",
//             50
//           );
//         await expect(
//             myNft
//               .connect(signers[2])
//               .buyAuction(voucher, voucher2,{ value: 45 })
//           ).to.be.revertedWith("pay more");
//       });
//   });
// });
// })

//       it("User Buy : Bad Sign", async () => {
//         const helperclass = new helper({
//           _contract: myNft,
//           _signer: signers[1],
//         });
//         const voucher = await helperclass.createPrimaryVoucher(
//           myNft.address,
//           owner.address,
//           1,
//           1,
//           1,
//           100,
//           "Hello",
//           owner.address,
//           10,
//           true
//         );
//         await expect(
//           myNft
//             .connect(signers[1])
//             .buyFixBuy(voucher, signers[1].address, 50, { value: 50 })
//         ).to.be.revertedWith("invalid signer");
//       });

//       it("User Buy : Different Nft contract", async () => {
//         const helperclass = new helper({
//           _contract: myNft,
//           _signer: signers[1],
//         });
//         const voucher = await helperclass.createPrimaryVoucher(
//           signers[7].address,
//           owner.address,
//           1,
//           1,
//           1,
//           100,
//           "Hello",
//           owner.address,
//           10,
//           true
//         );
//         await expect(
//           myNft
//             .connect(signers[1])
//             .buyFixBuy(voucher, signers[1].address, 50, { value: 50 })
//         ).to.be.revertedWith("invalid address");
//       });
//       it("User Buy : Redeeming voucher that has expired", async () => {
//         const helperclass = new helper({
//           _contract: myNft,
//           _signer: owner,
//         });
//         const voucher = await helperclass.createPrimaryVoucher(
//           myNft.address,
//           owner.address,
//           1,
//           1,
//           1,
//           100,
//           "Hello",
//           owner.address,
//           10,
//           true
//         );
//         await myNft
//           .connect(signers[1])
//           .buyFixBuy(voucher, signers[1].address, 100, { value: 100 });
//         await expect(
//           myNft
//             .connect(signers[2])
//             .buyFixBuy(voucher, signers[2].address, 100, { value: 100 })
//         ).to.be.revertedWith("Voucher has expired");
//       });
//       it("User Buy : owner don't have enough balance", async () => {
//         const helperclass = new helper({
//           _contract: myNft,
//           _signer: owner,
//         });
//         const voucher = await helperclass.createPrimaryVoucher(
//           myNft.address,
//           owner.address,
//           1,
//           1,
//           1,
//           100,
//           "Hello",
//           owner.address,
//           10,
//           true
//         );
//         await myNft
//           .connect(signers[1])
//           .buyFixBuy(voucher, signers[1].address, 50, { value: 50 });
//         await expect(
//           myNft
//             .connect(signers[2])
//             .buyFixBuy(voucher, signers[2].address, 60, { value: 60 })
//         ).to.be.revertedWith("Owner doesn't have enough NFT balance");
//       });
//       it("User Buy : buyer pays less", async () => {
//         const helperclass = new helper({
//           _contract: myNft,
//           _signer: owner,
//         });
//         const voucher = await helperclass.createPrimaryVoucher(
//           myNft.address,
//           owner.address,
//           1,
//           1,
//           1,
//           100,
//           "Hello",
//           owner.address,
//           10,
//           true
//         );
//         await myNft
//           .connect(signers[1])
//           .buyFixBuy(voucher, signers[1].address, 50, { value: 50 });
//         await expect(
//           myNft
//             .connect(signers[2])
//             .buyFixBuy(voucher, signers[2].address, 50, { value: 45 })
//         ).to.be.revertedWith("pay more");
//       });
//     });

//     describe("Auction", async () => {
//       it("Auction - Buy", async () => {
//         const helperclass = new helper({ _contract: myNft, _signer: owner });
//         const voucher = await helperclass.createPrimaryVoucher(
//           myNft.address,
//           owner.address,
//           1,
//           1,
//           1,
//           100,
//           "Hello",
//           owner.address,
//           10,
//           true
//         );
//         const helperclass2 = new helper({
//           _contract: myNft,
//           _signer: signers[1],
//         });
//         const voucher2 = await helperclass2.createVoucherAucBuyer(
//           myNft.address,
//           signers[1].address,
//           1,
//           50,
//           "Hello",
//           50
//         );
//         await myNft.connect(owner).setApprovalForAll(myNft.address, true);
//         await myNft
//           .connect(signers[1])
//           .buyAuction(voucher, voucher2, { value: 50 });
//       });

//       it("User Buy : Bad Sign", async () => {
//         const helperclass = new helper({
//           _contract: myNft,
//           _signer: signers[1],
//         });
//         const voucher = await helperclass.createPrimaryVoucher(
//           myNft.address,
//           owner.address,
//           1,
//           1,
//           1,
//           100,
//           "Hello",
//           owner.address,
//           10,
//           true
//         );
//         const helperclass2 = new helper({
//           _contract: myNft,
//           _signer: signers[1],
//         });
//         const voucher2 = await helperclass2.createVoucherAucBuyer(
//           myNft.address,
//           signers[1].address,
//           1,
//           50,
//           "Hello",
//           50
//         );
//         await expect(
//           myNft.connect(owner).buyAuction(voucher, voucher2, { value: 50 })
//         ).to.be.revertedWith("invalid signer");
//       });

//       it("User Buy : Different Nft contract", async () => {
//         const helperclass = new helper({
//           _contract: myNft,
//           _signer: owner,
//         });
//         const voucher = await helperclass.createPrimaryVoucher(
//           signers[7].address,
//           owner.address,
//           1,
//           1,
//           1,
//           100,
//           "Hello",
//           owner.address,
//           10,
//           true
//         );
//         const helperclass2 = new helper({
//           _contract: myNft,
//           _signer: signers[1],
//         });
//         const voucher2 = await helperclass2.createVoucherAucBuyer(
//           myNft.address,
//           signers[1].address,
//           1,
//           50,
//           "Hello",
//           50
//         );
//         await expect(
//           myNft.connect(signers[1]).buyAuction(voucher, voucher2, { value: 50 })
//         ).to.be.revertedWith("invalid address");
//       });

//       it("User Buy : owner don't have enough balance", async () => {
//         const helperclass = new helper({
//           _contract: myNft,
//           _signer: owner,
//         });
//         const voucher = await helperclass.createPrimaryVoucher(
//           myNft.address,
//           owner.address,
//           1,
//           1,
//           1,
//           100,
//           "Hello",
//           owner.address,
//           10,
//           true
//         );
//         const helperclass2 = new helper({
//           _contract: myNft,
//           _signer: signers[1],
//         });
//         const voucher2 = await helperclass2.createVoucherAucBuyer(
//           myNft.address,
//           signers[1].address,
//           1,
//           120,
//           "Hello",
//           50
//         );
//         await expect(
//           myNft.connect(signers[1]).buyAuction(voucher, voucher2, { value: 60 })
//         ).to.be.revertedWith("Owner doesn't have enough NFT balance");
//       });
//       it("User Buy : buyer pays less", async () => {
//         const helperclass = new helper({
//           _contract: myNft,
//           _signer: owner,
//         });
//         const voucher = await helperclass.createPrimaryVoucher(
//           myNft.address,
//           owner.address,
//           1,
//           1,
//           1,
//           100,
//           "Hello",
//           owner.address,
//           10,
//           true
//         );
//         const helperclass2 = new helper({
//           _contract: myNft,
//           _signer: signers[1],
//         });
//         const voucher2 = await helperclass2.createVoucherAucBuyer(
//           myNft.address,
//           signers[1].address,
//           1,
//           50,
//           "Hello",
//           50
//         );
//         await expect(
//           myNft.connect(signers[2]).buyAuction(voucher, voucher2, { value: 45 })
//         ).to.be.revertedWith("pay more");
//       });
//     });
//   });
// });
