import React, { useCallback, useState } from "react";
import { Button, Stack } from "@mui/material";
import { FormContainer, SelectElement, TextFieldElement, useForm } from "react-hook-form-mui";
import { Course } from "../../types/internal-types/internalTypes";
import { alertErrorRerenderTransactionCall } from "../../utils/contract/contractUtils";
import useErrorStore from "../../hooks/error/errorHooks";
import { usePerformanceControllerContract } from "../../hooks/contract/contractHooks";
import { variables } from "../../theme/theme";
import { transformArrayIntoOptions } from "../../utils/converter/optionConverter";
import SubmitButton from "../data-display/action-button/SubmitButton";

export interface GradingFormProps {
    course: Course;
    studentId: string;
    rerender?: () => void;
}

const GradingForm: React.FunctionComponent<GradingFormProps> = ({
    course,
    studentId,
    rerender = () => {},
}: GradingFormProps) => {
    const { setErrorMessage } = useErrorStore();
    const formContext = useForm<{ gradeInput: number; feedbackInput: string }>({
        defaultValues: { feedbackInput: "" },
    });
    const performanceControllerContract = usePerformanceControllerContract();

    const [editOpen, setEditOpen] = useState<boolean>(false);
    const [sendDisabled, setSendDisabled] = useState<boolean>(false);

    const handleGrade = useCallback(
        (gradeInput: number, feedbackInput: string) => {
            setSendDisabled(true);
            alertErrorRerenderTransactionCall(
                () =>
                    performanceControllerContract.giveFinalGrade(
                        studentId,
                        course.id,
                        gradeInput,
                        feedbackInput
                    ),
                rerender,
                setErrorMessage
            )
                .then(() => setEditOpen(false))
                .finally(() => setSendDisabled(false));
        },
        [performanceControllerContract]
    );

    return (
        <FormContainer
            formContext={formContext}
            onSuccess={(data) => handleGrade(data.gradeInput, data.feedbackInput)}
        >
            {editOpen ? (
                <Stack direction={"row"} spacing={1}>
                    <Button
                        variant="outlined"
                        color="secondary"
                        sx={{ color: variables.secondary }}
                        onClick={() => setEditOpen(false)}
                    >
                        Close
                    </Button>
                    <SubmitButton text={"Save"} disabled={sendDisabled} />
                </Stack>
            ) : (
                <Button
                    variant="outlined"
                    color="secondary"
                    sx={{ color: variables.secondary }}
                    onClick={() => setEditOpen(true)}
                >
                    Edit
                </Button>
            )}
            {editOpen && (
                <Stack spacing={2} marginTop={2}>
                    <SelectElement
                        name={formContext.register("gradeInput").name}
                        label={"Grade"}
                        options={transformArrayIntoOptions([
                            ...course.gradeLevels.map((gradeLevel) => gradeLevel.gradeValue),
                            5,
                        ])}
                        required
                    />
                    <TextFieldElement
                        label="Feedback"
                        name={formContext.register("feedbackInput").name}
                        multiline
                    />
                </Stack>
            )}
        </FormContainer>
    );
};

export default GradingForm;
