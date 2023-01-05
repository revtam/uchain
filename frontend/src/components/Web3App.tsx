import React from "react";
import { Web3ReactProvider } from "@web3-react/core";
import { CssBaseline } from "@mui/material";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";

import App from "./App";
import { getLibrary } from "../utils/wallet/utils";
import theme from "../theme/theme";

const Web3App: React.FunctionComponent<any> = () => {
    return (
        <CssVarsProvider theme={theme}>
            <Web3ReactProvider getLibrary={getLibrary}>
                <CssBaseline />
                <App />
            </Web3ReactProvider>
        </CssVarsProvider>
    );
};

export default Web3App;
