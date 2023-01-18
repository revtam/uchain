import React, { useCallback, useState } from "react";
import { useStudyProgramControllerContract } from "../../hooks/contract/contractHooks";
import { Stack } from "@mui/material";
import { alertErrorTransactionCall } from "../../utils/contract/contractUtils";
import useErrorStore from "../../hooks/error/errorHooks";
import { FormContainer, TextFieldElement, useForm } from "react-hook-form-mui";
import SubmitButton from "../data-display/action-button/SubmitButton";

const NewStudyProgramForm: React.FunctionComponent<any> = () => {
    const { setErrorMessage } = useErrorStore();
    const formContext = useForm<{ studyProgramNameInput: string }>({});

    const studyProgramControllerContract = useStudyProgramControllerContract();

    const [sendDisabled, setSendDisabled] = useState<boolean>(false);

    const handleCreate = useCallback(
        (studyProgramNameInput: string) => {
            setSendDisabled(true);
            alertErrorTransactionCall(
                () => studyProgramControllerContract.addNewStudyProgram(studyProgramNameInput),
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
                    name={formContext.register("studyProgramNameInput").name}
                    required
                />
                <SubmitButton text={"Add"} disabled={sendDisabled} />
            </Stack>
        </FormContainer>
    );
};

export default NewStudyProgramForm;
