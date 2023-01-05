export const trimString = (string: string, startLength: number, endLength: number): string => {
    return string.length > startLength + endLength
        ? string.substring(0, startLength) +
              "..." +
              string.substring(string.length - endLength, string.length)
        : string;
};
