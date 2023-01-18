import { Button } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import React from "react";
import { useCallback, useState } from "react";
import {} from "../../../hooks/common/commonHooks";
import { usePerformanceControllerContract } from "../../../hooks/contract/contractHooks";
import useErrorStore from "../../../hooks/error/errorHooks";
import { alertError } from "../../../utils/contract/contractUtils";
import LoadingBox from "../../LoadingBox";

export interface UpdatePerformancesButtonProps {
    courseId: string;
}

const UpdatePerformancesButton: React.FunctionComponent<UpdatePerformancesButtonProps> = ({
    courseId,
}: UpdatePerformancesButtonProps) => {
    const { setErrorMessage } = useErrorStore();
    const performanceControllerContract = usePerformanceControllerContract();

    const [sendDisabled, setSendDisabled] = useState<boolean>(false);

    const updatePerformances = useCallback(() => {
        if (!performanceControllerContract) return;
        setSendDisabled(true);
        alertError(
            () => performanceControllerContract.updateCourseParticipantPerformances(courseId),
            setErrorMessage
        ).finally(() => setSendDisabled(false));
    }, [performanceControllerContract]);

    return (
        <Tooltip
            title={
                "Perform automatic evaluation of missed submissions, not attended exams and grading for course participants if the data is complete."
            }
        >
            <Button
                color={"primary"}
                variant="contained"
                sx={{ py: 1, px: 4, fontWeight: 600 }}
                onClick={updatePerformances}
                disabled={sendDisabled}
            >
                {sendDisabled ? <LoadingBox /> : "Update performances"}
            </Button>
        </Tooltip>
    );
};

export default UpdatePerformancesButton;
