pragma solidity >=0.8.7 <=0.8.17;

import "../../../datatypes/CourseDataTypes.sol";
import "../Storage.sol";

abstract contract AssessmentStorage is Storage {
    mapping(uint256 => CourseDataTypes.Assessment[]) assessmentListByCourseId;
    mapping(uint256 => uint256) courseIdByAssessmentId; // for reverse lookup
    mapping(uint256 => CourseDataTypes.Assessment) assessmentByAssessmentId; // for the easier lookup

    function storeAssessment(uint256 courseId, CourseDataTypes.Assessment calldata assessment)
        external
        onlyWhitelisted
    {
        Validator.requireIdValid(courseId, "Course ID");
        Validator.requireIdValid(assessment.assessmentId, "Assessment ID");
        Validator.requireIdNotAdded(
            assessment.assessmentId,
            getAssessmentIdsFromAssessmentList(assessmentListByCourseId[courseId]),
            "Assessment ID"
        );

        CourseDataTypes.Assessment[] storage assessments = assessmentListByCourseId[courseId];
        assessments.push(assessment);
        assessmentListByCourseId[courseId] = assessments;
        courseIdByAssessmentId[assessment.assessmentId] = courseId;
        assessmentByAssessmentId[assessment.assessmentId] = assessment;
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

    function getAssessments(uint256 courseId)
        external
        view
        onlyWhitelisted
        returns (CourseDataTypes.Assessment[] memory)
    {
        Validator.requireIdValid(courseId, "Course ID");

        return assessmentListByCourseId[courseId];
    }

    // PRIVATE FUNCTIONS

    function getAssessmentIdsFromAssessmentList(CourseDataTypes.Assessment[] memory assessmentList)
        private
        pure
        returns (uint256[] memory)
    {
        uint256[] memory assessmentIds = new uint256[](assessmentList.length);
        for (uint256 i = 0; i < assessmentList.length; ++i) {
            assessmentIds[i] = assessmentList[i].assessmentId;
        }
        return assessmentIds;
    }
}
