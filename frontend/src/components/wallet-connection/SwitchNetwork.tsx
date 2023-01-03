import React from "react";
import { Button } from "@mui/material";
import { ExternalProvider } from "@ethersproject/providers";
import { ethers } from "ethers";

import { NETWORK } from "../../constants";

declare global {
    interface Window {
        ethereum?: ExternalProvider;
    }
}

const SwitchNetwork: React.FunctionComponent<any> = () => {
    return (
        <Button
            color="inherit"
            style={{
                textTransform: "none",
            }}
            onClick={async () => {
                try {
                    if (window?.ethereum?.request) {
                        await window.ethereum.request({
                            method: "wallet_switchEthereumChain",
                            params: [{ chainId: ethers.utils.hexlify(NETWORK.chainId) }],
                        });
                    }

                    console.log("called");
                } catch (error: any) {
                    if (error.code === 4902) {
                        (await window?.ethereum?.request)
                            ? {
                                  method: "wallet_addEthereumChain",
                                  params: [{ ...NETWORK, chainId: ethers.utils.hexlify(NETWORK.chainId) }],
                              }
                            : null;
                    }
                }
            }}
        >
            Switch to uChain network
        </Button>
    );
};

export default SwitchNetwork;
