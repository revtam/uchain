pragma solidity >=0.8.7 <=0.8.17;

import "../../accesscontrol/AccessController.sol";
import "../storage/studyprogram/StudyProgramStorage.sol";
import "../../datatypes/StudyProgramDataTypes.sol";
import "../../datatypes/CommonDataTypes.sol";
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

    /**
     * @return Created study program's id.
     */
    function createStudyProgram(string calldata programName) external onlyWhitelisted returns (uint256) {
        DataManagerCommonChecks.requireStringNotEmpty(programName, "Program name");

        uint256 generatedId = IdGenerator.generateId(programIdCounter);
        programStorage.storeStudyProgram(
            StudyProgramDataTypes.StudyProgram(generatedId, programName)
        );
        emit CommonDataTypes.IdGeneration(generatedId);
        return generatedId;
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

    function getStudyPrograms(uint256[] calldata programIds)
        external
        view
        onlyWhitelisted
        returns (StudyProgramDataTypes.StudyProgram[] memory)
    {
        StudyProgramDataTypes.StudyProgram[] memory programs = new StudyProgramDataTypes.StudyProgram[](
            programIds.length
        );
        for (uint256 i = 0; i < programIds.length; ++i) {
            programs[i] = programStorage.getStudyProgram(programIds[i]);
        }
        return programs;
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
