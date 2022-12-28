pragma solidity >=0.8.7 <=0.8.17;

import "./AssessmentRegistrationStorage.sol";
import "./AssessmentStorage.sol";

contract AssessmentDataStorage is AssessmentRegistrationStorage, AssessmentStorage {
    constructor(address accessWhitelistAddress) Storage(accessWhitelistAddress) {}
}
