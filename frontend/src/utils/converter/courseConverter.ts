import { GradelevelResponse } from "../../contracts/imports/ethereum-abi-types/CourseDataManager";
import {
    AssessmentResponse,
    ClassesResponse,
    CourseResponse,
} from "../../contracts/imports/ethereum-abi-types/CourseView";
import { convertMillisecondsToDateInternal, convertToPercentage } from "./basicConverter";
import { Assessment, Class, Course, GradeLevel } from "./internal-types/internalTypes";

export const convertToClassInternal = (classUnit: ClassesResponse): Class => ({
    time: convertMillisecondsToDateInternal(classUnit.datetime),
    place: classUnit.place,
});

export const convertToGradeLevelInternal = (gradeLevel: GradelevelResponse): GradeLevel => ({
    gradeValue: Number(gradeLevel.grade),
    minPercentageToAchieve: convertToPercentage(Number(gradeLevel.minPercentage)),
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
