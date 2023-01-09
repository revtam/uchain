import React, { useCallback, useState } from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordionSummary, { AccordionSummaryProps } from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { Accordion, AccordionDetails } from "@mui/material";

export const CustomAccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary {...props} />
))(({ theme }) => ({
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

export interface CustomAccordionProps {
    title: string;
    signalLoad?: () => void;
    borderEnabled?: boolean;
    borderColor?: string;
    arrowColor?: string;
    summaryBackgroundColor?: string;
    summaryBorderEnabled?: boolean;
    summaryBorderColor?: string;
    summaryTextColor?: string;
    summaryTextWeight?: number;
}

const CustomAccordion: React.FunctionComponent<React.PropsWithChildren<CustomAccordionProps>> = ({
    title,
    signalLoad,
    children,
    borderEnabled = false,
    borderColor = "black",
    arrowColor = "black",
    summaryBackgroundColor = "inherit",
    summaryBorderEnabled = false,
    summaryBorderColor = "black",
    summaryTextColor = "inherit",
    summaryTextWeight = 400,
}: React.PropsWithChildren<CustomAccordionProps>) => {
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
        <Accordion
            onChange={(_event, expanded) => callOnFirstExpand(expanded)}
            sx={{
                border: `${borderEnabled ? "3px" : "0px"} solid ${borderColor}`,
                marginBottom: 2,
            }}
        >
            <CustomAccordionSummary
                expandIcon={<ArrowForwardIosSharpIcon style={{ fontSize: "0.9rem", color: arrowColor }} />}
                sx={{
                    backgroundColor: summaryBackgroundColor,
                    color: summaryTextColor,
                    border: `${summaryBorderEnabled ? "3px" : "0px"} solid ${summaryBorderColor}`,
                }}
            >
                <Typography fontWeight={summaryTextWeight}>{title}</Typography>
            </CustomAccordionSummary>
            <AccordionDetails>{children}</AccordionDetails>
        </Accordion>
    );
};

export default CustomAccordion;
