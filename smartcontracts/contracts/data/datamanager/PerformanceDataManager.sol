pragma solidity >=0.8.7 <=0.8.17;

import "../../accesscontrol/AccessController.sol";
import "../storage/performance/PerformanceStorage.sol";
import "../storage/performance/GradeStorage.sol";
import "../../datatypes/Constants.sol";
import "../../datatypes/UserDataTypes.sol";
import "../../datatypes/PerformanceDataTypes.sol";
import "./helpers/DataManagerCommonChecks.sol";

contract PerformanceDataManager is AccessController {
    PerformanceStorage performanceStorage;
    GradeStorage gradeStorage;

    constructor(
        address performanceStorageAddress,
        address gradeStorageAddress,
        address accessWhitelistAddress
    ) AccessController(accessWhitelistAddress) {
        performanceStorage = PerformanceStorage(performanceStorageAddress);
        gradeStorage = GradeStorage(gradeStorageAddress);
    }

    // WRITE FUNCTIONS

    function setOrOverrideSubmission(
        uint256 uId,
        uint256 assessmentId,
        uint256 timestamp,
        string[] calldata documentHashes
    ) external onlyWhitelisted {
        require(documentHashes.length > 0, "Document hashes list cannot be empty");
        for (uint256 i = 0; i < documentHashes.length; ++i) {
            DataManagerCommonChecks.requireStringNotEmpty(documentHashes[i], "Document hash");
        }

        PerformanceDataTypes.Submission memory submission = PerformanceDataTypes.Submission(
            true, timestamp, documentHashes
        );
        if (isSubmissionSet(uId, assessmentId)) {
            performanceStorage.updateSubmission(uId, assessmentId, submission);
        } else {
            performanceStorage.storeSubmission(uId, assessmentId, submission);
        }
    }

    function setExamAttendance(
        uint256 uId,
        uint256 assessmentId,
        bool hasAttended,
        uint256 timestamp
    ) external onlyWhitelisted {
        performanceStorage.storeExamAttendance(
            uId,
            assessmentId,
            PerformanceDataTypes.ExamAttendance(true, hasAttended, timestamp)
        );
    }

    function setOrOverrideEvaluation(
        uint256 uId,
        uint256 assessmentId,
        uint256 timestamp,
        uint256 achievedPoints,
        string calldata feedback,
        uint256 lecturerUId
    ) external onlyWhitelisted {
        PerformanceDataTypes.Evaluation memory evaluation = PerformanceDataTypes.Evaluation(
            true, 
            timestamp, 
            achievedPoints, 
            feedback, 
            lecturerUId
        );
        if (isEvaluationSet(uId, assessmentId)) {
            performanceStorage.updateEvaluation(uId, assessmentId, evaluation);
        } else {
            performanceStorage.storeEvaluation(uId, assessmentId, evaluation);
        }
    }

    function setEvaluation(
        uint256 uId,
        uint256 assessmentId,
        uint256 timestamp,
        uint256 achievedPoints,
        string calldata feedback,
        uint256 lecturerUId
    ) external onlyWhitelisted {
        performanceStorage.storeEvaluation(
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
        bool isAutomatic
    ) external onlyWhitelisted {
        PerformanceDataTypes.Grade memory _grade = PerformanceDataTypes.Grade(
            true,
            grade,
            feedback,
            timestamp,
            lecturerUId,
            isAutomatic
        );
        if (isGradeSet(uId, courseId)) {
            gradeStorage.updateGrade(uId, courseId, _grade);
        } else {
            gradeStorage.storeGrade(uId, courseId, _grade);
        }
    }

    // READ FUNCTIONS

    function isGradeSet(uint256 uId, uint256 courseId) public view onlyWhitelisted returns (bool) {
        (bool isGradeExisting, ) = gradeStorage.getGradeIfSet(uId, courseId);
        return isGradeExisting;
    }

    function isFinalGradeSet(uint256 uId, uint256 courseId) public view onlyWhitelisted returns (bool) {
        if (!isGradeSet(uId, courseId)) {
            return false;
        }
        return !gradeStorage.getGrade(uId, courseId).isAutomatic;
    }

    function isSubmissionSet(uint256 uId, uint256 assessmentId) public view onlyWhitelisted returns (bool) {
        (bool isSubmissionExisting, ) = performanceStorage.getSubmissionIfSet(uId, assessmentId);
        return isSubmissionExisting;
    }

    function isAttendanceSet(uint256 uId, uint256 assessmentId) external view onlyWhitelisted returns (bool) {
        (bool isAttendanceExisting, ) = performanceStorage.getExamAttendanceIfSet(uId, assessmentId);
        return isAttendanceExisting;
    }

    function isEvaluationSet(uint256 uId, uint256 assessmentId) public view onlyWhitelisted returns (bool) {
        (bool isEvaluationExisting, ) = performanceStorage.getEvaluationIfSet(uId, assessmentId);
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
        if (!isEvaluationSet(uId, assessmentId)) {
            return 0;
        }
        return performanceStorage.getEvaluation(uId, assessmentId).achievedPoints;
    }

    function getSubmissionDeadline(uint256 uId, uint256 assessmentId)
        external
        view
        onlyWhitelisted
        returns (uint256)
    {
        return performanceStorage.getSubmission(uId, assessmentId).submissionDatetime;
    }

    function getAttendanceValue(uint256 uId, uint256 assessmentId)
        external
        view
        onlyWhitelisted
        returns (bool)
    {
        return performanceStorage.getExamAttendance(uId, assessmentId).hasAttended;
    }

    function getExamAttendance(uint256 uId, uint256 assessmentId)
        external
        view
        onlyWhitelisted
        returns (PerformanceDataTypes.ExamAttendance memory)
    {
        return performanceStorage.getExamAttendance(uId, assessmentId);
    }

    function getSubmission(uint256 uId, uint256 assessmentId)
        external
        view
        onlyWhitelisted
        returns (PerformanceDataTypes.Submission memory)
    {
        return performanceStorage.getSubmission(uId, assessmentId);
    }

    function getEvaluation(uint256 uId, uint256 assessmentId)
        external
        view
        onlyWhitelisted
        returns (PerformanceDataTypes.Evaluation memory)
    {
        return performanceStorage.getEvaluation(uId, assessmentId);
    }

    function getGrade(uint256 uId, uint256 courseId)
        external
        view
        onlyWhitelisted
        returns (PerformanceDataTypes.Grade memory)
    {
        return gradeStorage.getGrade(uId, courseId);
    }

    function getGraderUId(uint256 uId, uint256 courseId) external view onlyWhitelisted returns (uint256) {
        return gradeStorage.getGrade(uId, courseId).lecturerUId;
    }

    function getEvaluatorUId(uint256 uId, uint256 assessmentId)
        external
        view
        onlyWhitelisted
        returns (uint256)
    {
        return performanceStorage.getEvaluation(uId, assessmentId).lecturerUId;
    }
}
