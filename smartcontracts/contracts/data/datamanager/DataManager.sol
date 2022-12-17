pragma solidity >=0.8.7 <=0.8.17;

import "../../addressbook/AddressBookUser.sol";
import "../../helpers/AccessControl.sol";
import "../../datatypes/UserDataTypes.sol";
import "./helpers/DateConverter.sol";

abstract contract DataManager is AccessControl, AddressBookUser {
    constructor(address addressBookAddress) AccessControl() AddressBookUser(addressBookAddress) {}

    function requireStringNotEmpty(string memory str, string memory variableName) internal pure {
        require(bytes(str).length > 0, string(abi.encodePacked(variableName, " cannot be empty")));
    }

    function requireValidDateOfBirth(UserDataTypes.Date memory dateOfBirth) internal view {
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
