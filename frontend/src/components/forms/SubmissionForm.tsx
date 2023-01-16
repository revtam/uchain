import React, { useCallback, useMemo, useState } from "react";
import { usePerformanceControllerContract } from "../../hooks/contract/contractHooks";
import { Button, Stack } from "@mui/material";
import { alertError, alertErrorRerenderTransactionCall } from "../../utils/contract/contractUtils";
import useErrorStore from "../../hooks/error/errorHooks";
import UploadsForm from "./UploadsForm";
import LoadingBox from "../LoadingBox";
import FileUploadService from "../../services/FileUploadService";
import { UploadSuccessResponse } from "../../utils/converter/server-types/payloadTypes";

export interface SubmissionFormProps {
    assessmentId: string;
    rerender?: () => void;
}

const SubmissionForm: React.FunctionComponent<SubmissionFormProps> = ({
    assessmentId,
    rerender = () => {},
}: SubmissionFormProps) => {
    const { setErrorMessage } = useErrorStore();

    const performanceControllerContract = usePerformanceControllerContract();

    const [selectedFiles, setSelectedFiles] = useState<File[] | undefined>(undefined);
    const [sendDisabled, setSendDisabled] = useState<boolean>(false);

    const uploader = useMemo(() => {
        return new FileUploadService();
    }, []);

    const handleSave = useCallback(async () => {
        if (!performanceControllerContract) {
            return;
        }
        if (!selectedFiles || !selectedFiles.length) {
            setErrorMessage("at least one file should be selected before uploading");
            return;
        }
        setSendDisabled(true);
        const response: UploadSuccessResponse = (
            await alertError(() => uploader.upload(selectedFiles), setErrorMessage)
        ).data;
        alertErrorRerenderTransactionCall(
            () => performanceControllerContract.addSubmission(assessmentId, response.hashes),
            rerender,
            setErrorMessage
        ).finally(() => setSendDisabled(false));
    }, [performanceControllerContract, selectedFiles, uploader]);

    return (
        <React.Fragment>
            <UploadsForm setSelectedFiles={setSelectedFiles} />
            <Button
                color={"secondary"}
                variant="contained"
                sx={{ mt: 2, py: 1, px: 4, fontWeight: 600, alignSelf: "baseline" }}
                disabled={!selectedFiles || sendDisabled}
                onClick={() => handleSave()}
            >
                {sendDisabled ? <LoadingBox /> : "Save"}
            </Button>
        </React.Fragment>
    );
};

export default SubmissionForm;
