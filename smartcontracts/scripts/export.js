const fs = require("fs");
const fse = require("fs-extra");
const path = require("path");

const srcAddressesFilePath = path.resolve(__dirname, "..", "exports/addresses.json");
const srcArtifactsDirPath = path.resolve(__dirname, "..", "artifacts");
const srcAbiTypesDirPath = path.resolve(__dirname, "..", "ethereum-abi-types");

const frontendImportsDirPath = path.resolve(__dirname, "../..", "frontend/src/contracts/imports");
const destAddressesFilePath = path.resolve(frontendImportsDirPath, "addresses.json");
const destArtifactsDirPath = path.resolve(frontendImportsDirPath, "artifacts");
const destAbiTypesDirPath = path.resolve(frontendImportsDirPath, "ethereum-abi-types");

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

copyFile(srcAddressesFilePath, destAddressesFilePath);
copyDir(srcAbiTypesDirPath, destAbiTypesDirPath);
copyDir(srcArtifactsDirPath, destArtifactsDirPath);
