import React from "react";
import "./App.css";
import ErrorAlert from "./error-alert/ErrorAlert";
import Navbar from "./navbar/Navbar";
import Routing from "./Routing";
import UserAuth from "./UserAuth";
import WalletErrorAlert from "./wallet-connection/WalletErrorAlert";

export const App: React.FunctionComponent<any> = () => {
    return (
        <React.Fragment>
            <WalletErrorAlert />
            <ErrorAlert />
            <Navbar />
            <Routing />
            <UserAuth />
        </React.Fragment>
    );
};

export default App;
