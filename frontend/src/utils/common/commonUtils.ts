import { SelectOption } from "./commonTypes";

export const trimString = (string: string, startLength: number, endLength: number): string => {
    return string.length > startLength + endLength
        ? string.substring(0, startLength) +
              "..." +
              string.substring(string.length - endLength, string.length)
        : string;
};

export const capitalizeFirstLetter = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const replaceUnderscoreWithSpace = (str: string): string => {
    return str.replaceAll("_", " ");
};

/**
 * Transforms enum value of format "ABC_DEF_GHI" or "abc_def_ghi" into "Abc def ghi".
 * Capitalizes first letter, replaces underscores with space, lowercases rest.
 * @param enumStr
 */
export const normalizeEnumString = (enumStr: string): string => {
    return capitalizeFirstLetter(replaceUnderscoreWithSpace(enumStr.toLowerCase()));
};

export const getNormalizedEnumKey = (enumKey: any, enumType: any): string => {
    return normalizeEnumString(enumType[enumKey]);
};

// export const getEnumValues = (enumType: object): string[] => {
//     return Object.keys(enumType).filter((value) => isNaN(Number(value)));
// };

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
