const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

const { deploySystem } = require("./deploySystem");
const {
    LECTURER_PROFILE_EXAMPLE,
    STUDENT_PROFILE_EXAMPLE,
    COURSE_EXAMPLE,
    STUDY_PROGRAM_EXAMPLE,
    ASSESSMENT_EXAMPLE,
    PAST_DATE_SEC,
    DOCUMENT_HASH,
    FUTURE_DATE_SEC,
} = require("./utils/exampleObjects");
const { getPerformanceView, getPerformanceController } = require("./utils/contracts");
const { registerUser } = require("./Registration");
const { registerForCourse } = require("./CourseRegistration");
const { registerForAssessment } = require("./AssessmentRegistration");
const { addStudyProgram } = require("./StudyProgramCreation");

describe("Grading", function () {
    describe("Dependency checks", function () {
        it("Should lecturer evaluate student's assessment", async function () {
            const { deployer, admin, account2: studentAccount } = await loadFixture(deploySystem);
            const performanceController = await getPerformanceController(deployer, admin);
            const performanceView = await getPerformanceView(deployer, admin);

            await addStudyProgram(deployer, admin, STUDY_PROGRAM_EXAMPLE);
            await registerUser(deployer, admin, admin, LECTURER_PROFILE_EXAMPLE);
            await registerUser(deployer, admin, studentAccount, {
                ...STUDENT_PROFILE_EXAMPLE,
                studyProgramIds: [1],
            });
            await registerForCourse(
                deployer,
                studentAccount,
                admin,
                COURSE_EXAMPLE,
                [ASSESSMENT_EXAMPLE],
                [1]
            );
            const achievedPoints = 10;
            await performanceController.giveEvaluation(2, 1, achievedPoints, "");

            expect((await performanceView.getEvaluationOfStudent(1, 2))[0].achievedPoints).to.equal(
                achievedPoints
            );
        });

        it("Should student submit a document for assessment", async function () {
            const { deployer, admin, account2: studentAccount } = await loadFixture(deploySystem);
            const performanceController = await getPerformanceController(deployer, studentAccount);
            const performanceView = await getPerformanceView(deployer, studentAccount);

            await addStudyProgram(deployer, admin, STUDY_PROGRAM_EXAMPLE);
            await registerUser(deployer, admin, admin, LECTURER_PROFILE_EXAMPLE);
            await registerUser(deployer, admin, studentAccount, {
                ...STUDENT_PROFILE_EXAMPLE,
                studyProgramIds: [1],
            });
            await registerForCourse(
                deployer,
                studentAccount,
                admin,
                COURSE_EXAMPLE,
                [{ ...ASSESSMENT_EXAMPLE, assessmentType: 1, datetime: FUTURE_DATE_SEC }],
                [1]
            );
            await performanceController.addSubmission(1, [DOCUMENT_HASH]);

            expect(await performanceView.isSubmissionSet(1)).is.true;
        });

        it("Should lecturer confirm student's test attendance", async function () {
            const { deployer, admin, account2: studentAccount } = await loadFixture(deploySystem);
            const performanceController = await getPerformanceController(deployer, admin);
            const performanceView = await getPerformanceView(deployer, studentAccount);

            await addStudyProgram(deployer, admin, STUDY_PROGRAM_EXAMPLE);
            await registerUser(deployer, admin, admin, LECTURER_PROFILE_EXAMPLE);
            await registerUser(deployer, admin, studentAccount, {
                ...STUDENT_PROFILE_EXAMPLE,
                studyProgramIds: [1],
            });
            await registerForCourse(
                deployer,
                studentAccount,
                admin,
                COURSE_EXAMPLE,
                [{ ...ASSESSMENT_EXAMPLE, assessmentType: 0 }],
                [1]
            );
            await performanceController.administerExamAttendance(2, 1, true);

            expect((await performanceView.getExamAttendance(1)).hasAttended).is.true;
        });
    });

    describe("Use case: Generate grade", function () {
        it("Should auto-evaluate missing submission correctly", async function () {
            const { deployer, admin, account2: studentAccount } = await loadFixture(deploySystem);
            const performanceController = await getPerformanceController(deployer, admin);
            const performanceView = await getPerformanceView(deployer, admin);

            await addStudyProgram(deployer, admin, STUDY_PROGRAM_EXAMPLE);
            await registerUser(deployer, admin, admin, LECTURER_PROFILE_EXAMPLE);
            await registerUser(deployer, admin, studentAccount, {
                ...STUDENT_PROFILE_EXAMPLE,
                studyProgramIds: [1],
            });
            await registerForCourse(
                deployer,
                studentAccount,
                admin,
                COURSE_EXAMPLE,
                [
                    {
                        ...ASSESSMENT_EXAMPLE,
                        assessmentType: 1,
                        datetime: PAST_DATE_SEC,
                    },
                ],
                [1]
            );
            await performanceController.updateCourseParticipantPerformances(1);

            expect((await performanceView.getEvaluationOfStudent(1, 2))[0].achievedPoints).to.equal(0);
        });

        it("Should auto-evaluate not attended exam correctly", async function () {
            const { deployer, admin, account2: studentAccount } = await loadFixture(deploySystem);
            const performanceController = await getPerformanceController(deployer, admin);
            const performanceView = await getPerformanceView(deployer, admin);

            await addStudyProgram(deployer, admin, STUDY_PROGRAM_EXAMPLE);
            await registerUser(deployer, admin, admin, LECTURER_PROFILE_EXAMPLE);
            await registerUser(deployer, admin, studentAccount, {
                ...STUDENT_PROFILE_EXAMPLE,
                studyProgramIds: [1],
            });
            await registerForCourse(
                deployer,
                studentAccount,
                admin,
                COURSE_EXAMPLE,
                [
                    {
                        ...ASSESSMENT_EXAMPLE,
                        assessmentType: 0,
                    },
                ],
                [1]
            );
            await performanceController.administerExamAttendance(2, 1, false);
            await performanceController.updateCourseParticipantPerformances(1);

            expect((await performanceView.getEvaluationOfStudent(1, 2))[0].achievedPoints).to.equal(0);
        });

        /**
         * VO's assessments are expected to be optional, the student has to register for
         * them separately. The auto-evaluation of a VO takes only the latest assessment's result
         * that the student is registered for.
         */
        it("Should summarize student's evaluation points correctly - VO", async function () {
            const { deployer, admin, account2: studentAccount } = await loadFixture(deploySystem);
            const performanceController = await getPerformanceController(deployer, admin);

            await addStudyProgram(deployer, admin, STUDY_PROGRAM_EXAMPLE);
            await registerUser(deployer, admin, admin, LECTURER_PROFILE_EXAMPLE);
            await registerUser(deployer, admin, studentAccount, {
                ...STUDENT_PROFILE_EXAMPLE,
                studyProgramIds: [1],
            });
            await registerForCourse(
                deployer,
                studentAccount,
                admin,
                { ...COURSE_EXAMPLE, courseType: 2 },
                [
                    {
                        ...ASSESSMENT_EXAMPLE,
                        isRegistrationRequired: true,
                        registrationDeadline: FUTURE_DATE_SEC,
                    },
                    {
                        ...ASSESSMENT_EXAMPLE,
                        isRegistrationRequired: true,
                        registrationDeadline: FUTURE_DATE_SEC,
                    },
                ],
                [1]
            );
            await registerForAssessment(deployer, studentAccount, 1);
            await performanceController.giveEvaluation(2, 1, ASSESSMENT_EXAMPLE.minPoints, "");
            await performanceController.updateCourseParticipantPerformances(1);

            const [totalAchieved, totalMax] = await performanceController.calculatePointsOfStudent(2, 1);

            expect(totalAchieved.eq(ASSESSMENT_EXAMPLE.minPoints)).is.true;
            expect(totalMax.eq(ASSESSMENT_EXAMPLE.maxPoints)).is.true;
        });

        /**
         * A not VO course should have no optional assessment. A not VO's participants are
         * expected to be registered for the course's every assessment by default. The
         * auto-evaluation of such a course takes each assessment's evaluation
         * to calculate the total points.
         */
        it("Should summarize student's evaluation points correctly - not VO", async function () {
            const { deployer, admin, account2: studentAccount } = await loadFixture(deploySystem);
            const performanceController = await getPerformanceController(deployer, admin);

            await addStudyProgram(deployer, admin, STUDY_PROGRAM_EXAMPLE);
            await registerUser(deployer, admin, admin, LECTURER_PROFILE_EXAMPLE);
            await registerUser(deployer, admin, studentAccount, {
                ...STUDENT_PROFILE_EXAMPLE,
                studyProgramIds: [1],
            });
            await registerForCourse(
                deployer,
                studentAccount,
                admin,
                { ...COURSE_EXAMPLE, courseType: 1 },
                [
                    {
                        ...ASSESSMENT_EXAMPLE,
                        isRegistrationRequired: false,
                    },
                    {
                        ...ASSESSMENT_EXAMPLE,
                        isRegistrationRequired: false,
                    },
                ],
                [1]
            );
            await performanceController.giveEvaluation(2, 1, ASSESSMENT_EXAMPLE.minPoints, "");
            await performanceController.giveEvaluation(2, 2, ASSESSMENT_EXAMPLE.minPoints, "");
            await performanceController.updateCourseParticipantPerformances(1);

            const [totalAchieved, totalMax] = await performanceController.calculatePointsOfStudent(2, 1);

            expect(totalAchieved.eq(2 * ASSESSMENT_EXAMPLE.minPoints)).is.true;
            expect(totalMax.eq(2 * ASSESSMENT_EXAMPLE.maxPoints)).is.true;
        });

        it("Should grade course performance correctly - grade 4", async function () {
            const { deployer, admin, account2: studentAccount } = await loadFixture(deploySystem);
            const performanceController = await getPerformanceController(deployer, admin);
            const performanceView = await getPerformanceView(deployer, admin);

            await addStudyProgram(deployer, admin, STUDY_PROGRAM_EXAMPLE);
            await registerUser(deployer, admin, admin, LECTURER_PROFILE_EXAMPLE);
            await registerUser(deployer, admin, studentAccount, {
                ...STUDENT_PROFILE_EXAMPLE,
                studyProgramIds: [1],
            });
            await registerForCourse(
                deployer,
                studentAccount,
                admin,
                { ...COURSE_EXAMPLE, courseType: 1 },
                [
                    {
                        ...ASSESSMENT_EXAMPLE,
                        isRegistrationRequired: false,
                    },
                    {
                        ...ASSESSMENT_EXAMPLE,
                        isRegistrationRequired: false,
                    },
                ],
                [1]
            );
            await performanceController.giveEvaluation(2, 1, ASSESSMENT_EXAMPLE.minPoints, "");
            await performanceController.giveEvaluation(2, 2, ASSESSMENT_EXAMPLE.minPoints, "");
            await performanceController.updateCourseParticipantPerformances(1);

            expect((await performanceView.getGradeOfStudent(1, 2))[0].value).to.equal(4);
        });

        it("Should grade course performance correctly - not achieved min points", async function () {
            const { deployer, admin, account2: studentAccount } = await loadFixture(deploySystem);
            const performanceController = await getPerformanceController(deployer, admin);
            const performanceView = await getPerformanceView(deployer, admin);

            await addStudyProgram(deployer, admin, STUDY_PROGRAM_EXAMPLE);
            await registerUser(deployer, admin, admin, LECTURER_PROFILE_EXAMPLE);
            await registerUser(deployer, admin, studentAccount, {
                ...STUDENT_PROFILE_EXAMPLE,
                studyProgramIds: [1],
            });
            await registerForCourse(
                deployer,
                studentAccount,
                admin,
                { ...COURSE_EXAMPLE, courseType: 1 },
                [
                    {
                        ...ASSESSMENT_EXAMPLE,
                        isRegistrationRequired: false,
                    },
                    {
                        ...ASSESSMENT_EXAMPLE,
                        isRegistrationRequired: false,
                    },
                ],
                [1]
            );
            await performanceController.giveEvaluation(2, 1, ASSESSMENT_EXAMPLE.minPoints, "");
            await performanceController.giveEvaluation(2, 2, 0, "");
            await performanceController.updateCourseParticipantPerformances(1);

            expect((await performanceView.getGradeOfStudent(1, 2))[0].value).to.equal(5);
        });
    });

    describe("Use case: Manual evaluation", function () {
        it("Should lecturer manually grade a student's course performance", async function () {
            const { deployer, admin, account2: studentAccount } = await loadFixture(deploySystem);
            const performanceController = await getPerformanceController(deployer, admin);
            const performanceView = await getPerformanceView(deployer, admin);

            await addStudyProgram(deployer, admin, STUDY_PROGRAM_EXAMPLE);
            await registerUser(deployer, admin, admin, LECTURER_PROFILE_EXAMPLE);
            await registerUser(deployer, admin, studentAccount, {
                ...STUDENT_PROFILE_EXAMPLE,
                studyProgramIds: [1],
            });
            await registerForCourse(
                deployer,
                studentAccount,
                admin,
                COURSE_EXAMPLE,
                [ASSESSMENT_EXAMPLE],
                [1]
            );
            const grade = 1;
            await performanceController.giveFinalGrade(2, 1, grade, "");

            expect((await performanceView.getGradeOfStudent(1, 2))[0].value).to.equal(grade);
        });
    });

    describe("Use case: Modification of evaluation", function () {
        it("Should lecturer modify the grade of a student's course performance", async function () {
            const { deployer, admin, account2: studentAccount } = await loadFixture(deploySystem);
            const performanceController = await getPerformanceController(deployer, admin);
            const performanceView = await getPerformanceView(deployer, admin);

            await addStudyProgram(deployer, admin, STUDY_PROGRAM_EXAMPLE);
            await registerUser(deployer, admin, admin, LECTURER_PROFILE_EXAMPLE);
            await registerUser(deployer, admin, studentAccount, {
                ...STUDENT_PROFILE_EXAMPLE,
                studyProgramIds: [1],
            });
            await registerForCourse(
                deployer,
                studentAccount,
                admin,
                COURSE_EXAMPLE,
                [ASSESSMENT_EXAMPLE],
                [1]
            );
            const oldGrade = 1;
            const newGrade = 3;
            await performanceController.giveFinalGrade(2, 1, oldGrade, "");
            await performanceController.giveFinalGrade(2, 1, newGrade, "");

            expect((await performanceView.getGradeOfStudent(1, 2))[0].value).to.equal(newGrade);
        });
    });
});
