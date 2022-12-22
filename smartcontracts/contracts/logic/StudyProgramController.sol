pragma solidity >=0.8.7 <=0.8.17;

import "../datatypes/StudyProgramDataTypes.sol";
import "./Controller.sol";

contract CourseController is Controller {
    constructor(address addressBookAddress) Controller(addressBookAddress) {}

    function addNewStudyProgram(string calldata programName) external onlySPM {
        programDataManager().createStudyProgram(programName);
    }

    function addAdminNewStudyProgram(string calldata programName) external onlyWhitelisted {
        programDataManager().createStudyProgram(programName);
    }
}
