require("dotenv").config();
const express = require("express");
const multer = require("multer");
const path = require("path");

const { uploadMultipleFiles } = require("./fileUpload.js")


const PORT = process.env.PORT || 3000;

router = express.Router()

router.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, '/index.html'));
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
router.post(process.env.UPLOAD_ENDPOINT || "/uploads", (request, response) => {
    uploadMultipleFiles(request, response, error => {
        if (error instanceof multer.MulterError) {
            response.status(400)
            response.send({
                "message": error.message
            })
        } else if (!error) {
            if (!request.files || !request.files.file || !request.files.file.length) {
                response.status(400)
                response.send({
                    "message": "No file sent"
                })
                return
            }
            const urls = request.files.file.map(file => 
                `${process.env.HOST_URL || "http://localhost:3000"}${process.env.FILES_ENDPOINT || "/files"}/${file.filename}`)
            response.status(200)
            response.send({
                "urls": urls
            });
        }
    })
})


module.exports = router