import React, { useCallback, useMemo, useState } from "react";
import { Stack } from "@mui/material";
import { FormContainer, SelectElement, useForm } from "react-hook-form-mui";
import { alertErrorRerenderTransactionCall } from "../../utils/contract/contractUtils";
import useErrorStore from "../../hooks/error/errorHooks";
import { usePerformanceControllerContract } from "../../hooks/contract/contractHooks";
import { SelectOption } from "../../utils/common/commonTypes";
import SubmitButton from "../data-display/action-button/SubmitButton";

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
    const formContext = useForm<{ attendanceInput: number }>({});
    const performanceControllerContract = usePerformanceControllerContract();

    const [sendDisabled, setSendDisabled] = useState<boolean>(false);

    const handleAttendaceConfirmation = useCallback(
        (attendanceInput: number) => {
            setSendDisabled(true);
            alertErrorRerenderTransactionCall(
                () =>
                    performanceControllerContract.administerExamAttendance(
                        studentId,
                        assessmentId,
                        !!attendanceInput
                    ),
                rerender,
                setErrorMessage
            ).finally(() => setSendDisabled(false));
        },
        [performanceControllerContract]
    );

    const options: SelectOption[] = useMemo(
        () => [
            { id: 1, label: "Attended" },
            { id: 0, label: "Not attended" },
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
                <SubmitButton text={"Confirm"} disabled={sendDisabled} />
            </Stack>
        </FormContainer>
    );
};

export default AttendanceForm;
