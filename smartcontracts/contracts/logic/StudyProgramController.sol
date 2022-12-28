pragma solidity >=0.8.7 <=0.8.17;

import "./Controller.sol";
import "../accesscontrol/AdminAccess.sol";
import "../datatypes/StudyProgramDataTypes.sol";

contract StudyProgramController is Controller, AdminAccess {
    constructor(address userDataManagerAddress, address programDataManagerAddress)
        Controller(userDataManagerAddress)
    {
        setProgramDataManager(programDataManagerAddress);
    }

    function addNewStudyProgram(string calldata programName) external onlySPM {
        programDataManager.createStudyProgram(programName);
    }

    function addAdminNewStudyProgram(string calldata programName) external onlyAdmin {
        programDataManager.createStudyProgram(programName);
    }
}
