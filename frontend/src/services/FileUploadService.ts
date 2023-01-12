import axios from "axios";
import { FILEDOWNLOAD_ENDPOINT, FILESERVER_BASE_URL, FILEUPLOAD_ENDPOINT } from "../constants/constants";

class FileUploadService {
    upload(files: File[]) {
        const formData = new FormData();
        files.forEach((file: File) => {
            formData.append("file", file);
        });

        return axios.post(`${FILESERVER_BASE_URL}/${FILEUPLOAD_ENDPOINT}`, formData);
    }
    getDownloadUrl(documentHash: string) {
        return `${FILESERVER_BASE_URL}/${FILEDOWNLOAD_ENDPOINT}/${documentHash}`;
    }
}

export default FileUploadService;
