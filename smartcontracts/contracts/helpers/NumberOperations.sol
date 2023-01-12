pragma solidity >=0.8.7 <=0.8.17;

import "../datatypes/Constants.sol";

library NumberOperations {
    function getNumberLength(uint256 value) internal pure returns (uint256) {
        uint256 numberOfDigits = 1;
        while (value >= 10) {
            numberOfDigits += 1;
            value /= 10;
        }
        return numberOfDigits;
    }

    /**
     * @notice e.g. with precision 5: 100 => 100, 10000 => 10000, 100010 => 10001
     */
    function ensurePrecision(uint256 value) internal pure returns (uint256) {
        uint256 numberLength = getNumberLength(value);
        uint256 digitsToCut = numberLength > Constants.PRECISION_MAX_DIGITS
            ? numberLength - Constants.PRECISION_MAX_DIGITS
            : 0;
        return value / 10**digitsToCut;
    }

    function divideWithPrecisionAndRoundingDown(uint256 numerator, uint256 denominator)
        internal
        pure
        returns (uint256)
    {
        return divideWithRoundingDown(numerator, denominator, Constants.PRECISION_MAX_DIGITS);
    }

    function divideWithRoundingDown(
        uint256 numerator,
        uint256 denominator,
        uint256 precision
    ) internal pure returns (uint256) {
        numerator *= 10**(precision);
        return (numerator / denominator) / 10;
    }
}
