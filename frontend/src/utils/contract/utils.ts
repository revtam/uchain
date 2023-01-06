import { getAddress } from "@ethersproject/address";
import { AddressZero } from "@ethersproject/constants";
import { type JsonRpcProvider, type JsonRpcSigner } from "@ethersproject/providers";
import { Contract, ContractReceipt, ContractTransaction } from "@ethersproject/contracts";
import { ErrorMessageSetter } from "../../hooks/error/types";

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

/**
 * Signals rerender upon successful state-changing transaction completion.
 * Calls 'alertOutError' on errors.
 * Does not handle the error the contract throws.
 * @param contractCall The contract call with its arguments (ideally wrapped in an arrow function)
 * @param setError The function that sets the error message for the alert popup
 * @param rerender The function that forces rerender in the caller component
 * @returns Whatever the awaited promise returns
 */
export const rerenderOnTransactionCompletion = async (
    contractCall: () => Promise<ContractTransaction>,
    setError: ErrorMessageSetter,
    rerender: () => void
): Promise<ContractReceipt> => {
    try {
        const receipt = await alertError((await contractCall()).wait, setError);
        rerender();
        return receipt;
    } catch (error: any) {
        setError(error.reason);
        throw error;
    }
};
