const contractMetadata = {
    deployer: require("../artifacts/contracts/Deployer.sol/Deployer.json"),

    addressBook: require("../artifacts/contracts/addressbook/AddressBook.sol/AddressBook.json"),

    accessWhitelist: require("../artifacts/contracts/accesscontrol/AccessWhitelist.sol/AccessWhitelist.json"),

    courseDataStorage: require("../artifacts/contracts/data/storage/course/CourseDataStorage.sol/CourseDataStorage.json"),
    assessmentDataStorage: require("../artifacts/contracts/data/storage/assessment/AssessmentDataStorage.sol/AssessmentDataStorage.json"),
    performanceStorage: require("../artifacts/contracts/data/storage/performance/PerformanceStorage.sol/PerformanceStorage.json"),
    gradeStorage: require("../artifacts/contracts/data/storage/performance/GradeStorage.sol/GradeStorage.json"),
    studyProgramStorage: require("../artifacts/contracts/data/storage/studyprogram/StudyProgramStorage.sol/StudyProgramStorage.json"),
    registrationStorage: require("../artifacts/contracts/data/storage/user/RegistrationStorage.sol/RegistrationStorage.json"),
    userStorage: require("../artifacts/contracts/data/storage/user/UserStorage.sol/UserStorage.json"),

    courseDataManager: require("../artifacts/contracts/data/datamanager/CourseDataManager.sol/CourseDataManager.json"),
    assessmentDataManager: require("../artifacts/contracts/data/datamanager/AssessmentDataManager.sol/AssessmentDataManager.json"),
    performanceDataManager: require("../artifacts/contracts/data/datamanager/PerformanceDataManager.sol/PerformanceDataManager.json"),
    programDataManager: require("../artifacts/contracts/data/datamanager/ProgramDataManager.sol/ProgramDataManager.json"),
    registrationDataManager: require("../artifacts/contracts/data/datamanager/RegistrationDataManager.sol/RegistrationDataManager.json"),
    userDataManager: require("../artifacts/contracts/data/datamanager/UserDataManager.sol/UserDataManager.json"),

    courseController: require("../artifacts/contracts/logic/CourseController.sol/CourseController.json"),
    faucet: require("../artifacts/contracts/logic/Faucet.sol/Faucet.json"),
    performanceController: require("../artifacts/contracts/logic/PerformanceController.sol/PerformanceController.json"),
    studyProgramController: require("../artifacts/contracts/logic/StudyProgramController.sol/StudyProgramController.json"),
    userController: require("../artifacts/contracts/logic/UserController.sol/UserController.json"),

    courseView: require("../artifacts/contracts/view/CourseView.sol/CourseView.json"),
    studyProgramView: require("../artifacts/contracts/view/StudyProgramView.sol/StudyProgramView.json"),
    performanceView: require("../artifacts/contracts/view/PerformanceView.sol/PerformanceView.json"),
    userView: require("../artifacts/contracts/view/UserView.sol/UserView.json"),
};

exports.contractMetadata = contractMetadata;
