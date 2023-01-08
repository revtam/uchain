const path = require("path");

const contractPaths = {
    deployer: path.resolve(__dirname, "../artifacts/contracts/Deployer.sol/Deployer.json"),

    addressBook: path.resolve(__dirname, "../artifacts/contracts/addressbook/AddressBook.sol/AddressBook.json"),

    accessWhitelist: path.resolve(
        __dirname,
        "../artifacts/contracts/accesscontrol/AccessWhitelist.sol/AccessWhitelist.json"
    ),

    courseDataStorage: path.resolve(
        __dirname,
        "../artifacts/contracts/data/storage/course/CourseDataStorage.sol/CourseDataStorage.json"
    ),
    assessmentDataStorage: path.resolve(
        __dirname,
        "../artifacts/contracts/data/storage/assessment/AssessmentDataStorage.sol/AssessmentDataStorage.json"
    ),
    performanceStorage: path.resolve(
        __dirname,
        "../artifacts/contracts/data/storage/performance/PerformanceStorage.sol/PerformanceStorage.json"
    ),
    gradeStorage: path.resolve(
        __dirname,
        "../artifacts/contracts/data/storage/performance/GradeStorage.sol/GradeStorage.json"
    ),
    studyProgramStorage: path.resolve(
        __dirname,
        "../artifacts/contracts/data/storage/studyprogram/StudyProgramStorage.sol/StudyProgramStorage.json"
    ),
    registrationStorage: path.resolve(
        __dirname,
        "../artifacts/contracts/data/storage/user/RegistrationStorage.sol/RegistrationStorage.json"
    ),
    userStorage: path.resolve(
        __dirname,
        "../artifacts/contracts/data/storage/user/UserStorage.sol/UserStorage.json"
    ),

    courseDataManager: path.resolve(
        __dirname,
        "../artifacts/contracts/data/datamanager/CourseDataManager.sol/CourseDataManager.json"
    ),
    assessmentDataManager: path.resolve(
        __dirname,
        "../artifacts/contracts/data/datamanager/AssessmentDataManager.sol/AssessmentDataManager.json"
    ),
    performanceDataManager: path.resolve(
        __dirname,
        "../artifacts/contracts/data/datamanager/PerformanceDataManager.sol/PerformanceDataManager.json"
    ),
    programDataManager: path.resolve(
        __dirname,
        "../artifacts/contracts/data/datamanager/ProgramDataManager.sol/ProgramDataManager.json"
    ),
    registrationDataManager: path.resolve(
        __dirname,
        "../artifacts/contracts/data/datamanager/RegistrationDataManager.sol/RegistrationDataManager.json"
    ),
    userDataManager: path.resolve(
        __dirname,
        "../artifacts/contracts/data/datamanager/UserDataManager.sol/UserDataManager.json"
    ),

    courseController: path.resolve(
        __dirname,
        "../artifacts/contracts/logic/CourseController.sol/CourseController.json"
    ),
    faucet: path.resolve(__dirname, "../artifacts/contracts/logic/Faucet.sol/Faucet.json"),
    performanceController: path.resolve(
        __dirname,
        "../artifacts/contracts/logic/PerformanceController.sol/PerformanceController.json"
    ),
    studyProgramController: path.resolve(
        __dirname,
        "../artifacts/contracts/logic/StudyProgramController.sol/StudyProgramController.json"
    ),
    userController: path.resolve(
        __dirname,
        "../artifacts/contracts/logic/UserController.sol/UserController.json"
    ),

    courseView: path.resolve(__dirname, "../artifacts/contracts/view/CourseView.sol/CourseView.json"),
    studyProgramView: path.resolve(
        __dirname,
        "../artifacts/contracts/view/StudyProgramView.sol/StudyProgramView.json"
    ),
    performanceView: path.resolve(
        __dirname,
        "../artifacts/contracts/view/PerformanceView.sol/PerformanceView.json"
    ),
    userView: path.resolve(__dirname, "../artifacts/contracts/view/UserView.sol/UserView.json"),
};

exports.contractPaths = contractPaths;
