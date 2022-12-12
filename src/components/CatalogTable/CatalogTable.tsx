// import * as React from 'react';
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

interface Column {
  id:
    | "make"
    | "model"
    | "year"
    | "engine"
    | "gearbox"
    | "condition"
    | "hp"
    | "color"
    | "price"
    | "city"
    | "mileage"
    | "extras";
  label: string;
  minWidth?: number;
  align?: "right";
}

const columns: readonly Column[] = [
  { id: "make", label: "Make", minWidth: 170 },
  { id: "model", label: "Model", minWidth: 100 },
  { id: "year", label: "Year", minWidth: 100 },
  { id: "engine", label: "Engine Type", minWidth: 100 },
  { id: "gearbox", label: "Gear Box", minWidth: 100 },
  { id: "condition", label: "Condition", minWidth: 100 },
  { id: "hp", label: "Horse Power", minWidth: 100 },
  { id: "price", label: "Price", minWidth: 100 },
  { id: "city", label: "City", minWidth: 100 },
  { id: "mileage", label: "Mileage", minWidth: 100 },
  { id: "extras", label: "Extras", minWidth: 100 },
];

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

const mockData = [
  {
    id: "1",
    make: "Honda",
    model: "S2000",
    year: 2002,
    engineType: "PETROL",
    gearBox: "MANUAL",
    condition: "NEW",
    horsePower: 240,
    color: "red",
    price: 13000,
    city: "London",
    mileage: 60000,
    user: {
      id: "c8c17b7a-b922-4c16-b0a2-a06f3afda2f1",
      username: "MikeLP",
      password: "11111",
      firstName: "Mike",
      lastName: "Shinoda",
    },
    extras: "hardtop",
  },
  {
    id: "2",
    make: "Honda",
    model: "S2000",
    year: 2002,
    engineType: "PETROL",
    gearBox: "MANUAL",
    condition: "NEW",
    horsePower: 240,
    color: "red",
    price: 13000,
    city: "London",
    mileage: 60000,
    user: {
      id: "c8c17b7a-b922-4c16-b0a2-a06f3afda2f1",
      username: "MikeLP",
      password: "11111",
      firstName: "Mike",
      lastName: "Shinoda",
    },
    extras: "hardtop",
  },
  {
    id: "3",
    make: "Honda",
    model: "S2000",
    year: 2002,
    engineType: "PETROL",
    gearBox: "MANUAL",
    condition: "NEW",
    horsePower: 240,
    color: "red",
    price: 13000,
    city: "London",
    mileage: 60000,
    user: {
      id: "c8c17b7a-b922-4c16-b0a2-a06f3afda2f1",
      username: "MikeLP",
      password: "11111",
      firstName: "Mike",
      lastName: "Shinoda",
    },
    extras: "hardtop",
  },
  {
    id: "4",
    make: "Honda",
    model: "S2000",
    year: 2002,
    engineType: "PETROL",
    gearBox: "MANUAL",
    condition: "NEW",
    horsePower: 240,
    color: "red",
    price: 13000,
    city: "London",
    mileage: 60000,
    user: {
      id: "c8c17b7a-b922-4c16-b0a2-a06f3afda2f1",
      username: "MikeLP",
      password: "11111",
      firstName: "Mike",
      lastName: "Shinoda",
    },
    extras: "hardtop",
  },
  {
    id: "5",
    make: "Honda",
    model: "S2000",
    year: 2002,
    engineType: "PETROL",
    gearBox: "MANUAL",
    condition: "NEW",
    horsePower: 240,
    color: "red",
    price: 13000,
    city: "London",
    mileage: 60000,
    user: {
      id: "c8c17b7a-b922-4c16-b0a2-a06f3afda2f1",
      username: "MikeLP",
      password: "11111",
      firstName: "Mike",
      lastName: "Shinoda",
    },
    extras: "hardtop",
  },
  {
    id: "6",
    make: "Honda",
    model: "S2000",
    year: 2002,
    engineType: "PETROL",
    gearBox: "MANUAL",
    condition: "NEW",
    horsePower: 240,
    color: "red",
    price: 13000,
    city: "London",
    mileage: 60000,
    user: {
      id: "c8c17b7a-b922-4c16-b0a2-a06f3afda2f1",
      username: "MikeLP",
      password: "11111",
      firstName: "Mike",
      lastName: "Shinoda",
    },
    extras: "hardtop",
  },
];

export default function CatalogTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - mockData.length) : 0;

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
            ? mockData.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : mockData
          ).map((row) => (
            <TableRow key={row.id}>
              <TableCell
                component="th"
                scope="row"
              >
                {row.make}
              </TableCell>
              <TableCell
                style={{ width: 160 }}
              >
                {row.model}
              </TableCell>
              <TableCell
                style={{ width: 160 }}
              >
                {row.year}
              </TableCell>
              <TableCell
                style={{ width: 160 }}
              >
                {row.engineType}
              </TableCell>
              <TableCell
                style={{ width: 160 }}
              >
                {row.gearBox}
              </TableCell>
              <TableCell
                style={{ width: 160 }}
              >
                {row.condition}
              </TableCell>
              <TableCell
                style={{ width: 160 }}
              >
                {row.horsePower}
              </TableCell>
              <TableCell
                style={{ width: 160 }}
              >
                {row.price}
              </TableCell>
              <TableCell
                style={{ width: 160 }}
              >
                {row.city}
              </TableCell>
              <TableCell
                style={{ width: 160 }}
              >
                {row.mileage}
              </TableCell>
              <TableCell
                style={{ width: 160 }}
              >
                {row.extras}
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={12}
              count={mockData.length}
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
