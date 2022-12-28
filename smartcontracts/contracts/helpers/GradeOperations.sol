pragma solidity >=0.8.7 <=0.8.17;

import "../datatypes/Constants.sol";
import "../datatypes/PerformanceDataTypes.sol";

library GradeOperations {
    /**
     * @notice When working with grades, it is not self-explanatory how the grade comparison works. This function
     * compares two grades based on their value in the university's grading system.
     */
    function isFirstBetterGrade(uint256 firstGrade, uint256 secondGrade) internal pure returns (bool) {
        return firstGrade < secondGrade;
    }

    /**
     * @notice When working with grades, it is not self-explanatory how the grade comparison works. This function
     * compares two grades based on their value in the university's grading system.
     */
    function isFirstWorseGrade(uint256 firstGrade, uint256 secondGrade) internal pure returns (bool) {
        return firstGrade > secondGrade;
    }

    function isGradePositive(PerformanceDataTypes.Grade memory grade) internal pure returns (bool) {
        return grade.value < Constants.WORST_GRADE;
    }
}
