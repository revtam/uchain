import React, { useEffect, useState } from "react";
import { Assessment } from "../../../../../utils/converter/internal-types/internalTypes";
import { useCourseViewContract } from "../../../../../hooks/contract/contractHooks";
import { convertToAssessmentInternal } from "../../../../../utils/converter/courseConverter";
import { Stack, Typography } from "@mui/material";
import LoadingBox from "../../../../LoadingBox";
import { alertError } from "../../../../../utils/contract/contractUtils";
import useErrorStore from "../../../../../hooks/error/errorHooks";
import { CourseProp } from "../../props";
import CourseShortInfo from "../../base-components/CourseShortInfo";
import AssessmentAccordion from "../../../accordions/AssessmentAccordion";
import AssessmentParticipantsPerformances from "../mid-level/AssessmentParticipantsPerformances";
import AssessmentInfo from "../../base-components/AssessmentInfo";
import { AssessmentPerformanceProps } from "../low-level/AssessmentPerformance";

export type CourseParticipantsAssessmentsPerformancesStaticProps = AssessmentPerformanceProps;

const CourseParticipantsAssessmentsPerformances: React.FunctionComponent<
    CourseProp & AssessmentPerformanceProps
> = ({
    course,
    disableAssessmentInfo,
    enableAttendanceEdit,
    enableEvaluationEdit,
    enableUpload,
}: CourseProp & AssessmentPerformanceProps) => {
    const { setErrorMessage } = useErrorStore();
    const courseViewContract = useCourseViewContract();

    const [assessments, setAssessments] = useState<Assessment[] | undefined>(undefined);

    useEffect(() => {
        (async () => {
            if (courseViewContract) {
                setAssessments(
                    (
                        await alertError(
                            () => courseViewContract.getAssessmentsToCourseId(course.id),
                            setErrorMessage
                        )
                    ).map((user) => convertToAssessmentInternal(user))
                );
            }
        })();
    }, [courseViewContract, course]);

    if (!assessments) return <LoadingBox />;

    return (
        <React.Fragment>
            <CourseShortInfo course={course} />
            {assessments.length > 0 ? (
                <Stack spacing={2} marginTop={3}>
                    {assessments.map((assessment, index) => (
                        <AssessmentAccordion assessment={assessment} key={index}>
                            <AssessmentInfo assessment={assessment} />
                            <AssessmentParticipantsPerformances
                                assessment={assessment}
                                disableAssessmentInfo={disableAssessmentInfo}
                                enableAttendanceEdit={enableAttendanceEdit}
                                enableEvaluationEdit={enableEvaluationEdit}
                                enableUpload={enableUpload}
                            />
                        </AssessmentAccordion>
                    ))}
                </Stack>
            ) : (
                <Typography>No assessments</Typography>
            )}
        </React.Fragment>
    );
};

export default CourseParticipantsAssessmentsPerformances;
