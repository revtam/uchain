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
-   addresses from deployment: in `deployment-output` folder

`npm run export` copies the generated files into `frontend/imports` and `registrator/imports`.
