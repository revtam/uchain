import React from "react";
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

export type AccordionElement = {
    title: string;
    content: JSX.Element;
};

export interface OutlinedAccordionProps {
    elements: AccordionElement[];
}

const OutlinedAccordion: React.FunctionComponent<OutlinedAccordionProps> = ({
    elements,
}: OutlinedAccordionProps) => {
    return (
        <React.Fragment>
            {elements.map((element: AccordionElement, index: number) => (
                <OutlinedAccordionBody key={`${element.title}${index}`}>
                    <OutlinedAccordionSummary
                        aria-controls={`${element.title}-content${index}`}
                        id={`${element.title}-header${index}`}
                    >
                        <Typography>{element.title}</Typography>
                    </OutlinedAccordionSummary>
                    <AccordionDetails>{element.content}</AccordionDetails>
                </OutlinedAccordionBody>
            ))}
        </React.Fragment>
    );
};

export default OutlinedAccordion;
