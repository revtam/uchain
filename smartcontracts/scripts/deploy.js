const ethers = require("ethers");

const { adminPrivateKey, registratorWalletAddress } = require("./data");
const { contractPaths } = require("./contractJsons");
const {
    getMetadataFromJson,
    getBytecodeFromJson,
    makeTransaction,
    makeSimpleTransaction,
} = require("./utils");

const provider = ethers.providers.getDefaultProvider("http://127.0.0.1:8545");
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
                value: ethers.utils.parseEther(tokenAmountForFaucet.toString()),
            }),
        "send"
    );
    console.log("Tokens sent");
}

async function main() {
    // const deployer = new ethers.Contract(
    //     "0xdCACEefe6B80D02f9c89A1794af828A63F2b30c9",
    //     getMetadataFromJson(contractPaths.deployer).abi,
    //     signer
    // );
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

    if ((await provider.getBalance(await deployer.faucet())) == 0) {
        const adminTokenBalance = ethers.utils.formatEther(await provider.getBalance(signer.address));
        const amountForFaucet = adminTokenBalance * 0.5;
        await loadFaucet(await deployer.faucet(), amountForFaucet);
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
