// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SignupContract {
    address public owner;
    mapping(address => string) private stringData;
    event StringCreated(address indexed userAddress, string data);
    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can perform this action");
        _;
    }

    function createString(string memory data) public {
        stringData[msg.sender] = data;
        emit StringCreated(msg.sender, data);
    }

    function getString(address user) public view returns (string memory) {
        if (user == msg.sender || user == owner) {
            return stringData[user];
        } else {
            return "Access denied";
        }
    }

    // Function to transfer ownership of the contract
    function transferOwnership(address newOwner) public onlyOwner {
        owner = newOwner;
    }
}
