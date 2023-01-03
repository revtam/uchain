import React from "react";
import { Web3ReactProvider } from "@web3-react/core";
import { CssBaseline, ThemeProvider } from "@mui/material";

import App from "./App";
import { getLibrary } from "../web3-utils/web3utils";
import theme from "../theme";

const Web3App: React.FunctionComponent<any> = () => {
    return (
        <ThemeProvider theme={theme}>
            <Web3ReactProvider getLibrary={getLibrary}>
                <CssBaseline />
                <App />
            </Web3ReactProvider>
        </ThemeProvider>
    );
};

export default Web3App;
