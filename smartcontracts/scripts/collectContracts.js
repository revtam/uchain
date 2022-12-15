import path from "path";

const contractPaths = {
    CourseDataManager: path.resolve(
        __dirname,
        "../artifacts/contracts/data/datamanager/CourseDataManager.sol/CourseDataManager.json"
    ),
    PerformanceDataManager: path.resolve(
        __dirname,
        "../artifacts/contracts/data/datamanager/PerformanceDataManager.sol/PerformanceDataManager.json"
    ),
    ProgramDataManager: path.resolve(
        __dirname,
        "../artifacts/contracts/data/datamanager/ProgramDataManager.sol/ProgramDataManager.json"
    ),
    RegistrationDataManager: path.resolve(
        __dirname,
        "../artifacts/contracts/data/datamanager/RegistrationDataManager.sol/RegistrationDataManager.json"
    ),
    UserDataManager: path.resolve(
        __dirname,
        "../artifacts/contracts/data/datamanager/UserDataManager.sol/UserDataManager.json"
    ),
    CourseStorage: path.resolve(
        __dirname,
        "../artifacts/contracts/data/storage/course/CourseStorage.sol/CourseStorage.json"
    ),
    PerformanceStorage: path.resolve(
        __dirname,
        "../artifacts/contracts/data/storage/performance/PerformanceStorage.sol/PerformanceStorage.json"
    ),
    GradeStorage: path.resolve(
        __dirname,
        "../artifacts/contracts/data/storage/performance/GradeStorage.sol/GradeStorage.json"
    ),
    StudyProgramStorage: path.resolve(
        __dirname,
        "../artifacts/contracts/data/storage/studyprogram/StudyProgramStorage.sol/StudyProgramStorage.json"
    ),
    RegistrationStorage: path.resolve(
        __dirname,
        "../artifacts/contracts/data/storage/user/RegistrationStorage.sol/RegistrationStorage.json"
    ),
    UserStorage: path.resolve(
        __dirname,
        "../artifacts/contracts/data/storage/user/UserStorage.sol/UserStorage.json"
    ),
    CourseController: path.resolve(
        __dirname,
        "../artifacts/contracts/logic/CourseController.sol/CourseController.json"
    ),
    Faucet: path.resolve(__dirname, "../artifacts/contracts/logic/Faucet.sol/Faucet.json"),
    PerformanceController: path.resolve(
        __dirname,
        "../artifacts/contracts/logic/PerformanceController.sol/PerformanceController.json"
    ),
    StudyProgramController: path.resolve(
        __dirname,
        "../artifacts/contracts/logic/StudyProgramController.sol/StudyProgramController.json"
    ),
    UserController: path.resolve(
        __dirname,
        "../artifacts/contracts/logic/UserController.sol/UserController.json"
    ),
    CourseView: path.resolve(__dirname, "../artifacts/contracts/view/CourseView.sol/CourseView.json"),
    StudyProgramView: path.resolve(
        __dirname,
        "../artifacts/contracts/view/StudyProgramView.sol/StudyProgramView.json"
    ),
    PerformanceView: path.resolve(
        __dirname,
        "../artifacts/contracts/view/UserPerformanceView.sol/PerformanceView.json"
    ),
    UserView: path.resolve(__dirname, "../artifacts/contracts/view/UserView.sol/UserView.json"),
};

export default contractPaths;
