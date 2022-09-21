// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

interface IFactory{
    function deploy(address _nft) external;
}