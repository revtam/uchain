pragma solidity >=0.8.7 <=0.8.17;

import "../../../helpers/ArrayOperations.sol";
import "../../../datatypes/UserDataTypes.sol";
import "../Storage.sol";

contract RegistrationStorage is Storage {
    mapping(address => UserDataTypes.Registration) registrationByAddress;
    address[] pendingRegistrationAddresses;

    constructor(address accessWhitelistAddress) Storage(accessWhitelistAddress) {}

    function storeRegistration(UserDataTypes.Registration calldata registration) external onlyWhitelisted {
        Validator.requireAddressNotExisting(registrationByAddress[registration.userAddress].userAddress, "Registration");

        registrationByAddress[registration.userAddress] = registration;
        pendingRegistrationAddresses.push(registration.userAddress);
    }

    function updateRegistration(UserDataTypes.Registration calldata registration) external onlyWhitelisted {
        Validator.requireAddressExisting(registrationByAddress[registration.userAddress].userAddress, "Registration");

        registrationByAddress[registration.userAddress] = registration;
    }

    function removeRegistration(address userAddress) external onlyWhitelisted {
        Validator.requireAddressExisting(registrationByAddress[userAddress].userAddress, "Registration");

        delete registrationByAddress[userAddress];
        ArrayOperations.removeAddressArrayElement(userAddress, pendingRegistrationAddresses);
    }

    function getRegistration(address userAddress)
        external
        view
        onlyWhitelisted
        returns (UserDataTypes.Registration memory)
    {
        Validator.requireAddressExisting(registrationByAddress[userAddress].userAddress, "Registration");

        return registrationByAddress[userAddress];
    }

        /**
     * @return If returned tuple[0] is true, the registration at tuple[1] is set.
     */
    function getRegistrationIfSet(address userAddress)
        external
        view
        onlyWhitelisted
        returns (bool, UserDataTypes.Registration memory)
    {
        UserDataTypes.Registration memory registration = registrationByAddress[userAddress];
        if (Validator.isAddressValid(registration.userAddress)) {
            return (true, registration);
        }
        
        return (false, registration);
    }

    function getAllRegistrations()
        external
        view
        onlyWhitelisted
        returns (UserDataTypes.Registration[] memory)
    {
        UserDataTypes.Registration[] memory registrations = new UserDataTypes.Registration[](
            pendingRegistrationAddresses.length
        );
        for (uint256 i = 0; i < pendingRegistrationAddresses.length; ++i) {
            registrations[i] = registrationByAddress[pendingRegistrationAddresses[i]];
        }
        return registrations;
    }
}
