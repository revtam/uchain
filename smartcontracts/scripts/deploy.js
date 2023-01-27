const ethers = require("ethers");
const { REGISTRATOR_WALLET_ADDRESS, RPC_NODE_URL, ADMIN_PRIVATE_KEY } = require("./constants");
const { contractMetadata } = require("./contractMetadata");
const { makeTransaction, exportAddresses } = require("./utils");

const provider = ethers.providers.getDefaultProvider(RPC_NODE_URL);
const signer = new ethers.Wallet(ADMIN_PRIVATE_KEY, provider);

async function deploy(metadata, args = []) {
    console.log(`Deploying ${metadata.contractName}...`);

    const factory = new ethers.ContractFactory(metadata.abi, metadata.bytecode, signer);
    const contract = await factory.deploy(...args);
    await contract.deployed();
    console.log(`${metadata.contractName} deployed at: ${contract.address}`);
    return contract;
}

async function loadFaucet(faucetAddress, tokenAmountForFaucet) {
    console.log(`Sending tokens to faucet address ${faucetAddress}...`);
    await makeTransaction(
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
    const deployer = await deploy(contractMetadata.deployer);

    await makeTransaction(
        () =>
            deployer.deployStorages1(
                contractMetadata.addressBook.bytecode,
                contractMetadata.accessWhitelist.bytecode,
                contractMetadata.courseDataStorage.bytecode,
                contractMetadata.assessmentDataStorage.bytecode,
                contractMetadata.performanceStorage.bytecode
            ),
        "deployer.deployStorages1"
    );
    await makeTransaction(
        () =>
            deployer.deployStorages2(
                contractMetadata.gradeStorage.bytecode,
                contractMetadata.studyProgramStorage.bytecode,
                contractMetadata.registrationStorage.bytecode,
                contractMetadata.userStorage.bytecode
            ),
        "deployer.deployStorages2"
    );
    await makeTransaction(
        () =>
            deployer.deployDatamanagers(
                contractMetadata.courseDataManager.bytecode,
                contractMetadata.assessmentDataManager.bytecode,
                contractMetadata.performanceDataManager.bytecode,
                contractMetadata.programDataManager.bytecode,
                contractMetadata.registrationDataManager.bytecode,
                contractMetadata.userDataManager.bytecode
            ),
        "deployer.deployDatamanagers"
    );
    await makeTransaction(
        () =>
            deployer.deployControllers(
                contractMetadata.courseController.bytecode,
                contractMetadata.performanceController.bytecode,
                contractMetadata.studyProgramController.bytecode,
                contractMetadata.userController.bytecode,
                contractMetadata.faucet.bytecode
            ),
        "deployer.deployControllers"
    );
    await makeTransaction(
        () =>
            deployer.deployViews(
                contractMetadata.courseView.bytecode,
                contractMetadata.performanceView.bytecode,
                contractMetadata.studyProgramView.bytecode,
                contractMetadata.userView.bytecode
            ),
        "deployer.deployViews"
    );
    await makeTransaction(
        () => deployer.configureDeployments(REGISTRATOR_WALLET_ADDRESS),
        "deployer.configureDeployments"
    );

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
