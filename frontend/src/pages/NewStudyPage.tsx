import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
    useStudyProgramControllerContract,
    useStudyProgramViewContract,
} from "../hooks/contract/contractHooks";
import { StudyProgram } from "../utils/converter/internal-types/internalTypes";
import CenterContent from "../components/data-display/CenterContent";
import LoadingBox from "../components/LoadingBox";
import { convertToStudyProgramInternal } from "../utils/converter/studyProgramConverter";
import { LOG_IN, NOT_SPM } from "../constants/authMessages";
import { StudyprogramResponse } from "../contracts/imports/ethereum-abi-types/StudyProgramView";
import PageTemplate from "./PageTemplate";
import StudyProgramAccordion from "../components/data-display/accordions/StudyProgramAccordion";
import { Box, Button, TextField } from "@mui/material";
import { alertErrorTransactionCall } from "../utils/contract/contractUtils";
import useAuthStore from "../hooks/auth/authHooks";
import { UserRole } from "../utils/converter/contract-types/enums";
import useErrorStore from "../hooks/error/errorHooks";
import { FormContainer, TextFieldElement, useForm } from "react-hook-form-mui";

const AllStudiesPage: React.FunctionComponent<any> = () => {
    const { active } = useWeb3React<Web3Provider>();
    const { userRole } = useAuthStore();
    const { setErrorMessage } = useErrorStore();
    const formContext = useForm<{ studyProgramNameInput: string }>({});

    const studyProgramControllerContract = useStudyProgramControllerContract();

    if (!active) return <CenterContent>{LOG_IN}</CenterContent>;

    if (userRole === undefined) return <LoadingBox />;

    if (userRole !== UserRole.STUDY_PROGRAM_MANAGER) return <CenterContent>{NOT_SPM}</CenterContent>;

    const handleCreate = async (studyProgramNameInput: string) => {
        return await alertErrorTransactionCall(
            () => studyProgramControllerContract.addAdminNewStudyProgram(studyProgramNameInput),
            setErrorMessage
        );
    };

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
