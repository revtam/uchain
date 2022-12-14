pragma solidity >=0.8.7 <=0.8.17;

import "../../helpers/AccessControl.sol";
import "../../datatypes/StudyProgramDataTypes.sol";
import "../storage/studyprogram/StudyProgramStorage.sol";
import "./helpers/ManagerCommonRequirements.sol";
import "./helpers/IdGenerator.sol";

contract ProgramDataManager is AccessControl {
    StudyProgramStorage programStorage;

    IdGenerator.Counter private programIdCounter = IdGenerator.initializeCounter();

    constructor(address programStorageAddress) AccessControl() {
        programStorage = StudyProgramStorage(programStorageAddress);
    }

    // WRITE FUNCTIONS

    function createStudyProgram(string calldata programName) external onlyWhitelisted {
        ManagerCommonRequirements.requireStringNotEmpty(programName, "Program name");

        programStorage.storeStudyProgram(
            StudyProgramDataTypes.StudyProgram(IdGenerator.generateId(programIdCounter), programName)
        );
    }

    // READ FUNCTIONS

    function getStudyProgram(uint256 programId)
        external
        view
        onlyWhitelisted
        returns (StudyProgramDataTypes.StudyProgram memory)
    {
        return programStorage.getStudyProgram(programId);
    }

    function getAllStudyPrograms()
        external
        view
        onlyWhitelisted
        returns (StudyProgramDataTypes.StudyProgram[] memory)
    {
        return programStorage.getAllStudyPrograms();
    }
}
