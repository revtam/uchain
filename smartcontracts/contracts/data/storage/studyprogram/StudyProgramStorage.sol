pragma solidity >=0.8.7 <=0.8.17;

import "../../../helpers/AccessControl.sol";
import "../../../datatypes/StudyProgramDataTypes.sol";
import "../validator/Validator.sol";

contract StudyProgramStorage is AccessControl, Validator {
    mapping(uint256 => StudyProgramDataTypes.StudyProgram) studyProgramsByProgramId;
    uint256[] programIds;

    function storeStudyProgram(StudyProgramDataTypes.StudyProgram calldata program)
        external
        onlyWhitelisted
        onlyIfIdValid(program.programId, "Program ID")
        onlyIfValueNotExisting(studyProgramsByProgramId[program.programId].programId, "Program ID")
    {
        studyProgramsByProgramId[program.programId] = program;
        programIds.push(program.programId);
    }

    function getStudyProgram(uint256 programId)
        external
        view
        onlyWhitelisted
        onlyIfValueExisting(studyProgramsByProgramId[programId].programId, "Program ID")
        returns (StudyProgramDataTypes.StudyProgram memory)
    {
        return studyProgramsByProgramId[programId];
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
            programList[i] = studyProgramsByProgramId[programIds[i]];
        }
        return programList;
    }
}
