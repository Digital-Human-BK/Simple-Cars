import { useState } from "react";

import Box from "@mui/material/Box";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import Toast from "../../common/Toast/Toast";
import { Car, NewCar } from "../../../interfaces/Car";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { selectUser } from "../../../store/auth-slice";
import { validateAddCar } from "../../../helpers/validateAddCar";
import { createCar, updateCar } from "../../../store/catalog-slice";

type ChangeEvent =
  | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  | SelectChangeEvent;

type AddCarProps = {
  toggleMenu: () => void;
  data?: Car;
};

function AddCar({ toggleMenu, data }: AddCarProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const [inputsTouched, setInputsTouched] = useState<boolean>(false);
  const [inputsError, setInputsError] = useState<null | string>(null);

  const [newCarData, setNewCar] = useState<Car | NewCar>(() => {
    if (data) {
      return data;
    } else {
      return {
        id: "1",
        make: "",
        model: "",
        year: "",
        engineType: "",
        gearBox: "",
        condition: "",
        horsePower: "",
        color: "",
        price: "",
        city: "",
        mileage: "",
        user: {
          id: user!.id,
          username: user!.username,
          password: user!.password,
          firstName: user!.firstName,
          lastName: user!.lastName,
        },
        extras: "",
      };
    }
  });

  const handleChange = (ev: ChangeEvent) => {
    setInputsTouched(true);
    setNewCar((prevState) => ({
      ...prevState,
      [ev.target.name]: ev.target.value,
    }));
  };

  const handleAddCar = () => {
    console.log(newCarData);

    const formIsValid = validateAddCar(newCarData);

    if (formIsValid === false) {
      setInputsTouched(true);
      setInputsError("Please fill all fields");
      return;
    }
    if (data) {
      dispatch(updateCar(newCarData));
    } else {
      dispatch(createCar(newCarData));
    }
    toggleMenu();
  };

  return (
    <TableRow>
      <Toast
        error={inputsError}
        loading={false}
      />
      <TableCell align="center" style={{ width: 160 }}>
        <Box>
          <Tooltip title="Ok">
            <DoneIcon
              onClick={handleAddCar}
              sx={{ mr: "5px", cursor: "pointer" }}
            />
          </Tooltip>
          <Tooltip title="Cancel">
            <CloseIcon
              onClick={toggleMenu}
              sx={{ cursor: "pointer" }}
            />
          </Tooltip>
        </Box>
      </TableCell>
      <TableCell style={{ width: 160 }}>
        <TextField
          variant="standard"
          placeholder="Make"
          type="text"
          name="make"
          value={newCarData.make}
          onChange={(ev) => handleChange(ev)}
          error={inputsTouched && !newCarData.make}
        />
      </TableCell>
      <TableCell>
        <TextField
          variant="standard"
          placeholder="Model"
          type="text"
          name="model"
          value={newCarData.model}
          onChange={(ev) => handleChange(ev)}
          error={inputsTouched && !newCarData.model}
        />
      </TableCell>
      <TableCell>
        <TextField
          variant="standard"
          placeholder="Year"
          type="number"
          name="year"
          value={newCarData.year}
          onChange={(ev) => handleChange(ev)}
          error={inputsTouched && !newCarData.year}
        />
      </TableCell>
      <TableCell>
        <FormControl
          variant="standard"
          sx={{ minWidth: 85 }}
        >
          <Select
            name="engineType"
            value={newCarData.engineType}
            onChange={(ev: SelectChangeEvent) => handleChange(ev)}
            error={inputsTouched && !newCarData.engineType}
          >
            <MenuItem value="DIESEL">DIESEL</MenuItem>
            <MenuItem value="GASOLINE">GASOLINE</MenuItem>
            <MenuItem value="HYBRID">HYBRID</MenuItem>
            <MenuItem value="ELECTRIC">ELECTRIC</MenuItem>
          </Select>
        </FormControl>
      </TableCell>
      <TableCell>
        <FormControl
          variant="standard"
          sx={{ minWidth: 85 }}
        >
          <Select
            name="gearBox"
            value={newCarData.gearBox}
            onChange={(ev: SelectChangeEvent) => handleChange(ev)}
            error={inputsTouched && !newCarData.gearBox}
          >
            <MenuItem value="MANUAL">MANUAL</MenuItem>
            <MenuItem value="AUTOMATIC">AUTOMATIC</MenuItem>
          </Select>
        </FormControl>
      </TableCell>
      <TableCell>
        <FormControl
          variant="standard"
          sx={{ minWidth: 85 }}
        >
          <Select
            name="condition"
            value={newCarData.condition}
            onChange={(ev: SelectChangeEvent) => handleChange(ev)}
            error={inputsTouched && !newCarData.condition}
          >
            <MenuItem value="NEW">NEW</MenuItem>
            <MenuItem value="USED">USED</MenuItem>
          </Select>
        </FormControl>
      </TableCell>
      <TableCell>
        <TextField
          variant="standard"
          placeholder="Power"
          type="number"
          name="horsePower"
          value={newCarData.horsePower}
          onChange={(ev) => handleChange(ev)}
          error={inputsTouched && !newCarData.horsePower}
        />
      </TableCell>
      <TableCell>
        <TextField
          variant="standard"
          placeholder="Color"
          name="color"
          value={newCarData.color}
          onChange={(ev) => handleChange(ev)}
          error={inputsTouched && !newCarData.color}
        />
      </TableCell>
      <TableCell>
        <TextField
          variant="standard"
          placeholder="Price $"
          type="number"
          name="price"
          value={newCarData.price}
          onChange={(ev) => handleChange(ev)}
          error={inputsTouched && !newCarData.price}
        />
      </TableCell>
      <TableCell>
        <TextField
          variant="standard"
          placeholder="City"
          name="city"
          value={newCarData.city}
          onChange={(ev) => handleChange(ev)}
          error={inputsTouched && !newCarData.city}
        />
      </TableCell>
      <TableCell>
        <TextField
          variant="standard"
          placeholder="Mileage"
          type="number"
          name="mileage"
          value={newCarData.mileage}
          onChange={(ev) => handleChange(ev)}
          error={inputsTouched && !newCarData.mileage}
        />
      </TableCell>
      <TableCell>
        <TextField
          variant="standard"
          placeholder="Extras"
          name="extras"
          value={newCarData.extras}
          onChange={(ev) => handleChange(ev)}
          error={inputsTouched && !newCarData.extras}
        />
      </TableCell>
    </TableRow>
  );
}

export default AddCar;
