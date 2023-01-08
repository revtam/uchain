import React from "react";
import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import { TableTitleValueRow } from "../../utils/common/commonTypes";

export interface DataTableProps {
    rows: TableTitleValueRow[];
}

const DataTable: React.FunctionComponent<DataTableProps> = ({ rows }: DataTableProps) => {
    return (
        <Table sx={{ width: "auto" }}>
            <TableBody>
                {rows.map((row) => (
                    <TableRow key={row.title} sx={{ border: 0 }}>
                        <TableCell padding={"none"} sx={{ minWidth: 200, borderBottom: "none" }}>
                            {row.title}
                        </TableCell>
                        <TableCell sx={{ borderBottom: "none" }}>{row.value}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
export default DataTable;
