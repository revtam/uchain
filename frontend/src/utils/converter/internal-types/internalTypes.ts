import { AssessmentType, CourseType, SemesterSeason } from "../contract-types/enums";

export type Profile = {
    firstName: string;
    lastName: string;
    gender: number;
    dateOfBirth: Date;
    nationality: string;
    phone: string;
    email: string;
    role: number;
    programIds: string[];
};

export type Name = {
    firstName: string;
    lastName: string;
};

export type User = {
    id: string;
    name: Name;
};

export type StudyProgram = {
    id: string;
    title: string;
};

export type Class = {
    time: Date;
    place: string;
};

export type GradeLevel = {
    gradeValue: number;
    minPercentageToAchieve: number;
};

export type Semester = {
    year: number;
    season: SemesterSeason;
};

export type Course = {
    id: string;
    title: string;
    code: string;
    courseType: CourseType;
    semester: Semester;
    description: string;
    examTopics: string;
    language: string;
    ects: number;
    maxPlaces: number;
    registrationStart: Date | undefined;
    registrationDeadline: Date | undefined;
    deregistrationDeadline: Date | undefined;
    classes: Class[];
    gradeLevels: GradeLevel[];
    requirementCourseCodes: string[];
};

export type Assessment = {
    id: string;
    title: string;
    datetime: Date;
    place: string;
    assessmentType: AssessmentType;
    maxPoints: number;
    minPoints: number;
    isRegistrationRequired: boolean;
    registrationStart: Date | undefined;
    registrationDeadline: Date | undefined;
    deregistrationDeadline: Date | undefined;
};

export type Grading = {
    grade: number;
    isFinal: boolean;
    lastModified: Date;
    feedback: string;
    gradedByName: Name;
};

export type Attendance = {
    attended: boolean;
    lastModified: Date;
};

export type Evaluation = {
    points: number;
    lastModified: Date;
    feedback: string;
    evaluatedByName: Name;
};

export type Submission = {
    documentHashes: string[];
    lastModified: Date;
};

export type CourseCreationFormType = {
    course: Course;
    assessments: Assessment[];
    lecturers: User[];
    studyPrograms: StudyProgram[];
};
