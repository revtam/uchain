import React from "react";
import { AppBar, Box, Toolbar, Container, Button } from "@mui/material";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { Link } from "react-router-dom";

import Logo from "./Logo";
import UserMenuItem from "./UserMenuItem";
import WalletConnect from "../wallet-connection/WalletConnect";
import pageRoute from "../../pages/pages";

const pages = [pageRoute.courses, pageRoute.studyPerformance];

const Navbar: React.FunctionComponent<any> = () => {
    const { account } = useWeb3React<Web3Provider>();

    return (
        <AppBar position="static" color={"primary"}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Logo href={"/"} />
                    <Box sx={{ flexGrow: 1, display: "flex", marginLeft: 4 }}>
                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                style={{
                                    textTransform: "none",
                                }}
                                sx={{ my: 2, mx: 2, color: "white", display: "block" }}
                            >
                                <Link to={`/${page.path}`} style={{ color: "white", textDecoration: "none" }}>
                                    {page.name}
                                </Link>
                            </Button>
                        ))}
                    </Box>
                    {account ? <UserMenuItem /> : <WalletConnect />}
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Navbar;
