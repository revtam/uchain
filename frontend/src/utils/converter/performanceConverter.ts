import { CalculatePointsResponse } from "../../imports/ethereum-abi-types/PerformanceController";
import {
    ExamattendanceResponse,
    GetEvaluationResponse,
    GetGradeResponse,
    SubmissionResponse,
} from "../../imports/ethereum-abi-types/PerformanceView";
import { convertMillisecondsToDateInternal } from "./basicConverter";
import { Attendance, Evaluation, Grading, Submission } from "./internal-types/internalTypes";

export const convertToAchievedPoints = (points: CalculatePointsResponse): number => points[0].toNumber();

export const convertToTotalPoints = (points: CalculatePointsResponse): number => points[1].toNumber();

export const convertToGradingInternal = (grading: GetGradeResponse): Grading => ({
    grade: grading[0].value.toNumber(),
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
    points: evaluation[0].achievedPoints.toNumber(),
    feedback: evaluation[0].feedback,
    lastModified: convertMillisecondsToDateInternal(evaluation[0].datetime),
    evaluatedByName: { firstName: evaluation[1], lastName: evaluation[2] },
});

export const convertToSubmissionInternal = (submission: SubmissionResponse): Submission => ({
    documentHashes: submission.documentHashes,
    lastModified: convertMillisecondsToDateInternal(submission.submissionDatetime),
});
