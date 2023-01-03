import React, { useCallback, useEffect, useState } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { Button, CircularProgress } from "@mui/material";

import injectedConnector from "../../web3-utils/connectors";
import { CHAIN_ID } from "../../constants";
import { useEagerConnect, useInactiveListener } from "../../web3-utils/hooks";
import SwitchNetwork from "./SwitchNetwork";

const WalletConnect: React.FunctionComponent<any> = () => {
    const { connector, chainId, activate, setError } = useWeb3React<Web3Provider>();
    const [activatingConnector, setActivatingConnector] = useState<any>();

    useEffect(() => {
        if (activatingConnector && activatingConnector === connector) {
            setActivatingConnector(undefined);
        }
    }, [activatingConnector, connector]);

    const triedEager = useEagerConnect();
    useInactiveListener(!triedEager || !!activatingConnector);

    const activating = injectedConnector === activatingConnector;
    const connected = injectedConnector === connector;
    const disabled = !!activatingConnector || connected;

    const getConnectButtonText = useCallback(() => {}, [activating]);

    if (connected && chainId !== CHAIN_ID) return <SwitchNetwork />;

    return (
        <Button
            color="inherit"
            style={{
                textTransform: "none",
            }}
            variant="outlined"
            disabled={disabled}
            onClick={() => {
                setActivatingConnector(injectedConnector);
                activate(injectedConnector, (error: Error) => {
                    if (error) {
                        setActivatingConnector(undefined);
                        setError(error);
                    }
                });
            }}
        >
            {activating ? <CircularProgress color="inherit" /> : "Connect to Wallet"}
        </Button>
    );
};

export default WalletConnect;
