import { ethers } from "ethers";
const fs = require("fs");

import contractPaths from "./collectContracts";

const provider = ethers.providers.getDefaultProvider("http://127.0.0.1:8545");
const signer = provider.getSigner("deployerWalletAddress");

async function deploy(artifactPath, args) {
    const metadata = JSON.parse(fs.readFileSync(artifactPath));

    console.log(`Deploying ${metadata.contractName}...`);

    const factory = new ethers.ContractFactory(metadata.abi, metadata.bytecode, signer);
    const contract = await factory.deploy(...args);
    await contract.deployed();
    console.log(`${metadata.contractName} deployed at: ${contract.address}`);
    return contract.address;
}

async function main() {
    const courseStorageAddr = await deploy(contractPaths.CourseStorage);
    const performanceStorageAddr = await deploy(contractPaths.PerformanceStorage);
    const gradeStorageAddr = await deploy(contractPaths.GradeStorage);
    const studyProgramStorageAddr = await deploy(contractPaths.StudyProgramStorage);
    const registrationStorageAddr = await deploy(contractPaths.RegistrationStorage);
    const userStorageAddr = await deploy(contractPaths.UserStorage);
}

deploy().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
