import { StudyprogramResponse } from "../../contracts/imports/ethereum-abi-types/StudyProgramView";
import { SelectOption } from "../common/commonTypes";
import { StudyProgram } from "./internal-types/internalTypes";

export const convertToStudyProgramInternal = (program: StudyprogramResponse): StudyProgram => {
    return {
        id: program.programId.toString(),
        title: program.programName,
    };
};

export const convertToStudyProgramSelectOption = (program: StudyProgram): SelectOption => {
    return {
        id: program.id,
        label: program.title,
    };
};
