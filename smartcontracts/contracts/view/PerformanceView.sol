pragma solidity >=0.8.7 <=0.8.17;

import "../helpers/ControllerViewCommonRequirements.sol";
import "../logic/UserAccessController.sol";
import "../logic/DataManagerAccess.sol";
import "../datatypes/PerformanceDataTypes.sol";
import "../datatypes/CourseDataTypes.sol";

contract PerformanceView is UserAccessController, DataManagerAccess {
    constructor(
        address courseDataManagerAddress,
        address performanceDataManagerAddress,
        address userDataManagerAddress
    )
        UserAccessController(userDataManagerAddress)
        DataManagerAccess(courseDataManagerAddress, performanceDataManagerAddress, userDataManagerAddress)
    {}

    function getExamAttendance(uint256 appointmentId)
        external
        view
        onlyStudent
        returns (PerformanceDataTypes.ExamAttendance memory)
    {
        // validation
        uint256 studentUId = userDataManager.getUIdToAddress(msg.sender);
        uint256 courseId = courseDataManager.getCourseIdToAppointmentId(appointmentId);
        ControllerViewCommonRequirements.requireStudentRegisteredToCourse(
            studentUId,
            courseId,
            courseDataManager
        );
        requireAppointmentTypeExam(appointmentId);

        return performanceDataManager.getExamAttendance(studentUId, appointmentId);
    }

    function getExamAttendanceOfStudent(uint256 appointmentId, uint256 studentUId)
        external
        view
        onlyLecturer
        returns (PerformanceDataTypes.ExamAttendance memory)
    {
        // validation
        uint256 courseId = courseDataManager.getCourseIdToAppointmentId(appointmentId);
        uint256 lecturerUId = userDataManager.getUIdToAddress(msg.sender);
        ControllerViewCommonRequirements.requireLecturerLecturingAtCourse(
            lecturerUId,
            courseId,
            courseDataManager
        );
        ControllerViewCommonRequirements.requireStudentRegisteredToCourse(
            studentUId,
            courseId,
            courseDataManager
        );
        requireAppointmentTypeExam(appointmentId);

        return performanceDataManager.getExamAttendance(studentUId, appointmentId);
    }

    function getSubmission(uint256 appointmentId)
        external
        view
        onlyStudent
        returns (PerformanceDataTypes.Submission memory)
    {
        // validation
        uint256 studentUId = userDataManager.getUIdToAddress(msg.sender);
        uint256 courseId = courseDataManager.getCourseIdToAppointmentId(appointmentId);
        ControllerViewCommonRequirements.requireStudentRegisteredToCourse(
            studentUId,
            courseId,
            courseDataManager
        );
        requireAppointmentTypeSubmission(appointmentId);

        return performanceDataManager.getSubmission(studentUId, appointmentId);
    }

    function getSubmissionOfStudent(uint256 appointmentId, uint256 studentUId)
        external
        view
        onlyLecturer
        returns (PerformanceDataTypes.Submission memory)
    {
        // validation
        uint256 courseId = courseDataManager.getCourseIdToAppointmentId(appointmentId);
        uint256 lecturerUId = userDataManager.getUIdToAddress(msg.sender);
        ControllerViewCommonRequirements.requireLecturerLecturingAtCourse(
            lecturerUId,
            courseId,
            courseDataManager
        );
        requireAppointmentTypeSubmission(appointmentId);

        return performanceDataManager.getSubmission(studentUId, appointmentId);
    }

    /**
     * @return Empty array if no final grade has been given yet, else returns change history of final grade (last in array is the latest one).
     * This allows the user to see grades given previously, in case these previous grades have been revised and changed.
     */
    function getFinalGrade(uint256 courseId)
        external
        view
        onlyStudent
        returns (PerformanceDataTypes.FinalGrade[] memory)
    {
        // validation
        uint256 studentUId = userDataManager.getUIdToAddress(msg.sender);
        ControllerViewCommonRequirements.requireStudentRegisteredToCourse(
            studentUId,
            courseId,
            courseDataManager
        );

        return performanceDataManager.getFinalGradeHistory(studentUId, courseId);
    }

    /**
     * @return Empty array if no final grade has been given yet, else returns change history of final grade (last in array is the latest one).
     * This allows the user to see grades given previously, in case these previous grades have been revised and changed.
     */
    function getFinalGradeOfStudent(uint256 courseId, uint256 studentUId)
        external
        view
        onlyLecturer
        returns (PerformanceDataTypes.FinalGrade[] memory)
    {
        // validation
        uint256 lecturerUId = userDataManager.getUIdToAddress(msg.sender);
        ControllerViewCommonRequirements.requireLecturerLecturingAtCourse(
            lecturerUId,
            courseId,
            courseDataManager
        );
        ControllerViewCommonRequirements.requireStudentRegisteredToCourse(
            studentUId,
            courseId,
            courseDataManager
        );

        return performanceDataManager.getFinalGradeHistory(studentUId, courseId);
    }

    // get selected appointment performance
    function getEvaluation(uint256 appointmentId)
        external
        view
        onlyStudent
        returns (PerformanceDataTypes.Evaluation memory)
    {
        // validation
        uint256 studentUId = userDataManager.getUIdToAddress(msg.sender);
        uint256 courseId = courseDataManager.getCourseIdToAppointmentId(appointmentId);
        ControllerViewCommonRequirements.requireStudentRegisteredToCourse(
            studentUId,
            courseId,
            courseDataManager
        );

        return performanceDataManager.getEvaluation(studentUId, appointmentId);
    }

    function getEvaluationOfStudent(uint256 appointmentId, uint256 studentUId)
        external
        view
        onlyLecturer
        returns (PerformanceDataTypes.Evaluation memory)
    {
        // validation
        uint256 lecturerUId = userDataManager.getUIdToAddress(msg.sender);
        uint256 courseId = courseDataManager.getCourseIdToAppointmentId(appointmentId);
        ControllerViewCommonRequirements.requireLecturerLecturingAtCourse(
            lecturerUId,
            courseId,
            courseDataManager
        );
        ControllerViewCommonRequirements.requireStudentRegisteredToCourse(
            studentUId,
            courseId,
            courseDataManager
        );

        return performanceDataManager.getEvaluation(studentUId, appointmentId);
    }

    // /**
    //  * @param assessmentId The assessment that the appropriate evaluation is returned for.
    //  */
    // function getEvaluationForGradeCalculation(uint256 assessmentId)
    //     external
    //     view
    //     onlyStudent
    //     returns (PerformanceDataTypes.Evaluation memory)
    // {
    //     // validation
    //     uint256 studentUId = userDataManager.getUIdToAddress(msg.sender);
    //     uint256 courseId = courseDataManager.getCourseIdToAssessmentId(assessmentId);
    //     ControllerViewCommonRequirements.requireStudentRegisteredToCourse(studentUId, courseId);

    //     findEvaluationToCount(studentUId, assessmentId);
    // }

    // /**
    //  * @param assessmentId The assessment that the appropriate evaluation is returned for.
    //  * @param studentUId The student that the evaluation is searched at.
    //  */
    // function getEvaluationForGradeCalculationOfStudent(uint256 studentUId, uint256 assessmentId)
    //     external
    //     view
    //     onlyLecturer
    //     returns (PerformanceDataTypes.Evaluation memory)
    // {
    //     // validation
    //     uint256 lecturerUId = userDataManager.getUIdToAddress(msg.sender);
    //     uint256 courseId = courseDataManager.getCourseIdToAssessmentId(assessmentId);
    //     ControllerViewCommonRequirements.requireLecturerLecturingAtCourse(lecturerUId, courseId);
    //     ControllerViewCommonRequirements.requireStudentRegisteredToCourse(studentUId, courseId);

    //     findEvaluationToCount(studentUId, assessmentId);
    // }

    // PRIVATE FUNCTIONS

    function calculateGrade(uint256 courseId, uint256 studentUId) private returns (uint256) {
        // requireStudentRegisteredToCourse(studentUId, courseId);
        // get assessments
        // loop assessments:
        //   get max points mp
        //   add max points to total points
        // loop assessments:
        //   get points weight
        //   get latest appointment of assessment
        //   get student's achieved points for latest appointment ap
        //   get min points
        //   if achieved points < min points, return grade 1
        //   calculate weight adjusted max points from total points and points weight wamp
        //   calculate weight adjusted achieved points: waap = ap / mp * wamp
        //   add waap to total achieved adjusted points
        // calculate achieved percentage from waap / wamp aper
        // get grade levels
        // loop grade levels:
        //   get min percentage
        //   if aper >= min percentage and gradelevel.grade < best achieved grade: best achieved grade = gradelevel.grade
        // return best achieved grade
    }

    function requireAppointmentTypeExam(uint256 appointmentId) private view {
        require(
            courseDataManager.getAppointmentType(appointmentId) == CourseDataTypes.AppointmentType.EXAM,
            "This appointment was not an exam"
        );
    }

    function requireAppointmentTypeSubmission(uint256 appointmentId) private view {
        require(
            courseDataManager.getAppointmentType(appointmentId) == CourseDataTypes.AppointmentType.SUBMISSION,
            "This appointment was not a submission"
        );
    }
}
