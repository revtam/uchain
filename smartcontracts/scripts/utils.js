const fs = require("fs");
const { ADDRESSES_OUTPUT_FILE } = require("./constants");

exports.exportAddresses = function (addresses) {
    const json = JSON.stringify(addresses);
    fs.writeFileSync(ADDRESSES_OUTPUT_FILE, json, (error) => {
        if (error) {
            console.error(error);
        }
    });
};

exports.makeTransaction = async function (method, methodName) {
    const tx = await method();
    logTxDeployed(methodName, tx);
    const receipt = await tx.wait();
    logTxMined(methodName, receipt);
    return receipt;
};

function logTxDeployed(methodName, txResponse) {
    console.log(`Function call ${methodName} at tx ${txResponse.hash} deployed`);
}

function logTxMined(methodName, txReceipt) {
    console.log(
        `Function call ${methodName} at tx ${txReceipt.transactionHash} mined at block ${txReceipt.blockNumber}`
    );
}
