pragma solidity >=0.8.7 <=0.8.17;

import "../../../helpers/ArrayOperations.sol";
import "../../../datatypes/CourseDataTypes.sol";
import "../Storage.sol";

abstract contract CourseParticipantStorage is Storage {
    mapping(uint256 => uint256[]) participantUIdListByCourseId;
    mapping(uint256 => uint256[]) courseIdListByParticipantUId; // for reverse lookup

    function storeParticipant(uint256 courseId, uint256 participantUId) external onlyWhitelisted {
        Validator.requireIdValid(courseId, "Course ID");
        Validator.requireIdNotAdded(
            participantUId,
            participantUIdListByCourseId[courseId],
            "Participant uID"
        );

        ArrayOperations.addUintToListInMapping(participantUId, courseId, participantUIdListByCourseId);
        ArrayOperations.addUintToListInMapping(courseId, participantUId, courseIdListByParticipantUId);
    }

    function removeParticipant(uint256 courseId, uint256 participantUId) external onlyWhitelisted {
        Validator.requireIdValid(courseId, "Course ID");
        Validator.requireIdAdded(participantUId, participantUIdListByCourseId[courseId], "Participant uID");

        ArrayOperations.removeUintFromListInMapping(participantUId, courseId, participantUIdListByCourseId);
        ArrayOperations.removeUintFromListInMapping(courseId, participantUId, courseIdListByParticipantUId);
    }

    function getParticipantIdsOfCourse(uint256 courseId)
        external
        view
        onlyWhitelisted
        returns (uint256[] memory)
    {
        Validator.requireIdValid(courseId, "Course ID");

        return participantUIdListByCourseId[courseId];
    }

    function getCourseIdsOfParticipant(uint256 participantUId)
        external
        view
        onlyWhitelisted
        returns (uint256[] memory)
    {
        return courseIdListByParticipantUId[participantUId];
    }
}
