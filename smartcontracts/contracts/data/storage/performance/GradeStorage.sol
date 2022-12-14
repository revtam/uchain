pragma solidity >=0.8.7 <=0.8.17;

import "../../../helpers/AccessControl.sol";
import "../../../datatypes/PerformanceDataTypes.sol";
import "../validator/Validator.sol";

contract GradeStorage is AccessControl, Validator {
    mapping(uint256 => mapping(uint256 => PerformanceDataTypes.FinalGrade[])) gradeHistoryByCourseIdByUId;

    function storeGrade(
        uint256 uId,
        uint256 courseId,
        PerformanceDataTypes.FinalGrade calldata grade
    ) external onlyWhitelisted onlyIfIdValid(uId, "uID") onlyIfIdValid(courseId, "Course ID") {
        PerformanceDataTypes.FinalGrade[] storage grades = gradeHistoryByCourseIdByUId[uId][courseId];
        grades.push(grade);
        gradeHistoryByCourseIdByUId[uId][courseId] = grades;
    }

    function getGrades(uint256 uId, uint256 courseId)
        external
        view
        onlyWhitelisted
        onlyIfIdValid(uId, "uID")
        onlyIfIdValid(courseId, "Course ID")
        returns (PerformanceDataTypes.FinalGrade[] memory)
    {
        return gradeHistoryByCourseIdByUId[uId][courseId];
    }
}
