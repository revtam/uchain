pragma solidity >=0.8.7 <=0.8.17;

import "../../../helpers/AccessControl.sol";
import "../../../datatypes/CourseDataTypes.sol";
import "../validator/Validator.sol";

abstract contract CourseBaseStorage is AccessControl, Validator {
    mapping(string => uint256[]) courseIdsListByCourseCode;
    mapping(uint256 => CourseDataTypes.Course) coursesByCourseId;
    uint256[] courseIds;

    function storeCourse(CourseDataTypes.Course calldata course)
        external
        onlyWhitelisted
        onlyIfIdValid(course.courseId, "Course ID")
        onlyIfValueNotExisting(coursesByCourseId[course.courseId].courseId, "Course ID")
    {
        uint256[] storage courseIdsOfCourseCode = courseIdsListByCourseCode[course.content.code];
        courseIdsOfCourseCode.push(course.courseId);
        courseIdsListByCourseCode[course.content.code] = courseIdsOfCourseCode;

        coursesByCourseId[course.courseId] = course;
        courseIds.push(course.courseId);
    }

    function getCourse(uint256 courseId)
        external
        view
        onlyWhitelisted
        onlyIfValueExisting(coursesByCourseId[courseId].courseId, "Course ID")
        returns (CourseDataTypes.Course memory)
    {
        return coursesByCourseId[courseId];
    }

    function getCourseIdsByCode(string calldata code)
        external
        view
        onlyWhitelisted
        returns (uint256[] memory)
    {
        return courseIdsListByCourseCode[code];
    }

    function getAllCourses() external view onlyWhitelisted returns (CourseDataTypes.Course[] memory) {
        CourseDataTypes.Course[] memory courseList = new CourseDataTypes.Course[](courseIds.length);
        for (uint256 i = 0; i < courseIds.length; ++i) {
            CourseDataTypes.Course memory course = coursesByCourseId[courseIds[i]];
            courseList[i] = course;
        }
        return courseList;
    }
}
