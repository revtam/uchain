pragma solidity >=0.8.7 <=0.8.17;

import "../../accesscontrol/AccessController.sol";
import "../storage/assessment/AssessmentDataStorage.sol";
import "../../datatypes/CourseDataTypes.sol";
import "./helpers/IdGenerator.sol";
import "./helpers/DataManagerCommonChecks.sol";

contract AssessmentDataManager is AccessController {
    AssessmentDataStorage assessmentDataStorage;

    IdGenerator.Counter private assessmentIdCounter = IdGenerator.initializeCounter();

    constructor(address assessmentDataStorageAddress, address accessWhitelistAddress)
        AccessController(accessWhitelistAddress)
    {
        assessmentDataStorage = AssessmentDataStorage(assessmentDataStorageAddress);
    }

    // WRITE FUNCTIONS

    function addAssessments(uint256 courseId, CourseDataTypes.AssessmentContent[] calldata assessmentContents)
        external
        onlyWhitelisted
    {
        for (uint256 i = 0; i < assessmentContents.length; ++i) {
            DataManagerCommonChecks.requireStringNotEmpty(assessmentContents[i].title, "Title");
            require(
                assessmentContents[i].minPoints <= assessmentContents[i].maxPoints,
                "Min points cannot be higher than max points"
            );
            assessmentDataStorage.storeAssessment(
                courseId,
                CourseDataTypes.Assessment(IdGenerator.generateId(assessmentIdCounter), assessmentContents[i])
            );
        }
    }

    function addRegistrantToAssessment(uint256 assessmentId, uint256 uId) external onlyWhitelisted {
        assessmentDataStorage.storeRegistrant(assessmentId, uId);
    }

    function removeRegistrantFromAssessment(uint256 assessmentId, uint256 uId) external onlyWhitelisted {
        assessmentDataStorage.removeRegistrant(assessmentId, uId);
    }

    // READ FUNCTIONS

    function getCourseIdToAssessmentId(uint256 assessmentId) external view onlyWhitelisted returns (uint256) {
        return assessmentDataStorage.getCourseIdOfAssessment(assessmentId);
    }

    function getAssessmentsToCourseId(uint256 courseId)
        external
        view
        onlyWhitelisted
        returns (CourseDataTypes.Assessment[] memory)
    {
        return assessmentDataStorage.getAssessments(courseId);
    }

    function getAssessmentIdsToCourseId(uint256 courseId)
        external
        view
        onlyWhitelisted
        returns (uint256[] memory)
    {
        CourseDataTypes.Assessment[] memory assessments = assessmentDataStorage.getAssessments(courseId);
        uint256[] memory assessmentIds = new uint256[](assessments.length);
        for (uint256 i = 0; i < assessments.length; ++i) {
            assessmentIds[i] = assessments[i].assessmentId;
        }
        return assessmentIds;
    }

    function getAssessmentType(uint256 assessmentId)
        external
        view
        onlyWhitelisted
        returns (CourseDataTypes.AssessmentType)
    {
        return assessmentDataStorage.getAssessment(assessmentId).content.assessmentType;
    }

    function getAssessmentTime(uint256 assessmentId) external view onlyWhitelisted returns (uint256) {
        return assessmentDataStorage.getAssessment(assessmentId).content.datetime;
    }

    function getAssessmentMinPoints(uint256 assessmentId) external view onlyWhitelisted returns (uint256) {
        return assessmentDataStorage.getAssessment(assessmentId).content.minPoints;
    }

    function getAssessmentMaxPoints(uint256 assessmentId) external view onlyWhitelisted returns (uint256) {
        return assessmentDataStorage.getAssessment(assessmentId).content.maxPoints;
    }

    function isAssessmentRegistrationRequired(uint256 assessmentId)
        external
        view
        onlyWhitelisted
        returns (bool)
    {
        return assessmentDataStorage.getAssessment(assessmentId).content.isRegistrationRequired;
    }

    /**
     * @return tuple[registrationStartDate, registrationEndDate]
     */
    function getAssessmentRegistrationPeriod(uint256 assessmentId)
        external
        view
        onlyWhitelisted
        returns (uint256, uint256)
    {
        return (
            assessmentDataStorage.getAssessment(assessmentId).content.registrationStart,
            assessmentDataStorage.getAssessment(assessmentId).content.registrationDeadline
        );
    }

    /**
     * @return tuple[deregistrationStartDate, deregistrationEndDate]
     */
    function getAssessmentDeregistrationPeriod(uint256 assessmentId)
        external
        view
        onlyWhitelisted
        returns (uint256, uint256)
    {
        return (
            assessmentDataStorage.getAssessment(assessmentId).content.registrationStart,
            assessmentDataStorage.getAssessment(assessmentId).content.deregistrationDeadline
        );
    }

    function getAssessmentRegistrantIds(uint256 assessmentId)
        external
        view
        onlyWhitelisted
        returns (uint256[] memory)
    {
        return assessmentDataStorage.getRegistrantIdsOfAssessment(assessmentId);
    }
}
