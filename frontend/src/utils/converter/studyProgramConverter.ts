import { StudyprogramResponse } from "../../../imports/ethereum-abi-types/StudyProgramView";
import { StudyProgram } from "../../types/internal-types/internalTypes";

export const convertToStudyProgramInternal = (program: StudyprogramResponse): StudyProgram => {
    return {
        id: program.programId.toString(),
        title: program.programName,
    };
};
