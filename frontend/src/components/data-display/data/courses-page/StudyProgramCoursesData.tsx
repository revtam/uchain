import React from "react";
import { Course } from "../../../../utils/converter/internal-types/internalTypes";
import CourseAccordion from "../../accordions/CourseAccordion";
import CourseRegistrationButton from "../../action-button/CourseRegistrationButton";
import { CourseDataProps } from "./CourseData";

export interface StudyProgramCoursesDataConfigProps {
    registerEnabled?: boolean;
    deregisterEnabled?: boolean;
    mainContentFunction: React.FunctionComponent<CourseDataProps>;
}

export interface StudyProgramCoursesDataProps extends StudyProgramCoursesDataConfigProps {
    courses: Course[];
}

const StudyProgramCoursesData: React.FunctionComponent<StudyProgramCoursesDataProps> = ({
    courses,
    mainContentFunction,
    registerEnabled = false,
    deregisterEnabled = false,
}: StudyProgramCoursesDataProps) => {
    return (
        <React.Fragment>
            {courses.map((course, index) => (
                <CourseAccordion course={course} key={index}>
                    {registerEnabled && (
                        <CourseRegistrationButton
                            courseId={course.id}
                            deregisterEnabled={deregisterEnabled}
                        />
                    )}
                    {mainContentFunction({ course: course })}
                </CourseAccordion>
            ))}
        </React.Fragment>
    );
};
export default StudyProgramCoursesData;
