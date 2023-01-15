import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AssessmentProp } from "../../props";
import useErrorStore from "../../../../../hooks/error/errorHooks";
import { useCourseViewContract } from "../../../../../hooks/contract/contractHooks";
import { User } from "../../../../../utils/converter/internal-types/internalTypes";
import { alertError } from "../../../../../utils/contract/contractUtils";
import { convertToUserInternal } from "../../../../../utils/converter/userConverter";
import LoadingBox from "../../../../LoadingBox";
import UserAccordion from "../../../accordions/UserAccordion";
import AssessmentPerformance, { AssessmentPerformanceProps } from "../low-level/AssessmentPerformance";

const AssessmentParticipantsPerformances: React.FunctionComponent<
    AssessmentProp & AssessmentPerformanceProps
> = ({
    assessment,
    disableAssessmentInfo,
    enableAttendanceEdit,
    enableEvaluationEdit,
    enableUpload,
}: AssessmentProp & AssessmentPerformanceProps) => {
    const { setErrorMessage } = useErrorStore();
    const courseViewContract = useCourseViewContract();

    const [participants, setParticipants] = useState<User[] | undefined>(undefined);

    useEffect(() => {
        (async () => {
            if (courseViewContract) {
                setParticipants(
                    (
                        await alertError(
                            () => courseViewContract.getAssessmentParticipants(assessment.id),
                            setErrorMessage
                        )
                    ).map((user) => convertToUserInternal(user))
                );
            }
        })();
    }, [courseViewContract, assessment]);

    if (!participants) return <LoadingBox />;

    return (
        <Stack spacing={2}>
            {participants.map((participant, index) => (
                <UserAccordion user={participant} key={index}>
                    <AssessmentPerformance
                        assessment={assessment}
                        studentId={participant.id}
                        disableAssessmentInfo={disableAssessmentInfo}
                        enableAttendanceEdit={enableAttendanceEdit}
                        enableEvaluationEdit={enableEvaluationEdit}
                        enableUpload={enableUpload}
                    />
                </UserAccordion>
            ))}
        </Stack>
    );
};
export default AssessmentParticipantsPerformances;
