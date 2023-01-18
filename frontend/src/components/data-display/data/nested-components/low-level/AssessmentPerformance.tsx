import { Grid } from "@mui/material";
import React from "react";
import { AssessmentType } from "../../../../../types/contract-types/enums";
import AssessmentInfo from "../../base-components/AssessmentInfo";
import { AssessmentProp } from "../../props";
import AttendaceData from "../../base-components/AttendaceData";
import EvaluationData from "../../base-components/EvaluationData";
import SubmissionData from "../../base-components/SubmissionData";

export type AssessmentPerformanceProps = {
    studentId?: string;
    disableAssessmentInfo?: boolean;
    enableAttendanceEdit?: boolean;
    enableUpload?: boolean;
    enableEvaluationEdit?: boolean;
};

const AssessmentPerformance: React.FunctionComponent<AssessmentPerformanceProps & AssessmentProp> = ({
    assessment,
    studentId,
    disableAssessmentInfo = false,
    enableAttendanceEdit = false,
    enableUpload = false,
    enableEvaluationEdit = false,
}: AssessmentPerformanceProps & AssessmentProp) => {
    return (
        <Grid container spacing={4}>
            {!disableAssessmentInfo && (
                <Grid item xs={6}>
                    <AssessmentInfo assessment={assessment} />
                </Grid>
            )}
            <Grid item xs={6}>
                {assessment.assessmentType === AssessmentType.EXAM && (
                    <AttendaceData
                        assessment={assessment}
                        editEnabled={enableAttendanceEdit}
                        studentId={studentId}
                    />
                )}
                {assessment.assessmentType === AssessmentType.SUBMISSION && (
                    <SubmissionData
                        assessment={assessment}
                        uploadEnabled={enableUpload}
                        studentId={studentId}
                    />
                )}
            </Grid>
            <Grid item xs={6}>
                <EvaluationData
                    assessment={assessment}
                    editEnabled={enableEvaluationEdit}
                    studentId={studentId}
                />
            </Grid>
        </Grid>
    );
};
export default AssessmentPerformance;
