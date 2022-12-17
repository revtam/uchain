pragma solidity >=0.8.7 <=0.8.17;

contract AddressBook {
    mapping(string => address) addressesByName;
    string[] names;

    function addEntry(string calldata name, address _address) public {
        addressesByName[name] = _address;
        names.push(name);
    }

    function addEntries(string[] calldata names, address[] calldata addresses) external {
        require(
            names.length == addresses.length,
            "Provided list of names and list of addresses are not the same length"
        );
        for (uint256 i = 0; i < names.length; ++i) {
            addEntry(names[i], addresses[i]);
        }
    }

    function getAddress(string calldata name) external view returns (address) {
        address _address = addressesByName[name];
        require(
            _address != address(0),
            string(abi.encodePacked("There is no addres stored with this name: ", name))
        );
        return _address;
    }

    function viewStoredNames() external view returns (string[] memory) {
        return names;
    }
}
