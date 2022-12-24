pragma solidity >=0.8.7 <=0.8.17;

import "../../../helpers/ArrayOperations.sol";
import "../../../datatypes/CourseDataTypes.sol";
import "./AssessmentStorage.sol";

abstract contract AssessmentRegistrationStorage is AssessmentStorage {
    mapping(uint256 => uint256[]) registrantUIdsListByAssessmentId;
    mapping(uint256 => uint256[]) assessmentIdsListByRegistrantUId; // for reverse lookup

    function storeRegistrant(uint256 assessmentId, uint256 registrantUId)
        external
        onlyWhitelisted
        onlyIfValueExisting(assessmentsByAssessmentId[assessmentId].assessmentId, "Assessment ID")
        onlyIfIdNotAdded(registrantUId, registrantUIdsListByAssessmentId[assessmentId], "Registrant uID")
    {
        ArrayOperations.addUintToListInMapping(registrantUId, assessmentId, registrantUIdsListByAssessmentId);
        ArrayOperations.addUintToListInMapping(assessmentId, registrantUId, assessmentIdsListByRegistrantUId);
    }

    function removeRegistrant(uint256 assessmentId, uint256 registrantUId)
        external
        onlyWhitelisted
        onlyIfValueExisting(assessmentsByAssessmentId[assessmentId].assessmentId, "Assessment ID")
        onlyIfIdAdded(registrantUId, registrantUIdsListByAssessmentId[assessmentId], "Registrant uID")
    {
        ArrayOperations.removeUintFromListInMapping(
            registrantUId,
            assessmentId,
            registrantUIdsListByAssessmentId
        );
        ArrayOperations.removeUintFromListInMapping(
            assessmentId,
            registrantUId,
            assessmentIdsListByRegistrantUId
        );
    }

    function getRegistrantIdsOfAssessment(uint256 assessmentId)
        external
        view
        onlyWhitelisted
        onlyIfValueExisting(assessmentsByAssessmentId[assessmentId].assessmentId, "Assessment ID")
        returns (uint256[] memory)
    {
        return registrantUIdsListByAssessmentId[assessmentId];
    }

    function getAssessmentIdsOfRegistrant(uint256 registrantUId)
        external
        view
        onlyWhitelisted
        returns (uint256[] memory)
    {
        return assessmentIdsListByRegistrantUId[registrantUId];
    }
}
