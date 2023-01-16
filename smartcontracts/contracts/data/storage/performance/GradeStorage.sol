pragma solidity >=0.8.7 <=0.8.17;

import "../../../datatypes/PerformanceDataTypes.sol";
import "../Storage.sol";

contract GradeStorage is Storage {
    mapping(uint256 => mapping(uint256 => PerformanceDataTypes.Grade)) gradeByCourseIdByUId;

    constructor(address accessWhitelistAddress) Storage(accessWhitelistAddress) {}

    function storeGrade(
        uint256 uId,
        uint256 courseId,
        PerformanceDataTypes.Grade calldata grade
    ) external onlyWhitelisted {
        Validator.requireIdValid(uId, "uID");
        Validator.requireIdValid(courseId, "Course ID");
        Validator.requireValueNotSet(gradeByCourseIdByUId[uId][courseId].isSet, "Grade");

        gradeByCourseIdByUId[uId][courseId] = grade;
    }

    function updateGrade(
        uint256 uId,
        uint256 courseId,
        PerformanceDataTypes.Grade calldata grade
    ) external onlyWhitelisted {
        Validator.requireValueSet(gradeByCourseIdByUId[uId][courseId].isSet, "Grade");

        gradeByCourseIdByUId[uId][courseId] = grade;
    }

    function getGrade(uint256 uId, uint256 courseId)
        external
        view
        onlyWhitelisted
        returns (PerformanceDataTypes.Grade memory)
    {
        Validator.requireIdValid(uId, "uID");
        Validator.requireIdValid(courseId, "Course ID");
        Validator.requireValueSet(gradeByCourseIdByUId[uId][courseId].isSet, "Grade");

        return gradeByCourseIdByUId[uId][courseId];
    }

    /**
     * @return If returned tuple[0] is true, the grade at tuple[1] is set.
     */
    function getGradeIfSet(uint256 uId, uint256 courseId)
        external
        view
        onlyWhitelisted
        returns (bool, PerformanceDataTypes.Grade memory)
    {
        Validator.requireIdValid(uId, "uID");
        Validator.requireIdValid(courseId, "Course ID");

        PerformanceDataTypes.Grade memory grade = gradeByCourseIdByUId[uId][courseId];
        if (grade.isSet) {
            return (true, grade);
        }
        return (false, grade);
    }
}
