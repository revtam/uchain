import React, { useCallback, useState } from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, { AccordionSummaryProps } from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { AccordionDetails } from "@mui/material";

export const OutlinedAccordionBody = styled((props: AccordionProps) => (
    <MuiAccordion elevation={0} square {...props} />
))(({ theme }) => ({
    border: `3px solid ${theme.palette.primary.main}`,
    marginBottom: 15,
}));

export const OutlinedAccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon htmlColor="white" sx={{ fontSize: "0.9rem" }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.white.main,
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
        transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
        marginLeft: theme.spacing(1),
    },
    "& .MuiAccordionSummary-content.Mui-expanded": {
        marginLeft: theme.spacing(1),
    },
}));

export interface OutlinedAccordionProps {
    title: string;
    signalLoad?: () => void;
}

const OutlinedAccordion: React.FunctionComponent<React.PropsWithChildren<OutlinedAccordionProps>> = ({
    title,
    signalLoad,
    children,
}: React.PropsWithChildren<OutlinedAccordionProps>) => {
    const [firstExpanded, setFirstExpanded] = useState<boolean>(false);

    const callOnFirstExpand = useCallback(
        (expanded: boolean) => {
            if (signalLoad && expanded && !firstExpanded) {
                setFirstExpanded(true);
                signalLoad();
            }
        },
        [firstExpanded, signalLoad]
    );

    return (
        <OutlinedAccordionBody onChange={(_event, expanded) => callOnFirstExpand(expanded)}>
            <OutlinedAccordionSummary>
                <Typography>{title}</Typography>
            </OutlinedAccordionSummary>
            <AccordionDetails>{children}</AccordionDetails>
        </OutlinedAccordionBody>
    );
};

export default OutlinedAccordion;
