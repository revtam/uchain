const ethers = require("ethers");

const { adminPrivateKey, registratorWalletAddress } = require("./data");
const { contractPaths } = require("./contractJsons");
const {
    getMetadataFromJson,
    getBytecodeFromJson,
    makeTransaction,
    makeSimpleTransaction,
    exportAddresses,
} = require("./utils");

const provider = ethers.providers.getDefaultProvider("http://localhost:8545");
const signer = new ethers.Wallet(adminPrivateKey, provider);

async function deploy(artifactPath, args = []) {
    const metadata = getMetadataFromJson(artifactPath);

    console.log(`Deploying ${metadata.contractName}...`);

    const factory = new ethers.ContractFactory(metadata.abi, metadata.bytecode, signer);
    const contract = await factory.deploy(...args);
    await contract.deployed();
    console.log(`${metadata.contractName} deployed at: ${contract.address}`);
    return contract;
}

async function loadFaucet(faucetAddress, tokenAmountForFaucet) {
    console.log(`Sending tokens to faucet address ${faucetAddress}...`);
    await makeSimpleTransaction(
        () =>
            signer.sendTransaction({
                to: faucetAddress,
                value: tokenAmountForFaucet,
            }),
        "send"
    );
    console.log("Tokens sent");
}

async function main() {
    const deployer = await deploy(contractPaths.deployer);

    await makeTransaction(deployer.deployStorages1, "deployer.deployStorages1", [
        getBytecodeFromJson(contractPaths.accessWhitelist),
        getBytecodeFromJson(contractPaths.courseDataStorage),
        getBytecodeFromJson(contractPaths.assessmentDataStorage),
        getBytecodeFromJson(contractPaths.performanceStorage),
    ]);
    await makeTransaction(deployer.deployStorages2, "deployer.deployStorages2", [
        getBytecodeFromJson(contractPaths.gradeStorage),
        getBytecodeFromJson(contractPaths.studyProgramStorage),
        getBytecodeFromJson(contractPaths.registrationStorage),
        getBytecodeFromJson(contractPaths.userStorage),
    ]);
    await makeTransaction(deployer.deployDatamanagers, "deployer.deployDatamanagers", [
        getBytecodeFromJson(contractPaths.accessWhitelist),
        getBytecodeFromJson(contractPaths.courseDataManager),
        getBytecodeFromJson(contractPaths.assessmentDataManager),
        getBytecodeFromJson(contractPaths.performanceDataManager),
        getBytecodeFromJson(contractPaths.programDataManager),
        getBytecodeFromJson(contractPaths.registrationDataManager),
        getBytecodeFromJson(contractPaths.userDataManager),
    ]);
    await makeTransaction(deployer.deployControllers, "deployer.deployControllers", [
        getBytecodeFromJson(contractPaths.courseController),
        getBytecodeFromJson(contractPaths.performanceController),
        getBytecodeFromJson(contractPaths.studyProgramController),
        getBytecodeFromJson(contractPaths.userController),
        getBytecodeFromJson(contractPaths.faucet),
    ]);
    await makeTransaction(deployer.deployViews, "deployer.deployViews", [
        getBytecodeFromJson(contractPaths.courseView),
        getBytecodeFromJson(contractPaths.performanceView),
        getBytecodeFromJson(contractPaths.studyProgramView),
        getBytecodeFromJson(contractPaths.userView),
    ]);
    await makeTransaction(deployer.configureDeployments, "deployer.configureDeployments", [
        registratorWalletAddress,
    ]);

    exportAddresses({
        deployer: deployer.address,

        courseController: await deployer.courseController(),
        performanceController: await deployer.performanceController(),
        studyProgramController: await deployer.studyProgramController(),
        userController: await deployer.userController(),

        courseView: await deployer.courseView(),
        studyProgramView: await deployer.studyProgramView(),
        performanceView: await deployer.performanceView(),
        userView: await deployer.userView(),
    });

    if ((await provider.getBalance(await deployer.faucet())) == 0) {
        const adminTokenBalance = await provider.getBalance(signer.address);
        const amountForFaucet = adminTokenBalance.mul(9).div(10);
        await loadFaucet(await deployer.faucet(), amountForFaucet);
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
