pragma solidity >=0.8.7 <=0.8.17;

import "../../../helpers/AccessControl.sol";
import "../../../datatypes/UserDataTypes.sol";
import "../validator/Validator.sol";

contract UserStorage is AccessControl, Validator {
    mapping(address => uint256) uIdsByAddress;
    mapping(uint256 => UserDataTypes.User) usersByUId;
    uint256[] uIds;

    function storeUser(address userAddress, UserDataTypes.User calldata user)
        external
        onlyWhitelisted
        onlyIfValueNotExisting(uIdsByAddress[userAddress], "User address")
        onlyIfIdValid(user.uId, "uID")
        onlyIfValueNotExisting(usersByUId[user.uId].uId, "uID")
    {
        uIdsByAddress[userAddress] = user.uId;
        usersByUId[user.uId] = user;
        uIds.push(user.uId);
    }

    function updateUserAddress(address oldAddress, address newAddress)
        external
        onlyIfValueExisting(uIdsByAddress[oldAddress], "Old user address")
        onlyIfValueNotExisting(uIdsByAddress[newAddress], "New user address")
        onlyIfValueExisting(usersByUId[uIdsByAddress[oldAddress]].uId, "uID")
    {
        uIdsByAddress[newAddress] = uIdsByAddress[oldAddress];
        delete uIdsByAddress[oldAddress];
    }

    function getUserByAddress(address userAddress)
        external
        view
        onlyWhitelisted
        onlyIfValueExisting(uIdsByAddress[userAddress], "User address")
        returns (UserDataTypes.User memory)
    {
        return usersByUId[uIdsByAddress[userAddress]];
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
        UserDataTypes.User memory user = usersByUId[uIdsByAddress[userAddress]];
        if (isIdValid(uIdsByAddress[userAddress])) {
            return (true, user);
        }
        return (false, user);
    }

    function getUserByUId(uint256 uId)
        external
        view
        onlyWhitelisted
        onlyIfValueExisting(usersByUId[uId].uId, "uID")
        returns (UserDataTypes.User memory)
    {
        return usersByUId[uId];
    }

    function getAllUsers() external view onlyWhitelisted returns (UserDataTypes.User[] memory) {
        UserDataTypes.User[] memory userList = new UserDataTypes.User[](uIds.length);
        for (uint256 i = 0; i < uIds.length; ++i) {
            UserDataTypes.User memory user = usersByUId[uIds[i]];
            userList[i] = user;
        }
        return userList;
    }
}
