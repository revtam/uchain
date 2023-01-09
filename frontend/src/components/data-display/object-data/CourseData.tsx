import React, { useEffect, useState } from "react";
import { Assessment, Course, Name, User } from "../../../utils/converter/internal-types/internalTypes";
import { useCourseViewContract } from "../../../hooks/contract/contractHooks";
import DataTable from "../DataTable";
import { convertToAssessmentInternal } from "../../../utils/converter/courseConverter";
import { Box, Typography } from "@mui/material";
import LoadingBox from "../../LoadingBox";
import TitledTableRow from "../TitledTableRow";
import { alertError } from "../../../utils/contract/contractUtils";
import useErrorStore from "../../../hooks/error/errorHooks";
import { convertToUserInternal, convertUserToNameInternal } from "../../../utils/converter/userConverter";
import AssessmentCard from "./AssessmentCard";

export interface CourseDataProps {
    course: Course;
    showParticipants?: boolean;
    assessmentRegAndDeregEnabled?: boolean;
    shouldLoad?: boolean;
}

const CourseData: React.FunctionComponent<CourseDataProps> = ({
    course,
    showParticipants = false,
    assessmentRegAndDeregEnabled = false,
    shouldLoad = true,
}: CourseDataProps) => {
    const { setErrorMessage } = useErrorStore();
    const courseViewContract = useCourseViewContract();

    const [lecturerNames, setLecturerNames] = useState<Name[] | undefined>(undefined);
    const [assessments, setAssessments] = useState<Assessment[] | undefined>(undefined);
    const [participantsNumber, setParticipantsNumber] = useState<number | undefined>(undefined);
    const [participants, setParticipants] = useState<User[] | undefined>(undefined);

    useEffect(() => {
        (async () => {
            if (courseViewContract && shouldLoad) {
                try {
                    setLecturerNames(
                        (await courseViewContract.getLecturersAtCourse(course.id)).map((user) =>
                            convertUserToNameInternal(user)
                        )
                    );
                } catch (error: any) {
                    setLecturerNames([]);
                }
                try {
                    setAssessments(
                        (await courseViewContract.getAssessmentsToCourseId(course.id)).map((assessment) =>
                            convertToAssessmentInternal(assessment)
                        )
                    );
                } catch (error: any) {
                    setAssessments([]);
                }
                try {
                    setParticipantsNumber(
                        Number(await courseViewContract.getCourseParticipantsNumber(course.id))
                    );
                } catch (error: any) {
                    setParticipantsNumber(0);
                }
                if (showParticipants) {
                    try {
                        setParticipants(
                            (
                                await alertError(
                                    () => courseViewContract.getCourseParticipants(course.id),
                                    setErrorMessage
                                )
                            ).map((user) => convertToUserInternal(user))
                        );
                    } catch (error: any) {
                        setParticipants([]);
                    }
                } else {
                    setParticipants([]);
                }
            }
        })();
    }, [courseViewContract, shouldLoad]);

    if (lecturerNames && assessments && participantsNumber && participants !== undefined)
        return (
            <DataTable>
                <TitledTableRow title={"Teachers:"}>
                    {lecturerNames?.map((name) => `${name.firstName} ${name.lastName}`).join(", ")}
                </TitledTableRow>
                <TitledTableRow title={"Classes:"}>
                    {course.classes.map((classUnit) => (
                        <Box>
                            <Typography>
                                {classUnit.time.toLocaleTimeString()}, {classUnit.place}
                            </Typography>
                        </Box>
                    ))}
                </TitledTableRow>
                <TitledTableRow title={"Registered people/places:"}>
                    {participantsNumber}/${course.maxPlaces}
                    {showParticipants &&
                        participants.length > 0 &&
                        participants.map((participant) => (
                            <Box>
                                <Typography>
                                    {participant.name.firstName} {participant.name.lastName} -{" "}
                                    {participant.id}
                                </Typography>
                            </Box>
                        ))}
                </TitledTableRow>
                <TitledTableRow title={"Language:"}>{course.language}</TitledTableRow>
                <TitledTableRow title={"ECTS:"}>{course.ects}</TitledTableRow>
                <TitledTableRow title={"Registration period:"}>
                    {course.registrationStart.toLocaleDateString()} -{" "}
                    {course.registrationDeadline.toLocaleDateString()}
                </TitledTableRow>
                <TitledTableRow title={"Deregistration period:"}>
                    {course.registrationStart.toLocaleDateString()} -{" "}
                    {course.deregistrationDeadline.toLocaleDateString()}
                </TitledTableRow>
                <TitledTableRow title={"Description:"}>{course.description} </TitledTableRow>
                <TitledTableRow title={"Examination topics:"}>{course.examTopics} </TitledTableRow>
                <TitledTableRow title={"Assessments:"}>
                    {assessments?.map((assessment) => (
                        <AssessmentCard
                            assessment={assessment}
                            assessmentRegAndDeregEnabled={assessmentRegAndDeregEnabled}
                        />
                    ))}
                </TitledTableRow>
                <TitledTableRow title={"Grading criteria:"}>
                    {course.gradeLevels.map((gradeLevel) => (
                        <Box>
                            <Typography>
                                {gradeLevel.gradeValue}: &gt= {gradeLevel.minPercentageToAchieve}%
                            </Typography>
                        </Box>
                    ))}
                </TitledTableRow>
                <TitledTableRow title={"Course requirements:"}>
                    {course.requirementCourseCodes.join(", ")}
                </TitledTableRow>
            </DataTable>
        );

    return <LoadingBox />;
};
export default CourseData;
