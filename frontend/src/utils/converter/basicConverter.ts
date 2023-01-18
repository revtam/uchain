import { BigNumber } from "ethers";
import { PERCENTAGE_DECIMAL_PRECISION } from "../../constants/constants";
import { DateOfBirthResponse } from "../../imports/ethereum-abi-types/UserView";
import { Date as ContractDate } from "../../types/contract-types/structs";

export const convertToDateInternal = (date: DateOfBirthResponse): Date => {
    const _date = new Date();
    _date.setDate(Number(date.day));
    _date.setMonth(Number(date.month) - 1);
    _date.setFullYear(Number(date.year));
    return _date;
};

export const convertSecondsToDateInternal = (datetimeInSec: BigNumber): Date => {
    return new Date(datetimeInSec.toNumber() * 1000);
};

export const convertSecondsToOptionalDateInternal = (datetimeInSec: BigNumber): Date | undefined => {
    return datetimeInSec.toNumber() === 0 ? undefined : convertSecondsToDateInternal(datetimeInSec);
};

export const convertDateToSeconds = (date: Date): number => {
    return Math.floor(date.getTime() / 1000);
};

export const convertDateToOptionalSeconds = (date: Date | undefined): number => {
    return date ? convertDateToSeconds(date) : 0;
};

export const convertToDateExternal = (date: Date): ContractDate => ({
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
});

export const convertToPercentage = (percentage: number) => percentage / 10 ** PERCENTAGE_DECIMAL_PRECISION;

export const convertToContractPercentage = (percentage: number) =>
    Math.floor(percentage * 10 ** PERCENTAGE_DECIMAL_PRECISION);

export const convertToFiles = (fileList: FileList | null): File[] => {
    if (!fileList) return [];
    const _files = [];
    for (let i = 0; i < fileList.length; ++i) {
        _files.push(fileList[i]);
    }
    return _files;
};
