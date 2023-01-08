import { CircularProgress } from "@mui/material";
import React from "react";
import CenterContent from "./data-display/CenterContent";

const PageLoading: React.FunctionComponent<any> = () => {
    return <CenterContent content={<CircularProgress color="primary" />} />;
};

export default PageLoading;
