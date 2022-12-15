import express from "express";
import { ethers } from "ethers";
import { TransactionReceipt, TransactionResponse } from "@ethersproject/abstract-provider";
import path from "path";

import abis from "./abis";
import { REGISTRATOR_CONTRACT_ADDRESS, SERVER_WALLET_PRIVATE_KEY } from "./constants";
import { logTxDeployed, logTxFailed, logTxMined, logTxStarted } from "./logger";

const router = express.Router();

const provider = ethers.providers.getDefaultProvider("http://127.0.0.1:8545");
const serverWallet = new ethers.Wallet(SERVER_WALLET_PRIVATE_KEY, provider);
const userControllerContract = new ethers.Contract(
    REGISTRATOR_CONTRACT_ADDRESS,
    abis.userController,
    serverWallet
);

router.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, "../public/index.html"));
});

/**
 * Returns json
 * if transaction failed:
 *      status: 500
 *      {
 *          "message": "error message"
 *      }
 * if transaction successful:
 *      status: 200
 *      {}
 */
Request;
router.get("/registration", async (request, response) => {
    const registration = {
        lastName: request.body.lastname,
        firstName: request.body.surname,
        gender: request.body.gender,
        dateOfBirth: request.body.birth,
        nationality: request.body.nationality,
    };
    logTxStarted();
    // const tx = await userControllerContract.requestRegistration();
    // logTxDeployed(userControllerContract.requestRegistration.name, tx.hash);
    userControllerContract.requestRegistration(registration).then(
        async (tx: TransactionResponse) => {
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
        },
        (error: any) => {
            logTxFailed(
                userControllerContract.requestRegistration.name,
                error.transactionHash,
                error.errorSignature
            );
            response.status(500);
            response.send({
                message: error.errorSignature,
            });
        }
    );
});

export default router;
