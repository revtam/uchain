pragma solidity >=0.8.7 <=0.8.17;

import "./DataManager.sol";
import "../../datatypes/UserDataTypes.sol";

contract RegistrationDataManager is DataManager {
    constructor(address addressBookAddress) DataManager(addressBookAddress) {}

    // WRITE FUNCTIONS
    
    function createRegistration(UserDataTypes.Registration calldata registration) external onlyWhitelisted {
        require(registration.userAddress != address(0), "The address must be set");
        requireStringNotEmpty(registration.profile.firstName, "First name");
        requireStringNotEmpty(registration.profile.lastName, "Last name");
        requireStringNotEmpty(registration.profile.nationality, "Nationality");
        requireValidDateOfBirth(registration.profile.dateOfBirth);

        registrationStorage().storeRegistration(registration);
    }

    function changeRegistrationStatus(address _address, UserDataTypes.RegistrationStatus newStatus)
        external
        onlyWhitelisted
    {
        UserDataTypes.Registration memory registration = registrationStorage().getRegistration(_address);
        registration.status = newStatus;
        registrationStorage().updateRegistration(registration);
    }

    function deleteRegistration(address _address) external onlyWhitelisted {
        registrationStorage().removeRegistration(_address);
    }

    // READ FUNCTIONS

    function getRegistrationToAddress(address _address)
        external
        view
        returns (UserDataTypes.Registration memory)
    {
        return registrationStorage().getRegistration(_address);
    }

    function getRegistrationStatusToAddress(address _address)
        external
        view
        returns (UserDataTypes.RegistrationStatus)
    {
        return registrationStorage().getRegistration(_address).status;
    }

    function getAllPendingRegistrations() external view returns (UserDataTypes.Registration[] memory) {
        return registrationStorage().getAllRegistrations();
    }
}
