import React, { useEffect, useState } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { Alert, Snackbar } from "@mui/material";

import { getErrorMessage } from "../../web3-utils/web3utils";

const WalletErrorAlert: React.FunctionComponent<any> = () => {
    const { error } = useWeb3React<Web3Provider>();
    const [errorAlertOpen, setErrorAlertOpen] = useState<boolean>(false);

    useEffect(() => {
        setErrorAlertOpen(true);
    }, [error]);

    if (error) {
        return (
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={errorAlertOpen}
                autoHideDuration={null}
            >
                <Alert onClose={() => setErrorAlertOpen(false)} severity="error">
                    {getErrorMessage(error)}
                </Alert>
            </Snackbar>
        );
    }

    return null;
};

export default WalletErrorAlert;
