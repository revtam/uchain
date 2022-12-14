pragma solidity >=0.8.7 <=0.8.17;

import "../../../helpers/ArrayOperations.sol";
import "../../../datatypes/CourseDataTypes.sol";
import "./CourseBaseStorage.sol";

abstract contract CourseParticipantStorage is CourseBaseStorage {
    mapping(uint256 => uint256[]) participantUIdsListByCourseId;
    mapping(uint256 => uint256[]) courseIdsListByParticipantUId; // for reverse lookup

    function storeParticipant(uint256 courseId, uint256 participantUId)
        external
        onlyWhitelisted
        onlyIfValueExisting(coursesByCourseId[courseId].courseId, "Course ID")
        onlyIfIdNotAdded(participantUId, participantUIdsListByCourseId[courseId], "Participant uID")
    {
        ArrayOperations.addUintToListInMapping(participantUId, courseId, participantUIdsListByCourseId);
        ArrayOperations.addUintToListInMapping(courseId, participantUId, courseIdsListByParticipantUId);
    }

    function removeParticipant(uint256 courseId, uint256 participantUId)
        external
        onlyWhitelisted
        onlyIfValueExisting(coursesByCourseId[courseId].courseId, "Course ID")
        onlyIfIdAdded(participantUId, participantUIdsListByCourseId[courseId], "Participant uID")
    {
        ArrayOperations.removeUintFromListInMapping(participantUId, courseId, participantUIdsListByCourseId);
        ArrayOperations.removeUintFromListInMapping(courseId, participantUId, courseIdsListByParticipantUId);
    }

    function getParticipantIdsOfCourse(uint256 courseId)
        external
        view
        onlyWhitelisted
        onlyIfValueExisting(coursesByCourseId[courseId].courseId, "Course ID")
        returns (uint256[] memory)
    {
        return participantUIdsListByCourseId[courseId];
    }

    function getCourseIdsOfParticipant(uint256 participantUId)
        external
        view
        onlyWhitelisted
        returns (uint256[] memory)
    {
        return courseIdsListByParticipantUId[participantUId];
    }
}
