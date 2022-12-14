pragma solidity >=0.8.7 <=0.8.17;

import "../helpers/AccessControl.sol";
import "../datatypes/StudyProgramDataTypes.sol";
import "../data/datamanager/ProgramDataManager.sol";
import "./UserAccessController.sol";

contract CourseController is UserAccessController, AccessControl {
    ProgramDataManager programDataManager;

    constructor(address programDataManagerAddress, address userDataManagerAddress)
        AccessControl()
        UserAccessController(userDataManagerAddress)
    {
        programDataManager = ProgramDataManager(programDataManagerAddress);
    }

    function addNewStudyProgram(string calldata programName) external onlySPM {
        programDataManager.createStudyProgram(programName);
    }

    function addAdminNewStudyProgram(string calldata programName) external onlyWhitelisted {
        programDataManager.createStudyProgram(programName);
    }
}
