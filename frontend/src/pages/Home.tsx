import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";

import {
    useStudyProgramControllerContract,
    useStudyProgramViewContract,
    useUserControllerContract,
    useUserViewContract,
} from "../hooks/contract/hooks";
import useErrorStore from "../hooks/error/hooks";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { alertOutContractCallError } from "../utils/contract/utils";
import { StudyprogramResponse } from "../contracts/imports/ethereum-abi-types/StudyProgramView";

type Name = {
    firstName: string;
    lastName: string;
};

const Home: React.FunctionComponent<any> = () => {
    const userViewContract = useUserViewContract();
    const userControllerContract = useUserControllerContract();
    const studyProgramViewContract = useStudyProgramViewContract();

    const { active, account } = useWeb3React<Web3Provider>();
    const { setErrorMessage } = useErrorStore();

    const [registered, setRegistered] = useState<boolean>(false);
    const [name, setName] = useState<Name | undefined>(undefined);

    const [studyPrograms, setStudyPrograms] = useState<StudyprogramResponse[]>([]);

    useEffect(() => {
        (async () => {
            if (userViewContract) {
                setRegistered(
                    await alertOutContractCallError(
                        () => userViewContract.isUserRegistered(),
                        setErrorMessage
                    )
                );
            }
        })();
    }, [userViewContract]);

    useEffect(() => {
        (async () => {
            if (userViewContract) {
                // setName(
                //     (await alertOutContractCallError(
                //         () => userViewContract.getProfile(),
                //         setErrorMessage
                //     )
                // );
                const regs = await alertOutContractCallError(
                    () => userViewContract.isUserRegistered(),
                    setErrorMessage
                );

                console.log(regs);
            }
        })();
    }, [userViewContract]);

    useEffect(() => {
        (async () => {
            if (studyProgramViewContract) {
                setStudyPrograms(
                    await alertOutContractCallError(
                        () => studyProgramViewContract.getAllPrograms(),
                        setErrorMessage
                    )
                );
            }
        })();
    }, [studyProgramViewContract]);

    if (!active)
        return (
            <Box height={"100%"} display="flex" alignItems={"center"} justifyContent={"center"}>
                Log into your Metamask wallet
            </Box>
        );

    if (!registered) {
    }

    return (
        <Box height={"100%"} display="flex" alignItems={"center"} justifyContent={"center"}>
            <Button
                onClick={async () => {
                    if (account)
                        await alertOutContractCallError(
                            () =>
                                userControllerContract.requestRegistration(account, {
                                    firstName: "Tamas",
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
                                    role: 0,
                                    studyProgramIds: [studyPrograms[0].programId],
                                }),
                            setErrorMessage
                        );
                    // await alertOutContractCallError(
                    //     () => userControllerContract.adminAcceptRegistration(account),
                    //     setErrorMessage
                    // );
                }}
            >
                Register
            </Button>
            {/* {studyPrograms.map((studyProgram) => (
                <div>{studyProgram.programName}</div>
            ))} */}
        </Box>
    );
};

export default Home;
