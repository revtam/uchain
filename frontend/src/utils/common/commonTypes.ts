import { Course, Semester, StudyProgram } from "../converter/internal-types/internalTypes";

export type SelectOption = {
    id: string | number | boolean;
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

export type FunctionComponentWithProp<MainProp> = (mainProp: MainProp) => React.ReactElement | null;
