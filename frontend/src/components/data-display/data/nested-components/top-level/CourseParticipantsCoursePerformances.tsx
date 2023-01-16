import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useCourseViewContract } from "../../../../../hooks/contract/contractHooks";
import useErrorStore from "../../../../../hooks/error/errorHooks";
import { alertError } from "../../../../../utils/contract/contractUtils";
import { User } from "../../../../../utils/converter/internal-types/internalTypes";
import { convertToUserInternal } from "../../../../../utils/converter/userConverter";
import LoadingBox from "../../../../LoadingBox";
import UserAccordion from "../../../accordions/UserAccordion";
import UpdatePerformancesButton from "../../../action-button/UpdatePerformancesButton";
import CourseShortInfo from "../../base-components/CourseShortInfo";
import { CourseProp } from "../../props";
import CoursePerformanceSummary, {
    CoursePerformanceSummaryProps,
} from "../low-level/CoursePerformanceSummary";

export type CourseParticipantsCoursePerformancesStaticProps = CoursePerformanceSummaryProps;

const CourseParticipantsCoursePerformances: React.FunctionComponent<
    CourseProp & CourseParticipantsCoursePerformancesStaticProps
> = ({ course, gradingEnabled }: CourseProp & CourseParticipantsCoursePerformancesStaticProps) => {
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
        <React.Fragment>
            <Box marginBottom={2}>
                <UpdatePerformancesButton courseId={course.id} />
            </Box>
            <CourseShortInfo course={course} />
            {participants.length > 0 ? (
                <Stack spacing={2} marginTop={3}>
                    <Typography fontWeight={600}>Registered participants</Typography>
                    {participants.map((participant, index) => (
                        <UserAccordion user={participant} key={index}>
                            <CoursePerformanceSummary
                                course={course}
                                studentId={participant.id}
                                gradingEnabled={gradingEnabled}
                            />
                        </UserAccordion>
                    ))}
                </Stack>
            ) : (
                <Typography>No participants</Typography>
            )}
        </React.Fragment>
    );
};
export default CourseParticipantsCoursePerformances;
