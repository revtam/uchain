pragma solidity >=0.8.7 <=0.8.17;

import "../../accesscontrol/AccessController.sol";
import "../storage/user/RegistrationStorage.sol";
import "../../datatypes/UserDataTypes.sol";
import "./helpers/DataManagerCommonChecks.sol";

contract RegistrationDataManager is AccessController {
    RegistrationStorage registrationStorage;

    constructor(address registrationStorageAddress, address accessWhitelistAddress)
        AccessController(accessWhitelistAddress)
    {
        registrationStorage = RegistrationStorage(registrationStorageAddress);
    }

    // WRITE FUNCTIONS

    function createRegistration(
        address _address,
        UserDataTypes.RegistrationStatus status,
        UserDataTypes.UserProfile calldata profile
    ) external onlyWhitelisted {
        require(_address != address(0), "The address must be set");
        DataManagerCommonChecks.requireStringNotEmpty(profile.firstName, "First name");
        DataManagerCommonChecks.requireStringNotEmpty(profile.lastName, "Last name");
        DataManagerCommonChecks.requireStringNotEmpty(profile.nationality, "Nationality");
        DataManagerCommonChecks.requireValidDateOfBirth(profile.dateOfBirth);

        registrationStorage.storeRegistration(UserDataTypes.Registration(_address, status, profile));
    }

    function changeRegistrationStatus(address _address, UserDataTypes.RegistrationStatus newStatus)
        external
        onlyWhitelisted
    {
        UserDataTypes.Registration memory registration = registrationStorage.getRegistration(_address);
        registration.status = newStatus;
        registrationStorage.updateRegistration(registration);
    }

    function deleteRegistration(address _address) external onlyWhitelisted {
        registrationStorage.removeRegistration(_address);
    }

    // READ FUNCTIONS

    function isAddressRegistering(address _address) external view returns (bool) {
        (bool isRegistrationExisting, ) = registrationStorage.getRegistrationIfSet(_address);
        return isRegistrationExisting;
    }

    function getRegistrationToAddress(address _address)
        external
        view
        returns (UserDataTypes.Registration memory)
    {
        return registrationStorage.getRegistration(_address);
    }

    function getRegistrationStatusToAddress(address _address)
        external
        view
        returns (UserDataTypes.RegistrationStatus)
    {
        return registrationStorage.getRegistration(_address).status;
    }

    function getAllPendingRegistrations() external view returns (UserDataTypes.Registration[] memory) {
        return registrationStorage.getAllRegistrations();
    }
}
