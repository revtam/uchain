pragma solidity >=0.8.7 <=0.8.17;

import "../../../datatypes/CourseDataTypes.sol";
import "../../../helpers/ArrayOperations.sol";
import "../Storage.sol";

abstract contract AssessmentStorage is Storage {
    mapping(uint256 => uint256[]) assessmentIdListByCourseId;
    mapping(uint256 => CourseDataTypes.Assessment) assessmentByAssessmentId;
    mapping(uint256 => uint256) courseIdByAssessmentId; // for reverse lookup

    function storeAssessment(uint256 courseId, CourseDataTypes.Assessment calldata assessment)
        external
        onlyWhitelisted
    {
        Validator.requireIdValid(courseId, "Course ID");
        Validator.requireIdValid(assessment.assessmentId, "Assessment ID");
        Validator.requireIdNotAdded(
            assessment.assessmentId,
            assessmentIdListByCourseId[courseId],
            "Assessment ID"
        );

        ArrayOperations.addUintToListInMapping(assessment.assessmentId, courseId, assessmentIdListByCourseId);
        assessmentByAssessmentId[assessment.assessmentId] = assessment;
        courseIdByAssessmentId[assessment.assessmentId] = courseId;
    }

    function getCourseIdOfAssessment(uint256 assessmentId) external view onlyWhitelisted returns (uint256) {
        Validator.requireIdExisting(assessmentByAssessmentId[assessmentId].assessmentId, "Assessment ID");

        return courseIdByAssessmentId[assessmentId];
    }

    function getAssessment(uint256 assessmentId)
        external
        view
        onlyWhitelisted
        returns (CourseDataTypes.Assessment memory)
    {
        Validator.requireIdExisting(assessmentByAssessmentId[assessmentId].assessmentId, "Assessment ID");

        return assessmentByAssessmentId[assessmentId];
    }

    function getAssessmentIds(uint256 courseId) external view onlyWhitelisted returns (uint256[] memory) {
        Validator.requireIdValid(courseId, "Course ID");

        return assessmentIdListByCourseId[courseId];
    }
}
