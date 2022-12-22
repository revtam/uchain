pragma solidity >=0.8.7 <=0.8.17;

import "../../addressbook/AddressBookUser.sol";
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
    string courseStorageName = "CourseStorage";
    string gradeStorageName = "GradeStorage";
    string userStorageName = "UserStorage";
    string performanceStorageName = "PerformanceStorage";
    string registrationStorageName = "RegistrationStorage";
    string programStorageName = "StudyProgramStorage";

    constructor(address addressBookAddress) AccessControl() AddressBookUser(addressBookAddress) {}

    function courseStorage() internal view returns (CourseStorage) {
        return CourseStorage(addressBook.getAddress(courseStorageName));
    }

    function gradeStorage() internal view returns (GradeStorage) {
        return GradeStorage(addressBook.getAddress(gradeStorageName));
    }

    function userStorage() internal view returns (UserStorage) {
        return UserStorage(addressBook.getAddress(userStorageName));
    }

    function performanceStorage() internal view returns (PerformanceStorage) {
        return PerformanceStorage(addressBook.getAddress(performanceStorageName));
    }

    function registrationStorage() internal view returns (RegistrationStorage) {
        return RegistrationStorage(addressBook.getAddress(registrationStorageName));
    }

    function programStorage() internal view returns (StudyProgramStorage) {
        return StudyProgramStorage(addressBook.getAddress(programStorageName));
    }

    function changeCourseStorageName(string calldata newName) external {
        courseStorageName = newName;
    }

    function changeGradeStorageName(string calldata newName) external {
        gradeStorageName = newName;
    }

    function changeUserStorageName(string calldata newName) external {
        userStorageName = newName;
    }

    function changePerformanceStorageName(string calldata newName) external {
        performanceStorageName = newName;
    }

    function changeRegistrationStorageName(string calldata newName) external {
        registrationStorageName = newName;
    }

    function changeStudyProgramStorageName(string calldata newName) external {
        programStorageName = newName;
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
