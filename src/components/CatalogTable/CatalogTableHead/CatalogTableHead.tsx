import Box from "@mui/material/Box";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import SortingButtons from "../../common/SortingButtons/SortingButtons";

import { TableColumns } from "../../../interfaces/TableColumns";

const columns: readonly TableColumns[] = [
  { id: "make", label: "Make", sortBy: "make", minWidth: 90 },
  { id: "model", label: "Model", sortBy: "model", minWidth: 90 },
  { id: "year", label: "Year", sortBy: "year", minWidth: 50 },
  { id: "engine", label: "Engine Type", sortBy: "engineType", minWidth: 110 },
  { id: "gearbox", label: "Gear Box", sortBy: "gearBox", minWidth: 120 },
  { id: "condition", label: "Condition", sortBy: "condition", minWidth: 85 },
  { id: "hp", label: "Power", sortBy: "horsePower", minWidth: 60 },
  { id: "color", label: "Color", sortBy: "color", minWidth: 60 },
  { id: "price", label: "Price $", sortBy: "price", minWidth: 75 },
  { id: "city", label: "City", sortBy: "city", minWidth: 65 },
  { id: "mileage", label: "Mileage", sortBy: "mileage", minWidth: 65 },
  { id: "extras", label: "Extras", sortBy: "extras", minWidth: 70 },
];

type HeadProps = {
  showActionsColumn: boolean;
};

function CatalogTableHead({ showActionsColumn }: HeadProps) {
  return (
    <TableHead>
      <TableRow>
        {showActionsColumn && (
          <TableCell
            sx={{ fontWeight: 600, minWidth: "55px", bgcolor: "#f1f1f1" }}
            key="actions"
            style={{ width: 55 }}
            align="center"
          >
            Actions
          </TableCell>
        )}
        {columns.map((column) => (
          <TableCell
            sx={{ fontWeight: 600, bgcolor: "#f1f1f1" }}
            key={column.id}
            style={{ minWidth: column.minWidth }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {column.label}
              <SortingButtons sortBy={column.sortBy} />
            </Box>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default CatalogTableHead;
