import React from "react";
import { Box } from "@mui/material";

export interface CenterContentProps {
    content: string | JSX.Element;
}

const CenterContent: React.FunctionComponent<CenterContentProps> = ({ content }: CenterContentProps) => {
    return (
        <Box height={"100%"} display="flex" alignItems={"center"} justifyContent={"center"}>
            {content}
        </Box>
    );
};
export default CenterContent;
