import React, { useEffect, useState } from "react";
import { Name } from "../../../../utils/converter/internal-types/internalTypes";
import { useCourseViewContract } from "../../../../hooks/contract/contractHooks";
import DataTable from "../../DataTable";
import { Box, Typography } from "@mui/material";
import LoadingBox from "../../../LoadingBox";
import TitledTableRow from "../../TitledTableRow";
import { convertUserToNameInternal } from "../../../../utils/converter/userConverter";
import { CourseProp } from "../props";
import { getNormalizedEnumKey } from "../../../../utils/common/commonUtils";
import { CourseType } from "../../../../utils/converter/contract-types/enums";

const CourseShortInfo: React.FunctionComponent<CourseProp> = ({ course }: CourseProp) => {
    const courseViewContract = useCourseViewContract();

    const [lecturerNames, setLecturerNames] = useState<Name[] | undefined>(undefined);
    const [participantsNumber, setParticipantsNumber] = useState<number | undefined>(undefined);

    useEffect(() => {
        if (courseViewContract) {
            courseViewContract
                .getLecturersAtCourse(course.id)
                .then((users) => setLecturerNames(users.map((user) => convertUserToNameInternal(user))))
                .catch(() => setLecturerNames([]));

            courseViewContract
                .getCourseParticipantsNumber(course.id)
                .then((number) => setParticipantsNumber(Number(number)))
                .catch(() => setParticipantsNumber(0));
        }
    }, [courseViewContract]);

    if (!lecturerNames || participantsNumber === undefined) return <LoadingBox />;

    return (
        <DataTable>
            <TitledTableRow title={"Teachers:"}>
                {lecturerNames.map((name) => `${name.firstName} ${name.lastName}`).join(", ")}
            </TitledTableRow>
            <TitledTableRow title={"Type:"}>
                {getNormalizedEnumKey(course.courseType, CourseType).toUpperCase()}
            </TitledTableRow>
            <TitledTableRow title={"Registered people/places:"}>
                {participantsNumber} / {course.maxPlaces}
            </TitledTableRow>
            <TitledTableRow title={"Grading criteria:"}>
                {course.gradeLevels.map((gradeLevel, index) => (
                    <Typography key={index}>
                        {gradeLevel.gradeValue}: {">"}= {gradeLevel.minPercentageToAchieve}%
                    </Typography>
                ))}
            </TitledTableRow>
        </DataTable>
    );
};

export default CourseShortInfo;
