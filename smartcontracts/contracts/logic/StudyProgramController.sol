pragma solidity >=0.8.7 <=0.8.17;

import "../datatypes/StudyProgramDataTypes.sol";
import "../data/datamanager/ProgramDataManager.sol";
import "./Controller.sol";

contract CourseController is Controller {
    constructor(address addressBookAddress) Controller(addressBookAddress) {}

    function addNewStudyProgram(string calldata programName) external onlySPM {
        programDataManager().createStudyProgram(programName);
    }

    function addAdminNewStudyProgram(string calldata programName) external onlyWhitelisted {
        programDataManager().createStudyProgram(programName);
    }

    // GET RELEVANT CONTRACTS

    function programDataManager() private view returns (ProgramDataManager) {
        return ProgramDataManager(addressBook.getAddress("ProgramDataManager"));
    }

    function userDataManager() internal view override returns (UserDataManager) {
        return UserDataManager(addressBook.getAddress("UserDataManager"));
    }
}
