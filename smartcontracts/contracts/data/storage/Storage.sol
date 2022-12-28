pragma solidity >=0.8.7 <=0.8.17;

import "../../accesscontrol/AccessController.sol";
import "./validator/Validator.sol";

abstract contract Storage is AccessController {
    constructor(address accessWhitelistAddress) AccessController(accessWhitelistAddress) {}
}
