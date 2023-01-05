```
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```

### How to run

```
npx hardhat compile
npm run generate-abi-types
npm run deploy
npm run export
```

Location of generated files:

-   compiled artifacts: in `artifacts` folder
-   generated ABI types for Typescript: in `ethereum-abi-types` folder
-   addresses from deployment: in `exports` folder

`npm run export` copies the generated files into `frontend/src/contracts/imports`
