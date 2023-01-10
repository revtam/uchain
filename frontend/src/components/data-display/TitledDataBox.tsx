import React from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

export interface TitledDataBoxProps {
    title: string;
}

const TitledDataBox: React.FunctionComponent<React.PropsWithChildren<TitledDataBoxProps>> = ({
    children,
    title,
}: React.PropsWithChildren<TitledDataBoxProps>) => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Typography display={"block"} marginBottom={2} fontWeight={600}>
                {title}
            </Typography>
            {children}
        </Box>
    );
};
export default TitledDataBox;
