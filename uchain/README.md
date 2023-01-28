# uChain blockchain

Private blockchain network based on Ethereum using Geth.
The network consists of two signer nodes ("alpha" and "beta"), a client (RPC) node and a bootnode.
The client node is available at `http://localhost:8545` by default.

## How to run

Locally:

-   requires `Geth` installation

In containers:

-   `docker-compose up`

## Configuration

-   `./.env`:
    -   `NETWORK_NAME`: has to match with the name of the genesis file (`uchain.json`)
    -   `NETWORK_ID`: has to match with the network ID stated in the genesis file
    -   `HTTP_PORT`: the port of the client node for JSON-RPC communication (receiving transactions)
    -   `MIN_GASPRICE`: the min. gas price the signer nodes can accept a transaction with
    -   `GAS_LIMIT`: the target gas limit of transactions - it is recommended to set this because if the blockchain runs with frequent empty blocks, the gas limit starts adjusting itself and decreases
    -   `TXPOOL_LIMIT`: transaction with this min. gas price can be accepted into the transaction pool
    -   `BOOTNODE_ENODE_ID`: the bootnode's enode ID for the network's other nodes
    -   `PUBLIC_KEY_ALPHA`: the "alpha" signer's public key
    -   `PUBLIC_KEY_BETA`: the "beta" signer's public key
    -   `ALPHA_PASSWORD_FILE_NAME`: path to file which contains the alpha signer's account password
    -   `BETA_PASSWORD_FILE_NAME`: path to file which contains the beta signer's account password
    -   `ALPHA_PRIVATEKEY_FILE_NAME`: path to file which contains the alpha signer's account private key
    -   `BETA_PRIVATEKEY_FILE_NAME`: path to file which contains the beta signer's account private key
-   `./docker-compose.yml`:
    -   uses the values from `.env`
    -   to further increase the privacy of the network the nodes accept new node into the network only from subnet 172.16.254.0/24 set by the `--netrestrict` flag - this local network created is called `nodenet`
    -   the default network accepts an external network called `project-network` which can be used to share a network between multiple docker container projects
    -   the volume called `chaindata` stores the data between container startups by synchronizing with the directory `/node/geth` of the alpha signer's container; the signer alpha broadcasts the blockchain data to the other nodes upon startup and they continue where they left off

## Additonal information

The accounts for the signer node were generated using `geth --datadir . account new`. The used passwords and generated private keys are stored in the files `alpha_password.txt`, `beta_password.txt`, `alpha_private_key.txt`, `beta_private_key.txt`. The reason for storing these values in separate files instead of simply putting them into the .env file is because these are sensitive values that should not be exposed in the environment variables of a Docker container.

The `boot.key` file for bootnode was generated using `bootnode -genkey boot.key`. The bootnode's enode ID was recorded in the `.env` file.

The `uchain.json` file contains the genesis configuration for the blockchain. It was created with `puppeth` via the following command chain:

```
puppeth --network=uchain

What would you like to do? (default = stats)
 1. Show network stats
 2. Configure new genesis
 3. Track new remote server
 4. Deploy network components
> 2

What would you like to do? (default = create)
 1. Create new genesis from scratch
 2. Import already existing genesis
> 1

Which consensus engine to use? (default = clique)
 1. Ethash - proof-of-work
 2. Clique - proof-of-authority
> 2

\begin{lstlisting}[breaklines]
How many seconds should blocks take? (default = 15)
> 4

Which accounts are allowed to seal? (mandatory at least one)
> 0x9c3ca6a0a2a5ea1d25c896da9679e97629804284
> 0x4b6497cf99294547dd458d939b27c471f53dba29
> 0x

Which accounts should be pre-funded? (advisable at least one)
> 0x65e1fc4b8fbc4e90aa7feb60b9b6e5b224841aae
> 0xd7485a0358d585c7611321b8267172f69091dbff
> 0x

Should the precompile-addresses (0x1 .. 0xff) be pre-funded with 1 wei? (advisable yes)
> yes

Specify your chain/network ID if you want an explicit one (default = random)
> 8105
```
