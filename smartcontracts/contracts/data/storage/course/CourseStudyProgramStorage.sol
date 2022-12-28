pragma solidity >=0.8.7 <=0.8.17;

import "../../../helpers/ArrayOperations.sol";
import "../../../datatypes/CourseDataTypes.sol";
import "../Storage.sol";

abstract contract CourseStudyProgramStorage is Storage {
    mapping(uint256 => uint256[]) studyProgramIdListByCourseId;
    mapping(uint256 => uint256[]) courseIdListByStudyProgramId; // for reverse lookup

    function storeStudyProgram(uint256 courseId, uint256 programId) external onlyWhitelisted {
        // Validator.requireValueExisting(coursesByCourseId[courseId].courseId, "Course ID");
        Validator.requireIdValid(courseId, "Course ID");
        Validator.requireIdNotAdded(programId, studyProgramIdListByCourseId[courseId], "Program ID");

        ArrayOperations.addUintToListInMapping(programId, courseId, studyProgramIdListByCourseId);
        ArrayOperations.addUintToListInMapping(courseId, programId, courseIdListByStudyProgramId);
    }

    function getStudyProgramIdsOfCourse(uint256 courseId)
        external
        view
        onlyWhitelisted
        returns (uint256[] memory)
    {
        // Validator.requireValueExisting(coursesByCourseId[courseId].courseId, "Course ID");
        Validator.requireIdValid(courseId, "Course ID");

        return studyProgramIdListByCourseId[courseId];
    }

    function getCourseIdsOfStudyProgram(uint256 programId)
        external
        view
        onlyWhitelisted
        returns (uint256[] memory)
    {
        return courseIdListByStudyProgramId[programId];
    }
}
