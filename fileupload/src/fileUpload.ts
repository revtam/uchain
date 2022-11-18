import crypto from "crypto";
import multer from "multer";
import { Readable } from "node:stream";
import path from "path";

import { LOCAL_DIRECTORY, MAX_FILES_NUMBER, MAX_FILE_SIZE, FORM_FIELD_NAME } from "./constants";


export const DIRECTORY = path.join(__dirname, "..", LOCAL_DIRECTORY);

/**
 * Generates hash fingerprint from file using the MD5 algorithm.
 * The same file with the same filename produces the same hash value,
 * otherwise the hash values differ.
 */
const generateFileHash = (filename: string, stream: Readable) => new Promise((resolve, reject) => {
    const hash = crypto.createHash('md5');
    hash.write(filename);
    stream.on('error', reject);
    stream.on('data', chunk => hash.update(chunk));
    stream.on('end', () => resolve(hash.digest('hex')));
})

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, DIRECTORY);
    },
    filename: (request, file, callback) => {
        const fileExtension = path.extname(file.originalname);
        generateFileHash(file.originalname, file.stream).then(fileHash => {
            callback(null, fileHash + fileExtension);
        });
    },
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: MAX_FILE_SIZE,
        files: MAX_FILES_NUMBER
    }
});

const uploadMultipleFiles = upload.array(FORM_FIELD_NAME);

export default uploadMultipleFiles;