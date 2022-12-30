pragma solidity >=0.8.7 <=0.8.17;

import "../datatypes/UserDataTypes.sol";
import "../datatypes/CourseDataTypes.sol";

library ArrayOperations {
    /**
     * @return Index of searched element or -1 if element is not in array.
     */
    function findIndexInUintArray(uint256 element, uint256[] memory array) internal pure returns (int256) {
        for (uint256 i = 0; i < array.length; ++i) {
            if (array[i] == element) {
                return int256(i);
            }
        }
        return -1;
    }

    /**
     * @return Index of searched element or -1 if element is not in array.
     */
    function findIndexInAddressArray(address element, address[] memory array) internal pure returns (int256) {
        for (uint256 i = 0; i < array.length; ++i) {
            if (array[i] == element) {
                return int256(i);
            }
        }
        return -1;
    }

    /**
     * @return Index of searched element or -1 if element is not in array.
     */
    function findIndexInStringArray(string memory element, string[] memory array)
        internal
        pure
        returns (int256)
    {
        for (uint256 i = 0; i < array.length; ++i) {
            if (keccak256(bytes(array[i])) == keccak256(bytes(element))) {
                return int256(i);
            }
        }
        return -1;
    }

    /**
     * @dev Removes element from the given array if the element is present, the array given as argument is modified in the process.
     */
    function removeUintArrayElement(uint256 element, uint256[] storage array) internal {
        int256 _removeAtindex = findIndexInUintArray(element, array);
        if (_removeAtindex >= 0) {
            uint256 removeAtIndex = uint256(_removeAtindex);
            for (uint256 i = removeAtIndex; i < array.length - 1; ++i) {
                array[i] = array[i + 1];
            }
            array.pop();
        }
    }

    /**
     * @dev Removes element from the given array if the element is present, the array given as argument is modified in the process.
     */
    function removeAddressArrayElement(address element, address[] storage array) internal {
        int256 _removeAtindex = findIndexInAddressArray(element, array);
        if (_removeAtindex >= 0) {
            uint256 removeAtIndex = uint256(_removeAtindex);
            for (uint256 i = removeAtIndex; i < array.length - 1; ++i) {
                array[i] = array[i + 1];
            }
            array.pop();
        }
    }

    /**
     * @return The extended array with the new element added to it.
     */
    function addElementToUintArray(uint256[] memory array, uint256 element)
        internal
        pure
        returns (uint256[] memory)
    {
        uint256[] memory newArray = new uint256[](array.length + 1);
        for (uint256 i = 0; i < array.length; ++i) {
            newArray[i] = array[i];
        }
        newArray[array.length] = element;
        return newArray;
    }

    function isElementInUintArray(uint256 element, uint256[] memory array) internal pure returns (bool) {
        return findIndexInUintArray(element, array) >= 0;
    }

    function isElementInAddressArray(address element, address[] memory array) internal pure returns (bool) {
        return findIndexInAddressArray(element, array) >= 0;
    }

    function isElementInStringArray(string memory element, string[] memory array)
        internal
        pure
        returns (bool)
    {
        return findIndexInStringArray(element, array) >= 0;
    }

    function addUintToListInMapping(
        uint256 newElement,
        uint256 key,
        mapping(uint256 => uint256[]) storage _mapping
    ) internal {
        uint256[] storage elements = _mapping[key];
        elements.push(newElement);
        _mapping[key] = elements;
    }

    function removeUintFromListInMapping(
        uint256 elementToRemove,
        uint256 key,
        mapping(uint256 => uint256[]) storage _mapping
    ) internal {
        uint256[] storage elements = _mapping[key];
        removeUintArrayElement(elementToRemove, elements);
        _mapping[key] = elements;
    }
}
