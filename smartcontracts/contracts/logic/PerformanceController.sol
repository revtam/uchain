pragma solidity >=0.8.7 <=0.8.17;

import "./Controller.sol";
import "../helpers/ArrayOperations.sol";
import "../helpers/GradeOperations.sol";
import "../helpers/NumberOperations.sol";
import "../datatypes/CourseDataTypes.sol";
import "./helpers/ControllerCommonChecks.sol";

contract PerformanceController is Controller {
    constructor(
        address userDataManagerAddress,
        address courseDataManagerAddress,
        address assessmentDataManagerAddress,
        address performanceDataManagerAddress
    ) Controller(userDataManagerAddress) {
        setUserDataManager(userDataManagerAddress);
        setPerformanceDataManager(performanceDataManagerAddress);
        setCourseDataManager(courseDataManagerAddress);
        setAssessmentDataManager(assessmentDataManagerAddress);
    }

    /**
     * @notice If a submission of the sender for the given assessment already exists, it will be overriden.
     */
    function addSubmission(uint256 assessmentId, string calldata documentHash) external onlyStudent {
        // validation
        uint256 studentUId = userDataManager.getUIdToAddress(msg.sender);
        uint256 courseId = assessmentDataManager.getCourseIdToAssessmentId(assessmentId);
        uint256 deadline = assessmentDataManager.getAssessmentTime(assessmentId);
        ControllerCommonChecks.requireStudentRegisteredToCourse(studentUId, courseId, courseDataManager);
        requireStudentRegisteredToAssessment(studentUId, assessmentId);
        require(
            assessmentDataManager.getAssessmentType(assessmentId) ==
                CourseDataTypes.AssessmentType.SUBMISSION,
            "This assessment was not a submission"
        );
        require(block.timestamp <= deadline, "Submission is not possible after the deadline");

        // action
        performanceDataManager.setSubmission(studentUId, assessmentId, block.timestamp, documentHash);

        updatePerformance(studentUId, courseId);
    }

    /**
     * @notice If an evaluation of the student for the given assessment already exists, it reverts.
     */
    function giveEvaluation(
        uint256 studentUId,
        uint256 assessmentId,
        uint256 achievedPoints,
        string calldata feedback
    ) external onlyLecturer {
        // validation
        uint256 lecturerUId = userDataManager.getUIdToAddress(msg.sender);
        uint256 courseId = assessmentDataManager.getCourseIdToAssessmentId(assessmentId);
        ControllerCommonChecks.requireLecturerLecturingAtCourse(lecturerUId, courseId, courseDataManager);
        ControllerCommonChecks.requireStudentRegisteredToCourse(studentUId, courseId, courseDataManager);
        requireStudentRegisteredToAssessment(studentUId, assessmentId);

        // action
        performanceDataManager.setEvaluation(
            studentUId,
            assessmentId,
            block.timestamp,
            achievedPoints,
            feedback,
            lecturerUId
        );

        updatePerformance(studentUId, courseId);
    }

    /**
     * @notice If an attendance of the student for the given assessment was already administered, it reverts.
     */
    function administerExamAttendance(
        uint256 studentUId,
        uint256 assessmentId,
        bool hasAttended
    ) external onlyLecturer {
        // validation
        uint256 lecturerUId = userDataManager.getUIdToAddress(msg.sender);
        uint256 courseId = assessmentDataManager.getCourseIdToAssessmentId(assessmentId);
        ControllerCommonChecks.requireLecturerLecturingAtCourse(lecturerUId, courseId, courseDataManager);
        ControllerCommonChecks.requireStudentRegisteredToCourse(studentUId, courseId, courseDataManager);
        require(
            assessmentDataManager.getAssessmentType(assessmentId) == CourseDataTypes.AssessmentType.EXAM,
            "This assessment was not an exam"
        );
        requireStudentRegisteredToAssessment(studentUId, assessmentId);
        require(
            !performanceDataManager.isAttendanceSet(studentUId, assessmentId),
            "This student's exam attendance was confirmed already"
        );

        // action
        performanceDataManager.setExamAttendance(studentUId, assessmentId, hasAttended, block.timestamp);

        updatePerformance(studentUId, courseId);
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
        uint256 lecturerUId = userDataManager.getUIdToAddress(msg.sender);
        ControllerCommonChecks.requireLecturerLecturingAtCourse(lecturerUId, courseId, courseDataManager);
        ControllerCommonChecks.requireStudentRegisteredToCourse(studentUId, courseId, courseDataManager);

        // action
        performanceDataManager.setOrOverrideGrade(
            studentUId,
            courseId,
            block.timestamp,
            grade,
            feedback,
            lecturerUId,
            true
        );
    }

    // SPECIAL PUBLIC VIEW FUNCTIONS

    /**
     * @notice see at function `_calculatePoints`
     */
    function calculatePoints(uint256 courseId) external view onlyStudent returns (uint256, uint256) {
        // validation
        uint256 studentUId = userDataManager.getUIdToAddress(msg.sender);
        ControllerCommonChecks.requireStudentRegisteredToCourse(studentUId, courseId, courseDataManager);

        return _calculatePoints(studentUId, courseId);
    }

    /**
     * @notice see at function `_calculatePoints`
     */
    function calculatePointsOfStudent(uint256 studentUId, uint256 courseId)
        external
        view
        onlyLecturer
        returns (uint256, uint256)
    {
        // validation
        uint256 lecturerUId = userDataManager.getUIdToAddress(msg.sender);
        ControllerCommonChecks.requireLecturerLecturingAtCourse(lecturerUId, courseId, courseDataManager);
        ControllerCommonChecks.requireStudentRegisteredToCourse(studentUId, courseId, courseDataManager);

        return _calculatePoints(studentUId, courseId);
    }

    /**
     * @notice see at function `_isMinPointsAchieved`
     */
    function isMinPointsAchieved(uint256 courseId) external view onlyStudent returns (bool) {
        uint256 studentUId = userDataManager.getUIdToAddress(msg.sender);

        return _isMinPointsAchieved(studentUId, courseId);
    }

    /**
     * @notice see at function `_isMinPointsAchieved`
     */
    function isMinPointsAchievedOfStudent(uint256 studentUId, uint256 courseId)
        external
        view
        onlyLecturer
        returns (bool)
    {
        // validation
        uint256 lecturerUId = userDataManager.getUIdToAddress(msg.sender);
        ControllerCommonChecks.requireLecturerLecturingAtCourse(lecturerUId, courseId, courseDataManager);

        return _isMinPointsAchieved(studentUId, courseId);
    }

    // PRIVATE FUNCTIONS

    function updatePerformance(uint256 studentUId, uint256 courseId) private {
        evaluateMissedSubmissions(studentUId, courseId);
        evaluateNotAttendedExams(studentUId, courseId);
        setCalculatedGradeIfPossible(studentUId, courseId);
    }

    /**
     * @notice Gives an evaluation of 0 points for the specified student's missed submissions at the given course.
     * A submission is counted as missed if no evaluation is registered for the submission and
     * the submission deadline had passed at the time of this function's call and
     * no submission has been provided at all or a submission was uploaded but only after the deadline.
     */
    function evaluateMissedSubmissions(uint256 studentUId, uint256 courseId) private {
        uint256[] memory assessmentIds = assessmentDataManager.getAssessmentIdsToCourseId(courseId);
        for (uint256 i = 0; i < assessmentIds.length; ++i) {
            if (
                assessmentDataManager.getAssessmentType(assessmentIds[i]) !=
                CourseDataTypes.AssessmentType.SUBMISSION
            ) {
                continue;
            }
            uint256 assessmentDeadline = assessmentDataManager.getAssessmentTime(assessmentIds[i]);
            if (
                performanceDataManager.isEvaluationSet(studentUId, assessmentIds[i]) ||
                block.timestamp <= assessmentDeadline
            ) {
                continue;
            }
            // submission not set or missed deadline
            if (
                !performanceDataManager.isSubmissionSet(studentUId, assessmentIds[i]) ||
                performanceDataManager.getSubmissionDeadline(studentUId, assessmentIds[i]) >
                assessmentDeadline
            ) {
                performanceDataManager.setEvaluation(
                    studentUId,
                    assessmentIds[i],
                    block.timestamp,
                    0,
                    "Automatic: No submission was handed in",
                    Constants.NON_ID
                );
            }
        }
    }

    /**
     * @notice Gives an evaluation of 0 points for the specified student's not attended exams at the given course.
     * An exam is counted as not attended, if the missed exam attendance had been explicitly registered and no
     * evaluation had been stored for the exam.
     */
    function evaluateNotAttendedExams(uint256 studentUId, uint256 courseId) private {
        uint256[] memory assessmentIds = assessmentDataManager.getAssessmentIdsToCourseId(courseId);
        for (uint256 i = 0; i < assessmentIds.length; ++i) {
            if (
                assessmentDataManager.getAssessmentType(assessmentIds[i]) !=
                CourseDataTypes.AssessmentType.EXAM
            ) {
                continue;
            }
            if (performanceDataManager.isEvaluationSet(studentUId, assessmentIds[i])) {
                continue;
            }
            if (
                performanceDataManager.isAttendanceSet(studentUId, assessmentIds[i]) &&
                performanceDataManager.getAttendanceValue(studentUId, assessmentIds[i]) == false
            ) {
                performanceDataManager.setEvaluation(
                    studentUId,
                    assessmentIds[i],
                    block.timestamp,
                    0,
                    "Automatic: Exam was not attended",
                    Constants.NON_ID
                );
            }
        }
    }

    /**
     * @notice Calculates and sets the grade. If the final grade is already set (the lecturer has set it) or
     * the student doesn't have all necessary assessments completed yet, no actions are taken.
     * If the course is a VO, an no evaluation is at hand, no grade is given.
     * If the course is not a VO and not all assessments have been evaluated yet, no grade is given.
     * If the minimum points are not achieved at one of the assessments, a negative grade is given.
     * Otherwise the achieved percentage is calculated and the best reached grade will be set.
     */
    function setCalculatedGradeIfPossible(uint256 studentUId, uint256 courseId) private {
        if (performanceDataManager.isFinalGradeSet(studentUId, courseId)) {
            return;
        }
        uint256[] memory assessmentIdsToCalulateFrom = getAssessmentIdsForCalculation(studentUId, courseId);
        if (courseDataManager.getCourseType(courseId) == CourseDataTypes.CourseType.VO) {
            if (assessmentIdsToCalulateFrom.length == 0) {
                return;
            }
        } else {
            if (
                assessmentIdsToCalulateFrom.length <
                assessmentDataManager.getAssessmentsToCourseId(courseId).length
            ) {
                return;
            }
        }

        for (uint256 i = 0; i < assessmentIdsToCalulateFrom.length; ++i) {
            if (!_isMinPointsAchieved(studentUId, assessmentIdsToCalulateFrom[i])) {
                performanceDataManager.setGrade(
                    studentUId,
                    courseId,
                    block.timestamp,
                    Constants.WORST_GRADE,
                    "Automatic: At least one of the assessments did not reach the minimum points",
                    Constants.NON_ID,
                    false
                );
                return;
            }
        }

        (uint256 totalAchievedPoints, uint256 totalMaxPoints) = _calculatePoints(studentUId, courseId);
        uint256 achievedPercentage = NumberOperations.divideWithPrecisionAndRounding(
            totalAchievedPoints,
            totalMaxPoints
        );
        CourseDataTypes.GradeLevel[] memory gradeLevels = courseDataManager.getGradeLevels(courseId);
        uint256 bestAchievedGrade = Constants.WORST_GRADE;
        for (uint256 i = 0; i < gradeLevels.length; ++i) {
            if (
                achievedPercentage >= gradeLevels[i].minPercentage &&
                GradeOperations.isFirstBetterGrade(gradeLevels[i].grade, bestAchievedGrade)
            ) {
                bestAchievedGrade = gradeLevels[i].grade;
            }
        }
        performanceDataManager.setGrade(
            studentUId,
            courseId,
            block.timestamp,
            bestAchievedGrade,
            "",
            Constants.NON_ID,
            false
        );
    }

    /**
     * @return (totalAchievedPoints, totalMaxPoints); If course is a VO, calculates only the points of the latest
     * evaluated assessment, otherwise calculates the points of all evaluated assessments. If no appropriate
     * evaluation is found, returns (0, 0).
     */
    function _calculatePoints(uint256 studentUId, uint256 courseId) private view returns (uint256, uint256) {
        uint256 totalMaxPoints;
        uint256 totalAchievedPoints;
        uint256[] memory assessmentIdsToCalculateFrom = getAssessmentIdsForCalculation(studentUId, courseId);
        for (uint256 i = 0; i < assessmentIdsToCalculateFrom.length; ++i) {
            totalMaxPoints += assessmentDataManager.getAssessmentMaxPoints(assessmentIdsToCalculateFrom[i]);
            totalAchievedPoints += performanceDataManager.getAchievedPoints(
                studentUId,
                assessmentIdsToCalculateFrom[i]
            );
        }
        return (totalAchievedPoints, totalMaxPoints);
    }

    function _isMinPointsAchieved(uint256 studentUId, uint256 assessmentId) private view returns (bool) {
        // validation
        uint256 courseId = assessmentDataManager.getCourseIdToAssessmentId(assessmentId);
        ControllerCommonChecks.requireStudentRegisteredToCourse(studentUId, courseId, courseDataManager);

        return
            performanceDataManager.getAchievedPoints(studentUId, assessmentId) >=
            assessmentDataManager.getAssessmentMinPoints(assessmentId);
    }

    /**
     * @return If course is a VO, returns only the latest evaluated assessment if it exists, otherwise returns
     * an empty array. If course is not a VO, returns all evaluated assessments.
     */
    function getAssessmentIdsForCalculation(uint256 studentUId, uint256 courseId)
        private
        view
        returns (uint256[] memory)
    {
        if (courseDataManager.getCourseType(courseId) == CourseDataTypes.CourseType.VO) {
            (bool isExisting, uint256 latestEvaluatedAssessmentId) = getLatestEvaluatedAssessmentId(
                studentUId,
                courseId
            );
            if (isExisting) {
                return ArrayOperations.addElementToUintArray(new uint256[](0), latestEvaluatedAssessmentId);
            }
            return new uint256[](0);
        }
        return getEvaluatedAssessmentIds(studentUId, courseId);
    }

    function getEvaluatedAssessmentIds(uint256 studentUId, uint256 courseId)
        private
        view
        returns (uint256[] memory)
    {
        uint256[] memory assessmentIds = assessmentDataManager.getAssessmentIdsToCourseId(courseId);
        uint256[] memory evaluatedAssessmentIds;
        for (uint256 i = 0; i < assessmentIds.length; ++i) {
            if (!performanceDataManager.isEvaluationSet(studentUId, assessmentIds[i])) {
                continue;
            }
            evaluatedAssessmentIds = ArrayOperations.addElementToUintArray(
                evaluatedAssessmentIds,
                assessmentIds[i]
            );
        }
        return evaluatedAssessmentIds;
    }

    /**
     * @return True + assessmentID if assessment is found, else false + 0;
     */
    function getLatestEvaluatedAssessmentId(uint256 studentUId, uint256 courseId)
        private
        view
        returns (bool, uint256)
    {
        uint256[] memory evaluatedAssessmentIds = getEvaluatedAssessmentIds(studentUId, courseId);
        uint256 latestAssessmentId;
        if (evaluatedAssessmentIds.length < 1) {
            return (false, latestAssessmentId);
        }
        latestAssessmentId = evaluatedAssessmentIds[0];
        for (uint256 i = 0; i < evaluatedAssessmentIds.length; ++i) {
            if (
                assessmentDataManager.getAssessmentTime(evaluatedAssessmentIds[i]) >
                assessmentDataManager.getAssessmentTime(latestAssessmentId)
            ) {
                latestAssessmentId = evaluatedAssessmentIds[i];
            }
        }
        return (true, latestAssessmentId);
    }

    function requireStudentRegisteredToAssessment(uint256 studentUId, uint256 assessmentId) private view {
        if (assessmentDataManager.isAssessmentRegistrationRequired(assessmentId)) {
            require(
                ControllerCommonChecks.isStudentRegisteredToAssessment(
                    studentUId,
                    assessmentId,
                    assessmentDataManager
                ),
                "Student did not register to this asessment"
            );
        }
    }
}
