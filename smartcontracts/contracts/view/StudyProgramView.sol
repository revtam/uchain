pragma solidity >=0.8.7 <=0.8.17;

import "../data/datamanager/ProgramDataManager.sol";
import "../data/datamanager/UserDataManager.sol";
import "../logic/UserAccessController.sol";
import "../datatypes/StudyProgramDataTypes.sol";

contract StudyProgramView is UserAccessController {
    ProgramDataManager programDataManager;
    UserDataManager userDataManager;

    constructor(address userDataManagerAddress, address programDataManagerAddress)
        UserAccessController(userDataManagerAddress)
    {
        programDataManager = ProgramDataManager(programDataManagerAddress);
    }

    function getEnrolledPrograms()
        external
        view
        onlyStudent
        returns (StudyProgramDataTypes.StudyProgram[] memory)
    {
        uint256 studentUId = userDataManager.getUIdToAddress(msg.sender);
        uint256[] memory programIds = userDataManager.getEnrolledProgramIds(studentUId);
        StudyProgramDataTypes.StudyProgram[] memory programs = new StudyProgramDataTypes.StudyProgram[](
            programIds.length
        );
        for (uint256 i = 0; i < programIds.length; ++i) {
            programs[i] = programDataManager.getStudyProgram(programIds[i]);
        }
        return programs;
    }

    function getAllPrograms() external view returns (StudyProgramDataTypes.StudyProgram[] memory) {
        return programDataManager.getAllStudyPrograms();
    }
}
