import React, { useEffect, useState } from "react";
import { usePerformanceViewContract } from "../../../../hooks/contract/contractHooks";
import LoadingBox from "../../../LoadingBox";
import { alertError } from "../../../../utils/contract/contractUtils";
import useErrorStore from "../../../../hooks/error/errorHooks";
import { Evaluation } from "../../../../types/internal-types/internalTypes";
import DataTable from "../../DataTable";
import TitledTableRow from "../../TitledTableRow";
import { useRerender } from "../../../../hooks/common/commonHooks";
import Typography from "@mui/material/Typography";
import TitledDataBox from "../../TitledDataBox";
import { convertToEvaluationInternal } from "../../../../utils/converter/performanceConverter";
import EvaluationForm from "../../../forms/EvaluationForm";
import { AssessmentProp } from "../props";
import { getDefaultDataPlaceholderOrData } from "../../../../utils/common/commonUtils";

export type EvaluationDataProps = {
    studentId?: string;
    editEnabled?: boolean;
};

const EvaluationData: React.FunctionComponent<EvaluationDataProps & AssessmentProp> = ({
    assessment,
    studentId,
    editEnabled = false,
}: EvaluationDataProps & AssessmentProp) => {
    const { setErrorMessage } = useErrorStore();
    const { renderState, updateRenderState } = useRerender();
    const performanceViewContract = usePerformanceViewContract();

    const [evaluation, setEvaluation] = useState<Evaluation | null | undefined>(undefined);

    useEffect(() => {
        (async () => {
            if (performanceViewContract) {
                let evaluationCheckMethod = () => performanceViewContract.isEvaluationSet(assessment.id);
                let evaluationFetchMethod = () => performanceViewContract.getEvaluation(assessment.id);
                if (studentId) {
                    evaluationCheckMethod = () =>
                        performanceViewContract.isEvaluationOfStudentSet(assessment.id, studentId);
                    evaluationFetchMethod = () =>
                        performanceViewContract.getEvaluationOfStudent(assessment.id, studentId);
                }
                if (await alertError(evaluationCheckMethod, setErrorMessage)) {
                    setEvaluation(
                        convertToEvaluationInternal(await alertError(evaluationFetchMethod, setErrorMessage))
                    );
                } else {
                    setEvaluation(null);
                }
            }
        })();
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
                        {evaluation.lastModified.toLocaleString()}
                    </TitledTableRow>
                    <TitledTableRow title={"Feedback:"}>
                        {getDefaultDataPlaceholderOrData(evaluation.feedback)}
                    </TitledTableRow>
                    <TitledTableRow title={"Evaluated by:"}>
                        {evaluation.evaluatedByName.firstName} {evaluation.evaluatedByName.lastName}
                    </TitledTableRow>
                </DataTable>
            )}
            {editEnabled && studentId && (
                <EvaluationForm
                    assessmentId={assessment.id}
                    studentId={studentId}
                    rerender={updateRenderState}
                />
            )}
        </TitledDataBox>
    );
};
export default EvaluationData;
