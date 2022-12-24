pragma solidity >=0.8.7 <=0.8.17;

import "../addressbook/AddressBookUser.sol";
import "../addressbook/ContractNames.sol";
import "../helpers/AccessControl.sol";
import "../data/datamanager/UserDataManager.sol";
import "../data/datamanager/CourseDataManager.sol";
import "../data/datamanager/PerformanceDataManager.sol";
import "../data/datamanager/ProgramDataManager.sol";
import "../data/datamanager/RegistrationDataManager.sol";
import "./UserAccessController.sol";

abstract contract Controller is AccessControl, AddressBookUser, UserAccessController {
    constructor(address addressBookAddress)
        AccessControl()
        AddressBookUser(addressBookAddress)
        UserAccessController(address(userDataManager()))
    {}

    function courseDataManager() internal view returns (CourseDataManager) {
        return CourseDataManager(addressBook.getAddress(ContractNames.Name.COURSE_DATA_MANAGER));
    }

    function userDataManager() internal view returns (UserDataManager) {
        return UserDataManager(addressBook.getAddress(ContractNames.Name.USER_DATA_MANAGER));
    }

    function performanceDataManager() internal view returns (PerformanceDataManager) {
        return PerformanceDataManager(addressBook.getAddress(ContractNames.Name.PERFORMANCE_DATA_MANAGER));
    }

    function programDataManager() internal view returns (ProgramDataManager) {
        return ProgramDataManager(addressBook.getAddress(ContractNames.Name.PROGRAM_DATA_MANAGER));
    }

    function registrationDataManager() internal view returns (RegistrationDataManager) {
        return RegistrationDataManager(addressBook.getAddress(ContractNames.Name.REGISTRATION_DATA_MANAGER));
    }

    function requireStudentRegisteredToCourse(
        uint256 studentUId,
        uint256 courseId,
        CourseDataManager _courseDataManager
    ) internal view {
        require(
            ArrayOperations.isElementInUintArray(
                studentUId,
                _courseDataManager.getCourseParticipantIds(courseId)
            ),
            "Student is not registered to the course"
        );
    }

    function requireLecturerLecturingAtCourse(
        uint256 lecturerUId,
        uint256 courseId,
        CourseDataManager _courseDataManager
    ) internal view {
        require(
            ArrayOperations.isElementInUintArray(
                lecturerUId,
                _courseDataManager.getLecturerUIdsOfCourseId(courseId)
            ),
            "Lecturer is not lecturing at this course"
        );
    }

    function requireUserAtUIdStudent(uint256 studentUId, UserDataManager _userDataManager) internal view {
        require(
            _userDataManager.getUserRoleAtUId(studentUId) == UserDataTypes.UserRole.STUDENT,
            "The given uID does not belong to a student"
        );
    }
}
