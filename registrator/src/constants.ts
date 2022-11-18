import fs from 'fs';
import path from 'path';


const checkIfVariableSet = (variable: string, variableName: string) => {
    if (!variable) throw Error(`Env. variable ${variableName} must be set`);
}

const PORT: string = process.env.PORT || "3000";
const LOCAL_DIRECTORY: string = process.env.LOCAL_DIRECTORY || "files";
const MAX_FILE_SIZE: number = Number(process.env.MAX_FILE_SIZE) || 10485760;
const MAX_FILES_NUMBER: number = Number(process.env.MAX_FILES_NUMBER) || 10;
const FORM_FIELD_NAME: string = process.env.FORM_FIELD_NAME || "file";
const FILES_ENDPOINT: string = process.env.FILES_ENDPOINT || "/files";
const UPLOAD_ENDPOINT: string = process.env.UPLOAD_ENDPOINT || "/uploads";
const NODE_ENV: string = process.env.NODE_ENV || "development";

const REGISTRATOR_CONTRACT_ADDRESS: string = process.env.REG_CONTRACT_ADDRESS || "";
checkIfVariableSet(REGISTRATOR_CONTRACT_ADDRESS, Object.keys({REGISTRATOR_CONTRACT_ADDRESS})[0]);

let SERVER_WALLET_PRIVATE_KEY: string = "";
try {
    const privatKeyFile = fs.readFileSync(path.join(__dirname, "..", "secrets/privatekey.txt"));
    SERVER_WALLET_PRIVATE_KEY = privatKeyFile.toString();
} catch(error) {
    console.log(error);
}
checkIfVariableSet(SERVER_WALLET_PRIVATE_KEY, Object.keys({SERVER_WALLET_PRIVATE_KEY})[0]);


export {
    PORT,
    LOCAL_DIRECTORY,
    MAX_FILE_SIZE,
    MAX_FILES_NUMBER,
    FORM_FIELD_NAME,
    FILES_ENDPOINT,
    UPLOAD_ENDPOINT,
    NODE_ENV,
    REGISTRATOR_CONTRACT_ADDRESS,
    SERVER_WALLET_PRIVATE_KEY
}