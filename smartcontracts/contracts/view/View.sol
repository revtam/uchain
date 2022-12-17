pragma solidity >=0.8.7 <=0.8.17;

import "../addressbook/AddressBookUser.sol";
import "../data/datamanager/UserDataManager.sol";
import "../data/datamanager/CourseDataManager.sol";
import "../logic/UserAccessController.sol";

abstract contract View is AddressBookUser, UserAccessController {
    constructor(address addressBookAddress)
        AddressBookUser(addressBookAddress)
        UserAccessController(address(userDataManager()))
    {}

    function userDataManager() internal view virtual returns (UserDataManager);

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
