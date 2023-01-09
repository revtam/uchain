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

    function isRegisteredToAssessment(uint256 uId, uint256 assessmentId)
        external
        view
        onlyWhitelisted
        returns (bool)
    {
        return
            ArrayOperations.isElementInUintArray(
                uId,
                assessmentDataStorage.getRegistrantIdsOfAssessment(assessmentId)
            );
    }

    function getCourseIdToAssessmentId(uint256 assessmentId) external view onlyWhitelisted returns (uint256) {
        return assessmentDataStorage.getCourseIdOfAssessment(assessmentId);
    }

    function getAssessmentsToCourseId(uint256 courseId)
        external
        view
        onlyWhitelisted
        returns (CourseDataTypes.Assessment[] memory)
    {
        uint256[] memory assessmentIds = assessmentDataStorage.getAssessmentIds(courseId);
        CourseDataTypes.Assessment[] memory assessments = new CourseDataTypes.Assessment[](
            assessmentIds.length
        );
        for (uint256 i = 0; i < assessmentIds.length; ++i) {
            assessments[i] = assessmentDataStorage.getAssessment(assessmentIds[i]);
        }
        return assessments;
    }

    function getAssessmentIdsToCourseId(uint256 courseId)
        external
        view
        onlyWhitelisted
        returns (uint256[] memory)
    {
        return assessmentDataStorage.getAssessmentIds(courseId);
    }

    function getAssessmentType(uint256 assessmentId)
        external
        view
        onlyWhitelisted
        returns (CourseDataTypes.AssessmentType)
    {
        return assessmentDataStorage.getAssessment(assessmentId).assessmentContent.assessmentType;
    }

    function getAssessmentTime(uint256 assessmentId) external view onlyWhitelisted returns (uint256) {
        return assessmentDataStorage.getAssessment(assessmentId).assessmentContent.datetime;
    }

    function getAssessmentMinPoints(uint256 assessmentId) external view onlyWhitelisted returns (uint256) {
        return assessmentDataStorage.getAssessment(assessmentId).assessmentContent.minPoints;
    }

    function getAssessmentMaxPoints(uint256 assessmentId) external view onlyWhitelisted returns (uint256) {
        return assessmentDataStorage.getAssessment(assessmentId).assessmentContent.maxPoints;
    }

    function isAssessmentRegistrationRequired(uint256 assessmentId)
        external
        view
        onlyWhitelisted
        returns (bool)
    {
        return assessmentDataStorage.getAssessment(assessmentId).assessmentContent.isRegistrationRequired;
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
            assessmentDataStorage.getAssessment(assessmentId).assessmentContent.registrationStart,
            assessmentDataStorage.getAssessment(assessmentId).assessmentContent.registrationDeadline
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
            assessmentDataStorage.getAssessment(assessmentId).assessmentContent.registrationStart,
            assessmentDataStorage.getAssessment(assessmentId).assessmentContent.deregistrationDeadline
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
