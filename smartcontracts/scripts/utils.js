const fs = require("fs");
const path = require("path");

exports.getMetadataFromJson = function (artifactPath) {
    return JSON.parse(fs.readFileSync(artifactPath));
};

exports.getBytecodeFromJson = function (artifactPath) {
    return exports.getMetadataFromJson(artifactPath).bytecode;
};

exports.getAbiFromJson = function (artifactPath) {
    return exports.getMetadataFromJson(artifactPath).abi;
};

exports.exportAddresses = function (addresses) {
    const json = JSON.stringify(addresses);
    fs.writeFileSync(path.resolve(__dirname, "..", "exports/addresses.json"), json, (error) => {
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
