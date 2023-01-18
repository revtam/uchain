import {
    ClassesRequest,
    CreateNewCourseRequest,
    GradeLevelsRequest,
} from "../../../imports/ethereum-abi-types/CourseController";
import {
    AssessmentResponse,
    ClassesResponse,
    CourseResponse,
    GradeLevelsResponse,
    AssessmentContentResponse,
} from "../../../imports/ethereum-abi-types/CourseView";
import {
    convertDateToSeconds,
    convertDateToOptionalSeconds,
    convertSecondsToDateInternal,
    convertSecondsToOptionalDateInternal,
    convertToContractPercentage,
    convertToPercentage,
} from "./basicConverter";
import {
    Assessment,
    Class,
    Course,
    CourseCreationFormType,
    GradeLevel,
} from "../../types/internal-types/internalTypes";

export const convertToClassInternal = (classUnit: ClassesResponse): Class => ({
    time: convertSecondsToDateInternal(classUnit.datetime),
    place: classUnit.place,
});

export const convertToClassExternal = (classUnit: Class): ClassesRequest => ({
    datetime: convertDateToSeconds(classUnit.time),
    place: classUnit.place,
});

export const convertToGradeLevelInternal = (gradeLevel: GradeLevelsResponse): GradeLevel => ({
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
    datetime: convertSecondsToDateInternal(assessment.assessmentContent.datetime),
    place: assessment.assessmentContent.place,
    assessmentType: assessment.assessmentContent.assessmentType,
    maxPoints: assessment.assessmentContent.maxPoints.toNumber(),
    minPoints: assessment.assessmentContent.minPoints.toNumber(),
    isRegistrationRequired: assessment.assessmentContent.isRegistrationRequired,
    registrationStart: convertSecondsToOptionalDateInternal(assessment.assessmentContent.registrationStart),
    registrationDeadline: convertSecondsToOptionalDateInternal(
        assessment.assessmentContent.registrationDeadline
    ),
    deregistrationDeadline: convertSecondsToOptionalDateInternal(
        assessment.assessmentContent.deregistrationDeadline
    ),
});

export const convertToAssessmentExternal = (assessment: Assessment): AssessmentContentResponse => ({
    title: assessment.title,
    datetime: convertDateToSeconds(assessment.datetime),
    place: assessment.place,
    assessmentType: assessment.assessmentType,
    maxPoints: parseInt(assessment.maxPoints.toString()),
    minPoints: parseInt(assessment.minPoints.toString()),
    isRegistrationRequired: assessment.isRegistrationRequired,
    registrationStart: convertDateToOptionalSeconds(assessment.registrationStart),
    registrationDeadline: convertDateToOptionalSeconds(assessment.registrationDeadline),
    deregistrationDeadline: convertDateToOptionalSeconds(assessment.deregistrationDeadline),
});

export const convertToCourseInternal = (course: CourseResponse): Course => {
    return {
        id: course.courseId.toString(),
        title: course.courseContent.title,
        code: course.courseContent.code,
        courseType: course.courseContent.courseType,
        semester: {
            year: course.courseContent.semester.year.toNumber(),
            season: course.courseContent.semester.season,
        },
        description: course.courseContent.description,
        examTopics: course.courseContent.examTopics,
        language: course.courseContent.language,
        ects: course.courseContent.ects.toNumber(),
        maxPlaces: course.courseContent.maxPlaces.toNumber(),
        registrationStart: convertSecondsToOptionalDateInternal(course.courseContent.registrationStart),
        registrationDeadline: convertSecondsToOptionalDateInternal(course.courseContent.registrationDeadline),
        deregistrationDeadline: convertSecondsToOptionalDateInternal(
            course.courseContent.deregistrationDeadline
        ),
        classes: course.courseContent.classes.map((classUnit) => convertToClassInternal(classUnit)),
        gradeLevels: course.courseContent.gradeLevels.map((gradeLevel) =>
            convertToGradeLevelInternal(gradeLevel)
        ),
        requirementCourseCodes: course.courseContent.requirementCourseCodes,
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
    registrationStart: convertDateToOptionalSeconds(course.registrationStart),
    registrationDeadline: convertDateToOptionalSeconds(course.registrationDeadline),
    deregistrationDeadline: convertDateToOptionalSeconds(course.deregistrationDeadline),
    classes: course.classes.map((classUnit) => convertToClassExternal(classUnit)),
    gradeLevels: course.gradeLevels.map((gradeLevel) => convertToGradeLevelExternal(gradeLevel)),
    requirementCourseCodes: course.requirementCourseCodes,
});

export const convertToCourseCreationExternal = (
    data: CourseCreationFormType
): [CreateNewCourseRequest, AssessmentContentResponse[], string[], string[]] => {
    return [
        convertToCourseExternal(data.course),
        data.assessments.map((assessment) => convertToAssessmentExternal(assessment)),
        data.lecturers.map((user) => user.id.toString()),
        data.studyPrograms.map((studyProgram) => studyProgram.id.toString()),
    ];
};
