import { useState } from "react";

import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { Car } from "../../interfaces/Car";
import { TableColumns } from "../../interfaces/TableColumns";
import CatalogTableRow from "./CatalogTableRow/CatalogTableRow";
import TablePaginationActions from "./TablePaginationActions/TablePaginationActions";

const columns: readonly TableColumns[] = [
  { id: "make", label: "Make", minWidth: 170 },
  { id: "model", label: "Model", minWidth: 100 },
  { id: "year", label: "Year", minWidth: 100 },
  { id: "engine", label: "Engine Type", minWidth: 100 },
  { id: "gearbox", label: "Gear Box", minWidth: 100 },
  { id: "condition", label: "Condition", minWidth: 100 },
  { id: "hp", label: "Horse Power", minWidth: 100 },
  { id: "price", label: "Price $", minWidth: 100 },
  { id: "city", label: "City", minWidth: 100 },
  { id: "mileage", label: "Mileage", minWidth: 100 },
  { id: "extras", label: "Extras", minWidth: 100 },
];

type CatalogTableProps = {
  carData: Car[];
};

export default function CatalogTable({ carData }: CatalogTableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - carData.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table
        stickyHeader
        sx={{ minWidth: 500 }}
        aria-label="custom pagination table"
      >
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                sx={{ fontWeight: 600 }}
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? carData.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : carData
          ).map((row) => (
            <CatalogTableRow
              key={row.id}
              row={row}
            />
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
          {carData.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={12}
                sx={{ height: "400px", fontSize: "2rem", textAlign: "center" }}
              >
                No Data Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={12}
              count={carData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
