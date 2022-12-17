pragma solidity >=0.8.7 <=0.8.17;

import "./DataManager.sol";
import "../../datatypes/Constants.sol";
import "../../datatypes/UserDataTypes.sol";
import "../../datatypes/PerformanceDataTypes.sol";
import "../storage/performance/PerformanceStorage.sol";
import "../storage/performance/GradeStorage.sol";

contract PerformanceDataManager is DataManager {
    constructor(address addressBookAddress) DataManager(addressBookAddress) {}

    // WRITE FUNCTIONS

    function setSubmission(
        uint256 uId,
        uint256 appointmentId,
        uint256 timestamp,
        string calldata documentHash
    ) external onlyWhitelisted {
        requireStringNotEmpty(documentHash, "Document hash");

        performanceStorage().storeSubmission(
            uId,
            appointmentId,
            PerformanceDataTypes.Submission(true, timestamp, documentHash)
        );
    }

    function setAttendanceConfirmation(
        uint256 uId,
        uint256 appointmentId,
        bool hasAttended,
        uint256 timestamp
    ) external onlyWhitelisted {
        performanceStorage().storeExamAttendance(
            uId,
            appointmentId,
            PerformanceDataTypes.ExamAttendance(true, hasAttended, timestamp)
        );
    }

    function setEvaluation(
        uint256 uId,
        uint256 appointmentId,
        uint256 timestamp,
        uint256 achievedPoints,
        string calldata feedback,
        uint256 lecturerUId
    ) external onlyWhitelisted {
        performanceStorage().storeEvaluation(
            uId,
            appointmentId,
            PerformanceDataTypes.Evaluation(true, timestamp, achievedPoints, feedback, lecturerUId)
        );
    }

    function setGrade(
        uint256 uId,
        uint256 courseId,
        uint256 timestamp,
        uint256 grade,
        bool isPositive,
        string calldata feedback,
        uint256 lecturerUId,
        bool isFinal
    ) external onlyWhitelisted {
        require(grade != Constants.NON_GRADE, "Invalid grade value");
        gradeStorage().storeGrade(
            uId,
            courseId,
            PerformanceDataTypes.Grade(true, grade, isPositive, feedback, timestamp, lecturerUId, isFinal)
        );
    }

    function updateGrade(
        uint256 uId,
        uint256 courseId,
        uint256 timestamp,
        uint256 grade,
        bool isPositive,
        string calldata feedback,
        uint256 lecturerUId,
        bool isFinal
    ) external onlyWhitelisted {
        require(grade != Constants.NON_GRADE, "Invalid grade value");
        gradeStorage().updateGrade(
            uId,
            courseId,
            PerformanceDataTypes.Grade(true, grade, isPositive, feedback, timestamp, lecturerUId, isFinal)
        );
    }

    // READ FUNCTIONS

    function isGradePositive(uint256 uId, uint256 courseId) external view onlyWhitelisted returns (bool) {
        return gradeStorage().getGrade(uId, courseId).isPositive;
    }

    function isAttendanceSet(uint256 uId, uint256 appointmentId)
        external
        view
        onlyWhitelisted
        returns (bool)
    {
        try performanceStorage().getExamAttendance(uId, appointmentId) {
            return true;
        } catch Error(string memory) {
            return false;
        }
    }

    function getExamAttendance(uint256 uId, uint256 appointmentId)
        external
        view
        onlyWhitelisted
        returns (PerformanceDataTypes.ExamAttendance memory)
    {
        return performanceStorage().getExamAttendance(uId, appointmentId);
    }

    function getSubmission(uint256 uId, uint256 appointmentId)
        external
        view
        onlyWhitelisted
        returns (PerformanceDataTypes.Submission memory)
    {
        return performanceStorage().getSubmission(uId, appointmentId);
    }

    function getEvaluation(uint256 uId, uint256 appointmentId)
        external
        view
        onlyWhitelisted
        returns (PerformanceDataTypes.Evaluation memory)
    {
        return performanceStorage().getEvaluation(uId, appointmentId);
    }

    function getGrade(uint256 uId, uint256 courseId)
        external
        view
        onlyWhitelisted
        returns (PerformanceDataTypes.Grade memory)
    {
        return gradeStorage().getGrade(uId, courseId);
    }

    // function getEvaluationWithHighestPoints(uint256 uId, uint256[] calldata appointmentIds)
    //     external
    //     view
    //     onlyWhitelisted
    //     returns (PerformanceDataTypes.Evaluation memory)
    // {
    //     PerformanceDataTypes.Evaluation memory evalWithHighestPoints = performanceStorage().getEvaluation(
    //         uId,
    //         appointmentIds[0]
    //     ); // select the first appointment's evaluation as start
    //     for (uint256 i = 1; i < appointmentIds.length; ++i) {
    //         PerformanceDataTypes.Evaluation memory compareEvaluation = performanceStorage().getEvaluation(
    //             uId,
    //             appointmentIds[i]
    //         );
    //         if (compareEvaluation.achievedPoints > evalWithHighestPoints.achievedPoints) {
    //             evalWithHighestPoints = compareEvaluation;
    //         }
    //     }
    //     return evalWithHighestPoints;
    // }

    // function getLatestEvaluation(uint256 appointmentId)
    //     external
    //     view
    //     onlyWhitelisted
    //     returns (PerformanceDataTypes.Evaluation memory)
    // {}

    // GET RELEVANT CONTRACTS

    function gradeStorage() private view returns (GradeStorage) {
        return GradeStorage(addressBook.getAddress("GradeStorage"));
    }

    function performanceStorage() private view returns (PerformanceStorage) {
        return PerformanceStorage(addressBook.getAddress("PerformanceStorage"));
    }
}
