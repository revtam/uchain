const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

const {
    deployDeployer,
    deployStorages1,
    deployStorages2,
    deployDatamanagers,
    deployControllers,
    deployViews,
    deploySystem,
} = require("./deploySystem");

describe("Deployment", function () {
    it("Should deploy Storages 1", async function () {
        const { deployer } = await loadFixture(deployDeployer);

        await deployStorages1(deployer);

        expect(await deployer.storageAccessWhitelist()).to.not.equal(ethers.constants.AddressZero);
        expect(await deployer.datamanagerAccessWhitelist()).to.not.equal(ethers.constants.AddressZero);
        expect(await deployer.courseDataStorage()).to.not.equal(ethers.constants.AddressZero);
        expect(await deployer.assessmentDataStorage()).to.not.equal(ethers.constants.AddressZero);
        expect(await deployer.performanceStorage()).to.not.equal(ethers.constants.AddressZero);
    });

    it("Should deploy Storages 2", async function () {
        const { deployer } = await loadFixture(deployDeployer);

        await deployStorages2(deployer);

        expect(await deployer.gradeStorage()).to.not.equal(ethers.constants.AddressZero);
        expect(await deployer.studyProgramStorage()).to.not.equal(ethers.constants.AddressZero);
        expect(await deployer.registrationStorage()).to.not.equal(ethers.constants.AddressZero);
        expect(await deployer.userStorage()).to.not.equal(ethers.constants.AddressZero);
    });

    it("Should deploy Datamanagers", async function () {
        const { deployer } = await loadFixture(deployDeployer);

        await deployDatamanagers(deployer);

        expect(await deployer.courseDataManager()).to.not.equal(ethers.constants.AddressZero);
        expect(await deployer.assessmentDataManager()).to.not.equal(ethers.constants.AddressZero);
        expect(await deployer.performanceDataManager()).to.not.equal(ethers.constants.AddressZero);
        expect(await deployer.programDataManager()).to.not.equal(ethers.constants.AddressZero);
        expect(await deployer.registrationDataManager()).to.not.equal(ethers.constants.AddressZero);
        expect(await deployer.userDataManager()).to.not.equal(ethers.constants.AddressZero);
    });

    it("Should deploy controllers", async function () {
        const { deployer } = await loadFixture(deployDeployer);

        await deployControllers(deployer);

        expect(await deployer.courseController()).to.not.equal(ethers.constants.AddressZero);
        expect(await deployer.performanceController()).to.not.equal(ethers.constants.AddressZero);
        expect(await deployer.studyProgramController()).to.not.equal(ethers.constants.AddressZero);
        expect(await deployer.userController()).to.not.equal(ethers.constants.AddressZero);
        expect(await deployer.faucet()).to.not.equal(ethers.constants.AddressZero);
    });

    it("Should deploy views", async function () {
        const { deployer } = await loadFixture(deployDeployer);

        await deployViews(deployer);

        expect(await deployer.courseView()).to.not.equal(ethers.constants.AddressZero);
        expect(await deployer.performanceView()).to.not.equal(ethers.constants.AddressZero);
        expect(await deployer.studyProgramView()).to.not.equal(ethers.constants.AddressZero);
        expect(await deployer.userView()).to.not.equal(ethers.constants.AddressZero);
    });

    it("Should deploy system and configure deployments", async function () {
        expect(await deploySystem()).not.to.be.reverted;
    });
});
