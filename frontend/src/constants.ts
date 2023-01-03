const PORT: string = process.env.PORT || "3000";
const CHAIN_ID: number = Number(process.env.CHAIN_ID) || 8105;
const NODE_ENV: string = process.env.NODE_ENV || "development";

const NETWORK = {
    chainName: "uchain",
    chainId: CHAIN_ID,
    nativeCurrency: { name: "UTOKEN", decimals: 18, symbol: "UTOKEN" },
    rpcUrls: ["http://localhost:8545"],
};

export { PORT, CHAIN_ID, NODE_ENV, NETWORK };
