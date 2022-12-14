pragma solidity >=0.8.7 <=0.8.17;

import "../datatypes/UserDataTypes.sol";
import "../data/datamanager/UserDataManager.sol";

abstract contract UserAccessController {
    UserDataManager private userDataManager;

    constructor(address userDataManagerAddress) {
        userDataManager = UserDataManager(userDataManagerAddress);
    }

    modifier onlyRegistered() {
        require(userDataManager.isAddressRegistered(msg.sender), "Sender must be a registered user");
        _;
    }

    modifier onlyLecturer() {
        require(
            userDataManager.getUserRoleAtAddress(msg.sender) == UserDataTypes.UserRole.LECTURER,
            "Sender must be a lecturer"
        );
        _;
    }

    modifier onlyStudent() {
        require(
            userDataManager.getUserRoleAtAddress(msg.sender) == UserDataTypes.UserRole.STUDENT,
            "Sender must be a student"
        );
        _;
    }

    modifier onlySPM() {
        require(
            userDataManager.getUserRoleAtAddress(msg.sender) == UserDataTypes.UserRole.STUDY_PROGRAM_MANAGER,
            "Sender must be a study program manager"
        );
        _;
    }

    modifier onlyLecturerOrSPM() {
        require(
            userDataManager.getUserRoleAtAddress(msg.sender) == UserDataTypes.UserRole.LECTURER ||
                userDataManager.getUserRoleAtAddress(msg.sender) ==
                UserDataTypes.UserRole.STUDY_PROGRAM_MANAGER,
            "Sender must be lecturer or study program manager"
        );
        _;
    }
}
