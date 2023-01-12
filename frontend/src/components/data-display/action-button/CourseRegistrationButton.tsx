import { Button } from "@mui/material";
import React, { useMemo } from "react";
import { useCallback, useEffect, useState } from "react";
import { useRerender } from "../../../hooks/common/commonHooks";
import { useCourseControllerContract, useCourseViewContract } from "../../../hooks/contract/contractHooks";
import useErrorStore from "../../../hooks/error/errorHooks";
import { alertError, alertErrorRerenderTransactionCall } from "../../../utils/contract/contractUtils";
import LoadingBox from "../../LoadingBox";

export interface CourseRegistrationButtonProps {
    courseId: string;
}

const CourseRegistrationButton: React.FunctionComponent<CourseRegistrationButtonProps> = ({
    courseId,
}: CourseRegistrationButtonProps) => {
    const { setErrorMessage } = useErrorStore();
    const courseControllerContract = useCourseControllerContract();
    const courseViewContract = useCourseViewContract();
    const { renderState, updateRenderState } = useRerender();

    const [alreadyRegistered, setAlreadyRegistered] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        (async () => {
            if (courseViewContract) {
                setAlreadyRegistered(
                    await alertError(() => courseViewContract.isRegisteredAtCourse(courseId), setErrorMessage)
                );
            }
        })();
    }, [courseViewContract, renderState]);

    const registerToCourse = useCallback(async () => {
        if (courseControllerContract)
            await alertErrorRerenderTransactionCall(
                () => courseControllerContract.registerToCourse(courseId),
                updateRenderState,
                setErrorMessage
            );
    }, [courseControllerContract]);

    const deregisterFromCourse = useCallback(async () => {
        if (courseControllerContract)
            await alertErrorRerenderTransactionCall(
                () => courseControllerContract.deregisterFromCourse(courseId),
                updateRenderState,
                setErrorMessage
            );
    }, [courseControllerContract]);

    const handleClick = useCallback(() => {
        if (alreadyRegistered) {
            return deregisterFromCourse();
        }
        return registerToCourse();
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
            sx={{ py: 1, px: 4, fontWeight: 600 }}
            onClick={handleClick}
            disabled={alreadyRegistered || alreadyRegistered === undefined}
        >
            {buttonText}
        </Button>
    );
};

export default CourseRegistrationButton;
