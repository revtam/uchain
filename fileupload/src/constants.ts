const PORT: string = process.env.PORT || "3000";
const LOCAL_DIRECTORY: string = process.env.LOCAL_DIRECTORY || "files";
const MAX_FILE_SIZE: number = Number(process.env.MAX_FILE_SIZE) || 10485760;
const MAX_FILES_NUMBER: number = Number(process.env.MAX_FILES_NUMBER) || 10;
const FORM_FIELD_NAME: string = process.env.FORM_FIELD_NAME || "file";
const FILES_ENDPOINT: string = process.env.FILES_ENDPOINT || "/files";
const UPLOAD_ENDPOINT: string = process.env.UPLOAD_ENDPOINT || "/uploads";
const NODE_ENV: string = process.env.NODE_ENV || "development";

export {
    PORT,
    LOCAL_DIRECTORY,
    MAX_FILE_SIZE,
    MAX_FILES_NUMBER,
    FORM_FIELD_NAME,
    FILES_ENDPOINT,
    UPLOAD_ENDPOINT,
    NODE_ENV
}