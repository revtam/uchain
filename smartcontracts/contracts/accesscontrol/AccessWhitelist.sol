pragma solidity >=0.8.7 <=0.8.17;

import "./AdminAccess.sol";

contract AccessWhitelist is AdminAccess {
    mapping(address => bool) isWhitelistedByAddress;

    constructor() {
        isWhitelistedByAddress[msg.sender] = true;
    }

    function grantAccess(address _address) public onlyAdmin {
        isWhitelistedByAddress[_address] = true;
    }

    function batchGrantAccess(address[] calldata addresses) external onlyAdmin {
        for (uint256 i = 0; i < addresses.length; ++i) {
            grantAccess(addresses[i]);
        }
    }

    function revokeAccess(address _address) external onlyAdmin {
        isWhitelistedByAddress[_address] = false;
    }

    function isAddressWhitelisted(address _address) external view returns (bool) {
        return isWhitelistedByAddress[_address];
    }
}
