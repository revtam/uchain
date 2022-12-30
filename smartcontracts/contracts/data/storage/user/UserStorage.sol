pragma solidity >=0.8.7 <=0.8.17;

import "../../../datatypes/UserDataTypes.sol";
import "../Storage.sol";

contract UserStorage is Storage {
    mapping(address => uint256) uIdByAddress;
    mapping(uint256 => UserDataTypes.User) userByUId;
    uint256[] uIds;

    constructor(address accessWhitelistAddress) Storage(accessWhitelistAddress) {}

    function storeUser(address userAddress, UserDataTypes.User calldata user) external onlyWhitelisted {
        Validator.requireIdNotExisting(uIdByAddress[userAddress], "User address");
        Validator.requireIdValid(user.uId, "uID");
        Validator.requireIdNotExisting(userByUId[user.uId].uId, "uID");

        uIdByAddress[userAddress] = user.uId;
        userByUId[user.uId] = user;
        uIds.push(user.uId);
    }

    function updateUserAddress(address oldAddress, address newAddress) external onlyWhitelisted {
        Validator.requireIdExisting(uIdByAddress[oldAddress], "Old user address");
        Validator.requireIdNotExisting(uIdByAddress[newAddress], "New user address");
        Validator.requireIdExisting(userByUId[uIdByAddress[oldAddress]].uId, "uID");

        uIdByAddress[newAddress] = uIdByAddress[oldAddress];
        delete uIdByAddress[oldAddress];
    }

    function getUserByAddress(address userAddress)
        external
        view
        onlyWhitelisted
        returns (UserDataTypes.User memory)
    {
        Validator.requireIdExisting(uIdByAddress[userAddress], "User address");

        return userByUId[uIdByAddress[userAddress]];
    }

    /**
     * @return If returned tuple[0] is true, the user at tuple[1] is set.
     */
    function getUserByAddressIfSet(address userAddress)
        external
        view
        onlyWhitelisted
        returns (bool, UserDataTypes.User memory)
    {
        UserDataTypes.User memory user = userByUId[uIdByAddress[userAddress]];
        if (Validator.isIdValid(uIdByAddress[userAddress])) {
            return (true, user);
        }
        return (false, user);
    }

    function getUserByUId(uint256 uId) external view onlyWhitelisted returns (UserDataTypes.User memory) {
        Validator.requireIdExisting(userByUId[uId].uId, "uID");

        return userByUId[uId];
    }

    function getAllUsers() external view onlyWhitelisted returns (UserDataTypes.User[] memory) {
        UserDataTypes.User[] memory userList = new UserDataTypes.User[](uIds.length);
        for (uint256 i = 0; i < uIds.length; ++i) {
            UserDataTypes.User memory user = userByUId[uIds[i]];
            userList[i] = user;
        }
        return userList;
    }
}
