import { Box, Container } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import React, { useEffect, useState } from "react";
import { useStudyProgramViewContract } from "../hooks/contract/contractHooks";
import { StudyProgram } from "../utils/converter/internal-types/internalTypes";
import CenterContent from "../components/data-display/CenterContent";
import PageLoading from "../components/PageLoading";
import PageTitle from "../components/data-display/PageTitle";
import { convertToStudyProgramInternal } from "../utils/converter/studyProgramConverter";
import { StudyprogramResponse } from "../contracts/imports/ethereum-abi-types/StudyProgramView";
import StudyProgramAccordions from "../components/data-display/StudyProgramAccordions";
import { LOG_IN } from "../constants/authMessages";

const AllStudiesPage: React.FunctionComponent<any> = () => {
    const { active } = useWeb3React<Web3Provider>();

    const studyProgramViewContract = useStudyProgramViewContract();

    const [studyPrograms, setStudyPrograms] = useState<StudyProgram[]>([]);

    useEffect(() => {
        (async () => {
            if (studyProgramViewContract) {
                setStudyPrograms(
                    (await studyProgramViewContract.getAllPrograms()).map(
                        (studyProgram: StudyprogramResponse) => convertToStudyProgramInternal(studyProgram)
                    )
                );
            }
        })();
    }, [studyProgramViewContract]);

    if (!active) return <CenterContent content={LOG_IN} />;

    if (studyPrograms.length > 0)
        return (
            <Container maxWidth={"lg"} sx={{ mb: 10 }}>
                <PageTitle title={"All study programs"} />
                <Box marginTop={4}>
                    <StudyProgramAccordions studyPrograms={studyPrograms} />
                </Box>
            </Container>
        );

    return <PageLoading />;
};

export default AllStudiesPage;
