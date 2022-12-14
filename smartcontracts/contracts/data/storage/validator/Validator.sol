pragma solidity >=0.8.7 <=0.8.17;

import "../../../datatypes/Constants.sol";
import "../../../helpers/ArrayOperations.sol";

abstract contract Validator {
    modifier onlyIfIdValid(uint256 id, string memory idName) {
        require(isIdValid(id), string(abi.encodePacked("Invalid ", idName)));
        _;
    }

    modifier onlyIfValueExisting(uint256 id, string memory valueName) {
        require(isIdValid(id), string(abi.encodePacked(valueName, " does not exist at given ID")));
        _;
    }

    modifier onlyIfValueNotExisting(uint256 id, string memory valueName) {
        require(!isIdValid(id), string(abi.encodePacked(valueName, " already exists at given ID")));
        _;
    }

    modifier onlyIfValueSet(bool isSet, string memory valueName) {
        require(isSet == true, string(abi.encodePacked(valueName, " has not been set yet")));
        _;
    }

    modifier onlyIfValueNotSet(bool isSet, string memory valueName) {
        require(isSet == false, string(abi.encodePacked(valueName, " has already been set")));
        _;
    }

    modifier onlyIfIdAdded(
        uint256 id,
        uint256[] memory idList,
        string memory valueName
    ) {
        require(
            ArrayOperations.isElementInUintArray(id, idList),
            string(abi.encodePacked("Value with the given ", valueName, " has not been added"))
        );
        _;
    }

    modifier onlyIfIdNotAdded(
        uint256 id,
        uint256[] memory idList,
        string memory valueName
    ) {
        require(
            !ArrayOperations.isElementInUintArray(id, idList),
            string(abi.encodePacked("Value with the given ", valueName, " has already been added"))
        );
        _;
    }

    modifier onlyIfAddressAdded(
        address _address,
        address[] memory addressList,
        string memory valueName
    ) {
        require(
            ArrayOperations.isElementInAddressArray(_address, addressList),
            string(abi.encodePacked("Value with the given ", valueName, " has not been added"))
        );
        _;
    }

    modifier onlyIfAddressNotAdded(
        address _address,
        address[] memory addressList,
        string memory valueName
    ) {
        require(
            !ArrayOperations.isElementInAddressArray(_address, addressList),
            string(abi.encodePacked("Value with the given ", valueName, " has already been added"))
        );
        _;
    }

    function isIdValid(uint256 id) public pure returns (bool) {
        return id != Constants.NON_ID;
    }
}
