import { FunctionComponent } from "react";
import { FunctionComponentWithProp } from "../../../utils/common/commonTypes";
import {
    Assessment,
    Course,
    StudyProgram,
    User,
} from "../../../utils/converter/internal-types/internalTypes";

export type CourseProp = {
    course: Course;
};

// export type DynamicallySetCourseProp = {
//     course?: Course;
// };

export type CourseListProp = {
    courses: Course[];
};

export type UserProp = {
    user: User;
};

export type UserListProp = {
    users: User[];
};

export type AssessmentProp = {
    assessment: Assessment;
};

export type AssessmentListProp = {
    assessments: Assessment[];
};

export type StudyProgramProp = {
    studyProgram: StudyProgram;
};

export type ChildComponentWithProp<Prop> = {
    childComponentWithProp: FunctionComponentWithProp<Prop> | FunctionComponent<Prop>;
};

// export type ChildComponentWithCourseProp = {
//     childComponentWithCourse: FunctionalComponentWithProp<CourseProp>;
// };

// export type ChildComponentWithCourseListProp = {
//     childComponentWithCourses: FunctionalComponentWithProp<CourseListProp>;
// };

// export type ChildComponentWithUserProp = {
//     childComponentWithUser: FunctionalComponentWithProp<UserProp>;
// };

// export type ChildComponentWithUserListProp = {
//     childComponentWithUsers: FunctionalComponentWithProp<UserListProp>;
// };

// export type ChildComponentWithAssessmentProp = {
//     childComponentWithAssessment: FunctionalComponentWithProp<AssessmentProp>;
// };

// export type ChildComponentWithAssessmentListProp = {
//     childComponentWithAssessments: FunctionalComponentWithProp<AssessmentListProp>;
// };
