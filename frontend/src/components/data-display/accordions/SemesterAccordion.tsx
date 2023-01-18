import React from "react";
import { useLoadSignal } from "../../../hooks/common/commonHooks";
import { variables } from "../../../theme/theme";
import { getNormalizedEnumKey } from "../../../utils/common/commonUtils";
import { SemesterSeason } from "../../../types/contract-types/enums";
import { Semester } from "../../../types/internal-types/internalTypes";
import LoadingBox from "../../LoadingBox";
import CustomAccordion from "./CustomAccordion";

export interface SemesterAccordionProps {
    semester: Semester;
}

const SemesterAccordion: React.FunctionComponent<React.PropsWithChildren<SemesterAccordionProps>> = ({
    semester,
    children,
}: React.PropsWithChildren<SemesterAccordionProps>) => {
    const { loaded, signalLoad } = useLoadSignal();

    return (
        <CustomAccordion
            title={`${semester.year}${getNormalizedEnumKey(semester.season, SemesterSeason).charAt(0)}S`}
            arrowColor={variables.white}
            summaryBackgroundColor={variables.primary}
            summaryTextColor={variables.white}
            signalLoad={signalLoad}
        >
            {!loaded ? <LoadingBox /> : children}
        </CustomAccordion>
    );
};

export default SemesterAccordion;
