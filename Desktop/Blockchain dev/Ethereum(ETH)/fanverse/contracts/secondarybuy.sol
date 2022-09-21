//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/cryptography/draft-EIP712Upgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interface/ITemplate1155.sol";
import "./libraries/FNVvoucher.sol";
import "hardhat/console.sol";

contract Secondbuy is Initializable,ERC2981Upgradeable,EIP712Upgradeable {
    // string private constant SIGNING_DOMAIN = "Secondary";
    // string private constant SIGNATURE_VERSION = "2";
    uint256 public marketFees;
    address public Admin;
    // ITemplate1155 public template1155;

    // mapping(uint256 => bool) public redeemedCounter;
    // modifier onlyOperator {
    //   require(operators[msg.sender],"not operator");
    //   _;
    // }        require(signer == address(_voucher.nftOwner),"invalid signer");
    function initializes() external initializer {
        // template1155 = ITemplate1155(_template1155);
        __EIP712_init("Secondary", "2");
        Admin = msg.sender;
    }

    modifier onlyOwner() {
        msg.sender == Admin;
        _;
    }

    function _verify(FNVvoucher.MarketItem memory voucher)
        internal
        view
        returns (address)
    {
        bytes32 digest = _hash(voucher);
        return ECDSAUpgradeable.recover(digest, voucher.signature);
    }

    function _hash(FNVvoucher.MarketItem memory voucher)
        internal
        view
        returns (bytes32)
    {
        return
            _hashTypedDataV4(
                keccak256(
                    abi.encode(
                        keccak256(
                            "MarketItem(address nftAddress,address owner,uint256 tokenId,uint256 price,uint256 nftBatchAmount,string tokenURI,bool listed)"
                        ),
                        voucher.nftAddress,
                        voucher.owner,
                        voucher.tokenId,
                        voucher.unitprice,
                        voucher.nftBatchAmount,
                        keccak256(bytes(voucher.tokenURI)),
                        voucher.listed
                    )
                )
            );
    }

    function _hash1(FNVvoucher.auctionItemSeller memory auctionSeller)
        internal
        view
        returns (bytes32)
    {
        return
            _hashTypedDataV4(
                keccak256(
                    abi.encode(
                        keccak256(
                            "auctionItemSeller(address nftAddress,address owner,uint256 tokenId,uint256 nftBatchAmount,string tokenURI,uint256 minimumBid,uint256 startTime,uint256 endTime,bool started,bool ended)"
                        ),
                        auctionSeller.nftAddress,
                        auctionSeller.owner,
                        auctionSeller.tokenId,
                        auctionSeller.nftBatchAmount,
                        keccak256(bytes(auctionSeller.tokenURI)),
                        auctionSeller.minimumBid,
                        auctionSeller.startTime,
                        auctionSeller.endTime,
                        auctionSeller.started,
                        auctionSeller.ended
                    )
                )
            );
    }

    function _verify1(FNVvoucher.auctionItemSeller memory auctionSeller)
        internal
        view
        returns (address)
    {
        bytes32 digest = _hash1(auctionSeller);
        return ECDSAUpgradeable.recover(digest, auctionSeller.signature);
    }

    function _hash2(FNVvoucher.auctionItemBuyer memory auctionBuyer)
        internal
        view
        returns (bytes32)
    {
        return
            _hashTypedDataV4(
                keccak256(
                    abi.encode(
                        keccak256(
                            "auctionItemBuyer(address nftAddress,address buyer,uint256 tokenId,uint256 nftBatchAmount,string tokenURI,uint256 pricePaid)"
                        ),
                        auctionBuyer.nftAddress,
                        auctionBuyer.buyer,
                        auctionBuyer.tokenId,
                        auctionBuyer.nftBatchAmount,
                        keccak256(bytes(auctionBuyer.tokenURI)),
                        auctionBuyer.pricePaid
                    )
                )
            );
    }

    function _verify2(FNVvoucher.auctionItemBuyer memory auctionBuyer)
        internal
        view
        returns (address)
    {
        bytes32 digest = _hash2(auctionBuyer);
        return ECDSAUpgradeable.recover(digest, auctionBuyer.signature);
    }

    function auctionWinner(
        FNVvoucher.auctionItemSeller memory auctionSeller,
        FNVvoucher.auctionItemBuyer memory auctionBuyer
    ) public payable {
        require(
            ITemplate1155(auctionSeller.nftAddress).balanceOf(
                auctionSeller.owner,
                auctionSeller.tokenId
            ) >= auctionSeller.nftBatchAmount,
            "auctionWinner: Invalid amount"
        );
        require(
            auctionBuyer.buyer == msg.sender,
            "auctionWinner: caller is not buyer"
        );
        require(
            auctionSeller.tokenId == auctionBuyer.tokenId,
            "auctionWinner: seller tokenId and buyer tokenID are not same"
        );
        require(
            auctionSeller.nftBatchAmount == auctionBuyer.nftBatchAmount,
            "auctionWinner: unequal Amount"
        );
        require(
            auctionSeller.nftAddress == auctionBuyer.nftAddress,
            "auctionWinner: nftAddress of seller and Buyer are not same"
        );
        address seller = _verify1(auctionSeller);
        require(seller == auctionSeller.owner, "auctionWinner: Invalid user");
        address buyer = _verify2(auctionBuyer);
        require(buyer == auctionBuyer.buyer, "auctionWinner: Invalid user");
        require(
            seller != buyer,
            "auctionWinner: seller and buyer signature are equal"
        );
        require(
            auctionSeller.started,
            "auctionWinner: Auction is not started yet"
        );
        require((!auctionSeller.ended), "auctionWinner: Auction ended");
        require(
            auctionSeller.minimumBid <= msg.value &&
                auctionBuyer.pricePaid == msg.value,
            "auctionWinner: amount is less than the minimum amount"
        );
        ITemplate1155(auctionSeller.nftAddress).safeTransferFrom(
            seller,
            buyer,
            auctionSeller.tokenId,
            auctionSeller.nftBatchAmount,
            ""
        );

        uint256 serviceFees = ((msg.value * marketFees) / 10000);
        (address receiver, uint256 royalty) = ITemplate1155(auctionSeller.nftAddress).royaltyInfo(
            auctionSeller.tokenId,
            msg.value
        );
        uint256 nftPrice = msg.value - serviceFees;
        (bool success, ) = payable(auctionSeller.owner).call{value: nftPrice}(
            ""
        );
        require(success, "auctionWinner: Failed to transfer the funds");
        console.log("AAA");
        (bool success1, ) = payable(Admin).call{value: serviceFees}("");
        require(success1, "auctionWinner: Failed to transfer the funds");
        console.log("Royalty Receiver and Royalty Amount", receiver, royalty);
        (bool success2, ) = payable(receiver).call{value: royalty}("");
        require(success2, "auctionWinner: Failed to transfer the funds");
    }

    function secondarybuy(FNVvoucher.MarketItem memory seller, address redeemer)
        public
        payable
    {
        require(seller.listed, "Not listed");
        require(
            ITemplate1155(seller.nftAddress).balanceOf(seller.owner, seller.tokenId) >=
                seller.nftBatchAmount,
            "Invalid amount"
        );
        require(
            seller.nftAddress != address(0),
            "invalid address"
        );
        address signer = _verify(seller);
        require(signer == seller.owner, "invalid seller");

        uint256 serviceFees = ((msg.value * marketFees) / 10000);
        (address receiver, uint256 royalty) = ITemplate1155(seller.nftAddress).royaltyInfo(
            seller.tokenId,
            msg.value
        );

        uint256 nftPrice = (msg.value - serviceFees) - royalty;
        ITemplate1155(seller.nftAddress).safeTransferFrom(
            signer,
            redeemer,
            seller.tokenId,
            seller.nftBatchAmount,
            ""
        );
        (bool success, ) = payable(signer).call{value: nftPrice}("");
        require(success, "Failed to transfer the funds");

        (bool success1, ) = payable(Admin).call{value: serviceFees}("");
        require(success1, "Failed to transfer the funds");

        (bool success2, ) = payable(receiver).call{value: royalty}("");
        require(success2, "Failed to transfer the funds");
    }

    // function updatetemplate(address _template1155) external onlyOwner {
    //     require(_template1155 != address(0), "Invalid address");
    //     template1155 = ITemplate1155(_template1155);
    // }

    // function supportsInterface(bytes4 interfaceId)
    //     public
    //     view
    //     override()
    //     returns (bool)
    // {
    //     return super.supportsInterface(interfaceId);
    // }

    function getChainID() external view  returns (uint256) {
        uint256 id;
        assembly {
            id := chainid()
        }
        return id;
    }
}
