import { SelectOption } from "../common/commonTypes";
import { StudyProgram, User } from "./internal-types/internalTypes";

export const convertToStudyProgramSelectOption = (program: StudyProgram): SelectOption => {
    return {
        id: program.id,
        label: program.title,
    };
};

export const convertStringToSelectOption = (code: string): SelectOption => ({
    id: code,
    label: code,
});

export const convertToUserSelectOption = (user: User): SelectOption => ({
    id: user.id,
    label: `${user.name.firstName} ${user.name.lastName}`,
});
