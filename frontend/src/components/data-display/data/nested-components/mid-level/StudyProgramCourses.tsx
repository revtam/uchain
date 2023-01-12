import React, { FunctionComponent } from "react";
import CourseAccordion from "../../../accordions/CourseAccordion";
import CourseRegistrationButton from "../../../action-button/CourseRegistrationButton";
import { CourseListProp, CourseProp } from "../../props";

export type StudyProgramCoursesProps = {
    courseAccordionContentComponent: FunctionComponent<CourseProp>;
    courseRegAndDeregEnabled?: boolean;
};

const StudyProgramCourses: FunctionComponent<CourseListProp & StudyProgramCoursesProps> = ({
    courses,
    courseAccordionContentComponent,
    courseRegAndDeregEnabled = false,
}: CourseListProp & StudyProgramCoursesProps) => {
    return (
        <React.Fragment>
            {courses.map((course, index) => (
                <CourseAccordion course={course} key={index}>
                    {courseRegAndDeregEnabled && <CourseRegistrationButton courseId={course.id} />}
                    {courseAccordionContentComponent({ course: course })}
                </CourseAccordion>
            ))}
        </React.Fragment>
    );
};

export default StudyProgramCourses;
