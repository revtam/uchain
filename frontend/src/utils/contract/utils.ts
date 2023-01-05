import { getAddress } from "@ethersproject/address";
import { AddressZero } from "@ethersproject/constants";
import { type JsonRpcProvider, type JsonRpcSigner } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";

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
 * Helps to initiate the error alert popup upon contract call errors.
 * Does not handle the error the contract throws.
 * @param callMethod The contract method with its arguments (ideally wrapped in an arrow function)
 * @param setError The function that sets the error message for the alert popup
 * @returns Whatever the contract call returns
 */
export const alertOutContractCallError = async (
    callMethod: () => any,
    setError: (message: string) => void
): Promise<any> => {
    try {
        return await callMethod();
    } catch (error: any) {
        setError(error.reason);
        throw error;
    }
};
