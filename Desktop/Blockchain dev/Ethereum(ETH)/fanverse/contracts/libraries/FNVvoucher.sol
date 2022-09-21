// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.4;

library FNVvoucher {
    
    struct mintVoucher{
        uint160 nftAddress;
        uint160 nftOwner;
        uint256 tokenId;
        uint256 amount;
        string tokenUri;
        uint160 royaltyKeeper;
        uint96 royaltyFees;
        bytes signature;
    }
    struct priListing{
        uint160 nftOwner;
        uint256 tokenId;
        uint256 unitprice;
        uint256 countervalue;
        uint256 amount;
        bool listed;
        bytes signature;
    }

    struct MarketItem {
        address nftAddress;
        address owner;
        uint256 tokenId;
        uint256 unitprice;
        uint256 nftBatchAmount;
        string tokenURI;
        bool listed;
        bytes signature;
    }

    struct auctionItemSeller {
        address nftAddress;
        address owner;
        uint256 tokenId;
        uint256 nftBatchAmount;
        string tokenURI;
        uint256 minimumBid;
        uint256 startTime;
        uint256 endTime;
        bool started;
        bool ended;
        bytes signature;
    }

    struct auctionItemBuyer {
        address nftAddress;
        address buyer;
        uint256 tokenId;
        uint256 nftBatchAmount;
        string tokenURI;
        uint pricePaid;
        bytes signature;
    }
}