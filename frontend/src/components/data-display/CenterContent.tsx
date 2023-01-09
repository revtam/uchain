import React from "react";
import { Box } from "@mui/material";

const CenterContent: React.FunctionComponent<React.PropsWithChildren> = ({
    children,
}: React.PropsWithChildren) => {
    return (
        <Box height={"100%"} display="flex" alignItems={"center"} justifyContent={"center"}>
            {children}
        </Box>
    );
};
export default CenterContent;
