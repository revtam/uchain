import React, { useMemo } from "react";
import { AppBar, Box, Toolbar, Container } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import Logo from "./Logo";
import WalletConnect from "../wallet-connection/WalletConnect";
import useAuthStore from "../../hooks/auth/authHooks";
import WalletAvatar from "./WalletAvatar";
import defaultPages, { adminPages, lecturerPages, spmPages, studentPages } from "../../constants/navbarPages";
import { UserRole } from "../../utils/converter/contract-types/enums";
import NavbarItemButton from "./NavbarItemButton";

const Navbar: React.FunctionComponent<any> = () => {
    const { account } = useWeb3React();
    const { admin, userRole } = useAuthStore();

    const pages = useMemo(() => {
        let _pages = defaultPages;
        switch (userRole) {
            case UserRole.STUDENT:
                _pages = studentPages;
                break;
            case UserRole.LECTURER:
                _pages = lecturerPages;
                break;
            case UserRole.STUDY_PROGRAM_MANAGER:
                _pages = spmPages;
                break;
        }
        if (admin) _pages = _pages.concat(...adminPages);
        return _pages;
    }, [admin, userRole]);

    return (
        <AppBar position="static" color={"primary"}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Logo href={"/"} />
                    <Box sx={{ flexGrow: 1, display: "flex", marginLeft: 4 }}>
                        {pages.map((page) => (
                            <NavbarItemButton key={page.mainTitle} navbarItem={page} />
                        ))}
                    </Box>
                    {account ? <WalletAvatar /> : <WalletConnect />}
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Navbar;
