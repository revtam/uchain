pragma solidity >=0.8.7 <=0.8.17;

import "../../../helpers/AccessControl.sol";
import "../../../datatypes/PerformanceDataTypes.sol";
import "../validator/Validator.sol";

abstract contract ExamAttendanceStorage is AccessControl, Validator {
    mapping(uint256 => mapping(uint256 => PerformanceDataTypes.ExamAttendance)) attendanceByAssessmentIdByUId;

    function storeExamAttendance(
        uint256 uId,
        uint256 assessmentId,
        PerformanceDataTypes.ExamAttendance calldata examAttendance
    )
        external
        onlyWhitelisted
        onlyIfIdValid(uId, "uID")
        onlyIfIdValid(assessmentId, "Assessment ID")
        onlyIfValueNotSet(attendanceByAssessmentIdByUId[uId][assessmentId].isSet, "Exam attendance")
    {
        attendanceByAssessmentIdByUId[uId][assessmentId] = examAttendance;
    }

    function getExamAttendance(uint256 uId, uint256 assessmentId)
        external
        view
        onlyWhitelisted
        onlyIfValueSet(attendanceByAssessmentIdByUId[uId][assessmentId].isSet, "Exam attendance")
        returns (PerformanceDataTypes.ExamAttendance memory)
    {
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
