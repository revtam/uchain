const path = require("path");
const fs = require("fs");

const adminPrivateKeyPath = path.resolve(__dirname, "../secrets/admin_private_key.txt");

exports.adminPrivateKey = fs.readFileSync(adminPrivateKeyPath, "utf8");
exports.wallets = require("../secrets/wallets.json");
try {
    exports.addresses = require("../exports/addresses.json");
} catch (error) {
    exports.addresses = undefined;
}
