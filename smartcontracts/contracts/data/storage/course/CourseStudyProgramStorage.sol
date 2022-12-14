pragma solidity >=0.8.7 <=0.8.17;

import "../../../helpers/ArrayOperations.sol";
import "../../../datatypes/CourseDataTypes.sol";
import "./CourseBaseStorage.sol";

abstract contract CourseStudyProgramStorage is CourseBaseStorage {
    mapping(uint256 => uint256[]) studyProgramIdListByCourseId;
    mapping(uint256 => uint256[]) courseIdsListByStudyProgramId; // for reverse lookup

    function storeStudyProgram(uint256 courseId, uint256 programId)
        external
        onlyWhitelisted
        onlyIfValueExisting(coursesByCourseId[courseId].courseId, "Course ID")
        onlyIfIdNotAdded(programId, studyProgramIdListByCourseId[courseId], "Program ID")
    {
        ArrayOperations.addUintToListInMapping(programId, courseId, studyProgramIdListByCourseId);
        ArrayOperations.addUintToListInMapping(courseId, programId, courseIdsListByStudyProgramId);
    }

    function removeStudyProgram(uint256 courseId, uint256 programId)
        external
        onlyWhitelisted
        onlyIfValueExisting(coursesByCourseId[courseId].courseId, "Course ID")
        onlyIfIdAdded(programId, studyProgramIdListByCourseId[courseId], "Program ID")
    {
        ArrayOperations.removeUintFromListInMapping(programId, courseId, studyProgramIdListByCourseId);
        ArrayOperations.removeUintFromListInMapping(courseId, programId, courseIdsListByStudyProgramId);
    }

    function getStudyProgramIdsOfCourse(uint256 courseId)
        external
        view
        onlyWhitelisted
        onlyIfValueExisting(coursesByCourseId[courseId].courseId, "Course ID")
        returns (uint256[] memory)
    {
        return studyProgramIdListByCourseId[courseId];
    }

    function getCourseIdsOfStudyProgram(uint256 programId)
        external
        view
        onlyWhitelisted
        returns (uint256[] memory)
    {
        return courseIdsListByStudyProgramId[programId];
    }
}
