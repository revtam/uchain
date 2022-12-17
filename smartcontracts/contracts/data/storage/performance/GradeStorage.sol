pragma solidity >=0.8.7 <=0.8.17;

import "../../../helpers/AccessControl.sol";
import "../../../datatypes/PerformanceDataTypes.sol";
import "../validator/Validator.sol";

contract GradeStorage is AccessControl, Validator {
    mapping(uint256 => mapping(uint256 => PerformanceDataTypes.Grade)) gradeByCourseIdByUId;

    function storeGrade(
        uint256 uId,
        uint256 courseId,
        PerformanceDataTypes.Grade calldata grade
    )
        external
        onlyWhitelisted
        onlyIfIdValid(uId, "uID")
        onlyIfIdValid(courseId, "Course ID")
        onlyIfValueNotSet(gradeByCourseIdByUId[uId][courseId].isSet, "Grade")
    {
        gradeByCourseIdByUId[uId][courseId] = grade;
    }

    function updateGrade(
        uint256 uId,
        uint256 courseId,
        PerformanceDataTypes.Grade calldata grade
    )
        external
        onlyWhitelisted
        onlyIfIdValid(uId, "uID")
        onlyIfIdValid(courseId, "Course ID")
        onlyIfValueSet(gradeByCourseIdByUId[uId][courseId].isSet, "Grade")
    {
        gradeByCourseIdByUId[uId][courseId] = grade;
    }

    function getGrade(uint256 uId, uint256 courseId)
        external
        view
        onlyWhitelisted
        onlyIfIdValid(uId, "uID")
        onlyIfIdValid(courseId, "Course ID")
        returns (PerformanceDataTypes.Grade memory)
    {
        return gradeByCourseIdByUId[uId][courseId];
    }
}
