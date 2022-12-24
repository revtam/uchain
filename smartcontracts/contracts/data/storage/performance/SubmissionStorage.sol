pragma solidity >=0.8.7 <=0.8.17;

import "../../../helpers/AccessControl.sol";
import "../../../datatypes/PerformanceDataTypes.sol";
import "../validator/Validator.sol";

abstract contract SubmissionStorage is AccessControl, Validator {
    mapping(uint256 => mapping(uint256 => PerformanceDataTypes.Submission)) submissionByAssessmentIdByUId;

    function storeSubmission(
        uint256 uId,
        uint256 assessmentId,
        PerformanceDataTypes.Submission calldata submission
    )
        external
        onlyWhitelisted
        onlyIfIdValid(uId, "uID")
        onlyIfIdValid(assessmentId, "Assessment ID")
        onlyIfValueNotSet(submissionByAssessmentIdByUId[uId][assessmentId].isSet, "Submission")
    {
        submissionByAssessmentIdByUId[uId][assessmentId] = submission;
    }

    function getSubmission(uint256 uId, uint256 assessmentId)
        external
        view
        onlyWhitelisted
        onlyIfValueSet(submissionByAssessmentIdByUId[uId][assessmentId].isSet, "Submission")
        returns (PerformanceDataTypes.Submission memory)
    {
        return submissionByAssessmentIdByUId[uId][assessmentId];
    }

    /**
     * @return If returned tuple[0] is true, the submission at tuple[1] is set.
     */
    function getSubmissionIfSet(uint256 uId, uint256 assessmentId)
        external
        view
        onlyWhitelisted
        returns (bool, PerformanceDataTypes.Submission memory)
    {
        PerformanceDataTypes.Submission memory submission = submissionByAssessmentIdByUId[uId][assessmentId];
        if (submission.isSet) {
            return (true, submission);
        }
        return (false, submission);
    }
}
