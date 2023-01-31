import { Button, Stack } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import React, { useEffect } from "react";
import { useCallback, useState } from "react";
import { usePerformanceControllerContract } from "../../../hooks/contract/contractHooks";
import useErrorStore from "../../../hooks/error/errorHooks";
import { alertErrorTransactionCall } from "../../../utils/contract/contractUtils";
import LoadingBox from "../../LoadingBox";
import InfoIcon from "@mui/icons-material/Info";
import { variables } from "../../../theme/theme";

export interface UpdatePerformancesButtonProps {
    courseId: string;
}

const UpdatePerformancesButton: React.FunctionComponent<UpdatePerformancesButtonProps> = ({
    courseId,
}: UpdatePerformancesButtonProps) => {
    const { setErrorMessage } = useErrorStore();
    const performanceControllerContract = usePerformanceControllerContract();

    const [waitingTx, setWaitingTx] = useState<boolean>(false);
    const [promptReload, setPromptReload] = useState<boolean>(false);

    useEffect(() => {
        const handlePageReload = () => setPromptReload(false);
        window.addEventListener("beforeunload", handlePageReload);
        return () => {
            window.removeEventListener("beforeunload", handlePageReload);
        };
    }, []);

    const updatePerformances = useCallback(() => {
        if (!performanceControllerContract) return;
        setWaitingTx(true);
        alertErrorTransactionCall(
            () => performanceControllerContract.updateCourseParticipantPerformances(courseId),
            setErrorMessage
        )
            .then(() => setPromptReload(true))
            .finally(() => setWaitingTx(false));
    }, [performanceControllerContract]);

    return (
        <Stack direction={"row"} alignItems="center" spacing={1}>
            <Button
                color={promptReload ? "secondary" : "primary"}
                variant="contained"
                sx={{ py: 1, px: 4, fontWeight: 600 }}
                onClick={promptReload ? () => window.location.reload() : updatePerformances}
                disabled={waitingTx}
            >
                {waitingTx ? <LoadingBox /> : promptReload ? "Refresh page" : "Update performances"}
            </Button>
            <Tooltip
                title={
                    "Perform automatic evaluation of missed submissions, not attended exams and grading for course participants if the data is complete."
                }
            >
                <InfoIcon htmlColor={variables.primary} />
            </Tooltip>
        </Stack>
    );
};

export default UpdatePerformancesButton;
