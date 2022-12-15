const fs = require("fs");
const path = require("path");

const userControllerartifactPath = path.resolve(
    __dirname,
    "../../smartcontracts/artifacts/contracts/logic/UserController.sol/UserController.json"
);

const abis = {
    userController: JSON.parse(fs.readFileSync(userControllerartifactPath)).abi,
};

export default abis;
