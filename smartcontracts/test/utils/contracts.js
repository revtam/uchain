exports.getUserController = async function (deployer, account) {
    return await ethers.getContractAt("UserController", await deployer.userController(), account);
};
exports.getUserView = async function (deployer, account) {
    return await ethers.getContractAt("UserView", await deployer.userView(), account);
};
exports.getCourseController = async function (deployer, account) {
    return await ethers.getContractAt("CourseController", await deployer.courseController(), account);
};
exports.getCourseView = async function (deployer, account) {
    return await ethers.getContractAt("CourseView", await deployer.courseView(), account);
};
exports.getStudyProgramController = async function (deployer, account) {
    return await ethers.getContractAt(
        "StudyProgramController",
        await deployer.studyProgramController(),
        account
    );
};
exports.getStudyProgramView = async function (deployer, account) {
    return await ethers.getContractAt("StudyProgramView", await deployer.studyProgramView(), account);
};
exports.getPerformanceController = async function (deployer, account) {
    return await ethers.getContractAt(
        "PerformanceController",
        await deployer.performanceController(),
        account
    );
};
exports.getPerformanceView = async function (deployer, account) {
    return await ethers.getContractAt("PerformanceView", await deployer.performanceView(), account);
};
