import React, { useEffect, useState } from "react";
import { usePerformanceControllerContract } from "../../../../hooks/contract/contractHooks";
import LoadingBox from "../../../LoadingBox";
import { alertError } from "../../../../utils/contract/contractUtils";
import useErrorStore from "../../../../hooks/error/errorHooks";
import Typography from "@mui/material/Typography";
import {
    convertToAchievedPoints,
    convertToTotalPoints,
} from "../../../../utils/converter/performanceConverter";
import {
    calculateRoundedDownPercentageWithPrecision,
    getDefaultDataPlaceholderOrData,
} from "../../../../utils/common/commonUtils";
import { CourseProp } from "../props";
import { Stack } from "@mui/material";

export type CourseTotalPointsProps = {
    studentId?: string;
};

const CourseTotalPoints: React.FunctionComponent<CourseTotalPointsProps & CourseProp> = ({
    course,
    studentId,
}: CourseTotalPointsProps & CourseProp) => {
    const { setErrorMessage } = useErrorStore();
    const performanceControllerContract = usePerformanceControllerContract();

    const [achievedPoints, setAchievedPoints] = useState<number | undefined>(undefined);
    const [totalPoints, setTotalPoints] = useState<number | undefined>(undefined);

    useEffect(() => {
        (async () => {
            if (performanceControllerContract) {
                let pointsFetchMethod = () => performanceControllerContract.calculatePoints(course.id);
                if (studentId)
                    pointsFetchMethod = () =>
                        performanceControllerContract.calculatePointsOfStudent(studentId, course.id);
                const points = await alertError(pointsFetchMethod, setErrorMessage);
                setAchievedPoints(convertToAchievedPoints(points));
                setTotalPoints(convertToTotalPoints(points));
            }
        })();
    }, [performanceControllerContract, studentId]);

    if (totalPoints === undefined || achievedPoints === undefined) return <LoadingBox />;

    return (
        <Stack spacing={2}>
            <Typography fontWeight={600} display="inline">
                Total evaluated points
            </Typography>
            <Typography>
                {achievedPoints} / {totalPoints}
            </Typography>
            <Typography>
                {totalPoints === 0
                    ? 0
                    : calculateRoundedDownPercentageWithPrecision(achievedPoints / totalPoints)}{" "}
                %
            </Typography>
        </Stack>
    );
};

export default CourseTotalPoints;
