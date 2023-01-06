async function deployDeployer() {
    const [admin, otherAccount] = await ethers.getSigners();

    const Deployer = await ethers.getContractFactory("Deployer");
    const deployer = await Deployer.deploy();

    return { deployer, admin, otherAccount };
}

async function deployStorages1(deployer) {
    await deployer.deployStorages1(
        (
            await ethers.getContractFactory("AccessWhitelist")
        ).bytecode,
        (
            await ethers.getContractFactory("CourseDataStorage")
        ).bytecode,
        (
            await ethers.getContractFactory("AssessmentDataStorage")
        ).bytecode,
        (
            await ethers.getContractFactory("PerformanceStorage")
        ).bytecode
    );
}

async function deployStorages2(deployer) {
    await deployer.deployStorages2(
        (
            await ethers.getContractFactory("GradeStorage")
        ).bytecode,
        (
            await ethers.getContractFactory("StudyProgramStorage")
        ).bytecode,
        (
            await ethers.getContractFactory("RegistrationStorage")
        ).bytecode,
        (
            await ethers.getContractFactory("UserStorage")
        ).bytecode
    );
}

async function deployDatamanagers(deployer) {
    await deployer.deployDatamanagers(
        (
            await ethers.getContractFactory("AccessWhitelist")
        ).bytecode,
        (
            await ethers.getContractFactory("CourseDataManager")
        ).bytecode,
        (
            await ethers.getContractFactory("AssessmentDataManager")
        ).bytecode,
        (
            await ethers.getContractFactory("PerformanceDataManager")
        ).bytecode,
        (
            await ethers.getContractFactory("ProgramDataManager")
        ).bytecode,
        (
            await ethers.getContractFactory("RegistrationDataManager")
        ).bytecode,
        (
            await ethers.getContractFactory("UserDataManager")
        ).bytecode
    );
}

async function deployControllers(deployer) {
    await deployer.deployControllers(
        (
            await ethers.getContractFactory("CourseController")
        ).bytecode,
        (
            await ethers.getContractFactory("PerformanceController")
        ).bytecode,
        (
            await ethers.getContractFactory("StudyProgramController")
        ).bytecode,
        (
            await ethers.getContractFactory("UserController")
        ).bytecode,
        (
            await ethers.getContractFactory("Faucet")
        ).bytecode
    );
}

async function deployViews(deployer) {
    await deployer.deployViews(
        (
            await ethers.getContractFactory("CourseView")
        ).bytecode,
        (
            await ethers.getContractFactory("PerformanceView")
        ).bytecode,
        (
            await ethers.getContractFactory("StudyProgramView")
        ).bytecode,
        (
            await ethers.getContractFactory("UserView")
        ).bytecode
    );
}

async function deploySystem() {
    const { deployer, admin, otherAccount } = await deployDeployer();
    await deployStorages1(deployer);
    await deployStorages2(deployer);
    await deployDatamanagers(deployer);
    await deployControllers(deployer);
    await deployViews(deployer);
    await deployer.configureDeployments(otherAccount.address);

    await admin.sendTransaction({
        to: await deployer.faucet(),
        value: ethers.utils.parseEther("100.0"),
    });

    return { deployer, admin, otherAccount };
}

exports.deployDeployer = deployDeployer;
exports.deployStorages1 = deployStorages1;
exports.deployStorages2 = deployStorages2;
exports.deployDatamanagers = deployDatamanagers;
exports.deployControllers = deployControllers;
exports.deployViews = deployViews;
exports.deploySystem = deploySystem;
