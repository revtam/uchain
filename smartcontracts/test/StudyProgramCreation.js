const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

const { deploySystem } = require("./deploySystem");
const { STUDY_PROGRAM_EXAMPLE } = require("./utils/exampleObjects");
const { getStudyProgramController, getStudyProgramView } = require("./utils/contracts");

async function addStudyProgram(deployer, admin, studyProgram) {
    const studyProgramController = await getStudyProgramController(deployer, admin);
    await studyProgramController.addAdminNewStudyProgram(studyProgram);
}
exports.addStudyProgram = addStudyProgram;

describe("Study program creation", function () {
    describe("Use case: Create study program", function () {
        it("Should add study program", async function () {
            const { deployer, admin } = await loadFixture(deploySystem);
            const studyProgramView = await getStudyProgramView(deployer, admin);
            await addStudyProgram(deployer, admin, STUDY_PROGRAM_EXAMPLE);

            expect((await studyProgramView.getAllPrograms()).map((program) => program.programName)).contains(
                STUDY_PROGRAM_EXAMPLE
            );
        });
    });
});
