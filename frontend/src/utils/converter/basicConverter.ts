import { BigNumber } from "ethers";
import { PERCENTAGE_DECIMAL_PRECISION } from "../../constants/constants";
import { DateOfBirthResponse } from "../../imports/ethereum-abi-types/UserView";
import { Date as ContractDate } from "./contract-types/structs";

export const convertToDateInternal = (date: DateOfBirthResponse): Date => {
    const _date = new Date();
    _date.setDate(Number(date.day));
    _date.setMonth(Number(date.month) - 1);
    _date.setFullYear(Number(date.year));
    return _date;
};

export const convertMillisecondsToDateInternal = (datetimeInMs: BigNumber): Date => {
    return new Date(datetimeInMs.toNumber());
};

export const convertMillisecondsToOptionalDateInternal = (datetimeInMs: BigNumber): Date | undefined => {
    return datetimeInMs.toNumber() === 0 ? undefined : convertMillisecondsToDateInternal(datetimeInMs);
};

export const convertDateToMilliseconds = (date: Date): number => {
    return date.getTime();
};

export const convertDateToOptionalMilliseconds = (date: Date | undefined): number => {
    return date ? convertDateToMilliseconds(date) : 0;
};

export const convertToDateExternal = (date: Date): ContractDate => ({
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
});

export const convertToPercentage = (percentage: number) => percentage / 10 ** PERCENTAGE_DECIMAL_PRECISION;

export const convertToContractPercentage = (percentage: number) =>
    parseInt((percentage * 10 ** PERCENTAGE_DECIMAL_PRECISION).toString());

export const convertToFiles = (fileList: FileList | null): File[] => {
    if (!fileList) return [];
    const _files = [];
    for (let i = 0; i < fileList.length; ++i) {
        _files.push(fileList[i]);
    }
    return _files;
};
