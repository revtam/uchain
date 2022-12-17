pragma solidity >=0.8.7 <=0.8.17;

import "../../addressbook/AddressBookUser.sol";
import "../../helpers/AccessControl.sol";

abstract contract DataManager is AccessControl, AddressBookUser {
    constructor(address addressBookAddress) AccessControl() AddressBookUser(addressBookAddress) {}
}
