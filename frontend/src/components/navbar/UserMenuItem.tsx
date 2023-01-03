import React from "react";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { Box, Menu, MenuItem, Typography, Button } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import { trimString } from "../../utils/utils";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const UserMenuItem: React.FunctionComponent<any> = () => {
    const { account } = useWeb3React<Web3Provider>();
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleCloseMenu = () => {
        setAnchorElUser(null);
    };

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    return (
        <Box sx={{ flexGrow: 0 }}>
            <Button
                color="inherit"
                variant="outlined"
                style={{
                    textTransform: "none",
                }}
                onClick={handleOpenMenu}
            >
                {account && trimString(account, 5, 4)} <ArrowDropDownIcon />
            </Button>
            <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseMenu}
            >
                {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseMenu}>
                        <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
};

export default UserMenuItem;
