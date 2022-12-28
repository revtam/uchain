const path = require("path");
const fs = require("fs");

const adminPrivateKeyPath = path.resolve(__dirname, "./secrets/admin_private_key.txt");
const registratorAddressPath = path.resolve(__dirname, "./secrets/registrator_address.txt");

exports.adminPrivateKey = fs.readFileSync(adminPrivateKeyPath, "utf8");
exports.registratorWalletAddress = fs.readFileSync(registratorAddressPath, "utf8");
