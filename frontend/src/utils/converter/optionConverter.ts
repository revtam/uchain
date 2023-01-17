import { SelectOption } from "../common/commonTypes";
import { getNormalizedEnumKey, normalizeEnumString } from "../common/commonUtils";
import { Course, StudyProgram, User } from "./internal-types/internalTypes";

export const convertToStudyProgramSelectOption = (program: StudyProgram): SelectOption => {
    return {
        id: program.id,
        label: program.title,
    };
};

export const convertStringToSelectOption = (value: string): SelectOption => ({
    id: value,
    label: value,
});

export const convertToUserSelectOption = (user: User): SelectOption => ({
    id: user.id,
    label: `${user.name.firstName} ${user.name.lastName} - ${user.id}`,
});

export const convertToCourseSelectOption = (course: Course): any => ({
    id: course.id,
    label: `${course.title} - ${course.id}`,
});

export const transformEnumIntoOptions = (enumType: object): SelectOption[] => {
    return Object.entries(enumType)
        .filter(([, value]) => isNaN(Number(value)))
        .map(([key, value]) => {
            if (typeof value === "string") {
                value = normalizeEnumString(value);
            }
            return {
                id: key as number | string,
                label: value as number | string,
            };
        });
};

export const transformArrayIntoOptions = (elements: string[] | number[]): SelectOption[] => {
    return elements.map((elem) => ({ id: elem, label: elem }));
};

export const transformEnumKeyIntoOption = (enumKey: any, enumType: any): SelectOption => ({
    id: enumKey,
    label: getNormalizedEnumKey(enumKey, enumType),
});
