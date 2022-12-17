pragma solidity >=0.8.7 <=0.8.17;

import "./AddressBook.sol";

contract AddressBookUser {
    AddressBook addressBook;

    constructor(address addressBookAddress) {
        addressBook = AddressBook(addressBookAddress);
    }
}
