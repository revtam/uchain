pragma solidity >=0.8.7 <=0.8.17;

import "../accesscontrol/AdminAccess.sol";
import "../datatypes/Constants.sol";

contract Faucet is AdminAccess {
    mapping(address => uint256) cooldownEndByAddress;
    uint256 initialAmount = Constants.FAUCET_INITIAL_SEND_AMOUNT;
    uint256 fullAmount = Constants.FAUCET_FULL_SEND_AMOUNT;

    function setAmounts(uint256 _initialAmount, uint256 _fullAmount) external onlyAdmin {
        initialAmount = _initialAmount;
        fullAmount = _fullAmount;
    }

    function sendInitialAmountTokens(address payable toAddress) external payable onlyAdmin {
        sendTokens(toAddress, initialAmount);
    }

    function sendFullAmountTokens(address payable toAddress) external payable onlyAdmin {
        sendTokens(toAddress, fullAmount);
    }

    function sendTokens(address payable addressToAllocateTo, uint256 amount) public onlyAdmin {
        require(address(this).balance >= amount, "Not enough funds in the faucet");
        require(block.timestamp >= cooldownEndByAddress[addressToAllocateTo], "Too frequent token requests");

        addressToAllocateTo.transfer(amount);
        cooldownEndByAddress[addressToAllocateTo] = block.timestamp + Constants.TOKEN_REQUEST_COOLDOWN;
    }
    
    receive() external payable {}

    fallback() external payable {}
}
