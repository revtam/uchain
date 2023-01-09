import React from "react";
import { Course, StudyProgram } from "../../../utils/converter/internal-types/internalTypes";
import CourseAccordion, { CourseAccordionConfigProps } from "./CourseAccordion";
import CustomAccordion from "./CustomAccordion";

export interface StudyProgramCoursesAccordionProps extends CourseAccordionConfigProps {
    studyProgram: StudyProgram;
    courses: Course[];
}

const StudyProgramCoursesAccordion: React.FunctionComponent<StudyProgramCoursesAccordionProps> = ({
    studyProgram,
    courses,
    registerEnabled,
    deregisterEnabled,
    assessmentRegAndDeregEnabled,
    showParticipants,
}: StudyProgramCoursesAccordionProps) => {
    return (
        <CustomAccordion
            title={studyProgram.title}
            arrowColor="var(--mui-palette-primary-main)"
            summaryBackgroundColor="var(--mui-palette-white-main)"
            summaryBorderEnabled
            summaryBorderColor="var(--mui-palette-primary-main)"
            summaryTextColor="var(--mui-palette-black-main)"
        >
            {courses.map((course, index) => (
                <CourseAccordion
                    course={course}
                    key={index}
                    registerEnabled={registerEnabled}
                    assessmentRegAndDeregEnabled={assessmentRegAndDeregEnabled}
                    deregisterEnabled={deregisterEnabled}
                    showParticipants={showParticipants}
                />
            ))}
        </CustomAccordion>
    );
};

export default StudyProgramCoursesAccordion;
