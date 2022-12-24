pragma solidity >=0.8.7 <=0.8.17;

import "../../addressbook/AddressBookUser.sol";
import "../../addressbook/ContractNames.sol";
import "../../helpers/AccessControl.sol";
import "../../datatypes/UserDataTypes.sol";
import "../storage/performance/PerformanceStorage.sol";
import "../storage/performance/GradeStorage.sol";
import "../storage/course/CourseStorage.sol";
import "../storage/user/UserStorage.sol";
import "../storage/user/RegistrationStorage.sol";
import "../storage/studyprogram/StudyProgramStorage.sol";
import "./helpers/DateConverter.sol";

abstract contract DataManager is AccessControl, AddressBookUser {
    constructor(address addressBookAddress) AccessControl() AddressBookUser(addressBookAddress) {}

    function courseStorage() internal view returns (CourseStorage) {
        return CourseStorage(addressBook.getAddress(ContractNames.Name.COURSE_STORAGE));
    }

    function gradeStorage() internal view returns (GradeStorage) {
        return GradeStorage(addressBook.getAddress(ContractNames.Name.GRADE_STORAGE));
    }

    function userStorage() internal view returns (UserStorage) {
        return UserStorage(addressBook.getAddress(ContractNames.Name.USER_STORAGE));
    }

    function performanceStorage() internal view returns (PerformanceStorage) {
        return PerformanceStorage(addressBook.getAddress(ContractNames.Name.PERFORMANCE_STORAGE));
    }

    function registrationStorage() internal view returns (RegistrationStorage) {
        return RegistrationStorage(addressBook.getAddress(ContractNames.Name.REGISTRATION_STORAGE));
    }

    function programStorage() internal view returns (StudyProgramStorage) {
        return StudyProgramStorage(addressBook.getAddress(ContractNames.Name.PROGRAM_STORAGE));
    }

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
