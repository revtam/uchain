import React, { useCallback, useState } from "react";
import { Button, Stack } from "@mui/material";
import { FormContainer, TextFieldElement, useForm } from "react-hook-form-mui";
import { alertErrorRerenderTransactionCall } from "../../utils/contract/contractUtils";
import useErrorStore from "../../hooks/error/errorHooks";
import { usePerformanceControllerContract } from "../../hooks/contract/contractHooks";
import { variables } from "../../theme/theme";
import SubmitButton from "../data-display/action-button/SubmitButton";

export interface EvaluationFormProps {
    assessmentId: string;
    studentId: string;
    rerender?: () => void;
}

const EvaluationForm: React.FunctionComponent<EvaluationFormProps> = ({
    assessmentId,
    studentId,
    rerender = () => {},
}: EvaluationFormProps) => {
    const { setErrorMessage } = useErrorStore();
    const formContext = useForm<{ pointsInput: number; feedbackInput: string }>({
        defaultValues: { feedbackInput: "" },
    });
    const performanceControllerContract = usePerformanceControllerContract();

    const [formOpen, setFormOpen] = useState<boolean>(false);
    const [sendDisabled, setSendDisabled] = useState<boolean>(false);

    const handleEvaluation = useCallback(
        (pointsInput: number, feedbackInput: string) => {
            setSendDisabled(true);
            alertErrorRerenderTransactionCall(
                () =>
                    performanceControllerContract.giveEvaluation(
                        studentId,
                        assessmentId,
                        pointsInput,
                        feedbackInput
                    ),
                rerender,
                setErrorMessage
            )
                .then(() => setFormOpen(false))
                .finally(() => setSendDisabled(false));
        },
        [performanceControllerContract]
    );

    return (
        <FormContainer
            formContext={formContext}
            onSuccess={(data) => handleEvaluation(data.pointsInput, data.feedbackInput)}
        >
            {formOpen ? (
                <Stack direction={"row"} spacing={1}>
                    <Button
                        variant="outlined"
                        color="secondary"
                        sx={{ color: variables.secondary }}
                        onClick={() => setFormOpen(false)}
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
                    onClick={() => setFormOpen(true)}
                >
                    Edit
                </Button>
            )}
            {formOpen && (
                <Stack spacing={2} marginTop={2}>
                    <TextFieldElement
                        name={formContext.register("pointsInput").name}
                        label={"Points"}
                        type="number"
                        InputProps={{ inputProps: { min: 0 } }}
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

export default EvaluationForm;
