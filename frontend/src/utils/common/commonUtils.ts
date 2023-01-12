import { FunctionComponent } from "react";
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

// export type propType<F extends FunctionComponent> = React.ComponentProps<F>;

export const bindProps: <PropSetByChild, AdditionalProps>(
    functionComponent: FunctionComponent<PropSetByChild & AdditionalProps>,
    props: AdditionalProps
) => FunctionComponent<PropSetByChild & AdditionalProps> = (functionComponent, props) =>
    functionComponent.bind(props);
