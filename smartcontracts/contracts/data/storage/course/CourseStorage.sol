pragma solidity >=0.8.7 <=0.8.17;

import "./AppointmentStorage.sol";
import "./CourseParticipantStorage.sol";
import "./AppointmentRegistrationStorage.sol";
import "./CourseLecturerStorage.sol";
import "./CourseStudyProgramStorage.sol";

contract CourseStorage is
    AppointmentStorage,
    CourseParticipantStorage,
    AppointmentRegistrationStorage,
    CourseLecturerStorage,
    CourseStudyProgramStorage
{}
