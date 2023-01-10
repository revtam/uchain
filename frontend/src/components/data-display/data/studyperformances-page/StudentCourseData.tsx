import React, { useEffect, useState } from "react";
import { useCourseViewContract } from "../../../../hooks/contract/contractHooks";
import useErrorStore from "../../../../hooks/error/errorHooks";
import { alertError } from "../../../../utils/contract/contractUtils";
import { convertToAssessmentInternal } from "../../../../utils/converter/courseConverter";
import { Assessment, Course } from "../../../../utils/converter/internal-types/internalTypes";
import LoadingBox from "../../../LoadingBox";
import AssessmentAccordion from "../../accordions/AssessmentAccordion";
import StudentCoursePerformanceTotal from "./StudentCoursePerformanceTotal";

export interface StudentCourseDataProps {
    course: Course;
}

const StudentCourseData: React.FunctionComponent<StudentCourseDataProps> = ({
    course,
}: StudentCourseDataProps) => {
    const { setErrorMessage } = useErrorStore();
    const courseViewContract = useCourseViewContract();

    const [registeredAssessments, setRegisteredAssessments] = useState<Assessment[] | undefined>(undefined);

    useEffect(() => {
        (async () => {
            if (courseViewContract) {
                const allAssessments = (
                    await alertError(
                        () => courseViewContract.getAssessmentsToCourseId(course.id),
                        setErrorMessage
                    )
                ).map((assessment) => convertToAssessmentInternal(assessment));
                setRegisteredAssessments(
                    allAssessments.filter(
                        async (assessment) =>
                            await alertError(
                                () => courseViewContract.isRegisteredToAssessment(assessment.id),
                                setErrorMessage
                            )
                                .then((result) => result)
                                .catch(() => false)
                    )
                );
            }
        })();
    }, [courseViewContract]);

    if (!registeredAssessments) return <LoadingBox />;

    return (
        <React.Fragment>
            <StudentCoursePerformanceTotal course={course} />
            {registeredAssessments.map((assessment, index) => (
                <AssessmentAccordion assessment={assessment} key={index}>
                    <AssessmentExtendedData />
                </AssessmentAccordion>
            ))}
        </React.Fragment>
    );
};
export default StudentCourseData;
