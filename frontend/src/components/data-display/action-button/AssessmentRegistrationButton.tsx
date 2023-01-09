import { Button } from "@mui/material";
import React, { useMemo } from "react";
import { useCallback, useEffect, useState } from "react";
import { useRerender } from "../../../hooks/common/commonHooks";
import { useCourseControllerContract, useCourseViewContract } from "../../../hooks/contract/contractHooks";
import useErrorStore from "../../../hooks/error/errorHooks";
import { alertError, alertErrorRerenderTransactionCall } from "../../../utils/contract/contractUtils";
import LoadingBox from "../../LoadingBox";

export interface AssessmentRegistrationButtonProps {
    assessmentId: string;
}

const AssessmentRegistrationButton: React.FunctionComponent<AssessmentRegistrationButtonProps> = ({
    assessmentId,
}: AssessmentRegistrationButtonProps) => {
    const { setErrorMessage } = useErrorStore();
    const courseControllerContract = useCourseControllerContract();
    const courseViewContract = useCourseViewContract();
    const { renderState, updateRenderState } = useRerender();

    const [alreadyRegistered, setAlreadyRegistered] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        (async () => {
            if (courseViewContract) {
                setAlreadyRegistered(
                    await alertError(
                        () => courseViewContract.isRegisteredToAssesssment(assessmentId),
                        setErrorMessage
                    )
                );
            }
        })();
    }, [courseViewContract, renderState]);

    const registerToAssessment = useCallback(async () => {
        if (courseControllerContract)
            await alertErrorRerenderTransactionCall(
                () => courseControllerContract.registerToAssessment(assessmentId),
                updateRenderState,
                setErrorMessage
            );
    }, [courseControllerContract]);

    const deregisterFromAssessment = useCallback(async () => {
        if (courseControllerContract)
            await alertErrorRerenderTransactionCall(
                () => courseControllerContract.deregisterFromAssessment(assessmentId),
                updateRenderState,
                setErrorMessage
            );
    }, [courseControllerContract]);

    const handleClick = useCallback(() => {
        if (alreadyRegistered) {
            return deregisterFromAssessment();
        }
        return registerToAssessment();
    }, [alreadyRegistered]);

    const buttonText = useMemo(() => {
        if (alreadyRegistered === undefined) return <LoadingBox fullSize={false} />;
        if (alreadyRegistered) {
            return "Deregister";
        }
        return "Register";
    }, [alreadyRegistered]);

    return (
        <Button
            color={"secondary"}
            variant="contained"
            sx={{ py: 1, px: 3, fontWeight: 600 }}
            onClick={handleClick}
            disabled={alreadyRegistered === undefined}
        >
            {buttonText}
        </Button>
    );
};

export default AssessmentRegistrationButton;
