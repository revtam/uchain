pragma solidity >=0.8.7 <=0.8.17;

import "../datatypes/UserDataTypes.sol";
import "../data/datamanager/UserDataManager.sol";

abstract contract UserAccessController {
    modifier onlyRegistered() {
        requireSenderRegistered();
        _;
    }

    modifier onlyLecturer() {
        requireSenderRegistered();
        require(
            userDataManager().getUserRoleAtAddress(msg.sender) == UserDataTypes.UserRole.LECTURER,
            "Sender must be a lecturer"
        );
        _;
    }

    modifier onlyStudent() {
        requireSenderRegistered();
        require(
            userDataManager().getUserRoleAtAddress(msg.sender) == UserDataTypes.UserRole.STUDENT,
            "Sender must be a student"
        );
        _;
    }

    modifier onlySPM() {
        requireSenderRegistered();
        require(
            userDataManager().getUserRoleAtAddress(msg.sender) ==
                UserDataTypes.UserRole.STUDY_PROGRAM_MANAGER,
            "Sender must be a study program manager"
        );
        _;
    }

    modifier onlyLecturerOrSPM() {
        requireSenderRegistered();
        require(
            userDataManager().getUserRoleAtAddress(msg.sender) == UserDataTypes.UserRole.LECTURER ||
                userDataManager().getUserRoleAtAddress(msg.sender) ==
                UserDataTypes.UserRole.STUDY_PROGRAM_MANAGER,
            "Sender must be lecturer or study program manager"
        );
        _;
    }

    function requireSenderRegistered() private view {
        require(userDataManager().isAddressRegistered(msg.sender), "Sender must be a registered user");
    }

    // USED CONTRACTS

    function userDataManager() internal view virtual returns (UserDataManager);
}
