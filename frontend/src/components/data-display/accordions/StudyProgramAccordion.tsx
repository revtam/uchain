import React from "react";
import { StudyProgram } from "../../../utils/converter/internal-types/internalTypes";
import StudyProgramData from "../object-data/StudyProgramData";
import OutlinedAccordion from "./OutlinedAccordion";

export interface StudyProgramAccordionProps {
    studyProgram: StudyProgram;
}

const StudyProgramAccordion: React.FunctionComponent<StudyProgramAccordionProps> = ({
    studyProgram,
}: StudyProgramAccordionProps) => {
    return (
        <OutlinedAccordion title={studyProgram.title}>
            <StudyProgramData studyProgram={studyProgram} />
        </OutlinedAccordion>
    );
};

export default StudyProgramAccordion;
