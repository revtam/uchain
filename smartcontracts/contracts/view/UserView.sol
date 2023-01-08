pragma solidity >=0.8.7 <=0.8.17;

import "../datatypes/UserDataTypes.sol";
import "../data/datamanager/RegistrationDataManager.sol";
import "../logic/Controller.sol";

contract UserView is Controller {
    constructor(address addressBookAddress) Controller(addressBookAddress) {}

    function getProfile() external view onlyRegistered returns (UserDataTypes.UserProfile memory) {
        uint256 uId = userDataManager().getUIdToAddress(msg.sender);
        return userDataManager().getProfile(uId);
    }

    function getAllUsers() external view onlyLecturerOrSPM returns (UserDataTypes.User[] memory) {
        return userDataManager().getAllUsers();
    }

    function isUserRegistered() external view returns (bool) {
        return userDataManager().isAddressRegistered(msg.sender);
    }

    function isUserRegistrationPending() external view returns (bool) {
        return registrationDataManager().isAddressRegistering(msg.sender);
    }

    function getUserRole() external view returns (UserDataTypes.UserRole) {
        return userDataManager().getUserRoleAtAddress(msg.sender);
    }

    function getPendingRegistration() external view returns (UserDataTypes.Registration memory) {
        // built-in validation: registration storage will revert if a the provided address doesn't have a pending registration connected to it
        return registrationDataManager().getRegistrationToAddress(msg.sender);
    }

    function getPendingRegistrations() external view onlySPM returns (UserDataTypes.Registration[] memory) {
        return registrationDataManager().getAllPendingRegistrations();
    }

    // USED CONTRACTS

    function registrationDataManager() internal view returns (RegistrationDataManager) {
        return RegistrationDataManager(addressBook.getAddress(ContractNames.Name.REGISTRATION_DATA_MANAGER));
    }
}
