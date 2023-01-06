pragma solidity >=0.8.7 <=0.8.17;

import "./ContractNames.sol";

contract AddressBook {
    mapping(ContractNames.Name => address) addressesByName;
    ContractNames.Name[] names;

    function addEntry(ContractNames.Name name, address _address) public {
        addressesByName[name] = _address;
        names.push(name);
    }

    function addEntries(ContractNames.Name[] calldata _names, address[] calldata addresses) external {
        require(
            _names.length == addresses.length,
            "Provided list of names and list of addresses are not the same length"
        );
        for (uint256 i = 0; i < _names.length; ++i) {
            addEntry(_names[i], addresses[i]);
        }
    }

    function changeEntry(ContractNames.Name name, address newAddress) public {
        require(addressesByName[name] != address(0), "Name does not exist");
        addressesByName[name] = newAddress;
    }

    function getAddress(ContractNames.Name name) external view returns (address) {
        address _address = addressesByName[name];
        require(
            _address != address(0),
            string(abi.encodePacked("There is no address stored with this name: ", name))
        );
        return _address;
    }

    function viewStoredNames() external view returns (ContractNames.Name[] memory) {
        return names;
    }
}
