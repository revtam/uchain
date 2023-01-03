import {
    NoEthereumProviderError,
    UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import { UnsupportedChainIdError } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

export const getLibrary = (provider: any): Web3Provider => {
    const library = new Web3Provider(provider);
    library.pollingInterval = 12000;
    return library;
};

export const getErrorMessage = (error: Error): string => {
    if (error instanceof NoEthereumProviderError) {
        return "No Metamask detected";
    } else if (error instanceof UnsupportedChainIdError) {
        return "Wrong network";
    } else if (error instanceof UserRejectedRequestErrorInjected) {
        return "Rejected request";
    }
    console.error(error);
    return "Unknown error";
};
