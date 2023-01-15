pragma solidity >=0.8.7 <=0.8.17;

import "../../../datatypes/CourseDataTypes.sol";
import "../Storage.sol";

abstract contract CourseStorage is Storage {
    mapping(string => uint256[]) courseIdListByCourseCode;
    mapping(uint256 => CourseDataTypes.Course) courseByCourseId;
    uint256[] courseIds;
    string[] courseCodes;

    function storeCourse(CourseDataTypes.Course calldata course) external onlyWhitelisted {
        Validator.requireIdValid(course.courseId, "Course ID");
        Validator.requireIdNotExisting(courseByCourseId[course.courseId].courseId, "Course ID");

        uint256[] storage courseIdsOfCourseCode = courseIdListByCourseCode[course.courseContent.code];
        courseIdsOfCourseCode.push(course.courseId);
        courseIdListByCourseCode[course.courseContent.code] = courseIdsOfCourseCode;

        if (!ArrayOperations.isElementInStringArray(course.courseContent.code, courseCodes)) {
            courseCodes.push(course.courseContent.code);
        }

        courseByCourseId[course.courseId] = course;
        courseIds.push(course.courseId);
    }

    function getCourse(uint256 courseId)
        external
        view
        onlyWhitelisted
        returns (CourseDataTypes.Course memory)
    {
        Validator.requireIdExisting(courseByCourseId[courseId].courseId, "Course ID");

        return courseByCourseId[courseId];
    }

    function getCourseIdsByCode(string calldata code)
        external
        view
        onlyWhitelisted
        returns (uint256[] memory)
    {
        return courseIdListByCourseCode[code];
    }

    function getAllCourses() external view onlyWhitelisted returns (CourseDataTypes.Course[] memory) {
        CourseDataTypes.Course[] memory courseList = new CourseDataTypes.Course[](courseIds.length);
        for (uint256 i = 0; i < courseIds.length; ++i) {
            CourseDataTypes.Course memory course = courseByCourseId[courseIds[i]];
            courseList[i] = course;
        }
        return courseList;
    }

    function getAllCourseCodes() external view onlyWhitelisted returns (string[] memory) {
        return courseCodes;
    }
}
