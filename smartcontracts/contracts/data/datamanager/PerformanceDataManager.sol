pragma solidity >=0.8.7 <=0.8.17;

import "./DataManager.sol";
import "../../datatypes/Constants.sol";
import "../../datatypes/UserDataTypes.sol";
import "../../datatypes/PerformanceDataTypes.sol";

contract PerformanceDataManager is DataManager {
    constructor(address addressBookAddress) DataManager(addressBookAddress) {}

    // WRITE FUNCTIONS

    function setSubmission(
        uint256 uId,
        uint256 assessmentId,
        uint256 timestamp,
        string calldata documentHash
    ) external onlyWhitelisted {
        requireStringNotEmpty(documentHash, "Document hash");

        performanceStorage().storeSubmission(
            uId,
            assessmentId,
            PerformanceDataTypes.Submission(true, timestamp, documentHash)
        );
    }

    function setExamAttendance(
        uint256 uId,
        uint256 assessmentId,
        bool hasAttended,
        uint256 timestamp
    ) external onlyWhitelisted {
        performanceStorage().storeExamAttendance(
            uId,
            assessmentId,
            PerformanceDataTypes.ExamAttendance(true, hasAttended, timestamp)
        );
    }

    function setEvaluation(
        uint256 uId,
        uint256 assessmentId,
        uint256 timestamp,
        uint256 achievedPoints,
        string calldata feedback,
        uint256 lecturerUId
    ) external onlyWhitelisted {
        performanceStorage().storeEvaluation(
            uId,
            assessmentId,
            PerformanceDataTypes.Evaluation(true, timestamp, achievedPoints, feedback, lecturerUId)
        );
    }

    function setOrOverrideGrade(
        uint256 uId,
        uint256 courseId,
        uint256 timestamp,
        uint256 grade,
        string calldata feedback,
        uint256 lecturerUId,
        bool isFinal
    ) external onlyWhitelisted {
        PerformanceDataTypes.Grade memory _grade = PerformanceDataTypes.Grade(
            true,
            grade,
            feedback,
            timestamp,
            lecturerUId,
            isFinal
        );
        if (isGradeSet(uId, courseId) == true) {
            gradeStorage().updateGrade(uId, courseId, _grade);
        } else {
            gradeStorage().storeGrade(uId, courseId, _grade);
        }
    }

    function setGrade(
        uint256 uId,
        uint256 courseId,
        uint256 timestamp,
        uint256 grade,
        string calldata feedback,
        uint256 lecturerUId,
        bool isFinal
    ) external onlyWhitelisted {
        gradeStorage().storeGrade(
            uId,
            courseId,
            PerformanceDataTypes.Grade(true, grade, feedback, timestamp, lecturerUId, isFinal)
        );
    }

    // READ FUNCTIONS

    function isGradeSet(uint256 uId, uint256 courseId) public view onlyWhitelisted returns (bool) {
        (bool isGradeExisting, ) = gradeStorage().getGradeIfSet(uId, courseId);
        return isGradeExisting;
    }

    function isFinalGradeSet(uint256 uId, uint256 courseId) public view onlyWhitelisted returns (bool) {
        if (isGradeSet(uId, courseId) == false) {
            return false;
        }
        return gradeStorage().getGrade(uId, courseId).isFinal;
    }

    function isGradePositive(uint256 uId, uint256 courseId) external view onlyWhitelisted returns (bool) {
        return gradeStorage().getGrade(uId, courseId).grade < Constants.WORST_GRADE;
    }

    function isSubmissionSet(uint256 uId, uint256 assessmentId) external view onlyWhitelisted returns (bool) {
        (bool isSubmissionExisting, ) = performanceStorage().getSubmissionIfSet(uId, assessmentId);
        return isSubmissionExisting;
    }

    function isAttendanceSet(uint256 uId, uint256 assessmentId) external view onlyWhitelisted returns (bool) {
        (bool isAttendanceExisting, ) = performanceStorage().getExamAttendanceIfSet(uId, assessmentId);
        return isAttendanceExisting;
    }

    function isEvaluationSet(uint256 uId, uint256 assessmentId) public view onlyWhitelisted returns (bool) {
        (bool isEvaluationExisting, ) = performanceStorage().getEvaluationIfSet(uId, assessmentId);
        return isEvaluationExisting;
    }

    /**
     * @return Achieved points to the given assessment if the evaluation exists, or 0 if it doesn't exist.
     */
    function getAchievedPoints(uint256 uId, uint256 assessmentId)
        external
        view
        onlyWhitelisted
        returns (uint256)
    {
        if (isEvaluationSet(uId, assessmentId) == false) {
            return 0;
        }
        return performanceStorage().getEvaluation(uId, assessmentId).achievedPoints;
    }

    function getExamAttendance(uint256 uId, uint256 assessmentId)
        external
        view
        onlyWhitelisted
        returns (PerformanceDataTypes.ExamAttendance memory)
    {
        return performanceStorage().getExamAttendance(uId, assessmentId);
    }

    function getSubmission(uint256 uId, uint256 assessmentId)
        external
        view
        onlyWhitelisted
        returns (PerformanceDataTypes.Submission memory)
    {
        return performanceStorage().getSubmission(uId, assessmentId);
    }

    function getEvaluation(uint256 uId, uint256 assessmentId)
        external
        view
        onlyWhitelisted
        returns (PerformanceDataTypes.Evaluation memory)
    {
        return performanceStorage().getEvaluation(uId, assessmentId);
    }

    function getGrade(uint256 uId, uint256 courseId)
        external
        view
        onlyWhitelisted
        returns (PerformanceDataTypes.Grade memory)
    {
        return gradeStorage().getGrade(uId, courseId);
    }
}
