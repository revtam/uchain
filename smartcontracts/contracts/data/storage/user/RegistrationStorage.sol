pragma solidity >=0.8.7 <=0.8.17;

import "../../../helpers/ArrayOperations.sol";
import "../../../datatypes/UserDataTypes.sol";
import "../Storage.sol";

contract RegistrationStorage is Storage {
    UserDataTypes.Registration[] pendingRegistrations;

    constructor(address accessWhitelistAddress) Storage(accessWhitelistAddress) {}

    function storeRegistration(UserDataTypes.Registration calldata registration) external onlyWhitelisted {
        Validator.requireAddressNotAdded(
            registration.userAddress,
            getAddressesFromRegistrationList(pendingRegistrations),
            "User address"
        );

        pendingRegistrations.push(registration);
    }

    function updateRegistration(UserDataTypes.Registration calldata registration) external onlyWhitelisted {
        Validator.requireAddressAdded(
            registration.userAddress,
            getAddressesFromRegistrationList(pendingRegistrations),
            "User address"
        );

        uint256 replaceAtIndex = getIndexInPendingRegistrationsArray(registration.userAddress); // makes further checks
        pendingRegistrations[replaceAtIndex] = registration;
    }

    function removeRegistration(address userAddress) external onlyWhitelisted {
        Validator.requireAddressAdded(
            userAddress,
            getAddressesFromRegistrationList(pendingRegistrations),
            "User address"
        );

        uint256 removeAtIndex = getIndexInPendingRegistrationsArray(userAddress);
        ArrayOperations.removeRegistrationArrayElement(removeAtIndex, pendingRegistrations);
    }

    function getRegistration(address userAddress)
        external
        view
        onlyWhitelisted
        returns (UserDataTypes.Registration memory)
    {
        Validator.requireAddressAdded(
            userAddress,
            getAddressesFromRegistrationList(pendingRegistrations),
            "User address"
        );

        uint256 index = getIndexInPendingRegistrationsArray(userAddress);
        return pendingRegistrations[index];
    }

    function getAllRegistrations()
        external
        view
        onlyWhitelisted
        returns (UserDataTypes.Registration[] memory)
    {
        return pendingRegistrations;
    }

    // PRIVATE FUNCTIONS

    function getIndexInPendingRegistrationsArray(address userAddress)
        private
        view
        onlyWhitelisted
        returns (uint256)
    {
        Validator.requireAddressAdded(
            userAddress,
            getAddressesFromRegistrationList(pendingRegistrations),
            "User address"
        );

        int256 _index = ArrayOperations.findIndexInRegistrationArray(userAddress, pendingRegistrations);
        return uint256(_index); // because of the modifier `Validator.requireRegistrationExistingAtAddress` the index must be >= 0 so this conversion is safe
    }

    function getAddressesFromRegistrationList(UserDataTypes.Registration[] memory registrationList)
        private
        pure
        returns (address[] memory)
    {
        address[] memory addresses = new address[](registrationList.length);
        for (uint256 i = 0; i < registrationList.length; ++i) {
            addresses[i] = registrationList[i].userAddress;
        }
        return addresses;
    }
}
