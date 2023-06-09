pragma solidity >=0.8.7 <=0.8.17;

import "../../../datatypes/Constants.sol";

library IdGenerator {
    struct Counter {
        uint256 value;
    }

    function initializeCounter() internal pure returns (Counter memory) {
        return Counter(Constants.STARTING_ID);
    }

    function generateId(Counter storage counter) internal returns (uint256) {
        return counter.value++;
    }
}
