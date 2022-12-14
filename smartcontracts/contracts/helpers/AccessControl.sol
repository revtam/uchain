pragma solidity >=0.8.7 <=0.8.17;

contract AccessControl {
    mapping(address => bool) accessWhitelist;

    modifier onlyWhitelisted() {
        require(accessWhitelist[msg.sender] == true, "Only whitelisted addresses can call this function");
        _;
    }

    constructor() {
        accessWhitelist[msg.sender] = true;
    }

    function grantAccess(address _address) external onlyWhitelisted {
        accessWhitelist[_address] = true;
    }

    function revokeAccess(address _address) external onlyWhitelisted {
        accessWhitelist[_address] = false;
    }
}
