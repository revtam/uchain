const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

const { deploySystem } = require("./deploySystem");
const {
    LECTURER_PROFILE_EXAMPLE,
    STUDENT_PROFILE_EXAMPLE,
    COURSE_EXAMPLE,
    STUDY_PROGRAM_EXAMPLE,
    ASSESSMENT_EXAMPLE,
    DOCUMENT_HASH,
    FUTURE_DATE_SEC,
    PAST_DATE_SEC,
} = require("./utils/exampleObjects");
const { getCourseView, getPerformanceView, getPerformanceController } = require("./utils/contracts");
const { registerUser } = require("./Registration");
const { registerForCourse } = require("./CourseRegistration");
const { addStudyProgram } = require("./StudyProgramCreation");

describe("Submission", function () {
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

    describe("Use case: Submit a document", function () {
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
    });

    describe("Edge cases", function () {
        it("Should submission revert if deadline has passed", async function () {
            const { deployer, admin, account2: studentAccount } = await loadFixture(deploySystem);
            const performanceController = await getPerformanceController(deployer, studentAccount);

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

            await expect(performanceController.addSubmission(1, [DOCUMENT_HASH])).to.be.revertedWith(
                "Submission is not possible after the deadline"
            );
        });

        it("Should submission revert if assessment is not of submission type", async function () {
            const { deployer, admin, account2: studentAccount } = await loadFixture(deploySystem);
            const performanceController = await getPerformanceController(deployer, studentAccount);

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

            await expect(performanceController.addSubmission(1, [DOCUMENT_HASH])).to.be.revertedWith(
                "This assessment is not a submission"
            );
        });
    });
});
