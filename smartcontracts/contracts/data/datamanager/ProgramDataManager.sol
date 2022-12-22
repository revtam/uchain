pragma solidity >=0.8.7 <=0.8.17;

import "./DataManager.sol";
import "../../datatypes/StudyProgramDataTypes.sol";
import "./helpers/IdGenerator.sol";

contract ProgramDataManager is DataManager {
    IdGenerator.Counter private programIdCounter = IdGenerator.initializeCounter();

    constructor(address addressBookAddress) DataManager(addressBookAddress) {}

    // WRITE FUNCTIONS

    function createStudyProgram(string calldata programName) external onlyWhitelisted {
        requireStringNotEmpty(programName, "Program name");

        programStorage().storeStudyProgram(
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
        return programStorage().getStudyProgram(programId);
    }

    function getAllStudyPrograms()
        external
        view
        onlyWhitelisted
        returns (StudyProgramDataTypes.StudyProgram[] memory)
    {
        return programStorage().getAllStudyPrograms();
    }
}
