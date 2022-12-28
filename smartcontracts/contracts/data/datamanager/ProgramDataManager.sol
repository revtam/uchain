pragma solidity >=0.8.7 <=0.8.17;

import "../../accesscontrol/AccessController.sol";
import "../storage/studyprogram/StudyProgramStorage.sol";
import "../../datatypes/StudyProgramDataTypes.sol";
import "./helpers/IdGenerator.sol";
import "./helpers/DataManagerCommonChecks.sol";

contract ProgramDataManager is AccessController {
    StudyProgramStorage programStorage;

    IdGenerator.Counter private programIdCounter = IdGenerator.initializeCounter();

    constructor(address programStorageAddress, address accessWhitelistAddress)
        AccessController(accessWhitelistAddress)
    {
        programStorage = StudyProgramStorage(programStorageAddress);
    }

    // WRITE FUNCTIONS

    function createStudyProgram(string calldata programName) external onlyWhitelisted {
        DataManagerCommonChecks.requireStringNotEmpty(programName, "Program name");

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
