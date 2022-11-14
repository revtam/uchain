const crypto = require("crypto");
require("dotenv").config();
const multer = require("multer");
const path = require("path");


const DIRECTORY = path.join(__dirname, process.env.LOCAL_DIRECTORY || "files");

/**
 * Generates hash fingerprint from file using the MD5 algorithm
 */
const generateFileHash = (stream) => new Promise((resolve, reject) => {
	const hash = crypto.createHash('md5')
	stream.on('error', reject)
	stream.on('data', chunk => hash.update(chunk))
	stream.on('end', () => resolve(hash.digest('hex')))
})

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, DIRECTORY);
    },
    filename: (request, file, callback) => {
        fileExtension = path.extname(file.originalname)
        generateFileHash(file.stream).then(fileHash => {
            callback(null, fileHash + fileExtension);
        })
    },
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: Number(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024,
        files: Number(process.env.MAX_FILES_NUMBER) || 10
    }
});

const uploadMultipleFiles = upload.fields([{ name: process.env.FORM_FIELD_NAME || "file" }])


exports.uploadMultipleFiles = uploadMultipleFiles
exports.DIRECTORY = DIRECTORY