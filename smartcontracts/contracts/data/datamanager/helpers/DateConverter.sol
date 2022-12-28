pragma solidity >=0.8.7 <=0.8.17;

library DateConverter {
    int256 constant OFFSET19700101 = 2440588;
    uint256 constant SECONDS_PER_DAY = 24 * 60 * 60;

    /**
     * @notice BokkyPooBah's DateTime Library
     * @notice source: https://github.com/RollaProject/solidity-datetime/blob/master/contracts/DateTime.sol
     */
    function getDate()
        internal
        view
        returns (
            uint256,
            uint256,
            uint256
        )
    {
        uint256 year;
        uint256 month;
        uint256 day;
        unchecked {
            int256 _days = int256(block.timestamp / SECONDS_PER_DAY);

            int256 L = _days + 68569 + OFFSET19700101;
            int256 N = (4 * L) / 146097;
            L = L - (146097 * N + 3) / 4;
            int256 _year = (4000 * (L + 1)) / 1461001;
            L = L - (1461 * _year) / 4 + 31;
            int256 _month = (80 * L) / 2447;
            int256 _day = L - (2447 * _month) / 80;
            L = _month / 11;
            _month = _month + 2 - 12 * L;
            _year = 100 * (N - 49) + _year + L;

            year = uint256(_year);
            month = uint256(_month);
            day = uint256(_day);
        }
        return (year, month, day);
    }
}
