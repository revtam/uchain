exports.STUDY_PROGRAM_EXAMPLE = "Computer Science";
exports.DOCUMENT_HASH = "hash";
exports.LECTURER_PROFILE_EXAMPLE = {
    firstName: "Max",
    lastName: "Mustermann",
    gender: 0,
    dateOfBirth: {
        year: 1960,
        month: 1,
        day: 1,
    },
    nationality: "Austrian",
    phoneNumber: "+430",
    emailAddress: "a0000000@unet.univie.ac.at",
    role: 1,
    studyProgramIds: [],
};
exports.STUDENT_PROFILE_EXAMPLE = {
    firstName: "Max",
    lastName: "Mustermann",
    gender: 0,
    dateOfBirth: {
        year: 1960,
        month: 1,
        day: 1,
    },
    nationality: "Austrian",
    phoneNumber: "+430",
    emailAddress: "a0000000@unet.univie.ac.at",
    role: 0,
    studyProgramIds: [],
};
exports.SPM_PROFILE_EXAMPLE = {
    firstName: "Max",
    lastName: "Mustermann",
    gender: 0,
    dateOfBirth: {
        year: 1960,
        month: 1,
        day: 1,
    },
    nationality: "Austrian",
    phoneNumber: "+430",
    emailAddress: "a0000000@unet.univie.ac.at",
    role: 2,
    studyProgramIds: [],
};
exports.COURSE_EXAMPLE = {
    title: "Advanced Mathematics",
    code: "AM",
    courseType: 2,
    semester: {
        year: 2022,
        season: 0,
    },
    description: "",
    examTopics: "",
    language: "English",
    ects: 6,
    maxPlaces: 5,
    classes: [],
    gradeLevels: [
        { grade: 4, minPercentage: 5000 },
        { grade: 3, minPercentage: 6500 },
        { grade: 2, minPercentage: 7500 },
        { grade: 1, minPercentage: 8500 },
    ],
    requirementCourseCodes: [],
    registrationStart: 0,
    registrationDeadline: 0,
    deregistrationDeadline: 0,
};
exports.ASSESSMENT_EXAMPLE = {
    title: "Exam 1",
    datetime: 0,
    place: "Audimax",
    assessmentType: 0,
    maxPoints: 20,
    minPoints: 10,
    isRegistrationRequired: false,
    registrationStart: 0,
    registrationDeadline: 0,
    deregistrationDeadline: 0,
};

const date = new Date();
date.setDate(new Date().getDate() + 1);
exports.FUTURE_DATE_SEC = parseInt(date.getTime() / 1000);
date.setDate(new Date().getDate() - 10);
exports.PAST_DATE_SEC = parseInt(date.getTime() / 1000);
date.setDate(new Date().getDate() - 5);
exports.CLOSE_PAST_DATE_SEC = parseInt(date.getTime() / 1000);
