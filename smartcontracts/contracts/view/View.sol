pragma solidity >=0.8.7 <=0.8.17;

import "../addressbook/AddressBookUser.sol";
import "../data/datamanager/UserDataManager.sol";
import "../logic/UserAccessController.sol";

abstract contract View is AddressBookUser, UserAccessController {
    constructor(address addressBookAddress)
        AddressBookUser(addressBookAddress)
        UserAccessController(address(userDataManager()))
    {}

    function userDataManager() internal view virtual returns (UserDataManager);
}
