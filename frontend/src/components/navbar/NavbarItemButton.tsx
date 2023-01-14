import React, { useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { Box, Menu, MenuItem, Button } from "@mui/material";
import { NavbarItem } from "../../constants/types";

export interface DropdownMenuProps {
    navbarItem: NavbarItem;
}

const NavbarItemButton: React.FunctionComponent<DropdownMenuProps> = ({ navbarItem }: DropdownMenuProps) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleCloseMenu = useCallback(() => {
        setAnchorEl(null);
    }, []);

    const handleOpenMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const buttonProps = useMemo(() => {
        if (navbarItem.options.length > 1)
            return {
                onClick: handleOpenMenu,
            };
        return {};
    }, [navbarItem]);

    const paddingSx = useMemo(() => ({ padding: "8px 16px" }), []);

    return (
        <Box sx={{ flexGrow: 0 }}>
            <Button
                key={navbarItem.mainTitle}
                color="white"
                sx={{ my: 2, mx: 2, p: 0, textTransform: "none" }}
                {...buttonProps}
            >
                {navbarItem.options.length == 1 ? (
                    <Link
                        to={`/${navbarItem.options[0].path}`}
                        style={{ color: "white", textDecoration: "none", ...paddingSx, width: "100%" }}
                    >
                        {navbarItem.mainTitle}
                    </Link>
                ) : (
                    <Box sx={{ ...paddingSx }}>{navbarItem.mainTitle}</Box>
                )}
            </Button>
            <Menu
                sx={{ mt: "45px" }}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClick={handleCloseMenu}
            >
                {navbarItem.options.map((option) => (
                    <MenuItem key={option.title} sx={{ p: 0 }}>
                        <Link
                            to={`/${option.path}`}
                            style={{
                                color: "black",
                                textDecoration: "none",
                                ...paddingSx,
                                width: "100%",
                            }}
                        >
                            {option.title}
                        </Link>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
};

export default NavbarItemButton;
