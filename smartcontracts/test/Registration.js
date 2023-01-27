const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

const { deploySystem } = require("./deploySystem");
const { SPM_PROFILE_EXAMPLE } = require("./utils/exampleObjects");
const { getUserController, getUserView } = require("./utils/contracts");

async function registerUser(deployer, admin, account, profile) {
    const userController = await getUserController(deployer, admin);
    await userController.setAutomaticAcceptance(true);
    await userController.requestRegistration(account.address, profile);
    await userController.connect(account).acknowledgeRegistrationResult();
}
exports.registerUser = registerUser;

describe("Registration", function () {
    describe("Dependency checks", function () {
        it("Should set automatic acceptance", async function () {
            const { deployer, admin } = await loadFixture(deploySystem);
            const userController = await getUserController(deployer, admin);

            await userController.setAutomaticAcceptance(true);

            expect(await userController.isAutomaticAcceptanceOn()).is.true;
        });
    });

    describe("Use case: Register user", function () {
        it("Should registration result in 'under review' pending registration", async function () {
            const { deployer, admin } = await loadFixture(deploySystem);
            const userController = await getUserController(deployer, admin);
            const userView = await getUserView(deployer, admin);

            await userController.requestRegistration(admin.address, SPM_PROFILE_EXAMPLE);

            expect((await userView.getPendingRegistration()).status).to.equal(0); // UNDER_REVIEW
        });

        it("Should registration acceptance result in 'accepted' pending registration", async function () {
            const { deployer, admin } = await loadFixture(deploySystem);
            const userController = await getUserController(deployer, admin);
            const userView = await getUserView(deployer, admin);

            await userController.requestRegistration(admin.address, SPM_PROFILE_EXAMPLE);
            await userController.adminAcceptRegistration(admin.address);

            expect((await userView.getPendingRegistration()).status).to.equal(2); // ACCEPTED
        });

        it("Should registration rejection result in 'rejected' pending registration", async function () {
            const { deployer, admin } = await loadFixture(deploySystem);
            const userController = await getUserController(deployer, admin);
            const userView = await getUserView(deployer, admin);

            await userController.requestRegistration(admin.address, SPM_PROFILE_EXAMPLE);
            await userController.adminRejectRegistration(admin.address);

            expect((await userView.getPendingRegistration()).status).to.equal(1); // REJECTED
        });

        it("Should acknowledgement of accepted registration result in registered user", async function () {
            const { deployer, admin } = await loadFixture(deploySystem);
            const userView = await getUserView(deployer, admin);

            await registerUser(deployer, admin, admin, SPM_PROFILE_EXAMPLE);

            expect(await userView.isUserRegistered()).is.true;
        });
    });

    describe("Edge cases", function () {
        it("Should rejected user be able to register again", async function () {
            const { deployer, admin } = await loadFixture(deploySystem);
            const userController = await getUserController(deployer, admin);
            const userView = await getUserView(deployer, admin);

            await userController.requestRegistration(admin.address, SPM_PROFILE_EXAMPLE);
            await userController.adminRejectRegistration(admin.address);
            await userController.acknowledgeRegistrationResult();
            await userController.requestRegistration(admin.address, SPM_PROFILE_EXAMPLE);

            expect((await userView.getPendingRegistration()).status).to.equal(0); // UNDER_REVIEW
        });

        it("Should accepted but not acknowledged registration result in not registered user", async function () {
            const { deployer, admin } = await loadFixture(deploySystem);
            const userController = await getUserController(deployer, admin);
            const userView = await getUserView(deployer, admin);

            await userController.setAutomaticAcceptance(true);
            await userController.requestRegistration(admin.address, SPM_PROFILE_EXAMPLE);

            expect(await userView.isUserRegistered()).is.false;
        });

        it("Should registered user not be able to register again", async function () {
            const { deployer, admin } = await loadFixture(deploySystem);
            const userController = await getUserController(deployer, admin);

            await registerUser(deployer, admin, admin, SPM_PROFILE_EXAMPLE);

            await expect(
                userController.requestRegistration(admin.address, SPM_PROFILE_EXAMPLE)
            ).to.be.revertedWith("Address has already been registered");
        });

        it("Should user with pending registration request not be able to register again", async function () {
            const { deployer, admin } = await loadFixture(deploySystem);
            const userController = await getUserController(deployer, admin);

            await userController.setAutomaticAcceptance(true);
            await userController.requestRegistration(admin.address, SPM_PROFILE_EXAMPLE);

            await expect(
                userController.requestRegistration(admin.address, SPM_PROFILE_EXAMPLE)
            ).to.be.revertedWith("Registration already exists at address");
        });

        it("Should user with 'under review' registration not be able to acknowledge result", async function () {
            const { deployer, admin } = await loadFixture(deploySystem);
            const userController = await getUserController(deployer, admin);

            await userController.requestRegistration(admin.address, SPM_PROFILE_EXAMPLE);

            await expect(userController.acknowledgeRegistrationResult()).to.be.revertedWith(
                "Registration is still under review"
            );
        });

        it("Should registration with not existing study program revert", async function () {
            const { deployer, admin } = await loadFixture(deploySystem);
            const userController = await getUserController(deployer, admin);

            const newProfile = { ...SPM_PROFILE_EXAMPLE, studyProgramIds: [1] };

            await expect(userController.requestRegistration(admin.address, newProfile)).to.be.revertedWith(
                "Program does not exist at ID"
            );
        });

        it("Should registration with date of birth in the future revert", async function () {
            const { deployer, admin } = await loadFixture(deploySystem);
            const userController = await getUserController(deployer, admin);

            const newProfile = {
                ...SPM_PROFILE_EXAMPLE,
                dateOfBirth: {
                    year: 2100,
                    month: 1,
                    day: 1,
                },
            };

            await expect(userController.requestRegistration(admin.address, newProfile)).to.be.revertedWith(
                "Birth year value cannot be in the future"
            );
        });
    });
});
