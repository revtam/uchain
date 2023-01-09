import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import React from "react";
import { useStudyProgramControllerContract } from "../hooks/contract/contractHooks";
import CenterContent from "../components/data-display/CenterContent";
import LoadingBox from "../components/LoadingBox";
import { LOG_IN, NOT_REGISTERED, NOT_SPM } from "../constants/authMessages";
import PageTemplate from "./PageTemplate";
import { Box, Button } from "@mui/material";
import { alertErrorTransactionCall } from "../utils/contract/contractUtils";
import useAuthStore from "../hooks/auth/authHooks";
import { UserRole } from "../utils/converter/contract-types/enums";
import useErrorStore from "../hooks/error/errorHooks";
import { FormContainer, TextFieldElement, useForm } from "react-hook-form-mui";

const AllStudiesPage: React.FunctionComponent<any> = () => {
    const { active } = useWeb3React<Web3Provider>();
    const { userRole, registered } = useAuthStore();
    const { setErrorMessage } = useErrorStore();
    const formContext = useForm<{ studyProgramNameInput: string }>({});

    const studyProgramControllerContract = useStudyProgramControllerContract();

    const handleCreate = async (studyProgramNameInput: string) => {
        return await alertErrorTransactionCall(
            () => studyProgramControllerContract.addAdminNewStudyProgram(studyProgramNameInput),
            setErrorMessage
        );
    };

    if (!active) return <CenterContent>{LOG_IN}</CenterContent>;

    if (registered === false) return <CenterContent>{NOT_REGISTERED}</CenterContent>;

    if (userRole !== UserRole.STUDY_PROGRAM_MANAGER) return <CenterContent>{NOT_SPM}</CenterContent>;

    if (userRole === undefined) return <LoadingBox />;

    return (
        <PageTemplate pageTitle="Add new study program">
            <FormContainer
                formContext={formContext}
                onSuccess={(data) => handleCreate(data.studyProgramNameInput)}
            >
                <TextFieldElement
                    sx={{ width: 600 }}
                    label="Enter study program name"
                    name="studyProgramNameInput"
                />
                <Box>
                    <Button
                        type={"submit"}
                        color={"secondary"}
                        variant="contained"
                        sx={{ mt: 2, py: 1, px: 4, fontWeight: 600 }}
                    >
                        Add study program
                    </Button>
                </Box>
            </FormContainer>
        </PageTemplate>
    );
};

export default AllStudiesPage;
