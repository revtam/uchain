const fs = require("fs");
const fse = require("fs-extra");
const path = require("path");
const { IMPORT_DIR_PATHS } = require("./constants");

const srcAddressesFilePath = path.resolve(__dirname, "..", "deployment-output/addresses.json");

const srcControllerArtifactsDirPath = path.resolve(__dirname, "..", "artifacts/contracts/logic");
const srcViewArtifactsDirPath = path.resolve(__dirname, "..", "artifacts/contracts/view");

const srcControllerAbiTypeFilePaths = [
    path.resolve(__dirname, "..", "ethereum-abi-types/CourseController.ts"),
    path.resolve(__dirname, "..", "ethereum-abi-types/PerformanceController.ts"),
    path.resolve(__dirname, "..", "ethereum-abi-types/StudyProgramController.ts"),
    path.resolve(__dirname, "..", "ethereum-abi-types/UserController.ts"),
];
const srcViewAbiTypeFilePaths = [
    path.resolve(__dirname, "..", "ethereum-abi-types/CourseView.ts"),
    path.resolve(__dirname, "..", "ethereum-abi-types/PerformanceView.ts"),
    path.resolve(__dirname, "..", "ethereum-abi-types/StudyProgramView.ts"),
    path.resolve(__dirname, "..", "ethereum-abi-types/UserView.ts"),
];

function copyFileIntoDir(srcFile, destDir) {
    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
    }

    fs.copyFile(srcFile, path.resolve(destDir, path.basename(srcFile)), (err) => {
        if (err) console.error(err);
        logCopy(srcFile, destDir);
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
    const destArtifactsDirPath = path.resolve(importDirPath, "artifacts/contracts");
    const destAbiTypesDirPath = path.resolve(importDirPath, "ethereum-abi-types");

    copyFileIntoDir(srcAddressesFilePath, importDirPath);

    copyDir(srcControllerArtifactsDirPath, destArtifactsDirPath);
    copyDir(srcViewArtifactsDirPath, destArtifactsDirPath);

    srcControllerAbiTypeFilePaths.forEach((filePath) => copyFileIntoDir(filePath, destAbiTypesDirPath));
    srcViewAbiTypeFilePaths.forEach((filePath) => copyFileIntoDir(filePath, destAbiTypesDirPath));
}

for (const destDirPath of IMPORT_DIR_PATHS) {
    copyAll(destDirPath);
}
