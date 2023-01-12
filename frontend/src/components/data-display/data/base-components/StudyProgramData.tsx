import { Typography } from "@mui/material";
import React from "react";
import { StudyProgramProp } from "../props";

const StudyProgramData: React.FunctionComponent<StudyProgramProp> = ({ studyProgram }: StudyProgramProp) => {
    return <Typography>Program identifier: {studyProgram.id}</Typography>;
};

export default StudyProgramData;
