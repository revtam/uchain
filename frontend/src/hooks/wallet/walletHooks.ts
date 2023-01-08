import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import injectedConnector from "../../utils/wallet/connectors";

export const useEagerConnect = (): boolean => {
    const { activate, active, setError } = useWeb3React();

    const [tried, setTried] = useState<boolean>(false);

    useEffect(() => {
        injectedConnector.isAuthorized().then((isAuthorized: boolean) => {
            if (isAuthorized) {
                activate(injectedConnector, undefined).catch((error: Error) => {
                    setTried(true);
                    setError(error);
                });
            } else {
                setTried(true);
            }
        });
    }, []);

    useEffect(() => {
        if (!tried && active) {
            setTried(true);
        }
    }, [tried, active]);

    return tried;
};

export const useInactiveListener = (suppress: boolean = false) => {
    const { active, error, activate } = useWeb3React();

    useEffect((): any => {
        const { ethereum } = window as any;
        if (ethereum && ethereum.on && !active && !error && !suppress) {
            const handleConnect = () => {
                console.log("Handling 'connect' event");
                activate(injectedConnector);
            };
            const handleChainChanged = (chainId: string | number) => {
                console.log("Handling 'chainChanged' event with payload", chainId);
                activate(injectedConnector);
            };
            const handleAccountsChanged = (accounts: string[]) => {
                console.log("Handling 'accountsChanged' event with payload", accounts);
                if (accounts.length > 0) {
                    activate(injectedConnector);
                }
            };
            const handleNetworkChanged = (networkId: string | number) => {
                console.log("Handling 'networkChanged' event with payload", networkId);
                activate(injectedConnector);
            };

            ethereum.on("connect", handleConnect);
            ethereum.on("chainChanged", handleChainChanged);
            ethereum.on("accountsChanged", handleAccountsChanged);
            ethereum.on("networkChanged", handleNetworkChanged);

            return () => {
                if (ethereum.removeListener) {
                    ethereum.removeListener("connect", handleConnect);
                    ethereum.removeListener("chainChanged", handleChainChanged);
                    ethereum.removeListener("accountsChanged", handleAccountsChanged);
                    ethereum.removeListener("networkChanged", handleNetworkChanged);
                }
            };
        }
    }, [active, error, suppress, activate]);
};
