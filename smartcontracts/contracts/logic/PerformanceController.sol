pragma solidity >=0.8.7 <=0.8.17;

import "../helpers/ArrayOperations.sol";
import "../datatypes/CourseDataTypes.sol";
import "../data/datamanager/PerformanceDataManager.sol";

import "./Controller.sol";

contract PerformanceController is Controller {
    constructor(address addressBookAddress) Controller(addressBookAddress) {}

    /**
     * @notice If a submission of the sender for the given appointment already exists, it will be overriden.
     */
    function addSubmission(uint256 appointmentId, string calldata documentHash) external onlyStudent {
        // validation
        uint256 studentUId = userDataManager().getUIdToAddress(msg.sender);
        uint256 courseId = courseDataManager().getCourseIdToAppointmentId(appointmentId);
        uint256 deadline = courseDataManager().getAppointmentTime(appointmentId);
        requireStudentRegisteredToCourse(studentUId, courseId, courseDataManager());
        require(
            courseDataManager().getAppointmentType(appointmentId) ==
                CourseDataTypes.AppointmentType.SUBMISSION,
            "This appointment was not a submission"
        );
        require(block.timestamp <= deadline, "Submission is not possible after the deadline");

        // action
        performanceDataManager().setSubmission(studentUId, appointmentId, block.timestamp, documentHash);
    }

    /**
     * @notice If an evaluation of the student for the given appointment already exists, it reverts.
     */
    function giveEvaluation(
        uint256 studentUId,
        uint256 appointmentId,
        uint256 achievedPoints,
        string calldata feedback
    ) external onlyLecturer {
        // validation
        uint256 lecturerUId = userDataManager().getUIdToAddress(msg.sender);
        uint256 courseId = courseDataManager().getCourseIdToAppointmentId(appointmentId);
        requireLecturerLecturingAtCourse(lecturerUId, courseId, courseDataManager());
        requireStudentRegisteredToCourse(studentUId, courseId, courseDataManager());

        // action
        performanceDataManager().setEvaluation(
            studentUId,
            appointmentId,
            block.timestamp,
            achievedPoints,
            feedback,
            lecturerUId
        );
    }

    /**
     * @notice If an attendance confirmation of the student for the given appointment already exists, it reverts.
     */
    function confirmExamAttendance(
        uint256 studentUId,
        uint256 appointmentId,
        bool hasAttended
    ) external onlyLecturer {
        // validation
        uint256 lecturerUId = userDataManager().getUIdToAddress(msg.sender);
        uint256 courseId = courseDataManager().getCourseIdToAppointmentId(appointmentId);
        requireLecturerLecturingAtCourse(lecturerUId, courseId, courseDataManager());
        requireStudentRegisteredToCourse(studentUId, courseId, courseDataManager());
        require(
            courseDataManager().getAppointmentType(appointmentId) == CourseDataTypes.AppointmentType.EXAM,
            "This appointment was not an exam"
        );
        require(
            !performanceDataManager().isAttendanceSet(studentUId, appointmentId),
            "This student's exam attendance was confirmed already"
        );

        // action
        performanceDataManager().setAttendanceConfirmation(
            studentUId,
            appointmentId,
            hasAttended,
            block.timestamp
        );
    }

    /**
     * @notice If a final grade of the student for the given course already exists, it will be overriden.
     */
    function giveFinalGrade(
        uint256 studentUId,
        uint256 courseId,
        uint256 grade,
        string calldata feedback
    ) external onlyLecturer {
        // validation
        uint256 lecturerUId = userDataManager().getUIdToAddress(msg.sender);
        requireLecturerLecturingAtCourse(lecturerUId, courseId, courseDataManager());
        requireStudentRegisteredToCourse(studentUId, courseId, courseDataManager());

        // action
        bool isPositive = grade < Constants.LOWEST_GRADE ? true : false;
        performanceDataManager().setGrade(
            studentUId,
            courseId,
            block.timestamp,
            grade,
            isPositive,
            feedback,
            lecturerUId
        );
    }

    // GET RELEVANT CONTRACTS

    function courseDataManager() private view returns (CourseDataManager) {
        return CourseDataManager(addressBook.getAddress("CourseDataManager"));
    }

    function userDataManager() internal view override returns (UserDataManager) {
        return UserDataManager(addressBook.getAddress("UserDataManager"));
    }

    function performanceDataManager() private view returns (PerformanceDataManager) {
        return PerformanceDataManager(addressBook.getAddress("PerformanceDataManager"));
    }
}
