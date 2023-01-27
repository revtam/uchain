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
    FUTURE_DATE_SEC,
} = require("./utils/exampleObjects");
const { getCourseController, getCourseView } = require("./utils/contracts");
const { registerUser } = require("./Registration");
const { registerForCourse } = require("./CourseRegistration");
const { createCourse } = require("./CourseCreation");
const { addStudyProgram } = require("./StudyProgramCreation");

async function registerForAssessment(deployer, studentAccount, assessmentId) {
    const courseController = await getCourseController(deployer, studentAccount);
    await courseController.registerToAssessment(assessmentId);
}
exports.registerForAssessment = registerForAssessment;

describe("Assessment registration", function () {
    describe("Dependency checks", function () {
        it("Should student register for course", async function () {
            const { deployer, admin, account2: studentAccount } = await loadFixture(deploySystem);
            const courseView = await getCourseView(deployer, studentAccount);

            await addStudyProgram(deployer, admin, STUDY_PROGRAM_EXAMPLE);
            await registerUser(deployer, admin, admin, LECTURER_PROFILE_EXAMPLE);
            await registerUser(deployer, admin, studentAccount, {
                ...STUDENT_PROFILE_EXAMPLE,
                studyProgramIds: [1],
            });
            await registerForCourse(deployer, studentAccount, admin, COURSE_EXAMPLE, [], [1]);

            expect(await courseView.isRegisteredAtCourse(1)).is.true;
        });
    });

    describe("Use case: Register for assessment", function () {
        it("Should student register for optional assessment", async function () {
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
                [
                    {
                        ...ASSESSMENT_EXAMPLE,
                        isRegistrationRequired: true,
                        registrationDeadline: FUTURE_DATE_SEC,
                    },
                ],
                [1]
            );
            await registerForAssessment(deployer, studentAccount, 1);

            expect(await courseView.isRegisteredToAssessment(1)).is.true;
        });

        it("Should student be automatically registered for not optional assessments of course", async function () {
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
                [
                    {
                        ...ASSESSMENT_EXAMPLE,
                        isRegistrationRequired: false,
                    },
                ],
                [1]
            );

            expect(await courseView.isRegisteredToAssessment(1)).is.true;
        });

        it("Should assessment registration revert if registration deadline has passed", async function () {
            const { deployer, admin, account2: studentAccount } = await loadFixture(deploySystem);

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
                        isRegistrationRequired: true,
                        registrationDeadline: PAST_DATE_SEC,
                    },
                ],
                [1]
            );

            await expect(registerForAssessment(deployer, studentAccount, 1)).to.be.revertedWith(
                "Assessment registration is not possible at the time"
            );
        });
    });

    describe("Use case: Deregister from assessment", function () {
        it("Should student deregister from assessment", async function () {
            const { deployer, admin, account2: studentAccount } = await loadFixture(deploySystem);
            const courseController = await getCourseController(deployer, studentAccount);
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
                [
                    {
                        ...ASSESSMENT_EXAMPLE,
                        isRegistrationRequired: true,
                        registrationDeadline: FUTURE_DATE_SEC,
                        deregistrationDeadline: FUTURE_DATE_SEC,
                    },
                ],
                [1]
            );
            await courseController.registerToAssessment(1);
            await courseController.deregisterFromAssessment(1);

            expect(await courseView.isRegisteredToAssessment(1)).is.false;
        });

        it("Should course deregistration deregister from its assessments as well", async function () {
            const { deployer, admin, account2: studentAccount } = await loadFixture(deploySystem);
            const courseController = await getCourseController(deployer, studentAccount);
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
            await courseController.deregisterFromCourse(1);

            expect(await courseView.isRegisteredToAssessment(1)).is.false;
        });
    });

    describe("Edge cases", function () {
        it("Should assessment registration revert if student is already registered", async function () {
            const { deployer, admin, account2: studentAccount } = await loadFixture(deploySystem);

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
                        isRegistrationRequired: false,
                    },
                ],
                [1]
            );

            await expect(registerForAssessment(deployer, studentAccount, 1)).to.be.revertedWith(
                "Student has already registered to this assessment"
            );
        });

        it("Should assessment registration revert if student is not registered for the course", async function () {
            const { deployer, admin, account2: studentAccount } = await loadFixture(deploySystem);

            await registerUser(deployer, admin, admin, LECTURER_PROFILE_EXAMPLE);
            await registerUser(deployer, admin, studentAccount, STUDENT_PROFILE_EXAMPLE);
            await createCourse(
                deployer,
                admin,
                COURSE_EXAMPLE,
                [
                    {
                        ...ASSESSMENT_EXAMPLE,
                        isRegistrationRequired: false,
                    },
                ],
                []
            );

            await expect(registerForAssessment(deployer, studentAccount, 1)).to.be.revertedWith(
                "Student is not registered to the course"
            );
        });

        it("Should assessment deregistration revert if student is not registered for the assessment", async function () {
            const { deployer, admin, account2: studentAccount } = await loadFixture(deploySystem);
            const courseController = await getCourseController(deployer, studentAccount);

            await registerUser(deployer, admin, admin, LECTURER_PROFILE_EXAMPLE);
            await registerUser(deployer, admin, studentAccount, STUDENT_PROFILE_EXAMPLE);
            await createCourse(
                deployer,
                admin,
                COURSE_EXAMPLE,
                [
                    {
                        ...ASSESSMENT_EXAMPLE,
                        isRegistrationRequired: false,
                    },
                ],
                []
            );

            await expect(courseController.deregisterFromAssessment(1)).to.be.revertedWith(
                "Student has never registered to this assessment"
            );
        });
    });
});
