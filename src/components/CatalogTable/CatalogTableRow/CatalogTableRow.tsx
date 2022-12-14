import { useState } from "react";

import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box";
// import DoneIcon from "@mui/icons-material/Done";
// import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { Car } from "../../../interfaces/Car";
import { useAppSelector } from "../../../store/store";
import AddCar from "../AddCar/AddCar";

type CatalogTableRowProps = {
  row: Car;
  onDeleteData: (id: string) => void;
  onDataEdit: (data: any)=> void;
};

function CatalogTableRow({ row, onDeleteData, onDataEdit }: CatalogTableRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
  const isOwner = user?.user.id === row.user.id;

  const ownerControls = (
    <Box>
      <EditIcon
        onClick={() => setIsEditing(true)}
        sx={{ mr: "5px", cursor: "pointer" }}
      />

      <DeleteOutlineIcon
        onClick={()=> onDeleteData(row.id)}
        sx={{ cursor: "pointer" }}
      />
    </Box>
  );

  if (isEditing) {
    return (
      <AddCar
        toggleMenu={() => setIsEditing(false)}
        onDataEdit={onDataEdit}
        data={row}
      />
    );
  }
  return (
    <TableRow key={row.id}>
      <TableCell style={{ width: 160 }}>{isOwner && ownerControls}</TableCell>
      <TableCell style={{ width: 160 }}>{row.make}</TableCell>
      <TableCell style={{ width: 160 }}>{row.model}</TableCell>
      <TableCell style={{ width: 160 }}>{row.year}</TableCell>
      <TableCell style={{ width: 160 }}>{row.engineType}</TableCell>
      <TableCell style={{ width: 160 }}>{row.gearBox}</TableCell>
      <TableCell style={{ width: 160 }}>{row.condition}</TableCell>
      <TableCell style={{ width: 160 }}>{row.horsePower}</TableCell>
      <TableCell style={{ width: 160 }}>{row.color}</TableCell>
      <TableCell style={{ width: 160 }}>{row.price}</TableCell>
      <TableCell style={{ width: 160 }}>{row.city}</TableCell>
      <TableCell style={{ width: 160 }}>{row.mileage}</TableCell>
      <TableCell style={{ width: 160 }}>{row.extras}</TableCell>
    </TableRow>
  );
}

export default CatalogTableRow;
