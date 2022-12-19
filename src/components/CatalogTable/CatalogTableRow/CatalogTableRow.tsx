import { useState } from "react";

import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { Car } from "../../../interfaces/Car";
import { selectUser } from "../../../store/auth-slice";
import { deleteCar } from "../../../store/catalog-slice";
import { useAppSelector, useAppDispatch } from "../../../store/store";

import AddCar from "../AddCar/AddCar";
import AlertDialog from "../../common/AlertDialog/AlertDialog";

type CatalogTableRowProps = {
  car: Car;
};

function CatalogTableRow({ car }: CatalogTableRowProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const isOwner = user?.id === car.user.id;

  const ownerControls = (
    <Box>
      <Tooltip title="Edit">
        <EditIcon
          onClick={() => setIsEditing(true)}
          sx={{ mr: "5px", cursor: "pointer" }}
        />
      </Tooltip>
      <Tooltip title="Delete">
        <DeleteOutlineIcon
          onClick={() => setIsDeleting(true)}
          sx={{ cursor: "pointer" }}
        />
      </Tooltip>
    </Box>
  );

  if (isEditing) {
    return (
      <AddCar
        toggleMenu={() => setIsEditing(false)}
        data={car}
      />
    );
  }
  return (
    <TableRow key={car.id}>
      <AlertDialog
        open={isDeleting}
        message={"You are about to delete this car from the catalog!"}
        onClose={() => setIsDeleting(false)}
        onConfirm={() => dispatch(deleteCar({ carId: car.id }))}
      />
      <TableCell style={{ width: 160 }}>{isOwner && ownerControls}</TableCell>
      <TableCell style={{ width: 160 }}>{car.make}</TableCell>
      <TableCell style={{ width: 160 }}>{car.model}</TableCell>
      <TableCell style={{ width: 160 }}>{car.year}</TableCell>
      <TableCell style={{ width: 160 }}>{car.engineType}</TableCell>
      <TableCell style={{ width: 160 }}>{car.gearBox}</TableCell>
      <TableCell style={{ width: 160 }}>{car.condition}</TableCell>
      <TableCell style={{ width: 160 }}>{car.horsePower}</TableCell>
      <TableCell style={{ width: 160 }}>{car.color}</TableCell>
      <TableCell style={{ width: 160 }}>{car.price}</TableCell>
      <TableCell style={{ width: 160 }}>{car.city}</TableCell>
      <TableCell style={{ width: 160 }}>{car.mileage}</TableCell>
      <TableCell style={{ width: 160 }}>{car.extras}</TableCell>
    </TableRow>
  );
}

export default CatalogTableRow;
