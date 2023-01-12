import React, { useCallback, useMemo, useState } from "react";
import { Button, Stack } from "@mui/material";
import useErrorStore from "../../hooks/error/errorHooks";
import { convertToFiles } from "../../utils/converter/basicConverter";
import { UploadSuccessResponse } from "../../utils/converter/server-types/payloadTypes";
import LoadingBox from "../LoadingBox";
import FileUploadService from "../../services/FileUploadService";

export interface UploadsFormProps {
    setFileHashes: (hashes: string[]) => void;
}

const UploadsForm: React.FunctionComponent<UploadsFormProps> = ({ setFileHashes }: UploadsFormProps) => {
    const { setErrorMessage } = useErrorStore();

    const [files, setFiles] = useState<File[]>([]);
    const [uploading, setUploading] = useState<boolean>(false);

    const uploader = useMemo(() => {
        return new FileUploadService();
    }, []);

    const handleUpload = useCallback(
        (files: File[]) => {
            if (!files.length) {
                setErrorMessage("at least a file should be selected before uploading");
                return;
            }
            setUploading(true);
            uploader
                .upload(files)
                .then((response) => {
                    const data: UploadSuccessResponse = response.data;
                    setFileHashes(data.hashes);
                })
                .catch((error) => setErrorMessage(error.message))
                .finally(() => setUploading(false));
        },
        [uploader]
    );

    return (
        <Stack direction="row" alignItems="center" spacing={2}>
            <Button
                component="label"
                color={"darkGrey"}
                variant="outlined"
                sx={{ py: 1, px: 2, fontWeight: 400 }}
            >
                Select
                <input
                    type="file"
                    multiple
                    hidden
                    onChange={(e) => setFiles(convertToFiles(e.target.files))}
                />
            </Button>
            <Button
                color={"primary"}
                variant="outlined"
                sx={{ py: 1, px: 2, fontWeight: 400 }}
                disabled={uploading}
                onClick={() => handleUpload(files)}
            >
                {uploading ? <LoadingBox /> : "Upload"}
            </Button>
        </Stack>
    );
};

export default UploadsForm;
