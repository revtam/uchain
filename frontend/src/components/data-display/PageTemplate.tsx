import { Box, Container } from "@mui/material";
import React from "react";
import PageTitle from "./PageTitle";

export interface PageTemplateProps {
    pageTitle: string;
}

const PageTemplate: React.FunctionComponent<React.PropsWithChildren<PageTemplateProps>> = ({
    children,
    pageTitle,
}: React.PropsWithChildren<PageTemplateProps>) => {
    return (
        <Container maxWidth={"lg"} sx={{ pb: 10 }}>
            <PageTitle title={pageTitle} />
            <Box marginTop={4}>{children}</Box>
        </Container>
    );
};

export default PageTemplate;
