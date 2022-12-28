pragma solidity >=0.8.7 <=0.8.17;

import "../../../datatypes/PerformanceDataTypes.sol";
import "../Storage.sol";

abstract contract ExamAttendanceStorage is Storage {
    mapping(uint256 => mapping(uint256 => PerformanceDataTypes.ExamAttendance)) attendanceByAssessmentIdByUId;

    function storeExamAttendance(
        uint256 uId,
        uint256 assessmentId,
        PerformanceDataTypes.ExamAttendance calldata examAttendance
    ) external onlyWhitelisted {
        Validator.requireIdValid(uId, "uID");
        Validator.requireIdValid(assessmentId, "Assessment ID");
        Validator.requireValueNotSet(
            attendanceByAssessmentIdByUId[uId][assessmentId].isSet,
            "Exam attendance"
        );

        attendanceByAssessmentIdByUId[uId][assessmentId] = examAttendance;
    }

    function getExamAttendance(uint256 uId, uint256 assessmentId)
        external
        view
        onlyWhitelisted
        returns (PerformanceDataTypes.ExamAttendance memory)
    {
        Validator.requireValueSet(attendanceByAssessmentIdByUId[uId][assessmentId].isSet, "Exam attendance");

        return attendanceByAssessmentIdByUId[uId][assessmentId];
    }

    /**
     * @return If returned tuple[0] is true, the exam attendance at tuple[1] is set.
     */
    function getExamAttendanceIfSet(uint256 uId, uint256 assessmentId)
        external
        view
        onlyWhitelisted
        returns (bool, PerformanceDataTypes.ExamAttendance memory)
    {
        PerformanceDataTypes.ExamAttendance memory attendance = attendanceByAssessmentIdByUId[uId][
            assessmentId
        ];
        if (attendance.isSet) {
            return (true, attendance);
        }
        return (false, attendance);
    }
}
