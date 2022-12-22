pragma solidity >=0.8.7 <=0.8.17;

import "../logic/Controller.sol";
import "../datatypes/PerformanceDataTypes.sol";
import "../datatypes/CourseDataTypes.sol";

contract PerformanceView is Controller {
    constructor(address addressBookAddress) Controller(addressBookAddress) {}

    function getExamAttendance(uint256 appointmentId)
        external
        view
        onlyStudent
        returns (PerformanceDataTypes.ExamAttendance memory)
    {
        // validation
        uint256 studentUId = userDataManager().getUIdToAddress(msg.sender);
        uint256 courseId = courseDataManager().getCourseIdToAppointmentId(appointmentId);
        requireStudentRegisteredToCourse(studentUId, courseId, courseDataManager());
        requireAppointmentTypeExam(appointmentId);

        return performanceDataManager().getExamAttendance(studentUId, appointmentId);
    }

    function getExamAttendanceOfStudent(uint256 appointmentId, uint256 studentUId)
        external
        view
        onlyLecturer
        returns (PerformanceDataTypes.ExamAttendance memory)
    {
        // validation
        uint256 courseId = courseDataManager().getCourseIdToAppointmentId(appointmentId);
        uint256 lecturerUId = userDataManager().getUIdToAddress(msg.sender);
        requireLecturerLecturingAtCourse(lecturerUId, courseId, courseDataManager());
        requireStudentRegisteredToCourse(studentUId, courseId, courseDataManager());
        requireAppointmentTypeExam(appointmentId);

        return performanceDataManager().getExamAttendance(studentUId, appointmentId);
    }

    function getSubmission(uint256 appointmentId)
        external
        view
        onlyStudent
        returns (PerformanceDataTypes.Submission memory)
    {
        // validation
        uint256 studentUId = userDataManager().getUIdToAddress(msg.sender);
        uint256 courseId = courseDataManager().getCourseIdToAppointmentId(appointmentId);
        requireStudentRegisteredToCourse(studentUId, courseId, courseDataManager());
        requireAppointmentTypeSubmission(appointmentId);

        return performanceDataManager().getSubmission(studentUId, appointmentId);
    }

    function getSubmissionOfStudent(uint256 appointmentId, uint256 studentUId)
        external
        view
        onlyLecturer
        returns (PerformanceDataTypes.Submission memory)
    {
        // validation
        uint256 courseId = courseDataManager().getCourseIdToAppointmentId(appointmentId);
        uint256 lecturerUId = userDataManager().getUIdToAddress(msg.sender);
        requireLecturerLecturingAtCourse(lecturerUId, courseId, courseDataManager());
        requireAppointmentTypeSubmission(appointmentId);

        return performanceDataManager().getSubmission(studentUId, appointmentId);
    }

    function getGrade(uint256 courseId)
        external
        view
        onlyStudent
        returns (PerformanceDataTypes.Grade memory)
    {
        // validation
        uint256 studentUId = userDataManager().getUIdToAddress(msg.sender);
        requireStudentRegisteredToCourse(studentUId, courseId, courseDataManager());

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
        requireLecturerLecturingAtCourse(lecturerUId, courseId, courseDataManager());
        requireStudentRegisteredToCourse(studentUId, courseId, courseDataManager());

        return performanceDataManager().getGrade(studentUId, courseId);
    }

    function getEvaluation(uint256 appointmentId)
        external
        view
        onlyStudent
        returns (PerformanceDataTypes.Evaluation memory)
    {
        // validation
        uint256 studentUId = userDataManager().getUIdToAddress(msg.sender);
        uint256 courseId = courseDataManager().getCourseIdToAppointmentId(appointmentId);
        requireStudentRegisteredToCourse(studentUId, courseId, courseDataManager());

        return performanceDataManager().getEvaluation(studentUId, appointmentId);
    }

    function getEvaluationOfStudent(uint256 appointmentId, uint256 studentUId)
        external
        view
        onlyLecturer
        returns (PerformanceDataTypes.Evaluation memory)
    {
        // validation
        uint256 lecturerUId = userDataManager().getUIdToAddress(msg.sender);
        uint256 courseId = courseDataManager().getCourseIdToAppointmentId(appointmentId);
        requireLecturerLecturingAtCourse(lecturerUId, courseId, courseDataManager());
        requireStudentRegisteredToCourse(studentUId, courseId, courseDataManager());

        return performanceDataManager().getEvaluation(studentUId, appointmentId);
    }

    function requireAppointmentTypeExam(uint256 appointmentId) private view {
        require(
            courseDataManager().getAppointmentType(appointmentId) == CourseDataTypes.AppointmentType.EXAM,
            "This appointment was not an exam"
        );
    }

    function requireAppointmentTypeSubmission(uint256 appointmentId) private view {
        require(
            courseDataManager().getAppointmentType(appointmentId) ==
                CourseDataTypes.AppointmentType.SUBMISSION,
            "This appointment was not a submission"
        );
    }
}
