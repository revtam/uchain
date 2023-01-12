export const PORT: string = process.env.PORT || "3000";
export const LOCAL_DIRECTORY: string = process.env.LOCAL_DIRECTORY || "files";
export const MAX_FILE_SIZE: number = Number(process.env.MAX_FILE_SIZE) || 10485760;
export const MAX_FILES_NUMBER: number = Number(process.env.MAX_FILES_NUMBER) || 10;
export const FORM_FIELD_NAME: string = process.env.FORM_FIELD_NAME || "file";
export const FILES_ENDPOINT: string = process.env.FILES_ENDPOINT || "/files";
export const UPLOAD_ENDPOINT: string = process.env.UPLOAD_ENDPOINT || "/uploads";
export const NODE_ENV: string = process.env.NODE_ENV || "development";
