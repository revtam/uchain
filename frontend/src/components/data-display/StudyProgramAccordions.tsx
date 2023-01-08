import { Typography } from "@mui/material";
import React, { useMemo } from "react";
import { StudyProgram } from "../../utils/converter/internal-types/internalTypes";
import OutlinedAccordion from "./OutlinedAccordion";

export interface StudyProgramAccordionsProps {
    studyPrograms: StudyProgram[];
}

const StudyProgramAccordions: React.FunctionComponent<StudyProgramAccordionsProps> = ({
    studyPrograms,
}: StudyProgramAccordionsProps) => {
    const accordionElements = useMemo(() => {
        return studyPrograms.map((studyProgram) => ({
            title: studyProgram.title,
            content: <Typography>Program identifier: {studyProgram.id}</Typography>,
        }));
    }, [studyPrograms]);

    return <OutlinedAccordion elements={accordionElements} />;
};

export default StudyProgramAccordions;
