import { useState } from "react";

import Box from "@mui/material/Box";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { Car } from "../../../interfaces/Car";
import { useAppSelector } from "../../../store/store";

type ChangeEvent =
  | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  | SelectChangeEvent;

type AddCarProps = {
  toggleMenu: () => void;
  onAddNewData?: (data: any) => void;
  onDataEdit?: (data: any) => void;
  data?: Car;
};

function AddCar({ toggleMenu, onDataEdit, onAddNewData, data }: AddCarProps) {
  const user = useAppSelector((state) => state.auth.user);
  const [newCar, setNewCar] = useState(() => {
    if (data) {
      return data;
    } else {
      return {
        id: Math.random().toString(),
        user: user?.user,
      };
    }
  });

  const handleChange = (ev: ChangeEvent, key: string) => {
    setNewCar((prevState) => ({ ...prevState, [key]: ev.target.value }));
  };

  return (
    <TableRow>
      <TableCell style={{ width: 160 }}>
        <Box>
          <DoneIcon
            onClick={() => {
              if (onDataEdit) {
                onDataEdit(newCar);
              }
              if (onAddNewData) {
                onAddNewData(newCar);
              }
              toggleMenu();
            }}
            sx={{ mr: "5px", cursor: "pointer" }}
          />

          <CloseIcon
            onClick={toggleMenu}
            sx={{ cursor: "pointer" }}
          />
        </Box>
      </TableCell>
      <TableCell style={{ width: 160 }}>
        <TextField
          variant="standard"
          placeholder="Make"
          type="text"
          defaultValue={data?.make}
          onChange={(ev) => handleChange(ev, "make")}
        />
      </TableCell>
      <TableCell>
        <TextField
          variant="standard"
          placeholder="Model"
          type="text"
          defaultValue={data?.model}
          onChange={(ev) => handleChange(ev, "model")}
        />
      </TableCell>
      <TableCell>
        <TextField
          variant="standard"
          placeholder="Year"
          type="number"
          defaultValue={data?.year}
          onChange={(ev) => handleChange(ev, "year")}
        />
      </TableCell>
      <TableCell>
        <FormControl
          variant="standard"
          sx={{ minWidth: 85 }}
        >
          <Select
            defaultValue={data?.engineType ? data.engineType : ""}
            onChange={(ev: SelectChangeEvent) => handleChange(ev, "engineType")}
          >
            <MenuItem value="DIESEL">DIESEL</MenuItem>
            <MenuItem value="PETROL">PETROL</MenuItem>
            <MenuItem value="HYBRID">HYBRID</MenuItem>
          </Select>
        </FormControl>
      </TableCell>
      <TableCell>
        <FormControl
          variant="standard"
          sx={{ minWidth: 85 }}
        >
          <Select
            defaultValue={data?.gearBox ? data.gearBox : ""}
            onChange={(ev: SelectChangeEvent) => handleChange(ev, "gearBox")}
          >
            <MenuItem value="MANUAL">MANUAL</MenuItem>
            <MenuItem value="AUTO">AUTO</MenuItem>
          </Select>
        </FormControl>
      </TableCell>
      <TableCell>
        <FormControl
          variant="standard"
          sx={{ minWidth: 85 }}
        >
          <Select
            defaultValue={data?.condition ? data.condition : ""}
            onChange={(ev: SelectChangeEvent) => handleChange(ev, "condition")}
          >
            <MenuItem value="NEW">NEW</MenuItem>
            <MenuItem value="USED">USED</MenuItem>
          </Select>
        </FormControl>
      </TableCell>
      <TableCell>
        <TextField
          variant="standard"
          placeholder="Horse Power"
          type="number"
          defaultValue={data?.horsePower}
          onChange={(ev) => handleChange(ev, "horsePower")}
        />
      </TableCell>
      <TableCell>
        <TextField
          variant="standard"
          placeholder="Color"
          defaultValue={data?.color}
          onChange={(ev) => handleChange(ev, "color")}
        />
      </TableCell>
      <TableCell>
        <TextField
          variant="standard"
          placeholder="Price $"
          type="number"
          defaultValue={data?.price}
          onChange={(ev) => handleChange(ev, "price")}
        />
      </TableCell>
      <TableCell>
        <TextField
          variant="standard"
          placeholder="City"
          defaultValue={data?.city}
          onChange={(ev) => handleChange(ev, "city")}
        />
      </TableCell>
      <TableCell>
        <TextField
          variant="standard"
          placeholder="Mileage"
          type="number"
          defaultValue={data?.mileage}
          onChange={(ev) => handleChange(ev, "mileage")}
        />
      </TableCell>
      <TableCell>
        <TextField
          variant="standard"
          placeholder="Extras"
          defaultValue={data?.extras}
          onChange={(ev) => handleChange(ev, "extras")}
        />
      </TableCell>
    </TableRow>
  );
}

export default AddCar;
