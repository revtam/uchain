require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.17",
    networks: {
        hardhat: {
            blockGasLimit: 1000000000000000,
            gas: 1000000000000,
            initialBaseFeePerGas: 1,
            gasPrice: 1,
        },
    },
};
