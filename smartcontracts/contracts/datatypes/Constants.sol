pragma solidity >=0.8.7 <=0.8.17;

library Constants {
    uint256 constant NON_ID = 0;
    uint256 constant STARTING_ID = 1;
    uint256 constant WORST_GRADE = 5;
    uint256 constant BEST_GRADE = 1;
    uint256 constant PRECISION_MAX_DIGITS = 4;

    uint256 constant FAUCET_INITIAL_SEND_AMOUNT = 0.1 ether;
    uint256 constant FAUCET_FULL_SEND_AMOUNT = 1 ether;
    uint256 constant TOKEN_REQUEST_COOLDOWN = 1 days;
}
