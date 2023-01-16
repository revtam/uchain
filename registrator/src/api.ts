import express from "express";
import { ethers } from "ethers";
import path from "path";

import abis from "./abis";
import {
    USERCONTROLLER_CONTRACT_ADDRESS,
    SERVER_WALLET_PRIVATE_KEY,
    RPC_NODE_URL,
    REGISTRATION_ENDPOINT,
} from "./constants";
import { logTxDeployed, logTxFailed, logTxMined, logTxStarted } from "./logger";
import { UserController } from "./imports/UserController";
import { RegistrationPayload } from "./types";
import { convertToRegistrationExternal } from "./converters";

const router = express.Router();

const provider = ethers.providers.getDefaultProvider(RPC_NODE_URL);
const serverWallet = new ethers.Wallet(SERVER_WALLET_PRIVATE_KEY, provider);
const userControllerContract: UserController = new ethers.Contract(
    USERCONTROLLER_CONTRACT_ADDRESS,
    abis.userController,
    serverWallet
) as unknown as UserController;

router.get("/", (_, response) => {
    response.sendFile(path.join(__dirname, "../public/index.html"));
});

/**
 * Returns json
 * if transaction failed:
 *      status: 500
 *      ErrorResponse
 * if transaction successful:
 *      status: 200
 *      {}
 */
router.post(REGISTRATION_ENDPOINT, async (request, response) => {
    const registration: RegistrationPayload = {
        address: request.body.address,
        lastName: request.body.lastName,
        firstName: request.body.firstName,
        gender: request.body.gender,
        dateOfBirth: request.body.dateOfBirth,
        nationality: request.body.nationality,
        phone: request.body.phone,
        email: request.body.email,
        role: request.body.role,
        programIds: request.body.programIds,
    };
    logTxStarted();
    try {
        const tx = await userControllerContract.requestRegistration(
            registration.address,
            convertToRegistrationExternal(registration)
        );
        logTxDeployed(userControllerContract.requestRegistration.name, tx.hash);
        const txReceipt = await tx.wait();
        logTxMined(
            userControllerContract.requestRegistration.name,
            txReceipt.transactionHash,
            txReceipt.blockNumber
        );
        if (txReceipt.status == 1) {
            response.status(200);
            response.send();
            return;
        }
        response.status(500);
        response.send({
            message: "Transaction failed unexpectedly",
        });
    } catch (error: any) {
        const errorReason = error.error?.reason || error.reason;
        logTxFailed(userControllerContract.requestRegistration.name, error.transactionHash, errorReason);
        response.status(500);
        response.send({
            message: errorReason,
        });
    }
});

export default router;
