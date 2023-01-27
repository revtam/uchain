const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

const { deploySystem } = require("./deploySystem");
const {
    LECTURER_PROFILE_EXAMPLE,
    STUDENT_PROFILE_EXAMPLE,
    COURSE_EXAMPLE,
    STUDY_PROGRAM_EXAMPLE,
    SPM_PROFILE_EXAMPLE,
    PAST_DATE_SEC,
    FUTURE_DATE_SEC,
    CLOSE_PAST_DATE_SEC,
} = require("./utils/exampleObjects");
const {
    getUserController,
    getUserView,
    getCourseController,
    getCourseView,
    getStudyProgramView,
} = require("./utils/contracts");
const { registerUser } = require("./Registration");
const { addStudyProgram } = require("./StudyProgramCreation");
const { createCourse } = require("./CourseCreation");

async function registerForCourse(
    deployer,
    studentAccount,
    lecturerAccount,
    course,
    assessments,
    studyProgramIds
) {
    const courseController = await getCourseController(deployer, lecturerAccount);

    await createCourse(deployer, lecturerAccount, course, assessments, studyProgramIds);

    await courseController.connect(studentAccount).registerToCourse(1);
}
exports.registerForCourse = registerForCourse;

describe("Course registration", function () {
    describe("Dependency checks", function () {
        it("Should user register", async function () {
            const { deployer, admin } = await loadFixture(deploySystem);
            const userView = await getUserView(deployer, admin);

            await registerUser(deployer, admin, admin, LECTURER_PROFILE_EXAMPLE);

            expect(await userView.isUserRegistered()).is.true;
        });

        it("Should add study program", async function () {
            const { deployer, admin } = await loadFixture(deploySystem);
            const studyProgramView = await getStudyProgramView(deployer, admin);

            await addStudyProgram(deployer, admin, STUDY_PROGRAM_EXAMPLE);

            expect((await studyProgramView.getAllPrograms()).map((program) => program.programName)).contains(
                STUDY_PROGRAM_EXAMPLE
            );
        });

        it("Should add course", async function () {
            const { deployer, admin } = await loadFixture(deploySystem);
            const courseController = await getCourseController(deployer, admin);
            const courseView = await getCourseView(deployer, admin);

            await registerUser(deployer, admin, admin, LECTURER_PROFILE_EXAMPLE);
            await courseController.createNewCourse(COURSE_EXAMPLE, [], [], []);

            expect((await courseView.getAllCourses()).map((course) => course.courseContent.title)).contains(
                COURSE_EXAMPLE.title
            );
        });
    });

    describe("Use case: Register for course", function () {
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

        it("Should course registration revert if course is full", async function () {
            const { deployer, admin, account2: studentAccount } = await loadFixture(deploySystem);
            const courseController = await getCourseController(deployer, studentAccount);

            await addStudyProgram(deployer, admin, STUDY_PROGRAM_EXAMPLE);
            await registerUser(deployer, admin, admin, LECTURER_PROFILE_EXAMPLE);
            await registerUser(deployer, admin, studentAccount, {
                ...STUDENT_PROFILE_EXAMPLE,
                studyProgramIds: [1],
            });
            await createCourse(deployer, admin, { ...COURSE_EXAMPLE, maxPlaces: 0 }, [], [1]);

            await expect(courseController.registerToCourse(1)).to.be.revertedWith(
                "Course has reached its maximum participants"
            );
        });

        it("Should course registration revert if registration deadline has passed", async function () {
            const { deployer, admin, account2: studentAccount } = await loadFixture(deploySystem);
            const courseController = await getCourseController(deployer, studentAccount);

            await addStudyProgram(deployer, admin, STUDY_PROGRAM_EXAMPLE);
            await registerUser(deployer, admin, admin, LECTURER_PROFILE_EXAMPLE);
            await registerUser(deployer, admin, studentAccount, {
                ...STUDENT_PROFILE_EXAMPLE,
                studyProgramIds: [1],
            });
            await createCourse(
                deployer,
                admin,
                {
                    ...COURSE_EXAMPLE,
                    registrationStart: PAST_DATE_SEC,
                    registrationDeadline: CLOSE_PAST_DATE_SEC,
                },
                [],
                [1]
            );

            await expect(courseController.registerToCourse(1)).to.be.revertedWith(
                "Course registration is not possible at the time"
            );
        });

        it("Should course registration revert if not enrolled in required study program", async function () {
            const { deployer, admin, account2: studentAccount } = await loadFixture(deploySystem);

            await addStudyProgram(deployer, admin, STUDY_PROGRAM_EXAMPLE);
            await registerUser(deployer, admin, admin, LECTURER_PROFILE_EXAMPLE);
            await registerUser(deployer, admin, studentAccount, STUDENT_PROFILE_EXAMPLE);

            await expect(
                registerForCourse(deployer, studentAccount, admin, COURSE_EXAMPLE, [], [1])
            ).to.be.revertedWith("Student is not enrolled in the study program this course is available at");
        });
    });

    describe("Use case: Register student for course", function () {
        it("Should SPM register student for course", async function () {
            const {
                deployer,
                admin,
                account2: studentAccount,
                account3: spmAccount,
            } = await loadFixture(deploySystem);
            const courseController = await getCourseController(deployer, spmAccount);
            const courseView = await getCourseView(deployer, studentAccount);

            await registerUser(deployer, admin, admin, LECTURER_PROFILE_EXAMPLE);
            await registerUser(deployer, admin, spmAccount, SPM_PROFILE_EXAMPLE);
            await registerUser(deployer, admin, studentAccount, STUDENT_PROFILE_EXAMPLE);
            await createCourse(deployer, admin, COURSE_EXAMPLE, [], []);

            await courseController.addStudentToCourse(1, 3);

            expect(await courseView.isRegisteredAtCourse(1)).is.true;
        });
    });

    describe("Use case: Deregister from course", function () {
        it("Should student deregister from course", async function () {
            const { deployer, admin, account2: studentAccount } = await loadFixture(deploySystem);
            const courseController = await getCourseController(deployer, studentAccount);
            const courseView = await getCourseView(deployer, studentAccount);

            await addStudyProgram(deployer, admin, STUDY_PROGRAM_EXAMPLE);
            await registerUser(deployer, admin, admin, LECTURER_PROFILE_EXAMPLE);
            await registerUser(deployer, admin, studentAccount, {
                ...STUDENT_PROFILE_EXAMPLE,
                studyProgramIds: [1],
            });
            await registerForCourse(deployer, studentAccount, admin, COURSE_EXAMPLE, [], [1]);
            await courseController.deregisterFromCourse(1);

            expect(await courseView.isRegisteredAtCourse(1)).is.false;
        });
    });

    describe("Edge cases", function () {
        it("Should course registration revert if student is already registered", async function () {
            const { deployer, admin, account2: studentAccount } = await loadFixture(deploySystem);
            const courseController = await getCourseController(deployer, studentAccount);

            await addStudyProgram(deployer, admin, STUDY_PROGRAM_EXAMPLE);
            await registerUser(deployer, admin, admin, LECTURER_PROFILE_EXAMPLE);
            await registerUser(deployer, admin, studentAccount, {
                ...STUDENT_PROFILE_EXAMPLE,
                studyProgramIds: [1],
            });
            await registerForCourse(deployer, studentAccount, admin, COURSE_EXAMPLE, [], [1]);

            await expect(courseController.registerToCourse(1)).to.be.revertedWith(
                "Student is already registered to the course"
            );
        });

        it("Should course deregistration revert if deregistration deadline has passed", async function () {
            const { deployer, admin, account2: studentAccount } = await loadFixture(deploySystem);
            const courseController = await getCourseController(deployer, studentAccount);

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
                {
                    ...COURSE_EXAMPLE,
                    registrationStart: PAST_DATE_SEC,
                    registrationDeadline: FUTURE_DATE_SEC,
                    deregistrationDeadline: PAST_DATE_SEC,
                },
                [],
                [1]
            );

            await expect(courseController.deregisterFromCourse(1)).to.be.revertedWith(
                "Course deregistration is not possible at the time"
            );
        });

        it("Should course deregistration revert if student is not registered for course", async function () {
            const { deployer, admin, account2: studentAccount } = await loadFixture(deploySystem);
            const courseController = await getCourseController(deployer, admin);

            await addStudyProgram(deployer, admin, STUDY_PROGRAM_EXAMPLE);
            await registerUser(deployer, admin, admin, LECTURER_PROFILE_EXAMPLE);
            await registerUser(deployer, admin, studentAccount, {
                ...STUDENT_PROFILE_EXAMPLE,
                studyProgramIds: [1],
            });
            await createCourse(deployer, admin, COURSE_EXAMPLE, [], []);

            await expect(courseController.connect(studentAccount).deregisterFromCourse(1)).to.be.revertedWith(
                "Student is not registered to the course"
            );
        });
    });
});
