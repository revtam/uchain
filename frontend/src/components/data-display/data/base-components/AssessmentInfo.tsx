import React from "react";
import { getNormalizedEnumKey } from "../../../../utils/common/commonUtils";
import DataTable from "../../DataTable";
import { AssessmentType } from "../../../../utils/converter/contract-types/enums";
import TitledTableRow from "../../TitledTableRow";
import { AssessmentProp } from "../props";
import { Stack } from "@mui/material";

const AssessmentInfo: React.FunctionComponent<AssessmentProp> = ({ assessment }: AssessmentProp) => {
    return (
        <Stack spacing={2}>
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
                    {assessment.registrationStart?.toLocaleDateString()} -{" "}
                    {assessment.registrationDeadline?.toLocaleDateString()}
                </TitledTableRow>
                <TitledTableRow title={"Deregistration period:"}>
                    {assessment.registrationStart?.toLocaleDateString()} -{" "}
                    {assessment.deregistrationDeadline?.toLocaleDateString()}
                </TitledTableRow>
            </DataTable>
        </Stack>
    );
};

export default AssessmentInfo;
