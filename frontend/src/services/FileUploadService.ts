import axios from "axios";
import { FILESERVER_BASE_URL, FILEUPLOAD_ENDPOINT } from "../constants/constants";

class FileUploadService {
    upload(files: File[]) {
        const formData = new FormData();
        files.forEach((file: File) => {
            formData.append("file", file);
        });

        return axios.post(`${FILESERVER_BASE_URL}/${FILEUPLOAD_ENDPOINT}`, formData);
    }
}

export default FileUploadService;
