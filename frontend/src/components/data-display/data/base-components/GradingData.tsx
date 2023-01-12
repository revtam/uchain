import React, { useEffect, useState } from "react";
import { usePerformanceViewContract } from "../../../../hooks/contract/contractHooks";
import LoadingBox from "../../../LoadingBox";
import { alertError } from "../../../../utils/contract/contractUtils";
import useErrorStore from "../../../../hooks/error/errorHooks";
import { convertToGradingInternal } from "../../../../utils/converter/performanceConverter";
import { Grading } from "../../../../utils/converter/internal-types/internalTypes";
import DataTable from "../../DataTable";
import TitledTableRow from "../../TitledTableRow";
import GradingForm from "../../../forms/GradingForm";
import { useRerender } from "../../../../hooks/common/commonHooks";
import Typography from "@mui/material/Typography";
import TitledDataBox from "../../TitledDataBox";
import { CourseProp } from "../props";

export type GradingDataProps = {
    studentId?: string;
    editEnabled?: boolean;
};

const GradingData: React.FunctionComponent<GradingDataProps & CourseProp> = ({
    course,
    studentId,
    editEnabled = false,
}: GradingDataProps & CourseProp) => {
    const { setErrorMessage } = useErrorStore();
    const { renderState, updateRenderState } = useRerender();
    const performanceViewContract = usePerformanceViewContract();

    const [grading, setGrading] = useState<Grading | null | undefined>(undefined);

    useEffect(() => {
        if (performanceViewContract) {
            let gradeFetchMethod = () => performanceViewContract.getGrade(course.id);
            if (studentId)
                gradeFetchMethod = () => performanceViewContract.getGradeOfStudent(course.id, studentId);
            alertError(gradeFetchMethod, setErrorMessage)
                .then((grading) => setGrading(convertToGradingInternal(grading)))
                .catch(() => setGrading(null));
        }
    }, [performanceViewContract, studentId, renderState]);

    if (grading === undefined) return <LoadingBox />;

    return (
        <TitledDataBox title="Grading">
            {grading === null ? (
                <Typography>-</Typography>
            ) : (
                <DataTable titleColumnMinWidth={0}>
                    <TitledTableRow title={"Grade:"}>
                        {grading.grade} ({grading.isFinal ? "final" : "automatic"})
                    </TitledTableRow>
                    <TitledTableRow title={"Last modified:"}>
                        {grading.lastModified.toLocaleTimeString()}
                    </TitledTableRow>
                    <TitledTableRow title={"Feedback:"}>{grading.feedback}</TitledTableRow>
                    <TitledTableRow title={"Graded by:"}>
                        {grading.gradedByName.firstName} {grading.gradedByName.lastName}
                    </TitledTableRow>
                </DataTable>
            )}
            {editEnabled && studentId && (
                <GradingForm course={course} studentId={studentId} rerender={updateRenderState} />
            )}
        </TitledDataBox>
    );
};

export default GradingData;
