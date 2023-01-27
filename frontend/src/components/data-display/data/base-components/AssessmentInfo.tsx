import React from "react";
import { getNormalizedEnumKey } from "../../../../utils/common/commonUtils";
import DataTable from "../../DataTable";
import { AssessmentType } from "../../../../types/contract-types/enums";
import TitledTableRow from "../../TitledTableRow";
import { AssessmentProp } from "../props";

const AssessmentInfo: React.FunctionComponent<AssessmentProp> = ({ assessment }: AssessmentProp) => {
    return (
        <DataTable titleColumnMinWidth={100}>
            {assessment.assessmentType === AssessmentType.EXAM ? (
                <TitledTableRow title={"Time, place:"}>
                    {assessment.datetime.toLocaleString()}, {assessment.place}
                </TitledTableRow>
            ) : (
                <TitledTableRow title={"Deadline:"}>{assessment.datetime.toLocaleString()}</TitledTableRow>
            )}
            <TitledTableRow title={"Type:"}>
                {getNormalizedEnumKey(assessment.assessmentType, AssessmentType)}
            </TitledTableRow>
            <TitledTableRow title={"Max. points:"}>{assessment.maxPoints}</TitledTableRow>
            <TitledTableRow title={"Min. required points:"}>{assessment.minPoints}</TitledTableRow>
            <TitledTableRow title={"Requires separate registration"}>
                {assessment.isRegistrationRequired ? "Yes" : "No"}
            </TitledTableRow>
            {assessment.isRegistrationRequired && (
                <React.Fragment>
                    <TitledTableRow title={"Registration period:"}>
                        {assessment.registrationStart?.toLocaleString()} -{" "}
                        {assessment.registrationDeadline?.toLocaleString()}
                    </TitledTableRow>
                    <TitledTableRow title={"Deregistration period:"}>
                        {assessment.registrationStart?.toLocaleString()} -{" "}
                        {assessment.deregistrationDeadline?.toLocaleString()}
                    </TitledTableRow>
                </React.Fragment>
            )}
        </DataTable>
    );
};

export default AssessmentInfo;
