# Smart contracts of the uChain project

Implementation of smart contracts and contract management scripts.
If you want to interact with the smart contracts as the admin, import the private key found in `./secrets/admin_private_key.txt` into your application/wallet browser extension.
For testing, import the wallets found in `./secrets/testwallets.json` into your application/wallet browser extension.

## How to run

1. `npm ci`: loads dependencies
2. `npx hardhat compile`: compiles smart contracts
3. `npm run generate-abi-types`: generates Typescript definitions from the compiled smart contract ABIs using the library `ethereum-abi-types-generator`
4. `npm run deploy`: deploys the smart contracts on the running blockchain
5. `npm run load-sample-data`: loads the sample data into the smart contracts (requires a bunch of transactions, takes multiple minutes to complete)
6. `npm run export`: exports the compiled artifacts, Typescript definitions and deployed contract addresses to in .env spicified directories

**OR**

1. `npm ci`
2. `npm run execute-all`: run all the above with one command in the defined order

## Configuration

-   `./.env`:
    -   `IMPORT_DIR_PATHS`: the path of directories where the `npm run export` command should export the file to
    -   `RPC_NODE_REMOTE_URL`: the URL of the client node of the blockchain to send the transactions to
    -   `REGISTRATOR_WALLET_ADDRESS`: the public address of the registrator server's account - required for the deployment because the this account should be whitelisted for the contract responsible for registration
-   `./secrets/admin_private_key.txt`: the private key of the admin account that is used for deploying the contracts
-   `./secrets/testwallets.json`: public and private keys of the test wallets used for deploying the sample data
-   `./samples/`: json files containing the sample data for the smart contracts

## Generated files:

-   compiled artifacts: in `./artifacts/` directory
-   generated Typescript smart contract definitions: in `./ethereum-abi-types/` directory
-   contract addresses after deployment: in `./deployment-output/addresses.json`
