import React, { useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import { FormContainer, SelectElement, TextFieldElement, useForm } from "react-hook-form-mui";
import { Course } from "../../utils/converter/internal-types/internalTypes";
import { transformArrayIntoOptions } from "../../utils/common/commonUtils";
import { alertErrorRerenderTransactionCall } from "../../utils/contract/contractUtils";
import useErrorStore from "../../hooks/error/errorHooks";
import { usePerformanceControllerContract } from "../../hooks/contract/contractHooks";
import { variables } from "../../theme/theme";

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
    const formContext = useForm<{ gradeInput: number; feedbackInput: string }>({});
    const performanceControllerContract = usePerformanceControllerContract();

    const [editOpen, setEditOpen] = useState<boolean>(false);
    const [sendDisabled, setSendDisabled] = useState<boolean>(false);

    const handleGrade = (gradeInput: number, feedbackInput: string) => {
        setSendDisabled(true);
        alertErrorRerenderTransactionCall(
            () =>
                performanceControllerContract.giveFinalGrade(studentId, course.id, gradeInput, feedbackInput),
            rerender,
            setErrorMessage
        )
            .then(() => setEditOpen(false))
            .finally(() => setSendDisabled(false));
    };

    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Button
                            hidden={editOpen}
                            variant="outlined"
                            color="secondary"
                            sx={{ color: variables.secondary }}
                            onClick={() => setEditOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            hidden={!editOpen}
                            variant="outlined"
                            color="secondary"
                            sx={{ color: variables.secondary }}
                            onClick={() => setEditOpen(true)}
                        >
                            Edit
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            type={"submit"}
                            hidden={editOpen}
                            color="secondary"
                            sx={{ color: variables.white }}
                            disabled={sendDisabled}
                        >
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            {editOpen && (
                <FormContainer
                    formContext={formContext}
                    onSuccess={(data) => handleGrade(data.gradeInput, data.feedbackInput)}
                >
                    <SelectElement
                        name={"grade"}
                        label={"Grade"}
                        options={transformArrayIntoOptions(
                            course.gradeLevels.map((gradeLevel) => gradeLevel.gradeValue)
                        )}
                        className="gradeInput"
                        fullWidth
                        required
                    />
                    <TextFieldElement sx={{ width: 600 }} label="Feedback" name="feedbackInput" fullWidth />
                </FormContainer>
            )}
        </React.Fragment>
    );
};

export default GradingForm;
