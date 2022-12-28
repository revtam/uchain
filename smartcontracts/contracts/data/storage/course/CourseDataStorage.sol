pragma solidity >=0.8.7 <=0.8.17;

import "./CourseLecturerStorage.sol";
import "./CourseParticipantStorage.sol";
import "./CourseStorage.sol";
import "./CourseStudyProgramStorage.sol";

contract CourseDataStorage is
    CourseLecturerStorage,
    CourseParticipantStorage,
    CourseStorage,
    CourseStudyProgramStorage
{
    constructor(address accessWhitelistAddress) Storage(accessWhitelistAddress) {}
}
