import React, { useEffect, useState } from "react";
import { Assessment, Name, User } from "../../../../../types/internal-types/internalTypes";
import { useCourseViewContract } from "../../../../../hooks/contract/contractHooks";
import DataTable from "../../../DataTable";
import { convertToAssessmentInternal } from "../../../../../utils/converter/courseConverter";
import { Box, Stack, Typography } from "@mui/material";
import LoadingBox from "../../../../LoadingBox";
import TitledTableRow from "../../../TitledTableRow";
import { alertError } from "../../../../../utils/contract/contractUtils";
import useErrorStore from "../../../../../hooks/error/errorHooks";
import {
    convertToUserInternal,
    convertUserToNameInternal,
} from "../../../../../utils/converter/userConverter";
import AssessmentCard, { AssessmentCardProps } from "../low-level/AssessmentCard";
import { CourseProp } from "../../props";
import {
    getDefaultDataPlaceholderOrData,
    getNormalizedEnumKey,
} from "../../../../../utils/common/commonUtils";
import { CourseType } from "../../../../../types/contract-types/enums";

export type CourseInfoProps = {
    showParticipants?: boolean;
};

export type CourseInfoStaticProps = CourseInfoProps & AssessmentCardProps;

const CourseInfo: React.FunctionComponent<CourseProp & CourseInfoStaticProps> = ({
    course,
    showParticipants = false,
    assessmentRegAndDeregEnabled,
}: CourseProp & CourseInfoStaticProps) => {
    const { setErrorMessage } = useErrorStore();
    const courseViewContract = useCourseViewContract();

    const [lecturerNames, setLecturerNames] = useState<Name[] | undefined>(undefined);
    const [assessments, setAssessments] = useState<Assessment[] | undefined>(undefined);
    const [participantsNumber, setParticipantsNumber] = useState<number | undefined>(undefined);
    const [participants, setParticipants] = useState<User[] | undefined>(undefined);

    useEffect(() => {
        if (courseViewContract) {
            courseViewContract
                .getLecturersAtCourse(course.id)
                .then((users) => setLecturerNames(users.map((user) => convertUserToNameInternal(user))))
                .catch(() => setLecturerNames([]));
            courseViewContract
                .getAssessmentsToCourseId(course.id)
                .then((assessments) =>
                    setAssessments(assessments.map((assessment) => convertToAssessmentInternal(assessment)))
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
    }, [courseViewContract, showParticipants]);

    if (!lecturerNames || !assessments || participantsNumber === undefined || !participants)
        return <LoadingBox />;

    return (
        <DataTable>
            <TitledTableRow title={"Teachers:"}>
                {lecturerNames?.map((name) => `${name.firstName} ${name.lastName}`).join(", ")}
            </TitledTableRow>
            <TitledTableRow title={"Type:"}>
                {getNormalizedEnumKey(course.courseType, CourseType).toUpperCase()}
            </TitledTableRow>
            <TitledTableRow title={"Classes:"}>
                {getDefaultDataPlaceholderOrData(
                    course.classes.map((classUnit, i) => (
                        <Box key={i}>
                            <Typography fontSize={"inherit"}>
                                {classUnit.time.toLocaleString()}, {classUnit.place}
                            </Typography>
                        </Box>
                    ))
                )}
            </TitledTableRow>
            <TitledTableRow title={"Registered people/places:"}>
                {participantsNumber} / {course.maxPlaces}
                {showParticipants && (
                    <Stack spacing={1.2} marginTop={2}>
                        <Typography fontWeight={600} fontSize={"inherit"} color={"inherit"}>
                            Participants:
                        </Typography>
                        {getDefaultDataPlaceholderOrData(
                            participants.map((participant, i) => (
                                <Typography key={i} fontSize={"inherit"} color={"inherit"}>
                                    • {participant.name.firstName} {participant.name.lastName} -{" "}
                                    {participant.id}
                                </Typography>
                            ))
                        )}
                    </Stack>
                )}
            </TitledTableRow>
            <TitledTableRow title={"Language:"}>{course.language}</TitledTableRow>
            <TitledTableRow title={"ECTS:"}>{course.ects}</TitledTableRow>
            <TitledTableRow title={"Registration period:"}>
                {course.registrationStart?.toLocaleString()} - {course.registrationDeadline?.toLocaleString()}
            </TitledTableRow>
            <TitledTableRow title={"Deregistration period:"}>
                {course.registrationStart?.toLocaleString()} -{" "}
                {course.deregistrationDeadline?.toLocaleString()}
            </TitledTableRow>
            <TitledTableRow title={"Description:"}>
                {getDefaultDataPlaceholderOrData(course.description)}
            </TitledTableRow>
            <TitledTableRow title={"Examination topics:"}>
                {getDefaultDataPlaceholderOrData(course.examTopics)}
            </TitledTableRow>
            <TitledTableRow title={"Assessments:"}>
                <Stack spacing={2}>
                    {getDefaultDataPlaceholderOrData(
                        assessments.map((assessment, i) => (
                            <AssessmentCard
                                assessment={assessment}
                                assessmentRegAndDeregEnabled={assessmentRegAndDeregEnabled}
                                key={i}
                            />
                        ))
                    )}
                </Stack>
            </TitledTableRow>
            <TitledTableRow title={"Grading criteria:"}>
                {course.gradeLevels.map((gradeLevel, i) => (
                    <Box key={i}>
                        <Typography>
                            {gradeLevel.gradeValue}: {">"}= {gradeLevel.minPercentageToAchieve}%
                        </Typography>
                    </Box>
                ))}
            </TitledTableRow>
            <TitledTableRow title={"Course requirements:"}>
                {getDefaultDataPlaceholderOrData(course.requirementCourseCodes.join(", "))}
            </TitledTableRow>
        </DataTable>
    );
};

export default CourseInfo;
