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
import { Box, Button, TextField, Typography } from "@mui/material";
import useAuthStore from "../hooks/auth/authHooks";
import LoadingBox from "../components/LoadingBox";
import { LOG_IN, NOT_ADMIN } from "../constants/authMessages";
import PageTemplate from "../components/data-display/PageTemplate";

const PROFILE_EXAMPLE = {
    firstName: "Tom",
    lastName: "Revesz",
    gender: 0,
    dateOfBirth: {
        year: 1998,
        month: 6,
        day: 18,
    },
    nationality: "Hungarian",
    phoneNumber: "+36203321973",
    emailAddress: "a11838105@unet.univie.ac.at",
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
                                    studyProgramControllerContract.addAdminNewStudyProgram(programNameInput),
                                setErrorMessage
                            );
                        }}
                    >
                        Add study program
                    </Button>
                </Box>
                <Box marginTop={2}>
                    <Button
                        onClick={async () => {
                            if (account)
                                await alertErrorTransactionCall(
                                    () =>
                                        userControllerContract.requestRegistration(account, PROFILE_EXAMPLE),
                                    setErrorMessage
                                );
                        }}
                    >
                        Register example
                    </Button>
                </Box>
                <Box marginTop={2}>
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
                <Box marginTop={2}>
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
                                    () => userControllerContract.adminAcceptRegistration(accountToJudgeInput),
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
                                    () => userControllerContract.adminRejectRegistration(accountToJudgeInput),
                                    setErrorMessage
                                );
                        }}
                    >
                        Reject registration
                    </Button>
                </Box>
            </PageTemplate>
        );
    }

    return <LoadingBox fullSize />;
};

export default AdminPage;
