import express from "express";
import { MulterError } from "multer";
import path from "path";

import { UPLOAD_ENDPOINT } from "./constants";
import logger from "./logger";
import uploadMultipleFiles from "./fileUpload";
import { ErrorResponse, SuccessResponse } from "./types";

const router = express.Router();

router.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, "..", "public/index.html"));
});

/**
 * Returns json
 * if failed upload:
 *      status: 400
 *      ErrorResponse
 * if upload successful:
 *      status: 200
 *      SuccessResponse
 */
router.post(UPLOAD_ENDPOINT, (request, response) => {
    uploadMultipleFiles(request, response, (error) => {
        if (error instanceof MulterError) {
            response.status(400);
            response.send({
                message: error.message,
            } as ErrorResponse);
        } else if (!error) {
            if (!request.files || !request.files.length) {
                response.status(400);
                response.send({
                    message: "No file sent",
                } as ErrorResponse);
                return;
            }
            const files = request.files as Express.Multer.File[];
            const hashes = files.map((file: Express.Multer.File) => file.filename);
            logger.info(`Generated hashes (${hashes.length}): ${hashes}`);
            response.status(200);
            response.send({
                hashes: hashes,
            } as SuccessResponse);
        }
    });
});

export default router;
