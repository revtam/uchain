pragma solidity >=0.8.7 <=0.8.17;

import "../../../helpers/ArrayOperations.sol";
import "../../../datatypes/CourseDataTypes.sol";
import "../Storage.sol";

abstract contract AssessmentRegistrationStorage is Storage {
    mapping(uint256 => uint256[]) registrantUIdListByAssessmentId;
    mapping(uint256 => uint256[]) assessmentIdListByRegistrantUId; // for reverse lookup

    function storeRegistrant(uint256 assessmentId, uint256 registrantUId) external onlyWhitelisted {
        // Validator.requireValueExisting(assessmentsByAssessmentId[assessmentId].assessmentId, "Assessment ID");
        Validator.requireIdValid(assessmentId, "Assessment ID");
        Validator.requireIdNotAdded(
            registrantUId,
            registrantUIdListByAssessmentId[assessmentId],
            "Registrant uID"
        );

        ArrayOperations.addUintToListInMapping(registrantUId, assessmentId, registrantUIdListByAssessmentId);
        ArrayOperations.addUintToListInMapping(assessmentId, registrantUId, assessmentIdListByRegistrantUId);
    }

    function removeRegistrant(uint256 assessmentId, uint256 registrantUId) external onlyWhitelisted {
        // Validator.requireValueExisting(assessmentsByAssessmentId[assessmentId].assessmentId, "Assessment ID");
        Validator.requireIdValid(assessmentId, "Assessment ID");
        Validator.requireIdAdded(
            registrantUId,
            registrantUIdListByAssessmentId[assessmentId],
            "Registrant uID"
        );

        ArrayOperations.removeUintFromListInMapping(
            registrantUId,
            assessmentId,
            registrantUIdListByAssessmentId
        );
        ArrayOperations.removeUintFromListInMapping(
            assessmentId,
            registrantUId,
            assessmentIdListByRegistrantUId
        );
    }

    function getRegistrantIdsOfAssessment(uint256 assessmentId)
        external
        view
        onlyWhitelisted
        returns (uint256[] memory)
    {
        // Validator.requireValueExisting(assessmentsByAssessmentId[assessmentId].assessmentId, "Assessment ID");
        Validator.requireIdValid(assessmentId, "Assessment ID");

        return registrantUIdListByAssessmentId[assessmentId];
    }

    function getAssessmentIdsOfRegistrant(uint256 registrantUId)
        external
        view
        onlyWhitelisted
        returns (uint256[] memory)
    {
        return assessmentIdListByRegistrantUId[registrantUId];
    }
}
