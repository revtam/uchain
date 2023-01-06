const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

const { deploySystem } = require("./deploySystem");

const STUDY_PROGRAM_EXAMPLE = "Computer Science";
const PROFILE_EXAMPLE = {
    firstName: "Max",
    lastName: "Mustermann",
    gender: 0,
    dateOfBirth: {
        year: 1960,
        month: 1,
        day: 1,
    },
    nationality: "Austrian",
    phoneNumber: "+430",
    emailAddress: "a0000000@unet.univie.ac.at",
    role: 2,
    studyProgramIds: [1],
};

describe("Register", function () {
    describe("Storage level", function () {
        async function getRegistrationStorage(deployer, admin) {
            return await ethers.getContractAt(
                "RegistrationStorage",
                await deployer.registrationStorage(),
                admin
            );
        }

        async function getUserStorage(deployer, admin) {
            return await ethers.getContractAt("UserStorage", await deployer.userStorage(), admin);
        }

        it("Should store registration in RegistrationStorage", async function () {
            const { deployer, admin } = await loadFixture(deploySystem);
            const registrationStorage = await getRegistrationStorage(deployer, admin);

            await registrationStorage.storeRegistration({
                userAddress: admin.address,
                status: 2,
                profile: PROFILE_EXAMPLE,
            });

            expect((await registrationStorage.getRegistration(admin.address)).profile.firstName).to.equal(
                PROFILE_EXAMPLE.firstName
            );
        });

        it("Should remove registration in RegistrationStorage", async function () {
            const { deployer, admin } = await loadFixture(deploySystem);
            const registrationStorage = await getRegistrationStorage(deployer, admin);

            await registrationStorage.storeRegistration({
                userAddress: admin.address,
                status: 2,
                profile: PROFILE_EXAMPLE,
            });
            await registrationStorage.removeRegistration(admin.address);

            await expect(registrationStorage.getRegistration(admin.address)).to.be.revertedWith(
                "Registration does not exist at given address"
            );
        });

        it("Should store user in UserStorage", async function () {
            const { deployer, admin } = await loadFixture(deploySystem);
            const userStorage = await getUserStorage(deployer, admin);

            await userStorage.storeUser(admin.address, {
                uId: 1,
                profile: PROFILE_EXAMPLE,
            });

            expect((await userStorage.getUserByAddress(admin.address)).profile.firstName).to.equal(
                PROFILE_EXAMPLE.firstName
            );
        });

        it("Should return false on optional user fetching if user does not exist", async function () {
            const { deployer, admin } = await loadFixture(deploySystem);
            const userStorage = await getUserStorage(deployer, admin);

            expect((await userStorage.getUserByAddressIfSet(admin.address))[0]).is.false;
        });

        it("Should return true on optional user fetching if user exists", async function () {
            const { deployer, admin } = await loadFixture(deploySystem);
            const userStorage = await getUserStorage(deployer, admin);

            await userStorage.storeUser(admin.address, {
                uId: 1,
                profile: PROFILE_EXAMPLE,
            });

            expect((await userStorage.getUserByAddressIfSet(admin.address))[0]).is.true;
        });
    });

    describe("Datamanager level", function () {
        async function getRegistrationDataManager(deployer, admin) {
            return await ethers.getContractAt(
                "RegistrationDataManager",
                await deployer.registrationDataManager(),
                admin
            );
        }

        async function getUserDataManager(deployer, admin) {
            return await ethers.getContractAt("UserDataManager", await deployer.userDataManager(), admin);
        }

        it("Should create registration", async function () {
            const { deployer, admin } = await loadFixture(deploySystem);
            const registrationDataManager = await getRegistrationDataManager(deployer, admin);

            await registrationDataManager.createRegistration(admin.address, 2, PROFILE_EXAMPLE);

            expect(
                (await registrationDataManager.getRegistrationToAddress(admin.address)).profile.firstName
            ).to.equal(PROFILE_EXAMPLE.firstName);
        });

        it("Should remove registration", async function () {
            const { deployer, admin } = await loadFixture(deploySystem);
            const registrationDataManager = await getRegistrationDataManager(deployer, admin);

            await registrationDataManager.createRegistration(admin.address, 2, PROFILE_EXAMPLE);
            await registrationDataManager.deleteRegistration(admin.address);

            await expect(registrationDataManager.getRegistrationToAddress(admin.address)).to.be.revertedWith(
                "Registration does not exist at given address"
            );
        });

        it("Should create user", async function () {
            const { deployer, admin } = await loadFixture(deploySystem);
            const userDataManager = await getUserDataManager(deployer, admin);

            await userDataManager.createUser({
                userAddress: admin.address,
                status: 2,
                profile: PROFILE_EXAMPLE,
            });

            expect(
                (await userDataManager.getUser(await userDataManager.getUIdToAddress(admin.address))).profile
                    .firstName
            ).to.equal(PROFILE_EXAMPLE.firstName);
        });

        it("Should user not created be not registered", async function () {
            const { deployer, admin } = await loadFixture(deploySystem);
            const userDataManager = await getUserDataManager(deployer, admin);

            expect(await userDataManager.isAddressRegistered(admin.address)).is.false;
        });

        it("Should created user be registered", async function () {
            const { deployer, admin } = await loadFixture(deploySystem);
            const userDataManager = await getUserDataManager(deployer, admin);

            await userDataManager.createUser({
                userAddress: admin.address,
                status: 2,
                profile: PROFILE_EXAMPLE,
            });

            expect(await userDataManager.isAddressRegistered(admin.address)).is.true;
        });
    });

    describe("Controller-view level", function () {
        async function getStudyProgramController(deployer, admin) {
            return await ethers.getContractAt(
                "StudyProgramController",
                await deployer.studyProgramController(),
                admin
            );
        }

        async function getUserController(deployer, admin) {
            return await ethers.getContractAt("UserController", await deployer.userController(), admin);
        }

        async function getUserView(deployer, admin) {
            return await ethers.getContractAt("UserView", await deployer.userView(), admin);
        }

        it("Should add study program", async function () {
            const { deployer, admin } = await loadFixture(deploySystem);
            const studyProgramController = await getStudyProgramController(deployer, admin);
            const studyProgramView = await ethers.getContractAt(
                "StudyProgramView",
                await deployer.studyProgramView(),
                admin
            );

            await studyProgramController.addAdminNewStudyProgram(STUDY_PROGRAM_EXAMPLE);

            expect((await studyProgramView.getAllPrograms()).map((program) => program.programName)).contains(
                STUDY_PROGRAM_EXAMPLE
            );
        });

        it("Should set automatic acceptance", async function () {
            const { deployer, admin } = await loadFixture(deploySystem);
            const userController = await getUserController(deployer, admin);

            await userController.setAutomaticAcceptance(true);

            expect(await userController.isAutomaticAcceptanceOn()).is.true;
        });

        it("Should registration result in accepted pending registration", async function () {
            const { deployer, admin } = await loadFixture(deploySystem);
            const studyProgramController = await getStudyProgramController(deployer, admin);
            const userController = await getUserController(deployer, admin);
            const userView = await getUserView(deployer, admin);

            await studyProgramController.addAdminNewStudyProgram(STUDY_PROGRAM_EXAMPLE);
            await userController.setAutomaticAcceptance(true);
            await userController.requestRegistration(admin.address, PROFILE_EXAMPLE);

            expect(await userView.getPendingRegistrationStatus()).to.equal(2); // ACCEPTED
        });

        it("Should accepted but not acknowledged registration result in not registered user", async function () {
            const { deployer, admin } = await loadFixture(deploySystem);
            const studyProgramController = await getStudyProgramController(deployer, admin);
            const userController = await getUserController(deployer, admin);
            const userView = await getUserView(deployer, admin);

            await studyProgramController.addAdminNewStudyProgram(STUDY_PROGRAM_EXAMPLE);
            await userController.setAutomaticAcceptance(true);
            await userController.requestRegistration(admin.address, PROFILE_EXAMPLE);

            expect(await userView.isUserRegistered()).is.false;
        });

        it("Should acknowledgement of accepted registration result in registered user", async function () {
            const { deployer, admin } = await loadFixture(deploySystem);
            const studyProgramController = await getStudyProgramController(deployer, admin);
            const userController = await getUserController(deployer, admin);
            const userView = await getUserView(deployer, admin);

            await studyProgramController.addAdminNewStudyProgram(STUDY_PROGRAM_EXAMPLE);
            await userController.setAutomaticAcceptance(true);
            await userController.requestRegistration(admin.address, PROFILE_EXAMPLE);
            await userController.acknowledgeRegistrationResult();

            expect(await userView.isUserRegistered()).is.true;
        });

        it("Should registered user not be able to register again", async function () {
            const { deployer, admin } = await loadFixture(deploySystem);
            const studyProgramController = await getStudyProgramController(deployer, admin);
            const userController = await getUserController(deployer, admin);

            await studyProgramController.addAdminNewStudyProgram(STUDY_PROGRAM_EXAMPLE);
            await userController.setAutomaticAcceptance(true);
            await userController.requestRegistration(admin.address, PROFILE_EXAMPLE);
            await userController.acknowledgeRegistrationResult();

            await expect(
                userController.requestRegistration(admin.address, PROFILE_EXAMPLE)
            ).to.be.revertedWith("Address has already been registered");
        });

        it("Should user with pending registration request not be able to register again", async function () {
            const { deployer, admin } = await loadFixture(deploySystem);
            const studyProgramController = await getStudyProgramController(deployer, admin);
            const userController = await getUserController(deployer, admin);

            await studyProgramController.addAdminNewStudyProgram(STUDY_PROGRAM_EXAMPLE);
            await userController.setAutomaticAcceptance(true);
            await userController.requestRegistration(admin.address, PROFILE_EXAMPLE);

            await expect(
                userController.requestRegistration(admin.address, PROFILE_EXAMPLE)
            ).to.be.revertedWith("Registration already exists at given address");
        });
    });
});
