pragma solidity >=0.8.7 <=0.8.17;

import "../addressbook/AddressBookUser.sol";
import "../addressbook/ContractNames.sol";
import "./UserAccessController.sol";

abstract contract Controller is UserAccessController, AddressBookUser {
    constructor(address addressBookAddress) AddressBookUser(addressBookAddress) {}

    function userDataManager() internal view override returns (UserDataManager) {
        return UserDataManager(addressBook.getAddress(ContractNames.Name.USER_DATA_MANAGER));
    }
}
