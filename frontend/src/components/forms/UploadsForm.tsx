import React, { useCallback, useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { convertToFiles } from "../../utils/converter/basicConverter";
import Typography from "@mui/material/Typography";

export interface UploadsFormProps {
    setSelectedFiles: (files: File[]) => void;
}

const UploadsForm: React.FunctionComponent<UploadsFormProps> = ({ setSelectedFiles }: UploadsFormProps) => {
    const [files, setFiles] = useState<File[]>([]);

    useEffect(() => {
        if (files.length > 0) setSelectedFiles(files);
    }, [files]);

    return (
        <React.Fragment>
            <Button
                component="label"
                color={"primary"}
                variant="outlined"
                sx={{ py: 1, px: 2, fontWeight: 400, alignSelf: "baseline" }}
            >
                Select
                <input
                    type="file"
                    multiple
                    hidden
                    onChange={(e) => setFiles(convertToFiles(e.target.files))}
                />
            </Button>
            {files.length > 0 && (
                <Box>
                    <Typography>Selected files:</Typography>
                    {files.map((file, index) => (
                        <Typography key={index}>{file.name}</Typography>
                    ))}
                </Box>
            )}
        </React.Fragment>
    );
};

export default UploadsForm;
