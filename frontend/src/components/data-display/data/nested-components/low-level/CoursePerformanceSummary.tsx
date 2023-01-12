import { Grid } from "@mui/material";
import React from "react";
import { CourseProp } from "../../props";
import CourseTotalPoints from "../../base-components/CourseTotalPoints";
import GradingData from "../../base-components/GradingData";

export type CoursePerformanceSummaryProps = {
    studentId?: string;
    gradingEnabled?: boolean;
};

const CoursePerformanceSummary: React.FunctionComponent<CoursePerformanceSummaryProps & CourseProp> = ({
    course,
    studentId,
    gradingEnabled,
}: CoursePerformanceSummaryProps & CourseProp) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <CourseTotalPoints course={course} studentId={studentId} />
            </Grid>
            <Grid item xs={6}>
                <GradingData course={course} editEnabled={gradingEnabled} />
            </Grid>
        </Grid>
    );
};

export default CoursePerformanceSummary;
