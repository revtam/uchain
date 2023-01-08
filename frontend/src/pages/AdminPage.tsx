import React, { useEffect, useState } from "react";
import {
    useStudyProgramControllerContract,
    useUserControllerContract,
} from "../hooks/contract/contractHooks";
import useErrorStore from "../hooks/error/errorHooks";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { alertError, handleTransactionCall } from "../utils/contract/contractUtils";
import { Container } from "@mui/system";
import PageTitle from "../components/data-display/PageTitle";
import CenterContent from "../components/data-display/CenterContent";
import { Box, Button, TextField, Typography } from "@mui/material";
import useAuthStore from "../hooks/auth/authHooks";
import PageLoading from "../components/PageLoading";
import { LOG_IN, NOT_ADMIN } from "../constants/authMessages";

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

    const [autoAcceptance, setAutoAcceptance] = useState<boolean>(false);
    const [programName, setProgramName] = useState<string>("");
    const [accountToJudge, setAccountToJudge] = useState<string>("");

    useEffect(() => {
        (async () => {
            if (userControllerContract) {
                setAutoAcceptance(await userControllerContract.isAutomaticAcceptanceOn());
            }
        })();
    }, [userControllerContract]);

    if (!active) return <CenterContent content={LOG_IN} />;

    if (admin === false) return <CenterContent content={NOT_ADMIN} />;

    if (admin) {
        return (
            <Container maxWidth={"lg"}>
                <PageTitle title={"Admin dashboard"} />
                <Box>
                    <TextField
                        value={programName}
                        label="Enter study program name"
                        onChange={(e) => {
                            setProgramName(e.target.value);
                        }}
                    />
                    <Button
                        onClick={async () => {
                            await alertError(
                                () =>
                                    handleTransactionCall(() =>
                                        studyProgramControllerContract.addAdminNewStudyProgram(programName)
                                    ),
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
                                await alertError(
                                    () =>
                                        handleTransactionCall(() =>
                                            userControllerContract.requestRegistration(
                                                account,
                                                PROFILE_EXAMPLE
                                            )
                                        ),
                                    setErrorMessage
                                );
                        }}
                    >
                        Register example
                    </Button>
                </Box>
                <Box marginTop={2}>
                    <Typography>Auto acceptance: {autoAcceptance ? "on" : "off"}</Typography>
                    <Button
                        onClick={async () => {
                            await alertError(
                                () => userControllerContract.setAutomaticAcceptance(true),
                                setErrorMessage
                            );
                        }}
                    >
                        Set auto acceptance on
                    </Button>
                    <Button
                        onClick={async () => {
                            await alertError(
                                () => userControllerContract.setAutomaticAcceptance(false),
                                setErrorMessage
                            );
                        }}
                    >
                        Set auto acceptance off
                    </Button>
                </Box>
                <Box marginTop={2}>
                    <Button
                        onClick={async () => {
                            await alertError(
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
                        value={accountToJudge}
                        label="Enter address to accept/reject"
                        onChange={(e) => {
                            setAccountToJudge(e.target.value);
                        }}
                    />
                    <Button
                        onClick={async () => {
                            if (account)
                                await alertError(
                                    () =>
                                        handleTransactionCall(() =>
                                            userControllerContract.adminAcceptRegistration(accountToJudge)
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
                                await alertError(
                                    () =>
                                        handleTransactionCall(() =>
                                            userControllerContract.adminRejectRegistration(accountToJudge)
                                        ),
                                    setErrorMessage
                                );
                        }}
                    >
                        Reject registration
                    </Button>
                </Box>
            </Container>
        );
    }

    return <PageLoading />;
};

export default AdminPage;
