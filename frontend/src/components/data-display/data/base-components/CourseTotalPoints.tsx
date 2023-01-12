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
import { calculateRoundedDownPercentage } from "../../../../utils/common/commonUtils";
import { PERCENTAGE_DECIMAL_PRECISION } from "../../../../constants/constants";
import { CourseProp } from "../props";

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
        <Typography>
            <Typography fontWeight={600} display="inline">
                Total points/max points:{" "}
            </Typography>
            {achievedPoints} / {totalPoints}{" "}
            {calculateRoundedDownPercentage(achievedPoints / totalPoints, PERCENTAGE_DECIMAL_PRECISION)}
        </Typography>
    );
};

export default CourseTotalPoints;
