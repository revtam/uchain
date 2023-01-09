import { BigNumber } from "ethers";
import { DateOfBirthResponse } from "../../contracts/imports/ethereum-abi-types/UserView";
import { Date as ContractDate } from "./contract-types/structs";

export const convertToDateInternal = (date: DateOfBirthResponse): Date => {
    const _date = new Date();
    _date.setDate(Number(date.day));
    _date.setMonth(Number(date.month) - 1);
    _date.setFullYear(Number(date.year));
    return _date;
};

export const convertMillisecondsToDateInternal = (datetimeInMs: number | BigNumber): Date => {
    return new Date(Number(datetimeInMs));
};

export const convertToContractDate = (date: Date): ContractDate => ({
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
});

export const convertToPercentage = (percentageWith4Digits: number) => percentageWith4Digits / 100;
