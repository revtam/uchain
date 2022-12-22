pragma solidity >=0.8.7 <=0.8.17;

import "../helpers/ArrayOperations.sol";
import "../helpers/GradeOperations.sol";
import "../helpers/NumberOperations.sol";
import "../datatypes/CourseDataTypes.sol";
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
        performanceDataManager().setOrOverrideGrade(
            studentUId,
            courseId,
            block.timestamp,
            grade,
            feedback,
            lecturerUId,
            true
        );
    }

    // function evaluateMissedSubmissions(uint256 studentUId, uint256 courseId) private {
    //     CourseDataTypes.Assessment[] memory assessments = courseDataManager().getAssessmentsToCourseId(
    //         courseId
    //     );
    //     for (uint256 i = 0; i < assessments.length; ++i) {
    //         CourseDataTypes.Appointment[] memory appointments = courseDataManager()
    //             .getAppointmentsToAssessmentId(assessments[i].assessmentId);
    //         for (uint256 j = 0; j < appointments.length; ++j) {
    //             if (
    //                 appointments[j].content.appointmentType == CourseDataTypes.AppointmentType.SUBMISSION &&
    //                 appointments[j].content.datetime < block.timestamp
    //             ) {
    //                 performanceDataManager().setEvaluation(
    //                     studentUId,
    //                     appointments[j].appointmentId,
    //                     block.timestamp,
    //                     0,
    //                     "Automatic: No submission was handed in",
    //                     Constants.NON_ID
    //                 );
    //             }
    //         }
    //     }
    // }

    // function evaluateNotAttendedExams(uint256 studentUId, uint256 courseId) private {
    //     CourseDataTypes.Assessment[] memory assessments = courseDataManager().getAssessmentsToCourseId(
    //         courseId
    //     );
    //     for (uint256 i = 0; i < assessments.length; ++i) {
    //         CourseDataTypes.Appointment[] memory appointments = courseDataManager()
    //             .getAppointmentsToAssessmentId(assessments[i].assessmentId);
    //         for (uint256 j = 0; j < appointments.length; ++j) {
    //             if (
    //                 appointments[j].content.appointmentType == CourseDataTypes.AppointmentType.SUBMISSION &&
    //                 appointments[j].content.datetime < block.timestamp
    //             ) {
    //                 performanceDataManager().setEvaluation(
    //                     studentUId,
    //                     appointments[j].appointmentId,
    //                     block.timestamp,
    //                     0,
    //                     "Automatic: No submission was handed in",
    //                     Constants.NON_ID
    //                 );
    //             }
    //         }
    //     }
    // }

    // PRIVATE FUNCTIONS

    /**
     * @notice Tries to calculate and set the grade. If grade is already set (e.g. the lecturer has set it) or
     * the student doesn't have all assessments completed yet, no actions are taken.
     * If the student has submission deadlines when no document was handed in, those submission will be automatically
     * evaluated with zero points.
     */
    function setCalculatedGradeIfPossible(uint256 uId, uint256 courseId) private {
        if (performanceDataManager().isGradeSet(uId, courseId)) {
            return;
        }

        CourseDataTypes.Assessment[] memory assessments = courseDataManager().getAssessmentsToCourseId(
            courseId
        );
        PerformanceDataTypes.Evaluation[]
            memory evaluationsToCountPerAssessment = new PerformanceDataTypes.Evaluation[](
                assessments.length
            );
        for (uint256 i = 0; i < assessments.length; ++i) {
            CourseDataTypes.Appointment[] memory appointments = courseDataManager()
                .getAppointmentsToAssessmentId(assessments[i].assessmentId);
            CourseDataTypes.EvaluationToCountType evalToCountType = courseDataManager()
                .getEvaluationToCountType(assessments[i].assessmentId);
            for (uint256 j = 0; j < appointments.length; ++j) {
                if (
                    appointments[j].content.appointmentType == CourseDataTypes.AppointmentType.SUBMISSION &&
                    appointments[j].content.datetime < block.timestamp
                ) {
                    performanceDataManager().setEvaluation(
                        uId,
                        appointments[j].appointmentId,
                        block.timestamp,
                        0,
                        "Automatic: No submission was handed in",
                        Constants.NON_ID
                    );
                }
                // finds the only evaluation to each assessment that should be counted in the grading
                if (performanceDataManager().isEvaluationSet(uId, appointments[j].appointmentId)) {
                    PerformanceDataTypes.Evaluation memory evaluation = performanceDataManager()
                        .getEvaluation(uId, appointments[j].appointmentId);
                    if (
                        evalToCountType == CourseDataTypes.EvaluationToCountType.LATEST_RESULT ||
                        (evalToCountType == CourseDataTypes.EvaluationToCountType.BEST_RESULT &&
                            evaluation.achievedPoints > evaluationsToCountPerAssessment[i].achievedPoints)
                    ) {
                        evaluationsToCountPerAssessment[i] = evaluation;
                    }
                }
            }
        }
        // 1. set missing submission's evaluation to zero points
        // 2. collect all evaluations
        // 3. calculate grade from evaluations
        uint256 totalMaxPoints;
        uint256 achievedPoints;
        for (uint256 i = 0; i < evaluationsToCountPerAssessment.length; ++i) {
            PerformanceDataTypes.Evaluation memory evaluation = evaluationsToCountPerAssessment[i];
            if (evaluation.isSet == false) {
                return; // not all assessments were evaluated yet
            }
            CourseDataTypes.Assessment memory assessment = assessments[i];
            if (evaluation.achievedPoints < assessment.content.minPoints) {
                performanceDataManager().setGrade(
                    uId,
                    courseId,
                    block.timestamp,
                    Constants.WORST_GRADE,
                    "Automatic: At least one of the assessments did not reach the minimum points",
                    Constants.NON_ID,
                    false
                );
                return;
            }
            totalMaxPoints += assessment.content.maxPoints;
            achievedPoints += evaluation.achievedPoints;
        }
        uint256 achievedPercentage = NumberOperations.divideWithPrecisionAndRounding(
            achievedPoints,
            totalMaxPoints
        );
        CourseDataTypes.GradeLevel[] memory gradeLevels = courseDataManager().getGradeLevels(courseId);
        uint256 bestAchievedGrade = Constants.WORST_GRADE;
        for (uint256 i = 0; i < gradeLevels.length; ++i) {
            if (
                achievedPercentage >= gradeLevels[i].minPercentage &&
                GradeOperations.isFirstBetterGrade(gradeLevels[i].grade, bestAchievedGrade)
            ) {
                bestAchievedGrade = gradeLevels[i].grade;
            }
        }
        performanceDataManager().setGrade(
            uId,
            courseId,
            block.timestamp,
            bestAchievedGrade,
            "",
            Constants.NON_ID,
            false
        );
    }
}
