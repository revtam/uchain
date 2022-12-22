pragma solidity >=0.8.7 <=0.8.17;

import "../datatypes/Constants.sol";

library NumberOperations {
    function ensurePrecision(uint256 value) public pure returns (uint256) {
        uint256 highestValue = 10**Constants.PRECISION_MAX_DIGITS;
        while (value > highestValue) {
            value /= 10;
        }
        return value;
    }

    function divideWithPrecisionAndRounding(uint256 numerator, uint256 denominator)
        public
        pure
        returns (uint256)
    {
        return divideWithRounding(numerator, denominator, Constants.PRECISION_MAX_DIGITS);
    }

    function divideWithRounding(
        uint256 numerator,
        uint256 denominator,
        uint256 precision
    ) public pure returns (uint256) {
        numerator *= 10**(precision + 1);
        return (numerator / denominator + 5) / 10;
    }
}
