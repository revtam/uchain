import { CalculatePointsResponse } from "../../contracts/imports/ethereum-abi-types/PerformanceController";
import {
    ExamattendanceResponse,
    GetEvaluationResponse,
    GetGradeResponse,
} from "../../contracts/imports/ethereum-abi-types/PerformanceView";
import { convertMillisecondsToDateInternal } from "./basicConverter";
import { Attendance, Evaluation, Grading } from "./internal-types/internalTypes";

export const convertToAchievedPoints = (points: CalculatePointsResponse): number => Number(points[0]);

export const convertToTotalPoints = (points: CalculatePointsResponse): number => Number(points[1]);

export const convertToGradingInternal = (grading: GetGradeResponse): Grading => ({
    grade: Number(grading[0].value),
    isFinal: grading[0].isFinal,
    feedback: grading[0].feedback,
    lastModified: convertMillisecondsToDateInternal(grading[0].datetime),
    gradedByName: { firstName: grading[1], lastName: grading[2] },
});

export const convertToAttendanceInternal = (attendance: ExamattendanceResponse): Attendance => ({
    attended: attendance.hasAttended,
    lastModified: convertMillisecondsToDateInternal(attendance.confirmationDateTime),
});

export const convertToEvaluationInternal = (evaluation: GetEvaluationResponse): Evaluation => ({
    points: Number(evaluation[0].achievedPoints),
    feedback: evaluation[0].feedback,
    lastModified: convertMillisecondsToDateInternal(evaluation[0].datetime),
    evaluatedByName: { firstName: evaluation[1], lastName: evaluation[2] },
});
