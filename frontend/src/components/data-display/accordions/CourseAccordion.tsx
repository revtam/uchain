import React from "react";
import useAuthStore from "../../../hooks/auth/authHooks";
import { useLoadSignal } from "../../../hooks/common/commonHooks";
import { UserRole } from "../../../utils/converter/contract-types/enums";
import { Course } from "../../../utils/converter/internal-types/internalTypes";
import CourseRegistrationButton from "../action-button/CourseRegistrationButton";
import CourseData from "../object-data/CourseData";
import OutlinedAccordion from "./OutlinedAccordion";

export interface CourseAccordionProps {
    course: Course;
    registerEnabled?: boolean;
    deregisterEnabled?: boolean;
    assessmentRegAndDeregEnabled?: boolean;
}

const CourseAccordion: React.FunctionComponent<CourseAccordionProps> = ({
    course,
    registerEnabled = false,
    deregisterEnabled = false,
    assessmentRegAndDeregEnabled = false,
}: CourseAccordionProps) => {
    const { userRole } = useAuthStore();
    const { loaded, signalLoad } = useLoadSignal();

    return (
        <OutlinedAccordion title={`${course.code} - ${course.title}`} signalLoad={signalLoad}>
            {userRole === UserRole.STUDENT && registerEnabled && (
                <CourseRegistrationButton courseId={course.id} deregisterEnabled={deregisterEnabled} />
            )}
            <CourseData
                course={course}
                assessmentRegAndDeregEnabled={assessmentRegAndDeregEnabled}
                shouldLoad={loaded}
            />
        </OutlinedAccordion>
    );
};

export default CourseAccordion;
