import { Course, Semester, StudyProgram } from "../../types/internal-types/internalTypes";

export type SelectOption = {
    id: string | number;
    label: string | number;
};

export type CoursesGroupedByStudyProgram = {
    studyProgram: StudyProgram;
    courses: Course[];
};

export type StudyProgramsByCourse = {
    course: Course;
    studyPrograms: StudyProgram[];
};

export type CoursesGroupedBySemester = {
    semester: Semester;
    courses: Course[];
};
