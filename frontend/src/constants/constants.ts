import { ContractAddresses } from "../contracts/abiTypes";
import addressesJson from "../contracts/imports/addresses.json";

export const PORT: string = process.env.PORT || "3000";
export const CHAIN_ID: number = Number(process.env.CHAIN_ID) || 8105;
export const NODE_ENV: string = process.env.NODE_ENV || "development";
export const NETWORK = {
    chainName: "uchain",
    chainId: CHAIN_ID,
    nativeCurrency: { name: "UTOKEN", decimals: 18, symbol: "UTOKEN" },
    rpcUrls: ["http://localhost:8545"],
};
export const ADDRESSES: ContractAddresses = addressesJson;
