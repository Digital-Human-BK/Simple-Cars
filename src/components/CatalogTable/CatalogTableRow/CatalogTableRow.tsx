import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

import { Car } from "../../../interfaces/Car";

type CatalogTableRowProps = {
  row: Car;
};

function CatalogTableRow({ row }: CatalogTableRowProps) {
  return (
    <TableRow key={row.id}>
      <TableCell style={{ width: 160 }}>{row.make}</TableCell>
      <TableCell style={{ width: 160 }}>{row.model}</TableCell>
      <TableCell style={{ width: 160 }}>{row.year}</TableCell>
      <TableCell style={{ width: 160 }}>{row.engineType}</TableCell>
      <TableCell style={{ width: 160 }}>{row.gearBox}</TableCell>
      <TableCell style={{ width: 160 }}>{row.condition}</TableCell>
      <TableCell style={{ width: 160 }}>{row.horsePower}</TableCell>
      <TableCell style={{ width: 160 }}>{row.price}</TableCell>
      <TableCell style={{ width: 160 }}>{row.city}</TableCell>
      <TableCell style={{ width: 160 }}>{row.mileage}</TableCell>
      <TableCell style={{ width: 160 }}>{row.extras}</TableCell>
    </TableRow>
  );
}

export default CatalogTableRow;
