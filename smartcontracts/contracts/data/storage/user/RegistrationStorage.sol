pragma solidity >=0.8.7 <=0.8.17;

import "../../../helpers/AccessControl.sol";
import "../../../helpers/ArrayOperations.sol";
import "../../../datatypes/UserDataTypes.sol";
import "../validator/Validator.sol";

contract RegistrationStorage is AccessControl, Validator {
    UserDataTypes.Registration[] pendingRegistrations;

    function storeRegistration(UserDataTypes.Registration calldata registration)
        external
        onlyWhitelisted
        onlyIfAddressNotAdded(
            registration.userAddress,
            getAddressesFromRegistrationList(pendingRegistrations),
            "User address"
        )
    {
        pendingRegistrations.push(registration);
    }

    function updateRegistration(UserDataTypes.Registration calldata registration)
        external
        onlyWhitelisted
        onlyIfAddressAdded(
            registration.userAddress,
            getAddressesFromRegistrationList(pendingRegistrations),
            "User address"
        )
    {
        uint256 replaceAtIndex = getIndexInPendingRegistrationsArray(registration.userAddress); // makes further checks
        pendingRegistrations[replaceAtIndex] = registration;
    }

    function removeRegistration(address userAddress)
        external
        onlyWhitelisted
        onlyIfAddressAdded(
            userAddress,
            getAddressesFromRegistrationList(pendingRegistrations),
            "User address"
        )
    {
        uint256 removeAtIndex = getIndexInPendingRegistrationsArray(userAddress);
        ArrayOperations.removeRegistrationArrayElement(removeAtIndex, pendingRegistrations);
    }

    function getRegistration(address userAddress)
        external
        view
        onlyWhitelisted
        onlyIfAddressAdded(
            userAddress,
            getAddressesFromRegistrationList(pendingRegistrations),
            "User address"
        )
        returns (UserDataTypes.Registration memory)
    {
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
        onlyIfAddressAdded(
            userAddress,
            getAddressesFromRegistrationList(pendingRegistrations),
            "User address"
        )
        returns (uint256)
    {
        int256 _index = ArrayOperations.findIndexInRegistrationArray(userAddress, pendingRegistrations);
        return uint256(_index); // because of the modifier `onlyIfRegistrationExistingAtAddress` the index must be >= 0 so this conversion is safe
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
