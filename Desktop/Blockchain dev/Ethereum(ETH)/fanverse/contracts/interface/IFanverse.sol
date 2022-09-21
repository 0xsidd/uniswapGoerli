// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

interface IFanverse{
    function initialize(address _whitelist , address _nft, address _operator) external;
}