pragma solidity >=0.8.7 <=0.8.17;

import "../helpers/AccessControl.sol";
import "../datatypes/Constants.sol";

contract Faucet is AccessControl {
    mapping(address => uint256) cooldownEndByAddress;
    uint256 initialAmount = Constants.FAUCET_INITIAL_SEND_AMOUNT;
    uint256 fullAmount = Constants.FAUCET_FULL_SEND_AMOUNT;

    function setAmounts(uint256 _initialAmount, uint256 _fullAmount) external onlyWhitelisted {
        initialAmount = _initialAmount;
        fullAmount = _fullAmount;
    }

    function sendInitialAmountTokens(address payable toAddress) external payable onlyWhitelisted {
        sendTokens(toAddress, initialAmount);
    }

    function sendFullAmountTokens(address payable toAddress) external payable onlyWhitelisted {
        sendTokens(toAddress, fullAmount);
    }

    function getBalance(address _address) public view onlyWhitelisted returns (uint256) {
        return _address.balance;
    }

    receive() external payable {}

    fallback() external payable {}

    // PRIVATE FUNCTIONS

    function sendTokens(address payable addressToAllocateTo, uint256 amount) private {
        require(address(this).balance >= amount, "Not enough funds in the faucet");
        require(block.timestamp >= cooldownEndByAddress[addressToAllocateTo], "Too frequent token requests");

        addressToAllocateTo.transfer(amount);
        cooldownEndByAddress[addressToAllocateTo] = block.timestamp + Constants.TOKEN_REQUEST_COOLDOWN;
    }
}
