pragma solidity >=0.8.7 <=0.8.17;

import "../../../helpers/AccessControl.sol";
import "../../../datatypes/PerformanceDataTypes.sol";
import "../validator/Validator.sol";

abstract contract SubmissionStorage is AccessControl, Validator {
    mapping(uint256 => mapping(uint256 => PerformanceDataTypes.Submission)) submissionByAppoinmentIdByUId;

    function storeSubmission(
        uint256 uId,
        uint256 appointmentId,
        PerformanceDataTypes.Submission calldata submission
    )
        external
        onlyWhitelisted
        onlyIfIdValid(uId, "uID")
        onlyIfIdValid(appointmentId, "Appointment ID")
        onlyIfValueNotSet(submissionByAppoinmentIdByUId[uId][appointmentId].isSet, "Submission")
    {
        submissionByAppoinmentIdByUId[uId][appointmentId] = submission;
    }

    function getSubmission(uint256 uId, uint256 appointmentId)
        external
        view
        onlyWhitelisted
        onlyIfValueSet(submissionByAppoinmentIdByUId[uId][appointmentId].isSet, "Submission")
        returns (PerformanceDataTypes.Submission memory)
    {
        return submissionByAppoinmentIdByUId[uId][appointmentId];
    }
}
