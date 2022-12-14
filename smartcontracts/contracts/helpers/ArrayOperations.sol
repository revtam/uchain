pragma solidity >=0.8.7 <=0.8.17;

import "../datatypes/UserDataTypes.sol";
import "../datatypes/CourseDataTypes.sol";

library ArrayOperations {
    /**
     * @return Index of searched element or -1 if element is not in array.
     */
    function findIndexInUintArray(uint256 element, uint256[] memory array) public pure returns (int256) {
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
    function findIndexInAddressArray(address element, address[] memory array) public pure returns (int256) {
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
    function findIndexInRegistrationArray(
        address userAddress,
        UserDataTypes.Registration[] memory registrationList
    ) public pure returns (int256) {
        for (uint256 i = 0; i < registrationList.length; ++i) {
            if (registrationList[i].userAddress == userAddress) {
                return int256(i);
            }
        }
        return -1;
    }

    /**
     * @return Index of searched element or -1 if element is not in array.
     */
    function findIndexInAssessmentArray(
        uint256 assessmentId,
        CourseDataTypes.Assessment[] memory assessmentList
    ) public pure returns (int256) {
        for (uint256 i = 0; i < assessmentList.length; ++i) {
            if (assessmentList[i].assessmentId == assessmentId) {
                return int256(i);
            }
        }
        return -1;
    }

    /**
     * @dev Removes element at index from the given array, the array given as argument is modified in the process.
     */
    function removeUintArrayElement(uint256 index, uint256[] storage array) public {
        for (uint256 i = index; i < array.length - 1; ++i) {
            array[i] = array[i + 1];
        }
        array.pop();
    }

    /**
     * @dev Removes element at index from the given array, the array given as argument is modified in the process.
     */
    function removeRegistrationArrayElement(
        uint256 index,
        UserDataTypes.Registration[] storage registrationList
    ) public {
        for (uint256 i = index; i < registrationList.length - 1; ++i) {
            registrationList[i] = registrationList[i + 1];
        }
        registrationList.pop();
    }

    function isElementInUintArray(uint256 element, uint256[] calldata array) public pure returns (bool) {
        return findIndexInUintArray(element, array) >= 0;
    }

    function isElementInAddressArray(address element, address[] calldata array) public pure returns (bool) {
        return findIndexInAddressArray(element, array) >= 0;
    }

    function addUintToListInMapping(
        uint256 newElement,
        uint256 key,
        mapping(uint256 => uint256[]) storage _mapping
    ) public {
        uint256[] storage elements = _mapping[key];
        elements.push(newElement);
        _mapping[key] = elements;
    }

    function removeUintFromListInMapping(
        uint256 elementToRemove,
        uint256 key,
        mapping(uint256 => uint256[]) storage _mapping
    ) public {
        uint256[] storage elements = _mapping[key];
        int256 _index = findIndexInUintArray(elementToRemove, elements);
        require(_index >= 0, "Invalid index");
        uint256 removeAtIndex = uint256(_index);
        removeUintArrayElement(removeAtIndex, elements);
        _mapping[key] = elements;
    }
}
