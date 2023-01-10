import React from "react";
import { Box, Grid } from "@mui/material";
import CourseTotalPoints from "./CourseTotalPoints";
import GradingData from "./GradingData";
import { Course } from "../../../../utils/converter/internal-types/internalTypes";

export interface StudentCoursePerformanceTotalProps {
    course: Course;
    studentId?: string;
    gradeEditEnabled?: boolean;
}

const StudentCoursePerformanceTotal: React.FunctionComponent<StudentCoursePerformanceTotalProps> = ({
    course,
    studentId,
    gradeEditEnabled = false,
}: StudentCoursePerformanceTotalProps) => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <CourseTotalPoints courseId={course.id} studentId={studentId} />
                </Grid>
                <Grid item xs={6}>
                    <GradingData course={course} editEnabled={gradeEditEnabled} studentId={studentId} />
                </Grid>
            </Grid>
        </Box>
    );
};
export default StudentCoursePerformanceTotal;
