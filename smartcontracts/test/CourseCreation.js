const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

const { deploySystem } = require("./deploySystem");
const {
    LECTURER_PROFILE_EXAMPLE,
    COURSE_EXAMPLE,
    ASSESSMENT_EXAMPLE,
    STUDENT_PROFILE_EXAMPLE,
} = require("./utils/exampleObjects");
const { getUserView, getCourseController, getCourseView } = require("./utils/contracts");
const { registerUser } = require("./Registration");

async function createCourse(deployer, lecturerAccount, course, assessments, studyProgramIds) {
    const courseController = await getCourseController(deployer, lecturerAccount);
    const userView = await getUserView(deployer, lecturerAccount);

    await courseController.createNewCourse(course, assessments, [await userView.getUId()], studyProgramIds);
}
exports.createCourse = createCourse;

describe("Course creation", function () {
    describe("Dependency checks", function () {
        it("Should lecturer register", async function () {
            const { deployer, admin } = await loadFixture(deploySystem);
            const userView = await getUserView(deployer, admin);

            await registerUser(deployer, admin, admin, LECTURER_PROFILE_EXAMPLE);

            expect(await userView.isUserRegistered()).is.true;
        });
    });

    describe("Use case: Create course", function () {
        it("Should add course", async function () {
            const { deployer, admin } = await loadFixture(deploySystem);
            const courseView = await getCourseView(deployer, admin);

            await registerUser(deployer, admin, admin, LECTURER_PROFILE_EXAMPLE);
            await createCourse(deployer, admin, COURSE_EXAMPLE, [], []);

            expect((await courseView.getAllCourses()).map((course) => course.courseContent.title)).contains(
                COURSE_EXAMPLE.title
            );
        });

        it("Should add course with assessment", async function () {
            const { deployer, admin } = await loadFixture(deploySystem);
            const courseView = await getCourseView(deployer, admin);

            await registerUser(deployer, admin, admin, LECTURER_PROFILE_EXAMPLE);
            await createCourse(deployer, admin, COURSE_EXAMPLE, [ASSESSMENT_EXAMPLE], []);

            expect(
                (await courseView.getAssessmentsToCourseId(1)).map(
                    (assessment) => assessment.assessmentContent.title
                )
            ).contains(ASSESSMENT_EXAMPLE.title);
        });
    });

    describe("Edge cases", function () {
        it("Should not add course if sender is not lecturer", async function () {
            const { deployer, admin } = await loadFixture(deploySystem);

            await registerUser(deployer, admin, admin, STUDENT_PROFILE_EXAMPLE);

            await expect(createCourse(deployer, admin, COURSE_EXAMPLE, [], [])).to.be.revertedWith(
                "Sender must be a lecturer"
            );
        });

        it("Should not add course with assessment with higher min points than max points", async function () {
            const { deployer, admin } = await loadFixture(deploySystem);

            await registerUser(deployer, admin, admin, LECTURER_PROFILE_EXAMPLE);

            await expect(
                createCourse(deployer, admin, COURSE_EXAMPLE, [{ ...ASSESSMENT_EXAMPLE, minPoints: 40 }], [])
            ).to.be.revertedWith("Min points cannot be higher than max points");
        });
    });
});
