pragma solidity >=0.8.7 <=0.8.17;

import "../datatypes/UserDataTypes.sol";
import "../logic/helpers/ControllerCommonChecks.sol";
import "../data/datamanager/CourseDataManager.sol";
import "../data/datamanager/AssessmentDataManager.sol";
import "../logic/Controller.sol";

contract CourseView is Controller {
    constructor(address addressBookAddress) Controller(addressBookAddress) {}

    function isRegisteredAtCourse(uint256 courseId) external view onlyStudent returns (bool) {
        uint256 studentUId = userDataManager().getUIdToAddress(msg.sender);
        return courseDataManager().isRegisteredToCourse(studentUId, courseId);
    }

    function getRegisteredCourses() external view onlyStudent returns (CourseDataTypes.Course[] memory) {
        uint256 studentUId = userDataManager().getUIdToAddress(msg.sender);
        return courseDataManager().getCoursesToStudent(studentUId);
    }

    function getCoursesLecturingAt() external view onlyLecturer returns (CourseDataTypes.Course[] memory) {
        uint256 lecturerUId = userDataManager().getUIdToAddress(msg.sender);
        return courseDataManager().getCoursesToLecturer(lecturerUId);
    }

    function getLecturersAtCourse(uint256 courseId) external view returns (UserDataTypes.User[] memory) {
        uint256[] memory lecturerUIds = courseDataManager().getLecturerUIdsOfCourseId(courseId);
        return userDataManager().getUsers(lecturerUIds);
    }

    function getCourseParticipantsNumber(uint256 courseId) external view returns (uint256) {
        return courseDataManager().getCourseParticipantIds(courseId).length;
    }

    function getCourseParticipants(uint256 courseId)
        external
        view
        onlyLecturer
        returns (UserDataTypes.User[] memory)
    {
        uint256 lecturerUId = userDataManager().getUIdToAddress(msg.sender);
        ControllerCommonChecks.requireLecturerLecturingAtCourse(lecturerUId, courseId, courseDataManager());

        uint256[] memory participantUIds = courseDataManager().getCourseParticipantIds(courseId);
        return userDataManager().getUsers(participantUIds);
    }

    function getAssessmentsToCourseId(uint256 courseId)
        external
        view
        returns (CourseDataTypes.Assessment[] memory)
    {
        return assessmentDataManager().getAssessmentsToCourseId(courseId);
    }

    /**
     * @return If assessment requires registration, returns only the users that registered, otherwise
     * all users who are participating on the course.
     */
    function getAssessmentParticipants(uint256 assessmentId)
        external
        view
        onlyLecturer
        returns (UserDataTypes.User[] memory)
    {
        uint256 lecturerUId = userDataManager().getUIdToAddress(msg.sender);
        uint256 courseId = assessmentDataManager().getCourseIdToAssessmentId(assessmentId);
        ControllerCommonChecks.requireLecturerLecturingAtCourse(lecturerUId, courseId, courseDataManager());

        return userDataManager().getUsers(assessmentDataManager().getAssessmentRegistrantIds(assessmentId));
    }

    function isRegisteredToAssessment(uint256 assessmentId) external view onlyStudent returns (bool) {
        uint256 studentUId = userDataManager().getUIdToAddress(msg.sender);
        uint256 courseId = assessmentDataManager().getCourseIdToAssessmentId(assessmentId);
        ControllerCommonChecks.requireStudentRegisteredToCourse(studentUId, courseId, courseDataManager());

        return assessmentDataManager().isRegisteredToAssessment(studentUId, assessmentId);
    }

    function getRegisteredAssessments(uint256 courseId)
        external
        view
        onlyStudent
        returns (CourseDataTypes.Assessment[] memory)
    {
        uint256 studentUId = userDataManager().getUIdToAddress(msg.sender);
        ControllerCommonChecks.requireStudentRegisteredToCourse(studentUId, courseId, courseDataManager());

        return
            assessmentDataManager().getAssessments(
                assessmentDataManager().getAssessmentIdsToCourseIdOfUId(courseId, studentUId)
            );
    }

    function getRegisteredAssessmentsOfStudent(uint256 courseId, uint256 studentUId)
        external
        view
        onlyLecturer
        returns (CourseDataTypes.Assessment[] memory)
    {
        uint256 lecturerUId = userDataManager().getUIdToAddress(msg.sender);
        ControllerCommonChecks.requireLecturerLecturingAtCourse(lecturerUId, courseId, courseDataManager());

        return
            assessmentDataManager().getAssessments(
                assessmentDataManager().getAssessmentIdsToCourseIdOfUId(courseId, studentUId)
            );
    }

    function getAssessment(uint256 assessmentId) external view returns (CourseDataTypes.Assessment memory) {
        return assessmentDataManager().getAssessment(assessmentId);
    }

    function getCourse(uint256 courseId) external view returns (CourseDataTypes.Course memory) {
        return courseDataManager().getCourse(courseId);
    }

    function getAllCourses() external view returns (CourseDataTypes.Course[] memory) {
        return courseDataManager().getAllCourses();
    }

    function getAllCourseCodes() external view returns (string[] memory) {
        return courseDataManager().getAllCourseCodes();
    }

    // USED CONTRACTS

    function courseDataManager() internal view returns (CourseDataManager) {
        return CourseDataManager(addressBook.getAddress(ContractNames.Name.COURSE_DATA_MANAGER));
    }

    function assessmentDataManager() internal view returns (AssessmentDataManager) {
        return AssessmentDataManager(addressBook.getAddress(ContractNames.Name.ASSESSMENT_DATA_MANAGER));
    }
}
