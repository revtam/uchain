pragma solidity >=0.8.7 <=0.8.17;

import "../../../datatypes/PerformanceDataTypes.sol";
import "../Storage.sol";

abstract contract EvaluationStorage is Storage {
    mapping(uint256 => mapping(uint256 => PerformanceDataTypes.Evaluation)) evaluationByAssessmentIdByUId;

    function storeEvaluation(
        uint256 uId,
        uint256 assessmentId,
        PerformanceDataTypes.Evaluation calldata evaluation
    ) external onlyWhitelisted {
        Validator.requireIdValid(uId, "uID");
        Validator.requireIdValid(assessmentId, "Assessment ID");
        Validator.requireValueNotSet(evaluationByAssessmentIdByUId[uId][assessmentId].isSet, "Evaluation");

        evaluationByAssessmentIdByUId[uId][assessmentId] = evaluation;
    }

    function getEvaluation(uint256 uId, uint256 assessmentId)
        external
        view
        onlyWhitelisted
        returns (PerformanceDataTypes.Evaluation memory)
    {
        Validator.requireValueSet(evaluationByAssessmentIdByUId[uId][assessmentId].isSet, "Evaluation");

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
