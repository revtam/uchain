pragma solidity >=0.8.7 <=0.8.17;

import "../../../datatypes/CourseDataTypes.sol";
import "./CourseBaseStorage.sol";

abstract contract AssessmentStorage is CourseBaseStorage {
    mapping(uint256 => CourseDataTypes.Assessment[]) assessmentsListByCourseId;
    mapping(uint256 => uint256) courseIdsByAssessmentId; // for reverse lookup
    mapping(uint256 => CourseDataTypes.Assessment) assessmentsByAssessmentId; // for the easier lookup

    function storeAssessment(uint256 courseId, CourseDataTypes.Assessment calldata assessment)
        external
        onlyWhitelisted
        onlyIfValueExisting(coursesByCourseId[courseId].courseId, "Course ID")
        onlyIfIdValid(assessment.assessmentId, "Assessment ID")
        onlyIfIdNotAdded(
            assessment.assessmentId,
            getAssessmentIdsFromAssessmentList(assessmentsListByCourseId[courseId]),
            "Assessment ID"
        )
    {
        CourseDataTypes.Assessment[] storage assessments = assessmentsListByCourseId[courseId];
        assessments.push(assessment);
        assessmentsListByCourseId[courseId] = assessments;
        courseIdsByAssessmentId[assessment.assessmentId] = courseId;
        assessmentsByAssessmentId[assessment.assessmentId] = assessment;
    }

    function getAssessment(uint256 assessmentId)
        external
        view
        onlyWhitelisted
        onlyIfValueExisting(assessmentsByAssessmentId[assessmentId].assessmentId, "Assessment ID")
        returns (CourseDataTypes.Assessment memory)
    {
        return assessmentsByAssessmentId[assessmentId];
    }

    function getCourseIdOfAssessment(uint256 assessmentId)
        external
        view
        onlyWhitelisted
        onlyIfValueExisting(assessmentsByAssessmentId[assessmentId].assessmentId, "Assessment ID")
        returns (uint256)
    {
        return courseIdsByAssessmentId[assessmentId];
    }

    function getAssessments(uint256 courseId)
        external
        view
        onlyWhitelisted
        onlyIfValueExisting(coursesByCourseId[courseId].courseId, "Course ID")
        returns (CourseDataTypes.Assessment[] memory)
    {
        return assessmentsListByCourseId[courseId];
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
