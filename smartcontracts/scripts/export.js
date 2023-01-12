const fs = require("fs");
const fse = require("fs-extra");
const path = require("path");
require("./configDotenv");

const IMPORTS_DIR_PATHS = process.env.IMPORT_DIRS_REL_PATHS.split(",").map((relPath) =>
    path.resolve(__dirname, relPath)
);

const srcAddressesFilePath = path.resolve(__dirname, "..", "exports/addresses.json");
const srcArtifactsDirPath = path.resolve(__dirname, "..", "artifacts");
const srcAbiTypesDirPath = path.resolve(__dirname, "..", "ethereum-abi-types");

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

function copyAll(importDirPaths) {
    for (const importDirPath of importDirPaths) {
        const destAddressesFilePath = path.resolve(importDirPath, "addresses.json");
        const destArtifactsDirPath = path.resolve(importDirPath, "artifacts");
        const destAbiTypesDirPath = path.resolve(importDirPath, "ethereum-abi-types");
        copyFile(srcAddressesFilePath, destAddressesFilePath);
        copyDir(srcAbiTypesDirPath, destAbiTypesDirPath);
        copyDir(srcArtifactsDirPath, destArtifactsDirPath);
    }
}

copyAll(IMPORTS_DIR_PATHS);
