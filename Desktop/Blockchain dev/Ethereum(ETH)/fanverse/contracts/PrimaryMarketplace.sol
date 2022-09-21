//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/cryptography/draft-EIP712Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/metatx/ERC2771ContextUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/common/ERC2981Upgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./libraries/FNVvoucher.sol";

/**
NOTE this is the primary marketplace contract for selling ERC1155 tokens(NFT's) including functionalities like royalty fees,
     lazy minting ,market fees etc.
 */

contract Fanverse is ERC1155URIStorageUpgradeable, ERC2981Upgradeable, EIP712Upgradeable{

    uint256 public marketFees; // market fees identifier
    address public Admin;   // admin address
    mapping(uint256 => bool) public allMinted;   // for verifying if the voucher has NFTs greater than zero
    mapping(uint256 => bool) public PriCounterstatus;   // for verifying if the voucher has NFTs greater than zero
    mapping(uint256 => uint256) public Mintamountleft; // for checking the amount of nft copiesleft in mint voucher
    mapping(uint256 => uint256) public priListAmonutLeft; // for checking the amount of PriList nft copiesleft in mint voucher
    
    function initialize(string memory _uri, uint256 _marketFee) external initializer {
        __ERC1155_init(_uri);
        __ERC1155URIStorage_init();
        __ERC2981_init();
        __EIP712_init("Fanverse", "1");
        _setDefaultRoyalty(_msgSender(), 500);
        marketFees = _marketFee;
        Admin = _msgSender();
    }
/**
@dev this modifier checks if the caller is admin or not
*/
   modifier onlyOwner() {
        msg.sender == Admin;
        _;
    }

/**
@dev this is an internal function that mints ERC1155 tokens and sets the royalty keeper and royalty fees
@param to address of receiver
@param tokenId tokenid of NFT
@param mintAmount number of NFTs to be minted
@param tokenURI URI of NFTs
@param royaltyKeeper royalty keeper address
@param royaltyFees royalty fees to be charged
*/

    function _safeMint(address to, uint256 tokenId, uint256 mintAmount, string memory tokenURI, address royaltyKeeper, uint256 royaltyFees) internal {
        _mint(to, tokenId, mintAmount, "");
        _setURI(tokenId, tokenURI);
        if(royaltyKeeper != address(0)) {
            _setTokenRoyalty(tokenId, royaltyKeeper, uint96(royaltyFees));
        }
    }

/**
@dev this is an internal function that generates a 32 byte hash of a struct like object 
@param voucher struct like voucher that indicates all the required information of ERC1155 tokens of which the hash is to be generated
*/

    function priListingHash(FNVvoucher.priListing memory voucher) public view returns (bytes32) {
        return _hashTypedDataV4(keccak256(abi.encode(
            keccak256(
                "priListing(uint160 nftOwner,uint256 tokenId,uint256 unitprice,uint256 countervalue,uint256 amount,bool listed)"
            ),
            voucher.nftOwner,
            voucher.tokenId,
            voucher.unitprice,
            voucher.countervalue,
            voucher.amount,
            voucher.listed
            )
        ));
    }

/**
@dev this is an internal function that recovers the address who has signed a struct like object
@param voucher struct like object that indicates all the required information of ERC1155 tokens
*/

    function priListingVerify(FNVvoucher.priListing memory voucher)
        public
        view
        returns (address)
    {
        bytes32 digest = priListingHash(voucher);
        return ECDSAUpgradeable.recover(digest, voucher.signature);
    }
/**
@dev this is an internal function that generates a 32 byte hash of a struct like object 
@param voucher struct like voucher that indicates all the required information of ERC1155 tokens of which the hash is to be generated
*/

    function _hashMinter(FNVvoucher.mintVoucher memory voucher) public view returns (bytes32) {
        return _hashTypedDataV4(keccak256(abi.encode(
            keccak256(
                "mintVoucher(uint160 nftAddress,uint160 nftOwner,uint256 tokenId,uint256 amount,string tokenUri,uint160 royaltyKeeper,uint96 royaltyFees)"
            ),
            voucher.nftAddress,
            voucher.nftOwner,
            voucher.tokenId,
            voucher.amount,
            keccak256(bytes(voucher.tokenUri)),
            voucher.royaltyKeeper,
            voucher.royaltyFees
            )
        ));
    }

/**
@dev this is an internal function that recovers the address who has signed a struct like object
@param voucher struct like object that indicates all the required information of ERC1155 tokens
*/

    function _verifyMinter(FNVvoucher.mintVoucher memory voucher)
        public
        view
        returns (address)
    {
        bytes32 digest = _hashMinter(voucher);
        return ECDSAUpgradeable.recover(digest, voucher.signature);
    }
    
/**
@dev this function achieves the functionality of trading ERC11555 NFTs, this function uses lazy minitng approach
@param _voucher struct like object that indicates all the required information of ERC1155 tokens
@param redeemer address of person who will buy
@param nftamount amount of nft copies that redeemer is willing to buy
*/

    function buyFixBuy(FNVvoucher.mintVoucher memory mintvoucher, FNVvoucher.priListing memory _voucher, address redeemer, uint256 nftamount) public payable{

        require(!allMinted[mintvoucher.tokenId] && !PriCounterstatus[_voucher.countervalue] , "MintVoucher has expired");
        require(_voucher.listed == true, "NFT should be listed");
        require(mintvoucher.amount >= _voucher.amount, "Cannot mint less than listed NFTS");

        if(priListAmonutLeft[_voucher.countervalue] == 0){
            priListAmonutLeft[_voucher.countervalue] = _voucher.amount;
        }

        if(Mintamountleft[mintvoucher.tokenId] == 0){
            Mintamountleft[mintvoucher.tokenId] = mintvoucher.amount;
        }

        require(nftamount <= _voucher.amount , "Not listed enough NFTs");
        require(Mintamountleft[mintvoucher.tokenId] >= nftamount, "Owner doesn't have enough NFT balance");
        require(priListAmonutLeft[_voucher.countervalue] >= nftamount, "Owner doesn't have enough NFT balance");
        require((_voucher.unitprice*(nftamount)) == msg.value , "pay more");
        require(address(mintvoucher.nftAddress) == address(this),"invalid NFT address");


        address minter = _verifyMinter(mintvoucher);
        require(minter == address(mintvoucher.nftOwner),"invalid minter");
        address signer = priListingVerify(_voucher);
        require(signer == address(_voucher.nftOwner),"invalid signer");
        require(signer == minter,"invalid user");

        _safeMint(signer, mintvoucher.tokenId,mintvoucher.amount, mintvoucher.tokenUri, address(mintvoucher.royaltyKeeper), mintvoucher.royaltyFees);
        _setApprovalForAll(signer, redeemer, true);
        safeTransferFrom(signer, redeemer, _voucher.tokenId,nftamount,"");

        priListAmonutLeft[_voucher.countervalue] -= nftamount;
        Mintamountleft[mintvoucher.tokenId] -= nftamount;

        if(Mintamountleft[mintvoucher.tokenId] == 0){
            allMinted[mintvoucher.tokenId] = true;
        }

        if(priListAmonutLeft[_voucher.countervalue] == 0){
            PriCounterstatus[_voucher.countervalue] = true;
        }

        distributeAmount(signer);
    }

/**
@dev this function achieves the functionality of trading ERC11555 NFT via an auction scenarios, this function uses lazy minitng approach
@param seller struct like object that indicates all the required information of ERC1155 tokens about owner of that NFT
@param buyer struct like object that indicates all the required information of ERC1155 tokens about buyer of that NFT
*/    

    // function buyAuction (FNVvoucher.priListing memory seller, FNVvoucher.auctionItemBuyer memory buyer) public payable {
    //     require(counterstatus[seller.countervalue] == false, "Voucher has expired");
    //     require(seller.listed == true, "NFT should be listed");
        
    //     if(nftamountleft[seller.countervalue] == 0){
    //         nftamountleft[seller.countervalue] = seller.amount;
    //     }

    //     require(nftamountleft[seller.countervalue] >= buyer.nftBatchAmount, "Owner doesn't have enough NFT balance");
    //     require((seller.unitprice*(buyer.nftBatchAmount)) <= msg.value , "pay more");
    //     require(seller.nftAddress == address(this),"invalid address");
    //     address signer = _verify(seller);
    //     require(signer == seller.nftOwner,"invalid signer");
    //     address Buyer = _verify1(buyer);
    //     require(Buyer == buyer.buyer && Buyer == msg.sender, "Invalid buyer");
    //     require(Buyer != signer, "Buyer nad seller is same");

    //     _safeMint(signer, seller.tokenId,seller.amount, seller.tokenUri, seller.royaltyKeeper, seller.royaltyFees);
    //     _setApprovalForAll(signer, buyer.buyer, true);
    //     safeTransferFrom(signer, buyer.buyer, seller.tokenId,buyer.nftBatchAmount,"");

    //     nftamountleft[seller.countervalue] -= buyer.nftBatchAmount;

    //     if(nftamountleft[seller.countervalue] == 0){
    //         counterstatus[seller.countervalue] = true;
    //     }
    //     distributeAmount(signer);
    // }

/**
@dev this is an internal function to perform ether transactions 
@param _receiver address of receiver
*/

    function distributeAmount(address _receiver) internal {
        uint256 serviceFees = ((msg.value * marketFees) / 10000); 
        uint256 nftPrice = msg.value - serviceFees;
            (bool success, ) = payable(_receiver   
                ).call{value: nftPrice}("");
            require(success, "reedem: Failed to transfer the funds");

            (bool success1, ) = payable(
                Admin).call{value: serviceFees}("");
            require(success1, "reedem: Failed to transfer the funds");
    }
    
    function resetCounter(FNVvoucher.priListing memory _voucher ) external onlyOwner{
            priListAmonutLeft[_voucher.amount]=0;
            PriCounterstatus[_voucher.countervalue] = true;
    }
    
    function setMarketFee(uint256 _marketfees) external onlyOwner{
        require(_marketfees != 0, "Market fees cannot be zero");
        marketFees = _marketfees;
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual override(ERC1155Upgradeable, ERC2981Upgradeable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _msgSender()
        internal
        view
        override(ContextUpgradeable)
        returns (address sender)
    {
        return super._msgSender();
    }

    function getChainID() external virtual view returns (uint256) {
        uint256 id;
        assembly {
            id := chainid()
        }
        return id;
    }
}