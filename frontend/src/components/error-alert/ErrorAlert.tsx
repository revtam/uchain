import React, { useEffect, useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import useErrorStore from "../../hooks/error/hooks";

const ErrorAlert: React.FunctionComponent<any> = () => {
    const { errorMessage } = useErrorStore();
    const [alertOpen, setAlertOpen] = useState<boolean>(false);

    useEffect(() => {
        setAlertOpen(true);
    }, [errorMessage]);

    const handleClose = () => setAlertOpen(false);

    if (errorMessage) {
        return (
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={alertOpen}
                autoHideDuration={10000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity="error" variant="filled">
                    {errorMessage}
                </Alert>
            </Snackbar>
        );
    }

    return null;
};

export default ErrorAlert;
