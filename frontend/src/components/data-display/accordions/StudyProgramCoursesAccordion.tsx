import React from "react";
import { useLoadSignal } from "../../../hooks/common/commonHooks";
import { variables } from "../../../theme/theme";
import { StudyProgram } from "../../../utils/converter/internal-types/internalTypes";
import LoadingBox from "../../LoadingBox";
import CustomAccordion from "./CustomAccordion";

export interface StudyProgramCoursesAccordionProps {
    studyProgram: StudyProgram;
}

const StudyProgramCoursesAccordion: React.FunctionComponent<
    React.PropsWithChildren<StudyProgramCoursesAccordionProps>
> = ({ studyProgram, children }: React.PropsWithChildren<StudyProgramCoursesAccordionProps>) => {
    const { loaded, signalLoad } = useLoadSignal();

    return (
        <CustomAccordion
            title={studyProgram.title}
            arrowColor={variables.primary}
            summaryBackgroundColor={variables.white}
            summaryBorderEnabled
            summaryBorderColor={variables.primary}
            summaryTextColor={variables.black}
            signalLoad={signalLoad}
        >
            {!loaded ? <LoadingBox /> : children}
        </CustomAccordion>
    );
};

export default StudyProgramCoursesAccordion;
