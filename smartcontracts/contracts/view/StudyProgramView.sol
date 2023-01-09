pragma solidity >=0.8.7 <=0.8.17;

import "../datatypes/StudyProgramDataTypes.sol";
import "../data/datamanager/ProgramDataManager.sol";
import "../data/datamanager/CourseDataManager.sol";
import "../logic/Controller.sol";

contract StudyProgramView is Controller {
    constructor(address addressBookAddress) Controller(addressBookAddress) {}

    function getProgram(uint256 programId) external view returns (StudyProgramDataTypes.StudyProgram memory) {
        return programDataManager().getStudyProgram(programId);
    }

    function getStudyProgramsToCourseId(uint256 courseId)
        external
        view
        returns (StudyProgramDataTypes.StudyProgram[] memory)
    {
        uint256[] memory programIds = courseDataManager().getStudyProgramIdsOfCourse(courseId);
        return programDataManager().getStudyPrograms(programIds);
    }

    function getEnrolledPrograms()
        external
        view
        onlyStudent
        returns (StudyProgramDataTypes.StudyProgram[] memory)
    {
        uint256 studentUId = userDataManager().getUIdToAddress(msg.sender);
        uint256[] memory programIds = userDataManager().getEnrolledProgramIds(studentUId);
        return programDataManager().getStudyPrograms(programIds);
    }

    function getAllPrograms() external view returns (StudyProgramDataTypes.StudyProgram[] memory) {
        return programDataManager().getAllStudyPrograms();
    }

    // USED CONTRACTS

    function programDataManager() internal view returns (ProgramDataManager) {
        return ProgramDataManager(addressBook.getAddress(ContractNames.Name.PROGRAM_DATA_MANAGER));
    }

    function courseDataManager() internal view returns (CourseDataManager) {
        return CourseDataManager(addressBook.getAddress(ContractNames.Name.COURSE_DATA_MANAGER));
    }
}
