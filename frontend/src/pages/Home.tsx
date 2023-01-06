import React, { useEffect, useState } from "react";

import {
    useStudyProgramControllerContract,
    useUserControllerContract,
    useUserViewContract,
} from "../hooks/contract/hooks";
import useErrorStore from "../hooks/error/hooks";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { alertError, handleTransactionCall } from "../utils/contract/utils";
import { useRerender } from "../hooks/common/hooks";
import { UserRole } from "../contracts/enums";
import { getNormalizedEnumKey } from "../utils/common/utils";
import { Container } from "@mui/system";
import PageTitle from "../components/PageTitle";
import CenterText from "../components/CenterText";
import { Name } from "../utils/converter/internalTypes";
import RegistrationPage from "./RegistrationPage";
import { Button } from "@mui/material";

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

const Home: React.FunctionComponent<any> = () => {
    const { active, account } = useWeb3React<Web3Provider>();
    const { setErrorMessage } = useErrorStore();

    const userViewContract = useUserViewContract();
    const userControllerContract = useUserControllerContract();
    const studyProgramControllerContract = useStudyProgramControllerContract();

    const [renderState, updateRenderState] = useState<{}>();
    const rerender = useRerender(updateRenderState);

    const [registered, setRegistered] = useState<boolean>(false);
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

    if (!active) return <CenterText text={"Log into your Metamask wallet"} />;

    if (registered && name && userRole) {
        return (
            <CenterText
                text={`Logged in as ${name.firstName} ${name.lastName} - ${getNormalizedEnumKey(
                    userRole,
                    UserRole
                )}`}
            />
        );
    }

    return (
        <Container maxWidth={"lg"}>
            <PageTitle title={"Registration"} />
            <RegistrationPage rerenderOnAcknowledge={rerender} />
            <Button
                onClick={async () => {
                    await alertError(
                        () =>
                            handleTransactionCall(() =>
                                studyProgramControllerContract.addAdminNewStudyProgram("CompSci")
                            ),
                        setErrorMessage
                    );
                }}
            >
                Add admin program
            </Button>
            <Button
                onClick={async () => {
                    if (account)
                        await alertError(
                            () =>
                                handleTransactionCall(() =>
                                    userControllerContract.requestRegistration(account, PROFILE_EXAMPLE)
                                ),
                            setErrorMessage
                        );
                }}
            >
                Admin Register
            </Button>
        </Container>
    );

    // return (
    //     <Box height={"100%"} display="flex" alignItems={"center"} justifyContent={"center"}>
    //
    //         <Button
    //             onClick={async () => {
    //                 await rerenderOnTransactionCompletion(
    //                     () => studyProgramControllerContract.addAdminNewStudyProgram("CompSci"),
    //                     setErrorMessage,
    //                     rerender
    //                 );
    //             }}
    //         >
    //             Add admin program
    //         </Button>
    //         <Button
    //             onClick={async () => {
    //                 await rerenderOnTransactionCompletion(
    //                     () => studyProgramControllerContract.addNewStudyProgram("New"),
    //                     setErrorMessage,
    //                     rerender
    //                 );
    //             }}
    //         >
    //             Add program
    //         </Button>
    //         <Button
    //             onClick={async () => {
    //                 await alertError(
    //                     () => userControllerContract.setAutomaticAcceptance(true),
    //                     setErrorMessage
    //                 );
    //             }}
    //         >
    //             Set auto acceptance
    //         </Button>
    //         <Button
    //             onClick={async () => {
    //                 await alertError(
    //                     () => userControllerContract.acknowledgeRegistrationResult(),
    //                     setErrorMessage
    //                 );
    //             }}
    //         >
    //             Acknowledge
    //         </Button>
    //         <Button
    //             onClick={async () => {
    //                 const ctype: CourseType = CourseType.PUE;
    //                 console.log(getEnumValues(CourseType));
    //             }}
    //         >
    //             Log
    //         </Button>
    //         <div>
    //             {studyPrograms.map((studyProgram) => (
    //                 <div key={studyProgram.programId.toString()}>{studyProgram.programName}</div>
    //             ))}
    //         </div>
    //     </Box>
    // );
};

export default Home;
