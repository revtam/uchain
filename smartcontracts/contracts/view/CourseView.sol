pragma solidity >=0.8.7 <=0.8.17;

import "../helpers/ControllerViewCommonRequirements.sol";
import "../data/datamanager/CourseDataManager.sol";
import "../data/datamanager/UserDataManager.sol";
import "../datatypes/UserDataTypes.sol";
import "../logic/UserAccessController.sol";

contract CourseView is UserAccessController {
    CourseDataManager courseDataManager;
    UserDataManager userDataManager;

    constructor(address userDataManagerAddress, address courseDataManagerAddress)
        UserAccessController(userDataManagerAddress)
    {
        courseDataManager = CourseDataManager(courseDataManagerAddress);
        userDataManager = UserDataManager(userDataManagerAddress);
    }

    function getRegisteredCourses() external view onlyStudent returns (CourseDataTypes.Course[] memory) {
        uint256 studentUId = userDataManager.getUIdToAddress(msg.sender);
        return courseDataManager.getCoursesToStudent(studentUId);
    }

    function getCoursesLecturingAt() external view onlyLecturer returns (CourseDataTypes.Course[] memory) {
        uint256 lecturerUId = userDataManager.getUIdToAddress(msg.sender);
        return courseDataManager.getCoursesToLecturer(lecturerUId);
    }

    function getRegisteredCoursesOfStudent(uint256 studentUId)
        external
        view
        onlySPM
        returns (CourseDataTypes.Course[] memory)
    {
        // validation
        ControllerViewCommonRequirements.requireUserAtUIdStudent(studentUId, userDataManager);

        return courseDataManager.getCoursesToStudent(studentUId);
    }

    function getCoursesToStudyProgram(uint256 programId)
        external
        view
        returns (CourseDataTypes.Course[] memory)
    {
        return courseDataManager.getCoursesToProgramId(programId);
    }

    function getAllCourses() external view returns (CourseDataTypes.Course[] memory) {
        return courseDataManager.getAllCourses();
    }
}
