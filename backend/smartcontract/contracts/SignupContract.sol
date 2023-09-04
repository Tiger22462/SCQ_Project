// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SignupContract {
    address public owner;
    event UserCreated(address indexed userAddress, string username , string password , string email , string phone);
    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can perform this action");
        _;
    }

    function createUser(string memory username , string memory password , string memory email , string memory phone) public {
        //stringData[msg.sender] = data;
        emit UserCreated(msg.sender, username , password , email , phone);
    }

    function transferOwnership(address newOwner) public onlyOwner {
        owner = newOwner;
    }
}
