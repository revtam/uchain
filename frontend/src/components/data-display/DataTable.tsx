import React from "react";
import { Table, TableBody, TableCell, TableRow } from "@mui/material";

export interface DataTableProps {
    titleColumnMinWidth?: number;
}

const DataTable: React.FunctionComponent<React.PropsWithChildren<DataTableProps>> = ({
    titleColumnMinWidth = 200,
    children,
}: React.PropsWithChildren<DataTableProps>) => {
    return (
        <Table padding="normal" sx={{ width: "auto" }}>
            <TableBody>
                <TableRow sx={{ border: 0, height: 0 }}>
                    <TableCell
                        padding={"none"}
                        sx={{
                            minWidth: titleColumnMinWidth,
                            borderBottom: "none",
                        }}
                    />
                </TableRow>
                {children}
            </TableBody>
        </Table>
    );
};
export default DataTable;
