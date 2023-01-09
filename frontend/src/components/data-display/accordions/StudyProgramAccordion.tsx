import React from "react";
import { StudyProgram } from "../../../utils/converter/internal-types/internalTypes";
import StudyProgramData from "../object-data/StudyProgramData";
import CustomAccordion from "./CustomAccordion";

export interface StudyProgramAccordionProps {
    studyProgram: StudyProgram;
}

const StudyProgramAccordion: React.FunctionComponent<StudyProgramAccordionProps> = ({
    studyProgram,
}: StudyProgramAccordionProps) => {
    return (
        <CustomAccordion
            title={studyProgram.title}
            arrowColor="var(--mui-palette-primary-contrastText)"
            summaryBackgroundColor="var(--mui-palette-primary-main)"
            summaryTextColor="var(--mui-palette-primary-contrastText)"
            borderEnabled
            borderColor="var(--mui-palette-primary-main)"
        >
            <StudyProgramData studyProgram={studyProgram} />
        </CustomAccordion>
    );
};

export default StudyProgramAccordion;
