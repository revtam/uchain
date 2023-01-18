const path = require("path");
const fs = require("fs");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

exports.RPC_NODE_URL = process.env.RPC_NODE_REMOTE_URL;
exports.REGISTRATOR_WALLET_ADDRESS = process.env.REGISTRATOR_WALLET_ADDRESS;
exports.IMPORT_DIR_PATHS = process.env.IMPORT_DIR_PATHS.split(",").map((dirPath) =>
    path.resolve(__dirname, dirPath)
);
exports.ADDRESSES_OUTPUT_FILE = path.resolve(__dirname, "..", "deployment-output/addresses.json");
exports.ADMIN_PRIVATE_KEY = fs.readFileSync(
    path.resolve(__dirname, "../secrets/admin_private_key.txt"),
    "utf8"
);
