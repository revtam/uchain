# Frontend

Implements a web3 React application with client-side routing in a single page app for the uChain project.
It requires the MetaMask extension installed in your browser.

## How to run

Locally:

-   requires `npm` installation
-   `npm ci`: loads dependencies
-   `npm run build:dev`: creates bundled files into `./dist` using Webpack with development settings
-   `npm run serve:dev`: creates bundled files into `./dist` using Webpack with development settings, starts development server on port 8080 and rebundles and restarts upon file changes
-   `npm run build`: creates bundleds file into `./dist` using Webpack with production settings
-   `npm run serve`: starts serving the bundled files on the in `.env` specified port utilizing `npx serve` (`http://localhost:8080` by default)

In containers:

-   `docker-compose up`

## Configuration

-   `./.env`:

    -   `CHAIN_ID`: the ID of the used blockchain
    -   `PERCENTAGE_DECIMAL_PRECISION`: the number of decimal places the percentage values should be stored with (has to be in sync with the precision accepted by the smart contracts)
    -   `REGISTRATION_ENDPOINT`: the API endpoint of the registrator server accepting the registrations at (note: do not use the "/" at the beginning, e.g. instead of "/registrations", write only "registrations")
    -   `FILEDOWNLOAD_ENDPOINT`: the API endpoint of the file server the files can be retrieved at (note: do not use the "/" at the beginning)
    -   `FILEUPLOAD_ENDPOINT`: the API endpoint of the file server accepting files for upload at (note: do not use the "/" at the beginning)
    -   `PORT`: the port the frontend server should be running on
    -   `RPC_NODE_REMOTE_URL`: the URL of the client node of the blockchain to send the transactions to (note: this url will be used for importing the network in MetaMask), `http://localhost:8545` by default
    -   `REGSERVER_REMOTE_BASE_URL`: the URL of the registrator server (note: this url will be used in the client's browser), `http://localhost:3001` by default
    -   `FILESERVER_REMOTE_BASE_URL`: the URL of the file server (note: this url will be used in the client's browser), `http://localhost:3000` by default

-   `./docker-compose.yml`:
    -   uses the values from `.env`
    -   may override the following environment values set by `.env` to adapt the container to the project configuration:
        -   `PORT`
        -   `RPC_NODE_REMOTE_URL`
        -   `REGSERVER_REMOTE_BASE_URL`
        -   `FILESERVER_REMOTE_BASE_URL`
    -   the default network accepts an external network called `project-network` which can be used to share a network between multiple docker container projects

## Dependencies

-   `./imports/artifacts/`: should contain the smart contract ABIs that will be used in the application
-   `./imports/ethereum-abi-types`: should contain the Typescript definitions of the used smart contracts
-   `./imports/addresses.json`: should contain the deployed contracts' addresses
