import React from "react";
import { Stack } from "@mui/material";
import { CourseProp } from "../../props";
import CoursePerformanceSummary from "../low-level/CoursePerformanceSummary";
import CourseAssessments, { CourseAssessmentsProps } from "../mid-level/CourseAssessments";
import CourseShortInfo from "../../base-components/CourseShortInfo";

export type MyAssessmentsPerformancesStaticProps = CourseAssessmentsProps;

const MyAssessmentsPerformances: React.FunctionComponent<CourseProp & CourseAssessmentsProps> = ({
    course,
    disableAssessmentInfo,
    enableAttendanceEdit,
    enableEvaluationEdit,
    enableUpload,
}: CourseProp & CourseAssessmentsProps) => {
    return (
        <Stack spacing={2} alignItems={"baseline"}>
            <CourseShortInfo course={course} />
            <CoursePerformanceSummary course={course} />
            <CourseAssessments
                course={course}
                disableAssessmentInfo={disableAssessmentInfo}
                enableAttendanceEdit={enableAttendanceEdit}
                enableEvaluationEdit={enableEvaluationEdit}
                enableUpload={enableUpload}
            />
        </Stack>
    );
};

export default MyAssessmentsPerformances;
