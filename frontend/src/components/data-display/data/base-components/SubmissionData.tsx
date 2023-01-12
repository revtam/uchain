import React, { useEffect, useState } from "react";
import { usePerformanceViewContract } from "../../../../hooks/contract/contractHooks";
import LoadingBox from "../../../LoadingBox";
import { alertError } from "../../../../utils/contract/contractUtils";
import useErrorStore from "../../../../hooks/error/errorHooks";
import { Submission } from "../../../../utils/converter/internal-types/internalTypes";
import DataTable from "../../DataTable";
import TitledTableRow from "../../TitledTableRow";
import { useRerender } from "../../../../hooks/common/commonHooks";
import Typography from "@mui/material/Typography";
import TitledDataBox from "../../TitledDataBox";
import { convertToSubmissionInternal } from "../../../../utils/converter/performanceConverter";
import { Link } from "@mui/material";
import { FILEDOWNLOAD_ENDPOINT, FILESERVER_BASE_URL } from "../../../../constants/constants";
import SubmissionForm from "../../../forms/SubmissionForm";
import { AssessmentProp } from "../props";

export type SubmissionDataProps = {
    studentId?: string;
    uploadEnabled?: boolean;
};

const SubmissionData: React.FunctionComponent<SubmissionDataProps & AssessmentProp> = ({
    assessment,
    studentId,
    uploadEnabled = false,
}: SubmissionDataProps & AssessmentProp) => {
    const { setErrorMessage } = useErrorStore();
    const { renderState, updateRenderState } = useRerender();
    const performanceViewContract = usePerformanceViewContract();

    const [uploads, setUploads] = useState<Submission | null | undefined>(undefined);

    useEffect(() => {
        if (performanceViewContract) {
            let submissionFetchMethod = () => performanceViewContract.getSubmission(assessment.id);
            if (studentId)
                submissionFetchMethod = () =>
                    performanceViewContract.getSubmissionOfStudent(assessment.id, studentId);
            alertError(submissionFetchMethod, setErrorMessage)
                .then((submission) => setUploads(convertToSubmissionInternal(submission)))
                .catch(() => setUploads(null));
        }
    }, [performanceViewContract, studentId, renderState]);

    if (uploads === undefined) return <LoadingBox />;

    return (
        <TitledDataBox title="Uploads">
            {uploads === null ? (
                <Typography>-</Typography>
            ) : (
                <DataTable titleColumnMinWidth={0}>
                    <TitledTableRow title={"Documents:"}>
                        {uploads.documentHashes.map((hash) => (
                            <Link
                                href={`${FILESERVER_BASE_URL}/${FILEDOWNLOAD_ENDPOINT}/${hash}`}
                                target={"_blank"}
                                sx={{ textDecoration: "none" }}
                                display="block"
                            >
                                {hash}
                            </Link>
                        ))}
                    </TitledTableRow>
                    <TitledTableRow title={"Last modified:"}>
                        {uploads.lastModified.toLocaleTimeString()}
                    </TitledTableRow>
                </DataTable>
            )}
            {uploadEnabled && <SubmissionForm assessmentId={assessment.id} rerender={updateRenderState} />}
        </TitledDataBox>
    );
};

export default SubmissionData;