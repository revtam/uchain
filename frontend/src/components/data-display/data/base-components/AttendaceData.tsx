import React, { useEffect, useState } from "react";
import { usePerformanceViewContract } from "../../../../hooks/contract/contractHooks";
import LoadingBox from "../../../LoadingBox";
import { alertError } from "../../../../utils/contract/contractUtils";
import useErrorStore from "../../../../hooks/error/errorHooks";
import { Attendance } from "../../../../utils/converter/internal-types/internalTypes";
import DataTable from "../../DataTable";
import TitledTableRow from "../../TitledTableRow";
import { useRerender } from "../../../../hooks/common/commonHooks";
import Typography from "@mui/material/Typography";
import TitledDataBox from "../../TitledDataBox";
import AttendanceForm from "../../../forms/AttendanceForm";
import { convertToAttendanceInternal } from "../../../../utils/converter/performanceConverter";
import { AssessmentProp } from "../props";

export type AttendaceDataProps = {
    studentId?: string;
    editEnabled?: boolean;
};

const AttendaceData: React.FunctionComponent<AttendaceDataProps & AssessmentProp> = ({
    assessment,
    studentId,
    editEnabled = false,
}: AttendaceDataProps & AssessmentProp) => {
    const { setErrorMessage } = useErrorStore();
    const { renderState, updateRenderState } = useRerender();
    const performanceViewContract = usePerformanceViewContract();

    const [attendace, setAttendance] = useState<Attendance | null | undefined>(undefined);

    useEffect(() => {
        (async () => {
            if (performanceViewContract) {
                let attendanceCheckMethod = () => performanceViewContract.isExamAttendanceSet(assessment.id);
                let attendanceFetchMethod = () => performanceViewContract.getExamAttendance(assessment.id);
                if (studentId) {
                    attendanceCheckMethod = () =>
                        performanceViewContract.isExamAttendanceOfStudentSet(assessment.id, studentId);
                    attendanceFetchMethod = () =>
                        performanceViewContract.getExamAttendanceOfStudent(assessment.id, studentId);
                }
                if (await alertError(attendanceCheckMethod, setErrorMessage)) {
                    setAttendance(
                        convertToAttendanceInternal(await alertError(attendanceFetchMethod, setErrorMessage))
                    );
                } else {
                    setAttendance(null);
                }
            }
        })();
    }, [performanceViewContract, studentId, renderState]);

    if (attendace === undefined) return <LoadingBox />;

    return (
        <TitledDataBox title="Attendace">
            {attendace === null ? (
                <Typography>-</Typography>
            ) : (
                <DataTable titleColumnMinWidth={0}>
                    <TitledTableRow title={"Confirmation:"}>
                        {attendace.attended ? "attended" : "not attended"}
                    </TitledTableRow>
                    <TitledTableRow title={"Last modified:"}>
                        {attendace.lastModified.toLocaleString()}
                    </TitledTableRow>
                </DataTable>
            )}
            {editEnabled && studentId && attendace === null && (
                <AttendanceForm
                    assessmentId={assessment.id}
                    studentId={studentId}
                    rerender={updateRenderState}
                />
            )}
        </TitledDataBox>
    );
};

export default AttendaceData;
