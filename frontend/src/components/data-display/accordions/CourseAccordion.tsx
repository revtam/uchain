import React from "react";
import { useLoadSignal } from "../../../hooks/common/commonHooks";
import { variables } from "../../../theme/theme";
import { Course } from "../../../utils/converter/internal-types/internalTypes";
import LoadingBox from "../../LoadingBox";
import CustomAccordion from "./CustomAccordion";

export interface CourseAccordionProps {
    course: Course;
}

const CourseAccordion: React.FunctionComponent<React.PropsWithChildren<CourseAccordionProps>> = ({
    course,
    children,
}: React.PropsWithChildren<CourseAccordionProps>) => {
    const { loaded, signalLoad } = useLoadSignal();

    return (
        <CustomAccordion
            title={`${course.code} - ${course.id} - ${course.title}`}
            arrowColor={variables.primary}
            borderEnabled
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
