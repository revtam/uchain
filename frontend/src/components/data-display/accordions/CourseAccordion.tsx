import React from "react";
import useAuthStore from "../../../hooks/auth/authHooks";
import { useLoadSignal } from "../../../hooks/common/commonHooks";
import { UserRole } from "../../../utils/converter/contract-types/enums";
import { Course } from "../../../utils/converter/internal-types/internalTypes";
import CourseRegistrationButton from "../action-button/CourseRegistrationButton";
import CourseData, { CourseDataConfigProps } from "../object-data/CourseData";
import CustomAccordion from "./CustomAccordion";

export interface CourseAccordionConfigProps extends CourseDataConfigProps {
    registerEnabled?: boolean;
    deregisterEnabled?: boolean;
}

export interface CourseAccordionProps extends CourseAccordionConfigProps {
    course: Course;
}

const CourseAccordion: React.FunctionComponent<CourseAccordionProps> = ({
    course,
    registerEnabled = false,
    deregisterEnabled = false,
    assessmentRegAndDeregEnabled,
    showParticipants,
}: CourseAccordionProps) => {
    const { userRole } = useAuthStore();
    const { loaded, signalLoad } = useLoadSignal();

    return (
        <CustomAccordion
            title={`${course.code} - ${course.title}`}
            arrowColor="var(--mui-palette-primary-main)"
            borderEnabled
            borderColor="var(--mui-palette-lightgrey-main)"
            summaryTextColor="var(--mui-palette-black-main)"
            summaryTextWeight={600}
            signalLoad={signalLoad}
        >
            {userRole === UserRole.STUDENT && registerEnabled && (
                <CourseRegistrationButton courseId={course.id} deregisterEnabled={deregisterEnabled} />
            )}
            <CourseData
                course={course}
                assessmentRegAndDeregEnabled={assessmentRegAndDeregEnabled}
                showParticipants={showParticipants}
                shouldLoad={loaded}
            />
        </CustomAccordion>
    );
};

export default CourseAccordion;
