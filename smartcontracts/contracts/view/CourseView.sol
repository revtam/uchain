pragma solidity >=0.8.7 <=0.8.17;

import "../datatypes/UserDataTypes.sol";
import "../logic/Controller.sol";

contract CourseView is Controller {
    constructor(address addressBookAddress) Controller(addressBookAddress) {}

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

    /**
     * @return If assessment requires registration, returns only the users that registered, otherwise
     * all users who are participating on the course.
     */
    function getAssessmentParticipants(uint256 assessmentId)
        external
        view
        returns (UserDataTypes.User[] memory)
    {
        uint256[] memory registrantUIds;
        if (courseDataManager().isAssessmentRegistrationRequired(assessmentId) == true) {
            registrantUIds = courseDataManager().getAssessmentRegistrantIds(assessmentId);
        } else {
            uint256 courseId = courseDataManager().getCourseIdToAssessmentId(assessmentId);
            registrantUIds = courseDataManager().getCourseParticipantIds(courseId);
        }
        UserDataTypes.User[] memory users = new UserDataTypes.User[](registrantUIds.length);
        for (uint256 i = 0; i < registrantUIds.length; ++i) {
            users[i] = userDataManager().getUser(registrantUIds[i]);
        }
        return users;
    }

    function getAllCourses() external view returns (CourseDataTypes.Course[] memory) {
        return courseDataManager().getAllCourses();
    }
}
