const fs = require("fs");
const fse = require("fs-extra");
const path = require("path");
require("./configDotenv");

const FRONTEND_IMPORT_DIR_PATH = path.resolve(__dirname, process.env.FRONTEND_IMPORT_DIR_PATH);
const REGSERVER_IMPORT_DIR_PATH = path.resolve(__dirname, process.env.REGSERVER_IMPORT_DIR_PATH);

const srcAddressesFilePath = path.resolve(__dirname, "..", "exports/addresses.json");
const srcArtifactsDirPath = path.resolve(__dirname, "..", "artifacts");
const srcAbiTypesDirPath = path.resolve(__dirname, "..", "ethereum-abi-types");
const srcUserControllerArtifactDirPath = path.resolve(
    srcArtifactsDirPath,
    "contracts/logic/UserController.sol"
);
const srcUserControllerTypeFilePath = path.resolve(srcAbiTypesDirPath, "UserController.ts");

function copyFile(srcFile, destFile) {
    fs.copyFile(srcFile, destFile, (err) => {
        if (err) console.error(err);
        logCopy(srcFile, destFile);
    });
}

function copyDir(srcDir, destDir) {
    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
    }

    fse.copy(srcDir, destDir, (err) => {
        if (err) console.error(err);
        logCopy(srcDir, destDir);
    });
}

function logCopy(src, dest) {
    console.log(`${src} was copied to ${dest}`);
}

function copyAll(importDirPath) {
    const destAddressesFilePath = path.resolve(importDirPath, "addresses.json");
    const destArtifactsDirPath = path.resolve(importDirPath, "artifacts");
    const destAbiTypesDirPath = path.resolve(importDirPath, "ethereum-abi-types");
    copyFile(srcAddressesFilePath, destAddressesFilePath);
    copyDir(srcAbiTypesDirPath, destAbiTypesDirPath);
    copyDir(srcArtifactsDirPath, destArtifactsDirPath);
}

function copyPartial(importDirPath) {
    const destAddressesFilePath = path.resolve(importDirPath, "addresses.json");
    const destArtifactsDirPath = path.resolve(importDirPath, "artifacts");
    const destAbiTypesFilePath = path.resolve(importDirPath, "UserController.ts");
    copyFile(srcAddressesFilePath, destAddressesFilePath);
    copyFile(srcUserControllerTypeFilePath, destAbiTypesFilePath);
    copyDir(srcUserControllerArtifactDirPath, destArtifactsDirPath);
}

copyAll(FRONTEND_IMPORT_DIR_PATH);
copyPartial(REGSERVER_IMPORT_DIR_PATH);
