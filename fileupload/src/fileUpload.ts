import crypto from "crypto";
import multer from "multer";
import path from "path";

import { LOCAL_DIRECTORY, MAX_FILES_NUMBER, MAX_FILE_SIZE } from "./constants";

export const DIRECTORY = path.join(__dirname, "..", LOCAL_DIRECTORY);

/**
 * Generates hash fingerprint from file using the MD5 algorithm.
 * File original name and current time is used to calculate the hash.
 */
const generateFileHash = (file: Express.Multer.File) => {
    const hash = crypto.createHash("md5");
    hash.write(file.originalname);
    const time = new Date();
    hash.write(time.getTime().toString());
    return hash.digest("hex");
};

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, DIRECTORY);
    },
    filename: async (request, file, callback) => {
        const fileExtension = path.extname(file.originalname);
        callback(null, generateFileHash(file) + fileExtension);
    },
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: MAX_FILE_SIZE,
        files: MAX_FILES_NUMBER,
    },
});

const uploadMultipleFiles = upload.array("file");

export default uploadMultipleFiles;
