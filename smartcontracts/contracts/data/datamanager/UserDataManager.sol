pragma solidity >=0.8.7 <=0.8.17;

import "../../accesscontrol/AccessController.sol";
import "../storage/user/UserStorage.sol";
import "../../datatypes/UserDataTypes.sol";
import "../../datatypes/CommonDataTypes.sol";
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

    /**
     * @return Created user's UId.
     */
    function createUser(address userAddress, UserDataTypes.UserProfile calldata profile)
        external
        onlyWhitelisted
        returns (uint256)
    {
        require(userAddress != address(0), "The address must be set");
        DataManagerCommonChecks.requireStringNotEmpty(profile.firstName, "First name");
        DataManagerCommonChecks.requireStringNotEmpty(profile.lastName, "Last name");
        DataManagerCommonChecks.requireStringNotEmpty(profile.nationality, "Nationality");
        DataManagerCommonChecks.requireValidDateOfBirth(profile.dateOfBirth);

        uint256 generatedUId = IdGenerator.generateId(uIdCounter);
        userStorage.storeUser(
            userAddress,
            UserDataTypes.User(generatedUId, profile)
        );
        emit CommonDataTypes.IdGeneration(generatedUId);
        return generatedUId;
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

    function getUserName(uint256 uId) external view onlyWhitelisted returns (string memory, string memory) {
        UserDataTypes.User memory user = userStorage.getUserByUId(uId);
        return (user.profile.firstName, user.profile.lastName);
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
