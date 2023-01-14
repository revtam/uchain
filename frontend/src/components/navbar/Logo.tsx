import React from "react";
import Typography from "@mui/material/Typography";

const Logo: React.FunctionComponent<any> = () => {
    return (
        <Typography
            variant="h6"
            noWrap
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
