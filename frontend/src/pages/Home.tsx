import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";

import { useUserControllerContract, useUserViewContract } from "../hooks/contract/hooks";
import useErrorStore from "../hooks/error/hooks";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { alertError, rerenderOnTransactionCompletion } from "../utils/contract/utils";
import { StudyprogramResponse } from "../contracts/imports/ethereum-abi-types/StudyProgramView";
import { useRerender } from "../hooks/common/hooks";
import { CourseType, UserRole } from "../contracts/enums";
import { getNormalizedEnumKey, getEnumValues } from "../utils/common/utils";
import RegistrationForm from "../components/RegistrationForm";

type Name = {
    firstName: string;
    lastName: string;
};

const PROFILE_EXAMPLE = {
    firstName: "Tom",
    lastName: "Revesz",
    gender: 2,
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

const Home: React.FunctionComponent<any> = () => {
    const userViewContract = useUserViewContract();
    const userControllerContract = useUserControllerContract();

    const { active, account } = useWeb3React<Web3Provider>();
    const { setErrorMessage } = useErrorStore();
    const [renderState, updateRenderState] = useState<{}>();
    const rerender = useRerender(updateRenderState);

    const [registered, setRegistered] = useState<boolean>(false);
    const [studyPrograms, setStudyPrograms] = useState<StudyprogramResponse[]>([]);
    const [name, setName] = useState<Name | undefined>(undefined);
    const [userRole, setUserRole] = useState<UserRole | undefined>(undefined);

    useEffect(() => {
        (async () => {
            if (userViewContract) {
                setRegistered(await alertError(() => userViewContract.isUserRegistered(), setErrorMessage));
            }
        })();
    }, [userViewContract]);

    useEffect(() => {
        (async () => {
            if (userViewContract && registered) {
                const profile = await alertError(() => userViewContract.getProfile(), setErrorMessage);
                setName({ firstName: profile.firstName, lastName: profile.lastName });
                setUserRole(profile.role);
            }
        })();
    }, [userViewContract, registered]);

    if (!active)
        return (
            <Box height={"100%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                Log into your Metamask wallet
            </Box>
        );

    if (registered && name && userRole) {
        return (
            <Box height={"100%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                Logged in as {name.firstName} {name.lastName} - {getNormalizedEnumKey(userRole, UserRole)}
            </Box>
        );
    }

    if (!registered) {
        return <RegistrationForm />;
    }

    return (
        <Box height={"100%"} display="flex" alignItems={"center"} justifyContent={"center"}>
            <Button
                onClick={async () => {
                    if (account)
                        await alertError(
                            () =>
                                userControllerContract.requestRegistration(
                                    "0x54a64A59cfbb18fBf97fA15d06EAd086BA02BABa",
                                    PROFILE_EXAMPLE
                                ),
                            setErrorMessage
                        );
                }}
            >
                Admin Register
            </Button>
            <Button
                onClick={async () => {
                    await rerenderOnTransactionCompletion(
                        () => studyProgramControllerContract.addAdminNewStudyProgram("CompSci"),
                        setErrorMessage,
                        rerender
                    );
                }}
            >
                Add admin program
            </Button>
            <Button
                onClick={async () => {
                    await rerenderOnTransactionCompletion(
                        () => studyProgramControllerContract.addNewStudyProgram("New"),
                        setErrorMessage,
                        rerender
                    );
                }}
            >
                Add program
            </Button>
            <Button
                onClick={async () => {
                    await alertError(
                        () => userControllerContract.setAutomaticAcceptance(true),
                        setErrorMessage
                    );
                }}
            >
                Set auto acceptance
            </Button>
            <Button
                onClick={async () => {
                    await alertError(
                        () => userControllerContract.acknowledgeRegistrationResult(),
                        setErrorMessage
                    );
                }}
            >
                Acknowledge
            </Button>
            <Button
                onClick={async () => {
                    const ctype: CourseType = CourseType.PUE;
                    console.log(getEnumValues(CourseType));
                }}
            >
                Log
            </Button>
            <div>
                {studyPrograms.map((studyProgram) => (
                    <div key={studyProgram.programId.toString()}>{studyProgram.programName}</div>
                ))}
            </div>
        </Box>
    );
};

export default Home;
