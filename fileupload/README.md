# File server

Server that handles file uploads, file storage and retrieval.
Multiple files can be uploaded at once and the files are stored on the disk.
Generates a name for the uploaded file by hashing the original file name and time of upload.

Endpoints:

-   `/uploads` POST: accepts files as form data
-   `/files/:filename` GET: retrieves the stored file at the specified file name

Response:

-   if upload successful: status 200 + list of generated file names (required for later file retrieval)
-   if upload failed: status 400 + error message

## How to run

Locally:

-   requires `npm` installation
-   `npm ci`: loads dependencies
-   `npm run build:dev`: creates bundled file into `./dist` using Webpack with development settings
-   `npm run serve:dev`: creates bundled file into `./dist` using Webpack with development settings, starts development server on port 8080 and rebundles and restarts upon file changes
-   `npm run build`: creates bundled file into `./dist` using Webpack with production settings
-   `npm run serve`: starts serving the bundled file on the in `.env` specified port (`http://localhost:3000` by default)

In containers:

-   `docker-compose up`

## Configuration

-   `./.env` (configured for running locally by default):

    -   `LOCAL_DIRECTORY`: the directory relative path for the file storage
    -   `MAX_FILE_SIZE`: max. size of an uploaded file
    -   `MAX_FILES_NUMBER`: max. number of uploaded files at once
    -   `FILES_ENDPOINT`: API endpoint which the stored files are available at
    -   `UPLOAD_ENDPOINT`: API endpoint that accepts the files for upload
    -   `PORT`: the port the server should be running on

-   `./docker-compose.yml`:
    -   uses the values from `.env`
    -   may override the following environment values set by `.env` to adapt the container to the project configuration:
        -   `PORT`
    -   the default network accepts an external network called `project-network` which can be used to share a network between multiple docker container projects
    -   the volume called `filestorage` stores the uploaded files between container startups by synchronizing with the directory `/app/files` of the fileserver's container
