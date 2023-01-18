import React from "react";
import { useLoadSignal } from "../../../hooks/common/commonHooks";
import { variables } from "../../../theme/theme";
import { StudyProgram } from "../../../types/internal-types/internalTypes";
import LoadingBox from "../../LoadingBox";
import CustomAccordion from "./CustomAccordion";

export interface StudyProgramAccordionProps {
    studyProgram: StudyProgram;
}

const StudyProgramAccordion: React.FunctionComponent<React.PropsWithChildren<StudyProgramAccordionProps>> = ({
    studyProgram,
    children,
}: React.PropsWithChildren<StudyProgramAccordionProps>) => {
    const { loaded, signalLoad } = useLoadSignal();

    return (
        <CustomAccordion
            title={studyProgram.title}
            arrowColor={variables.white}
            summaryBackgroundColor={variables.primary}
            summaryTextColor={variables.white}
            borderColor={variables.primary}
            signalLoad={signalLoad}
        >
            {!loaded ? <LoadingBox /> : children}
        </CustomAccordion>
    );
};

export default StudyProgramAccordion;
