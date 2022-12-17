pragma solidity >=0.8.7 <=0.8.17;

import "../addressbook/AddressBookUser.sol";
import "../helpers/AccessControl.sol";
import "../data/datamanager/UserDataManager.sol";
import "./UserAccessController.sol";

abstract contract Controller is AccessControl, AddressBookUser, UserAccessController {
    constructor(address addressBookAddress)
        AccessControl()
        AddressBookUser(addressBookAddress)
        UserAccessController(address(userDataManager()))
    {}

    function userDataManager() internal view virtual returns (UserDataManager);
}
