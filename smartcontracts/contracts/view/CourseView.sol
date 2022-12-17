pragma solidity >=0.8.7 <=0.8.17;

import "../data/datamanager/CourseDataManager.sol";
import "../data/datamanager/UserDataManager.sol";
import "../datatypes/UserDataTypes.sol";
import "./View.sol";

contract CourseView is View {
    constructor(address addressBookAddress) View(addressBookAddress) {}

    function getRegisteredCourses() external view onlyStudent returns (CourseDataTypes.Course[] memory) {
        uint256 studentUId = userDataManager().getUIdToAddress(msg.sender);
        return courseDataManager().getCoursesToStudent(studentUId);
    }

    function getCoursesLecturingAt() external view onlyLecturer returns (CourseDataTypes.Course[] memory) {
        uint256 lecturerUId = userDataManager().getUIdToAddress(msg.sender);
        return courseDataManager().getCoursesToLecturer(lecturerUId);
    }

    function getRegisteredCoursesOfStudent(uint256 studentUId)
        external
        view
        onlySPM
        returns (CourseDataTypes.Course[] memory)
    {
        // validation
        requireUserAtUIdStudent(studentUId, userDataManager());

        return courseDataManager().getCoursesToStudent(studentUId);
    }

    function getCoursesToStudyProgram(uint256 programId)
        external
        view
        returns (CourseDataTypes.Course[] memory)
    {
        return courseDataManager().getCoursesToProgramId(programId);
    }

    function getAllCourses() external view returns (CourseDataTypes.Course[] memory) {
        return courseDataManager().getAllCourses();
    }

    // GET RELEVANT CONTRACTS

    function courseDataManager() private view returns (CourseDataManager) {
        return CourseDataManager(addressBook.getAddress("CourseDataManager"));
    }

    function userDataManager() internal view override returns (UserDataManager) {
        return UserDataManager(addressBook.getAddress("UserDataManager"));
    }
}
