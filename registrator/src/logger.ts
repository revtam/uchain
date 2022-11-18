import { createLogger, format, transports } from 'winston';


const { combine, timestamp, label, printf } = format;

const txStateFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

const blockchainLogger = createLogger({
    format: combine(
        label({ label: "blockchain event" }),
        timestamp(),
        txStateFormat
    ),
    transports: [new transports.Console()]
});

export default blockchainLogger;

export const logTxStarted = () => blockchainLogger.info(`Tx started`);
export const logTxDeployed = (methodName: string, txHash: string) => blockchainLogger.info(`${methodName} tx ${txHash} deployed`);
export const logTxMined = (methodName: string, txHash: string, txBlock: number) =>
    blockchainLogger.info(`${methodName} tx ${txHash} mined at block ${txBlock}`);



