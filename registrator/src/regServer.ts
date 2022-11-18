import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import { ethers } from "ethers";
import path from "path"

import abis from "./abis";
import { PORT, REGISTRATOR_CONTRACT_ADDRESS, SERVER_WALLET_PRIVATE_KEY } from "./constants";
import logger, { logTxDeployed, logTxMined, logTxStarted } from "./logger"


const app = express()

const router = express.Router()

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("combined"))

app.use(router)


const provider = ethers.providers.getDefaultProvider("http://127.0.0.1:8545");
const serverWallet = new ethers.Wallet(SERVER_WALLET_PRIVATE_KEY, provider);
const registratorContract = new ethers.Contract(REGISTRATOR_CONTRACT_ADDRESS, abis.registrator, serverWallet);



router.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, '../public/index.html'));
});


router.post("/registration", async (request, response) => {
    logTxStarted();
    const tx = await registratorContract.register();
    logTxDeployed(registratorContract.register.name, tx.hash);
    const txReceipt = await tx.wait();
    logTxMined(registratorContract.register.name, txReceipt.transactionHash, txReceipt.blockNumber);
});


app.listen(PORT, () => {
    console.log(`App listening to port ${PORT}...`);
});