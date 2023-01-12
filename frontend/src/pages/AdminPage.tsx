import React, { useEffect, useState } from "react";
import {
    useStudyProgramControllerContract,
    useUserControllerContract,
} from "../hooks/contract/contractHooks";
import useErrorStore from "../hooks/error/errorHooks";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { alertErrorTransactionCall } from "../utils/contract/contractUtils";
import CenterContent from "../components/data-display/CenterContent";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import useAuthStore from "../hooks/auth/authHooks";
import LoadingBox from "../components/LoadingBox";
import { LOG_IN, NOT_ADMIN } from "../constants/authMessages";
import PageTemplate from "../components/data-display/PageTemplate";

const PROFILE_EXAMPLE = {
    firstName: "Max",
    lastName: "Mustermann",
    gender: 0,
    dateOfBirth: {
        year: 2000,
        month: 1,
        day: 1,
    },
    nationality: "English",
    phoneNumber: "+11111111",
    emailAddress: "a1111111@unet.univie.ac.at",
    role: 2,
    studyProgramIds: [1],
};

const AdminPage: React.FunctionComponent<any> = () => {
    const { active, account } = useWeb3React<Web3Provider>();
    const { setErrorMessage } = useErrorStore();
    const { admin } = useAuthStore();

    const userControllerContract = useUserControllerContract();
    const studyProgramControllerContract = useStudyProgramControllerContract();

    const [autoAcceptanceInput, setAutoAcceptanceInput] = useState<boolean>(false);
    const [programNameInput, setProgramNameInput] = useState<string>("");
    const [accountToJudgeInput, setAccountToJudgeInput] = useState<string>("");

    useEffect(() => {
        (async () => {
            if (userControllerContract) {
                setAutoAcceptanceInput(await userControllerContract.isAutomaticAcceptanceOn());
            }
        })();
    }, [userControllerContract]);

    if (!active) return <CenterContent>{LOG_IN}</CenterContent>;

    if (admin === false) return <CenterContent>{NOT_ADMIN}</CenterContent>;

    if (admin) {
        return (
            <PageTemplate pageTitle="Admin dashboard">
                <Stack spacing={2}>
                    <Box>
                        <TextField
                            value={programNameInput}
                            label="Enter study program name"
                            onChange={(e) => {
                                setProgramNameInput(e.target.value);
                            }}
                        />
                        <Button
                            onClick={async () => {
                                await alertErrorTransactionCall(
                                    () =>
                                        studyProgramControllerContract.addAdminNewStudyProgram(
                                            programNameInput
                                        ),
                                    setErrorMessage
                                );
                            }}
                        >
                            Add study program
                        </Button>
                    </Box>
                    <Box>
                        <Button
                            onClick={async () => {
                                if (account)
                                    await alertErrorTransactionCall(
                                        () =>
                                            userControllerContract.requestRegistration(
                                                account,
                                                PROFILE_EXAMPLE
                                            ),
                                        setErrorMessage
                                    );
                            }}
                        >
                            Register this account
                        </Button>
                    </Box>
                    <Box>
                        <Typography>Auto acceptance: {autoAcceptanceInput ? "on" : "off"}</Typography>
                        <Button
                            onClick={async () => {
                                await alertErrorTransactionCall(
                                    () => userControllerContract.setAutomaticAcceptance(true),
                                    setErrorMessage
                                );
                            }}
                        >
                            Set auto acceptance on
                        </Button>
                        <Button
                            onClick={async () => {
                                await alertErrorTransactionCall(
                                    () => userControllerContract.setAutomaticAcceptance(false),
                                    setErrorMessage
                                );
                            }}
                        >
                            Set auto acceptance off
                        </Button>
                    </Box>
                    <Box>
                        <TextField
                            value={accountToJudgeInput}
                            label="Enter address to accept/reject"
                            onChange={(e) => {
                                setAccountToJudgeInput(e.target.value);
                            }}
                        />
                        <Button
                            onClick={async () => {
                                if (account)
                                    await alertErrorTransactionCall(
                                        () =>
                                            userControllerContract.adminAcceptRegistration(
                                                accountToJudgeInput
                                            ),
                                        setErrorMessage
                                    );
                            }}
                        >
                            Accept registration
                        </Button>
                        <Button
                            onClick={async () => {
                                if (account)
                                    await alertErrorTransactionCall(
                                        () =>
                                            userControllerContract.adminRejectRegistration(
                                                accountToJudgeInput
                                            ),
                                        setErrorMessage
                                    );
                            }}
                        >
                            Reject registration
                        </Button>
                    </Box>
                </Stack>
            </PageTemplate>
        );
    }

    return <LoadingBox fullSize />;
};

export default AdminPage;
