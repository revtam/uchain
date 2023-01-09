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
import AssessmentCard, { AssessmentCardConfigProps } from "./AssessmentCard";

export interface CourseDataConfigProps extends AssessmentCardConfigProps {
    showParticipants?: boolean;
}

export interface CourseDataProps extends CourseDataConfigProps {
    course: Course;
    shouldLoad?: boolean;
}

const CourseData: React.FunctionComponent<CourseDataProps> = ({
    course,
    showParticipants = false,
    assessmentRegAndDeregEnabled,
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
                courseViewContract
                    .getLecturersAtCourse(course.id)
                    .then((users) => setLecturerNames(users.map((user) => convertUserToNameInternal(user))))
                    .catch(() => setLecturerNames([]));
                courseViewContract
                    .getAssessmentsToCourseId(course.id)
                    .then((assessments) =>
                        setAssessments(
                            assessments.map((assessment) => convertToAssessmentInternal(assessment))
                        )
                    )
                    .catch(() => setAssessments([]));
                courseViewContract
                    .getCourseParticipantsNumber(course.id)
                    .then((number) => setParticipantsNumber(Number(number)))
                    .catch(() => setParticipantsNumber(0));
                if (showParticipants) {
                    alertError(() => courseViewContract.getCourseParticipants(course.id), setErrorMessage)
                        .then((users) => setParticipants(users.map((user) => convertToUserInternal(user))))
                        .catch(() => setParticipants([]));
                } else {
                    setParticipants([]);
                }
            }
        })();
    }, [courseViewContract, shouldLoad]);

    if (!lecturerNames || !assessments || participantsNumber === undefined || !participants)
        return <LoadingBox />;

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
                                {participant.name.firstName} {participant.name.lastName} - {participant.id}
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
};
export default CourseData;
