pragma solidity >=0.8.7 <=0.8.17;

import "../../../helpers/ArrayOperations.sol";
import "../../../datatypes/CourseDataTypes.sol";
import "./CourseBaseStorage.sol";

abstract contract CourseLecturerStorage is CourseBaseStorage {
    mapping(uint256 => uint256[]) lecturerUIdsListByCourseId;
    mapping(uint256 => uint256[]) courseIdsListByLecturerUId; // for reverse lookup

    function storeLecturer(uint256 courseId, uint256 lecturerUId)
        external
        onlyWhitelisted
        onlyIfValueExisting(coursesByCourseId[courseId].courseId, "Course ID")
        onlyIfIdNotAdded(lecturerUId, lecturerUIdsListByCourseId[courseId], "Lecturer uID")
    {
        ArrayOperations.addUintToListInMapping(lecturerUId, courseId, lecturerUIdsListByCourseId);
        ArrayOperations.addUintToListInMapping(courseId, lecturerUId, courseIdsListByLecturerUId);
    }

    function removeLecturer(uint256 courseId, uint256 lecturerUId)
        external
        onlyWhitelisted
        onlyIfValueExisting(coursesByCourseId[courseId].courseId, "Course ID")
        onlyIfIdAdded(lecturerUId, lecturerUIdsListByCourseId[courseId], "Lecturer uID")
    {
        ArrayOperations.removeUintFromListInMapping(lecturerUId, courseId, lecturerUIdsListByCourseId);
        ArrayOperations.removeUintFromListInMapping(courseId, lecturerUId, courseIdsListByLecturerUId);
    }

    function getLecturerIdsOfCourse(uint256 courseId)
        external
        view
        onlyWhitelisted
        onlyIfValueExisting(coursesByCourseId[courseId].courseId, "Course ID")
        returns (uint256[] memory)
    {
        return lecturerUIdsListByCourseId[courseId];
    }

    function getCourseIdsOfLecturer(uint256 lecturerUId)
        external
        view
        onlyWhitelisted
        returns (uint256[] memory)
    {
        return courseIdsListByLecturerUId[lecturerUId];
    }
}
