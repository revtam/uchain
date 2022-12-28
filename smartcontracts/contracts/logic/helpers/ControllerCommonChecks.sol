pragma solidity >=0.8.7 <=0.8.17;

import "../../data/datamanager/CourseDataManager.sol";
import "../../data/datamanager/AssessmentDataManager.sol";
import "../../data/datamanager/UserDataManager.sol";
import "../../helpers/ArrayOperations.sol";

library ControllerCommonChecks {
    function requireStudentRegisteredToCourse(
        uint256 studentUId,
        uint256 courseId,
        CourseDataManager _courseDataManager
    ) internal view {
        require(
            isStudentRegisteredToCourse(studentUId, courseId, _courseDataManager),
            "Student is not registered to the course"
        );
    }

    function requireLecturerLecturingAtCourse(
        uint256 lecturerUId,
        uint256 courseId,
        CourseDataManager _courseDataManager
    ) internal view {
        require(
            ArrayOperations.isElementInUintArray(
                lecturerUId,
                _courseDataManager.getLecturerUIdsOfCourseId(courseId)
            ),
            "Lecturer is not lecturing at this course"
        );
    }

    function requireUserAtUIdStudent(uint256 studentUId, UserDataManager _userDataManager) internal view {
        require(
            _userDataManager.getUserRoleAtUId(studentUId) == UserDataTypes.UserRole.STUDENT,
            "The given uID does not belong to a student"
        );
    }

    function isStudentRegisteredToAssessment(
        uint256 studentUId,
        uint256 assessmentId,
        AssessmentDataManager _assessmentDataManager
    ) internal view returns (bool) {
        return
            ArrayOperations.isElementInUintArray(
                studentUId,
                _assessmentDataManager.getAssessmentRegistrantIds(assessmentId)
            );
    }

    function isStudentRegisteredToCourse(
        uint256 studentUId,
        uint256 courseId,
        CourseDataManager _courseDataManager
    ) internal view returns (bool) {
        return
            ArrayOperations.isElementInUintArray(
                studentUId,
                _courseDataManager.getCourseParticipantIds(courseId)
            );
    }
}
