pragma solidity >=0.8.7 <=0.8.17;

import "./Controller.sol";
import "../accesscontrol/AdminAccess.sol";
import "../datatypes/StudyProgramDataTypes.sol";
import "../data/datamanager/ProgramDataManager.sol";

contract StudyProgramController is Controller, AdminAccess {
    constructor(address addressBookAddress) Controller(addressBookAddress) {}

    function addNewStudyProgram(string calldata programName) external onlySPM {
        programDataManager().createStudyProgram(programName);
    }

    function addAdminNewStudyProgram(string calldata programName) external onlyAdmin {
        programDataManager().createStudyProgram(programName);
    }

    // USED CONTRACTS

    function programDataManager() internal view returns (ProgramDataManager) {
        return ProgramDataManager(addressBook.getAddress(ContractNames.Name.PROGRAM_DATA_MANAGER));
    }
}
