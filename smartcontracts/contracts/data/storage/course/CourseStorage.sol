pragma solidity >=0.8.7 <=0.8.17;

import "./AssessmentStorage.sol";
import "./CourseParticipantStorage.sol";
import "./AssessmentRegistrationStorage.sol";
import "./CourseLecturerStorage.sol";
import "./CourseStudyProgramStorage.sol";

contract CourseStorage is
    AssessmentStorage,
    CourseParticipantStorage,
    AssessmentRegistrationStorage,
    CourseLecturerStorage,
    CourseStudyProgramStorage
{}
