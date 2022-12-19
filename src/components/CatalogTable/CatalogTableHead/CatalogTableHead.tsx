import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { TableColumns } from "../../../interfaces/TableColumns";

const columns: readonly TableColumns[] = [
  { id: "actions", label: "Actions", minWidth: 55 },
  { id: "make", label: "Make", minWidth: 90 },
  { id: "model", label: "Model", minWidth: 90 },
  { id: "year", label: "Year", minWidth: 50 },
  { id: "engine", label: "Engine Type", minWidth: 110 },
  { id: "gearbox", label: "Gear Box", minWidth: 120 },
  { id: "condition", label: "Condition", minWidth: 85 },
  { id: "hp", label: "Power", minWidth: 60 },
  { id: "color", label: "Color", minWidth: 60 },
  { id: "price", label: "Price $", minWidth: 65 },
  { id: "city", label: "City", minWidth: 65 },
  { id: "mileage", label: "Mileage", minWidth: 65 },
  { id: "extras", label: "Extras", minWidth: 70 },
];

function CatalogTableHead() {
  return (
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
  );
}

export default CatalogTableHead;
