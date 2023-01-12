import React, { useCallback, useState } from "react";
import { useStudyProgramControllerContract } from "../../hooks/contract/contractHooks";
import { Box, Button, Stack } from "@mui/material";
import { alertErrorTransactionCall } from "../../utils/contract/contractUtils";
import useErrorStore from "../../hooks/error/errorHooks";
import { FormContainer, TextFieldElement, useForm } from "react-hook-form-mui";

const NewStudyProgramForm: React.FunctionComponent<any> = () => {
    const { setErrorMessage } = useErrorStore();
    const formContext = useForm<{ studyProgramNameInput: string }>({});

    const studyProgramControllerContract = useStudyProgramControllerContract();

    const [sendDisabled, setSendDisabled] = useState<boolean>(false);

    const handleCreate = useCallback(
        (studyProgramNameInput: string) => {
            setSendDisabled(true);
            alertErrorTransactionCall(
                () => studyProgramControllerContract.addAdminNewStudyProgram(studyProgramNameInput),
                setErrorMessage
            ).finally(() => setSendDisabled(false));
        },
        [studyProgramControllerContract]
    );

    return (
        <FormContainer
            formContext={formContext}
            onSuccess={(data) => handleCreate(data.studyProgramNameInput)}
        >
            <Stack spacing={2}>
                <TextFieldElement
                    sx={{ width: 600 }}
                    label="Enter study program name"
                    name="studyProgramNameInput"
                    required
                />
                <Box>
                    <Button
                        type={"submit"}
                        color={"secondary"}
                        variant="contained"
                        sx={{ py: 1, px: 4, fontWeight: 600 }}
                        disabled={sendDisabled}
                    >
                        Add study program
                    </Button>
                </Box>
            </Stack>
        </FormContainer>
    );
};

export default NewStudyProgramForm;
