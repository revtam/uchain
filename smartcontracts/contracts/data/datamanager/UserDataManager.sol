pragma solidity >=0.8.7 <=0.8.17;

import "./DataManager.sol";
import "../../datatypes/UserDataTypes.sol";
import "../storage/user/UserStorage.sol";
import "./helpers/IdGenerator.sol";

contract UserDataManager is DataManager {
    IdGenerator.Counter uIdCounter = IdGenerator.initializeCounter();

    constructor(address addressBookAddress) DataManager(addressBookAddress) {}

    // WRITE FUNCTIONS

    function createUser(UserDataTypes.Registration calldata registration) external onlyWhitelisted {
        require(registration.userAddress != address(0), "The address must be set");
        requireStringNotEmpty(registration.profile.firstName, "First name");
        requireStringNotEmpty(registration.profile.lastName, "Last name");
        requireStringNotEmpty(registration.profile.nationality, "Nationality");
        requireValidDateOfBirth(registration.profile.dateOfBirth);

        userStorage().storeUser(
            registration.userAddress,
            UserDataTypes.User(IdGenerator.generateId(uIdCounter), registration.profile)
        );
    }

    // READ FUNCTIONS

    function getUIdToAddress(address userAddress) external view returns (uint256) {
        return userStorage().getUserByAddress(userAddress).uId;
    }

    function isAddressRegistered(address _address) external view returns (bool) {
        try userStorage().getUserByAddress(_address) {
            return true;
        } catch Error(string memory) {
            return false;
        }
    }

    function getUserRoleAtUId(uint256 uId) external view returns (UserDataTypes.UserRole) {
        return userStorage().getUserByUId(uId).profile.role;
    }

    function getUserRoleAtAddress(address userAddress) external view returns (UserDataTypes.UserRole) {
        return userStorage().getUserByAddress(userAddress).profile.role;
    }

    function getEnrolledProgramIds(uint256 uId) external view returns (uint256[] memory) {
        return userStorage().getUserByUId(uId).profile.studyProgramIds;
    }

    function getProfile(uint256 uId) external view returns (UserDataTypes.UserProfile memory) {
        return userStorage().getUserByUId(uId).profile;
    }

    function getAllUsers() external view returns (UserDataTypes.User[] memory) {
        return userStorage().getAllUsers();
    }

    // GET RELEVANT CONTRACTS

    function userStorage() private view returns (UserStorage) {
        return UserStorage(addressBook.getAddress("UserStorage"));
    }
}
