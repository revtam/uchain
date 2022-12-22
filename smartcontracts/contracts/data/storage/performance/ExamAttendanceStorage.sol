pragma solidity >=0.8.7 <=0.8.17;

import "../../../helpers/AccessControl.sol";
import "../../../datatypes/PerformanceDataTypes.sol";
import "../validator/Validator.sol";

abstract contract ExamAttendanceStorage is AccessControl, Validator {
    mapping(uint256 => mapping(uint256 => PerformanceDataTypes.ExamAttendance)) attendanceByAppoinmentIdByUId;

    function storeExamAttendance(
        uint256 uId,
        uint256 appointmentId,
        PerformanceDataTypes.ExamAttendance calldata examAttendance
    )
        external
        onlyWhitelisted
        onlyIfIdValid(uId, "uID")
        onlyIfIdValid(appointmentId, "Appointment ID")
        onlyIfValueNotSet(attendanceByAppoinmentIdByUId[uId][appointmentId].isSet, "Exam attendance")
    {
        attendanceByAppoinmentIdByUId[uId][appointmentId] = examAttendance;
    }

    function getExamAttendance(uint256 uId, uint256 appointmentId)
        external
        view
        onlyWhitelisted
        onlyIfValueSet(attendanceByAppoinmentIdByUId[uId][appointmentId].isSet, "Exam attendance")
        returns (PerformanceDataTypes.ExamAttendance memory)
    {
        return attendanceByAppoinmentIdByUId[uId][appointmentId];
    }

    /**
     * @return If returned tuple[0] is true, the exam attendance at tuple[1] is set.
     */
    function getExamAttendanceIfSet(uint256 uId, uint256 appointmentId)
        external
        view
        onlyWhitelisted
        returns (bool, PerformanceDataTypes.ExamAttendance memory)
    {
        PerformanceDataTypes.ExamAttendance memory attendance = attendanceByAppoinmentIdByUId[uId][
            appointmentId
        ];
        if (attendance.isSet == true) {
            return (true, attendance);
        }
        return (false, attendance);
    }
}
