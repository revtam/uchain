pragma solidity >=0.8.7 <=0.8.17;

import "../data/datamanager/UserDataManager.sol";
import "../data/datamanager/RegistrationDataManager.sol";
import "../logic/UserAccessController.sol";
import "../datatypes/UserDataTypes.sol";

contract UserView is UserAccessController {
    UserDataManager userDataManager;
    RegistrationDataManager registrationDataManager;

    constructor(address userDataManagerAddress, address registrationDataManagerAddress)
        UserAccessController(userDataManagerAddress)
    {
        userDataManager = UserDataManager(userDataManagerAddress);
        registrationDataManager = RegistrationDataManager(registrationDataManagerAddress);
    }

    function getProfile() external view onlyRegistered returns (UserDataTypes.UserProfile memory) {
        uint256 uId = userDataManager.getUIdToAddress(msg.sender);
        return userDataManager.getProfile(uId);
    }

    function getAllUsers() external view onlyLecturerOrSPM returns (UserDataTypes.User[] memory) {
        return userDataManager.getAllUsers();
    }

    function isUserRegistered() external view returns (bool) {
        return userDataManager.isAddressRegistered(msg.sender);
    }

    function getPendingRegistrationStatus() external view returns (UserDataTypes.RegistrationStatus) {
        // built-in validation: registration storage will revert if a the provided address doesn't have a pending registration connected to it
        return registrationDataManager.getRegistrationStatusToAddress(msg.sender);
    }

    function getPendingRegistrations() external view onlySPM returns (UserDataTypes.Registration[] memory) {
        return registrationDataManager.getAllPendingRegistrations();
    }
}