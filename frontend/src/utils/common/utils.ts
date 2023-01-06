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
export const normalizeEnumKey = (enumStr: string): string => {
    return capitalizeFirstLetter(replaceUnderscoreWithSpace(enumStr.toLowerCase()));
};

export const getNormalizedEnumKey = (enumKey: any, enumType: any): string => {
    return normalizeEnumKey(enumType[enumKey]);
};

export const getEnumValues = (enumType: object): string[] => {
    return Object.keys(enumType).filter((value) => isNaN(Number(value)));
};
