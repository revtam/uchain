pragma solidity >=0.8.7 <=0.8.17;

import "../../../helpers/AccessControl.sol";
import "../../../datatypes/PerformanceDataTypes.sol";
import "../validator/Validator.sol";

abstract contract EvaluationStorage is AccessControl, Validator {
    mapping(uint256 => mapping(uint256 => PerformanceDataTypes.Evaluation)) evaluationByAppoinmentIdByUId;

    function storeEvaluation(
        uint256 uId,
        uint256 appointmentId,
        PerformanceDataTypes.Evaluation calldata evaluation
    )
        external
        onlyWhitelisted
        onlyIfIdValid(uId, "uID")
        onlyIfIdValid(appointmentId, "Appointment ID")
        onlyIfValueNotSet(evaluationByAppoinmentIdByUId[uId][appointmentId].isSet, "Evaluation")
    {
        evaluationByAppoinmentIdByUId[uId][appointmentId] = evaluation;
    }

    function getEvaluation(uint256 uId, uint256 appointmentId)
        external
        view
        onlyWhitelisted
        onlyIfValueSet(evaluationByAppoinmentIdByUId[uId][appointmentId].isSet, "Evaluation")
        returns (PerformanceDataTypes.Evaluation memory)
    {
        return evaluationByAppoinmentIdByUId[uId][appointmentId];
    }
}
