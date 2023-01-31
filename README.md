# uChain project - Bachelor thesis

-   Title: uChain - Blockchain-powered study performance and evaluation pass for universities
-   Author: Tamás Révész
-   Supervisor: Univ.-Prof. Dipl.-Ing. Dr. Wolfgang Klas

## Project concept

The uChain project is an implementation of a **digital study performance and evaluation pass** built on a private Ethereum blockhain network. The pass records individual, required study achievements like milestones, tests, etc. during a course, the final grading of a course, and the collection of gradings of courses during the entire study.

## Structure of the repository

This repository contains the system components of the project:

-   Blockchain network: in `./uchain/` directory
-   Smart contracts: in `./smartcontracts/` directory
-   Frontend: in `./frontend/` directory
-   File server: in `./fileupload/` directory
-   Registrator server: in `./registrator/` directory

## Configurations, descriptions and detailed instructions

Configurations, descriptions and detailed instructions on the different system components can be found in the README files of their respective project directories.

## Preparation:

1. install `docker`
2. install `npm`
3. install the MetaMask extension in your browser
4. `npm --prefix ./smartcontracts ci`: install dependencies for deploying the smart contracts
5. optionally import admin account (private key: `./smartcontracts/secrets/admin_private_key.txt`) and test account (private keys: `./smartcontracts/secrets/testwallets.json`) into your MetaMask - _at least the import of the admin account is recommended_ because it can be used to accept registration request (registration of your own account)

## How to run for the first time

1. `docker network create project-network`: create the docker network that can be shared between the system components
2. `docker-compose -f uchain/docker-compose.yml up -d`: start the blockchain (client node available at `http://localhost:8545`)
3. `npm --prefix ./smartcontracts run execute-all`: compile and deploy smart contracts, load sample data, generate Typescript definitions of smart contracts and export dependencies for the other components (deployed contract addresses, generated Typescript definitions, compiled smart contracts), IMPORTANT NOTE: the sample data deployment takes several minutes
4. `docker-compose -f registrator/docker-compose.yml up -d`: start registrator server
5. `docker-compose -f fileupload/docker-compose.yml up -d`: start file server
6. `docker-compose -f frontend/docker-compose.yml up -d`: start frontend server
7. navigate to `http://localhost:8080` in your browser

## How to run later

1. `docker-compose -f uchain/docker-compose.yml up -d`
2. `docker-compose -f registrator/docker-compose.yml up -d`
3. `docker-compose -f fileupload/docker-compose.yml up -d`
4. `docker-compose -f frontend/docker-compose.yml up -d`
5. navigate to `http://localhost:8080` in your browser

## How to stop

1.  `docker-compose -f uchain/docker-compose.yml down`
2.  `docker-compose -f registrator/docker-compose.yml down`
3.  `docker-compose -f fileupload/docker-compose.yml down`
4.  `docker-compose -f frontend/docker-compose.yml down`

## How to test

1. `cd smartcontracts`
2. `npx hardhat test`
