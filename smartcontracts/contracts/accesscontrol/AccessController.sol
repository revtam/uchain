pragma solidity >=0.8.7 <=0.8.17;

import "./AccessWhitelist.sol";

abstract contract AccessController {
    AccessWhitelist accessWhitelist;

    modifier onlyWhitelisted() {
        require(accessWhitelist.isAddressWhitelisted(msg.sender), "The sender is not whitelisted");
        _;
    }

    constructor(address accessWhitelistAddress) {
        accessWhitelist = AccessWhitelist(accessWhitelistAddress);
    }
}
