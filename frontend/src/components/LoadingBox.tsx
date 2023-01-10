import { CircularProgress } from "@mui/material";
import React from "react";
import CenterContent from "./data-display/CenterContent";

export interface LoadingBoxProps {
    fullSize?: boolean;
}

const LoadingBox: React.FunctionComponent<LoadingBoxProps> = ({ fullSize = false }: LoadingBoxProps) => {
    if (fullSize)
        return (
            <CenterContent>
                <CircularProgress color="primary" />
            </CenterContent>
        );
    return <CircularProgress color="primary" />;
};

export default LoadingBox;
