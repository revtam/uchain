import React from "react";

import "./App.css";
import ErrorAlert from "./error-alert/ErrorAlert";
import Navbar from "./navbar/Navbar";
import Routing from "./Routing";
import WalletErrorAlert from "./wallet-connection/WalletErrorAlert";

export const App: React.FunctionComponent<any> = () => {
    return (
        <React.Fragment>
            <Navbar />
            <Routing />
            <WalletErrorAlert />
            <ErrorAlert />
        </React.Fragment>
    );
};

export default App;
