import { Assessment, Course, StudyProgram, User } from "../../../types/internal-types/internalTypes";

export type CourseProp = {
    course: Course;
};

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
