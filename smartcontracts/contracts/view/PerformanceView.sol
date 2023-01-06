pragma solidity >=0.8.7 <=0.8.17;

import "../datatypes/PerformanceDataTypes.sol";
import "../datatypes/CourseDataTypes.sol";
import "../logic/helpers/ControllerCommonChecks.sol";
import "../data/datamanager/CourseDataManager.sol";
import "../data/datamanager/AssessmentDataManager.sol";
import "../data/datamanager/PerformanceDataManager.sol";
import "../logic/Controller.sol";

contract PerformanceView is Controller {
    constructor(address addressBookAddress) Controller(addressBookAddress) {}

    function getExamAttendance(uint256 assessmentId)
        external
        view
        onlyStudent
        returns (PerformanceDataTypes.ExamAttendance memory)
    {
        // validation
        uint256 studentUId = userDataManager().getUIdToAddress(msg.sender);
        uint256 courseId = assessmentDataManager().getCourseIdToAssessmentId(assessmentId);
        ControllerCommonChecks.requireStudentRegisteredToCourse(studentUId, courseId, courseDataManager());
        requireAssessmentTypeExam(assessmentId);

        return performanceDataManager().getExamAttendance(studentUId, assessmentId);
    }

    function getExamAttendanceOfStudent(uint256 assessmentId, uint256 studentUId)
        external
        view
        onlyLecturer
        returns (PerformanceDataTypes.ExamAttendance memory)
    {
        // validation
        uint256 courseId = assessmentDataManager().getCourseIdToAssessmentId(assessmentId);
        uint256 lecturerUId = userDataManager().getUIdToAddress(msg.sender);
        ControllerCommonChecks.requireLecturerLecturingAtCourse(lecturerUId, courseId, courseDataManager());
        ControllerCommonChecks.requireStudentRegisteredToCourse(studentUId, courseId, courseDataManager());
        requireAssessmentTypeExam(assessmentId);

        return performanceDataManager().getExamAttendance(studentUId, assessmentId);
    }

    function getSubmission(uint256 assessmentId)
        external
        view
        onlyStudent
        returns (PerformanceDataTypes.Submission memory)
    {
        // validation
        uint256 studentUId = userDataManager().getUIdToAddress(msg.sender);
        uint256 courseId = assessmentDataManager().getCourseIdToAssessmentId(assessmentId);
        ControllerCommonChecks.requireStudentRegisteredToCourse(studentUId, courseId, courseDataManager());
        requireAssessmentTypeSubmission(assessmentId);

        return performanceDataManager().getSubmission(studentUId, assessmentId);
    }

    function getSubmissionOfStudent(uint256 assessmentId, uint256 studentUId)
        external
        view
        onlyLecturer
        returns (PerformanceDataTypes.Submission memory)
    {
        // validation
        uint256 courseId = assessmentDataManager().getCourseIdToAssessmentId(assessmentId);
        uint256 lecturerUId = userDataManager().getUIdToAddress(msg.sender);
        ControllerCommonChecks.requireLecturerLecturingAtCourse(lecturerUId, courseId, courseDataManager());
        requireAssessmentTypeSubmission(assessmentId);

        return performanceDataManager().getSubmission(studentUId, assessmentId);
    }

    function getGrade(uint256 courseId)
        external
        view
        onlyStudent
        returns (PerformanceDataTypes.Grade memory)
    {
        // validation
        uint256 studentUId = userDataManager().getUIdToAddress(msg.sender);
        ControllerCommonChecks.requireStudentRegisteredToCourse(studentUId, courseId, courseDataManager());

        return performanceDataManager().getGrade(studentUId, courseId);
    }

    function getGradeOfStudent(uint256 courseId, uint256 studentUId)
        external
        view
        onlyLecturer
        returns (PerformanceDataTypes.Grade memory)
    {
        // validation
        uint256 lecturerUId = userDataManager().getUIdToAddress(msg.sender);
        ControllerCommonChecks.requireLecturerLecturingAtCourse(lecturerUId, courseId, courseDataManager());
        ControllerCommonChecks.requireStudentRegisteredToCourse(studentUId, courseId, courseDataManager());

        return performanceDataManager().getGrade(studentUId, courseId);
    }

    function getEvaluation(uint256 assessmentId)
        external
        view
        onlyStudent
        returns (PerformanceDataTypes.Evaluation memory)
    {
        // validation
        uint256 studentUId = userDataManager().getUIdToAddress(msg.sender);
        uint256 courseId = assessmentDataManager().getCourseIdToAssessmentId(assessmentId);
        ControllerCommonChecks.requireStudentRegisteredToCourse(studentUId, courseId, courseDataManager());

        return performanceDataManager().getEvaluation(studentUId, assessmentId);
    }

    function getEvaluationOfStudent(uint256 assessmentId, uint256 studentUId)
        external
        view
        onlyLecturer
        returns (PerformanceDataTypes.Evaluation memory)
    {
        // validation
        uint256 lecturerUId = userDataManager().getUIdToAddress(msg.sender);
        uint256 courseId = assessmentDataManager().getCourseIdToAssessmentId(assessmentId);
        ControllerCommonChecks.requireLecturerLecturingAtCourse(lecturerUId, courseId, courseDataManager());
        ControllerCommonChecks.requireStudentRegisteredToCourse(studentUId, courseId, courseDataManager());

        return performanceDataManager().getEvaluation(studentUId, assessmentId);
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
