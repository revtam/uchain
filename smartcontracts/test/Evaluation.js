const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

const { deploySystem } = require("./deploySystem");
const {
    LECTURER_PROFILE_EXAMPLE,
    STUDENT_PROFILE_EXAMPLE,
    COURSE_EXAMPLE,
    STUDY_PROGRAM_EXAMPLE,
    ASSESSMENT_EXAMPLE,
} = require("./utils/exampleObjects");
const { getCourseView, getPerformanceView, getPerformanceController } = require("./utils/contracts");
const { registerUser } = require("./Registration");
const { registerForCourse } = require("./CourseRegistration");
const { addStudyProgram } = require("./StudyProgramCreation");

describe("Assessment evaluation", function () {
    describe("Dependency checks", function () {
        it("Should student be registered for assessment", async function () {
            const { deployer, admin, account2: studentAccount } = await loadFixture(deploySystem);
            const courseView = await getCourseView(deployer, studentAccount);

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

            expect(await courseView.isRegisteredToAssessment(1)).is.true;
        });
    });

    describe("Use case: Evaluate student's assessment", function () {
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
    });

    describe("Use case: Modification of evaluation", function () {
        it("Should lecturer modify the evaluation of a student's assessment", async function () {
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
            const originalPoints = 10;
            const modifiedPoints = 20;
            await performanceController.giveEvaluation(2, 1, originalPoints, "");
            await performanceController.giveEvaluation(2, 1, modifiedPoints, "");

            expect((await performanceView.getEvaluationOfStudent(1, 2))[0].achievedPoints).to.equal(
                modifiedPoints
            );
        });
    });

    describe("Edge cases", function () {
        it("Should evaluation revert if lecturer attempting to evaluate does not lecture at the course", async function () {
            const {
                deployer,
                admin,
                account2: studentAccount,
                account3: otherLecturerAccount,
            } = await loadFixture(deploySystem);
            const performanceController = await getPerformanceController(deployer, otherLecturerAccount);

            await addStudyProgram(deployer, admin, STUDY_PROGRAM_EXAMPLE);
            await registerUser(deployer, admin, admin, LECTURER_PROFILE_EXAMPLE);
            await registerUser(deployer, admin, otherLecturerAccount, LECTURER_PROFILE_EXAMPLE);
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

            await expect(performanceController.giveEvaluation(3, 1, 10, "")).to.be.revertedWith(
                "Lecturer is not lecturing at this course"
            );
        });
    });
});
