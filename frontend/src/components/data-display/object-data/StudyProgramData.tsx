import { Typography } from "@mui/material";
import React from "react";
import { StudyProgram } from "../../../utils/converter/internal-types/internalTypes";

export interface StudyProgramDataProps {
    studyProgram: StudyProgram;
}

const StudyProgramData: React.FunctionComponent<StudyProgramDataProps> = ({
    studyProgram,
}: StudyProgramDataProps) => {
    return <Typography>Program identifier: {studyProgram.id}</Typography>;
};
export default StudyProgramData;
