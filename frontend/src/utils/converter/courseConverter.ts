import { AssessmentContentRequest } from "../../contracts/imports/ethereum-abi-types/AssessmentDataStorage";
import {
    ClassesRequest,
    CreateNewCourseRequest,
    GradeLevelsRequest,
} from "../../contracts/imports/ethereum-abi-types/CourseController";
import { GradelevelResponse } from "../../contracts/imports/ethereum-abi-types/CourseDataManager";
import {
    AssessmentResponse,
    ClassesResponse,
    CourseResponse,
} from "../../contracts/imports/ethereum-abi-types/CourseView";
import {
    convertDateToMilliseconds,
    convertMillisecondsToDateInternal,
    convertToContractPercentage,
    convertToDateExternal,
    convertToPercentage,
} from "./basicConverter";
import {
    Assessment,
    Class,
    Course,
    CourseCreationFormType,
    GradeLevel,
} from "./internal-types/internalTypes";

export const convertToClassInternal = (classUnit: ClassesResponse): Class => ({
    time: convertMillisecondsToDateInternal(classUnit.datetime),
    place: classUnit.place,
});

export const convertToClassExternal = (classUnit: Class): ClassesRequest => ({
    datetime: convertDateToMilliseconds(classUnit.time),
    place: classUnit.place,
});

export const convertToGradeLevelInternal = (gradeLevel: GradelevelResponse): GradeLevel => ({
    gradeValue: Number(gradeLevel.grade),
    minPercentageToAchieve: convertToPercentage(Number(gradeLevel.minPercentage)),
});

export const convertToGradeLevelExternal = (gradeLevel: GradeLevel): GradeLevelsRequest => ({
    grade: gradeLevel.gradeValue,
    minPercentage: convertToContractPercentage(gradeLevel.minPercentageToAchieve),
});

export const convertToAssessmentInternal = (assessment: AssessmentResponse): Assessment => ({
    id: assessment.assessmentId.toString(),
    title: assessment.assessmentContent.title,
    datetime: convertMillisecondsToDateInternal(assessment.assessmentContent.datetime),
    place: assessment.assessmentContent.place,
    assessmentType: assessment.assessmentContent.assessmentType,
    maxPoints: Number(assessment.assessmentContent.maxPoints),
    minPoints: Number(assessment.assessmentContent.minPoints),
    isRegistrationRequired: assessment.assessmentContent.isRegistrationRequired,
    registrationStart: convertMillisecondsToDateInternal(assessment.assessmentContent.registrationStart),
    registrationDeadline: convertMillisecondsToDateInternal(
        assessment.assessmentContent.registrationDeadline
    ),
    deregistrationDeadline: convertMillisecondsToDateInternal(
        assessment.assessmentContent.deregistrationDeadline
    ),
});

export const convertToAssessmentExternal = (assessment: Assessment): AssessmentContentRequest => ({
    title: assessment.title,
    datetime: convertDateToMilliseconds(assessment.datetime),
    place: assessment.place,
    assessmentType: assessment.assessmentType,
    maxPoints: assessment.maxPoints,
    minPoints: assessment.minPoints,
    isRegistrationRequired: assessment.isRegistrationRequired,
    registrationStart: assessment.registrationStart
        ? convertDateToMilliseconds(assessment.registrationStart)
        : 0,
    registrationDeadline: assessment.registrationDeadline
        ? convertDateToMilliseconds(assessment.registrationDeadline)
        : 0,
    deregistrationDeadline: assessment.deregistrationDeadline
        ? convertDateToMilliseconds(assessment.deregistrationDeadline)
        : 0,
});

export const convertToCourseInternal = (course: CourseResponse): Course => {
    return {
        id: course.courseId.toString(),
        title: course.content.title,
        code: course.content.code,
        courseType: course.content.courseType,
        semester: {
            year: Number(course.content.semester.year),
            season: course.content.semester.season,
        },
        description: course.content.description,
        examTopics: course.content.examTopics,
        language: course.content.language,
        ects: Number(course.content.ects),
        maxPlaces: Number(course.content.maxPlaces),
        registrationStart: convertMillisecondsToDateInternal(course.content.registrationStart),
        registrationDeadline: convertMillisecondsToDateInternal(course.content.registrationDeadline),
        deregistrationDeadline: convertMillisecondsToDateInternal(course.content.deregistrationDeadline),
        classes: course.content.classes.map((classUnit) => convertToClassInternal(classUnit)),
        gradeLevels: course.content.gradeLevels.map((gradeLevel) => convertToGradeLevelInternal(gradeLevel)),
        requirementCourseCodes: course.content.requirementCourseCodes,
    };
};

export const convertToCourseExternal = (course: Course): CreateNewCourseRequest => ({
    title: course.title,
    code: course.code,
    courseType: course.courseType,
    semester: course.semester,
    description: course.description,
    examTopics: course.examTopics,
    language: course.language,
    ects: course.ects,
    maxPlaces: course.maxPlaces,
    registrationStart: course.registrationStart ? convertDateToMilliseconds(course.registrationStart) : 0,
    registrationDeadline: course.registrationDeadline
        ? convertDateToMilliseconds(course.registrationDeadline)
        : 0,
    deregistrationDeadline: course.deregistrationDeadline
        ? convertDateToMilliseconds(course.deregistrationDeadline)
        : 0,
    classes: course.classes.map((classUnit) => convertToClassExternal(classUnit)),
    gradeLevels: course.gradeLevels.map((gradeLevel) => convertToGradeLevelExternal(gradeLevel)),
    requirementCourseCodes: course.requirementCourseCodes,
});

export const convertToCourseCreationExternal = (
    data: CourseCreationFormType
): [CreateNewCourseRequest, AssessmentContentRequest[], string[], string[]] => {
    return [
        convertToCourseExternal(data.course),
        data.assessments.map((assessment) => convertToAssessmentExternal(assessment)),
        data.lecturers.map((user) => user.id),
        data.studyPrograms.map((studyProgram) => studyProgram.id),
    ];
};
