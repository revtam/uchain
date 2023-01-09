pragma solidity >=0.8.7 <=0.8.17;

import "../../accesscontrol/AccessController.sol";
import "../storage/user/UserStorage.sol";
import "../../datatypes/UserDataTypes.sol";
import "./helpers/IdGenerator.sol";
import "./helpers/DataManagerCommonChecks.sol";

contract UserDataManager is AccessController {
    UserStorage userStorage;

    IdGenerator.Counter uIdCounter = IdGenerator.initializeCounter();

    constructor(address userStorageAddress, address accessWhitelistAddress)
        AccessController(accessWhitelistAddress)
    {
        userStorage = UserStorage(userStorageAddress);
    }

    // WRITE FUNCTIONS
    function createUser(UserDataTypes.Registration calldata registration) external onlyWhitelisted {
        require(registration.userAddress != address(0), "The address must be set");
        DataManagerCommonChecks.requireStringNotEmpty(registration.profile.firstName, "First name");
        DataManagerCommonChecks.requireStringNotEmpty(registration.profile.lastName, "Last name");
        DataManagerCommonChecks.requireStringNotEmpty(registration.profile.nationality, "Nationality");
        DataManagerCommonChecks.requireValidDateOfBirth(registration.profile.dateOfBirth);

        userStorage.storeUser(
            registration.userAddress,
            UserDataTypes.User(IdGenerator.generateId(uIdCounter), registration.profile)
        );
    }

    // READ FUNCTIONS

    function getUIdToAddress(address userAddress) external view onlyWhitelisted returns (uint256) {
        return userStorage.getUserByAddress(userAddress).uId;
    }

    function isAddressRegistered(address _address) external view onlyWhitelisted returns (bool) {
        (bool isUserExisting, ) = userStorage.getUserByAddressIfSet(_address);
        return isUserExisting;
    }

    function getUserRoleAtUId(uint256 uId) external view onlyWhitelisted returns (UserDataTypes.UserRole) {
        return userStorage.getUserByUId(uId).profile.role;
    }

    function getUserRoleAtAddress(address userAddress)
        external
        view
        onlyWhitelisted
        returns (UserDataTypes.UserRole)
    {
        return userStorage.getUserByAddress(userAddress).profile.role;
    }

    function getEnrolledProgramIds(uint256 uId) external view onlyWhitelisted returns (uint256[] memory) {
        return userStorage.getUserByUId(uId).profile.studyProgramIds;
    }

    function getProfile(uint256 uId)
        external
        view
        onlyWhitelisted
        returns (UserDataTypes.UserProfile memory)
    {
        return userStorage.getUserByUId(uId).profile;
    }

    function getUser(uint256 uId) external view onlyWhitelisted returns (UserDataTypes.User memory) {
        return userStorage.getUserByUId(uId);
    }

    function getUsers(uint256[] calldata uIds) external view returns (UserDataTypes.User[] memory) {
        UserDataTypes.User[] memory users = new UserDataTypes.User[](uIds.length);
        for (uint256 i = 0; i < uIds.length; ++i) {
            users[i] = userStorage.getUserByUId(uIds[i]);
        }
        return users;
    }

    function getAllUsers() external view returns (UserDataTypes.User[] memory) {
        return userStorage.getAllUsers();
    }
}
