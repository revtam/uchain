pragma solidity >=0.8.7 <=0.8.17;

import "../addressbook/AddressBookUser.sol";
import "../helpers/AccessControl.sol";
import "../data/datamanager/UserDataManager.sol";
import "../data/datamanager/CourseDataManager.sol";
import "../data/datamanager/PerformanceDataManager.sol";
import "../data/datamanager/ProgramDataManager.sol";
import "../data/datamanager/RegistrationDataManager.sol";
import "./UserAccessController.sol";

abstract contract Controller is AccessControl, AddressBookUser, UserAccessController {
    string courseDataManagerName = "CourseDataManager";
    string userDataManagerName = "UserDataManager";
    string performanceDataManagerName = "PerformanceDataManager";
    string programDataManagerName = "ProgramDataManager";
    string registrationDataManagerName = "RegistrationDataManager";

    constructor(address addressBookAddress)
        AccessControl()
        AddressBookUser(addressBookAddress)
        UserAccessController(address(userDataManager()))
    {}

    function courseDataManager() internal view returns (CourseDataManager) {
        return CourseDataManager(addressBook.getAddress(courseDataManagerName));
    }

    function userDataManager() internal view returns (UserDataManager) {
        return UserDataManager(addressBook.getAddress(userDataManagerName));
    }

    function performanceDataManager() internal view returns (PerformanceDataManager) {
        return PerformanceDataManager(addressBook.getAddress(performanceDataManagerName));
    }

    function programDataManager() internal view returns (ProgramDataManager) {
        return ProgramDataManager(addressBook.getAddress(programDataManagerName));
    }

    function registrationDataManager() internal view returns (RegistrationDataManager) {
        return RegistrationDataManager(addressBook.getAddress(registrationDataManagerName));
    }

    function changeCourseDataManagerName(string calldata newName) external {
        courseDataManagerName = newName;
    }

    function changeUserDataManagerName(string calldata newName) external {
        userDataManagerName = newName;
    }

    function changePerformanceDataManagerName(string calldata newName) external {
        performanceDataManagerName = newName;
    }

    function changeProgramDataManagerName(string calldata newName) external {
        programDataManagerName = newName;
    }

    function changeRegistrationDataManagerName(string calldata newName) external {
        registrationDataManagerName = newName;
    }

    function requireStudentRegisteredToCourse(
        uint256 studentUId,
        uint256 courseId,
        CourseDataManager courseDataManager
    ) internal view {
        require(
            ArrayOperations.isElementInUintArray(
                studentUId,
                courseDataManager.getCourseParticipantIds(courseId)
            ),
            "Student is not registered to the course"
        );
    }

    function requireLecturerLecturingAtCourse(
        uint256 lecturerUId,
        uint256 courseId,
        CourseDataManager courseDataManager
    ) internal view {
        require(
            ArrayOperations.isElementInUintArray(
                lecturerUId,
                courseDataManager.getLecturerUIdsOfCourseId(courseId)
            ),
            "Lecturer is not lecturing at this course"
        );
    }

    function requireUserAtUIdStudent(uint256 studentUId, UserDataManager userDataManager) internal view {
        require(
            userDataManager.getUserRoleAtUId(studentUId) == UserDataTypes.UserRole.STUDENT,
            "The given uID does not belong to a student"
        );
    }
}