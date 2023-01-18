import fs from "fs";
import path from "path";
import addressesJson from "../imports/addresses.json";
import { AddressType } from "./types";

export const PORT: string = process.env.PORT || "3000";
export const NODE_ENV: string = process.env.NODE_ENV || "development";
export const RPC_NODE_URL: string = process.env.RPC_NODE_URL || "http://localhost:8545";
export const REGISTRATION_ENDPOINT: string = process.env.REGISTRATION_ENDPOINT || "/registration";
export const USERCONTROLLER_CONTRACT_ADDRESS: string =
    process.env.USERCONTROLLER_CONTRACT_ADDRESS || (addressesJson as AddressType).userController;

export let SERVER_WALLET_PRIVATE_KEY: string = "";
try {
    const privatKeyFile = fs.readFileSync(path.join(__dirname, "..", process.env.PRIVATE_KEY_FILE || ""));
    SERVER_WALLET_PRIVATE_KEY = privatKeyFile.toString();
} catch (error) {
    console.log(error);
}
