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
import AddCar from "./AddCar/AddCar";

const columns: readonly TableColumns[] = [
  { id: "actions", label: "Actions", minWidth: 45 },
  { id: "make", label: "Make", minWidth: 100 },
  { id: "model", label: "Model", minWidth: 100 },
  { id: "year", label: "Year", minWidth: 50 },
  { id: "engine", label: "Engine Type", minWidth: 85 },
  { id: "gearbox", label: "Gear Box", minWidth: 85 },
  { id: "condition", label: "Condition", minWidth: 85 },
  { id: "hp", label: "Horse Power", minWidth: 100 },
  { id: "color", label: "Color", minWidth: 60 },
  { id: "price", label: "Price $", minWidth: 100 },
  { id: "city", label: "City", minWidth: 100 },
  { id: "mileage", label: "Mileage", minWidth: 100 },
  { id: "extras", label: "Extras", minWidth: 70 },
];

type CatalogTableProps = {
  carData: Car[];
  isAddingCar: boolean;
  toggleMenu: () => void;
  onAddNewData: (data: any) => void;
  onDeleteData: (id: string) => void;
  onDataEdit: (data: any) => void
};

export default function CatalogTable({
  carData,
  isAddingCar,
  toggleMenu,
  onAddNewData,
  onDeleteData,
  onDataEdit,
}: CatalogTableProps) {

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
          {isAddingCar && (
            <AddCar
              toggleMenu={toggleMenu}
              onAddNewData={onAddNewData}
            />
          )}
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
              onDeleteData={onDeleteData}
              onDataEdit={onDataEdit}
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
                colSpan={13}
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
              colSpan={13}
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
