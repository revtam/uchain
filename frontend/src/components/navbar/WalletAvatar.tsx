import React from "react";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { Box, Button, Typography } from "@mui/material";
import { trimString } from "../../utils/common/commonUtils";

const WalletAvatar: React.FunctionComponent<any> = () => {
    const { account } = useWeb3React<Web3Provider>();

    return (
        <Box
            border={1}
            borderColor="lightgray"
            borderRadius={1}
            display={"inline-block"}
            paddingX={2}
            paddingY={0.5}
        >
            <Typography variant={"button"} textTransform={"none"}>
                {account && trimString(account, 5, 4)}
            </Typography>
        </Box>
    );
};

export default WalletAvatar;
