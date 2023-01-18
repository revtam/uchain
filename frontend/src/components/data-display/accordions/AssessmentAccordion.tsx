import React from "react";
import { useLoadSignal } from "../../../hooks/common/commonHooks";
import { variables } from "../../../theme/theme";
import { Assessment } from "../../../types/internal-types/internalTypes";
import LoadingBox from "../../LoadingBox";
import CustomAccordion from "./CustomAccordion";

export interface AssessmentAccordionProps {
    assessment: Assessment;
}

const CourseAccordion: React.FunctionComponent<React.PropsWithChildren<AssessmentAccordionProps>> = ({
    assessment,
    children,
}: React.PropsWithChildren<AssessmentAccordionProps>) => {
    const { loaded, signalLoad } = useLoadSignal();

    return (
        <CustomAccordion
            title={assessment.title}
            arrowColor={variables.primary}
            borderColor={variables.lightGrey}
            summaryTextColor={variables.black}
            summaryTextWeight={600}
            signalLoad={signalLoad}
        >
            {!loaded ? <LoadingBox /> : children}
        </CustomAccordion>
    );
};

export default CourseAccordion;
