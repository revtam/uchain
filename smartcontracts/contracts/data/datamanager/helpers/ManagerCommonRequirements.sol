pragma solidity >=0.8.7 <=0.8.17;

import "../../../datatypes/UserDataTypes.sol";
import "./DateConverter.sol";

library ManagerCommonRequirements {
    function requireStringNotEmpty(string calldata str, string memory variableName) public pure {
        require(bytes(str).length > 0, string(abi.encodePacked(variableName, " cannot be empty")));
    }

    function requireValidDateOfBirth(UserDataTypes.Date memory dateOfBirth) public view {
        uint256 year = dateOfBirth.year;
        uint256 month = dateOfBirth.month;
        uint256 day = dateOfBirth.day;
        (uint256 currentYear, uint256 currentMonth, uint256 currentDay) = DateConverter.getDate();
        require(year <= currentYear, "Birth year value cannot be in the future");
        if (year < currentYear) {
            require(month <= 12 && month >= 1, "Birth month value must be between 1 and 12");
            require(day <= 31 && day >= 1, "Birth day value must be between 1 and 31");
        } else {
            require(month <= currentMonth, "Birth month value cannot be in the future");
            if (month < currentMonth) {
                require(day <= 31 && day >= 1, "Birth day value must be between 1 and 31");
            } else {
                require(day <= currentDay, "Birth day value cannot be in the future");
            }
        }
    }
}
