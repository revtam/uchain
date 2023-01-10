import React from "react";
import { Assessment } from "../../../../utils/converter/internal-types/internalTypes";
import { getNormalizedEnumKey } from "../../../../utils/common/commonUtils";
import DataTable from "../../DataTable";
import { AssessmentType } from "../../../../utils/converter/contract-types/enums";
import TitledTableRow from "../../TitledTableRow";

export interface AssessmentDataProps {
    assessment: Assessment;
}

const AssessmentData: React.FunctionComponent<AssessmentDataProps> = ({
    assessment,
}: AssessmentDataProps) => {
    return (
        <DataTable titleColumnMinWidth={100}>
            <TitledTableRow title={"Time, place:"}>
                {assessment.datetime.toLocaleDateString()}, {assessment.place}
            </TitledTableRow>
            <TitledTableRow title={"Type:"}>
                {getNormalizedEnumKey(assessment.assessmentType, AssessmentType)}
            </TitledTableRow>
            <TitledTableRow title={"Max. points:"}>{assessment.maxPoints}</TitledTableRow>
            <TitledTableRow title={"Min. required points:"}>{assessment.minPoints}</TitledTableRow>
            <TitledTableRow title={"Registration period:"}>
                {assessment.registrationStart.toLocaleDateString()} -{" "}
                {assessment.registrationDeadline.toLocaleDateString()}
            </TitledTableRow>
            <TitledTableRow title={"Deregistration period:"}>
                {assessment.registrationStart.toLocaleDateString()} -{" "}
                {assessment.deregistrationDeadline.toLocaleDateString()}
            </TitledTableRow>
        </DataTable>
    );
};
export default AssessmentData;
