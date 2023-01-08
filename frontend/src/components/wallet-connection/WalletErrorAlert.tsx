import React, { useEffect, useState } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { Alert, Snackbar } from "@mui/material";

import { getErrorMessage } from "../../utils/wallet/walletUtils";

const WalletErrorAlert: React.FunctionComponent<any> = () => {
    const { error } = useWeb3React<Web3Provider>();
    const [alertOpen, setAlertOpen] = useState<boolean>(false);

    useEffect(() => {
        setAlertOpen(true);
    }, [error]);

    const handleClose = () => setAlertOpen(false);

    if (error) {
        return (
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={alertOpen}
                autoHideDuration={10000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity="error">
                    {getErrorMessage(error)}
                </Alert>
            </Snackbar>
        );
    }

    return null;
};

export default WalletErrorAlert;
