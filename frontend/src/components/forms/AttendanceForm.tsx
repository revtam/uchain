import React, { useCallback, useMemo, useState } from "react";
import { Button, Stack } from "@mui/material";
import { FormContainer, SelectElement, useForm } from "react-hook-form-mui";
import { alertErrorRerenderTransactionCall } from "../../utils/contract/contractUtils";
import useErrorStore from "../../hooks/error/errorHooks";
import { usePerformanceControllerContract } from "../../hooks/contract/contractHooks";
import { variables } from "../../theme/theme";
import { SelectOption } from "../../utils/common/commonTypes";
import LoadingBox from "../LoadingBox";

export interface AttendanceFormProps {
    assessmentId: string;
    studentId: string;
    rerender?: () => void;
}

const AttendanceForm: React.FunctionComponent<AttendanceFormProps> = ({
    assessmentId,
    studentId,
    rerender = () => {},
}: AttendanceFormProps) => {
    const { setErrorMessage } = useErrorStore();
    const formContext = useForm<{ attendanceInput: boolean }>({});
    const performanceControllerContract = usePerformanceControllerContract();

    const [sendDisabled, setSendDisabled] = useState<boolean>(false);

    const handleAttendaceConfirmation = useCallback(
        (attendanceInput: boolean) => {
            setSendDisabled(true);
            alertErrorRerenderTransactionCall(
                () =>
                    performanceControllerContract.administerExamAttendance(
                        studentId,
                        assessmentId,
                        attendanceInput
                    ),
                rerender,
                setErrorMessage
            ).finally(() => setSendDisabled(false));
        },
        [performanceControllerContract]
    );

    const options: SelectOption[] = useMemo(
        () => [
            { id: true, label: "Attended" },
            { id: false, label: "Not attended" },
        ],
        []
    );

    return (
        <FormContainer
            formContext={formContext}
            onSuccess={(data) => handleAttendaceConfirmation(data.attendanceInput)}
        >
            <Stack spacing={2}>
                <SelectElement
                    name={formContext.register("attendanceInput").name}
                    label={"Attendance status"}
                    options={options}
                    required
                />
                <Button
                    type={"submit"}
                    color="secondary"
                    sx={{ color: variables.white }}
                    disabled={sendDisabled}
                >
                    {sendDisabled ? <LoadingBox /> : "Confirm"}
                </Button>
            </Stack>
        </FormContainer>
    );
};

export default AttendanceForm;
