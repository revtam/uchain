pragma solidity >=0.8.7 <=0.8.17;

import "../../../helpers/AccessControl.sol";
import "../../../datatypes/PerformanceDataTypes.sol";
import "../validator/Validator.sol";

abstract contract EvaluationStorage is AccessControl, Validator {
    mapping(uint256 => mapping(uint256 => PerformanceDataTypes.Evaluation)) evaluationByAssessmentIdByUId;

    function storeEvaluation(
        uint256 uId,
        uint256 assessmentId,
        PerformanceDataTypes.Evaluation calldata evaluation
    )
        external
        onlyWhitelisted
        onlyIfIdValid(uId, "uID")
        onlyIfIdValid(assessmentId, "Assessment ID")
        onlyIfValueNotSet(evaluationByAssessmentIdByUId[uId][assessmentId].isSet, "Evaluation")
    {
        evaluationByAssessmentIdByUId[uId][assessmentId] = evaluation;
    }

    function getEvaluation(uint256 uId, uint256 assessmentId)
        external
        view
        onlyWhitelisted
        onlyIfValueSet(evaluationByAssessmentIdByUId[uId][assessmentId].isSet, "Evaluation")
        returns (PerformanceDataTypes.Evaluation memory)
    {
        return evaluationByAssessmentIdByUId[uId][assessmentId];
    }

    /**
     * @return If returned tuple[0] is true, the evaluation at tuple[1] is set.
     */
    function getEvaluationIfSet(uint256 uId, uint256 assessmentId)
        external
        view
        onlyWhitelisted
        returns (bool, PerformanceDataTypes.Evaluation memory)
    {
        PerformanceDataTypes.Evaluation memory evaluation = evaluationByAssessmentIdByUId[uId][assessmentId];
        if (evaluation.isSet) {
            return (true, evaluation);
        }
        return (false, evaluation);
    }
}
