import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import React, { useEffect, useState } from "react";
import { useStudyProgramViewContract } from "../../hooks/contract/contractHooks";
import { StudyProgram } from "../../types/internal-types/internalTypes";
import CenterContent from "../../components/data-display/CenterContent";
import LoadingBox from "../../components/LoadingBox";
import { convertToStudyProgramInternal } from "../../utils/converter/studyProgramConverter";
import { LOG_IN } from "../../constants/authMessages";
import { StudyprogramResponse } from "../../../imports/ethereum-abi-types/StudyProgramView";
import PageTemplate from "../../components/data-display/PageTemplate";
import StudyProgramAccordion from "../../components/data-display/accordions/StudyProgramAccordion";
import StudyProgramData from "../../components/data-display/data/base-components/StudyProgramData";

const AllStudiesPage: React.FunctionComponent<any> = () => {
    const { active } = useWeb3React<Web3Provider>();

    const studyProgramViewContract = useStudyProgramViewContract();

    const [studyPrograms, setStudyPrograms] = useState<StudyProgram[] | undefined>(undefined);

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

    if (!active) return <CenterContent>{LOG_IN}</CenterContent>;

    if (!studyPrograms) return <LoadingBox fullSize />;

    return (
        <PageTemplate pageTitle="All study programs">
            {studyPrograms.length > 0 ? (
                studyPrograms.map((studyProgram, index) => (
                    <StudyProgramAccordion studyProgram={studyProgram} key={index}>
                        <StudyProgramData studyProgram={studyProgram} />
                    </StudyProgramAccordion>
                ))
            ) : (
                <CenterContent>No study programs</CenterContent>
            )}
        </PageTemplate>
    );
};

export default AllStudiesPage;
