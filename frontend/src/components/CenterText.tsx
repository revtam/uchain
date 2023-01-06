import React from "react";
import { Box } from "@mui/material";

export interface CenterTextProps {
    text: string;
}

const CenterText: React.FunctionComponent<CenterTextProps> = ({ text }: CenterTextProps) => {
    return (
        <Box height={"100%"} display="flex" alignItems={"center"} justifyContent={"center"}>
            {text}
        </Box>
    );
};
export default CenterText;
