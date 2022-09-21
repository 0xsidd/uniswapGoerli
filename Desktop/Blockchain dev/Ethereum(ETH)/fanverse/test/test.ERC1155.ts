/* eslint-disable new-cap */
/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
/* eslint-disable node/no-missing-import */
import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import helper from "./utilities/helper";
import helper2 from "./utilities/helper2";
    
import {
  Fanverse,
  Fanverse__factory,
  Secondbuy,
  Secondbuy__factory
} from "../typechain";
import { sign } from "crypto";

describe("Fanverse", async () => {
  let myNft: Fanverse;
  let myNft2: Secondbuy;
  let owner: SignerWithAddress;
  let signers: SignerWithAddress[];

  beforeEach("", async () => {
    signers = await ethers.getSigners();
    owner = signers[0];
    myNft = await new Fanverse__factory(owner).deploy();
    myNft2 = await new Secondbuy__factory(owner).deploy();
    await myNft.connect(owner).initialize("Fanverse", 150);
    await myNft2.connect(owner).initializes();
  });

  describe("Fanverse", async () => {
    describe("Primary Buy", async () => {
      it("User Buy : single user buy Nft equal to the listed amount", async () => {
        const helperclass2 = new helper({ _contract: myNft, _signer: owner });
        const voucher2 = await helperclass2.createMintVoucher(
          myNft.address,
          owner.address,
          1,
          100,
          "Hello",
          owner.address,
          1
        );
        const helperclass = new helper({ _contract: myNft, _signer: owner });
        const voucher = await helperclass.createPrimaryVoucher(
          owner.address,
          1,
          1,
          2,
          50,
          true
        );
        
        await myNft
          .connect(signers[1])
          .buyFixBuy(voucher2, voucher, signers[1].address, 50, { value: 50 });
      });
      it("User Buy : multiple users buy Nft equal to the listed amount", async () => {
        const helperclass2 = new helper({ _contract: myNft, _signer: owner });
        const voucher2 = await helperclass2.createMintVoucher(
          myNft.address,
          owner.address,
          1,
          100,
          "Hello",
          owner.address,
          1
        );
        // console.log(myNft2);
        
        const helperclass = new helper({ _contract: myNft, _signer: owner });
        const voucher = await helperclass.createPrimaryVoucher(
          owner.address,
          1,
          1,
          2,
          50,
          true
        );
        
        await myNft
          .connect(signers[1])
          .buyFixBuy(voucher2, voucher, signers[1].address, 50, { value: 50 });
          const helperclass3 = new helper({ _contract: myNft, _signer: owner });
          const voucher3 = await helperclass3.createPrimaryVoucher(
            owner.address,
            1,
            1,
            3,
            50,
            true
          )
            await myNft
            .connect(signers[2])
            .buyFixBuy(voucher2, voucher3, signers[2].address, 50, { value: 50 });
            // await myNft
            // .connect(signers[2])
            // .buyFixBuy(voucher2, voucher3, signers[2].address, 50, { value: 50 });
      });

      it.only("User Buy : multiple users buy Nft equal to the listed amount", async () => {
        const helperclass2 = new helper({ _contract: myNft, _signer: owner });
        const voucher2 = await helperclass2.createMintVoucher(
          myNft.address,
          owner.address,
          1,
          100,
          "Hello",
          owner.address,
          1
        );
        // console.log(myNft2);
        
        const helperclass = new helper({ _contract: myNft, _signer: owner });
        const voucher = await helperclass.createPrimaryVoucher(
          owner.address,
          1,
          1,
          2,
          50,
          true
        );
        
        await myNft
          .connect(signers[1])
          .buyFixBuy(voucher2, voucher, signers[1].address, 50, { value: 50 });
          
////////////////////////////////////////////////////////////////////////////////////////////////////
        const helperclassReSell = new helper2({ _contract: myNft2, _signer: signers[1] });
        const voucherReSell = await helperclassReSell.createSecondaryVoucher(
          myNft.address,
          signers[1].address,
          1,
          1,
          4,
          "Hello",
          true
        );
        // console.log(voucherReSell);

        await myNft2.connect(signers[1]).secondarybuy(voucherReSell,signers[3].address);
        
        
      });

      it("User Buy : More Than the listed amount", async () => {
        const helperclass2 = new helper({ _contract: myNft, _signer: owner });
        const voucher2 = await helperclass2.createMintVoucher(
          myNft.address,
          owner.address,
          1,
          100,
          "Hello",
          owner.address,
          1
        );
        const helperclass = new helper({ _contract: myNft, _signer: owner });
        const voucher = await helperclass.createPrimaryVoucher(
          owner.address,
          1,
          1,
          2,
          50,
          true
        );
        
        await expect( myNft
          .connect(signers[1])
          .buyFixBuy(voucher2, voucher, signers[1].address, 100, { value: 50 })).to.be.revertedWith("Not listed enough NFTs");
      });

      it("User Buy : Owner owns less NFTs than listed", async () => {
        const helperclass2 = new helper({ _contract: myNft, _signer: owner });
        const voucher2 = await helperclass2.createMintVoucher(
          myNft.address,
          owner.address,
          1,
          50,
          "Hello",
          owner.address,
          1
        );
        const helperclass = new helper({ _contract: myNft, _signer: owner });
        const voucher = await helperclass.createPrimaryVoucher(
          owner.address,
          1,
          1,
          2,
          100,
          true
        );
  
          await expect( myNft
            .connect(signers[1])
            .buyFixBuy(voucher2, voucher, signers[1].address, 100, { value: 50 })).to.be.revertedWith("Cannot mint less than listed NFTS");
      });

      it("User Buy : Redeeming voucher that has expired", async () => {
        const helperclass2 = new helper({ _contract: myNft, _signer: owner });
        const voucher2 = await helperclass2.createMintVoucher(
          myNft.address,
          owner.address,
          1,
          100,
          "Hello",
          owner.address,
          1
        );
        const helperclass = new helper({ _contract: myNft, _signer: owner });
        const voucher = await helperclass.createPrimaryVoucher(
          owner.address,
          1,
          1,
          2,
          50,
          true
        );
        
        await myNft
          .connect(signers[1])
          .buyFixBuy(voucher2, voucher, signers[1].address, 50, { value: 50 });
          const helperclass3 = new helper({ _contract: myNft, _signer: owner });
          const voucher3 = await helperclass3.createPrimaryVoucher(
            owner.address,
            1,
            1,
            3,
            50,
            true
          )
            await myNft
            .connect(signers[2])
            .buyFixBuy(voucher2, voucher3, signers[2].address, 50, { value: 50 });
            await expect(myNft
            .connect(signers[2])
            .buyFixBuy(voucher2, voucher3, signers[2].address, 50, { value: 50 })).to.be.revertedWith("Voucher has expired");
      });
      it("User Buy : NFT should be listed", async () => {
        const helperclass2 = new helper({ _contract: myNft, _signer: owner });
        const voucher2 = await helperclass2.createMintVoucher(
          myNft.address,
          owner.address,
          1,
          100,
          "Hello",
          owner.address,
          1
        );
        const helperclass = new helper({ _contract: myNft, _signer: owner });
        const voucher = await helperclass.createPrimaryVoucher(
          owner.address,
          1,
          1,
          2,
          50,
          false
        );
        
        await expect(myNft
          .connect(signers[1])
          .buyFixBuy(voucher2, voucher, signers[1].address, 50, { value: 50 })).to.be.revertedWith("NFT should be listed");
          // const helperclass3 = new helper({ _contract: myNft, _signer: owner });
          // const voucher3 = await helperclass3.createPrimaryVoucher(
          //   owner.address,
          //   1,
          //   1,
          //   3,
          //   50,
          //   true
          // )
          //   await myNft
          //   .connect(signers[2])
          //   .buyFixBuy(voucher2, voucher3, signers[2].address, 50, { value: 50 });
            // await myNft
            // .connect(signers[2])
            // .buyFixBuy(voucher2, voucher3, signers[2].address, 50, { value: 50 });
      });
      // it("User Buy : Mint voucher and sale voucher counters are same", async () => {
      //   const helperclass2 = new helper({ _contract: myNft, _signer: owner });
      //   const voucher2 = await helperclass2.createMintVoucher(
      //     myNft.address,
      //     owner.address,
      //     1,
      //     100,
      //     "Hello",
      //     owner.address,
      //     1
      //   );
      //   const helperclass = new helper({ _contract: myNft, _signer: owner });
      //   const voucher = await helperclass.createPrimaryVoucher(
      //     owner.address,
      //     1,
      //     1,
      //     1,
      //     50,
      //     true
      //   );
        
      //   await expect(myNft
      //     .connect(signers[1])
      //     .buyFixBuy(voucher2, voucher, signers[1].address, 50, { value: 50 })).to.be.revertedWith("Counters can't be same");
      // });

      it("User Buy : Owner doesn't have any NFT left", async () => {
        const helperclass2 = new helper({ _contract: myNft, _signer: owner });
        const voucher2 = await helperclass2.createMintVoucher(
          myNft.address,
          owner.address,
          1,
          100,
          "Hello",
          owner.address,
          1
        );
        const helperclass = new helper({ _contract: myNft, _signer: owner });
        const voucher = await helperclass.createPrimaryVoucher(
          owner.address,
          1,
          1,
          2,
          50,
          true
        );
        
        await myNft
          .connect(signers[1])
          .buyFixBuy(voucher2, voucher, signers[1].address, 50, { value: 50 });
          const helperclass3 = new helper({ _contract: myNft, _signer: owner });
          const voucher3 = await helperclass3.createPrimaryVoucher(
            owner.address,
            1,
            1,
            3,
            60,
            true
          )
            await expect(myNft
            .connect(signers[2])
            .buyFixBuy(voucher2, voucher3, signers[2].address, 60, { value: 60 })).to.be.revertedWith("Owner doesn't have enough NFT balance");
      });

      it("User Buy : User pays less", async () => {
        const helperclass2 = new helper({ _contract: myNft, _signer: owner });
        const voucher2 = await helperclass2.createMintVoucher(
          myNft.address,
          owner.address,
          1,
          100,
          "Hello",
          owner.address,
          1
        );
        const helperclass = new helper({ _contract: myNft, _signer: owner });
        const voucher = await helperclass.createPrimaryVoucher(
          owner.address,
          1,
          1,
          2,
          50,
          true
        );
        
        await myNft
          .connect(signers[1])
          .buyFixBuy(voucher2, voucher, signers[1].address, 50, { value: 50 });
          const helperclass3 = new helper({ _contract: myNft, _signer: owner });
          const voucher3 = await helperclass3.createPrimaryVoucher(
            owner.address,
            1,
            1,
            3,
            50,
            true
          )
            await expect(myNft
            .connect(signers[2])
            .buyFixBuy(voucher2, voucher3, signers[2].address, 50, { value: 40 })).to.be.revertedWith("pay more");
      });

      it("User Buy : Owner has a different NFT address", async () => {
        const helperclass2 = new helper({ _contract: myNft, _signer: owner });
        const voucher2 = await helperclass2.createMintVoucher(
          signers[4].address,
          owner.address,
          1,
          100,
          "Hello",
          owner.address,
          1
        );
        const helperclass = new helper({ _contract: myNft, _signer: owner });
        const voucher = await helperclass.createPrimaryVoucher(
          owner.address,
          1,
          1,
          2,
          50,
          true
        );
  
            await expect(myNft
            .connect(signers[2])
            .buyFixBuy(voucher2, voucher, signers[2].address, 50, { value: 50 })).to.be.revertedWith("invalid NFT address");
      });

      it("User Buy : Bad sign of minitng user", async () => {
        const helperclass2 = new helper({ _contract: myNft, _signer: signers[4] });
        const voucher2 = await helperclass2.createMintVoucher(
          myNft.address,
          owner.address,
          1,
          100,
          "Hello",
          owner.address,
          1
        );
        const helperclass = new helper({ _contract: myNft, _signer: owner });
        const voucher = await helperclass.createPrimaryVoucher(
          owner.address,
          1,
          1,
          2,
          50,
          true
        );
  
            await expect(myNft
            .connect(signers[2])
            .buyFixBuy(voucher2, voucher, signers[2].address, 50, { value: 50 })).to.be.revertedWith("invalid minter");
      });

      it("User Buy : Bad sign of listing user", async () => {
        const helperclass2 = new helper({ _contract: myNft, _signer: owner });
        const voucher2 = await helperclass2.createMintVoucher(
          myNft.address,
          owner.address,
          1,
          100,
          "Hello",
          owner.address,
          1
        );
        const helperclass = new helper({ _contract: myNft, _signer: signers[4] });
        const voucher = await helperclass.createPrimaryVoucher(
          owner.address,
          1,
          1,
          2,
          50,
          true
        );
  
            await expect(myNft
            .connect(signers[2])
            .buyFixBuy(voucher2, voucher, signers[2].address, 50, { value: 50 })).to.be.revertedWith("invalid signer");
      });

      it("User Buy : minter and seller address is not same ", async () => {
        const helperclass2 = new helper({ _contract: myNft, _signer: owner });
        const voucher2 = await helperclass2.createMintVoucher(
          myNft.address,
          owner.address,
          1,
          100,
          "Hello",
          owner.address,
          1
        );
        const helperclass = new helper({ _contract: myNft, _signer: signers[4] });
        const voucher = await helperclass.createPrimaryVoucher(
          signers[4].address,
          1,
          1,
          2,
          50,
          true
        );
  
            await expect(myNft
            .connect(signers[2])
            .buyFixBuy(voucher2, voucher, signers[2].address, 50, { value: 50 })).to.be.revertedWith("invalid user");
      });
    });

  //   describe("Auction", async () => {
  //     it("Auction - Buy", async () => {
  //       const helperclass2 = new helper({ _contract: myNft, _signer: owner });
  //       const voucher2 = await helperclass2.createMintVoucher(
  //         myNft.address,
  //         owner.address,
  //         1,
  //         1,
  //         100,
  //         "Hello",
  //         owner.address,
  //         1
  //       );
  //       const helperclass = new helper({ _contract: myNft, _signer: owner });
  //       const voucher = await helperclass.createPrimaryVoucher(
  //         owner.address,
  //         1,
  //         1,
  //         2,
  //         50,
  //         true
  //       );
        
  //       await myNft
  //         .connect(signers[1])
  //         .buyFixBuy(voucher2, voucher, signers[1].address, 50, { value: 50 });
  //         // const helperclass3 = new helper({ _contract: myNft, _signer: owner });
  //         // const voucher3 = await helperclass3.createPrimaryVoucher(
  //         //   owner.address,
  //         //   1,
  //         //   1,
  //         //   3,
  //         //   50,
  //         //   true
  //         // )
  //         //   await myNft
  //         //   .connect(signers[2])
  //         //   .buyFixBuy(voucher2, voucher3, signers[2].address, 50, { value: 50 });
  //         //   console.log("qwerty");
  //           // await myNft
  //           // .connect(signers[2])
  //           // .buyFixBuy(voucher2, voucher3, signers[2].address, 50, { value: 50 });
  //     });

  //     it("User Buy", async () => {
  //       const helperclass2 = new helper({ _contract: myNft, _signer: owner });
  //       const voucher2 = await helperclass2.createMintVoucher(
  //         myNft.address,
  //         owner.address,
  //         1,
  //         1,
  //         100,
  //         "Hello",
  //         owner.address,
  //         1
  //       );
  //       const helperclass = new helper({ _contract: myNft, _signer: owner });
  //       const voucher = await helperclass.createPrimaryVoucher(
  //         owner.address,
  //         1,
  //         1,
  //         2,
  //         50,
  //         true
  //       );
        
  //       await myNft
  //         .connect(signers[1])
  //         .buyFixBuy(voucher2, voucher, signers[1].address, 50, { value: 50 });
  //         // const helperclass3 = new helper({ _contract: myNft, _signer: owner });
  //         // const voucher3 = await helperclass3.createPrimaryVoucher(
  //         //   owner.address,
  //         //   1,
  //         //   1,
  //         //   3,
  //         //   50,
  //         //   true
  //         // )
  //         //   await myNft
  //         //   .connect(signers[2])
  //         //   .buyFixBuy(voucher2, voucher3, signers[2].address, 50, { value: 50 });
  //         //   console.log("qwerty");
  //           // await myNft
  //           // .connect(signers[2])
  //           // .buyFixBuy(voucher2, voucher3, signers[2].address, 50, { value: 50 });
  //     });

  //     it("User Buy : Different Nft contract", async () => {
  //       const helperclass2 = new helper({ _contract: myNft, _signer: owner });
  //       const voucher2 = await helperclass2.createMintVoucher(
  //         myNft.address,
  //         owner.address,
  //         1,
  //         1,
  //         100,
  //         "Hello",
  //         owner.address,
  //         1
  //       );
  //       const helperclass = new helper({ _contract: myNft, _signer: owner });
  //       const voucher = await helperclass.createPrimaryVoucher(
  //         owner.address,
  //         1,
  //         1,
  //         2,
  //         50,
  //         true
  //       );
        
  //       await myNft
  //         .connect(signers[1])
  //         .buyFixBuy(voucher2, voucher, signers[1].address, 50, { value: 50 });
  //         // const helperclass3 = new helper({ _contract: myNft, _signer: owner });
  //         // const voucher3 = await helperclass3.createPrimaryVoucher(
  //         //   owner.address,
  //         //   1,
  //         //   1,
  //         //   3,
  //         //   50,
  //         //   true
  //         // )
  //         //   await myNft
  //         //   .connect(signers[2])
  //         //   .buyFixBuy(voucher2, voucher3, signers[2].address, 50, { value: 50 });
  //         //   console.log("qwerty");
  //           // await myNft
  //           // .connect(signers[2])
  //           // .buyFixBuy(voucher2, voucher3, signers[2].address, 50, { value: 50 });
  //     });
  //     it("User Buy : Redeeming voucher that has expired", async () => {
  //       const helperclass2 = new helper({ _contract: myNft, _signer: owner });
  //       const voucher2 = await helperclass2.createMintVoucher(
  //         myNft.address,
  //         owner.address,
  //         1,
  //         1,
  //         100,
  //         "Hello",
  //         owner.address,
  //         1
  //       );
  //       const helperclass = new helper({ _contract: myNft, _signer: owner });
  //       const voucher = await helperclass.createPrimaryVoucher(
  //         owner.address,
  //         1,
  //         1,
  //         2,
  //         50,
  //         true
  //       );
        
  //       await myNft
  //         .connect(signers[1])
  //         .buyFixBuy(voucher2, voucher, signers[1].address, 50, { value: 50 });
  //         // const helperclass3 = new helper({ _contract: myNft, _signer: owner });
  //         // const voucher3 = await helperclass3.createPrimaryVoucher(
  //         //   owner.address,
  //         //   1,
  //         //   1,
  //         //   3,
  //         //   50,
  //         //   true
  //         // )
  //         //   await myNft
  //         //   .connect(signers[2])
  //         //   .buyFixBuy(voucher2, voucher3, signers[2].address, 50, { value: 50 });
  //         //   console.log("qwerty");
  //           // await myNft
  //           // .connect(signers[2])
  //           // .buyFixBuy(voucher2, voucher3, signers[2].address, 50, { value: 50 });
  //     });
  //     it("User Buy : owner don't have enough balance", async () => {
  //       const helperclass2 = new helper({ _contract: myNft, _signer: owner });
  //       const voucher2 = await helperclass2.createMintVoucher(
  //         myNft.address,
  //         owner.address,
  //         1,
  //         1,
  //         100,
  //         "Hello",
  //         owner.address,
  //         1
  //       );
  //       const helperclass = new helper({ _contract: myNft, _signer: owner });
  //       const voucher = await helperclass.createPrimaryVoucher(
  //         owner.address,
  //         1,
  //         1,
  //         2,
  //         50,
  //         true
  //       );
        
  //       await myNft
  //         .connect(signers[1])
  //         .buyFixBuy(voucher2, voucher, signers[1].address, 50, { value: 50 });
  //         // const helperclass3 = new helper({ _contract: myNft, _signer: owner });
  //         // const voucher3 = await helperclass3.createPrimaryVoucher(
  //         //   owner.address,
  //         //   1,
  //         //   1,
  //         //   3,
  //         //   50,
  //         //   true
  //         // )
  //         //   await myNft
  //         //   .connect(signers[2])
  //         //   .buyFixBuy(voucher2, voucher3, signers[2].address, 50, { value: 50 });
  //         //   console.log("qwerty");
  //           // await myNft
  //           // .connect(signers[2])
  //           // .buyFixBuy(voucher2, voucher3, signers[2].address, 50, { value: 50 });
  //     });
  //     it("User Buy : buyer pays less", async () => {
  //       const helperclass2 = new helper({ _contract: myNft, _signer: owner });
  //       const voucher2 = await helperclass2.createMintVoucher(
  //         myNft.address,
  //         owner.address,
  //         1,
  //         1,
  //         100,
  //         "Hello",
  //         owner.address,
  //         1
  //       );
  //       const helperclass = new helper({ _contract: myNft, _signer: owner });
  //       const voucher = await helperclass.createPrimaryVoucher(
  //         owner.address,
  //         1,
  //         1,
  //         2,
  //         50,
  //         true
  //       );
        
  //       await myNft
  //         .connect(signers[1])
  //         .buyFixBuy(voucher2, voucher, signers[1].address, 50, { value: 50 });
  //         // const helperclass3 = new helper({ _contract: myNft, _signer: owner });
  //         // const voucher3 = await helperclass3.createPrimaryVoucher(
  //         //   owner.address,
  //         //   1,
  //         //   1,
  //         //   3,
  //         //   50,
  //         //   true
  //         // )
  //         //   await myNft
  //         //   .connect(signers[2])
  //         //   .buyFixBuy(voucher2, voucher3, signers[2].address, 50, { value: 50 });
  //         //   console.log("qwerty");
  //           // await myNft
  //           // .connect(signers[2])
  //           // .buyFixBuy(voucher2, voucher3, signers[2].address, 50, { value: 50 });
  //     });
  // });
});
})
