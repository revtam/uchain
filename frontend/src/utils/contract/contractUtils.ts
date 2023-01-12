import { getAddress } from "@ethersproject/address";
import { AddressZero } from "@ethersproject/constants";
import { type JsonRpcProvider, type JsonRpcSigner } from "@ethersproject/providers";
import { Contract, ContractReceipt, ContractTransaction } from "@ethersproject/contracts";
import { ErrorMessageSetter } from "../../hooks/error/types";
import { rerenderOnReturn } from "../common/commonUtils";

export const isAddress = (value: any): boolean => {
    try {
        return getAddress(value.toLowerCase()) ? true : false;
    } catch {
        return false;
    }
};

const getSigner = (provider: JsonRpcProvider, account: string): JsonRpcSigner => {
    return provider.getSigner(account).connectUnchecked();
};

const getProviderOrSigner = (
    provider: JsonRpcProvider,
    account?: string
): JsonRpcProvider | JsonRpcSigner => {
    return account ? getSigner(provider, account) : provider;
};

export const getContract = (
    address: string,
    ABI: any,
    provider: JsonRpcProvider,
    account?: string
): Contract => {
    if (!isAddress(address) || address === AddressZero) {
        throw Error(`Invalid 'address' parameter '${address}'.`);
    }

    return new Contract(address, ABI, getProviderOrSigner(provider, account) as any);
};

/**
 * Helps to initiate the error alert popup upon async function call errors.
 * Does not handle the error the contract throws.
 * @param functionCall The function with its arguments (ideally wrapped in an arrow function)
 * @param setError The function that sets the error message for the alert popup
 * @returns Whatever the contract call returns
 */
export const alertError = async <T>(
    functionCall: () => Promise<T>,
    setError: ErrorMessageSetter
): Promise<T> => {
    try {
        return await functionCall();
    } catch (error: any) {
        setError(error.reason);
        throw error;
    }
};

export const handleTransactionCall = async (
    contractMethod: () => Promise<ContractTransaction>
): Promise<ContractReceipt> => {
    const tx = await contractMethod();
    return await tx.wait();
};

export const alertErrorTransactionCall = async (
    contractMethod: () => Promise<ContractTransaction>,
    setError: ErrorMessageSetter
): Promise<ContractReceipt> => {
    return await alertError(() => handleTransactionCall(contractMethod), setError);
};

export const alertErrorRerenderTransactionCall = async (
    contractMethod: () => Promise<ContractTransaction>,
    rerender: () => void,
    setError: ErrorMessageSetter
): Promise<ContractReceipt> => {
    return await alertError(
        () => rerenderOnReturn(() => handleTransactionCall(contractMethod), rerender),
        setError
    );
};
