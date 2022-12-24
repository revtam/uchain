pragma solidity >=0.8.7 <=0.8.17;

contract AccessControl {
    mapping(address => bool) accessWhitelist;

    modifier onlyWhitelisted() {
        require(accessWhitelist[msg.sender], "Only whitelisted addresses can call this function");
        _;
    }

    constructor() {
        grantAccess(msg.sender);
    }

    function grantAccess(address _address) public onlyWhitelisted {
        accessWhitelist[_address] = true;
    }

    function batchGrantAccess(address[] calldata addresses) external onlyWhitelisted {
        for (uint256 i = 0; i < addresses.length; ++i) {
            grantAccess(addresses[i]);
        }
    }

    function revokeAccess(address _address) external onlyWhitelisted {
        accessWhitelist[_address] = false;
    }
}
