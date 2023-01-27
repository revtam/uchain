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
const { createCourse } = require("./CourseCreation");
const { addStudyProgram } = require("./StudyProgramCreation");

describe("Test attendance", function () {
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

    describe("Use case: Confirm test attendance", function () {
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

    describe("Edge cases", function () {
        it("Should confirmation of exam attendance revert if student is not registered for the assessment", async function () {
            const { deployer, admin } = await loadFixture(deploySystem);
            const performanceController = await getPerformanceController(deployer, admin);

            await registerUser(deployer, admin, admin, LECTURER_PROFILE_EXAMPLE);
            await createCourse(
                deployer,
                admin,
                COURSE_EXAMPLE,
                [{ ...ASSESSMENT_EXAMPLE, assessmentType: 0 }],
                []
            );

            await expect(performanceController.administerExamAttendance(2, 1, true)).to.be.revertedWith(
                "Student is not registered to this asessment"
            );
        });

        it("Should confirmation of exam attendance revert if assessment does not exist", async function () {
            const { deployer, admin, account2: studentAccount } = await loadFixture(deploySystem);
            const performanceController = await getPerformanceController(deployer, admin);

            await registerUser(deployer, admin, admin, LECTURER_PROFILE_EXAMPLE);
            await registerUser(deployer, admin, studentAccount, STUDENT_PROFILE_EXAMPLE);

            await expect(performanceController.administerExamAttendance(2, 1, true)).to.be.revertedWith(
                "Assessment does not exist at ID"
            );
        });
    });
});
