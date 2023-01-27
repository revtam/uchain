pragma solidity >=0.8.7 <=0.8.17;

import "../../../datatypes/StudyProgramDataTypes.sol";
import "../Storage.sol";

contract StudyProgramStorage is Storage {
    mapping(uint256 => StudyProgramDataTypes.StudyProgram) studyProgramByProgramId;
    uint256[] programIds;

    constructor(address accessWhitelistAddress) Storage(accessWhitelistAddress) {}

    function storeStudyProgram(StudyProgramDataTypes.StudyProgram calldata program) external onlyWhitelisted {
        Validator.requireIdValid(program.programId, "Program ID");
        Validator.requireIdNotExisting(studyProgramByProgramId[program.programId].programId, "Program");

        studyProgramByProgramId[program.programId] = program;
        programIds.push(program.programId);
    }

    function getStudyProgram(uint256 programId)
        external
        view
        onlyWhitelisted
        returns (StudyProgramDataTypes.StudyProgram memory)
    {
        Validator.requireIdExisting(studyProgramByProgramId[programId].programId, "Program");

        return studyProgramByProgramId[programId];
    }

    function getAllStudyPrograms()
        external
        view
        onlyWhitelisted
        returns (StudyProgramDataTypes.StudyProgram[] memory)
    {
        StudyProgramDataTypes.StudyProgram[] memory programList = new StudyProgramDataTypes.StudyProgram[](
            programIds.length
        );
        for (uint256 i = 0; i < programIds.length; ++i) {
            programList[i] = studyProgramByProgramId[programIds[i]];
        }
        return programList;
    }
}
