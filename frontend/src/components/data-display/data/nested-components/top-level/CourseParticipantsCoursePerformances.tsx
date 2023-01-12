import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useCourseViewContract } from "../../../../../hooks/contract/contractHooks";
import useErrorStore from "../../../../../hooks/error/errorHooks";
import { alertError } from "../../../../../utils/contract/contractUtils";
import { User } from "../../../../../utils/converter/internal-types/internalTypes";
import { convertToUserInternal } from "../../../../../utils/converter/userConverter";
import LoadingBox from "../../../../LoadingBox";
import UserAccordion from "../../../accordions/UserAccordion";
import CourseShortInfo from "../../base-components/CourseShortInfo";
import { CourseProp } from "../../props";
import CoursePerformanceSummary, {
    CoursePerformanceSummaryProps,
} from "../low-level/CoursePerformanceSummary";
import CourseAssessments, { CourseAssessmentsProps } from "../mid-level/CourseAssessments";

export type CourseParticipantsCoursePerformancesStaticProps = CourseAssessmentsProps &
    CoursePerformanceSummaryProps;

const CourseParticipantsCoursePerformances: React.FunctionComponent<
    CourseProp & CourseParticipantsCoursePerformancesStaticProps
> = ({
    course,
    disableAssessmentInfo,
    enableAttendanceEdit,
    enableEvaluationEdit,
    enableUpload,
    gradingEnabled,
}: CourseProp & CourseParticipantsCoursePerformancesStaticProps) => {
    const { setErrorMessage } = useErrorStore();

    const courseViewContract = useCourseViewContract();

    const [participants, setParticipants] = useState<User[] | undefined>(undefined);

    useEffect(() => {
        (async () => {
            if (courseViewContract) {
                setParticipants(
                    (
                        await alertError(
                            () => courseViewContract.getCourseParticipants(course.id),
                            setErrorMessage
                        )
                    ).map((user) => convertToUserInternal(user))
                );
            }
        })();
    }, [courseViewContract, course]);

    if (!participants) return <LoadingBox />;

    return (
        <Stack spacing={3}>
            <CourseShortInfo course={course} />
            <Stack spacing={2}>
                {participants.map((participant) => (
                    <UserAccordion user={participant}>
                        <CoursePerformanceSummary
                            course={course}
                            studentId={participant.id}
                            gradingEnabled={gradingEnabled}
                        />
                        <CourseAssessments
                            course={course}
                            studentId={participant.id}
                            disableAssessmentInfo={disableAssessmentInfo}
                            enableAttendanceEdit={enableAttendanceEdit}
                            enableEvaluationEdit={enableEvaluationEdit}
                            enableUpload={enableUpload}
                        />
                    </UserAccordion>
                ))}
            </Stack>
        </Stack>
    );
};
export default CourseParticipantsCoursePerformances;
