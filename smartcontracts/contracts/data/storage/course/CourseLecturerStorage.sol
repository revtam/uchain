pragma solidity >=0.8.7 <=0.8.17;

import "../../../helpers/ArrayOperations.sol";
import "../../../datatypes/CourseDataTypes.sol";
import "../Storage.sol";

abstract contract CourseLecturerStorage is Storage {
    mapping(uint256 => uint256[]) lecturerUIdListByCourseId;
    mapping(uint256 => uint256[]) courseIdListByLecturerUId; // for reverse lookup

    function storeLecturer(uint256 courseId, uint256 lecturerUId) external onlyWhitelisted {
        Validator.requireIdValid(courseId, "Course ID");
        Validator.requireIdNotAdded(lecturerUId, lecturerUIdListByCourseId[courseId], "Lecturer uID");

        ArrayOperations.addUintToListInMapping(lecturerUId, courseId, lecturerUIdListByCourseId);
        ArrayOperations.addUintToListInMapping(courseId, lecturerUId, courseIdListByLecturerUId);
    }

    function removeLecturer(uint256 courseId, uint256 lecturerUId) external onlyWhitelisted {
        Validator.requireIdValid(courseId, "Course ID");
        Validator.requireIdAdded(lecturerUId, lecturerUIdListByCourseId[courseId], "Lecturer uID");

        ArrayOperations.removeUintFromListInMapping(lecturerUId, courseId, lecturerUIdListByCourseId);
        ArrayOperations.removeUintFromListInMapping(courseId, lecturerUId, courseIdListByLecturerUId);
    }

    function getLecturerIdsOfCourse(uint256 courseId)
        external
        view
        onlyWhitelisted
        returns (uint256[] memory)
    {
        Validator.requireIdValid(courseId, "Course ID");

        return lecturerUIdListByCourseId[courseId];
    }

    function getCourseIdsOfLecturer(uint256 lecturerUId)
        external
        view
        onlyWhitelisted
        returns (uint256[] memory)
    {
        return courseIdListByLecturerUId[lecturerUId];
    }
}
