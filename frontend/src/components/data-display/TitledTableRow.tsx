import { TableCell, TableRow } from "@mui/material";
import React from "react";

export interface TitledTableRowProps {
    title: string;
}

const TitledTableRow: React.FunctionComponent<React.PropsWithChildren<TitledTableRowProps>> = ({
    title,
    children,
}: React.PropsWithChildren<TitledTableRowProps>) => {
    return (
        <TableRow key={title} sx={{ border: 0 }}>
            <TableCell
                sx={{
                    borderBottom: "none",
                    color: "var(--mui-palette-darkGrey-main)",
                }}
            >
                {title}
            </TableCell>
            <TableCell sx={{ borderBottom: "none" }}>{children}</TableCell>
        </TableRow>
    );
};

export default TitledTableRow;
