import { StudyprogramResponse } from "../../contracts/imports/ethereum-abi-types/StudyProgramView";
import { StudyProgram } from "./internal-types/internalTypes";

export const convertToStudyProgramInternal = (program: StudyprogramResponse): StudyProgram => {
    return {
        id: program.programId.toString(),
        title: program.programName,
    };
};
