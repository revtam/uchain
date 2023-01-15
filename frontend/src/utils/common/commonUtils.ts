import { FunctionComponent, ReactElement } from "react";
import { PERCENTAGE_DECIMAL_PRECISION } from "../../constants/constants";

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

/**
 * Signals rerender upon successful state-changing transaction completion.
 * @param functionCall The function call with its arguments (ideally wrapped in an arrow function)
 * @param rerender The function that forces rerender in the caller component
 * @returns Whatever the awaited promise returns
 */
export const rerenderOnReturn = async <T>(
    functionCall: () => Promise<T>,
    rerender: () => void
): Promise<T> => {
    const receipt = await functionCall();
    rerender();
    return receipt;
};

export const calculateRoundedDownPercentage = (dividend: number, decimalPlaces: number): number =>
    Math.floor(dividend * 100 * 10 ** decimalPlaces) / 10 ** decimalPlaces;

export const calculateRoundedDownPercentageWithPrecision = (dividend: number): number =>
    calculateRoundedDownPercentage(dividend, PERCENTAGE_DECIMAL_PRECISION);

export const supplyStaticProps: <DynamicProps, StaticProps>(
    functionComponent: FunctionComponent<DynamicProps & StaticProps>,
    props: StaticProps
) => (dynamicProps: DynamicProps) => ReactElement<DynamicProps & StaticProps> | null =
    (functionComponent, staticProps) => (dynamicProps) =>
        functionComponent({ ...dynamicProps, ...staticProps });

export const removeDuplicates = (array: Array<string | number>) =>
    array.filter((item, index) => array.indexOf(item) === index);

export const getDefaultDataPlaceholderOrData = (value: any) => {
    if (value instanceof Array) return value.length > 0 ? value : "-";
    if (typeof value === "string") return value === "" ? "-" : value;
    if (value !== undefined) return value;
    return "-";
};
