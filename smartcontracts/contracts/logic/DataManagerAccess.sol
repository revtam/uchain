pragma solidity >=0.8.7 <=0.8.17;

import "../data/datamanager/UserDataManager.sol";
import "../data/datamanager/CourseDataManager.sol";
import "../data/datamanager/PerformanceDataManager.sol";

abstract contract DataManagerAccess {
    CourseDataManager courseDataManager;
    PerformanceDataManager performanceDataManager;
    UserDataManager userDataManager;

    constructor(
        address courseDataManagerAddress,
        address performanceDataManagerAddress,
        address userDataManagerAddress
    ) {
        courseDataManager = CourseDataManager(courseDataManagerAddress);
        performanceDataManager = PerformanceDataManager(performanceDataManagerAddress);
        userDataManager = UserDataManager(userDataManagerAddress);
    }
}
