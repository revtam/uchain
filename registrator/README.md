# Registrator server

Server that handles user registration by receiving the registration request then converting and forwarding it towards the responsible smart contract. It requires access to a wallet that is whitelisted at the smart contract handling registrations, and the wallet has to be loaded with tokens so that the transaction fees can be covered.

Endpoints:

-   `/registration` POST: accepts JSON data containing the information for registration

Response:

-   if transaction successful: status 200
-   if transaction failed: status 500 + error message from the blockchain

## How to run

Locally:

-   requires `npm` installation
-   `npm ci`: loads dependencies
-   `npm run build:dev`: creates bundled file into `./dist` using Webpack with development settings
-   `npm run serve:dev`: creates bundled file into `./dist` using Webpack with development settings, starts development server on port 8080 and rebundles and restarts upon file changes
-   `npm run build`: creates bundled file into `./dist` using Webpack with production settings
-   `npm run serve`: starts serving the bundled file on the in `.env` specified port (`http://localhost:3001` by default)

In containers:

-   `docker-compose up`

## Configuration

-   `./.env` (configured for running locally by default):
    -   `REGISTRATION_ENDPOINT`: the API endpoint for registration requests
    -   `PORT`: the port the server should be running on
    -   `RPC_NODE_REMOTE_URL`: the URL of the client node of the blockchain to send the transactions to
    -   `PRIVATE_KEY_FILE`: path to file containing the server's dedicated wallet's private key
-   `./secrets/registrator_private_key.txt`: the file containing the server's wallet's private key
-   `./docker-compose.yml`:
    -   uses the values from `.env`
    -   may override the following environment values set by `.env` to adapt the container to the project configuration:
        -   `PORT`
        -   `RPC_NODE_REMOTE_URL`
        -   `PRIVATE_KEY_FILE`
    -   to ensure security of sensitive data, the wallet private key is not set in an environment variable or is simply copied over into the container but utilizes _docker secrets_, which is a feature of docker that allows encrypted transmission of sensitive data for authorized containers: the secret `wallet_private_key` containing the private key file is created and can be accessed by the container at `run/secrets/wallet_private_key` during runtime
    -   the default network accepts an external network called `project-network` which can be used to share a network between multiple docker container projects

## Dependencies

-   `./imports/artifacts/`: should contain the smart contract ABIs that will be used in the application
-   `./imports/ethereum-abi-types`: should contain the Typescript definitions of the used smart contracts
-   `./imports/addresses.json`: should contain the deployed contracts' addresses
