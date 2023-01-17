const ethers = require("ethers");
require("./configDotenv");

const { adminPrivateKey, addresses } = require("./data");
const { contractPaths } = require("./contractJsons");
const {
    getMetadataFromJson,
    getBytecodeFromJson,
    makeTransaction,
    makeSimpleTransaction,
    exportAddresses,
    getAbiFromJson,
} = require("./utils");

const provider = ethers.providers.getDefaultProvider(process.env.RPC_NODE_URL);
const signer = new ethers.Wallet(adminPrivateKey, provider);

async function main() {
    const contract = new ethers.Contract(
        addresses.courseView,
        getAbiFromJson(contractPaths.courseView),
        signer
    );

    contract.

    await makeTransaction(deployer.deployStorages1, "deployer.deployStorages1", [
        getBytecodeFromJson(contractPaths.addressBook),
        getBytecodeFromJson(contractPaths.accessWhitelist),
        getBytecodeFromJson(contractPaths.courseDataStorage),
        getBytecodeFromJson(contractPaths.assessmentDataStorage),
        getBytecodeFromJson(contractPaths.performanceStorage),
    ]);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
