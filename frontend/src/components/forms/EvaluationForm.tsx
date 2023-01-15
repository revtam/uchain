import React, { useCallback, useState } from "react";
import { Box, Button, Grid, Stack } from "@mui/material";
import { FormContainer, TextFieldElement, useForm } from "react-hook-form-mui";
import { alertErrorRerenderTransactionCall } from "../../utils/contract/contractUtils";
import useErrorStore from "../../hooks/error/errorHooks";
import { usePerformanceControllerContract } from "../../hooks/contract/contractHooks";
import { variables } from "../../theme/theme";
import LoadingBox from "../LoadingBox";

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
    const formContext = useForm<{ pointsInput: number; feedbackInput: string }>({});
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
        <React.Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container>
                    <Grid item xs={6}>
                        <Button
                            hidden={formOpen}
                            variant="outlined"
                            color="secondary"
                            sx={{ color: variables.secondary }}
                            onClick={() => setFormOpen(false)}
                        >
                            Close form
                        </Button>
                        <Button
                            hidden={!formOpen}
                            variant="outlined"
                            color="secondary"
                            sx={{ color: variables.secondary }}
                            onClick={() => setFormOpen(true)}
                        >
                            Open form
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            type={"submit"}
                            hidden={formOpen}
                            color="secondary"
                            sx={{ color: variables.white }}
                            disabled={sendDisabled}
                        >
                            {sendDisabled ? <LoadingBox /> : "Submit"}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            {formOpen && (
                <FormContainer
                    formContext={formContext}
                    onSuccess={(data) => handleEvaluation(data.pointsInput, data.feedbackInput)}
                >
                    <Stack spacing={2}>
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
                </FormContainer>
            )}
        </React.Fragment>
    );
};

export default EvaluationForm;
