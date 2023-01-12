import React from "react";
import Typography from "@mui/material/Typography";
import { Box, Stack } from "@mui/material";

export interface TitledDataBoxProps {
    title: string;
}

const TitledDataBox: React.FunctionComponent<React.PropsWithChildren<TitledDataBoxProps>> = ({
    children,
    title,
}: React.PropsWithChildren<TitledDataBoxProps>) => {
    return (
        <Stack sx={{ flexGrow: 1 }} spacing={2}>
            <Typography fontWeight={600}>{title}</Typography>
            {children}
        </Stack>
    );
};
export default TitledDataBox;
