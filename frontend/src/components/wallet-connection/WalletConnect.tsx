import React, { useEffect, useState } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { Button, CircularProgress } from "@mui/material";
import injectedConnector from "../../utils/wallet/connectors";
import { CHAIN_ID } from "../../constants/constants";
import { useEagerConnect, useInactiveListener } from "../../hooks/wallet/walletHooks";
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

    if (connected && chainId !== CHAIN_ID) return <SwitchNetwork />;

    return (
        <Button
            sx={{
                textTransform: "none",
            }}
            color="white"
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
            {activating ? <CircularProgress color="white" size={20} /> : "Connect to Wallet"}
        </Button>
    );
};

export default WalletConnect;
