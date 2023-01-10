import React, { useEffect, useState } from "react";
import { usePerformanceViewContract } from "../../../../hooks/contract/contractHooks";
import LoadingBox from "../../../LoadingBox";
import { alertError } from "../../../../utils/contract/contractUtils";
import useErrorStore from "../../../../hooks/error/errorHooks";
import { Attendance, Evaluation } from "../../../../utils/converter/internal-types/internalTypes";
import DataTable from "../../DataTable";
import TitledTableRow from "../../TitledTableRow";
import { useRerender } from "../../../../hooks/common/commonHooks";
import Typography from "@mui/material/Typography";
import TitledDataBox from "../../TitledDataBox";
import AttendanceForm from "../../../forms/AttendanceForm";
import {
    convertToAttendanceInternal,
    convertToEvaluationInternal,
} from "../../../../utils/converter/performanceConverter";

export interface EvaluationDataProps {
    assessmentId: string;
    studentId?: string;
    editEnabled?: boolean;
}

const EvaluationData: React.FunctionComponent<EvaluationDataProps> = ({
    assessmentId,
    studentId,
    editEnabled = false,
}: EvaluationDataProps) => {
    const { setErrorMessage } = useErrorStore();
    const { renderState, updateRenderState } = useRerender();
    const performanceViewContract = usePerformanceViewContract();

    const [evaluation, setEvaluation] = useState<Evaluation | null | undefined>(undefined);

    useEffect(() => {
        if (performanceViewContract) {
            let evaluationFetchMethod = () => performanceViewContract.getEvaluation(assessmentId);
            if (studentId)
                evaluationFetchMethod = () =>
                    performanceViewContract.getEvaluationOfStudent(assessmentId, studentId);
            alertError(evaluationFetchMethod, setErrorMessage)
                .then((evaluation) => convertToEvaluationInternal(evaluation))
                .catch(() => setEvaluation(null));
        }
    }, [performanceViewContract, studentId, renderState]);

    if (evaluation === undefined) return <LoadingBox />;

    return (
        <TitledDataBox title="Evaluation">
            {evaluation === null ? (
                <Typography>-</Typography>
            ) : (
                <DataTable titleColumnMinWidth={0}>
                    <TitledTableRow title={"Points:"}>{evaluation.points}</TitledTableRow>
                    <TitledTableRow title={"Last modified:"}>
                        {evaluation.lastModified.toLocaleTimeString()}
                    </TitledTableRow>
                    <TitledTableRow title={"Feedback:"}>{evaluation.feedback}</TitledTableRow>
                    <TitledTableRow title={"Evaluated by:"}>
                        {evaluation.evaluatedByName.firstName} {evaluation.evaluatedByName.lastName}
                    </TitledTableRow>
                </DataTable>
            )}
            {editEnabled && studentId && evaluation === null && (
                <EvaluationForm
                    assessmentId={assessmentId}
                    studentId={studentId}
                    rerender={updateRenderState}
                />
            )}
        </TitledDataBox>
    );
};
export default EvaluationData;
