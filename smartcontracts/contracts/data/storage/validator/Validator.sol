pragma solidity >=0.8.7 <=0.8.17;

import "../../../datatypes/Constants.sol";
import "../../../helpers/ArrayOperations.sol";

library Validator {
    function requireIdValid(uint256 id, string memory idName) internal pure {
        require(isIdValid(id), string(abi.encodePacked("Invalid ", idName)));
    }

    function requireValueExisting(uint256 id, string memory valueName) internal pure {
        require(isIdValid(id), string(abi.encodePacked(valueName, " does not exist at given ID")));
    }

    function requireValueNotExisting(uint256 id, string memory valueName) internal pure {
        require(!isIdValid(id), string(abi.encodePacked(valueName, " already exists at given ID")));
    }

    function requireValueSet(bool isSet, string memory valueName) internal pure {
        require(isSet, string(abi.encodePacked(valueName, " has not been set yet")));
    }

    function requireValueNotSet(bool isSet, string memory valueName) internal pure {
        require(!isSet, string(abi.encodePacked(valueName, " has already been set")));
    }

    function requireIdAdded(
        uint256 id,
        uint256[] memory idList,
        string memory valueName
    ) internal pure {
        require(
            ArrayOperations.isElementInUintArray(id, idList),
            string(abi.encodePacked("Value with the given ", valueName, " has not been added"))
        );
    }

    function requireIdNotAdded(
        uint256 id,
        uint256[] memory idList,
        string memory valueName
    ) internal pure {
        require(
            !ArrayOperations.isElementInUintArray(id, idList),
            string(abi.encodePacked("Value with the given ", valueName, " has already been added"))
        );
    }

    function requireAddressAdded(
        address _address,
        address[] memory addressList,
        string memory valueName
    ) internal pure {
        require(
            ArrayOperations.isElementInAddressArray(_address, addressList),
            string(abi.encodePacked("Value with the given ", valueName, " has not been added"))
        );
    }

    function requireAddressNotAdded(
        address _address,
        address[] memory addressList,
        string memory valueName
    ) internal pure {
        require(
            !ArrayOperations.isElementInAddressArray(_address, addressList),
            string(abi.encodePacked("Value with the given ", valueName, " has already been added"))
        );
    }

    function isIdValid(uint256 id) internal pure returns (bool) {
        return id != Constants.NON_ID;
    }
}
