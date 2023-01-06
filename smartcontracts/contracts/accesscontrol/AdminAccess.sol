pragma solidity >=0.8.7 <=0.8.17;

abstract contract AdminAccess {
    mapping(address => bool) isAdminByAddress;

    modifier onlyAdmin() {
        require(isAdminByAddress[msg.sender], "Only admin addresses can call this function");
        _;
    }

    constructor() {
        isAdminByAddress[msg.sender] = true;
    }

    function addAdmin(address _address) public onlyAdmin {
        isAdminByAddress[_address] = true;
    }

    function batchAddAdmin(address[] calldata addresses) external onlyAdmin {
        for (uint256 i = 0; i < addresses.length; ++i) {
            addAdmin(addresses[i]);
        }
    }

    function removeAdmin(address _address) external onlyAdmin {
        isAdminByAddress[_address] = false;
    }

    function isAdmin(address _address) external view returns (bool) {
        return isAdminByAddress[_address];
    }
}
