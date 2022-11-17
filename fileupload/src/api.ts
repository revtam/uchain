import express from "express";
import { MulterError } from "multer";
import path from "path";

import { LOCAL_DIRECTORY, UPLOAD_ENDPOINT } from "./constants";
import logger from "./logger";
import uploadMultipleFiles from "./fileUpload";


const router = express.Router();

router.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, "..", "public/index.html"));
});

/**
 * Returns json
 * if failed upload:
 *      status: 400
 *      {
 *          "message": "error message"
 *      }
 * if upload successful:
 *      status: 200
 *      {
 *          "urls": [
 *              "uploaded file url"
 *          ]
 *      }
 */
router.post(UPLOAD_ENDPOINT, (request, response) => {
    uploadMultipleFiles(request, response, error => {
        if (error instanceof MulterError) {
            response.status(400);
            response.send({
                "message": error.message
            });
        } else if (!error) {
            if (!request.files || !request.files.length) {
                response.status(400);
                response.send({
                    "message": "No file sent"
                });
                return;
            }
            const files = request.files as Express.Multer.File[];
            const urls = files.map((file: Express.Multer.File) => `/${LOCAL_DIRECTORY}/${file.filename}`);
            logger.info(`Generated urls (${urls.length}): ${urls}`);
            response.status(200);
            response.send({
                "urls": urls
            });
        }
    })
})


export default router;