import React from "react";
import Typography from "@mui/material/Typography";

export interface LogoProps {
    href?: string;
}

const Logo: React.FunctionComponent<LogoProps> = ({ href }: LogoProps) => {
    return (
        <Typography
            variant="h6"
            noWrap
            component="a"
            href={href}
            sx={{
                mr: 2,
                fontFamily: "monospace",
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
                textTransform: "none",
            }}
        >
            uChain
        </Typography>
    );
};
export default Logo;
