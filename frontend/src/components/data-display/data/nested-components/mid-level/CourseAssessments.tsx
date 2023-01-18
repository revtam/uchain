import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CourseProp } from "../../props";
import useErrorStore from "../../../../../hooks/error/errorHooks";
import { useCourseViewContract } from "../../../../../hooks/contract/contractHooks";
import { alertError } from "../../../../../utils/contract/contractUtils";
import LoadingBox from "../../../../LoadingBox";
import AssessmentPerformance, { AssessmentPerformanceProps } from "../low-level/AssessmentPerformance";
import { convertToAssessmentInternal } from "../../../../../utils/converter/courseConverter";
import AssessmentAccordion from "../../../accordions/AssessmentAccordion";
import { Assessment } from "../../../../../types/internal-types/internalTypes";

export type CourseAssessmentsProps = AssessmentPerformanceProps & {
    studentId?: string;
};

const CourseAssessments: React.FunctionComponent<CourseProp & CourseAssessmentsProps> = ({
    course,
    studentId,
    disableAssessmentInfo,
    enableAttendanceEdit,
    enableEvaluationEdit,
    enableUpload,
}: CourseProp & CourseAssessmentsProps) => {
    const { setErrorMessage } = useErrorStore();

    const courseViewContract = useCourseViewContract();

    const [registeredAssessments, setRegisteredAssessments] = useState<Assessment[] | undefined>(undefined);

    useEffect(() => {
        (async () => {
            if (courseViewContract) {
                let assessmentsFetchMethod = () => courseViewContract.getRegisteredAssessments(course.id);
                if (studentId)
                    assessmentsFetchMethod = () =>
                        courseViewContract.getRegisteredAssessmentsOfStudent(course.id, studentId);
                setRegisteredAssessments(
                    (await alertError(assessmentsFetchMethod, setErrorMessage)).map((assessment) =>
                        convertToAssessmentInternal(assessment)
                    )
                );
            }
        })();
    }, [courseViewContract, course, studentId]);

    if (!registeredAssessments) return <LoadingBox />;

    return (
        <React.Fragment>
            {registeredAssessments.length > 0
                ? registeredAssessments.map((assessment, index) => (
                      <AssessmentAccordion assessment={assessment} key={index}>
                          <AssessmentPerformance
                              assessment={assessment}
                              studentId={studentId}
                              disableAssessmentInfo={disableAssessmentInfo}
                              enableAttendanceEdit={enableAttendanceEdit}
                              enableEvaluationEdit={enableEvaluationEdit}
                              enableUpload={enableUpload}
                          />
                      </AssessmentAccordion>
                  ))
                : "No assessments"}
        </React.Fragment>
    );
};
export default CourseAssessments;
