import React from "react";
import { Button } from "@mui/material";
import { ethers } from "ethers";

import { NETWORK } from "../../constants/constants";

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
                    // network not added to Metamask
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
