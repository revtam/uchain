import React, { useCallback, useState } from "react";
import { usePerformanceControllerContract } from "../../hooks/contract/contractHooks";
import { Button, Stack } from "@mui/material";
import { alertErrorRerenderTransactionCall } from "../../utils/contract/contractUtils";
import useErrorStore from "../../hooks/error/errorHooks";
import UploadsForm from "./UploadsForm";

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

    const [fileHashes, setFileHashes] = useState<string[] | undefined>(undefined);
    const [sendDisabled, setSendDisabled] = useState<boolean>(false);

    const handleSave = useCallback(() => {
        if (!fileHashes || !performanceControllerContract) {
            return;
        }
        alertErrorRerenderTransactionCall(
            () => performanceControllerContract.addSubmission(assessmentId, fileHashes),
            rerender,
            setErrorMessage
        ).finally(() => setSendDisabled(false));
    }, [performanceControllerContract, fileHashes]);

    return (
        <Stack direction="row" alignItems="center" spacing={2}>
            <UploadsForm setFileHashes={setFileHashes} />
            <Button
                color={"secondary"}
                variant="contained"
                sx={{ py: 1, px: 4, fontWeight: 600 }}
                disabled={sendDisabled}
                onClick={() => handleSave()}
            >
                Save
            </Button>
        </Stack>
    );
};

export default SubmissionForm;
