import React from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

export interface PageTitleProps {
    title: string;
}

const PageTitle: React.FunctionComponent<PageTitleProps> = ({ title }: PageTitleProps) => {
    return (
        <Box>
            <Typography
                variant="h1"
                sx={{
                    my: 10,
                    fontSize: 45,
                    fontWeight: 400,
                }}
            >
                {title}
            </Typography>
        </Box>
    );
};
export default PageTitle;
