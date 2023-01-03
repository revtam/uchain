import React, { useState, useCallback, useMemo } from "react";

import { ethers } from "ethers";

export const MetaMask: React.FunctionComponent<any> = () => {
    const [account, setAccount] = useState<any | undefined>(undefined);

    //   async connectToMetamask() {
    //     const provider = new ethers.providers.Web3Provider(window.ethereum)
    //     const accounts = await provider.send("eth_requestAccounts", []);
    //     // this.setState({ selectedAddress: accounts[0] })
    //   }

    const connectToMetaMask = useCallback(async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setAccount(accounts[0]);
    }, [window.ethereum]);

    const renderMetaMask = useMemo(() => {
        if (!account) {
            return <button onClick={() => connectToMetaMask()}>Connect to Metamask</button>;
        } else {
            return <p>Welcome {account}</p>;
        }
    }, [account]);

    return <div>{renderMetaMask}</div>;
};

export default MetaMask;
