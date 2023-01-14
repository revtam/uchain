import { AssessmentContentRequest } from "../../imports/ethereum-abi-types/AssessmentDataStorage";
import {
    ClassesRequest,
    CreateNewCourseRequest,
    GradeLevelsRequest,
} from "../../imports/ethereum-abi-types/CourseController";
import { GradelevelResponse } from "../../imports/ethereum-abi-types/CourseDataManager";
import {
    AssessmentResponse,
    ClassesResponse,
    CourseResponse,
} from "../../imports/ethereum-abi-types/CourseView";
import {
    convertDateToMilliseconds,
    convertDateToOptionalMilliseconds,
    convertMillisecondsToDateInternal,
    convertMillisecondsToOptionalDateInternal,
    convertToContractPercentage,
    convertToPercentage,
} from "./basicConverter";
import {
    Assessment,
    Class,
    Course,
    CourseCreationFormType,
    GradeLevel,
} from "./internal-types/internalTypes";
import { extractOptionId } from "./optionConverter";

export const convertToClassInternal = (classUnit: ClassesResponse): Class => ({
    time: convertMillisecondsToDateInternal(classUnit.datetime),
    place: classUnit.place,
});

export const convertToClassExternal = (classUnit: Class): ClassesRequest => ({
    datetime: convertDateToMilliseconds(classUnit.time),
    place: classUnit.place,
});

export const convertToGradeLevelInternal = (gradeLevel: GradelevelResponse): GradeLevel => ({
    gradeValue: gradeLevel.grade.toNumber(),
    minPercentageToAchieve: convertToPercentage(gradeLevel.minPercentage.toNumber()),
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
    maxPoints: assessment.assessmentContent.maxPoints.toNumber(),
    minPoints: assessment.assessmentContent.minPoints.toNumber(),
    isRegistrationRequired: assessment.assessmentContent.isRegistrationRequired,
    registrationStart: convertMillisecondsToOptionalDateInternal(
        assessment.assessmentContent.registrationStart
    ),
    registrationDeadline: convertMillisecondsToOptionalDateInternal(
        assessment.assessmentContent.registrationDeadline
    ),
    deregistrationDeadline: convertMillisecondsToOptionalDateInternal(
        assessment.assessmentContent.deregistrationDeadline
    ),
});

export const convertToAssessmentExternal = (assessment: Assessment): AssessmentContentRequest => ({
    title: assessment.title,
    datetime: convertDateToMilliseconds(assessment.datetime),
    place: assessment.place,
    assessmentType: assessment.assessmentType,
    maxPoints: parseInt(assessment.maxPoints.toString()),
    minPoints: parseInt(assessment.minPoints.toString()),
    isRegistrationRequired: assessment.isRegistrationRequired,
    registrationStart: convertDateToOptionalMilliseconds(assessment.registrationStart),
    registrationDeadline: convertDateToOptionalMilliseconds(assessment.registrationDeadline),
    deregistrationDeadline: convertDateToOptionalMilliseconds(assessment.deregistrationDeadline),
});

export const convertToCourseInternal = (course: CourseResponse): Course => {
    return {
        id: course.courseId.toString(),
        title: course.content.title,
        code: course.content.code,
        courseType: course.content.courseType,
        semester: {
            year: course.content.semester.year.toNumber(),
            season: course.content.semester.season,
        },
        description: course.content.description,
        examTopics: course.content.examTopics,
        language: course.content.language,
        ects: course.content.ects.toNumber(),
        maxPlaces: course.content.maxPlaces.toNumber(),
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
        data.lecturers.map((user) => extractOptionId(user).toString()),
        data.studyPrograms.map((studyProgram) => extractOptionId(studyProgram).toString()),
    ];
};
