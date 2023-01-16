pragma solidity >=0.8.7 <=0.8.17;

import "../datatypes/PerformanceDataTypes.sol";
import "../datatypes/CourseDataTypes.sol";
import "../logic/helpers/ControllerCommonChecks.sol";
import "../data/datamanager/CourseDataManager.sol";
import "../data/datamanager/UserDataManager.sol";
import "../data/datamanager/AssessmentDataManager.sol";
import "../data/datamanager/PerformanceDataManager.sol";
import "../logic/Controller.sol";

contract PerformanceView is Controller {
    constructor(address addressBookAddress) Controller(addressBookAddress) {}

    function isExamAttendanceSet(uint256 assessmentId) external view onlyStudent returns (bool) {
        // validation
        requireAssessmentChecksIfSenderStudent(assessmentId);
        requireAssessmentTypeExam(assessmentId);
        uint256 studentUId = userDataManager().getUIdToAddress(msg.sender);

        return performanceDataManager().isAttendanceSet(studentUId, assessmentId);
    }

    function isExamAttendanceOfStudentSet(uint256 assessmentId, uint256 studentUId)
        external
        view
        onlyLecturer
        returns (bool)
    {
        // validation
        requireAssessmentChecksIfSenderLecturer(assessmentId, studentUId);
        requireAssessmentTypeExam(assessmentId);

        return performanceDataManager().isAttendanceSet(studentUId, assessmentId);
    }

    function getExamAttendance(uint256 assessmentId)
        external
        view
        onlyStudent
        returns (PerformanceDataTypes.ExamAttendance memory)
    {
        // validation
        requireAssessmentChecksIfSenderStudent(assessmentId);
        requireAssessmentTypeExam(assessmentId);
        uint256 studentUId = userDataManager().getUIdToAddress(msg.sender);

        return performanceDataManager().getExamAttendance(studentUId, assessmentId);
    }

    function getExamAttendanceOfStudent(uint256 assessmentId, uint256 studentUId)
        external
        view
        onlyLecturer
        returns (PerformanceDataTypes.ExamAttendance memory)
    {
        // validation
        requireAssessmentChecksIfSenderLecturer(assessmentId, studentUId);
        requireAssessmentTypeExam(assessmentId);

        return performanceDataManager().getExamAttendance(studentUId, assessmentId);
    }

    function isSubmissionSet(uint256 assessmentId) external view onlyStudent returns (bool) {
        // validation
        requireAssessmentChecksIfSenderStudent(assessmentId);
        requireAssessmentTypeSubmission(assessmentId);
        uint256 studentUId = userDataManager().getUIdToAddress(msg.sender);

        return performanceDataManager().isSubmissionSet(studentUId, assessmentId);
    }

    function isSubmissionOfStudentSet(uint256 assessmentId, uint256 studentUId)
        external
        view
        onlyLecturer
        returns (bool)
    {
        // validation
        requireAssessmentChecksIfSenderLecturer(assessmentId, studentUId);
        requireAssessmentTypeSubmission(assessmentId);

        return performanceDataManager().isSubmissionSet(studentUId, assessmentId);
    }

    function getSubmission(uint256 assessmentId)
        external
        view
        onlyStudent
        returns (PerformanceDataTypes.Submission memory)
    {
        // validation
        requireAssessmentChecksIfSenderStudent(assessmentId);
        requireAssessmentTypeSubmission(assessmentId);
        uint256 studentUId = userDataManager().getUIdToAddress(msg.sender);

        return performanceDataManager().getSubmission(studentUId, assessmentId);
    }

    function getSubmissionOfStudent(uint256 assessmentId, uint256 studentUId)
        external
        view
        onlyLecturer
        returns (PerformanceDataTypes.Submission memory)
    {
        // validation
        requireAssessmentChecksIfSenderLecturer(assessmentId, studentUId);
        requireAssessmentTypeSubmission(assessmentId);

        return performanceDataManager().getSubmission(studentUId, assessmentId);
    }

    function isEvaluationSet(uint256 assessmentId) external view onlyStudent returns (bool) {
        // validation
        requireAssessmentChecksIfSenderStudent(assessmentId);
        uint256 studentUId = userDataManager().getUIdToAddress(msg.sender);

        return performanceDataManager().isEvaluationSet(studentUId, assessmentId);
    }

    function isEvaluationOfStudentSet(uint256 assessmentId, uint256 studentUId)
        external
        view
        onlyLecturer
        returns (bool)
    {
        // validation
        requireAssessmentChecksIfSenderLecturer(assessmentId, studentUId);

        return performanceDataManager().isEvaluationSet(studentUId, assessmentId);
    }

    /**
     * @notice see at function `_getEvaluation`
     */
    function getEvaluation(uint256 assessmentId)
        external
        view
        onlyStudent
        returns (
            PerformanceDataTypes.Evaluation memory,
            string memory,
            string memory
        )
    {
        // validation
        requireAssessmentChecksIfSenderStudent(assessmentId);
        uint256 studentUId = userDataManager().getUIdToAddress(msg.sender);

        return _getEvaluation(assessmentId, studentUId);
    }

    /**
     * @notice see at function `_getEvaluation`
     */
    function getEvaluationOfStudent(uint256 assessmentId, uint256 studentUId)
        external
        view
        onlyLecturer
        returns (
            PerformanceDataTypes.Evaluation memory,
            string memory,
            string memory
        )
    {
        // validation
        requireAssessmentChecksIfSenderLecturer(assessmentId, studentUId);

        return _getEvaluation(assessmentId, studentUId);
    }

    function isGradeSet(uint256 courseId) external view onlyStudent returns (bool) {
        // validation
        requireCourseChecksIfSenderStudent(courseId);
        uint256 studentUId = userDataManager().getUIdToAddress(msg.sender);

        return performanceDataManager().isGradeSet(studentUId, courseId);
    }

    function isGradeOfStudentSet(uint256 courseId, uint256 studentUId)
        external
        view
        onlyLecturer
        returns (bool)
    {
        // validation
        requireCourseChecksIfSenderLecturer(courseId, studentUId);

        return performanceDataManager().isGradeSet(studentUId, courseId);
    }

    /**
     * @notice see at function `_getGrade`
     */
    function getGrade(uint256 courseId)
        external
        view
        onlyStudent
        returns (
            PerformanceDataTypes.Grade memory,
            string memory,
            string memory
        )
    {
        // validation
        requireCourseChecksIfSenderStudent(courseId);
        uint256 studentUId = userDataManager().getUIdToAddress(msg.sender);

        return _getGrade(courseId, studentUId);
    }

    /**
     * @notice see at function `_getGrade`
     */
    function getGradeOfStudent(uint256 courseId, uint256 studentUId)
        external
        view
        onlyLecturer
        returns (
            PerformanceDataTypes.Grade memory,
            string memory,
            string memory
        )
    {
        // validation
        requireCourseChecksIfSenderLecturer(courseId, studentUId);

        return _getGrade(courseId, studentUId);
    }

    // PRIVATE FUNCTIONS

    /**
     * @return [grade, graderFirstName, graderLastName]
     */
    function _getGrade(uint256 courseId, uint256 studentUId)
        private
        view
        returns (
            PerformanceDataTypes.Grade memory,
            string memory,
            string memory
        )
    {
        PerformanceDataTypes.Grade memory grade = performanceDataManager().getGrade(studentUId, courseId);
        uint256 uId = performanceDataManager().getGraderUId(studentUId, courseId);
        if (uId == Constants.NON_ID) {
            return (grade, "System", "");
        }
        (string memory graderFirstName, string memory graderLastName) = userDataManager().getUserName(uId);

        return (grade, graderFirstName, graderLastName);
    }

    /**
     * @return [evaluation, evaluatorFirstName, evaluatorLastName]
     */
    function _getEvaluation(uint256 assessmentId, uint256 studentUId)
        private
        view
        returns (
            PerformanceDataTypes.Evaluation memory,
            string memory,
            string memory
        )
    {
        PerformanceDataTypes.Evaluation memory evaluation = performanceDataManager().getEvaluation(
            studentUId,
            assessmentId
        );
        uint256 uId = performanceDataManager().getEvaluatorUId(studentUId, assessmentId);
        if (uId == Constants.NON_ID) {
            return (evaluation, "System", "");
        }
        (string memory evaluatorFirstName, string memory evaluatorLastName) = userDataManager().getUserName(
            uId
        );

        return (evaluation, evaluatorFirstName, evaluatorLastName);
    }

    function requireAssessmentTypeExam(uint256 assessmentId) private view {
        require(
            assessmentDataManager().getAssessmentType(assessmentId) == CourseDataTypes.AssessmentType.EXAM,
            "This assessment was not an exam"
        );
    }

    function requireAssessmentTypeSubmission(uint256 assessmentId) private view {
        require(
            assessmentDataManager().getAssessmentType(assessmentId) ==
                CourseDataTypes.AssessmentType.SUBMISSION,
            "This assessment was not a submission"
        );
    }

    function requireAssessmentChecksIfSenderStudent(uint256 assessmentId) private view {
        uint256 studentUId = userDataManager().getUIdToAddress(msg.sender);
        uint256 courseId = assessmentDataManager().getCourseIdToAssessmentId(assessmentId);
        ControllerCommonChecks.requireStudentRegisteredToCourse(studentUId, courseId, courseDataManager());
    }

    function requireAssessmentChecksIfSenderLecturer(uint256 assessmentId, uint256 studentUId) private view {
        uint256 lecturerUId = userDataManager().getUIdToAddress(msg.sender);
        uint256 courseId = assessmentDataManager().getCourseIdToAssessmentId(assessmentId);
        ControllerCommonChecks.requireLecturerLecturingAtCourse(lecturerUId, courseId, courseDataManager());
        ControllerCommonChecks.requireStudentRegisteredToCourse(studentUId, courseId, courseDataManager());
    }

    function requireCourseChecksIfSenderStudent(uint256 courseId) private view {
        uint256 studentUId = userDataManager().getUIdToAddress(msg.sender);
        ControllerCommonChecks.requireStudentRegisteredToCourse(studentUId, courseId, courseDataManager());
    }

    function requireCourseChecksIfSenderLecturer(uint256 courseId, uint256 studentUId) private view {
        uint256 lecturerUId = userDataManager().getUIdToAddress(msg.sender);
        ControllerCommonChecks.requireLecturerLecturingAtCourse(lecturerUId, courseId, courseDataManager());
        ControllerCommonChecks.requireStudentRegisteredToCourse(studentUId, courseId, courseDataManager());
    }

    // USED CONTRACTS

    function courseDataManager() internal view returns (CourseDataManager) {
        return CourseDataManager(addressBook.getAddress(ContractNames.Name.COURSE_DATA_MANAGER));
    }

    function assessmentDataManager() internal view returns (AssessmentDataManager) {
        return AssessmentDataManager(addressBook.getAddress(ContractNames.Name.ASSESSMENT_DATA_MANAGER));
    }

    function performanceDataManager() internal view returns (PerformanceDataManager) {
        return PerformanceDataManager(addressBook.getAddress(ContractNames.Name.PERFORMANCE_DATA_MANAGER));
    }
}
