// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";

interface INFT {

    function initialize(string memory name, string memory symbol, address _operator) external;
    function _exists(uint256 tokenId) external view returns (bool);
    function ownerOf(uint256 tokenId) external view returns (address);
    function mint(address to, string memory _tokenURI, uint96 _royaltyFeeInBips) external returns (uint256);
    function getTokenCreatorById(uint256 tokenId) external returns (address); 
    function royaltyInfo(uint256 tokenId, uint256 value)
        external
        view
        returns (address receiver, uint256 royaltyAmount);

}