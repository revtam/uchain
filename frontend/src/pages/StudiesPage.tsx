import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import React, { useEffect, useState } from "react";
import { useStudyProgramViewContract } from "../hooks/contract/contractHooks";
import { StudyProgram } from "../utils/converter/internal-types/internalTypes";
import CenterContent from "../components/data-display/CenterContent";
import LoadingBox from "../components/LoadingBox";
import { convertToStudyProgramInternal } from "../utils/converter/studyProgramConverter";
import useAuthStore from "../hooks/auth/authHooks";
import { UserRole } from "../utils/converter/contract-types/enums";
import { LOG_IN, NOT_REGISTERED, NOT_STUDENT } from "../constants/authMessages";
import { StudyprogramResponse } from "../contracts/imports/ethereum-abi-types/StudyProgramView";
import StudyProgramAccordion from "../components/data-display/accordions/StudyProgramAccordion";
import PageTemplate from "./PageTemplate";

const StudiesPage: React.FunctionComponent<any> = () => {
    const { active } = useWeb3React<Web3Provider>();
    const { registered, userRole } = useAuthStore();

    const studyProgramViewContract = useStudyProgramViewContract();

    const [studyPrograms, setStudyPrograms] = useState<StudyProgram[] | undefined>(undefined);

    useEffect(() => {
        (async () => {
            if (studyProgramViewContract && registered && userRole === UserRole.STUDENT) {
                setStudyPrograms(
                    (await studyProgramViewContract.getEnrolledPrograms()).map(
                        (studyProgram: StudyprogramResponse) => convertToStudyProgramInternal(studyProgram)
                    )
                );
            }
        })();
    }, [studyProgramViewContract, registered, userRole]);

    if (!active) return <CenterContent>{LOG_IN}</CenterContent>;

    if (registered === false) return <CenterContent>{NOT_REGISTERED}</CenterContent>;

    if (userRole !== undefined && userRole !== UserRole.STUDENT)
        return <CenterContent>{NOT_STUDENT}</CenterContent>;

    if (studyPrograms === undefined) return <LoadingBox />;

    return (
        <PageTemplate pageTitle="My study programs">
            {studyPrograms.length > 0 ? (
                studyPrograms.map((studyProgram, index) => (
                    <StudyProgramAccordion studyProgram={studyProgram} key={index} />
                ))
            ) : (
                <CenterContent>No study programs</CenterContent>
            )}
        </PageTemplate>
    );
};

export default StudiesPage;
