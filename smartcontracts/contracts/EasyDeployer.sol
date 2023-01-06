pragma solidity >=0.8.7 <=0.8.17;

import "./accesscontrol/AdminAccess.sol";
import "./accesscontrol/AccessWhitelist.sol";
import "./logic/Faucet.sol";
import "./data/storage/course/CourseDataStorage.sol";
import "./data/storage/assessment/AssessmentDataStorage.sol";
import "./data/storage/performance/PerformanceStorage.sol";
import "./data/storage/performance/GradeStorage.sol";
import "./data/storage/studyprogram/StudyProgramStorage.sol";
import "./data/storage/user/UserStorage.sol";
import "./data/storage/user/RegistrationStorage.sol";
import "./data/datamanager/CourseDataManager.sol";
import "./data/datamanager/AssessmentDataManager.sol";
import "./data/datamanager/PerformanceDataManager.sol";
import "./data/datamanager/ProgramDataManager.sol";
import "./data/datamanager/RegistrationDataManager.sol";
import "./data/datamanager/UserDataManager.sol";
import "./logic/CourseController.sol";
import "./logic/PerformanceController.sol";
import "./logic/StudyProgramController.sol";
import "./logic/UserController.sol";
import "./view/CourseView.sol";
import "./view/PerformanceView.sol";
import "./view/StudyProgramView.sol";
import "./view/UserView.sol";

contract EasyDeployer {
    address public storageAccessWhitelist;
    address public courseDataStorage;
    address public assessmentDataStorage;
    address public performanceStorage;
    address public gradeStorage;
    address public studyProgramStorage;
    address public registrationStorage;
    address public userStorage;

    address public datamanagerAccessWhitelist;
    address public courseDataManager;
    address public assessmentDataManager;
    address public performanceDataManager;
    address public programDataManager;
    address public registrationDataManager;
    address public userDataManager;

    address public faucet;
    address public courseController;
    address public performanceController;
    address public studyProgramController;
    address public userController;

    address public courseView;
    address public performanceView;
    address public studyProgramView;
    address public userView;

    address owner;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // function deployStorages1() external onlyOwner {
    //     storageAccessWhitelist = address(new AccessWhitelist());

    //     courseDataStorage = address(new CourseDataStorage(storageAccessWhitelist));
    //     assessmentDataStorage = address(new AssessmentDataStorage(storageAccessWhitelist));
    //     performanceStorage = address(new PerformanceStorage(storageAccessWhitelist));
    // }

    // function deployStorages2() external onlyOwner {
    //     gradeStorage = address(new GradeStorage(storageAccessWhitelist));
    //     studyProgramStorage = address(new StudyProgramStorage(storageAccessWhitelist));
    //     registrationStorage = address(new RegistrationStorage(storageAccessWhitelist));
    //     userStorage = address(new UserStorage(storageAccessWhitelist));
    // }

    // function deployDatamanagers() external onlyOwner {
    //     datamanagerAccessWhitelist = address(new AccessWhitelist());

    //     courseDataManager = address(new CourseDataManager(courseDataStorage, datamanagerAccessWhitelist));
    //     assessmentDataManager = address(new AssessmentDataManager(assessmentDataStorage, datamanagerAccessWhitelist));
    //     performanceDataManager = address(new PerformanceDataManager(performanceStorage, gradeStorage, datamanagerAccessWhitelist));
    //     programDataManager = address(new ProgramDataManager(studyProgramStorage, datamanagerAccessWhitelist));
    //     registrationDataManager = address(new RegistrationDataManager(registrationStorage, datamanagerAccessWhitelist));
    //     userDataManager = address(new UserDataManager(userStorage, datamanagerAccessWhitelist));
    // }

    // function deployControllers() external onlyOwner {
    //     faucet = address(new Faucet());
    //     courseController = address(new CourseController(userDataManager, courseDataManager, assessmentDataManager, performanceDataManager));
    //     performanceController = address(new PerformanceController(userDataManager, courseDataManager, assessmentDataManager, performanceDataManager));
    //     studyProgramController = address(new StudyProgramController(userDataManager, programDataManager));
    //     userController = address(new UserController(userDataManager, programDataManager, registrationDataManager, payable(faucet)));
    // }

    // function deployViews() external onlyOwner {
    //     courseView = address(new CourseView(userDataManager, courseDataManager, assessmentDataManager));
    //     performanceView = address(new PerformanceView(userDataManager, courseDataManager, assessmentDataManager, performanceDataManager));
    //     studyProgramView = address(new StudyProgramView(userDataManager, programDataManager));
    //     userView = address(new UserView(userDataManager, registrationDataManager));
    // }

    // function configureDeployments(address registratorServerWalletAddress) external onlyOwner {
    //     AccessWhitelist _storageAccessWhitelist = AccessWhitelist(storageAccessWhitelist);
    //     _storageAccessWhitelist.grantAccess(owner);
    //     _storageAccessWhitelist.grantAccess(courseDataManager);
    //     _storageAccessWhitelist.grantAccess(assessmentDataManager);
    //     _storageAccessWhitelist.grantAccess(performanceDataManager);
    //     _storageAccessWhitelist.grantAccess(programDataManager);
    //     _storageAccessWhitelist.grantAccess(registrationDataManager);
    //     _storageAccessWhitelist.grantAccess(userDataManager);

    //     AccessWhitelist _datamanagerAccessWhitelist = AccessWhitelist(datamanagerAccessWhitelist);
    //     _datamanagerAccessWhitelist.addAdmin(owner);
    //     _datamanagerAccessWhitelist.grantAccess(owner);
    //     _datamanagerAccessWhitelist.grantAccess(courseController);
    //     _datamanagerAccessWhitelist.grantAccess(performanceController);
    //     _datamanagerAccessWhitelist.grantAccess(studyProgramController);
    //     _datamanagerAccessWhitelist.grantAccess(userController);
    //     _datamanagerAccessWhitelist.grantAccess(courseView);
    //     _datamanagerAccessWhitelist.grantAccess(performanceView);
    //     _datamanagerAccessWhitelist.grantAccess(studyProgramView);
    //     _datamanagerAccessWhitelist.grantAccess(userView);

    //     Faucet(payable(faucet)).addAdmin(owner);
    //     Faucet(payable(faucet)).addAdmin(userController);

    //     AdminAccess(studyProgramController).addAdmin(owner);

    //     AdminAccess(userController).addAdmin(owner);
    //     AdminAccess(userController).addAdmin(registratorServerWalletAddress);
    // }
}
