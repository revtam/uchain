pragma solidity >=0.8.7 <=0.8.17;

import "../data/datamanager/RegistrationDataManager.sol";
import "../data/datamanager/UserDataManager.sol";
import "../data/datamanager/CourseDataManager.sol";
import "../data/datamanager/AssessmentDataManager.sol";
import "../data/datamanager/PerformanceDataManager.sol";
import "../data/datamanager/ProgramDataManager.sol";
import "./UserAccessController.sol";

abstract contract Controller is UserAccessController {
    UserDataManager userDataManager;
    CourseDataManager courseDataManager;
    AssessmentDataManager assessmentDataManager;
    PerformanceDataManager performanceDataManager;
    ProgramDataManager programDataManager;
    RegistrationDataManager registrationDataManager;

    constructor(address userDataManagerAddress) UserAccessController(userDataManagerAddress) {}

    function setUserDataManager(address userDataManagerAddress) internal {
        userDataManager = UserDataManager(userDataManagerAddress);
    }

    function setCourseDataManager(address courseDataManagerAddress) internal {
        courseDataManager = CourseDataManager(courseDataManagerAddress);
    }

    function setAssessmentDataManager(address assessmentDataManagerAddress) internal {
        assessmentDataManager = AssessmentDataManager(assessmentDataManagerAddress);
    }

    function setPerformanceDataManager(address performanceDataManagerAddress) internal {
        performanceDataManager = PerformanceDataManager(performanceDataManagerAddress);
    }

    function setProgramDataManager(address programDataManagerAddress) internal {
        programDataManager = ProgramDataManager(programDataManagerAddress);
    }

    function setRegistrationDataManager(address registrationDataManagerAddress) internal {
        registrationDataManager = RegistrationDataManager(registrationDataManagerAddress);
    }
}
